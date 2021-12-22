import React from 'react';
import PostForm from '../../components/PostForm';

function AddEditPost({ setIsAddEditPost }) {
	const handleClickEmptySpace = (e) => {
		if (e.target.classList.contains('emptySpace')) handleCloseForm();
	};
	const handleCreateNewPost = (data) => {
		console.log(data.getAll('file'));

		setIsAddEditPost(false);
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
