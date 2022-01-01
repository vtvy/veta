import React, { useEffect, useState } from 'react';
import axiosClient from '../../../api/axiosClient';
import commentApi from '../../../api/commentApi';
import Comment from './Comment';
import CommentForm from './CommentForm';
const commentsFake = [
	{
		commentID: 'c1',
		postID: '61c7ea4e5ffb63ecc3441aba',
		userID: 'u1',
		replyOf: '',
		commentText: 'alabatrap1u3uo41 ',
		commentImagePath: '',
		isEdit: false,
		CreatedAt: new Date(),
	},
	{
		commentID: 'c2',
		postID: '61c7ea4e5ffb63ecc3441aba',
		userID: 'u2',
		replyOf: 'c1',
		commentText: 'alabatrap',
		commentImagePath: '',
		isEdit: false,
		CreatedAt: new Date(),
	},
	{
		commentID: 'c3',
		postID: '61c7ea4e5ffb63ecc3441aba ',
		userID: 'u3',
		replyOf: '',
		commentText: 'alabatrap',
		commentImagePath: '',
		isEdit: false,
		CreatedAt: new Date(),
	},
	{
		commentID: 'c4',
		postID: '61c7ea4e5ffb63ecc3441aba',
		userID: '1',
		replyOf: 'c3',
		commentText: 'alabatrap  as d fas df as df as fd a ',
		commentImagePath: '',
		isEdit: false,
		CreatedAt: new Date(),
	},
	{
		commentID: 'c5',
		postID: '61c7ea4e5ffb63ecc3441aba',
		userID: '22',
		replyOf: 'c3',
		commentText: 'alabatrap',
		commentImagePath: '',
		isEdit: false,
		CreatedAt: new Date(),
	},
	{
		commentID: 'c6',
		postID: '61c7ea4e5ffb63ecc3441aba',
		userID: '22',
		replyOf: '',
		commentText: 'alabatrap',
		commentImagePath: '',
		isEdit: false,
		CreatedAt: new Date(),
	},
];

function PostComments({ postId }) {
	const [replyOf, setReplyOf] = useState('');
	const [replyUser, setReplyUser] = useState('');
	const [comments, setComments] = useState([]);

	const handleClickReply = (replyOf, replyUser) => {
		setReplyOf(replyOf);
		setReplyUser(replyUser);
	};
	const handleCreateComment = async (data) => {
		console.log(data);

		// try {
		// 	const res = commentApi.create(data);
		// 	if (res.data.success) {
		// 		// const resPostComments = await commentApi.getPostComments(postId);
		//if(resPostComments.data.success) {
		// setComments(resPostComments.data.comments);
		// }
		// 	}
		// } catch (error) {}
	};

	const handleDeleteComment = async (commentId) => {
		console.log(commentId);
		// try {
		// 	const res = commentApi.delete(commentId);
		// 	if (res.data.success) {
		// 		const newComments = comments.filter(
		// 			(comment) => comment.commentId !== commentId
		// 		);
		// 		setComments(newComments);
		// 	}
		// } catch (error) {}
	};

	const handleEditComment = async (data) => {
		console.log(data.get('commentImage'));
		const indexCommentUpdated = comments.findIndex(
			(comment) => comment.commentID === data.get('commentID')
		);
		const newComments = [...comments];
		newComments[indexCommentUpdated] = {
			commentID: data.get('commentID'),
			postID: data.get('postID'),
			userID: data.get('userID'),
			replyOf: data.get('replyOf'),
			commentText: data.get('commentText'),
			commentImagePath: '',

			CreatedAt: new Date(),
		};

		setComments(newComments);
		// try {
		// 	const res = commentApi.updateCommentById(data.commentID, data);
		// 	if (res.data.success) {
		// 		const indexCommentUpdated = comments.findIndex(
		// 			(comment) => comment.id === data.commentID
		// 		);
		// 		const newComments = comments;
		// 		newComments[indexCommentUpdated] = data;
		// 		setComments(newComments);
		// 	}
		// } catch (error) {}
	};

	useEffect(() => {
		const getPostComments = async () => {
			try {
				// const res = await commentApi.getPostComments(postId);
				setComments(commentsFake);
			} catch (error) {}
		};
		getPostComments();
	}, []);

	const rootComments = comments.filter((comment) => comment.replyOf === '');
	const getReplyComments = (rootCommentID) => {
		return comments.filter((comment) => comment.replyOf === rootCommentID);
	};

	return (
		<div className=" space-y-10">
			{rootComments.map((rootComment) => {
				const replyComments = getReplyComments(rootComment.commentID);
				return (
					<div key={rootComment.commentID}>
						<Comment
							rootComment={rootComment}
							parentComment={rootComment}
							replyComments={replyComments}
							onClickReply={handleClickReply}
							onDeleteComment={handleDeleteComment}
							onEditComment={handleEditComment}
							lastReplyComment={replyComments[replyComments.length - 1]}
						/>
						<div className="ml-20 mr-5">
							{rootComment.commentID === replyOf && (
								<CommentForm
									onSubmit={handleCreateComment}
									initialValue={{
										replyOf: replyOf,
										postId: postId,
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
						postId: postId,
						commentText: '',
					}}
				/>
			</div>
		</div>
	);
}

export default PostComments;
