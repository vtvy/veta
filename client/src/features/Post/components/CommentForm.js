import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Avatar from '../../../components/Avatar';
import Box from '../../../components/Box';

function CommentForm({ onSubmit, initialValue, type }) {
	const userID = useSelector((state) => state.user.current.userID);
	const [reviewImage, setReviewImage] = useState('');
	const [imageSelected, setImageSelected] = useState('');
	const { register, handleSubmit, reset } = useForm({
		model: 'onChange',
		defaultValues: { commentText: initialValue.commentText },
	});
	const userAvatar = useSelector((state) => state.user.current.avatar);
	const onSubmitForm = (data) => {
		if (!data.commentText && !imageSelected) {
			alert('you must have at least one field for your comment');
		} else {
			const formData = new FormData();
			formData.append('commentID', initialValue._id);
			formData.append('replyOf', initialValue.replyOf);
			formData.append('postID', initialValue.postID);
			formData.append('userID', userID);
			formData.append('commentText', data.commentText);
			formData.append('commentImage', imageSelected);
			onSubmit(formData);
			reset();
		}
	};

	const handleAddCommentImage = (e) => {
		const commentImage = e.target.files[0];
		setReviewImage(URL.createObjectURL(commentImage));
		setImageSelected(commentImage);
	};
	const handleRemoveCommentImage = () => {
		setReviewImage('');
		setImageSelected('');
	};

	return (
		<>
			<div className="flex w-full items-center">
				<div className="mr-4">
					<Avatar avatar={userAvatar} size="w-14 h-14" />
				</div>
				<form className="w-full" onSubmit={handleSubmit(onSubmitForm)}>
					<Box custom="w-full py-3 flex items-center relative bg-[#f0f2f5] rounded-[2rem] ">
						<input
							className="w-full outline-none bg-[#f0f2f5]"
							type="text"
							placeholder="write an answer..."
							{...register('commentText')}
						/>
						<div className=" absolute right-8 text-xl opacity-60 ">
							<label htmlFor={type}>
								<i className="fas fa-photo-video cursor-pointer"></i>
							</label>
							<input
								className="appearance-none hidden"
								type="file"
								id={type}
								name=""
								{...register('commentImage')}
								onChange={(e) => handleAddCommentImage(e)}
							/>
						</div>
					</Box>
				</form>
			</div>
			{reviewImage && (
				<div className="ml-16 mt-4 relative w-40 h-40">
					<span
						className="absolute right-2 text-white cursor-pointer "
						onClick={handleRemoveCommentImage}
					>
						x
					</span>
					<img
						src={reviewImage}
						alt=""
						className="w-auto h-auto object-cover"
					/>
				</div>
			)}
		</>
	);
}

export default CommentForm;
