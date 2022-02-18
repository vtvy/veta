import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import postApi from '../../../api/postApi';
import Post from '../../Post';
import ListOfPost from '../../Post/components/ListOfPost';
import { setPostList } from '../../Post/postSlice';
import ProfileSidebar from '../components/ProfileSidebar';

function Timeline() {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const postList = useSelector((state) => state.post.postList);
	useEffect(() => {
		const getPosts = async () => {
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
		getPosts();
	}, []);
	return (
		<div className="flex w-full">
			<ProfileSidebar />

			<div className="flex-1">
				<Post />
				<ListOfPost postList={postList} isLoading={isLoading} />
			</div>
		</div>
	);
}

export default Timeline;
