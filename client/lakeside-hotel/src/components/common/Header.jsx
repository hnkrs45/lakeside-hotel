import React from 'react';
import headerImg from '../../assets/images/services4.jpg';

const Header = ({ title }) => {
    return (
        <header
            className="header mb-4 rounded-4 overflow-hidden position-relative"
            style={{
                backgroundImage: `url(${headerImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div className="overlay"></div>
            <div className="container position-relative z-1 text-center">
                <h1 className="header-title text-white fw-bold mb-0">{title}</h1>
            </div>
        </header>
    );
};

export default Header;