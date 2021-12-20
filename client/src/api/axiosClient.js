import axios from 'axios';
const axiosClient = axios.create({
	baseUrl: process.env.REACT_APP_API_URL,
	headers: {
		'content-type': 'application/json',
	},
});

export default axiosClient;
