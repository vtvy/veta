import React from 'react';
import Box from '../../Box';

function SidebarRight() {
	return (
		<div className="sm:flex w-1/4 hidden ml-12  pt-32 ">
			<div className="h-full w-[32rem] right-0 items-end flex flex-col space-y-6">
				<Box width="w-full" height="h-96"></Box>
			</div>
		</div>
	);
}

export default SidebarRight;
