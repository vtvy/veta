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

const initialState = [
	{
		title: 'Hey man',
		content:
			'Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma – which is living with the results of other people’s thinking. ',
	},
];

const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: {
		[getAllPosts.fulfilled]: (state, action) => {
			state.push(action.payload);
		},
	},
});

const { reducer } = postSlice;
export default reducer;
