import { data } from "react-router-dom";
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

// fetch srno and name of user
export const fetchUserSrno = async (data) => {
  return await fetchWithAuth("/user/getUserNameList", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// update user by srno
export const updateUserbySrno = async (data) => {
  return await fetchWithAuth("/user/updateUserById", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const updateUserStatusbySrno = async (data) => {
  return await fetchWithAuth(
    `/user/updateStatusBySrno?userSrno=${data.userSrno}&status=${data.status}`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
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

// add mobile numbers
export const addMobileNumbers = async (data) => {
  return await fetchWithAuth(
    `/user/saveRegMobiles?userSrno=${data.userSrno}&mobileNumbers=${data.mbno}`,
    {
      method: "POST",
    }
  );
};

// get mobile numbers
export const getMobileNumbers = async (data) => {
  return await fetchWithAuth(`/user/getRegMobileno?userSrno=${data}`, {
    method: "POST",
  });
};

// add user
export const addUser = async (data) => {
  return await fetchWithAuth(`/user/createUser`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// save PETM Chain
export const savePETMChain = async (data) => {
  return await fetchWithAuth(`/user/setPetmData`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get PETM Chain
export const getPETMChain = async (data) => {
  return await fetchWithAuth(`/user/getPetmData?selectedUserId=${data}`, {
    method: "GET",
  });
};

// get whatsapp monthly charges
export const getCharges = async (userSrno) => {
  return await fetchWithAuth(
    `/WhatsappUserMonthlyRent/getWhatsappMontlyRate?userSrno=${userSrno}`,
    {
      method: "POST",
    }
  );
};

// save whatsapp monthly charges
export const saveCharges = async (data) => {
  return await fetchWithAuth(
    `/WhatsappUserMonthlyRent/SaveUpdateRate?selectedUserId=${data.userSrno}&monthlyRate=${data.monthlyRate}`,
    {
      method: "POST",
    }
  );
};

export const saveSMPP = async (data) => {
  return await fetchWithAuth(`/smpp/createSmppConnection`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getSMPP = async () => {
  return await fetchWithAuth(`/smpp/showSmppRecords`, {
    method: "POST",
  });
};

export const getWabaList = async () => {
  return await fetchWithAuth("/getWabaDetails", {
    method: "GET",
  });
};

export const getOperatorList = async (srno) => {
  return await fetchWithAuth(`/getOperatorList?CountrySrno=${srno}`, {
    method: "POST",
  });
};
export const getPrefixList = async (data) => {
  return await fetchWithAuth(
    `/getPrefixList?countrySrno=${data.country}&operatorSrno=${data.operator}`,
    {
      method: "POST",
    }
  );
};
export const addPrefix = async (data) => {
  return await fetchWithAuth(`/addPrefixList`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const deletePrefix = async (data) => {
  return await fetchWithAuth(`/deletePrefix`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const getCountryList = async () => {
  return await fetchWithAuth(`/getcountryList`, {
    method: "POST",
  });
};

export const getAllPlans = async (data) => {
  return await fetchWithAuth(`/plan/getAllPlans`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const createPlan = async (data) => {
  return await fetchWithAuth(`/plan/createPlan`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const deletePlan = async (data) => {
  return await fetchWithAuth(`/plan/createPlan`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const updateServiceStatus = async (data) => {
  return await fetchWithAuth(`/plan/updateStatusByServiceId`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const updateOpenContentStatus = async (data) => {
  return await fetchWithAuth(`/plan/updateOpenContentByServiceId`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const updateNdncStatus = async (data) => {
  return await fetchWithAuth(`/plan/updateNdncByServiceId`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const updateOpenMobileStatus = async (data) => {
  return await fetchWithAuth(`/plan/updateOpenMobileByServiceId`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getPlanDetailsByServiceId = async (srno) => {
  return await fetchWithAuth(
    `/plan/getPlanDetailsByServiceId?serviceId=${srno}`,
    {
      method: "POST",
    }
  );
};
export const updatePlan = async (data) => {
  return await fetchWithAuth(`/plan/editPlan`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const addOperator = async (data) => {
  return await fetchWithAuth(`/saveOperator`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const deleteOperator = async (data) => {
  return await fetchWithAuth(`/deleteOperatorBySrno?srNo=${data}`, {
    method: "POST",
  });
};

export const editOperatorData = async (data) => {
  return await fetchWithAuth(`/editOperator`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getSMPPDetailsById = async (id) => {
  return await fetchWithAuth(
    `/smpp/getSmppDetailsByServiceId?serviceId=${id}`,
    {
      method: "POST",
    }
  );
};

export const updateSMPP = async (data) => {
  return await fetchWithAuth(`/smpp/editSmppConnection`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const liveMonitoringWhatsapp = async () => {
  return await fetchWithAuth(`/liveMonitoring/whatsapp-report`, {
    method: "GET",
  });
};
export const liveMonitoringRCS = async () => {
  return await fetchWithAuth(`/liveMonitoring/rcs-report`, {
    method: "GET",
  });
};
export const liveMonitoringRCSStatus = async () => {
  return await fetchWithAuth(`/liveMonitoring/rcs-status-report`, {
    method: "GET",
  });
};
export const liveMonitoringSendingService = async () => {
  return await fetchWithAuth(
    `/liveMonitoring/sending-service-data?type=Sending Current Progress`,
    {
      method: "GET",
    }
  );
};

export const getNotificationList = async () => {
  return await fetchWithAuth(`/notification/list`, {
    method: "GET",
  });
};

export const getNotification = async (data) => {
  return await fetchWithAuth(
    `/notification/get-notification?reminderSrno=${data.reminderSrno}&type=${data.type}`,
    {
      method: "GET",
    }
  );
};

export const deleteNotification = async (data) => {
  return await fetchWithAuth(
    `/notification/delete-notification?reminderSrno=${data.reminderSrno}&notificationStatus=${data.status}&type=${data.type}`,
    {
      method: "DELETE",
    }
  );
};

export const saveNotification = async (type, data) => {
  return await fetchWithAuth(`/notification/save-notification?type=${type}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const deleteRcsBot = async (srno) => {
  return await fetchWithAuth(`/rcs/bot/delete-bot?srNo=${srno}`, {
    method: "DELETE",
  });
};
