import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../../components/Avatar';
import Box from '../../../components/Box';
import Button from '../../../components/Button';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../../Auth/components/ErrorMessage';

function PostForm({ onSubmit, onCloseForm }) {
	const userAvatar = useSelector((state) => state.user.current.avatar);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmitForm = (data) => {
		const formData = new FormData();
		// console.log(data.file[0]);
		Object.keys(data).forEach((key) => {
			if (key === 'file') {
				formData.append(key, data[key][0]);
			} else formData.append(key, data[key]);
		});
		onSubmit(formData);
	};

	return (
		<div>
			<Box width="w-[50rem]" bg="bg-slate-200">
				<div className="flex items-center">
					<Avatar avatar={userAvatar} />
					<div className="flex-1 text-center p-2 bg-slate-400 rounded-[2rem] mx-8">
						Make A Great Post{' '}
					</div>
					<div
						className="w-16 h-16 rounded-[50%] bg-slate-400 flex items-center justify-center cursor-pointer"
						onClick={onCloseForm}
					>
						<i className="fas fa-times"></i>
					</div>
				</div>
				<form
					className="w-full h-full p-4 mt-4 flex flex-col"
					onSubmit={handleSubmit(onSubmitForm)}
				>
					<div className="flex flex-col">
						<label htmlFor="title" className="text-indigo-600 font-semibold">
							<i className="fas fa-pencil-alt mx-4"></i> Title Post
						</label>
						<input
							className="border rounded-[2rem] bg-white px-6 py-4 focus:outline-indigo-600"
							type="text"
							name="title"
							placeholder="Enter Title Post"
							{...register('title', { required: true })}
						/>
						{errors.title ? (
							<ErrorMessage message={'Title post is required field'} />
						) : (
							''
						)}
					</div>
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
							{...register('content', { required: true })}
							placeholder="Post content"
						/>
						{errors.content ? (
							<ErrorMessage message={'Content post is required field'} />
						) : (
							''
						)}
					</div>
					<div className="flex flex-col mb-8">
						<label className="text-indigo-600 font-semibold">
							<i class="fas fa-paperclip"></i>Attach
						</label>

						<div className="border flex justify-around rounded-[2rem] bg-white px-6 py-4 h-full focus:outline-indigo-600">
							<div className="w-16 h-16 flex items-center bg-slate-200 justify-center rounded-[50%] hover:bg-slate-400 cursor-pointer">
								<i class="far fa-grin-beam text-5xl"></i>
							</div>
							<label htmlFor="file">
								<div className="w-16 h-16 flex items-center bg-slate-200 justify-center rounded-[50%] hover:bg-slate-400 cursor-pointer">
									<i class="fas fa-photo-video"></i>
								</div>
							</label>
							<div className="w-16 h-16 flex items-center bg-slate-200 justify-center rounded-[50%] hover:bg-slate-400 cursor-pointer">
								<i class="fas fa-user-tag"></i>
							</div>

							<div className="w-16 h-16 flex items-center bg-slate-200 justify-center rounded-[50%] hover:bg-slate-400 cursor-pointer">
								<i class="fas fa-ellipsis-h"></i>
							</div>
						</div>

						<input
							className="appearance-none hidden"
							type="file"
							rows="7"
							name="file"
							id="file"
							{...register('file')}
						/>
					</div>
					<Button type="submit" w="w-full" h="h-[4rem]">
						Create Post
					</Button>
				</form>
			</Box>
		</div>
	);
}

export default PostForm;
