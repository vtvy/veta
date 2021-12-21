import { get } from 'immer/dist/internal';
import axiosClient from './axiosClient';

const postApi = {
	getAll(params) {
		const url = '/posts';
		return axiosClient.get(url, params);
	},
	get(id) {
		const url = `/posts/${id}`;
		return axiosClient.get(url);
	},
};
