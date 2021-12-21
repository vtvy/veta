import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ isLogged }) => {
	return isLogged ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
