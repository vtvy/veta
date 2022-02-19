import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import userApi from '../../api/userApi';
import ProfileInfo from './components/ProfileInfo';
import ProfileNavbar from './components/ProfileNavbar';
import Timeline from './Pages/Timeline';

function Profile() {
	let params = useParams();
	const navigate = useNavigate();
	const [user, setUser] = useState({ id: params.id });
	useEffect(() => {
		setUser({ id: params.id });
		navigate(`/profile/${params.id}/timeline`);
	}, [params.id]);
	useEffect(() => {
		// const getProfileByID = async () => {
		// 	try {
		// 		const res = await userApi.getProfileByID(params.id);
		// 		if (res.data.success) {
		// 			console.log(res.data);
		// 		} else {
		// 			console.log(res);
		// 		}
		// 	} catch (error) {
		// 		console.log(error);
		// 	}
		// };
		// getProfileByID();
		// navigate(`/profile/${params.id}/timeline`);
	}, [params.id]);
	return (
		<div className="w-full flex flex-col space-y-6 ">
			<ProfileInfo user={user} />
			<ProfileNavbar />
			<Routes>
				<Route path="/timeline" element={<Timeline user={user} />} />
				<Route path="/photos" element={<Timeline />} />
			</Routes>
		</div>
	);
}

export default Profile;
