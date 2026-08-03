import axios from "axios";

const BASE_URL = "https://salessaavy.onrender.com/api/cart";

const getAuthHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  };
};

export const addToCart = (productId) => {
  return axios.post(`${BASE_URL}/add/${productId}`, {}, getAuthHeader());
};

export const getCart = () => {
  return axios.get(`${BASE_URL}`, getAuthHeader());
};

export const increaseQuantity = (productId) => {
  return axios.put(`${BASE_URL}/increase/${productId}`, {}, getAuthHeader());
};

export const decreaseQuantity = (productId) => {
  return axios.put(`${BASE_URL}/decrease/${productId}`, {}, getAuthHeader());
};

export const removeItem = (productId) => {
  return axios.delete(`${BASE_URL}/remove/${productId}`, getAuthHeader());
};

export const clearCart = () => {
  return axios.delete(`${BASE_URL}/clear`, getAuthHeader());
};