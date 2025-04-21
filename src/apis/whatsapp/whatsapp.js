import { fetchWithAuth } from "../apiClient.js";

// Get Waba Details
export const getWabaList = async () => {
  return await fetchWithAuth("/whatsapp/getwabadetails", {
    method: "GET",
  });
};

// Get All Template Details
export const getWabaTemplateDetails = async (wabaNumber) => {
  return await fetchWithAuth(
    `/whatsapptemplate/getTemplateList?wabaNumber=${wabaNumber}`,
    {
      method: "GET",
    }
  );
};

// Get particular waba Template Details
export const getWabaTemplate = async (wabaAccountId, templateName) => {
  return await fetchWithAuth(
    `/whatsapptemplate/getWhatsappTemplate?templateName=${templateName}&wabaAccountId=${wabaAccountId}`,
    {
      method: "GET",
    }
  );
};

// delete template
export const deleteTemplate = async (data) => {
  return await fetchWithAuth(
    `/whatsapptemplate/deleteWabaTemplate?templateSrno=${data.srno}&wabaSrno=${data.waba}&templateName=${data.name}`,
    {
      method: "POST",
    }
  );
};

// refresh template (a)
export const refreshTemplate = async (data) => {
  return await fetchWithAuth(`/whatsapptemplate/checkStatus?srno=${data}`, {
    method: "POST",
  });
};

// show groups list
export const getWabaShowGroupsList = async () => {
  return await fetchWithAuth("/group/showGroups", {
    method: "POST",
  });
};

