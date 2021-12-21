import React from 'react';

function Box({ children, width, height, flex, flexCol }) {
	return (
		<div
			className={`rounded-[2rem] overflow-hidden bg-white shadow p-4 inline-block ${flex} ${flexCol} ${width} ${height}`}
		>
			{children}
		</div>
	);
}

export default Box;
