import { fetchWithAuth } from "../apiClient.js";

// add email template
export const addEmailTemplate = async (data) => {
  return await fetchWithAuth("/email/add-template", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
