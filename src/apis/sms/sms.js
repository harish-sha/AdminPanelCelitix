import { fetchWithAuth } from "../apiClient.js";

//reports
export const fetchCampaignData = async (data) => {
  return await fetchWithAuth("/proCpaasRest/getSMSCampaignData", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const fetchPreviousDayReport = async (data) => {
  return await fetchWithAuth("/proCpaasRest/getSMSPrevoiusDaysCampaignReport", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getPreviousDaysCampaignReport = async (data) => {
  return await fetchWithAuth("/proCpaasRest/getPreviousSMSCampaignDetails", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getSummaryReport = async (data) => {
  return await fetchWithAuth("/proCpaasRest/getSummaryReport", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getAttachmentLogs = async (data) => {
  return await fetchWithAuth("/proCpaasRest/getAttachmentLogs", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getCampaignDetails = async (data) => {
  return await fetchWithAuth("/proCpaasRest/getSMSCampaignDetails", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getPreviousCampaignDetails = async (data) => {
  return await fetchWithAuth("/proCpaasRest/getPreviousSMSCampaignDetails", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const downloadDetailedLogs = async (data) => {
  return await fetchWithAuth(
    `/proCpaasRest/downloadDetailedLogs?campaignSrNo=${data}`,
    {
      method: "POST",
    }
  );
};

export const searchDetailLogsByMobileNo = async (srno, mobile) => {
  return await fetchWithAuth(
    `/proCpaasRest/searchDetailLogsByMobileNo?campaignSrNo=${srno}&mobileNo=${mobile}`,
    {
      method: "POST",
    }
  );
};

export const fetchDetailsAttachment = async (srno, mbno) => {
  return await fetchWithAuth(
    `/proCpaasRest/searchDetailLogsByMobileNo?campaignSrNo=${srno}&mobileNo=${mbno}`,
    {
      method: "POST",
    }
  );
};
