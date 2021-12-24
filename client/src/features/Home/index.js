import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import postApi from '../../api/postApi';
import Box from '../../components/Box';
import Post from '../Post';
import PostCard from '../Post/components/PostCard';
import { setPostList } from '../Post/postSlice';

function Home() {
	const dispatch = useDispatch();
	useEffect(() => {
		const getAllPosts = async () => {
			try {
				const res = await postApi.getAll();
				if (res.data.success) {
					const action = setPostList(res.data.listOfPost);
					dispatch(action);
				}
			} catch (error) {
				alert(error);
			}
		};
		getAllPosts();
	}, []);

	const postList = useSelector((state) => state.post.postList);

	return (
		<div className="flex w-full flex-col gap-4">
			<div className="story-slide">
				<Box width="w-full">
					<div className="h-80"></div>
				</Box>
			</div>
			<Post />
			{postList.map((post, index) => (
				<div key={index}>
					<PostCard post={post} />
				</div>
			))}
		</div>
	);
}
export default Home;

// const dispatch = useDispatch();
// const [user, setUser] = useState({});
// const accessToken = localStorage.getItem(StorageKeys.accessToken);
// useEffect(() => {
// 	const getUser = async () => {
// 		console.log(1);
// 		try {
// 			console.log(2);
// 			const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth`, {
// 				headers: { accessToken },
// 			});
// 			if (res.data.success) {
// 				setUser(res.data.user);
// 			}
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};
// 	getUser();
// }, []);
// const action = getUser(user);
// dispatch(action);
