import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import postApi from '../../../../api/postApi';
import Modal from '../../../../components/Modal';
import PostForm from '../../components/PostForm';
import { addNewPost } from '../../postSlice';

function AddEditPost({ setIsAddEditPost }) {
	const dispatch = useDispatch();
	const initialData = { id: '', postId: '', postImage: '' };
	const userEmail = useSelector((state) => state.user.current.email);
	const handleCreateNewPost = async (data) => {
		data.append('email', userEmail);
		console.log(data.get('postImage'));
		try {
			const res = await postApi.create(data);
			console.log(res);
			if (res.data.success) {
				// const newPostID = res.data.newPost._id;
				// const resNewPost = await postApi.getPostById(newPostID);
				// const newPost = resNewPost.data.post;
				// const action = addNewPost(newPost);
				// dispatch(action);
				setIsAddEditPost(false);
				window.location.reload();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Modal setIsOpen={setIsAddEditPost}>
				<PostForm onSubmit={handleCreateNewPost} initialData={initialData} />
			</Modal>
		</>
	);
}

export default AddEditPost;
