import axiosClient from "./axiosClient";

const registerApi = {
    add(data){
        const url = '/registration';
        return axiosClient.post(url, data);
    },
};

export default registerApi;