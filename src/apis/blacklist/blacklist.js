import { fetchWithAuth } from "../apiClient";

// =====================Block List========================
export const getBlockNumberList = async (data) => {
  return await fetchWithAuth(
    `/blockmobile/list?pageIndex=${data.pageIndex}&pageSize=10&mobileNo=${data.mobileNo}`,
    {
      method: "GET",
    }
  );
};
export const addBlockNumber = async (data) => {
  return await fetchWithAuth("/blockmobile/add-update", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const getBlockNumberById = async (data) => {
  return await fetchWithAuth(
    `/blockmobile/get?blockSrNo=${data.blockSrNo}&userSrNo=${data.userSrNo}`,
    {
      method: "GET",
    }
  );
};
export const deleteBlockNumber = async (data) => {
  return await fetchWithAuth(
    `/blockmobile/delete?blockSrNo=${data.blockSrNo}&userSrNo=${data.userSrNo}`,
    {
      method: "DELETE",
    }
  );
};
