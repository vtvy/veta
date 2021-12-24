import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import postApi from '../../../../api/postApi';
import Modal from '../../../../components/Modal';
import PostForm from '../../components/PostForm';

function AddEditPost({ setIsAddEditPost }) {
	const navigate = useNavigate();
	const initialData = { id: '', postId: '', postImage: '' };
	const userEmail = useSelector((state) => state.user.current.email);
	const handleCreateNewPost = async (data) => {
		data.append('email', userEmail);
		console.log(data.get('postImage'));
		try {
			const res = await postApi.create(data);
			console.log(res);
			if (res.data.success) {
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

// const res = await axios.post(
// 	`http://localhost:9999/api/post/create`,
// 	data,
// 	{
// 		headers: { accessToken, 'Content-Type': 'multipart/form-data' },
// 	}
// );
// const accessToken = localStorage.getItem(`${StorageKeys.accessToken}`);
