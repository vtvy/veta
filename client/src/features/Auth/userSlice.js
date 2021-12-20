import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import StorageKeys from '../../constants/storageKeys';

export const signUp = createAsyncThunk('users/sign-up', async (payload) => {
	// return data;
});

export const signIn = createAsyncThunk('users/sign-in', async (payload) => {
	try {
		const response = await userApi.login(payload);
		localStorage.setItem(StorageKeys.access, response.data.access);
		localStorage.setItem(StorageKeys.refresh, response.data.refresh);
		const username = JSON.parse(response.config.data).username;
		const responseUser = await userApi.getUser({ username: username });
		const user = { ...responseUser.data[0] };
		const responseProfile = await userApi.getProfile({ user: user.id });
		const profile = { ...responseProfile.data };
		const data = {
			...user,
			...profile,
		};
		localStorage.setItem(StorageKeys.user, JSON.stringify(data));
		return data;
	} catch (error) {
		console.log(error);
		return error.message;
	}
});

const userSlice = createSlice({
	name: 'user',
	initialState: {
		current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
		settings: {},
	},
	reducers: {
		logout(state) {
			//clear local storage
			state.current = {};
			localStorage.removeItem(StorageKeys.access);
			localStorage.removeItem(StorageKeys.refresh);
			localStorage.removeItem(StorageKeys.user);
		},
	},
	extraReducers: {
		[signIn.fulfilled]: (state, action) => {
			state.current = action.payload;
		},

		[signIn.fulfilled]: (state, action) => {
			state.current = action.payload;
		},
	},
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
