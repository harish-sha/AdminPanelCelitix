import { fetchWithAuth } from "../apiClient.js";

// get campaign report
export const fetchCampaignData = async (data) => {
  return await fetchWithAuth("/proCpaasRest/getSMSCampaignData", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// campaign details reports
export const getCampaignDetails = async (data) => {
  return await fetchWithAuth("/proCpaasRest/getSMSCampaignDetails", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get previous day report
export const fetchPreviousDayReport = async (data) => {
  return await fetchWithAuth("/proCpaasRest/getSMSPrevoiusDaysCampaignReport", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get previous day details report
export const getPreviousCampaignDetails = async (data) => {
  return await fetchWithAuth("/proCpaasRest/getPreviousSMSCampaignDetails", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get summary report
export const getSummaryReport = async (data) => {
  return await fetchWithAuth("/proCpaasRest/getSummaryReport", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// log report
export const getAttachmentLogs = async (data) => {
  return await fetchWithAuth("/proCpaasRest/getAttachmentLogs", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// download detailed logs
export const downloadDetailedLogs = async (data) => {
  return await fetchWithAuth(
    `/proCpaasRest/downloadDetailedLogs?campaignSrNo=${data}`,
    {
      method: "POST",
    }
  );
};

// download detailed logs 
export const fetchDetailsAttachment = async (srno, mbno) => {
  return await fetchWithAuth(
    `/proCpaasRest/searchDetailLogsByMobileNo?campaignSrNo=${srno}&mobileNo=${mbno}`,
    {
      method: "POST",
    }
  );
};
