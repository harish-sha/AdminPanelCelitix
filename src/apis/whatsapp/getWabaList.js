import { fetchWithAuth } from "../apiClient.js";

export const getWabaList = async () => {
  return await fetchWithAuth("/whatsapp/getwabadetails");
};

// import { fetchWithAuth } from "../apiClient.js";

// export const getWabaList = async () => {
//   const response = await fetchWithAuth("/whatsapp/getwabadetails");
//   if (response) {
//     return response; // This will be the WABA list returned by the API
//   } else {
//     console.error("Failed to fetch WABA list.");
//     return null;
//   }
// };
