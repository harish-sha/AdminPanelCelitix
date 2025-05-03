import { fetchWithAuth } from "../apiClient.js";

export const getAllDownloadsList = async () => {
  return await fetchWithAuth("/rcs/showAllDownloadReports", {
    method: "GET",
  });
};
