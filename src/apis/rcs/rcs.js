import { is } from "date-fns/locale";
import { fetchWithAuth } from "../apiClient";

// get campaign report
export const fetchCampaignReport = async (data) => {
  return await fetchWithAuth("/rcs/getCampaignReport", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// fetch campaign by srno
export const fetchCampaignBySrno = async (campSrno) => {
  return await fetchWithAuth(
    `/rcs/getCampaignReportBySrno?campSrno=${campSrno}`,
    {
      method: "POST",
    }
  );
};

// fetch campaign by srno
export const fetchCampaignDetailReport = async (
  campaignSrNo,
  mobileNo,
  page
) => {
  return await fetchWithAuth(
    `/rcs/getCampaignDetailLogs?campaignSrNo=${campaignSrNo}&mobileNo=${mobileNo}&page=${page}`,
    {
      method: "POST",
    }
  );
};

// get summary report
export const fetchSummaryReport = async (data) => {
  return await fetchWithAuth("/rcs/getSummaryReport", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// fetch all bots list
export const fetchAllBotsList = async (agent_id = "") => {
  return await fetchWithAuth(`/rcs/bot/getListOfAgents?agentId=${agent_id}`, {
    method: "POST",
  });
};

// export const fetchAgentBySrNo = async (srno) => {
//   return await fetchWithAuth(
//     `proCpaasRest/rcs/bot/getBotDetailsBySrNo?botSrNo=${srno}`,
//     {
//       method: "POST",
//     }
//   );
// };

// fetch suggestion report
export const fetchsuggestionReport = async (data) => {
  return await fetchWithAuth("/rcs/getReplyReport", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// fetch all agents(bots) list
export const fetchAllAgents = async () => {
  return await fetchWithAuth("/rcs/showAgentList", {
    method: "POST",
  });
};

// fetch all templates list
export const fetchAllTemplates = async (data = "", isActive = "") => {
  return await fetchWithAuth(
    `/rcsTemplate/showTemplates?agentId=${data}&isActive=${isActive}`,
    {
      method: "POST",
    }
  );
};

// update template status by srno
export const updateTemplateStatusbySrno = async (data) => {
  return await fetchWithAuth("/rcsTemplate/updateStatusByTemplateSrNo", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// fetch template details by srno
export const fetchTemplateDetails = async (srno) => {
  return await fetchWithAuth(
    `/rcsTemplate/showTemplateDetailsBySrNo?srno=${srno}`,
    {
      method: "POST",
    }
  );
};

// delete template by srno
export const deleteTemplate = async (srno) => {
  return await fetchWithAuth(`/rcsTemplate/deleteTemplate?srno=${srno}`, {
    method: "POST",
  });
};

// create template
export const saveRcsTemplate = async (data) => {
  return await fetchWithAuth(`/rcsTemplate/saveRcsTemplate`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Send RCS message
export const launchCampaign = async (data) => {
  return await fetchWithAuth("/sendRcs/sendRcsMessage", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// sync rcs template status
export const syncTemplateRcs = async (srno) => {
  return await fetchWithAuth(`/rcsTemplate/getRcsStatus?srno=${srno}`, {
    method: "POST",
  });
};
