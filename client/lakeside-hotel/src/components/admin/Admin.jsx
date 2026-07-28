import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAnalyticsSummary } from '../utils/ApiFunctions';
import { FaBed, FaCalendarCheck, FaDollarSign, FaChartLine, FaPlus } from 'react-icons/fa';

const Admin = () => {
    const [analytics, setAnalytics] = useState({
        totalRooms: 0,
        totalBookings: 0,
        totalRevenue: 0,
        occupancyRate: 0,
        totalUsers: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchAnalytics = async () => {
            try {
                const data = await getAnalyticsSummary();
                if (isMounted) {
                    setAnalytics(data);
                }
            } catch (error) {
                console.error("Failed to load analytics:", error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        fetchAnalytics();
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section className="container mt-5 mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-dark mb-1">Executive Dashboard</h2>
                    <p className="text-muted">Overview of hotel operations, revenue, and occupancy performance</p>
                </div>
                <div>
                    <Link to="/add-room" className="btn btn-primary shadow-sm rounded-3 px-4 py-2" style={{ backgroundColor: 'rgb(169, 77, 123)', borderColor: 'rgb(169, 77, 123)' }}>
                        <FaPlus className="me-2" /> Add New Room
                    </Link>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            ) : (
                <>
                    <div className="row g-4 mb-5">
                        <div className="col-md-6 col-lg-3">
                            <div className="card shadow-sm border-0 rounded-4 p-3 bg-white">
                                <div className="d-flex align-items-center">
                                    <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-3 me-3">
                                        <FaBed size={28} />
                                    </div>
                                    <div>
                                        <span className="text-muted fs-6 d-block">Total Rooms</span>
                                        <h4 className="fw-bold mb-0">{analytics.totalRooms}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="card shadow-sm border-0 rounded-4 p-3 bg-white">
                                <div className="d-flex align-items-center">
                                    <div className="p-3 bg-success bg-opacity-10 text-success rounded-3 me-3">
                                        <FaCalendarCheck size={28} />
                                    </div>
                                    <div>
                                        <span className="text-muted fs-6 d-block">Total Bookings</span>
                                        <h4 className="fw-bold mb-0">{analytics.totalBookings}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="card shadow-sm border-0 rounded-4 p-3 bg-white">
                                <div className="d-flex align-items-center">
                                    <div className="p-3 bg-warning bg-opacity-10 text-warning rounded-3 me-3">
                                        <FaDollarSign size={28} />
                                    </div>
                                    <div>
                                        <span className="text-muted fs-6 d-block">Total Revenue</span>
                                        <h4 className="fw-bold mb-0">${analytics.totalRevenue || 0}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="card shadow-sm border-0 rounded-4 p-3 bg-white">
                                <div className="d-flex align-items-center">
                                    <div className="p-3 bg-info bg-opacity-10 text-info rounded-3 me-3">
                                        <FaChartLine size={28} />
                                    </div>
                                    <div>
                                        <span className="text-muted fs-6 d-block">Occupancy Rate</span>
                                        <h4 className="fw-bold mb-0">{analytics.occupancyRate}%</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="card shadow-sm border-0 rounded-4 p-4 text-center">
                                <h4 className="fw-bold mb-3">Room Management</h4>
                                <p className="text-muted">Create, edit, price, and maintain hotel inventory rooms.</p>
                                <div className="d-flex justify-content-center gap-3 mt-3">
                                    <Link to="/existing-rooms" className="btn btn-outline-primary rounded-3 px-4">
                                        Manage Rooms List
                                    </Link>
                                    <Link to="/add-room" className="btn btn-primary rounded-3 px-4" style={{ backgroundColor: 'rgb(169, 77, 123)', borderColor: 'rgb(169, 77, 123)' }}>
                                        Add Room
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card shadow-sm border-0 rounded-4 p-4 text-center">
                                <h4 className="fw-bold mb-3">Booking Administration</h4>
                                <p className="text-muted">Monitor guest reservations, lookup confirmation codes, and handle cancellations.</p>
                                <div className="d-flex justify-content-center gap-3 mt-3">
                                    <Link to="/existing-rooms" className="btn btn-outline-secondary rounded-3 px-4">
                                        View Bookings Log
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default Admin;