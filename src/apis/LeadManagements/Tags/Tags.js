import { fetchWithAuth } from "@/apis/apiClient";

// Add edit tags
export const addEditTag = async (srNo, body) => {
  return await fetchWithAuth(`/tags/add?srNo=${srNo}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

// Get All added tags list
export const getTagsList = async () => {
  return await fetchWithAuth(`/tags/list`, {
    method: "GET",
  });
};

// Get single tag
export const getSingleTag = async (srNo) => {
  return await fetchWithAuth(`/tags/get?srNo=${srNo}`, {
    method: "GET",
  });
};

// Delete single tag
export const deleteSingleTag = async (srNo) => {
  return await fetchWithAuth(`/tags/delete?srNo=${srNo}`, {
    method: "DELETE",
  });
};
