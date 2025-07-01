import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Canvas from "../components/Canvas";
import MobilePanel from "../components/MobilePanel";
import EditPanel from "../components/EditPanel";
import UniversalButton from "../../components/UniversalButton";
import { Box, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { TiFlowSwitch } from "react-icons/ti";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import toast from "react-hot-toast";
import { generatePayload } from "../lib/generatePayload";
import { saveFlow } from "@/apis/whatsapp/whatsapp";
import InputField from "@/components/layout/InputField";
import ParticleBackground from "../components/ParticleBackground";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CustomTooltip from "@/components/common/CustomTooltip";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addFlowItem, updateFlowItem } from "../redux/features/FlowSlice";

const FlowCreationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const flowItems = useSelector((state) => state.flows.flowItems);
  const [canvasItems, setCanvasItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [flowName, setFlowName] = useState("");
  const [save, setSave] = useState("");
  const [setting, setSetting] = useState("");
  const [error, setError] = useState("");
  const [buildFlows, setBuildFlows] = useState("");

  // console.log("canvasItems", canvasItems)
  //create new screen
  const [tabs, setTabs] = useState([
    { title: "Welcome", content: "Welcome", id: "WELCOME", payload: [] },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const menuRefs = tabs.map(() => React.createRef());
  const [screenName, setScreenName] = useState("");
  const [screenEditName, setScreenEditName] = useState("");
  const [screenID, setScreenID] = useState("");
  const [createTab, setCreateTab] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // heading
  const [headingValue, setHeadingValue] = useState("");

  //texts
  const [labelValue, setLabelValue] = useState("");
  const [selectedOptionsType, setSelectedOptionsType] = useState(null);
  const [placeholderValue, setPlaceholderValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [minValue, setMinValue] = useState("");
  const [errorValue, setErrorValue] = useState("");
  const [switchChecked, setSwitchChecked] = useState(false);

  //radioButton
  const [radioBtnLabel, setRadioBtnLabel] = useState("");
  const [radioButtonOptions, setRadioButtonOptions] = useState([]);
  const [radiobtnEditIdx, setRadiobtnEditIdx] = useState(null);
  const [radioImageFile, setRadioImageFile] = useState(null);
  const [radioImageSrc, setRadioImageSrc] = useState(null);
  const [uploadedRadioImgId, setUploadedRadioImgId] = useState(null);
  const [radioOptions, setRadioOptions] = useState([]);
  const [draft, setDraft] = useState({
    title: "",
    description: "",
    metadata: "",
    image: "",
    altText: "",
  });

  // console.log("labelValue", labelValue)

  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 1000)
  );

  // const handleAddItem = (item) => {
  //   const newTabs = [...tabs];
  //   console.log("newTabs", newTabs);

  //   const nonDuplicateTabs = [
  //     "heading",
  //     "subheading",
  //     "textbody",
  //     "textcaption",
  //   ];

  //   const onlyOneMediaItem = [
  //     "document",
  //     "media"
  //   ]

  //   // Check for duplicates *only* if item.type is in nonDuplicateTabs
  //   // const shouldCheckDuplicate = nonDuplicateTabs.includes(item.type);

  //   // if (shouldCheckDuplicate) {
  //   //   const isDuplicate = newTabs[activeIndex]?.payload?.some(
  //   //     (payloadItem) => payloadItem.type === item.type
  //   //   );

  //   //   if (isDuplicate) {
  //   //     toast.error(`Only one "${item.type}" allowed in the canvas.`);
  //   //     return;
  //   //   }
  //   // }

  //   // Add the item
  //   newTabs[activeIndex] = {
  //     ...newTabs[activeIndex],
  //     payload: [
  //       ...newTabs[activeIndex].payload,
  //       { type: item.type, value: "" },
  //     ],
  //   };

  //   setTabs(newTabs);
  //   // toast.success(`"${item.type}" added successfully`);
  // };

  const handleAddItem = (item) => {
    const newTabs = [...tabs];

    if (activeIndex < 0 || activeIndex >= newTabs.length) {
      console.error("No active tab selected!");
      return;
    }

    const screenId = newTabs[activeIndex]?.title; // ✅ Just get screenId from active tab

    const uniqueId = `flow-${item.id}-${Date.now()}`; // safer than just +new Date()

    dispatch(
      addFlowItem({
        id: uniqueId,
        data: {
          screenId: screenId,
          type: item.type,
          value: item.label,
          status: 0,
        },
      })
    );

    const nonDuplicateTabs = ["document", "media", "date", "calendar"];
    const onlyOneMediaItem = ["document", "media"];
    const onlyOneDateOrCalendar = ["date", "calendar"];

    const currentPayload = newTabs[activeIndex]?.payload || [];

    // 🛑 Check max 3 images per screen  adding
    const imageCount = currentPayload.filter(
      (payloadItem) => payloadItem.type === "image"
    ).length;
    if (item.type === "image" && imageCount >= 3) {
      toast.error("You can add only 3 images per screen.");
      return;
    }

    // 🛑 Check max 2  ImageCarousel per screen  adding
    const imageCarouselCount = currentPayload.filter(
      (payloadItem) => payloadItem.type === "imageCarousel"
    ).length;
    if (item.type === "imageCarousel" && imageCarouselCount >= 2) {
      toast.error("You can add only 2 imageCarousel per screen.");
      return;
    }

    // 🛑 Check max 5  opt-in per screen  adding
    const opt_inCount = currentPayload.filter(
      (payloadItem) => payloadItem.type === "optin"
    ).length;
    if (item.type === "optin" && opt_inCount >= 5) {
      toast.error("You can add only 5 optin per screen.");
      return;
    }

    // 🛑 Check max 2  embeddedLink per screen  adding
    const embeddedlinkCount = currentPayload.filter(
      (payloadItem) => payloadItem.type === "embeddedlink"
    ).length;
    if (item.type === "embeddedlink" && embeddedlinkCount >= 2) {
      toast.error("You can add only 2 embeddedlink per screen.");
      return;
    }

    // 🛑 Check for media/document conflict
    if (onlyOneMediaItem.includes(item.type)) {
      const hasMedia = currentPayload.some(
        (payloadItem) => payloadItem.type === "media"
      );
      const hasDocument = currentPayload.some(
        (payloadItem) => payloadItem.type === "document"
      );

      if (
        (item.type === "media" && hasDocument) ||
        (item.type === "document" && hasMedia)
      ) {
        toast.error(
          `Cannot add "${item.type}" when "${
            hasMedia ? "media" : "document"
          }" already exists.`
        );
        return;
      }
    }

    // 🛑 Check for media/document conflict
    if (onlyOneDateOrCalendar.includes(item.type)) {
      const hasDate = currentPayload.some(
        (payloadItem) => payloadItem.type === "date"
      );
      const hasCalendar = currentPayload.some(
        (payloadItem) => payloadItem.type === "calendar"
      );

      if (
        (item.type === "date" && hasCalendar) ||
        (item.type === "calendar" && hasDate)
      ) {
        toast.error(
          `Cannot add "${item.type}" when "${
            hasDate ? "date" : "calendar"
          }" already exists.`
        );
        return;
      }
    }

    // ✅ Optional: Check for duplicates among nonDuplicateTabs
    const shouldCheckDuplicate = nonDuplicateTabs.includes(item.type);

    if (shouldCheckDuplicate) {
      const isDuplicate = currentPayload.some(
        (payloadItem) => payloadItem.type === item.type
      );

      if (isDuplicate) {
        toast.error(`Only one "${item.type}" allowed in the canvas.`);
        return;
      }
    }

    // ✅ Add the item
    newTabs[activeIndex] = {
      ...newTabs[activeIndex],
      payload: [
        ...currentPayload,
        { type: item.type, value: "", status: 0, storeId: uniqueId },
      ],
    };

    setTabs(newTabs);
    toast.success(`"${item.type}" added successfully`);
  };

  // useEffect(() => {
  //   console.log("1454", tabs);
  // }, [tabs]);

  // const handleEdit = (index, item) => {
  //   console.log("indexxxxxxxxxxxx", index)
  //   console.log("itemmmmmmmmmmmmm", item)
  //   tabs[activeIndex].payload[index];
  //   setSelectedItem({ ...tabs[activeIndex].payload[index], index });
  // };

  const handleEdit = (index, item) => {
    const type = item.type;

    // Extract prefill value based on type
    let prefillValue = "";
    let prefillValueOfTexts = "";
    let prefilledradioBtn = "";

    if (type === "textInput" || type === "textArea") {
      const key = type === "textInput" ? "textInput_1" : "textArea_1";
      prefillValueOfTexts = item.texts?.[key] || "";
    } else if (
      type === "heading" ||
      type === "subheading" ||
      type === "textbody" ||
      type === "textcaption"
    ) {
      prefillValue = item[type] || "";
    } else if (type === "radioButton") {
      const radioKeys = Object.keys(item.radioButton || {}).filter((key) =>
        key.startsWith("radioButton_")
      );
      console.log("radioKeys", radioKeys);
      const key = radioKeys[0];
      const radioOptions =
        item?.radioButton?.radioButton_1?.["data-source"] || [];

      radioOptions.forEach((option, index) => {
        setDraft({
          title: option.title || "",
          description: option.description || "",
          metadata: option.metadata || "",
          image: option.image || "",
          altText: option.altText || "", // If altText exists in option
        });
      });
    } else if (type === "footerbutton") {
      prefillValue = item.footer?.footer_1?.center_caption || "";
    }

    setSelectedItem({ ...item, index, status: 1 });

    // heading
    setHeadingValue(prefillValue);

    // textBtn
    setLabelValue(prefillValueOfTexts?.helper_text);
    setSelectedOptionsType(prefillValueOfTexts?.value);
    setPlaceholderValue(prefillValueOfTexts?.label);
    setErrorValue(prefillValueOfTexts?.error_message);
    setMinValue(prefillValueOfTexts?.min_chars);
    setMaxValue(prefillValueOfTexts?.max_chars);
    setSwitchChecked(prefillValueOfTexts?.required);

    // radioBtn
  };

  const handleSave = (updatedData) => {
    setTabs((prevTabs) => {
      const newTabs = [...prevTabs];
      if (
        updatedData.index !== undefined &&
        newTabs[activeIndex].payload[updatedData.index]
      ) {
        newTabs[activeIndex].payload[updatedData.index] = {
          ...newTabs[activeIndex].payload[updatedData.index],
          value: updatedData.value || "",
          options: updatedData.options || [],
          checked: updatedData.checked || [],
          selectedOption: updatedData.selectedOption || "",
          ...updatedData,
        };
        console.log("all tabs content when save within tabs", newTabs);
      } else {
        console.error("Invalid index in updatedData:", updatedData.index);
      }
      return newTabs;
    });
    setSelectedItem(null);

    if (
      updatedData.text ||
      updatedData.label ||
      updatedData.footer.footer_1.label ||
      updatedData.src
    ) {
      dispatch(
        updateFlowItem({
          id: updatedData.storeId,
          data: {
            status: 1,
          },
        })
      );
    }
  };

  // Close the edit panel
  const handleCloseEditPanel = () => {
    setSelectedItem(null);
  };

  const handleComponentUpdate = (updatedData) => {
    if (selectedItem?.type !== "richText") return;

    const { index, text, content, ...rest } = updatedData;

    if (index === undefined) {
      console.error("Invalid index in updatedData:", updatedData);
      return;
    }

    setTabs((prevTabs) => {
      const newTabs = [...prevTabs];
      const currentPayload = newTabs[activeIndex].payload;

      if (!Array.isArray(currentPayload) || index >= currentPayload.length) {
        console.error(
          "Invalid index or payload format:",
          index,
          currentPayload
        );
        return prevTabs;
      }

      currentPayload[index] = {
        ...currentPayload[index],
        value: text?.[0] ?? "",
        content,
        ...rest,
      };

      return newTabs;
    });
  };

  useEffect(() => {
    console.log("tabs", tabs);
  }, [tabs]);

  const hasActiveFlows = Object.values(flowItems || {}).some(
    (flow) => flow.status === 0
  );

  // ==================================Main Flow Build start===========================
  async function handleFlowBuild() {
    const hasAtLeastOneComponent = tabs.some((tab) => tab.payload.length > 0);

    if (!hasAtLeastOneComponent) {
      toast.error("Please add at least one component before building the flow");
      return;
    }

    if (!flowName) {
      toast.error("Please Enter FlowName");
      return;
    }

    // if (hasActiveFlows) {
    //   toast.error("Please fill all items or all errors should be resolved!");
    //   return;
    // }

    try {
      const payload = generatePayload(tabs);

      const params = {
        category: state?.selectCategories,
        waba: state?.selectedWaba,
        id: "",
        name: flowName,
      };

      setIsLoading(true);
      console.log("Calling saveFlow with:", params, payload);

      const res = await saveFlow(params, payload);
      console.log("Response from saveFlow final payload:", res);

      if (!res || (typeof res === "object" && Object.keys(res).length === 0)) {
        toast.error("Flow creation failed. Please try again.");
        return;
      }

      if (res && Object.keys(res).length === 0 && res.constructor === Object) {
        return toast.error("Flow creation failed");
      }

      if (res.flag === false) {
        const backendError =
          res?.error_user_msg?.error?.error_user_msg ||
          res?.msg?.validation_errors?.[0]?.message ||
          "Something went wrong while creating the flow.";

        toast.error(backendError);
        return;
      }

      if (!res.flag) {
        return toast.error(res.error_user_msg.error.error_user_msg);
      }

      if (res.flag === true && typeof res.msg === "string") {
        toast.success(res.msg);
        // navigate("/wwhatsappflows"); // uncomment when navigation is needed
        return;
      }

      if (res.flag === true && res.msg?.validation_errors?.length > 0) {
        const firstError = res.msg.validation_errors[0]?.message;
        toast.error(firstError || "Flow JSON is not valid.");
        return;
      }

      toast.error("Unexpected response. Please try again.");
    } catch (err) {
      console.error("Unexpected API error:", err);
      const fallbackMessage =
        err?.error_user_msg?.error?.error_user_msg ||
        err?.message ||
        "An unexpected error occurred. Please try again.";

      toast.error(fallbackMessage);
      // return toast.error(e.error_user_msg);
    } finally {
      setIsLoading(false);
    }
  }
  // ==================================Main Flow Build End===========================

  // ========================================Localsave and export start=====================
  const [savedLocalFlows, setSavedLocalFlows] = useState([]);
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  const hasErrors = errors.length > 0;

  // Local Save function
  function handleLocalSave() {
    const hasAtLeastOneComponent = tabs.some((tab) => tab.payload.length > 0);
    if (!hasAtLeastOneComponent)
      return toast.error("Add at least one component.");
    if (!flowName) return toast.error("Enter flow name.");

    const payload = generatePayload(tabs);
    const localFlow = {
      id: crypto.randomUUID(),
      name: flowName,
      category: state?.selectCategories,
      waba: state?.selectedWaba,
      payload,
      savedAt: new Date().toISOString(),
    };

    setSavedLocalFlows((prev) => [...prev, localFlow]);
    toast.success("Flow saved locally. Ready to export.");
  }

  // Export Function
  function exportFlowAsJson(flow) {
    const blob = new Blob([JSON.stringify(flow.payload, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${flow.name}_${flow.savedAt}.json`;
    link.click();
  }

  // ========================================Localsave and export end=====================

  return (
    <div className="p rounded-2xl shadow-lg">
      <div className="relative rounded-xl overflow-hidden shadow-md z-50">
        <div className="relative z-10 bg-gradient-to-tr from-indigo-100 via-blue-50 to-purple-100 px-3 py-3 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300">
          <ParticleBackground />
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <div className="bg-white shadow-md p-2 rounded-full">
              <TiFlowSwitch className="text-indigo-600 text-xl" />
            </div>
            <div className="flex gap-5 items-center">
              <h1 className="text-lg font-semibold text-indigo-900 tracking-tight">
                Design Your WhatsApp Automation Flow
              </h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 items-center w-full sm:w-auto"
          >
            <motion.div
              transition={{ duration: 0.1, delay: 0.1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col w-full sm:w-auto"
            >
              <input
                id="flowname"
                name="flowname"
                type="text"
                placeholder="Enter a unique flow name"
                value={flowName}
                onChange={(e) => {
                  const noSpaces = e.target.value.replace(/\s/g, "");
                  setFlowName(noSpaces);
                }}
                className="px-3 py-1.5 border border-indigo-300 bg-white text-[0.82rem] rounded-md shadow-sm focus:ring-1 focus:ring-indigo-300 focus:outline-none sm:min-w-[250px]"
              />
            </motion.div>

            <div className="flex items-center gap-3 justify-between relative">
              {/* Error Dialog Box Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.1, delay: 0.2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setShowErrors((prev) => !prev)}
                className="px-4 py-2 rounded-md font-medium text-sm shadow-sm transition duration-300 flex items-center gap-1 bg-red-100 text-red-700 hover:bg-red-200 relative cursor-pointer justify-center"
              >
                <ErrorOutlineOutlinedIcon sx={{ fontSize: "1.2rem" }} />
                Errors
                <span className="bg-red-600 text-white text-xs font-medium h-5 w-5 flex items-center justify-center  rounded-full">
                  {
                    Object.values(flowItems || {}).filter(
                      (flow) => flow.status === 0
                    ).length
                  }
                </span>
                <ExpandMoreIcon
                  className={`transform transition ${
                    showErrors ? "rotate-180" : "rotate-0"
                  }`}
                />
              </motion.button>

              {/* Build Flow Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.1, delay: 0.3 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleFlowBuild}
                // disabled={isLoading}
                disabled={isLoading || hasErrors}
                className={`px-5 py-2 rounded-md text-nowrap font-medium text-sm shadow-sm transition duration-300 flex items-center gap-2 ${
                  isLoading || hasErrors
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-indigo-500 text-white hover:bg-indigo-500 cursor-pointer"
                }`}
              >
                <ConstructionOutlinedIcon sx={{ fontSize: "1.3rem" }} />
                {isLoading ? "Building..." : "Build Flow"}
              </motion.button>

              {/* Save flow Button */}
              <CustomTooltip
                title="Save the current flow configuration. This will validate inputs and prepare the flow for export."
                placement="top"
                arrow
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleLocalSave}
                  transition={{ duration: 0.1, delay: 0.4 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`px-5 py-2 rounded-md text-nowrap font-medium text-sm shadow-sm transition duration-300 flex items-center gap-2 bg-indigo-500 text-white hover:bg-indigo-500 cursor-pointer`}
                >
                  <SettingsOutlinedIcon sx={{ fontSize: "1.2rem" }} />
                  Save (Offline)
                </motion.button>
              </CustomTooltip>

              {/* Export button */}
              <CustomTooltip
                title="Export the flow in JSON format. Ensure all configuration errors are resolved before exporting. [Save flow first!]"
                placement="top"
                arrow
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.1, delay: 0.5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
                  className={`px-5 py-2 rounded-md text-nowrap font-medium text-sm shadow-sm transition duration-300 flex items-center gap-2 bg-indigo-500 text-white hover:bg-indigo-500 cursor-pointer`}
                >
                  <FileUploadOutlinedIcon sx={{ fontSize: "1.2rem" }} />
                  Export
                </motion.button>
              </CustomTooltip>
            </div>
          </motion.div>
        </div>
      </div>

      {showErrors && (
        <Paper
          elevation={4}
          sx={{
            zIndex: 1500,
            borderRadius: 3,
            boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
          }}
          className="absolute top-35 right-82 w-86 bg-white overflow-scroll min-w-[280px] max-w-full  z-100"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{ userSelect: "text" }}
          >
            <div className="px-3 py-2 border-b text-sm text-center font-semibold text-red-700">
              Configuration Errors
            </div>
            <div className="max-h-60 overflow-y-auto divide-y">
              {Object.values(flowItems || {}).filter(
                (flow) => flow.status === 0
              ).length > 0 ? (
                <table className="min-w-full border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-4 py-2 text-left w-35">
                        Screen Name
                      </th>
                      <th className="border px-4 py-2 text-left">Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(flowItems || {})
                      .filter((flow) => flow.status === 0)
                      .map((flow, idx) => (
                        <tr key={flow.id || idx}>
                          <td className="border px-4 py-2 font-medium">
                            {flow.screenId}
                          </td>
                          <td className="border px-4 py-2">
                            <div className="flex flex-col gap-1">
                              <span>{flow.type} is empty.</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-4 text-sm text-green-600 flex items-center gap-2">
                  <CheckCircleOutlineIcon
                    className="text-green-500"
                    fontSize="small"
                  />
                  No configuration issues found.
                </div>
              )}
            </div>
          </motion.div>
        </Paper>
      )}

      {exportDropdownOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-37 right-7 z-50 bg-white shadow-md border rounded-md w-76 max-h-72 overflow-y-auto"
        >
          {savedLocalFlows.length > 0 ? (
            savedLocalFlows.map((flow) => (
              <div
                key={flow.id}
                className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800 font-medium border-b"
                onClick={() => exportFlowAsJson(flow)}
              >
                {flow.name} – {new Date(flow.savedAt).toLocaleString()}{" "}
                <DownloadForOfflineOutlinedIcon
                  sx={{ fontSize: "1.2rem", color: "green" }}
                />
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              <p className="font-medium text-gray-700 mb-1">
                No saved flows yet
              </p>
              <p className="text-xs">
                First, create and save a flow. Your saved flows will appear here
                and can be downloaded as{" "}
                <span className="font-semibold text-blue-600">JSON Format</span>
                .
              </p>
            </div>
          )}
        </motion.div>
      )}

      <div className="flex gap-2 items-start mt-3">
        {/* Siddebar */}
        <div className="flex-1">
          <Sidebar onAdd={handleAddItem} flexGrow={1} />
        </div>
        <div className="w-full flex relative">
          {/* Canvas */}
          <Canvas
            items={canvasItems}
            setItems={setCanvasItems}
            onEdit={handleEdit}
            tabs={tabs}
            setTabs={setTabs}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            dialogVisible={dialogVisible}
            setDialogVisible={setDialogVisible}
            setEditDialogVisible={setEditDialogVisible}
            editDialogVisible={editDialogVisible}
            screenName={screenName}
            setScreenName={setScreenName}
            screenEditName={screenEditName}
            setScreenEditName={setScreenEditName}
            screenID={screenID}
            setScreenID={setScreenID}
            randomNumber={randomNumber}
            setRandomNumber={setRandomNumber}
            createTab={createTab}
            setCreateTab={setCreateTab}
            menuRefs={menuRefs}
          />
          {selectedItem && (
            <EditPanel
              // key={selectedItem.id}
              selectedItem={selectedItem}
              onClose={handleCloseEditPanel}
              onSave={handleSave}
              headingValue={headingValue}
              setHeadingValue={setHeadingValue}
              labelValue={labelValue}
              setLabelValue={setLabelValue}
              selectedOptionsType={selectedOptionsType}
              setSelectedOptionsType={setSelectedOptionsType}
              setPlaceholderValue={setPlaceholderValue}
              placeholderValue={placeholderValue}
              minValue={minValue}
              setMinValue={setMinValue}
              maxValue={maxValue}
              setMaxValue={setMaxValue}
              errorValue={errorValue}
              setErrorValue={setErrorValue}
              switchChecked={switchChecked}
              setSwitchChecked={setSwitchChecked}
              radioBtnLabel={radioBtnLabel}
              setRadioBtnLabel={setRadioBtnLabel}
              radioButtonOptions={radioButtonOptions}
              setRadioButtonOptions={setRadioButtonOptions}
              radiobtnEditIdx={radiobtnEditIdx}
              setRadiobtnEditIdx={setRadiobtnEditIdx}
              radioImageFile={radioImageFile}
              setRadioImageFile={setRadioImageFile}
              radioImageSrc={radioImageSrc}
              setRadioImageSrc={setRadioImageSrc}
              uploadedRadioImgId={uploadedRadioImgId}
              radioOptions={radioOptions}
              setRadioOptions={setRadioOptions}
              draft={draft}
              setDraft={setDraft}
              activeIndex={activeIndex}
              handleComponentUpdate={handleComponentUpdate}
            />
          )}
        </div>

        <div className="flex-1 ">
          {/* Mobile Panel Preview*/}
          <MobilePanel
            items={tabs[activeIndex].payload}
            screenTitle={tabs[activeIndex].title}
            onUpdateItem={(index, updater) => {
              setTabs((prevTabs) => {
                const newTabs = [...prevTabs];
                newTabs[activeIndex].payload[index] = updater(
                  newTabs[activeIndex].payload[index]
                );
                return newTabs;
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FlowCreationPage;
