import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import postApi from '../../../api/postApi';
import { ModalContext } from '../../../App';
import Avatar from '../../../components/Avatar';
import Box from '../../../components/Box';
import useClickOutside from '../../../Hooks/useClickOutside';
import getDifferenceTime from '../../../myFunction/getDifferenceTime';
import { deletePost } from '../postSlice';
import CloudImg from './CloudImg';
import PostComments from './PostComments';
import PostMenu from './PostMenu';

function PostCard({ post }) {
	const user = useSelector((state) => state.user.current);
	const [isEditPost, setIsEditPost] = useState(false);
	const [isShowComment, setIsShowComment] = useState(false);
	const [refInside, isInside, setIsInside] = useClickOutside(false);

	const setModal = useContext(ModalContext);
	useEffect(() => {
		setModal({
			isOpen: isEditPost,
			type: 'post',
			setIsOpen: setIsEditPost,
			content: {
				type: 'edit',
				initialValue: post,
			},
		});
	}, [isEditPost]);
	const dispatch = useDispatch();
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
			<Box height="w-full" bg="bg-white shadow-lg" p="p-6">
				<div className="flex flex-1 mb-6 items-center">
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
						ref={refInside}
						className="justify-self-end relative cursor-pointer"
						onClick={() => setIsInside(!isInside)}
					>
						<div className="] p-2  transition-all hover:bg-slate-200 flex justify-center items-center rounded-full">
							<i className="fa fa-ellipsis-h"></i>
						</div>
						{isInside && (
							<PostMenu
								setIsEditPost={setIsEditPost}
								onDelete={handleDeletePost}
							/>
						)}
					</div>
				</div>
				<Box width="w-full" custom="p-0 bg-indigo-600">
					{post.postText && <div className="p-8">{post.postText}</div>}
					{post.postImage && (
						<div className="w-full max-h-[36rem] overflow-hidden bg-indigo-300">
							<CloudImg publicId={post.postImage} />
						</div>
					)}
				</Box>

				<div className="flex justify-between mb-[0.2rem]">
					<span className="text-slate-600">
						<span className="text-indigo-600">2</span> Likes
					</span>
					<span
						onClick={() => setIsShowComment(!isShowComment)}
						className="hover:underline decoration-[0.5px] cursor-pointer text-slate-600"
					>
						<span className="text-indigo-600 ">2</span> Comments
					</span>
				</div>
				<div className="flex flex-1 justify-between pt-2  border-t border-solid border-slate-300">
					<div className="cursor-pointer flex-1 text-center rounded-lg p-2 hover:bg-slate-200">
						<i className="fas fa-thumbs-up text-blue-700"></i> Like
					</div>
					<div
						className="cursor-pointer flex-1 text-center rounded-lg hover:bg-slate-200 p-2"
						onClick={() => setIsShowComment(!isShowComment)}
					>
						<i className="far fa-comment-alt  "></i> Comment
					</div>
				</div>
				{isShowComment && (
					<div className="border-t w-full border-solid border-slate-300 pt-4 mt-2">
						<PostComments postId={post._id} />
					</div>
				)}
			</Box>
		</>
	);
}

export default PostCard;
