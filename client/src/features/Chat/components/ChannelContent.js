import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import MessageView from './MessageView';

function ChannelContent({ channelContent }) {
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [channelContent]);
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
			<div ref={messagesEndRef}></div>
		</>
	);
}

export default ChannelContent;
