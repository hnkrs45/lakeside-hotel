import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHotel, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaUserShield, FaSearch, FaCalendarCheck, FaBars, FaTimes } from 'react-icons/fa';

const NavBar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        handleLogout();
        setShowAccountDropdown(false);
        setMobileMenuOpen(false);
        navigate("/");
    };

    const closeAll = () => {
        setMobileMenuOpen(false);
        setShowAccountDropdown(false);
    };

    const isAdmin = user && user.roles && Array.isArray(user.roles) && user.roles.includes("ROLE_ADMIN");

    return (
        <header className="bg-white shadow-sm sticky-top border-bottom" style={{ zIndex: 1000 }}>
            <div className="container-fluid px-3 px-md-5 py-3 d-flex align-items-center justify-content-between flex-wrap">
                {/* Brand Logo */}
                <Link to="/" className="d-flex align-items-center text-decoration-none me-4" onClick={closeAll}>
                    <FaHotel className="me-2" size={28} style={{ color: 'rgb(169, 77, 123)' }} />
                    <span className="fw-bold fs-4" style={{ color: 'rgb(169, 77, 123)', letterSpacing: '-0.5px' }}>
                        LakeSide Hotel
                    </span>
                </Link>

                {/* Mobile Toggler Button */}
                <button
                    className="btn btn-light d-md-none border-0"
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                </button>

                {/* Navigation Links */}
                <div className={`align-items-center gap-2 gap-lg-3 ${mobileMenuOpen ? 'd-flex flex-column w-100 mt-3 align-items-start' : 'd-none d-md-flex'}`}>
                    <NavLink
                        className={({ isActive }) =>
                            `px-3 py-2 rounded-3 text-decoration-none fw-semibold ${isActive ? 'bg-light fw-bold' : ''}`
                        }
                        style={({ isActive }) => ({ color: isActive ? 'rgb(169, 77, 123)' : '#212529' })}
                        to="/browse-all-rooms"
                        onClick={closeAll}
                    >
                        Browse Rooms
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            `px-3 py-2 rounded-3 text-decoration-none fw-semibold d-flex align-items-center ${isActive ? 'bg-light fw-bold' : ''}`
                        }
                        style={({ isActive }) => ({ color: isActive ? 'rgb(169, 77, 123)' : '#212529' })}
                        to="/search-rooms"
                        onClick={closeAll}
                    >
                        <FaSearch className="me-2 text-muted" /> Search Availability
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            `px-3 py-2 rounded-3 text-decoration-none fw-semibold d-flex align-items-center ${isActive ? 'bg-light fw-bold' : ''}`
                        }
                        style={({ isActive }) => ({ color: isActive ? 'rgb(169, 77, 123)' : '#212529' })}
                        to="/find-booking"
                        onClick={closeAll}
                    >
                        <FaCalendarCheck className="me-2 text-success" /> Find My Booking
                    </NavLink>

                    {/* Admin Panel - Only visible for users with ROLE_ADMIN */}
                    {isAdmin && (
                        <NavLink
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-3 text-decoration-none fw-semibold d-flex align-items-center ${isActive ? 'bg-light fw-bold' : ''}`
                            }
                            style={({ isActive }) => ({ color: isActive ? 'rgb(169, 77, 123)' : '#212529' })}
                            to="/admin"
                            onClick={closeAll}
                        >
                            <FaUserShield className="me-2 text-danger" /> Admin Panel
                        </NavLink>
                    )}

                    {/* Account Controls */}
                    <div className="ms-md-3 mt-2 mt-md-0">
                        {user ? (
                            <div className="dropdown position-relative">
                                <button
                                    className="btn btn-light rounded-pill px-3 py-2 fw-semibold d-flex align-items-center shadow-sm border"
                                    type="button"
                                    onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                                >
                                    <FaUser className="me-2 text-primary" /> {user.sub}
                                </button>

                                {showAccountDropdown && (
                                    <ul className="dropdown-menu dropdown-menu-end show shadow-lg border-0 rounded-4 mt-2 p-2 position-absolute" style={{ right: 0, zIndex: 1050 }}>
                                        <li>
                                            <Link className="dropdown-item py-2 rounded-3" to="/profile" onClick={closeAll}>
                                                <FaUser className="me-2 text-secondary" /> My Profile
                                            </Link>
                                        </li>
                                        {isAdmin && (
                                            <li>
                                                <Link className="dropdown-item py-2 rounded-3 text-danger" to="/admin" onClick={closeAll}>
                                                    <FaUserShield className="me-2" /> Admin Dashboard
                                                </Link>
                                            </li>
                                        )}
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button className="dropdown-item py-2 rounded-3 text-danger d-flex align-items-center" onClick={logout}>
                                                <FaSignOutAlt className="me-2" /> Sign Out
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <div className="d-flex align-items-center gap-2">
                                <Link
                                    className="btn btn-outline-secondary rounded-pill px-3 py-2 fw-semibold d-flex align-items-center text-decoration-none"
                                    to="/login"
                                    onClick={closeAll}
                                >
                                    <FaSignInAlt className="me-1" /> Sign In
                                </Link>
                                <Link
                                    className="btn btn-primary rounded-pill px-3 py-2 fw-semibold d-flex align-items-center text-decoration-none shadow-sm"
                                    to="/register"
                                    style={{ backgroundColor: 'rgb(169, 77, 123)', borderColor: 'rgb(169, 77, 123)' }}
                                    onClick={closeAll}
                                >
                                    <FaUserPlus className="me-1" /> Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavBar;