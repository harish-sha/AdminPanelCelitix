import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
// const apiUrl = "/api";

// Login
export const login = async (inputDetails) => {
  return await axios.post(`${apiUrl}/auth/login`, inputDetails, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Forgot Password
export const forgotPassword = async (inputDetails) => {
  return await axios.post(
    `${apiUrl}/user/forgotpassword`,
    {
      userId: inputDetails.userId,
      mobileNo: inputDetails.mobileNo,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

// Verify OTP
export const verifyOtp = async (data) => {
  return await axios.post(`${apiUrl}/user/validateOtp`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// request OTP 
export const requestOtp = async (data) => {
  return await axios.post(`${apiUrl}/auth/request-otp`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
