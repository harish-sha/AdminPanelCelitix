import { fetchWithAuth } from "../apiClient";

// fetch all users
export const fetchAllUsers = async (data) => {
  return await fetchWithAuth("/user/getUserList", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// fetch user by sr no
export const fetchUserbySrno = async (srNo) => {
  return await fetchWithAuth("/user/getuserdetailsById", {
    method: "POST",
    body: JSON.stringify({ srNo }),
  });
};

// upate user by srno
export const updateUserbySrno = async (data) => {
  return await fetchWithAuth("/user/updateUserById", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Save RCS Bot
export const saveAgentRcs = async (data) => {
  return await fetchWithAuth("/rcs/bot/saveAgent", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// fetch all bots list RCS
export const fetchAllBotsList = async (agent_id = "") => {
  return await fetchWithAuth(
    `/rcs/bot/getListOfAgents?agentId=${agent_id}`,
    {
      method: "POST",
    }
  );
};

// get bot details by srno
export const getBotDetailsBySrNo = async (botSrNo) => {
  return await fetchWithAuth(
    `/rcs/bot/getBotDetailsBySrNo?botSrNo=${botSrNo}`,
    {
      method: "POST",
    }
  );
};

// get Allowed services
export const getAllowedServices = async () => {
  return await fetchWithAuth("/service/getAllowedServices", {
    method: "POST",
  });
};

// save services by user
export const saveServicesByUser = async (data) => {
  return await fetchWithAuth("/user/saveServicesByUser", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get transaction services
export const getTransServices = async () => {
  return await fetchWithAuth("/service/getTransServices", {
    method: "POST",
  });
};

// get promotional services
export const getPromoServices = async () => {
  return await fetchWithAuth("/service/getPromoServices", {
    method: "POST",
  });
};
