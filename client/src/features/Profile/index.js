import React, { useEffect } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import userApi from '../../api/userApi';
import ProfileInfo from './components/ProfileInfo';
import ProfileNavbar from './components/ProfileNavbar';
import Timeline from './Pages/Timeline';

function Profile({ user }) {
	let params = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		navigate(`/profile/${params.id}/timeline`);
	}, []);
	return (
		<div className="w-full flex flex-col space-y-6 ">
			<ProfileInfo user={user} />
			<ProfileNavbar />
			<Routes>
				<Route path="/timeline" element={<Timeline />} />
				<Route path="/photos" element={<Timeline />} />
			</Routes>
		</div>
	);
}

export default Profile;
