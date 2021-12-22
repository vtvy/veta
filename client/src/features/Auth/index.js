import React, { useEffect } from 'react';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Auth({ type }) {
	const loginInUser = useSelector((state) => state.user.current);
	const isLoggedIn = !!loginInUser.id;
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) navigate('/');
	}, [isLoggedIn]);

	return (
		<div className="w-full min-h-screen h-full flex justify-center items-center bg-slate-300">
			{type === 'login' ? <LoginPage /> : <RegisterPage />}
		</div>
	);
}

export default Auth;
