import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';

function NavbarMenu({ user, onLogOut }) {
	return (
		<div className="w-[27.4rem] right-0 -bottom-2 rounded-2xl translate-y-full h-96 bg-slate-100  shadow-xl absolute cursor-default overflow-hidden border border-solid border-slate-200">
			<ul className="flex w-full flex-col">
				<li className="flex w-full p-2 items-center border-b border-solid ">
					<div className="flex w-full p-2 cursor-pointer rounded-lg hover:bg-blue-200">
						<div className="flex-1">
							<Avatar avatar={user.avatar} />
						</div>
						<div className="flex flex-col ml-4 ">
							<span className=" text-2xl font-semibold">
								{user.firstName + ' ' + user.lastName}
							</span>
							<span className="text-lg">{user.email}</span>
						</div>
					</div>
				</li>
				<li className="flex w-full p-2 items-center">
					<div className="flex items-center text-3xl w-full p-2 cursor-pointer rounded-lg hover:bg-blue-200">
						<i class="fas fa-cog w-12"></i>
						<span className=" text-2xl">My account</span>
					</div>
				</li>
				<li className="flex w-full p-2 items-center">
					<div className="flex items-center text-3xl w-full p-2 cursor-pointer rounded-lg hover:bg-blue-200">
						<i className="fas fa-question-circle w-12"></i>
						<span className=" text-2xl">Help & support</span>
					</div>
				</li>
				<li className="flex w-full p-2 items-center">
					<div className="flex items-center text-3xl w-full p-2 cursor-pointer rounded-lg hover:bg-blue-200">
						<i class="fas fa-moon w-12"></i>
						<span className=" text-2xl">Dark mode</span>
					</div>
				</li>
				<li className="flex w-full p-2 items-center">
					<Link
						to="/login"
						className="flex items-center text-3xl w-full p-2 cursor-pointer rounded-lg hover:bg-blue-200"
						onClick={onLogOut}
					>
						<i class="fas fa-sign-out-alt w-12"></i>
						<span className=" text-2xl">Log Out</span>
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default NavbarMenu;
