import { fetchWithAuth } from "../apiClient.js";

// Get New API KEY
export const getApiKey = async () => {
  return await fetchWithAuth("/settings/generateKey", {
    method: "POST",
  });
};

// Old API KEY
export const getOldApiKey = async () => {
  return await fetchWithAuth(`/settings/getApikey`, {
    method: "POST",
  });
};

// Update API KEY
export const updateApiKey = async (newAPIKey) => {
  return await fetchWithAuth(`/settings/changeuniquekey?newkey=${newAPIKey}`, {
    method: "POST",
  });
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

// Fetch Account Balance
export const fetchBalance = async () => {
  return await fetchWithAuth("/user/getAccountBalanceByUser", {
    method: "POST",
  });
};

// Update Password
export const updatePassword = async (data) => {
  return await fetchWithAuth("/settings/changePassword", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Login Request Ip
export const LoginRequestIp = async (data) => {
  return await fetchWithAuth("/settings/setLoginRequestIp", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// daily wallet usage
export const dailyWalletUsage = async (data) => {
  return await fetchWithAuth("/wallet/getdailyamountusage", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// daily wallet usage
export const dailySeriveUsage = async (data) => {
  return await fetchWithAuth(
    `/service/service-wise-usage?userSrno=${data.userSrno}&fromDate=${data.fromDate}&toDate=${data.toDate}`,
    {
      method: "POST",
    }
  );
};
