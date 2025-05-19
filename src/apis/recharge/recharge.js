import { fetchWithAuth } from "../apiClient.js";

export const recharge = async (data) => {
  return await fetchWithAuth("/recharge", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
