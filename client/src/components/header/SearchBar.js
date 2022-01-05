import React from 'react';

function SearchBar() {
	return (
		<div className="w-[48.2rem] px-4 py-3 rounded-lg bg-[#DCF0FF]  flex items-center">
			<input
				type="text"
				className="appearance-none outline-none w-full bg-[#DCF0FF] font-light"
				placeholder="Search here..."
			/>
			<i className="fas fa-search font-light text-blue-500 cursor-pointer"></i>
		</div>
	);
}

export default SearchBar;
