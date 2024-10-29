import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://rolling-api.vercel.app",
  timeout: 2000,
});

export default axiosInstance;
