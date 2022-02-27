import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useParams } from 'react-router-dom';
import QuickViewUser from '../../../components/QuickViewUser';
import ChannelContent from './ChannelContent';
import ChatForm from './ChatForm';

function ChatMain({ socket }) {
	const params = useParams();
	const user = useSelector((state) => state.user.current);
	const [channel, setChannel] = useState({
		_id: params.id + user._id,
		name: 'Channel1',
		listMessage: [],
	});
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
		const idArray = [params.id, user._id].sort();
		const channelID = idArray.join('');

		setChannel({
			_id: channelID,
			name: 'Channel1',
			listMessage: [],
		});
	}, [params.id, user]);
	useEffect(() => {
		var mounted = true;
		socket.emit('join_channel', channel._id);
		return () => {
			mounted = false;
		};
	}, [socket, channel]);

	useEffect(() => {
		socket.on('receive_message', (data) => {
			setListMessage((list) => [...list, data]);
		});
		return () => {
			socket.disconnect();
		};
	}, [socket]);

	return (
		<div className="w-3/4 flex flex-col bg-white dark:bg-indigo-1050 ">
			<div className="h-24 flex items-center p-4 dark:bg-indigo-950 shadow-lg">
				<QuickViewUser user={user} />
			</div>
			<div className="h-[56rem] bg-slate-400 dark:bg-indigo-850 w-full overflow-y-scroll flex flex-col space-y-8 overflow-hidden p-4 scrollbar">
				<ChannelContent channelContent={listMessage} />
			</div>
			<div className="flex-1 justify-self-end flex justify-center items-center dark:bg-indigo-950">
				<ChatForm onSubmit={sendMessage} />
			</div>
		</div>
	);
}

export default ChatMain;
