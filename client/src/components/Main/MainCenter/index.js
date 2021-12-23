import React from 'react';
import Home from '../../../features/Home';

function MainContainer({ type }) {
	return (
		<div className="flex flex-1 h-full z-30 w-2/4 mx-12">
			{type === 'home' && <Home />}
		</div>
	);
}

export default MainContainer;
