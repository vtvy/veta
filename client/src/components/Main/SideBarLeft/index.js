import React from 'react';
import Menu from '../../../features/Menu';
import QuickViewUser from '../../../features/QuickViewUser';
import Box from '../../Box';

function SidebarLeft() {
	return (
		<div className="w-1/4 h-full flex flex-col gap-y-4 ">
			<QuickViewUser />
			<Menu />
			<Box width="w-full" height="h-96"></Box>
		</div>
	);
}

export default SidebarLeft;
