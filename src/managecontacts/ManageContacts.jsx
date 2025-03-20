import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import CustomTooltip from "../whatsapp/components/CustomTooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MultiSelect } from "primereact/multiselect";
import AnimatedDropdown from "../whatsapp/components/AnimatedDropdown";
import UniversalButton from "../whatsapp/components/UniversalButton";
import { IoSearch } from "react-icons/io5";
import InputField from "../components/layout/InputField";
import WhatsappManageContactsTable from "./components/WhatsappManageContactsTable";
import { Dialog } from "primereact/dialog";
import { TabView, TabPanel } from "primereact/tabview";
import { Dropdown } from "primereact/dropdown";
import { Box, IconButton, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import RadioGroupField from "../whatsapp/components/RadioGroupField";
import UniversalDatePicker from "../whatsapp/components/UniversalDatePicker";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { MdOutlineDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";
import UniversalSkeleton from "../whatsapp/components/UniversalSkeleton";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import {
  addContact,
  addGrp,
  deleteGrp,
  getContactListByGrpId,
  getGrpList,
  importContact,
  updateContactsDetails,
  updateGroupName,
  uploadContactFile,
} from "../apis/contact/contact";
import DropdownWithSearch from "../whatsapp/components/DropdownWithSearch";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CustomNoRowsOverlay from "../whatsapp/components/CustomNoRowsOverlay";
import { campaignUploadFile } from "../apis/whatsapp/whatsapp";
import { eslintUseValue } from "@mui/x-data-grid/internals";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Typography, Button } from "@mui/material";

const ManageContacts = () => {
  const [selectedMultiGroup, setSelectedMultiGroup] = useState(null);
  const [selectedMultiGroupContact, setSelectedMultiGroupContact] =
    useState(null);
  const [selectedmanageGroups, setSelectedManageGroups] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [addGroupvisible, setaddGroupVisible] = useState(false);
  const [addContactvisible, setaddContactVisible] = useState(false);
  const [selectedddImportContact, setSelectedAddImportContact] =
    useState("option1");
  const [selectedaddwish, setSelectedAddWish] = useState("No");
  const [selectedgamderadd, setSelectedGamderAdd] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [fileHeaders, setFileHeaders] = useState([]);
  const [totalRecords, setTotalRecords] = useState("");
  const [manageContactFirst, setMmanageContactFirst] = useState("");
  const [manageContactMobile, setManageContactMobile] = useState("");
  const [allContacts, setAllContacts] = useState([]);
  const [grpList, setGrpList] = useState([]);
  const [addContactDetails, setAddContactDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNo: "",
    emailId: "",
    birthDate: "",
    mariageDate: "",
    allowishes: "",
    gender: "",
  });
  const [groupName, setGroupName] = useState("");
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [deleteGrpId, setDeleteGrpId] = useState("");
  const [updateGrpId, setUpdateGrpId] = useState("");
  const [importContactFormVisible, setImportContactFormVisible] =
    useState(false);

  const [filePath, setFilePath] = useState("");
  const [editGrpVisible, setEditGrpVisible] = useState(false);
  const [updateContactDetails, setUpdateContactDetails] = useState("");
  const [updatedContactDetails, setUpdatedContactDetails] = useState({});
  const [updateContactVisible, setUpdateContactVisible] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [selectedRows, setSelectedRows] = useState([]);

  async function getGrpListData() {
    const res = await getGrpList();
    setGrpList(res);
  }
  useEffect(() => {
    getGrpListData();
  }, []);

  const handleAddGroup = async () => {
    const res = await addGrp({
      groupName,
    });

    if (res.flag) {
      setGroupName("");
      toast.success(res.message);
      setaddGroupVisible(false);
    } else {
      toast.error(res.message ?? "Something went wrong");
    }
  };

  const multiGroup = [
    { value: "Group 1", label: "Group 1" },
    { value: "Group 2", label: "G2" },
    { value: "Group 3", label: "Group 3" },
    { value: "Group 4", label: "Group 4" },
    { value: "Group 5", label: "Group 5" },
  ];
  const multiGroupContact = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const manageGroups = [
    { name: "Group1", code: "G1" },
    { name: "Group2", code: "G2" },
    { name: "Group3", code: "G3" },
    { name: "Group4", code: "G4" },
    { name: "Group5", code: "G5" },
  ];

  const addImportContact = [
    { value: "option1", label: "Add Contact" },
    { value: "option2", label: "Import Contacts" },
  ];
  const handleOptionChange = (event) => {
    setSelectedAddImportContact(event.target.value);
    // console.log("Selected Option:", event.target.value);
  };
  const addwish = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const selectedManageGroups = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const handleAllAddContact = async () => {
    if (!selectedMultiGroupContact) {
      toast.error("Please select group contact");
      return;
    }
    const emptyState = Object.keys(addContactDetails).find(function (x) {
      return addContactDetails[x] === "" || addContactDetails[x] === null;
    });

    if (emptyState) {
      toast.error(`${emptyState} is required`);
      return;
    }

    let data = {};

    if (selectedddImportContact === "option1") {
      data = {
        groupSrNo: selectedMultiGroupContact,
        ...addContactDetails,
        birthDate: new Date(addContactDetails.birthDate).toLocaleDateString(
          "en-GB"
        ),
        mariageDate: new Date(addContactDetails.mariageDate).toLocaleDateString(
          "en-GB"
        ),
        allowishes: addContactDetails.allowishes === "Yes" ? 1 : 0,
      };
      const res = await addContact(data);
      if (res.flag) {
        setAddContactDetails({});
        setSelectedMultiGroupContact("");
        setaddContactVisible(false);
        toast.success(res.message);
      } else {
        toast.error(res.message ?? "Something went wrong");
      }
    } else if (selectedddImportContact === "option2") {
      data = {
        groupNo: selectedMultiGroupContact,
        // ...addContactDetails,
        firstName: addContactDetails.firstName,
        middleName: addContactDetails.middleName,
        lastName: addContactDetails.lastName,
        gender: addContactDetails.gender,
        birth: addContactDetails.birthDate,
        mobile: addContactDetails.mobileNo,
        marriage: addContactDetails.mariageDate,
        email: addContactDetails.emailId,
        noOfRow: totalRecords,
        filePath: filePath,
      };

      const res = await importContact(data);
      console.log(res);
      // if (res.flag) {
      //   setAddContactDetails({});
      //   setSelectedMultiGroupContact("");
      //   setaddContactVisible(false);
      //   setImportContactFormVisible(false);
      //   toast.success(res.message);
      // } else {
      //   toast.error(res.message ?? "Something went wrong");
      // }
    }
  };

  const manageGroupsOption = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.name}</div>
      </div>
    );
  };

  const options = [
    { value: 1, label: "Active" },
    { value: 2, label: "Inactive" },
  ];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchGroup = async () => {
    if (!selectedMultiGroup) {
      toast.error("Please select group");
      return;
    }

    setIsFetching(true);
    const res = await getContactListByGrpId({
      groupSrNo: selectedMultiGroup,
      status: selectedStatus,
    });
    if (!res.flag) {
      setAllContacts([]);
    }
    setAllContacts(res);

    setIsFetching(false);
  };

  // handle File drop
  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file) {
      const validExtensions = [".xls", ".xlsx", ".xlsm"];
      const fileExtension = file.name.split(".").pop();

      if (validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
        if (isValidFileName(file.name.split(".")[0])) {
          setUploadedFile(file);
          setIsUploaded(false);
          // parseFile(file);
        } else {
          toast.error(
            "File name can only contain alphanumeric characters, underscores, or hyphens."
          );
        }
      } else {
        toast.error("Only Excel files (.xls, .xlsx, .xlsm) are supported.");
      }
    }
  };

  const handleUpdateGrpName = async () => {
    const res = await updateGroupName(updateGrpId.groupCode, groupName);
    if (res?.message.includes("updated")) {
      toast.success(res?.message);
      setEditGrpVisible(false);
      setaddGroupVisible(false);
      setGroupName("");
      await getGrpListData();
    } else {
      toast.error(res?.message);
    }
  };

  // handle file change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validExtensions = [".xls", ".xlsx", ".xlsm"];
      const fileExtension = file.name.split(".").pop();

      if (validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
        if (isValidFileName(file.name.split(".")[0])) {
          setUploadedFile(file);
          setIsUploaded(false);
          // parseFile(file);
        } else {
          toast.error(
            "File name can only contain alphanumeric characters, underscores, or hyphens."
          );
        }
      } else {
        toast.error("Only Excel files (.xls, .xlsx, .xlsm) are supported.");
      }
    }
  };

  // Parse uploaded file and extract headers and data
  // const parseFile = (file) => {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     const workbook = XLSX.read(reader.result, { type: "binary" });
  //     const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  //     const jsonData = XLSX.utils.sheet_to_json(firstSheet);
  //     // const headers = Object.keys(jsonData[0]);
  //     const headers = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];
  //     // const headers = Object.keys(jsonData[0] || {}).map(header => header.trim()); // Trim header names
  //     console.log("Extracted headers:", headers);

  //     setFileData(jsonData);
  //     setColumns(headers);
  //     setFileHeaders(headers);
  //     // setIsUploaded(false); // Reset to "File Selected" if a new file is selected
  //     setTotalRecords(jsonData.length);
  //   };
  //   reader.readAsBinaryString(file);
  // };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const updateContactData = async () => {
    const grpDetails = grpList.find(
      (grp) => grp.groupName === updateContactDetails.group
    );
    if (!grpDetails) {
      toast.error("Group not found");
    }

    const data = {
      groupSrNo: grpDetails.groupCode,
      ...updatedContactDetails,
    };

    // console.log(data);
    // console.log("Contact Updated Successfully");
    const res = await updateContactsDetails(data);
    console.log(res);
  };

  useEffect(() => {
    console.log("updateContactDetails", updateContactDetails);
    setUpdatedContactDetails({
      srNo: updateContactDetails.srno,
      firstName: updateContactDetails.firstName,
      lastName: updateContactDetails.lastName,
      mobileNo: updateContactDetails.mobileno,
      activeStatus: updateContactDetails.status === "Active" ? 1 : 0,
      uniqueId: updateContactDetails.uniqueid,
    });
  }, [updateContactDetails]);

  // Excel file upload
  const handleFileUpload = async () => {
    if (uploadedFile) {
      if (isUploaded) {
        toast.error("File already uploaded. Please select a different one.");
        return;
      }
      setIsUploading(true);
      try {
        const response = await uploadContactFile(uploadedFile);
        console.log(response);
        setIsUploaded(true);
        toast.success("File uploaded successfully.");
        setColumns(response.headers);
        setFilePath(response.filepath);
        setFileData(response.sampleRecords);
        setFileHeaders(response.headers || []);
        setTotalRecords(response.totalRecords);
        setImportContactFormVisible(true);
      } catch (error) {
        toast.error("File upload failed: " + error.message);
      } finally {
        setIsUploading(false);
      }
    } else {
      toast.error("No file selected for upload.");
    }
  };

  // Validate filename
  const isValidFileName = (fileName) => {
    const regex = /^[a-zA-Z0-9_-]+$/;
    return regex.test(fileName);
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setIsUploaded(false);
    // setAddCountryCode(false)
    // setSelectedCountryCode('');
    document.getElementById("fileInput").value = "";
    toast.success("File removed successfully.");
  };

  const handleManageContactMobile = (e) => {
    setManageContactMobile(e.target.value);
  };

  const handleManageContactFirst = (e) => {
    setMmanageContactFirst(e.target.value);
  };

  const handleGrpDelete = async () => {
    if (!deleteGrpId) return;
    const res = await deleteGrp(deleteGrpId.groupName, deleteGrpId.groupCode);
    toast.success(res.message);
    setDeleteDialogVisible(false);
    setaddGroupVisible(false);
    await getGrpListData();
  };

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

  const contactColumns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "groupName", headerName: "Group Name", flex: 1, minWidth: 120 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <>
          <CustomTooltip placement="top" arrow title="Edit">
            <IconButton
              onClick={() => {
                setUpdateGrpId(params.row);
                setEditGrpVisible(true);
                setGroupName(params.row.groupName);
              }}
            >
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip placement="top" arrow title="Delete">
            <IconButton
              className="no-xs"
              onClick={() => {
                setDeleteGrpId(params.row);
                setDeleteDialogVisible(true);
              }}
            >
              <DeleteForeverIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "#e31a1a",
                }}
              />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
  ];

  const rows = Array.isArray(grpList)
    ? grpList?.map((grp, index) => ({
      id: grp.groupCode,
      sn: index + 1,
      groupName: grp.groupName,
    }))
    : [];

  const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

  return (
    <div>
      <div className="flex flex-wrap align-middle justify-end w-full gap-4 items-end pb-1">
        {/* Name Input Field */}

        <div className="w-max-content">
          <UniversalButton
            id="addgroupbtn"
            name="addgroupbtn"
            label="Add Group"
            onClick={() => setaddGroupVisible(true)}
          />
        </div>

        <div className="w-max-content">
          <UniversalButton
            id="addcontactbtn"
            name="addcontactbtn"
            label="Add Contact"
            onClick={() => setaddContactVisible(true)}
          />
        </div>

        <div className="w-max-content">
          <UniversalButton id="exportbtn" name="exportbtn" label="Export" />
        </div>
      </div>
      <div className="flex flex--wrap align-middle justify-start w-full gap-4 items-end pb-5">
        <div className="w-full sm:w-56">
          {/* <div className="flex gap-2 items-center mb-2">
            <label className="text-gray-700 text-sm font-medium">User</label>

            <CustomTooltip title="Select User" placement="right" arrow>
              <span>
                <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
              </span>
            </CustomTooltip>
          </div> */}
          <AnimatedDropdown
            label="Groups"
            tooltipContent="Please select atleast one group"
            tooltipPlacement="right"
            arrow
            className="custom-multiselect"
            placeholder="Select Groups"
            optionLabel="name"
            options={grpList?.map((item) => ({
              value: item.groupCode,
              label: item.groupName,
            }))}
            value={selectedMultiGroup}
            onChange={(e) => setSelectedMultiGroup(e)}
            filter
          />
        </div>

        <div className="w-full sm:w-56">
          <InputField
            label="First Name"
            id="name"
            name="name"
            type="text"
            tooltipContent="Enter First Name"
            placeholder="Enter First Name"
            value={manageContactFirst}
            onChange={handleManageContactFirst}
          />
        </div>
        <div className="w-full sm:w-56">
          <InputField
            label="Mobile Number"
            tooltipContent="Enter Mobile Number"
            id="mobile"
            name="mobile"
            type="number"
            value={manageContactMobile}
            onChange={handleManageContactMobile}
            placeholder="Enter Mobile Number"
          />
        </div>
        <div className="w-full sm:w-56">
          <AnimatedDropdown
            id="statusdropdown"
            name="statusdropdown"
            label="Status"
            tooltipContent="Select Status"
            tooltipPlacement="right"
            options={options}
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value)}
            placeholder="Status"
          />
        </div>

        <div className="w-max-content">
          <UniversalButton
            id="managegroupSearchBtn"
            name="managegroupSearchBtn"
            label={isFetching ? "Searching..." : "Search"}
            icon={<IoSearch />}
            onClick={handleSearchGroup}
            variant="primary"
            disabled={isFetching}
          />
        </div>
        <div className="w-max-content">
          <UniversalButton
            id="managegroupdeletebtn"
            name="managegroupdeletebtn"
            label="Delete"
          />
        </div>
      </div>

      {isFetching ? (
        <UniversalSkeleton height="35rem" width="100%" />
      ) : (
        <WhatsappManageContactsTable
          allContacts={allContacts}
          updateContactData={updateContactData}
          setUpdateContactDetails={setUpdateContactDetails}
          setUpdateContactVisible={setUpdateContactVisible}
        />
      )}

      <div className="flex card justify-content-center">
        {/* <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} /> */}
        <Dialog
          header="Group"
          visible={addGroupvisible}
          draggable={false}
          style={{ width: "40rem" }}
          onHide={() => {
            if (!addGroupvisible) return;
            setaddGroupVisible(false);
          }}
        >
          <div className="card">
            <TabView>
              <TabPanel header="Add New" leftIcon="pi pi-calendar mr-2">
                <InputField
                  id="addGroupname"
                  name="addGroupname"
                  type="text"
                  placeholder="Enter group name..."
                  value={groupName}
                  onChange={(e) => {
                    setGroupName(e.target.value);
                  }}
                />
                <div className="flex justify-center mt-2">
                  <UniversalButton
                    id="addnewgroup"
                    name="addnewgroup"
                    label="Submit"
                    variant="primary"
                    onClick={handleAddGroup}
                  />
                </div>
              </TabPanel>
              <TabPanel header="Manage" rightIcon="pi pi-user ml-2">
                <div className="m-0">
                  <div className="flex card justify-content-center mb-2">
                    <DropdownWithSearch
                      options={grpList?.map((item) => ({
                        value: item.groupCode,
                        label: item.groupName,
                      }))}
                      value={selectedmanageGroups}
                      onChange={(e) => setSelectedManageGroups(e)}
                      optionLabel="name"
                      placeholder="Select Groups"
                      filter
                      valueTemplate={selectedManageGroups}
                      itemTemplate={manageGroupsOption}
                      className="w-full md:w-14rem"
                    />
                  </div>

                  <Paper
                    sx={{ height: 333 }}
                    id={"ManageGroup"}
                    name={"ManageGroup"}
                  >
                    <DataGrid
                      id={"ManageGroup"}
                      name={"ManageGroup"}
                      rows={rows}
                      columns={contactColumns}
                      initialState={{ pagination: { paginationModel } }}
                      pageSizeOptions={[10, 20, 50]}
                      pagination
                      paginationModel={paginationModel}
                      onPaginationModelChange={setPaginationModel}
                      // checkboxSelection
                      rowHeight={45}
                      slots={{ footer: CustomFooter }}
                      slotProps={{ footer: { totalRecords: rows.length } }}
                      // onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
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
                </div>
              </TabPanel>
            </TabView>
          </div>
        </Dialog>
      </div>
      <div className="flex card justify-content-center">
        <Dialog
          header="Add Contact"
          visible={addContactvisible}
          draggable={false}
          style={{ width: "40rem" }}
          onHide={() => {
            if (!addContactvisible) return;
            setaddContactVisible(false);
          }}
        >
          <div className="m-0">
            <AnimatedDropdown
              className="custom-multiselect"
              placeholder="Select Groups"
              maxSelectedLabels={0}
              optionLabel="name"
              options={grpList?.map((item) => ({
                value: item.groupCode,
                label: item.groupName,
              }))}
              value={selectedMultiGroupContact}
              onChange={(e) => setSelectedMultiGroupContact(e)}
            />
            <RadioGroupField
              name="addImportContact"
              id="addImportContact"
              options={addImportContact}
              value={selectedddImportContact}
              onChange={handleOptionChange}
            />

            {selectedddImportContact === "option1" && (
              <div>
                <div className="flex-wrap grid grid-cols-2 gap-3 lg:flex-nowrap">
                  <InputField
                    placeholder="Enter first name.."
                    id="userfirstname"
                    name="userfirstname"
                    type="text"
                    value={addContactDetails.firstName}
                    onChange={(e) =>
                      setAddContactDetails({
                        ...addContactDetails,
                        firstName: e.target.value,
                      })
                    }
                    required={true}
                  />
                  <InputField
                    placeholder="Enter middle name.."
                    id="usermiddlename"
                    name="usermiddlename"
                    type="text"
                    value={addContactDetails.middleName}
                    onChange={(e) =>
                      setAddContactDetails({
                        ...addContactDetails,
                        middleName: e.target.value,
                      })
                    }
                  />
                  <InputField
                    placeholder="Enter last name.."
                    id="userlastname"
                    name="userlastname"
                    type="text"
                    value={addContactDetails.lastName}
                    onChange={(e) =>
                      setAddContactDetails({
                        ...addContactDetails,
                        lastName: e.target.value,
                      })
                    }
                    required={true}
                  />
                  <InputField
                    placeholder="Enter mobile no.."
                    id="mobilenumber"
                    name="mobilenumber"
                    type="number"
                    value={addContactDetails.mobileNo}
                    onChange={(e) =>
                      setAddContactDetails({
                        ...addContactDetails,
                        mobileNo: e.target.value,
                      })
                    }
                    required={true}
                  />
                  <InputField
                    placeholder="Enter email id.."
                    id="emailid"
                    name="emailid"
                    type="email"
                    value={addContactDetails.emailId}
                    onChange={(e) =>
                      setAddContactDetails({
                        ...addContactDetails,
                        emailId: e.target.value,
                      })
                    }
                    required={true}
                  />
                  <InputField
                    placeholder="Enter unique id.."
                    id="uniqueid"
                    name="uniqueid"
                    type="text"
                    value={addContactDetails.uniqueId}
                    onChange={(e) =>
                      setAddContactDetails({
                        ...addContactDetails,
                        uniqueId: e.target.value,
                      })
                    }
                  />
                  <UniversalDatePicker
                    label="Birth Date"
                    className="mb-0"
                    value={addContactDetails.birthDate}
                    onChange={(e) =>
                      setAddContactDetails({
                        ...addContactDetails,
                        birthDate: e,
                      })
                    }
                    required={true}
                  />
                  <UniversalDatePicker
                    label="Anniversary Date"
                    className="mb-0"
                    value={addContactDetails.mariageDate}
                    onChange={(e) =>
                      setAddContactDetails({
                        ...addContactDetails,
                        mariageDate: e,
                      })
                    }
                    required={true}
                  />
                  <RadioGroupField
                    label={"Allowishes?"}
                    name="addwish"
                    id="addwish"
                    options={addwish}
                    value={addContactDetails.allowishes}
                    onChange={(e) =>
                      setAddContactDetails({
                        ...addContactDetails,
                        allowishes: e.target.value,
                      })
                    }
                    required={true}
                  />
                  <RadioGroupField
                    label={"Gender?"}
                    name="gamderadd"
                    id="addgamderaddImportContact"
                    options={[
                      { value: "m", label: "Male" },
                      { value: "f", label: "Female" },
                    ]}
                    value={addContactDetails.gender}
                    onChange={(e) =>
                      setAddContactDetails({
                        ...addContactDetails,
                        gender: e.target.value,
                      })
                    }
                    required={true}
                  />
                </div>
                <div className="flex justify-center mt-2">
                  <UniversalButton
                    id="addnewConcat"
                    name="addnewConcat"
                    label="Submit"
                    variant="primary"
                    onClick={handleAllAddContact}
                  />
                </div>
              </div>
            )}

            {selectedddImportContact === "option2" && (
              <div className="importcontacts">
                {/* Your content for Import Contacts */}
                <div className="file-upload mt-2">
                  <div
                    className="file-upload-container"
                    onDrop={handleFileDrop}
                    onDragOver={handleDragOver}
                  >
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="fileInput"
                      name="fileInput"
                      accept=".xls,.xlsx,.xlsm"
                    />
                    <div className="flex justify-center gap-2 items-center">
                      <label
                        htmlFor="fileInput"
                        className="bg-blue-400 rounded-lg text-center text-sm text-white cursor-pointer file-upload-button font-medium hover:bg-blue-500 inline-block px-3 py-2 tracking-wider"
                      >
                        Choose or Drop File
                      </label>
                      <div className="upload-button-container">
                        <button
                          onClick={handleFileUpload}
                          disabled={isUploading}
                          className={`px-2 py-1.5 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer ${isUploading ? "disabled" : ""
                            }`}
                        >
                          <FileUploadOutlinedIcon
                            sx={{ color: "white", fontSize: "23px" }}
                          />
                        </button>
                      </div>
                    </div>
                    <p className="text-[0.8rem] text-gray-400 file-upload-text mt-2 tracking-wide">
                      Max 3 lacs records & mobile number should be with country
                      code. <br />
                      Supported File Formats: .xlsx
                    </p>
                    <div className="mt-3">
                      {uploadedFile ? (
                        <div className="flex justify-center file-upload-info gap-1 items-center">
                          <p className="text-green-500 text-sm file-upload-feedback file-upload-feedback-success font-[500]">
                            {isUploaded ? "File Uploaded: " : "File Selected: "}
                            <strong>{uploadedFile.name}</strong>
                          </p>
                          <button
                            className="p-1.5 rounded-2xl cursor-pointer file-remove-button hover:bg-gray-200"
                            onClick={handleRemoveFile}
                          >
                            <MdOutlineDeleteForever
                              className="text-red-500 cursor-pointer hover:text-red-600"
                              size={20}
                            />
                          </button>
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm file-upload-feedback file-upload-feedback-error font-semibold tracking-wide">
                          No file uploaded yet!
                        </p>
                      )}
                    </div>
                    {importContactFormVisible && (
                      <div>
                        <div className="flex-wrap grid grid-cols-2 gap-3 lg:flex-nowrap">
                          {/* <InputField
                            placeholder="Enter first name.."
                            id="userfirstname"
                            name="userfirstname"
                            type="text"
                            value={addContactDetails.firstName}
                            onChange={(e) =>
                              setAddContactDetails({
                                ...addContactDetails,
                                firstName: e.target.value,
                              })
                            }
                            required={true}
                          /> */}
                          <DropdownWithSearch
                            className="custom-multiselect"
                            placeholder="Select Variable for first name"
                            optionLabel="name"
                            options={fileHeaders?.map((item) => ({
                              value: item,
                              label: item,
                            }))}
                            value={addContactDetails.firstName}
                            onChange={(e) =>
                              setAddContactDetails({
                                ...addContactDetails,
                                firstName: e,
                              })
                            }
                            filter
                          />
                          <DropdownWithSearch
                            className="custom-multiselect"
                            placeholder="Select Variable for middle name"
                            optionLabel="name"
                            options={fileHeaders?.map((item) => ({
                              value: item,
                              label: item,
                            }))}
                            value={addContactDetails.middleName}
                            onChange={(e) =>
                              setAddContactDetails({
                                ...addContactDetails,
                                middleName: e,
                              })
                            }
                            filter
                          />
                          <DropdownWithSearch
                            className="custom-multiselect"
                            placeholder="Select Variable for last name"
                            optionLabel="name"
                            options={fileHeaders?.map((item) => ({
                              value: item,
                              label: item,
                            }))}
                            value={addContactDetails.lastName}
                            onChange={(e) =>
                              setAddContactDetails({
                                ...addContactDetails,
                                lastName: e,
                              })
                            }
                            filter
                          />
                          <DropdownWithSearch
                            className="custom-multiselect"
                            placeholder="Select Variable for Phone No."
                            optionLabel="name"
                            options={fileHeaders?.map((item) => ({
                              value: item,
                              label: item,
                            }))}
                            value={addContactDetails.mobileNo}
                            onChange={(e) =>
                              setAddContactDetails({
                                ...addContactDetails,
                                mobileNo: e,
                              })
                            }
                            filter
                          />
                          <DropdownWithSearch
                            className="custom-multiselect"
                            placeholder="Select Variable for email"
                            optionLabel="name"
                            options={fileHeaders?.map((item) => ({
                              value: item,
                              label: item,
                            }))}
                            value={addContactDetails.emailId}
                            onChange={(e) =>
                              setAddContactDetails({
                                ...addContactDetails,
                                emailId: e,
                              })
                            }
                            filter
                          />
                          <DropdownWithSearch
                            className="custom-multiselect"
                            placeholder="Select Variable for uniqueId"
                            optionLabel="name"
                            options={fileHeaders?.map((item) => ({
                              value: item,
                              label: item,
                            }))}
                            value={addContactDetails.uniqueId}
                            onChange={(e) =>
                              setAddContactDetails({
                                ...addContactDetails,
                                uniqueId: e,
                              })
                            }
                            filter
                          />
                          <DropdownWithSearch
                            className="custom-multiselect"
                            placeholder="Select Variable for BirthDate"
                            optionLabel="name"
                            options={fileHeaders?.map((item) => ({
                              value: item,
                              label: item,
                            }))}
                            value={addContactDetails.birthDate}
                            onChange={(e) =>
                              setAddContactDetails({
                                ...addContactDetails,
                                birthDate: e,
                              })
                            }
                            filter
                          />
                          <DropdownWithSearch
                            className="custom-multiselect"
                            placeholder="Select Variable for Anniversary Date"
                            optionLabel="name"
                            options={fileHeaders?.map((item) => ({
                              value: item,
                              label: item,
                            }))}
                            value={addContactDetails.mariageDate}
                            onChange={(e) =>
                              setAddContactDetails({
                                ...addContactDetails,
                                mariageDate: e,
                              })
                            }
                            filter
                          />
                          <DropdownWithSearch
                            className="custom-multiselect"
                            placeholder="Select Variable for AllowWishes"
                            optionLabel="name"
                            options={fileHeaders?.map((item) => ({
                              value: item,
                              label: item,
                            }))}
                            value={addContactDetails.allowishes}
                            onChange={(e) =>
                              setAddContactDetails({
                                ...addContactDetails,
                                allowishes: e,
                              })
                            }
                            filter
                          />
                          <DropdownWithSearch
                            className="custom-multiselect"
                            placeholder="Select Variable for Gender"
                            optionLabel="name"
                            options={fileHeaders?.map((item) => ({
                              value: item,
                              label: item,
                            }))}
                            value={addContactDetails.gender}
                            onChange={(e) =>
                              setAddContactDetails({
                                ...addContactDetails,
                                gender: e,
                              })
                            }
                            filter
                          />
                        </div>
                        {/* <div className="flex justify-center mt-2">
                          <UniversalButton
                            id="addnewConcat"
                            name="addnewConcat"
                            label="Submit"
                            variant="primary"
                            onClick={handleAllAddContact}
                          />
                        </div> */}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-center mt-2">
                  <UniversalButton
                    id="addnewConcat"
                    name="addnewConcat"
                    label="Submit"
                    variant="primary"
                    onClick={handleAllAddContact}
                  />
                </div>
              </div>
            )}
          </div>
        </Dialog>
      </div>

      <Dialog
        header="Confirm Deletion"
        visible={deleteDialogVisible}
        onHide={() => setDeleteDialogVisible(false)}
        className="w-[30rem]"
        draggable={false}
      >
        <div className="flex justify-center items-center">
          {/* <ErrorOutlineOutlinedIcon
                  sx={{
                    fontSize: 64,
                  }}
                /> */}
          <CancelOutlinedIcon
            sx={{
              fontSize: 64,
              color: "#ff3f3f",
            }}
          />
        </div>
        <div className="p-4 text-center">
          <p className="text-[1.1rem] text-gray-700 font-semibold">
            Are you sure you want to delete the group <br />
            <span className="text-green-500">"{deleteGrpId?.groupName}"</span>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            This action is irreversible.
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-2">
          <UniversalButton
            label="Cancel"
            style={{
              backgroundColor: "#090909",
            }}
            onClick={() => setDeleteDialogVisible(false)}
          />
          <UniversalButton
            label="Delete"
            style={
              {
                // backgroundColor: "red",
              }
            }
            onClick={handleGrpDelete}
          />
        </div>
      </Dialog>

      <Dialog
        header="Edit Group Name"
        visible={editGrpVisible}
        onHide={() => {
          setEditGrpVisible(false);
          setGroupName("");
        }}
        className="w-[30rem]"
        draggable={false}
      >
        <div className="flex flex-col gap-1.5">
          <InputField
            label="New Group Name"
            id="name"
            name="name"
            type="text"
            tooltipContent="Enter Group Name"
            placeholder="Enter Group Name"
            value={groupName}
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
          />
          <UniversalButton
            id="addgroupbtn"
            name="addgroupbtn"
            label="Update Group Name"
            className="mt-2"
            onClick={handleUpdateGrpName}
          />
        </div>
      </Dialog>

      <Dialog
        header="Edit Contact Details"
        visible={updateContactVisible}
        onHide={() => setUpdateContactVisible(false)}
        className="w-[40rem]"
        draggable={false}
      >
        <div>
          <div className="flex-wrap grid grid-cols-2 gap-3 lg:flex-nowrap">
            <InputField
              placeholder="Enter first name.."
              id="userfirstname"
              name="userfirstname"
              type="text"
              value={updatedContactDetails.firstName}
              onChange={(e) =>
                setUpdatedContactDetails({
                  ...updatedContactDetails,
                  firstName: e.target.value,
                })
              }
              required={true}
            />
            {/* <InputField
              placeholder="Enter middle name.."
              id="usermiddlename"
              name="usermiddlename"
              type="text"
              value={addContactDetails.middleName}
              onChange={(e) =>
                setAddContactDetails({
                  ...addContactDetails,
                  middleName: e.target.value,
                })
              }
            /> */}
            <InputField
              placeholder="Enter last name.."
              id="userlastname"
              name="userlastname"
              type="text"
              value={updatedContactDetails.lastName}
              onChange={(e) =>
                setUpdatedContactDetails({
                  ...updatedContactDetails,
                  lastName: e.target.value,
                })
              }
              required={true}
            />
            <InputField
              placeholder="Enter mobile no.."
              id="mobilenumber"
              name="mobilenumber"
              type="number"
              value={updatedContactDetails.mobileNo}
              onChange={(e) =>
                setUpdatedContactDetails({
                  ...updatedContactDetails,
                  mobileNo: e.target.value,
                })
              }
              required={true}
            />
            {/* <InputField
              placeholder="Enter email id.."
              id="emailid"
              name="emailid"
              type="email"
              value={addContactDetails.emailId}
              onChange={(e) =>
                setAddContactDetails({
                  ...addContactDetails,
                  emailId: e.target.value,
                })
              }
              required={true}
            /> */}
            <InputField
              placeholder="Enter unique id.."
              id="uniqueid"
              name="uniqueid"
              type="text"
              value={updatedContactDetails.uniqueId}
              onChange={(e) =>
                setUpdatedContactDetails({
                  ...updatedContactDetails,
                  uniqueId: e.target.value,
                })
              }
            />
            {/* <UniversalDatePicker
              label="Birth Date"
              className="mb-0"
              value={addContactDetails.birthDate}
              onChange={(e) =>
                setAddContactDetails({
                  ...addContactDetails,
                  birthDate: e,
                })
              }
              required={true}
            /> */}
            {/* <UniversalDatePicker
              label="Anniversary Date"
              className="mb-0"
              value={addContactDetails.mariageDate}
              onChange={(e) =>
                setAddContactDetails({
                  ...addContactDetails,
                  mariageDate: e,
                })
              }
              required={true}
            /> */}
            {/* <RadioGroupField
              label={"Allowishes?"}
              name="addwish"
              id="addwish"
              options={addwish}
              value={addContactDetails.allowishes}
              onChange={(e) =>
                setAddContactDetails({
                  ...addContactDetails,
                  allowishes: e.target.value,
                })
              }
              required={true}
            /> */}
            {/* <RadioGroupField
              label={"Gender?"}
              name="gamderadd"
              id="addgamderaddImportContact"
              options={[
                { value: "m", label: "Male" },
                { value: "f", label: "Female" },
              ]}
              value={addContactDetails.gender}
              onChange={(e) =>
                setAddContactDetails({
                  ...addContactDetails,
                  gender: e.target.value,
                })
              }
              required={true}
            /> */}
            <RadioGroupField
              label={"Active Status"}
              name="activeStatus"
              id="activeStatus"
              options={[
                { value: 0, label: "Active" },
                { value: 1, label: "Inactive" },
              ]}
              value={updatedContactDetails.activeStatus}
              onChange={(e) =>
                setUpdatedContactDetails({
                  ...updatedContactDetails,
                  activeStatus: Number(e.target.value),
                })
              }
              required={true}
            />
          </div>
          <div className="flex justify-center mt-2">
            <UniversalButton
              id="updateContactDetails"
              name="updateContactDetails"
              label="Update"
              variant="primary"
              onClick={updateContactData}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageContacts;