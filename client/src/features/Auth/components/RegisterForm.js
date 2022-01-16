import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ImgField from './ImgField';
import ErrorMessage from './ErrorMessage';
import InputField from '../../../components/InputFile';
import Button from '../../../components/Button';

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
		formState: { errors, isValid },
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema),
	});
	const onSubmitHandler = async (data) => {
		const formData = new FormData();
		formData.append('name', data.firstName + ' ' + data.lastName);
		formData.append('password', data.password);
		formData.append('isDefault', isDefault);
		formData.append('birthDate', data.birthDate);
		formData.append('avatar', file);
		onSubmit(formData);
	};

	return (
		<form
			className={` w-xl flex flex-col relative bg-white  max-w-xl w-full  self-start  p-y-10 space-y-6 `}
			encType="multipart/form-data"
			onSubmit={handleSubmit(onSubmitHandler)}
		>
			<ImgField setIsDefault={setIsDefault} setFile={setFile} />
			<div className="flex w-full justify-between gap-x-4">
				<InputField
					label="First Name"
					type="text"
					name="firstName"
					register={register}
					error={errors.firstName}
				/>
				<InputField
					label="Last Name"
					type="text"
					name="lastName"
					register={register}
					error={errors.lastName}
				/>
			</div>
			<InputField
				label="Password"
				type="password"
				name="password"
				placeholder="Password"
				register={register}
				error={errors.password}
			/>

			<InputField
				label="Confirm Password"
				type="password"
				name="confirmPassword"
				register={register}
				error={errors.confirmPassword}
			/>

			<InputField
				label=" Date of Birth"
				type="date"
				name="birthDate"
				register={register}
				error={errors.birthDate}
			/>
			<div>
				<Button w={'w-full'} p={'p-4'} isValid={isValid} type="submit">
					Register
				</Button>
			</div>
		</form>
	);
}

export default RegisterForm;
