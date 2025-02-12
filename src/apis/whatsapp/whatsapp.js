import { fetchWithAuth } from "../apiClient.js";

export const getWabaList = async () => {
  return await fetchWithAuth("/proCpaasRest/whatsapp/getwabadetails", {
    method: "GET",
  });
};

export const getWabaTemplateDetails = async (wabaNumber) => {
  return await fetchWithAuth(
    `/proCpaasRest/whatsapptemplate/getTemplateList?wabanumber=${wabaNumber}`,
    {
      method: "GET",
    }
  );
};

// export const getWabaTemplate = async (templateSrno) => {
//   return await fetchWithAuth(
//     `/proCpaasRest/whatsapptemplate/getTemplate?templateSrno=${templateSrno}`,
//     {
//       method: "GET",
//     }
//   );
// };

export const getWabaTemplate = async (wabaAccountId, templateName) => {
  return await fetchWithAuth(
    `/proCpaasRest/whatsapptemplate/getWhatsappTemplate?templateName=${templateName}&wabaAccountId=${wabaAccountId}`,
    {
      method: "GET",
    }
  );
};

export const getWabaShowGroupsList = async () => {
  return await fetchWithAuth("/proCpaasRest/showGroups", {
    method: "POST",
  });
};

export const campaignUploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  // Call the fetchWithAuth to upload the file
  try {
    const response = await fetchWithAuth("/proCpaasRest/campaignFile/upload", {
      method: "POST",
      body: formData,
    });

    if (response) {
      // console.log("File uploaded successfully:", response);
      return response;
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
