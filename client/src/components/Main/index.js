import React from 'react';
import MainContainer from './MainCenter';
import SidebarLeft from './SideBarLeft';
import SidebarRight from './SideBarRight';

function Container({ type }) {
	return (
		<div className="flex w-full h-screen justify-between px-12">
			<SidebarLeft />
			<MainContainer type={type} />
			<SidebarRight />
		</div>
	);
}

export default Container;
