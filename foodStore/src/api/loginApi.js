import axiosClient from "./axiosClient";

const loginApi = {
    add(data){
        const url = '/login';
        return axiosClient.post(url, data)
        .then(response => {
            console.log('Response from server: ', response);
            return response;
        });
    }
};

export default loginApi;