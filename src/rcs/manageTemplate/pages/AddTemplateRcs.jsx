import React, { useEffect, useRef, useState } from "react";
import InputField from "@/whatsapp/components/InputField";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import UniversalButton from "@/whatsapp/components/UniversalButton";
import { IoSearch } from "react-icons/io5";
import { Variables } from "../components/Variables";
import { SuggestedActions } from "../components/SuggestedActions";
import toast from "react-hot-toast";
import { Preview } from "../components/Preview";
import { Card } from "../components/Card";
import { Carousel } from "../components/Carousel";
// import { carousel, input } from "@material-tailwind/react";
import { set } from "date-fns";
import { fetchAllAgents, saveRcsTemplate } from "@/apis/rcs/rcs";
import CustomTooltip from "@/components/common/CustomTooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { cardActionsClasses, IconButton } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { GenerateAiContent } from "@/components/common/CustomContentGenerate";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Pdf } from "../components/pdf";

const AddTemplateRcs = () => {
  const [inputData, setInputData] = useState({
    agentId: "",
    templateName: "",
    templateType: "text",
    subType: "image",
  });
  const [btnData, setBtnData] = useState([]);
  const [variables, setVariables] = useState([]);
  const [messageContent, setMessageContent] = useState("");

  //for rich card
  const [cardData, setCardData] = useState({
    title: "",
    mediaHeight: "",
    file: "",
    filePath: "",
    thumbnailPath: "",
    thumbnail: "",
  });

  const [cardOrientation, setCardOrientation] = useState("");

  //caraousel
  const [cardwidth, setCardwidth] = useState("");
  const [cardheight, setCardheight] = useState("");
  const [caraousalData, setCaraousalData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [allAgents, setAllAgents] = useState([]);

  const [selectedAction, setSelectedAction] = useState({
    dropdown1: "",
    dropdown2: "",
    dropdown3: "",
    dropdown4: "",
  });

  const fileRef = useRef(null);
  const thumbnailRef = useRef(null);
  const pdfRef = useRef(null);

  const [pdfTemplateState, setPdfTemplateState] = useState({
    documentFileName: "",
    messageOrder: "",
    pdfBase64: "",
  });

  const [BtninputData, setBtnInputData] = useState({
    dropdown1: {
      type: "",
      title: "",
      value: "",
    },
    dropdown2: {
      type: "",
      title: "",
      value: "",
    },
    dropdown3: {
      type: "",
      title: "",
      value: "",
    },
    dropdown4: {
      type: "",
      title: "",
      value: "",
    },
  });

  const [ai, setAi] = useState({
    isGenerating: false,
    text: "",
    response: "",
    typing: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [isRefresh, setIsRefresh] = useState(false);

  const closePanel = () => {
    setIsOpen(false);
    setAi({
      isGenerating: false,
      text: "",
      response: "",
      typing: false,
    });
  };

  function handlePreviousIndex() {
    if (selectedIndex === 0) return;
    setSelectedIndex((prev) => prev - 1);
  }

  function handleNextIndex() {
    if (selectedIndex + 1 === caraousalData.length) return;
    setSelectedIndex((prev) => prev + 1);
  }

  const btnOptions = [
    {
      label: "Url Action",
      value: "Url Action",
    },
    {
      label: "Dialer Action",
      value: "Dialer Action",
    },
    {
      label: "View Location",
      value: "View Location",
    },
    {
      label: "Share Location",
      value: "Share Location",
    },
    {
      label: "Reply",
      value: "Reply",
    },
  ];

  function handleTemplateCategoryChange(value) {
    setInputData({ ...inputData, templateType: value });
    setMessageContent("");
    setVariables([]);
    setBtnData([]);
    setSelectedAction({
      dropdown1: "",
      dropdown2: "",
      dropdown3: "",
      dropdown4: "",
    });
    fileRef.current && (fileRef.current.value = "");
    thumbnailRef.current && (thumbnailRef.current.value = "");
    setBtnInputData({});
    setCardData({ title: "", mediaHeight: "", file: "" });
  }
  function handleTemplateTypeChange(value) {
    setInputData({ ...inputData, subType: value });
    setMessageContent("");
    setVariables([]);
    setBtnData([]);
    setSelectedAction({
      dropdown1: "",
      dropdown2: "",
      dropdown3: "",
      dropdown4: "",
    });
    fileRef.current && (fileRef.current.value = "");
    thumbnailRef.current && (thumbnailRef.current.value = "");

    setBtnInputData({});
    setCardData({ title: "", mediaHeight: "", file: "" });
  }

  const handleSubmit = async () => {
    if (!inputData.agentId) {
      toast.error("Please select an agent");
      return;
    }

    if (!inputData.templateName) {
      toast.error("Please enter a template name");
      return;
    }

    if (!inputData.templateType) {
      toast.error("Please select a template type");
      return;
    }
    const suggestions = {
      website: [],
      websitetitle: [],
      mobile: [],
      mobiletitle: [],
      replybtn: [],
      replybtntitle: [],
      addresstitle: [],
      addressLatitude: [],
      addressLongitude: [],
      locationtitle: [],
    };

    let hasError = false;
    if (
      inputData.templateType === "text" ||
      inputData.templateType === "rich_card"
    ) {
      Object.values(btnData).forEach(({ type, value, title }) => {
        // console.log(type, value, title);
        if (!type) return;

        if (type == "Share Location") {
          value = "fdsf";
        }

        if (!title || !value) {
          toast.error(`Please fill all the fields for ${type}`);
          hasError = true;
          return;
        }

        if (
          type === "Url Action" &&
          !value.startsWith("http://") &&
          !value.startsWith("https://")
        ) {
          toast.error(`Please enter a valid URL for ${type}`);
          hasError = true;
          return;
        }

        const actions = {
          "Url Action": () => {
            suggestions.website.push(value);
            suggestions.websitetitle.push(title);
          },
          "Dialer Action": () => {
            suggestions.mobile.push(value);
            suggestions.mobiletitle.push(title);
          },
          Reply: () => {
            suggestions.replybtn.push(value);
            suggestions.replybtntitle.push(title);
          },
          "Share Location": () => {
            suggestions.locationtitle.push(title);
          },
          "View Location": () => {
            const [latitude, longitude] = value.split(",");
            suggestions.addresstitle.push(title);
            suggestions.addressLatitude.push(latitude);
            suggestions.addressLongitude.push(longitude);
          },
        };

        actions[type]?.();
      });

      const hasAtLeastOneButton =
        suggestions.website.length ||
        suggestions.mobile.length ||
        suggestions.replybtn.length ||
        suggestions.locationtitle.length ||
        suggestions.addresstitle.length;

      if (!hasAtLeastOneButton && !hasError) {
        toast.error(`Please add at least one button`);
        hasError = true;
        return;
      }

      variables.forEach((item) => {
        if (item.id && !item.value) {
          toast.error(`Please fill the fields for variable [${item.id}]`);
          hasError = true;
        }
      });
    }

    if (
      (inputData.templateType === "text" ||
        inputData.templateType === "rich_card") &&
      !messageContent
    ) {
      toast.error("Please fill the message content");
      return;
    }

    if (hasError) return;

    if (inputData.templateType === "rich_card") {
      for (const key in cardData) {
        console.log(cardData[key], key);
        if (!cardData[key]) {
          toast.error(`Please fill the ${key}`);
          return;
        }
      }

      // Check for card orientation
      if (!cardOrientation) {
        toast.error("Please select card orientation");
        return;
      }
    }

    if (inputData.templateType === "carousel") {
      // Check for carousel card width and height
      if (!cardwidth) {
        toast.error("Please select card width");
        return;
      }
      if (!cardheight) {
        toast.error("Please select card height");
        return;
      }
    }

    // const data = {
    //   ...inputData,
    //   suggestions,
    //   messageContent,
    //   variables,
    // };
    let data = {};
    let isError = false;

    if (inputData.templateType === "rich_card") {
      if (!cardData?.file) {
        toast.error("Please select a file");
        return;
      }
      if (inputData.subType === "video" && !cardData?.thumbnail) {
        toast.error("Please select a thumbnail for the video");
        return;
      }

      // const res = await uploadImageFile(cardData.filePath);
      // let thumbnail = "";
      // if (inputData.subType === "video") {
      //   thumbnail = await uploadImageFile(cardData.thumbnailPath);
      // }
      // console.log(cardData);
      const key = {
        HORIZONTAL: "cardAlignment",
        VERTICAL: "mediaHeight",
      };
      const type = {
        video: "videoPath",
        image: "imagePath",
      };
      const typeList = {
        video: "videoList",
        image: "imageList",
      };
      const isVertical = cardOrientation.toUpperCase() === "VERTICAL";

      const dynamicKey = key[cardOrientation.toUpperCase()];
      const value = isVertical
        ? `${cardData.mediaHeight.toUpperCase()}_HEIGHT`
        : cardData.mediaHeight.toUpperCase();

      const listType = typeList[inputData.subType];
      const fileType = type[inputData.subType];
      data = {
        ...inputData,
        agentId: inputData.agentId.toString(),
        templateType: inputData.subType,
        variables,
        imageList: [
          {
            imagePath: cardData?.file,
            title: cardData.title,
            caption: messageContent,
            cardOrientation: cardOrientation.toUpperCase(),
            // mediaHeight: `${cardData.mediaHeight.toUpperCase()}_HEIGHT`,
            [dynamicKey]: value,
            suggestions: suggestions,
            ...(inputData.subType === "video"
              ? { thumbnailUrl: cardData?.thumbnail }
              : {}),
          },
        ],
      };
    } else if (inputData.templateType === "text") {
      data = {
        ...inputData,
        suggestions,
        messageContent,
        variables,
      };
    } else if (inputData.templateType === "carousel") {
      let imageList = [];
      caraousalData.map((card, index) => {
        if (!card?.filePath) {
          isError = true;
          toast.error("Please upload a file");
          return;
        }
        if (!card?.thumbnailPath) {
          isError = true;
          toast.error("Please upload a thumbnail");
          return;
        }

        const suggestion = {
          website: [],
          websitetitle: [],
          mobile: [],
          mobiletitle: [],
          replybtn: [],
          replybtntitle: [],
          locationtitle: [],
          addresstitle: [],
          addressLatitude: [],
          addressLongitude: [],
        };

        Object.values(card.suggestions).forEach(({ type, value, title }) => {
          if (!type) return;

          if (
            (type !== "Share Location" && !value) ||
            (type === "Share Location" && !title)
          ) {
            toast.error(`Please fill all the fields for ${type}`);
            hasError = true;
            return;
          }

          const actions = {
            "Url Action": () => {
              suggestion.website.push(value);
              suggestion.websitetitle.push(title);
            },
            "Dialer Action": () => {
              suggestion.mobile.push(value);
              suggestion.mobiletitle.push(title);
            },
            Reply: () => {
              suggestion.replybtn.push(value);
              suggestion.replybtntitle.push(title);
            },
            "Share Location": () => {
              suggestion.locationtitle.push(title);
            },
            "View Location": () => {
              const [latitude, longitude] = value.split(",");
              suggestion.addresstitle.push(title);
              suggestion.addressLatitude.push(latitude);
              suggestion.addressLongitude.push(longitude);
            },
          };

          actions[type]?.();
        });

        const hasAtLeastOneButton =
          suggestion.website.length ||
          suggestion.mobile.length ||
          suggestion.replybtn.length ||
          suggestion.locationtitle.length ||
          suggestion.addresstitle.length;

        if (!hasAtLeastOneButton && !hasError) {
          toast.error(
            `Please add at least one button to the card-${index + 1}`
          );
          isError = true;
          return;
        }

        const data = {
          imagePath: card?.filePath,
          thumbnailUrl: card?.thumbnailPath,
          title: card?.cardTitle,
          caption: card?.cardDescription,
          suggestions: suggestion,
        };

        imageList.push(data);
      });

      if (isError) {
        return;
      }

      if (hasError) {
        return;
      }

      data = {
        ...inputData,
        agentId: inputData.agentId.toString(),
        templateType: inputData.subType,
        width: `${cardwidth.toUpperCase()}_WIDTH`,
        height: `${cardheight.toUpperCase()}_HEIGHT`,
        variables,
        imageList: imageList,
      };
    } else if (inputData.templateType === "text_message_with_pdf") {
      if (!pdfTemplateState.documentFileName) {
        toast.error("Please enter a file name");
        return;
      }

      if (!pdfTemplateState.pdfBase64) {
        toast.error("Please upload a PDF file");
        return;
      }
      if (!pdfTemplateState.messageOrder) {
        toast.error("Please select a message order");
        return;
      }

      Object.values(btnData).forEach(({ type, value, title }) => {
        // console.log(type, value, title);
        if (!type) return;

        if (type == "Share Location") {
          value = "fdsf";
        }

        if (!title || !value) {
          toast.error(`Please fill all the fields for ${type}`);
          hasError = true;
          return;
        }

        if (
          type === "Url Action" &&
          !value.startsWith("http://") &&
          !value.startsWith("https://")
        ) {
          toast.error(`Please enter a valid URL for ${type}`);
          hasError = true;
          return;
        }

        const actions = {
          "Url Action": () => {
            suggestions.website.push(value);
            suggestions.websitetitle.push(title);
          },
          "Dialer Action": () => {
            suggestions.mobile.push(value);
            suggestions.mobiletitle.push(title);
          },
          Reply: () => {
            suggestions.replybtn.push(value);
            suggestions.replybtntitle.push(title);
          },
          "Share Location": () => {
            suggestions.locationtitle.push(title);
          },
          "View Location": () => {
            const [latitude, longitude] = value.split(",");
            suggestions.addresstitle.push(title);
            suggestions.addressLatitude.push(latitude);
            suggestions.addressLongitude.push(longitude);
          },
        };

        actions[type]?.();
      });

      const hasAtLeastOneButton =
        suggestions.website.length ||
        suggestions.mobile.length ||
        suggestions.replybtn.length ||
        suggestions.locationtitle.length ||
        suggestions.addresstitle.length;

      if (!hasAtLeastOneButton && !hasError) {
        toast.error(`Please add at least one button`);
        hasError = true;
        return;
      }

      variables.forEach((item) => {
        if (item.id && !item.value) {
          toast.error(`Please fill the fields for variable [${item.id}]`);
          hasError = true;
        }
      });

      data = {
        ...inputData,
        suggestions,
        messageContent,
        variables,
        ...pdfTemplateState,
      };
    }
    // console.log(isError, hasError);
    if (hasError) {
      return;
    }

    if (isError) {
      return;
    }

    try {
      setIsFetching(true);
      delete data.subType;
      const res = await saveRcsTemplate(data);
      if (!res?.status) {
        toast.error(res?.msg);
        return;
      }
      toast.success("Template added successfully");
      setInputData({ agentId: "", templateName: "", templateType: "" });
      setBtnData([]);
      setVariables([]);
      setMessageContent("");

      setCardData({ title: "", mediaHeight: "", file: "" });
      setCardOrientation("horizontal");
      setCardwidth("small");
      setCardheight("small");
      setCaraousalData([]);
      setSelectedIndex(0);
      setAllAgents([]);
      setSelectedAction({
        dropdown1: "",
        dropdown2: "",
        dropdown3: "",
        dropdown4: "",
      });

      setBtnInputData({});
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setIsFetching(false);
    }

    // setTimeout(() => {
    //   toast.success("Template added successfully");

    //   // setInputData({ agentId: "", templateName: "", templateType: "" });
    //   // setMessageContent("");
    //   // setVariables([]);
    //   // setBtnData([]);
    //   // setCardData({ title: "", mediaHeight: "", file: "" });
    //   // setCardOrientation("horizontal");
    //   // setCardwidth("small");
    //   // setCardheight("small");
    //   // setCaraousalData([]);
    //   // setSelectedIndex(0);
    // }, 1000);
  };

  useEffect(() => {
    async function handleFetchAllAgents() {
      const res = await fetchAllAgents();
      setAllAgents(res);
    }
    handleFetchAllAgents();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end w-full p-3 bg-white rounded-lg gap-2 mb-3">
        <div className="w-full sm:w-56">
          <AnimatedDropdown
            label="Select Agent"
            id="selectAgent"
            name="selectAgent"
            options={allAgents.map((item) => ({
              label: item.agent_name,
              value: item.agent_id,
            }))}
            value={inputData.agentId}
            onChange={(newValue) => {
              setMessageContent("");
              setVariables([]);
              setBtnData([]);
              setInputData({
                ...inputData,
                templateType: "",
                templateName: "",
                agentId: newValue,
              });
            }}
            placeholder="Select Agent"
            tooltipContent="Select Agent"
            placement="right"
          />
        </div>
        <div className="w-full sm:w-56">
          <InputField
            label="Template Name"
            id="templateName"
            name="templateName"
            //special character not allowed
            placeholder="Enter Template Name"
            value={inputData.templateName}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[a-zA-Z0-9_]*$/.test(value)) {
                setInputData({ ...inputData, templateName: value });
              }
              // setInputData({ ...inputData, templateName: e.target.value });
            }}
            tooltipContent="Enter a unique name (max 20 characters). Use letters, numbers, or underscores only. No spaces or special symbols."
            maxLength="20"
          />
        </div>
        <div className="w-full sm:w-56">
          <AnimatedDropdown
            label="Template Category"
            id="templateCategory"
            name="templateCategory"
            options={[
              {
                label: "Text",
                value: "text",
              },
              {
                label: "Text with PDF",
                value: "text_message_with_pdf",
              },
              {
                label: "Rich Card Stand Alone",
                value: "rich_card",
              },
              {
                label: "Rich Card Carousel",
                value: "carousel",
              },
            ]}
            value={inputData.templateType}
            onChange={(newValue) => {
              handleTemplateCategoryChange(newValue);
            }}
            placeholder="Select Template Category"
            tooltipContent="Select Template Category"
          />
        </div>
        {inputData.templateType &&
          inputData.templateType !== "text" &&
          inputData.templateType !== "text_message_with_pdf" && (
            <div className="w-full sm:w-56">
              <AnimatedDropdown
                label="Template Type"
                id="templateType"
                name="templateType"
                options={[
                  {
                    label: "Image",
                    value: "image",
                  },
                  {
                    label: "Video",
                    value: "video",
                  },
                ]}
                value={inputData.subType}
                onChange={(newValue) => {
                  handleTemplateTypeChange(newValue);
                }}
                placeholder="Select Template Type"
                tooltipContent="Select Template Type"
              />
            </div>
          )}
      </div>

      <div className="flex flex-col justify-between gap-6 bg-gray-100 sm:flex-row lg:flex-row">
        <div className="w-full p-3 bg-white rounded-lg shadow-md ">
          {/* <h1 className="text-sm font-medium text-gray-700 mb-2">
            Text Template
          </h1> */}
          <div className="flex items-center mb-2 gap-2">
            <span className="text-sm font-medium text-gray-700">
              {String(inputData?.templateType).charAt(0).toUpperCase() +
                String(inputData?.templateType).slice(1)}{" "}
              Template
            </span>
            <CustomTooltip
              title="Enter Message content and variables. Maximum length is 2000 characters."
              placement="right"
              arrow
            >
              <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
            </CustomTooltip>
          </div>
          {inputData.templateType !== "carousel" && (
            <div className="mb-3">
              <div className="relative">
                <Variables
                  variables={variables}
                  setVariables={setVariables}
                  messageContent={messageContent}
                  setMessageContent={setMessageContent}
                  setIsRefresh={setIsRefresh}
                />
                <GenerateAiContent
                  ai={ai}
                  setAi={setAi}
                  setIsOpen={setIsOpen}
                  isOpen={isOpen}
                  right={0.5}
                  bottom={2.9}
                  setMessageContent={setMessageContent}
                  messageContent={messageContent}
                  length={2500}
                />
              </div>
            </div>
          )}
          {inputData.templateType === "rich_card" && (
            <Card
              type={inputData.templateType}
              subType={inputData.subType}
              cardData={cardData}
              setCardData={setCardData}
              cardOrientation={cardOrientation}
              setCardOrientation={setCardOrientation}
              fileRef={fileRef}
              thumbnailRef={thumbnailRef}
            />
          )}
          {inputData.templateType === "text_message_with_pdf" && (
            <Pdf
              pdfTemplateState={pdfTemplateState}
              setPdfTemplateState={setPdfTemplateState}
              pdfRef={pdfRef}
            />
          )}
          {inputData.templateType != "carousel" && (
            <div className="mb-3">
              <div className="flex items-center mb-2 gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Suggested Actions
                </span>
                <CustomTooltip
                  title="URL Action:Opens a specified URL in the recipient's browser when clicked.
                Dialer Action:Initiates a phone call to a specified number when clicked.
                View Location: Displays a specified location by measuring latitude and longitude on the recipient's map application when clicked.
                Share Location: Prompts the recipient to share their current location.
                Reply:Allows the recipient to send a reply message directly."
                  placement="right"
                  arrow
                >
                  <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                </CustomTooltip>
              </div>
              <SuggestedActions
                btnOptions={btnOptions}
                setBtnData={setBtnData}
                btnData={btnData}
                inputData={BtninputData}
                setInputData={setBtnInputData}
                selectedAction={selectedAction}
                setSelectedAction={setSelectedAction}
                isRefresh={isRefresh}
                setIsRefresh={setIsRefresh}
              />
            </div>
          )}
          {inputData.templateType === "carousel" && (
            <Carousel
              caraousalData={caraousalData}
              setCaraousalData={setCaraousalData}
              cardwidth={cardwidth}
              setCardwidth={setCardwidth}
              cardheight={cardheight}
              setCardheight={setCardheight}
              btnOptions={btnOptions}
              setSelectedCardIndex={setSelectedIndex}
              selectedCardIndex={selectedIndex}
              handleNextIndex={handleNextIndex}
              handlePreviousIndex={handlePreviousIndex}
              ai={ai}
              setAi={setAi}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              subType={inputData.subType}
            />
          )}
        </div>

        <div className="p-3">
          <Preview
            btnData={btnData}
            variables={variables}
            messageContent={messageContent}
            cardData={cardData}
            cardwidth={cardwidth}
            cardOrientation={cardOrientation}
            templateType={inputData.templateType}
            caraousalData={caraousalData}
            selectedIndex={selectedIndex}
            handleNextIndex={handleNextIndex}
            handlePreviousIndex={handlePreviousIndex}
            setSelectedCardIndex={setSelectedIndex}
            subType={inputData.subType}
          />
        </div>
      </div>
      <div className="mt-3 place-items-center">
        <UniversalButton
          id="saveTemplate"
          name="saveTemplate"
          label="Submit"
          onClick={handleSubmit}
          disabled={isFetching}
        />
      </div>

      {/* <div className="mt-3 place-items-center">
        <UniversalButton
          id="saveTemplate"
          name={"saveTemplate"}
          label="Submit"
          onClick={handleSubmit}
        />
      </div> */}
    </div>
  );
};
export default AddTemplateRcs;
