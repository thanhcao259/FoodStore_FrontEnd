import axiosClient from "./axiosClient";

const resetPasswordApi = {
  add(username, token, password) {
    const url = `/update-password?username=${username}&tokenForgot=${token}&password=${password}`;
    return axiosClient.post(url);
  },
  
  verifyMail(data){
    const url = '/verifyMail';
    return axiosClient.post(url, data)
    .then(response => {
      return response;
    })
  },

  resetPsw(data){
    const url = '/set-new-password';
    axiosClient.post(url, data)
    .then(response => {console.log('Response ',response);return response})
    //.catch(err => {console.log('Err ', err); throw err})
  }
};

export default resetPasswordApi;