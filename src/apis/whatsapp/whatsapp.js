import { fetchWithAuth } from "../apiClient.js";

// Get Waba Details
export const getWabaList = async () => {
  return await fetchWithAuth("/whatsapp/getwabadetails", {
    method: "GET",
  });
};

// Get All Template Details
export const getWabaTemplateDetails = async (wabaNumber, isHide = "-1") => {
  return await fetchWithAuth(
    `/whatsapptemplate/getTemplateList?wabaNumber=${wabaNumber}&isHide=${isHide}`,
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

// get template by id (vendor id)
export const getTemplateDetialsById = async (id) => {
  return await fetchWithAuth(
    `/whatsapptemplate/getTemplateById?vendorTemplateId=${id}`,
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

// Hide Template Whatsapp
export const isHideTemplate = async (id, body) => {
  return await fetchWithAuth(`/whatsapptemplate/isHide?srno=${id}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
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
      // console.log("excel file uplaod", response);
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
    // const formattedFromDate = filters.fromQueDateTime
    //   ? new Date(
    //       filters.fromQueDateTime.split("/").reverse().join("-")
    //     ).toLocaleDateString("en-GB")
    //   : new Date().toLocaleDateString("en-GB");

    // const formattedToDate = filters.toQueDateTime
    //   ? new Date(
    //       filters.toQueDateTime.split("/").reverse().join("-")
    //     ).toLocaleDateString("en-GB")
    //   : new Date().toLocaleDateString("en-GB");

    const requestBody = {
      fromQueDateTime: filters.fromQueDateTime,
      toQueDateTime: filters.toQueDateTime,
      campaignName: filters.campaignName || "",
      template_category: filters.template_category || "all",
    };

    // console.log("Sending Request:", requestBody);

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

    // console.log("getWhatsappCampaignDetailsReport response", response);

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

// Get Whatsapp Campaign Scheduled Reports
export const getWhatsappCampaignScheduledReport = async () => {
  try {
    const response = await fetchWithAuth(
      "/whatsapp/getScheduledWhatsAppCampaignReport?selectedUserId=0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response) {
      console.error("Failed to fetch campaign report.");
      return [];
    }
    return response || [];
  } catch (error) {
    console.error("Error fetching campaign report:", error);
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

// send tempalte to user (live chat)
export const sendTemplateMessageToUser = async (data) => {
  return await fetchWithAuth("/LiveChat/sendTemplateMsg", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// send input message to user (live chat)
export const sendInputMessageToUser = async (data, body) => {
  const encodeMessage = encodeURIComponent(data?.message);
  return await fetchWithAuth(
    `/LiveChat/sendMessage?mobile=${data.mobile}&wabaNumber=${
      data.wabaNumber
    }&srno=${data.srno}&contactName=${data.contactName}&replyType=${
      data.replyType
    }&replyFrom=${data.replyFrom}&wabaSrNo=${data.wabaSrNo}${
      data.message ? `&message=${encodeMessage}` : ""
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

// Get All Bot
export const getAllBot = async () => {
  return await fetchWithAuth("/bot/getBotFlowList", {
    method: "POST",
  });
};

// Get Specific Bot
export const getSpecificBot = async (id) => {
  return await fetchWithAuth(`/bot/editBot?botSrno=${id}`, {
    method: "POST",
  });
};

// Save or Edit Bot
export const saveOrEditBot = async (body, id = "") => {
  return await fetchWithAuth(`/bot/saveBot?botSrno=${id}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

// delete Bot
export const deleteBot = async (id) => {
  return await fetchWithAuth(`/bot/deleteBotByBotSrNo?botSrno=${id}`, {
    method: "POST",
  });
};

// Live Chat Settings
export const getAutoAction = async (data) => {
  return await fetchWithAuth(
    `/getAutoAction?wabaNumber=${data.wabaNumber}&type=${data.type}`,
    {
      method: "POST",
    }
  );
};

// Whatsapp Template Library
export const getTemplateList = async (data) => {
  return await fetchWithAuth(
    `/whatsappTemplateLibrary/getTemplateList?category=${
      data?.category || ""
    }&industry=${data?.industry || ""}`,
    {
      method: "POST",
    }
  );
};

// save Livechatsettings
export const saveAutoAction = async (data) => {
  return await fetchWithAuth("/saveWhatsappAutoAction", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// live chat settings - delete action (enable/disable)
export const deleteAutoAction = async (data) => {
  return await fetchWithAuth(
    `/deleteAction?wabaNumber=${data.wabaNumber}&type=${data.type}&wabaSrno=${data.wabaSrno}`,
    {
      method: "POST",
    }
  );
};

// fetch templates live chat settings
export const fetchTemplates = async (data) => {
  return await fetchWithAuth(`/sendWhatsappMessage`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// fetch templates value live chat settings
export const fetchTemplatesValue = async (data) => {
  return await fetchWithAuth(`/sendWhatsappMessageValue`, {
    method: "POST",
    body: JSON.stringify({
      srno: data,
    }),
  });
};

// get campaign list
export const getAllCampaignWhatsapp = async () => {
  return await fetchWithAuth("/whatsapp/getAllWhatsAppCampaign", {
    method: "POST",
  });
};

// Download Custom Reports
export const downloadCustomWhatsappReport = async (data) => {
  return await fetchWithAuth("/whatsapp/downloadCustomWhatsAppReport", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Get User Agent
export const getUserAgent = async (data) => {
  return await fetchWithAuth(`/agent/getAgentName?mobileNo=${data}`, {
    method: "POST",
  });
};

// // waba onboarding - this api is now in the managewaba direct fetch without
// export const userOnbording = async (data) => {
//   return await fetchWithAuth(`/whatsapp/wabaOnboardProcess?code=${data}`, {
//     method: "POST",
//   });
// };

// Get WhatsappFlow list
export const getWhatsappFlow = async () => {
  return await fetchWithAuth(`/WhatsappFlow/showFlowTemplates`, {
    method: "POST",
  });
};

// whatsapp flow update status (Published and draft)
export const getWhatsappFlowTemplate = async (
  reqbody,
  selectedWaba,
  status
) => {
  return await fetchWithAuth(
    `/WhatsappFlow/sendFlowTemplate?wabaNumber=${selectedWaba}&status=${status}`,
    {
      method: "POST",
      body: JSON.stringify(reqbody),
    }
  );
};

// public the flow
export const updateFlowStatus = async (data) => {
  return fetchWithAuth(
    `/WhatsappFlow/publicTemplateData?flowId=${data.id}&wabaNumber=${data.wabaNumber}`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
};

// save whatsapp flows
export const saveFlow = async (params, data) => {
  return await fetchWithAuth(
    `/WhatsappFlow/saveFlow?flowname=${params.name}&categorie=${
      params.category
    }&wabaNumber=${params.waba}&flowId=${params.id || ""}`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
};

// delete flow
export const deleteFlow = async (data) => {
  return await fetchWithAuth(`/WhatsappFlow/deleteWorkflow?flowId=${data}`, {
    method: "DELETE",
  });
};

// flow reply/response details - add flow params also
export const flowReplyDetails = async (fromQueDateTime) => {
  return await fetchWithAuth(
    `/flowReplyDetails?fromQueDateTime=${fromQueDateTime}`,
    {
      method: "POST",
    }
  );
};


// flow reply/response details
export const flowMainResponse = async (data) => {
  return await fetchWithAuth(
    `/showSampleResponse?flowName=${data.flowName}&templateName=${data.templateName}&campaignSrno=${data.campaignSrno}`,
    {
      method: "POST",
    }
  );
};

export const getMainJson = async (srNo) => {
  return await fetchWithAuth(`/WhatsappFlow/getMainJson?srNo=${srNo}`, {
    method: "GET",
  });
};

// fetch reply data (livechat)
export const fetchReplyData = async (data) => {
  return await fetchWithAuth(
    `/LiveChat/getChatByReceiptNo?wabaNumber=${data.wabaNumber}&receiptNo=${data.receiptNo}`,
    {
      method: "GET",
    }
  );
};

// cancel campaign
export const cancelCampaign = async ({ srno }) => {
  return await fetchWithAuth(
    `/whatsapp/cancelCampaign?srNo=${srno}&selectedUserId=0`,
    {
      method: "POST",
    }
  );
};

// export conversation data
export const exportConversationData = async (data) => {
  return await fetchWithAuth("/whatsapp/getConversationExportData", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// block user
export const blockUser = async (waba, data) => {
  return await fetchWithAuth(`/whatsapp/add-block-user/${waba}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get block user
export const getblockUser = async (waba) => {
  return await fetchWithAuth(`/whatsapp/get-block-user/${waba}`, {
    method: "GET",
  });
};

// delete block user
export const deleteblockUser = async (waba, data) => {
  return await fetchWithAuth(`/whatsapp/delete-block-user/${waba}`, {
    method: "DELETE",
    body: JSON.stringify(data),
  });
};

// Save canned message
export const saveCannedMessage = async (data) => {
  return await fetchWithAuth(`/canned/save-message`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Get all canned messages
export const getAllCannedMessages = async () => {
  return await fetchWithAuth(`/canned/all-messages`);
};

// Get canned message by SrNo
export const getCannedMessageBySrNo = async (srNo) => {
  return await fetchWithAuth(`/canned/getbySrno?srNo=${srNo}`);
};

// Delete canned message by SrNo
export const deleteCannedMessageBySrNo = async (srNo) => {
  return await fetchWithAuth(`/canned/deleteBySrno?srNo=${srNo}`, {
    method: "DELETE",
  });
};

// unsubscribe report
export const unsubscribeReport = async (data) => {
  return await fetchWithAuth(`/report/getWabaUnsbscribeReport`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// remove unsubscribe number
export const deleteUnsubscribeNumber = async (srNo) => {
  return await fetchWithAuth(`/report/deleteUnsubscribeReport?srNo=${srNo}`, {
    method: "DELETE",
  });
};
