import React, { useState } from "react";
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

const AddTemplateRcs = () => {
  const [inputData, setInputData] = useState({
    agentId: "",
    templateName: "",
    templateType: "",
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

  const [cardOrientation, setCardOrientation] = useState("horizontal");

  //caraousel
  const [cardwidth, setCardwidth] = useState("small");
  const [caraousalData, setCaraousalData] = useState([]);

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

    if (
      Object.keys(inputData).some(
        (key) => !inputData[key] && toast.error(`Please fill the ${key}`)
      )
    ) {
      return;
    }

    variables.map((item, index) => {
      if (item.id && !item.value) {
        toast.error(`Please fill the fields for variable [${item.id}]`);
        hasError = true;
        return;
      }
    });

    if (!messageContent) {
      return toast.error("Please fill the message content");
    }

    if (hasError) return;

    if (inputData.templateType === "rich_card") {
      Object.keys(cardData).forEach((key) => {
        if (!cardData[key]) {
          return toast.error(`Please fill the ${key}`);
        }
      });

      if (!cardOrientation) {
        return toast.error("Please select card orientation");
      }
    }
    if (inputData.templateType === "carousel") {
      Object.keys(cardData).forEach((key) => {
        if (!cardData[key]) {
          return toast.error(`Please fill the ${key}`);
        }
      });

      if (!cardwidth) {
        return toast.error("Please select card width");
      }
    }

    const data = {
      ...inputData,
      ...suggestions,
      messageContent,
      variables,
    };

    console.log(cardData);
    console.log(cardwidth, "cardwidth");
    console.log(cardOrientation, "cardor");

    console.log("Api Requested Data", data);

    setTimeout(() => {
      toast.success("Template added successfully");
      setInputData({ agentId: "", templateName: "", templateType: "" });
      setMessageContent("");
      setVariables([]);
      setBtnData([]);
      setCardData({ title: "", mediaHeight: "", file: "" });
      setCardOrientation("horizontal");
      setCardwidth("small");
    }, 1000);

    // Continue with API request or further processing
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end w-full gap-2 mb-2">
        <div className="w-full sm:w-56">
          <AnimatedDropdown
            label="Select Agent"
            id="selectAgent"
            name="selectAgent"
            options={[
              {
                label: "Agent 1",
                value: "Agent 1",
              },
            ]}
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
                value: "text_message",
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
        <div className="w-full p-2 ">
          <div className="mb-3">
            <h1>Text Template</h1>
            <Variables
              variables={variables}
              setVariables={setVariables}
              messageContent={messageContent}
              setMessageContent={setMessageContent}
            />
          </div>
          {inputData.templateType === "rich_card" && (
            <div className="mb-5">
              <Card
                type={inputData.templateType}
                cardData={cardData}
                setCardData={setCardData}
                cardOrientation={cardOrientation}
                setCardOrientation={setCardOrientation}
                cardwidth={cardwidth}
                setCardwidth={setCardwidth}
              />
            </div>
          )}
          {inputData.templateType === "carousel" && (
            <div className="mb-5">
              <Carousel
              caraousalData={caraousalData}
              setCaraousalData={setCaraousalData}
              />
            </div>
          )}
          <div className="mb-3">
            <p className="mb-2">Suggested Actions</p>
            <SuggestedActions
              btnOptions={btnOptions}
              setBtnData={setBtnData}
              btnData={btnData}
            />
          </div>
          <div className="mt-3 place-items-center">
            <UniversalButton
              id="saveTemplate"
              name={"saveTemplate"}
              label="Submit"
              onClick={handleSubmit}
            />
          </div>
        </div>
        <div className="w-full p-2 pt-2 -mt-00">
          <Preview
            btnData={btnData}
            variables={variables}
            messageContent={messageContent}
            cardData={cardData}
            cardwidth={cardwidth}
            cardOrientation={cardOrientation}
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
