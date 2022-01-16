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
import ReactionBar from './ReactionBar';

function PostCard({ post }) {
	const user = useSelector((state) => state.user.current);
	const [isEditPost, setIsEditPost] = useState(false);
	const [isShowComment, setIsShowComment] = useState(false);
	const [refInside, isInside, setIsInside] = useClickOutside(false);
	const [isShowReactionBar, setIsShowReactionBar] = useState(false);
	const [likes, setLikes] = useState(2);

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
	const handleHoverLike = () => {
		setIsShowReactionBar(true);
	};

	const { differenceNumber, timeUnit } = getDifferenceTime(post.updatedAt);
	return (
		<>
			<Box height="w-full" bg="bg-white shadow-lg" p="p-6">
				<div className="flex flex-1 mb-6 items-center">
					<div className="flex flex-1">
						<Avatar avatar={user.avatar} />
						<div className="flex flex-col ml-4">
							<span className="font-semibold dark:text-slate-300">
								{user.firstName + ' ' + user.lastName}
							</span>
							<span className="text-xl text-slate-700 dark:text-textColorDark">{`${differenceNumber} ${timeUnit} ago`}</span>
						</div>
					</div>
					<div
						ref={refInside}
						className="justify-self-end relative cursor-pointer"
						onClick={() => setIsInside(!isInside)}
					>
						<div className="] p-2  transition-all hover:bg-slate-200 flex justify-center items-center rounded-full dark:text-textColorDark">
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
				<Box width="w-full" custom="p-0 bg-indigo-600 dark:text-textColorDark">
					{post.postText && <div className="p-8">{post.postText}</div>}
					{post.postImage && (
						<div className="w-full max-h-[36rem] overflow-hidden bg-indigo-300">
							<CloudImg publicId={post.postImage} />
						</div>
					)}
				</Box>

				<div className="flex justify-between mb-[0.2rem]">
					<span className="text-slate-600 dark:text-textColorDark">
						<span className="text-indigo-600">{likes}</span> Likes
					</span>
					<span
						onClick={() => setIsShowComment(!isShowComment)}
						className="hover:underline decoration-[0.5px] cursor-pointer text-slate-600 dark:text-textColorDark"
					>
						<span className="text-indigo-600 ">2</span> Comments
					</span>
				</div>
				<div className="flex flex-1 justify-between pt-2  border-t border-solid border-slate-300">
					<div className="relative flex-1">
						<div
							className="cursor-pointer flex-1 text-center rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-indigo-1050 relative dark:text-textColorDark"
							onMouseEnter={handleHoverLike}
							onMouseLeave={() => setIsShowReactionBar(false)}
						>
							<i className="fas fa-thumbs-up text-blue-700"></i> Like
						</div>
						{isShowReactionBar && (
							<div
								className="absolute top-0 -translate-y-full left-1/2 -translate-x-1/2 "
								onClick={() => setIsShowReactionBar(false)}
								onMouseEnter={() => setIsShowReactionBar(true)}
								onMouseLeave={() => setIsShowReactionBar(false)}
							>
								<ReactionBar />
							</div>
						)}
					</div>

					<div
						className="cursor-pointer flex-1 text-center rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-indigo-1050 relative dark:text-textColorDark"
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
