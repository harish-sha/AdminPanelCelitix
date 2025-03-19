import { fetchWithAuth } from "../apiClient";

export const fetchAllUsers = async (data) => {
  return await fetchWithAuth("/proCpaasRest/user/getUserList", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const fetchUserbySrno = async (srNo) => {
  return await fetchWithAuth("/proCpaasRest/user/getuserdetailsById", {
    method: "POST",
    body: JSON.stringify({ srNo }),
  });
};

export const updateUserbySrno = async (data) => {
  return await fetchWithAuth("/proCpaasRest/user/updateUserById", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
