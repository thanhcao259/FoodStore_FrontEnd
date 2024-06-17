import axiosClient from "./axiosClient";

const commentApi = {
    add(idProduct, rate, contentReview){
        const url = `/user/reviews/create-review?prodId=${idProduct}&rate=${rate}&contentReview=${contentReview}`;
        return axiosClient.post(url);
    },
    delete(id){
        const url = `/user/reviews/${id}`;
        return axiosClient.delete(url);
    }
};

export default commentApi;