import React, { useState } from 'react';
import Avatar from '../../../components/Avatar';
import Box from '../../../components/Box';
import CommentForm from './CommentForm';
import CommentMenu from './CommentMenu';
import ListOfComments from './ListOfComment';
function Comment({ comment, onClickReply, onEditComment, onDeleteComment }) {
	const [isShowListOfChildComments, setIsShowListOfChildComments] =
		useState(false);
	const [isOpenCommentMenu, setIsOpenCommentMenu] = useState(false);
	const [idEditComment, setIdEditComment] = useState('');
	const [idTopZIndex, setIdTopZIndex] = useState('');

	const handleClickReply = () => {
		onClickReply(comment._id, comment.user.name);
		setIsShowListOfChildComments(true);
	};
	const handleOpenCommentMenu = () => {
		setIdTopZIndex(comment._id);
		setIsOpenCommentMenu(!isOpenCommentMenu);
	};

	const handleEditComment = (data) => {
		setIdEditComment('');
		onEditComment(data);
	};
	return (
		<div className="dark:text-textColorDark">
			{idEditComment === comment._id ? (
				<>
					<CommentForm
						onSubmit={handleEditComment}
						initialValue={comment}
						type={`editComment${comment._id}`}
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
						idTopZIndex === comment._id ? 'z-50' : 'z-10'
					}`}
				>
					<div className="relative h-full ">
						<Avatar avatar={comment.user.avatar} size="w-14 h-14" />
					</div>
					<div className="flex flex-col flex-1 ml-4">
						<div
							className={`flex flex-col mb-4 max-w-[95%] items-start ${
								idTopZIndex === comment._id ? 'z-50' : 'z-10'
							} `}
						>
							<Box
								custom={`min-h-[4rem] rounded-[1.6rem] bg-[#F0F2F5] flex flex-col relative overflow-visible group dark:bg-[#BEDAFD]`}
							>
								<span className="text-2xl text-black font-medium ">
									{comment.user.name}
								</span>
								<span className="font-thin">{comment.commentText}</span>
								<span className="w-96 h-full top-0 absolute right-0 translate-x-full"></span>
								<div
									className="absolute -right-12 w-10 h-10 hidden rounded-[50%] cursor-pointer  top-1/2 -translate-y-1/2 group-hover:flex hover:bg-slate-300 items-center justify-center"
									onClick={handleOpenCommentMenu}
								>
									<i className="fas fa-ellipsis-h"></i>
									{isOpenCommentMenu && (
										<CommentMenu
											setIdEditComment={setIdEditComment}
											commentId={comment._id}
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
						{isShowListOfChildComments && (
							<ListOfComments apiURL={'/childComment'} id={comment._id} />
						)}
						{/* {!isShowListOfChildComments && listOfChildComment.length > 0 ? (
							<ListOfComments apiURL="/childComment"  />
						) : (
							// <div>
							// 	<div className="flex justify-end left-[4.2rem] rounded-bl-3xl border-l-2 border-b-2 border-solid border-slate-400  w-10 -translate-x-full  top-16  h-[calc(100%_-_5rem)] absolute  "></div>
							// 	<span
							// 		className="cursor-pointer text-xl"
							// 		onClick={() => setIsShowListOfChildComments(true)}
							// 	>
							// 		<i className="fas fa-reply rotate-180 mx-2"></i>
							// 		Reply
							// 	</span>
							// </div>
							<></>

							// listOfChildComment.map((replyComment) => (
							// 	<div
							// 		key={replyComment._id}
							// 		className={`w-full ${
							// 			idTopZIndex === comment._id ? 'z-10' : ''
							// 		}`}
							//   >
							// 		<Comment
							// 			comment={comment}
							// 			comment={replyComment}
							// 			replyComments={[]}
							// 			onClickReply={onClickReply}
							// 			onDeleteComment={onDeleteComment}
							// 			onEditComment={onEditComment}
							// 			lastReplyComment={lastReplyComment}
							// 		/>
							// 	</div>
							// ))
						)} */}
					</div>
				</div>
			)}
		</div>
	);
}

export default Comment;

// <>
// 						{listOfChildComment.length > 0 && isShowListOfChildComments && (
// 							<div className="w-10 h-[calc(100%_-_6rem)] left-[1.7rem]  border-l-2 border-solid border-slate-400 translate-y-16 absolute  "></div>
// 						)}
// 					</>
