import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../components/Avatar';
import Box from '../../components/Box';

function QuickViewUser() {
	const user = useSelector((state) => state.user.current);
	return (
		<div>
			<Box width="w-full" height="h-28">
				<div className="flex items-center mx-4">
					<Avatar avatar={user.avatar} />
					<div className="flex flex-col ml-8">
						<span className="font-semibold">
							{user.firstName + ' ' + user.lastName}
						</span>
						<span className="text-xl">{user.email}</span>
					</div>
				</div>
			</Box>
		</div>
	);
}

export default QuickViewUser;
