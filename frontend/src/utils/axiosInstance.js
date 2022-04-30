import axios from "axios";

const baseURL = "http://localhost:5000/api";
const accessToken = localStorage.getItem("accessToken");

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${JSON.parse(accessToken)}`,
  },
});

export default axiosInstance;
