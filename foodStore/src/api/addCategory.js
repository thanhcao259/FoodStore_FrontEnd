import { param } from "jquery";
import axiosAdmin from "./axiosAdmin";

const addCategory = {
    add(data) {
        const url = '/category';
        return axiosAdmin.post(url, data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
    }
};

export default addCategory;