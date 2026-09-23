package com.hk.lakesidehotel.service;

import com.hk.lakesidehotel.exception.InvalidBookingRequestException;
import com.hk.lakesidehotel.exception.ResourceNotFoundException;
import com.hk.lakesidehotel.model.BookedRoom;
import com.hk.lakesidehotel.model.Room;
import com.hk.lakesidehotel.repository.BookingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookingService implements IBookingService {

    private final BookingRepository bookingRepository;
    private final IRoomService roomService;

    public BookingService(BookingRepository bookingRepository, IRoomService roomService) {
        this.bookingRepository = bookingRepository;
        this.roomService = roomService;
    }

    @Override
    public List<BookedRoom> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public List<BookedRoom> getBookingsByGuestEmail(String email) {
        return bookingRepository.findByGuestEmail(email);
    }

    @Transactional
    @Override
    public void cancelBooking(Long bookingId) {
        BookedRoom booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));
        Room room = booking.getRoom();
        bookingRepository.delete(booking);
        if (room != null) {
            List<BookedRoom> remainingBookings = bookingRepository.findByRoomId(room.getId());
            if (remainingBookings.isEmpty()) {
                room.setBooked(false);
            }
        }
    }

    @Override
    public List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookingRepository.findByRoomId(roomId);
    }

    @Transactional
    @Override
    public String saveBooking(Long roomId, BookedRoom bookingRequest) {
        if (bookingRequest.getCheckInDate() == null || bookingRequest.getCheckOutDate() == null) {
            throw new InvalidBookingRequestException("Check-in and check-out dates are required");
        }
        if (!bookingRequest.getCheckOutDate().isAfter(bookingRequest.getCheckInDate())) {
            throw new InvalidBookingRequestException("Check-in date must be strictly before check-out date");
        }

        Room room = roomService.getRoomById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with ID: " + roomId));

        List<BookedRoom> existingBookings = bookingRepository.findByRoomId(roomId);
        boolean roomIsAvailable = roomIsAvailable(bookingRequest, existingBookings);

        if (roomIsAvailable) {
            room.addBooking(bookingRequest);
            bookingRequest.calculateTotalNumberOfGuest();
            bookingRepository.save(bookingRequest);
        } else {
            throw new InvalidBookingRequestException("Sorry, this room is not available for the selected dates");
        }

        return bookingRequest.getBookingConfirmationCode();
    }

    @Override
    public BookedRoom findByBookingConfirmationCode(String confirmationCode) {
        return bookingRepository.findByBookingConfirmationCode(confirmationCode)
                .orElseThrow(() -> new ResourceNotFoundException("No booking found with confirmation code: " + confirmationCode));
    }

    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
        return existingBookings.stream().noneMatch(existing ->
                bookingRequest.getCheckInDate().isBefore(existing.getCheckOutDate()) &&
                        bookingRequest.getCheckOutDate().isAfter(existing.getCheckInDate()));
    }
}
