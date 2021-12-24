import React from 'react';

function Avatar({ avatar }) {
	return (
		<div className="w-16 h-16 rounded-[50%] bg-indigo-600   flex items-center justify-center overflow-hidden">
			<img src={avatar} alt="" className="object-cover w-full h-full" />
		</div>
	);
}

export default Avatar;
