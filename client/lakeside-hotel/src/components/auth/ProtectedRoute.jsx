import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ path: location.pathname }} replace />;
    }

    if (requiredRole && (!user.roles || !Array.isArray(user.roles) || !user.roles.includes(requiredRole))) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
