import axiosClient from "./axiosClient";

const identificationApi = {
    get(){
        const url = '/auth/user-info';
        return axiosClient.get(url)
        .then(response => {
            console.log('User info:', response); // Log response to check user info
            return response;
        }).catch(error => {
            console.error('Error fetching user info: ', error); // Log error for debugging
        });
    }
};

export default identificationApi;