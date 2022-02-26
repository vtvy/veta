import React from 'react';
import { useSelector } from 'react-redux';
import SearchBar from '../../Search/SearchBar';
import ChannelList from './ChannelList';

function SidebarLeft({ socket }) {
	const onSubmit = (data) => {
		console.log(data);
	};
	const user = useSelector((state) => state.user.current);
	return (
		<div className="h-full w-1/4 bg-white dark:bg-indigo-950 shadow-lg border-r dark:border-slate-700 p-4">
			<div className="h-[6rem] py-4 flex items-center  ">
				<span className="text-4xl">Chats</span>
			</div>
			<SearchBar onSubmit={onSubmit} />
			<ChannelList socket={socket} />
		</div>
	);
}

export default SidebarLeft;
