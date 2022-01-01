import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../../components/Avatar';
import Box from '../../../components/Box';
import Button from '../../../components/Button';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../../Auth/components/ErrorMessage';
import convertNameImgToPath from '../../../myFunction/convertNameImgToPath';
import CloudImg from './CloundImg';

function PostForm({ onSubmit, initialData, isUploading }) {
	const userAvatar = useSelector((state) => state.user.current.avatar);
	const [imageSelected, setImageSelected] = useState(initialData.postImage);
	const [reviewImage, setReviewImage] = useState({});
	useEffect(() => {
		setReviewImage({
			type: initialData.postImage ? 'cloud' : 'local',
			path: initialData.postImage,
		});
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({ mode: 'onChange' });
	const onSubmitForm = (data) => {
		const formData = new FormData();
		Object.keys(data).forEach((key) => {
			if (key === 'postImage') {
				formData.append(key, imageSelected);
			} else formData.append(key, data[key]);
		});
		onSubmit(formData);
	};

	const handleAddImage = (e) => {
		const reviewImage = URL.createObjectURL(e.target.files[0]);
		setReviewImage({ type: 'local', path: reviewImage });
		setImageSelected(e.target.files[0]);
	};
	const handleUndoAddImage = () => {
		setReviewImage();
		setImageSelected();
	};

	return (
		<div>
			<Box width="w-[50rem]" bg="bg-slate-200">
				<div className="flex items-center">
					<Avatar avatar={userAvatar} />
					<div className="flex-1 text-center p-2 bg-slate-400 rounded-[2rem] mx-8">
						Make A Great Post{' '}
					</div>
					<div className="w-16 h-16 rounded-[50%] bg-slate-400 flex items-center justify-center cursor-pointer close-position">
						<i className="fas fa-times close-position"></i>
					</div>
				</div>
				<form
					className="w-full h-full p-4 mt-4 flex flex-col"
					onSubmit={handleSubmit(onSubmitForm)}
				>
					<div className="flex flex-col mt-4 mb-4">
						<label
							htmlFor="postContent"
							className="text-indigo-600 font-semibold"
						>
							<i className="fas fa-scroll mx-4"></i>Post
						</label>
						<textarea
							className="border rounded-[2rem] bg-white px-6 py-4 h-full focus:outline-indigo-600"
							type="text"
							rows="7"
							name="content"
							defaultValue={initialData.postText || ''}
							{...register('postText', { required: true })}
							placeholder="Post content"
						/>
						{errors.content ? (
							<ErrorMessage message={'Content post is required field'} />
						) : (
							''
						)}
					</div>
					{reviewImage.path && (
						<Box custom="relative">
							<div className="max-h-96 overflow-y-scroll relative">
								{reviewImage.type === 'cloud' ? (
									<CloudImg publicId={reviewImage.path} />
								) : (
									<img
										src={reviewImage.path}
										className="w-full h-full"
										alt=""
									/>
								)}
							</div>
							<button
								type="button"
								className="absolute right-12 top-6 w-10 h-10 bg-indigo-600 rounded-[50%] text-white "
								onClick={handleUndoAddImage}
							>
								<i className="fas fa-times"></i>
							</button>
						</Box>
					)}
					<div className="flex flex-col mb-8">
						<label className="text-indigo-600 font-semibold">
							<i className="fas fa-paperclip"></i>Attach
						</label>

						<div className="border flex justify-around rounded-[2rem] bg-white px-6 py-4 h-full focus:outline-indigo-600">
							<div className="w-16 h-16 flex items-center bg-slate-200 justify-center rounded-[50%] hover:bg-slate-400 cursor-pointer">
								<i className="far fa-grin-beam text-5xl"></i>
							</div>
							<label htmlFor="file">
								<div className="w-16 h-16 flex items-center bg-slate-200 justify-center rounded-[50%] hover:bg-slate-400 cursor-pointer">
									<i className="fas fa-photo-video"></i>
								</div>
							</label>
							<div className="w-16 h-16 flex items-center bg-slate-200 justify-center rounded-[50%] hover:bg-slate-400 cursor-pointer">
								<i className="fas fa-user-tag"></i>
							</div>

							<div className="w-16 h-16 flex items-center bg-slate-200 justify-center rounded-[50%] hover:bg-slate-400 cursor-pointer">
								<i className="fas fa-ellipsis-h"></i>
							</div>
						</div>

						<input
							className="appearance-none hidden"
							type="file"
							rows="7"
							name="file"
							id="file"
							{...register('postImage')}
							onChange={handleAddImage}
						/>
					</div>
					<Button
						type="submit"
						w="w-full"
						h="h-[4rem] "
						isValid={!isUploading && isValid}
					>
						{initialData.postText || initialData.postImage
							? 'Edit Post'
							: 'Create Post'}
					</Button>
				</form>
			</Box>
		</div>
	);
}

export default PostForm;
