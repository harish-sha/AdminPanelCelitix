import { fetchWithAuth } from "@/apis/apiClient";

// Get Waba Details
export const getWabaList = async () => {
  return await fetchWithAuth("/whatsapp/getwabadetails", {
    method: "GET",
  });
};

// upload file - (image)
export const uploadImageFile = async (file, generateHandler = 0) => {
  const formData = new FormData();
  formData.append("file", file);
  if (generateHandler) {
    formData.append("generateHandler", generateHandler);
  }

  try {
    const response = await fetchWithAuth("/utility/upload", {
      method: "POST",
      body: formData,
    });

    return response;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

//send template to api
export const sendTemplatetoApi = async (data) => {
  try {
    const response = await fetchWithAuth("/whatsapptemplate/savewhatsapp", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("Error fetching summary report:", error);
  }
};
