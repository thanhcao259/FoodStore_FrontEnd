import axiosClient from "./axiosClient";

const listProducts= {
    get(){
        const url = '/products/get-all';
        return axiosClient.get(url);
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
    seach(searchName){
        const url = `/products/search?searchName=${searchName}`;
        return axiosClient.get(url);
    }
};

export default listProducts;