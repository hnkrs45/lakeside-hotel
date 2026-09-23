import React from 'react';
import { Container } from 'react-bootstrap';
import parallaxImg from '../../assets/images/parrall.jpg';

const Parallax = () => {
    return (
        <div
            className="parallax mb-5 rounded-4 shadow-lg overflow-hidden position-relative"
            style={{
                backgroundImage: `url(${parallaxImg})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <div className="overlay" style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}></div>
            <Container className="text-center px-5 py-5 justify-content-center position-relative z-1 text-white">
                <div className="animated-texts bounceIn">
                    <h1 className="display-4 fw-bold mb-3">Welcome to <span className="text-warning">Lakeside Hotel</span></h1>
                    <h3 className="fw-light fs-3">We offer the best luxury services for all your hospitality needs</h3>
                </div>
            </Container>
        </div>
    );
};

export default Parallax;