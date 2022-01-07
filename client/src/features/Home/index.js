import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import postApi from '../../api/postApi';
import Box from '../../components/Box';
import Button from '../../components/Button';
import CardSection from '../../components/CardSection';
import Post from '../Post';
import PostCard from '../Post/components/PostCard';
import { setPostList } from '../Post/postSlice';

function Home() {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

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

	const postList = useSelector((state) => state.post.postList);

	return (
		<div className="w-full flex justify-center pb-10">
			<div className="flex flex-col max-w-[65.6rem] w-full">
				<Post />
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
			</div>
			<div className="w-[32rem] self-start flex-col space-y-8 ml-8 rounded-lg hidden lg:flex">
				<CardSection title="Stories">
					<div className="flex-col space-y-4">
						<div className="flex items-center">
							<div className="w-20 h-20 border border-solid border-slate-300 rounded-full flex justify-center items-center cursor-pointer text-5xl mr-4">
								+
							</div>
							<div className="flex flex-1 flex-col space-y-2">
								<span className="text-[1.6rem]">Create your own story</span>
								<span className="text-xl">Time to story</span>
							</div>
						</div>
						<div className="flex items-center">
							<div className="w-20 h-20 border border-solid border-slate-300 rounded-full flex justify-center items-center cursor-pointer text-5xl mr-4">
								+
							</div>
							<div className="flex flex-col flex-1 space-y-2">
								<span className="text-[1.6rem]">Create your own story</span>
								<span className="text-xl">Time to story</span>
							</div>
						</div>
						<div className="flex items-center">
							<div className="w-20 h-20 border border-solid border-slate-300 rounded-full flex justify-center items-center cursor-pointer text-5xl mr-4">
								+
							</div>
							<div className="flex flex-col flex-1 space-y-2">
								<span className="text-[1.6rem]">Create your own story</span>
								<span className="text-xl">Time to story</span>
							</div>
						</div>
						<div className="mt-12">
							<Button custom="w-full" p="p-4">
								{' '}
								See All
							</Button>
						</div>
					</div>
				</CardSection>
			</div>
		</div>
	);
}
export default Home;
