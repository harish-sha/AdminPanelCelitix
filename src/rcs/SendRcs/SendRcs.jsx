import React, { useEffect } from "react";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import { HandleCampaignDetails } from "./components/CampaignInputDetails";
import { RadioButtonLaunchCampaign } from "./components/RadioButtonLaunchCampaign";
import { Preview } from "./components/Preview";
import { useState } from "react";
import { fetchAllAgents, fetchAllTemplates } from "@/apis/rcs/rcs";
import toast from "react-hot-toast";

const SendRcs = () => {
  const [allAgents, setAllAgents] = useState([]);
  const [allTemplates, setAllTemplates] = useState([]);
  const [campaignDetails, setCampaignDetails] = useState({
    agent: "",
    campaignName: "",
    templateSrno: "",
  });

  useEffect(() => {
    async function handleFetchAllAgents() {
      try {
        const res = await fetchAllAgents();
        setAllAgents(res);
      } catch (e) {
        console.log(e);
        toast.error("Something went wrong.");
      }
    }

    async function handleFetchAllTemplates() {
      try {
        const res = await fetchAllTemplates();
        console.log(res)
      } catch (e) {
        console.log(e);
        toast.error("Something went wrong.");
      }
    }

    handleFetchAllAgents();
    handleFetchAllTemplates();
  }, []);
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3 ">
      <div className="border border-red-500 min-h-[80vh] p-2">
        <HandleCampaignDetails
          setCampaignDetails={setCampaignDetails}
          campaignDetails={campaignDetails}
          allAgents={allAgents}
        />
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