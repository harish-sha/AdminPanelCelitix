import { fetchWithAuth } from "../apiClient.js";

// Get User Details
export const getUserDetails = async () => {
  return await fetchWithAuth("/proCpaasRest/auth/getuserdetails", {
    method: "GET",
  });
};
