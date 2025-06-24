import InputField from "@/components/layout/InputField";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import { RadioButton } from "primereact/radiobutton";
import React, { useEffect, useState } from "react";
import { TTS } from "./tts";
import { Broadcast } from "./broadcast";
import { fetchVoiceClips } from "@/apis/Obd/obd";
import toast from "react-hot-toast";

export const OBD = ({
  id,
  nodesInputData,
  setNodesInputData,
  setDetailsDialogVisible,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
  setDetailsDialogVisible: React.Dispatch<React.SetStateAction<{}>>;
}) => {
  const [basicDetails, setBasicDetails] = useState({
    type: "transactional",
    name: "",
    templateType: "",
    tts: "",
    simpleBroadcast: "",
    multiBroadcast: "",
  });
  const [voiceList, setVoiceList] = useState([]);

  useEffect(() => {
    const getObdVoiceClipDetails = async () => {
      try {
        const response = await fetchVoiceClips();
        if (response) {
          setVoiceList(response);
        } else {
          toast.error("Failed to load Voice Details!");
        }
      } catch (error) {
        toast.error("Error in getting voice details.");
      }
    };

    getObdVoiceClipDetails();
  }, []);
  
  return (
    <>
      <div className="container-fluid">
        <div className="flex flex-wrap bg-[#E5E7EB] rounded-2xl">
          <div className=" w-full  p-3  rounded-xl flex lg:flex-nowrap flex-wrap gap-6  min-h-[80vh]">
            <div className="lg:w-1/2 w-full rounded-xl bg-[#f9f9f9]">
              <div className="flex items-center justify-around gap-4 px-2 py-4 ">
                <div className="flex gap-2 border border-gray-300 rounded-lg w-1/2 px-3 py-2">
                  <RadioButton
                    inputId="radioOptionTransactional"
                    name="radioGroupCampaign"
                    value="transactional"
                    onChange={() => {
                      setBasicDetails((prev) => ({
                        ...prev,
                        type: "transactional",
                      }));
                    }}
                    checked={basicDetails.type === "transactional"}
                  />
                  <label
                    htmlFor="radioOptionTransactional"
                    className="text-gray-700 font-medium text-sm   cursor-pointer"
                  >
                    Transactional
                  </label>
                </div>
                <div className="flex gap-2 border border-gray-300 rounded-lg w-1/2 px-3 py-2">
                  <RadioButton
                    inputId="radioOptionPromotional"
                    name="radioGroupCampaign"
                    value="promotional"
                    onChange={() => {
                      setBasicDetails((prev) => ({
                        ...prev,
                        type: "promotional",
                      }));
                    }}
                    checked={basicDetails.type === "promotional"}
                  />
                  <label
                    htmlFor="radioOptionPromotional"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    Promotional
                  </label>
                </div>
              </div>

              <div className="p-3">
                <div>
                  <InputField
                    label="Campaign Name"
                    id="campaignName"
                    name="campaignName"
                    value={basicDetails.name}
                    onChange={(e) =>
                      setBasicDetails((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Enter Campaign name..."
                    tooltipContent="Enter a name for your campaign to easily identify it later"
                    maxLength={20}
                  />
                </div>

                <div className="my-4">
                  <AnimatedDropdown
                    label="OBD Type:"
                    id="obdType"
                    name="obdType"
                    options={[
                      { value: "texttospeech", label: "Text To Speech" },
                      {
                        value: "simplebroadcast",
                        label: "Simple Broadcast",
                      },
                      { value: "multibroadcast", label: "Multi Broadcast" },
                      {
                        value: "dynamicbroadcast",
                        label: "Dynamic Broadcast",
                      },
                    ]}
                    value={basicDetails.templateType}
                    onChange={(value) => {
                      setBasicDetails((prev) => ({
                        ...prev,
                        templateType: value,
                        name: "",
                        tts: "",
                        simpleBroadcast: "",
                        multiBroadcast: "",
                      }));
                    }}
                    placeholder="Select Template"
                    tooltipContent="Use a pre-defined template for your voice broadcast.
                                      Text To Speech Convert text messages to speech for the broadcast.
                                      Simple Broadcast Broadcast a single message to all recipients.
                                      Multi Broadcast Broadcast multiple messages in a sequence."
                    disabled={false}
                  />
                </div>
                {basicDetails?.templateType === "texttospeech" && (
                  <TTS
                    setBasicDetails={setBasicDetails}
                    basicDetails={basicDetails}
                  />
                )}
                {(basicDetails?.templateType === "simplebroadcast" ||
                  basicDetails?.templateType === "multibroadcast") && (
                  <Broadcast
                    setBasicDetails={setBasicDetails}
                    basicDetails={basicDetails}
                    voiceListData={voiceList}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