// Campaign upload file - (excel)
export const campaignUploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetchWithAuth("/campaignFile/upload", {
      method: "POST",
      body: formData,
    });

    if (response) {
      console.log("excel file uplaod", response);
      return response;
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
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

// Send Whatsapp Campaign
export const sendWhatsappCampaign = async (campaignData) => {
  try {
    const response = await fetchWithAuth("/sendWhatsappCampaign", {
      method: "POST",
      body: JSON.stringify(campaignData),
    });

    return response;
  } catch (error) {
    console.error("Error sending campaign:", error);
    throw error;
  }
};

// Get Whatsapp Campaign Report
export const getWhatsappCampaignReport = async (filters = {}) => {
  try {
    const formattedFromDate = filters.fromQueDateTime
      ? new Date(
          filters.fromQueDateTime.split("/").reverse().join("-")
        ).toLocaleDateString("en-GB")
      : new Date().toLocaleDateString("en-GB");

    const formattedToDate = filters.toQueDateTime
      ? new Date(
          filters.toQueDateTime.split("/").reverse().join("-")
        ).toLocaleDateString("en-GB")
      : new Date().toLocaleDateString("en-GB");

    const requestBody = {
      fromQueDateTime: formattedFromDate,
      toQueDateTime: formattedFromDate,
      campaignName: filters.campaignName || "",
      template_category: filters.template_category || "all",
    };

    console.log("Sending Request:", requestBody);

    const response = await fetchWithAuth("/whatsapp/getCampaignReport", {
      method: "POST",
      body: JSON.stringify(requestBody),
    });
    if (!response || !response.data) {
      console.error("Failed to fetch campaign report.");
      return [];
    }
    return response.data || [];
  } catch (error) {
    console.error("Error fetching campaign report:", error);
    return [];
  }
};

// Get Whatsapp Campaign Details Report
export const getWhatsappCampaignDetailsReport = async (data) => {
  try {
    const response = await fetchWithAuth(
      "/whatsapp/whatsappCampaginDetailsReport",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    console.log("getWhatsappCampaignDetailsReport response", response);

    if (!response) {
      console.error("Failed to fetch campaign details report.");
      return [];
    }

    return response;
  } catch (error) {
    console.error("Error fetching campaign details report:", error);
    return [];
  }
};

// waba profile details
export const getwabadetails = async (wabaNumber) => {
  return await fetchWithAuth(
    `/whatsapp/getBusinessProfileDetails?wabaNumber=${wabaNumber}`,
    {
      method: "POST",
    }
  );
};

// update waba profile
export const updateWabaDetails = async (data, phone) => {
  try {
    const response = await fetchWithAuth(
      `/whatsapp/UpdateBusinessProfileDetails?wabaNumber=${phone}`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    return response;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// fetch log report
export const getWhatsappLogReport = async (logdata) => {
  try {
    const response = await fetchWithAuth("/whatsapp/getWhatsappLogReport", {
      method: "POST",
      body: JSON.stringify(logdata),
    });
    return response || [];
  } catch (error) {
    console.error("Error fetching whatsapp log report:", error);
    return [];
  }
};

// fetch Summary Report
export const getSummaryReport = async (data) => {
  try {
    const response = await fetchWithAuth("/whatsapp/getSummeryReport", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("Error fetching summary report:", error);
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

// conversation report
export const getConversationReport = async (data) => {
  return await fetchWithAuth(
    `/whatsapp/getConversationReport?wabaSrno=${data.wabaSrno}&fromDate=${data.fromDate}&toDate=${data.toDate}&mobileNo=${data.mobileNo}&page=${data.page}`,
    {
      method: "POST",
    }
  );
};

// sync waba templates
export const syncStatus = async (srno) => {
  return await fetchWithAuth(`/whatsapptemplate/sync?wabaSrno=${srno}`, {
    method: "POST",
  });
};

// refresh waba templates (h)
export const refreshWhatsApp = async (srno) => {
  return await fetchWithAuth(
    `/whatsapptemplate/refreshWabaDetails?wabaSrno=${srno}`,
    {
      method: "POST",
    }
  );
};

// delete waba template (H)
export const deleteWabaTemplate = async (tempsrno, wabaNo, tempName) => {
  return await fetchWithAuth(
    `/whatsapptemplate/deleteWabaTemplate?templateSrno=${tempsrno}&wabaSrno=${wabaNo}templateName=${tempName}`,
    {
      method: "POST",
    }
  );
};

// fetch all conversations (live chat)
export const fetchAllConversations = async (data) => {
  return await fetchWithAuth(
    `/LiveChat/LiveChatDetails?mobile=${data.mobileNo}&srno=${data.srno}&selectedMobileNumber=&searchMobileNumber=${data.search}&userActive=${data.active}`,
    {
      method: "POST",
    }
  );
};

// chat one user details (live chat)
export const fetchSpecificConversations = async (data) => {
  return await fetchWithAuth(
    `/LiveChat/getWhatsappChatsOneUser?mobile=${data.mobileNo}&wabaMobile=${data.wabaMobile}&chatNo=${data.chatNo}`,
    {
      method: "POST",
    }
  );
};

// assign agent to user (live chat)
export const assignUserToAgent = async (data) => {
  return await fetchWithAuth(
    `/LiveChat/addAgentToUser?wabaNumber=${data.waba}&name=${data.name}&agentSrno=${data.agentSrno}&groupNo=${data.groupNo}&mobileNo=${data.mobileNo}`,
    {
      method: "POST",
    }
  );
};

// send message to user (live chat)
export const sendMessageToUser = async (data) => {
  return await fetchWithAuth(
    `/LiveChat/sendMessage?mobile=${data.mobile}&wabaNumber=${data.wabaNumber}&srno=${data.srno}&message=${data.message}&contactName=${data.contactName}&replyType=${data.replyType}&replyFrom=${data.replyFrom}&wabaSrNo=${data.wabaSrNo}`,
    {
      method: "POST",
    }
  );
};

// send tempalte to use (live chat)
export const sendTemplateMessageToUser = async (data) => {
  return await fetchWithAuth("/LiveChat/sendTemplateMsg", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// // send input message to user (live chat)
// export const sendInputMessageToUser = async (data, body) => {
//   return await fetchWithAuth(
//     `/LiveChat/sendMessage?mobile=${data.mobile}&wabaNumber=${data.wabaNumber}&srno=${data.srno}&message=${data.message}&contactName=${data.contactName}&replyType=${data.replyType}&replyFrom=${data.replyFrom}&wabaSrNo=${data.wabaSrNo}`,
//     {
//       method: "POST",
//       body: body,
//     }
//   );
// };

// send input message to user (live chat)
export const sendInputMessageToUser = async (data, body) => {
  return await fetchWithAuth(
    `/LiveChat/sendMessage?mobile=${data.mobile}&wabaNumber=${
      data.wabaNumber
    }&srno=${data.srno}&contactName=${data.contactName}&replyType=${
      data.replyType
    }&replyFrom=${data.replyFrom}&wabaSrNo=${data.wabaSrNo} ${
      data.message ? `&message= ${data.message}` : ""
    }`,
    {
      method: "POST",
      body: body,
    }
  );
};

// load new chat (live chat)
export const loadNewChat = async (data) => {
  return await fetchWithAuth(
    `/LiveChat/loadNewChat?mobile=${data.mobile}&wabaNumber=${data.wabaNumber}&srno=${data.srno}&replayTime=${data.replayTime}`,
    {
      method: "POST",
    }
  );
};

// download attachemnt (live chat)
export const downloadAttachment = async (data) => {
  return await fetchWithAuth(
    `/LiveChat/refreshAttachmentPro?wabaNumber=${data.waba}&id=${data.id}&conversionSrno=${data.conversionSrno}`,
    {
      method: "POST",
    }
  );
};

// read message (live chat)
export const readMessage = async (data) => {
  return await fetchWithAuth(
    `/LiveChat/isviewChat?srno=${data.srno}&wabaNumber=${data.waba}&mobile=${data.mobile}`,
    {
      method: "POST",
    }
  );
};

// Campaign Summary Info
export const campaignSummaryInfo = async (data) => {
  return await fetchWithAuth(`/whatsapp/getCampaignSummaryInfo`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get list of send messages
export const getListofSendMsg = async (data) => {
  return await fetchWithAuth("/whatsapp/getListOfSentMsg", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// fetch curl of template
export const fetchCurlData = async (data) => {
  return await fetchWithAuth(
    `/wrapper/waba/getTemplate?templatename=${data.tempName}&wabaNumber=${data.waba}&curl`,
    {
      method: "POST",
    }
  );
};

export const getAllBot = async () => {
  return await fetchWithAuth("/bot/getBotFlowList", {
    method: "POST",
  });
};

export const getSpecificBot = async (id) => {
  return await fetchWithAuth(`/bot/editBot?botSrno=${id}`, {
    method: "POST",
  });
};

export const saveOrEditBot = async (body, id = "") => {
  return await fetchWithAuth(`/bot/saveBot?botSrno=${id}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export const deleteBot = async (id) => {
  return await fetchWithAuth(`/bot/deleteBotByBotSrNo?botSrno=${id}`, {
    method: "POST",
  });
};

export const isHideTemplate = async (id, body) => {
  return await fetchWithAuth(`/whatsapptemplate/isHide?srno=${id}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};
