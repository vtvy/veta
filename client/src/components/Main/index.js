import React from 'react';
import MainContainer from './MainCenter';
import SidebarLeft from './SideBarLeft';
import SidebarRight from './SideBarRight';

function Container({ type }) {
	return (
		<div className="flex w-full  p-12 justify-center mt-[5rem]">
			<SidebarLeft />
			<MainContainer type={type} />
			<SidebarRight />
		</div>
	);
}

export default Container;
