import React, { useEffect, useState } from 'react';
import { getUserProfile, getBookingsByUserId, cancelBooking } from '../utils/ApiFunctions';
import { useAuth } from '../../context/AuthContext';
import { FaUserCircle, FaCalendarAlt, FaEnvelope, FaTrash, FaCheckCircle } from 'react-icons/fa';

const Profile = () => {
    const { user } = useAuth();
    const [userProfile, setUserProfile] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (user && user.sub) {
            fetchUserProfile();
            fetchUserBookings();
        }
    }, [user]);

    const fetchUserProfile = async () => {
        try {
            const data = await getUserProfile(user.sub, user.token);
            setUserProfile(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchUserBookings = async () => {
        try {
            const data = await getBookingsByUserId(user.sub, user.token);
            setBookings(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            try {
                await cancelBooking(bookingId);
                setMessage("Booking cancelled successfully.");
                fetchUserBookings();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    return (
        <div className="container mt-5 mb-5">
            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}

            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card shadow border-0 rounded-4 text-center p-4">
                        <div className="mb-3">
                            <FaUserCircle size={80} color="rgb(169, 77, 123)" />
                        </div>
                        <h4 className="fw-bold">{userProfile?.firstName} {userProfile?.lastName}</h4>
                        <p className="text-muted"><FaEnvelope className="me-2" />{userProfile?.email}</p>
                        <hr />
                        <div className="d-flex justify-content-center gap-2">
                            {userProfile?.roles?.map((role, idx) => (
                                <span key={idx} className="badge bg-primary rounded-pill px-3 py-2">
                                    {role.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card shadow border-0 rounded-4 p-4">
                        <h4 className="fw-bold mb-4" style={{ color: 'rgb(169, 77, 123)' }}>
                            <FaCalendarAlt className="me-2" /> My Booking History
                        </h4>
                        {bookings.length === 0 ? (
                            <p className="text-muted">You have no active or past bookings.</p>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Booking ID</th>
                                            <th>Room Type</th>
                                            <th>Check-In</th>
                                            <th>Check-Out</th>
                                            <th>Confirmation Code</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((booking) => (
                                            <tr key={booking.id}>
                                                <td>#{booking.id}</td>
                                                <td>{booking.room?.roomType || "Standard Room"}</td>
                                                <td>{booking.checkInDate}</td>
                                                <td>{booking.checkOutDate}</td>
                                                <td>
                                                    <span className="badge bg-success text-wrap">
                                                        {booking.bookingConfirmationCode}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger rounded-3"
                                                        onClick={() => handleCancelBooking(booking.id)}
                                                    >
                                                        <FaTrash className="me-1" /> Cancel
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
