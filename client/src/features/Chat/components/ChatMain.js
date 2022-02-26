import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useParams } from 'react-router-dom';
import QuickViewUser from '../../../components/QuickViewUser';
import ChannelContent from './ChannelContent';
import ChatForm from './ChatForm';

function ChatMain({ socket }) {
	const channel = {
		_id: '123',
		name: 'Channel1',
		listMessage: [],
	};
	const user = useSelector((state) => state.user.current);
	const params = useParams();
	const [listMessage, setListMessage] = useState([]);
	const sendMessage = async (data) => {
		const sendData = {
			channel: channel._id,
			data: {
				_id: 123,
				user,
				messageText: data.get('messageText'),
				messageImage: '',
				date: new Date(),
			},
		};

		await socket.emit('send_message', sendData);
	};
	useEffect(() => {
		socket.on('receive_message', (data) => {
			setListMessage((list) => [...list, data]);
		});
	}, [socket]);

	return (
		<div className="w-3/4 flex flex-col bg-white dark:bg-indigo-1050 ">
			<div className="h-24 flex items-center p-4 dark:bg-indigo-950 shadow-lg">
				<QuickViewUser user={user} />
			</div>
			<div className="h-[56rem] bg-slate-400 w-full overflow-y-scroll flex flex-col space-y-8 overflow-hidden p-4 scrollbar">
				{!Object.values(params)[0] ? (
					<div className="h-[65rem] flex justify-center items-center">
						Join a channel to chat with your friends
					</div>
				) : (
					<Routes>
						<Route
							path="/channel/:id"
							element={<ChannelContent channelContent={listMessage} />}
						/>
					</Routes>
				)}
			</div>
			<div className=" flex-1 justify-self-end shadow-lg flex justify-center items-center">
				<ChatForm onSubmit={sendMessage} />
			</div>
		</div>
	);
}

export default ChatMain;
