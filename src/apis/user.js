import { fetchWithAuth } from "./apiClient.js";

export const getUserDetails = async () => {
  return await fetchWithAuth("/auth/getuserdetails");
};
