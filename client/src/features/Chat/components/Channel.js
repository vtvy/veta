import React from 'react';
import { useSelector } from 'react-redux';
import QuickViewUser from '../../../components/QuickViewUser';

function Channel({ user }) {
	const myUser = useSelector((state) => state.user.current);

	return (
		<div>
			<QuickViewUser user={user} linkTo={`channel/${user._id}`} />
			<div className="opacity-60">newest chat</div>
		</div>
	);
}

export default Channel;
