import React from 'react';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import { Route, Routes } from 'react-router-dom';

function Auth() {
	return (
		<div className="w-full h-full flex justify-center items-center bg-slate-600">
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
		</div>
	);
}

export default Auth;
