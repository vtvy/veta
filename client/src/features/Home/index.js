import React from 'react';
import Box from '../../components/Box';
import Post from '../Post';
import PostCard from '../Post/components/PostCard';

function Home() {
	return (
		<div className="flex flex-col gap-4">
			<div className="story-slide">
				<Box width="w-full">
					<div className="h-80"></div>
				</Box>
			</div>
			<Post />
			<PostCard />
		</div>
	);
}

export default Home;
