import React from 'react';
import Home from '../../../features/Home';

function MainContainer({ type }) {
	return <div className="flex-1 mx-12 ">{type === 'home' && <Home />}</div>;
}

export default MainContainer;
