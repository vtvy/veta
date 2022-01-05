import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../features/Auth/userSlice';
import useClickOutside from '../../Hooks/useClickOutside';
import Avatar from '../Avatar';
import NavbarMenu from './NavbarMenu';
import SearchBar from './SearchBar';

function Navbar({ setToggleMenu, toggleMenu }) {
	const user = useSelector((state) => state.user.current);
	const dispatch = useDispatch();
	const [refInside, isInside, setIsInside] = useClickOutside(false);
	const handleLogout = () => {
		const action = logout();
		dispatch(action);
	};
	return (
		<div className="h-full w-full flex gap-4 items-center justify-between px-4">
			<div className="flex items-center ">
				<span
					onClick={() => {
						setToggleMenu(!toggleMenu);
					}}
					className="cursor-pointer text-4xl"
				>
					<i className="fas fa-bars"></i>
				</span>
				<Link
					to="/"
					className="mx-4 md:mx-[3.6rem] text-indigo-600 font-bold text-4xl"
				>
					Veta
				</Link>
			</div>
			<SearchBar />
			<div className="flex gap-x-4 items-center">
				<div className="w-16 h-16 rounded-full flex justify-center items-center bg-[#e4e6eb] hover:bg-[#d9dbdd] cursor-pointer">
					<i className="fas fa-comment-dots"></i>
				</div>
				<div className="w-16 h-16 rounded-full flex justify-center items-center bg-[#e4e6eb] hover:bg-[#d9dbdd] cursor-pointer">
					<i className="fas fa-bell text-3xl"></i>
				</div>
				<div ref={refInside} className="cursor-pointer relative">
					{' '}
					<div onClick={() => setIsInside(!isInside)}>
						{' '}
						{user.avatar && <Avatar avatar={user.avatar} />}
					</div>
					<div>
						{isInside && <NavbarMenu user={user} onLogOut={handleLogout} />}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
