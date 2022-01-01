import React from 'react';
import ErrorMessage from '../../features/Auth/components/ErrorMessage';

function InputField(props) {
	return (
		<div className="flex flex-col">
			<label className="text-base font-bold text-gray-600 mb-1" htmlFor="email">
				{props.label}
			</label>
			<input
				className="border w-full rounded-[2rem] bg-white p-4 outline-none focus:border-indigo-600"
				type={props.type}
				name={props.name}
				id={props.name}
				placeholder={`${props.label}`}
				{...props.register(`${props.name}`)}
			/>
			{props.error ? <ErrorMessage message={props.error.message} /> : ''}
		</div>
	);
}

export default InputField;
