import { fetchWithAuth } from "../apiClient.js";

// Get User Details
export const getUserDetails = async () => {
  return await fetchWithAuth("/proCpaasRest/auth/getuserdetails", {
    method: "GET",
  });
};

// get RCS Rate
export const getRcsRate = async () => {
  return await fetchWithAuth(
    "/proCpaasRest/accountInfo/getAllRCSRateData?countryCode=&countryName=",
    {
      method: "POST",
    }
  );
};

// get Whatsapp Rate
export const getWhatsAppRate = async () => {
  return await fetchWithAuth(
    "/proCpaasRest/accountInfo/getWhatsappRateAllData?countryCode=&countryName=",
    {
      method: "POST",
    }
  );
};

// get AccountInfo
export const getaccountInfo = async () => {
  return await fetchWithAuth("/proCpaasRest/accountInfo/showAccountInfo", {
    method: "POST",
  });
};

// get Sms Rate
export const getSmsRate = async (sno) => {
  return await fetchWithAuth(
    `proCpaasRest/accountInfo/getSmsPricing?srno=${sno}`,
    {
      method: "POST",
    }
  );
};
