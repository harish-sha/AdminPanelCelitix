import React, { useEffect, useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
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
import {
  getWhatsappFlow,
  getWabaList,
  getWhatsappFlowTemplate,
  updateFlowStatus,
} from "@/apis/whatsapp/whatsapp";
import { FaWhatsapp } from "react-icons/fa";

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
        toast.success("Flow published Succesfully");
        setPublicDialog(false);
      } else {
        toast.error(res?.messages || "Flow published failed");
      }
    } catch (err) {
      toast.error("An error occurred while publishing the flow.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredFlows = flowList.filter((flow) =>
    flow.flowName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFlows.length / rowsPerPage);
  const paginatedFlows = filteredFlows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleMenuOpen = (event, flow) => {
    setSelectedFlow(flow);
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedFlow(null);
  };

  const handleEdit = () => {
    console.log("Edit:", selectedFlow.name);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log("Delete:", selectedFlow.name);
    handleMenuClose();
  };

  const handleExport = () => {
    console.log("Export:", selectedFlow.name);
    handleMenuClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/wflowcreation", { state: { flowName } });
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
          <CardHoverEffect />
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
            {paginatedFlows.map((flow, index) => (
              <div
                key={index}
                className="bg-blue-100 border border-blue-200 rounded-xl px-4 py-5 flex items-center justify-between flex-wrap sm:flex-nowrap"
              >
                <div className="flex items-center gap-3 min-w-[180px]">
                  <div className="bg-white flex items-center justify-center p-1 rounded-full shadow">
                    {/* <div className="w-8 h-8 bg-gray-400 rounded"></div> */}
                    <RadioButtonCheckedOutlinedIcon
                      className="text-green-500"
                      fontSize="small"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{flow.flowName}</div>
                    <span
                      className={`text-xs font-semibold tracking-wide px-2 py-1 rounded ${
                        flow.status === "Draft"
                          ? "bg-orange-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {flow.status}
                    </span>
                  </div>
                </div>

                <div className="text-sm text-center min-w-[80px]">
                  <div className="font-semibold text-sm mb-2">
                    Flow Category
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-blue-300 text-blue-900 rounded">
                    {flow.category || "STATIC"}
                  </span>
                </div>

                <div className="text-sm text-center min-w-[150px]">
                  <div className="font-semibold">WhatsApp Channel</div>
                  <div className="text-gray-600">{flow.channel}</div>
                </div>

                <div className="text-sm text-center min-w-[150px]">
                  <div className="font-semibold">Created At</div>
                  <div className="text-gray-700">{flow.insertTime}</div>
                </div>

                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                  {flow.status === "DRAFT" && (
                    <button
                      className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-1 rounded text-sm flex items-center gap-1"
                      onClick={() => {
                        updateStatus(flow.flowId, flow.mobileno);
                      }}
                    >
                      ▶ Publish
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
                  <CustomTooltip title="Settings" arrow>
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, flow)}
                      size="small"
                    >
                      {/* <MoreVertIcon /> */}
                      <SettingsOutlinedIcon
                        className="text-gray-600"
                        fontSize="small"
                      />
                    </IconButton>
                  </CustomTooltip>
                </div>
              </div>
            ))}
          </div>

          {/* Dropdown Menu */}

          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
          >
            {/* {flow.status === "PUBLISHED" && (
                    <MenuItem onClick={() => handlepublishBtn(flow)}>
                      <ListItemIcon>
                        <FileDownloadIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Send Flow</ListItemText>
                    </MenuItem>
                  )} */}
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
          </Menu>

          {/* Pagination */}
          <div className="flex justify-end items-center mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`text-sm px-3 py-1 border rounded-sm cursor-pointer   ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : ""
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
                <InputField
                  tooltipContent="Enter flow name"
                  tooltipPlacement="right"
                  label="Flow Name"
                  id="flowname"
                  name="flowname"
                  type="text"
                  placeholder="Enter Flow Name"
                  value={flowName}
                  onChange={(e) => setFlowName(e.target.value)}
                />
                <AnimatedDropdown
                  label="Select Categories"
                  id="flowcategories"
                  name="flowcategories"
                  tooltipContent="Select flow categories"
                  tooltipPlacement="right"
                  options={[
                    { value: "signup", label: "Sign Up" },
                    { value: "signin", label: "Sign In" },
                    {
                      value: "appointmentBooking",
                      label: "Appointment Booking",
                    },
                    { value: "leadGeneration", label: "Lead Generation" },
                    { value: "contactUs", label: "Contact us" },
                    { value: "customerSupport", label: "Customer Support" },
                    { value: "survey", label: "Survey" },
                    { value: "other", label: "other" },
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
