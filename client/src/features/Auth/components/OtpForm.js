import React, { useState } from 'react';

function OtpForm({ onSubmit }) {
	const [inputValue, setInputValue] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(inputValue);
	};

	return (
		<form
			className={`absolute left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center
				`}
			onSubmit={handleSubmit}
		>
			<div className="max-w-lg w-full  bg-white shadow rounded-lg p-10 space-y-6">
				<div className="flex flex-col">
					<label
						className="text-2xl text-center font-bold text-gray-600 mb-1"
						htmlFor="email"
					>
						Verification code
					</label>
					<input
						className="border rounded-md bg-white px-6 py-4"
						type="text"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
				</div>
				<div>
					<button
						className="w-full bg-indigo-600 text-white rounded-md p-4"
						type="submit"
					>
						Confirm
					</button>
				</div>
			</div>
		</form>
	);
}

export default OtpForm;
