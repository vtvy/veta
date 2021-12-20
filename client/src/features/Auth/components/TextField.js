import React from 'react';

function TextField({ register, label }) {
	return (
		<input
			className="h-16 w-full flex flex-col rounded-xl p-4"
			name={label}
			type="text"
			placeholder={label}
			{...register(label)}
		/>
	);
}
export default TextField;
