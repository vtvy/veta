import axios from 'axios';
const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		'content-type': 'application/json',
		// 'Content-Type': 'multipart/form-data',
	},
});

export default axiosClient;
