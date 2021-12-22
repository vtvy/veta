import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import Avatars from '../../assets/images/avatars';
import StorageKeys from '../../constants/storageKeys';

export const register = createAsyncThunk('auth/register', async (payload) => {
	console.log(payload);
	try {
		const res = await userApi.register(payload);
		console.log(res);
		if (res.data.success) {
			const user = {
				firstName: 'Minh',
				lastName: 'Nhat',
				email: 'nhatyugioh@gmail.com',
				avatar: `${Avatars[1]}`,
				id: '007',
			};
			localStorage.setItem(StorageKeys.accessToken, res.data.accessToken);
			localStorage.setItem(StorageKeys.user, JSON.stringify(user));
			return user;
		} else {
			alert(res.data.message);
			return {};
		}
	} catch (err) {
		console.log(err);
	}
});

export const login = createAsyncThunk('auth/login', async (payload) => {
	try {
		const res = await userApi.login(payload);
		console.log(res);
		if (res.data.success) {
			const user = {
				firstName: 'Minh',
				lastName: 'Nhat',
				email: 'nhatyugioh@gmail.com',
				avatar: `${Avatars[1]}`,

				id: '007',
			};
			localStorage.setItem(StorageKeys.accessToken, res.data.accessToken);
			localStorage.setItem(StorageKeys.user, JSON.stringify(user));
			return user;
		} else {
			alert(res.data.message);
			return {};
		}
		// const responseUser = await userApi.getUser();
		// const user = { ...responseUser.data[0] };
		// const responseProfile = await userApi.getProfile({ user: user.id });
		// const profile = { ...responseProfile.data };
		// const data = {
		// 	...user,
		// 	...profile,
		// };
		// localStorage.setItem(StorageKeys.user, JSON.stringify(data));
		// return data;
	} catch (error) {
		console.log(error);
		return error.message;
	}
});

const userSlice = createSlice({
	name: 'user',
	initialState: {
		current: JSON.parse(localStorage.getItem(StorageKeys.user)) || {},
		settings: {},
	},
	reducers: {
		getUser(state, action) {
			state.current = action.payload;
		},
		logout(state) {
			console.log(5);
			state.current = {};
			localStorage.removeItem(StorageKeys.accessToken);
			localStorage.removeItem(StorageKeys.user);
		},
	},
	extraReducers: {
		[login.fulfilled]: (state, action) => {
			state.current = action.payload;
		},
	},
});

const { actions, reducer } = userSlice;
export const { logout, getUser } = actions;
export default reducer;
