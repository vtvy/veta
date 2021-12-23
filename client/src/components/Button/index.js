import React from 'react';

function Button(props) {
	return (
		<button
			type={props.type || 'button'}
			className={`bg-indigo-600 text-white 
      ${props.rounded || 'rounded-[2rem]'} ${
				props.shadow || 'shadow-lg shadow-indigo-500/50'
			}
      py-2 px-4 flex justify-center items-center ${props.w} ${
				props.h
			} cursor-pointer hover:bg-indigo-700 ${props.custom}`}
		>
			{props.children}
		</button>
	);
}

export default Button;
