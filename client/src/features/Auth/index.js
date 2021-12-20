import React from 'react';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/SignInPage';
import OtpPage from './Pages/OtpPage';

function Auth() {
	return (
		<div className="w-full h-full flex justify-center items-center bg-slate-600">
			<RegisterPage />
		</div>
	);
}

export default Auth;
