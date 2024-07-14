import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth(); 

    return isAuthenticated ? (
        <Navigate to="/login" replace />
    ) : (
        <Outlet />
    );
};

export default PrivateRoute;