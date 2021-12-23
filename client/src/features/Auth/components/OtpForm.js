import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import Box from '../../../components/Box';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../../../components/Button';
import ErrorMessage from './ErrorMessage';

const schema = yup.object().shape({
	otp: yup
		.string()
		.required()
		.matches(/^[0-9]+$/, 'Must be only digits')
		.min(4, 'Must be exactly 4 digits')
		.max(4, 'Must be exactly 4 digits'),
});

function OtpForm({ onSubmit, resendOtp }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box rounded="rounded-lg" width="w-[30rem]">
				<div className=" flex flex-col gap-6">
					<div className="flex flex-col">
						<div className="flex justify-end ">
							<i className="fas fa-times-circle text-4xl close-position"></i>
						</div>
						<span className="text-xl text-center block mt-4 mb-8">
							You will get OTP code in your Email
						</span>
						<input
							className="border rounded-md bg-white px-6 py-4"
							type="text"
							{...register('otp')}
						/>
						{errors.otp && <ErrorMessage message={errors.otp.message} />}
					</div>

					<div>
						<Button
							custom="w-full"
							rounded="rounded-lg"
							className="w-full bg-indigo-600 text-white rounded-md p-4"
							type="submit"
						>
							Verify
						</Button>

						<span className="text-xl text-center block mt-4 my-12 ">
							Did't recive the OTP code?&nbsp;
							<span
								className="text-indigo-600 cursor-pointer "
								onClick={resendOtp}
							>
								Resend again
							</span>
						</span>
					</div>
				</div>
			</Box>
		</form>
	);
}

export default OtpForm;
