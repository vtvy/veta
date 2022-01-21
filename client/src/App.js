import { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import userApi from './api/userApi';
import Header from './components/Header';
import Container from './components/Main';
import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoutes from './components/PublicRoutes';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import Spinner from './components/Spinner';
import Auth from './features/Auth';
import { logOut, setUser } from './features/Auth/userSlice';
import Home from './features/Home';
import Photo from './features/Photo';
import AddEditPost from './features/Post/Pages/AddEditPost';
import Profile from './features/Profile';
import useDarkMode from './Hooks/useDarkMode';
import Test from './test';
import TestServer from './testServer';
export const ModalContext = createContext();
export const ThemeContext = createContext();

function App() {
	const [isDarkMode, toggleDarkMode] = useDarkMode();
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const dispatch = useDispatch();

	useEffect(() => {
		const loginUser = async () => {
			const res = await userApi.getUser();
			if (res.data.success) {
				const action = setUser(res.data.user);
				dispatch(action);
			} else {
				const action = logOut();
				dispatch(action);
			}
		};
		loginUser();
		return () => {
			loginUser();
		};
	}, []);

	//handleModal
	const [toggleMenu, setToggleMenu] = useState(false);
	const [modal, setModal] = useState({
		isOpen: false,
		type: null,
		setIsOpen: false,
		content: {},
	});
	useEffect(() => {
		const handleResizeWindow = () => {
			if (window.innerWidth <= 1280) {
				setToggleMenu(false);
			} else {
				setToggleMenu(true);
			}
		};
		window.addEventListener('resize', handleResizeWindow);
		return () => {
			window.addEventListener('resize', handleResizeWindow);
		};
	}, []);
	return (
		<ModalContext.Provider value={setModal}>
			<div className="App flex flex-col min-h-screen h-full bg-slate-300 dark:bg-indigo-1050 scrollbar">
				{isLoggedIn && (
					<ThemeContext.Provider value={toggleDarkMode}>
						<Header setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />
					</ThemeContext.Provider>
				)}
				{isLoggedIn && <SidebarLeft toggleMenu={toggleMenu} />}
				{isLoggedIn && <SidebarRight toggleMenu={toggleMenu} />}

				{/* modal */}
				{modal.isOpen && (
					<AddEditPost
						setIsAddEditPost={modal.setIsOpen}
						content={modal.content}
					/>
				)}

				<Routes>
					<Route element={<PublicRoutes isLogged={isLoggedIn} />}>
						<Route path="/login" element={<Auth type="login" />} />
						<Route path="/register" element={<Auth type="register" />} />
					</Route>

					<Route element={<ProtectedRoutes isLogged={isLoggedIn} />}>
						<Route path="/" element={<Container />}>
							<Route path="/" element={<Home />} />
							<Route path="/photo" element={<Photo />} />
							<Route path="/server" element={<TestServer />} />
							<Route path="/profile/*" element={<Profile />} />
							<Route path="/people" element={<Container type="people" />} />
							<Route path="/setting" element={<Container type="setting" />} />
							<Route path="/test" element={<Test />} />
						</Route>
					</Route>
				</Routes>
			</div>
		</ModalContext.Provider>
	);
}

export default App;
