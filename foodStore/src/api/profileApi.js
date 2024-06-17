import axiosClient from "./axiosClient";


const profileApi = {
    get(){
        const url = '/user/identification';
        return axiosClient.get(url);
    },
    update(data){
        const url = '/user/identification';
        return axiosClient.put(url, data, {headers:{
            'Content-Type': 'multipart/form-data',
        }});
    },
    changePassword(password, newPassword){
        const url = `/change-password?password=${password}&newPassword=${newPassword}`;
        return axiosClient.put(url);
    }
};

export default profileApi;