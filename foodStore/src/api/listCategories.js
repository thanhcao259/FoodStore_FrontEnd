import axiosClient from "./axiosClient";
import axiosAdmin from "./axiosAdmin";

const listCategories= {
    get(){
        const url = '/categories';
        return axiosClient.get(url);
    },
    getByAdmin(){
        const url = '/admin/categories';
        return axiosClient.get(url);
    },
    getById(id){
        const url = `/category/${id}`;
        return axiosClient.get(url);
    },
    update(id, data){
        const url = `/category/${id}`;
        return axiosAdmin.put(url, data, {headers:{
            'Content-Type': 'multipart/form-data',
        }});
    }, 
    active(id){
        const url = `/category-activate/${id}`;
        return axiosAdmin.put(url);
    }
};

export default listCategories;