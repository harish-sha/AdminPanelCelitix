import { fetchWithAuth } from "../apiClient.js";

// Get User Details
export const getUserDetails = async () => {
  return await fetchWithAuth("/auth/getuserdetails", {
    method: "GET",
  });
};

// // get RCS Rate
export const getRcsRate = async () => {
  return await fetchWithAuth(
    "/accountInfo/getAllRCSRateData?countryCode=&countryName=",
    {
      method: "POST",
    }
  );
};

// get Whatsapp Rate
export const getWhatsAppRate = async () => {
  return await fetchWithAuth(
    "/accountInfo/getWhatsappRateAllData?countryCode=&countryName=",
    {
      method: "POST",
    }
  );
};

// get AccountInfo
export const getaccountInfo = async () => {
  return await fetchWithAuth("/accountInfo/showAccountInfo", {
    method: "POST",
  });
};

// get Sms Rate
export const getSmsRate = async (sno) => {
  return await fetchWithAuth(`/accountInfo/getSmsPricing?srno=${sno}`, {
    method: "POST",
  });
};

// get Credit Limit
export const getCreditLimit = async () => {
  return await fetchWithAuth(`/user/getcreditlimit`, {
    method: "GET",
  });
};
