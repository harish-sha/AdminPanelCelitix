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
