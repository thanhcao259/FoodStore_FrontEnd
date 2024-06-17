import axiosClient from "./axiosClient";

const addressApi = {
    get(){
        const url = '/user/address';
        return axiosClient.get(url);
    },
    add(newAddress){
        const url = '/user/address';
        return axiosClient.post(url, {address: `${newAddress}`});
    }
};

export default addressApi;