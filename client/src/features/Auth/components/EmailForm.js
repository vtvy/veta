import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../../../components/Button';
import InputField from '../../../components/InputFile';
const schema = yup.object().shape({
	email: yup.string().email().required(),
});

function EmailForm({ onSubmit }) {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema),
	});
	return (
		<div>
			<form
				className={`w-full h-full flex flex-col p-8 space-y-8 pb-10 relative rounded-[2rem] bg-white transition-all duration-[0.25s]
				`}
				onSubmit={handleSubmit(onSubmit)}
			>
				<InputField
					label=" Email Address "
					type="email"
					name="email"
					register={register}
					error={errors.email}
				/>

				<div>
					<Button w={'w-full'} p={'p-4'} isValid={isValid} type="submit">
						Get OTP
					</Button>
				</div>
			</form>
		</div>
	);
}

export default EmailForm;
