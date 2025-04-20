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
