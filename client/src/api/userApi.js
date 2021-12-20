import axiosClient from './axiosClient';
import StorageKeys from '../constants/storageKeys';

const userApi = {
	signUp(data) {
		const url = '/register';
		return axiosClient.post(url, data);
	},
	signIn(data) {
		const url = '/login';
		return axiosClient.post(url, data);
	},
	async getUser(params) {
		const newParams = { ...params };
		const accessToken = localStorage.getItem(StorageKeys.access);
		const url = '/users';
		const response = await axiosClient.get(url, {
			params: { ...newParams },
			headers: { Authorization: `Bearer + ${accessToken}` },
		});
		return response;
	},
	async getProfile(params) {
		const newParams = { ...params };
		const url = '/detail';
		const accessToken = localStorage.getItem(StorageKeys.access);
		const response = await axiosClient.get(url, {
			params: { ...newParams },
			headers: { Authorization: `Bearer ${accessToken}` },
		});
		return response;
	},
};

export default userApi;
