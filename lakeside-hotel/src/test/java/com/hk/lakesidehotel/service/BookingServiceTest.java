package com.hk.lakesidehotel.service;

import com.hk.lakesidehotel.model.BookedRoom;
import com.hk.lakesidehotel.repository.BookingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BookingServiceTest {

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private IRoomService roomService;

    @InjectMocks
    private BookingService bookingService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindByBookingConfirmationCode() {
        BookedRoom booking = new BookedRoom();
        booking.setBookingConfirmationCode("1234567890");
        booking.setGuestEmail("test@example.com");

        when(bookingRepository.findByBookingConfirmationCode("1234567890")).thenReturn(Optional.of(booking));

        BookedRoom result = bookingService.findByBookingConfirmationCode("1234567890");

        assertNotNull(result);
        assertEquals("test@example.com", result.getGuestEmail());
        verify(bookingRepository, times(1)).findByBookingConfirmationCode("1234567890");
    }

    @Test
    void testSaveBookingSuccess() {
        Long roomId = 1L;
        com.hk.lakesidehotel.model.Room room = new com.hk.lakesidehotel.model.Room();
        room.setId(roomId);
        room.setRoomType("Deluxe");

        BookedRoom booking = new BookedRoom();
        booking.setGuestFullName("John Doe");
        booking.setGuestEmail("john@example.com");
        booking.setCheckInDate(java.time.LocalDate.of(2026, 10, 1));
        booking.setCheckOutDate(java.time.LocalDate.of(2026, 10, 5));
        booking.setNumOfAdults(2);
        booking.setNumOfChildren(0);

        when(roomService.getRoomById(roomId)).thenReturn(Optional.of(room));
        when(bookingRepository.findByRoomId(roomId)).thenReturn(java.util.Collections.emptyList());
        when(bookingRepository.save(any(BookedRoom.class))).thenReturn(booking);

        String confirmationCode = bookingService.saveBooking(roomId, booking);

        assertNotNull(confirmationCode);
        assertEquals(10, confirmationCode.length());
        assertEquals(2, booking.getTotalNumOfGuest());
        verify(bookingRepository, times(1)).save(booking);
    }

    @Test
    void testSaveBookingInvalidDates() {
        Long roomId = 1L;
        BookedRoom booking = new BookedRoom();
        booking.setCheckInDate(java.time.LocalDate.of(2026, 10, 5));
        booking.setCheckOutDate(java.time.LocalDate.of(2026, 10, 1));

        assertThrows(com.hk.lakesidehotel.exception.InvalidBookingRequestException.class, () ->
                bookingService.saveBooking(roomId, booking));
    }
}
