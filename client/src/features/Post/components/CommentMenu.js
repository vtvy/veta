import React from 'react';
import Box from '../../../components/Box';

function CommentMenu({ setIdEditComment, commentId, onDelete, onClickReply }) {
	const handleClickDelete = () => {
		const answer = window.confirm('Are you sure you want to delete this post?');
		if (answer) {
			onDelete(commentId);
		}
	};
	return (
		<div className="w-40 h-20 absolute -bottom-4 translate-y-full">
			<Box width="w-full">
				<ul>
					<li onClick={() => setIdEditComment(commentId)}>Edit</li>
					<li onClick={handleClickDelete}>Delete</li>
				</ul>
			</Box>
		</div>
	);
}

export default CommentMenu;
