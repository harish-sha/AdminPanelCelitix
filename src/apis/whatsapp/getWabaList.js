import { fetchWithAuth } from "../apiClient.js";

export const getWabaList = async () => {
  return await fetchWithAuth("/whatsapp/getwabadetails");
};
