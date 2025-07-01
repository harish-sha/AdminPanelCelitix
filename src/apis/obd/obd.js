import { fetchWithAuth } from "../apiClient.js";

// get details log report
export const fetchDetailsLogsObd = async (data) => {
  return await fetchWithAuth("/obd/report/getDetailLogs", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get details log report
export const fetchSummaryLogsObd = async (data) => {
  return await fetchWithAuth("/obd/report/getSummaryLogs", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get details log report
export const fetchDayWiseSummaryObd = async (data) => {
  return await fetchWithAuth("/obd/report/getDayWiseSummary", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// fetch voice clip data
export const fetchVoiceClips = async () => {
  return await fetchWithAuth("obd/manageVoiceClips/getVoiceClipData", {
    method: "GET",
  });
};

// delete voice clip
export const deleteVoiceClip = async (srno) => {
  return await fetchWithAuth(
    `obd/manageVoiceClips/deleteVoiceClip?Srno=${srno}`,
    {
      method: "POST",
    }
  );
};

// fetch voice clip url
export const fetchVoiceClipUrl = async (srno) => {
  return await fetchWithAuth(
    `obd/manageVoiceClips/getAudioFile?audioId=${srno}`,
    {
      method: "POST",
    }
  );
};

// fetch getDetailsLog by srNo
export const fetchDetailsbySrNo = async (campaignSrNo, selectedUser = 0) => {
  return await fetchWithAuth(
    `/obd/report/getDetailLogByCampSrno?campaignSrno=${campaignSrNo}&selectedUserId=${selectedUser}`,
    {
      method: "POST",
    }
  );
};

// save static voice
export const saveStaticVoice = async (data) => {
  return await fetchWithAuth("/obd/manageVoiceClips/staticvoice", {
    method: "POST",
    body: data,
  });
};

// save dynamic voice
export const saveDynamicVoice = async (data) => {
  return await fetchWithAuth("/obd/manageVoiceClips/dynamicvoice", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// create obd campaign
export const sendObdCampaign = async (data) => {
  return await fetchWithAuth("/obd/addVoiceCampaign", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// view Obd Campaign Details
export const viewObdCampaignDetails = async (campaignSrno, selectedUser) => {
  return await fetchWithAuth(
    `/obd/report/getDetailLogInfo?campaignSrno=${campaignSrno}&selectedUserId=${selectedUser}`,
    {
      method: "POST",
    }
  );
};

// get Scheduled Voice Campaign Report
export const getScheduledVoiceCampaignReport = async (selectedUser = 0) => {
  return await fetchWithAuth(
    `/obd/report/getScheduledVoiceCampaignReport?selectedUserId=${
      selectedUser || "0"
    }`,
    {
      method: "POST",
    }
  );
};

// cancel campaign
export const cancelCamapign = async (srno, selectedUser) => {
  return await fetchWithAuth(
    `/obd/report/cancelCampaign?srNo=${srno}&selectedUserId=${selectedUser}`,
    {
      method: "POST",
    }
  );
};

// get all campaign names
export const getAllCampaignNames = async (selectedUser = null) => {
  return await fetchWithAuth(
    `/obd/report/getAllVoiceCampaign?selectedUserId=${selectedUser || "0"}`,
    {
      method: "POST",
    }
  );
};

// export campaign
export const exportCampaignData = async (data) => {
  return await fetchWithAuth(`/obd/report/downloadVoiceCustomReport`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// dynamic varibale list
export const ObdVariableList = async (srno = "") => {
  return await fetchWithAuth(`/obd/showDynamicVariableList?srno=${srno}`, {
    method: "GET",
  });
};

// get dynamic voice clip type
export const ObdDynamicVoiceClip = async (isDynamic = "1") => {
  return await fetchWithAuth(
    `/obd/getVoiceClipByBroadcastType?isDynamic=${isDynamic}`,
    {
      method: "GET",
    }
  );
};
