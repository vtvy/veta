import React from 'react';

function Box({ children, width, height, flex, flexCol, p, bg }) {
	return (
		<div
			className={`rounded-[2rem] overflow-hidden ${bg || 'bg-white shadow'} ${
				p || 'p-4'
			} inline-block ${flex} ${flexCol} ${width} ${height}`}
		>
			{children}
		</div>
	);
}

export default Box;
