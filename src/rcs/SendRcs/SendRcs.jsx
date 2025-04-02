import React from "react";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import { HandleCampaignDetails } from "./components/CampaignInputDetails";

const SendRcs = () => {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3 ">
      <div className="border border-red-500 min-h-[80vh] p-2">
        <HandleCampaignDetails />
      </div>
      <div className="border border-purple-500">2</div>
      <div className="border border-blue-500">3</div>
    </div>
  );
};

export default SendRcs;
