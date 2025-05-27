import axios from "axios"
import { BASE_URL } from "./apiPaths.js";
//TODO:-par le bhai yeh kyun bana hai and sir ne kyun nhi karaya tha
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});
// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                // Handle unauthorized access, e.g., redirect to login
                console.error("Unauthorized access - redirecting to login");
                //localStorage.removeItem("token");
                window.location.href = "/";
            } else if (error.response && error.response.status === 500) {

                console.error("Server error.Please try again later.");
            }
            return Promise.reject(error);
        }
        else if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
            console.error("Request timed out or network error. Please try again later.");
            return Promise.reject(error);
        }
    }
);
export default axiosInstance;