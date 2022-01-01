import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../components/Avatar';
import Box from '../../components/Box';

function QuickViewUser() {
	const user = useSelector((state) => state.user.current);
	return (
		<div>
			<Box width="w-full">
				<div className="flex items-center mx-4">
					<div className="flex-shrink-0 mr-4">
						<Avatar avatar={user.avatar} />
					</div>
					<div className="flex flex-col ">
						<span className="font-bold">
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
