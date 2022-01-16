import React, { useEffect, useState } from 'react';
import commentApi from '../../../api/commentApi';
import Comment from './Comment';
import CommentForm from './CommentForm';

function PostComments({ postId }) {
	const [replyOf, setReplyOf] = useState('');
	const [replyUser, setReplyUser] = useState('');
	const [listOfComment, setListOfComment] = useState([]);

	const handleClickReply = (replyOf, replyUser) => {
		setReplyOf(replyOf);
		setReplyUser(replyUser);
	};

	const handleCreateComment = async (data) => {
		try {
			const res = await commentApi.create(data);
			if (res.data.success) {
				const newComment = { ...res.data.newCmt, replyOf: '' };
				setListOfComment([...listOfComment, newComment]);
			}
		} catch (error) {}
	};

	const handleDeleteComment = async (commentId) => {
		console.log(commentId);
		try {
			const res = await commentApi.deleteCommentById(commentId);
			if (res.data.success) {
				setListOfComment(
					listOfComment.filter((comment) => comment._id !== commentId)
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditComment = async (data) => {
		try {
			const res = await commentApi.updateCommentById(
				data.get('commentID'),
				data
			);
			if (res.data.success) {
				const newListOfComment = listOfComment.map((comment) => {
					if (comment._id === data.get('commentID'))
						return res.data.updatedComment;
					return comment;
				});
				setListOfComment(newListOfComment);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const getListOfComment = async () => {
			try {
				const res = await commentApi.getPostComments(postId);
				if (res.data.success) {
					setListOfComment([...res.data.listOfComment]);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getListOfComment();
	}, []);

	return (
		<div className="space-y-10">
			{listOfComment.map((rootComment, key) => {
				const replyComments = [];
				return (
					<div key={key}>
						<Comment
							rootComment={rootComment}
							parentComment={rootComment}
							replyComments={replyComments}
							onClickReply={handleClickReply}
							onDeleteComment={handleDeleteComment}
							onEditComment={handleEditComment}
							lastReplyComment={replyComments[replyComments.length - 1]}
						/>
						<div className="ml-20">
							{rootComment.commentID === replyOf && (
								<CommentForm
									onSubmit={handleCreateComment}
									initialValue={{
										replyOf: replyOf,
										postID: postId,
										commentText: replyUser,
									}}
									type="createNewReplyComment"
								/>
							)}
						</div>
					</div>
				);
			})}
			<div className="mt-4">
				<CommentForm
					onSubmit={handleCreateComment}
					type={`creatNewComment${postId}`}
					initialValue={{
						replyOf: '',
						postID: postId,
						commentText: '',
					}}
				/>
			</div>
		</div>
	);
}

export default PostComments;

// const rootComments = comments.filter((comment) => comment.replyOf === '');
// const getReplyComments = (rootCommentID) => {
// 	return comments.filter((comment) => comment.replyOf === rootCommentID);
// };
