import axios from "axios";

const API = axios.create({
  baseURL: "https://salessaavy.onrender.com",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");


    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => {
   
    return response;
  },
  (error) => {
    console.error("API ERROR :", error);

    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;