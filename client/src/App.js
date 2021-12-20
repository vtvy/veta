import Auth from './features/Auth';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className="App h-screen">
			<Routes>
				<Route path="/" element={<Auth />} />
			</Routes>
		</div>
	);
}

export default App;
