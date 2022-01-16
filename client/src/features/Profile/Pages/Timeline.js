import React from 'react';
import Post from '../../Post';
import ListOfPost from '../../Post/components/ListOfPost';
import ProfileSidebar from '../components/ProfileSidebar';

function Timeline() {
	return (
		<div className="flex w-full">
			<ProfileSidebar />

			<div className="flex-1">
				<Post />
				<ListOfPost />
			</div>
		</div>
	);
}

export default Timeline;
