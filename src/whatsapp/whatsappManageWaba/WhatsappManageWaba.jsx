import React, { useState, useEffect, useRef } from "react";
import { Paper, Typography, Box, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";

import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";

import {
  DataGrid,
  GridFooterContainer,
  GridPagination,
} from "@mui/x-data-grid";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import { Dialog } from "primereact/dialog";
import { MdOutlineDeleteForever } from "react-icons/md";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import toast from "react-hot-toast";

import UniversalButton from "../components/UniversalButton";
import UniversalLabel from "../components/UniversalLabel";
import InputField from "../../components/layout/InputField";
// import AnimatedDropdown from '../components/AnimatedDropdown';
import CustomTooltip from "../components/CustomTooltip";
import AnimatedDropdown from "../components/AnimatedDropdown";
import {
  getWabaList,
  getwabadetails,
  updateWabaDetails,
  refreshWhatsApp,
} from "../../apis/whatsapp/whatsapp";
import Loader from "../components/Loader";

import logo from "../../assets/images/celitix-cpaas-solution-logo.svg";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const MIN_DIMENSION = 192; // Minimum 192px width/height
const RECOMMENDED_DIMENSION = 640; // Recommended 640px width/height

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

const WhatsappManageWaba = ({ id, name }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [view, setView] = useState(false);
  const [wabaedit, setWabaEdit] = useState(false);
  const [description, setDescription] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [vertical, setVertical] = useState("");
  const [websites, setWebsites] = useState([""]);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [wabaList, setWabaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWaba, setSelectedWaba] = useState(null);

  const [wabaCreatebtn, setWabaCreatebtn] = useState(false);

  const [wabadetails, setwabadetails] = useState(null);
  const [editWebsite1, seteditWebsite1] = useState("");
  const [editWebsite2, seteditWebsite2] = useState("");

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const fileInputRef = useRef(null);

  // Function to check image dimensions
  const validateImageDimensions = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const objectURL = URL.createObjectURL(file);

      img.onload = () => {
        if (img.width < MIN_DIMENSION || img.height < MIN_DIMENSION) {
          toast.error(
            `Image too small. Minimum size required: ${MIN_DIMENSION}px x ${MIN_DIMENSION}px.`
          );
          resolve(false);
        } else {
          resolve(true);
        }
        URL.revokeObjectURL(objectURL);
      };

      img.onerror = () => {
        toast.error("Invalid image file.");
        resolve(false);
        URL.revokeObjectURL(objectURL);
      };

      img.src = objectURL;
    });
  };

  // Function to handle file selection and preview
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error(
        "File size exceeds 5MB limit. Please upload a smaller image."
      );
      return;
    }

    const isValidDimensions = await validateImageDimensions(selectedFile);
    if (!isValidDimensions) return;

    if (preview) URL.revokeObjectURL(preview);

    const imageUrl = URL.createObjectURL(selectedFile);
    setPreview(imageUrl);
    setFile(selectedFile);
    toast.success("Image uploaded successfully.");
  };

  useEffect(() => {
    const loadFacebookSDK = () => {
      if (window.FB) {
        console.log("Facebook SDK already loaded.");
        setIsSdkLoaded(true);
        return;
      }

      window.fbAsyncInit = function () {
        console.log("Initializing Facebook SDK...");

        FB.init({
          appId: "YOUR_APP_ID", // Replace with your App ID
          autoLogAppEvents: true,
          xfbml: true,
          version: "v20.0",
        });

        console.log("Facebook SDK initialized.");
        setIsSdkLoaded(true);
      };

      const scriptId = "facebook-jssdk";
      if (!document.getElementById(scriptId)) {
        const js = document.createElement("script");
        js.id = scriptId;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        js.async = true;
        js.defer = true;
        js.onload = () => {
          console.log("Facebook SDK script loaded.");
          if (window.fbAsyncInit) {
            window.fbAsyncInit();
          }
        };
        document.body.appendChild(js);
      }
    };

    loadFacebookSDK();
  }, []);

  const handleFacebookLogin = () => {
    if (!isSdkLoaded || typeof window.FB === "undefined") {
      console.error("Facebook SDK not loaded yet.");
      return;
    }

    window.FB.getLoginStatus((response) => {
      console.log("FB Login Status:", response);
      if (response.status === "unknown") {
        console.warn(
          "FB.init() might not have completed. Retrying login in 2s..."
        );
        // setTimeout(() => {
        //   handleFacebookLogin();
        // }, 2000);
        return;
      }
      if (response.status !== "connected") {
        window.FB.login(
          function (response) {
            if (response.authResponse) {
              console.log("Access Token:", response.authResponse.accessToken);
              setIsLoggedIn(true);
            } else {
              console.log("User cancelled login or did not fully authorize.");
            }
          },
          { scope: "public_profile,email", return_scopes: true }
        );
      } else {
        console.log("Already logged in:", response);
        setIsLoggedIn(true);
      }
    });
  };

  // const handleFacebookLogin = () => {
  //   console.log("Login with Facebook clicked");
  //   setIsLoggedIn(true);
  // };

  const handleSelectFile = () => {
    fileInputRef.current.value = "";
    fileInputRef.current.click();
  };

  const handleDeleteImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFile(null);
    fileInputRef.current.value = "";
    toast.success("Image removed successfully.");
  };

  // const handleView = (waba) => {
  //   setSelectedWaba(waba);
  //   setView(true);
  // };

  const handleView = async (waba) => {
    setSelectedWaba(waba);
    const details = await getwabadetails(waba.wabaNumber);
    setwabadetails(details.data[0]);
    setView(true);
  };

  // const handleEdit = () => {
  //   setWabaEdit(true);
  // };

  // const handleEdit = async (row) => {
  //   setWabaEdit(true);
  //   setSelectedWaba(row);
  // };

  const handleEdit = async (row) => {
    setWabaEdit(true);
    setSelectedWaba(row);
    const details = await getwabadetails(row.wabaNumber);
    const wabaDetails = details.data[0];
    setAbout(wabaDetails.about);
    setDescription(wabaDetails.description);
    setAddress(wabaDetails.address);
    setEmail(wabaDetails.email);
    setVertical(wabaDetails.vertical);
    seteditWebsite1(wabaDetails.websites[0] || "");
    seteditWebsite2(wabaDetails.websites[1] || "");
    setPreview(wabaDetails.profile_picture_url || null);
  };

  const handleWabaCreate = (e) => {
    setWabaCreatebtn(true);
  };

  const handleSync = async (data) => {
    if (!data.wabaSrno) return toast.error("Please select a WABA");
    try {
      const res = await refreshWhatsApp(data?.wabaSrno);
      if (res.status) {
        toast.success("Refreshed Successfully");
      } else {
        toast.error("Error Refreshing Data");
      }
    } catch (e) {
      console.log(e);
      toast.error("Error Refreshing Data");
    }
  };

  const handleRowSelection = (ids) => {
    setSelectedRows(ids);
  };

  const updateDetails = async () => {
    const website = [editWebsite1, editWebsite2];

    const data = {
      messaging_product: "whatsapp",
      about: about,
      description: description,
      email: email,
      profilePic: null,
      address: address,
      websites: website,
      vertical: vertical,
    };

    const updateData = await updateWabaDetails(data, selectedWaba.wabaNumber);
  };

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "wabaName", headerName: "WABA Name", flex: 1, minWidth: 120 },
    {
      field: "wabaNumber",
      headerName: "WABA Mobile No.",
      flex: 1,
      minWidth: 120,
    },
    { field: "createdOn", headerName: "Created On", flex: 1, minWidth: 120 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
    {
      field: "messaging_limit",
      headerName: "Messaging Limit",
      flex: 1,
      minWidth: 120,
    },
    { field: "quality", headerName: "Quality", flex: 1, minWidth: 120 },
    { field: "expiryDate", headerName: "Expiry Date", flex: 1, minWidth: 120 },
    {
      field: "wabaAccountId",
      headerName: "WABA Account ID",
      flex: 1,
      minWidth: 120,
    },
    { field: "health", headerName: "Health", flex: 1, minWidth: 120 },
    {
      field: "phoneNumberId",
      headerName: "Phone Number ID",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <>
          <CustomTooltip title="View Profile" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => handleView(params.row)}
            >
              <VisibilityIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "green",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Sync Status" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => handleSync(params.row)}
            >
              <SyncOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "green",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Edit Profile" placement="top" arrow>
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          {/* <CustomTooltip
            title="Delete WABA"
            placement="top"
            arrow
          >
            <IconButton className='no-xs' onClick={() => handleDelete(params.row)}>
              <MdOutlineDeleteForever
                className="text-red-500 cursor-pointer hover:text-red-600"
                size={20}
              />
            </IconButton>
          </CustomTooltip> */}
        </>
      ),
    },
  ];

  // WABA LIST
  useEffect(() => {
    const fetchWabaList = async () => {
      try {
        setIsLoading(true);
        const response = await getWabaList();
        setWabaList(response?.length > 0 ? response : []);
      } catch (error) {
        console.error("Error fetching WABA list:", error);
        toast.error("Error fetching WABA list.");
        setWabaList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWabaList();
  }, []);

  // Map API Data to DataGrid Rows
  const rows = wabaList.map((waba, index) => ({
    id: index + 1,
    // id: waba.wabaSrno,
    sn: index + 1,
    wabaName: waba.name || "N/A",
    wabaNumber: waba.mobileNo || "N/A",
    createdOn: waba.insertTime || "N/A",
    expiryDate: waba.expiryDate || "N/A",
    status: waba.status || "N/A",
    wabaAccountId: waba.wabaAccountId || "N/A",
    phoneNumberId: waba.phoneNumberId || "N/A",
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

  const website =
    wabadetails?.websites?.length > 0
      ? wabadetails.websites[0].replace("https://www.", "").replace(/\/$/, "")
      : "";
  const phoneNumber = selectedWaba?.wabaNumber || "";
  const whatsappLinkPreview = `wa.${website}/${phoneNumber}`;

  return (
    <div className="">
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : rows.length > 0 ? (
        <>
          <div className="flex flex-wrap items-center justify-between w-full gap-4 mb-4">
            <div>
              <label className="text-xl font-semibold text-green-500">
                Manage Waba Accounts{" "}
              </label>
            </div>
            <div className="p-2 text-3xl font-semibold text-green-500 border rounded-2xl">
              <FaWhatsapp />
            </div>
            <div className="w-max-content">
              <UniversalButton
                label="Create WABA"
                id="mainwabacreate"
                name="mainwabacreate"
                onClick={handleWabaCreate}
              />
            </div>
          </div>
          <div style={{ transition: "filter 0.3s ease" }}>
            <Paper sx={{ height: 558 }} id={id} name={name}>
              <DataGrid
                id={id}
                name={name}
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[10, 20, 50]}
                pagination
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                // checkboxSelection
                rowHeight={45}
                slots={{ footer: CustomFooter }}
                slotProps={{ footer: { totalRecords: rows.length } }}
                onRowSelectionModelChange={(ids) => handleRowSelection(ids)}
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
        </>
      ) : (
        <div className="flex h-[80vh] justify-center w-full items-center">
          <div className="p-10 space-y-3 text-center bg-white shadow-md rounded-xl">
            <h1 className="text-xl font-semibold">No account connected yet!</h1>
            <p className="mb-6 font-medium">
              Login with Facebook to start launching campaigns and analyse phone
              number quality.
            </p>
            <a
              href="#signup"
              className="bg-[#4267b2] p-2.5 rounded-lg text-[1.1rem] text-white cursor-pointer font-medium tracking-wide"
              onClick={handleFacebookLogin}
            >
              Login with Facebook
            </a>
          </div>
        </div>
      )}

      {/* Waba Profile */}
      <Dialog
        visible={view}
        onHide={() => setView(false)}
        className="p-0 w-[34rem] max-w-full"
        modal
        draggable={false}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden border border-gray-200 shadow-xl bg-gradient-to-b rounded-2xl from-white to-gray-50"
        >
          {/* <div className="absolute inset-0 opacity-100">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1440 1720"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="whatsappPattern"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="5"
                    fill="rgba(37, 211, 102, 0.15)"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r="5"
                    fill="rgba(37, 211, 102, 0.15)"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#whatsappPattern)" />
            </svg>
          </div> */}

          <div className="flex flex-col items-center p-6 text-white bg-gradient-to-r rounded-t-2xl from-purple-400 to-blue-300">
            <motion.img
              src={wabadetails?.profile_picture_url || logo}
              alt="Profile"
              className="w-24 h-24 border-4 border-white rounded-full shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <h1 className="mt-3 text-2xl font-semibold">
              {selectedWaba?.wabaName || "WhatsApp Profile"}
            </h1>
            <p className="text-sm opacity-90">
              {wabadetails?.about || "Business WhatsApp Profile"}
            </p>
          </div>

          <div className="relative z-10 p-6">
            <div className="flex flex-col items-center gap-2">
              <p className="flex items-center gap-2 text-lg font-medium text-gray-900">
                <FaWhatsapp className="text-[#25D366] text-lg" />{" "}
                {selectedWaba?.wabaNumber || "N/A"}
              </p>
              <a
                href={`https://wa.me/${selectedWaba?.wabaNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] text-sm hover:underline"
              >
                {whatsappLinkPreview}
              </a>
            </div>

            <motion.div
              className="p-4 mt-5 overflow-y-auto text-sm leading-relaxed text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-semibold text-gray-900">Description</p>
              <p>
                {wabadetails?.description || "Hey there, I'm using WhatsApp."}
              </p>
            </motion.div>

            {wabadetails?.email && (
              <div className="flex items-center gap-3 mt-6 text-gray-800">
                <FaEnvelope className="text-lg text-gray-600" />
                <a
                  href={`mailto:${wabadetails.email}`}
                  className="text-sm text-gray-600 hover:underline"
                >
                  {wabadetails.email}
                </a>
              </div>
            )}
            {wabadetails?.address && (
              <div className="flex items-center gap-3 mt-4 text-gray-800">
                <FaMapMarkerAlt className="text-lg text-blue-500" />
                <p className="text-sm">{wabadetails.address || "N/A"}</p>
              </div>
            )}
            {wabadetails?.websites?.length > 0 && (
              <div className="mt-6">
                <p className="mb-2 text-sm font-semibold text-gray-900">
                  Websites
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {wabadetails.websites.map((website, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FaGlobe className="text-[#128C7E] text-lg" />
                      <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-sm text-gray-800 truncate hover:underline"
                      >
                        {website.replace("https://", "")}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </Dialog>

      {/* Update waba profile */}
      <Dialog
        header="Business Profile"
        visible={wabaedit}
        onHide={() => {
          setWabaEdit(false);
        }}
        draggable={false}
        className="w-[50rem]"
        modal
      >
        <div className="p-2 space-y-4">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center lg:items-start">
            <UniversalLabel
              text="Profile Picture"
              tooltipContent="Max size of 5MB allowed. Image size of 640x640 is recommended. Images with a height or width of less than 192px may cause issues."
              tooltipPlacement="top"
              className="font-semibold tracking-wide text-gray-700"
              id="profilepicture"
              name="profilepicture"
            />

            <div className="flex items-center mt-2 space-x-4">
              {/* Image Preview */}
              {preview ? (
                <img
                  src={preview}
                  alt="Company Logo"
                  className="object-cover w-20 h-20 p-1 shadow-md rounded-xl"
                />
              ) : (
                <div className="flex items-center justify-center w-20 h-20 p-1 bg-gray-200 shadow-md rounded-xl">
                  <span className="text-sm text-gray-500">No Image</span>
                </div>
              )}

              <div className="flex space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
                <CustomTooltip title="Upload image" placement="top" arrow>
                  <button
                    onClick={handleSelectFile}
                    className={`px-2 py-1.5 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer`}
                  >
                    <FileUploadOutlinedIcon
                      sx={{ color: "white", fontSize: "23px" }}
                    />
                  </button>
                </CustomTooltip>

                {preview && (
                  <CustomTooltip title="remove image" placement="top" arrow>
                    <button
                      onClick={handleDeleteImage}
                      className="p-2 rounded-full cursor-pointer focus:outline-none hover:bg-gray-200"
                    >
                      <MdOutlineDeleteForever
                        className="text-red-500 cursor-pointer hover:text-red-600"
                        size={20}
                      />
                    </button>
                  </CustomTooltip>
                )}
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div>
            <InputField
              label="About"
              id="about"
              name="about"
              tooltipContent="About Your Business. Maximum of 139 characters."
              tooltipPlacement="top"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full"
              placeholder="About Your Business"
              labelStyle={{ fontWeight: "bold" }}
              readOnly={false}
              maxLength="139"
            />
          </div>
          <div className="grid gap-4 lg:grid-cols-2 md:grid-cols-2">
            <div>
              <InputField
                label="Description"
                id="description"
                name="description"
                tooltipContent="Description of the business. Maximum of 256 characters."
                tooltipPlacement="top"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full"
                placeholder="Enter business description"
                labelStyle={{ fontWeight: "bold" }}
                readOnly={false}
                maxLength="256"
              />
            </div>
            <div>
              <InputField
                id="address"
                name="address"
                label="Address"
                tooltipContent="Address of the business. Maximum of 256 characters."
                tooltipPlacement="top"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full"
                placeholder="Enter business address"
                labelStyle={{ fontWeight: "bold" }}
                readOnly={false}
              />
            </div>
            <div>
              <InputField
                id="email"
                name="email"
                label="Email"
                tooltipContent=" Email address (in valid email format) to contact the business. Maximum of 128 characters."
                tooltipPlacement="top"
                value={email}
                className="w-full"
                onChange={(e) => setEmail(e.target.value)}
                labelStyle={{ fontWeight: "bold" }}
                placeholder="Enter email address"
                readOnly={false}
              />
            </div>
            <div>
              <AnimatedDropdown
                id="vertical"
                name="vertical"
                label="Vertical"
                tooltipContent="Industry of the business.Maximum of 256 characters."
                tooltipPlacement="top"
                value={vertical}
                options={[
                  { label: "Professional Services", value: "PROF_SERVICES" },
                  // { label: "Technology", value: "TECH" },
                  // { label: "E-commerce", value: "ECOMMERCE" },
                  { label: "Automotive", value: "AUTO" },
                  { label: "Beauty & Wellness", value: "BEAUTY" },
                  { label: "Apparel & Fashion", value: "APPAREL" },
                  { label: "Education", value: "EDU" },
                  { label: "Entertainment", value: "ENTERTAIN" },
                  { label: "Event Planning", value: "EVENT_PLAN" },
                  { label: "Financial Services", value: "FINANCE" },
                  { label: "Grocery", value: "GROCERY" },
                  { label: "Government", value: "GOVT" },
                  { label: "Hospitality", value: "HOTEL" },
                  { label: "Healthcare", value: "HEALTH" },
                  { label: "Nonprofit", value: "NONPROFIT" },
                  { label: "Retail", value: "RETAIL" },
                  { label: "Travel & Tourism", value: "TRAVEL" },
                  { label: "Restaurant", value: "RESTAURANT" },
                  { label: "Not a Business", value: "NOT_A_BIZ" },
                  { label: "Other", value: "OTHER" },
                  { label: "Undefined", value: "UNDEFINED" },
                ]}
                onChange={(value) => setVertical(value)}
                className="w-full"
                placeholder="Select vertical"
              />
            </div>
            <div>
              <InputField
                id="website1"
                name="website1"
                label="Websites"
                tooltipContent="URLs (including http:// or https://) associated with the business (e.g., website, Facebook Page, Instagram). Maximum of 2 websites with a maximum of 256 characters each."
                tooltipPlacement="top"
                className="w-full"
                placeholder="Enter URL Address"
                labelStyle={{ fontWeight: "bold" }}
                readOnly={false}
                value={editWebsite1}
                onChange={(e) => seteditWebsite1(e.target.value)}
              />
            </div>
            <div className="flex items-end space-x-2">
              <InputField
                id="website2"
                name="website2"
                className="w-full"
                placeholder="Enter URL Address"
                readOnly={false}
                value={editWebsite2}
                onChange={(e) => seteditWebsite2(e.target.value)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mt-4 space-x-3">
            <UniversalButton
              id="editsave"
              name="editsave"
              label="Save"
              onClick={() => {
                setWabaEdit(false);
                updateDetails();
                toast.success("Profile updated Successfully");
              }}
            />
            <UniversalButton
              id="editcancel"
              name="editcancel"
              label="Cancel"
              onClick={() => {
                setWabaEdit(false);
                toast.error("No changes.");
              }}
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        header="Create Waba"
        visible={wabaCreatebtn}
        onHide={() => {
          setWabaCreatebtn(false);
        }}
        draggable={false}
        className="w-[50rem]"
        modal
      >
        <div className="p-10 space-y-3 text-center bg-white shadow-md rounded-xl">
          <h1 className="text-xl font-semibold">Add Another Account</h1>
          <p className="mb-6 font-medium">
            To add another WABA account, link the new account through Facebook.
          </p>
          <a
            href="#signup"
            className="bg-[#4267b2] p-2.5 rounded-lg text-[1.1rem] text-white cursor-pointer font-medium tracking-wide"
            onClick={handleFacebookLogin}
          >
            Login with Facebook
          </a>
        </div>
      </Dialog>
    </div>
  );
};

export default WhatsappManageWaba;
