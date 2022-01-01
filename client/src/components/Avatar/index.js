import React from 'react';
import convertNameImgToPath from '../../myFunction/convertNameImgToPath';

function Avatar({ size, avatar }) {
	return (
		<div
			className={`${
				size || 'w-16 h-16'
			} rounded-[50%] bg-indigo-600   flex items-center justify-center overflow-hidden`}
		>
			<img
				src={convertNameImgToPath(avatar, 'avatars')}
				alt=""
				className="object-cover w-full h-full"
			/>
		</div>
	);
}

export default Avatar;
