import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import userApi from '../../../api/userApi';
import Avatar from '../../../components/Avatar';
import Box from '../../../components/Box';
import CommentForm from './CommentForm';
import CommentMenu from './CommentMenu';
import PostMenu from './PostMenu';

function Comment({
	rootComment,
	parentComment,
	replyComments,
	onClickReply,
	onEditComment,
	onDeleteComment,
	lastReplyComment,
}) {
	const [userComment, setUserComment] = useState(
		useSelector((state) => state.user.current)
	);
	const [isShowReplyComments, setIsShowReplyComments] = useState(false);
	const [isOpenCommentMenu, setIsOpenCommentMenu] = useState(false);
	const [idEditComment, setIdEditComment] = useState('');
	const [idTopZIndex, setIdTopZIndex] = useState('');

	// useEffect(() => {
	// 	const getUserComment = async () => {
	// 		try {
	// 			const res = await userApi.getUserById(parentComment.userID);
	// 			if (res.data.success) {
	// 				setUserComment(res.data.user);
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	};
	// 	getUserComment();
	// }, []);
	const handleClickReply = () => {
		onClickReply(rootComment.commentID, userComment.firstName);
		setIsShowReplyComments(true);
	};
	const handleOpenCommentMenu = () => {
		setIdTopZIndex(parentComment.commentID);
		setIsOpenCommentMenu(!isOpenCommentMenu);
	};

	const handleEditComment = (data) => {
		setIdEditComment('');
		onEditComment(data);
	};
	return (
		<div>
			{idEditComment === parentComment.commentID ? (
				<>
					<CommentForm
						onSubmit={handleEditComment}
						initialValue={parentComment}
						type={`editComment${parentComment.commentID}`}
					/>
					<span
						className="ml-20 text-xl cursor-pointer hover:text-indigo-600 "
						onClick={() => setIdEditComment('')}
					>
						Cancel
					</span>
				</>
			) : (
				<div
					className={`flex w-full relative ${
						idTopZIndex === parentComment.commentID ? 'z-50' : 'z-10'
					}`}
				>
					{rootComment.commentID === parentComment.commentID ? (
						<>
							{replyComments.length > 0 && isShowReplyComments && (
								<div className="w-10 h-[calc(100%_-_6rem)] left-[1.7rem]  border-l border-solid border-slate-400 translate-y-16 absolute  "></div>
							)}
						</>
					) : (
						<>
							{' '}
							{lastReplyComment?.commentID === parentComment.commentID && (
								<div className="-left-[0.3rem]  bg-slate-200 -translate-x-full w-20 top-0  h-[80%] absolute  "></div>
							)}
							<div className="flex justify-end -left-[0.3rem] rounded-bl-3xl border-l border-b border-solid border-slate-400  w-10 -translate-x-full -translate-y-full top-8  h-20 absolute  "></div>
						</>
					)}
					<div className="relative h-full ">
						<Avatar avatar={userComment.avatar} size="w-14 h-14" />
					</div>
					<div className="flex flex-col flex-1 ml-4">
						<div
							className={`flex flex-col mb-4 max-w-[95%] items-start ${
								idTopZIndex === parentComment.commentID ? 'z-50' : 'z-10'
							} `}
						>
							<Box
								custom={`min-h-[4rem] flex flex-col relative overflow-visible group`}
							>
								<span className="text-xl">{userComment.firstName}</span>
								<span>{parentComment.commentText}</span>
								<span className="w-96 h-full top-0 absolute right-0 translate-x-full"></span>
								<div
									className="absolute -right-12 w-10 h-10 hidden rounded-[50%] cursor-pointer  top-1/2 -translate-y-1/2 group-hover:flex hover:bg-slate-300 items-center justify-center"
									onClick={handleOpenCommentMenu}
								>
									<i className="fas fa-ellipsis-h"></i>
									{isOpenCommentMenu && (
										<CommentMenu
											setIdEditComment={setIdEditComment}
											commentId={parentComment.commentID}
											onDelete={onDeleteComment}
										/>
									)}
								</div>
							</Box>

							<div className="ml-4 text-xl space-x-4">
								<span className="cursor-pointer">Like</span>
								<span className="cursor-pointer" onClick={handleClickReply}>
									Reply
								</span>
							</div>
						</div>
						{!isShowReplyComments && replyComments.length > 0 ? (
							<div>
								<div className="flex justify-end left-[4.2rem] rounded-bl-3xl border-l border-b border-solid border-slate-400  w-10 -translate-x-full  top-16  h-[calc(100%_-_5rem)] absolute  "></div>
								<span
									className="cursor-pointer text-xl"
									onClick={handleClickReply}
								>
									<i className="fas fa-reply rotate-180 mx-2"></i>
									Reply
								</span>
							</div>
						) : (
							replyComments.map((replyComment) => (
								<div
									key={replyComment.commentID}
									className={`w-full ${
										idTopZIndex === parentComment.commentID ? 'z-10' : ''
									}`}
								>
									<Comment
										rootComment={rootComment}
										parentComment={replyComment}
										replyComments={[]}
										onClickReply={onClickReply}
										onDeleteComment={onDeleteComment}
										onEditComment={onEditComment}
										lastReplyComment={lastReplyComment}
									/>
								</div>
							))
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default Comment;
