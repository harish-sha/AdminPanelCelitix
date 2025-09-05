import { fetchWithAuth } from "../apiClient";

// add callback/save
export const addCallback = async (data) => {
  return await fetchWithAuth(`/callBack/saveCallbackUrl`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// edit callback url data
export const getEditData = async (data) => {
  return await fetchWithAuth(`/callBack/getCallBackUrlData`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// delete callback number
export const deleteData = async (data) => {
  return await fetchWithAuth(`/callBack/deleteCallBackNumber`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// update callback status
export const updateStatus = async (data) => {
  return await fetchWithAuth(`/callBack/updateCallbackStatus`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get callback Name
export const getData = async (data) => {
  return await fetchWithAuth(
    `/callBack/getCallBackDataList?callBackName=${
      data.callBackName
    }&callBackType=${data.callBackType || ""}&page=${data.page}`,
    {
      method: "GET",
    }
  );
};


export const saveWhatsappCallback = async (data) => {
  return await fetchWithAuth(`/Whatsapp/callbackUrl`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getWhatsappCallback = async (data) => {
  return await fetchWithAuth("/Whatsapp/getDetails", {
    method: "POST",
    body: JSON.stringify(data),
  });
};