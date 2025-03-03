import { fetchWithAuth } from "../apiClient.js";

// Get Agent List
export const getAgentList = async () => {
  return await fetchWithAuth("/proCpaasRest/agent/getAgentDetails", {
    method: "POST",
  });
};

// Update Agent Status
export const updateAgentStatus = async (srNo, status) => {
  return await fetchWithAuth("/proCpaasRest/agent/updateStatusByAgentSrNo", {
    method: "POST",
    body: JSON.stringify({ sr_no: srNo, status }),
  });
};

// Delete Agent by ID
export const deleteAgentById = async (srNo) => {
  return await fetchWithAuth("/proCpaasRest/agent/deleteAgentByid", {
    method: "POST",
    body: JSON.stringify({ srno: srNo }),
  });
};

// Get Working Hours for an Agent
export const getWorkingHours = async (agentId) => {
  return await fetchWithAuth(
    `/proCpaasRest/workinghours/getworkinghours?agentId=${agentId}`,
    {
      method: "POST",
    }
  );
};

// Update or Add Working Hours for an Agent
export const saveWorkingHours = async (agentId, schedule) => {
  return await fetchWithAuth("/proCpaasRest/workinghours/editworkinghours", {
    method: "POST",
    body: JSON.stringify({
      agentId,
      schedule,
    }),
  });
};

// Get Department List
export const getDepartmentList = async () => {
  return await fetchWithAuth("/proCpaasRest/department/getdepartment", {
    method: "POST",
  });
};

// Add Department
export const addDepartment = async (departmentName) => {
  try {
    const response = await fetchWithAuth(
      "/proCpaasRest/department/addDepartment",
      {
        method: "POST",
        body: JSON.stringify({ name: departmentName }),
      }
    );

    console.log("API Response:", response); // ✅ Log response for debugging

    return response;
  } catch (error) {
    console.error("Error adding department:", error);
    return { statusCode: 500, message: "Internal Server Error" };
  }
};

// Edit Department
// Delete Department
// Get Department
// Add Agent
// Edit Agent
// Assign Template By Agent
// Get Template List
// Save Assign Template
