import { fetchWithAuth } from "../apiClient.js";

// get contact by id
export const getContactListByGrpId = async (data) => {
  return await fetchWithAuth("/contact/getAllContact", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get group list
export const getGrpList = async () => {
  return await fetchWithAuth("/group/showGroups", {
    method: "POST",
  });
};

// add contact to group
export const addContact = async (data) => {
  return await fetchWithAuth("/contact/addContact", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// import contact
export const importContact = async (data) => {
  return await fetchWithAuth("/contact/importContact", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// add group
export const addGrp = async (data) => {
  return await fetchWithAuth("/group/addGroup", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// delete group
export const deleteGrp = async (grpName, grpSrno) => {
  return await fetchWithAuth(
    `/group/deleteGroup?groupName=${grpName}&groupSrno=${grpSrno}`,
    {
      method: "POST",
    }
  );
};

// update group name
export const updateGroupName = async (grpSrno, grpName) => {
  return await fetchWithAuth(
    `/group/updateGroup?groupSrno=${grpSrno}&groupName=${grpName}`,
    {
      method: "POST",
    }
  );
};

// get contact by srno
export const getContactBySrno = async (conSrno) => {
  return await fetchWithAuth(`/contact/getContactBySrno?srNo=${conSrno}`, {
    method: "POST",
  });
};

// upload contact file
export const uploadContactFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetchWithAuth("/campaignFile/UploadContactFile", {
      method: "POST",
      body: formData,
    });

    if (response) {
      return response;
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

// update contact details
export const updateContactsDetails = async (data) => {
  return await fetchWithAuth("/contact/updateAddressBookData", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// delete single contact
// export const deleteContact = async (data) => {
//   return await fetchWithAuth(
//     `/contact/deleteMultipleAddressBookContacts?${data}`
//   );
// };

// delete Multiple contact
export const deleteMultipleContact = async (data) => {
  return await fetchWithAuth(
    `/contact/deleteMultipleAddressBookContacts?${data}`
  );
};

// delete single contact
export const deleteContact = async (data) => {
  return await fetchWithAuth(
    `contact/deleteAddressBookContact?addSrno=${data}`
  );
};

// update contact status
export const updateContactStatus = async (data) => {
  return await fetchWithAuth(
    `contact/updateStatus?addSrno=${data.srno}&activeStatus=${data.status}`,
    { method: "POST" }
  );
};
