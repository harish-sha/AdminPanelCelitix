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
  return await fetchWithAuth("/obd/manageVoiceClips/getVoiceClipData", {
    method: "GET",
  });
};

// delete voice clip
export const deleteVoiceClip = async (srno) => {
  return await fetchWithAuth(
    `/obd/manageVoiceClips/deleteVoiceClip?Srno=${srno}`,
    {
      method: "POST",
    }
  );
};

// fetch voice clip url
export const fetchVoiceClipUrl = async (srno) => {
  return await fetchWithAuth(
    `/obd/manageVoiceClips/getAudioFile?audioId=${srno}`,
    {
      method: "POST",
    }
  );
};

// fetch getDetailsLog by srNo
export const fetchDetailsbySrNo = async (campaignSrNo) => {
  return await fetchWithAuth(
    `/obd/report/getDetailLogByCampSrno?campaignSrno=${campaignSrNo}`,
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
export const viewObdCampaignDetails = async (campaignSrno) => {
  return await fetchWithAuth(`/obd/report/getDetailLogInfo?campaignSrno=${campaignSrno}&selectedUserId=0`, {
    method: "POST",
  });
};

// get Scheduled Voice Campaign Report
export const getScheduledVoiceCampaignReport = async () => {
  return await fetchWithAuth(`/obd/report/getScheduledVoiceCampaignReport?selectedUserId=0`, {
    method: "POST",
  })
}

// cancel campaign
export const cancelCamapign = async (srno) => {
  return await fetchWithAuth(`/obd/report/cancelCampaign?srNo=${srno}&selectedUserId=0`, {
    method: "POST",
  })
}
