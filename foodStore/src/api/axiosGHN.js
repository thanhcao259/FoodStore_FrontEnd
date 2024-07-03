import axios from "axios";
import Cookies from "js-cookie";
import { getToken } from "../utils/auth";

const API_GHN = "c5e34783-36b0-11ef-b3e6-26fb3de580b4";

const axiosGHN = axios.create({
    baseURL: "https://online-gateway.ghn.vn/shiip/public-api",
    headers:{
        'Token': API_GHN,
        'Content-Type': 'application/json',
    },
});


axiosGHN.interceptors.request.use( 
    (config) => {
        // const token = getToken();
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    }
,  (error) => {
    return Promise.reject(error);
});

// Add a response interceptor
axiosGHN.interceptors.response.use(
    (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


export default axiosGHN;