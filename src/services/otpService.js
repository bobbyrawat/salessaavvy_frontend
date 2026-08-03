import API from "./api";

export const sendOtp = () => {
  return API.post("/api/otp/send");
};

export const verifyOtp = (otp) => {
  return API.post("/api/otp/verify", null, {
    params: {
      otp,
    },
  });
};