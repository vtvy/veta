import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import StorageKeys from '../../constants/storageKeys';

export const register = createAsyncThunk('auth/register', async (payload) => {
	try {
		const res = await userApi.register(payload);
		console.log(res);
		if (res.data.success) {
			console.log(res.data);
			localStorage.setItem(StorageKeys.accessToken, res.data.accessToken);
			const resUser = await userApi.getUser();
			const user = {
				...resUser.data.user,
				avatar: `${process.env.PUBLIC_URL}/assets/uploads/avatars/${resUser.data.user.avatar}`,
			};
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

		if (res.data.success) {
			localStorage.setItem(StorageKeys.accessToken, res.data.accessToken);
			const resUser = await userApi.getUser();
			const user = {
				...resUser.data.user,
				avatar: `${process.env.PUBLIC_URL}/assets/uploads/avatars/${resUser.data.user.avatar}`,
			};

			localStorage.setItem(StorageKeys.user, JSON.stringify(user));
			return user;
		} else {
			alert(res.data.message);
			return {};
		}
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
		[register.fulfilled]: (state, action) => {
			state.current = action.payload;
		},
		[login.fulfilled]: (state, action) => {
			state.current = action.payload;
		},
	},
});

const { actions, reducer } = userSlice;
export const { logout, getUser } = actions;
export default reducer;

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
