import React from "react";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import { HandleCampaignDetails } from "./components/CampaignInputDetails";
import { RadioButtonLaunchCampaign } from "./components/RadioButtonLaunchCampaign";
import { Preview } from "./components/Preview";

const SendRcs = () => {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3 ">
      <div className="border border-red-500 min-h-[80vh] p-2">
        <HandleCampaignDetails />
      </div>
      <div className="border border-purple-500">
        <RadioButtonLaunchCampaign />
      </div>
      <div className="border border-blue-500">
        <Preview />
      </div>
    </div>
  );
};

export default SendRcs;
