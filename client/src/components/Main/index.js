import React from 'react';
import MainContainer from './MainCenter';
import SidebarLeft from './SideBarLeft';
import SidebarRight from './SideBarRight';

function Container({ type }) {
	return (
		<div className="flex flex-1 w-full h-full p-12">
			<SidebarLeft />
			<MainContainer type={type} />
			<SidebarRight />
		</div>
	);
}

export default Container;
