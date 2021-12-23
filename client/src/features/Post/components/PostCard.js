import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../../components/Avatar';
import Box from '../../../components/Box';
import Modal from '../../../components/Modal';
import PostForm from './PostForm';
import PostMenu from './PostMenu';

function PostCard({ post }) {
	const user = useSelector((state) => state.user.current);
	const [isOpenPostMenu, setIsOpenPostMenu] = useState(false);
	const [isEditPost, setIsEditPost] = useState(false);
	const handleEditPost = (data) => {
		console.log(data.get('postText'), data.get('postImage'));
	};
	return (
		<>
			<Box height="min-h-[25rem]" bg="bg-slate-200 shadow-lg">
				<div className="flex flex-1 mb-6">
					<div className="flex flex-1">
						<Avatar avatar={user.avatar} />
						<div className="flex flex-col ml-4">
							<span className="font-semibold">
								{user.firstName + ' ' + user.lastName}
							</span>
							<span className="text-xl text-slate-700">12h trước</span>
						</div>
					</div>
					<div
						className="justify-self-end relative cursor-pointer"
						onClick={() => setIsOpenPostMenu(!isOpenPostMenu)}
					>
						<Box>...</Box>
						{isOpenPostMenu && <PostMenu setIsEditPost={setIsEditPost} />}
					</div>
				</div>
				<div className="">
					<Box p="py-2 px-4">
						<span className="text-indigo-600">{post.title}</span>
					</Box>
				</div>
				<Box width="w-full" height="min-h-[18rem]">
					{post.postText}
				</Box>
				<div className="flex justify-between mx-4">
					<span>
						<span className="text-indigo-600 font-semibold">2</span> Likes
					</span>
					<span>
						<span className="text-indigo-600 font-semibold">2</span> Comments
					</span>
				</div>
				<div className="flex flex-1 justify-between pt-4 mt-4 border-t border-solid">
					<div className="cursor-pointer flex-1 text-center rounded-lg hover:bg-slate-400">
						<i className="fas fa-thumbs-up text-blue-700"></i> Like
					</div>
					<div className="cursor-pointer flex-1 text-center rounded-lg hover:bg-slate-400">
						<i className="far fa-comment-alt "></i> Comment
					</div>
				</div>
			</Box>
			{isEditPost && (
				<Modal setIsOpen={setIsEditPost}>
					<PostForm onSubmit={handleEditPost} initialData={post} />
				</Modal>
			)}
		</>
	);
}

export default PostCard;
