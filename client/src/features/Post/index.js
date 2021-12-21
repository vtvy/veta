import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../components/Avatar';
import Box from '../../components/Box';
import AddEditPost from './Pages/AddEditPost';

function Post() {
	const [isAddEditPost, setIsAddEditPost] = useState(false);
	const userAvatar = useSelector((state) => state.user.current.avatar);

	return (
		<div>
			{isAddEditPost ? (
				<AddEditPost setIsAddEditPost={setIsAddEditPost} />
			) : (
				<Box width="w-full">
					<div
						className=" flex items-center cursor-pointer "
						onClick={() => setIsAddEditPost(true)}
					>
						<Avatar avatar={userAvatar} />
						<div className="ml-4 h-12 bg-slate-200 rounded-2xl p-4 flex items-center leading-[3rem]">
							Hey You!!! do something!
						</div>
					</div>
				</Box>
			)}
		</div>
	);
}

export default Post;
