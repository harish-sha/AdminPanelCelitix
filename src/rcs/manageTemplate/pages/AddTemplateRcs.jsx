import React, { useEffect, useState } from "react";
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
import { carousel } from "@material-tailwind/react";
import { set } from "date-fns";
import { fetchAllAgents, saveRcsTemplate } from "@/apis/rcs/rcs";

const AddTemplateRcs = () => {
  const [inputData, setInputData] = useState({
    agentId: "",
    templateName: "",
    templateType: "text",
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
  });

  const [cardOrientation, setCardOrientation] = useState("");

  //caraousel
  const [cardwidth, setCardwidth] = useState("small");
  const [cardheight, setCardheight] = useState("small");
  const [caraousalData, setCaraousalData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [allAgents, setAllAgents] = useState([]);

  const [selectedAction, setSelectedAction] = useState({
    dropdown1: "",
    dropdown2: "",
    dropdown3: "",
    dropdown4: "",
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

  function handleTemplateTypeChange(value) {
    setInputData({ ...inputData, templateType: value });
    setMessageContent("");
    setVariables([]);
    setBtnData([]);
    setCardData({ title: "", mediaHeight: "", file: "" });
  }

  const handleSubmit = async () => {
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

    Object.values(btnData).forEach(({ type, value, title }) => {
      if (!type) return;

      // if (
      //   (type !== "Share Location" && !value) ||
      //   (type === "Share Location" && !title)
      // ) {
      //   toast.error(`Please fill all the fields for ${type}`);
      //   hasError = true;
      //   return;
      // }
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

    variables.forEach((item) => {
      if (item.id && !item.value) {
        toast.error(`Please fill the fields for variable [${item.id}]`);
        hasError = true;
      }
    });

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
      caraousalData.forEach((item, index) => {
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

        Object.values(item.suggestions).forEach(({ type, value, title }) => {
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

          setCaraousalData((prevData) => {
            const updatedData = [...prevData];
            updatedData[index].suggestions = suggestion;
            return updatedData;
          });
        });
      });

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

    if (inputData.templateType === "rich_card") {
      data = {
        ...inputData,
        orientation: cardOrientation,
        height: cardData.mediaHeight,
        standAlone: {
          cardTitle: cardData.title,
          cardDescription: messageContent,
          file: cardData.fileName,
          thumbnailFileName: cardData.fileName,
          suggestions: suggestions,
        },
        variables,
      };
    } else if (inputData.templateType === "text") {
      data = {
        ...inputData,
        suggestions,
        messageContent,
        variables,
      };
    }

    // console.log(cardData, "cardData");
    // console.log(cardwidth, "cardwidth");
    // console.log(cardOrientation, "cardOrientation");
    // console.log("carouselData: ", caraousalData);
    console.log("Api Requested Data", data);

    try {
      const res = await saveRcsTemplate(data);
      console.log(res);
      toast.success("Template added successfully");
    } catch (e) {
      toast.error("Something went wrong");
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
      <div className="flex flex-wrap items-end w-full gap-2 mb-2">
        <div className="w-full sm:w-56">
          <AnimatedDropdown
            label="Select Agent"
            id="selectAgent"
            name="selectAgent"
            options={allAgents.map((item) => ({
              label: item.agentName,
              value: item.agentId,
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
          />
        </div>
        <div className="w-full sm:w-56">
          <InputField
            label="Template Name"
            id="templateName"
            name="templateName"
            placeholder="Enter Template Name"
            value={inputData.templateName}
            onChange={(e) => {
              setInputData({ ...inputData, templateName: e.target.value });
            }}
          />
        </div>
        <div className="w-full sm:w-56">
          <AnimatedDropdown
            label="Template Type"
            id="templateType"
            name="templateType"
            options={[
              {
                label: "Text",
                value: "text",
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
              handleTemplateTypeChange(newValue);
            }}
            placeholder="Select Template Type"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-5 sm:flex-row lg:flex-row">
        <div className="w-full p-2">
          <h1>Text Template</h1>
          {inputData.templateType !== "carousel" && (
            <div className="mb-3">
              <Variables
                variables={variables}
                setVariables={setVariables}
                messageContent={messageContent}
                setMessageContent={setMessageContent}
              />
            </div>
          )}
          {inputData.templateType === "rich_card" && (
            <Card
              type={inputData.templateType}
              cardData={cardData}
              setCardData={setCardData}
              cardOrientation={cardOrientation}
              setCardOrientation={setCardOrientation}
            />
          )}
          {inputData.templateType != "carousel" && (
            <div className="mt-3 mb-3">
              <p className="mb-2">Suggested Actions</p>
              <SuggestedActions
                btnOptions={btnOptions}
                setBtnData={setBtnData}
                btnData={btnData}
                inputData={BtninputData}
                setInputData={setBtnInputData}
                selectedAction={selectedAction}
                setSelectedAction={setSelectedAction}
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
            />
          )}
          <div className="mt-3 place-items-center">
            <UniversalButton
              id="saveTemplate"
              name="saveTemplate"
              label="Submit"
              onClick={handleSubmit}
            />
          </div>
        </div>
        <div className="w-full p-2 pt-2 mt-6">
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
          />
        </div>
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