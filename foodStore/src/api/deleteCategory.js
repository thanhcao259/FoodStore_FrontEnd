import axiosAdmin from "./axiosAdmin";

const deleteCategory = {
    delete(id){
        const url = `/category/${id}`;
        return axiosAdmin.delete(url);
    },
    deactive(id){
        const url = `/category-deactivate/${id}`;
        return axiosAdmin.put(url);
    }
}

export default deleteCategory;