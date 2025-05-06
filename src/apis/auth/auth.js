import axios from "axios";
const apiUrl = "/api";

// Login 
export const login = async (inputDetails) => {
  return await axios.post(
    `${apiUrl}/auth/login`,
    {
      userId: inputDetails.userId,
      password: inputDetails.password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
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
