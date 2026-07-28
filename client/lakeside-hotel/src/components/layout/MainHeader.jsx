import React from 'react';
import heroImg from '../../assets/images/services-1.jpg';

const MainHeader = () => {
    return (
        <header
            className="header-banner"
            style={{
                backgroundImage: `url(${heroImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                height: '500px'
            }}
        >
            <div className="overlay"></div>
            <div className="animated-texts overlay-content text-center">
                <h1 className="fw-bold display-4 mb-3">Welcome to <span className="hotel-color text-warning">Lakeside Hotel</span></h1>
                <h4 className="fw-light fs-4 text-light">Experience the Best Hospitality in Town</h4>
            </div>
        </header>
    );
};

export default MainHeader;