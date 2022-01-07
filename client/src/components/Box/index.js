import React from 'react';

function Box({
	children,
	width,
	height,
	flex,
	flexCol,
	p,
	bg,
	custom,
	rounded,
}) {
	return (
		<div
			className={`${custom} ${rounded || 'rounded-lg'} overflow-hidden ${
				bg || 'bg-white shadow'
			} ${
				p || 'p-4'
			} inline-block ${flex} ${flexCol} ${width} ${height} max-w-full `}
		>
			{children}
		</div>
	);
}

export default Box;
