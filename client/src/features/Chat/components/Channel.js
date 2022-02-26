import React from 'react';
import { useSelector } from 'react-redux';
import QuickViewUser from '../../../components/QuickViewUser';

function Channel({ user }) {
	return (
		<div>
			<QuickViewUser user={user} linkTo={`/chat/${user._id}`} />
			<div className="opacity-60">newest chat</div>
		</div>
	);
}

export default Channel;
