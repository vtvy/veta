import React from 'react';
import CloudImg from '../../features/Post/components/CloudImg';

function Avatar({ size, avatar, custom }) {
	return (
		<div
			className={`${
				size || 'w-16 h-16'
			} rounded-[50%] bg-indigo-600   flex items-center justify-center overflow-hidden ${
				custom || ''
			}`}
		>
			<CloudImg publicId={avatar} />
		</div>
	);
}

export default Avatar;
