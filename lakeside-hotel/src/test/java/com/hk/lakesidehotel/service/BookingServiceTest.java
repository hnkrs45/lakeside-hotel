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
}
