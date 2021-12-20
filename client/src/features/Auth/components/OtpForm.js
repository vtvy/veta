import React, { useState } from 'react';

function OtpForm({ otpSubmit }) {
	const [inputValue, setInputValue] = useState('');
	const handleSubmit = () => {
		otpSubmit(inputValue);
	};
	return (
		<div>
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<button onClick={handleSubmit}>Confirm</button>
		</div>
	);
}

export default OtpForm;
