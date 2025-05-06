import { fetchWithAuth } from "../apiClient";

export const addCallback = async (data) => {
  return await fetchWithAuth(`/callBack/saveCallbackUrl`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
