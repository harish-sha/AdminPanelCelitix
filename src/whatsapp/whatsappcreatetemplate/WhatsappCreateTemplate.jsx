import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { WhatsApp } from "@mui/icons-material";
import { useOutletContext } from "react-router-dom";

import AnimatedDropdown from "../components/AnimatedDropdown.jsx";
import InputField from "../components/InputField.jsx";
import UniversalSkeleton from "../components/UniversalSkeleton.jsx";
import LanguageSelect from "../components/LanguageSelect.jsx";
import TemplatePreview from "./components/TemplatePreview.jsx";
import InteractiveActions from "../whatsappcreatetemplate/components/InteractiveActions.jsx";
import TemplateTypes from "../whatsappcreatetemplate/components/TemplateTypes.jsx";
import CarouselTemplatePreview from "../whatsappcreatetemplate/components/CarouselTemplatePreview.jsx";
import CarouselTemplateTypes from "../whatsappcreatetemplate/components/CarouselTemplateTypes.jsx";
import CarouselInteractiveActions from "../whatsappcreatetemplate/components/CarouselInteractiveActions.jsx";
import Loader from "../components/Loader.jsx";
import {
  getWabaList,
  sendTemplatetoApi,
  uploadImageFile,
} from "../../apis/whatsapp/whatsapp.js";

const WhatsappCreateTemplate = () => {
  const navigate = useNavigate();
  const { scrollableContainerRef } = useOutletContext();
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
  const [selectedTemplateType, setSelectedTemplateType] = useState("");
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
  const [cards, setCards] = useState([
    {
      mediaType: "image",
      mediaUrl: "",
      body: "This is a dummy card body. You can change this content later.",
      footer: "This is a dummy footer. You can change this content later.",
      actions: [],
    },
  ]);
  const [variables, setVariables] = useState([]);
  const [templatePreview, setTemplatePreview] = useState("");
  const [carouselMediaType, setCarouselMediaType] = useState("");
  const [urlVariables, setUrlVariables] = useState([]);
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
    }
  }, [interactiveAction]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedTemplateType("");
  };

  const handleTemplateTypeChange = (value) => {
    setSelectedTemplateType(value);
    setCarouselMediaType("");
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
    setState((prev) => `${prev} {${variable}}`);
  };

  const handleEmojiSelect = (setState, emoji) => {
    setState((prev) => `${prev}${emoji}`);
  };

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
    if (!selectedTemplateType) {
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
    if (!templateFormat) {
      toast.error("Template format is required.");
      return;
    }

    const varvalue = variables.map((variable) => variable.value);

    const btns = [];
    if (phoneTitle && phoneNumber) {
      btns.push({
        type: "PHONE_NUMBER",
        text: phoneTitle,
        phone_number: phoneNumber,
      });
    }
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

    const data = {
      name: templateName,
      category: selectedCategory,
      language: selectedLanguage,
      wabaMobile: selectedWaba,
      whatsappSrno: selectedWabaSno,
      components: [],
    };

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

    if (selectedCategory === "UTILITY") {
      data.components.push({
        type: "HEADER",
        format: selectedTemplateType,
      });
    }

    try {
      setIsLoading(true);
      const response = await sendTemplatetoApi(data);

      if (response.message === "Template Name is duplicate") {
        toast.error("Template name is already in use. Please choose another.");
      } else if (response.message === "Template Save Successfully") {
        toast.success("Template submitted successfully!");
      } else if (
        response?.includes("language") &&
        response?.includes("not available")
      ) {
        toast.error(
          "The selected language is not available for message templates. Please try a different language."
        );
      } else {
        toast.error("An unknown error occurred. Please try again.");
      }
    } catch (e) {
      toast.error(e.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (value) => {
    const newValue = value.replace(/\s/g, "");
    setTemplateName(newValue);
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="w-full">
            <div className="">
              <h1 className="mb-4 font-semibold text-center text-gray-800 text-md lg:text-start">
                Create Template
              </h1>
              <div className="flex flex-wrap items-end justify-start gap-4 pb-5 align-middle">
                <div className="w-full sm:w-56">
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
                      }), // Stringify object
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

                <div className="w-full sm:w-56">
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

                {selectedCategory && (
                  <div className="w-full sm:w-56">
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
                  <div className="w-full sm:w-56">
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

                <div className="w-full sm:w-56">
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

                <div className="w-full sm:w-56">
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

            {/* {selectedWaba && selectedCategory && selectedTemplateType ? ( */}
            <div className="flex">
              <div className="w-1/3 px-2 py-0">
                <>
                  {selectedTemplateType === "carousel" &&
                    carouselMediaType ? (
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
                    />
                  ) : (
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
                    />
                  )}

                  {selectedTemplateType === "carousel" &&
                    carouselMediaType ? (
                    <CarouselInteractiveActions
                      cards={cards}
                      selectedCardIndex={selectedCardIndex}
                      setCards={setCards}
                    />
                  ) : (
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
                    />
                  )}
                </>
                <div className="flex items-center justify-center w-full mt-6">
                  <button
                    disabled={
                      !selectedWaba ||
                      !selectedCategory ||
                      !selectedTemplateType ||
                      !templateName
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
                    Submit Template
                  </button>
                </div>
              </div>
              <div className="w-1/3">
                {selectedTemplateType === "carousel" && carouselMediaType ? (
                  <CarouselTemplatePreview
                    scrollContainerRef={scrollableContainerRef}
                    format={templateFormat}
                    cards={cards}
                    footer={templateFooter}
                    setCards={setCards}
                    selectedCardIndex={selectedCardIndex}
                    setSelectedCardIndex={setSelectedCardIndex}
                    onAddCard={(newCard) => setCards([...cards, newCard])}
                    onDeleteCard={handleDeleteCard}
                  />
                ) : (
                  <TemplatePreview
                    scrollContainerRef={scrollableContainerRef}
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
                  />

                  // <></>
                )}
              </div>
            </div>
            {/* ) : ( */}
            <>
              {/* <div className="p-2 border-2 border-blue-500 border-dashed rounded-2xl">
                  <div className="flex items-center justify-center w-full py-4 text-center rounded-lg shadow-lg bg-gradient-to-r h-96 from-blue-500 to-purple-500">
                    <p className="flex items-center gap-2 text-2xl font-medium text-white font-m">
                      <WhatsApp
                        className="inline-block"
                        sx={{ fontSize: "35px", color: "#22d614" }}
                      />
                      Please select your WABA, template category, and type to
                      begin creating your template.
                      {selectedTemplateType === "carousel" && (
                        <>
                          <br />
                          select the carousel media also for creating the
                          carousel cards.
                        </>
                      )}
                    </p>
                  </div>
                </div> */}
            </>
            {/* )} */}
          </div>
        </>
      )}
    </div>
  );
};

export default WhatsappCreateTemplate;
