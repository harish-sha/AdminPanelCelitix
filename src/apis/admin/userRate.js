import { fetchWithAuth } from "../apiClient";

// get RCS Rate data by user
export const getRCSRateData = async (userSrno) => {
  return await fetchWithAuth(
    `/proCpaasRest/rcs/getRCSRateData?userSrno=${userSrno}`,
    {
      method: "POST",
    }
  );
};

// save rcs rate
export const saveEditRcsRate = async (data) => {
  return await fetchWithAuth("/proCpaasRest/rcs/saveEditRCSRate", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get rcs rate by srno
export const getRCSRateBySrno = async (srno) => {
  return await fetchWithAuth(
    `/proCpaasRest/rcs/getRCSRateData?userSrno=${srno}`,
    {
      method: "POST",
    }
  );
};

// delete rcs rate by srno
export const deleteRCSRateBySrno = async (srno) => {
  return await fetchWithAuth(`/proCpaasRest/rcs/deleteRCSRate?srno=${srno}`, {
    method: "DELETE",
  });
};

// get whatsapp rate by srno
export const getWhatsappRateBySrno = async (srno) => {
  return await fetchWithAuth(
    `/proCpaasRest/whatsapp/getWhatsappRateBySrno?srno=${srno}`,
    {
      method: "POST",
    }
  );
};

// save whatsapp rate
export const saveEditWhatsappRate = async (data) => {
  return await fetchWithAuth("/proCpaasRest/whatsapp/saveWhatsappRate", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get Whatsapp Rate data by user
export const getWhatsappRateData = async (userSrno) => {
  return await fetchWithAuth(
    `/proCpaasRest/whatsapp/getWhatsappRate?userSrno=${userSrno}`,
    {
      method: "POST",
    }
  );
};

// delete whatsapp rate by srno
export const deleteWhatsappRateBySrno = async (srno) => {
  return await fetchWithAuth(
    `/proCpaasRest/whatsapp/deleteWhatsappRate?srno=${srno}`,
    {
      method: "DELETE",
    }
  );
};

// save voice rate
export const saveVoiceRate = async (data) => {
  return await fetchWithAuth("/proCpaasRest/voice/addVoiceRate", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get voice rate by srno
export const getVoiceRateBySrno = async (srNo) => {
  return await fetchWithAuth(`/proCpaasRest/voice/getVoiceRate?srNo=${srNo}`, {
    method: "POST",
  });
};

// get voice rate data by user
export const getVoiceRateByUser = async (userSrno) => {
  return await fetchWithAuth(
    `/proCpaasRest/voice/getVoiceRateByUser?userSrno=${userSrno}`,
    {
      method: "POST",
    }
  );
};

// delete voice rate by srno
export const deleteVoiceRateBySrno = async (srNo) => {
  return await fetchWithAuth(
    `/proCpaasRest/voice/deleteVoiceRate?srNo=${srNo}`,
    {
      method: "DELETE",
    }
  );
};

// add sms pricing
export const addSmsPricing = async (data) => {
  return await fetchWithAuth("/proCpaasRest/sms/addSmsPricing", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get sms rate data by user
export const getSmsRateByUser = async (userSrno) => {
  return await fetchWithAuth(
    `/proCpaasRest/sms/getSmsPricing?userSrno=${userSrno}`,
    {
      method: "GET",
    }
  );
};

// delete sms rate data by user
export const deleteSmsRateByUser = async (userSrno) => {
  return await fetchWithAuth(
    `/proCpaasRest/sms/deleteSmsPricing?userSrno=${userSrno}`,
    {
      method: "DELETE",
    }
  );
};
