import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../../components/Avatar';
import Box from '../../../components/Box';
import Button from '../../../components/Button';

function PostCard() {
	const user = useSelector((state) => state.user.current);
	const posts = useSelector((state) => state.post);
	console.log(posts);
	return (
		<Box height="min-h-[25rem]" bg="bg-slate-200">
			<div className="flex flex-1 mb-6">
				<div className="flex flex-1">
					<Avatar avatar={user.avatar} />
					<div className="flex flex-col ml-4">
						<span className="font-semibold">
							{user.firstName + ' ' + user.lastName}
						</span>
						<span className="text-xl text-slate-700">12h trước</span>
					</div>
				</div>
				<div className="justify-self-end cursor-pointer">
					<Box>...</Box>
				</div>
			</div>
			<div className="">
				<Box p="py-2 px-4">
					<span className="text-indigo-600">{posts[0].title}</span>
				</Box>
			</div>
			<Box width="w-full" height="min-h-[18rem]">
				{posts[0].content}
			</Box>
			<div className="flex justify-between mx-4">
				<span>
					<span className="text-indigo-600 font-semibold">2</span> Likes
				</span>
				<span>
					<span className="text-indigo-600 font-semibold">2</span> Comments
				</span>
			</div>
			<div className="flex flex-1 justify-between pt-4 mt-4 border-t border-solid">
				<div className="cursor-pointer flex-1 text-center rounded-lg hover:bg-slate-400">
					<i class="fas fa-thumbs-up text-blue-700"></i> Like
				</div>
				<div className="cursor-pointer flex-1 text-center rounded-lg hover:bg-slate-400">
					<i class="far fa-comment-alt "></i> Comment
				</div>
			</div>
		</Box>
	);
}

export default PostCard;
