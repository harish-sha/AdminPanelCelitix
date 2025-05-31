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
import EditIcon from '@mui/icons-material/Edit'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import UniversalDatePicker from "../../components/UniversalDatePicker";
import AnimatedDropdown from "../../components/AnimatedDropdown";
import { is } from "date-fns/locale";
import { Dialog } from "primereact/dialog";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { uploadImageFile } from "@/apis/whatsapp/whatsapp";

const EditPanel = ({ selectedItem, onClose, onSave }) => {
  const [value, setValue] = useState("");
  // const [options, setOptions] = useState([]);
  const [checked, setChecked] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [newOption, setNewOption] = useState("");
  const [isToggled, setIsToggled] = useState(false)
  // const [file, setFile] = useState("")
  const [uploadPhoto, setUploadPhoto] = useState("")

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
    confirm.log(handerRequired)
  }





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
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'email', label: 'Email' },
  ];


  const [selectedOptionsType, setSelectedOptionsType] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [minValue, setMinValue] = useState('');
  const [labelValue, setLabelValue] = useState('');
  const [errorValue, setErrorValue] = useState('');
  const [placeholderValue, setPlaceholderValue] = useState('');
  const [switchChecked, setSwitchChecked] = useState(false);


  const switchLabel = { inputProps: { 'aria-label': 'Switch demo' } };
  const handleErrorChange = (e) => setErrorValue(e.target.value);
  const handleLabelChange = (e) => setLabelValue(e.target.value);
  const handlePlaceholder = (e) => setPlaceholderValue(e.target.value);
  const handleSwitchChange = (event) => {
    setSwitchChecked(event.target.checked);
  };

  const handleDropdownChange = (val) => {
    const option = OptionsTypeOptions.find(opt => opt.value === val) || null;
    setSelectedOptionsType(option);
    setInputValue('');
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (selectedOptionsType?.value === 'number') {
      // Enforce digit count limits
      if (/^\d*$/.test(val)) {
        if ((!maxValue || val.length <= Number(maxValue))) {
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
      if (selectedOptionsType?.value === 'number' && inputValue.length > Number(val)) {
        setInputValue(inputValue.slice(0, Number(val)));
      }
    }
  };

  const handleMinChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) setMinValue(val);
  };

  const isNumberType = selectedOptionsType?.value === 'number';
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
      textArea: "TextArea"
    };

    const selectedType = selectedItem?.type; // e.g., 'textInput' or 'textArea'
    const mappedType = typeMapping[selectedType];

    if (!selectedType || !mappedType) {
      toast.error("Invalid input type");
      return;
    }

    const payload = {
      texts: {}
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


  const allowed = ['heading', 'subheading', 'textbody', 'textcaption']


  const { type, payload } = selectedItem || {}

  // 1️⃣ state to track the input’s value
  const [headingValue, setHeadingValue] = useState('')

  // 2️⃣ prefill (or clear) when selectedItem changes
  useEffect(() => {
    if (allowed.includes(type)) {
      setHeadingValue(payload?.[type] ?? '')
    } else {
      setHeadingValue('')
    }
  }, [type, payload])

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
  const [link, setLink] = useState("")
  const [onClickAction, setOnClickAction] = useState("")
  const [text, setText] = useState("")


  const handleChange = (e) => {
    setLink(e.target.value)
  }

  const handleEmbeddedLinkSave = () => {

    const payload = {
      label: embaddedlink,
      type: "EmbeddedLink",
      text: text,
      "on-click-action": onClickAction,
    }
    console.log(payload)

  }


  // opt-in
  const [name, setName] = useState("")
  const [optLabel, setOptLabel] = useState('')
  const [optAction, setOPTAction] = useState("")
  const [isChecked, setIsChecked] = useState(false)


  const handleChecked = (e) => {
    setCheckbox(e.target.checked)
  }

  const handleOPTSave = () => {
    const payload = {
      label: optLabel,
      type: "OptIn",
      name: "",
      "on-click-action": optAction,
    }
    console.log(payload)
    // if(optAction === 'navigate'){

    // }

  }


  // image
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const [scaleType, setSCaleType] = useState("contain")
  const [aspectRatio, setAspectRatio] = useState(1)
  const [imgAltText, setImgAltText] = useState("")
  const [imageSrc, setImageSrc] = useState(null);


  const handlePhotoUpload = (e) => {

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSave = (e) => {
    const selectedPhoto = "";
    const payload = {
      type: "Image",
      src: imageSrc,
      width: width,
      height: height,
      "scale-type": scaleType,
      "aspect-ratio": aspectRatio,
      "alt-text": imgAltText

    }
    console.log(payload)

  }

  // date
  const [dateLable, setDateLabel] = useState("")
  const [minDate, setMinDate] = useState([])
  const [maxDate, setMaxDate] = useState([])
  const [dateName, setDateName] = useState("")
  const [unavailableDate, setUnavailableDate] = useState([])
  const [placeholader, setPlaceholder] = useState("")


  const handleDateSave = () => {
    const payload = {
      type: "DatePicker",
      label: dateLable,
      "min-date": minDate,
      "max-date": maxDate,
      name: dateName,
      "unavailable-dates": unavailableDate,
      "helper-text": placeholader,
      "error-message": ""
    }
    console.log(payload)

    if (!name) {
      toast.error("Please Enter Name")
      return
    }
    if (!dateLable) {
      toast.error("Please Enter Label")
      return
    }
  }


  // document
  const [documentName, setDocumentName] = useState("")
  const [listItems, setListItems] = useState("")
  const [documentLabel, setDocumentLabel] = useState("")
  const [description, setDescription] = useState("")
  const [mediaSize, setMediaSize] = useState("")
  const [mainContent, setMainContent] = useState("")
  // const [imageSrc, setImageSrc] = useState(null)
  const [end, setEnd] = useState("")
  const [badges, setBadges] = useState("")
  const [tags, setTags] = useState("")
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {

    const MAX_FILE_SIZE = 100 * 1024;
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert("File size exceeds 100KB. Please upload a smaller file.");
        event.target.value = '';
        return;
      }
      console.log("Uploaded file:", file);
    }

    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    const fileType = uploadedFile.name.split(".").pop().toLowerCase();
    const allowedTypes = ["pdf", "docx", "doc"];

    if (!allowedTypes.includes(fileType)) {
      toast.error("Unsupported file type. Please upload a .pdf, .docx, or .doc file.");
      setFile(null);
      setMainContent("");
      return;
    }

    setFile(uploadedFile);
    setMainContent(`Uploaded file: ${uploadedFile.name}. `);
  };

  const handleDocumentSave = () => {
    if (!documentName) {
      toast.error("Please Enter Name")
      return
    }
    if (!documentLabel) {
      toast.error("Please Enter Label")
      return
    }
    if (!mainContent) {
      toast.error("Please Enter MainContent")
      return
    }

    const payload = {
      type: "NavigationList",
      label: documentLabel,
      name: documentName,
      description: description,
      "media-size": mediaSize || "regular",
      "list-items": listItems,
      'main-content': mainContent,
      uploadedFile: file.name,
      start: imageSrc,
      end: end,
      badges: badges,
      tags: tags

    }

    console.log("Saving:", payload);
    toast.success("Document saved successfully!");
  }








  // footertype
  const [footerButtonLabel, setFooterButtonLabel] = useState('');
  const [leftCaption, setLeftCaption] = useState('');
  const [rightCaption, setRightCaption] = useState('');
  const [centerCaption, setCenterCaption] = useState('');
  const [nextAction, setNextAction] = useState('complete');


  const handleFooterSave = () => {
    if (!footerButtonLabel) {
      toast.error("Please enter a Footer Button Label");
      return;
    }

    const payload = {
      footer: {}
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


  const [radioBtnLabel, setRadioBtnLabel] = useState('');
  const [radioButtonOptions, setRadioButtonOptions] = useState([]);
  const [radiobtnEditIdx, setRadiobtnEditIdx] = useState(null);
  const [draft, setDraft] = useState({
    title: '',
    desc: '',
    metadata: '',
    image: '',
    altText: '',
  });


  const handleRadioImageChange = (event) => {
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

  const handleRadioBtnEdit = (idx) => {
    const opt = radioButtonOptions[idx];
    setRadiobtnEditIdx(idx);
    setDraft({
      title: opt.title,
      desc: opt.desc,
      metadata: opt.metadata,
      image: opt.image || '',
      altText: opt['alt-text'] || '',
      color: opt.color || '#000000',
      enabled: opt.enabled ?? true
    });
  };

  const handleSaveInlineRadio = () => {
    if (!draft.title.trim()) return;

    const newOptions = [...radioButtonOptions];
    newOptions[radiobtnEditIdx] = {
      ...newOptions[radiobtnEditIdx],
      title: draft.title.slice(0, 30),
      desc: draft.desc.slice(0, 300),
      metadata: draft.metadata.slice(0, 20),
      image: draft.image,
      'alt-text': draft.altText,
      color: draft.color,
      enabled: draft.enabled,
      'on-select-action': {
        name: 'update_data',
        payload: { selected: draft.metadata }
      },
      'on-unselect-action': {
        name: 'update_data',
        payload: { selected: null }
      }
    };

    setRadioButtonOptions(newOptions);
    setRadiobtnEditIdx(null);
    setDraft({
      title: '',
      desc: '',
      metadata: '',
      image: '',
      altText: '',

    });
  };

  const handleCancelInlineRadio = () => {
    setRadiobtnEditIdx(null);
    setDraft({
      title: '',
      desc: '',
      metadata: '',
      image: '',
      altText: '',


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
        desc: '',
        metadata: '',

      }
    ]);
  };


  

  const handleRadioUploadFile = async () => {
    if (!radioImageFile) {
      toast.error("Please select an image first before uploading");
      return;
    }

    try {

      const response = await uploadImageFile(radioImageFile, 1);
      setUploadedId(response.handlerid);
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload file.");
    }
  };

  const handleSaveRadioButton = () => {
    console.log("click m")
    const errors = [];

    if (!radioBtnLabel.trim()) {
      toast.error('Label is required');
    }
    if (radioBtnLabel.trim().length > 30) {
      toast.error('Label must be under 30 characters');
    }
    if (radioButtonOptions.length < 1) {
      toast.error('At least one radio option is required');
    }
    if (radioButtonOptions.length > 20) {
      toast.error('Maximum of 20 radio options allowed');
    }

    radioButtonOptions.forEach((opt, idx) => {
      if (!opt.title?.trim()) {
        toast.error(`Option ${idx + 1}: Title is required`);
      }
      if (opt.title?.length > 30) {
        toast.error(`Option ${idx + 1}: Title must be under 30 characters`);
      }
      if (opt.desc?.length > 300) {
        toast.error(`Option ${idx + 1}: Description must be under 300 characters`);
      }
      if (opt.metadata?.length > 20) {
        toast.error(`Option ${idx + 1}: Metadata must be under 20 characters`);
      }

      if (opt.image) {
        const imageSize = Math.ceil(
          (opt.image.length * (3 / 4)) - (opt.image.endsWith('==') ? 2 : opt.image.endsWith('=') ? 1 : 0)
        );
        if (imageSize > 100 * 1024) {
          toast.error(`Option ${idx + 1}: Image must be under 100KB`);
        }
      }
    });

    if (errors.length) {
      alert(errors.join('\n'));
      return;
    }

    // Construct final payload
    const payload = {
      type: 'RadioButtonsGroup',
      label: radioBtnLabel.trim(),
      'data-source': radioButtonOptions.map((opt, idx) => ({
        id: (idx + 1).toString(),
        title: opt.title.trim(),
        description: opt.desc.trim(),
        metadata: opt.metadata.trim(),
        image: opt.image || '',
        // 'alt-text': opt['alt-text'] || '',

      }))
    };

    console.log('Final Payload:', payload);
  };




  //checkbox
  const [mainLabelCheckbox, setMainLabelCheckbox] = useState('');
  const [mainNameCheckbox, setMainNameCheckbox] = useState('');
  const [checkBoxes, setCheckBoxes] = useState([]);

  const [editCheckBoxId, setEditCheckBoxId] = useState(null);

  // console.log("mainLabelCheckbox", mainLabelCheckbox)
  // console.log("checkBoxes", checkBoxes)
  // console.log("editCheckBoxId", editCheckBoxId)


  // checkbox 
  const handleCheckBoxSave = () => {

    if (!mainLabelCheckbox) {
      toast.error("Please enter a Checkbox Label");
      return;
    }

    if (checkBoxes.length < 1) {
      toast.error("Please enter at least Checkbox Label");
      return;
    }

    const payload = {
      checkboxGroups: {}
    }

    const existingCount = selectedItem?.checkboxGroups
      ? Object.keys(selectedItem.checkboxGroups).length
      : 0;
    const id = `checkbox_${existingCount + 1}`;


    payload.checkboxGroups[id] = {
      label: mainLabelCheckbox,
      options: checkBoxes
    };

    console.log("Saving checkboxes payload:", payload);

    // Assuming we want to merge it with selectedItem like in handleInputSave
    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    onSave(updatedData);
    onClose();
    console.log("Final checkboxes data:", updatedData);

  }

  //checkbox

  // dropdown
  const [mainLabelDropdown, setMainLabelDropdown] = useState('');
  const [options, setOptions] = useState([]);
  const [editingIdx, setEditingIdx] = useState(null);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftDesc, setDraftDesc] = useState('');
  const [draftMetadata, setDraftMetaData] = useState('');
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
    setDraftDesc(opt.description);
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
            description: draftDesc.trim(),
            metadata: draftMetadata.trim(),
          }
          : o
      )
    );


    setEditingIdx(null);
    setDraftTitle('');
    setDraftDesc('');
    setDraftMetaData('');
  };


  const handleCancelInline = () => {
    setEditingIdx(null);
    setDraftTitle('');
    setDraftDesc('');
    setDraftMetaData('');
  };


  const handleRemove = (idx) => {
    setOptions((prev) => prev.filter((_, i) => i !== idx));


    if (idx === editingIdx) {
      setEditingIdx(null);
      setDraftTitle('');
      setDraftDesc('');
      setDraftMetaData('');
    }
  };


  const handleAddNew = () => {
    setOptions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: `Option ${prev.length + 1}`,
        description: '',
        metadata: '',

      }
    ]);
  };


  const handleSaveDropdown = () => {
    const filteredOptions = options.filter((o) => o.title.trim());


    const payloadOptions = filteredOptions.map((o, idx) => ({
      id: idx + 1,
      title: o.title.trim(),
      description: o.description.trim(),
      metadata: o.metadata.trim(),
      image: uploadedId ? uploadedId : o.image || '',
    }));

    const payload = {
      label: mainLabelDropdown.trim(),
      "data-source": payloadOptions
    };


    console.log('Dropdown', payload);


    if (typeof onSave === 'function') {
      onSave(payload);
    }
  };

  // dropdown
  // akhil

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
        {["heading", "subheading", "textbody", "textcaption",].includes(selectedItem?.type) && (
          <div className="mb-2 font-semibold text-lg">

            <InputField
              label={`Edit ${type}`}
              placeholder={`Edit ${type}`}
              variant="outlined"
              fullWidth
              value={headingValue}
              maxLength={maxLengthMap[selectedItem?.type] || 80}
              onChange={(e) => setHeadingValue(e.target.value)}
            />

            <div className="mt-5">
              <UniversalButton
                label="SAVE"
                onClick={() => {
                  onSave({
                    index: selectedItem.index,
                    [type]: headingValue
                  })
                }}
              />
            </div>

            {/* <InputField
              // label={`Edit ${selectedItem.type}`}
              variant="outlined"
              fullWidth
              value={value}
              onChange={(e) => setValue(e.target.value)}
            // sx={{ mb: 2 ,fontSize:"md" }}
            /> */}
            {/* <Switch
              color={isToggled ? "primary" : "secondary"}
              onChange={handleToggle}
            // {isToggled ? "ON" : "OFF"}
            />
            {isToggled && (
              <AnimatedDropdown
                // onHide={false}
                value={isToggled}
                onChange={(value) => handleToggle(value)}
                fullWidth
                sx={{ marginTop: 2 }}
                visible={isToggled}
                options={[
                  { value: "A", label: "A" },
                  { value: "B", label: "B" },
                  { value: "C", label: "C" },
                  { value: "D", label: "D" }
                ]}

              />
            )} */}


          </div>
        )}


        {["textInput", "textArea"].includes(
          selectedItem?.type) && (
            <div className="mb-2 text-lg space-y-2">
              <InputField
                label={`Edit ${type}`}
                id="mainlabel"
                placeholder={`Edit ${type}`}
                value={labelValue}
                maxLength={20}
                onChange={handleLabelChange}
              />
              {selectedItem?.type === "textInput" && (
                <AnimatedDropdown
                  label={`Select Type ${type}`}
                  options={OptionsTypeOptions}
                  value={selectedOptionsType?.value || ''}
                  onChange={handleDropdownChange}
                  placeholder={selectedOptionsType?.label || 'Select Type'}
                />)
              }


              <InputField
                label={`Placeholder ${type}`}
                type='text'
                placeholder={`Enter placeholder for ${type}`}
                value={placeholderValue}
                maxLength={80}
                onChange={handlePlaceholder}
              />

              {
                selectedItem?.type === "textInput" && (
                  <InputField
                    label="Enter error to display"
                    id="maineroor"
                    placeholder="Enter Error"
                    value={errorValue}
                    maxLength={30}
                    onChange={handleErrorChange}
                  />
                )
              }

              <div style={{ display: 'flex', gap: 8 }}>
                <InputField
                  label="Min Length"
                  id="min"
                  type="number"
                  placeholder={isNumberType ? 'Min digits' : 'Min length'}
                  value={minValue}
                  onChange={handleMinChange}
                  autoComplete="off"
                />
                <InputField
                  label="Max Length"
                  id="max"
                  type="number"
                  placeholder={isNumberType ? 'Max digits' : 'Max length'}
                  value={maxValue}
                  onChange={handleMaxChange}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="required" className="text-sm font-medium text-gray-700">Is Input Required??</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

                  <Switch {...switchLabel} checked={switchChecked} onChange={handleSwitchChange} id="required" />
                  <span>{switchChecked ? 'Yes' : 'No'}</span>
                </div>
              </div>

              <div>
                <UniversalButton
                  label="SAVE"
                  onClick={handleInputSave}
                />
              </div>



              {/* <InputField
                id="maininput"
                type={selectedOptionsType?.value || 'text'}
                placeholder={
                  selectedOptionsType
                    ? `Enter ${selectedOptionsType.label}`
                    : 'Enter value'
                }
                value={inputValue}
                onChange={handleInputChange}
                {...(!isNumberType && {
                  minLength: minNum,
                  maxLength: maxNum,
                })}
              /> */}

              {/* <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                <InputField
                  id="max"
                  type="number"
                  placeholder={isNumberType ? 'Max digits' : 'Max length'}
                  value={maxValue}
                  onChange={handleMaxChange}
                  autoComplete="off"
                />

                <InputField
                  id="min"
                  type="number"
                  placeholder={isNumberType ? 'Min digits' : 'Min length'}
                  value={minValue}
                  onChange={handleMinChange}
                  autoComplete="off"
                />
              </div> */}




              {/* <InputField
                // label={`Edit ${selectedItem.type}`}
                placeholder={`Edit ${selectedItem.type}`}
                variant="outlined"
                fullWidth
                multiline
                rows={6}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              // sx={{ mb: 2 }}
              /> */}
              {/* <input type="text" />
              <Switch
                color={isToggled ? "primary" : "secondary"}
                onClick={handleToggle}
              // {isToggled ? "ON" : "OFF"}
              /> */}
              {/* {isToggled && (
                <AnimatedDropdown
                  value={isToggled}
                  onChange={(value) => handleToggle(value)}
                  fullWidth
                  sx={{ marginTop: 2 }}
                  visible={isToggled === isToggled}
                  options={[
                    { value: "A", label: "A" },
                    { value: "B", label: "B" },
                    { value: "C", label: "C" },
                    { value: "D", label: "D" }
                  ]}
                />
              )} */}
            </div>
          )}


        {/* Editable Options for Checkboxes */}

        {selectedItem?.type === "checkBox" && (
          <FormControl fullWidth>
            {/* ── Main Label ── */}
            <Box sx={{ mb: 2 }}>
              <InputField
                label="Label"
                value={mainLabelCheckbox}
                onChange={(e) => setMainLabelCheckbox(e.target.value)}
                placeholder="Enter label"
                maxLength={30}
                fullWidth
              />
            </Box>

            {/* ── Main Name ── */}
            <Box sx={{ mb: 2 }}>
              <InputField
                label="Name"
                value={mainNameCheckbox}
                onChange={(e) => setMainNameCheckbox(e.target.value)}
                placeholder="Enter Name"
                maxLength={30}
                fullWidth
              />
            </Box>



            {/* ── Render Each Checkbox Option ── */}
            {checkBoxes.map((opt) => {
              const isEditing = editCheckBoxId === opt.id;

              return (
                <Box
                  key={opt.id}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: '1px solid #ddd',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: isEditing ? '#f5f5f5' : 'white',
                    flexWrap: 'wrap',
                    gap: 1,
                  }}
                >
                  {/* LEFT SIDE: Content */}
                  {isEditing ? (
                    <Box sx={{ flexGrow: 1, minWidth: '250px' }}>
                      {/* Title */}
                      <Box sx={{ mb: 1 }}>
                        <InputField
                          label="Title"
                          value={opt.title}
                          maxLength={30}
                          onChange={(e) =>
                            setCheckBoxes((prev) =>
                              prev.map((item) =>
                                item.id === opt.id ? { ...item, title: e.target.value } : item
                              )
                            )
                          }
                          fullWidth
                          autoFocus
                        />
                      </Box>

                      {/* Description */}
                      <Box sx={{ mb: 2 }}>
                        <InputField
                          label="Description"
                          value={opt.description || ''}
                          onChange={(e) =>
                            setCheckBoxes((prev) =>
                              prev.map((item) =>
                                item.id === opt.id
                                  ? { ...item, description: e.target.value }
                                  : item
                              )
                            )
                          }
                          placeholder="Enter Description"
                          maxLength={300}
                          fullWidth
                        />
                      </Box>

                      {/* Image Upload */}
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          Upload Image
                        </Typography>

                        <InputField
                          type="file"
                          id="file-upload"
                          // accept=".png, .jpeg"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const imageUrl = URL.createObjectURL(file);
                              setCheckBoxes((prev) =>
                                prev.map((item) =>
                                  item.id === opt.id ? { ...item, image: imageUrl } : item
                                )
                              );
                            }
                          }}
                          sx={{ display: 'none' }}
                        />

                        {opt.image && (
                          <Box mt={2}>
                            <Typography variant="body2" color="textSecondary">
                              Preview:
                            </Typography>
                            <Box
                              component="img"
                              src={opt.image}
                              alt="Selected"
                              sx={{
                                width: 150,
                                height: 150,
                                objectFit: 'cover',
                                borderRadius: 1,
                                border: '1px solid #ddd',
                                mt: 1,
                              }}
                            />
                          </Box>
                        )}
                      </Box>

                      {/* Buttons */}
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <UniversalButton
                          label="Save"
                          onClick={() => setEditCheckBoxId(null)}
                          disabled={!opt.title.trim()}
                        />
                        <UniversalButton
                          label="Cancel"
                          onClick={() => setEditCheckBoxId(null)}
                          className="p-button-text"
                        />
                      </Box>
                    </Box>
                  ) : (
                    // Display Mode

                    <Box
                      sx={{
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        minWidth: '250px',
                      }}
                    >
                      {/* Left: Title + Description */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        {opt.title && (
                          <Typography variant="subtitle1">{opt.title}</Typography>
                        )}
                        {opt.description && (
                          <Typography variant="body2" color="textSecondary">
                            {opt.description}
                          </Typography>
                        )}
                      </Box>

                      {/* Image (if exists) */}
                      {opt.image && (
                        <Box
                          component="img"
                          src={opt.image}
                          alt="Selected"
                          sx={{
                            width: 60,
                            height: 60,
                            objectFit: 'cover',
                            borderRadius: '50%',
                            border: '1px solid #ddd',
                          }}
                        />
                      )}
                    </Box>
                  )}

                  {/* RIGHT SIDE: Action Buttons */}
                  {!isEditing && (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap:"10", mb: 1 }}>
    {/* Checkbox Group Label */}
    <Typography variant="p" sx={{ fontWeight: 400 }}>
      Checkbox
    </Typography>

    {/* Edit & Delete Icons */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <IconButton
        size="small"
        onClick={() => setEditCheckBoxId(opt.id)}
      >
        <EditIcon fontSize="small" />
      </IconButton>

      <IconButton
        size="small"
        onClick={() =>
          setCheckBoxes((prev) => prev.filter((item) => item.id !== opt.id))
        }
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  </Box>
)}

                </Box>
              );
            })}


            {/* ── Add New Option ── */}
            <Box sx={{ mt: 1 }}>
              <IconButton
                onClick={() =>
                  setCheckBoxes((prev) => [
                    ...prev,
                    {
                      id: Date.now().toString(),
                      title: '',
                      description: '',
                      image: '',
                    },
                  ])
                }
                disabled={checkBoxes.length >= 20}
              >
                <AddCircleOutlineOutlinedIcon fontSize="medium" />
              </IconButton>
            </Box>

            {/* ── Final Save ── */}
            <Box sx={{ mt: 3 }}>
              <UniversalButton label="Save" onClick={handleCheckBoxSave} />
            </Box>
          </FormControl>
        )}





        {/* Editable Options for Radio Buttons */}
        {selectedItem?.type === "radioButton" && (
          <FormControl fullWidth>
            <Box sx={{ mb: 2 }}>
              <InputField
                label="Radio Group Label"
                value={radioBtnLabel}
                onChange={(e) => setRadioBtnLabel(e.target.value)}
                placeholder="Enter label"
                fullWidth
              />
            </Box>

            {radioButtonOptions.map((opt, idx) => {
              const isEditing = idx === radiobtnEditIdx;
              return (

                <Box key={opt.id} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2, gap: 4 }}>
                  {isEditing ? (
                    <>
                      <div className="space-y-3">
                        <InputField
                          label="Title"
                          value={draft.title}
                          onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                          fullWidth
                          sx={{ mb: 1 }}
                        />
                        <InputField
                          label="Description"
                          value={draft.desc}
                          onChange={(e) => setDraft((d) => ({ ...d, desc: e.target.value }))}
                          fullWidth
                          sx={{ mb: 1 }}
                        />
                        <InputField
                          label="Metadata"
                          value={draft.metadata}
                          onChange={(e) => setDraft((d) => ({ ...d, metadata: e.target.value }))}
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
                        <Box sx={{ display: 'flex', mb: 1 }}>
                          <InputField
                            type="file"
                            id="file-upload"
                            accept=".png, .jpeg"
                            required
                            onChange={handleImageChange}
                            sx={{ display: 'none' }}
                          />
                          <button onClick={handleRadioUploadFile}>
                            <FileUploadOutlinedIcon sx={{ fontSize: "23px" }} />
                          </button>
                        </Box>

                                               
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <UniversalButton label="Save" onClick={handleSaveInlineRadio} />
                          <UniversalButton label="Cancel" onClick={handleCancelInlineRadio} />
                        </Box>
                      </div>
                    </>
                  ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ flexGrow: 1 }} onClick={() => handleRadioBtnEdit(idx)}>
                        <Typography variant="subtitle1">{opt.title}</Typography>
                        <Typography variant="body2">{opt.desc}</Typography>
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

            <Box sx={{ mt: 3 }}>
              <Uni  versalButton label="Save RadioButton" onClick={()=>handleSaveRadioButton()} />
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
                    border: '1px solid #ddd',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: isEditing ? '#f5f5f5' : 'white'
                  }}
                >
                  {isEditing ? (
                    // ── Inline Editing Mode ──
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ mb: 1 }}>
                        <InputField
                          label="Title"
                          id={`edit-title-${idx}`}
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
                          value={draftDesc}
                          onChange={(e) => setDraftDesc(e.target.value)}
                          placeholder="Enter description"
                          type="text"
                          fullWidth
                        />
                      </Box>
                      <Box sx={{ mb: 1 }}>
                        <InputField
                          label="Metadata"
                          id={`edit-meta-${idx}`}
                          value={draftMetadata}
                          onChange={(e) => setDraftMetaData(e.target.value)}
                          placeholder="Enter Metadata"
                          type="text"
                          fullWidth
                        />
                      </Box>
                      <Box sx={{ display: 'flex', mb: 1 }}>
                        <InputField
                          type="file"
                          id="file-upload"
                          accept=".png, .jpeg"
                          required
                          onChange={handleImageChange}
                          sx={{ display: 'none' }}
                        />
                        <button onClick={handleUploadFile}>
                          <FileUploadOutlinedIcon sx={{ fontSize: "23px" }} />
                        </button>



                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <UniversalButton
                          label="Save"
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
                        sx={{ flexGrow: 1, cursor: 'pointer' }}
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
            <Box sx={{ mt: 1 }}>
              <IconButton onClick={handleAddNew}>
                <AddCircleOutlineOutlinedIcon fontSize="medium" />
              </IconButton>
            </Box>

            {/* ── Save Dropdown Button ── */}
            <Box sx={{ mt: 3 }}>
              <UniversalButton
                id="save-dropdown-options"
                label="Save dropdown"
                onClick={handleSaveDropdown}
              />
            </Box>
          </FormControl>
        )}
        {/* <Dialog
        header={editingIdx === null ? 'Add Option' : `Edit Option ${editingIdx + 1}`}
        visible={dialogVisible}
        style={{ width: '360px' }}
        modal
        onHide={() => setDialogVisible(false)}
              >
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12">
            <InputField
              id="optionTitle"
              label="Title"
              value={draftTitle}
              onChange={e => setDraftTitle(e.target.value)}
              autoFocus
              type="text"
            />
          </div>
          <div className="p-field p-col-12">
            <InputField
              id="optionDesc"
              label="Description"
              value={draftDesc}
              onChange={e => setDraftDesc(e.target.value)}
              type="text"
            />
          </div>
        <div className="p-dialog-footer">
          <UniversalButton
            label="Cancel"
            icon="pi pi-times"
            className="p-button-text"
            onClick={() => setDialogVisible(false)}
          />
          <UniversalButton
            label={editingIdx === null ? 'Add' : 'Save'}
            icon="pi pi-check"
            onClick={saveDialogOption}
            disabled={!draftTitle.trim()}
          />
        </div>
        </div>

      </Dialog> */}



        {/* Editable option for FooterButton  */}
        {selectedItem?.type === "footerbutton" && (
          <div className="mb-2 text-lg space-y-2">
            <InputField
              label="Footer Button Label"
              placeholder="Enter Footer Button Label"
              id="footer-button-label"
              value={footerButtonLabel}
              onChange={e => setFooterButtonLabel(e.target.value)}
            />

            <InputField
              label="Left Caption"
              placeholder="Enter Left Caption"
              id="left-caption"
              value={leftCaption}
              onChange={e => setLeftCaption(e.target.value)}
            />

            <InputField
              label="Right Caption"
              placeholder="Enter Right Caption"
              id="right-caption"
              value={rightCaption}
              onChange={e => setRightCaption(e.target.value)}
            />

            <InputField
              label="Center Caption"
              placeholder="Enter Center Caption"
              id="center-caption"
              value={centerCaption}
              onChange={e => setCenterCaption(e.target.value)}
            />

            <AnimatedDropdown
              id="next-action"
              label="Next Action"
              options={[
                { value: 'complete', label: 'Complete' },
                { value: 'navigate', label: 'Navigate' },
              ]}
              value={nextAction}
              onChange={val => setNextAction(val)}
            />
            <div>
              <UniversalButton
                label="SAVE"
                onClick={handleFooterSave}
              />
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
              placeholder="Button Embedded Link"
              onChange={handleChange}
            />
            <div className="mt-5 space-y-3">
              <AnimatedDropdown
                id="next-action"
                label="Action"
                options={[
                  { value: 'data-exchage', label: 'Data Exchange' },
                  { value: 'navigate', label: 'Navigate' },
                  { value: 'open-url', label: "Open URL" }
                ]}
                value={onClickAction}
                onChange={value => setOnClickAction(value)}
              />

              <UniversalButton label="Save"
                onClick={handleOPTSave} />
            </div>

          </>
        )
        }

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
                    { value: 'data-exchage', label: 'Data Exchange' },
                    { value: 'navigate', label: 'Navigate' },
                    { value: 'open-url', label: 'Open URL' }
                  ]}
                  value={optAction}
                  onChange={value => setOPTAction(value)}
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

        {selectedItem?.type === "photo" && (
          <>
            <div className="space-y-3">

              <InputField
                type="file"
                id="file-upload"
                accept=".png, .jpeg"
                required={true}
                onChange={handlePhotoUpload}
              />

              {imageSrc && (
                <img src={imageSrc} alt="Uploaded preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
              )}

              <InputField
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
              />

              <InputField
                label="Scale-Type"
                type="text"
                value={scaleType}
                onChange={(e) => setSCaleType(e.target.value)}
              />

              <InputField
                label="Aspect-Ratio"
                type="number"
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
              />

              <InputField
                label="Alt-Text"
                value={imgAltText}
                type="text"
                onChange={(e) => setImgAltText(e.target.value)}
              />

              <UniversalButton
                label="Save"
                onClick={handleImageSave}
              />
            </div>
          </>
        )}

        {selectedItem?.type === "document" && (
          <>
            <div className="space-y-3">

              <InputField
                label="Document Label"
                maxLength={80}
                value={documentLabel}
                onChange={(e) => setDocumentLabel(e.target.value)}
              />

              <InputField
                label="Document Name"
                required={true}
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
              />

              <InputField
                label="List-items"
                minLength={1}
                maxLength={20}
                required={true}
                value={listItems}
                onChange={(e) => setListItems(e.target.value)}
              />

              <InputField
                label="Description"
                maxLength={300}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <InputField
                label="Media Size"
                value={mediaSize}
                onChange={(e) => setMediaSize(e.target.value)}
              />


              <InputField
                type="file"
                id="file-upload"
                accept=".doc,.docx,.pdf"
                label="Main Content"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {mainContent && (
                <div className="mt-4 p-4 bg-white border rounded shadow text-sm whitespace-pre-wrap">
                  <h2 className="text-lg font-semibold mb-2">Extracted Content:</h2>
                  {mainContent}
                </div>
              )}

              {/* <InputField
                label="Start"
                maxLength={100}
                value={start}
                onChange={(e) => setStart(e.target.value)}
              /> */}


              <InputField
                type="file"
                id="file-upload"
                accept=".png, .jpeg"
                label="Start"
                required={true}
                onChange={handlePhotoUpload}
              />

              {imageSrc && (
                <img src={imageSrc} alt="Uploaded preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
              )}


              <InputField
                label="End"
                maxLength={10}
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />

              <InputField
                label="Badge"
                maxLength={15}
                value={badges}
                onChange={(e) => setBadges(e.target.value)}
              />

              <InputField
                label="Tag"
                maxLength={15}
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />

              <UniversalButton
                label="Save"
                onClick={handleDocumentSave}
              />
            </div>
          </>
        )}

        {selectedItem?.type === "ifelse" && (
          <InputField
            placeholder="If-Else"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}

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

              {imageSrc && (
                <img src={imageSrc} alt="Uploaded preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
              )}

              <InputField
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
              />

              <InputField
                label="Scale-Type"
                type="text"
                value={scaleType}
                onChange={(e) => setSCaleType(e.target.value)}
              />

              <InputField
                label="Aspect-Ratio"
                type="number"
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
              />

              <InputField
                label="Alt-Text"
                value={imgAltText}
                type="text"
                onChange={(e) => setImgAltText(e.target.value)}
              />

              <UniversalButton
                label="Save"
                onClick={handleImageSave}
              />




            </div>
          </>
        )}

        {selectedItem?.type === "date" && (
          <div className="space-y-3">


            <InputField
              label="Date Label"
              maxLength={40}
              value={dateLable}
              onChange={(e) => setDateLabel(e.target.value)}
            />


            <InputField
              label="Name"
              value={dateName}
              onChange={(e) => setDateName(e.target.value)}
            />

            <UniversalDatePicker
              label="Min-Date"
              value={minDate}
              onChange={(value) => setMinDate(value)}
            />

            <UniversalDatePicker
              label="Max-Date"
              value={maxDate}
              onChange={(value) => setMaxDate(value)}
            />


            <UniversalDatePicker
              label="Unavailable Dates"
              value={unavailableDate}
              onChange={(value) => setUnavailableDate(value)}
            />

            <UniversalButton
              label="Save"
              onClick={handleDateSave}
            />

          </div>

        )}

        {selectedItem?.type === "userdetail" && (
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
                  { value: "D", label: "D" }
                ]}
              />
            )}
          </>
        )}

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
    </Box >
  );
};

export default EditPanel;