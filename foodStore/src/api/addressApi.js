import axiosClient from "./axiosClient";

const addressApi = {
    get(){
        const url = '/user/address';
        return axiosClient.get(url);
    },
    add(newAddress){
        const url = '/user/address';
        return axiosClient.post(url, {address: `${newAddress}`});
    }, 
    getById(id){
        const url = `/user/address/${id}`;
        return axiosClient.get(url);
    }
};

export default addressApi;