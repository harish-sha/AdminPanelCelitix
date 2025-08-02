import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import AnimatedDropdown from "../components/AnimatedDropdown.jsx";
import LanguageSelect from "../components/LanguageSelect.jsx";
import InputField from "../components/InputField.jsx";
import { WhatsApp } from "@mui/icons-material";

import UniversalSkeleton from "../components/UniversalSkeleton.jsx";
import TemplatePreview from "./components/TemplatePreview.jsx";
import AuthPreview from "./components/AuthPreview.jsx";
import InteractiveActions from "../whatsappcreatetemplate/components/InteractiveActions.jsx";
import TemplateTypes from "../whatsappcreatetemplate/components/TemplateTypes.jsx";
import CarouselTemplatePreview from "../whatsappcreatetemplate/components/CarouselTemplatePreview.jsx";
import CarouselTemplateTypes from "../whatsappcreatetemplate/components/CarouselTemplateTypes.jsx";
import CarouselInteractiveActions from "../whatsappcreatetemplate/components/CarouselInteractiveActions.jsx";
import Loader from "../components/Loader.jsx";
import {
  getWabaList,
  getWhatsappFlow,
  sendTemplatetoApi,
  uploadImageFile,
} from "../../apis/whatsapp/whatsapp.js";
// import { te } from "date-fns/locale";
import CustomTooltip from "../components/CustomTooltip.jsx";
import { AiOutlineInfoCircle } from "react-icons/ai";
import LoadingOverlay from "@/components/loader/LoadingOverlay.jsx";
// import ca from "date-fns/esm/locale/ca/index.js";

