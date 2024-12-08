import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http:localhost:4001",
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if(err?.response?.status === 401){
        window.dispatchEvent(new CustomEvent("unauthorized"));
    }
    return err;
  }
);

export default axiosInstance;
