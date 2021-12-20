import React from 'react';
import SignUpForm from '../../components/SignUpForm';

function SignUpPage() {
	return (
		<div className="flex flex-col justify-center items-center ">
			<div className=" text-center h-2/6 flex flex-col justify-center">
				<h4 className="text-5xl font-bold text-slate-300">
					Create a new account
				</h4>
				<span className="text-center my-4">
					Already an account?{' '}
					<span className="text-indigo-800 bodr cursor-pointer ">Sign In</span>
				</span>
			</div>
			<SignUpForm />
		</div>
	);
}

export default SignUpPage;
