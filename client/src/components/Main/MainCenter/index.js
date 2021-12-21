import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../../../features/Home';
import Post from '../../../features/Post';

function MainContainer({ type }) {
	return <div className="flex-1 mx-12 ">{type === 'home' && <Home />}</div>;
}

export default MainContainer;
