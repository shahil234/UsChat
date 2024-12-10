import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4001",
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
