import React from 'react';
import { useSelector } from 'react-redux';
import Box from '../../components/Box';
import Post from '../Post';
import PostCard from '../Post/components/PostCard';

function Home() {
	const postList = useSelector((state) => state.post.postList);
	return (
		<div className="flex flex-col gap-4">
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
