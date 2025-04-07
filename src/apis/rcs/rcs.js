import { fetchWithAuth } from "../apiClient";

// get campaign report
export const fetchCampaignReport = async (data) => {
  return await fetchWithAuth("/proCpaasRest/rcs/getCampaignReport", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get summary report
export const fetchSummaryReport = async (data) => {
  return await fetchWithAuth("/proCpaasRest/rcs/getSummaryReport", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// fetch all bots list
export const fetchAllBotsList = async (agent_id = "") => {
  return await fetchWithAuth(
    `proCpaasRest/rcs/bot/getListOfAgents?agentId=${agent_id}`,
    {
      method: "POST",
    }
  );
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
  return await fetchWithAuth("/proCpaasRest/rcs/getReplyReport", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// fetch all agents(bots) list
export const fetchAllAgents = async () => {
  return await fetchWithAuth("/proCpaasRest/rcs/showAgentList", {
    method: "POST",
  });
};

// fetch all templates list
export const fetchAllTemplates = async () => {
  return await fetchWithAuth("/proCpaasRest/rcsTemplate/showTemplates", {
    method: "POST",
  });
};

// update template status by srno
export const updateTemplateStatusbySrno = async (data) => {
  return await fetchWithAuth(
    "/proCpaasRest/rcsTemplate/updateStatusByTemplateSrNo",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
};

// fetch template details by srno
export const fetchTemplateDetails = async (srno) => {
  return await fetchWithAuth(
    `/proCpaasRest/rcsTemplate/showTemplateDetailsBySrNo?srno=${srno}`,
    {
      method: "POST",
    }
  );
};

// delete template by srno
export const deleteTemplate = async (srno) => {
  return await fetchWithAuth(
    `/proCpaasRest/rcsTemplate/deleteTemplate?srno=${srno}`,
    {
      method: "POST",
    }
  );
};

// create template
export const saveRcsTemplate = async (data) => {
  return await fetchWithAuth(`/proCpaasRest/rcsTemplate/saveRcsTemplate`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
