import React from 'react';

function CardSection({ children, title }) {
	return (
		<div className="w-full bg-white rounded-lg flex flex-col">
			<div className="py-6 px-4 border-b border-solid border-slate-200 capitalize flex items-center text-[2rem]">
				{title}
			</div>
			<div className="p-4"> {children}</div>
		</div>
	);
}

export default CardSection;
