import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postApi from '../../api/postApi';

export const createPost = createAsyncThunk('posts/create', async (payload) => {
	try {
		const res = await postApi.create(payload);
		if (res.data.success) {
			console.log(1);
			console.log(res);
		} else console.log(res);
	} catch (error) {
		console.log(error);
	}
});

const initialState = [
	{
		postId: '123',
		title: 'Hey man',
		postText:
			'Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma – which is living with the results of other people’s thinking. ',
		postImage: '',
	},
	{
		postId: '123',
		title: 'Hey man',
		postText:
			'Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma – which is living with the results of other people’s thinking. ',
		postImage: '',
	},
];

const postSlice = createSlice({
	name: 'posts',
	initialState: {
		postList: initialState,
		pending: true,
	},
	reducers: {
		setPostList: (state, action) => {
			const postList = action.payload.map((post) => {
				return {
					...post,
					postImage: `${
						post.postImage
							? `${process.env.PUBLIC_URL}/assets/uploads/posts/${post.postImage}`
							: ''
					}`,
				};
			});

			// var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24 * 365);

			const compareDate = (a, b) => {
				const date1 = Date(a);
				const date2 = Date(b);
				return date1 > date2 ? 1 : -1;
			};
			postList.sort((a, b) => compareDate(a.updatedAt, b.updatedAt));
			state.postList = postList;
		},
	},
});

const { actions, reducer } = postSlice;
export const { setPostList } = actions;
export default reducer;
