import React from 'react';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/SignInPage';
import OtpPage from './Pages/OtpPage';

function Auth() {
	return (
		<div className="w-full h-full flex justify-center items-center bg-slate-600">
			<SignUpPage />
			<LoginPage />
			<OtpPage />
		</div>
	);
}

export default Auth;
