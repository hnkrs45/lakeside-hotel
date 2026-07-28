import React, { useState } from 'react';
import { registerUser } from '../utils/ApiFunctions';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
    const [registration, setRegistration] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setRegistration({ ...registration, [e.target.name]: e.target.value });
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        try {
            const result = await registerUser(registration);
            setSuccessMessage("Registration successful! Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            setErrorMessage(error.message || "Registration failed.");
        }
    };

    return (
        <section className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-4 p-md-5">
                            <h3 className="card-title text-center mb-4 font-weight-bold" style={{ color: 'rgb(169, 77, 123)' }}>
                                Create Your Account
                            </h3>
                            <p className="text-muted text-center mb-4">
                                Join Lakeside Hotel to enjoy seamless room bookings and member benefits.
                            </p>

                            {errorMessage && (
                                <div className="alert alert-danger text-center" role="alert">
                                    {errorMessage}
                                </div>
                            )}

                            {successMessage && (
                                <div className="alert alert-success text-center" role="alert">
                                    {successMessage}
                                </div>
                            )}

                            <form onSubmit={handleRegistration}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="firstName" className="form-label text-secondary fw-semibold">
                                            First Name
                                        </label>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            className="form-control rounded-3"
                                            placeholder="John"
                                            value={registration.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="lastName" className="form-label text-secondary fw-semibold">
                                            Last Name
                                        </label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            className="form-control rounded-3"
                                            placeholder="Doe"
                                            value={registration.lastName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label text-secondary fw-semibold">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="form-control rounded-3"
                                        placeholder="john.doe@example.com"
                                        value={registration.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label text-secondary fw-semibold">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="form-control rounded-3"
                                        placeholder="At least 6 characters"
                                        value={registration.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg w-100 rounded-3 shadow-sm"
                                    style={{ backgroundColor: 'rgb(169, 77, 123)', borderColor: 'rgb(169, 77, 123)' }}
                                >
                                    Register Account
                                </button>
                            </form>

                            <div className="mt-4 text-center">
                                <span className="text-muted">Already have an account? </span>
                                <Link to="/login" className="fw-bold text-decoration-none" style={{ color: 'rgb(169, 77, 123)' }}>
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Registration;
