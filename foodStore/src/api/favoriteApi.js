import axiosClient from "./axiosClient";

const favoriteApi = {
    add(idProduct){
        const url = `/user/favorite?idProduct=${idProduct}`;
        return axiosClient.post(url);
    },
    getAll(){
        const url = "/user/favorite";
        return axiosClient.get(url); 
    },
    remove(id){
        const url = `/user/favorite?idProduct=${id}`;
        return axiosClient.delete(url);
    }
};

export default favoriteApi;