package com.hk.lakesidehotel.controller;

import com.hk.lakesidehotel.model.BookedRoom;
import com.hk.lakesidehotel.service.IBookingService;
import com.hk.lakesidehotel.service.IRoomService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class BookingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private IBookingService bookingService;

    @MockitoBean
    private IRoomService roomService;

    @Test
    void testSaveBookingWithCanonicalPayload() throws Exception {
        when(bookingService.saveBooking(eq(1L), any(BookedRoom.class))).thenReturn("1234567890");

        String payload = """
            {
                "guestFullName": "Jane Doe",
                "guestEmail": "jane@example.com",
                "checkInDate": "2026-10-10",
                "checkOutDate": "2026-10-15",
                "numOfAdults": 2,
                "numOfChildren": 1
            }
        """;

        mockMvc.perform(post("/bookings/room/1/booking")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isOk())
                .andExpect(content().string("1234567890"));
    }

    @Test
    void testSaveBookingWithAliasPayload() throws Exception {
        when(bookingService.saveBooking(eq(1L), any(BookedRoom.class))).thenReturn("9876543210");

        String payload = """
            {
                "guestName": "Jane Doe",
                "guestEmail": "jane@example.com",
                "checkInDate": "2026-10-10",
                "checkOutDate": "2026-10-15",
                "numberOfAdults": 2,
                "numberOfChildren": 0
            }
        """;

        mockMvc.perform(post("/bookings/room/1/booking")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isOk())
                .andExpect(content().string("9876543210"));
    }

    @Test
    void testGetBookingByConfirmationCode() throws Exception {
        com.hk.lakesidehotel.model.Room room = new com.hk.lakesidehotel.model.Room();
        room.setId(10L);
        room.setRoomType("Executive Suite");
        room.setRoomPrice(java.math.BigDecimal.valueOf(250.00));

        BookedRoom booking = new BookedRoom();
        booking.setBookingId(1L);
        booking.setGuestFullName("Alice Smith");
        booking.setGuestEmail("alice@example.com");
        booking.setCheckInDate(java.time.LocalDate.of(2026, 11, 1));
        booking.setCheckOutDate(java.time.LocalDate.of(2026, 11, 5));
        booking.setNumOfAdults(2);
        booking.setNumOfChildren(0);
        booking.setBookingConfirmationCode("2862520982");
        booking.setRoom(room);

        when(bookingService.findByBookingConfirmationCode("2862520982")).thenReturn(booking);
        when(roomService.getRoomById(10L)).thenReturn(java.util.Optional.of(room));

        mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get("/bookings/confirmation/2862520982"))
                .andExpect(status().isOk())
                .andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath("$.bookingConfirmationCode").value("2862520982"))
                .andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath("$.guestFullName").value("Alice Smith"))
                .andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath("$.room.roomType").value("Executive Suite"))
                .andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath("$.room.id").value(10));
    }
}
