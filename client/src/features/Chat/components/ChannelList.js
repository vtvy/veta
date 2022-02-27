import React from 'react';
import { useSelector } from 'react-redux';
import Channel from './Channel';
const listChannel = [
	{
		_id: '6219b9387b15aebb1c1257ed',
		email: 'nhatyugioh@gmail.com',
		name: 'Nhat Nguyen',
		avatar: 'veta/avatars/kfr7oli3iajat02jljjn',
		followers: Array(1),
	},
	{
		_id: '61d030167da9b948fafdba19',
		email: 'nguyenminhnhat301101@gmail.com',
		avatar: 'veta/avatars/kavmrmwq3tmylxewu5xt',
		name: 'Minh Nhat',
		followers: Array(1),
	},
];

function ListChat({ socket }) {
	const user = useSelector((state) => state.user.current);

	// const joinChannel = (data) => {
	// 	const channelID = data._id + user._id;
	// 	socket.emit('join_channel', '123');
	// };

	return (
		<div className="py-4 max-h-[68.4rem]">
			<span className="dark:text-textColorDark text-3xl ">Recently Chat</span>
			<div className="flex flex-col mt-4 -mx-4 max-h-[56rem] space-y-4 overflow-y-scroll scrollbar px-4">
				{listChannel &&
					listChannel.map((channel, index) => (
						<div
							// onClick={() => joinChannel(channel)}
							key={index}
							className="flex-1 p-4 bg-slate-100 dark:bg-indigo-850 rounded-lg hover:bg-slate-400 dark:hover:opacity-70 hover:pointer "
						>
							<Channel user={channel} />
						</div>
					))}
			</div>
		</div>
	);
}

export default ListChat;
