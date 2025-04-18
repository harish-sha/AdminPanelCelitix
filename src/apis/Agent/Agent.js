import { fetchWithAuth } from "../apiClient.js";

// Get Agent List
export const getAgentList = async () => {
  return await fetchWithAuth("/agent/getAgentDetails", {
    method: "POST",
  });
};

// Update Agent Status
export const updateAgentStatus = async (srNo, status) => {
  return await fetchWithAuth("/agent/updateStatusByAgentSrNo", {
    method: "POST",
    body: JSON.stringify({ sr_no: srNo, status }),
  });
};

// Delete Agent by ID
export const deleteAgentById = async (srNo) => {
  return await fetchWithAuth("/agent/deleteAgentByid", {
    method: "POST",
    body: JSON.stringify({ srno: srNo }),
  });
};

// Get Working Hours for an Agent
export const getWorkingHours = async (agentId) => {
  return await fetchWithAuth(
    `/workinghours/getworkinghours?agentId=${agentId}`,
    {
      method: "POST",
    }
  );
};

// Update or Add Working Hours for an Agent
export const saveWorkingHours = async (agentId, schedule) => {
  return await fetchWithAuth("/workinghours/editworkinghours", {
    method: "POST",
    body: JSON.stringify({
      agentId,
      schedule,
    }),
  });
};

// Get Department List
export const getDepartmentList = async () => {
  return await fetchWithAuth("/department/getdepartment", {
    method: "POST",
  });
};

// Get Single Department by srno
export const getDepartmentBySrNo = async (srno) => {
  return await fetchWithAuth("/department/getdepartmentBysrno", {
    method: "POST",
    body: JSON.stringify({ srno }),
  });
};

// Add Department
export const addDepartment = async (departmentName) => {
  try {
    const response = await fetchWithAuth(
      "/department/addDepartment",
      {
        method: "POST",
        body: JSON.stringify({ name: departmentName }),
      }
    );

    console.log("API Response:", response); 

    return response;
  } catch (error) {
    console.error("Error adding department:", error);
    return { statusCode: 500, message: "Internal Server Error" };
  }
};

// Edit Department
export const editDepartment = async (srno, name) => {
  try {
    console.log("Sending Edit Request:", { srno, name });

    const response = await fetchWithAuth(
      "/department/editdepartmentBysrno",
      {
        method: "POST",
        body: JSON.stringify({ srno, name }),
      }
    );

  console.log("Edit API Response:", response); 
    return response;
  } catch (error) {
    console.error("Error updating department:", error);
    return null;
  }
};

// Delete Department
export const deleteDepartment = async (srno) => {
  try {
    const response = await fetchWithAuth(
      "/department/deleteDepartmentByid",
      {
        method: "POST",
        body: JSON.stringify({ srno }), 
      }
    );
    console.log("Delete API Response:", response); 
    if (response?.statusCode !== 200) {
      console.error(" Delete failed:", response);
    }

    return response; 
  } catch (error) {
    console.error("Error deleting department:", error);
    return { statusCode: 500, message: "Internal Server Error" };
  }
};

// Add Agent
export const addAgent = async (agentData) => {
  return await fetchWithAuth("/agent/AddAgent", {
    method: "POST",
    body: JSON.stringify(agentData),
  });
};

// Edit agent by srno.
export const updateAgentDetails = async (data) => {
  return await fetchWithAuth("/agent/editAgentByAgentSrNo", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Fetch Template List based on selected WABA
export const getTemplateList = async (wabaSrno) => {
  try {
    const response = await fetchWithAuth(
      `/agent/templateList?wabaSrno=${wabaSrno}`,
      {
        method: "POST",
      }
    );
    return response?.data || [];
  } catch (error) {
    console.error("Error fetching template list:", error);
    toast.error("Failed to load template list!");
    return [];
  }
};

// Save Assigned Templates to Agent
export const saveCheckedAssignTemplate = async (agentId, assignedTemplates) => {
  try {
    const response = await fetchWithAuth(
      `/agent/saveCheckedAssignTemplate?agentId=${agentId}`,
      {
        method: "POST",
        body: JSON.stringify(assignedTemplates),
      }
    );

    return response;
  } catch (error) {
    console.error("Error saving assigned templates:", error);
    return null;
  }
};

// Assigned template by agent
export const getAssignedTemplatesByAgentId = async (agentId) => {
  try {
    const response = await fetchWithAuth(
      `/agent/getAssignTemplateByAgentId?agentId=${agentId}`,
      {
        method: "POST",
      }
    );

    return response.data; // Ensure this returns the JSON response
  } catch (error) {
    console.error("Error fetching assigned templates:", error);
    return null;
  }
};
