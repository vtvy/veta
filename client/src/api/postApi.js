import StorageKeys from '../constants/storageKeys';
import axiosClient from './axiosClient';

const postApi = {
	async getAll(params) {
		const url = '/posts';
		const accessToken = localStorage.getItem(StorageKeys.accessToken);
		const res = await axiosClient.get(url, {
			params,
			headers: { Authorization: `Bearer + ${accessToken}` },
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
