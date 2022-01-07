import React, { useEffect, useState } from 'react';
import commentApi from '../../../api/commentApi';
import Comment from './Comment';
import CommentForm from './CommentForm';

function PostComments({ postId }) {
	const [replyOf, setReplyOf] = useState('');
	const [replyUser, setReplyUser] = useState('');
	const [comments, setComments] = useState([]);
	const handleClickReply = (replyOf, replyUser) => {
		setReplyOf(replyOf);
		setReplyUser(replyUser);
	};
	const handleCreateComment = async (data) => {
		try {
			const res = await commentApi.create(data);
			if (res.data.success) {
				console.log(res);
				const newComment = { ...res.data.newCmt, replyOf: '' };
				const newComments = [...comments];
				newComments.push(newComment);
				setComments(newComments);
			}
		} catch (error) {}
	};

	const handleDeleteComment = async (commentId) => {
		console.log(commentId);
		try {
			const res = await commentApi.deleteCommentById(commentId);
			console.log(res);
			if (res.data.success) {
				setComments(comments.filter((comment) => comment._id !== commentId));
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
				setComments(
					comments.map((comment) => {
						if (comment._id === data.get('commentID'))
							return res.data.updatedComment;
						return comment;
					})
				);
			}
		} catch (error) {}
	};

	useEffect(() => {
		const getPostComments = async () => {
			try {
				const res = await commentApi.getPostComments(postId);
				if (res.data.success) {
					setComments([...res.data.listOfComment]);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getPostComments();
	}, []);

	return (
		<div className="space-y-10">
			{comments.map((rootComment, key) => {
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
