import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../features/Auth/userSlice';
import Avatar from '../Avatar';
import Button from '../Button';

function Navbar() {
	const dispatch = useDispatch();
	console.log();
	const userAvatar = useSelector((state) => state.user.current.avatar);
	console.log(userAvatar);
	const handleLogout = () => {
		const action = logout();
		dispatch(action);
	};
	return (
		<div className="h-full flex items-center px-12 justify-between shadow">
			<Link to="/home">
				<span className="text-indigo-600 font-bold text-4xl">Veta</span>
			</Link>
			<div className="flex  gap-x-4 items-center">
				<Avatar avatar={userAvatar} />
				<Link to="/login">
					<Button>
						<div onClick={handleLogout}>Logout</div>
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default Navbar;
