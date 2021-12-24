import React from 'react';
import Menu from '../../../features/Menu';
import QuickViewUser from '../../../features/QuickViewUser';
import Box from '../../Box';

function SidebarLeft() {
	return (
		<div className="w-1/4 h-full">
			<div className="fixed w-1/4 flex flex-col gap-y-6 pr-[3rem]">
				<QuickViewUser />
				<Menu />
				<Box width="w-full" height="h-96"></Box>
			</div>
		</div>
	);
}

export default SidebarLeft;
