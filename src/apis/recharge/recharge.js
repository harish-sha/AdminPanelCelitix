import { fetchWithAuth } from "../apiClient";

export const rechargeCreateOrderCashFree = async (data) => {
  return await fetchWithAuth("/cashfree/create-order", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const verifyRechargeStatus = async (data) => {
  return await fetchWithAuth("/cashfree/verify", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
