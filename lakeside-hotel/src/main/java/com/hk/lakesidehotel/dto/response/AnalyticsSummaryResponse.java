package com.hk.lakesidehotel.dto.response;

import java.math.BigDecimal;

public class AnalyticsSummaryResponse {
    private long totalRooms;
    private long totalBookings;
    private BigDecimal totalRevenue;
    private double occupancyRate;
    private long totalUsers;

    public AnalyticsSummaryResponse() {
    }

    public AnalyticsSummaryResponse(long totalRooms, long totalBookings, BigDecimal totalRevenue, double occupancyRate, long totalUsers) {
        this.totalRooms = totalRooms;
        this.totalBookings = totalBookings;
        this.totalRevenue = totalRevenue;
        this.occupancyRate = occupancyRate;
        this.totalUsers = totalUsers;
    }

    public long getTotalRooms() {
        return totalRooms;
    }

    public void setTotalRooms(long totalRooms) {
        this.totalRooms = totalRooms;
    }

    public long getTotalBookings() {
        return totalBookings;
    }

    public void setTotalBookings(long totalBookings) {
        this.totalBookings = totalBookings;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public double getOccupancyRate() {
        return occupancyRate;
    }

    public void setOccupancyRate(double occupancyRate) {
        this.occupancyRate = occupancyRate;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }
}
