import React, { useState, useEffect } from "react";
import InputField from "../../components/InputField";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  FormControl,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UniversalButton from "../../components/UniversalButton";
import toast from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import UniversalDatePicker from "../../components/UniversalDatePicker";
import AnimatedDropdown from "../../components/AnimatedDropdown";
import { is } from "date-fns/locale";
import { Dialog } from "primereact/dialog";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { uploadImageFile } from "@/apis/whatsapp/whatsapp";
import moment from "moment";
import Chip from "@mui/material/Chip";

const EditPanel = ({
  selectedItem,
  onClose,
  onSave,
  headingValue,
  setHeadingValue,
}) => {
  const [value, setValue] = useState("");
  // const [options, setOptions] = useState([]);
  const [checked, setChecked] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [newOption, setNewOption] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  // const [file, setFile] = useState("")
  const [uploadPhoto, setUploadPhoto] = useState("");

  useEffect(() => {
    if (selectedItem) {
      setValue(selectedItem.value || "");
      // setOptions(selectedItem.options || []);
      setChecked(selectedItem.checked || []);
      setSelectedOption(selectedItem.selectedOption || "");
    }
  }, [selectedItem]);

  const handleToggle = () => {
    // if (isToggled) {
    //    setIsToggled(false);
    // } else {
    //  setIsToggled(true);
    // }
    // setIsToggled((prev) = !prev)
  };

  const handerRequired = () => {
    confirm.log(handerRequired);
  };

  // const handleSave = () => {
  //   if (
  //     !value.trim() &&
  //     [
  //       "heading",
  //       "subheading",
  //       "textbody",
  //       "textcaption",
  //       "textInput",
  //       "textArea",
  //     ].includes(selectedItem.type)
  //   ) {
  //     toast.error("Input cannot be empty!");
  //     return;
  //   }

  //   const updatedData = {
  //     ...selectedItem,
  //     value,
  //     options,
  //     checked,
  //     selectedOption,
  //   };

  //   onSave(updatedData);
  //   onClose();
  // };

  const handleOptionChange = (index, newValue) => {
    setOptions((prev) => {
      const updatedOptions = [...prev];
      updatedOptions[index] = newValue;
      return updatedOptions;
    });
  };

  const handleAddOption = () => {
    if (newOption.trim()) {
      setOptions((prev) => [...prev, newOption]);
      setNewOption("");
    }
  };

  const handleRemoveOption = (index) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  // akhil

  // const OptionsTypeTypeOptions = [
  //   { value: 'text', label: 'Text' },
  //   { value: 'number', label: 'Number' },
  //   { value: 'email', label: 'Email' },
  // ];

  // const [selectedOptionsType, setSelectedOptionsType] = useState(null);
  // const [inputValue, setInputValue] = useState('');
  // const [maxLengthValue, setMaxLengthValue] = useState('100');
  // const [minLengthValue, setMinLengthValue] = useState('100');

  // const handleDropdownChange = (val) => {
  //   const option = OptionsTypeTypeOptions.find(opt => opt.value === val) || null;
  //   setSelectedOptionsType(option);
  //   setInputValue(''); // Clear input field when option changes
  // };

  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value);
  // };

  // const handleMaxChange = (e) => {
  //   const val = e.target.value;
  //   // ensure numeric and positive
  //   if (/^\d*$/.test(val)) setMaxLengthValue(val);
  // };

  // const handleMinChange = (e) => {
  //   const val = e.target.value;
  //   if (/^\d*$/.test(val)) setMinLengthValue(val);
  // };

  // const maxLen = parseInt(maxLengthValue, 10) || 0;
  // const minLen = parseInt(minLengthValue, 10) || 0;

  // inputtype

  const OptionsTypeOptions = [
    { value: "text", label: "Text" },
    { value: "number", label: "Number" },
    { value: "email", label: "Email" },
  ];

  const [selectedOptionsType, setSelectedOptionsType] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [minValue, setMinValue] = useState("");
  const [labelValue, setLabelValue] = useState("");
  const [errorValue, setErrorValue] = useState("");
  const [placeholderValue, setPlaceholderValue] = useState("");
  const [switchChecked, setSwitchChecked] = useState(false);

  const switchLabel = { inputProps: { "aria-label": "Switch demo" } };
  const handleErrorChange = (e) => setErrorValue(e.target.value);
  const handleLabelChange = (e) => setLabelValue(e.target.value);
  const handlePlaceholder = (e) => setPlaceholderValue(e.target.value);
  const handleSwitchChange = (event) => {
    setSwitchChecked(event.target.checked);
  };

  const handleDropdownChange = (val) => {
    const option = OptionsTypeOptions.find((opt) => opt.value === val) || null;
    setSelectedOptionsType(option);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (selectedOptionsType?.value === "number") {
      // Enforce digit count limits
      if (/^\d*$/.test(val)) {
        if (!maxValue || val.length <= Number(maxValue)) {
          setInputValue(val);
        }
      }
    } else {
      // Text/email: enforce length via HTML attrs
      setInputValue(val);
    }
  };

  const handleMaxChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setMaxValue(val);
      if (
        selectedOptionsType?.value === "number" &&
        inputValue.length > Number(val)
      ) {
        setInputValue(inputValue.slice(0, Number(val)));
      }
    }
  };

  const handleMinChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) setMinValue(val);
  };

  const isNumberType = selectedOptionsType?.value === "number";
  const maxNum = maxValue ? Number(maxValue) : "";
  const minNum = minValue ? Number(minValue) : "";

  const handleInputSave = () => {
    if (!labelValue) {
      toast.error("Please Enter Label");
      return;
    }
    if (!placeholderValue) {
      toast.error("Please Enter Placeholder value");
      return;
    }

    const typeMapping = {
      textInput: "TextInput",
      textArea: "TextArea",
    };

    const selectedType = selectedItem?.type; // e.g., 'textInput' or 'textArea'
    const mappedType = typeMapping[selectedType];

    if (!selectedType || !mappedType) {
      toast.error("Invalid input type");
      return;
    }

    const payload = {
      texts: {},
    };

    const id = `${selectedType}_1`; // Assuming only 1 for now
    payload.texts[id] = {
      inputType: mappedType,
      label: labelValue,
      helper_text: placeholderValue,
      min_chars: minNum,
      max_chars: maxNum,
      error_message: errorValue || "",
      required: switchChecked,
    };

    console.log("payload by input", payload);

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    onSave(updatedData);
    onClose();
    console.log(updatedData);
  };

  const allowed = ["heading", "subheading", "textbody", "textcaption"];

  const { type, payload } = selectedItem || {};

  // 1️⃣ state to track the input’s value
  // const [headingValue, setHeadingValue] = useState("");

  // 2️⃣ prefill (or clear) when selectedItem changes
  // useEffect(() => {
  //   if (allowed.includes(type)) {
  //     setHeadingValue(payload?.[type] ?? "");
  //   } else {
  //     setHeadingValue("");
  //   }
  // }, [type, payload]);

  // for headings
  // const handleHeadingSave = () => {

  //   const screenId = "";

  //   const textElements = {
  //     heading: "Welcome!",
  //     subheading: "Please login to continue",
  //     textcaption: "Secure Login",
  //     textbody: "Enter your credentials to access your account."
  //   };

  //   const type = {
  //     heading: "TextHeading",
  //     subheading: "TextSubheading",
  //     textcaption: "TextCaption",
  //     textbody: "TextBody"
  //   };

  //   const payload = {
  //     headings: {}
  //   };
  //   console.log(payload)
  //   Object.entries(textElements).forEach(([key, text], index) => {
  //     const id = `${key}_${index + 1}`;
  //     payload.headings[id] = {
  //       screenId,
  //       id,
  //       type: type[key],
  //       text
  //     };
  //   });
  //   console.log(payload);
  // }

  // EmbeddedLink
  const [link, setLink] = useState("");
  const [onClickAction, setOnClickAction] = useState("");
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setLink(e.target.value);
  };

  const handleEmbeddedLinkSave = () => {
    const payload = {
      label: embaddedlink,
      type: "EmbeddedLink",
      text: text,
      "on-click-action": onClickAction,
    };
    console.log(payload);
  };

  // opt-in
  const [name, setName] = useState("");
  const [optLabel, setOptLabel] = useState("");
  const [optAction, setOPTAction] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleChecked = (e) => {
    setCheckbox(e.target.checked);
  };

  const handleOPTSave = () => {
    const payload = {
      label: optLabel,
      type: "OptIn",
      name: "",
      "on-click-action": optAction,
    };
    console.log(payload);
    // if(optAction === 'navigate'){

    // }
  };

  // image
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [scaleType, setSCaleType] = useState("contain");
  const [aspectRatio, setAspectRatio] = useState(1);
  const [imgAltText, setImgAltText] = useState("");
  const [imageSrc, setImageSrc] = useState(null);

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  }
  const handlePhotoUpload = async (e) => {
    const file = event.target.files[0];

    const src = await getBase64(file);
    setImageSrc(src);
  };

  // const base64HeaderRemoved = imageSrc.split(",")[1];
  // const mimeType = imageSrc.match(/^data:(image\/[a-zA-Z]+);base64/)[1];

  const handleImageSave = (e) => {
    const selectedPhoto = "";
    const payload = {
      src: imageSrc,
      // width: width,
      // height: height,
      "scale-type": scaleType,
      "aspect-ratio": aspectRatio,
      "alt-text": imgAltText,
    };

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    onSave(updatedData);
    onClose();
    console.log(payload);
  };

  // date
  const [dateLable, setDateLabel] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [dateName, setDateName] = useState("");
  const [unavailableDate, setUnavailableDate] = useState("");
  const [datePlaceholder, setDatePlaceholder] = useState("");

  // const formatDateToString = (date) => {
  //   if (!date) return null;

  //   const d = new Date(date);
  //   if (isNaN(d.getTime())) return null;

  //   const year = d.getFullYear();
  //   const month = `${d.getMonth() + 1}`.padStart(2, "0");
  //   const day = `${d.getDate()}`.padStart(2, "0");

  //   return `${year}-${month}-${day}`;
  // };.

  const formatDateToString = (date) => {
    if (!date) return null;
    const d = moment(date);
    if (!d.isValid()) return null;
    return d.format("YYYY-MM-DD");
  };

  const formatArrayToDates = (dates) => {
    if (!Array.isArray(dates)) return [];

    return dates.map((date) => formatDateToString(date)).filter(Boolean);
  };

  const handleDateSave = () => {
    if (!dateName) {
      toast.error("Please Enter Name");
      return;
    }
    if (!dateLable) {
      toast.error("Please Enter Label");
      return;
    }

    const payload = {
      label: dateLable,
      name: dateName,
      "min-date": formatDateToString(minDate),
      "max-date": formatDateToString(maxDate),
      "unavailable-dates": formatDateToString(unavailableDate),
      "helper-text": datePlaceholder,
      // "error-message": "",
    };

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    onSave(updatedData);
    onClose();
    console.log(payload);
  };

  // Calendar
  const [dateCalendarLable, setDateCalendarLabel] = useState("");
  const [minCalendarDate, setMinCalendarDate] = useState("");
  const [maxCalendarDate, setMaxCalendarDate] = useState("");
  const [dateCalendarName, setDateCalendarName] = useState("");
  const [unavailableCalendarDates, setUnavailableCalendarDates] = useState([]);
  const [dateCalendarPlaceholder, setDateCalendarPlaceholder] = useState("");

  const formatDateCalendarToString = (calendarDate) => {
    if (!calendarDate) return "";
    const d = moment(calendarDate);
    if (!d.isValid()) return "";
    return d.format("YYYY-MM-DD");
  };

  const formatArrayToCalendarDates = (dates) => {
    if (!Array.isArray(dates)) return [];
    return dates
      .filter((date) => date instanceof Date && !isNaN(date))
      .map(formatDateToString)
      .filter(Boolean);
  };

  const handleAddUnavailableDate = (date) => {
    const formatted = formatDateToString(date);
    if (
      formatted &&
      !unavailableCalendarDates.some((d) => formatDateToString(d) === formatted)
    ) {
      setUnavailableCalendarDates((prev) => [...prev, date]);
    }
  };

  // Handle removing a selected date
  const handleRemoveUnavailableDate = (indexToRemove) => {
    setUnavailableCalendarDates((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleCalendarSave = () => {
    if (!dateCalendarName) {
      toast.error("Please Enter Name");
      return;
    }
    if (!dateCalendarLable) {
      toast.error("Please Enter Label");
      return;
    }

    const payload = {
      label: dateCalendarLable,
      name: dateCalendarName,
      "min-date": formatDateCalendarToString(minCalendarDate),
      "max-date": formatDateCalendarToString(maxCalendarDate),
      "unavailable-dates": formatArrayToCalendarDates(unavailableCalendarDates),
      "helper-text": dateCalendarPlaceholder,
      // "error-message": "",
    };

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    onSave(updatedData);
    onClose();
    console.log(payload);
  };

  // document
  const [documentLabel, setDocumentLabel] = useState("");
  const [description, setDescription] = useState("");
  const [minDocsUpload, setMinDocsUpload] = useState("");
  const [maxDocsUpload, setMaxDocsUpload] = useState("");
  // const [documentName, setDocumentName] = useState("")
  // const [listItems, setListItems] = useState("")
  // const [mediaSize, setMediaSize] = useState("")
  // const [mainContent, setMainContent] = useState("")
  // const [imageSrc, setImageSrc] = useState(null)
  // const [end, setEnd] = useState("")
  // const [badges, setBadges] = useState("")
  // const [tags, setTags] = useState("")
  // const [file, setFile] = useState(null);

  // const handleFileUpload = (e) => {

  //   const MAX_FILE_SIZE = 100 * 1024;
  //   if (file) {
  //     if (file.size > MAX_FILE_SIZE) {
  //       alert("File size exceeds 100KB. Please upload a smaller file.");
  //       event.target.value = '';
  //       return;
  //     }
  //     console.log("Uploaded file:", file);
  //   }

  //   const uploadedFile = e.target.files[0];
  //   if (!uploadedFile) return;

  //   const fileType = uploadedFile.name.split(".").pop().toLowerCase();
  //   const allowedTypes = ["pdf", "docx", "doc"];

  //   if (!allowedTypes.includes(fileType)) {
  //     toast.error("Unsupported file type. Please upload a .pdf, .docx, or .doc file.");
  //     setFile(null);
  //     setMainContent("");
  //     return;
  //   }

  //   setFile(uploadedFile);
  //   setMainContent(`Uploaded file: ${uploadedFile.name}. `);
  // };

  const handleDocumentSave = () => {
    if (!description) {
      toast.error("Please Enter Description");
      return;
    }
    if (!documentLabel) {
      toast.error("Please Enter Label");
      return;
    }

    const payload = {
      label: documentLabel,
      description: description,
      "min-uploaded-documents": minDocsUpload,
      "max-uploaded-documents": maxDocsUpload,
      // name: documentName,
      // "media-size": mediaSize || "regular",
      // "list-items": listItems,
      // 'main-content': mainContent,
      // uploadedFile: file.name,
    };

    console.log("Saving:", payload);
    toast.success("Document saved successfully!");

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    onSave(updatedData);
    onClose();
    console.log("Final Document data:", updatedData);
  };

  // media
  const [mediaLabel, setMediaLabel] = useState("");
  const [mediaDescription, setMediaDescription] = useState("");
  const [minPhotoUpload, setMinPhotoUpload] = useState("");
  const [maxPhotoUpload, setMaxPhotoUpload] = useState("");

  const handleMediaSave = () => {
    if (!mediaDescription) {
      toast.error("Please Enter Description");
      return;
    }
    if (!mediaLabel) {
      toast.error("Please Enter Label");
      return;
    }

    const payload = {
      label: mediaLabel,
      description: mediaDescription,
      "min-uploaded-photos": minPhotoUpload,
      "max-uploaded-photos": maxPhotoUpload,
    };

    console.log("Saving:", payload);
    toast.success("Media saved successfully!");

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    onSave(updatedData);
    onClose();
    console.log("Final Media data:", updatedData);
  };

  // footertype
  const [footerButtonLabel, setFooterButtonLabel] = useState("");
  const [leftCaption, setLeftCaption] = useState("");
  const [rightCaption, setRightCaption] = useState("");
  const [centerCaption, setCenterCaption] = useState("");
  const [nextAction, setNextAction] = useState("complete");

  const handleFooterSave = () => {
    if (!footerButtonLabel) {
      toast.error("Please enter a Footer Button Label");
      return;
    }

    const payload = {
      footer: {},
    };

    const id = `footer_1`; // Unique ID for the footer (adjust if needed)

    payload.footer[id] = {
      label: footerButtonLabel,
      left_caption: leftCaption || "",
      right_caption: rightCaption || "",
      center_caption: centerCaption || "",
      on_click_action: nextAction || "",
    };

    console.log("Saving footer payload:", payload);

    // Assuming we want to merge it with selectedItem like in handleInputSave
    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    onSave(updatedData);
    onClose();
    console.log("Final footer data:", updatedData);
  };

  // footertype

  // RadioBtn
  const MAX_IMAGE_SIZE = 100 * 1024; // 100 KB

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

  const handleRadioImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/image\/(png|jpeg)/)) {
      toast.error("Please select a .png or .jpeg file");
      return;
    }

    setRadioImageFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setRadioImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRadioBtnEdit = (idx) => {
    const opt = radioButtonOptions[idx];
    setRadiobtnEditIdx(idx);
    setDraft({
      title: opt.title,
      description: opt.description,
      metadata: opt.metadata,
      image: opt.image || "",
      altText: opt["alt-text"] || "",
    });
  };

  const handleSaveInlineRadio = () => {
    if (!draft.title.trim()) return;

    const newOptions = [...radioButtonOptions];
    newOptions[radiobtnEditIdx] = {
      ...newOptions[radiobtnEditIdx],
      title: draft.title.slice(0, 30),
      description: draft.description.slice(0, 300),
      metadata: draft.metadata.slice(0, 20),
      image: draft.image,
      "alt-text": draft.altText,
    };

    setRadioButtonOptions(newOptions);
    setRadiobtnEditIdx(null);
    setDraft({
      title: "",
      description: "",
      metadata: "",
      image: "",
      altText: "",
    });
  };

  const handleCancelInlineRadio = () => {
    setRadiobtnEditIdx(null);
    setDraft({
      title: "",
      description: "",
      metadata: "",
      image: "",
      altText: "",
    });
  };

  const handleRemoveRadio = (idx) => {
    setRadioButtonOptions((prev) => prev.filter((_, i) => i !== idx));
    if (idx === radiobtnEditIdx) handleCancelInlineRadio();
  };

  const handleRadioBtnAddNew = () => {
    const newId = (radioButtonOptions.length + 1).toString();
    setRadioButtonOptions((prev) => [
      ...prev,
      {
        id: newId,
        title: `Option ${newId}`,
        description: "",
        metadata: "",
        image: "",
      },
    ]);
  };

  const handleRadioUploadFile = async () => {
    if (!radioImageFile) {
      toast.error("Please select an image first before uploading");
      return;
    }

    try {
      const response = await uploadImageFile(radioImageFile, 1);
      console.log("Upload response:", response);
      setUploadedRadioImgId(response.handlerid);
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload file.");
    }
  };

  const handleSaveRadioButton = () => {
    // 1) Validate label
    if (!radioBtnLabel.trim()) {
      toast.error("Label is required");
      return;
    }
    if (radioBtnLabel.trim().length > 30) {
      toast.error("Label must be under 30 characters");
      return;
    }
    // if(!footerButtonLabel){
    //   toast.error("Footer must be created")
    // }else {

    // }

    // 2) Filter and validate options
    const filteredOptions = radioButtonOptions.filter((opt) =>
      opt.title?.trim()
    );

    if (filteredOptions.length < 2) {
      toast.error("At least two Radio option is required!");
      return;
    }
    if (filteredOptions.length > 20) {
      toast.error("Maximum of 20 radio options allowed");
      return;
    }

    for (let i = 0; i < filteredOptions.length; i++) {
      const opt = filteredOptions[i];

      if (opt.title.trim().length > 30) {
        toast.error(`Option ${i + 1}: Title must be under 30 characters`);
        return;
      }
      if (opt.description?.length > 300) {
        toast.error(
          `Option ${i + 1}: Description must be under 300 characters`
        );
        return;
      }
      if (opt.metadata?.length > 20) {
        toast.error(`Option ${i + 1}: Metadata must be under 20 characters`);
        return;
      }

      if (opt.image) {
        const imageSize = Math.ceil(
          opt.image.length * (3 / 4) -
            (opt.image.endsWith("==") ? 2 : opt.image.endsWith("=") ? 1 : 0)
        );
        if (imageSize > 100 * 1024) {
          toast.error(`Option ${i + 1}: Image must be under 100KB`);
          return;
        }
      }
    }

    // 3) Build payload options
    const payloadOptions = filteredOptions.map((opt, idx) => ({
      id: (idx + 1).toString(),
      title: opt.title.trim(),
      description: opt.description?.trim() || "",
      metadata: opt.metadata?.trim() || "",
      image: uploadedRadioImgId || opt.image || "",
    }));
    console.log("Filtered and processed radio button options:", payloadOptions);

    // 4) Final payload and merge
    const payload = {
      label: radioBtnLabel.trim(),
      "data-source": payloadOptions,
    };

    const existingCount = selectedItem?.radioButton
      ? Object.keys(selectedItem.radioButton).length
      : 0;

    const id = `radioButton_${existingCount + 1}`;

    const updatedData = {
      ...selectedItem,
      ...payload,
      radioButton: {
        ...(selectedItem?.radioButton || {}),
        [id]: payload,
      },
    };

    // 5) Save and close
    onSave(updatedData);
    onClose();

    console.log(
      "Radio button updated data which send to generate payload",
      updatedData
    );
  };

  //checkbox
  const [mainLabelCheckbox, setMainLabelCheckbox] = useState("");
  const [mainNameCheckbox, setMainNameCheckbox] = useState("");
  const [checkBoxes, setCheckBoxes] = useState([]);
  const [editCheckBoxId, setEditCheckBoxId] = useState(null);
  const [uploadedImgId, setUploadedImgId] = useState(null);
  const [checkboxImageFile, setCheckboxImageFile] = useState(null);
  const [checkboxImageSrc, setCheckboxImageSrc] = useState(null);
  const [uploadedCheckboxImgId, setUploadedCheckboxImgId] = useState(null);
  const [draftCheckbox, setDraftCheckbox] = useState({
    title: "",
    description: "",
    metadata: "",
  });
  const [checkboxEditIdx, setCheckboxEditIdx] = useState(null);

  // anshu
  const Max_Image_Size = 100 * 1024; // 100 KB

  const handleCheckboxImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/image\/(png|jpeg)/)) {
      toast.error("Please select a .png or .jpeg file");
      return;
    }

    setCheckboxImageFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setCheckboxImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCheckboxUploadFile = async () => {
    if (!checkboxImageFile) {
      toast.error("Please select an image first before uploading");
      return;
    }
    try {
      const response = await uploadImageFile(checkboxImageFile, 1);
      setUploadedCheckboxImgId(response.handlerid);
      console.log("Upload response:", response);
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload file.");
    }
  };

  const handleCheckboxEdit = (idx) => {
    setCheckboxEditIdx(idx);
    setDraftCheckbox(checkBoxes[idx]);
  };

  const handleCancelInlineCheckbox = () => {
    setCheckboxEditIdx(null);
    setDraftCheckbox({ title: "", description: "", metadata: "" });
  };

  const handleSaveInlineCheckbox = () => {
    const updated = [...checkBoxes];
    updated[checkboxEditIdx] = {
      ...updated[checkboxEditIdx],
      ...draftCheckbox,
      image: uploadedCheckboxImgId || updated[checkboxEditIdx].image || "",
    };
    setCheckBoxes(updated);
    setCheckboxEditIdx(null);
    setDraftCheckbox({ title: "", description: "", metadata: "" });
  };

  const handleRemoveCheckbox = (idx) => {
    const updated = checkBoxes.filter((_, i) => i !== idx);
    setCheckBoxes(updated);
  };

  const handleCheckboxAddNew = () => {
    const newId = (checkBoxes.length + 1).toString();
    setCheckBoxes((prev) => [
      ...prev,
      {
        id: newId,
        title: `Option ${newId}`,
        description: "",
        metadata: "",
        image: "",
      },
    ]);
  };

  const handleCheckBoxSave = () => {
    if (!mainLabelCheckbox) {
      toast.error("Please enter a Checkbox Label");
      return;
    }

    if (checkBoxes.length < 2) {
      toast.error("At least two Checkbox option is required!");
      return;
    }

    // Filter and validate options
    const filteredOptions = checkBoxes.filter((opt) => opt.title?.trim());

    // Build payload options
    const payloadOptions = filteredOptions.map((opt, idx) => ({
      id: (idx + 1).toString(),
      title: opt.title.trim(),
      description: opt.description?.trim() || "",
      metadata: opt.metadata?.trim() || "",
      image: uploadedImgId || opt.image || "",
    }));

    // Final payload and merge
    const payload = {
      label: mainLabelCheckbox.trim(),
      "data-source": payloadOptions,
    };

    const existingCount = selectedItem?.checkboxGroups
      ? Object.keys(selectedItem.checkboxGroups).length
      : 0;

    const id = `checkbox_${existingCount + 1}`;

    const updatedData = {
      ...selectedItem,
      ...payload,
      checkboxGroups: {
        ...(selectedItem?.checkboxGroups || {}),
        [id]: payload,
      },
    };

    onSave(updatedData);
    onClose();

    console.log("Final checkboxes data:", updatedData);
  };
  // anshu
  //checkbox

  // dropdown
  const [mainLabelDropdown, setMainLabelDropdown] = useState("");
  const [options, setOptions] = useState([]);
  const [editingIdx, setEditingIdx] = useState(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftDescription, setDraftDescription] = useState("");
  const [draftMetadata, setDraftMetaData] = useState("");
  const [dropImageSrc, setDropImageSrc] = useState(null);
  const [dropImageFile, setDropImageFile] = useState(null);
  const [uploadedId, setUploadedId] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/image\/(png|jpeg)/)) {
      toast.error("Please select a .png or .jpeg file");
      return;
    }

    setDropImageFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setDropImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadFile = async () => {
    if (!dropImageFile) {
      toast.error("Please select an image first before uploading");
      return;
    }

    try {
      const response = await uploadImageFile(dropImageFile, 1);

      console.log("Upload response:", response);
      setUploadedId(response.handlerid);
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file.");
    }
  };

  const handleStartEdit = (idx) => {
    const opt = options[idx];
    setEditingIdx(idx);
    setDraftTitle(opt.title);
    setDraftDescription(opt.description);
    setDraftMetaData(opt.metadata);
  };

  const handleSaveInline = () => {
    if (!draftTitle.trim()) return;

    setOptions((prev) =>
      prev.map((o, i) =>
        i === editingIdx
          ? {
              ...o,
              title: draftTitle.trim(),
              description: draftDescription.trim(),
              metadata: draftMetadata.trim(),
            }
          : o
      )
    );

    setEditingIdx(null);
    setDraftTitle("");
    setDraftDescription("");
    setDraftMetaData("");
  };

  const handleCancelInline = () => {
    setEditingIdx(null);
    setDraftTitle("");
    setDraftDescription("");
    setDraftMetaData("");
  };

  const handleRemove = (idx) => {
    setOptions((prev) => prev.filter((_, i) => i !== idx));

    if (idx === editingIdx) {
      setEditingIdx(null);
      setDraftTitle("");
      setDraftDescription("");
      setDraftMetaData("");
    }
  };

  const handleAddNew = () => {
    setOptions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: `Option ${prev.length + 1}`,
        description: "",
        metadata: "",
      },
    ]);
  };

  const handleSaveDropdown = () => {
    // 1) Filter out any options with an empty title
    const filteredOptions = options.filter((o) => o.title.trim());
    if (filteredOptions.length < 2) {
      toast.error("At least two Dropdown option is required!");
      return;
    }

    // 2) Build payloadOptions
    const payloadOptions = filteredOptions.map((o, idx) => ({
      id: idx + 1,
      title: o.title.trim(),
      description: o.description.trim(),
      metadata: o.metadata.trim(),
      image: uploadedId || o.image || "",
    }));

    // 3) Base payload (what used to be passed directly)
    const payload = {
      label: mainLabelDropdown.trim(),
      "data-source": payloadOptions,
    };

    const existingCount = selectedItem?.dropdown
      ? Object.keys(selectedItem.dropdown).length
      : 0;

    const id = `dropdown_${existingCount + 1}`;

    const updatedData = {
      ...selectedItem,
      ...payload,
      dropdown: {
        ...(selectedItem?.dropdown || []),
        [id]: payload,
      },
    };

    onSave(updatedData);

    console.log(
      "dropdown updated data which send to generate payload",
      updatedData
    );
  };
  // dropdown
  // akhil

  // chipSelector
  const [chipSelectorLabel, setChipSelectorLabel] = useState("");
  const [chipSelectorOptions, setChipSelectorOptions] = useState([]);
  const [editingChipIdx, setEditingChipIdx] = useState(null);
  const [chipName, setChipName] = useState("");
  const [chipDescription, setChipDescription] = useState("");
 

  const handleStartChipSelectorEdit = (idx) => {
    const opt = chipSelectorOptions[idx];
    setEditingChipIdx(idx);
    setChipName(opt.name);
    setChipDescription(opt.description);
   
  };

  const handleSaveChipSelectorInline = () => {
    if (!chipName.trim()) return;

    setChipSelectorOptions((prev) =>
      prev.map((o, i) =>
        i === editingChipIdx
          ? {
              ...o,
              name: chipName.trim(),
              description: chipDescription.trim(),
             
            }
          : o
      )
    );

    setEditingChipIdx(null);
    setChipName("");
    setChipDescription("");
  
  };

  const handleCancelChipSelectorInline = () => {
    setEditingChipIdx(null);
    setChipName("");
    setChipDescription("");
   
  };

  const handleChipSelectorRemove = (idx) => {
    setChipSelectorOptions((prev) => prev.filter((_, i) => i !== idx));

    if (idx === editingChipIdx) {
      handleCancelChipSelectorInline();
    }
  };

  const handleAddNewChipSelector = () => {
    setChipSelectorOptions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: '',
        description: "",
       
      },
    ]);
  };

  const handleChipSelectorSave = () => {
    const filteredOptions = chipSelectorOptions.filter((o) => o.name.trim());
    if (filteredOptions.length < 2) {
      toast.error("At least two chip options are required!");
      return;
    }

    const payloadOptions = filteredOptions.map((o, idx) => ({
      id: idx + 1,
      name: o.name.trim(),
      description: o.description.trim(),
      
    }));

    const payload = {
      label: chipSelectorLabel.trim(),
       required: true,
      "data-source": payloadOptions,
    };

    const existingCount = selectedItem?.chipSelector
      ? Object.keys(selectedItem.chipSelector).length
      : 0;

    const id = `chipSelector_${existingCount + 1}`;

    const updatedData = {
      ...selectedItem,
      ...payload,
      chipSelector: {
        ...(selectedItem?.chipSelector || {}),
        [id]: payload,
      },
    };

    onSave(updatedData);
    onClose()
  };

  const maxLengthMap = {
    heading: 80,
    subheading: 80,
    textbody: 4096,
    textcaption: 409,
  };

  return (
    <Box>
      <Paper
        elevation={3}
        // className="bg-white z-10 p-5 absolute top-[40%] left-[78%] translate-x-[-50%] translate-y-[-50%] w-[70%] md:w-[40%] lg:w-[40%] xl:w-[40%] h-[87%] mt-29"
        className="bg-white z-10 p-5 absolute right-3 w-80 top-18"
      >
        {/* <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Typography variant="h6">Edit Item</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon fontSize="small" />
            </IconButton>
            </Box> */}

        <div className="flex items-center justify-between">
          <Typography variant="h7">Edit Item</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>

        {/* Input Fields for Text-Based Items */}
        {["heading", "subheading", "textbody", "textcaption"].includes(
          selectedItem?.type
        ) && (
          <div className="mb-2 font-semibold text-lg mt-3">
            <InputField
              label={`Edit ${type}`}
              placeholder={`Enter ${type}`}
              variant="outlined"
              tooltipContent={`Edit ${type}`}
              tooltipPlacement="right"
              fullWidth
              value={headingValue}
              maxLength={maxLengthMap[selectedItem?.type] || 80}
              onChange={(e) => setHeadingValue(e.target.value)}
            />

            <div className="mt-5 flex justify-center items-center">
              <UniversalButton
                label="SAVE"
                onClick={() => {
                  onSave({
                    index: selectedItem.index,
                    [type]: headingValue,
                  });
                }}
              />
            </div>
          </div>
        )}

        {["textInput", "textArea"].includes(selectedItem?.type) && (
          <div className="mb-2 text-lg space-y-2 mt-3">
            <InputField
              label={`Edit ${type}`}
              id="mainlabel"
              placeholder={`Enter ${type}`}
              tooltipContent={`Edit ${type}`}
              tooltipPlacement="right"
              value={labelValue}
              maxLength={20}
              onChange={handleLabelChange}
            />
            {selectedItem?.type === "textInput" && (
              <AnimatedDropdown
                label={`Select Type ${type}`}
                tooltipContent={`Select Type ${type}`}
                tooltipPlacement="right"
                options={OptionsTypeOptions}
                value={selectedOptionsType?.value || ""}
                onChange={handleDropdownChange}
                placeholder={selectedOptionsType?.label || "Select Type"}
              />
            )}

            <InputField
              label={`Placeholder ${type}`}
              type="text"
              placeholder={`Enter placeholder for ${type}`}
              tooltipContent={`Enter placeholder for ${type}`}
              tooltipPlacement="right"
              value={placeholderValue}
              maxLength={80}
              onChange={handlePlaceholder}
            />

            {selectedItem?.type === "textInput" && (
              <InputField
                label="Enter error to display"
                id="maineroor"
                placeholder="Enter Error"
                tooltipContent={`Enter Error for ${type}`}
                tooltipPlacement="right"
                value={errorValue}
                maxLength={30}
                onChange={handleErrorChange}
              />
            )}

            <div className="flex, gap-8 ">
              <InputField
                label="Min Length"
                id="min"
                type="number"
                placeholder={isNumberType ? "Min digits" : "Min length"}
                tooltipContent="Enter MinLength"
                tooltipPlacement="right"
                value={minValue}
                onChange={handleMinChange}
                autoComplete="off"
              />
              <InputField
                label="Max Length"
                id="max"
                type="number"
                placeholder={isNumberType ? "Max digits" : "Max length"}
                tooltipContent="Enter MaxLength"
                tooltipPlacement="right"
                value={maxValue}
                onChange={handleMaxChange}
                autoComplete="off"
              />
            </div>

            <div>
              <label
                htmlFor="required"
                className="text-sm font-medium text-gray-700"
                tooltipContent="Select an option which required for you."
                tooltipPlacement="right"
              >
                Is Input Required??
              </label>
              <div className="flex, alignItems-center, gap-8 ">
                <Switch
                  {...switchLabel}
                  checked={switchChecked}
                  onChange={handleSwitchChange}
                  id="required"
                />
                <span>{switchChecked ? "Yes" : "No"}</span>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <UniversalButton label="SAVE" onClick={handleInputSave} />
            </div>
          </div>
        )}

        {/* Editable Options for Checkboxes */}
        {selectedItem?.type === "checkBox" && (
          <FormControl fullWidth>
            <Box sx={{ mb: 2, mt: 3 }}>
              <InputField
                label="Checkbox Group Label"
                tooltipContent="Enter Checkbox Group Label "
                tooltipPlacement="right"
                value={mainLabelCheckbox}
                onChange={(e) => setMainLabelCheckbox(e.target.value)}
                placeholder="Enter label"
                fullWidth
              />
            </Box>

            {checkBoxes.map((opt, idx) => {
              const isEditing = idx === checkboxEditIdx;
              return (
                <Box
                  key={opt.id}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    gap: 4,
                    bgcolor: isEditing ? "#f5f5f5" : "white",
                  }}
                >
                  {isEditing ? (
                    <>
                      <div className="space-y-3">
                        <InputField
                          label="Title"
                          placeholder="Enter Title"
                          tooltipContent="Enter Title"
                          tooltipPlacement="right"
                          value={draftCheckbox.title}
                          onChange={(e) =>
                            setDraftCheckbox((d) => ({
                              ...d,
                              title: e.target.value,
                            }))
                          }
                          fullWidth
                          sx={{ mb: 1 }}
                        />
                        <InputField
                          label="Description"
                          placeholder="Enter Description"
                          tooltipContent="Enter Description"
                          tooltipPlacement="right"
                          value={draftCheckbox.description}
                          onChange={(e) =>
                            setDraftCheckbox((d) => ({
                              ...d,
                              description: e.target.value,
                            }))
                          }
                          fullWidth
                          sx={{ mb: 1 }}
                        />
                        <InputField
                          label="Metadata"
                          placeholder="Enter MetaData"
                          tooltipContent="Enter MetaData"
                          tooltipPlacement="right"
                          value={draftCheckbox.metadata}
                          onChange={(e) =>
                            setDraftCheckbox((d) => ({
                              ...d,
                              metadata: e.target.value,
                            }))
                          }
                          fullWidth
                          sx={{ mb: 1 }}
                        />

                        <Box sx={{ display: "flex", mb: 1 }}>
                          <InputField
                            label="Upload Image"
                            type="file"
                            id="checkbox-file-upload"
                            accept=".png, .jpeg"
                            tooltipContent="Upload Image"
                            tooltipPlacement="right"
                            required
                            onChange={handleCheckboxImageChange}
                            classname=""
                          />
                          <button onClick={handleCheckboxUploadFile}>
                            <FileUploadOutlinedIcon
                              sx={{ fontSize: "23px", marginTop: 3 }}
                            />
                          </button>
                        </Box>

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
                            onClick={handleSaveInlineCheckbox}
                          />
                          <UniversalButton
                            label="Cancel"
                            onClick={handleCancelInlineCheckbox}
                          />
                        </Box>
                      </div>
                    </>
                  ) : (
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box
                        sx={{ flexGrow: 1 }}
                        onClick={() => handleCheckboxEdit(idx)}
                      >
                        <Typography variant="subtitle1">{opt.title}</Typography>
                        <Typography variant="body2">
                          {opt.description}
                        </Typography>
                      </Box>
                      <IconButton onClick={() => handleCheckboxEdit(idx)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleRemoveCheckbox(idx)}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              );
            })}

            <Box sx={{ mt: 1 }}>
              <IconButton onClick={handleCheckboxAddNew}>
                <AddCircleOutlineOutlinedIcon fontSize="medium" />
              </IconButton>
            </Box>

            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
              <UniversalButton
                label="Save Checkbox"
                onClick={handleCheckBoxSave}
              />
            </Box>
          </FormControl>
        )}

        {/* Editable Options for Radio Buttons */}
        {selectedItem?.type === "radioButton" && (
          <FormControl fullWidth>
            <Box sx={{ mb: 2, mt: 3 }}>
              <InputField
                label="Radio Group Label"
                tooltipContent="Enter Radio Group Label"
                tooltipPlacement="right"
                value={radioBtnLabel}
                onChange={(e) => setRadioBtnLabel(e.target.value)}
                placeholder="Enter label"
                fullWidth
              />
            </Box>

            {radioButtonOptions.map((opt, idx) => {
              const isEditing = idx === radiobtnEditIdx;
              return (
                <Box
                  key={opt.id}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    gap: 4,
                    bgcolor: isEditing ? "#f5f5f5" : "white",
                  }}
                >
                  {isEditing ? (
                    <>
                      <div className="space-y-3">
                        <InputField
                          label="Title"
                          placeholder="Enter Title"
                          tooltipContent="Enter Title"
                          tooltipPlacement="right"
                          value={draft.title}
                          onChange={(e) =>
                            setDraft((d) => ({ ...d, title: e.target.value }))
                          }
                          fullWidth
                          sx={{ mb: 1 }}
                        />
                        <InputField
                          label="Description"
                          placeholder="Enter Description"
                          tooltipContent="Enter Description"
                          tooltipPlacement="right"
                          value={draft.description}
                          onChange={(e) =>
                            setDraft((d) => ({
                              ...d,
                              description: e.target.value,
                            }))
                          }
                          fullWidth
                          sx={{ mb: 1 }}
                        />
                        <InputField
                          label="Metadata"
                          placeholder="Enter MetaData"
                          tooltipContent="Enter MetaData"
                          tooltipPlacement="right"
                          value={draft.metadata}
                          onChange={(e) =>
                            setDraft((d) => ({
                              ...d,
                              metadata: e.target.value,
                            }))
                          }
                          fullWidth
                          sx={{ mb: 1 }}
                        />
                        {/* <InputField
                        label="Alt Text"
                        value={draft.altText}
                        onChange={(e) => setDraft((d) => ({ ...d, altText: e.target.value }))}
                        fullWidth
                        sx={{ mb: 1 }}
                       /> */}
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
                            className=""
                          />
                          <button onClick={handleRadioUploadFile}>
                            <FileUploadOutlinedIcon
                              sx={{ fontSize: "23px", marginTop: 3 }}
                            />
                          </button>
                        </Box>

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
                            onClick={handleSaveInlineRadio}
                          />
                          <UniversalButton
                            label="Cancel"
                            onClick={handleCancelInlineRadio}
                          />
                        </Box>
                      </div>
                    </>
                  ) : (
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box
                        sx={{ flexGrow: 1 }}
                        onClick={() => handleRadioBtnEdit(idx)}
                      >
                        <Typography variant="subtitle1">{opt.title}</Typography>
                        <Typography variant="body2">
                          {opt.description}
                        </Typography>
                      </Box>
                      <IconButton onClick={() => handleRadioBtnEdit(idx)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleRemoveRadio(idx)}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              );
            })}

            <Box sx={{ mt: 1 }}>
              <IconButton onClick={handleRadioBtnAddNew}>
                <AddCircleOutlineOutlinedIcon fontSize="medium" />
              </IconButton>
            </Box>

            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
              <UniversalButton
                label="Save RadioButton"
                onClick={handleSaveRadioButton}
              />
            </Box>
          </FormControl>
        )}

        {/* Editable Options for Dropdown */}
        {selectedItem?.type === "dropDown" && (
          <FormControl fullWidth>
            {/* ── Dropdown Label Input ── */}
            <Box sx={{ mb: 2 }}>
              <InputField
                label="Label"
                id="mainlabel"
                tooltipContent="Enter MainLabel"
                tooltipPlacement="right"
                value={mainLabelDropdown}
                onChange={(e) => setMainLabelDropdown(e.target.value)}
                placeholder="Enter label"
                type="text"
                fullWidth
              />
            </Box>

            {/* ── Render Each Option ── */}
            {options.map((opt, idx) => {
              const isEditing = idx === editingIdx;

              return (
                <Box
                  key={opt.id}
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
                    // ── Inline Editing Mode ──
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ mb: 1 }}>
                        <InputField
                          label="Title"
                          id={`edit-title-${idx}`}
                          tooltipContent="Enter Title"
                          tooltipPlacement="right"
                          value={draftTitle}
                          onChange={(e) => setDraftTitle(e.target.value)}
                          placeholder="Enter title"
                          type="text"
                          fullWidth
                          autoFocus
                        />
                      </Box>
                      <Box sx={{ mb: 1 }}>
                        <InputField
                          label="Description"
                          id={`edit-desc-${idx}`}
                          tooltipContent="Enter Description"
                          tooltipPlacement="right"
                          value={draftDescription}
                          onChange={(e) => setDraftDescription(e.target.value)}
                          placeholder="Enter description"
                          type="text"
                          fullWidth
                        />
                      </Box>
                      <Box sx={{ mb: 1 }}>
                        <InputField
                          label="Metadata"
                          id={`edit-meta-${idx}`}
                          tooltipContent="Enter MetaData"
                          tooltipPlacement="right"
                          value={draftMetadata}
                          onChange={(e) => setDraftMetaData(e.target.value)}
                          placeholder="Enter Metadata"
                          type="text"
                          fullWidth
                        />
                      </Box>
                      <Box sx={{ display: "flex", mb: 1 }}>
                        <InputField
                          label="Upload Image"
                          type="file"
                          id="file-upload"
                          accept=".png, .jpeg"
                          tooltipContent="Upload Image"
                          tooltipPlacement="right"
                          required
                          onChange={handleImageChange}
                          // sx={{ display: "none" }}
                        />
                        <button onClick={handleUploadFile}>
                          <FileUploadOutlinedIcon
                            sx={{ fontSize: "23px", marginTop: 3 }}
                          />
                        </button>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          mt: 2,
                          justifyContent: "center",
                        }}
                      >
                        <UniversalButton
                          label="Save Option"
                          onClick={handleSaveInline}
                          disabled={!draftTitle.trim()}
                        />
                        <UniversalButton
                          label="Cancel"
                          className="p-button-text"
                          onClick={handleCancelInline}
                        />
                      </Box>
                    </Box>
                  ) : (
                    // ── Static View with Edit & Remove Icons ──
                    <>
                      <Box
                        sx={{ flexGrow: 1, cursor: "pointer" }}
                        onClick={() => handleStartEdit(idx)}
                      >
                        <Typography variant="subtitle1">{opt.title}</Typography>
                        {opt.description && (
                          <Typography variant="body2" color="textSecondary">
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
                      <IconButton
                        size="small"
                        onClick={() => handleRemove(idx)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </>
                  )}
                </Box>
              );
            })}

            {/* ── “Add” Button: Appends a New Option X ── */}
            <div className="flex justify-center items-center gap-2">
              <Box sx={{ mt: 1 }}>
                <UniversalButton
                  label="Add Option"
                  onClick={handleAddNew}
                  disabled={options.length >= 200}
                />
                {/* <IconButton >
                <AddCircleOutlineOutlinedIcon fontSize="medium" />
              </IconButton> */}
              </Box>

              <Box sx={{ mt: 1 }}>
                <UniversalButton
                  id="save-dropdown-options"
                  label="Save Dropdown"
                  onClick={handleSaveDropdown}
                />
              </Box>
            </div>
          </FormControl>
        )}

        {/* Editable option for chipselector In */}
        {selectedItem?.type === "chipSelector" && (
          <FormControl fullWidth>
            <Box sx={{ mb: 2, mt: 3 }}>
              <InputField
                label="Label"
                placeholder="Enter label"
                tooltipContent="Enter MainLabel"
                tooltipPlacement="right"
                value={chipSelectorLabel}
                onChange={(e) => setChipSelectorLabel(e.target.value)}
              />
            </Box>

            {chipSelectorOptions.map((opt, idx) => {
              const isEditing = idx === editingChipIdx;
              return (
                <Box
                  key={opt.id}
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
                        label="Name"
                        placeholder="Enter Name"
                        value={chipName}
                        onChange={(e) => setChipName(e.target.value)}
                      />
                      <InputField
                        label="Description"
                        placeholder="Enter description"
                        value={chipDescription}
                        onChange={(e) => setChipDescription(e.target.value)}
                      />
                     

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          mt: 2,
                          justifyContent: "center",
                        }}
                      >
                        <UniversalButton
                          label="Save Option"
                          onClick={handleSaveChipSelectorInline}
                          disabled={!chipName.trim()}
                        />
                        <UniversalButton
                          label="Cancel"
                          className="p-button-text"
                          onClick={handleCancelChipSelectorInline}
                        />
                      </Box>
                    </Box>
                  ) : (
                    <>
                      <Box sx={{ flexGrow: 1, cursor: "pointer" }}>
                        <Typography variant="subtitle1">{opt.name}</Typography>
                        {opt.description && (
                          <Typography variant="body2" color="textSecondary">
                            {opt.description}
                          </Typography>
                        )}
                      </Box>
                      <IconButton
                        onClick={() => handleStartChipSelectorEdit(idx)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton onClick={() => handleChipSelectorRemove(idx)}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </>
                  )}
                </Box>
              );
            })}

            <div className="flex justify-center items-center gap-2">
              <UniversalButton
                label="Add Option"
                onClick={handleAddNewChipSelector}
                disabled={chipSelectorOptions.length >= 200}
              />
              <UniversalButton
                id="save-chip-selector"
                label="Save ChipSelector"
                onClick={handleChipSelectorSave}
              />
            </div>
          </FormControl>
        )}

        {/* Editable option for FooterButton  */}
        {selectedItem?.type === "footerbutton" && (
          <div className="mb-2 text-lg space-y-2">
            <InputField
              label="Footer Button Label"
              placeholder="Enter Footer Button Label"
              tooltipContent="Enter Label"
              tooltipPlacement="right"
              id="footer-button-label"
              value={footerButtonLabel}
              onChange={(e) => setFooterButtonLabel(e.target.value)}
            />

            <InputField
              label="Left Caption"
              placeholder="Enter Left Caption"
              id="left-caption"
              tooltipContent="Enter Left Caption"
              tooltipPlacement="rigth"
              value={leftCaption}
              onChange={(e) => setLeftCaption(e.target.value)}
            />

            <InputField
              label="Right Caption"
              placeholder="Enter Right Caption"
              tooltipContent="Enter Right Caption"
              tooltipPlacement="right"
              id="right-caption"
              value={rightCaption}
              onChange={(e) => setRightCaption(e.target.value)}
            />

            <InputField
              label="Center Caption"
              placeholder="Enter Center Caption"
              tooltipContent="Enter Center Caption"
              tooltipPlacement="right"
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
            <div className="flex justify-center ">
              <UniversalButton label="SAVE" onClick={handleFooterSave} />
            </div>
          </div>
        )}

        {/* Editable option for Embedded link */}
        {selectedItem?.type === "embeddedlink" && (
          <>
            <InputField
              label=" "
              type="url"
              value={link}
              tooltipContent="Enter Url Link"
              tooltipPlacement=""
              placeholder="Button Embedded Link"
              onChange={handleChange}
            />
            <div className="mt-5 space-y-3">
              <AnimatedDropdown
                id="next-action"
                label="Action"
                options={[
                  { value: "data-exchage", label: "Data Exchange" },
                  { value: "navigate", label: "Navigate" },
                  { value: "open-url", label: "Open URL" },
                ]}
                value={onClickAction}
                onChange={(value) => setOnClickAction(value)}
              />

              <UniversalButton label="Save" onClick={handleOPTSave} />
            </div>
          </>
        )}

        {/* Editable option for Opt In */}
        {selectedItem?.type === "optin" && (
          <>
            <div className="space-y-3">
              <InputField
                label="OPT-In Label"
                type="text"
                value={optLabel}
                onChange={(e) => setOptLabel(e.target.value)}
              />

              <InputField
                label="OPT-In Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />

              {isChecked && (
                <AnimatedDropdown
                  id="next-action"
                  label="Action"
                  options={[
                    { value: "data-exchage", label: "Data Exchange" },
                    { value: "navigate", label: "Navigate" },
                    { value: "open-url", label: "Open URL" },
                  ]}
                  value={optAction}
                  onChange={(value) => setOPTAction(value)}
                />
              )}

              <UniversalButton
                label="Read More"
                onClick={handleOPTSave}
                className="text-blue-600 underline text-sm w-fit"
              />
            </div>
          </>
        )}

        {/* Editable option for Image In */}
        {selectedItem?.type === "image" && (
          <>
            <div className="space-y-3">
              <InputField
                type="file"
                id="file-upload"
                accept=".png, .jpeg"
                required={true}
                onChange={handlePhotoUpload}
              />

              {/* {imageSrc && (
                <img
                  src={imageSrc}
                  alt="Uploaded preview"
                  style={{ maxWidth: "100%", marginTop: "10px" }}
                />
              )} */}

              {/* <InputField
                label="Width"
                type="integer"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />

              <InputField
                label="Height"
                type="integer"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              /> */}

              <InputField
                label="Scale-Type"
                type="text"
                value={scaleType}
                onChange={(e) => setSCaleType(e.target.value)}
              />

              {/* <InputField
                label="Aspect-Ratio"
                type="number"
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
              /> */}

              <InputField
                label="Alt-Text"
                value={imgAltText}
                type="text"
                onChange={(e) => setImgAltText(e.target.value)}
              />
              <div className="flex justify-center">
                <UniversalButton label="Save" onClick={handleImageSave} />
              </div>
            </div>
          </>
        )}

        {/* Editable option for document In */}
        {selectedItem?.type === "document" && (
          <>
            <div className="space-y-3 mt-3">
              <InputField
                label="Upload Documents"
                placeholder="Enter Label"
                tooltipContent="Enter Label For Upload Document"
                tooltipPlacement="right"
                type="text"
                value={documentLabel}
                onChange={(e) => setDocumentLabel(e.target.value)}
              />

              <InputField
                label="Description"
                placeholder="Enter Description"
                tooltipContent="Enter Description for Document"
                tooltipPlacement="right"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <InputField
                label="Min-Upload-Document"
                placeholder="Minimum 1 document upload"
                tooltipContent="Minimum 1 document upload"
                tooltipPlacement="right"
                type="text"
                value={minDocsUpload}
                onChange={(e) => setMinDocsUpload(e.target.value)}
              />

              <InputField
                label="Max-Upload-Document"
                placeholder="Maximum 1 document Upload"
                tooltipContent="Maximum 1 document Upload"
                tooltipPlacement="right"
                value={maxDocsUpload}
                onChange={(e) => setMaxDocsUpload(e.target.value)}
              />

              {/* <InputField
                label="List-items"
                minLength={1}
                maxLength={20}
                required={true}
                value={listItems}
                onChange={(e) => setListItems(e.target.value)}
              /> */}

              <div className="flex justify-center">
                <UniversalButton label="Save" onClick={handleDocumentSave} />
              </div>
            </div>
          </>
        )}

        {/* Editable option for media In */}
        {selectedItem?.type === "media" && (
          <>
            <div className="space-y-3 mt-3">
              <InputField
                label="Upload photos"
                placeholder="Enter Label"
                tooltipContent="Enter Label For Upload Photo"
                tooltipPlacement="right"
                value={mediaLabel}
                onChange={(e) => setMediaLabel(e.target.value)}
              />

              <InputField
                label="Description"
                placeholder="Enter Description"
                tooltipContent="Enter Description for Photo"
                tooltipPlacement="right"
                value={mediaDescription}
                onChange={(e) => setMediaDescription(e.target.value)}
              />

              <InputField
                label="Min-Upload-Photo"
                placeholder="Minimum 1 photo upload"
                tooltipContent="Minimum 1 photo upload"
                tooltipPlacement="right"
                type="number"
                value={minPhotoUpload}
                onChange={(e) => setMinPhotoUpload(e.target.value)}
              />

              <InputField
                label="Max-Upload-Photos"
                placeholder="Maximum 1 photos Upload"
                tooltipContent="Maximum 1 photos Upload"
                tooltipPlacement="right"
                type="number"
                value={maxPhotoUpload}
                onChange={(e) => setMaxPhotoUpload(e.target.value)}
              />

              <div className="flex justify-center">
                <UniversalButton label="Save" onClick={handleMediaSave} />
              </div>
            </div>
          </>
        )}

        {/* Editable option for if-else In */}
        {selectedItem?.type === "ifelse" && (
          <InputField
            placeholder="If-Else"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}

        {/* Editable option for date In */}
        {selectedItem?.type === "date" && (
          <div className="space-y-3 mt-3">
            <InputField
              label="Date Label"
              placeholder="Enter Date Label"
              tooltipContent="Enter Date Label"
              tooltipPlacement="right"
              maxLength={40}
              value={dateLable}
              onChange={(e) => setDateLabel(e.target.value)}
            />

            <InputField
              label="Name"
              placeholder="Enter Name"
              tooltipContent="Enter Name for DatePicker"
              tooltipPlacement="right"
              value={dateName}
              onChange={(e) => setDateName(e.target.value)}
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
              onChange={(value) => setMinDate(value)}
            />

            <UniversalDatePicker
              label="Max-Date"
              tooltipContent="Select Max-Date"
              tooltipPlacement="right"
              value={maxDate}
              onChange={(value) => setMaxDate(value)}
            />

            <UniversalDatePicker
              label="Unavailable Dates"
              tooltipContent="Select Unavailable-Date"
              tooltipPlacement="right"
              value={unavailableDate}
              onChange={(value) => setUnavailableDate(value)}
            />
            <div className="flex justify-center">
              <UniversalButton label="Save" onClick={handleDateSave} />
            </div>
          </div>
        )}

        {/* Editable option for calendar In */}
        {selectedItem?.type === "calendar" && (
          <div className="space-y-3 mt-3">
            <InputField
              label="Calendar Label"
              tooltipContent="Enter Label for Calendar "
              tooltipPlacement="right"
              placeholder="Calendar Label"
              maxLength={40}
              value={dateCalendarLable}
              onChange={(e) => setDateCalendarLabel(e.target.value)}
            />

            <InputField
              label="Name"
              tooltipContent="Enter Name for Calendar "
              tooltipPlacement="right"
              placeholder="Enter Name"
              value={dateCalendarName}
              onChange={(e) => setDateCalendarName(e.target.value)}
            />
            <InputField
              label="Helper Text"
              placeholder="Enter Placeholder for Date"
              tooltipContent="Enter Placeholder for Date"
              tooltipPlacement="right"
              value={dateCalendarPlaceholder}
              onChange={(e) => setDateCalendarPlaceholder(e.target.value)}
            />

            <UniversalDatePicker
              label="Min-Date"
              tooltipContent="Select Min-Date"
              tooltipPlacement="right"
              value={minCalendarDate}
              onChange={(value) => setMinCalendarDate(value)}
            />

            <UniversalDatePicker
              label="Max-Date"
              tooltipContent="Select Max-Date"
              tooltipPlacement="right"
              value={maxCalendarDate}
              onChange={(value) => setMaxCalendarDate(value)}
            />
            <UniversalDatePicker
              label="Unavailable Dates"
              tooltipContent="Select Unavailable-Date"
              tooltipPlacement="right"
              value={null}
              onChange={handleAddUnavailableDate}
            />
            <div className="flex flex-wrap gap-2 mt-2 ">
              {unavailableCalendarDates.map((date, index) => (
                <Chip
                  sx={{ padding: 1 }}
                  key={index}
                  label={new Date(date).toLocaleDateString()}
                  onDelete={() =>
                    setUnavailableCalendarDates((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                />
              ))}
            </div>
            <div className="flex justify-center">
              <UniversalButton label="Save" onClick={handleCalendarSave} />
            </div>
          </div>
        )}

        {/* {selectedItem?.type === "userdetail" && (
          <>
            <InputField
              placeholder="User Details"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Switch
              color={isToggled ? "primary" : "secondary"}
              onClick={handleToggle}
              // {isToggled ? "ON" : "OFF"}
            />
            {isToggled && (
              <AnimatedDropdown
                value={isToggled}
                onChange={(value) => handleToggle(value)}
                fullWidth
                sx={{ marginTop: 2 }}
                // visible={isToggled === isToggled}
                options={[
                  { value: "A", label: "A" },
                  { value: "B", label: "B" },
                  { value: "C", label: "C" },
                  { value: "D", label: "D" },
                ]}
              />
            )}
          </>
        )} */}

        {/* Save Button */}
        {/* <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <UniversalButton
            onClick={handleSave}
            label="Save"
            className="btn-flow2"
          >
            Save
          </UniversalButton>
        </Box> */}
      </Paper>
    </Box>
  );
};

export default EditPanel;
