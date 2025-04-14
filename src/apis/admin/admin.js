import { fetchWithAuth } from "../apiClient";

// fetch all users
export const fetchAllUsers = async (data) => {
  return await fetchWithAuth("/proCpaasRest/user/getUserList", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// fetch user by sr no
export const fetchUserbySrno = async (srNo) => {
  return await fetchWithAuth("/proCpaasRest/user/getuserdetailsById", {
    method: "POST",
    body: JSON.stringify({ srNo }),
  });
};

// update user by srno
export const updateUserbySrno = async (data) => {
  return await fetchWithAuth("/proCpaasRest/user/updateUserById", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Save RCS Bot
export const saveAgentRcs = async (data) => {
  return await fetchWithAuth("/proCpaasRest/rcs/bot/saveAgent", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// fetch all bots list RCS
export const fetchAllBotsList = async (agent_id = "") => {
  return await fetchWithAuth(
    `/proCpaasRest/rcs/bot/getListOfAgents?agentId=${agent_id}`,
    {
      method: "POST",
    }
  );
};

// get bot details by srno
export const getBotDetailsBySrNo = async (botSrNo) => {
  return await fetchWithAuth(
    `/proCpaasRest/rcs/bot/getBotDetailsBySrNo?botSrNo=${botSrNo}`,
    {
      method: "POST",
    }
  );
};

// get Allowed services
export const getAllowedServices = async () => {
  return await fetchWithAuth("/proCpaasRest/service/getAllowedServices", {
    method: "POST",
  });
};

// save services by user
export const saveServicesByUser = async (data) => {
  return await fetchWithAuth("/proCpaasRest/user/saveServicesByUser", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get transaction services
export const getTransServices = async () => {
  return await fetchWithAuth("/proCpaasRest/service/getTransServices", {
    method: "POST",
  });
};

// get promotional services
export const getPromoServices = async () => {
  return await fetchWithAuth("/proCpaasRest/service/getPromoServices", {
    method: "POST",
  });
};
