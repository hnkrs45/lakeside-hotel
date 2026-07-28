package com.hk.lakesidehotel.controller;

import com.hk.lakesidehotel.dto.response.AnalyticsSummaryResponse;
import com.hk.lakesidehotel.model.BookedRoom;
import com.hk.lakesidehotel.service.IBookingService;
import com.hk.lakesidehotel.service.IRoomService;
import com.hk.lakesidehotel.service.IUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;

@RestController
@RequestMapping("/analytics")
public class AnalyticsController {

    private final IRoomService roomService;
    private final IBookingService bookingService;
    private final IUserService userService;

    public AnalyticsController(IRoomService roomService, IBookingService bookingService, IUserService userService) {
        this.roomService = roomService;
        this.bookingService = bookingService;
        this.userService = userService;
    }

    @GetMapping("/summary")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<AnalyticsSummaryResponse> getSummary() {
        long totalRooms = roomService.getAllRooms().size();
        List<BookedRoom> bookings = bookingService.getAllBookings();
        long totalBookings = bookings.size();
        long totalUsers = userService.getUsers().size();

        BigDecimal totalRevenue = BigDecimal.ZERO;
        for (BookedRoom booking : bookings) {
            if (booking.getRoom() != null && booking.getRoom().getRoomPrice() != null) {
                long days = ChronoUnit.DAYS.between(booking.getCheckInDate(), booking.getCheckOutDate());
                if (days <= 0) days = 1;
                BigDecimal price = booking.getRoom().getRoomPrice().multiply(BigDecimal.valueOf(days));
                totalRevenue = totalRevenue.add(price);
            }
        }

        double occupancyRate = totalRooms > 0 ? ((double) totalBookings / totalRooms) * 100.0 : 0.0;
        if (occupancyRate > 100.0) occupancyRate = 100.0;

        return ResponseEntity.ok(new AnalyticsSummaryResponse(
                totalRooms,
                totalBookings,
                totalRevenue,
                Math.round(occupancyRate * 10.0) / 10.0,
                totalUsers));
    }
}
