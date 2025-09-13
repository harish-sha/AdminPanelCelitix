import { fetchWithAuth } from "../apiClient.js";

// get campaign report
export const fetchCampaignData = async (data) => {
  return await fetchWithAuth("/getSMSCampaignData", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get schedule campaign report
export const fetchScheduleCampaignData = async (selectedUserId = "0") => {
  return await fetchWithAuth(
    `/getScheduledSMSCampaignReport?selectedUserId=${selectedUserId}`,
    {
      method: "POST",
    }
  );
};

// cancel campaign
export const cancelScheduleCampaignSms = async ({ srno, selectedUserId = "0" }) => {
  return await fetchWithAuth(
    `/cancelCampaign?srNo=${srno}&selectedUserId=${selectedUserId}`,
    {
      method: "POST",
    }
  );
};

// campaign details reports
export const getCampaignDetails = async (data) => {
  return await fetchWithAuth("/getSMSCampaignDetails", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Campaign Summary Info
export const getSMSCampaignDataByCampNo = async (data) => {
  return await fetchWithAuth("/getSMSCampaignDataByCampNo", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get previous day report
export const fetchPreviousDayReport = async (data) => {
  return await fetchWithAuth("/getSMSPrevoiusDaysCampaignReport", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get previous day details report
export const getPreviousCampaignDetails = async (data) => {
  return await fetchWithAuth("/getPreviousSMSCampaignDetails", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get summary report
export const getSummaryReport = async (data) => {
  return await fetchWithAuth("/getSummaryReport", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// log report
export const getAttachmentLogs = async (data) => {
  return await fetchWithAuth("/getAttachmentLogs", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// download detailed logs
export const downloadDetailedLogs = async (data) => {
  return await fetchWithAuth(`/downloadDetailedLogs?campaignSrNo=${data}`, {
    method: "POST",
  });
};

// download detailed logs
export const fetchDetailsAttachment = async (srno, mbno, selectedUserId = "0") => {
  return await fetchWithAuth(
    `/searchDetailLogsByMobileNo?campaignSrNo=${srno}&mobileNo=${mbno}&selectedUserId=${selectedUserId}`,
    {
      method: "POST",
    }
  );
};

// get all sms templates
export const getAllTemplates = async (status) => {
  return await fetchWithAuth(`/smsTemplate/getAlltemplates?status=${status}`, {
    method: "POST",
  });
};

// get template by id/tempsrno
export const getSingleTemplate = async (tempSrno) => {
  return await fetchWithAuth(
    `/smsTemplate/getTemplateById?tempSrno=${tempSrno}`,
    {
      method: "POST",
    }
  );
};

// update template bysrno
export const updateTemplateBySrno = async (srNo) => {
  return await fetchWithAuth("/smsTemplate/updateTemplate", {
    method: "POST",
    body: JSON.stringify(srNo),
  });
};

// delete single smsTemplate bysrno (H)
export const deleteSingleSmsTemplate = async (srNo) => {
  return await fetchWithAuth(`/smsTemplate/deleteTemplateBySrNo?srNo=${srNo}`, {
    method: "POST",
  });
};

// delete multiple smsTemplate bysrno
export const deleteMultipleSmsTemplate = async (srNoList) => {
  return await fetchWithAuth(`/smsTemplate/deleteMultipleTemplates`, {
    method: "POST",
    body: JSON.stringify(srNoList),
  });
};

// Send SMS
export const sendSms = async (data) => {
  return await fetchWithAuth("/sendSms/saveSMSCampaign", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Import Template
export const importTemplate = async (data) => {
  return await fetchWithAuth("/smsTemplate/importdltTemp", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Delete Template (A)
export const deleteTemplate = async (srno) => {
  return await fetchWithAuth(`/smsTemplate/deleteTemplateBySrNo?srNo=${srno}`, {
    method: "POST",
  });
};

// get campaign list
export const getAllCampaignSms = async () => {
  return await fetchWithAuth("/getAllCampaigns", {
    method: "POST",
  });
};

// Download Custom Reports
export const downloadCustomSmsReport = async (data) => {
  return await fetchWithAuth("/downloadCustomSmsReport", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
