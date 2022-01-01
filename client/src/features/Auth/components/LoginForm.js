import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../../../components/Button';
import InputField from '../../../components/InputFile';
const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
});
function LoginForm({ onSubmit }) {
	const {
		register,
		handleSubmit,

		formState: { errors, isValid },
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema),
	});
	const onSubmitForm = (data) => {
		onSubmit(data);
	};

	return (
		<form
			className="max-w-xl w-full mx-auto bg-white shadow-xl rounded-[2rem] p-10 space-y-6"
			onSubmit={handleSubmit(onSubmitForm)}
		>
			{/* email */}
			<div>
				<InputField
					label=" Email Address "
					type="email"
					name="email"
					register={register}
					error={errors.email}
				/>
			</div>
			{/* password */}
			<div>
				<InputField
					label="Password "
					type="password"
					name="password"
					register={register}
					error={errors.password}
				/>
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
					<a href="http://" className="text-indigo-600">
						Forgot your Password?
					</a>
				</div>
			</div>
			<div>
				<Button w={'w-full'} p={'p-4'} isValid={isValid} type="submit">
					Login
				</Button>
			</div>
		</form>
	);
}

export default LoginForm;
