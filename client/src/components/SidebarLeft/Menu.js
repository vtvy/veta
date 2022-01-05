import React from 'react';
import { NavLink } from 'react-router-dom';
import menuItem from '../../constants/menuItem';

function Menu({ toggleMenu }) {
	return (
		<div className="w-full flex flex-col">
			{menuItem.map((item) => (
				<NavLink
					to={item.path}
					key={item.title}
					className={`h-20 flex items-center rounded-lg border-l-4 transition-all duration-[0.15s] border-solid text-gray-600 border-transparent -mx-4 text-3xl  hover:text-indigo-600 group`}
				>
					<i className={`${item.icon} w-10 mx-5`} />{' '}
					<span
						className={`font-normal group-hover:text-indigo-600 ${
							toggleMenu ? 'inline-block' : 'hidden'
						}`}
					>
						{item.title}
					</span>
				</NavLink>
			))}
		</div>
	);
}

export default Menu;
