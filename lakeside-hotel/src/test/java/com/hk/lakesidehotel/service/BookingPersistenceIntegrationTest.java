package com.hk.lakesidehotel.service;

import com.hk.lakesidehotel.model.BookedRoom;
import com.hk.lakesidehotel.model.Room;
import com.hk.lakesidehotel.repository.BookingRepository;
import com.hk.lakesidehotel.repository.RoomRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class BookingPersistenceIntegrationTest {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Test
    void testEndToEndBookingPersistence() {
        // Create test room
        Room room = new Room();
        room.setRoomType("Integration Test Room");
        room.setRoomPrice(BigDecimal.valueOf(150.00));
        room = roomRepository.save(room);
        Long roomId = room.getId();

        try {
            // Create booking request
            BookedRoom booking = new BookedRoom();
            booking.setGuestFullName("Alice Smith");
            booking.setGuestEmail("alice.smith@example.com");
            booking.setCheckInDate(LocalDate.now().plusDays(10));
            booking.setCheckOutDate(LocalDate.now().plusDays(15));
            booking.setNumOfAdults(2);
            booking.setNumOfChildren(1);

            // Save booking
            String confirmationCode = bookingService.saveBooking(roomId, booking);

            // Assert confirmation code is returned
            assertNotNull(confirmationCode);
            assertEquals(10, confirmationCode.length());

            // Query database to verify persistence
            Optional<BookedRoom> persistedBooking = bookingRepository.findByBookingConfirmationCode(confirmationCode);
            assertTrue(persistedBooking.isPresent());
            BookedRoom saved = persistedBooking.get();
            assertEquals("Alice Smith", saved.getGuestFullName());
            assertEquals("alice.smith@example.com", saved.getGuestEmail());
            assertEquals(2, saved.getNumOfAdults());
            assertEquals(1, saved.getNumOfChildren());
            assertEquals(3, saved.getTotalNumOfGuest());
            assertNotNull(saved.getRoom());
            assertEquals(roomId, saved.getRoom().getId());

            // Verify room is marked booked
            Room updatedRoom = roomRepository.findById(roomId).orElseThrow();
            assertTrue(updatedRoom.isBooked());

            // Verify cancellation cleans up properly
            bookingService.cancelBooking(saved.getBookingId());
            assertFalse(bookingRepository.existsById(saved.getBookingId()));

            Room postCancelRoom = roomRepository.findById(roomId).orElseThrow();
            assertFalse(postCancelRoom.isBooked());
        } finally {
            roomRepository.deleteById(roomId);
        }
    }
}
