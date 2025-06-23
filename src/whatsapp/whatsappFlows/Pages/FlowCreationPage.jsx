import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Canvas from "../components/Canvas";
import MobilePanel from "../components/MobilePanel";
import EditPanel from "../components/EditPanel";
import UniversalButton from "../../components/UniversalButton";
import { Box, Typography } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import toast from "react-hot-toast";
import { generatePayload } from "../lib/generatePayload";
import { saveFlow } from "@/apis/whatsapp/whatsapp";
import InputField from "@/components/layout/InputField";

const FlowCreationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
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

  // console.log("labelValueeeeeeeeee", labelValue)

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
    console.log("newTabs", newTabs);
    // const nonDuplicateTabs = [
    //   "heading",
    //   "subheading",
    //   "textbody",
    //   "textcaption",
    // ];

    const nonDuplicateTabs = ["document", "media", "date", "calendar"];
    const onlyOneMediaItem = ["document", "media"];
    const onlyOneDateOrCalendar = ["date", "calendar"];

    const currentPayload = newTabs[activeIndex]?.payload || [];

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
      payload: [...currentPayload, { type: item.type, value: "" }],
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
    console.log("itemmmmmmmmmmmmm", item);
    const type = item.type;


    // Extract prefill value based on type
    let prefillValue = "";
    let prefillValueOfTexts = "";
    let prefilledradioBtn = "";

    if (type === "textInput" || type === "textArea") {
      const key = type === "textInput" ? "textInput_1" : "textArea_1";
      prefillValueOfTexts = item.texts?.[key] || "";
      console.log("prefillValueOfTexts", prefillValueOfTexts);
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
      console.log("radioOptions", radioOptions);
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

    setSelectedItem({ ...item, index });

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

  useEffect(()=>{
    console.log("tabbs",tabs)
  },[tabs])

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

  // async function handleFlowSave() {
  //   toast.success("Flow Saved Successfully");
  // }

  return (
    <div className="">
      <div className="bg-white rounded-md shadow-sm px-4 py-3 flex items-center justify-between">
        {/* <span className="text-md font-semibold text-gray-700">
          ChatFlow: {state?.flowName || "Untitled Flow"}
        </span> */}
        <span className="text-md font-semibold text-gray-700">ChatFlow</span>

        <div className="flex items-end gap-3">
          <InputField
            id="flowname"
            name="flowname"
            type="text"
            placeholder="Enter Flow Name"
            label="Enter Flow Name"
            tooltipContent="Enter a unique flow name one waba cannot contain same flow name"
            value={flowName}
            onChange={(e) => {
              const noSpaces = e.target.value.replace(/\s/g, "");
              setFlowName(noSpaces);
            }}
            className="min-w-[200px]"
          />

          {/* <UniversalButton
            icon={<SaveOutlinedIcon sx={{ fontSize: "1.3rem" }} />}
            label="Save"
            onClick={handleFlowSave}
          />

          <UniversalButton
            icon={<SettingsOutlinedIcon sx={{ fontSize: "1.3rem" }} />}
            label="Settings"
          /> */}

          <UniversalButton
            icon={<ConstructionOutlinedIcon sx={{ fontSize: "1.3rem" }} />}
            label={isLoading ? "Building..." : "BuildFlow"}
            onClick={handleFlowBuild}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex gap-3 items-start mt-4">
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
