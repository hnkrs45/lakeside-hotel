import React, { useState } from 'react';
import { getBookingByConfirmationCode, cancelBooking } from '../utils/ApiFunctions';
import { FaSearch, FaCalendarCheck, FaUser, FaEnvelope, FaTrash, FaBed, FaHotel } from 'react-icons/fa';

const FindBooking = () => {
    const [confirmationCode, setConfirmationCode] = useState("");
    const [bookingInfo, setBookingInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        setError("");
        setBookingInfo(null);
        setSuccessMessage("");

        if (!confirmationCode.trim()) {
            setError("Please enter a valid confirmation code.");
            return;
        }

        setIsLoading(true);
        try {
            const data = await getBookingByConfirmationCode(confirmationCode.trim());
            setBookingInfo(data);
        } catch (err) {
            setError(err.message || "Booking not found.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            try {
                await cancelBooking(bookingId);
                setSuccessMessage("Booking cancelled successfully.");
                setBookingInfo(null);
            } catch (err) {
                setError(err.message || "Error cancelling booking.");
            }
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0 rounded-4 p-4 mb-4 bg-white">
                        <h4 className="fw-bold text-center mb-3" style={{ color: 'rgb(169, 77, 123)' }}>
                            <FaSearch className="me-2" /> Find My Reservation
                        </h4>
                        <p className="text-muted text-center mb-4">
                            Enter your 10-digit booking confirmation code below to view your booking details.
                        </p>

                        {error && <div className="alert alert-danger text-center">{error}</div>}
                        {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}

                        <form onSubmit={handleSearch}>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control form-control-lg rounded-start-3"
                                    placeholder="e.g. 9847102934"
                                    value={confirmationCode}
                                    onChange={(e) => setConfirmationCode(e.target.value)}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg rounded-end-3 px-4"
                                    style={{ backgroundColor: 'rgb(169, 77, 123)', borderColor: 'rgb(169, 77, 123)' }}
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>

                    {isLoading && (
                        <div className="text-center py-4">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading reservation...</span>
                            </div>
                        </div>
                    )}

                    {bookingInfo && (
                        <div className="card shadow border-0 rounded-4 p-4 bg-white">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="fw-bold text-success mb-0 d-flex align-items-center">
                                    <FaCalendarCheck className="me-2" /> Confirmation Code: {bookingInfo.bookingConfirmationCode}
                                </h5>
                                <span className="badge bg-success rounded-pill px-3 py-2">Confirmed</span>
                            </div>

                            <hr />

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <p className="mb-1 text-muted"><FaUser className="me-2" /> Guest Name</p>
                                    <h6 className="fw-bold">{bookingInfo.guestFullName}</h6>
                                </div>

                                <div className="col-md-6">
                                    <p className="mb-1 text-muted"><FaEnvelope className="me-2" /> Guest Email</p>
                                    <h6 className="fw-bold">{bookingInfo.guestEmail}</h6>
                                </div>

                                <div className="col-md-6">
                                    <p className="mb-1 text-muted"><FaHotel className="me-2" /> Room Type</p>
                                    <h6 className="fw-bold">{bookingInfo.room?.roomType || "Standard Room"}</h6>
                                </div>

                                <div className="col-md-6">
                                    <p className="mb-1 text-muted"><FaBed className="me-2" /> Guests</p>
                                    <h6 className="fw-bold">{bookingInfo.totalNumOfGuest || (bookingInfo.numOfAdults + bookingInfo.numOfChildren)} Guests ({bookingInfo.numOfAdults} Adults, {bookingInfo.numOfChildren} Children)</h6>
                                </div>

                                <div className="col-md-6">
                                    <p className="mb-1 text-muted">Check-In Date</p>
                                    <h6 className="fw-bold text-primary">{bookingInfo.checkInDate}</h6>
                                </div>

                                <div className="col-md-6">
                                    <p className="mb-1 text-muted">Check-Out Date</p>
                                    <h6 className="fw-bold text-primary">{bookingInfo.checkOutDate}</h6>
                                </div>
                            </div>

                            <hr />

                            <div className="text-end">
                                <button
                                    className="btn btn-outline-danger rounded-3 px-4"
                                    onClick={() => handleCancelBooking(bookingInfo.id)}
                                >
                                    <FaTrash className="me-2" /> Cancel Reservation
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FindBooking;
