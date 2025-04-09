// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = "/api";
import axios from "axios";

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found, redirecting to login.");
    window.location.href = "/login";
    return;
  }

  const headers = {
    // "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  // If FormData is used, do not set Content-Type header manually
  if (options.body instanceof FormData) {
    delete headers["Content-Type"];
  } else {
    headers["Content-Type"] = "application/json";
  }

  try {
    console.log(`Fetching API: ${API_BASE_URL}${endpoint}`);

    const response = await axios({
      method: options.method || "GET",
      url: `${API_BASE_URL}${endpoint}`,
      data: options.body,
      headers,
    });

    if (response.statusText !== "OK") {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      return;
    }

    return response.data;
  } catch (error) {
    if (error?.status === 401) {
      console.error("Session expired. Redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/login";
      return null;
    }
    if (error?.status === 400) {
      // console.log(error)
      return error;
    }
    console.error("Network Error:", error);
  }
};
