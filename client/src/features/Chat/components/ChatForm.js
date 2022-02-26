import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Box from '../../../components/Box';

function ChatForm({ onSubmit }) {
	const [imageSelected, setImageSelected] = useState();
	const [isValid, setIsValid] = useState(false);
	const [reviewImage, setReviewImage] = useState({});
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({ mode: 'onChange' });
	useEffect(() => {
		if (watch('messageText') || imageSelected) {
			setIsValid(true);
		} else setIsValid(false);
	}, [watch('messageText'), imageSelected]);
	const handleUploadImage = (e) => {
		const image = e.target.files[0];
		const reviewImage = URL.createObjectURL(image);
		setReviewImage({ type: 'local', path: reviewImage });
		setImageSelected(image);
	};
	const handleUndoUploadImage = () => {
		setReviewImage({ type: 'local', path: '' });
		setImageSelected();
	};
	const onSubmitData = (data) => {
		if (isValid) {
			const formData = new FormData();
			formData.append('messageText', data.messageText);
			formData.append('messageImage', imageSelected);
			formData.append('date', new Date());
			onSubmit(formData);
		}
	};
	return (
		<div className="w-full px-4 h-full py-2 flex flex-col justify-center">
			<div>
				{reviewImage.path && (
					<Box
						width={'w-48'}
						p={'p-0'}
						custom="relative bg-slate-200 border border-solid border-slate-300 shadow-md"
					>
						<div className="max-h-96 rounded-lg relative scrollbar">
							<img src={reviewImage.path} className="w-full h-full" alt="" />
						</div>
						<div
							className="absolute right-0 cursor-pointer top-0 w-10 h-10 bg-indigo-600 rounded-full flex justify-center items-center text-white"
							onClick={handleUndoUploadImage}
						>
							<i className="fas fa-times font-thin"></i>
						</div>
					</Box>
				)}
			</div>
			<form
				className="h-full w-full flex space-x-4  items-center"
				onSubmit={handleSubmit(onSubmitData)}
			>
				<div className="w-full flex-1 flex items-center min-h-[40px] rounded-[2rem] overflow-hidden bg-[#f0f2f5]">
					<input
						type="text"
						className="flex-1 max-w-4/5  flex items-center min-h-[40px] rounded-[2rem] overflow-hidden bg-[#f0f2f5] outline-none px-6 transition-all"
						{...register('messageText')}
						autoComplete="off"
					/>
					<input
						className="appearance-none hidden"
						type="file"
						rows="7"
						name="file"
						id="file"
						{...register('messageImage')}
						onChange={handleUploadImage}
					/>
				</div>
				<label htmlFor="file">
					<div className="w-16 h-16 flex items-center bg-slate-200 dark:bg-indigo-850 dark:text-white justify-center rounded-[50%] hover:bg-slate-400 cursor-pointer">
						<i className="fas fa-photo-video"></i>
					</div>
				</label>
				{isValid && (
					<button
						type="submit"
						className="w-16 h-16 bg-indigo-850 rounded-full flex justify-center items-center dark:bg-indigo-600 transition-all"
					>
						<i className="far fa-paper-plane text-slate-200"></i>
					</button>
				)}
			</form>
		</div>
	);
}

export default ChatForm;
{
	/* <span
					className="resize w-full h-full outline-none text-3xl p-4 block"
					role="textbox"
					contentEditable
					onChange={(e) => console.log(e.target)}
				>
					{message}
				</span> */
}
