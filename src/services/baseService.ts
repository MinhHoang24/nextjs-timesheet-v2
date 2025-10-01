import { API_BASE_URL } from "@/config/apiConfig";
import axios from "axios";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
     if (userId) {
      config.params = { ...(config.params || {}), "Id": userId};
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;