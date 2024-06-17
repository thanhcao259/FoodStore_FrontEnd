import axiosClient from "./axiosClient";

const cartAction = {
    add(data){
        const url = '/user/cart/add-cart';
        return axiosClient.post(url, data);
    },
    getAll(){
        const url = '/user/get-cart';
        return axiosClient.get(url);
    },
    remove(id){
        const url = `/user/cart/delete-items/${id}`;
        return axiosClient.delete(url);
    },
    updateQuantity(idProduct, quantity){
        const url = `/user/cart/set-quantity/${idProduct}?quantity=${quantity}`;
        return axiosClient.put(url);
    }
};

export default cartAction;