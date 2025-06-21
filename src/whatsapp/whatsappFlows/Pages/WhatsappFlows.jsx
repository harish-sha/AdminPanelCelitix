import React, { useEffect, useRef, useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Carousel } from "primereact/carousel";
// import { Player } from "@lottiefiles/react-lottie-player";
import Lottie from "lottie-react";
import nothinganimation from "@/assets/animation/nothinganimation.json";

import { FaEnvelope, FaGlobe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Dialog } from "primereact/dialog";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import toast from "react-hot-toast";
import SendIcon from "@mui/icons-material/Send";

import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputWithLabel from "@/whatsapp/components/InputWithLabel";
import UniversalButton from "@/components/common/UniversalButton";
import InputField from "@/components/layout/InputField";
import CustomTooltip from "@/components/common/CustomTooltip";

import celifavicon from "../../../assets/icons/CELITIX FAVICON2.png";

import CardHoverEffect from "../components/CardHoverEffect";

import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
// import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import AccessAlarmsOutlinedIcon from "@mui/icons-material/AccessAlarmsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { AnimatePresence, motion } from "framer-motion";
import CardActions from '@mui/material/CardActions';

import Animation_SignIn from "../../../assets/animation/Animation_SignIn.json";
import Animation_SignUp from "../../../assets/animation/Animation_SignUp.json";
import Animation_BookingAppointment from "../../../assets/animation/Animation_BookingAppointment.json";
import Animation_LeadGeneration from "../../../assets/animation/Animation_LeadGeneration.json";
import Animation_ContactUs from "../../../assets/animation/Animation_ContactUs.json"
import Animation_CustomerSupport from "../../../assets/animation/Animation_CustomerSupport.json"
import Animation_Survey from "../../../assets/animation/Animation_Survey.json"
import {
  getWhatsappFlow,
  getWabaList,
  getWhatsappFlowTemplate,
  updateFlowStatus,
  deleteFlow,
} from "@/apis/whatsapp/whatsapp";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import moment from "moment";
import DropdownMenuPortal from "@/utils/DropdownMenuPortal";
import Card from '@mui/material/Card';
import { cn } from "../lib/utils";
const WhatsappFlows = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [wabaList, setWabaList] = useState([]);
  const [selectedWaba, setSelectedWaba] = useState("");
  const [flowList, setFlowList] = useState([]);
  const [wabaInput, setWabaInput] = useState([]);
  const [publicDialog, setPublicDialog] = useState(false);
  const [mobileNo, setMobileNo] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [btnText, setBtnText] = useState("");
  const [selectedFlowDetails, setSelectedFlowDetails] = useState(null);
  const [selectCategories, setSelectCategories] = useState("");
  const [flowName, setFlowName] = useState("");
  const dropdownButtonRefs = useRef({});
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [publishingId, setPublishingId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [flowId, setFlowId] = useState([])
  const navigate = useNavigate();
  const rowsPerPage = 4;

  // Fetch WABA List
  useEffect(() => {
    const fetchWabaList = async () => {
      setIsLoading(true);
      try {
        const response = await getWabaList();
        setWabaList(response);
      } catch (error) {
        toast.error("Error fetching WABA List:", error);
      }
      setIsLoading(false);
    };
    fetchWabaList();
  }, []);

  // fetch flow list
  const fetchWabaFlows = async () => {
    setIsLoading(true);
    try {
      const response = await getWhatsappFlow();
      setFlowList(response);
    } catch (error) {
      console.error("Error fetching flow list:", error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchWabaFlows();
  }, []);

  const handlepublishBtn = (flow) => {
    setSelectedFlowDetails(flow);
    setPublicDialog(true);
    setMobileNo("");
    setBodyText("");
    setBtnText("");
    setSelectedWaba("");
  };

  const handleSubmitFlowTemp = async (e) => {
    e.preventDefault();

    if (!selectedWaba) {
      toast.error("Please select waba account");
      return;
    }
    if (!mobileNo.trim()) {
      toast.error("Mobile number is required.");
      return;
    }
    if (!bodyText.trim()) {
      toast.error("Body text is required.");
      return;
    }
    if (!btnText.trim()) {
      toast.error("Button text is required.");
      return;
    }

    const reqbody = {
      flowId: selectedFlowDetails?.flowId,
      screenId: selectedFlowDetails?.screensId,
      flowName: selectedFlowDetails?.flowName,
      mobileno: mobileNo,
      bodyText: bodyText,
      butnText: btnText,
    };
    try {
      setIsLoading(true);
      const res = await getWhatsappFlowTemplate(reqbody, selectedWaba);
      if (res?.flag === true) {
        toast.success("Flow Send  Succesfully");
        setPublicDialog(false);
      } else {
        toast.error(res?.messages || "Flow Send  failed");
      }
    } catch (err) {
      toast.error("An error occurred while Sending the flow.");
    } finally {
      setIsLoading(false);
    }
  };

  // const filteredFlows = flowList.filter((flow) =>
  //   flow.flowName.toLowerCase().includes(search.toLowerCase())
  // );

  const filteredFlows = (Array.isArray(flowList) ? flowList : []).filter(
    (flow) =>
      (flow?.flowName || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFlows.length / rowsPerPage);
  // const paginatedFlows = [];
  const paginatedFlows = filteredFlows
    .reverse()
    .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const dropdownItems = ["Edit", "Delete", "Export"];

  const iconMap = {
    Edit: <EditNoteIcon fontSize="small" />,
    Delete: (
      <MdOutlineDeleteForever
        className="text-red-500 cursor-pointer hover:text-red-600"
        size={20}
      />
    ),
    Export: <FileDownloadIcon fontSize="small" />,
  };

  const handleBtnClick = (item, flow) => {
    setDropdownOpenId(null);
    if (item === "Edit") handleEdit(flow);
    else if (item === "Delete") handleDelete(flow);
    else if (item === "Export") handleExport(flow);
  };

  const handleMenuOpen = (event, flow) => {
    setSelectedFlow(flow);
    setDropdownOpenId(flow.flowId);
  };

  const handleMenuClose = () => {
    setDropdownOpenId(null);
    setSelectedFlow(null);
  };

  const handleEdit = (flow = selectedFlow) => {
    handleMenuClose();
  };
  const handleDelete = () => {
    setCurrentRow(selectedFlow);
    setVisible(true);
    handleMenuClose();
  };

  // deleteFlow
  async function handleDeleteFlow() {
    if (!currentRow) {
      return toast.error("No flow selected for deletion");
    }

    const { flowId } = currentRow;

    console.log(flowId)

    try {
      setIsFetching(true);
      const res = await deleteFlow(flowId);
      console.log("Delete response:", res);

      // if (flow?.status === "Draft") {
      //   toast.success("Flow deleted successfully");
      // }

      // await fetchWabaFlows();

      if (res?.success) {
        toast.success("Flow deleted successfully");
        setVisible(false);
      } else {
        toast.error(res?.error?.error_user_msg || "Flow deletion failed");
      }
    } catch (error) {
      console.log(error)
      toast.error("Flow deletion failed");
    } finally {
      setIsFetching(false);
    }
  }
  const handleExport = (flow = selectedFlow) => {
    handleMenuClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectCategories) {
      toast.error("Please select a flow category.");
      return;
    }
    if (!selectedWaba) {
      toast.error("Please select a WhatsApp integration.");
      return;
    }
    navigate("/wflowcreation", {
      state: { flowName, selectCategories, selectedWaba },
    });
  };

  async function updateStatus(id, mobile) {
    try {
      const data = {
        id,
        wabaNumber: mobile,
      };
      const res = await updateFlowStatus(data);

      if (!res?.flag) {
        toast.error("Error updating status");
      }
      toast.success("Flow Updated Successfully");
      await fetchWabaFlows();
    } catch (e) {
      console.log(e);
      toast.error("Error updating status");
    }
  }

  // 1. Your data
  const templates = [
    { name: "SignIn", animation: Animation_SignIn, button: "SignIn", },
    { name: "SignUp", animation: Animation_SignUp, button: "SignUp", },
    { name: "Appointment Booking", animation: Animation_BookingAppointment, button: "Book Appointment", },
    { name: "Lead Generation", animation: Animation_LeadGeneration, button: "Lead Generation", },
    { name: "Contact Us", animation: Animation_ContactUs, button: "Contact Us", },
  ];

  // 2. Your itemTemplate
  const templateItem = (item) => (
    <div className="mx-2 group w-auto  rounded-2xl pt-2 my-2 overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg border border-gray-200 relative group transition-all duration-200  hover:-translate-y-1">
      <Card sx={{ width: "auto", overflow: 'hidden' }}>
        {/* Title */}
        <h4 className="text-center text-lg font-bold mt-4">{item.name}</h4>

        {/* Icon / Animation */}
        <div className="m-auto h-45 w-45 flex items-center justify-center mt-4">
          <Lottie animationData={item.animation} loop={true} />
        </div>

        {/* Button */}
        <CardActions className="justify-center pb-4">
          <button
            className={cn(
              'transition-all duration-500 transform opacity-0 translate-y-8',
              'group-hover:opacity-100 group-hover:translate-y-0',
              'bg-gray-700 text-white font-semibold rounded-xl px-5 py-2 shadow-md',
              'hover:bg-gray-800 hover:scale-105 hover:shadow-lg focus:outline-none'
            )}
            style={{
              boxShadow: '0 4px 24px rgba(55,65,81,0.10)',
              border: 'none',
            }}
            onClick={() => console.log(`Clicked ${item.name}`)}
          >
            {item.button || 'Select'}
          </button>
        </CardActions>
      </Card>
    </div>
  );


  return (
    <>
      <div className=" bg-white border border-gray-300 rounded-xl shadow-sm mb-10 p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-xl font-semibold mb-2 sm:mb-0">
            Templates
            <FaWhatsapp className="text-[#25D366] text-2xl" />
          </div>
          <div className="flex gap-2 w-full sm:w-auto justify-end items-end">
            <UniversalButton
              label="+ Create New Flow"
              onClick={() => setShowDialog(true)}
              id="createflow"
              name="createflow"
            />
          </div>
        </div>
        <div className="mb-2 sm:mb-0">
          {/* <CardHoverEffect/> */}

          <div className="">
            {/* <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Templates
            </h2> */}
            <Carousel
              value={templates}
              numVisible={4}
              numScroll={1}
              itemTemplate={templateItem}
              circular
              showIndicators={true}
              showNavigators={true}
              className="custom-carousel"
              responsiveOptions={[
                {
                  breakpoint: "1024px",
                  numVisible: 4,
                  numScroll: 1,
                },
                {
                  breakpoint: "768px",
                  numVisible: 1,
                  numScroll: 1,
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className=" bg-white border border-gray-300 rounded-xl shadow-sm">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-2 sm:mb-0">
              Created Flows
              <FaWhatsapp className="text-[#25D366] text-2xl" />
            </h2>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search by Flow Name"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded-md px-3 py-1.5 w-full sm:w-64 text-sm"
              />
            </div>
          </div>

          {/* Flows */}
          <div className="space-y-4">
            {paginatedFlows.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-2">
                <div className="w-60 h-60">
                  <Lottie animationData={nothinganimation} loop={true} />
                </div>
                <div className="text-xl font-semibold text-gray-500 text-center">
                  No flows found.
                  <br />
                  <span className="text-base font-normal text-gray-400">
                    Start your professional journey by creating a new flow!
                  </span>
                </div>
                <div className="mt-4">
                  <UniversalButton
                    label="+ Create Flow"
                    onClick={() => setShowDialog(true)}
                  />
                </div>
              </div>
            ) : (
              paginatedFlows.map((flow, index) => (
                <div
                  key={index}
                  className="bg-blue-100 border border-blue-200 rounded-xl px-4 py-5 grid grid-cols-5 items-center justify-between flex-wrap sm:flex-nowrap"
                >
                  <div className="flex items-center gap-3 ">
                    <div className="bg-white flex items-center justify-center p-1 rounded-full shadow">
                      {/* <div className="w-8 h-8 bg-gray-400 rounded"></div> */}
                      <RadioButtonCheckedOutlinedIcon
                        className="text-green-500"
                        fontSize="small"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">
                        {flow.flowName}
                      </div>
                      <span
                        className={`text-xs font-semibold tracking-wide px-2 py-1 rounded ${flow.status === "Draft"
                          ? "bg-orange-500 text-white"
                          : "bg-blue-500 text-white"
                          }`}
                      >
                        {flow.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-center ">
                    <div className="font-semibold text-sm mb-2">
                      Flow Category
                    </div>
                    <span className="text-xs font-bold px-2 py-1 bg-blue-300 text-blue-900 rounded">
                      {flow.category || "STATIC"}
                    </span>
                  </div>

                  <div className="text-sm text-center ">
                    <div className="font-semibold">WhatsApp Channel</div>
                    <div className="text-gray-600">{flow.channel}</div>
                  </div>

                  <div className="text-sm text-center">
                    <div className="font-semibold">Created At</div>
                    <div className="text-gray-700">
                      {moment(flow.insertTime).format("DD-MM-YYYY")}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 mt-3 sm:mt-0">
                    {flow.status === "DRAFT" && (
                      <button
                        className="bg-orange-400 cursor-pointer hover:bg-orange-500 text-white px-4 py-1.5 rounded-2xl text-sm flex items-center gap-2"
                        onClick={async () => {
                          setPublishingId(flow.flowId);
                          await new Promise((res) => setTimeout(res, 1000));
                          await updateStatus(flow.flowId, flow.mobileno);
                          setPublishingId(null);
                        }}
                        disabled={publishingId === flow.flowId}
                      >
                        {publishingId === flow.flowId ? (
                          <>
                            <span className="inline-block align-middle w-4 h-4 border-2 border-solid rounded-full border-white border-t-blue-500 animate-spin"></span>
                            Publishing...
                          </>
                        ) : (
                          <>▶ Publish</>
                        )}
                      </button>
                    )}
                    {flow.status === "PUBLISHED" && (
                      <button
                        className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-2xl text-sm flex items-center gap-2"
                        onClick={() => {
                          handlepublishBtn(flow);
                        }}
                      >
                        <SendIcon sx={{ fontSize: "1rem" }} />
                        Send Flow
                      </button>
                    )}
                    {/* <CustomTooltip title="Settings" arrow>
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, flow)}
                      size="small"
                    >
                      <SettingsOutlinedIcon
                        className="text-gray-600"
                        fontSize="small"
                      />
                    </IconButton>
                  </CustomTooltip> */}
                    <CustomTooltip title="Settings" arrow>
                      <IconButton
                        ref={(el) => {
                          if (el) dropdownButtonRefs.current[flow.flowId] = el;
                        }}
                        onClick={(e) => handleMenuOpen(e, flow)}
                        size="small"
                      >
                        <SettingsOutlinedIcon
                          className="text-gray-600"
                          fontSize="small"
                        />
                      </IconButton>
                    </CustomTooltip>
                    {dropdownOpenId === flow.flowId && (
                      <DropdownMenuPortal
                        targetRef={{
                          current: dropdownButtonRefs.current[flow.flowId],
                        }}
                        onClose={handleMenuClose}
                      >
                        {dropdownItems.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleBtnClick(item, flow)}
                            className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 flex items-center gap-2"
                          >
                            {iconMap[item]}
                            {item}
                          </button>
                        ))}
                      </DropdownMenuPortal>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Dropdown Menu */}

          {/* <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
          >
            <MenuItem onClick={handleEdit}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleExport}>
              <ListItemIcon>
                <FileDownloadIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Export Screen</ListItemText>
            </MenuItem>
          </Menu> */}

          {/* Pagination */}
          <div className="flex justify-end items-center mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`text-sm px-3 py-1 border rounded-sm cursor-pointer   ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                  }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* create flow dialog start */}
          <Dialog
            visible={showDialog}
            onHide={() => setShowDialog(false)}
            style={{ width: "40rem" }}
            draggable={false}
            header={"Create New Flow"}
          >
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                {/* <InputField
                  tooltipContent="Enter flow name"
                  tooltipPlacement="right"
                  label="Flow Name"
                  id="flowname"
                  name="flowname"
                  type="text"
                  placeholder="Enter Flow Name"
                  value={flowName}
                  onChange={(e) => setFlowName(e.target.value)}
                /> */}
                <AnimatedDropdown
                  label="Select Categories"
                  id="flowcategories"
                  name="flowcategories"
                  tooltipContent="Select flow categories"
                  tooltipPlacement="right"
                  options={[
                    { value: "SIGN_UP", label: "Sign Up" },
                    { value: "SIGN_IN", label: "Sign In" },
                    {
                      value: "APPOINTMENT_BOOKING",
                      label: "Appointment Booking",
                    },
                    { value: "LEAD_GENERATION", label: "Lead Generation" },
                    { value: "CONTACT_US", label: "Contact us" },
                    { value: "CUSTOMER_SUPPORT", label: "Customer Support" },
                    { value: "SURVEY", label: "Survey" },
                    { value: "OTHER", label: "other" },
                  ]}
                  placeholder="Select Flow Categories"
                  value={selectCategories}
                  onChange={setSelectCategories}
                />
                {/* <AnimatedDropdown
                label="Whatsapp integration"
                id="whatsappintegration"
                name="whatsappintegration"
                options={[
                  { value: 'static', label: 'Static' },
                  { value: 'dynamic', label: 'Dynamic' },
                ]}
                placeholder='Select Whatsapp Integration'
                onChange={(value) => console.log(value)}
              /> */}
                <AnimatedDropdown
                  id="manageTemplateWaba"
                  name="manageTemplateWaba"
                  label="Select Whatsapp integration"
                  tooltipContent="Select your whatsapp business account"
                  tooltipPlacement="right"
                  options={wabaList.map((waba) => ({
                    value: waba.mobileNo,
                    label: waba.name,
                  }))}
                  value={selectedWaba}
                  onChange={setSelectedWaba}
                  placeholder="Select WABA"
                />
                <div className="max-w-content flex items-center justify-center">
                  <UniversalButton
                    label="Create Flow"
                    type="submit"
                    id="createflow"
                    name="createflow"
                  />
                </div>
              </div>
            </form>
          </Dialog>
          {/* create flow dialog end */}

          {/* publish dialog start */}
          <Dialog
            visible={publicDialog}
            onHide={() => setPublicDialog(false)}
            style={{ width: "37rem" }}
            draggable={false}
            header={"Publish Flow"}
          >
            <form onSubmit={handleSubmitFlowTemp}>
              {Array.isArray(selectedFlowDetails)
                ? selectedFlowDetails.map((flow, idx, name) => (
                  <div
                    className="flex flex-col gap-4"
                    key={flow.flowId || idx}
                  >
                    <span>
                      <strong>Flow Name:</strong>
                      {flow.flowName}
                    </span>
                  </div>
                ))
                : selectedFlowDetails && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col justify-start  items-start bg-gray-800 min-h-55 rounded-xl ">
                      <div className="flex flex-row items-center justify-between gap-2 mt-2 border-b w-full py-2 px-2 border-gray-500">
                        <div className="flex items-center gap-3">
                          <img
                            // src="https://static.vecteezy.com/system/resources/previews/048/216/750/original/cartoon-man-avatar-character-male-avatar-profile-free-png.png"
                            src={celifavicon}
                            className="w-10 h-10 rounded-full "
                          />
                          <div className=" text-md text-gray-50">
                            {selectedWaba
                              ? wabaList.find(
                                (waba) => waba.mobileNo === selectedWaba
                              )?.name || ""
                              : ""}
                          </div>
                        </div>
                        <div className="pr-3 cursor-pointer">
                          <MoreVertIcon sx={{ color: "gray" }} />
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="bg-gray-700 rounded-tr-xl rounded-b-xl p-3 text-white w-60 shadow ">
                          <div className="mb-2 text-sm break-words text-wrap">
                            {bodyText}
                          </div>
                          <div className="flex items-center justify-between border-t border-gray-500 pt-2 mt-2 break-words text-wrap">
                            <button
                              className="flex items-center gap-2 w-full justify-center py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition cursor-pointer break-words text-wrap"
                              type="button"
                            >
                              <svg
                                width="20"
                                height="20"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <rect
                                  x="4"
                                  y="4"
                                  width="16"
                                  height="16"
                                  rx="2"
                                  fill="#bdbdbd"
                                />
                                <path
                                  d="M8 8h8v2H8V8zm0 4h8v2H8v-2z"
                                  fill="#757575"
                                />
                              </svg>
                              <div className="break-words text-wrap">
                                <div className="font-medium text-sm break-words text-wrap">
                                  {btnText}
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="flex justify-center items-center">
                      Flow :&nbsp;
                      <strong>{selectedFlowDetails.flowName}</strong>
                    </span>
                    <AnimatedDropdown
                      id="whatsappflowWabaTemplate"
                      name="whatsappflowWabaTemplate"
                      label="Whatsapp Account"
                      tooltipContent="Select your whatsapp business account"
                      tooltipPlacement="right"
                      options={wabaList.map((waba) => ({
                        value: waba.mobileNo,
                        label: waba.name,
                      }))}
                      value={selectedWaba}
                      onChange={setSelectedWaba}
                      placeholder="Select WABA"
                    />
                    <InputField
                      label="Mobile No"
                      id="mobileno"
                      name="mobileno"
                      type="phoneno"
                      tooltipContent="Enter Mobile of whom to send the flow"
                      placeholder="Enter MobileNo"
                      value={mobileNo}
                      onChange={(e) => setMobileNo(e.target.value)}
                    />
                    <InputField
                      label="Body Text"
                      id="bodytext"
                      name="bodytext"
                      type="text"
                      tooltipContent="Enter body text"
                      placeholder="Enter Body Text"
                      value={bodyText}
                      onChange={(e) => setBodyText(e.target.value)}
                    // maxLength={50}
                    />
                    <InputField
                      label="Button Text"
                      id="buttontext"
                      name="buttontext"
                      type="text"
                      placeholder="Enter Button Text"
                      tooltipContent="Enter button text"
                      value={btnText}
                      maxLength={25}
                      onChange={(e) => setBtnText(e.target.value)}
                    />
                  </div>
                )}
              <div className="flex justify-center items-center mt-5">
                <UniversalButton
                  onClick={handleSubmitFlowTemp}
                  label={isLoading ? "Submitting.." : "Submit"}
                  disabled={isLoading}
                  variant="primary"
                />
              </div>
            </form>
          </Dialog>
          {/* publish dialog end */}
        </div>
      </div>
    </>
  );
};

export default WhatsappFlows;
