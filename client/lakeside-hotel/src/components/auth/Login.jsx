import React, { useState } from 'react';
import { loginUser } from '../utils/ApiFunctions';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const { handleLogin } = useAuth();
    const location = useLocation();
    const redirectUrl = location.state?.path || "/";

    const handleInputChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const success = await loginUser(login);
            if (success && success.token) {
                handleLogin(success.token, success.roles);
                const roles = success.roles || [];
                if (roles.includes("ROLE_ADMIN")) {
                    navigate("/admin", { replace: true });
                } else if (redirectUrl && redirectUrl !== "/") {
                    navigate(redirectUrl, { replace: true });
                } else {
                    navigate("/", { replace: true });
                }
            } else {
                setErrorMessage("Invalid username or password. Please try again.");
            }
        } catch (error) {
            setErrorMessage(error.message || "An error occurred during authentication.");
        }
    };

    return (
        <section className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-4 p-md-5">
                            <h3 className="card-title text-center mb-4 text-primary font-weight-bold">
                                Welcome Back
                            </h3>
                            <p className="text-muted text-center mb-4">
                                Sign in to manage your bookings and access exclusive services.
                            </p>

                            {errorMessage && (
                                <div className="alert alert-danger text-center" role="alert">
                                    {errorMessage}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label text-secondary fw-semibold">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="form-control form-control-lg rounded-3"
                                        placeholder="admin@lakesidehotel.com"
                                        value={login.email}
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
                                        className="form-control form-control-lg rounded-3"
                                        placeholder="••••••••"
                                        value={login.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg w-100 rounded-3 shadow-sm"
                                    style={{ backgroundColor: 'rgb(169, 77, 123)', borderColor: 'rgb(169, 77, 123)' }}
                                >
                                    Sign In
                                </button>
                            </form>

                            <div className="mt-4 text-center">
                                <span className="text-muted">Don't have an account yet? </span>
                                <Link to="/register" className="fw-bold text-decoration-none" style={{ color: 'rgb(169, 77, 123)' }}>
                                    Register Here
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
