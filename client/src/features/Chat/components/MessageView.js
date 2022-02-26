import React from 'react';
import Avatar from '../../../components/Avatar';

function MessageView({ message, isUser }) {
	return (
		<>
			{!isUser ? (
				<div className={`flex w-full self-start`}>
					<Avatar avatar={message.user.avatar} />
					<div className="p-4 mx-4 rounded-lg max-w-[50%] bg-white word-break: break-all">
						{message.messageText}
					</div>
				</div>
			) : (
				<div className="p-4 mx-4 bg-blue-300 rounded-lg max-w-[50%] self-end word-break: break-all">
					{message.messageText}
				</div>
			)}
		</>
	);
}

export default MessageView;
