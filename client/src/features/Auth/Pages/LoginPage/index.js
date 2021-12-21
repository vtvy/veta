import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import { login } from '../../userSlice';

function LoginPage() {
	const dispatch = useDispatch();
	const handleLogin = async (values) => {
		try {
			const actions = login(values);
			await dispatch(actions);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="w-full h-full flex  flex-col justify-center items-center">
			<div>
				<h1 className="mt-6 text-center text-5xl font-extrabold text-slate-700">
					Sign in to your account
				</h1>
				<p className="my-4 text-2xl text-center  text-gray-600">
					Or
					<Link
						to="/register"
						className="font-medium ml-4 text-xl text-indigo-900 border-b border-indigo-600"
					>
						Register your FREE account{' '}
					</Link>
				</p>
			</div>
			<LoginForm onSubmit={handleLogin} />
		</div>
	);
}

export default LoginPage;
