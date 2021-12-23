import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postApi from '../../api/postApi';

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async () => {
	try {
		const res = await postApi.getAll();
		if (res.data.success) {
			console.log(res);
			return res.data.posts;
		}
	} catch (error) {
		console.log('1');
	}
});

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
	reducers: {},
	extraReducers: {
		[getAllPosts.fulfilled]: (state, action) => {
			state.push(action.payload);
		},
	},
});

const { reducer } = postSlice;
export default reducer;
