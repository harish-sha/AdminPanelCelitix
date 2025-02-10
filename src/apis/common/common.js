import { fetchWithAuth } from "../apiClient.js";

export const getCountryList = async () => {
  return await fetchWithAuth("/proCpaasRest/getcountryList", {
    method: "POST",
  });
};
