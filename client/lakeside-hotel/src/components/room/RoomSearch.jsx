import React, { useState, useEffect } from 'react';
import { getAvailableRooms, getRoomTypes } from '../utils/ApiFunctions';
import RoomCard from './RoomCard';
import { FaSearch, FaCalendarAlt, FaBed } from 'react-icons/fa';

const RoomSearch = () => {
    const [searchQuery, setSearchQuery] = useState({
        checkInDate: "",
        checkOutDate: "",
        roomType: ""
    });
    const [roomTypes, setRoomTypes] = useState([]);
    const [availableRooms, setAvailableRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        getRoomTypes().then((types) => setRoomTypes(types)).catch(console.error);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchQuery({ ...searchQuery, [name]: value });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        if (!searchQuery.checkInDate || !searchQuery.checkOutDate) {
            setErrorMessage("Please select both check-in and check-out dates.");
            return;
        }

        setIsLoading(true);
        setHasSearched(true);
        try {
            const rooms = await getAvailableRooms(
                searchQuery.checkInDate,
                searchQuery.checkOutDate,
                searchQuery.roomType
            );
            setAvailableRooms(rooms);
        } catch (error) {
            setErrorMessage(error.message || "Failed to search rooms.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-4 mb-5">
            <div className="card shadow-lg border-0 rounded-4 p-4 mb-5 bg-white">
                <h4 className="fw-bold mb-4 text-center" style={{ color: 'rgb(169, 77, 123)' }}>
                    <FaSearch className="me-2" /> Find Available Rooms
                </h4>
                {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}

                <form onSubmit={handleSearch}>
                    <div className="row g-3 align-items-end">
                        <div className="col-md-3">
                            <label className="form-label fw-semibold text-muted">
                                <FaCalendarAlt className="me-1" /> Check-In Date
                            </label>
                            <input
                                type="date"
                                className="form-control rounded-3"
                                name="checkInDate"
                                value={searchQuery.checkInDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label fw-semibold text-muted">
                                <FaCalendarAlt className="me-1" /> Check-Out Date
                            </label>
                            <input
                                type="date"
                                className="form-control rounded-3"
                                name="checkOutDate"
                                value={searchQuery.checkOutDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label fw-semibold text-muted">
                                <FaBed className="me-1" /> Room Type
                            </label>
                            <select
                                className="form-select rounded-3"
                                name="roomType"
                                value={searchQuery.roomType}
                                onChange={handleInputChange}
                            >
                                <option value="">All Room Types</option>
                                {roomTypes.map((type, index) => (
                                    <option key={index} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-2">
                            <button
                                type="submit"
                                className="btn btn-primary w-100 rounded-3 shadow-sm py-2"
                                style={{ backgroundColor: 'rgb(169, 77, 123)', borderColor: 'rgb(169, 77, 123)' }}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {isLoading && (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Searching available rooms...</span>
                    </div>
                </div>
            )}

            {hasSearched && !isLoading && (
                <div>
                    <h5 className="fw-bold mb-4">
                        Search Results ({availableRooms.length} rooms available)
                    </h5>
                    {availableRooms.length === 0 ? (
                        <div className="alert alert-warning text-center py-4 rounded-4">
                            No rooms are available for the selected dates and room type.
                        </div>
                    ) : (
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                            {availableRooms.map((room) => (
                                <RoomCard key={room.id} room={room} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default RoomSearch;
