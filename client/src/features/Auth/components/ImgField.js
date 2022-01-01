import React, { useEffect, useState } from 'react';
import Avatars from '../../../assets/images/avatars';
import Box from '../../../components/Box';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';

function ImgField({ setIsDefault, setFile }) {
	const [isOpenSelectAvt, setIsOpenSelectAvt] = useState(false);
	const [avatarSelected, setAvatarSelected] = useState(Avatars[0]);

	const convertPathToNameAvatar = (avatarPath) => {
		const nameAvatar =
			avatarPath.slice(avatarPath.indexOf('avatar'), avatarPath.indexOf('.')) +
			'.svg';
		return nameAvatar;
	};

	useEffect(() => {
		const file = convertPathToNameAvatar(avatarSelected);
		setFile(file);
		setIsDefault(true);
		console.log(file);
		console.log(2);
	}, []);

	const handleOnclick = (e, avatar) => {
		if (e.target.classList.contains('default-avatar')) {
			setAvatarSelected(avatar);
			console.log(1);
		} else {
			const file = e.target.files[0];
			setAvatarSelected(URL.createObjectURL(file));
			console.log(file);
			setIsDefault(false);
			setFile(file);
		}
	};

	return (
		<div className="flex gap-x-8">
			<Box custom="w-[15rem] h-[15rem] flex justify-center items-center bg-slate-100">
				<img
					src={avatarSelected}
					alt=""
					className="w-full h-full object-cover"
				/>
			</Box>
			<div className="flex-1 flex flex-col justify-evenly ">
				<input
					type="file"
					id="file"
					className=" w-20 h-20 appearance-none hidden"
					onChange={handleOnclick}
				/>

				<Button w="w-full" shadow="none">
					<label htmlFor="file" className="block w-full cursor-pointer">
						Upload
					</label>
				</Button>
				<div className="text-center">Or</div>
				<Button w="w-full" shadow="none">
					<div
						className="w-full cursor-pointer"
						onClick={() => setIsOpenSelectAvt(true)}
					>
						Veta's Avatars
					</div>
				</Button>
			</div>
			{isOpenSelectAvt && (
				<Modal setIsOpen={setIsOpenSelectAvt}>
					<div className="flex w-[55rem] rounded-[2rem] h-[50rem] flex-wrap bg-slate-50 justify-around p-4 overflow-hidden">
						{Avatars.map((avatar, index) => (
							<div
								key={index}
								className={`w-40 h-40 border-2 rounded-[2rem] border-transparent border-solid ${
									avatarSelected === avatar ? 'bg-slate-400' : ''
								}`}
							>
								<img
									src={avatar}
									alt=""
									className="cursor-pointer default-avatar w-full h-full object-contain"
									onClick={(e) => handleOnclick(e, avatar)}
								/>
							</div>
						))}
						<Button rounded="rounded-xl" w="w-full" custom="close-position">
							Confirm
						</Button>
					</div>
				</Modal>
			)}
		</div>
	);
}

export default ImgField;
