import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../components/Avatar';
import Box from '../../components/Box';
import AddEditPost from './Pages/AddEditPost';

function Post() {
	const [isAddEditPost, setIsAddEditPost] = useState(false);
	const userAvatar = useSelector((state) => state.user.current.avatar);

	return (
		<div className="">
			{isAddEditPost ? (
				<AddEditPost setIsAddEditPost={setIsAddEditPost} />
			) : (
				<Box width="w-full">
					<div
						className=" flex items-center cursor-pointer "
						onClick={() => setIsAddEditPost(true)}
					>
						<Avatar avatar={userAvatar} />
						<Box custom="bg-[rgba(0,0,0,0.1)] w-full mx-4 flex-1 hover:bg-[rgba(0,0,0,0.2)]">
							Hey You!!! do something!
						</Box>
					</div>
				</Box>
			)}
		</div>
	);
}

export default Post;
