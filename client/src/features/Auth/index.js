import React from 'react';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';

function Auth({ type }) {
	return (
		<div className="w-full h-full flex justify-center items-center bg-slate-600">
			{type === 'login' ? <LoginPage /> : <RegisterPage />}
		</div>
	);
}

export default Auth;
