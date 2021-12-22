import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import StorageKeys from '../../../../constants/storageKeys';
import PostForm from '../../components/PostForm';

function AddEditPost({ setIsAddEditPost }) {
	const userEmail = useSelector((state) => state.user.current.email);
	const accessToken = localStorage.getItem(`${StorageKeys.accessToken}`);
	console.log(accessToken);

	const handleClickEmptySpace = (e) => {
		if (e.target.classList.contains('emptySpace')) handleCloseForm();
	};
	const handleCreateNewPost = async (data) => {
		console.log(data.get('postText'));
		data.append('email', userEmail);
		try {
			const res = await axios.post(
				`http://localhost:9999/api/post/create`,
				data,
				{
					headers: { accessToken, 'Content-Type': 'multipart/form-data' },
				}
			);
			console.log(res);
		} catch (error) {
			console.log(error);
		}

		// setIsAddEditPost(false);
	};

	const handleCloseForm = () => {
		setIsAddEditPost(false);
	};
	return (
		<div
			className="absolute left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center emptySpace"
			onClick={handleClickEmptySpace}
		>
			<PostForm onSubmit={handleCreateNewPost} onCloseForm={handleCloseForm} />
		</div>
	);
}

export default AddEditPost;
