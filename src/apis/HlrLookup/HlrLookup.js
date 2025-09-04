import { fetchWithAuth } from "../apiClient.js";

// add single HLR Lookup data
export const addSingleHlrData = async (data) => {
  return await fetchWithAuth(
    `/api/HLRLookUp/single?mobileno=${data.mobileno}`,
    {
      method: "POST",
    }
  );
};

// lookup report data
export const hlrLookupReport = async (data) => {
  return await fetchWithAuth(
    `/api/HLRLookUp/Report?fromdate=${data.fromdate}&todate=${data.todate}&mobileno=${data.mobileno}`,
    {
      method: "POST",
    }
  );
};
