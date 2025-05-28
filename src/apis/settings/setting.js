import { fetchWithAuth } from "../apiClient.js";

// Get New API KEY
export const getApiKey = async (params="") => {
  return await fetchWithAuth(`/settings/generateKey${params}`, {
    method: "POST",
  });
};

// Old API KEY
export const getOldApiKey = async (params = "") => {
  return await fetchWithAuth(`/settings/getApikey${params}`, {
    method: "POST",
  });
};

// Update API KEY
export const updateApiKey = async (newAPIKey,userSrno) => {
  return await fetchWithAuth(`/settings/changeuniquekey?newkey=${newAPIKey}&userSrno=${userSrno ||""}`, {
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
    `/accountInfo/rechargeHistory?startDate=${filterData.startDate}&toDate=${filterData.toDate}&rechargeType=${filterData.rechargeType}&userSrno=${filterData.userSrNo||""}`,
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
export const updatePassword = async (data,params = "") => {
  return await fetchWithAuth(`/settings/changePassword${params}`, {
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
