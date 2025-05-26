import React, { useState, useEffect, useRef } from "react";
import { Paper, Typography, Box, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

import { AnimatePresence, motion } from "framer-motion";
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
import { ImInfo } from "react-icons/im";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import toast from "react-hot-toast";
import DropdownMenuPortal from "../../utils/DropdownMenuPortal.jsx";
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
  uploadImageFile,
} from "../../apis/whatsapp/whatsapp";
import Loader from "../components/Loader";

import logo from "../../assets/images/celitix-cpaas-solution-logo.svg";
import { Position } from "@xyflow/react";
import InfoPopover from "@/components/common/InfoPopover.jsx";
import { StatusHoverCard } from "./components/StatusHoverCard.jsx";

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
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [wabaCreatebtn, setWabaCreatebtn] = useState(false);
  const [clicked, setClicked] = useState([]);
  const [wabadetails, setwabadetails] = useState(null);
  const [editWebsite1, seteditWebsite1] = useState("");
  const [editWebsite2, seteditWebsite2] = useState("");
  const dropdownButtonRefs = useRef({});
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
    const res = await uploadImageFile(selectedFile, 1);
    setFile(res?.handlerid || null);
    toast.success("Image uploaded successfully.");
  };


  useEffect(() => {
    const loadFacebookSDK = () => {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "819027950096451",
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v20.0',
        });
      };

      // Load the SDK script
      if (!document.getElementById('facebook-jssdk')) {
        const script = document.createElement('script');
        script.id = 'facebook-jssdk';
        // script.src = 'https://connect.facebook.net/en_US/sdk.js';
        script.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';
        document.body.appendChild(script);
      }
    };

    loadFacebookSDK();
  }, []);


  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // const API_BASE_URL = "/api";

  async function onboardUser(accessToken) {
    const res = await fetch(`${API_BASE_URL}/whatsapp/wabaOnboardProcess?code=${accessToken}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
      }
    });

    const data = await res.json();
    console.log(data)
    if (!data.ok) {
      toast.error(data.message || "Something went wrong")
    }
    toast.success(data.message || "Something went wrong")
    // return data;
  }

  const handleFacebookLogin = () => {
    window.FB.login(
      (response) => {
        console.log(response)
        if (response.authResponse) {
          const accessToken = response.authResponse.code;
          console.log('Access Token:', accessToken);
          onboardUser(accessToken)
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      },
      {
        config_id: "827520649332611",
        response_type: 'code',
        override_default_response_type: true,
        extras: {
          feature: 'whatsapp_embedded_signup',
          version: 2,
          setup: {
            solutionID: "597385276367677",
          },
        },
      }
    );
  };

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


  const handleView = async (waba) => {
    setSelectedWaba(waba);
    const details = await getwabadetails(waba.wabaNumber);
    console.log(details)
    setwabadetails(details.data[0]);
    setView(true);
  };

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
      toast.error("Error Refreshing Data");
    }
  };

  const handleRowSelection = (ids) => {
    setSelectedRows(ids);
  };

  const handleInfo = (row) => {
    const id = row.id;
    setDropdownOpenId((prevId) => (prevId === id ? null : id));
    setClicked(row.additionalInfo || []);
  };

  const closeDropdown = () => setDropdownOpenId(null);

  const updateDetails = async () => {
    const website = [editWebsite1, editWebsite2];

    const data = {
      messaging_product: "whatsapp",
      about: about,
      description: description,
      email: email,
      profile_picture_handle: file,
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
    // { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        const status = params.value || "UNKNOWN";
        const statusMap = {
          CONNECTED: { color: "bg-green-500", text: "Connected" },
          FLAGGED: { color: "bg-orange-500", text: "Flagged" },
          RESTRICTED: { color: "bg-red-500", text: "Restricted" },
          BANNED: { color: "bg-red-700", text: "Banned" },
          UNKNOWN: { color: "bg-gray-400", text: "Unknown" },
        };
        const { color, text } = statusMap[status] || statusMap.UNKNOWN;

        const [showHover, setShowHover] = useState(false);
        return (
          // <span
          //   className={`px-4 py-1.5 rounded-full text-white text-xs tracking-wider font-semibold ${color}`}
          //   style={{ minWidth: 90, display: "inline-block", textAlign: "center" }}
          // >
          //   {text}
          // </span>
          <>
            <div
              // className="relative"
              onMouseEnter={() => setShowHover(true)}
              onMouseLeave={() => setShowHover(false)}
            >
              <span
                className={`px-4 py-1.5 rounded-full text-white text-xs tracking-wider font-semibold ${color}`}
                style={{ minWidth: 90, display: "inline-block", textAlign: "center" }}
              >
                {text}
              </span>

              <AnimatePresence>
                {showHover && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-0">
                    <StatusHoverCard status={status} />
                  </div>
                )}
              </AnimatePresence>
            </div>
          </>
        );
      },
    },
    // {
    //   field: "messaging_limit",
    //   headerName: "Messaging Limit",
    //   flex: 1,
    //   minWidth: 120,
    // },
    // { field: "quality", headerName: "Quality", flex: 1, minWidth: 120 },
    {
      field: "quality",
      headerName: "Quality",
      flex: 0,
      minWidth: 130,
      renderCell: (params) => {
        const quality = params.value || "UNKNOWN";
        const qualityMap = {
          GREEN: { color: "bg-green-500", text: "High" },
          YELLOW: { color: "bg-yellow-400", text: "Medium" },
          RED: { color: "bg-red-500", text: "Low" },
          UNKNOWN: { color: "bg-gray-400", text: "Unknown" },
        };

        const { color, text } = qualityMap[quality] || qualityMap.UNKNOWN;

        return (
          // <CustomTooltip title={text} placement="top" arrow>
          <div className="flex items-center gap-2 py-3">
            <span className={`inline-block w-4 h-4 rounded-full ${color}`} />
            <span className="text-sm font-semibold text-gray-700">{text}</span>
          </div>
          // </CustomTooltip>
        );
      },
    },
    { field: "expiryDate", headerName: "Expiry Date", flex: 1, minWidth: 100 },
    // {
    //   field: "wabaAccountId",
    //   headerName: "WABA Account ID",
    //   flex: 1,
    //   minWidth: 120,
    // },
    // { field: "health", headerName: "Health", flex: 1, minWidth: 120 },
    // {
    //   field: "phoneNumberId",
    //   headerName: "Phone Number ID",
    //   flex: 1,
    //   minWidth: 120,
    // },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Info" placement="top" arrow>
            <span>
              <IconButton
                type="button"
                ref={(el) => {
                  if (el) dropdownButtonRefs.current[params.row.id] = el;
                }}
                onClick={() => handleInfo(params.row)}
                className="no-xs relative"
              >
                <ImInfo size={18} className="text-green-500 " />
              </IconButton>
              {/* {dropdownOpenId === params.row.id && (
                <DropdownMenuPortal
                  targetRef={{ current: dropdownButtonRefs.current[params.row.id] }}
                  onClose={closeDropdown}
                  style={{
                    position: "absolute",
                  }}
                  positionOverrides={{
                    top: 260, // Set exact top position in pixels
                    right: 0,
                  }}
                >
                  {clicked && Object.keys(clicked).length > 0 ? (
                    <table className="w-full text-sm text-left border border-gray-200 rounded-md overflow-hidden">
                      <tbody>
                        {Object.entries(clicked).map(([key, value], index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-50 transition-colors border-b last:border-none"
                          >
                            <td className="px-4 py-2 font-medium text-gray-600 capitalize w-1/3">
                              {key}
                            </td>
                            <td className="px-4 py-2 text-gray-800">
                              {value || "N/A"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-sm text-gray-400 italic px-2 py-2">
                      No data
                    </div>
                  )}
                </DropdownMenuPortal>
              )} */}
              <InfoPopover
                anchorEl={dropdownButtonRefs.current[params.row.id]}
                open={dropdownOpenId === params.row.id}
                onClose={closeDropdown}
              >
                {clicked && Object.keys(clicked).length > 0 ? (
                  <table className="w-80 text-sm text-left border border-gray-200 rounded-md overflow-hidden">
                    <tbody>
                      {Object.entries(clicked).map(([key, value], index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors border-b last:border-none"
                        >
                          <td className="px-4 py-2 font-medium text-gray-600 capitalize w-1/3">
                            {key}
                          </td>
                          <td className="px-4 py-2 text-gray-800">
                            {value || "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-sm text-gray-400 italic px-2 py-2">
                    No data
                  </div>
                )}
              </InfoPopover>
            </span>
          </CustomTooltip>

          {/* {dropdownOpenId === params.row.id && (
            <DropdownMenuPortal
              targetRef={{ current: dropdownButtonRefs.current[params.row.id] }}
              onClose={closeDropdown}
            >
              {clicked && clicked.length > 0 ? (
                clicked.map((waba, index) => (
                  <div
                    key={index}
                    className="text-sm text-slate-700 hover:bg-slate-100 px-2 py-1 rounded"
                  >
                    Expiry Date: {waba.expiryDate || "N/A"}
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-400 italic px-2">No data</div>
              )}
            </DropdownMenuPortal>
          )} */}

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
    sn: index + 1,
    wabaName: waba.name || "N/A",
    wabaNumber: waba.mobileNo || "N/A",
    createdOn: waba.insertTime || "N/A",
    status: waba.wabaStatus || "N/A",
    wabaAccountId: waba.wabaAccountId || "N/A",
    phoneNumberId: waba.phoneNumberId || "N/A",
    quality: waba.qualityRate || "N/A",
    additionalInfo: {
      expiryDate: waba.expiryDate || "N/A",
      messagingLimit: waba.messagingLimits || "N/A",
      // quality: waba.qualityRate || "N/A",
      wabaAccountId: waba.wabaAccountId || "N/A",
      phoneNumberId: waba.phoneNumberId || "N/A",
    },
    ...waba,
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
  const whatsappLinkPreview = `wa.me/${phoneNumber}`;

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
              <label className="flex items-center gap-2 text-xl font-semibold text-green-500">
                <FaWhatsapp /> Manage Waba Accounts
              </label>
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
            <button
              // href="#signup"
              className="bg-[#4267b2] p-2.5 rounded-lg text-[1.1rem] text-white cursor-pointer font-medium tracking-wide"
              onClick={handleFacebookLogin}
            >
              Login with Facebook
            </button>
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
                <FaWhatsapp className="text-[#25D366] text-lg" />
                {selectedWaba?.wabaNumber || "N/A"}
              </p>
              {/* <a
                href={`https://wa.me/${selectedWaba?.wabaNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] text-sm hover:underline"
              >
                {whatsappLinkPreview}
              </a> */}
              <div>
                <a
                  href={`https://wa.me/${selectedWaba?.wabaNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] text-sm hover:underline"
                >
                  {whatsappLinkPreview}
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard
                      .writeText(whatsappLinkPreview)
                      .then(() => {
                        toast.success("Copied to clipboard!");
                      })
                      .catch(() => {
                        toast.error("Failed to copy password.");
                      });
                  }}
                  className="p-1 bg-transparent rounded-full shadow-2xl cursor-pointer hover:bg-gray-200 focus:outline-none"
                >
                  <ContentCopyOutlinedIcon
                    sx={{
                      fontSize: "1rem",
                      color: "#999",
                    }}
                  />
                </button>
              </div>
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
        className="lg:w-[50rem] md:w-[35rem] sm:w-[20rem]"
        modal
      >
        <div className="p-2 md:p-10 lg:p-10 space-y-2 text-center bg-white shadow-md rounded-xl h-48 md:h-auto lg:h-auto">
          <h1 className="text-xl font-semibold">Add Another Account</h1>
          <p className="mb-6 font-medium">
            To add another WABA account, link the new account through Facebook.
          </p>
          <button
            // href="#signup"
            className="bg-[#4267b2] p-2.5 rounded-lg lg:text-[1rem] md:text-[0.9rem] sm:text-[0.5rem] text-white cursor-pointer font-medium tracking-wide"
            onClick={handleFacebookLogin}
          >
            Login with Facebook
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default WhatsappManageWaba;
