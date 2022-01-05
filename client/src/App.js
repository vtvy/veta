import { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Container from './components/Main';
import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoutes from './components/PublicRoutes';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import Auth from './features/Auth';
import AddEditPost from './features/Post/Pages/AddEditPost';
import TestServer from './testServer';
export const ModalContext = createContext();

function App() {
	const loginUser = useSelector((state) => state.user.current);
	const isLoggedIn = !!loginUser.userID;
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
			<div className="App flex flex-col min-h-screen h-full bg-slate-300">
				{isLoggedIn && (
					<Header setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />
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
						<Route path="/server" element={<TestServer />} />
						<Route path="/" element={<Container type="home" />} />
						<Route path="/photo" element={<Container type="photo" />} />
						<Route path="/profile" element={<Container type="profile" />} />
						<Route path="/people" element={<Container type="people" />} />
						<Route path="/setting" element={<Container type="setting" />} />
					</Route>
				</Routes>
			</div>
		</ModalContext.Provider>
	);
}

export default App;
