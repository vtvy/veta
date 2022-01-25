import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProfileInfo from './components/ProfileInfo';
import ProfileNavbar from './components/ProfileNavbar';
import Timeline from './Pages/Timeline';

function Profile() {
	const navigate = useNavigate();
	useEffect(() => {
		navigate('/profile/timeline');
	}, []);
	return (
		<div className="w-full flex flex-col space-y-6 ">
			<ProfileInfo />
			<ProfileNavbar />
			<Routes>
				<Route path="/timeline" element={<Timeline />} />
				<Route path="/photos" element={<Timeline />} />
			</Routes>
		</div>
	);
}

export default Profile;
