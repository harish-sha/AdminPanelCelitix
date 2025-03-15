import React, { useEffect, useState } from "react";
import ManageAgentTable from "./components/ManageAgentTable";
import { Dialog } from "primereact/dialog";
import { TabView, TabPanel } from "primereact/tabview";
import { Dropdown } from "primereact/dropdown";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Paper, Typography, Box, Button } from "@mui/material";
import usePagination from "@mui/material/usePagination";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  DataGrid,
  GridFooterContainer,
  GridPagination,
} from "@mui/x-data-grid";

import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import UniversalButton from "../components/UniversalButton";
import InputField from "../components/InputField";
import AnimatedDropdown from "../components/AnimatedDropdown";
import RadioGroupFieldupdown from "../components/RadioGroupFieldupdown";
import GeneratePassword from "../components/GeneratePassword";
import DropdownWithSearch from "../components/DropdownWithSearch";
import {
  addDepartment,
  deleteDepartment,
  editDepartment,
  getDepartmentBySrNo,
  getDepartmentList,
  addAgent,
} from "../../apis/Agent/Agent";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { RadioButton } from "primereact/radiobutton";
import UniversalLabel from "../components/UniversalLabel";

const ManageAgent = () => {
  const [adddepartment, setAddDepartment] = useState(false);

  const [addagent, setAddAgent] = useState(false);

  const [addAgentDialog, setAddAgentDialog] = useState(false);
  const [agentName, setAgentName] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [agentMobile, setAgentMobile] = useState("");
  const [agentPassword, setAgentPassword] = useState("");

  const [generatedPassword, setGeneratedPassword] = useState("");

  const [selectedadddepartment, setSelectedAddDepartment] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);

  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedDepartmentData, setSelectedDepartmentData] = useState(null);
  const [editedDepartmentName, setEditedDepartmentName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [selectedOption, setSelectedOption] = useState("all");



  // Department LIST
  const fetchDepartmentList = async () => {
    try {

      const response = await getDepartmentList();
      console.log("Fetched Department List Response:", response);
      if (response?.statusCode === 200 && Array.isArray(response.data)) {
        setDepartmentList(response.data);
      } else {
        console.error("Failed to fetch department details");
        toast.error("Failed to load department details!");
        setDepartmentList([]);
      }
    } catch (error) {
      console.error("Error fetching department list:", error);
      toast.error("Error fetching department list.");
      setDepartmentList([]);
    }
  };

  useEffect(() => {
    fetchDepartmentList();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 700));
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // check the value which is correct selected
  useEffect(() => {
    console.log("department selected", selectedadddepartment);
  }, [selectedadddepartment]);

  const handleAddDepartment = async () => {
    if (!newDepartmentName.trim()) {
      toast.error("Please enter a department name.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await addDepartment(newDepartmentName.trim());

      if (response?.statusCode === 200) {
        if (response.message.includes("already exist")) {
          toast.error("Department name already exists.");
        } else {
          toast.success("Department added successfully.");
          setNewDepartmentName("");
          setAddDepartment(false);
          fetchDepartmentList();
        }
      } else {
        toast.error("Failed to add department. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = async (department) => {
    console.log("Clicked Department Data:", department);

    if (!department || !department.id) {
      toast.error("Invalid department selected.");
      return;
    }

    try {
      const response = await getDepartmentBySrNo(department.id);

      if (response?.statusCode === 200 && response.data) {
        console.log("Fetched Department for Edit:", response.data);
        setSelectedDepartmentData(response.data);
        setEditedDepartmentName(response.data.departmentName);
        setEditDialog(true);
      } else {
        toast.error("Failed to fetch department details.");
      }
    } catch (error) {
      console.error("Error fetching department:", error);
      toast.error("Something went wrong.");
    }
  };

  const handleEditDepartment = async () => {
    if (!editedDepartmentName.trim()) {
      toast.error("Please enter a department name.");
      return;
    }

    if (!selectedDepartmentData?.departmentId) {
      console.error(
        "Selected Department Data is Invalid:",
        selectedDepartmentData
      );
      toast.error("Invalid department selected.");
      return;
    }

    const isDuplicate = departmentList.some(
      (dept) =>
        dept.departmentName.toLowerCase() ===
        editedDepartmentName.toLowerCase() &&
        dept.departmentId !== selectedDepartmentData?.departmentId
    );

    if (isDuplicate) {
      toast.error("Department name already exists.");
      return;
    }

    setIsProcessing(true);

    try {
      console.log("Editing Department:", {
        srno: selectedDepartmentData.departmentId,
        name: editedDepartmentName.trim(),
      });

      const response = await editDepartment(
        selectedDepartmentData.departmentId,
        editedDepartmentName.trim()
      );

      console.log("Edit Response:", response);

      if (
        response?.statusCode === 200 &&
        response.message === "Department updated successfully."
      ) {
        toast.success("Department updated successfully.");
        setEditDialog(false);
        await fetchDepartmentList();
      } else {
        toast.error(response?.message || "Failed to update department.");
      }
    } catch (error) {
      console.error("Error updating department:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteClick = (department) => {
    if (!department || !department.id) {
      toast.error("Invalid department selected for deletion.");
      console.error("Invalid department object:", department);
      return;
    }

    const selectedDept = departmentList.find(
      (dept) => dept.departmentId === department.id
    );

    if (!selectedDept) {
      toast.error("Department not found.");
      return;
    }

    console.log("Correctly Selected Department for Deletion:", selectedDept);
    setSelectedDepartmentData(selectedDept);
    setDeleteDialog(true);
  };

  const handleDeleteDepartment = async () => {
    if (!selectedDepartmentData || !selectedDepartmentData.departmentId) {
      toast.error("No valid department selected for deletion.");
      console.error("Invalid department data:", selectedDepartmentData);
      return;
    }

    setIsProcessing(true);

    try {
      console.log("Deleting Department:", selectedDepartmentData.departmentId);

      const response = await deleteDepartment(
        selectedDepartmentData.departmentId
      );

      console.log("Delete Response:", response);

      if (response?.statusCode === 200) {
        toast.success(
          `Department "${selectedDepartmentData.departmentName}" deleted successfully.`
        );
        fetchDepartmentList();
        setDeleteDialog(false);
      } else {
        console.error("Delete API Error:", response);
        toast.error(response?.message || "Failed to delete department.");
      }
    } catch (error) {
      console.error("Error deleting department:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddAgent = async () => {
    if (!agentName.trim()) {
      toast.error("Full Name is required.");
      return;
    }

    if (!agentEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(agentEmail)) {
      toast.error("Enter a valid email.");
      return;
    }

    if (!agentMobile.trim() || !/^\d{10}$/.test(agentMobile)) {
      toast.error("Enter a valid 10-digit mobile number.");
      return;
    }

    if (!selectedDepartment) {
      toast.error("Please select a department.");
      return;
    }

    if (!generatedPassword) {
      toast.error("Generate a password before submitting.");
      return;
    }

    const department = departmentList.find(
      (dept) => dept.departmentId === selectedDepartment
    );

    if (!department) {
      toast.error("Invalid department selected.");
      return;
    }

    const agentData = {
      name: agentName.trim(),
      mobileNumber: agentMobile.trim(),
      email: agentEmail.trim(),
      password: generatedPassword,
      allowAllChats: 1,
      departmentId: String(selectedDepartment),
      departmentName: department.departmentName,
      agentCode: "",
    };

    console.log("Sending Add Agent Request:", agentData);

    try {
      setIsSubmitting(true);

      const response = await addAgent(agentData);
      //console.log("Agent data", agentData);

      console.log("API Response:", response);

      if (response?.statusCode === 201) {
        toast.success("Agent added successfully.");
        setAddAgentDialog(false);
        setAgentName("");
        setAgentEmail("");
        setAgentMobile("");
        setGeneratedPassword("");
        setSelectedDepartment(null);
        fetchDepartmentList();
      }

      else if (response?.statusCode == 400) {
        let errorMessage = response.message;
        toast.error(errorMessage);
      }
      else {
        let errorMessage = response?.message || "Failed to add agent.";

        console.log("API Error Message:", errorMessage);

        if (errorMessage.includes("Email already exist")) {
          toast.error("Email already exists. Please use another.");
        } else if (errorMessage.includes("Mobile number already exists")) {
          toast.error("Mobile number already exists. Please use another.");
        } else {
          toast.error(errorMessage);
        }
      }
    } catch (error) {
      console.error("Error adding agent:", error);

      let errorMessage = "Something went wrong. Please try again.";

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      console.log("Extracted Error Message:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
      // setTimeout(() => {
      //     window.location.reload();
      // }, 800); // Reload after 2 seconds to allow toast message visibility
    }
  };

  const PaginationList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    gap: "8px",
  });

  const CustomPagination = ({
    totalPages,
    paginationModel,
    setPaginationModel,
  }) => {
    const { items } = usePagination({
      count: totalPages,
      page: paginationModel.page + 1,
      onChange: (_, newPage) =>
        setPaginationModel({ ...paginationModel, page: newPage - 1 }),
    });

    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: 0 }}>
        <PaginationList>
          {items.map(({ page, type, selected, ...item }, index) => {
            let children = null;

            if (type === "start-ellipsis" || type === "end-ellipsis") {
              children = "…";
            } else if (type === "page") {
              children = (
                <Button
                  key={index}
                  variant={selected ? "contained" : "outlined"}
                  size="small"
                  sx={{ minWidth: "27px" }}
                  {...item}
                >
                  {page}
                </Button>
              );
            } else {
              children = (
                <Button
                  key={index}
                  variant="outlined"
                  size="small"
                  {...item}
                  sx={{}}
                >
                  {type === "previous" ? "Previous" : "Next"}
                </Button>
              );
            }

            return <li key={index}>{children}</li>;
          })}
        </PaginationList>
      </Box>
    );
  };

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    {
      field: "departmentName",
      headerName: "Department Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 80,
      renderCell: (params) => {
        if (!params.row || !params.row.id) {
          console.error("⚠️ Invalid row data:", params.row);
          return null;
        }
        return (
          <>
            <IconButton
              className="text-xs"
              onClick={() => handleEditClick(params.row)}
            >
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
            <IconButton onClick={() => handleDeleteClick(params.row)}>
              <DeleteForeverIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "#e31a1a",
                }}
              />
            </IconButton>
          </>
        );
      },
    },
  ];

  const filteredDepartmentList =
    selectedadddepartment && selectedadddepartment !== "no-selection"
      ? departmentList.filter(
        (dept) => dept.departmentId === selectedadddepartment
      )
      : departmentList;

  const rows = filteredDepartmentList.map((item, index) => ({
    id: item.departmentId,
    sn: index + 1,
    departmentName: item.departmentName || "N/A",
  }));

  const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

  const CustomFooter = () => {
    return (
      <GridFooterContainer
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: {
            xs: "center",
            lg: "space-between",
          },
          alignItems: "center",
          padding: 1,
          gap: 2,
          overflowX: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          {selectedRows.length > 0 && (
            <Typography
              variant="body2"
              sx={{
                borderRight: "1px solid #ccc",
                paddingRight: "10px",
              }}
            >
              {selectedRows.length} Rows Selected
            </Typography>
          )}

          <Typography variant="body2">
            Total Records: <span className="font-semibold">{rows.length}</span>
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <CustomPagination
            totalPages={totalPages}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
          />
        </Box>
      </GridFooterContainer>
    );
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    // onOptionChange(value);
  }

  return (
    <div>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between mb-5  mt-4 w-full">
            <h1 className="text-xl font-medium">Manage Agent</h1>
            <div className="flex gap-5">
              <div className="w-max-content ">
                <UniversalButton
                  label="Add Department"
                  id="adddepartment"
                  name="adddepartment"
                  onClick={() => setAddDepartment(true)}
                />
              </div>
              <div className="w-max-content ">
                <UniversalButton
                  label="Add Agent"
                  id="addagent"
                  name="addagent"
                  onClick={() => setAddAgentDialog(true)}
                />
              </div>
            </div>
          </div>

          {/* Manage Agent Table */}
          <ManageAgentTable />

          {/* Add Department dialog start  */}
          <Dialog
            header="Add Department"
            draggable={false}
            visible={adddepartment}
            className="w-[40rem]"
            onHide={() => {
              if (!adddepartment) return;
              setAddDepartment(false);
            }}
          >
            <TabView>
              <TabPanel header="Add New" leftIcon="pi pi-calendar mr-2">
                <InputField
                  id="adddepartmenname"
                  name="adddepartmenname"
                  label="Department Name"
                  tooltipContent="25 character Maximum allowed"
                  type="text"
                  placeholder="Enter Department name..."
                  value={newDepartmentName}
                  onChange={(e) => setNewDepartmentName(e.target.value)}
                  maxLength={20}
                />
                <div className="flex justify-center mt-2">
                  <UniversalButton
                    id="adddepartmentbtn"
                    name="adddepartmentbtn"
                    label={isSubmitting ? "Saving..." : "Submit"}
                    variant="primary"
                    onClick={handleAddDepartment}
                    disabled={isSubmitting}
                  />
                </div>
              </TabPanel>
              <TabPanel header="Manage" rightIcon="pi pi-user ml-2">
                <div className="m-0">
                  <div className="card flex justify-content-center mb-4">
                    <DropdownWithSearch
                      label="Department List"
                      tooltipContent="Select Department"
                      tooltipPlacement="right"
                      value={selectedadddepartment}
                      onChange={(selected) => setSelectedAddDepartment(selected)}
                      options={departmentList.map((department) => ({
                        value: department.departmentId,
                        label: department.departmentName,
                      }))}
                      placeholder="Select Department"
                      filter
                    />
                  </div>
                  {/* Table Start */}
                  <Paper sx={{ height: 360 }}>
                    <DataGrid
                      // id={id}
                      // name={name}
                      rows={rows}
                      columns={columns}
                      initialState={{ pagination: { paginationModel } }}
                      pageSizeOptions={[10, 20, 50]}
                      pagination
                      paginationModel={paginationModel}
                      onPaginationModelChange={setPaginationModel}
                      // checkboxSelection
                      rowHeight={42}
                      slots={{ footer: CustomFooter }}
                      slotProps={{ footer: { totalRecords: rows.length } }}
                      onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
                      disableRowSelectionOnClick
                      // autoPageSize
                      disableColumnResize
                      disableColumnMenu
                      sx={{
                        border: 0,
                        "& .MuiDataGrid-cellCheckbox": {
                          outline: "none !important",
                        },
                        "& .MuiDataGrid-cell": {
                          outline: "none !important",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                          color: "#193cb8",
                          fontSize: "14px",
                          fontWeight: "bold !important",
                        },
                        "& .MuiDataGrid-row--borderBottom": {
                          backgroundColor: "#e6f4ff !important",
                        },
                        "& .MuiDataGrid-columnSeparator": {
                          // display: "none",
                          color: "#ccc",
                        },
                      }}
                    />
                  </Paper>
                  {/* Table End */}
                  {/* Edit Department Dialog */}
                  <Dialog
                    header="Edit Department"
                    visible={editDialog}
                    onHide={() => setEditDialog(false)}
                    className="w-[30rem]"
                    draggable={false}
                  >
                    <InputField
                      label="Department Name"
                      value={editedDepartmentName}
                      onChange={(e) => setEditedDepartmentName(e.target.value)}
                      maxLength={50}
                    />
                    <div className="flex justify-center gap-4 mt-4">
                      <UniversalButton
                        label="Cancel"
                        variant="secondary"
                        onClick={() => setEditDialog(false)}
                      />
                      <UniversalButton
                        label={isProcessing ? "Updating..." : "Save"}
                        variant="primary"
                        onClick={handleEditDepartment}
                        disabled={isProcessing}
                      />
                    </div>
                  </Dialog>
                  {/* Delete Confirmation Dialog */}
                  <Dialog
                    header="Delete Department"
                    visible={deleteDialog}
                    onHide={() => setDeleteDialog(false)}
                    className="w-[25rem]"
                    draggable={false}
                  >
                    <Typography variant="body1" className="text-center">
                      Are you sure you want to delete <br />
                      <span className="font-semibold">
                        {selectedDepartmentData?.departmentName ||
                          "this department"}
                      </span>
                      &nbsp;?
                    </Typography>
                    <div className="flex justify-center gap-4 mt-4">
                      <UniversalButton
                        label="Cancel"
                        variant="secondary"
                        onClick={() => setDeleteDialog(false)}
                      />
                      <UniversalButton
                        label={isProcessing ? "Deleting..." : "Delete"}
                        variant="danger"
                        onClick={handleDeleteDepartment}
                        disabled={isProcessing}
                      />
                    </div>
                  </Dialog>
                </div>
              </TabPanel>
            </TabView>
          </Dialog>
          {/* Add Department dialog end */}

          {/* Add agent dialog start */}
          <Dialog
            header="Add Agent"
            draggable={false}
            visible={addAgentDialog}
            style={{ width: "40rem" }}
            onHide={() => {
              setAddAgentDialog(false);
            }}
          >
            <div className="space-y-3">
              <InputField
                label="Full Name"
                id="fullName"
                name="fullName"
                placeholder="Enter Full Name"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
              />
              <div className="grid grid-cols-2 lg:flex-nowrap flex-wrap gap-3">
                <InputField
                  label="Email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  value={agentEmail}
                  onChange={(e) => setAgentEmail(e.target.value)}
                />
                <InputField
                  label="Mobile Number"
                  id="mobilemumber"
                  name="mobilemumber"
                  placeholder="Enter Mobile Number"
                  value={agentMobile}
                  onChange={(e) => setAgentMobile(e.target.value)}
                />
              </div>
              <GeneratePassword
                label="Generate Password"
                id="agentPassword"
                name="agentPassword"
                tooltipContent="Click to generate a secure password"
                tooltipPlacement="right"
                onPasswordGenerate={(newPassword) =>
                  setGeneratedPassword(newPassword)
                }
              />
              <div className="mb-2">
                <DropdownWithSearch
                  label="Department List"
                  tooltipContent="Select Department"
                  tooltipPlacement="right"
                  value={selectedDepartment}
                  onChange={setSelectedDepartment}
                  options={
                    Array.isArray(departmentList)
                      ? departmentList.map((department) => ({
                        value: department.departmentId,
                        label: department.departmentName,
                      }))
                      : []
                  }
                  placeholder="Select Department"
                  filter
                />
              </div>
              {/* <RadioGroupFieldupdown
                id="assign"
                name="assign"
                label="Assign"
                options={[
                  { label: "Auto", value: "Auto" },
                  { label: "Manual", value: "Manual" },
                  { label: "All", value: "All" },
                ]}
              /> */}
              <UniversalLabel
                text="Assign"
                tooltipContent='Select selection for assign'
                tooltipPlacement="right"
              />
              <div className="flex mt-2 gap-3" >
                {/* Option 1 */}
                <label className=" cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-center gap-2 cursor-pointer" >
                    <RadioButton inputId="radioOptionAuto" name="radioGroup" value="auto" onChange={handleChange} checked={selectedOption === 'auto'} />
                    <label htmlFor="radioOptionAuto" className="text-gray-700 font-medium text-sm cursor-pointer">Auto</label>
                  </div>
                </label>

                {/* Option 2 */}
                <label className=" cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-center gap-2" >
                    <RadioButton inputId="radioOptionManual" name="radioGroup" value="manual" onChange={handleChange} checked={selectedOption === 'manual'} />
                    <label htmlFor="radioOptionManual" className="text-gray-700 font-medium text-sm cursor-pointer">Manual</label>
                  </div>
                </label>

                {/* Option 3 */}
                <label className=" cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-center gap-2 " >
                    <RadioButton inputId="radioOptionAll" name="radioGroup" value="all" onChange={handleChange} checked={selectedOption === 'all'} />
                    <label htmlFor="radioOptionAll" className="text-gray-700 font-medium text-sm">All</label>
                  </div>
                </label>
              </div>
              <div className="flex justify-center ">
                <UniversalButton
                  label={isSubmitting ? "Adding..." : "Submit"}
                  id="submit"
                  name="submit"
                  variant="primary"
                  onClick={handleAddAgent}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </Dialog>
          {/* Add agent dialog end */}
        </>
      )}

    </div>
  );
};

export default ManageAgent;

