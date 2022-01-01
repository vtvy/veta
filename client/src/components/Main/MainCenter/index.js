import React from 'react';
import Home from '../../../features/Home';

function MainContainer({ type }) {
	return (
		<div className="flex h-full z-10 overflow-y-scroll w-[68rem] pt-32">
			{type === 'home' && <Home />}
		</div>
	);
}

export default MainContainer;
