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
import Lottie from "lottie-react";
import nothinganimation from "@/assets/animation/nothinganimation.json";

import { FaEnvelope, FaGlobe } from "react-icons/fa";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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

import celifavicon from "../../../assets/icons/Celitixfavicon.png";
import officebuilding from "../../../assets/icons/office-building.png";

import CardHoverEffect from "../components/CardHoverEffect";

import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import WarningOutlinedIcon from "@mui/icons-material/WarningOutlined";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import AccessAlarmsOutlinedIcon from "@mui/icons-material/AccessAlarmsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { AnimatePresence, motion } from "framer-motion";
import CardActions from "@mui/material/CardActions";

import Animation_SignIn from "../../../assets/animation/Animation_SignIn.json";
import Animation_SignUp from "../../../assets/animation/Animation_SignUp.json";
import Animation_BookingAppointment from "../../../assets/animation/Animation_BookingAppointment.json";
import Animation_LeadGeneration from "../../../assets/animation/Animation_LeadGeneration.json";
import Animation_ContactUs from "../../../assets/animation/Animation_ContactUs.json";
import Animation_CustomerSupport from "../../../assets/animation/Animation_CustomerSupport.json";
import Animation_Survey from "../../../assets/animation/Animation_Survey.json";
import {
  getWhatsappFlow,
  getWabaList,
  getWhatsappFlowTemplate,
  updateFlowStatus,
  deleteFlow,
  getMainJson,
} from "@/apis/whatsapp/whatsapp";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import moment from "moment";
import DropdownMenuPortal from "@/utils/DropdownMenuPortal";
import Card from "@mui/material/Card";
import { cn } from "../lib/utils";
import UniversalSkeleton from "@/whatsapp/components/UniversalSkeleton";
const WhatsappFlows = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
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
  const [isPublishingNow, setIsPublishingNow] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [flowId, setFlowId] = useState([]);
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
    const isDraft = selectedFlowDetails?.status === "DRAFT";
    if (!isDraft) {
      if (!bodyText.trim()) {
        toast.error("Body text is required.");
        return;
      }
      if (!btnText.trim()) {
        toast.error("Button text is required.");
        return;
      }
    }

    const reqbody = {
      flowId: selectedFlowDetails?.flowId,
      screenId: selectedFlowDetails?.screensId,
      flowName: selectedFlowDetails?.flowName,
      mobileno: mobileNo,
      bodyText: bodyText,
      butnText: btnText,
    };

    const flowstatus = selectedFlowDetails?.status;
    try {
      setIsSending(true);
      const res = await getWhatsappFlowTemplate(
        reqbody,
        selectedWaba,
        flowstatus
      );
      if (res?.flag === true) {
        toast.success("Flow Send  Succesfully");
        setPublicDialog(false);
      } else {
        toast.error(res?.messages || "Flow Send  failed");
      }
    } catch (err) {
      toast.error("An error occurred while Sending the flow.");
    } finally {
      setIsSending(false);
    }
  };

  // const filteredFlows = (Array.isArray(flowList) ? flowList : []).filter(
  //   (flow) =>
  //     (flow?.flowName || "").toLowerCase().includes(search.toLowerCase())
  // );

  const filteredFlows = (Array.isArray(flowList) ? flowList : []).filter(
    (flow) => {
      const searchText = search.toLowerCase();
      const flowName = (flow?.flowName || "").toLowerCase();
      const flowId = String(flow?.flowId || "").toLowerCase();

      return flowName.includes(searchText) || flowId.includes(searchText);
    }
  );

  const highlightMatch = (text, query) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-300 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const totalPages = Math.ceil(filteredFlows.length / rowsPerPage);
  // const paginatedFlows = [];
  const paginatedFlows = filteredFlows
    .reverse()
    .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleMenuOpen = (event, flow) => {
    setSelectedFlow(flow);
    setDropdownOpenId(flow.flowId);
  };

  const handleMenuClose = () => {
    setDropdownOpenId(null);
    setSelectedFlow(null);
  };

  const handleEdit = (flow) => {
    console.log("flow", flow);
    navigate("/wflowedit", {
      state: {
        data: flow?.srNo,
        flow: flow,
      },
    });
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

    try {
      setIsFetching(true);
      const res = await deleteFlow(flowId);

      if (res?.success) {
        toast.success("Flow deleted successfully");
        setVisible(false);
        await fetchWabaFlows();
      } else {
        const errorMsg = res?.error?.error_user_msg || "Flow deletion failed";
        toast.error(errorMsg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Flow deletion failed");
    } finally {
      setIsFetching(false);
    }
  }

  const handleExport = async (flow = selectedFlow) => {
    setIsFetching(true);
    try {
      const response = await getMainJson(flow.srNo);

      const mainJsonStr = response.data[0].mainJson;
      const mainJsonObj = JSON.parse(mainJsonStr);

      // Convert to pretty JSON string
      const jsonString = JSON.stringify(mainJsonObj, null, 2);

      // Create Blob
      const blob = new Blob([jsonString], { type: "application/json" });

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = flow.flowName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
      toast.success("Downloaded Successfully");
    } catch (error) {
      console.error("Error in exporting the data:", error);
    }
    setIsFetching(false);
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
    { name: "SignIn", animation: Animation_SignIn, button: "SignIn" },
    { name: "SignUp", animation: Animation_SignUp, button: "SignUp" },
    {
      name: "Appointment Booking",
      animation: Animation_BookingAppointment,
      button: "Book Appointment",
    },
    {
      name: "Lead Generation",
      animation: Animation_LeadGeneration,
      button: "Lead Generation",
    },
    {
      name: "Contact Us",
      animation: Animation_ContactUs,
      button: "Contact Us",
    },
  ];

  // 2. Your itemTemplate
  const templateItem = (item) => (
    <div className="mx-2 group w-auto  rounded-2xl pt-2 my-2 overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg border border-gray-200 relative group transition-all duration-200  hover:-translate-y-1">
      <Card sx={{ width: "auto", overflow: "hidden" }}>
        <h4 className="text-center text-lg font-bold mt-4">{item.name}</h4>

        <div className="m-auto h-45 w-45 flex items-center justify-center mt-4">
          <Lottie animationData={item.animation} loop={true} />
        </div>

        <CardActions className="justify-center pb-4">
          <button
            className={cn(
              "transition-all duration-500 transform opacity-0 translate-y-8",
              "group-hover:opacity-100 group-hover:translate-y-0",
              "bg-gray-700 text-white font-semibold rounded-xl px-5 py-2 shadow-md",
              "hover:bg-gray-800 hover:scale-105 hover:shadow-lg focus:outline-none"
            )}
            style={{
              boxShadow: "0 4px 24px rgba(55,65,81,0.10)",
              border: "none",
            }}
            onClick={() => console.log(`Clicked ${item.name}`)}
          >
            {item.button || "Select"}
          </button>
        </CardActions>
      </Card>
    </div>
  );

  return (
    <>
      <div className=" bg-white border border-gray-300 rounded-xl shadow-sm mb-3 md:px-3 px-0 pt-2">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-xl font-semibold mb-2 sm:mb-0">
            Templates
            <FaWhatsapp className="text-[#25D366] text-2xl" />
          </div>
          <div className=" flex gap-2 w-full sm:w-auto md:justify-end justify-center items-end   ">
            <div className="md:block hidden">
              <UniversalButton
                label="+ Create New Flow"
                onClick={() => setShowDialog(true)}
                id="createflow"
                name="createflow"
              />
            </div>
          </div>
        </div>
        <div className="mb-2 sm:mb-0">
          {/* <CardHoverEffect/> */}

          <div className="">
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
                  breakpoint: "2560px",
                  numVisible: 5,
                  numScroll: 2,
                },
                {
                  breakpoint: "1440px",
                  numVisible: 3,
                  numScroll: 2,
                },
                {
                  breakpoint: "1024px",
                  numVisible: 2,
                  numScroll: 1,
                },
                {
                  breakpoint: "768px",
                  numVisible: 2,
                  numScroll: 1,
                },
                {
                  breakpoint: "425px",
                  numVisible: 1,
                  numScroll: 1,
                },
                {
                  breakpoint: "375px",
                  numVisible: 1,
                  numScroll: 1,
                },
                {
                  breakpoint: "320px",
                  numVisible: 1,
                  numScroll: 1,
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-xl shadow-sm  md:p-4 pb-2 h-auto flex flex-col ">
        <div className="p-2  ">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4 bg-white">
            <h2 className="flex items-center justify-center gap-2 text-xl font-semibold mb-2 sm:mb-0">
              Created Flows
              <FaWhatsapp className="text-[#25D366] text-2xl" />
            </h2>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search by Flow Name & Id..."
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
          <div className="space-y-4 h-100  overflow-y-auto lg:overflow-y-hidden">
            {isLoading ? (
              <div className="w-full">
                <div className="flex flex-col gap-3">
                  <UniversalSkeleton height="6rem" width="100%" />
                  <UniversalSkeleton height="6rem" width="100%" />
                  <UniversalSkeleton height="6rem" width="100%" />
                  <UniversalSkeleton height="6rem" width="100%" />
                </div>
              </div>
            ) : paginatedFlows.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-2 h-110">
                <div className="flex flex-col items-center justify-center border-2 border-dashed p-5 rounded-3xl shadow-2xl border-blue-300">
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
                  <div className="mt-4  md:block hidden">
                    <UniversalButton
                      label="+ Create Flow"
                      onClick={() => setShowDialog(true)}
                    />
                  </div>
                </div>
              </div>
            ) : (
              paginatedFlows.map((flow, index) => (
                <div
                  key={index}
                  className="bg-blue-100 border border-blue-200 rounded-xl px-2 py-5 grid lg:grid-cols-6 xl:grid-cols-7 xs:grid-cols-1 md:grid-cols-4 gap-2 sm:grid-cols-3  items-center justify-between flex-wrap sm:flex-nowrap"

                >
                  <div className="flex items-center justify-start  gap-4">
                    <div className="bg-white flex items-center justify-center p-0.5 rounded-full shadow">

                      {flow.status === "DRAFT" && (
                        <RadioButtonCheckedOutlinedIcon
                          className="text-orange-500"
                          sx={{
                            fontSize: "22px",
                          }}
                        />
                      )}
                      {flow.status === "PUBLISHED" && (
                        <RadioButtonCheckedOutlinedIcon
                          className="text-green-500 "
                          sx={{
                            fontSize: "22px",
                          }}
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="font-semibold text-sm">

                        {/* {flow.flowName} */}
                        {highlightMatch(String(flow.flowName || ""), search)}
                      </div>
                      <span
                        className={`text-xs shadow-md tracking-wide px-2 py-1 rounded-md w-max  ${flow.status === "DRAFT"
                          ? "bg-orange-500 text-white"
                          : "bg-blue-500 text-white"
                          }`}
                      >
                        {flow.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-center">
                    <div className="font-semibold text-sm mb-2">Flow ID</div>
                    <span className="text-[0.79rem] font-semibold border p-1 border-gray-300 bg-blue-200 text-gray-600 rounded-md tracking-widest">
                      {highlightMatch(String(flow.flowId || "N/A"), search)}
                    </span>
                  </div>

                  <div className="text-sm text-center ">
                    <div className="font-semibold text-sm mb-2">
                      Flow Category
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-blue-300 text-blue-900 rounded-md">
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
                      {/* {moment(flow.insertTime).format("DD-MM-YYYY")} */}
                      {flow.insertTime}
                    </div>
                  </div>

                  <div className="flex items-center md:justify-center lg:justify-center gap-1 mt-3 sm:mt-0">
                    {flow.status === "DRAFT" && (
                      <div className="relative inline-block">
                        <button
                          className={`bg-orange-400 hover:bg-orange-500 text-white px-4 py-1.5 rounded-3xl border-2 border-white text-sm flex items-center gap-2 ${isPublishingNow === flow.flowId
                            ? "cursor-not-allowed opacity-70"
                            : "cursor-pointer"
                            }`}

                          onClick={() => {
                            if (!isPublishingNow) {
                              setPublishingId(
                                publishingId === flow.flowId
                                  ? null
                                  : flow.flowId
                              );
                            }
                          }}
                          disabled={isPublishingNow === flow.flowId}
                        >
                          {isPublishingNow === flow.flowId ? (
                            <>
                              <span className="inline-block align-middle w-4 h-4 border-2 rounded-full border-white border-t-blue-500 animate-spin"></span>
                              Publishing...
                            </>
                          ) : (
                            <>
                              <MdOutlinePublishedWithChanges className="text-xl" />{" "}
                              Publish
                            </>
                          )}
                        </button>
                        <AnimatePresence>
                          {publishingId === flow.flowId && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute z-10 mt-2 left-0 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-4"
                            >
                              <p className="text-sm text-gray-800 font-semibold">
                                Are you sure you want to publish?
                              </p>
                              <p className="text-xs mt-1 text-gray-600">
                                Once published, you{" "}
                                <strong>won’t be able to edit or delete</strong>{" "}
                                this flow. It will be publicly available to
                                users. <br />
                                <div className="border-b border-dashed my-2 border-gray-900"></div>
                                You may also send this flow for testing purposes
                                without publishing it.
                              </p>

                              <div className="flex justify-end gap-3 mt-4">
                                <button
                                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition"
                                  onClick={() => setPublishingId(null)}
                                >
                                  <IoCloseCircle className="text-lg" />
                                  Cancel
                                </button>

                                <button
                                  className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm transition"
                                  onClick={async () => {
                                    setIsPublishingNow(flow.flowId);
                                    await new Promise((res) =>
                                      setTimeout(res, 1000)
                                    );
                                    await updateStatus(
                                      flow.flowId,
                                      flow.mobileno
                                    );
                                    setIsPublishingNow(null);
                                    setPublishingId(null);
                                  }}
                                  disabled={isPublishingNow === flow.flowId}
                                >
                                  <FaCheckCircle className="text-sm" />
                                  Yes, Publish
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                    {flow.status === "PUBLISHED" && (
                      <button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm border-2 border-white tracking-wide">
                        Published
                      </button>
                    )}
                  </div>

                  {/* <div className="flex items-center justify-end gap-3 mt-3 sm:mt-0"> */}
                  <div className="flex items-center md:justify-center lg:justify-between gap-1 mt-3 sm:mt-0">
                    <button
                      className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 border-2 border-white rounded-3xl text-sm flex items-center gap-2 flex-nowrap whitespace-nowrap "
                      onClick={() => {
                        handlepublishBtn(flow);
                      }}
                    >
                      <SendIcon sx={{ fontSize: "1rem" }} />
                      Send Flow
                    </button>

                    <CustomTooltip
                      title="Settings"
                      arrow
                    // tooltipPlacement="top"
                    >
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
                        {flow.status === "DRAFT" && (
                          <button
                            onClick={() => handleEdit(flow)}
                            className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 flex items-center gap-2"
                          >
                            <EditIcon
                              fontSize="small"
                              className="text-gray-600"
                            />
                            Edit
                          </button>
                        )}

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(flow)}
                          className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
                        >
                          <DeleteForeverIcon
                            sx={{
                              fontSize: "1.2rem",
                              color: "#e31a1a",
                            }}
                          />
                          Delete
                        </button>

                        {/* Export Button */}
                        <button
                          onClick={() => handleExport(flow)}
                          className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
                        >
                          <FileDownloadIcon
                            fontSize="small"
                            className="text-green-600"
                          />
                          Export
                        </button>
                      </DropdownMenuPortal>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}


          <div className="flex justify-end items-center mt-4 gap-2 w-full whitespace-nowrap sm:overflow-x-scroll">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`text-sm px-3 py-1 border rounded-sm cursor-pointer ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""
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
                <div className="max-w-content flex items-center justify-center ">
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
                            src={officebuilding}
                            className="w-10 h-10 rounded-full border object-fit border-gray-400 bg-gray-600"
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

                      {selectedFlowDetails?.status === "DRAFT" && (
                        <div className="p-5">
                          <div className="bg-gray-700 rounded-tr-xl rounded-b-xl p-3 text-white w-80 shadow ">
                            <pre className="mb-2 text-sm break-words text-nowrap">
                              !Hello <br />
                              This is a test message to try your flow. <br />.
                              Team Whatsapp
                            </pre>
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
                                    [ Start testing your flow ]
                                  </div>
                                </div>
                              </button>
                            </div>
                          </div>
                          <div className="text-center text-white text-xs mt-4">
                            <strong>Note:</strong> This flow is currently in
                            draft mode for testing. You will need to publish
                            it to make it accessible to users.
                          </div>
                        </div>
                      )}

                      {selectedFlowDetails?.status === "PUBLISHED" && (
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
                      )}
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
                    {selectedFlowDetails?.status === "PUBLISHED" && (
                      <>
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
                      </>
                    )}
                  </div>
                )}
              <div className="flex justify-center items-center mt-5">
                <UniversalButton
                  onClick={handleSubmitFlowTemp}
                  label={isSending ? "Submitting.." : "Submit"}
                  disabled={isSending}
                  variant="primary"
                />
              </div>
            </form>
          </Dialog>
          {/* publish dialog end */}

          {/* deleteFlow dialogbox strt */}
          <Dialog
            header="Confirm Delete"
            visible={visible}
            style={{ width: "27rem" }}
            onHide={() => setVisible(false)}
            draggable={false}
          >
            <div className="flex items-center justify-center">
              {currentRow?.status === "PUBLISHED" ? (
                <WarningOutlinedIcon
                  sx={{
                    fontSize: 64,
                    color: "#f59e0b",
                  }}
                />
              ) : (
                <CancelOutlinedIcon
                  sx={{
                    fontSize: 64,
                    color: "#ef4444",
                  }}
                />
              )}
            </div>

            <div className="p-4 text-center">
              {currentRow?.status === "PUBLISHED" ? (
                <>
                  <p className="text-[1.1rem] font-semibold text-gray-800">
                    The Flow&nbsp;
                    <span className="text-green-800">
                      "{currentRow?.flowName}"&nbsp;
                    </span>
                    is currently&nbsp; <br />
                    <span className="text-yellow-600">PUBLISHED</span>.
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    This is a live WhatsApp flow deployed via Meta, and
                    therefore, <strong>cannot be edited or deleted</strong>.
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    If changes are needed, create a new flow and publish it
                    separately.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[1.1rem] font-semibold text-gray-700">
                    Are you sure you want to delete the Flow <br />
                    <span className="text-green-800 text-xl">
                      "{currentRow?.flowName}"
                    </span>
                    ?
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    This flow is currently in <strong>DRAFT</strong> mode. You
                    can still make changes, or choose to delete it.
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Deletion is <strong>permanent</strong> and cannot be undone.
                  </p>
                </>
              )}
            </div>

            {currentRow?.status === "DRAFT" && (
              <div className="flex justify-center gap-4 mt-2">
                {!isFetching && (
                  <UniversalButton
                    label="Cancel"
                    style={{ backgroundColor: "#090909" }}
                    onClick={() => setVisible(false)}
                  />
                )}
                <UniversalButton
                  label={isFetching ? "Deleting..." : "Delete"}
                  style={{ backgroundColor: "#dc2626" }}
                  onClick={handleDeleteFlow}
                  disabled={isFetching}
                />
              </div>
            )}
          </Dialog>
          {/* deleteFlow dialogbox end */}
        </div>
      </div>
    </>
  );
};

export default WhatsappFlows;
