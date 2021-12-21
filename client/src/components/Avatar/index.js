import React from 'react';

function Avatar({ avatar }) {
	return (
		<div className="w-16 h-16 rounded-[50%] bg-black flex items-center justify-center">
			<img src={avatar} alt="" className="object-cover w-full h-full" />
		</div>
	);
}

export default Avatar;
