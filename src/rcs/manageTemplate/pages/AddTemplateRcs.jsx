import React, { useState } from "react";
import InputField from "@/whatsapp/components/InputField";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import UniversalButton from "@/whatsapp/components/UniversalButton";
import { IoSearch } from "react-icons/io5";
import { Variables } from "../components/Variables";
import { SuggestedActions } from "../components/SuggestedActions";
import toast from "react-hot-toast";

const AddTemplateRcs = () => {
  const [inputData, setInputData] = useState({
    agentId: "",
    templateName: "",
    templateType: "",
  });
  const [btnData, setBtnData] = useState([]);

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
      if (type && (!value || !title)) {
        toast.error(`Please fill all the fields for ${type}`);
        hasError = true;
        return;
      } else {
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
      }
    });

    if (
      !inputData.agentId ||
      !inputData.templateName ||
      !inputData.templateType
    ) {
      return toast.error("Please fill all the fields");
    }

    if (hasError) return;

    const data = {
      ...inputData,
      ...suggestions,
      variables: [],
    };

    console.log("Api Requested Data", data);

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
              setInputData({ ...inputData, agentId: newValue });
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
                label: "Template 1",
                value: "Template 1",
              },
            ]}
            value={inputData.templateType}
            onChange={(newValue) => {
              setInputData({ ...inputData, templateType: newValue });
            }}
            placeholder="Select Template Type"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-5">
        <div className="w-full p-2 border">
          <h1>Text Template</h1>
          <Variables />
          <p>Suggested Actions</p>
          <SuggestedActions
            btnOptions={btnOptions}
            setBtnData={setBtnData}
            btnData={btnData}
          />
        </div>
        <div className="w-full border">Preview goes here</div>
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
  );
};
export default AddTemplateRcs;
