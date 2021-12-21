import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosClient from '../../../../api/axiosClient';
import EmailForm from '../../components/EmailForm';
import OtpForm from '../../components/OtpForm';
import RegisterForm from '../../components/RegisterForm';
import { register } from '../../userSlice';

function RegisterPage() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [isCorrectOtp, seIsCorrectOtp] = useState(false);

	const handleSendOtp = async (data) => {
		const url = '/auth/otp';
		try {
			const res = await axiosClient.post(url, data);

			if (res.data.success) {
				setEmail(data.email);
			} else {
				alert('Email is already exists');
			}
		} catch (err) {
			console.log(err);
		}
	};
	const handleSubmitOtp = async (data) => {
		const otp = { otp: data };
		const url = '/auth/confirmOtp';
		try {
			const res = await axiosClient.post(url, otp);
			if (res.data.success) {
				seIsCorrectOtp(true);
			} else {
				alert(res.data.message);
			}
		} catch (err) {
			alert(err.message);
		}
	};

	const handleRegister = async (data) => {
		data.append('email', email);
		try {
			const action = register();
			await dispatch(action);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="flex flex-col justify-center items-center ">
			<div className=" text-center h-2/6 flex flex-col justify-center">
				<h4 className="text-5xl font-bold text-slate-700">
					Create a new account
				</h4>
				<span className="text-center my-4">
					Already an account?{' '}
					<Link to="/login" className="text-indigo-800  cursor-pointer ">
						Login
					</Link>
				</span>
			</div>
			{isCorrectOtp && <RegisterForm onSubmit={handleRegister} email={email} />}
			{!isCorrectOtp && <EmailForm onSubmit={handleSendOtp} />}
			{email && !isCorrectOtp && <OtpForm onSubmit={handleSubmitOtp} />}
		</div>
	);
}

export default RegisterPage;
