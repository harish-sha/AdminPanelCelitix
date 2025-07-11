import React, { useState, useEffect, useRef } from "react";
import AnimatedDropdown from "../../components/AnimatedDropdown";
import UniversalButton from "../../components/UniversalButton";
import { Dialog } from "primereact/dialog";
import { useDispatch } from "react-redux";
import { updateFlowItem } from "../redux/features/FlowSlice";
import InputField from "../../components/InputField";
import UniversalLabel from "@/whatsapp/components/UniversalLabel";
import { MdSettings, MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import Chip from "@mui/material/Chip";
import {
  Switch,
  FormControl,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UniversalDatePicker from "../../components/UniversalDatePicker";
import { useSelector } from "react-redux";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  MiniMap,
  Controls,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const IfElseBlock = ({ openIfElse, setOpenIfElse, onSave, selectedItem }) => {
  const [selectedCondition, setSelectedCondition] = useState();
  const [selectedThenComponent, setSelectedThenComponent] = useState();
  const [selectedElseComponent, setSelectedElseComponent] = useState();
  const [value, setValue] = useState("");
  const [condition, setCondition] = useState();
  // const [thenComponents, setThenComponents] = useState();
  // const [elseComponents, setElseComponents] = useState();
  const [componentTree, setComponentTree] = useState({});
  const [thenBranchText, setThenBranchText] = useState("");
  const [elseBranchText, setElseBranchText] = useState("");
  const [selectedFlowItem, setSelectedFlowItem] = useState("");

  const [thenComponents, setThenComponents] = useState([]);
  const [elseComponents, setElseComponents] = useState([]);

  console.log("thenComponents", thenComponents);

  const handleAddThenItem = () => {
    setThenComponents((prev) => [...prev, { value: "", text: "" }]);
  };

  const handleAddElseItem = () => {
    setElseComponents((prev) => [...prev, { value: "", text: "" }]);
  };

  const handleThenTextChange = (index, newText) => {
    setThenComponents((prev) => {
      const updated = [...prev];
      updated[index].text = newText;
      return updated;
    });
  };

  const handleElseTextChange = (index, newText) => {
    setElseComponents((prev) => {
      const updated = [...prev];
      updated[index].text = newText;
      return updated;
    });
  };

  const handleThenChange = (index, newValue) => {
    setThenComponents((prev) => {
      const updated = [...prev];
      updated[index].value = newValue;
      return updated;
    });
  };

  const handleElseChange = (index, newValue) => {
    setElseComponents((prev) => {
      const updated = [...prev];
      updated[index].value = newValue;
      return updated;
    });
  };

  const handleThenComponentChange = (index, field, value) => {
    setThenComponents((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleElseComponentChange = (index, field, value) => {
    setElseComponents((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const flowItems = useSelector((state) => state.flows.canvasItems);

  //------------- input components start-------------------

  const [thenInputLabel, setThenInputLabel] = useState("");
  const [thenInputType, setThenInputType] = useState("");
  const [thenInputPlaceholder, setThenInputPlaceholder] = useState("");
  const [thenInputError, setThenInputError] = useState("");
  const [thenMinLength, setThenMinLength] = useState("");
  const [thenMaxLength, setThenMaxLength] = useState("");
  const [thenIsRequired, setThenIsRequired] = useState(false);

  const [elseInputLabel, setElseInputLabel] = useState("");
  const [elseInputType, setElseInputType] = useState("");
  const [elseInputPlaceholder, setElseInputPlaceholder] = useState("");
  const [elseInputError, setElseInputError] = useState("");
  const [elseMinLength, setElseMinLength] = useState("");
  const [elseMaxLength, setElseMaxLength] = useState("");
  const [elseIsRequired, setElseIsRequired] = useState(false);

  //------------------input components end---------------------

  //------------------text area components start---------------------

  const [thenTextAreaLabel, setThenTextAreaLabel] = useState("");
  const [thenTextAreaPlaceholder, setThenTextAreaPlaceholder] = useState("");
  const [thenTextAreaError, setThenTextAreaError] = useState("");
  const [thenTextAreaRequired, setThenTextAreaRequired] = useState(false);

  const [elseTextAreaLabel, setElseTextAreaLabel] = useState("");
  const [elseTextAreaPlaceholder, setElseTextAreaPlaceholder] = useState("");
  const [elseTextAreaError, setElseTextAreaError] = useState("");
  const [elseTextAreaRequired, setElseTextAreaRequired] = useState(false);

  //------------------text area components ends---------------------

  //------------------checkbox components starts---------------------

  const [thenMainLabelCheckbox, setThenMainLabelCheckbox] = useState("");
  const [thenCheckBoxes, setThenCheckBoxes] = useState([]);
  const [thenCheckboxRequired, setThenCheckboxRequired] = useState(false);
  const [thenDraftCheckbox, setThenDraftCheckbox] = useState({
    title: "",
    description: "",
    metadata: "",
    image: "",
  });
  const [thenCheckboxEditIdx, setThenCheckboxEditIdx] = useState(null);
  const [elseMainLabelCheckbox, setElseMainLabelCheckbox] = useState("");
  const [elseCheckBoxes, setElseCheckBoxes] = useState([]);
  const [elseCheckboxRequired, setElseCheckboxRequired] = useState(false);
  const [elseDraftCheckbox, setElseDraftCheckbox] = useState({
    title: "",
    description: "",
    metadata: "",
    image: "",
  });
  const [elseCheckboxEditIdx, setElseCheckboxEditIdx] = useState(null);

  //------------------checkbox components ends---------------------

  //------------------optin components starts---------------------

  const [thenOptLabel, setThenOptLabel] = useState("");
  const [elseOptLabel, setElseOptLabel] = useState("");

  const [thenOptAction, setThenOptAction] = useState("");
  const [elseOptAction, setElseOptAction] = useState("");

  const [thenOptUrl, setThenOptUrl] = useState("");
  const [elseOptUrl, setElseOptUrl] = useState("");

  const [thenOptRequired, setThenOptRequired] = useState(false);
  const [elseOptRequired, setElseOptRequired] = useState(false);

  const [thenOptScreenName, setThenOptScreenName] = useState("");
  const [elseOptScreenName, setElseOptScreenName] = useState("");

  //------------------optin components ends---------------------

  //------------------Image components starts---------------------

  const [thenImageFile, setThenImageFile] = useState(null);
  const [elseImageFile, setElseImageFile] = useState(null);

  const [thenScaleType, setThenScaleType] = useState("contain");
  const [elseScaleType, setElseScaleType] = useState("contain");

  const [thenImgAltText, setThenImgAltText] = useState("");
  const [elseImgAltText, setElseImgAltText] = useState("");

  const thenImageInputRef = useRef();
  const elseImageInputRef = useRef();

  //------------------Image components ends---------------------

  //------------------ Dropdown components starts---------------

  const [thenMainLabelDropdown, setThenMainLabelDropdown] = useState("");
  const [elseMainLabelDropdown, setElseMainLabelDropdown] = useState("");

  const [thenDropdownRequired, setThenDropdownRequired] = useState(false);
  const [elseDropdownRequired, setElseDropdownRequired] = useState(false);

  const [thenOptions, setThenOptions] = useState([]);
  const [elseOptions, setElseOptions] = useState([]);

  const [thenEditingIdx, setThenEditingIdx] = useState(null);
  const [elseEditingIdx, setElseEditingIdx] = useState(null);

  const [thenDraftTitle, setThenDraftTitle] = useState("");
  const [elseDraftTitle, setElseDraftTitle] = useState("");

  const [thenDraftDescription, setThenDraftDescription] = useState("");
  const [elseDraftDescription, setElseDraftDescription] = useState("");

  const [thenDraftMetadata, setThenDraftMetadata] = useState("");
  const [elseDraftMetadata, setElseDraftMetadata] = useState("");

  const [thenCurrentOption, setThenCurrentOption] = useState({});
  const [elseCurrentOption, setElseCurrentOption] = useState({});

  const thenDropImageInputRef = useRef();
  const elseDropImageInputRef = useRef();

  //------------------ Dropdown Component ends-------------------------

  //------------------ embeddedLink Component starts-------------------

  const [thenText, setThenText] = useState("");
  const [elseText, setElseText] = useState("");

  const [thenOnClickAction, setThenOnClickAction] = useState("");
  const [elseOnClickAction, setElseOnClickAction] = useState("");

  const [thenSelectedScreenName, setThenSelectedScreenName] = useState("");
  const [elseSelectedScreenName, setElseSelectedScreenName] = useState("");

  const [thenEmbeddedLinkUrl, setThenEmbeddedLinkUrl] = useState("");
  const [elseEmbeddedLinkUrl, setElseEmbeddedLinkUrl] = useState("");

  const allscreenName = useSelector((state) => state.flows.screenName) || {};

  const optScreenNameOptions = Object.values(allscreenName).map(
    (screen, index) => ({
      label: screen.screenName || `Screen ${index + 1}`,
      value: screen.screenName || `Screen ${index + 1}`,
    })
  );

  //------------------ embeddedLink Component ends-------------------

  //------------------ date picker Component starts-------------------

  const [thenDateLabel, setThenDateLabel] = useState("");
  const [elseDateLabel, setElseDateLabel] = useState("");

  const [thenDatePlaceholder, setThenDatePlaceholder] = useState("");
  const [elseDatePlaceholder, setElseDatePlaceholder] = useState("");

  const [thenMinDate, setThenMinDate] = useState(null);
  const [elseMinDate, setElseMinDate] = useState(null);

  const [thenMaxDate, setThenMaxDate] = useState(null);
  const [elseMaxDate, setElseMaxDate] = useState(null);

  const [thenUnavailableDate, setThenUnavailableDate] = useState([]);
  const [elseUnavailableDate, setElseUnavailableDate] = useState([]);

  //------------------ date picker Component ends-------------------

  //------------------ footer Component starts-------------------

  const [thenFooterButtonLabel, setThenFooterButtonLabel] = useState("");
  const [elseFooterButtonLabel, setElseFooterButtonLabel] = useState("");

  const [thenCenterCaption, setThenCenterCaption] = useState("");
  const [elseCenterCaption, setElseCenterCaption] = useState("");

  const [thenNextAction, setThenNextAction] = useState("");
  const [elseNextAction, setElseNextAction] = useState("");

  //------------------ footer Component ends-------------------

  const [radioDraft, setRadioDraft] = useState({
    title: "",
    description: "",
    metadata: "",
    image: "",
  });
  const [radioEditOptionIdx, setRadioEditOptionIdx] = useState(null);
  const radioImageInputRef = useRef();

  // const generateBranchPayload = (branchType) => {
  //   const type =
  //     branchType === "then" ? selectedThenComponent : selectedElseComponent;
  //   let payload = { type };

  //   // Text components
  //   if (
  //     ["TextHeading", "TextSubheading", "TextBody", "TextCaption"].includes(
  //       type
  //     )
  //   ) {
  //     payload.text = branchType === "then" ? thenBranchText : elseBranchText;
  //   }

  //   // TextArea
  //   else if (type === "textArea") {
  //     payload.label =
  //       branchType === "then" ? thenTextAreaLabel : elseTextAreaLabel;
  //     payload.placeholder =
  //       branchType === "then"
  //         ? thenTextAreaPlaceholder
  //         : elseTextAreaPlaceholder;
  //     payload.error =
  //       branchType === "then" ? thenTextAreaError : elseTextAreaError;
  //     payload.required =
  //       branchType === "then" ? thenTextAreaRequired : elseTextAreaRequired;
  //   }

  //   // CheckBox
  //   else if (type === "checkBox") {
  //     payload.mainLabel =
  //       branchType === "then" ? thenMainLabelCheckbox : elseMainLabelCheckbox;
  //     payload.options = branchType === "then" ? thenCheckBoxes : elseCheckBoxes;
  //     payload.required =
  //       branchType === "then" ? thenCheckboxRequired : elseCheckboxRequired;
  //   }

  //   // Dropdown
  //   else if (type === "dropDown") {
  //     payload.mainLabel =
  //       branchType === "then" ? thenMainLabelDropdown : elseMainLabelDropdown;
  //     payload.options = branchType === "then" ? thenOptions : elseOptions;
  //     payload.required =
  //       branchType === "then" ? thenDropdownRequired : elseDropdownRequired;
  //   }

  //   // Optin
  //   else if (type === "optin") {
  //     payload.label = branchType === "then" ? thenOptLabel : elseOptLabel;
  //     payload.required =
  //       branchType === "then" ? thenOptInRequired : elseOptInRequired;
  //     payload.action = branchType === "then" ? thenOptAction : elseOptAction;
  //     payload.url = branchType === "then" ? thenOptUrl : elseOptUrl;
  //     payload.screenName =
  //       branchType === "then"
  //         ? thenOptSelectedScreenName
  //         : elseOptSelectedScreenName;
  //   }

  //   // You can keep adding cases for other types as needed (image, date, footerbutton, etc.)

  //   return payload;
  // };

  
  const handleRadioBtnAddNew = () => {
  const newOption = {
    id: Date.now(),
    title: "New Option",
    description: "",
    metadata: "",
    image: "",
  };

  handleComponentChange(index, "radioButtonOptions", (prev = []) => [
    ...prev,
    newOption,
  ]);
};

  const generateBranchPayload = (branchType) => {
    const components = branchType === "then" ? thenComponents : elseComponents;

    return components.map((item) => {
      console.log("item", item);
      const payload = {
        type: item.value,
      };

      // Text components
      if (
        ["TextHeading", "TextSubheading", "TextBody", "TextCaption"].includes(
          item.value
        )
      ) {
        payload.text = item.text;
      }

      // TextInput
      else if (item.value === "TextInput") {
        payload.label = item.inputLabel;
        payload.inputType = item.inputType;
        payload.placeholder = item.inputPlaceholder;
        payload.error = item.inputError;
        payload.minLength = item.minLength;
        payload.maxLength = item.maxLength;
        payload.required = item.required;
      }

      // TextArea
      else if (item.value === "TextArea") {
        payload.label = item.areaLabel;
        payload.placeholder = item.areaPlaceholder;
        payload.error = item.areaError;
        payload.text = item.text;
      }

      // Checkbox
      else if (item.value === "CheckboxGroup") {
        payload.mainLabel = item.mainLabel;
        payload.options = item.options;
      }

      // Dropdown
      else if (item.value === "Dropdown") {
        payload.mainLabel = item.mainLabel;
        payload.options = item.options;
      }

      // Optin
      else if (item.value === "OptIn") {
        payload.label = item.label;
        payload.action = item.action;
        payload.screenName = item.screenName;
      }

      // Image
      else if (item.value === "Image") {
        payload.imageUrl = item.imageUrl;
        payload.altText = item.altText;
      }

      // Date
      else if (item.value === "DatePicker") {
        payload.dateLabel = item.dateLabel;
        payload.datePlaceholder = item.datePlaceholder;
        payload.maxDate = item.maxDate;
        payload.minDate = item.minDate;
        payload.unavailableDate = item.unavailableDate;
      }

      // Footer button
      else if (item.value === "FooterButton") {
        payload.centerCaption = item.centerCaption;
        payload.footerButtonLabel = item.footerButtonLabel;
        payload.nextAction = item.nextAction;
      }

      // Extend for other types similarly!

      return payload;
    });
  };

  const dispatch = useDispatch();

  const handleIfElseSave = () => {
    if (!selectedCondition) {
      toast.error("Please Enter condition first");
      return;
    }
    const payload = {
      condition: selectedCondition,
      then: generateBranchPayload("then"),
      else: generateBranchPayload("else"),
    };

    console.log("payload", payload);

    const updatedData = {
      ...selectedItem,
      ...payload,
      status: 1,
    };

    onSave(updatedData);

    dispatch(
      updateFlowItem({
        id: updatedData.storeId,
        data: {
          status: 1,
        },
      })
    );
    setOpenIfElse(false);
  };

  // handlesave for Then
  const handleThenBranchSave = () => {
    const thenPayload = generateBranchPayload("then");

    const updatedData = {
      ...selectedItem,
      then: [thenPayload],
      status: 1,
    };

    onSave(updatedData);
    toast.success("Then branch saved successfully.");
  };

  // handleSave for Else
  const handleElseBranchSave = () => {
    const elsePayload = generateBranchPayload("else");

    const updatedData = {
      ...selectedItem,
      else: [elsePayload],
      status: 1,
    };

    onSave(updatedData);
    toast.success("Else branch saved successfully.");
  };

  const allowedComponents = [
    { label: "Heading", value: "TextHeading" },
    { label: "Sub Heading", value: "TextSubheading" },
    { label: "Text Body", value: "TextBody" },
    { label: "Text Caption", value: "TextCaption" },
    { label: "Text Input", value: "TextInput" },
    { label: "Text Area", value: "TextArea" },
    { label: "Checkbox", value: "CheckboxGroup" },
    { label: "Dropdown", value: "Dropdown" },
    { label: "Date Picker", value: "DatePicker" },
    { label: "Embedded Link", value: "EmbeddedLink" },
    { label: "Image", value: "Image" },
    { label: "Opt-in", value: "OptIn" },
    { label: "RadioButtons", value: "RadioButtonsGroup" },
    { label: "Switch", value: "Switch" },
    { label: "Footer Button", value: "Footer" },
    { label: "If-Else", value: "If" },
  ];

  // components start
  const renderTextBranchInput = (item, index, branchType) => {
    if (
      ["TextHeading", "TextSubheading", "TextBody", "TextCaption"].includes(
        item.value
      )
    ) {
      const value = item.text;
      const setValue =
        branchType === "then" ? handleThenTextChange : handleElseTextChange;

      return (
        <div className="mt-3 w-1/2">
          <InputField
            placeholder={`${
              branchType === "then" ? "Then" : "Else"
            } branch text`}
            className="w-full p-1 rounded text-black"
            value={value}
            onChange={(e) => setValue(index, e.target.value)}
          />
        </div>
      );
    }

    return null;
  };

  const CustomNode = ({ id, data }) => {
    return (
      <div
        className="bg-white rounded shadow relative border border-gray-300 p-2"
        style={{ minWidth: "180px", textAlign: "left" }}
      >
        {/* Icons */}
        <button
          onClick={() => data.onSettings(id)}
          className="absolute -top-2 -left-2 bg-gray-200 p-1 rounded-full hover:bg-gray-100"
        >
          <MdSettings size={16} />
        </button>
        <button
          onClick={() => data.onDelete(id)}
          className="absolute -top-2 -right-2 bg-gray-200 p-1 rounded-full hover:bg-gray-100"
        >
          <MdClose size={16} />
        </button>

        {/* Node label */}
        <div className="font-semibold mb-2 text-center">{data.label}</div>

        {/* Render each option row with its own handle */}
        {data.options && data.options.length > 0 ? (
          data.options.map((option, idx) => (
            <div
              key={idx}
              className="flex items-center bg-gray-100 rounded p-1 m-1 text-sm relative"
            >
              <div className="flex-1">{option.title}</div>

              {/* Handle next to each option */}
              <Handle
                type="source"
                position="right"
                id={`option-${idx}`}
                style={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: "-15px",
                  background: "#555",
                }}
              />
            </div>
          ))
        ) : (
          <Handle
            type="source"
            position="right"
            id="single"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              right: "-6px",
              background: "#555",
            }}
          />
        )}

        <Handle type="target" position="left" />
      </div>
    );
  };

  const nodeTypes = {
    customNode: CustomNode,
  };

  const renderTextInputBranch = (item, index, branchType) => {
    if (item.value === "TextInput") {
      // Choose the correct handler based on branch type
      const handleComponentChange =
        branchType === "then"
          ? handleThenComponentChange
          : handleElseComponentChange;

      return (
        <div className="mt-3 space-y-3 w-1/2">
          <InputField
            label="Input Label"
            placeholder="Enter input label"
            tooltipContent="Enter input label"
            tooltipPlacement="right"
            className="w-full p-1 rounded text-black"
            value={item.inputLabel || ""}
            onChange={(e) =>
              handleComponentChange(index, "inputLabel", e.target.value)
            }
          />
          <AnimatedDropdown
            label="Select Input Type"
            tooltipContent="Select input type (select text for default)"
            tooltipPlacement="right"
            value={item.inputType}
            onChange={(value) =>
              handleComponentChange(index, "inputType", value)
            }
            placeholder="Select Type"
          />
          <InputField
            label="Helper Text"
            type="text"
            placeholder="Enter helper text"
            tooltipContent="Enter helper text"
            tooltipPlacement="right"
            value={item.inputPlaceholder || ""}
            onChange={(e) =>
              handleComponentChange(index, "inputPlaceholder", e.target.value)
            }
          />
          <InputField
            label="Error Message"
            placeholder="Enter error message"
            tooltipContent="Enter error message"
            tooltipPlacement="right"
            value={item.inputError || ""}
            onChange={(e) =>
              handleComponentChange(index, "inputError", e.target.value)
            }
          />
          <div className="flex gap-2">
            <InputField
              label="Min Length"
              type="number"
              placeholder="Min Length"
              tooltipContent="Enter minimum length"
              tooltipPlacement="right"
              value={item.minLength || ""}
              onChange={(e) =>
                handleComponentChange(index, "minLength", e.target.value)
              }
            />
            <InputField
              label="Max Length"
              type="number"
              placeholder="Max Length"
              tooltipContent="Enter maximum length"
              tooltipPlacement="right"
              value={item.maxLength || ""}
              onChange={(e) =>
                handleComponentChange(index, "maxLength", e.target.value)
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <UniversalLabel
              htmlFor="required"
              className="text-sm font-medium text-gray-700"
              text="Required?"
              tooltipContent="Set required field for TextInput"
              tooltipPlacement="top"
            />
            <input
              type="checkbox"
              checked={item.required || false}
              onChange={(e) =>
                handleComponentChange(index, "required", e.target.checked)
              }
            />
          </div>
        </div>
      );
    }

    return null;
  };

  const renderTextAreaBranch = (item, index, branchType) => {
    if (item.value === "TextArea") {
      // Use your unified handler
      const handleComponentChange =
        branchType === "then"
          ? handleThenComponentChange
          : handleElseComponentChange;

      return (
        <div className="mt-3 space-y-3 w-1/2">
          <InputField
            label="TextArea Label"
            placeholder="Enter TextArea Label"
            tooltipContent="Edit TextArea Label"
            tooltipPlacement="right"
            value={item.areaLabel || ""}
            maxLength={50}
            onChange={(e) =>
              handleComponentChange(index, "areaLabel", e.target.value)
            }
          />
          <InputField
            label="Helper Text"
            type="text"
            placeholder="Enter placeholder for TextArea"
            tooltipContent="Enter placeholder"
            tooltipPlacement="right"
            value={item.areaPlaceholder || ""}
            maxLength={100}
            onChange={(e) =>
              handleComponentChange(index, "areaPlaceholder", e.target.value)
            }
          />
          <InputField
            label="Error Message"
            placeholder="Enter Error Message"
            tooltipContent="Enter error message for TextArea"
            tooltipPlacement="right"
            value={item.areaError || ""}
            onChange={(e) =>
              handleComponentChange(index, "areaError", e.target.value)
            }
          />

          <div className="flex items-end gap-2">
            <UniversalLabel
              htmlFor="textarea_required"
              className="text-sm font-medium text-gray-700"
              text="Required?"
              tooltipContent="Set required field for TextArea"
              tooltipPlacement="top"
            />
            <div className="flex items-center">
              <Switch
                checked={item.areaRequired || false}
                onCheckedChange={(checked) =>
                  handleComponentChange(index, "areaRequired", checked)
                }
                id="textarea_required"
              />
              <span className="text-sm">
                {item.areaRequired ? "True" : "False"}
              </span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderCheckBoxBranch = (item, index, branchType) => {
    if (item.value === "CheckboxGroup") {
      const handleComponentChange =
        branchType === "then"
          ? handleThenComponentChange
          : handleElseComponentChange;

      const options = item.options || [];
      const draft = item.draft || {
        title: "",
        description: "",
        metadata: "",
        image: "",
      };
      const editIdx = item.editIdx ?? null;

      return (
        <FormControl fullWidth>
          <div className="mb-2 mt-3 space-y-3 w-1/2">
            <InputField
              label="Checkbox Group Label"
              tooltipContent="Enter Checkbox Group Label"
              tooltipPlacement="right"
              value={item.mainLabel || ""}
              maxLength={30}
              onChange={(e) =>
                handleComponentChange(index, "mainLabel", e.target.value)
              }
              placeholder="Enter label"
              fullWidth
            />
            <div className="mt-2">
              <UniversalLabel
                htmlFor="checkbox_required"
                className="text-sm font-medium text-gray-700"
                tooltipContent="Set required field for Checkbox"
                tooltipPlacement="top"
                text="Required"
              />
              <div className="flex items-center gap-2">
                <Switch
                  checked={item.required || false}
                  onCheckedChange={(checked) =>
                    handleComponentChange(index, "required", checked)
                  }
                  id="checkbox_required"
                />
                <span>{item.required ? "True" : "False"}</span>
              </div>
            </div>
          </div>

          {options.map((opt, idx) => {
            const isEditing = idx === editIdx;
            return (
              <Box
                key={opt.id || idx}
                sx={{
                  mb: 1,
                  p: 1,
                  border: "1px solid #ccc",
                  borderRadius: 1,
                  bgcolor: isEditing ? "#f5f5f5" : "white",
                }}
              >
                {isEditing ? (
                  <div className="space-y-3 w-1/2">
                    <InputField
                      label="Title"
                      placeholder="Enter Title"
                      tooltipContent="Enter Title"
                      tooltipPlacement="right"
                      value={draft.title}
                      maxLength={30}
                      onChange={(e) => {
                        const newDraft = { ...draft, title: e.target.value };
                        handleComponentChange(index, "draft", newDraft);
                      }}
                      fullWidth
                    />
                    <InputField
                      label="Description"
                      placeholder="Enter Description"
                      tooltipContent="Enter Description"
                      tooltipPlacement="right"
                      value={draft.description}
                      maxLength={300}
                      onChange={(e) => {
                        const newDraft = {
                          ...draft,
                          description: e.target.value,
                        };
                        handleComponentChange(index, "draft", newDraft);
                      }}
                      fullWidth
                    />
                    <InputField
                      label="Metadata"
                      placeholder="Enter MetaData"
                      tooltipContent="Enter MetaData"
                      tooltipPlacement="right"
                      value={draft.metadata}
                      maxLength={20}
                      onChange={(e) => {
                        const newDraft = { ...draft, metadata: e.target.value };
                        handleComponentChange(index, "draft", newDraft);
                      }}
                      fullWidth
                    />

                    <Box sx={{ display: "flex", mb: 1 }}>
                      <InputField
                        label="Upload Image"
                        type="file"
                        id="checkbox-file-upload"
                        accept=".png, .jpeg"
                        tooltipContent="Upload Image"
                        tooltipPlacement="right"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              const newDraft = {
                                ...draft,
                                image: reader.result,
                              };
                              handleComponentChange(index, "draft", newDraft);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </Box>

                    {draft.image && (
                      <p className="text-green-600 text-sm font-medium mt-1">
                        Image uploaded
                      </p>
                    )}

                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        mt: 2,
                        justifyContent: "center",
                      }}
                    >
                      <UniversalButton
                        label="Save"
                        disabled={!draft.metadata.trim()}
                        onClick={() => {
                          const updatedOptions = [...options];
                          updatedOptions[idx] = { ...draft };
                          handleComponentChange(
                            index,
                            "options",
                            updatedOptions
                          );
                          handleComponentChange(index, "editIdx", null);
                          handleComponentChange(index, "draft", {
                            title: "",
                            description: "",
                            metadata: "",
                            image: "",
                          });
                        }}
                      />
                      <UniversalButton
                        label="Cancel"
                        onClick={() => {
                          handleComponentChange(index, "editIdx", null);
                          handleComponentChange(index, "draft", {
                            title: "",
                            description: "",
                            metadata: "",
                            image: "",
                          });
                        }}
                      />
                    </Box>
                  </div>
                ) : (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box
                      sx={{ flexGrow: 1, minWidth: 0 }}
                      onClick={() => {
                        handleComponentChange(index, "draft", { ...opt });
                        handleComponentChange(index, "editIdx", idx);
                      }}
                    >
                      <Typography variant="subtitle1">{opt.title}</Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                        }}
                      >
                        {opt.description}
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={() => {
                        handleComponentChange(index, "draft", { ...opt });
                        handleComponentChange(index, "editIdx", idx);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        const updatedOptions = options.filter(
                          (_, i) => i !== idx
                        );
                        handleComponentChange(index, "options", updatedOptions);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            );
          })}

          <div className="flex flex-row justify-center items-center gap-2 py-1 px-2">
            <UniversalButton
              label="Add Option"
              onClick={() => {
                const newOptions = [
                  ...options,
                  {
                    title: "New Option",
                    description: "",
                    metadata: "",
                    image: "",
                  },
                ];
                handleComponentChange(index, "options", newOptions);
              }}
            />
            <UniversalButton
              label="Save Checkbox Group"
              onClick={() => {
                console.log("Saved checkbox group:", options);
              }}
            />
          </div>
        </FormControl>
      );
    }

    return null;
  };

  const renderOptInBranchInput = (item, index, branchType) => {
    if (item.value === "OptIn") {
      const handleComponentChange =
        branchType === "then"
          ? handleThenComponentChange
          : handleElseComponentChange;

      return (
        <div className="space-y-3 mt-3 w-1/2">
          <InputField
            label="OPT-In Label"
            placeholder="Enter Label"
            type="text"
            maxLength={120}
            tooltipContent="Enter label text shown in screen (max 120)"
            value={item.label || ""}
            onChange={(e) =>
              handleComponentChange(index, "label", e.target.value)
            }
          />
          <p className="text-gray-600 text-xs">
            Chars: {item.label ? item.label.length : 0}/120
          </p>

          <div className="mt-2 flex items-end">
            <UniversalLabel
              htmlFor="required"
              className="text-sm font-medium text-gray-700"
              tooltipContent="Set required field for Opt-In"
              tooltipPlacement="top"
              text="Required"
            />
            <div className="flex items-center">
              <Switch
                checked={item.required || false}
                onCheckedChange={(checked) =>
                  handleComponentChange(index, "required", checked)
                }
                id="required"
              />
              <span className="text-sm">
                {item.required ? "True" : "False"}
              </span>
            </div>
          </div>

          <AnimatedDropdown
            id="next-action"
            label="Action"
            options={[
              { value: "navigate", label: "Navigate" },
              { value: "open_url", label: "Open URL" },
            ]}
            tooltipContent="[navigate = screen navigation], [open_url = URL link]"
            value={item.action || ""}
            onChange={(value) => handleComponentChange(index, "action", value)}
          />

          {item.action === "navigate" && (
            <AnimatedDropdown
              id="screen-name"
              label="List Of Screen Name"
              tooltipContent="List Of Screen Name"
              tooltipPlacement="right"
              options={optScreenNameOptions}
              value={item.screenName || ""}
              onChange={(value) =>
                handleComponentChange(index, "screenName", value)
              }
            />
          )}

          {item.action === "open_url" && (
            <InputField
              label="URL"
              placeholder="Enter the URL to open"
              type="text"
              tooltipContent="Provide URL to open when user clicks opt-in"
              value={item.url || ""}
              onChange={(e) =>
                handleComponentChange(index, "url", e.target.value)
              }
            />
          )}
        </div>
      );
    }

    return null;
  };

  const renderImageBranchInput = (item, index, branchType) => {
    if (item.value === "image") {
      const handleComponentChange =
        branchType === "then"
          ? handleThenComponentChange
          : handleElseComponentChange;

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            handleComponentChange(index, "imageFile", reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

      const handleImageDelete = () => {
        handleComponentChange(index, "imageFile", null);
      };

      return (
        <div className="space-y-3 mt-3 w-1/2">
          <div className="flex justify-center items-center gap-2">
            <InputField
              label="Upload Image"
              type="file"
              id={`file-upload-${index}`}
              accept=".png, .jpeg"
              tooltipContent="Upload Image"
              tooltipPlacement="right"
              required={true}
              onChange={handleImageChange}
            />

            <button onClick={handleImageDelete}>
              <DeleteOutlineIcon
                sx={{
                  fontSize: "23px",
                  marginTop: 3,
                  color: "#ef4444",
                }}
              />
            </button>
          </div>

          {item.imageFile && (
            <p className="text-green-600 text-sm font-medium mt-1">
              Image uploaded
            </p>
          )}

          <AnimatedDropdown
            label="Scale-Type"
            tooltipContent="Select Scale-Type"
            tooltipPlacement="right"
            value={item.scaleType || ""}
            options={[
              { value: "contain", label: "Contain" },
              { value: "cover", label: "Cover" },
            ]}
            onChange={(value) =>
              handleComponentChange(index, "scaleType", value)
            }
          />

          <InputField
            label="Alt-Text"
            placeholder="Enter Alt-Text"
            tooltipContent="Alt-Text"
            tooltipPlacement="right"
            value={item.imgAltText || ""}
            type="text"
            onChange={(e) =>
              handleComponentChange(index, "imgAltText", e.target.value)
            }
          />
        </div>
      );
    }

    return null;
  };

  const renderDropdownBranchInput = (item, index, branchType) => {
    if (item.value === "Dropdown") {
      const handleComponentChange =
        branchType === "then"
          ? handleThenComponentChange
          : handleElseComponentChange;

      // ──────────────
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            handleComponentChange(index, "image", reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

      const handleFileDelete = () => {
        handleComponentChange(index, "image", "");
      };

      // ──────────────
      return (
        <FormControl fullWidth>
          <div className="mb-2 mt-3 space-y-3 w-1/2">
            <InputField
              label="Label"
              id="mainlabel"
              tooltipContent="Enter Main Label"
              tooltipPlacement="right"
              maxLength={20}
              value={item.mainLabel || ""}
              onChange={(e) =>
                handleComponentChange(index, "mainLabel", e.target.value)
              }
              placeholder="Enter label"
              type="text"
              fullWidth
            />

            <div>
              <UniversalLabel
                htmlFor={`dropdown_required_${index}`}
                className="text-sm font-medium text-gray-700"
                tooltipContent="Select if required"
                tooltipPlacement="top"
                text="Required"
              />
              <div className="flex items-center gap-2">
                <Switch
                  checked={item.required || false}
                  onChange={(e) =>
                    handleComponentChange(index, "required", e.target.checked)
                  }
                  id={`dropdown_required_${index}`}
                />
                <span>{item.required ? "True" : "False"}</span>
              </div>
            </div>
          </div>

          {(item.options || []).map((opt, optIdx) => {
            const isEditing = optIdx === item.editingIdx;

            return (
              <Box
                key={optIdx}
                sx={{
                  mb: 1,
                  p: 1,
                  border: "1px solid #ddd",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  bgcolor: isEditing ? "#f5f5f5" : "white",
                }}
              >
                {isEditing ? (
                  <Box sx={{ flexGrow: 1 }}>
                    <InputField
                      label="Title"
                      tooltipContent="Enter Title"
                      tooltipPlacement="right"
                      maxLength={30}
                      value={opt.title || ""}
                      onChange={(e) => {
                        const updatedOptions = [...item.options];
                        updatedOptions[optIdx] = {
                          ...updatedOptions[optIdx],
                          title: e.target.value,
                        };
                        handleComponentChange(index, "options", updatedOptions);
                      }}
                      placeholder="Enter title"
                      type="text"
                      fullWidth
                      autoFocus
                    />
                    <InputField
                      label="Description"
                      tooltipContent="Enter Description"
                      tooltipPlacement="right"
                      maxLength={300}
                      value={opt.description || ""}
                      onChange={(e) => {
                        const updatedOptions = [...item.options];
                        updatedOptions[optIdx] = {
                          ...updatedOptions[optIdx],
                          description: e.target.value,
                        };
                        handleComponentChange(index, "options", updatedOptions);
                      }}
                      placeholder="Enter description"
                      type="text"
                      fullWidth
                    />
                    <InputField
                      label="Metadata"
                      tooltipContent="Enter Metadata"
                      tooltipPlacement="right"
                      maxLength={20}
                      value={opt.metadata || ""}
                      onChange={(e) => {
                        const updatedOptions = [...item.options];
                        updatedOptions[optIdx] = {
                          ...updatedOptions[optIdx],
                          metadata: e.target.value,
                        };
                        handleComponentChange(index, "options", updatedOptions);
                      }}
                      placeholder="Enter metadata"
                      type="text"
                      fullWidth
                    />

                    <Box sx={{ display: "flex", mb: 1 }}>
                      <InputField
                        label="Upload Image"
                        type="file"
                        accept=".png, .jpeg"
                        tooltipContent="Upload Image"
                        tooltipPlacement="right"
                        onChange={handleImageChange}
                      />

                      <button onClick={handleFileDelete}>
                        <DeleteOutlineIcon
                          sx={{
                            fontSize: "23px",
                            marginTop: 3,
                            color: "#ef4444",
                          }}
                        />
                      </button>
                    </Box>

                    {opt.image && (
                      <p className="text-green-600 text-sm font-medium mt-1">
                        Image uploaded
                      </p>
                    )}

                    <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                      <UniversalButton
                        label="Save"
                        onClick={() => {
                          handleComponentChange(index, "editingIdx", null);
                        }}
                        disabled={!opt.title.trim() || !opt.metadata.trim()}
                      />
                      <UniversalButton
                        label="Cancel"
                        onClick={() => {
                          handleComponentChange(index, "editingIdx", null);
                        }}
                      />
                    </Box>
                  </Box>
                ) : (
                  <>
                    <Box
                      sx={{ flexGrow: 1, cursor: "pointer", minWidth: 0 }}
                      onClick={() =>
                        handleComponentChange(index, "editingIdx", optIdx)
                      }
                    >
                      <Typography variant="subtitle1">{opt.title}</Typography>
                      {opt.description && (
                        <Typography
                          variant="body2"
                          sx={{
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                          }}
                        >
                          {opt.description}
                        </Typography>
                      )}
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleComponentChange(index, "editingIdx", optIdx)
                      }
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => {
                        const updatedOptions = item.options.filter(
                          (_, i) => i !== optIdx
                        );
                        handleComponentChange(index, "options", updatedOptions);
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </>
                )}
              </Box>
            );
          })}

          <div className="flex justify-center items-center gap-2">
            <Box sx={{ mt: 1 }}>
              <UniversalButton
                label="Add Option"
                onClick={() => {
                  const updatedOptions = [
                    ...(item.options || []),
                    {
                      title: "New Option",
                      description: "",
                      metadata: "",
                      image: "",
                    },
                  ];
                  handleComponentChange(index, "options", updatedOptions);
                }}
              />
            </Box>
          </div>
        </FormControl>
      );
    }

    return null;
  };

  const renderEmbeddedLinkBranchInput = (item, index, branchType) => {
    if (item.value === "EmbeddedLink") {
      const handleComponentChange =
        branchType === "then"
          ? handleThenComponentChange
          : handleElseComponentChange;

      const handleSave = () => {
        console.log("Saved Embedded Link:", {
          text: item.text,
          onClickAction: item.onClickAction,
          selectedScreenName: item.selectedScreenName,
          embeddedLinkUrl: item.embeddedLinkUrl,
        });
      };

      return (
        <div className="mt-5 w-1/2">
          <div className="mb-2">
            <InputField
              label="Text"
              type="text"
              maxLength={25}
              value={item.text || ""}
              tooltipContent="Enter label which displays on screen (max 25 chars)"
              tooltipPlacement="right"
              placeholder="Button Embedded Link"
              onChange={(e) =>
                handleComponentChange(index, "text", e.target.value)
              }
            />
          </div>
          <p className="text-gray-600 text-xs mb-2">
            Chars: {(item.text || "").length}/25
          </p>

          <div className="mb-2">
            <AnimatedDropdown
              id={`next-action-${index}`}
              label="Next Action"
              tooltipContent="[navigate = ensure screen exists to navigate to],[open_url = enter URL to redirect]"
              tooltipPlacement="right"
              options={[
                { value: "navigate", label: "Navigate" },
                { value: "open_url", label: "Open URL" },
              ]}
              value={item.onClickAction || ""}
              onChange={(value) =>
                handleComponentChange(index, "onClickAction", value)
              }
            />
          </div>

          {item.onClickAction === "navigate" && (
            <>
              <AnimatedDropdown
                id={`screen-name-${index}`}
                label="List of Screen Name"
                tooltipContent="Select screen where you want to navigate the user"
                tooltipPlacement="right"
                options={screenNameOptions}
                value={item.selectedScreenName || ""}
                onChange={(value) =>
                  handleComponentChange(index, "selectedScreenName", value)
                }
              />
              <span className="text-xs">
                NOTE: Create or select a screen where you want to navigate the
                user
              </span>
            </>
          )}

          {item.onClickAction === "open_url" && (
            <InputField
              label="URL"
              placeholder="Enter the URL to open"
              type="text"
              tooltipContent="Provide the URL to open when user clicks Read more"
              value={item.embeddedLinkUrl || ""}
              onChange={(e) =>
                handleComponentChange(index, "embeddedLinkUrl", e.target.value)
              }
            />
          )}

          <div className="flex justify-center mt-5">
            <UniversalButton label="Save" onClick={handleSave} />
          </div>
        </div>
      );
    }

    return null;
  };

  const renderDateBranchInput = (item, index, branchType) => {
    if (item.value === "DatePicker") {
      const handleComponentChange =
        branchType === "then"
          ? handleThenComponentChange
          : handleElseComponentChange;

      const handleAddUnavailableDate = (value) => {
        if (value) {
          handleComponentChange(index, "unavailableDate", [
            ...(item.unavailableDate || []),
            value,
          ]);
        }
      };

      const handleDeleteUnavailableDate = (i) => {
        const updatedDates = (item.unavailableDate || []).filter(
          (_, idx) => idx !== i
        );
        handleComponentChange(index, "unavailableDate", updatedDates);
      };

      const handleSave = () => {
        console.log("Saved Date config:", {
          dateLabel: item.dateLabel,
          datePlaceholder: item.datePlaceholder,
          minDate: item.minDate,
          maxDate: item.maxDate,
          unavailableDate: item.unavailableDate,
        });
      };

      return (
        <div className="space-y-3 mt-3 w-1/2">
          <InputField
            label="Date Label"
            placeholder="Enter Date Label"
            tooltipContent="Enter Date Label"
            tooltipPlacement="right"
            maxLength={40}
            value={item.dateLabel || ""}
            onChange={(e) =>
              handleComponentChange(index, "dateLabel", e.target.value)
            }
          />

          <InputField
            label="Helper Text"
            placeholder="Enter Placeholder for Date"
            tooltipContent="Enter Placeholder for Date"
            tooltipPlacement="right"
            value={item.datePlaceholder || ""}
            onChange={(e) =>
              handleComponentChange(index, "datePlaceholder", e.target.value)
            }
          />

          <UniversalDatePicker
            label="Min-Date"
            tooltipContent="Select Min-Date"
            tooltipPlacement="right"
            value={item.minDate || null}
            onChange={(value) => handleComponentChange(index, "minDate", value)}
          />

          <UniversalDatePicker
            label="Max-Date"
            tooltipContent="Select Max-Date"
            tooltipPlacement="right"
            value={item.maxDate || null}
            onChange={(value) => handleComponentChange(index, "maxDate", value)}
            minDate={item.minDate}
            disabled={!item.minDate}
          />

          <UniversalDatePicker
            label="Unavailable Dates"
            tooltipContent="Select Unavailable-Date"
            tooltipPlacement="right"
            value={null}
            onChange={handleAddUnavailableDate}
            disabled={!item.minDate || !item.maxDate}
            minDate={item.minDate}
            maxDate={item.maxDate}
          />

          <div className="flex flex-wrap gap-2 mt-2">
            {(item.unavailableDate || []).map((date, i) => (
              <Chip
                key={i}
                sx={{ padding: 1 }}
                label={new Date(date).toLocaleDateString()}
                onDelete={() => handleDeleteUnavailableDate(i)}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <UniversalButton label="Save" onClick={handleSave} />
          </div>
        </div>
      );
    }

    return null;
  };

  const renderFooterBranchInput = (item, index, branchType) => {
    if (item.value === "Footer") {
      const handleComponentChange =
        branchType === "then"
          ? handleThenComponentChange
          : handleElseComponentChange;

      const handleSave = () => {
        console.log("Saved Footer Button config:", {
          footerButtonLabel: item.footerButtonLabel,
          centerCaption: item.centerCaption,
          nextAction: item.nextAction,
        });
      };

      return (
        <div className="mb-2 text-lg space-y-3 mt-3 w-1/2">
          <InputField
            label="Footer Button Label"
            placeholder="Enter Footer Button Label"
            tooltipContent="Enter Label"
            tooltipPlacement="right"
            maxLength={35}
            id="footer-button-label"
            value={item.footerButtonLabel || ""}
            onChange={(e) =>
              handleComponentChange(index, "footerButtonLabel", e.target.value)
            }
          />

          <InputField
            label="Center Caption"
            placeholder="Enter Center Caption"
            tooltipContent="Enter Center Caption"
            tooltipPlacement="right"
            maxLength={15}
            id="center-caption"
            value={item.centerCaption || ""}
            onChange={(e) =>
              handleComponentChange(index, "centerCaption", e.target.value)
            }
          />

          <AnimatedDropdown
            id="next-action"
            label="Next Action"
            tooltipContent="Select Option"
            tooltipPlacement="right"
            options={[
              { value: "complete", label: "Complete" },
              { value: "navigate", label: "Navigate" },
            ]}
            value={item.nextAction || ""}
            onChange={(val) => handleComponentChange(index, "nextAction", val)}
          />

          <div className="flex justify-center">
            <UniversalButton label="SAVE" onClick={handleSave} />
          </div>
        </div>
      );
    }

    return null;
  };

  const renderRadioButtonBranch = (item, index, branchType) => {
    if (item.value !== "RadioButtonsGroup") return null;

    const handleComponentChange =
      branchType === "then"
        ? handleThenComponentChange
        : handleElseComponentChange;

    const handleRadioBtnAddNew = () => {
      handleComponentChange(index, "radioButtonOptions", (prev = []) => [
        ...prev,
        {
          id: Date.now(), // unique id
          title: "New Option",
          description: "",
          metadata: "",
          image: "",
        },
      ]);
    };

    const isOptEditing = (optIdx) => optIdx === radioEditOptionIdx;

    return (
      <FormControl fullWidth key={index}>
        <div className="mb-2 mt-3 space-y-3 w-1/2">
          <InputField
            label="Radio Group Label"
            tooltipContent="Enter Radio Group Label"
            tooltipPlacement="right"
            maxLength={30}
            value={item.radioBtnLabel || ""}
            onChange={(e) =>
              handleComponentChange(index, "radioBtnLabel", e.target.value)
            }
            placeholder="Enter label"
            fullWidth
          />

          <div className="mt-2">
            <UniversalLabel
              htmlFor="radio_required"
              className="text-sm font-medium text-gray-700"
              tooltipContent="Select an option which is required."
              tooltipPlacement="top"
              text="Required"
            />
            <div className="flex items-center gap-2">
              <Switch
                checked={item.radioRequired || false}
                onCheckedChange={(checked) =>
                  handleComponentChange(index, "radioRequired", checked)
                }
                id="radio_required"
              />
              <span>{item.radioRequired ? "True" : "False"}</span>
            </div>
          </div>
        </div>

        {item?.radioButtonOptions?.map((opt, optIdx) => {
          const editing = isOptEditing(optIdx);

          return (
            <Box
              key={opt.id}
              sx={{
                mb: 1,
                p: 1,
                border: "1px solid #ccc",
                borderRadius: 1,
                bgcolor: editing ? "#f5f5f5" : "white",
              }}
            >
              {editing ? (
                <div className="space-y-3">
                  <InputField
                    label="Title"
                    placeholder="Enter Title"
                    tooltipContent="Enter Title"
                    tooltipPlacement="right"
                    maxLength={30}
                    value={radioDraft.title}
                    onChange={(e) =>
                      setRadioDraft((d) => ({ ...d, title: e.target.value }))
                    }
                    fullWidth
                  />
                  <InputField
                    label="Description"
                    placeholder="Enter Description"
                    tooltipContent="Enter Description"
                    tooltipPlacement="right"
                    maxLength={300}
                    value={radioDraft.description}
                    onChange={(e) =>
                      setRadioDraft((d) => ({
                        ...d,
                        description: e.target.value,
                      }))
                    }
                    fullWidth
                  />
                  <InputField
                    label="Metadata"
                    placeholder="Enter Metadata"
                    tooltipContent="Enter Metadata"
                    tooltipPlacement="right"
                    required
                    maxLength={20}
                    value={radioDraft.metadata.trim()}
                    onChange={(e) =>
                      setRadioDraft((d) => ({ ...d, metadata: e.target.value }))
                    }
                    fullWidth
                  />

                  <Box sx={{ display: "flex", mb: 1 }}>
                    <InputField
                      label="Upload Image"
                      type="file"
                      id="file-upload"
                      accept=".png, .jpeg"
                      tooltipContent="Upload Image"
                      tooltipPlacement="right"
                      required
                      onChange={handleRadioImageChange}
                      ref={radioImageInputRef}
                    />
                    <button onClick={handleDeleteRadioFile}>
                      <DeleteOutlineIcon
                        sx={{
                          fontSize: "23px",
                          marginTop: 3,
                          color: "#ef4444",
                        }}
                      />
                    </button>
                  </Box>

                  {radioDraft.image && (
                    <p className="text-green-600 text-sm font-medium mt-1">
                      Image uploaded
                    </p>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      marginTop: 2,
                      justifyContent: "center",
                    }}
                  >
                    <UniversalButton
                      label="Save"
                      disabled={!radioDraft.metadata.trim()}
                      onClick={() => handleSaveInlineRadio(index, branchType)}
                    />
                    <UniversalButton
                      label="Cancel"
                      onClick={handleCancelInlineRadio}
                    />
                  </Box>
                </div>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{ flexGrow: 1, minWidth: 0 }}
                    onClick={() => handleRadioBtnEdit(optIdx, item)}
                  >
                    <Typography variant="subtitle1">{opt.title}</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      {opt.description}
                    </Typography>
                  </Box>
                  <IconButton onClick={() => handleRadioBtnEdit(optIdx, item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleRemoveRadio(optIdx)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          );
        })}

        <div className="flex flex-row justify-center items-center gap-2 py-1 px-2">
          <UniversalButton label="Add Options" onClick={handleRadioBtnAddNew} />
        </div>
      </FormControl>
    );
  };

  const flowItemsOptions = flowItems
    .filter((item) => item.data.type !== "ifelse")
    .map((item) => {
      const label = item.data.text || item.data.type || item.id;
      return {
        label,
        value: item.id,
      };
    });

  const flowItem = flowItems.find((item) => item.id === selectedFlowItem);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const handleDeleteNode = (nodeId) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));

    // Optionally clear selections
    if (selectedFlowItem?.value === nodeId.replace("node-", "")) {
      setSelectedFlowItem(null);
    }
    if (nodeId === "then-node") {
      setSelectedThenComponent(null);
    }
    if (nodeId === "else-node") {
      setSelectedElseComponent(null);
    }
  };

  console.log("flowItem", flowItem);

  useEffect(() => {
    if (selectedFlowItem && flowItem.data["data-source"]) {
      const newNode = {
        id: `node-${selectedFlowItem}`,
        type: "customNode",
        position: { x: 300, y: 100 },
        data: {
          label: flowItem.data.text || flowItem.data.type || flowItem.id,
          options: flowItem.data["data-source"], // Pass options array
          onDelete: handleDeleteNode,
          onSettings: handleSettingsClick,
        },
      };

      setNodes((nds) => [...nds.filter((n) => n.id !== newNode.id), newNode]);
    }
  }, [selectedFlowItem]);

  useEffect(() => {
    if (selectedThenComponent) {
      const newNode = {
        id: `then-node`,
        type: "customNode",
        position: { x: 300, y: 100 },
        data: { label: selectedThenComponent, onDelete: handleDeleteNode },
      };
      setNodes((nds) => [...nds.filter((n) => n.id !== newNode.id), newNode]);
    }
  }, [selectedThenComponent]);

  useEffect(() => {
    if (selectedElseComponent) {
      const newNode = {
        id: `else-node`,
        type: "customNode",
        position: { x: 300, y: 300 },
        data: { label: selectedElseComponent, onDelete: handleDeleteNode },
      };
      setNodes((nds) => [...nds.filter((n) => n.id !== newNode.id), newNode]);
    }
  }, [selectedElseComponent]);

  const [openThenEditDialog, setOpenThenEditDialog] = useState(false);
  console.log("openThenEditDialog", openThenEditDialog);
  const [openElseEditDialog, setOpenElseEditDialog] = useState(false);

  const handleSettingsClick = (id) => {
    if (id === "then-node") {
      setOpenThenEditDialog(true);
    } else if (id === "else-node") {
      setOpenElseEditDialog(true);
    } else {
      // Optional: open flow item dialog
    }
  };

  // components end
  return (
    <>
      <Dialog
        visible={openIfElse}
        onHide={() => setOpenIfElse(false)}
        style={{ width: "85vw", height: "85vh" }}
        draggable={false}
        header={"IF Else Component"}
      >
        <div className="">
          <div className="flex items-start justify-center gap-2 w-full">
            <div className="w-full h-180 bg-white rounded shadow">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
                fitView
              >
                <Background />
                <Controls />
                {/* <MiniMap /> */}
              </ReactFlow>
            </div>
            <div className="flex flex-col gap-3 w-70">
              <div className="">
                <AnimatedDropdown
                  label="Select Flow Item"
                  tooltipContent="Select a flow item"
                  tooltipPlacement="right"
                  value={selectedFlowItem}
                  options={flowItemsOptions}
                  onChange={(value) => {
                    setSelectedFlowItem(value);
                  }}
                />
              </div>
              <div className="">
                <AnimatedDropdown
                  label="Condition"
                  tooltipContent="Select If-Condition"
                  tooltipPlacement="right"
                  value={selectedCondition}
                  options={[
                    { label: "Equal to (==)", value: "==" },
                    { label: "Not equal to (!=)", value: "!=" },
                    { label: "AND (&&)", value: "&&" },
                    { label: "OR (||)", value: "||" },
                    { label: "Greater than (>)", value: ">" },
                    { label: "Greater than or equal to (>=)", value: ">=" },
                    { label: "Less than (<)", value: "<" },
                    { label: "Less than or equal to (<=)", value: "<=" },
                  ]}
                  onChange={(value) => setSelectedCondition(value)}
                />
              </div>

              <div className="flex items-center gap-4 w-full">
                <div
                  className="h-15 flex-1 bg-gray-400 flex items-center justify-center rounded-md shadow-md cursor-pointer hover:shadow-xl"
                  onClick={() => {
                    const newNode = {
                      id: "then-node",
                      type: "customNode",
                      position: { x: 300, y: 100 },
                      data: {
                        label: "Then",
                        icon: "✅",
                        onDelete: handleDeleteNode,
                        onSettings: handleSettingsClick,
                      },
                    };
                    setNodes((nds) => [
                      ...nds.filter((n) => n.id !== newNode.id),
                      newNode,
                    ]);
                  }}
                >
                  <span className="text-sm font-medium tracking-wider text-white">
                    Add Then
                  </span>
                </div>
                <div
                  className="h-15 flex-1 bg-gray-400 flex items-center justify-center rounded-md shadow-md cursor-pointer hover:shadow-xl"
                  onClick={() => {
                    const newNode = {
                      id: "else-node",
                      type: "customNode",
                      position: { x: 300, y: 300 },
                      data: {
                        label: "Else",
                        icon: "❌",
                        onDelete: handleDeleteNode,
                        onSettings: handleSettingsClick,
                      },
                    };
                    setNodes((nds) => [
                      ...nds.filter((n) => n.id !== newNode.id),
                      newNode,
                    ]);
                  }}
                >
                  <span className="text-sm font-medium tracking-wider text-white">
                    Add Else
                  </span>
                </div>
              </div>

              {/* {selectedThenComponent && (
                <div className="flex items-center gap-3">
                  <p className="font-semibold">Then Component - {selectedThenComponent}</p>
                  <button
                    className="text-blue-600 hover:underline text-sm"
                    onClick={() => setOpenThenEditDialog(true)}
                  >
                    Edit
                  </button>
                </div>
              )}

              {selectedElseComponent && (
                <div className="flex items-center gap-3">
                  <p className="font-semibold">Else Component - {selectedElseComponent}</p>
                  <button
                    className="text-blue-600 hover:underline text-sm"
                    onClick={() => setOpenElseEditDialog(true)}
                  >
                    Edit
                  </button>
                </div>
              )} */}

              {/* Else Dialog Start */}
              {/* <Dialog
                visible={openThenEditDialog}
                onHide={() => setOpenThenEditDialog(false)}
                header="Edit THEN Branch Component"
                style={{ width: "400px" }}
                modal
              >
                <div className="">
                  <AnimatedDropdown
                    label="Then Branch"
                    tooltipContent="Select Then Branch"
                    tooltipPlacement="right"
                    value={selectedThenComponent}
                    options={allowedComponents}
                    onChange={(value) => {
                      setSelectedThenComponent(value);
                    }}
                  />
                </div>
                {selectedThenComponent && (
                  <p className="my-2 font-semibold">
                    Then Component - {selectedThenComponent}
                  </p>
                )}
                {renderTextBranchInput("then")}
                {renderTextInputBranch("then")}
                {renderTextAreaBranch("then")}
                {renderCheckBoxBranch("then")}
                {renderOptInBranchInput("then")}
                {renderImageBranchInput("then")}
                {renderDropdownBranchInput("then")}
                {renderEmbeddedLinkBranchInput("then")}
                {renderDateBranchInput("then")}
                {renderFooterBranchInput("then")}


                {thenComponents.map((item, index) => (
                  <div key={index} className="mt-2 flex justify-left gap-4">
                    <AnimatedDropdown
                      label={`Then Branch ${index + 1}`}
                      tooltipContent="Select Then Branch"
                      tooltipPlacement="right"
                      value={item.value}
                      options={allowedComponents}
                      onChange={(value) => handleThenChange(index, value)}
                    />
                  </div>
                ))}

                <div className="mt-2 flex justify-left gap-4">
                  <UniversalButton label="Add Item" onClick={handleAddThenItem}/>
                </div>
              </Dialog> */}

              <Dialog
                visible={openThenEditDialog}
                onHide={() => setOpenThenEditDialog(false)}
                header="Edit THEN Branch Component"
                style={{ width: "400px" }}
                modal
              >
                {thenComponents.map((item, index) => (
                  <div key={index} className="mt-2 flex flex-col gap-2">
                    <AnimatedDropdown
                      label={`Then Branch ${index + 1}`}
                      tooltipContent="Select Then Branch"
                      tooltipPlacement="right"
                      value={item.value}
                      options={allowedComponents}
                      onChange={(value) => handleThenChange(index, value)}
                    />

                    {item.value && (
                      <p className="my-1 font-semibold text-sm text-gray-700">
                        Then Component - {item.value}
                      </p>
                    )}

                    {renderTextBranchInput(item, index, "then")}
                    {renderTextInputBranch(item, index, "then")}
                    {renderTextAreaBranch(item, index, "then")}
                    {renderCheckBoxBranch(item, index, "then")}
                    {renderOptInBranchInput(item, index, "then")}
                    {renderImageBranchInput(item, index, "then")}
                    {renderDropdownBranchInput(item, index, "then")}
                    {renderEmbeddedLinkBranchInput(item, index, "then")}
                    {renderDateBranchInput(item, index, "then")}
                    {renderFooterBranchInput(item, index, "then")}
                    {renderRadioButtonBranch(item, index, "then")}
                  </div>
                ))}

                <div className="mt-4 flex justify-left gap-4">
                  <UniversalButton
                    label="Add Item"
                    onClick={handleAddThenItem}
                  />
                </div>
              </Dialog>

              {/* Then Dialog End */}

              {/* Else Dialog Start */}
              <Dialog
                visible={openElseEditDialog}
                onHide={() => setOpenElseEditDialog(false)}
                header="Edit ELSE Branch Component"
                style={{ width: "400px" }}
                modal
              >
                {elseComponents.map((item, index) => (
                  <div key={index} className="mt-2 flex flex-col gap-2">
                    <AnimatedDropdown
                      label={`Else Branch ${index + 1}`}
                      tooltipContent="Select Else Branch"
                      tooltipPlacement="right"
                      value={item.value}
                      options={allowedComponents}
                      onChange={(value) => handleElseChange(index, value)}
                    />

                    {item.value && (
                      <p className="my-1 font-semibold text-sm text-gray-700">
                        Else Component - {item.value}
                      </p>
                    )}

                    {renderTextBranchInput(item, index, "else")}
                    {renderTextInputBranch(item, index, "else")}
                    {renderTextAreaBranch(item, index, "else")}
                    {renderCheckBoxBranch(item, index, "else")}
                    {renderOptInBranchInput(item, index, "else")}
                    {renderImageBranchInput(item, index, "else")}
                    {renderDropdownBranchInput(item, index, "else")}
                    {renderEmbeddedLinkBranchInput(item, index, "else")}
                    {renderDateBranchInput(item, index, "else")}
                    {renderFooterBranchInput(item, index, "else")}
                    {renderRadioButtonBranch(item, index, "else")}

                    {/* Add other render functions here, passing item and index if needed */}
                  </div>
                ))}
                <div className="mt-4 flex justify-left gap-4">
                  <UniversalButton
                    label="Add Item"
                    onClick={handleAddElseItem}
                  />
                </div>
              </Dialog>
              {/* Else Dialog End */}

              {/* <div className="">
                <AnimatedDropdown
                  label="Then Branch"
                  tooltipContent="Select Then Branch"
                  tooltipPlacement="right"
                  value={selectedThenComponent}
                  options={allowedComponents}
                  // onChange={(value) => setSelectedThenComponent(value)}
                  onChange={(value) => {
                    setSelectedThenComponent(value);
                    // if (value === "ifelse") {
                    //   setNestedIf(true); // ✅ Set your flag here
                    // } else {
                    //   setNestedIf(false); // optionally reset
                    // }
                  }}
                />
              </div>

              <div className="mt-2">
                <AnimatedDropdown
                  label="Else Branch"
                  tooltipContent="Select Else Branch"
                  tooltipPlacement="right"
                  value={selectedElseComponent}
                  options={allowedComponents}
                  onChange={(value) => {
                    setSelectedElseComponent(value);
                    // if (value === "ifelse") {
                    //   setNestedElse(true); // ✅ Set your flag here
                    // } else {
                    //   setNestedElse(false); // optionally reset
                    // }
                  }}
                />
              </div> */}
            </div>

            <div className="flex justify-center mt-6">
              <UniversalButton label="Save" onClick={handleIfElseSave} />
            </div>
          </div>

          {/* <div className="mt-4">
            <p>{selectedCondition}</p>
            <p>{selectedFlowItem}</p>
            {selectedThenComponent && (
              <p className="my-2 font-semibold">
                Then Component - {selectedThenComponent}
              </p>
            )}
            {renderTextBranchInput("then")}
            {renderTextInputBranch("then")}
            {renderTextAreaBranch("then")}
            {renderCheckBoxBranch("then")}
            {renderOptInBranchInput("then")}
            {renderImageBranchInput("then")}
            {renderDropdownBranchInput("then")}
            {renderEmbeddedLinkBranchInput("then")}
            {renderDateBranchInput("then")}
            {renderFooterBranchInput("then")}

            <div className="mt-4 flex justify-left gap-4">
              <UniversalButton
                label="Save Then Branch"
                onClick={handleThenBranchSave}
              />
            </div>

            {selectedElseComponent && (
              <p className="my-2 font-semibold">
                Else component - {selectedElseComponent}
              </p>
            )}
            {renderTextBranchInput("else")}
            {renderTextInputBranch("else")}
            {renderTextAreaBranch("else")}
            {renderCheckBoxBranch("else")}
            {renderOptInBranchInput("else")}
            {renderImageBranchInput("else")}
            {renderDropdownBranchInput("else")}
            {renderEmbeddedLinkBranchInput("else")}
            {renderDateBranchInput("else")}
            {renderFooterBranchInput("else")}
          </div> */}
        </div>
        {/* <div className="mt-4 flex justify-left gap-4">
          <UniversalButton
            label="Save Else Branch"
            onClick={handleElseBranchSave}
          />
        </div> */}
      </Dialog>
    </>
  );
};

export default IfElseBlock;
