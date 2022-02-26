import axiosClient from "./axiosClient";
import StorageKeys from "../constants/storageKeys";
const accessToken = localStorage.getItem(StorageKeys.accessToken);

const userApi = {
    register(data) {
        const url = "auth/register";
        return axiosClient.post(url, data);
    },

    login(data) {
        const url = "auth/login";
        return axiosClient.post(url, data);
    },
    async getUser() {
        const url = "/auth";
        const response = await axiosClient.get(url, {
            headers: { accessToken },
        });
        return response;
    },

    async getUserById(id) {
        const url = `/user/${id}`;

        const response = await axiosClient.get(url, {
            headers: { accessToken },
        });

        return response;
    },
    async getProfileByID(id) {
        const url = `/post/profile/${id}`;

        const response = await axiosClient.get(url, {
            headers: { accessToken },
        });

        return response;
    },
};

export default userApi;
