import { fetchWithAuth } from "../apiClient";

export const getAllWorkflow = async (type) => {
  return await fetchWithAuth(`/workflow/getListByType?type=${type || ""}`, {
    method: "POST",
  });
};
export const saveWorkflow = async (data) => {
  return await fetchWithAuth("/workflow/saveWorkflow", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const deleteWorkflow = async (srno, type) => {
  return await fetchWithAuth(
    `/workflow/deleteWorkflow?srno=${srno}&workflowType=${type}`,
    {
      method: "DELETE",
    }
  );
};
export const getWorkflowCampaignDetails = async (data) => {
  return await fetchWithAuth(`/workflow/campaignReport`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
