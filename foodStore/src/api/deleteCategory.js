import axiosAdmin from "./axiosAdmin";

const deleteCategory = {
    delete(id){
        const url = `/category/${id}`;
        return axiosAdmin.delete(url);
    }
}

export default deleteCategory;