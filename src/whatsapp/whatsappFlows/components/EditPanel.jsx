import React, { useState, useEffect, useRef } from "react";
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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { motion, AnimatePresence } from "framer-motion";
import UniversalLabel from "@/whatsapp/components/UniversalLabel";
import SwitchFlow from "./SwitchFlow";
import RichTextEditor from "./Editor.jsx";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";
import { useSelector } from "react-redux";
import ClickAwayListener from "@mui/material/ClickAwayListener";


const EditPanel = ({
  selectedItem,
  onClose,
  onSave,
  headingValue,
  setHeadingValue,
  openIfElse,
  setOpenIfElse,
  setLabelValue,
  labelValue,
  placeholderValue,
  setPlaceholderValue,
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
  errorValue,
  setErrorValue,
  switchChecked,
  setSwitchChecked,
  screens,
  handleComponentUpdate,
  onUpdate,
  editPanelRef,
  setSelectedItem,
}) => {
  // const [options, setOptions] = useState([]);
  const [checked, setChecked] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [newOption, setNewOption] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  // const [file, setFile] = useState("")
  const [uploadPhoto, setUploadPhoto] = useState("");

  useEffect(() => {
    if (selectedItem) {
      // setValue(selectedItem.value || "");
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

  // const [selectedOptionsType, setSelectedOptionsType] = useState(null);
  const [inputValue, setInputValue] = useState("");
  // const [maxValue, setMaxValue] = useState("");
  // const [minValue, setMinValue] = useState("");
  // const [labelValue, setLabelValue] = useState("");
  // const [errorValue, setErrorValue] = useState("");
  // const [placeholderValue, setPlaceholderValue] = useState("");
  // const [switchChecked, setSwitchChecked] = useState(false);

  // const switchLabel = { inputProps: { "aria-label": "Switch demo" } };
  // const handleErrorChange = (e) => setErrorValue(e.target.value);
  // const handleLabelChange = (e) => setLabelValue(e.target.value);
  // const handlePlaceholder = (e) => setPlaceholderValue(e.target.value);
  // const handleSwitchChange = (event) => {
  //   setSwitchChecked(event.target.checked);
  // };

  // const handleDropdownChange = (val) => {
  //   const option = OptionsTypeOptions.find((opt) => opt.value === val) || null;
  //   setSelectedOptionsType(option);
  //   setInputValue("");
  // };

  // const handleInputChange = (e) => {
  //   const val = e.target.value;
  //   if (selectedOptionsType?.value === "number") {
  //     // Enforce digit count limits
  //     if (/^\d*$/.test(val)) {
  //       if (!maxValue || val.length <= Number(maxValue)) {
  //         setInputValue(val);
  //       }
  //     }
  //   } else {
  //     // Text/email: enforce length via HTML attrs
  //     setInputValue(val);
  //   }
  // };

  // const handleMaxChange = (e) => {
  //   console.log("e", e.target.value);

  //   const val = e.target.value;
  //   if (/^\d*$/.test(val)) {
  //     setMaxValue(val);
  //     if (
  //       selectedOptionsType?.value === "number" &&
  //       inputValue.length > Number(val)
  //     ) {
  //       setInputValue(inputValue.slice(0, Number(val)));
  //     }
  //   }
  // };

  // const handleMinChange = (e) => {
  //   console.log("e", e.target.value);
  //   const val = e.target.value;
  //   if (/^\d*$/.test(val)) setMinValue(val);
  // };

  // console.log("minVal", minValue);
  // const isNumberType = selectedOptionsType?.value === "number";
  // const maxNum = maxValue ? Number(maxValue) : "";
  // const minNum = minValue ? Number(minValue) : "";

  // const handleInputSave = () => {
  //   if (!labelValue) {
  //     toast.error("Please Enter Label");
  //     return;
  //   }
  //   if (!placeholderValue) {
  //     toast.error("Please Enter Placeholder value");
  //     return;
  //   }

  //   const typeMapping = {
  //     textInput: "TextInput",
  //     textArea: "TextArea",
  //   };

  //   const selectedType = selectedItem?.type; // e.g., 'textInput' or 'textArea'
  //   const mappedType = typeMapping[selectedType];

  //   if (!selectedType || !mappedType) {
  //     toast.error("Invalid input type");
  //     return;
  //   }

  //   const payload = {
  //     texts: {},
  //   };

  //   const id = `${selectedType}_1`; // Assuming only 1 for now
  //   payload.texts[id] = {
  //     inputType: mappedType,
  //     label: labelValue,
  //     helper_text: placeholderValue,
  //     min_chars: minNum,
  //     max_chars: maxNum,
  //     error_message: errorValue || "",
  //     required: switchChecked,
  //   };

  //   console.log("payload by input", payload);

  //   const updatedData = {
  //     ...selectedItem,
  //     ...payload,
  //   };

  //   onSave(updatedData);
  //   onClose();
  //   console.log(updatedData);
  // };

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
  const embeddedscreenName = useSelector((state) => state.flows.screenName);
  // console.log("screenNameedtred:", screenName);

  const [text, setText] = useState("");
  const [onClickAction, setOnClickAction] = useState("complete");
  const [selectedScreenName, setSelectedScreenName] = useState("");
  const [embeddedlinktUrl, setEmbeddedlinktUrl] = useState("");

  // Get list of screens from screenName
  const screenNameOptions = Object.values(embeddedscreenName).map(
    (screen, index) => ({
      label: screen.screenName || `Screen ${index + 1}`,
      value: screen.screenName || `Screen ${index + 1}`,
    })
  );

  useEffect(() => {
    if (selectedItem) {
      setText(selectedItem.text || "");
      setEmbeddedlinktUrl(selectedItem.url || "");

      const action = selectedItem["on-click-action"] || "complete";
      setOnClickAction(action);
      setSelectedScreenName(selectedItem.screen);
    }
  }, [selectedItem]);

  const handleEmbeddedLinkSave = () => {
    if (!text) {
      toast.error("Text is required");
      return;
    }

    if (!onClickAction) {
      toast.error("Action Requi");
    }
    const payload = {
      text: text,
      "on-click-action": onClickAction,
      ...(onClickAction === "open_url" && { url: embeddedlinktUrl }),
      ...(onClickAction === "navigate" && { screen: selectedScreenName }),
    };

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    // console.log("payloadlink:", payload);

    onSave(updatedData);
    onClose();
  };

  // richtextPayload
  const [richTextPayload, setRichTextPayload] = useState();

  // // opt-in
  const [optLabel, setOptLabel] = useState("");
  const [optAction, setOPTAction] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [optUrl, setOptUrl] = useState("");
  const [optInRequired, setOptInRequired] = useState(false);

  const handleOptInRequiredChange = () => {
    setOptInRequired((prev) => !prev);
  };

  const [optSelectedScreenName, setOptSelectedScreenName] = useState("");

  // useEffect(() => {
  //   console.log("selectedItemooooppppttttiiinnn", selectedItem.screen);
  //   if (selectedItem) {
  //     setOptLabel(selectedItem.label || "");
  //     setOPTAction(selectedItem["on-click-action"]);
  //     setOptSelectedScreenName(selectedItem.screen);
  //     setOptUrl(selectedItem.url || "");
  //     setOptInRequired(selectedItem.required ?? true);
  //   }
  // }, [selectedItem]);

  useEffect(() => {
    if (selectedItem) {
      setOptLabel(selectedItem.label || "");
      setOptUrl(selectedItem.url || "");

      const action = selectedItem["on-click-action"] || "complete";
      setOPTAction(action);
      setOptSelectedScreenName(selectedItem.screen);

      // console.log("selectedItem.screen", selectedItem.screen);
      setOptInRequired(selectedItem.required ?? true);
    }
  }, [selectedItem]);

  const allscreenName = useSelector((state) => state.flows.screenName) || {};
  // console.log("allflowItems:", allscreenName);

  const optScreenNameOptions = Object.values(allscreenName).map(
    (screen, index) => ({
      label: screen.screenName || `Screen ${index + 1}`,
      value: screen.screenName || `Screen ${index + 1}`,
    })
  );
  // console.log("optScreenNameOptions", optScreenNameOptions);

  // useEffect(() => {
  //   if (optAction !== "navigate") {
  //     setOptSelectedScreenName("");
  //   }
  // }, [optAction]);

  const handleOPTSave = () => {
    if (!optLabel) {
      toast.error("Label is reuired");
      return;
    }
    const payload = {
      label: optLabel,
      required: optInRequired,
      "on-click-action": optAction,
      ...(optAction === "open_url" && { url: optUrl }),
      ...(optAction === "navigate" && { screen: optSelectedScreenName }),
    };

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    onSave(updatedData);
    onClose();
  };

  // image
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [scaleType, setSCaleType] = useState("contain");
  const [aspectRatio, setAspectRatio] = useState(1);
  const [imgAltText, setImgAltText] = useState("");
  const [imageSrc, setImageSrc] = useState(null); // will hold base64 only
  const [imageFile, setImageFile] = useState(null); // null or File object
  const imageSrcFile =
    imageFile && typeof imageFile === "string"
      ? `data:image/png;base64,${imageFile}`
      : "";

  const imageSrcUrl =
    imageFile && typeof imageFile === "object"
      ? URL.createObjectURL(imageFile)
      : "";

  const finalSrc = imageSrcFile || imageSrcUrl;

  const imageInputRef = useRef(null);

  useEffect(() => {
    if (selectedItem) {
      setImageFile(selectedItem.src); // No File object to preload

      setImgAltText(selectedItem["alt-text"] || "");
      setAspectRatio(
        typeof selectedItem["aspect-ratio"] === "number"
          ? selectedItem["aspect-ratio"]
          : 1
      );
      setSCaleType(selectedItem["scale-type"] || "contain");
      setImageSrc(selectedItem.src || null);
    }
  }, [selectedItem]);

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

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }

    if (!file.type.match(/^image\/(png|jpeg)$/)) {
      toast.error("Only JPEG and PNG images are supported.");
      e.target.value = "";
      return;
    }

    if (file.size > 300 * 1024) {
      toast.error("Recommended image size is up to 300KB.");
      e.target.value = "";
      return;
    }

    if (imageFile) {
      toast.error("Only 1 image allowed per screen.");
      e.target.value = "";
      return;
    }

    setImageFile(file);

    try {
      const base64String = await getBase64(file);
      setImageSrc(base64String); // store base64 only
      setDraft((prev) => ({
        ...prev,
        image: base64String,
      }));
      toast.success("Image loaded successfully!");
    } catch {
      toast.error("Failed to convert image to base64");
    }
  };

  const handleImageDelete = () => {
    if (!imageFile && !imageSrc) {
      toast.error("No image to delete");
      return;
    }

    setImageSrc(null);
    setImageFile(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
    toast.success("File deleted successfully");
  };

  const handleImageSave = () => {
    if (!imageFile && !imageSrc) {
      toast.error("Image required");
      return;
    }

    if (!imageSrc) {
      toast.error("No image source available");
      return;
    }

    const payload = {
      src: imageSrc.trim(), // base64 string
      "scale-type": scaleType,
      "aspect-ratio": aspectRatio,
      "alt-text": imgAltText,
    };

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    const totalPayloadSizeKB = JSON.stringify(updatedData).length / 1024;
    if (totalPayloadSizeKB > 1024) {
      toast.error("Total payload size exceeds 1 MB.");
      return;
    }

    onSave(updatedData);
    onClose();
  };

  // IMAGECarousel
  const [imageCarouselImages, setImageCarouselImages] = useState([
    { src: "", file: null },
    { src: "", file: null },
    { src: "", file: null },
  ]);

  const [imageCarouselScaleType, setImageCarouselScaleType] = useState("");
  // const [imageCarouselAspectRatio, setImageCarouselAspectRatio] =
  //   useState("4:3");
  const [imageCarouselAltText, setImageCarouselAltText] = useState("");
  const imageCarouselInputRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (selectedItem) {
      setImageCarouselAltText(selectedItem?.["image-1"]?.["alt-text"] || "");
      // setImageCarouselAspectRatio(selectedItem["aspect-ratio"] || "4:3");
      setImageCarouselScaleType(selectedItem["scale-type"] || "");

      if (Array.isArray(selectedItem.images)) {
        const mappedImages = selectedItem.images.map((img) => ({
          file: null,
          src: img?.src || "",
        }));
        setImageCarouselImages(mappedImages);
      }
    }
  }, [selectedItem]);

  const imageCarouselInputRef = useRef(null);

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];

        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  const handleImageCarouselChange = (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/image\/(png|jpeg)/)) {
      toast.error("Please select a .png or .jpeg file");
      return;
    }

    if (imageCarouselImages[index].file) {
      toast.error(
        `Please delete the existing image before uploading a new one in slot ${index + 1
        }`
      );
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1];
      const updated = [...imageCarouselImages];
      updated[index] = { src: base64, file };
      setImageCarouselImages(updated);
      toast.success(`Image ${index + 1} uploaded successfully`);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = async () => {
    if (!imageCarouselImages) {
      toast.error("Please select an image first before uploading");
      return;
    }
    const src = await getBase64(imageCarouselImages);
    toast.success("Image Uploaded Successfully");
    setImageCarouselImages(src);
  };

  const handleImageCarouselDelete = (index) => {
    const updated = [...imageCarouselImages];
    if (!updated[index].file) {
      toast.error("File not exist.");
      return;
    }

    updated[index] = { file: null, src: null };
    setImageCarouselImages(updated);
    if (imageCarouselInputRefs[index].current) {
      imageCarouselInputRefs[index].current.value = "";
    }
    toast.success(`Image ${index + 1} deleted`);
  };

  const handleImageCarouselSave = async () => {
    if (imageCarouselImages.some((img) => !img)) {
      toast.error("Please upload all three images");
      return;
    }

    const payload = {
      "scale-type": imageCarouselScaleType,
      //  "aspect-ratio": imageCarouselAspectRatio,
      "image-1": {
        src: imageCarouselImages[0].src || "",
        "alt-text": imageCarouselAltText || "",
      },
      "image-2": {
        src: imageCarouselImages[1].src || "",
        "alt-text": imageCarouselAltText || "",
      },
      "image-3": {
        src: imageCarouselImages[2].src || "",
        "alt-text": imageCarouselAltText || "",
      },
    };

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    onSave(updatedData);
    onClose();
  };

  // date
  const [dateLable, setDateLabel] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [unavailableDate, setUnavailableDate] = useState([]);
  const [datePlaceholder, setDatePlaceholder] = useState("");

  useEffect(() => {
    if (selectedItem) {
      setDateLabel(selectedItem.label || "");
      setDatePlaceholder(selectedItem["helper-text"]);
      setMinDate(
        selectedItem["min-date"] ? new Date(selectedItem["min-date"]) : null
      );
      setMaxDate(
        selectedItem["max-date"] ? new Date(selectedItem["max-date"]) : null
      );
      setUnavailableDate(
        Array.isArray(selectedItem["unavailable-dates"])
          ? selectedItem["unavailable-dates"]
          : []
      );
    }
  }, [selectedItem]);

  const formatDateToString = (date) => {
    if (!date) return null;
    const d = moment(date);
    if (!d.isValid()) return null;
    return d.format("YYYY-MM-DD");
  };

  const formatArrayToDates = (dates) => {
    if (!Array.isArray(dates)) return [];
    return dates
      .filter((date) => date instanceof Date && !isNaN(date))
      .map(formatDateToString)
      .filter(Boolean);
  };

  const handleAddUnavailableDate = (date) => {
    const formatted = formatDateToString(date);
    const d = moment(date);
    const min = moment(minDate);
    const max = moment(maxDate);

    // Check if within range
    const isValid =
      (!min.isValid() || d.isSameOrAfter(min, "day")) &&
      (!max.isValid() || d.isSameOrBefore(max, "day"));

    if (
      formatted &&
      !unavailableDate.some((d) => formatDateToString(d) === formatted)
    ) {
      setUnavailableDate((prev) => [...prev, date]);
    }
  };

  // Handle removing a selected date
  const handleRemoveUnavailableDate = (indexToRemove) => {
    setUnavailableDate((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleDateSave = () => {
    if (!dateLable) {
      toast.error("Please Enter Label");
      return;
    }

    const minDates = moment(minDate);
    const maxDates = moment(maxDate);

    if (
      minDates.isValid() &&
      maxDates.isValid() &&
      maxDates.isBefore(minDates)
    ) {
      toast.error("Max date cannot be earlier than Min date");
      return;
    }

    const validUnavailableDates = unavailableDate.filter((date) => {
      const d = moment(date);
      return (
        d.isValid() &&
        (!minDates.isValid() || d.isSameOrAfter(minDates, "day")) &&
        (!maxDates.isValid() || d.isSameOrBefore(maxDates, "day"))
      );
    });

    const payload = {
      label: dateLable,
      "min-date": formatDateToString(minDate),
      "max-date": formatDateToString(maxDate),
      "unavailable-dates": formatArrayToDates(validUnavailableDates),
      "helper-text": datePlaceholder,
    };

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    onSave(updatedData);
    onClose();
  };

  // Calendar
  const [dateCalendarLable, setDateCalendarLabel] = useState("");
  const [minCalendarDate, setMinCalendarDate] = useState("");

  const [maxCalendarDate, setMaxCalendarDate] = useState("");
  const [unavailableCalendarDates, setUnavailableCalendarDates] = useState([]);
  const [dateCalendarPlaceholder, setDateCalendarPlaceholder] = useState("");
  const [startCalenderRequired, setStartCalendarRequired] = useState(false);
  const [calendarMode, setCalendarMode] = useState("single");
  const [endCalendarLabel, setEndCalendarLabel] = useState("");
  const [endCalendarHelperText, setEndCalendarHelperText] = useState("");
  const [endCalendarRequired, setEndCalendarRequired] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setDateCalendarLabel(selectedItem.label?.["start-date"] || "");
      // setEndCalendarLabel(selcetedItem.label["end-date"] || "")
      setCalendarMode(selectedItem.mode);
      setEndCalendarLabel(selectedItem.label?.["end-date"]);
      setEndCalendarHelperText(selectedItem["helper-text"]?.["end-date"]);
      setMinCalendarDate(
        selectedItem["min-date"] ? new Date(selectedItem["min-date"]) : null
      );
      setMaxCalendarDate(
        selectedItem["max-date"] ? new Date(selectedItem["max-date"]) : null
      );
      setUnavailableCalendarDates(
        Array.isArray(selectedItem["unavailable-dates"])
          ? selectedItem["unavailable-dates"].map(
            (dateStr) => new Date(dateStr)
          )
          : []
      );

      setDateCalendarPlaceholder(
        selectedItem["helper-text"]?.["start-date"] || ""
      );
      setStartCalendarRequired(selectedItem.required || "");
      setEndCalendarRequired(selectedItem.required?.["end-date"]);
    }
  }, [selectedItem]);

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

  const handleAddCalendarUnavailableDate = (date) => {
    const formatted = formatDateToString(date);
    const d = moment(date);
    const min = moment(minCalendarDate);
    const max = moment(maxCalendarDate);

    // Check if within range
    const isValid =
      (!min.isValid() || d.isSameOrAfter(min, "day")) &&
      (!max.isValid() || d.isSameOrBefore(max, "day"));

    if (!isValid) {
      toast.error("Unavailable date must be between Min and Max dates");
      return;
    }

    if (
      formatted &&
      !unavailableCalendarDates.some((d) => formatDateToString(d) === formatted)
    ) {
      setUnavailableCalendarDates((prev) => [...prev, date]);
    }
  };

  // Handle removing a selected date
  const handleRemoveCalendarUnavailableDate = (indexToRemove) => {
    setUnavailableCalendarDates((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleChecked = (e) => {
    setModeRange(e.target.checked);
  };

  const handleRequiredChange = () => {
    setStartCalendarRequired((prev) => !prev);
  };

  const handleEndRequiredChange = () => {
    setEndCalendarRequired((prev) => !prev);
  };

  const handleCalendarSave = () => {
    if (!dateCalendarLable) {
      toast.error("Please Enter Label");
      return;
    }

    const minDate = moment(minCalendarDate);
    const maxDate = moment(maxCalendarDate);

    // Filter unavailable dates within range
    const validUnavailableDates = unavailableCalendarDates.filter((date) => {
      const d = moment(date);
      return (
        d.isValid() &&
        (!minDate.isValid() || d.isSameOrAfter(minDate, "day")) &&
        (!maxDate.isValid() || d.isSameOrBefore(maxDate, "day"))
      );
    });

    const payload =
      calendarMode === "single"
        ? {
          mode: "single",
          label: dateCalendarLable,
          "helper-text": dateCalendarPlaceholder,
          required: startCalenderRequired,
          "min-date": formatDateCalendarToString(minCalendarDate),
          "max-date": formatDateCalendarToString(maxCalendarDate),
          "unavailable-dates": formatArrayToCalendarDates(
            validUnavailableDates
          ),
        }
        : {
          mode: "range",
          label: {
            "start-date": dateCalendarLable || "",
            "end-date": endCalendarLabel || "",
          },
          "helper-text": {
            "start-date": dateCalendarPlaceholder || "",
            "end-date": endCalendarHelperText || "",
          },
          required: {
            "start-date": startCalenderRequired,
            "end-date": endCalendarRequired,
          },
          "min-date": formatDateCalendarToString(minCalendarDate),
          "max-date": formatDateCalendarToString(maxCalendarDate),
          "unavailable-dates": formatArrayToCalendarDates(
            validUnavailableDates
          ),
        };

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    onSave(updatedData);
    onClose();
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

  useEffect(() => {
    if (selectedItem) {
      setDocumentLabel(selectedItem.label || "");
      setDescription(selectedItem.description || "");
      setMinDocsUpload(selectedItem["min-uploaded-documents"] || "");
      setMaxDocsUpload(selectedItem["max-uploaded-documents"] || "");
    }
  }, [selectedItem]);

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

    toast.success("Document saved successfully!");

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    onSave(updatedData);
    onClose();
  };

  // media
  const [mediaLabel, setMediaLabel] = useState("");
  const [mediaDescription, setMediaDescription] = useState("");
  const [minPhotoUpload, setMinPhotoUpload] = useState("");
  const [maxPhotoUpload, setMaxPhotoUpload] = useState("");
  const [mediaRequired, setMediaRequied] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setMediaLabel(selectedItem.label || "");
      setMediaDescription(selectedItem.description || "");
      setMinPhotoUpload(selectedItem["min-uploaded-photos"] || "");
      setMaxPhotoUpload(selectedItem["max-uploaded-photos"] || "");
      setMediaRequied(selectedItem.required ?? true);
    }
  }, [selectedItem]);

  const handleMediaRequiredChange = () => {
    setMediaRequied((prev) => !prev);
  };

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

    toast.success("Media saved successfully!");

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    onSave(updatedData);
    onClose();
  };

  // footertype
  // const [footerButtonLabel, setFooterButtonLabel] = useState("");
  // const [leftCaption, setLeftCaption] = useState("");
  // const [rightCaption, setRightCaption] = useState("");
  // const [centerCaption, setCenterCaption] = useState("");
  // const [nextAction, setNextAction] = useState("complete");
  // const [caption, setCaption] = useState("");

  // console.log(nextAction, "NEXTACTIONFOOTER")
  // // console.log("leftCaption", leftCaption);
  // // console.log("rightCaption", rightCaption);
  // // console.log("centerCaption", centerCaption);

  // useEffect(() => {
  //   if (selectedItem) {
  //     console.log(selectedItem, "selectedItemfooter");
  //     setFooterButtonLabel(selectedItem.label || "");
  //     // setLeftCaption(selectedItem["left-caption"] || "");
  //     // setRightCaption(selectedItem["right-caption"] || "");
  //     setCenterCaption(selectedItem["center-caption"] || "");
  //     // setNextAction(
  //     //   (selectedItem["on-click-action"] &&
  //     //     selectedItem["on-click-action"].name) ||
  //     //   ""
  //     // );

  //     const action = selectedItem["on-click-action"] || "";
  //     setNextAction(action);

  //     setCaption(selectedItem.caption || "center");

  //     // Derive caption type from data
  //     // if (selectedItem["center-caption"]) {
  //     //   setCaption("center");
  //     // } else if (
  //     //   selectedItem["left-caption"] ||
  //     //   selectedItem["right-caption"]
  //     // ) {
  //     //   setCaption("left-right");
  //     // } else {
  //     //   setCaption("");
  //     // }

  //     console.log("caption", caption);

  //     //   if (caption === "center") {
  //     //     setCenterCaption(selectedItem["center-caption"] || "");
  //     //   } else if (caption === "left-right") {
  //     //     setLeftCaption(selectedItem["left-caption"] || "");
  //     //     setRightCaption(selectedItem["right-caption"] || "");
  //     //   }
  //   }
  // }, [selectedItem?.id]);

  // const handleFooterSave = () => {
  //   if (!footerButtonLabel) {
  //     toast.error("Please enter a Footer Button Label");
  //     return;
  //   }

  //   if (!nextAction) {
  //     toast.error("Action is required.");
  //     return;
  //   }

  //   // if (centerCaption && (leftCaption || rightCaption)) {
  //   //   toast.error(
  //   //     "Cannot set center caption together with left/right captions"
  //   //   );
  //   //   return;
  //   // }

  //   // if ((leftCaption && !rightCaption) || (!leftCaption && rightCaption)) {
  //   //   toast.error("Both left and right captions must be provided together");
  //   //   return;
  //   // }

  //   const payload = {
  //     //  id: selectedItem.id,
  //     label: footerButtonLabel,
  //     "on-click-action": nextAction || "",
  //   };

  //   if (centerCaption) {
  //     payload["center-caption"] = centerCaption;
  //   }

  //   // if (leftCaption && rightCaption) {
  //   //   payload["left-caption"] = leftCaption;
  //   //   payload["right-caption"] = rightCaption;
  //   // }

  //   const updatedData = {
  //     ...selectedItem,
  //     ...payload,
  //     // caption,
  //   };

  //   // if (caption === "center" && centerCaption) {
  //   //   updatedData["center-caption"] = centerCaption;
  //   // }

  //   // if (caption === "left-right") {
  //   //   if (leftCaption) updatedData["left-caption"] = leftCaption;
  //   //   if (rightCaption) updatedData["right-caption"] = rightCaption;
  //   // }

  //   console.log(updatedData, "updatedDatafooter");

  //   onSave(updatedData);
  //   onClose();
  // };

  // const [footerButtonLabel, setFooterButtonLabel] = useState("");
  // const [leftCaption, setLeftCaption] = useState("");
  // const [rightCaption, setRightCaption] = useState("");
  // const [centerCaption, setCenterCaption] = useState("");
  // const [nextAction, setNextAction] = useState("complete");
  // const [caption, setCaption] = useState("");

  // // console.log("leftCaption", leftCaption);
  // // console.log("rightCaption", rightCaption);
  // // console.log("centerCaption", centerCaption);

  // useEffect(() => {
  //   if (selectedItem) {
  //     console.log(selectedItem, "selectedItemfooter");
  //     setFooterButtonLabel(selectedItem.label || "");
  //     setLeftCaption(selectedItem["left-caption"] || "");
  //     setRightCaption(selectedItem["right-caption"] || "");
  //     setCenterCaption(selectedItem["center-caption"] || "");
  //     setNextAction(
  //       (selectedItem["on-click-action"] &&
  //         selectedItem["on-click-action"].name) ||
  //       "complete"
  //     );


  //     setCaption(selectedItem.caption || "center");

  //     // Derive caption type from data
  //     // if (selectedItem["center-caption"]) {
  //     //   setCaption("center");
  //     // } else if (
  //     //   selectedItem["left-caption"] ||
  //     //   selectedItem["right-caption"]
  //     // ) {
  //     //   setCaption("left-right");
  //     // } else {
  //     //   setCaption("");
  //     // }

  //     console.log("caption", caption);

  //     //   if (caption === "center") {
  //     //     setCenterCaption(selectedItem["center-caption"] || "");
  //     //   } else if (caption === "left-right") {
  //     //     setLeftCaption(selectedItem["left-caption"] || "");
  //     //     setRightCaption(selectedItem["right-caption"] || "");
  //     //   }
  //   }
  // }, [selectedItem?.id]);

  // const handleFooterSave = () => {
  //   if (!footerButtonLabel) {
  //     toast.error("Please enter a Footer Button Label");
  //     return;
  //   }

  //   if (!nextAction) {
  //     toast.error("Action is required.");
  //     return;
  //   }

  //   if (centerCaption && (leftCaption || rightCaption)) {
  //     toast.error(
  //       "Cannot set center caption together with left/right captions"
  //     );
  //     return;
  //   }

  //   if ((leftCaption && !rightCaption) || (!leftCaption && rightCaption)) {
  //     toast.error("Both left and right captions must be provided together");
  //     return;
  //   }

  //   const payload = {
  //     //  id: selectedItem.id,
  //     label: footerButtonLabel,
  //     "on-click-action": nextAction || "",
  //   };

  //   if (centerCaption) {
  //     payload["center-caption"] = centerCaption;
  //   }

  //   if (leftCaption && rightCaption) {
  //     payload["left-caption"] = leftCaption;
  //     payload["right-caption"] = rightCaption;
  //   }

  //   const updatedData = {
  //     ...selectedItem,
  //     ...payload,
  //     // caption,
  //   };

  //   if (caption === "center" && centerCaption) {
  //     updatedData["center-caption"] = centerCaption;
  //   }

  //   if (caption === "left-right") {
  //     if (leftCaption) updatedData["left-caption"] = leftCaption;
  //     if (rightCaption) updatedData["right-caption"] = rightCaption;
  //   }

  //   console.log(updatedData, "updatedData");

  //   onSave(updatedData);
  //   onClose();
  // };


  const [footerButtonLabel, setFooterButtonLabel] = useState("");
  // const [leftCaption, setLeftCaption] = useState("");
  // const [rightCaption, setRightCaption] = useState("");
  const [centerCaption, setCenterCaption] = useState("");
  const [nextAction, setNextAction] = useState("complete");

  useEffect(() => {
    if (selectedItem?.footer) {
      const footerData = selectedItem.footer["footer_1"];

      if (footerData) {
        setFooterButtonLabel(footerData.label || "");
        // setLeftCaption(footerData.left_caption || "");
        // setRightCaption(footerData.right_caption || "");
        setCenterCaption(footerData.center_caption || "");
        setNextAction(footerData.on_click_action || "complete");
      }
    }
  }, [selectedItem]);

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
      // left_caption: leftCaption || "",
      // right_caption: rightCaption || "",
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
  // const [uploadedRadioImgId, setUploadedRadioImgId] = useState(null);
  const [radioOptions, setRadioOptions] = useState([]);
  const [radioRequired, setRadioRequired] = useState(false);
  const [deleteRadioImg, setDeleteRadioImg] = useState(null);
  const [draft, setDraft] = useState({
    title: "",
    description: "",
    metadata: "",
    image: "",
    altText: "",
  });

  // useEffect(() => {
  //   if (selectedItem?.type === "radioButton") {
  //     setRadioBtnLabel(selectedItem.label || "");
  //     setDraft(
  //       (selectedItem =
  //         {
  //           title: selectedItem.title || "",
  //           description: selectedItem.description || "",
  //           metadata: selectedItem.label || "",
  //           image: selectedItem.metadata || "",
  //           altText: selectedItem.altText || "",
  //         } || "")
  //     );
  //     setRadioRequired(selectedItem.required ?? false);
  //   }
  // }, [selectedItem]);

  useEffect(() => {
    if (selectedItem?.type === "radioButton") {
      // Set group label
      setRadioBtnLabel(selectedItem.label || "");

      // Set required field
      setRadioRequired(selectedItem.required ?? false);

      // Set options
      const radioOptions = selectedItem["data-source"] || [];
      setRadioButtonOptions(radioOptions);

      // Prefill draft with first option (optional)
      if (radioOptions.length > 0) {
        const first = radioOptions[0];
        setDraft({
          title: first.title || "",
          description: first.description || "",
          metadata: first.metadata || "",
          image: first.image || "",
          altText: first.altText || "",
        });

        // const base64Image = first.image;
        // const objectURL = base64ToObjectURL(base64Image, "image/png");

        setRadiobtnEditIdx(0); // if you want to open first in edit mode, otherwise remove this line
      } else {
        setDraft({
          title: "",
          description: "",
          metadata: "",
          image: "",
          altText: "",
        });
        setRadiobtnEditIdx(null);
      }
    }
  }, [selectedItem]);

  // console.log("selectedItem", selectedItem);

  useEffect(() => {
    if (selectedItem?.type === "checkBox") {
      // Set group label
      setMainLabelCheckbox(selectedItem.label || "");

      // Set required field
      setCheckboxRequired(selectedItem.required ?? false);

      // Set options
      const checkboxOptions = selectedItem["data-source"] || [];
      setCheckBoxes(checkboxOptions);

      // Prefill draft with first option (optional)
      if (checkBoxes.length > 0) {
        const first = checkboxOptions[0];
        setDraftCheckbox({
          title: first.title || "",
          description: first.description || "",
          metadata: first.metadata || "",
          image: first.image || "",
        });
        setRadiobtnEditIdx(0);
      } else {
        setDraftCheckbox({
          title: "",
          description: "",
          metadata: "",
          image: "",
        });
        setEditCheckBoxId(null);
      }
    }
  }, [selectedItem]);

  const handleRadioRequiredChange = () => {
    setRadioRequired((prev) => !prev);
  };

  const radioImageInputRef = useRef(null);

  // console.log("radioImageInputRef", radioImageInputRef);

  const handleRadioImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }

    if (!file.type.match(/^image\/(png|jpeg)$/)) {
      toast.error("Please select a .png or .jpeg file");
      e.target.value = "";
      return;
    }

    // if (file.size > MAX_IMAGE_SIZE) {
    //   toast.error("Image must be under 100 KB");
    //   e.target.value = "";
    //   return;
    // }

    const reader = new FileReader();
    reader.onload = () => setRadioImageSrc(reader.result);
    reader.readAsDataURL(file);
    setRadioImageFile(file);

    try {
      const base64String = await getBase64(file);
      setDraft((prev) => ({ ...prev, image: base64String }));
      toast.success("Image loaded and ready!");
    } catch {
      toast.error("Failed to encode image");
    }
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
    if (checkBoxes.length >= 20) {
      toast.error("You’ve already added 20 options — that’s the limit!");
      return;
    }

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

  const handleDeleteRadioFile = async () => {
    if (!draft.image) {
      toast.error("No image to delete");
      return;
    }
    try {
      setDraft((prev) => ({ ...prev, image: "" }));
      setRadioImageFile(null);

      if (radioImageInputRef.current) {
        radioImageInputRef.current.value = "";
      }

      toast.success("Image deleted successfully");
    } catch (error) {
      toast.error("Failed to delete image");
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
        // if (imageSize > 100 * 1024) {
        //   toast.error(`Option ${i + 1}: Image must be under 100KB`);
        //   return;
        // }
      }
    }

    // 3) Build payload options
    const payloadOptions = filteredOptions.map((opt, idx) => ({
      id: (idx + 1).toString(),
      title: opt.title.trim(),
      description: opt.description?.trim() || "",
      metadata: opt.metadata?.trim() || "",
      image: opt.image || "",
    }));
    // console.log("Filtered and processed radio button options:", payloadOptions);

    // 4) Final payload and merge
    const payload = {
      label: radioBtnLabel.trim(),
      required: radioRequired,
      "data-source": payloadOptions,
    };

    const existingCount = selectedItem?.radioButton
      ? Object.keys(selectedItem.radioButton).length
      : 0;

    // const id = `radioButton_${existingCount + 1}`;
    const id = existingCount[0] || "radioButton_1";

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
  };

  //checkbox
  const [mainLabelCheckbox, setMainLabelCheckbox] = useState("");
  const [mainNameCheckbox, setMainNameCheckbox] = useState("");
  const [checkBoxes, setCheckBoxes] = useState([]);
  const [editCheckBoxId, setEditCheckBoxId] = useState(null);
  // const [uploadedImgId, setUploadedImgId] = useState(null);
  const [checkboxImageFile, setCheckboxImageFile] = useState(null);
  const [checkboxImageSrc, setCheckboxImageSrc] = useState(null);
  const [uploadedCheckboxImgId, setUploadedCheckboxImgId] = useState(null);
  const [checkboxRequired, setCheckboxRequired] = useState(false);
  const [draftCheckbox, setDraftCheckbox] = useState({
    title: "",
    description: "",
    metadata: "",
    image: "",
  });
  const [checkboxEditIdx, setCheckboxEditIdx] = useState(null);

  //  useEffect((idx) => {
  //   if (selectedItem) {
  //     setMainLabelCheckbox(selectedItem.label || "");

  //     const draft = selectedItem.draftCheckbox || {};
  //     console.log("draft", draft);

  //     setDraftCheckbox({
  //       title: selectedItem.draft?.title || "",
  //       description: selectedItem.draft?.description || "",
  //       metadata: selectedItem.draft?.metadata || "",
  //       image: selectedItem.draft?.image || "",
  //     });
  //     setCheckboxRequired(selectedItem.required ?? false);

  //   //   setDraftCheckbox({
  //   //   // title: checkBoxes[idx].title || "",
  //   //   description: checkBoxes[idx].description || "",
  //   //   metadata: checkBoxes[idx].metadata || "",
  //   //   image: checkBoxes[idx].image || "",
  //   // });
  //   }
  // }, [selectedItem]);

  const handleCheckboxRequiredChange = () => {
    setCheckboxRequired((prev) => !prev);
  };

  const checkboxImageInputRef = useRef(null);

  // const Max_Image_Size = 100 * 1024; // 100 KB

  const handleCheckboxImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }

    if (checkboxImageFile?.image) {
      toast.error("Image already uploaded");
      e.target.value = ""; // reset input
      return;
    }

    if (!file.type.match(/^image\/(png|jpeg)$/)) {
      toast.error("Please select a .png or .jpeg file");
      e.target.value = "";
      return;
    }

    // if (file.size > MAX_IMAGE_SIZE) {
    //   toast.error("Image must be under 100 KB");
    //   e.target.value = "";
    //   return;
    // }

    setCheckboxImageFile(file); // save raw file object

    const reader = new FileReader();
    reader.onload = () => {
      setCheckboxImageSrc(reader.result); // preview
    };
    reader.readAsDataURL(file);

    try {
      const base64String = await getBase64(file);
      setDraft((prev) => ({
        ...prev,
        checkboxImage: base64String, // if needed
      }));
      setDraftCheckbox((prev) => ({
        ...prev,
        image: `${base64String}`, // ✅ this is what checkbox preview uses
      }));
      toast.success("Image loaded successfully!");
    } catch {
      toast.error("Failed to convert image to base64");
    }
  };

  const handleCheckboxFileDelete = async () => {
    if (!checkboxImageFile) {
      toast.error("File already deleted");
      return;
    }
    try {
      setDraftCheckbox((prev) => ({ ...prev, image: "" }));
      setCheckboxImageFile(null);

      if (checkboxImageInputRef.current) {
        checkboxImageInputRef.current.value = "";
      }

      toast.success("File Delete Succesfully");
    } catch (error) {
      toast.error("Failed To delete file");
    }
  };

  const handleCheckboxEdit = (idx) => {
    setCheckboxEditIdx(idx);
    setDraftCheckbox(checkBoxes[idx]);
    //   setDraftCheckbox({
    //   title: checkBoxes[idx].title || "",
    //   description: checkBoxes[idx].description || "",
    //   metadata: checkBoxes[idx].metadata || "",
    //   image: checkBoxes[idx].image || "",
    // });
  };

  const handleCancelInlineCheckbox = () => {
    setCheckboxEditIdx(null);
    setDraftCheckbox({ title: "", description: "", metadata: "", image: "" });
  };

  const handleSaveInlineCheckbox = () => {
    const updated = [...checkBoxes];
    updated[checkboxEditIdx] = {
      ...updated[checkboxEditIdx],
      ...draftCheckbox,
      image: draftCheckbox.image || updated[checkboxEditIdx].image || "", // ✅ make sure image is carried
    };
    setCheckBoxes(updated);
    setCheckboxEditIdx(null);
    setDraftCheckbox({ title: "", description: "", metadata: "", image: "" });
  };

  const handleRemoveCheckbox = (idx) => {
    const updated = checkBoxes.filter((_, i) => i !== idx);
    setCheckBoxes(updated);
  };

  const handleCheckboxAddNew = () => {
    const newId = (checkBoxes.length + 1).toString();

    if (checkBoxes.length >= 20) {
      toast.error("You’ve already added 20 options — that’s the limit!");
      return;
    }
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
      image: opt.image || "",
    }));

    // Final payload and merge
    const payload = {
      label: mainLabelCheckbox.trim(),
      required: checkboxRequired,
      "data-source": payloadOptions,
    };

    const existingCount = selectedItem?.checkboxGroups
      ? Object.keys(selectedItem.checkboxGroups).length
      : 0;

    // const id = `checkbox_${existingCount + 1}`;

    const id =
      Object.keys(selectedItem?.checkboxGroups || {})[0] || "checkbox_1";

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
  const [dropdownRequired, setDropdownRequired] = useState(false);
  // const [dropdownUploadedId, setDropdownUploadedId] = useState(null);

  const dropImageInputRef = useRef(null);

  // useEffect(() => {
  //   if (selectedItem) {
  //     console.log("selectedItem", selectedItem)
  //     setMainLabelDropdown(selectedItem.label || "");
  //     setDraftTitle(selectedItem.title || "");
  //     setDraftDescription(selectedItem.description || "");
  //     setDraftMetaData(selectedItem.metadata || "");
  //     setDropImageFile(selectedItem.image || "");
  //     setDropdownRequired(selectedItem.required ?? false);
  //   }
  // }, [selectedItem]);

  useEffect(() => {
    if (selectedItem?.type === "dropDown") {
      // Set main label and required flag
      setMainLabelDropdown(selectedItem.label || "");
      setDropdownRequired(selectedItem.required ?? false);

      // Get dropdown options
      const dropdownOptions = selectedItem["data-source"] || [];
      setOptions(dropdownOptions);

      // Prefill draft with first option (optional)
      if (dropdownOptions.length > 0) {
        const first = dropdownOptions[0];
        setEditingIdx(0);
        setDraftTitle(first.title || "");
        setDraftDescription(first.description || "");
        setDraftMetaData(first.metadata || "");
        setDropImageFile(first.image || "");
      } else {
        setEditingIdx(null);
        setDraftTitle("");
        setDraftDescription("");
        setDraftMetaData("");
        setDropImageFile("");
      }
    }
  }, [selectedItem]);

  const currentOption = options[editingIdx] || {};

  const handleDropdownRequiredChange = () => {
    setDropdownRequired((prev) => !prev);
  };

  //  const MAX_IMAGE_SIZE = 100 * 1024; // 100 KB

  // const handleDropdownImageChange = async (event) => {
  //   const file = event.target.files?.[0];
  //   if (!file) {
  //     toast.error("No file selected");
  //     return;
  //   }

  //   if (!file.type.match(/^image\/(png|jpeg)$/)) {
  //     toast.error("Please select a .png or .jpeg file");
  //     event.target.value = "";
  //     return;
  //   }

  //   // if (file.size > MAX_IMAGE_SIZE) {
  //   //   toast.error("Image must be under 100 KB");
  //   //   event.target.value = "";
  //   //   return;
  //   // }

  //   setDropImageFile(file);
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setDropImageSrc(reader.result);
  //   };
  //   reader.readAsDataURL(file);

  //   try {
  //     const base64String = await getBase64(file);
  //     setDraft((prev) => ({
  //       ...prev,
  //       // dropdownImage: base64String,
  //     }));
  //     toast.success("Image uploaded successfully!");
  //   } catch {
  //     toast.error("Failed to convert image to base64");
  //   }
  // };

  const handleDropdownImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }

    if (!file.type.match(/^image\/(png|jpeg)$/)) {
      toast.error("Please select a .png or .jpeg file");
      event.target.value = "";
      return;
    }

    setDropImageFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setDropImageSrc(reader.result); // still use full base64 for preview
    };
    reader.readAsDataURL(file);

    try {
      const base64String = await getBase64(file);
      setDropImageSrc(`${base64String}`);

      setDraft((prev) => ({
        ...prev,
        // image: base64String, // ✅ No prefix stored in payload
      }));

      toast.success("Image uploaded successfully!");
    } catch {
      toast.error("Failed to convert image to base64");
    }
  };

  const handleDropdownFileDelete = async () => {
    if (!dropImageFile && !dropImageSrc) {
      toast.error("File not exist");
      return;
    }
    try {
      setDropImageFile(null);
      setDropImageSrc(null);

      if (dropImageInputRef.current) {
        dropImageInputRef.current.value = "";
      }

      toast.success("File Delete Succesfully");
    } catch (error) {
      toast.error("Failed To delete file");
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
            image: dropImageSrc || o.image || "",
          }
          : o
      )
    );

    setEditingIdx(null);
    setDraftTitle("");
    setDraftDescription("");
    setDraftMetaData("");
    setDropImageSrc(null);
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
    const hasImage = options.some((opt) => opt.image && opt.image !== "");

    const maxOptions = hasImage ? 100 : 200;

    if (options.length >= maxOptions) {
      toast.error(`Maximum ${maxOptions} dropdown options allowed.`);
      return;
    }

    setOptions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: `Option ${prev.length + 1}`,
        description: "",
        metadata: "",
        image: dropImageSrc || "",
      },
    ]);
    setDropImageSrc(null);
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
      image: o.image || "",
    }));

    // 3) Base payload (what used to be passed directly)
    const payload = {
      label: mainLabelDropdown.trim(),
      required: dropdownRequired,
      "data-source": payloadOptions,
    };

    const existingCount = selectedItem?.dropdown
      ? Object.keys(selectedItem.dropdown).length
      : 0;

    // const id = `dropdown_${existingCount + 1}`;
    const id = existingCount[0] || "dropdown_1";

    const updatedData = {
      ...selectedItem,
      ...payload,
      dropdown: {
        ...(selectedItem?.dropdown || []),
        [id]: payload,
      },
    };

    onSave(updatedData);
  };

  // const handleSaveDropdown = async () => {
  //   const filteredOptions = options.filter((o) => o.title.trim());

  //   if (filteredOptions.length < 2) {
  //     toast.error("At least two Dropdown options are required!");
  //     return;
  //   }

  //   const payloadOptions = await Promise.all(
  //     filteredOptions.map(async (opt, idx) => {
  //       let imagePath = opt.image; // default is already string (url)

  //       // If image is a File, upload it
  //       if (opt.image instanceof File) {
  //         const uploadedUrl = await uploadImageToServer(opt.image);
  //         imagePath = uploadedUrl || "";
  //       }

  //       return {
  //         id: idx + 1,
  //         title: opt.title.trim(),
  //         description: opt.description?.trim() || "",
  //         metadata: opt.metadata?.trim() || "",
  //         image: imagePath,
  //       };
  //     })
  //   );

  //   const payload = {
  //     label: mainLabelDropdown.trim(),
  //     required: dropdownRequired,
  //     "data-source": payloadOptions,
  //   };

  //   const existingCount = selectedItem?.dropdown
  //     ? Object.keys(selectedItem.dropdown).length
  //     : 0;

  //   const id = `dropdown_${existingCount + 1}`;

  //   const updatedData = {
  //     ...selectedItem,
  //     ...payload,
  //     dropdown: {
  //       ...(selectedItem?.dropdown || {}),
  //       [id]: payload,
  //     },
  //   };

  //   onSave(updatedData);
  //   onClose();
  // };

  // dropdown
  // akhil

  // chipSelector
  const [chipSelectorLabel, setChipSelectorLabel] = useState("");
  const [chipSelectorOptions, setChipSelectorOptions] = useState([]);
  const [editingChipIdx, setEditingChipIdx] = useState(null);
  // const [chipName, setChipName] = useState("");
  const [chipTitle, setChipTitle] = useState("");
  const [chipDescription, setChipDescription] = useState("");
  const [valueSelection, setValueSelection] = useState("");

  useEffect(() => {
    if (selectedItem) {
      setChipSelectorLabel(selectedItem.label || "");
      setChipTitle(selectedItem.title || "");
      setChipDescription(selectedItem.description || "");
      setValueSelection(selectedItem["max-selected-items"] || ""); // correct key

      // If you want to prefill the options (data-source)
      setChipSelectorOptions(selectedItem["data-source"] || []);
    }
  }, [selectedItem]);

  const handleStartChipSelectorEdit = (idx) => {
    const opt = chipSelectorOptions[idx];
    setEditingChipIdx(idx);
    // setChipName(opt.name);
    setChipTitle(opt.title);
  };

  const handleSaveChipSelectorInline = () => {
    if (!chipTitle.trim()) return;

    setChipSelectorOptions((prev) =>
      prev.map((o, i) =>
        i === editingChipIdx
          ? {
            ...o,
            // name: chipName.trim(),
            title: chipTitle.trim(),
          }
          : o
      )
    );

    setEditingChipIdx(null);
    // setChipName("");
    setChipTitle("");
  };

  const handleCancelChipSelectorInline = () => {
    setEditingChipIdx(null);
    // setChipName("");
    setChipTitle("");
  };

  const handleChipSelectorRemove = (idx) => {
    setChipSelectorOptions((prev) => prev.filter((_, i) => i !== idx));

    if (idx === editingChipIdx) {
      handleCancelChipSelectorInline();
    }
  };

  const handleAddNewChipSelector = () => {
    if (chipSelectorOptions.length >= 20) {
      toast.error("You’ve already added 20 options — that’s the limit!");
      return;
    }
    setChipSelectorOptions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: `Option`,
      },
    ]);
  };

  const handleChipSelectorSave = () => {
    const filteredOptions = chipSelectorOptions.filter((o) => o.title.trim());
    if (filteredOptions.length < 2) {
      toast.error("At least two chip options are required!");
      return;
    }

    const payloadOptions = filteredOptions.map((o, idx) => ({
      id: idx + 1,
      title: o.title.trim(),
    }));

    const payload = {
      label: chipSelectorLabel.trim(),
      required: true,
      description: chipDescription.trim(),
      "max-selected-items": valueSelection,
      "data-source": payloadOptions,
    };

    const existingCount = selectedItem?.chipSelector
      ? Object.keys(selectedItem.chipSelector).length
      : 0;

    // const id = `chipSelector_${existingCount + 1}`;
    const id = existingCount[0] || `chipSelector_${existingCount + 1}`;

    const updatedData = {
      ...selectedItem,
      ...payload,
      chipSelector: {
        ...(selectedItem?.chipSelector || {}),
        [id]: payload,
      },
    };

    onSave(updatedData);
    onClose();
  };

  // heading
  const [headingInput, setHeadingInput] = useState("");
  useEffect(() => {
    if (selectedItem) {
      setHeadingInput(selectedItem.text || "");
      setChecked(selectedItem.checked || []);
      setSelectedOption(selectedItem.selectedOption || "");
    }
  }, [selectedItem]);

  const textRef = useRef(null);

  const handleEmojiSelect = (setState, emoji, maxLength) => {
    if (!textRef.current) return;

    const text = textRef.current;
    const start = text.selectionStart;
    const end = text.selectionEnd;
    const current = text.value;

    const newText = current.slice(0, start) + emoji + current.slice(end);

    if (newText.length <= maxLength) {
      setState(newText);
      setTimeout(() => {
        const newCaret = start + emoji.length;
        text.focus();
        text.setSelectionRange(newCaret, newCaret);
      }, 0);
    }
  };

  const headingSave = () => {
    if (!headingInput) {
      toast.error("Heading Required");
      return;
    }

    const payload = {
      text: headingInput,
    };

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    onSave(updatedData);
    onClose();
  };

  // sub-heading
  const [subheadingInput, setSubheadingInput] = useState("");

  useEffect(() => {
    if (selectedItem) {
      setSubheadingInput(selectedItem.text || "");
      setChecked(selectedItem.checked || []);
      setSelectedOption(selectedItem.selectedOption || "");
    }
  }, [selectedItem]);

  const subheadingRef = useRef(null);

  const handleSubheadingEmojiSelect = (setState, emoji, maxLength) => {
    if (!subheadingRef.current) return;

    const subheading = subheadingRef.current;
    const start = subheading.selectionStart;
    const end = subheading.selectionEnd;
    const current = subheading.value;

    const newText = current.slice(0, start) + emoji + current.slice(end);

    if (newText.length <= maxLength) {
      setState(newText);
      setTimeout(() => {
        const newCaret = start + emoji.length;
        subheading.focus();
        subheading.setSelectionRange(newCaret, newCaret);
      }, 0);
    }
  };

  const handleSubheadingSave = () => {
    if (!subheadingInput) {
      toast.error("Subheading Required");
      return;
    }

    const payload = {
      text: subheadingInput,
    };

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    onSave(updatedData);
    onClose();
  };

  // text-body
  const [textbodyInput, setTextbodyInput] = useState("");

  useEffect(() => {
    if (selectedItem) {
      setTextbodyInput(selectedItem.text || "");
      setChecked(selectedItem.checked || []);
      setSelectedOption(selectedItem.selectedOption || "");
    }
  }, [selectedItem]);

  const textBodyRef = useRef(null);

  const handleTextBodyEmojiSelect = (setState, emoji, maxLength) => {
    if (!textBodyRef.current) return;

    const textBody = textBodyRef.current;
    const start = textBody.selectionStart;
    const end = textBody.selectionEnd;
    const current = textBody.value;

    const newText = current.slice(0, start) + emoji + current.slice(end);

    if (newText.length <= maxLength) {
      setState(newText);
      setTimeout(() => {
        const newCaret = start + emoji.length;
        textBody.focus();
        textBody.setSelectionRange(newCaret, newCaret);
      }, 0);
    }
  };

  const handleTextbodySave = () => {
    if (!textbodyInput.trim()) {
      toast.error("Textbody Required");
      return;
    }

    const payload = {
      text: textbodyInput.trim(),
    };

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    onSave(updatedData);
    onClose();
  };

  // text-caption
  const [textcaptionInput, setTextcaptionInput] = useState("");

  useEffect(() => {
    if (selectedItem) {
      setTextcaptionInput(selectedItem.text || "");
      setChecked(selectedItem.checked || []);
      setSelectedOption(selectedItem.selectedOption || "");
    }
  }, [selectedItem]);

  const textCaptionRef = useRef(null);

  const handleTextCaptionSelectEmoji = (setState, emoji, maxLength) => {
    if (!textCaptionRef.current) return;

    const textCaption = textCaptionRef.current;
    const start = textCaption.selectionStart;
    const end = textCaption.selectionEnd;
    const current = textCaption.value;

    const newText = current.slice(0, start) + emoji + current.slice(end);

    if (newText.length <= maxLength) {
      setState(newText);
      setTimeout(() => {
        const newCaret = start + emoji.length;
        textCaption.focus();
        textCaption.setSelectionRange(newCaret, newCaret);
      }, 0);
    }
  };

  const handleTextCaptionSave = () => {
    if (!textcaptionInput.trim()) {
      toast.error("Textcaption Required");
      return;
    }

    const payload = {
      text: textcaptionInput.trim(),
    };

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    onSave(updatedData);
    onClose();
  };

  // textInput
  const [inputLabel, setInputLabel] = useState("");
  const [inputPlaceholder, setInputPlaceholder] = useState("");
  const [inputError, setInputError] = useState("");
  const [inputMin, setInputMin] = useState("");
  const [inputMax, setInputMax] = useState("");
  const [inputRequired, setInputRequired] = useState(false);
  const [inputName, setInputName] = useState("");
  const [selectedOptionsType, setSelectedOptionsType] = useState(null);

  useEffect(() => {
    if (selectedItem?.type === "textInput") {
      setInputLabel(selectedItem.label || "");
      setInputPlaceholder(selectedItem["helper-text"] || "");
      setInputError(selectedItem["error-message"] || "");
      setInputRequired(selectedItem.required ?? false);

      const option =
        OptionsTypeOptions.find(
          (opt) => opt.value === selectedItem["input-type"]
        ) || null;
      setSelectedOptionsType(option);

      setInputMin(
        typeof selectedItem["min-chars"] === "number"
          ? selectedItem["min-chars"]
          : ""
      );
      setInputMax(
        typeof selectedItem["max-chars"] === "number"
          ? selectedItem["max-chars"]
          : ""
      );
    }
  }, [selectedItem]);

  const OptionsTypeOptions = [
    { value: "text", label: "Text" },
    { value: "number", label: "Number" },
    { value: "email", label: "Email" },
    { value: "password", label: "Password" },
    { value: "passcode", label: "Passcode" },
    { value: "phone", label: "Phone" },
  ];

  const handleInputChange = (e) => {
    const val = e.target.value;

    if (selectedOptionsType?.value === "number") {
      // Only allow numbers and limit to max length
      if (/^\d*$/.test(val)) {
        if (!inputMax || val.length <= Number(inputMax)) {
          setInputName(val);
        }
      }
    } else {
      setInputName(val);
    }
  };

  const handleDropdownChange = (val) => {
    const option = OptionsTypeOptions.find((opt) => opt.value === val) || null;
    setSelectedOptionsType(option);
    setInputName(""); // Reset on type change
  };

  const handleMaxChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setInputMax(val);
      if (
        selectedOptionsType?.value === "number" &&
        inputName.length > Number(val)
      ) {
        setInputName(inputName.slice(0, Number(val)));
      }
    }
  };

  const handleMinChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setInputMin(val);
    }
  };

  const handleInputReqChange = () => {
    setInputRequired((prev) => !prev);
  };

  const handleInputSave = () => {
    if (!inputLabel) {
      toast.error("Label Required");
      return;
    }

    if (!inputPlaceholder) {
      toast.error("Helper-Text Required");
      return;
    }

    const payload = {
      label: inputLabel.trim(),
      "helper-text": inputPlaceholder.trim(),
      required: inputRequired,
      name: inputName,
      "input-type": selectedOptionsType?.value,
      "error-message": inputError,
      "min-chars": inputMin ? Number(inputMin) : undefined,
      "max-chars": inputMax ? Number(inputMax) : undefined,
    };

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    onSave(updatedData);
    onClose();
  };

  // useEffect(() => {
  //   console.log("123", tabs);
  // }, [tabs]);

  // textArea
  const [textAreaLabel, setTextAreaLabel] = useState("");
  const [textAreaPlaceholder, setTextAreaPlaceholder] = useState("");
  const [textAreaError, setTextAreaError] = useState("");
  const [textAreaRequired, setTextAreaRequired] = useState(false);
  const [textAreaName, setTextAreaName] = useState("");

  useEffect(() => {
    if (selectedItem?.type === "textArea") {
      setTextAreaLabel(selectedItem.label || "");
      setTextAreaPlaceholder(selectedItem["helper-text"] || "");
      setTextAreaError(selectedItem["error-message"] || "");
      setTextAreaRequired(selectedItem.required ?? false);
      setTextAreaName(selectedItem.name || "");
    }
  }, [selectedItem]);

  const handleTextAreaChange = () => {
    setTextAreaRequired((prev) => !prev);
  };

  const handleTextSave = () => {
    if (!textAreaLabel.trim()) {
      toast.error("Label Required");
      return;
    }

    // if (!textAreaName.trim()) {
    //   toast.error("Name Required");
    //   return
    // }

    const payload = {
      label: textAreaLabel.trim(),
      "helper-text": textAreaPlaceholder,
      required: textAreaRequired,
      name: textAreaName.trim(),
      "error-message": textAreaError,
    };

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    onSave(updatedData);
    onClose();
  };

  // // switch
  // const [addCases, setAddCases] = useState("")

  const maxLengthMap = {
    heading: 80,
    subheading: 80,
    textbody: 4096,
    textcaption: 409,
  };

  return (
    <Box>
      <AnimatePresence mode="wait">
        <ClickAwayListener onClickAway={() => setSelectedItem(null)}>
          <motion.div
            ref={editPanelRef}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            // className="bg-white z-10 p-5 absolute top-[40%] left-[78%] translate-x-[-50%] translate-y-[-50%] w-[70%] md:w-[40%] lg:w-[40%] xl:w-[40%] h-[87%] mt-29"
            className="bg-gray-100 z-10 p-3 absolute right-3 w-100 top-18 border-2 rounded-xl shadow-sm border-gray-200"
          >
            <div className="flex items-center justify-between border-b-2">
              <label className="text-sm font-semibold text-gray-700 tracking-wide">
                Edit Item
              </label>
              <IconButton onClick={onClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>

            {/* if-else condition */}
            {/* {selectedCondition && (
              <h2 className="text-xl font-semibold mb-2 top-0">
                {selectedCondition}
              </h2>
            )} */}
            {/* if-else condition */}
            {/* Input Fields for Text-Based Items */}
            {/* {["heading", "subheading", "textbody", "textcaption"].includes(
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
        )} */}

            {/* new */}
            {selectedItem?.type === "heading" && (
              <div className="mb-2 font-semibold text-lg mt-3 space-y-3 ">
                {/* <InputField
                  label="Heading"
                  placeholder="Enter Text for  Heading"
                  variant="outlined"
                  tooltipContent="Enter Text for  Heading"
                  tooltipPlacement="right"
                  fullWidth
                  value={headingInput}
                  type="text"
                  maxLength={80}
                  onChange={(e) => setHeadingInput(e.target.value)}
                /> */}
                <div className="relative">
                  <UniversalTextArea
                    label="Heading"
                    placeholder="Enter Text for  Heading"
                    variant="outlined"
                    tooltipContent="Max 80 character allowed"
                    tooltipPlacement="right"
                    fullWidth
                    value={headingInput}
                    type="text"
                    maxLength={80}
                    onChange={(e) => setHeadingInput(e.target.value)}
                    textareaClassName="font-semibold h-40"
                    ref={textRef}
                  />
                  <p className="text-gray-600 text-xs">
                    Chars: {headingInput.length}/80
                  </p>

                  <div className="absolute top-6 right-0 mt-2 mr-2 flex space-x-2 ">
                    <CustomEmojiPicker
                      onSelect={(emoji) =>
                        handleEmojiSelect(setHeadingInput, emoji, 80)
                      }
                      position="right"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <UniversalButton label="Save" onClick={headingSave} />
                </div>
              </div>
            )}

            {/* {selectedItem?.type === "heading" && (
            <div className="mb-2 font-semibold text-lg mt-3 space-y-3">
              <InputField
                label="Heading"
                placeholder="Enter Text for Heading"
                variant="outlined"
                tooltipContent="Enter Text for Heading"
                tooltipPlacement="right"
                fullWidth
                value={headingInput}
                type="text"
                maxLength={80}
                onChange={(e) => setHeadingInput(e.target.value)}
              />
              <div className="flex justify-center">
                <UniversalButton label="Save" onClick={headingSave} />
              </div>
            </div>
          )} */}

            {selectedItem?.type === "subheading" && (
              <div className="mb-2 font-semibold text-lg mt-3 space-y-3 ">
                {/* <InputField
                  label="Sub-Heading"
                  placeholder="Enter Text for Sub-Heading "
                  tooltipContent="Enter Text for  Sub-Heading"
                  tooltipPlacement="right"
                  type="text"
                  maxLength={80}
                  value={subheadingInput}
                  onChange={(e) => setSubheadingInput(e.target.value)}
                  fullWidth
                /> */}

                <div className="relative">
                  <UniversalTextArea
                    label="Sub-Heading"
                    placeholder="Enter Text for Sub-Heading "
                    tooltipContent="Max 80 character allowed"
                    tooltipPlacement="right"
                    type="text"
                    maxLength={80}
                    value={subheadingInput}
                    onChange={(e) => setSubheadingInput(e.target.value)}
                    fullWidth
                    textareaClassName="font-semibold h-40"
                    ref={subheadingRef}
                  />
                  <p className="text-gray-600 text-xs">
                    Chars: {subheadingInput.length}/80
                  </p>
                  <div className="absolute top-6 right-0 mt-2 mr-2 flex space-x-2">
                    <CustomEmojiPicker
                      onSelect={(emoji) =>
                        handleSubheadingEmojiSelect(
                          setSubheadingInput,
                          emoji,
                          80
                        )
                      }
                      position="right"
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <UniversalButton
                    label="Save"
                    onClick={handleSubheadingSave}
                  />
                </div>
              </div>
            )}

            {selectedItem?.type === "textbody" && (
              <div className="mb-2 font-semibold text-lg mt-3 space-y-3 ">
                {/* <InputField
                  label="TextBody"
                  placeholder="Enter Text for TextBody "
                  tooltipContent="Enter Text for  TextBody"
                  tooltipPlacement="right"
                  type="text"
                  maxLength={4096}
                  value={textbodyInput}
                  onChange={(e) => setTextbodyInput(e.target.value)}
                  fullWidth
                /> */}

                <div className="relative">
                  <UniversalTextArea
                    label="TextBody"
                    placeholder="Enter Text for TextBody "
                    tooltipContent="Max 4096 character allowed"
                    tooltipPlacement="right"
                    type="text"
                    maxLength={4096}
                    value={textbodyInput}
                    onChange={(e) => setTextbodyInput(e.target.value)}
                    fullWidth
                    textareaClassName="font-semibold h-40"
                    ref={textBodyRef}
                  />
                  <p className="text-gray-600 text-xs">
                    Chars: {textbodyInput.length}/4096
                  </p>

                  <div className="absolute top-6 right-0 mt-2 mr-2 flex space-x-2 ">
                    <CustomEmojiPicker
                      onSelect={(emoji) =>
                        handleTextBodyEmojiSelect(setTextbodyInput, emoji, 4096)
                      }
                      position="right"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <UniversalButton label="Save" onClick={handleTextbodySave} />
                </div>
              </div>
            )}

            {selectedItem?.type === "textcaption" && (
              <div className="mb-2 font-semibold text-lg mt-3 space-y-3">
                {/* <InputField
                  label="TextCaption"
                  placeholder="Enter Text for text caption"
                  tooltipContent="Enter Text for text caption"
                  tooltipPlacement="right"
                  type="text"
                  maxLength={409}
                  value={textcaptionInput}
                  onChange={(e) => setTextcaptionInput(e.target.value)}
                  fullWidth
                /> */}
                <div className="relative">
                  <UniversalTextArea
                    label="TextCaption"
                    placeholder="Enter Text for text caption"
                    tooltipContent="Max 409 character allowed"
                    tooltipPlacement="right"
                    type="text"
                    maxLength={409}
                    value={textcaptionInput}
                    onChange={(e) => setTextcaptionInput(e.target.value)}
                    fullWidth
                    textareaClassName="font-semibold h-40"
                    ref={textCaptionRef}
                  />
                  <p className="text-gray-600 text-xs">
                    Chars: {textcaptionInput.length}/409
                  </p>

                  <div className="absolute top-6 right-0 mt-2 mr-2 flex space-x-2 ">
                    <CustomEmojiPicker
                      onSelect={(emoji) =>
                        handleTextCaptionSelectEmoji(
                          setTextcaptionInput,
                          emoji,
                          409
                        )
                      }
                      position="right"
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <UniversalButton
                    label="Save"
                    onClick={handleTextCaptionSave}
                  />
                </div>
              </div>
            )}

            {selectedItem?.type === "textInput" && (
              <div className="mb-2 text-lg space-y-2 mt-3">
                <InputField
                  label="Input Label"
                  id="mainlabel"
                  placeholder="Enter Input label"
                  tooltipContent="Enter Input label"
                  tooltipPlacement="right"
                  value={inputLabel}
                  onChange={(e) => setInputLabel(e.target.value)}
                  maxLength={20}
                />
                <AnimatedDropdown
                  label="Select Input Type"
                  tooltipContent="Select input type (select text for default)"
                  tooltipPlacement="right"
                  options={OptionsTypeOptions}
                  value={selectedOptionsType?.value || ""}
                  onChange={handleDropdownChange}
                  placeholder="Select Type"
                  data-ignore-click-outside="true"
                />

                <InputField
                  label="Helper-Text"
                  type="text"
                  placeholder="Enter helper text"
                  tooltipContent="Enter placeholder for helper-text"
                  tooltipPlacement="right"
                  value={inputPlaceholder}
                  maxLength={80}
                  onChange={(e) => setInputPlaceholder(e.target.value)}
                />

                <InputField
                  label="Enter error to display"
                  id="mainerror"
                  placeholder="Enter Error"
                  tooltipContent="Enter error for input"
                  tooltipPlacement="right"
                  value={inputError}
                  maxLength={30}
                  onChange={(e) => setInputError(e.target.value)}
                />

                <div className="flex gap-2">
                  <InputField
                    label="Min Length"
                    id="min"
                    type="number"
                    placeholder="Min Length"
                    tooltipContent="Enter minimum length"
                    tooltipPlacement="right"
                    value={inputMin}
                    onChange={handleMinChange}
                    autoComplete="off"
                  />
                  <InputField
                    label="Max Length"
                    id="max"
                    type="number"
                    placeholder="Max Length"
                    tooltipContent="Enter maximum length"
                    tooltipPlacement="right"
                    value={inputMax}
                    onChange={handleMaxChange}
                    autoComplete="off"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <UniversalLabel
                    htmlFor="required"
                    className="text-sm font-medium text-gray-700"
                    text=" Required?"
                    tooltipContent="Set required field for TextArea"
                    tooltipPlacement="top"
                  ></UniversalLabel>
                  <div className="flex items-center">
                    <Switch
                      checked={inputRequired}
                      onChange={handleInputReqChange}
                      id="required"
                    />
                    <span className="text-sm">
                      {inputRequired ? "True" : "False"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center items-center">
                  <UniversalButton label="Save" onClick={handleInputSave} />
                </div>
              </div>
            )}

            {selectedItem?.type === "textArea" && (
              <div className="mb-2 text-lg space-y-2 mt-3">
                <InputField
                  label="Edit TextArea"
                  id="textarea_label"
                  placeholder="Enter TextArea Label"
                  tooltipContent="Edit TextArea Label"
                  tooltipPlacement="right"
                  value={textAreaLabel}
                  maxLength={20}
                  onChange={(e) => setTextAreaLabel(e.target.value)}
                />

                <InputField
                  label="Helper-Text"
                  type="text"
                  placeholder="Enter placeholder for TextArea"
                  tooltipContent="Enter placeholder"
                  tooltipPlacement="right"
                  value={textAreaPlaceholder}
                  maxLength={80}
                  onChange={(e) => setTextAreaPlaceholder(e.target.value)}
                />
                {/* <InputField
                label="Name"
                placeholder="Enter Name"
                tooltipContent="Enter name for TextArea"
                tooltipPlacement="right"
                value={textAreaName}
                onChange={(e) => setTextAreaName(e.target.value)}
              /> */}

                <InputField
                  label="Enter error to display"
                  id="textarea_error"
                  placeholder="Enter Error"
                  tooltipContent="Enter Error for TextArea"
                  tooltipPlacement="right"
                  value={textAreaError}
                  onChange={(e) => setTextAreaError(e.target.value)}
                />

                {/* <div className="flex gap-8">
              <InputField
                label="Min Length"
                id="textarea_min"
                type="number"
                placeholder="Min length"
                tooltipContent="Enter Min Length"
                tooltipPlacement="right"
                value={textAreaMin}
                onChange={(e) => setTextAreaMin(e.target.value)}
                autoComplete="off"
              />
              <InputField
                label="Max Length"
                id="textarea_max"
                type="number"
                placeholder="Max length"
                tooltipContent="Enter Max Length"
                tooltipPlacement="right"
                value={textAreaMax}
                onChange={(e) => setTextAreaMax(e.target.value)}
                autoComplete="off"
              />
             </div> */}

                <div className="flex items-end">
                  <UniversalLabel
                    htmlFor="textarea_required"
                    className="text-sm font-medium text-gray-700"
                    tooltipContent="Set required field for TextArea"
                    tooltipPlacement="top"
                    text="Required?"
                  ></UniversalLabel>
                  <div className="flex items-center">
                    <Switch
                      checked={textAreaRequired}
                      onChange={(e) => handleTextAreaChange(e.target.checked)}
                      id="textarea_required"
                    />
                    <span className="text-sm">
                      {textAreaRequired ? "True" : "False"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center items-center">
                  <UniversalButton label="SAVE" onClick={handleTextSave} />
                </div>
              </div>
            )}
            {/* NEW */}

            {selectedItem?.type === "richText" && (
              <RichTextEditor
                content={selectedItem.content || ""}
                text={selectedItem.text || []}
                onUpdate={(payload) => {
                  handleComponentUpdate(payload);
                  onClose();
                }}
                selectedItem={selectedItem}
              />
            )}

            {/* Editable Options for Checkboxes */}
            {selectedItem?.type === "checkBox" && (
              <FormControl fullWidth>
                <div className="mb-2 mt-3 space-y-3">
                  <InputField
                    label="Checkbox Group Label"
                    tooltipContent="Enter Checkbox Group Label "
                    tooltipPlacement="right"
                    value={mainLabelCheckbox}
                    maxLength={30}
                    onChange={(e) => setMainLabelCheckbox(e.target.value)}
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
                    ></UniversalLabel>
                    <div className="flex items-center gap-2 ">
                      <Switch
                        checked={checkboxRequired}
                        onChange={handleCheckboxRequiredChange}
                        id="required"
                      />
                      <span>{checkboxRequired ? "True" : "False"}</span>
                    </div>
                  </div>
                </div>

                {checkBoxes.map((opt, idx) => {
                  const isEditing = idx === checkboxEditIdx;
                  return (
                    <Box
                      key={opt.id}
                      sx={{
                        mb: 1,
                        p: 1,
                        border: "1px solid #ccc",
                        borderRadius: 1,
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
                              maxLength={30}
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
                              maxLength={300}
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
                              required={true}
                              maxLength={20}
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

                            {/* <Box sx={{ display: "flex", mb: 1 }}>
                            <InputField
                              label="Upload Image"
                              type="file"
                              id="checkbox-file-upload"
                              accept=".png, .jpeg"
                              tooltipContent="Upload Image"
                              tooltipPlacement="right"
                              required={true}
                              onChange={handleCheckboxImageChange}
                              ref={checkboxImageInputRef}
                            />

                            <button onClick={handleCheckboxFileDelete}>
                              <DeleteOutlineIcon
                                sx={{
                                  fontSize: "23px",
                                  marginTop: 3,
                                  color: "#ef4444",
                                }}
                              />
                            </button>
                          </Box> */}

                            <Box sx={{ display: "flex", mb: 1 }}>
                              <InputField
                                label="Upload Image"
                                type="file"
                                id="checkbox-file-upload"
                                accept=".png, .jpeg"
                                tooltipContent="Upload Image"
                                tooltipPlacement="right"
                                required={true}
                                onChange={handleCheckboxImageChange}
                                ref={checkboxImageInputRef}
                              />
                            </Box>

                            {draftCheckbox.image && (
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
                                disabled={!draftCheckbox.metadata.trim()}
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
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            sx={{ flexGrow: 1, minWidth: 0 }}
                            onClick={() => handleCheckboxEdit(idx)}
                          >
                            <Typography variant="subtitle1">
                              {opt.title}
                            </Typography>
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
                <div className="flex flex-row justify-center items-center gap-2 py-1 px-2">
                  <UniversalButton
                    label="AddOptions"
                    onClick={handleCheckboxAddNew}
                  />

                  <UniversalButton
                    label="Save Checkbox"
                    onClick={handleCheckBoxSave}
                  />
                </div>
              </FormControl>
            )}

            {/* Editable Options for Radio Buttons */}
            {selectedItem?.type === "radioButton" && (
              <FormControl fullWidth>
                <div className="mb-2 mt-3">
                  <InputField
                    label="Radio Group Label"
                    tooltipContent="Enter Radio Group Label"
                    tooltipPlacement="right"
                    maxLength={30}
                    value={radioBtnLabel}
                    onChange={(e) => setRadioBtnLabel(e.target.value)}
                    placeholder="Enter label"
                    fullWidth
                  />

                  <div className="mt-2">
                    <UniversalLabel
                      htmlFor="radio_required"
                      className="text-sm font-medium text-gray-700"
                      tooltipContent="Select an option which required for you."
                      tooltipPlacement="top"
                      text="Required"
                    ></UniversalLabel>
                    <div className="flex items-center gap-2 ">
                      <Switch
                        checked={radioRequired}
                        onChange={handleRadioRequiredChange}
                        id="required"
                      />
                      <span>{radioRequired ? "True" : "False"}</span>
                    </div>
                  </div>
                </div>

                {radioButtonOptions.map((opt, idx) => {
                  const isEditing = idx === radiobtnEditIdx;
                  return (
                    <Box
                      key={opt.id}
                      sx={{
                        mb: 1,
                        p: 1,
                        border: "1px solid #ccc",
                        borderRadius: 1,
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
                              maxLength={30}
                              value={draft.title}
                              onChange={(e) =>
                                setDraft((d) => ({
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
                              maxLength={300}
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
                              required={true}
                              maxLength={20}
                              value={draft.metadata.trim()}
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

                            {draft.image && (
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
                                disabled={!draft.metadata.trim()}
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
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            sx={{ flexGrow: 1, minWidth: 0 }}
                            onClick={() => handleRadioBtnEdit(idx)}
                          >
                            <Typography variant="subtitle1">
                              {opt.title}
                            </Typography>
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

                <div className="flex flex-row justify-center items-center gap-2 py-1 px-2">
                  <UniversalButton
                    label="AddOptions"
                    onClick={handleRadioBtnAddNew}
                  />

                  <UniversalButton
                    label="SaveRadioButton"
                    onClick={handleSaveRadioButton}
                  />
                </div>
              </FormControl>
            )}

            {/* Editable Options for Dropdown */}
            {selectedItem?.type === "dropDown" && (
              <FormControl fullWidth>
                {/* ── Dropdown Label Input ── */}
                <div className=" mb-2, mt-3 space-y-3">
                  <InputField
                    label="Label"
                    id="mainlabel"
                    tooltipContent="Enter MainLabel"
                    tooltipPlacement="right"
                    maxLength={20}
                    value={mainLabelDropdown}
                    onChange={(e) => setMainLabelDropdown(e.target.value)}
                    placeholder="Enter label"
                    type="text"
                    fullWidth
                  />

                  <div>
                    <UniversalLabel
                      htmlFor="dropDown_required"
                      className="text-sm font-medium text-gray-700"
                      tooltipContent="Select an option which required for you."
                      tooltipPlacement="top"
                      text="Required"
                    ></UniversalLabel>
                    <div className="flex items-center gap-2 ">
                      <Switch
                        checked={dropdownRequired}
                        onChange={handleDropdownRequiredChange}
                        id="required"
                      />
                      <span>{dropdownRequired ? "True" : "False"}</span>
                    </div>
                  </div>
                </div>

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
                              maxLength={30}
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
                              maxLength={300}
                              value={draftDescription}
                              onChange={(e) =>
                                setDraftDescription(e.target.value)
                              }
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
                              maxLength={20}
                              value={draftMetadata}
                              required={true}
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
                              justifyContent: "center",
                            }}
                          >
                            <UniversalButton
                              label="Save Option"
                              onClick={handleSaveInline}
                              disabled={
                                !draftTitle.trim() || !draftMetadata.trim()
                              }
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
                            sx={{ flexGrow: 1, cursor: "pointer", minWidth: 0 }}
                            onClick={() => handleStartEdit(idx)}
                          >
                            <Typography variant="subtitle1">
                              {opt.title}
                            </Typography>
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
                    />
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
                <div className="mt-3 space-y-3 mb-3">
                  <InputField
                    label="Label"
                    placeholder="Enter label"
                    tooltipContent="Enter MainLabel"
                    tooltipPlacement="right"
                    maxLength={80}
                    value={chipSelectorLabel}
                    onChange={(e) => setChipSelectorLabel(e.target.value)}
                  />
                  <InputField
                    label="Description"
                    placeholder="Enter Description"
                    tooltipContent="Enter Description for ChipSelector"
                    tooltipPlacement="right"
                    maxLength={300}
                    value={chipDescription}
                    onChange={(e) => setChipDescription(e.target.value)}
                  />

                  <InputField
                    label="Max-Selection Options In Chip"
                    placeholder="Enter Max-option"
                    tooltipContent="Enter Max-option for ChipSelector"
                    tooltipPlacement="right"
                    value={valueSelection}
                    type="number"
                    onChange={(e) => setValueSelection(e.target.value)}
                  />
                </div>

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
                          {/* <InputField
                        label="Name"
                        placeholder="Enter Name"
                        value={chipName}
                        onChange={(e) => setChipName(e.target.value)}
                      /> */}
                          <InputField
                            label="Title"
                            placeholder="Enter Title"
                            tooltipContent="Enter Title for ChipSelector"
                            tooltipPlacement="right"
                            value={chipTitle}
                            onChange={(e) => setChipTitle(e.target.value)}
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
                              disabled={!chipTitle.trim()}
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
                            <Typography variant="subtitle1">
                              {opt.name}
                            </Typography>
                            {opt.title && (
                              <Typography variant="body2" color="textSecondary">
                                {opt.title}
                              </Typography>
                            )}
                          </Box>
                          <IconButton
                            onClick={() => handleStartChipSelectorEdit(idx)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            onClick={() => handleChipSelectorRemove(idx)}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </>
                      )}
                    </Box>
                  );
                })}

                <div className="flex justify-center items-center gap-2 mt-3">
                  <UniversalButton
                    label="Add Option"
                    onClick={handleAddNewChipSelector}
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
              <div className="mb-2 text-lg space-y-3 mt-3">
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

                {/* <AnimatedDropdown
                  label="Caption Type"
                  tooltipContent="Select Caption Type"
                  tooltipPlacement="right"
                  options={[
                    { value: "center", label: "Center Caption" },
                    // { value: "left-right", label: "Left + Right Caption" },
                  ]}
                  value={caption}
                  onChange={(value) => {
                    setCaption(value);
                    if (value === "center") {
                      setLeftCaption("");
                      setRightCaption("");
                    } else if (value === "left-right") {
                      setCenterCaption("");
                    }
                  }}
                /> */}

                {/* {caption === "center" && ( */}
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
                {/* )}

                {caption === "left-right" && (
                  <>
                    <InputField
                      label="Left Caption"
                      placeholder="Enter Left Caption"
                      tooltipContent="Enter Left Caption"
                      tooltipPlacement="right"
                      maxLength={15}
                      id="left-caption"
                      value={leftCaption}
                      onChange={(e) => setLeftCaption(e.target.value)}
                    />
                    <InputField
                      label="Right Caption"
                      placeholder="Enter Right Caption"
                      tooltipContent="Enter Right Caption"
                      tooltipPlacement="right"
                      maxLength={15}
                      id="right-caption"
                      value={rightCaption}
                      onChange={(e) => setRightCaption(e.target.value)}
                    />
                  </>
                )} */}

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
                  <UniversalButton label="SAVE" onClick={handleFooterSave} />
                </div>
              </div>
            )}

            {selectedItem.type === "embeddedlink" && (
              <div className="mt-5">
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
                <p className="text-gray-600 text-xs mb-2">
                  Chars: {text.length}/25
                </p>

                <div className="mb-2">
                  <AnimatedDropdown
                    id="next-action"
                    label="Next Action"
                    tooltipContent="[navigate = ensure there is screen created where user can navigate],[Open_url = paste or enter url link where user can redirect to page]"
                    tooltipPlacement="right"
                    options={[
                      // { value: "data_exchange", label: "Data_exchange" },
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
                      tooltipContent="Create a screen where you want to naviagate the user"
                      tooltipPlacement="right"
                      options={screenNameOptions}
                      value={selectedScreenName}
                      onChange={(value) => setSelectedScreenName(value)}
                    />
                    <span className="text-xs">
                      NOTE: Create a screen or select where you want to navigate
                      the user
                    </span>
                  </>
                )}

                {onClickAction === "open_url" && (
                  <InputField
                    label="URL"
                    placeholder="Enter the URL to open"
                    type="text"
                    tooltipContent="Provide the URL to open when user clicks Read more"
                    value={embeddedlinktUrl}
                    onChange={(e) => setEmbeddedlinktUrl(e.target.value)}
                  />
                )}

                <div className="flex justify-center mt-5">
                  <UniversalButton
                    label="Save"
                    onClick={handleEmbeddedLinkSave}
                  />
                </div>
              </div>
            )}

            {/* Editable option for Opt In */}
            {selectedItem?.type === "optin" && (
              <>
                <div className="space-y-3 mt-3">
                  <InputField
                    label="OPT-In Label"
                    placeholder="Enter Lable"
                    type="text"
                    maxLength={120}
                    tooltipContent="Enter label which display in the screen max length 120"
                    value={optLabel}
                    onChange={(e) => setOptLabel(e.target.value)}
                  />
                  <p className="text-gray-600 text-xs">
                    Chars: {optLabel.length}/120
                  </p>

                  <div className="mt-2 flex items-end">
                    <UniversalLabel
                      label=" Required"
                      htmlFor="required"
                      className="text-sm font-medium text-gray-700"
                      tooltipcontent="Select an option which required for you."
                      tooltipplacement="top"
                      text="Required"
                    ></UniversalLabel>
                    <div className="flex items-center">
                      <Switch
                        checked={optInRequired}
                        onChange={handleOptInRequiredChange}
                        id="required"
                      />
                      <span className="text-sm">
                        {optInRequired ? "True" : "False"}
                      </span>
                    </div>
                  </div>

                  <AnimatedDropdown
                    id="next-action"
                    label="Action"
                    options={[
                      // { value: "data_exchange", label: "Data_exchange" },
                      { value: "navigate", label: "Navigate" },
                      { value: "open_url", label: "Open_url" },
                    ]}
                    tooltipContent="[navigate = ensure there is screen created where user can navigate] , [Open_url = paste or enter url link where user can redirect to page]"
                    value={optAction}
                    onChange={(value) => setOPTAction(value)}
                  />

                  {optAction === "navigate" && (
                    <AnimatedDropdown
                      id="screen-name"
                      label="List Of Screen Name"
                      tooltipContent="List Of Screen Name"
                      tooltipPlacement="right"
                      options={optScreenNameOptions}
                      value={optSelectedScreenName}
                      onChange={(value) => setOptSelectedScreenName(value)}
                    />
                  )}

                  {optAction === "open_url" && (
                    <InputField
                      label="URL"
                      placeholder="Enter the URL to open"
                      type="text"
                      tooltipContent="Provide the URL to open when user clicks Read more"
                      value={optUrl}
                      onChange={(e) => setOptUrl(e.target.value)}
                    />
                  )}

                  <div className="flex justify-center ">
                    <UniversalButton
                      label="Save"
                      onClick={handleOPTSave}
                      className="text-blue-600 underline text-sm w-fit"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Editable option for Image In */}
            {selectedItem?.type === "image" && (
              <>
                <div className="space-y-3 mt-3">
                  <div className="flex justify-center items-center gap-2 ">
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

                  <AnimatedDropdown
                    label="Scale-Type"
                    tooltipContent="Select Scale-Type"
                    tooltipPlacement="right"
                    value={scaleType}
                    options={[
                      { value: "contain", label: "Contain" },
                      { value: "cover", label: "Cover" },
                    ]}
                    onChange={(value) => setSCaleType(value)}
                  />

                  {/* <InputField
                label="Aspect-Ratio"
                type="number"
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
              /> */}

                  <InputField
                    label="Alt-Text"
                    placeholder="Enter Alt-Text"
                    tooltipContent="Alt-Text"
                    tooltipPlacement="right"
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
                    placeholder="Minimum document upload"
                    tooltipContent="Minimum document user can upload 1 is necessary"
                    tooltipPlacement="right"
                    type="number"
                    value={minDocsUpload}
                    onChange={(e) => setMinDocsUpload(e.target.value)}
                  />

                  <InputField
                    label="Max-Upload-Document"
                    placeholder="Maximum document upload"
                    tooltipContent="Maximum document user can Upload"
                    tooltipPlacement="right"
                    type="number"
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
                    <UniversalButton
                      label="Save"
                      onClick={handleDocumentSave}
                    />
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

                  <div className="mt-2">
                    <UniversalLabel
                      label=" Required"
                      htmlFor="required"
                      className="text-sm font-medium text-gray-700"
                      tooltipcontent="Select an option which required for you."
                      tooltipplacement="top"
                      text="Required"
                    ></UniversalLabel>
                    <div className="flex items-center gap-2 ">
                      <Switch
                        checked={mediaRequired}
                        onChange={handleMediaRequiredChange}
                        id="required"
                      />
                      <span>{mediaRequired ? "True" : "False"}</span>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <UniversalButton label="Save" onClick={handleMediaSave} />
                  </div>
                </div>
              </>
            )}

            {selectedItem?.type === "imageCarousel" && (
              <div className="space-y-3 mt-3">
                {/* {imageCarouselImages.map((index) => (
                <div key={index} className="flex items-center space-x-2">
                  <InputField
                    label={`Image ${index + 1}`}
                    type="file"
                    accept=".png, .jpeg"
                    tooltipContent="Upload Image"
                    tooltipPlacement="right"
                    required={true}
                    onChange={(e) => handleImageCarouselChange(e, index)}
                    ref={imageCarouselInputRefs[index]}
                  />
                  <button onClick={() => handleImageCarouselDelete(index)}>
                    <DeleteOutlineIcon
                      sx={{ fontSize: "23px", marginTop: 3, color: "#ef4444" }}
                    />
                  </button>
                </div>
              ))} */}

                {imageCarouselImages.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-center space-x-2"
                    >
                      <div className="flex flex-col w-full">
                        <InputField
                          label={`Image ${index + 1}`}
                          type="file"
                          accept=".png, .jpeg"
                          tooltipContent={`Upload Image ${index + 1}`}
                          tooltipPlacement="right"
                          required={true}
                          onChange={(e) => handleImageCarouselChange(e, index)}
                          ref={imageCarouselInputRefs[index]}
                        />

                        {(() => {
                          const imageKey = `image-${index + 1}`;
                          const imageObj = selectedItem?.[imageKey];
                          const isUploaded =
                            imageObj?.src && imageObj?.src !== "";
                          return isUploaded ? (
                            <p className="text-green-600 text-sm mt-1">
                              Image uploaded
                            </p>
                          ) : null;
                        })()}
                      </div>
                      <button onClick={() => handleImageCarouselDelete(index)}>
                        <DeleteOutlineIcon
                          sx={{
                            fontSize: "23px",
                            marginTop: 3,
                            color: "#ef4444",
                          }}
                        />
                      </button>
                    </div>
                  );
                })}
                {/* {imageCarouselImages.map((item, index) => {
                  // Prepare final image source
                  console.log("item", item)
                  const imageSrcFile = item.src
                    ? `data:image/png;base64,${item.src}`
                    : "";
                  const imageSrcUrl = item.file
                    ? URL.createObjectURL(item.file)
                    : "";
                  const finalSrc = imageSrcFile || imageSrcUrl;

                  return (
                    <div key={index} className="flex items-center space-x-2">
                      {finalSrc ? (
                        <label
                          htmlFor={`carousel-upload-${index}`}
                          className="cursor-pointer"
                        >
                          <img
                            src={finalSrc}
                            alt={`Image ${index + 1}`}
                            className="rounded-full w-20 h-20 object-cover border-2 border-gray-300 hover:opacity-80 transition"
                          />
                        </label>
                      ) : (
                        <InputField
                          label={`Image ${index + 1}`}
                          type="file"
                          accept=".png, .jpeg"
                          tooltipContent="Upload Image"
                          tooltipPlacement="right"
                          required={true}
                          onChange={(e) => handleImageCarouselChange(e, index)}
                          ref={imageCarouselInputRefs[index]}
                        />
                      )}
                      <button onClick={() => handleImageCarouselDelete(index)}>
                        <DeleteOutlineIcon
                          sx={{
                            fontSize: "23px",
                            marginTop: 3,
                            color: "#ef4444",
                          }}
                        />
                      </button>
                    </div>
                  );
                })} */}

                <AnimatedDropdown
                  label="Scale-Type"
                  tooltipContent="Select Scale-Type"
                  tooltipPlacement="right"
                  value={imageCarouselScaleType}
                  options={[
                    { value: "contain", label: "Contain" },
                    { value: "cover", label: "Cover" },
                  ]}
                  onChange={(value) => setImageCarouselScaleType(value)}
                />

                <InputField
                  label="Alt-Text"
                  placeholder="Enter an Alt-text"
                  value={imageCarouselAltText}
                  onChange={(e) => setImageCarouselAltText(e.target.value)}
                />

                {/* <InputField
                label="Aspect-Ratio"
                placeholder=""
                value={imageCarouselAspectRatio}
                onChange={(e) => setImageCarouselAspectRatio(e.target.value)}
              /> */}

                <div className="flex justify-center">
                  <UniversalButton
                    label="Save"
                    onClick={handleImageCarouselSave}
                  />
                </div>
              </div>
            )}

            {/* Editable option for if-else In */}

            {/* {(selectedItem?.type === "ifelse" ||
            selectedThenComponent === "ifelse" ||
            selectedElseComponent === "ifelse") && (
            <>
              <div className="mt-4">
                <AnimatedDropdown
                  label="If-Condition"
                  tooltipContent="Select If-Condition"
                  tooltipPlacement="right"
                  value={selectedCondition}
                  options={[
                    { label: "Equal to", value: "==" },
                    { label: "Not equal to", value: "!=" },
                    { label: "AND", value: "&&" },
                    { label: "OR", value: "||" },
                    { label: "NOT", value: "!" },
                  ]}
                  onChange={(value) => setSelectedCondition(value)}
                />
              </div>

              <div className="mt-4">
                <AnimatedDropdown
                  label="Add Component to Then Branch"
                  tooltipContent="Select Then Branch"
                  tooltipPlacement="right"
                  value={selectedThenComponent}
                  options={[
                    { label: "heading", value: "heading" },
                    { label: "subHeading", value: "subHeading" },
                    { label: "textBody", value: "textBody" },
                    { label: "textCaption", value: "textCaption" },
                    { label: "textInput", value: "textInput" },
                    { label: "textArea", value: "textArea" },
                    { label: "checkBox", value: "checkBox" },
                    { label: "radioButton", value: "radioButton" },
                    { label: "chipSelector", value: "chipSelector" },
                    { label: "dropDown", value: "dropDown" },
                    { label: "datePicker", value: "date" },
                    { label: "embeddedlink", value: "embeddedlink" },
                    { label: "image", value: "image" },
                    { label: "optin", value: "optin" },
                    { label: "switch", value: "switch" },
                    { label: "footer", value: "footerbutton" },
                    { label: "ifelse", value: "ifelse" }
                  ]}
                  
                  // onChange={(value) => setSelectedThenComponent(value)}
                  onChange={(value) => {
                    setSelectedThenComponent(value);
                    if (value === "ifelse") {
                      setNestedIf(true); // ✅ Set your flag here
                    } else {
                      setNestedIf(false); // optionally reset
                    }
                  }}
                />
              </div>

              <div className="mt-4">
                <AnimatedDropdown
                  label="Add Component to Else Branch"
                  tooltipContent="Select Else Branch"
                  tooltipPlacement="right"
                  value={selectedElseComponent}
                  options={[
                    { label: "heading", value: "heading" },
                    { label: "subHeading", value: "subHeading" },
                    { label: "textBody", value: "textBody" },
                    { label: "textCaption", value: "textCaption" },
                    { label: "textInput", value: "textInput" },
                    { label: "textArea", value: "textArea" },
                    { label: "checkBox", value: "checkBox" },
                    { label: "radioButton", value: "radioButton" },
                    { label: "chipSelector", value: "chipSelector" },
                    { label: "dropDown", value: "dropDown" },
                    { label: "datePicker", value: "date" },
                    { label: "embeddedlink", value: "embeddedlink" },
                    { label: "image", value: "image" },
                    { label: "optin", value: "optin" },
                    { label: "switch", value: "switch" },
                    { label: "ifelse", value: "ifelse" },
                    { label: "footer", value: "footerbutton" },
                  ]}
                  onChange={(value) => {
                    setSelectedElseComponent(value);
                    if (value === "ifelse") {
                      setNestedElse(true); // ✅ Set your flag here
                    } else {
                      setNestedElse(false); // optionally reset
                    }
                  }}
                />

                <div className="flex justify-center mt-4">
                  <UniversalButton label="Save" onClick={handleIfElseSave} />
                </div>
              </div>
            </>
          )}

          {(nestedIf === true || nestedElse === true) && (
            <>
              <div className="mt-4">
                <AnimatedDropdown
                  label="If-Condition"
                  tooltipContent="Select If-Condition"
                  tooltipPlacement="right"
                  value={selectedCondition}
                  options={[
                    { label: "Equal to", value: "==" },
                    { label: "Not equal to", value: "!=" },
                    { label: "AND", value: "&&" },
                    { label: "OR", value: "||" },
                    { label: "NOT", value: "!" },
                  ]}
                  onChange={(value) => setSelectedCondition(value)}
                />
              </div>

              <div className="mt-4">
                <AnimatedDropdown
                  label="Add Component to Then Branch"
                  tooltipContent="Select Then Branch"
                  tooltipPlacement="right"
                  value={selectedThenComponent}
                  options={[
                    { label: "heading", value: "heading" },
                    { label: "subHeading", value: "subHeading" },
                    { label: "textBody", value: "textBody" },
                    { label: "textCaption", value: "textCaption" },
                    { label: "textInput", value: "textInput" },
                    { label: "textArea", value: "textArea" },
                    { label: "checkBox", value: "checkBox" },
                    { label: "radioButton", value: "radioButton" },
                    { label: "chipSelector", value: "chipSelector" },
                    { label: "dropDown", value: "dropDown" },
                    { label: "datePicker", value: "date" },
                    { label: "embeddedlink", value: "embeddedlink" },
                    { label: "image", value: "image" },
                    { label: "optin", value: "optin" },
                    { label: "switch", value: "switch" },
                    { label: "ifelse", value: "ifelse" },
                    { label: "footer", value: "footerbutton" },
                  ]}
                  onChange={(value) => {
                    setSelectedThenComponent(value);
                    if (value === "ifelse") {
                      setNestedIf(true); // ✅ Set your flag here
                    } else {
                      setNestedIf(false); // optionally reset
                    }
                  }}
                />
              </div>

              <div className="mt-4">
                <AnimatedDropdown
                  label="Add Component to Else Branch"
                  tooltipContent="Select Else Branch"
                  tooltipPlacement="right"
                  value={selectedElseComponent}
                  options={[
                    { label: "heading", value: "heading" },
                    { label: "subHeading", value: "subHeading" },
                    { label: "textBody", value: "textBody" },
                    { label: "textCaption", value: "textCaption" },
                    { label: "textInput", value: "textInput" },
                    { label: "textArea", value: "textArea" },
                    { label: "checkBox", value: "checkBox" },
                    { label: "radioButton", value: "radioButton" },
                    { label: "chipSelector", value: "chipSelector" },
                    { label: "dropDown", value: "dropDown" },
                    { label: "datePicker", value: "date" },
                    { label: "embeddedlink", value: "embeddedlink" },
                    { label: "image", value: "image" },
                    { label: "optin", value: "optin" },
                    { label: "switch", value: "switch" },
                    { label: "ifelse", value: "ifelse" },
                    { label: "footer", value: "footerbutton" },
                  ]}
                  onChange={(value) => {
                    setSelectedElseComponent(value);
                    if (value === "ifelse") {
                      setNestedElse(true); // ✅ Set your flag here
                    } else {
                      setNestedElse(false); // optionally reset
                    }
                  }}
                />

                <div className="flex justify-center mt-4">
                  <UniversalButton label="Save" onClick={handleIfElseSave} />
                </div>
              </div>

          
          )}
           */}

            {/* {selectedItem?.type === "ifelse" && (
              <>
                <IfElseBlock
                  level={1}
                  selectedThenComponent={selectedThenComponent}
                  setSelectedThenComponent={setSelectedThenComponent}
                  selectedElseComponent={selectedElseComponent}
                  setSelectedElseComponent={setSelectedElseComponent}
                  selectedCondition={selectedCondition}
                  setSelectedCondition={setSelectedCondition}
                  handleIfElseSave={handleIfElseSave}
                  onUpdateTree={handleUpdateTree}
                />
              </>
            )} */}

            {selectedItem?.type === "switch" && (
              <>
                <SwitchFlow
                  selectedItem={selectedItem}
                  onSave={(payload) => {
                    const updatedItem = {
                      ...selectedItem,
                      ...payload,
                    };
                    onSave(updatedItem);
                  }}
                />
              </>
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
                  <UniversalButton label="Save" onClick={handleDateSave} />
                </div>
              </div>
            )}

            {/* Editable option for calendar In */}
            {selectedItem?.type === "calendar" && (
              <div className="space-y-3 mt-3">
                <InputField
                  label="Calendar Label"
                  tooltipContent="Enter Label for Calendar"
                  tooltipPlacement="right"
                  placeholder="Calendar Label"
                  maxLength={40}
                  value={dateCalendarLable}
                  onChange={(e) => setDateCalendarLabel(e.target.value)}
                />

                <InputField
                  label="Helper Text"
                  placeholder="Enter Placeholder for Date"
                  tooltipContent="Enter Placeholder for Date"
                  tooltipPlacement="right"
                  value={dateCalendarPlaceholder}
                  onChange={(e) => setDateCalendarPlaceholder(e.target.value)}
                />

                <div className="mt-2">
                  <UniversalLabel
                    htmlFor="required"
                    className="text-sm font-medium text-gray-700"
                    tooltipcontent="Select an option which required for you."
                    tooltipplacement="top"
                    text="Required"
                  ></UniversalLabel>
                  <div className="flex items-center gap-2 ">
                    <Switch
                      checked={startCalenderRequired}
                      onChange={handleRequiredChange}
                      id="required"
                    />
                    <span>{startCalenderRequired ? "True" : "False"}</span>
                  </div>
                </div>

                <UniversalDatePicker
                  label="Min-Date"
                  tooltipContent="Select Min-Date"
                  tooltipPlacement="right"
                  value={minCalendarDate}
                  onChange={(value) => setMinCalendarDate(value)}
                  PopperProps={{ "data-ignore-click-outside": true }}
                />

                <UniversalDatePicker
                  label="Max-Date"
                  tooltipContent="Select Max-Date"
                  tooltipPlacement="right"
                  value={maxCalendarDate}
                  onChange={(value) => setMaxCalendarDate(value)}
                  minDate={minCalendarDate}
                  disabled={!minCalendarDate}
                  PopperProps={{ "data-ignore-click-outside": true }}
                />

                <UniversalDatePicker
                  label="Unavailable Dates"
                  tooltipContent="Select Unavailable-Date"
                  tooltipPlacement="right"
                  value={null}
                  disabled={!minCalendarDate || !maxCalendarDate}
                  onChange={handleAddCalendarUnavailableDate}
                  PopperProps={{ "data-ignore-click-outside": true }}
                  minDate={minCalendarDate}
                  maxDate={maxCalendarDate}
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
                <div className="flex gap-2">
                  <label>Mode: Range</label>
                  <input
                    type="checkbox"
                    checked={calendarMode === "range"}
                    onChange={(e) =>
                      setCalendarMode(e.target.checked ? "range" : "single")
                    }
                  />
                </div>

                {calendarMode === "range" && (
                  <div className="space-y-2">
                    <InputField
                      label="Second Calendar Label"
                      tooltipContent="Enter End Date Label"
                      tooltipPlacement="right"
                      placeholder="Enter End Date Label"
                      value={endCalendarLabel}
                      onChange={(e) => setEndCalendarLabel(e.target.value)}
                    />

                    <InputField
                      label="Second Calendar Helper Text"
                      placeholder="Enter Second Calendar Helper-text"
                      tooltipContent="Second Calendar Helper Text"
                      tooltipPlacement="right"
                      value={endCalendarHelperText}
                      onChange={(e) => setEndCalendarHelperText(e.target.value)}
                    />

                    <div className="mt-2">
                      <UniversalLabel
                        htmlFor="required"
                        className="text-sm font-medium text-gray-700"
                        tooltipcontent="Select an option which required for you."
                        tooltipplacement="top"
                        text="Required"
                      ></UniversalLabel>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={endCalendarRequired}
                          onChange={handleEndRequiredChange}
                          id="required"
                        />
                        <span>{endCalendarRequired ? "True" : "False"}</span>
                      </div>
                    </div>
                  </div>
                )}

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
          </motion.div>
        </ClickAwayListener>
      </AnimatePresence>
    </Box>
  );
};

export default EditPanel;
