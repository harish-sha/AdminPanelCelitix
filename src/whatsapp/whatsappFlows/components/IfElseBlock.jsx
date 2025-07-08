import React, { useState, useEffect, useRef } from "react";
import AnimatedDropdown from "../../components/AnimatedDropdown";
import UniversalButton from "../../components/UniversalButton";
import { Dialog } from "primereact/dialog";
import { useDispatch } from "react-redux";
import { updateFlowItem } from "../redux/features/FlowSlice";
import InputField from "../../components/InputField";
import UniversalLabel from "@/whatsapp/components/UniversalLabel";
import toast from "react-hot-toast";
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

const IfElseBlock = ({ openIfElse, setOpenIfElse, onSave, selectedItem }) => {
  const [selectedCondition, setSelectedCondition] = useState();
  const [selectedThenComponent, setSelectedThenComponent] = useState();
  const [selectedElseComponent, setSelectedElseComponent] = useState();
  const [value, setValue] = useState("");
  const [condition, setCondition] = useState();
  const [thenComponents, setThenComponents] = useState();
  const [elseComponents, setElseComponents] = useState();
  const [componentTree, setComponentTree] = useState({});
  const [thenBranchText, setThenBranchText] = useState("");
  const [elseBranchText, setElseBranchText] = useState("");
  const [selectedFlowItem, setSelectedFlowItem] = useState("");
  const flowItems = useSelector((state) => state.flows.canvasItems);

  console.log("flowItems", flowItems);

  //------------- input components start-------------------

  const [thenInputLabel, setThenInputLabel] = useState("");
  const [thenInputType, setThenInputType] = useState("");
  console.log("thenInputLabel", thenInputLabel);
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
  console.log("thenTextAreaLabel", thenTextAreaLabel);
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

  const generateBranchPayload = (branchType) => {
    const type =
      branchType === "then" ? selectedThenComponent : selectedElseComponent;
    let payload = { type };

    // Text components
    if (
      ["TextHeading", "TextSubheading", "TextBody", "TextCaption"].includes(
        type
      )
    ) {
      payload.text = branchType === "then" ? thenBranchText : elseBranchText;
    }

    // TextArea
    else if (type === "textArea") {
      payload.label =
        branchType === "then" ? thenTextAreaLabel : elseTextAreaLabel;
      payload.placeholder =
        branchType === "then"
          ? thenTextAreaPlaceholder
          : elseTextAreaPlaceholder;
      payload.error =
        branchType === "then" ? thenTextAreaError : elseTextAreaError;
      payload.required =
        branchType === "then" ? thenTextAreaRequired : elseTextAreaRequired;
    }

    // CheckBox
    else if (type === "checkBox") {
      payload.mainLabel =
        branchType === "then" ? thenMainLabelCheckbox : elseMainLabelCheckbox;
      payload.options = branchType === "then" ? thenCheckBoxes : elseCheckBoxes;
      payload.required =
        branchType === "then" ? thenCheckboxRequired : elseCheckboxRequired;
    }

    // Dropdown
    else if (type === "dropDown") {
      payload.mainLabel =
        branchType === "then" ? thenMainLabelDropdown : elseMainLabelDropdown;
      payload.options = branchType === "then" ? thenOptions : elseOptions;
      payload.required =
        branchType === "then" ? thenDropdownRequired : elseDropdownRequired;
    }

    // Optin
    else if (type === "optin") {
      payload.label = branchType === "then" ? thenOptLabel : elseOptLabel;
      payload.required =
        branchType === "then" ? thenOptInRequired : elseOptInRequired;
      payload.action = branchType === "then" ? thenOptAction : elseOptAction;
      payload.url = branchType === "then" ? thenOptUrl : elseOptUrl;
      payload.screenName =
        branchType === "then"
          ? thenOptSelectedScreenName
          : elseOptSelectedScreenName;
    }

    // You can keep adding cases for other types as needed (image, date, footerbutton, etc.)

    return payload;
  };

  const dispatch = useDispatch();
  const handleIfElseSave = () => {
    if (!selectedCondition) {
      toast.error("Please Enter condition first");
      return;
    }
    const payload = {
      condition: selectedCondition,
      then: [generateBranchPayload("then")],
      else: [generateBranchPayload("else")],
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

  const allowedComponents = [
    { label: "Heading", value: "TextHeading" },
    { label: "Sub Heading", value: "TextSubheading" },
    { label: "Text Body", value: "TextBody" },
    { label: "Text Caption", value: "TextCaption" },
    { label: "Text Input", value: "TextInput" },
    { label: "Text Area", value: "TextInput" },
    { label: "Checkbox", value: "CheckboxGroup" },
    { label: "Dropdown", value: "Dropdown" },
    { label: "Date Picker", value: "DatePicker" },
    { label: "Embedded Link", value: "EmbeddedLink" },
    { label: "Image", value: "Image" },
    { label: "Opt-in", value: "OptIn" },
    { label: "Switch", value: "Switch" },
    { label: "Footer Button", value: "Footer" },
    { label: "If-Else", value: "If" },
  ];

  // components start
  const renderTextBranchInput = (branchType) => {
    const selectedComponent =
      branchType === "then" ? selectedThenComponent : selectedElseComponent;
    const branchText = branchType === "then" ? thenBranchText : elseBranchText;
    const setBranchText =
      branchType === "then" ? setThenBranchText : setElseBranchText;

    if (
      ["TextHeading", "TextSubheading", "TextBody", "TextCaption"].includes(
        selectedComponent
      )
    ) {
      return (
        <div className="mt-3 w-1/2">
          <InputField
            placeholder={`${
              branchType === "then" ? "Then" : "Else"
            } branch text`}
            className="w-full p-1 rounded text-black"
            value={branchText}
            onChange={(e) => setBranchText(e.target.value)}
          />
        </div>
      );
    }

    return null;
  };

  const renderTextInputBranch = (branchType) => {
    const selectedComponent =
      branchType === "then" ? selectedThenComponent : selectedElseComponent;

    const inputLabel = branchType === "then" ? thenInputLabel : elseInputLabel;
    const setInputLabel =
      branchType === "then" ? setThenInputLabel : setElseInputLabel;

    const inputType = branchType === "then" ? thenInputType : elseInputType;
    const setInputType =
      branchType === "then" ? setThenInputType : setElseInputType;

    const inputPlaceholder =
      branchType === "then" ? thenInputPlaceholder : elseInputPlaceholder;
    const setInputPlaceholder =
      branchType === "then" ? setThenInputPlaceholder : setElseInputPlaceholder;

    const inputError = branchType === "then" ? thenInputError : elseInputError;
    const setInputError =
      branchType === "then" ? setThenInputError : setElseInputError;

    const minLength = branchType === "then" ? thenMinLength : elseMinLength;
    const setMinLength =
      branchType === "then" ? setThenMinLength : setElseMinLength;

    const maxLength = branchType === "then" ? thenMaxLength : elseMaxLength;
    const setMaxLength =
      branchType === "then" ? setThenMaxLength : setElseMaxLength;

    if (["textInput"].includes(selectedComponent)) {
      return (
        <div className="mt-3 space-y-3 w-1/2">
          <InputField
            label="Input Label"
            placeholder="Enter input label"
            tooltipContent="Enter input label"
            tooltipPlacement="right"
            className="w-full p-1 rounded text-black"
            value={inputLabel}
            onChange={(e) => setInputLabel(e.target.value)}
          />
          <AnimatedDropdown
            label="Select Input Type"
            tooltipContent="Select input type (select text for default)"
            tooltipPlacement="right"
            value={inputType}
            onChange={setInputType}
            placeholder="Select Type"
          />
          <InputField
            label="Helper Text"
            type="text"
            placeholder="Enter helper text"
            tooltipContent="Enter helper text"
            tooltipPlacement="right"
            value={inputPlaceholder}
            onChange={(e) => setInputPlaceholder(e.target.value)}
          />
          <InputField
            label="Error Message"
            placeholder="Enter error message"
            tooltipContent="Enter error message"
            tooltipPlacement="right"
            value={inputError}
            onChange={(e) => setInputError(e.target.value)}
          />
          <div className="flex gap-2">
            <InputField
              label="Min Length"
              type="number"
              placeholder="Min Length"
              tooltipContent="Enter minimum length"
              tooltipPlacement="right"
              value={minLength}
              onChange={(e) => setMinLength(e.target.value)}
            />
            <InputField
              label="Max Length"
              type="number"
              placeholder="Max Length"
              tooltipContent="Enter maximum length"
              tooltipPlacement="right"
              value={maxLength}
              onChange={(e) => setMaxLength(e.target.value)}
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
          </div>
        </div>
      );
    }
    return null;
  };

  const renderTextAreaBranch = (branchType) => {
    const selectedComponent =
      branchType === "then" ? selectedThenComponent : selectedElseComponent;

    const areaLabel =
      branchType === "then" ? thenTextAreaLabel : elseTextAreaLabel;
    const setAreaLabel =
      branchType === "then" ? setThenTextAreaLabel : setElseTextAreaLabel;
    console.log("areaLabel", areaLabel);
    const areaPlaceholder =
      branchType === "then" ? thenTextAreaPlaceholder : elseTextAreaPlaceholder;
    const setAreaPlaceholder =
      branchType === "then"
        ? setThenTextAreaPlaceholder
        : setElseTextAreaPlaceholder;

    const areaError =
      branchType === "then" ? thenTextAreaError : elseTextAreaError;
    const setAreaError =
      branchType === "then" ? setThenTextAreaError : setElseTextAreaError;

    const areaRequired =
      branchType === "then" ? thenTextAreaRequired : elseTextAreaRequired;
    const setAreaRequired =
      branchType === "then" ? setThenTextAreaRequired : setElseTextAreaRequired;

    if (["textArea"].includes(selectedComponent)) {
      return (
        <div className="mt-3 space-y-3 w-1/2">
          <InputField
            label="TextArea Label"
            placeholder="Enter TextArea Label"
            tooltipContent="Edit TextArea Label"
            tooltipPlacement="right"
            value={areaLabel}
            maxLength={50}
            onChange={(e) => setAreaLabel(e.target.value)}
          />
          <InputField
            label="Helper Text"
            type="text"
            placeholder="Enter placeholder for TextArea"
            tooltipContent="Enter placeholder"
            tooltipPlacement="right"
            value={areaPlaceholder}
            maxLength={100}
            onChange={(e) => setAreaPlaceholder(e.target.value)}
          />
          <InputField
            label="Error Message"
            placeholder="Enter Error Message"
            tooltipContent="Enter error message for TextArea"
            tooltipPlacement="right"
            value={areaError}
            onChange={(e) => setAreaError(e.target.value)}
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
                checked={areaRequired}
                onChange={(e) => setAreaRequired(e.target.checked)}
                id="textarea_required"
              />
              <span className="text-sm">{areaRequired ? "True" : "False"}</span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderCheckBoxBranch = (branchType) => {
    const selectedComponent =
      branchType === "then" ? selectedThenComponent : selectedElseComponent;

    const mainLabel =
      branchType === "then" ? thenMainLabelCheckbox : elseMainLabelCheckbox;
    const setMainLabel =
      branchType === "then"
        ? setThenMainLabelCheckbox
        : setElseMainLabelCheckbox;

    const options = branchType === "then" ? thenCheckBoxes : elseCheckBoxes;
    const setOptions =
      branchType === "then" ? setThenCheckBoxes : setElseCheckBoxes;

    const required =
      branchType === "then" ? thenCheckboxRequired : elseCheckboxRequired;
    const setRequired =
      branchType === "then" ? setThenCheckboxRequired : setElseCheckboxRequired;

    const draft = branchType === "then" ? thenDraftCheckbox : elseDraftCheckbox;
    const setDraft =
      branchType === "then" ? setThenDraftCheckbox : setElseDraftCheckbox;

    const editIdx =
      branchType === "then" ? thenCheckboxEditIdx : elseCheckboxEditIdx;
    const setEditIdx =
      branchType === "then" ? setThenCheckboxEditIdx : setElseCheckboxEditIdx;

    if (["checkBox"].includes(selectedComponent)) {
      return (
        <FormControl fullWidth>
          <div className="mb-2 mt-3 space-y-3 w-1/2">
            <InputField
              label="Checkbox Group Label"
              tooltipContent="Enter Checkbox Group Label"
              tooltipPlacement="right"
              value={mainLabel}
              maxLength={30}
              onChange={(e) => setMainLabel(e.target.value)}
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
                  checked={required}
                  onChange={(e) => setRequired(e.target.checked)}
                  id="required"
                />
                <span>{required ? "True" : "False"}</span>
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
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, title: e.target.value }))
                      }
                      fullWidth
                    />
                    <InputField
                      label="Description"
                      placeholder="Enter Description"
                      tooltipContent="Enter Description"
                      tooltipPlacement="right"
                      value={draft.description}
                      maxLength={300}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, description: e.target.value }))
                      }
                      fullWidth
                    />
                    <InputField
                      label="Metadata"
                      placeholder="Enter MetaData"
                      tooltipContent="Enter MetaData"
                      tooltipPlacement="right"
                      value={draft.metadata}
                      maxLength={20}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, metadata: e.target.value }))
                      }
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
                          // update draft image on file change
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              setDraft((d) => ({ ...d, image: reader.result }));
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
                          setOptions(updatedOptions);
                          setEditIdx(null);
                        }}
                      />
                      <UniversalButton
                        label="Cancel"
                        onClick={() => {
                          setDraft({
                            title: "",
                            description: "",
                            metadata: "",
                            image: "",
                          });
                          setEditIdx(null);
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
                        setDraft({ ...opt });
                        setEditIdx(idx);
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
                        setDraft({ ...opt });
                        setEditIdx(idx);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        const updatedOptions = options.filter(
                          (_, i) => i !== idx
                        );
                        setOptions(updatedOptions);
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
                setOptions((prev) => [
                  ...prev,
                  {
                    title: "New Option",
                    description: "",
                    metadata: "",
                    image: "",
                  },
                ]);
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

  const renderOptInBranchInput = (branchType) => {
    const selectedComponent =
      branchType === "then" ? selectedThenComponent : selectedElseComponent;

    const optLabel = branchType === "then" ? thenOptLabel : elseOptLabel;
    const setOptLabel =
      branchType === "then" ? setThenOptLabel : setElseOptLabel;

    const optAction = branchType === "then" ? thenOptAction : elseOptAction;
    const setOptAction =
      branchType === "then" ? setThenOptAction : setElseOptAction;

    const optUrl = branchType === "then" ? thenOptUrl : elseOptUrl;
    const setOptUrl = branchType === "then" ? setThenOptUrl : setElseOptUrl;

    const optRequired =
      branchType === "then" ? thenOptRequired : elseOptRequired;
    const setOptRequired =
      branchType === "then" ? setThenOptRequired : setElseOptRequired;

    const optScreenName =
      branchType === "then" ? thenOptScreenName : elseOptScreenName;
    const setOptScreenName =
      branchType === "then" ? setThenOptScreenName : setElseOptScreenName;

    if (selectedComponent === "optin") {
      return (
        <div className="space-y-3 mt-3 w-1/2">
          <InputField
            label="OPT-In Label"
            placeholder="Enter Label"
            type="text"
            maxLength={120}
            tooltipContent="Enter label text shown in screen (max 120)"
            value={optLabel}
            onChange={(e) => setOptLabel(e.target.value)}
          />
          <p className="text-gray-600 text-xs">Chars: {optLabel.length}/120</p>

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
                checked={optRequired}
                onChange={(e) => setOptRequired(e.target.checked)}
                id="required"
              />
              <span className="text-sm">{optRequired ? "True" : "False"}</span>
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
            value={optAction}
            onChange={setOptAction}
          />

          {optAction === "navigate" && (
            <AnimatedDropdown
              id="screen-name"
              label="List Of Screen Name"
              tooltipContent="List Of Screen Name"
              tooltipPlacement="right"
              options={optScreenNameOptions}
              value={optScreenName}
              onChange={setOptScreenName}
            />
          )}

          {optAction === "open_url" && (
            <InputField
              label="URL"
              placeholder="Enter the URL to open"
              type="text"
              tooltipContent="Provide URL to open when user clicks opt-in"
              value={optUrl}
              onChange={(e) => setOptUrl(e.target.value)}
            />
          )}
        </div>
      );
    }

    return null;
  };

  const renderImageBranchInput = (branchType) => {
    const selectedComponent =
      branchType === "then" ? selectedThenComponent : selectedElseComponent;

    const imageFile = branchType === "then" ? thenImageFile : elseImageFile;
    const setImageFile =
      branchType === "then" ? setThenImageFile : setElseImageFile;

    const scaleType = branchType === "then" ? thenScaleType : elseScaleType;
    const setScaleType =
      branchType === "then" ? setThenScaleType : setElseScaleType;

    const imgAltText = branchType === "then" ? thenImgAltText : elseImgAltText;
    const setImgAltText =
      branchType === "then" ? setThenImgAltText : setElseImgAltText;

    const imageInputRef =
      branchType === "then" ? thenImageInputRef : elseImageInputRef;

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageFile(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleImageDelete = () => {
      setImageFile(null);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    };

    if (selectedComponent === "image") {
      return (
        <div className="space-y-3 mt-3 w-1/2">
          <div className="flex justify-center items-center gap-2">
            <InputField
              label="Upload Image"
              type="file"
              id="file-upload"
              accept=".png, .jpeg"
              tooltipContent="Upload Image"
              tooltipPlacement="right"
              required={true}
              onChange={handleImageChange}
              ref={imageInputRef}
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

          {imageFile && (
            <p className="text-green-600 text-sm font-medium mt-1">
              Image uploaded
            </p>
          )}

          <AnimatedDropdown
            label="Scale-Type"
            tooltipContent="Select Scale-Type"
            tooltipPlacement="right"
            value={scaleType}
            options={[
              { value: "contain", label: "Contain" },
              { value: "cover", label: "Cover" },
            ]}
            onChange={setScaleType}
          />

          <InputField
            label="Alt-Text"
            placeholder="Enter Alt-Text"
            tooltipContent="Alt-Text"
            tooltipPlacement="right"
            value={imgAltText}
            type="text"
            onChange={(e) => setImgAltText(e.target.value)}
          />
        </div>
      );
    }

    return null;
  };

  const renderDropdownBranchInput = (branchType) => {
    const selectedComponent =
      branchType === "then" ? selectedThenComponent : selectedElseComponent;

    const mainLabel =
      branchType === "then" ? thenMainLabelDropdown : elseMainLabelDropdown;
    const setMainLabel =
      branchType === "then"
        ? setThenMainLabelDropdown
        : setElseMainLabelDropdown;

    const required =
      branchType === "then" ? thenDropdownRequired : elseDropdownRequired;
    const setRequired =
      branchType === "then" ? setThenDropdownRequired : setElseDropdownRequired;

    const options = branchType === "then" ? thenOptions : elseOptions;
    const setOptions = branchType === "then" ? setThenOptions : setElseOptions;

    const editingIdx = branchType === "then" ? thenEditingIdx : elseEditingIdx;
    const setEditingIdx =
      branchType === "then" ? setThenEditingIdx : setElseEditingIdx;

    const draftTitle = branchType === "then" ? thenDraftTitle : elseDraftTitle;
    const setDraftTitle =
      branchType === "then" ? setThenDraftTitle : setElseDraftTitle;

    const draftDescription =
      branchType === "then" ? thenDraftDescription : elseDraftDescription;
    const setDraftDescription =
      branchType === "then" ? setThenDraftDescription : setElseDraftDescription;

    const draftMetadata =
      branchType === "then" ? thenDraftMetadata : elseDraftMetadata;
    const setDraftMetadata =
      branchType === "then" ? setThenDraftMetadata : setElseDraftMetadata;

    const currentOption =
      branchType === "then" ? thenCurrentOption : elseCurrentOption;
    const setCurrentOption =
      branchType === "then" ? setThenCurrentOption : setElseCurrentOption;

    const dropImageInputRef =
      branchType === "then" ? thenDropImageInputRef : elseDropImageInputRef;

    // ──────────────
    const handleDropdownImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setCurrentOption((prev) => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    };

    const handleDropdownFileDelete = () => {
      setCurrentOption((prev) => ({ ...prev, image: "" }));
      if (dropImageInputRef.current) {
        dropImageInputRef.current.value = "";
      }
    };

    const handleStartEdit = (idx) => {
      const option = options[idx];
      setDraftTitle(option.title || "");
      setDraftDescription(option.description || "");
      setDraftMetadata(option.metadata || "");
      setCurrentOption(option);
      setEditingIdx(idx);
    };

    const handleCancelInline = () => {
      setDraftTitle("");
      setDraftDescription("");
      setDraftMetadata("");
      setCurrentOption({});
      setEditingIdx(null);
    };

    const handleSaveInline = () => {
      const updatedOptions = [...options];
      updatedOptions[editingIdx] = {
        title: draftTitle,
        description: draftDescription,
        metadata: draftMetadata,
        image: currentOption.image,
      };
      setOptions(updatedOptions);
      handleCancelInline();
    };

    const handleRemove = (idx) => {
      const updatedOptions = options.filter((_, i) => i !== idx);
      setOptions(updatedOptions);
      if (editingIdx === idx) {
        handleCancelInline();
      }
    };

    const handleAddNew = () => {
      setOptions([
        ...options,
        {
          title: "New Option",
          description: "",
          metadata: "",
          image: "",
        },
      ]);
    };

    const handleSaveDropdown = () => {
      console.log("Saved Dropdown Options:", options);
    };

    // ──────────────
    if (selectedComponent === "dropDown") {
      return (
        <FormControl fullWidth>
          <div className="mb-2 mt-3 space-y-3 w-1/2">
            <InputField
              label="Label"
              id="mainlabel"
              tooltipContent="Enter MainLabel"
              tooltipPlacement="right"
              maxLength={20}
              value={mainLabel}
              onChange={(e) => setMainLabel(e.target.value)}
              placeholder="Enter label"
              type="text"
              fullWidth
            />

            <div>
              <UniversalLabel
                htmlFor="dropDown_required"
                className="text-sm font-medium text-gray-700"
                tooltipContent="Select if required"
                tooltipPlacement="top"
                text="Required"
              />
              <div className="flex items-center gap-2">
                <Switch
                  checked={required}
                  onChange={(e) => setRequired(e.target.checked)}
                  id="required"
                />
                <span>{required ? "True" : "False"}</span>
              </div>
            </div>
          </div>

          {options.map((opt, idx) => {
            const isEditing = idx === editingIdx;

            return (
              <Box
                key={idx}
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
                      value={draftTitle}
                      onChange={(e) => setDraftTitle(e.target.value)}
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
                      value={draftDescription}
                      onChange={(e) => setDraftDescription(e.target.value)}
                      placeholder="Enter description"
                      type="text"
                      fullWidth
                    />
                    <InputField
                      label="Metadata"
                      tooltipContent="Enter MetaData"
                      tooltipPlacement="right"
                      maxLength={20}
                      value={draftMetadata}
                      required
                      onChange={(e) => setDraftMetadata(e.target.value)}
                      placeholder="Enter Metadata"
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
                        onChange={handleDropdownImageChange}
                        ref={dropImageInputRef}
                      />

                      <button onClick={handleDropdownFileDelete}>
                        <DeleteOutlineIcon
                          sx={{
                            fontSize: "23px",
                            marginTop: 3,
                            color: "#ef4444",
                          }}
                        />
                      </button>
                    </Box>
                    {currentOption.image && (
                      <p className="text-green-600 text-sm font-medium mt-1">
                        Image uploaded
                      </p>
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        mt: 2,
                        justifyContent: "left",
                      }}
                    >
                      <UniversalButton
                        label="Save Option"
                        onClick={handleSaveInline}
                        disabled={!draftTitle.trim() || !draftMetadata.trim()}
                      />
                      <UniversalButton
                        label="Cancel"
                        onClick={handleCancelInline}
                      />
                    </Box>
                  </Box>
                ) : (
                  <>
                    <Box
                      sx={{ flexGrow: 1, cursor: "pointer", minWidth: 0 }}
                      onClick={() => handleStartEdit(idx)}
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
                      onClick={() => handleStartEdit(idx)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleRemove(idx)}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </>
                )}
              </Box>
            );
          })}

          <div className="flex justify-center items-center gap-2">
            <Box sx={{ mt: 1 }}>
              <UniversalButton label="Add Option" onClick={handleAddNew} />
            </Box>
            <Box sx={{ mt: 1 }}>
              <UniversalButton
                label="Save Dropdown"
                onClick={handleSaveDropdown}
              />
            </Box>
          </div>
        </FormControl>
      );
    }

    return null;
  };

  const renderEmbeddedLinkBranchInput = (branchType) => {
    const selectedComponent =
      branchType === "then" ? selectedThenComponent : selectedElseComponent;

    const text = branchType === "then" ? thenText : elseText;
    const setText = branchType === "then" ? setThenText : setElseText;

    const onClickAction =
      branchType === "then" ? thenOnClickAction : elseOnClickAction;
    const setOnClickAction =
      branchType === "then" ? setThenOnClickAction : setElseOnClickAction;

    const selectedScreenName =
      branchType === "then" ? thenSelectedScreenName : elseSelectedScreenName;
    const setSelectedScreenName =
      branchType === "then"
        ? setThenSelectedScreenName
        : setElseSelectedScreenName;

    const embeddedLinkUrl =
      branchType === "then" ? thenEmbeddedLinkUrl : elseEmbeddedLinkUrl;
    const setEmbeddedLinkUrl =
      branchType === "then" ? setThenEmbeddedLinkUrl : setElseEmbeddedLinkUrl;

    const handleSave = () => {
      console.log("Saved Embedded Link:", {
        text,
        onClickAction,
        selectedScreenName,
        embeddedLinkUrl,
      });
    };

    if (selectedComponent === "embeddedlink") {
      return (
        <div className="mt-5 w-1/2">
          <div className="mb-2">
            <InputField
              label="Text"
              type="url"
              maxLength={25}
              value={text}
              tooltipContent="Enter label which display in the screen max length 25"
              tooltipPlacement="right"
              placeholder="Button Embedded Link"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <p className="text-gray-600 text-xs mb-2">Chars: {text.length}/25</p>

          <div className="mb-2">
            <AnimatedDropdown
              id="next-action"
              label="Next Action"
              tooltipContent="[navigate = ensure there is screen created where user can navigate],[Open_url = paste or enter url link where user can redirect to page]"
              tooltipPlacement="right"
              options={[
                { value: "navigate", label: "Navigate" },
                { value: "open_url", label: "Open_url" },
              ]}
              value={onClickAction}
              onChange={(value) => setOnClickAction(value)}
            />
          </div>

          {onClickAction === "navigate" && (
            <>
              <AnimatedDropdown
                id="screen-name"
                label="List Of Screen Name"
                tooltipContent="Create a screen where you want to navigate the user"
                tooltipPlacement="right"
                options={screenNameOptions}
                value={selectedScreenName}
                onChange={(value) => setSelectedScreenName(value)}
              />
              <span className="text-xs">
                NOTE: Create a screen or select where you want to navigate the
                user
              </span>
            </>
          )}

          {onClickAction === "open_url" && (
            <InputField
              label="URL"
              placeholder="Enter the URL to open"
              type="text"
              tooltipContent="Provide the URL to open when user clicks Read more"
              value={embeddedLinkUrl}
              onChange={(e) => setEmbeddedLinkUrl(e.target.value)}
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

  const renderDateBranchInput = (branchType) => {
    const selectedComponent =
      branchType === "then" ? selectedThenComponent : selectedElseComponent;

    const dateLabel = branchType === "then" ? thenDateLabel : elseDateLabel;
    const setDateLabel =
      branchType === "then" ? setThenDateLabel : setElseDateLabel;

    const datePlaceholder =
      branchType === "then" ? thenDatePlaceholder : elseDatePlaceholder;
    const setDatePlaceholder =
      branchType === "then" ? setThenDatePlaceholder : setElseDatePlaceholder;

    const minDate = branchType === "then" ? thenMinDate : elseMinDate;
    const setMinDate = branchType === "then" ? setThenMinDate : setElseMinDate;

    const maxDate = branchType === "then" ? thenMaxDate : elseMaxDate;
    const setMaxDate = branchType === "then" ? setThenMaxDate : setElseMaxDate;

    const unavailableDate =
      branchType === "then" ? thenUnavailableDate : elseUnavailableDate;
    const setUnavailableDate =
      branchType === "then" ? setThenUnavailableDate : setElseUnavailableDate;

    const handleAddUnavailableDate = (value) => {
      if (value) {
        setUnavailableDate((prev) => [...prev, value]);
      }
    };

    const handleSave = () => {
      console.log("Saved Date config:", {
        dateLabel,
        datePlaceholder,
        minDate,
        maxDate,
        unavailableDate,
      });
    };

    if (selectedComponent === "date") {
      return (
        <div className="space-y-3 mt-3 w-1/2">
          <InputField
            label="Date Label"
            placeholder="Enter Date Label"
            tooltipContent="Enter Date Label"
            tooltipPlacement="right"
            maxLength={40}
            value={dateLabel}
            onChange={(e) => setDateLabel(e.target.value)}
          />

          <InputField
            label="Helper Text"
            placeholder="Enter Placeholder for Date"
            tooltipContent="Enter Placeholder for Date"
            tooltipPlacement="right"
            value={datePlaceholder}
            onChange={(e) => setDatePlaceholder(e.target.value)}
          />

          <UniversalDatePicker
            label="Min-Date"
            tooltipContent="Select Min-Date"
            tooltipPlacement="right"
            value={minDate}
            onChange={setMinDate}
          />

          <UniversalDatePicker
            label="Max-Date"
            tooltipContent="Select Max-Date"
            tooltipPlacement="right"
            value={maxDate}
            onChange={setMaxDate}
            minDate={minDate}
            disabled={!minDate}
          />

          <UniversalDatePicker
            label="Unavailable Dates"
            tooltipContent="Select Unavailable-Date"
            tooltipPlacement="right"
            value={null}
            onChange={handleAddUnavailableDate}
            disabled={!minDate || !maxDate}
            minDate={minDate}
            maxDate={maxDate}
          />

          <div className="flex flex-wrap gap-2 mt-2 ">
            {unavailableDate.map((date, index) => (
              <Chip
                sx={{ padding: 1 }}
                key={index}
                label={new Date(date).toLocaleDateString()}
                onDelete={() =>
                  setUnavailableDate((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
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

  const renderFooterBranchInput = (branchType) => {
    const selectedComponent =
      branchType === "then" ? selectedThenComponent : selectedElseComponent;

    const footerButtonLabel =
      branchType === "then" ? thenFooterButtonLabel : elseFooterButtonLabel;
    const setFooterButtonLabel =
      branchType === "then"
        ? setThenFooterButtonLabel
        : setElseFooterButtonLabel;

    const centerCaption =
      branchType === "then" ? thenCenterCaption : elseCenterCaption;
    const setCenterCaption =
      branchType === "then" ? setThenCenterCaption : setElseCenterCaption;

    const nextAction = branchType === "then" ? thenNextAction : elseNextAction;
    const setNextAction =
      branchType === "then" ? setThenNextAction : setElseNextAction;

    const handleSave = () => {
      console.log("Saved Footer Button config:", {
        footerButtonLabel,
        centerCaption,
        nextAction,
      });
    };

    if (selectedComponent === "footerbutton") {
      return (
        <div className="mb-2 text-lg space-y-3 mt-3 w-1/2">
          <InputField
            label="Footer Button Label"
            placeholder="Enter Footer Button Label"
            tooltipContent="Enter Label"
            tooltipPlacement="right"
            maxLength={35}
            id="footer-button-label"
            value={footerButtonLabel}
            onChange={(e) => setFooterButtonLabel(e.target.value)}
          />

          <InputField
            label="Center Caption"
            placeholder="Enter Center Caption"
            tooltipContent="Enter Center Caption"
            tooltipPlacement="right"
            maxLength={15}
            id="center-caption"
            value={centerCaption}
            onChange={(e) => setCenterCaption(e.target.value)}
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
            value={nextAction}
            onChange={(val) => setNextAction(val)}
          />

          <div className="flex justify-center">
            <UniversalButton label="SAVE" onClick={handleSave} />
          </div>
        </div>
      );
    }

    return null;
  };

  const flowItemsOptions = flowItems.map((item) => ({
    label: item.data.type || item.id, // fallback if text is empty
    value: item.id,
  }));

  // components end
  return (
    <>
      <Dialog
        visible={openIfElse}
        onHide={() => setOpenIfElse(false)}
        style={{ width: "80rem", height: "50rem" }}
        draggable={false}
        header={"IF Else Component"}
      >
        <div className="">
          <div className="flex items-center justify-center gap-2 w-full">
            <div className="w-3/1">
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
            <div className="w-3/1">
              <AnimatedDropdown
                label="Select Flow Item"
                tooltipContent="Select a flow item"
                tooltipPlacement="right"
                value={selectedFlowItem}
                options={flowItemsOptions}
                onChange={(value) => setSelectedFlowItem(value)}
              />
            </div>
            <div className="w-3/1">
              <AnimatedDropdown
                label="Add Component to Then Branch"
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

            <div className="w-3/1">
              <AnimatedDropdown
                label="Add Component to Else Branch"
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
            </div>
            <div className="flex justify-center mt-6">
              <UniversalButton label="Save" onClick={handleIfElseSave} />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4">If-Else Overview</h2>
            <p>{selectedCondition}</p>
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
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default IfElseBlock;
