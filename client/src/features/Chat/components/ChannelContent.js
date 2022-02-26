import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MessageView from './MessageView';

function ChannelContent({ channelContent }) {
	let params = useParams();
	const user = useSelector((state) => state.user.current);
	return (
		<>
			{channelContent &&
				channelContent.map((message, index) => (
					<MessageView
						message={message}
						key={index}
						isUser={user._id === message.user._id}
					/>
				))}
		</>
	);
}

export default ChannelContent;
