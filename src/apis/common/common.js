import { fetchWithAuth } from "../apiClient.js";
import axios from "axios";

export const getCountryList = async () => {
  return await fetchWithAuth("/proCpaasRest/getcountryList", {
    method: "POST",
  });
};

export const getAllGroups = async () => {
  return await fetchWithAuth("/proCpaasRest/group/showGroups", {
    method: "POST",
  });
};

// Base URL for the API
const BASE_URL = "https://test.digibima.com/api";

export const getPincodeDetails = async (pincode) => {
  try {
    if (!pincode) {
      throw new Error("Pincode is required.");
    }

    console.log("Calling API with pincode:", pincode);

    const response = await axios.get(`${BASE_URL}/pincode`, {
      params: { pincode },
    });

    console.log("Full API response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching pincode details:", error.message);
    throw error;
  }
};
