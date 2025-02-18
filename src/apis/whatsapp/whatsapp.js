import { fetchWithAuth } from "../apiClient.js";

export const getWabaList = async () => {
  return await fetchWithAuth("/proCpaasRest/whatsapp/getwabadetails", {
    method: "GET",
  });
};

export const getWabaTemplateDetails = async (wabaNumber) => {
  return await fetchWithAuth(
    `/proCpaasRest/whatsapptemplate/getTemplateList?wabaNumber=${wabaNumber}`,
    {
      method: "GET",
    }
  );
};

export const getWabaTemplate = async (wabaAccountId, templateName) => {
  return await fetchWithAuth(
    `/proCpaasRest/whatsapptemplate/getWhatsappTemplate?templateName=${templateName}&wabaAccountId=${wabaAccountId}`,
    {
      method: "GET",
    }
  );
};

export const getWabaShowGroupsList = async () => {
  return await fetchWithAuth("/proCpaasRest/group/showGroups", {
    method: "POST",
  });
};

export const campaignUploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetchWithAuth("/proCpaasRest/campaignFile/upload", {
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

export const uploadImageFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetchWithAuth("/proCpaasRest/utility/upload", {
      method: "POST",
      body: formData,
    });

    if (response && response.status) {
      return response;
    } else {
      throw new Error(response?.msg || "Image upload failed.");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const sendWhatsappCampaign = async (campaignData) => {
  try {
    const response = await fetchWithAuth("/proCpaasRest/sendWhatsappCampaign", {
      method: "POST",
      body: JSON.stringify(campaignData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Error sending campaign:", error);
    throw error;
  }
};
