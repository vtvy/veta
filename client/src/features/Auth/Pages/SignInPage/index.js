import React from 'react';

import SignInForm from '../../components/SignInForm';

function SignInPage() {
	return (
		<div className="w-full h-full flex  flex-col justify-center items-center">
			<div>
				<h1 className="mt-6 text-center text-5xl font-extrabold text-slate-300">
					Sign in to your account
				</h1>
				<p className="my-4 text-center text-xl text-gray-600">
					Or
					<a
						href="https://"
						className="font-medium text-indigo-600 border-b border-indigo-600"
					>
						register your FREE account{' '}
					</a>
				</p>
			</div>
			<SignInForm />
		</div>
	);
}

export default SignInPage;
