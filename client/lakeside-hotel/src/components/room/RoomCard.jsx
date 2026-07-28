import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import defaultRoomPhoto from '../../assets/images/services-1.jpg';

const RoomCard = ({ room }) => {
    const photoSrc = room.photo && room.photo.length > 20
        ? `data:image/png;base64, ${room.photo}`
        : defaultRoomPhoto;

    return (
        <Col key={room.id} className="mb-4 xs={12}">
            <Card className="shadow-sm border-0 rounded-4 h-100 overflow-hidden">
                <Card.Body className="d-flex flex-column flex-md-row align-items-center p-3">
                    <div className="flex-shrink-0 me-md-3 mb-3 mb-md-0 w-100 w-md-auto" style={{ maxWidth: '220px' }}>
                        <Card.Img
                            variant="top"
                            src={photoSrc}
                            alt="Room Photo"
                            className="rounded-3 object-fit-cover shadow-sm"
                            style={{ width: '100%', height: '150px' }}
                        />
                    </div>

                    <div className="flex-grow-1 px-md-3 text-center text-md-start">
                        <Card.Title className="hotel-color fw-bold fs-5 mb-1">{room.roomType}</Card.Title>
                        <Card.Title className="room-price fw-semibold text-warning mb-2">${room.roomPrice} / Night</Card.Title>
                        <Card.Text className="text-muted small mb-0">
                            Experience premium luxury with modern amenities, complimentary Wi-Fi, air conditioning, and 24/7 room service.
                        </Card.Text>
                    </div>

                    <div className="flex-shrink-0 mt-3 mt-md-0">
                        <Link to={`/search-rooms`} className="btn btn-hotel btn-sm rounded-pill px-4 py-2 shadow-sm">
                            Book Now
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default RoomCard;