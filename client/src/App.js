import Auth from './features/Auth';
import { Routes, Route } from 'react-router-dom';
import Test from './test';
import TestServer from './testServer';
import ProtectedRoutes from './components/ProtectedRoutes';
import RegisterPage from './features/Auth/Pages/RegisterPage';
function App() {
	return (
		<div className="App h-screen">
			<Routes>
				<Route path="/login" element={<Auth type="login" />} />
				<Route path="/register" element={<Auth type="register" />} />
				<Route element={<ProtectedRoutes isLogged={false} />}>
					<Route path="/registers" element={<RegisterPage />} />
					<Route path="/test" element={<TestServer />} />
					<Route path="/test" element={<Test />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
