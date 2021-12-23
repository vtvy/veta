import StorageKeys from '../constants/storageKeys';
import axiosClient from './axiosClient';

const postApi = {
	create(data) {
		const url = '/post/create';
		const accessToken = localStorage.getItem(StorageKeys.accessToken);
		return axiosClient.post(url, data, {
			headers: { accessToken },
		});
	},

	async getAll() {
		const url = '/post';
		const accessToken = localStorage.getItem(StorageKeys.accessToken);
		const res = await axiosClient.get(url, {
			headers: { accessToken },
		});
		return res;
	},
	async get(id) {
		const url = `/posts/${id}`;
		const accessToken = localStorage.getItem(StorageKeys.accessToken);
		const res = await axiosClient.get(url, {
			headers: { Authorization: `Bearer + ${accessToken}` },
		});
		return res;
	},
};

export default postApi;
