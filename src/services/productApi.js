import API from "./api";

export const getAllProducts = () => API.get("/products");

export const getMyProducts = () => {
  return API.get("/products/my-products");
};

export const getProductById = (id) =>
  API.get(`/products/${id}`);

export const addProduct = (product) =>
  API.post("/products/add", product);

export const updateProduct = (id, product) =>
  API.put(`/products/update/${id}`, product);

export const deleteProduct = (id) =>
  API.delete(`/products/delete/${id}`);

export const searchProducts = (keyword) =>
  API.get(`/products/search/${keyword}`);