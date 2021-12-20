import Auth from './features/Auth';
import { Routes, Route } from 'react-router-dom';
import Test from './test';

function App() {
	return (
		<div className="App h-screen">
			<Routes>
				<Route path="/" element={<Auth />} />
				<Route path="/test" element={<Test />} />
			</Routes>
		</div>
	);
}

export default App;
