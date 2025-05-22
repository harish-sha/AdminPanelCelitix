import { fetchWithAuth } from "../apiClient.js";

// get all downloads reports
export const getAllDownloadsList = async () => {
  return await fetchWithAuth("/download/showAllDownloadReports", {
    method: "GET",
  });
};
