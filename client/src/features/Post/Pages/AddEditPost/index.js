import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import postApi from '../../../../api/postApi';
import Modal from '../../../../components/Modal';
import PostForm from '../../components/PostForm';
import { addNewPost } from '../../postSlice';

function AddEditPost({ setIsAddEditPost }) {
	const dispatch = useDispatch();
	const [isUploading, setIsUploading] = useState(false);
	const initialData = { id: '', postId: '', postImage: '' };
	const userEmail = useSelector((state) => state.user.current.email);
	const handleCreateNewPost = async (data) => {
		data.append('email', userEmail);
		console.log(data.get('postImage'));
		setIsUploading(true);
		try {
			const res = await postApi.create(data);
			console.log(res);
			if (res.data.success) {
				setIsUploading(false);
				console.log(res.data.newPost);
				const newPost = res.data.newPost;
				const action = addNewPost(newPost);
				dispatch(action);
				setIsAddEditPost(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Modal setIsOpen={setIsAddEditPost}>
				<PostForm
					onSubmit={handleCreateNewPost}
					isUploading={isUploading}
					initialData={initialData}
				/>
			</Modal>
		</>
	);
}

export default AddEditPost;
