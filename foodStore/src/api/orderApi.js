import axiosClient from "./axiosClient";
import axiosAdmin from "./axiosAdmin";

const orderApi = {
    add(idAddress, userName, phone){
        const url = '/user/order';
        return axiosClient.post(url, {
            addressId: `${idAddress}`,
            name: `${userName}`,
            phone: `${phone}`
        });
    },
    addOnl(idAddress, userName, phone, totalPrice){
        const url = `/payment/pay?totalPrice=${totalPrice}&addressId=${idAddress}&name=${userName}&phone=${phone}`;
        return axiosClient.get(url);
    },
    getAll(){
        const url = '/orders';
        return axiosAdmin.get(url);
    },
    getDetailOrder(orderId){
        const url = `/user/detail-order/${orderId}`;
        return axiosClient.get(url);
    },
    getDetailOrderAdmin(orderId){
        const url = `/detail-order/${orderId}`;
        return axiosAdmin.get(url);
    },
    getByUser(){
        const url = '/user/orders';
        return axiosClient.get(url);
    },
    updateStatus(orderId, statusOrderId){
        const url = `order/update-status?orderId=${orderId}&statusOrderId=${statusOrderId}`;
        return axiosAdmin.put(url);
    },
    receivedOrder(id){
        const url = `/user/received-order?id=${id}`;
        return axiosClient.put(url);
    },
    cancelOrder(id){
        const url = `/user/cancel-order?id=${id}`;
        return axiosClient.put(url);
    }
};

export default orderApi;