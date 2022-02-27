import React, { useContext } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import ChatMain from './components/ChatMain';
import SidebarLeft from './components/SidebarLeft';
import { SocketContext } from '../../App';

function Chat() {
	const params = useParams();
	const socket = useContext(SocketContext);

	return (
		<div className="w-full pb-8 max-h-[79.4rem] ">
			<div className="w-full flex h-full rounded-lg overflow-hidden">
				<SidebarLeft socket={socket} />
				{!Object.values(params)[0] ? (
					<div className="flex-1 flex justify-center items-center bg-indigo-850">
						<span className="text-4xl dark:text-white uppercase">
							Join a channel to chat with your friends
						</span>
					</div>
				) : (
					<Routes>
						<Route path="/:id" element={<ChatMain socket={socket} />} />
					</Routes>
				)}
			</div>
		</div>
	);
}

export default Chat;
