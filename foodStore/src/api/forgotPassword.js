import axiosClient from "./axiosClient";

const forgotPasswordApi = {
  add(email) {
    const url = `/forgot-password?email=${email}`;
    return axiosClient.post(url);
  },
};

export default forgotPasswordApi;