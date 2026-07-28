import React, { useEffect, useState } from 'react';
import { getAllRooms } from '../utils/ApiFunctions';
import { Link } from 'react-router-dom';
import { Container, Carousel, Row, Col, Card } from 'react-bootstrap';
import defaultRoomPhoto from '../../assets/images/services-1.jpg';

const RoomCarousel = () => {
    const [rooms, setRooms] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAllRooms().then((data) => {
            setRooms(data || []);
            setIsLoading(false);
        }).catch((error) => {
            setErrorMessage(error.message);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="mt-5 text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;
    }
    if (errorMessage) {
        return <div className="text-danger mb-5 mt-5 text-center">Error: {errorMessage}</div>;
    }

    const displayRooms = rooms.length > 0 ? rooms : [
        { id: 1, roomType: 'Deluxe Suite', roomPrice: 250, photo: null },
        { id: 2, roomType: 'Executive King', roomPrice: 380, photo: null },
        { id: 3, roomType: 'Lakeside Villa', roomPrice: 500, photo: null },
        { id: 4, roomType: 'Standard Room', roomPrice: 180, photo: null }
    ];

    return (
        <section className="bg-light mb-5 mt-5 shadow-sm py-5 rounded-4">
            <div className="text-center mb-4">
                <Link to={"/browse-all-rooms"} className="hotel-color text-decoration-none fw-bold fs-4">
                    Browse All Rooms &rarr;
                </Link>
            </div>

            <Container>
                <Carousel indicators={false}>
                    {[...Array(Math.ceil(displayRooms.length / 4))].map((_, index) => {
                        return (
                            <Carousel.Item key={index}>
                                <Row>
                                    {displayRooms.slice(index * 4, index * 4 + 4).map((room) => {
                                        const photoSrc = room.photo && room.photo.length > 20
                                            ? `data:image/png;base64, ${room.photo}`
                                            : defaultRoomPhoto;

                                        return (
                                            <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                                                <Card className="shadow-sm border-0 rounded-4 overflow-hidden h-100">
                                                    <Link to={`/search-rooms`}>
                                                        <Card.Img
                                                            variant="top"
                                                            src={photoSrc}
                                                            alt="Room Photo"
                                                            className="w-100 object-fit-cover"
                                                            style={{ height: '180px' }}
                                                        />
                                                    </Link>
                                                    <Card.Body className="d-flex flex-column justify-content-between">
                                                        <div>
                                                            <Card.Title className="hotel-color fw-bold fs-6">{room.roomType}</Card.Title>
                                                            <Card.Title className="room-price text-warning fw-semibold fs-6">${room.roomPrice} / night</Card.Title>
                                                        </div>
                                                        <div className="mt-3">
                                                            <Link className="btn btn-sm btn-hotel w-100 rounded-pill" to={`/search-rooms`}>
                                                                Book Now
                                                            </Link>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
            </Container>
        </section>
    );
};

export default RoomCarousel;