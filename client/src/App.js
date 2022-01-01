import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Container from './components/Main';
import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoutes from './components/PublicRoutes';
import Auth from './features/Auth';
import TestServer from './testServer';

function App() {
	const navigate = useNavigate();
	const loginUser = useSelector((state) => state.user.current);
	const isLoggedIn = !!loginUser.userID;
	// useEffect(() => {
	// 	if (isLoggedIn) {
	// 		navigate('/');
	// 	}
	// }, [isLoggedIn]);

	return (
		<div className="App flex flex-col min-h-screen h-full bg-slate-300">
			<Header />

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
	);
}

export default App;
