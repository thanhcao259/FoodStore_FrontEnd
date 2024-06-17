import axiosAdmin from "./axiosAdmin";

const addProduct = {
    add(data){
        const url= '/products';
        // return axiosAdmin.post(url, data, 
        //     {headers: {
        //     'Content-Type': 'multipart/form-data',
        // }});
        return axiosAdmin.post(url, data, {headers: {'Content-Type':'multipart/form-data'}})
        .then(response => {
            console.log(`response from server: ${response}`);
            return response;
        })

    },
};

export default addProduct;