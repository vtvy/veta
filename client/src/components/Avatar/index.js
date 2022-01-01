import React from 'react';
import CloudImg from '../../features/Post/components/CloundImg';

function Avatar({ size, avatar }) {
	return (
		<div
			className={`${
				size || 'w-16 h-16'
			} rounded-[50%] bg-indigo-600   flex items-center justify-center overflow-hidden`}
		>
			<CloudImg publicId={avatar} />
		</div>
	);
}

export default Avatar;
