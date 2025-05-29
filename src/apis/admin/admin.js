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

// update user by srno
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
  return await fetchWithAuth(`/rcs/bot/getListOfAgents?agentId=${agent_id}`, {
    method: "POST",
  });
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
export const getAllowedServices = async (data = "") => {
  return await fetchWithAuth(`/service/getAllowedServices${data}`, {
    method: "POST",
  });
};
// service/getAllowedServices?userSrno=2949

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

export const addMobileNumbers = async (data) => {
  return await fetchWithAuth(
    `/user/saveRegMobiles?userSrno=${data.userSrno}&mobileNumbers=${data.mbno}`,
    {
      method: "POST",
    }
  );
};

export const getMobileNumbers = async (data) => {
  return await fetchWithAuth(`/user/getRegMobileno?userSrno=${data}`, {
    method: "POST",
  });
};

export const addUser = async (data) => {
  return await fetchWithAuth(`/user/createUser`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const savePETMChain = async (data) => {
  return await fetchWithAuth(`/user/setPetmData`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const getPETMChain = async (data) => {
  return await fetchWithAuth(`/user/getPetmData?selectedUserId=${data}`, {
    method: "GET",
  });
};
