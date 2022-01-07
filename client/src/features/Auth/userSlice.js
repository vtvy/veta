import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import StorageKeys from '../../constants/storageKeys';

export const register = createAsyncThunk('auth/register', async (payload) => {
	try {
		const res = await userApi.register(payload);
		if (res.data.success) {
			localStorage.setItem(StorageKeys.accessToken, res.data.accessToken);
			const resUser = await userApi.getUser();
			const user = resUser.data.user;
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
			const user = resUser.data.user;
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
		isLoggedIn: localStorage.getItem(StorageKeys.accessToken) ? true : false,
	},
	reducers: {
		setUser(state, action) {
			state.current = action.payload;
		},
		logOut(state) {
			state.current = {};
			state.isLoggedIn = false;
			localStorage.removeItem(StorageKeys.accessToken);
		},
	},
	extraReducers: {
		[register.fulfilled]: (state, action) => {
			state.current = action.payload;
			state.isLoggedIn = true;
		},
		[login.fulfilled]: (state, action) => {
			state.current = action.payload;
			state.isLoggedIn = true;
		},
	},
});

const { actions, reducer } = userSlice;
export const { logOut, setUser } = actions;
export default reducer;
