import { fetchWithAuth } from "./apiClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getUserDetails = async () => {
  return await fetchWithAuth(`${API_BASE_URL}/auth/getuserdetails`);
};
