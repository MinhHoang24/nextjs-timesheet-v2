import { API_BASE_URL } from "@/config/apiConfig";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    toast.error(error.response?.data.error.message);
    return Promise.reject(error);
  }
);

export default api;