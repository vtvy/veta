import React from 'react';
import Box from '../../Box';

function SidebarRight() {
	return (
		<div className="w-1/4 h-full">
			<div className="fixed w-1/4 flex pr-8">
				<Box custom="h-96 w-full"></Box>
			</div>
		</div>
	);
}

export default SidebarRight;
