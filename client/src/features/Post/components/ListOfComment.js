import React, { useEffect, useState } from 'react';
import axiosClient from '../../../api/axiosClient';
import StorageKeys from '../../../constants/storageKeys';
import Comment from './Comment';
import CommentForm from './CommentForm';

function ListOfComment({ id, type }) {
	const params =
		type === 'comment'
			? { id: id, apiURL: '/comment' }
			: { id: id, apiURL: '/childComment' };
	const accessToken = localStorage.getItem(StorageKeys.accessToken);
	const [listOfComment, setListOfComment] = useState([]);
	useEffect(() => {
		const getListOfComment = async () => {
			const url = `${params.apiURL}/${id}`;
			try {
				const res = await axiosClient.get(url, { headers: { accessToken } });
				if (res.data.success) {
					setListOfComment([...res.data.listOfComment]);
				} else console.log(1);
			} catch (error) {
				console.log(error);
			}
		};
		getListOfComment();
	}, []);

	const handleClickReply = () => {};
	const handleCreateComment = async (data) => {
		const url = `${params.apiURL}/create`;
		try {
			const res = await axiosClient.post(url, data, {
				headers: { accessToken },
			});
			if (res.data.success) {
				setListOfComment([...listOfComment, res.data.newComment]);
			} else console.log(res);
		} catch (error) {}
	};
	const handleDeleteComment = () => {};
	const handleEditComment = () => {};

	return (
		<div className="space-y-10">
			{listOfComment.map((comment, key) => {
				return (
					<div key={key}>
						<Comment
							comment={comment}
							onClickReply={handleClickReply}
							onDeleteComment={handleDeleteComment}
							onEditComment={handleEditComment}
						/>
					</div>
				);
			})}
			<div className="mt-4">
				<CommentForm
					onSubmit={handleCreateComment}
					type={`creatNewComment${id}`}
					initialValue={{
						postID: id,
						commentText: '',
						_id: id,
					}}
				/>
			</div>
		</div>
	);
}

export default ListOfComment;
