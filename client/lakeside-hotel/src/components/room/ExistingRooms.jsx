import React, { useEffect, useState } from 'react';
import { deleteRoom, getAllRooms } from '../utils/ApiFunctions';
import RoomFilter from '../common/RoomFilter';
import RoomPaginator from '../common/RoomPaginator';
import { Col, Row } from 'react-bootstrap';
import { FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ExistingRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let isMounted = true;
        const fetchRooms = async () => {
            setIsLoading(true);
            try {
                const result = await getAllRooms();
                if (isMounted) {
                    setRooms(result || []);
                    setFilteredRooms(result || []);
                    setIsLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    setErrorMessage(error.message);
                    setIsLoading(false);
                }
            }
        };
        fetchRooms();
        return () => {
            isMounted = false;
        };
    }, []);

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDelete = async (roomId) => {
        try {
            const result = await deleteRoom(roomId);
            if (result === '' || result === undefined) {
                setSuccessMessage(`Room No: ${roomId} was deleted successfully.`);
                const updated = await getAllRooms();
                setRooms(updated || []);
                setFilteredRooms(updated || []);
            } else {
                setErrorMessage(`Error deleting room: ${result.message || 'Unknown error'}`);
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setSuccessMessage('');
            setErrorMessage('');
        }, 3000);
    };

    const calculateTotalPages = (filtered, perPage, all) => {
        const total = filtered.length > 0 ? filtered.length : all.length;
        return Math.ceil(total / perPage);
    };

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    return (
        <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-dark">Existing Rooms Inventory</h2>
                <Link to={"/add-room"} className="btn btn-primary rounded-3 px-4" style={{ backgroundColor: 'rgb(169, 77, 123)', borderColor: 'rgb(169, 77, 123)' }}>
                    <FaPlus className="me-2" /> Add New Room
                </Link>
            </div>

            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <Row className="mb-3">
                <Col md={6}>
                    <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
                </Col>
            </Row>

            {isLoading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            ) : (
                <>
                    <div className="table-responsive shadow-sm rounded-4 bg-white overflow-hidden">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="px-4">ID</th>
                                    <th>Room Type</th>
                                    <th>Room Price</th>
                                    <th className="text-end px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRooms.map((room) => (
                                    <tr key={room.id}>
                                        <td className="px-4 fw-semibold">{room.id}</td>
                                        <td className="fw-bold text-secondary">{room.roomType}</td>
                                        <td className="text-success fw-bold">${room.roomPrice}</td>
                                        <td className="text-end px-4">
                                            <div className="btn-group gap-2">
                                                <Link to={`/edit-room/${room.id}`} className="btn btn-sm btn-outline-primary rounded-3">
                                                    <FaEdit className="me-1" /> Edit
                                                </Link>
                                                <button
                                                    className="btn btn-sm btn-outline-danger rounded-3"
                                                    onClick={() => handleDelete(room.id)}
                                                >
                                                    <FaTrashAlt className="me-1" /> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4">
                        <RoomPaginator
                            currentPage={currentPage}
                            totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                            onPageChange={handlePaginationClick}
                        />
                    </div>
                </>
            )}
        </section>
    );
};

export default ExistingRooms;