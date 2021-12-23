import React from 'react';
import Navbar from './Navbar';

function Header() {
	return (
		<div className="w-full h-20 z-30 bg-white fixed">
			<Navbar />
		</div>
	);
}

export default Header;
