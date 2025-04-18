import { fetchWithAuth } from "../apiClient.js";

// Get New API KEY
export const getApiKey = async () => {
  return await fetchWithAuth("/settings/generateKey", {
    method: "POST",
  });
};

export const getOldApiKey = async () => {
  return await fetchWithAuth(`/settings/getApikey`, {
    method: "POST",
  });
};

// Update API KEY
export const updateApiKey = async (newAPIKey) => {
  return await fetchWithAuth(
    `/settings/changeuniquekey?newkey=${newAPIKey}`,
    {
      method: "POST",
    }
  );
};

// fetch Login Ip Details
export const fetchIpDetails = async () => {
  return await fetchWithAuth("/settings/showIpDetails", {
    method: "POST",
  });
};

// fetch transaction history
export const fetchTransactions = async (filterData) => {
  return await fetchWithAuth(
    `/accountInfo/rechargeHistory?startDate=${filterData.startDate}&toDate=${filterData.toDate}&rechargeType=${filterData.rechargeType}`,
    {
      method: "POST",
    }
  );
};

export const fetchBalance = async () => {
  return await fetchWithAuth("/user/getAccountBalanceByUser", {
    method: "POST",
  });
};
