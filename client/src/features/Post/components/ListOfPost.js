import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import postApi from '../../../api/postApi';
import Box from '../../../components/Box';
import { setPostList } from '../postSlice';
import PostCard from './PostCard';

function ListOfPost() {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const postList = useSelector((state) => state.post.postList);

	useEffect(() => {
		const getAllPosts = async () => {
			try {
				const res = await postApi.getAll();
				if (res.data.success) {
					const action = setPostList(res.data.listOfPost);
					dispatch(action);
					setIsLoading(false);
				}
			} catch (error) {
				alert(error);
			}
		};
		getAllPosts();
	}, []);
	return (
		<>
			{isLoading && (
				<Box custom="h-96">
					<div className="animate-pulse flex space-x-4 h-96">
						<div className="rounded-full bg-gray-700 h-20 w-20"></div>
						<div className="flex-1 space-y-20 py-1">
							<div className="h-8 bg-gray-700 rounded"></div>
							<div className="space-y-3">
								<div className="grid grid-cols-3 gap-4">
									<div className="h-8 bg-gray-700 rounded col-span-2"></div>
									<div className="h-8 bg-gray-700 rounded col-span-1"></div>
								</div>
								<div className="h-8 bg-gray-700 rounded"></div>
							</div>
						</div>
					</div>
				</Box>
			)}
			<div className="w-full flex flex-col space-y-4">
				{!isLoading &&
					postList.map((post, index) => (
						<div key={index}>
							<PostCard post={post} />
						</div>
					))}
			</div>
		</>
	);
}

export default ListOfPost;
