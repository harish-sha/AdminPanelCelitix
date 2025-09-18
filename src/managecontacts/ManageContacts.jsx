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
import { Box, IconButton, Paper, Switch } from "@mui/material";
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
import { RadioButton } from "primereact/radiobutton";
import moment from "moment";
import {
  addContact,
  addGrp,
  deleteContact,
  deleteGrp,
  deleteMultipleContact,
  getContactListByGrpId,
  getGrpList,
  importContact,
  updateContactsDetails,
  updateContactStatus,
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
import { ManageSearch } from "@mui/icons-material";
import UniversalLabel from "@/whatsapp/components/UniversalLabel";
import { exportToExcel } from "@/utils/utills";

const ManageContacts = () => {
  const [selectedMultiGroup, setSelectedMultiGroup] = useState(null);
  const [selectedMultiGroupContact, setSelectedMultiGroupContact] =
    useState(null);
  const [selectedmanageGroups, setSelectedManageGroups] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [addGroupvisible, setaddGroupVisible] = useState(false);
  const [addContactvisible, setaddContactVisible] = useState(false);
  const [importContactvisible, setimportContactVisible] = useState(false);
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
  const [filterContacts, setFilterContacts] = useState([]);
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
  const [idtoDelete, setIdToDelete] = useState([]);
  const [confirmMultiDeleteVisible, setConfirmMultiDeleteVisible] =
    useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const currentGroup = grpList?.find(
    (g) => g.groupCode === selectedMultiGroupContact?.value
  );
  const groupNameDelete = currentGroup?.groupName || "";

  const [deleteContactDialogVisible, setDeleteContactDialogVisible] =
    useState(false);
  const [allowishes, setAllowishes] = useState("");
  // const [selectedRows, setLocalSelectedRows] = React.useState([]);
  const [cols, setCols] = useState([]);
  const [contactRows, contactSetRows] = useState([]);

  async function getGrpListData() {
    const res = await getGrpList();
    setGrpList(res);
  }
  useEffect(() => {
    getGrpListData();
  }, []);

  // const handleAddGroup = async () => {
  //   const res = await addGrp({
  //     groupName,
  //   });

  //   if (res.flag) {
  //     setGroupName("");
  //     toast.success(res.message);
  //     setaddGroupVisible(false);
  //   } else {
  //     toast.error(res.message ?? "Something went wrong");
  //   }
  // };

  const handleAddGroup = async () => {
    const res = await addGrp({
      groupName,
    });

    if (res.flag) {
      if (res.message === "A group with this name already exists.") {
        toast.error(res.message);
        return;
      }
      setGroupName("");
      toast.success(res.message);
      setaddGroupVisible(false);
      await getGrpListData();
    } else {
      toast.error(res.message ?? "Something went wrong");
    }
  };

  const handleOptionChange = (event) => {
    setSelectedAddImportContact(event.target.value);
  };

  const addwish = [
    { value: 1, label: "Yes" },
    { value: 0, label: "No" },
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

  useEffect(() => {
    if (!importContactvisible) {
      // reset group selection
      setSelectedMultiGroupContact(null);

      // clear file upload state
      setUploadedFile(null);
      setIsUploaded(false);
      setFilePath("");
      setFileData([]);
      setFileHeaders([]);
      setTotalRecords(0);

      // hide & clear the column-mapping form
      setImportContactFormVisible(false);
      setAddContactDetails({
        firstName: "",
        middleName: "",
        lastName: "",
        mobileNo: "",
        emailId: "",
        uniqueId: "",
        birthDate: "",
        mariageDate: "",
        allowishes: "",
        gender: "",
      });
    }
  }, [importContactvisible]);

  async function handleImportContact() {
    if (!selectedMultiGroupContact) {
      return toast.error("Please select a group before importing.");
    }
    if (!isUploaded) {
      return toast.error("Please upload the file before importing.");
    }
    if (!addContactDetails.mobileNo) {
      return toast.error("Please map the Phone No. column before importing.");
    }
    try {
      const payload = {
        groupSrNo: selectedMultiGroupContact,
        firstName: addContactDetails.firstName.trim(),
        middleName: addContactDetails.middleName?.trim() || "",
        lastName: addContactDetails.lastName.trim(),
        gender: addContactDetails.gender,
        mobile: addContactDetails.mobileNo.trim(),
        email: addContactDetails.emailId.trim(),
        extra: addContactDetails.uniqueId?.trim() || "",
        allowishes: addContactDetails.allowishes?.trim() || "",
        status: 1,
        birth: addContactDetails.birthDate?.trim() || "",
        marriage: addContactDetails.mariageDate?.trim() || "",
        filePath: filePath,
        fileData: [],
        noOfRow: -1,
      };
      const res = await importContact(payload);
      setimportContactVisible(false);

      // toast.success("Contact imported successfully.");
      // Handle response safely
      if (res && typeof res === "object") {
        const {
          duplicateContacts = 0,
          totalContacts = 0,
          invalidContacts = 0,
          totalContactsAdded = 0,
          message = "Contact import completed.",
        } = res;
        toast(
          `${message}\n\nTotal: ${totalContacts}\nAdded: ${totalContactsAdded}\nDuplicate: ${duplicateContacts}\nInvalid: ${invalidContacts}`,
          { duration: 6000 }
        );
      } else {
        toast.success("Contact imported, but no detailed response received.");
      }

      await getGrpList();
      await handleSearchGroup();
      getGrpListData();
    } catch (e) {
      console.log(e);
    }
  }

  const handleAllAddContact = async () => {
    // if (!selectedMultiGroupContact) {
    //   toast.error("Please select a group.");
    //   return;
    // }

    const requiredFields = [
      "firstName",
      //"lastName",
      "mobileNo",
      //"emailId",
      // "birthDate",
      //"gender",
      //"uniqueId",
    ];
    const emptyField = requiredFields.find((field) => {
      const value = addContactDetails[field];
      if (typeof value === "string") {
        return !value.trim();
      }
      return !value;
    });

    if (emptyField) {
      toast.error(`${emptyField} is required.`);
      return;
    }

    // Prepare payload
    const payload = {
      groupSrNo: selectedMultiGroupContact,
      firstName: addContactDetails.firstName.trim(),
      middleName: addContactDetails.middleName?.trim() || "",
      lastName: addContactDetails.lastName.trim(),
      gender: addContactDetails.gender,
      mobileNo: addContactDetails.mobileNo.trim(),
      emailId: addContactDetails.emailId.trim(),
      uniqueId: addContactDetails.uniqueId?.trim() || "",
      allowishes: addContactDetails.allowishes === "enable" ? 1 : 0,
      status: 1,
      birthDate: addContactDetails.birthDate
        ? moment(addContactDetails.birthDate).format("YYYY-MM-DD")
        : "1800-01-01",
      anniversaryDate: addContactDetails.mariageDate
        ? moment(addContactDetails.mariageDate).format("YYYY-MM-DD")
        : "1800-01-01",
    };

    try {
      // Call the API
      const response = await addContact(payload);

      if (response.flag == true) {
        // Success
        toast.success("Contact added successfully.");
        // await getContactListByGrpId({
        //   groupSrNo: selectedMultiGroup,
        //   status: selectedStatus,
        // })
        await handleSearchGroup();
        await getGrpList();
        setAddContactDetails({
          firstName: "",
          middleName: "",
          lastName: "",
          mobileNo: "",
          emailId: "",
          birthDate: "",
          mariageDate: "",
          allowishes: "",
          gender: "",
          uniqueId: "",
        });
        setSelectedMultiGroupContact(null);
        setaddContactVisible(false);
      } else {
        // Handle specific errors
        if (response.message?.includes("Mobile Number already exists")) {
          toast.error("Mobile number already exists. Please use another.");
        } else {
          toast.error(response.message || "Failed to add contact.");
        }
      }
    } catch (error) {
      console.error("Error adding contact:", error);
      toast.error("Something went wrong. Please try again.");
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
    { value: 0, label: "Inactive" },
  ];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchGroup = async () => {
    async function handleStatusChange(e, id) {
      try {
        const data = {
          srno: id,
          status: Number(e),
        };
        const res = await updateContactStatus(data);
        if (!res.message.includes("successfully"))
          return toast.error(res.message);
        toast.success(res.message);
        await handleSearchGroup();
      } catch (e) {
        toast.error("Something went wrong");
      }
    }
    if (!selectedMultiGroup) {
      toast.error("Please select group");
      return;
    }
    try {
      setIsFetching(true);
      const res = await getContactListByGrpId({
        groupSrNo: selectedMultiGroup,
        status: selectedStatus,
      });

      if (!Array.isArray(res)) {
        setAllContacts([]);
        setFilterContacts([]);
        contactSetRows([]);
        return;
      }
      setAllContacts(res);

      setCols([
        { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
        {
          field: "firstName",
          headerName: "First Name",
          flex: 1,
          minWidth: 120,
        },
        {
          field: "lastName",
          headerName: "Last Name",
          flex: 1,
          minWidth: 120,
        },
        {
          field: "mobileno",
          headerName: "Mobile No",
          flex: 1,
          minWidth: 120,
        },
        {
          field: "uniqueId",
          headerName: "Unique ID",
          flex: 1,
          minWidth: 120,
        },
        // {
        //   field: "emailstatus",
        //   headerName: "User Status",
        //   flex: 1,
        //   minWidth: 120,
        // },
        { field: "group", headerName: "Group", flex: 1, minWidth: 120 },
        {
          field: "status",
          headerName: "Status",
          flex: 1,
          minWidth: 120,
          renderCell: (params) => {
            return (
              <CustomTooltip
                arrow
                placement="top"
                // title="Allow/ Disallow"
                title={params.row.status === 1 ? "Active" : "Inactive"}
              >
                <Switch
                  checked={params.row.status === 1}
                  onChange={(e) => {
                    handleStatusChange(e.target.checked, params.row.id);
                  }}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#34C759",
                    },
                    "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
                    {
                      backgroundColor: "#34C759",
                    },
                  }}
                />
              </CustomTooltip>
            );
          },
        },
        // { field: 'totalAudience', headerName: 'Total Audience', flex: 1, minWidth: 120 },
        {
          field: "action",
          headerName: "Action",
          flex: 1,
          minWidth: 120,
          renderCell: (params) => (
            <>
              <IconButton
                onClick={() => {
                  const { birthDate: b, mariageDate: m, ...rest } = params.row;
                  setUpdateContactVisible(true);
                  setUpdateContactDetails({
                    ...rest,
                    birthDate: b ? new Date(b) : null,
                    mariageDate: m ? new Date(m) : null,
                  });
                }}
              >
                <EditNoteIcon
                  sx={{
                    fontSize: "1.2rem",
                    color: "gray",
                  }}
                />
              </IconButton>
              <IconButton
                className="no-xs"
                onClick={() => {
                  setDeleteContactDialogVisible(true);
                  setIdToDelete(params.row);
                }}
              >
                <MdOutlineDeleteForever
                  className="text-red-500 cursor-pointer hover:text-red-600"
                  size={20}
                />
              </IconButton>
            </>
          ),
        },
      ]);
      const filterData = res?.filter(
        (contact) =>
          (contact?.firstName
            ?.toLowerCase()
            .includes(manageContactFirst.toLowerCase()) ||
            contact?.lastName
              ?.toLowerCase()
              .includes(manageContactFirst.toLowerCase())) &&
          contact?.mobileno
            .toLowerCase()
            .includes(manageContactMobile.toLowerCase())
      );

      const formattedData = filterData?.map((contact, index) => ({
        id: contact.addSrno,
        sn: index + 1,
        firstName: contact.firstName ?? "-",
        lastName: contact.lastName ?? "-",
        mobileno: contact.mobileno ?? "-",
        emailstatus: contact.status == 1 ? "Active" : "Inactive",
        group: contact.groupName ?? "-",
        status: contact.status == 1 ? "Active" : "Inactive",
        action: "True",
        srno: contact.addSrno,
        gender: contact.gender,
        mariageDate: contact.anniversaryDate
          ? new Date(contact.anniversaryDate)
          : null,
        ...contact,
      }));

      contactSetRows(formattedData);
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsFetching(false);
    }
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
    const res = await updateGroupName(updateGrpId.id, groupName);
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
      srNo: updateContactDetails.srno,
      groupSrNo: grpDetails.groupCode,
      firstName: updateContactDetails.firstName || "",
      middleName: updateContactDetails.middleName || "",
      lastName: updateContactDetails.lastName || "",
      mobileNo: updateContactDetails.mobileno || "",
      emailId: updateContactDetails.email || "",
      uniqueId: updateContactDetails.uniqueId || "",
      gender: updateContactDetails.gender || "",
      //
      activeStatus: updateContactDetails.status,
      // key should check
      birthDate: updateContactDetails.birthDate
        ? moment(updateContactDetails.birthDate).format("YYYY-MM-DD")
        : "1900-01-01",

      anniversaryDate: updateContactDetails.mariageDate
        ? moment(updateContactDetails.mariageDate).format("YYYY-MM-DD")
        : "1900-01-01",
      // allowishes: updatedContactDetails.allowishes || "",
      allowishes: updateContactDetails.allowishes,
    };

    const res = await updateContactsDetails(data);
    if (!res?.message.includes("successfully")) {
      return toast.error(res?.message);
    }
    await getContactListByGrpId({
      groupSrNo: selectedMultiGroup,
      status: selectedStatus,
    });
    await handleSearchGroup();
    toast.success(res?.message);
    setUpdateContactVisible(false);
  };

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
  // const handleRemoveFile = () => {
  //   setUploadedFile(null);
  //   setIsUploaded(false);
  //   // setAddCountryCode(false)
  //   // setSelectedCountryCode('');
  //   document.getElementById("fileInput").value = "";
  //   toast.success("File removed successfully.");
  // };

  const handleRemoveFile = () => {
    // Clear the selected file and upload state
    setUploadedFile(null);
    setIsUploaded(false);

    // Hide the column‐mapping form
    setImportContactFormVisible(false);

    // Optionally clear any column‐mapping selections:
    setAddContactDetails((prev) => ({
      ...prev,
      firstName: "",
      middleName: "",
      lastName: "",
      mobileNo: "",
      emailId: "",
      uniqueId: "",
      birthDate: "",
      mariageDate: "",
      allowishes: "",
      gender: "",
    }));

    // Reset the file input element
    const inputElem = document.getElementById("fileInput");
    if (inputElem) inputElem.value = "";

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
    setDeleteLoading(true)
    const res = await deleteGrp(deleteGrpId.groupName, deleteGrpId.id);
    toast.success(res.message);
    setDeleteLoading(false)
    setDeleteDialogVisible(false);
    setaddGroupVisible(false);
    await getGrpListData();
    setSelectedManageGroups(null); // reset filter
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

  // const rows = Array.isArray(grpList)
  //   ? grpList?.map((grp, index) => ({
  //       id: grp.groupCode,
  //       sn: index + 1,
  //       groupName: grp.groupName,
  //     }))
  //   : [];

  const rows = Array.isArray(grpList)
    ? grpList.map((grp, index) => ({
      id: grp.groupCode,
      sn: index + 1,
      groupName: grp.groupName,
    }))
    : [];

  const filteredRows = selectedmanageGroups?.value
    ? rows.filter((row) => row.id === selectedmanageGroups.value)
    : rows;

  const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

  async function handleContactDelete() {
    // const data = `addSrnoList=${idtoDelete.srno}`;

    try {
      const res = await deleteContact(idtoDelete.srno);

      if (!res.message.includes("successfully")) {
        return toast.error(res.message);
      }
      toast.success("Contact deleted successfully");
      setDeleteContactDialogVisible(false);
      getGrpListData();
      await getGrpList();
      await handleSearchGroup();
    } catch (e) {
      return toast.error("Something went wrong");
    }
  }

  async function handleMultipleContactDelete() {
    // const data = `addSrnoList=${idtoDelete.srno}`;
    if (selectedRows.length === 0) return;
    let data = "";

    selectedRows.map((row) => (data += `addSrnoList=${row}&`));
    setDeleteLoading(true);
    try {
      const res = await deleteMultipleContact(data);

      if (!res.message.includes("successfully")) {
        return toast.error(res.message);
      }
      toast.success("Contact deleted successfully");
      setDeleteLoading(false);
      getGrpListData();
      // setDeleteContactDialogVisible(false);
      setConfirmMultiDeleteVisible(false);
      await handleSearchGroup();
    } catch (e) {
      return toast.error("Something went wrong");
    }
  }

  function handleExport() {
    if (!rows.length) return toast.error("No data to download");
    const col = cols.map((col) => col.field);

    const row = contactRows.map((row) => col.map((field) => row[field] ?? ""));

    const name = "Contact Data";
    exportToExcel(col, row, name);
    toast.success("File Downloaded Successfully");
  }

  return (
    <div>
      <div className="flex flex-wrap items-end w-full gap-2 mb-4 md:justify-between justify-center">
        <h1 className="text-xl font-semibold text-gray-700 text-center">
          Manage Contacts
        </h1>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="w-max-content">
            <UniversalButton
              id="addgroupbtn"
              name="addgroupbtn"
              label="Manage Group"
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
            <UniversalButton
              id="importcontactbtn"
              name="importcontactbtn"
              label="Import Contact"
              onClick={() => setimportContactVisible(true)}
            />
          </div>
          <div className="w-max-content">
            <UniversalButton
              id="exportbtn"
              name="exportbtn"
              label="Export"
              onClick={handleExport}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-end w-full gap-2 mb-5">
        <div className="w-full sm:w-48">
          <AnimatedDropdown
            label="Group"
            tooltipContent="Select Group"
            placement="right"
            className="custom-multiselect"
            placeholder="Select Groups"
            optionLabel="name"
            options={grpList?.map((item) => ({
              value: item.groupCode,
              label: `${item.groupName} (${item.totalCount})`,
            }))}
            value={selectedMultiGroup}
            onChange={(e) => setSelectedMultiGroup(e)}
            filter
          />
        </div>
        <div className="w-full sm:w-48">
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
        <div className="w-full sm:w-48">
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
        <div className="w-full sm:w-48">
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
        <div className="w-max-content ">
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
            label="Delete Multiple"
            onClick={() => {
              if (selectedRows.length === 0) {
                toast.error("Please select at least one contact to delete.");
              } else if (
                selectedRows.length > 100
                // selectedRows[0].status === "Deleted"
              ) {
                toast.error(
                  "You can't delete more than 100 contacts at a time."
                );
              } else {
                setConfirmMultiDeleteVisible(true);
              }
            }}
          />
        </div>
      </div>

      <WhatsappManageContactsTable
        allContacts={filterContacts}
        updateContactData={updateContactData}
        setUpdateContactDetails={setUpdateContactDetails}
        setUpdateContactVisible={setUpdateContactVisible}
        setIdToDelete={setIdToDelete}
        setDeleteContactDialogVisible={setDeleteContactDialogVisible}
        setLocalSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
        columns={cols}
        rows={contactRows}
      />

      {/* add group start */}
      <Dialog
        header="Group"
        visible={addGroupvisible}
        draggable={false}
        className="lg:w-[40rem] md:w-[40rem] w-[20rem]"
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
                label="Group Name"
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
                <div className="flex mb-2 card justify-content-center">
                  <DropdownWithSearch
                    options={grpList?.map((item) => ({
                      value: item.groupCode,
                      label: item.groupName,
                    }))}
                    // options={[
                    //   { value: null, label: "All Groups" },
                    //   ...grpList?.map((item) => ({
                    //     value: item.groupCode,
                    //     label: item.groupName,
                    //   })),
                    // ]}
                    value={selectedmanageGroups}
                    onChange={(e) => setSelectedManageGroups(e)}
                    label="Group List"
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
                    rows={filteredRows}
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
      {/* add group end */}

      {/* add contact start */}
      <Dialog
        header="Add Contact"
        visible={addContactvisible}
        draggable={false}
        className="w-[40rem]"
        onHide={() => {
          if (!addContactvisible) return;
          setaddContactVisible(false);
          setAddContactDetails({
            firstName: "",
            middleName: "",
            lastName: "",
            mobileNo: "",
            emailId: "",
            birthDate: "",
            mariageDate: "",
            allowishes: "",
            gender: "",
            uniqueId: "",
          });
          // setSelectedMultiGroupContact(null);
        }}
      >
        <div className="space-y-4">
          <AnimatedDropdown
            className="custom-multiselect"
            placeholder="Select Groups"
            label="Select Group"
            maxSelectedLabels={0}
            optionLabel="name"
            options={grpList?.map((item) => ({
              value: item.groupCode,
              label: item.groupName,
            }))}
            value={selectedMultiGroupContact}
            onChange={(e) => setSelectedMultiGroupContact(e)}
          />

          <div className="grid flex-wrap grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 lg:flex-nowrap">
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
              className="mb-0 w-full p-2 h-5 bg-slate-800 border-white"
              value={addContactDetails.birthDate}
              onChange={(e) =>
                setAddContactDetails({
                  ...addContactDetails,
                  birthDate: e,
                })
              }
            // required={true}
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

            <div className="w-full">
              <UniversalLabel
                text="Allow wishes"
                id="addwish"
                name="addwish"
                className="mt-0 text-sm font-medium text-gray-800"
              />

              <div className="flex flex-wrap gap-2">
                {/* Enable Option */}
                <div className="flex-1 px-1 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-5 flex-wrap lg:flex-nowrap">
                    <RadioButton
                      inputId="AllowishesOption1"
                      name="Allowishesredio"
                      value="enable"
                      onChange={(e) =>
                        setAddContactDetails({
                          ...addContactDetails,
                          allowishes: e.value,
                        })
                      }
                      checked={addContactDetails.allowishes === "enable"}
                    />
                    <label
                      htmlFor="AllowishesOption1"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Enable
                    </label>
                  </div>
                </div>

                {/* Disable Option */}
                <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="AllowishesOption2"
                      name="Allowishesredio"
                      value="disable"
                      onChange={(e) =>
                        setAddContactDetails({
                          ...addContactDetails,
                          allowishes: e.value,
                        })
                      }
                      checked={addContactDetails.allowishes === "disable"}
                    />
                    <label
                      htmlFor="AllowishesOption2"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div>
            </div>
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
            <div className="w-full">
              <UniversalLabel
                text="Gender"
                id="gamderadd"
                name="gamderadd"
                className="mt-0 text-sm font-medium text-gray-800"
              />

              <div className="flex flex-wrap gap-2 ">
                {/* Enable Option */}
                <div className="flex-1 px-1 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="genderOption1"
                      name="genderredio"
                      value="m"
                      onChange={(e) =>
                        setAddContactDetails({
                          ...addContactDetails,
                          gender: e.target.value,
                        })
                      }
                      checked={addContactDetails.gender === "m"}
                    />
                    <label
                      htmlFor="genderOption1"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Male
                    </label>
                  </div>
                </div>

                {/* Disable Option */}
                <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="genderOption2"
                      name="genderredio"
                      value="f"
                      onChange={(e) =>
                        setAddContactDetails({
                          ...addContactDetails,
                          gender: e.target.value,
                        })
                      }
                      checked={addContactDetails.gender === "f"}
                    />
                    <label
                      htmlFor="genderOption2"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Female
                    </label>
                  </div>
                </div>
              </div>
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
      </Dialog>
      {/* add contact end */}

      {/* import contact */}
      <Dialog
        header="Import Contacts"
        visible={importContactvisible}
        draggable={false}
        className="lg:w-[40rem] md:w-[40rem] w-[20rem]"
        // onHide={() => {
        //   if (!importContactvisible) return;
        //   setimportContactVisible(false);
        // }}
        onHide={() => setimportContactVisible(false)}
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
          <div className="importcontacts">
            {/* Your content for Import Contacts */}
            <div className="mt-2 file-upload">
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
                <div className="flex items-center justify-center gap-2">
                  <label
                    htmlFor="fileInput"
                    className="inline-block px-3 py-2 text-sm font-medium tracking-wider text-center text-white bg-blue-400 rounded-lg cursor-pointer file-upload-button hover:bg-blue-500"
                  >
                    Choose or Drop File
                  </label>
                  <div className="upload-button-container ">
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
                <p className="file-upload-text mt-2 text-[0.8rem] text-gray-400 tracking-wide">
                  Max 3 lacs records & mobile number should be with country
                  code. <br />
                  Supported File Formats: .xlsx
                </p>
                <div className="mt-3">
                  {uploadedFile ? (
                    <div className="flex items-center justify-center gap-1 file-upload-info">
                      <p className="file-upload-feedback file-upload-feedback-success text-sm text-green-500 font-[500]">
                        {isUploaded ? "File Uploaded: " : "File Selected: "}
                        <strong>{uploadedFile.name}</strong>
                      </p>
                      <button
                        className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
                        onClick={handleRemoveFile}
                      >
                        <MdOutlineDeleteForever
                          className="text-red-500 cursor-pointer hover:text-red-600"
                          size={20}
                        />
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm font-semibold tracking-wide text-gray-500 file-upload-feedback file-upload-feedback-error">
                      No file uploaded yet!
                    </p>
                  )}
                </div>
                {importContactFormVisible && (
                  <div>
                    <div className="grid flex-wrap md:grid-cols-2 grid-cols-1 gap-3 lg:flex-nowrap">
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
                        placeholder="first name"
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
                        placeholder="middle name"
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
                        placeholder="last name"
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
                        placeholder="Phone No."
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
                        placeholder="email"
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
                        placeholder="uniqueId"
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
                        placeholder="BirthDate"
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
                        placeholder="Anniversary Date"
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
                        placeholder="AllowWishes"
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
                        placeholder="Gender"
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
                id="ImportConcat"
                name="ImportConcat"
                label="Submit"
                variant="primary"
                onClick={handleImportContact}
              />
            </div>
          </div>
        </div>
      </Dialog>

      {/* delete group start*/}
      <Dialog
        header="Confirm Deletion"
        visible={deleteDialogVisible}
        onHide={() => setDeleteDialogVisible(false)}
        className="w-[30rem]"
        draggable={false}
      >
        <div className="flex items-center justify-center">
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
          <p className="text-[1.1rem] font-semibold text-gray-700">
            Are you sure you want to delete the group <br />
            <span className="text-green-500">"{deleteGrpId?.groupName}"</span>
          </p>
          <p className="mt-2 text-sm text-gray-500">
            This action is irreversible.
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-2">
          {!deleteLoading && <UniversalButton
            label="Cancel"
            style={{
              backgroundColor: "#090909",
            }}
            onClick={() => setDeleteDialogVisible(false)}
          />}

          <UniversalButton
            label={deleteLoading ? "Deleting" : "Delete"}
            style={
              {
                // backgroundColor: "red",
              }
            }
            disabled={deleteLoading}
            onClick={handleGrpDelete}
          />
        </div>
      </Dialog>
      {/* delete group end */}

      {/* edit group start*/}
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
        <div className="flex gap-1.5 flex-col">
          <InputField
            label="New Group Name"
            id="name"
            name="name"
            type="text"
            tooltipContent="New Group Name"
            placeholder="Enter Group Name"
            value={groupName}
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
          />
          <div className="w-max-content flex items-center justify-center mt-4">
            <UniversalButton
              id="addgroupbtn"
              name="addgroupbtn"
              label="Update"
              className="mt-2"
              onClick={handleUpdateGrpName}
            />
          </div>
        </div>
      </Dialog>
      {/* edit group end*/}

      {/* edit contact details start */}
      <Dialog
        header="Edit Contact Details"
        visible={updateContactVisible}
        onHide={() => setUpdateContactVisible(false)}
        className="w-[40rem]"
        draggable={false}
      >
        <div>
          <div className="space-y-5">
            <div className="flex items-center gap-5 flex-wrap lg:flex-nowrap">
              <InputField
                placeholder="Enter first name.."
                id="userfirstname"
                name="userfirstname"
                type="text"
                value={updateContactDetails.firstName}
                onChange={(e) =>
                  setUpdateContactDetails({
                    ...updateContactDetails,
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
            </div>
            <div className="flex items-center gap-5 flex-wrap lg:flex-nowrap">
              <InputField
                placeholder="Enter last name.."
                id="userlastname"
                name="userlastname"
                type="text"
                value={updateContactDetails.lastName}
                onChange={(e) =>
                  setUpdateContactDetails({
                    ...updateContactDetails,
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
                value={updateContactDetails?.mobileno?.replace(/^\+/, "")}
                onChange={(e) =>
                  setUpdateContactDetails({
                    ...updateContactDetails,
                    mobileno: e.target.value,
                  })
                }
                required={true}
              />
            </div>

            <div className="flex items-center gap-5 flex-wrap lg:flex-nowrap">
              <InputField
                placeholder="Enter email id.."
                id="emailid"
                name="emailid"
                type="email"
                value={updateContactDetails.email}
                onChange={(e) =>
                  setUpdateContactDetails({
                    ...updateContactDetails,
                    email: e.target.value,
                  })
                }
                required={true}
              />
              <InputField
                placeholder="Enter unique id.."
                id="uniqueid"
                name="uniqueid"
                type="text"
                value={updateContactDetails.uniqueId}
                onChange={(e) =>
                  setUpdateContactDetails({
                    ...updateContactDetails,
                    uniqueId: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex items-center gap-5 flex-wrap lg:flex-nowrap">
              <UniversalDatePicker
                label="Birth Date"
                className="mb-0"
                value={updateContactDetails.birthDate}
                onChange={(date) =>
                  setUpdateContactDetails({
                    ...updateContactDetails,
                    birthDate: date,
                  })
                }
              />
              <UniversalDatePicker
                label="Anniversary Date"
                className="mb-0"
                value={updateContactDetails.mariageDate}
                onChange={(date) =>
                  setUpdateContactDetails({
                    ...updateContactDetails,
                    mariageDate: date,
                  })
                }
              />
            </div>
            <div className="flex items-center gap-5 flex-wrap lg:flex-nowrap">
              {/* <RadioGroupField
                label={"Allowishes?"}
                name="addwish"
                id="addwish"
                options={[
                  {
                    value: 1,
                    label: "Yes",
                  },
                  {
                    value: 0,
                    label: "No",
                  },
                ]}
                value={updateContactDetails?.allowishes}
                onChange={(e) =>
                  setUpdateContactDetails({
                    ...updateContactDetails,
                    allowishes: e.target.value,
                  })
                }
                required={true}
              /> */}

              <div className="w-full">
                <UniversalLabel
                  text="Allow wishes"
                  id="addwish"
                  name="addwish"
                  className="mt-0 text-sm font-medium text-gray-800"
                />

                <div className="flex flex-wrap gap-2">
                  {/* Enable Option */}
                  <div className="flex-1 px-1 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                    <div className="flex items-center gap-5 flex-wrap lg:flex-nowrap">
                      <RadioButton
                        inputId="AllowishesOption1"
                        name="addwish"
                        value="1"
                        onChange={(e) =>
                          setUpdateContactDetails({
                            ...updateContactDetails,
                            allowishes: e.value,
                          })
                        }
                        checked={
                          String(updateContactDetails.allowishes) === "1"
                        }
                      />
                      <label
                        htmlFor="AllowishesOption1"
                        className="text-sm font-medium text-gray-700 cursor-pointer"
                      >
                        Enable
                      </label>
                    </div>
                  </div>

                  {/* Disable Option */}
                  <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                    <div className="flex items-center gap-2">
                      <RadioButton
                        inputId="AllowishesOption2"
                        name="addwish"
                        value="0"
                        onChange={(e) =>
                          setUpdateContactDetails({
                            ...updateContactDetails,
                            allowishes: e.value,
                          })
                        }
                        checked={
                          String(updateContactDetails.allowishes) === "0"
                        }
                      />
                      <label
                        htmlFor="AllowishesOption2"
                        className="text-sm font-medium text-gray-700 cursor-pointer"
                      >
                        Disable
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* <RadioGroupField
                label={"Gender?"}
                name="gamderadd"
                id="addgamderaddImportContact"
                options={[
                  { value: "m", label: "Male" },
                  { value: "f", label: "Female" },
                ]}
                value={updateContactDetails.gender}
                onChange={(e) =>
                  setUpdateContactDetails({
                    ...updateContactDetails,
                    gender: e.target.value,
                  })
                }
                required={true}
              /> */}

              <div className="w-full">
                <UniversalLabel
                  text="Gender"
                  id="gamderadd"
                  name="gamderadd"
                  className="mt-0 text-sm font-medium text-gray-800"
                />

                <div className="flex flex-wrap gap-2">
                  {/* Enable Option */}
                  <div className="flex-1 px-1 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                    <div className="flex items-center gap-2">
                      <RadioButton
                        inputId="genderOption1"
                        name="gamderadd"
                        value="m"
                        onChange={(e) =>
                          setUpdateContactDetails({
                            ...updateContactDetails,
                            gender: e.target.value,
                          })
                        }
                        checked={updateContactDetails.gender === "m"}
                      />
                      <label
                        htmlFor="genderOption1"
                        className="text-sm font-medium text-gray-700 cursor-pointer"
                      >
                        Male
                      </label>
                    </div>
                  </div>

                  {/* Disable Option */}
                  <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                    <div className="flex items-center gap-2">
                      <RadioButton
                        inputId="genderOption2"
                        name="gamderadd"
                        value="f"
                        onChange={(e) =>
                          setUpdateContactDetails({
                            ...updateContactDetails,
                            gender: e.target.value,
                          })
                        }
                        checked={updateContactDetails.gender === "f"}
                      />
                      <label
                        htmlFor="genderOption2"
                        className="text-sm font-medium text-gray-700 cursor-pointer"
                      >
                        Female
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="flex items-center justify-center ">
              <RadioGroupField
                label={"Active Status"}
                name="activeStatus"
                id="activeStatus"
                options={[
                  { value: 1, label: "Active" },
                  { value: 0, label: "Inactive" },
                ]}
                value={updateContactDetails.status}
                onChange={(e) =>
                  setUpdateContactDetails({
                    ...updateContactDetails,
                    status: Number(e.target.value),
                  })
                }
                required={true}
              />
            </div> */}
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
      {/* edit contact details end */}

      {/* delete single contact start */}
      <Dialog
        header="Confirm Deletion"
        visible={deleteContactDialogVisible}
        onHide={() => {
          setDeleteContactDialogVisible(false);
          setIdToDelete(null);
        }}
        className="w-[30rem]"
        draggable={false}
      >
        <div className="flex items-center justify-center">
          <CancelOutlinedIcon
            sx={{
              fontSize: 64,
              color: "#ff3f3f",
            }}
          />
        </div>
        <div className="p-4 text-center">
          <p className="text-[1.1rem] text-gray-700 font-semibold">
            Are you sure you want to delete the Contact <br />
            <span className="text-green-500">"{idtoDelete?.firstName}"</span>
          </p>
          <p className="mt-2 text-sm text-gray-500">
            This action is irreversible.
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-2">
          <UniversalButton
            label="Cancel"
            style={{
              backgroundColor: "#090909",
            }}
            onClick={() => setDeleteContactDialogVisible(false)}
          />
          <UniversalButton label="Delete" onClick={handleContactDelete} />
        </div>
      </Dialog>
      {/* delete single contact end */}

      {/* delete multiple contact end */}
      <Dialog
        header="Confirm Multi Deletion"
        visible={confirmMultiDeleteVisible}
        onHide={() => {
          setConfirmMultiDeleteVisible(false);
          // setIdToDelete(null);
        }}
        className="w-[30rem]"
        draggable={false}
      >
        <div className="flex items-center justify-center">
          <CancelOutlinedIcon
            sx={{
              fontSize: 64,
              color: "#ff3f3f",
            }}
          />
        </div>
        <div className="p-4 text-center">
          <p className="text-[1.1rem] text-gray-700 font-semibold">
            Are you sure you want to delete the selected &nbsp;
            <span className="font-bold text-red-500">
              {selectedRows.length} contacts
            </span>
            {currentGroup ? (
              <>
                {" "}
                from group{" "}
                <span className="text-green-500">{groupNameDelete}</span>?
              </>
            ) : (
              "?"
            )}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            This action is irreversible.
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-2">
          {!deleteLoading && (
            <UniversalButton
              label="Cancel"
              style={{
                backgroundColor: "#090909",
              }}
              onClick={() => setConfirmMultiDeleteVisible(false)}
            />
          )}

          <UniversalButton
            label={deleteLoading ? "Deleting" : "Delete"}
            onClick={handleMultipleContactDelete}
            disabled={deleteLoading}
          />
        </div>
      </Dialog>
      {/* delete multiple contact end */}
    </div>
  );
};

export default ManageContacts;
