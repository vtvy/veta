import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
});
function SignInForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = (data) => {
		console.log(data);
	};
	return (
		<form
			className="max-w-xl w-full mx-auto bg-white shadow rounded-lg p-10 space-y-6"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="flex flex-col">
				<label
					className="text-base font-bold text-gray-600 mb-1"
					htmlFor="email"
				>
					Email Address
				</label>
				<input
					className="border rounded-md bg-white px-6 py-4"
					type="text"
					name="email"
					id="email"
					placeholder="Enter your Email Address"
					{...register('email')}
				/>
				{errors.email ? <ErrorMessage message={errors.email.message} /> : ''}
			</div>
			<div className="flex flex-col">
				<label
					className="text-base font-bold text-gray-600 mb-1"
					htmlFor="password"
				>
					Password
				</label>
				<input
					className="border rounded-md bg-white px-6 py-4"
					type="password"
					name="password"
					id="password"
					placeholder="Enter your Password"
					{...register('password')}
				/>
				{errors.password ? (
					<ErrorMessage message={errors.password.message} />
				) : (
					''
				)}
			</div>
			<div className="flex justify-between text-base">
				<div className="flex items-center space-x-2">
					<input
						className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
						type="checkbox"
						name="remember"
						id="remember"
					/>
					<label htmlFor="remember">Remember me</label>
				</div>
				<div>
					<a className="text-indigo-600">Forgot your Password?</a>
				</div>
			</div>
			<div>
				<button className="w-full bg-indigo-600 text-white rounded-md p-4">
					Sign in
				</button>
			</div>
			<div className="relative pb-2">
				<div className="absolute top-0 left-0 w-full border-b"></div>
			</div>
		</form>
	);
}

export default SignInForm;
