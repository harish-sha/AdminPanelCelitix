import { fetchWithAuth } from "../apiClient";

// fetch all users
export const fetchAllUsers = async (data) => {
  return await fetchWithAuth("/proCpaasRest/user/getUserList", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// fetch user by sr no
export const fetchUserbySrno = async (srNo) => {
  return await fetchWithAuth("/proCpaasRest/user/getuserdetailsById", {
    method: "POST",
    body: JSON.stringify({ srNo }),
  });
};

// update user by srno
export const updateUserbySrno = async (data) => {
  return await fetchWithAuth("/proCpaasRest/user/updateUserById", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
