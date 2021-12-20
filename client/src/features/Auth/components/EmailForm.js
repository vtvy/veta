import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
const schema = yup.object().shape({
	email: yup.string().email().required(),
});

function EmailForm({ onSubmit }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	return (
		<div>
			<form
				className={`w-full h-full flex relative bg-white transition-all duration-[0.25s]
				`}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="max-w-xl w-full bg-white shadow rounded-lg p-10 space-y-6">
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
							placeholder="Email Address"
							{...register('email')}
						/>
						{errors.email ? (
							<ErrorMessage message={errors.email.message} />
						) : (
							''
						)}
					</div>
					<div>
						<button className="w-full bg-indigo-600 text-white rounded-md p-4">
							Get OTP
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default EmailForm;
