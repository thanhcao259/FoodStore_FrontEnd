import axiosAdmin from "./axiosAdmin";
import axiosClient from "./axiosClient";

const listProducts= {
    getAll(){
        const url = '/products/get-all';
        return axiosClient.get(url);
    },
    getAllByAdmin(){
        const url = '/admin/products/get-all';
        return axiosAdmin.get(url);
    },
    delete(id){
        const url = `/admin/products/${id}`;
        return axiosClient.delete(url);
    },
    getById(id){
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },
    update(id, data){
        const url = `/admin/products/${id}`;
        return axiosClient.put(url, data, {headers:{
            'Content-Type': 'multipart/form-data',
        }});
    },
    getByCategory(id){
        const url = `/products/products-by-cate?cateId=${id}`;
        return axiosClient.get(url);
    },
    getAndSort(idCategory, sortBy, sortDir, pageNo){
        const url = `/products?sortDir=${sortDir}&sortBy=${sortBy}&idCategory=${idCategory}&pageNo=${pageNo}`;
        return axiosClient.get(url);
    },

    search(searchName){
        const url = `/products/search?keyword=${searchName}`;
        return axiosClient.get(url);
    },
    searchPagation(searchName, sortBy, sortDir, pageNo){
        const url = `/products/searching?sortDir=${sortDir}&sortBy=${sortBy}&keyword=${searchName}&pageNo=${pageNo}`;
        return axiosClient.get(url);

    },
    changeStatus(id){
        const url =`/product-change-status/${id}`;
        return axiosAdmin.put(url);
    },
    searchByCategory(cateName){
        const url = `/search-by-cate=${cateName}`;
        return axiosClient.get(url);
    }
};

export default listProducts;