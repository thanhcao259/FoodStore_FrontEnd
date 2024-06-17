import axiosAdmin from "./axiosAdmin";
import Cookies from "js-cookie";

const token = Cookies.get('token');

const listUsers = {
    get(){
        const url = '/get-users';
        return axiosAdmin.get(url);
    }
};

export default listUsers;