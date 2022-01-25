import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../../components/Avatar';

function ProfileInfo() {
	const user = useSelector((state) => state.user.current);
	const socialInfo = [
		{
			title: 'Post',
			number: 165,
		},
		{
			title: 'Follower',
			number: 651,
		},
		{
			title: 'Following',
			number: 516,
		},
	];
	return (
		<div className="w-full h-[33.4rem] bg-white dark:bg-indigo-950 rounded-lg flex flex-col overflow-hidden">
			<div className="h-[24.6rem] w-full bg-blue-400 rounded-lg"></div>
			<div className="w-full relative bg-white dark:bg-indigo-950 flex-1 flex items-center p-4">
				<div className="absolute -top-full left-1/2 -translate-x-1/2 flex flex-col items-center ">
					<Avatar size="h-48 w-48 mb-4" avatar={user.avatar} />
					<span className="text-4xl dark:text-textColorDark">
						{user.firstName + ' ' + user.lastName}
					</span>
				</div>
				<ul className="flex ml-auto space-x-6">
					{socialInfo.map((item) => (
						<li className="flex flex-col items-center" key={item.title}>
							<span className="dark:text-white">{item.title}</span>
							<span className="text-slate-500 ">{item.number}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default ProfileInfo;
