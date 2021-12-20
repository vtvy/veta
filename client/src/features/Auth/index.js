import React from 'react';
import SignUpPage from './Pages/SignUpPage';
import SignInPage from './Pages/SignInPage';

function Auth() {
	return (
		<div className="w-full h-full flex justify-center items-center bg-slate-600">
			<SignUpPage />
			{/* <SignInPage /> */}
		</div>
	);
}

export default Auth;
