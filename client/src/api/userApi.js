import axiosClient from './axiosClient';
import StorageKeys from '../constants/storageKeys';

const userApi = {
	register(data) {
		const url = 'auth/register';
		return axiosClient.post(url, data);
	},

	login(data) {
		const url = 'auth/login';
		return axiosClient.post(url, data);
	},
	async getUser() {
		const accessToken = localStorage.getItem(StorageKeys.accessToken);
		const url = '/auth';
		const response = await axiosClient.get(url, {
			headers: { accessToken },
		});
		return response;
	},

	async getUserById(id) {
		const accessToken = localStorage.getItem(StorageKeys.accessToken);
		const url = `/user/${id}`;
		const response = await axiosClient.get(url, {
			headers: { accessToken },
		});
		return response;
	},
	async getProfile(params) {
		const newParams = { ...params };
		const url = '/detail';
		const accessToken = localStorage.getItem(StorageKeys.accessToken);
		const response = await axiosClient.get(url, {
			params: { ...newParams },
			headers: { accessToken },
		});
		return response;
	},
};

export default userApi;
