import { fetchWithAuth } from "../apiClient.js";

export const getContactListByGrpId = async (data) => {
  return await fetchWithAuth("/proCpaasRest/contact/getAllContact", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const getGrpList = async () => {
  return await fetchWithAuth("/proCpaasRest/group/showGroups", {
    method: "POST",
  });
};

export const addContact = async (data) => {
  return await fetchWithAuth("/proCpaasRest/contact/addContact", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const importContact = async (data) => {
  return await fetchWithAuth("/proCpaasRest/contact/importContact", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const addGrp = async (data) => {
  return await fetchWithAuth("/proCpaasRest/group/addGroup", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const deleteGrp = async (grpName, grpSrno) => {
  return await fetchWithAuth(
    `/proCpaasRest/group/deleteGroup?groupName=${grpName}&groupSrno=${grpSrno}`,
    {
      method: "POST",
    }
  );
};

export const updateGroupName = async (grpSrno, grpName) => {
  return await fetchWithAuth(
    `/proCpaasRest/group/updateGroup?groupSrno=${grpSrno}&groupName=${grpName}`,
    {
      method: "POST",
    }
  );
};

export const uploadContactFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetchWithAuth(
      "/proCpaasRest/campaignFile/UploadContactFile",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response) {
      console.log("excel file uplaod", response);
      return response;
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

export const updateContactsDetails = async (data) => {
  return await fetchWithAuth("/proCpaasRest/contact/updateAddressBookData", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
