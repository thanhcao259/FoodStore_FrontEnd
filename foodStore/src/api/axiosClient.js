import axios from "axios";
import Cookies from "js-cookie";
import { getToken } from "../utils/auth";

const axiosClient = axios.create({
    baseURL:'http://localhost:8082/api/',
    headers:{
        'Content-Type': 'application/json',
    },
});

// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use( 
    (config) => {
        const token = getToken();
        //console.log(`axios Client ${token}`)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


export default axiosClient;