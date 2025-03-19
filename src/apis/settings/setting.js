import { fetchWithAuth } from "../apiClient.js";

// Get New API KEY
export const getApiKey = async () => {
  return await fetchWithAuth("/proCpaasRest/settings/generateKey", {
    method: "POST",
  });
};

// Update API KEY
export const updateApiKey = async (newAPIKey) => {
  return await fetchWithAuth(
    `proCpaasRest/settings/changeuniquekey?newkey=${newAPIKey}`,
    {
      method: "POST",
    }
  );
};

// fetch Login Ip Details
export const fetchIpDetails = async () => {
  return await fetchWithAuth("/proCpaasRest/settings/showIpDetails", {
    method: "POST",
  });
};
