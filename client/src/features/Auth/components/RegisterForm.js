import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ImgField from './ImgField';
import ErrorMessage from './ErrorMessage';

const schema = yup.object().shape({
	firstName: yup.string().required('First Name is a required field'),
	lastName: yup.string().required('Last Name is a required field'),
	password: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.max(20)
		.required(),
	confirmPassword: yup
		.string()
		.oneOf(
			[yup.ref('password'), null],
			'Password and confirm password does not match'
		),
	birthDate: yup
		.date()
		.max(new Date(), 'Are you a time traveler? Please Enter Valid BirthDay')
		.required(),
});

function RegisterForm({ onSubmit }) {
	const [isDefault, setIsDefault] = useState(true);
	const [file, setFile] = useState();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmitHandler = async (data) => {
		console.log(file);
		console.log(isDefault);
		const formData = new FormData();
		formData.append('firstName', data.firstName);
		formData.append('lastName', data.lastName);
		formData.append('password', data.password);
		formData.append('isDefault', isDefault);
		formData.append('birthDate', data.birthDate);
		formData.append('avatar', file);
		onSubmit(formData);
	};

	return (
		<form
			className={` w-xl h-full flex flex-col  relative bg-white transition-all duration-[0.25s] max-w-xl w-full  self-start shadow rounded-lg p-10 space-y-6 `}
			encType="multipart/form-data"
			onSubmit={handleSubmit(onSubmitHandler)}
		>
			<ImgField setIsDefault={setIsDefault} setFile={setFile} />
			<div className="flex w-full justify-between gap-x-4">
				<div className="flex flex-col">
					<label
						className="text-base font-bold text-gray-600 mb-1"
						htmlFor="firstName"
					>
						First Name
					</label>
					<input
						className="border rounded-md  w-full bg-white px-6 py-4"
						type="text"
						name="firstName"
						placeholder="First Name"
						{...register('firstName')}
					/>

					{errors.firstName ? (
						<ErrorMessage message={errors.firstName.message} />
					) : (
						''
					)}
				</div>
				<div className="flex flex-col">
					<label
						className="text-base font-bold text-gray-600 mb-1"
						htmlFor="lastName"
					>
						Last Name
					</label>
					<input
						className="border rounded-md w-full bg-white px-6 py-4"
						type="text"
						name="lastName"
						placeholder="Last Name"
						{...register('lastName')}
					/>
					{errors.lastName ? (
						<ErrorMessage message={errors.lastName.message} />
					) : (
						''
					)}
				</div>
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
					placeholder="Password"
					{...register('password')}
				/>
				{errors.password ? (
					<ErrorMessage message={errors.password.message} />
				) : (
					''
				)}
			</div>
			<div className="flex flex-col">
				<label
					className="text-base font-bold text-gray-600 mb-1"
					htmlFor="confirmPassword"
				>
					Confirm Password
				</label>
				<input
					className="border rounded-md bg-white px-6 py-4"
					type="password"
					name="conFirmPassword"
					placeholder="Password"
					{...register('confirmPassword')}
				/>
				{errors.confirmPassword ? (
					<ErrorMessage message={errors.confirmPassword.message} />
				) : (
					''
				)}
			</div>
			<div className="flex flex-col">
				<label
					className="text-base font-bold text-gray-600 mb-1"
					htmlFor="password"
				>
					Date of Birth
				</label>
				<input
					className="border rounded-md bg-white px-6 py-4"
					type="date"
					name="birtDate"
					{...register('birthDate')}
				/>
				{errors.birthDate ? (
					<ErrorMessage message={errors.birthDate.message} />
				) : (
					''
				)}
			</div>

			<div>
				<button className="w-full bg-indigo-600 text-white rounded-md p-4">
					Register
				</button>
			</div>
		</form>
	);
}

export default RegisterForm;
