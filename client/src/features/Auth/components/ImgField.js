import React from 'react';
import Avatars from '../../../assets/images/avatars';

function ImgField({ onSelectAvt }) {
	const handleOnclick = (avatar) => {
		onSelectAvt(avatar);
	};
	return (
		<div className="flex w-[36rem] h-32 overflow-scroll overflow-y-hidden ">
			{Avatars.map((avatar) => (
				<img
					className="w-32 cursor-pointer"
					src={avatar}
					alt=""
					onClick={() => onSelectAvt(avatar)}
				/>
			))}
		</div>
	);
}

export default ImgField;