const WhatsappCreateTemplate = () => {
  const navigate = useNavigate();
  // const { scrollableContainerRef } = useOutletContext();
  const [wabaList, setWabaList] = useState(null);
  const [selectedWaba, setSelectedWaba] = useState("");
  const [selectedWabaSno, setSelectedWabaSno] = useState("");
  const [valueWithoutSpaces, setValueWithoutSpaces] = useState("");
  const [templateName, setTemplateName] = useState("");
  // const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTemplateType, setSelectedTemplateType] = useState("text");
  const [templateHeader, setTemplateHeader] = useState("");
  const [templateFormat, setTemplateFormat] = useState("");
  const [templateFooter, setTemplateFooter] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [locationUrl, setLocationUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [interactiveAction, setInteractiveAction] = useState("none");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneTitle, setPhoneTitle] = useState("");
  const [url, setUrl] = useState("");
  const [urlTitle, setUrlTitle] = useState("");
  const [quickReplies, setQuickReplies] = useState([]);
  const [urlValid, setUrlValid] = useState(true);
  const [fileUploadUrl, setFileUploadUrl] = useState("");
  const [cards, setCards] = useState([
    {
      mediaType: "image",
      mediaUrl: "",
      body: "This is a dummy card body. You can change this content later.",
      footer: "This is a dummy footer. You can change this content later.",
      actions: [],
      uploadUrl: "",
    },
  ]);

  const textAreaRef = useRef(null)
  const [variables, setVariables] = useState([]);
  const [templatePreview, setTemplatePreview] = useState("");
  const [carouselMediaType, setCarouselMediaType] = useState("");
  const [urlVariables, setUrlVariables] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  const [headerVariable, setHeaderVariable] = useState([]);
  const [headerVariableValue, setHeaderVariableValue] = useState("");

  const [flowTemplateState, setFlowTemplateState] = useState({
    title: "",
    flow_id: "",
  });

  const [allFlows, setAllFlows] = useState([]);

  const [expiryTime, setExpiryTime] = useState(10);
  const handlePreviewUpdate = (updatedPreview) => {
    setTemplatePreview(updatedPreview);
  };
  const templateTypeOptions = [
    { value: "text", label: "Text" },
    { value: "image", label: "Image" },
    { value: "video", label: "Video" },
    { value: "document", label: "Document" },
    { value: "location", label: "Location" },
    { value: "carousel", label: "Carousel" },
  ];
  const handleDeleteCard = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  // WABA LIST
  useEffect(() => {
    const fetchWabaList = async () => {
      try {
        setIsLoading(true);
        const response = await getWabaList();

        if (response) {
          setWabaList(response);
        } else {
          console.error("Failed to fetch WABA details");
          toast.error("Failed to load WABA details!");
        }
      } catch (error) {
        console.error("Error fetching WABA list:", error);
        toast.error("Error fetching WABA list.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWabaList();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 700));
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (interactiveAction !== "all") {
      setPhoneNumber("");
      setPhoneTitle("");
      setUrl("");
      setUrlTitle("");
      setQuickReplies([]);
      setFlowTemplateState({});
    }
  }, [interactiveAction]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedTemplateType("");
  };

  const handleTemplateTypeChange = (value) => {
    setSelectedTemplateType(value);
    setCarouselMediaType("");
    setTemplateHeader("");
    setTemplateFormat("");
    setTemplateFooter("");
    setImageUrl(null);
    setVideoUrl(null);
    setDocumentUrl(null);
    setLocationUrl("");
    setFile(null);
  };

  const handleCarouselMediaTypeChange = (value) => {
    setCarouselMediaType(value);

    setCards([
      {
        mediaType: value,
        mediaUrl: "",
        body: "This is a dummy card body. You can change this content later.",
        footer: "This is a dummy footer. You can change this content later.",
        actions: [],
      },
    ]);
    setSelectedCardIndex(0);
  };

  const handleAddVariable = (setState, variable) => {
    if (templateFormat.length + variable.length >= 1024) return;
    setState((prev) => `${prev} {${variable}}`);
  };

  const handleEmojiSelect = (setState, emoji, len, type) => {
    if (type.length + emoji.length >= len) return;
    setState((prev) => `${prev}${emoji}`);
  };

  useEffect(() => {
    if (templateFormat.length > 1024) {
      toast.error("Maximum 1024 characters allowed");
    }
  }, [templateFormat]);

  useEffect(() => {
    if (templateFooter.length > 60) {
      toast.error("Maximum 60 characters allowed");
    }
  }, [templateFooter]);

  const handleQuickReplyChange = (index, value) => {
    const newQuickReplies = [...quickReplies];
    newQuickReplies[index] = value;
    setQuickReplies(newQuickReplies);
  };

  const addQuickReply = () => {
    if (quickReplies.length < 3) {
      setQuickReplies([...quickReplies, ""]);
    } else {
      toast.error("Maximum 3 quick replies allowed");
    }
  };

  const removeQuickReply = (index) => {
    const newQuickReplies = quickReplies.filter((_, i) => i !== index);
    setQuickReplies(newQuickReplies);
  };

  const validateUrl = (value) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    setUrlValid(!!urlPattern.test(value));
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (/^\+?[0-9]*$/.test(value)) {
      setPhoneNumber(value);
    }
  };
  useEffect(() => {
    async function handleFetchAllFlow() {
      try {
        const res = await getWhatsappFlow();
        const publishedFlows = res.filter(
          (flow) => flow.status === "PUBLISHED"
        );
        setAllFlows(publishedFlows);
      } catch (e) {
        console.log(e);
      }
    }

    handleFetchAllFlow();
  }, []);

  // Submit Function
  const handleSubmit = async () => {
    if (!selectedWaba) {
      toast.error("Please select a WABA account.");
      return;
    }
    if (!selectedCategory) {
      toast.error("Please select a category.");
      return;
    }

    if (selectedCategory !== "AUTHENTICATION" && !selectedTemplateType) {
      toast.error("Please select a template type.");
      return;
    }

    // if (!carouselMediaType) {
    //   toast.error("Please select a carousel media type.");
    //   return;
    // }
    if (!selectedLanguage) {
      toast.error("Please select a language.");
      return;
    }
    if (!templateName.trim()) {
      toast.error("Template name is required.");
      return;
    }
    if (selectedCategory !== "AUTHENTICATION" && !templateFormat) {
      toast.error("Template format is required.");
      return;
    }

    if (selectedCategory === "AUTHENTICATION" && !expiryTime) {
      toast.error("Expiry time is required.");
      return;
    }

    if (expiryTime > 90) {
      toast.error("Expiry time should be less than 90 mins");
      return;
    }

    const varvalue = variables.map((variable, index) => {
      if (!variable.value) {
        return toast.error(`Please enter value for variable ${index + 1}`);
      }
      return variable.value;
    });

    const flowScreen = allFlows?.find(
      (flow) => flow.flowId === flowTemplateState?.flow_id
    )?.screensId;

    const btns = [];
    if (phoneTitle && phoneNumber) {
      btns.push({
        type: "PHONE_NUMBER",
        text: phoneTitle,
        phone_number: phoneNumber,
      });
    }
    if (flowTemplateState?.title && flowTemplateState?.flow_id) {
      btns.push({
        type: "FLOW",
        text: flowTemplateState?.title,
        flow_id: flowTemplateState?.flow_id,
        navigate_screen: flowScreen,
        flow_action: "navigate",
      });
    }
    // if (
    //   flowTemplateState?.title &&
    //   flowTemplateState?.flow_id &&
    //   flowScreen // make sure a valid screen is found
    // ) {
    //   btns.push({
    //     type: "FLOW",
    //     text: flowTemplateState.title,
    //     flow_id: flowTemplateState.flow_id,
    //     navigate_screen: flowScreen,
    //     flow_action: "navigate",
    //   });
    // }
    if (url && urlTitle) {
      if (urlVariables.length > 0) {
        btns.push({
          type: "URL",
          text: urlTitle,
          url,
          example: [urlVariables[0].value],
        });
      } else {
        btns.push({
          type: "URL",
          text: urlTitle,
          url,
        });
      }
    }
    if (quickReplies.length > 0) {
      quickReplies.forEach((element) => {
        btns.push({
          type: "QUICK_REPLY",
          text: element,
        });
      });
    }

    const isValid = /^[a-z0-9_]+$/.test(templateName);

    if (!isValid) {
      toast.error(
        "Only underscore (_) and alphanumeric are allowed in template name."
      );
      return;
    }

    const data = {
      name: templateName,
      category: selectedCategory,
      language: selectedLanguage,
      wabaMobile: selectedWaba,
      whatsappSrno: selectedWabaSno,
      components: [],
    };

    // if (selectedTemplateType === "text" && templateHeader) {
    //   data.components.push({
    //     type: "HEADER",
    //     format: "TEXT",
    //     text: templateHeader,
    //     // example: {
    //     //   header_text: [templateHeader],
    //     // },
    //   });
    // }

    const allHeadersVariable = headerVariable.map((variable, index) => {
      if (!variable.value) {
        return toast.error(`Please enter value for header variable ${index + 1}`);
      }
      return variable.value;
    })

    if (
      selectedTemplateType === "text" &&
      allHeadersVariable.length > 0 &&
      templateHeader
    ) {
      data.components.push({
        type: "HEADER",
        format: "TEXT",
        text: templateHeader,
        example: {
          header_text: allHeadersVariable,
        },
      });
    } else if (selectedTemplateType === "text" && templateHeader) {
      data.components.push({
        type: "HEADER",
        format: "TEXT",
        text: templateHeader,
        // example: {
        //   header_text: [templateHeader],
        // },
      });
    }

    // insert data in component dynamicall
    if (varvalue.length > 0) {
      data.components.push({
        type: "BODY",
        text: templateFormat,
        example: {
          body_text: [varvalue],
        },
      });
    } else {
      data.components.push({
        type: "BODY",
        text: templateFormat,
      });
    }

    if (btns.length > 0) {
      data.components.push({
        type: "BUTTONS",
        buttons: btns,
      });
    }

    if (templateFooter) {
      data.components.push({
        type: "FOOTER",
        text: templateFooter,
      });
    }

    if (selectedTemplateType != "carousel" && selectedTemplateType != "text" && selectedTemplateType != "location") {
      if (!fileUploadUrl) {
        toast.error("Please upload a file");
        return;
      }
    }

    if (selectedTemplateType != "text" && selectedTemplateType != "carousel" &&
      selectedTemplateType !== "location") {
      data.components.push({
        type: "HEADER",
        format: selectedTemplateType.toUpperCase(),
        example: {
          header_handle: [fileUploadUrl],
        },
      });
    }
    if (selectedTemplateType === "location") {
      data.components.push({
        type: "HEADER",
        format: "LOCATION",
      });
    }
    // "components": [
    //         // {
    //         //     "type": "body",
    //         //     "add_security_recommendation": "" // Optional
    //         // },
    //         {
    //             "type": "footer",
    //             "code_expiration_minutes": "90" // Optional
    //         }
    //         // {
    //         //     "type": "buttons",
    //         //     "buttons": [
    //         //         {
    //         //             "type": "otp",
    //         //             "otp_type": "one_tap",
    //         //             "text": "copy code new", // Optional
    //         //             "autofill_text": "auto fill" // Optional
    //         //         }
    //         //     ]
    //         // }
    //     ]
    let carData = {};

    if (selectedTemplateType === "carousel") {
      carData = {
        name: templateName,
        category: selectedCategory,
        language: selectedLanguage,
        wabaMobile: selectedWaba,
        whatsappSrno: selectedWabaSno,
        components: [
          {
            type: "CAROUSEL",
            cards: [],
          },
        ],
      };

      if (varvalue.length > 0) {
        carData.components.push({
          type: "BODY",
          text: templateFormat,
          example: {
            body_text: [varvalue],
          },
        });
      } else {
        carData.components.push({
          type: "BODY",
          text: templateFormat,
        });
      }

      let isError = false;

      cards.length > 0 &&
        cards.map((i, index) => {
          let btns = {
            type: "BUTTONS",
            buttons: [],
          };

          if (i.actions.length === 0) {
            isError = true;
            return toast.error(
              `At least one action is required for Card ${index + 1}`
            );
          }

          if (!i.uploadUrl) {
            isError = true;
            return toast.error(`Please upload media for Card ${index + 1}`);
          }

          i.actions.map((btn) => {
            if (btn.type === "url") {
              if (!btn.url || btn.url.trim() === "http://") {
                isError = true;
                return toast.error("Please enter url ");
              }
              if (!btn.title) {
                isError = true;
                return toast.error("Please enter title");
              }
              btns.buttons.push({
                type: "URL",
                text: btn.title,
                url: btn.url,
              });
            }
            if (btn.type === "phone") {
              if (!btn.phoneNumber || btn.phoneNumber.trim() === "+91") {
                isError = true;
                return toast.error("Please enter a valid phone number");
              }
              if (!btn.title) {
                isError = true;
                return toast.error("Please enter title");
              }
              btns.buttons.push({
                type: "PHONE_NUMBER",
                text: btn.title,
                phone_number: btn.phoneNumber,
              });
            }
            if (btn.type === "quickReply") {
              if (!btn.title) {
                isError = true;
                return toast.error("Please enter title");
              }
              btns.buttons.push({
                type: "QUICK_REPLY",
                text: btn.title,
              });
            }
          });
          const cardsdata = {
            components: [
              {
                type: "HEADER",
                format: carouselMediaType.toUpperCase(),
                example: {
                  header_handle: [i.uploadUrl],
                },
              },
              {
                type: "BODY",
                text: i.body,
              },
            ],
          };

          if (btns.buttons.length > 0) {
            cardsdata.components.push(btns);
          }

          carData.components[0].cards.push(cardsdata);
        });

      if (isError) {
        return;
      }
    }

    let authPayLoad = {};
    if (selectedCategory === "AUTHENTICATION") {
      authPayLoad = {
        name: templateName,
        category: selectedCategory,
        language: selectedLanguage,
        wabaMobile: selectedWaba,
        whatsappSrno: selectedWabaSno,
        components: [
          {
            type: "footer",
            code_expiration_minutes: expiryTime,
          },
        ],
      };
    }
    let payload = "";

    if (selectedCategory === "AUTHENTICATION") {
      payload = authPayLoad;
      // return;
    } else if (selectedTemplateType != "carousel") {
      payload = data;
      // return;
    } else if (selectedTemplateType === "carousel") {
      payload = carData;
      // return;
    }
    try {
      setIsFetching(true);
      const response = await sendTemplatetoApi(payload);

      const message = response?.msg;

      if (message?.error?.error_user_msg) {
        return toast.error(message.error.error_user_msg);
      }

      if (message?.message === "Template Name is duplicate") {
        return toast.error(
          "Template name is already in use. Please choose another."
        );
        // } else if (response.message === "Template Save Successfully") {
      } else if (message?.message === "Template Save Successfully") {
        // return
        setIsLoading(true);
        toast.success("Template submitted successfully!");
        // return
        setSelectedWaba("");
        setSelectedCategory("");
        setSelectedLanguage("");
        setSelectedWabaSno("");
        setTemplateHeader("");
        setTemplateFormat("");
        setTemplateFooter("");
        setImageUrl(null);
        setVideoUrl(null);
        setDocumentUrl(null);
        setLocationUrl("");
        setFile(null);
        setSelectedTemplateType("text");
        setExpiryTime(10);
        setCarouselMediaType("");
        setTemplateName("");
        setFileUploadUrl("");
        setCards([
          {
            mediaType: "image",
            mediaUrl: "",
            body: "This is a dummy card body. You can change this content later.",
            footer:
              "This is a dummy footer. You can change this content later.",
            actions: [],
            uploadUrl: "",
          },
        ]);

        setPhoneNumber("");
        setPhoneTitle("");
        setUrl("");
        setUrlTitle("");
        setQuickReplies([]);
        setFlowTemplateState({});
        setAllFlows([]);
        navigate("/managetemplate");
      } else if (!response.msg || response.msg === "") {
        // Handle blank msg from backend
        return toast.error(
          "Unable to create template at this time. Please try again later."
        );
      } else if (
        message?.includes("language") &&
        message?.includes("not available")
      ) {
        return toast.error(
          "The selected language is not available for message templates. Please try a different language."
        );
      } else if (!response.msg || response.msg === "") {
        // Handle blank msg from backend
        return toast.error(
          "Unable to create template at this time. Please try again later."
        );
      } else {
        return toast.error("An unknown error occurred. Please try again.");
      }
    } catch (e) {
      console.log(e);
      return toast.error(e.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  const handleInputChange = (value) => {
    const newValue = value.replace(/\s/g, "");
    setTemplateName(newValue);
  };

  return (
    <div className="w-full">
      {/* {isLoading ? (
        <>
          <Loader />
        </>
      ) : ( */}
      <>
        <div className="w-full">
          <div className="">
            <h1 className="mb-4 font-semibold text-center text-gray-800 text-md lg:text-start">
              Create Template
            </h1>
            <div className="flex flex-wrap items-end justify-start gap-4 pb-5 align-middle">
              <div className="w-full sm:w-48">
                {/* <AnimatedDropdown
                    id="createSelectWaba"
                    name="createSelectWaba"
                    label="Select WABA"
                    tooltipContent="Select your whatsapp business account"
                    tooltipPlacement="right"
                    options={wabaList?.map((waba) => ({
                      //   value: waba.mobileNo,
                      value: { mbno: waba.mobileNo, sno: waba.wabaSrno },
                      label: waba.name,
                    }))}
                    value={selectedWaba}
                    onChange={(value) => {
                      setSelectedWaba(value?.mbno);
                      setSelectedWabaSno(value?.sno);
                    }}
                    placeholder="Select WABA"
                  /> */}
                <AnimatedDropdown
                  id="createSelectWaba"
                  name="createSelectWaba"
                  label="Select WABA"
                  tooltipContent="Select your WhatsApp Business Account"
                  tooltipPlacement="right"
                  options={wabaList?.map((waba) => ({
                    value: JSON.stringify({
                      mbno: waba.mobileNo,
                      sno: waba.wabaSrno,
                    }),
                    label: waba.name,
                  }))}
                  value={
                    selectedWaba
                      ? JSON.stringify({
                        mbno: selectedWaba,
                        sno: selectedWabaSno,
                      })
                      : ""
                  }
                  onChange={(selectedValue) => {
                    if (selectedValue) {
                      const parsedValue = JSON.parse(selectedValue);
                      setSelectedWaba(parsedValue.mbno);
                      setSelectedWabaSno(parsedValue.sno);
                    } else {
                      setSelectedWaba(null);
                      setSelectedWabaSno(null);
                    }
                  }}
                  placeholder="Select WABA"
                />
              </div>

              <div className="w-full sm:w-48">
                <AnimatedDropdown
                  id="category"
                  name="category"
                  label="Category"
                  tooltipContent="Select category"
                  tooltipPlacement="right"
                  options={[
                    { value: "MARKETING", label: "Marketing" },
                    { value: "UTILITY", label: "Utility" },
                    { value: "AUTHENTICATION", label: "Authentication" },
                  ]}
                  value={selectedCategory}
                  onChange={(value) => setSelectedCategory(value)}
                  placeholder="Category"
                />
              </div>

              {selectedCategory && selectedCategory !== "AUTHENTICATION" && (
                <div className="w-full sm:w-48">
                  <AnimatedDropdown
                    id="templateType"
                    name="templateType"
                    label="Template Type"
                    tooltipContent="Select template type"
                    tooltipPlacement="right"
                    options={templateTypeOptions.filter(
                      (option) =>
                        selectedCategory === "MARKETING" ||
                        option.value !== "carousel"
                    )}
                    value={selectedTemplateType}
                    onChange={handleTemplateTypeChange}
                    placeholder="Template Type"
                  />
                </div>
              )}

              {selectedTemplateType === "carousel" && (
                <div className="w-full sm:w-48">
                  <AnimatedDropdown
                    id="carouselMediaType"
                    name="carouselMediaType"
                    label="Carousel Media"
                    tooltipContent="Select Carousel Media"
                    tooltipPlacement="right"
                    options={[
                      { value: "image", label: "Image" },
                      { value: "video", label: "Video" },
                    ]}
                    value={carouselMediaType}
                    onChange={handleCarouselMediaTypeChange}
                    placeholder="Carousel Media "
                  />
                </div>
              )}

              <div className="w-full sm:w-48">
                <LanguageSelect
                  id="language"
                  name="language"
                  label="Language"
                  tooltipContent="Select Template language"
                  tooltipPlacement="right"
                  value={selectedLanguage}
                  onChange={(option) => setSelectedLanguage(option.value)}
                />
              </div>

              <div className="w-full sm:w-48">
                <InputField
                  id="templateName"
                  name="templateName"
                  label="Template Name"
                  tooltipContent="Your templatename should not contain spaces."
                  tooltipPlacement="right"
                  onChange={(e) => handleInputChange(e.target.value)}
                  value={templateName}
                  placeholder="Template Name"
                />
              </div>
            </div>
          </div>
          {/* Loader */}
          <LoadingOverlay
            isOpen={isFetching}
            variant="spinner"
            text="Creating Template..."
            size={480}
          />

          {selectedWaba && selectedCategory ? (
            selectedCategory === "AUTHENTICATION" ? (
              <div>
                <div className="grid lg:grid-cols-2 gap-5 mt-4">
                  <div className="border-2 border-gray-300 p-4 rounded-lg">
                    <div className="flex gap-2 items-center">
                      <span
                        htmlFor="expiryTime"
                        className="text-md text-gray-700 font-semibold"
                      >
                        Set Expiry Time
                      </span>
                      <CustomTooltip
                        title="Expiry Time should be in 1 min to 90 min"
                        placement="top"
                        arrow
                      >
                        <span>
                          <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                        </span>
                      </CustomTooltip>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-10">
                        <InputField
                          id="expiryTime"
                          name="expiryTime"
                          type="number"
                          value={expiryTime}
                          tooltipContent="Expiry Time should be in 1 min to 90 min"
                          onChange={(e) => {
                            setExpiryTime(e.target.value);
                          }}
                          maxLength="2"
                        />
                      </div>
                      <p>Minutes</p>
                    </div>
                  </div>
                  <div className="mb-2">
                    <AuthPreview />
                  </div>
                </div>

                <div className="flex items-center justify-center w-full mt-2">
                  <button
                    disabled={
                      !selectedWaba || !selectedCategory || !templateName
                    }
                    className={`px-3 py-2 tracking-wider text-md text-white rounded-md ${selectedWaba && selectedCategory && templateName
                      ? "bg-[#212529] hover:bg-[#434851]"
                      : "bg-gray-300 cursor-not-allowed"
                      }`}
                    onClick={handleSubmit}
                    id="submitTemplate"
                    name="submitTemplate"
                  >
                    Submit Template
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid lg:grid-cols-2 gap-4">
                  <div>
                    <>
                      {
                        selectedTemplateType === "carousel" &&
                        carouselMediaType && (
                          <>
                            <CarouselTemplateTypes
                              templateFormat={templateFormat}
                              setTemplateFormat={setTemplateFormat}
                              templateFooter={templateFooter}
                              setTemplateFooter={setTemplateFooter}
                              handleAddVariable={handleAddVariable}
                              handleEmojiSelect={handleEmojiSelect}
                              selectedCardIndex={selectedCardIndex}
                              setSelectedCardIndex={setSelectedCardIndex}
                              cards={cards}
                              setCards={setCards}
                              file={file}
                              setFile={setFile}
                              onPreviewUpdate={handlePreviewUpdate}
                              setFileUploadUrl={setFileUploadUrl}
                              uploadImageFile={uploadImageFile}
                              setvariables={setVariables}
                              ref={textAreaRef}
                            />
                            <CarouselInteractiveActions
                              cards={cards}
                              selectedCardIndex={selectedCardIndex}
                              setCards={setCards}
                            />
                          </>
                        )

                        // : (
                        //   <div className="w-full">
                        //     <div className="border-blue-500  rounded-2xl w-full">
                        //       <div className="flex items-center justify-center w-full py-4 text-center rounded-lg shadow-lg bg-gradient-to-r h-96 from-blue-500 to-purple-500">
                        //         <p className="flex items-center gap-2 text-2xl font-medium text-white font-m">
                        //           <WhatsApp
                        //             className="inline-block"
                        //             sx={{ fontSize: "35px", color: "#22d614" }}
                        //           />
                        //           Please select your WABA, template category, and
                        //           type to begin creating your template. Select the
                        //           carousel media also for creating the carousel
                        //           cards.
                        //         </p>
                        //       </div>
                        //     </div>
                        //   </div>
                        // )
                      }
                      {selectedTemplateType != "carousel" && (
                        <>
                          <TemplateTypes
                            selectedTemplateType={selectedTemplateType}
                            templateHeader={templateHeader}
                            setTemplateHeader={setTemplateHeader}
                            templateFormat={templateFormat}
                            setTemplateFormat={setTemplateFormat}
                            templateFooter={templateFooter}
                            setTemplateFooter={setTemplateFooter}
                            handleAddVariable={handleAddVariable}
                            handleEmojiSelect={handleEmojiSelect}
                            imageUrl={imageUrl}
                            setImageUrl={setImageUrl}
                            videoUrl={videoUrl}
                            setVideoUrl={setVideoUrl}
                            documentUrl={documentUrl}
                            setDocumentUrl={setDocumentUrl}
                            locationUrl={locationUrl}
                            setLocationUrl={setLocationUrl}
                            file={file}
                            setFile={setFile}
                            onPreviewUpdate={handlePreviewUpdate}
                            setvariables={setVariables}
                            uploadImageFile={uploadImageFile}
                            setFileUploadUrl={setFileUploadUrl}
                            setHeaderVariable={setHeaderVariable}
                            headerVariable={headerVariable}
                            headerVariableValue={headerVariableValue}
                            setHeaderVariableValue={setHeaderVariableValue}
                          />

                          <InteractiveActions
                            interactiveAction={interactiveAction}
                            setInteractiveAction={setInteractiveAction}
                            phoneNumber={phoneNumber}
                            setPhoneNumber={setPhoneNumber}
                            phoneTitle={phoneTitle}
                            setPhoneTitle={setPhoneTitle}
                            url={url}
                            setUrl={setUrl}
                            urlTitle={urlTitle}
                            setUrlTitle={setUrlTitle}
                            quickReplies={quickReplies}
                            setQuickReplies={setQuickReplies}
                            urlValid={urlValid}
                            validateUrl={validateUrl}
                            handlePhoneNumberChange={handlePhoneNumberChange}
                            handleQuickReplyChange={handleQuickReplyChange}
                            addQuickReply={addQuickReply}
                            removeQuickReply={removeQuickReply}
                            setUrlVariables={setUrlVariables}
                            setFlowTemplateState={setFlowTemplateState}
                            flowTemplateState={flowTemplateState}
                            allFlows={allFlows}
                          />
                        </>
                      )}
                    </>
                  </div>
                  <div className="flex items-start justify-center lg:mt-7 ">
                    {selectedTemplateType === "carousel" &&
                      carouselMediaType ? (
                      <>
                        <CarouselTemplatePreview
                          // scrollContainerRef={scrollableContainerRef}
                          format={templateFormat}
                          cards={cards}
                          footer={templateFooter}
                          setCards={setCards}
                          selectedCardIndex={selectedCardIndex}
                          setSelectedCardIndex={setSelectedCardIndex}
                          onAddCard={(newCard) =>
                            setCards([...cards, newCard])
                          }
                          onDeleteCard={handleDeleteCard}
                        />
                      </>
                    ) : null}

                    {selectedTemplateType != "carousel" && (
                      <>
                        <TemplatePreview
                          // scrollContainerRef={scrollableContainerRef}
                          header={templateHeader}
                          format={templateFormat}
                          footer={templateFooter}
                          imageUrl={imageUrl}
                          videoUrl={videoUrl}
                          documentUrl={documentUrl}
                          locationUrl={locationUrl}
                          phoneTitle={phoneTitle}
                          urlTitle={urlTitle}
                          quickReplies={quickReplies}
                          setFlowTemplateState={setFlowTemplateState}
                          flowTemplateState={flowTemplateState}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-center w-full mt-2">
                  <button
                    disabled={
                      !selectedWaba ||
                      !selectedCategory ||
                      !selectedTemplateType ||
                      !templateName ||
                      isFetching
                    }
                    className={`px-3 py-2 tracking-wider text-md text-white rounded-md ${selectedWaba &&
                      selectedCategory &&
                      selectedTemplateType &&
                      templateName
                      ? "bg-[#212529] hover:bg-[#434851]"
                      : "bg-gray-300 cursor-not-allowed"
                      }`}
                    onClick={handleSubmit}
                    id="submitTemplate"
                    name="submitTemplate"
                  >
                    {isFetching ? "Submitting..." : "Submit Template"}
                  </button>
                </div>
              </>
            )
          ) : (
            <>
              <div className=" border-blue-500  rounded-2xl">
                <div className="flex items-center justify-center w-full py-4 text-center rounded-lg shadow-lg bg-gradient-to-r h-96 from-blue-500 to-purple-500">
                  <p className="flex items-center gap-2 text-2xl font-medium text-white font-m">
                    <WhatsApp
                      className="inline-block"
                      sx={{ fontSize: "35px", color: "#22d614" }}
                    />
                    Please select your WABA, template category, and type to
                    begin creating your template.
                    {selectedTemplateType === "carousel" &&
                      !carouselMediaType && (
                        <>
                          <br />
                          select the carousel media also for creating the
                          carousel cards.
                        </>
                      )}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </>
      {/* // )} */}
    </div>
  );
};

export default WhatsappCreateTemplate;
