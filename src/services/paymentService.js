import API from "./api";

export const createOrder = (amount) => {
  return API.post("/api/payment/create-order", {
    amount,
  });
};