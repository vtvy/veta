import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import postApi from '../../../api/postApi';
import Avatar from '../../../components/Avatar';
import Box from '../../../components/Box';
import Modal from '../../../components/Modal';
import getDifferenceTime from '../../../myFunction/getDifferenceTime';
import { deletePost, updatePost } from '../postSlice';
import PostComments from './PostComments';
import PostForm from './PostForm';
import PostMenu from './PostMenu';
import CloudImg from './CloundImg';

function PostCard({ post }) {
	const user = useSelector((state) => state.user.current);
	const [isOpenPostMenu, setIsOpenPostMenu] = useState(false);
	const [isEditPost, setIsEditPost] = useState(false);
	const [isShowComment, setIsShowComment] = useState(false);
	const email = useSelector((state) => state.user.current.email);
	const dispatch = useDispatch();
	//edit post
	const handleEditPost = async (data) => {
		console.log(post.postText);
		const isImageChange = !(data.get('postImage') === post.postImage);
		console.log(isImageChange);

		if (!isImageChange && data.get('postText') === post.postText) {
			setIsEditPost(false);
		} else {
			try {
				data.append('email', email);
				data.append('isImageChange', isImageChange);
				const res = await postApi.updatePostById(post._id, data);
				if (res.data.success) {
					const updatedPost = res.data.updatedPost;
					const action = updatePost(updatedPost);
					dispatch(action);
					setIsEditPost(false);
				}
			} catch (error) {
				alert(error);
			}
		}
	};
	//delete post
	const handleDeletePost = async () => {
		try {
			const res = await postApi.deletePostById(post._id);
			if (res.data.success) {
				const action = deletePost(post._id);
				dispatch(action);
			}
		} catch (error) {
			alert(error);
		}
	};
	//create comment

	const { differenceNumber, timeUnit } = getDifferenceTime(post.updatedAt);
	return (
		<>
			<Box height="min-h-[25rem] w-full" bg="bg-slate-200 shadow-lg" p="p-6">
				<div className="flex flex-1 mb-6">
					<div className="flex flex-1">
						<Avatar avatar={user.avatar} />
						<div className="flex flex-col ml-4">
							<span className="font-semibold">
								{user.firstName + ' ' + user.lastName}
							</span>
							<span className="text-xl text-slate-700">{`${differenceNumber} ${timeUnit} ago`}</span>
						</div>
					</div>
					<div
						className="justify-self-end relative cursor-pointer"
						onClick={() => setIsOpenPostMenu(!isOpenPostMenu)}
					>
						<Box>...</Box>
						{isOpenPostMenu && (
							<PostMenu
								setIsEditPost={setIsEditPost}
								onDelete={handleDeletePost}
							/>
						)}
					</div>
				</div>
				<Box width="w-full" height="min-h-[10rem]" custom="p-0 ">
					<div className="p-8">{post.postText}</div>
					{post.postImage && (
						<div className="w-full max-h-[36rem] rounded-[2rem] overflow-hidden bg-indigo-300">
							<CloudImg publicId={post.postImage} />
						</div>
					)}
				</Box>

				<div className="flex justify-between mx-4">
					<span>
						<span className="text-indigo-600 font-semibold">2</span> Likes
					</span>
					<span
						onClick={() => setIsShowComment(!isShowComment)}
						className="hover:underline cursor-pointer"
					>
						<span className="text-indigo-600 font-semibold">2</span> Comments
					</span>
				</div>
				<div className="flex flex-1 justify-between pt-4 my-4 border-t border-solid">
					<div className="cursor-pointer flex-1 text-center rounded-lg hover:bg-slate-400">
						<i className="fas fa-thumbs-up text-blue-700"></i> Like
					</div>
					<div
						className="cursor-pointer flex-1 text-center rounded-lg hover:bg-slate-400"
						onClick={() => setIsShowComment(!isShowComment)}
					>
						<i className="far fa-comment-alt "></i> Comment
					</div>
				</div>
				{isShowComment && (
					<div className="border-t border-solid pt-4">
						<PostComments postId={post._id} />
					</div>
				)}
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
