import React from 'react';
import Menu from '../../../features/Menu';
import QuickViewUser from '../../../features/QuickViewUser';
import Box from '../../Box';

function SidebarLeft() {
	return (
		<div className="w-1/4 lg:flex hidden flex-col space-y-6 mr-12 pt-32 h-screen overflow-y-scroll s">
			<div className="h-screen w-[32rem] flex flex-col space-y-6">
				<QuickViewUser />
				<Menu />
				<Box width="w-full" height="h-96"></Box>
				<div className=""></div>
			</div>
		</div>
	);
}

export default SidebarLeft;
