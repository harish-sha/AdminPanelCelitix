import { useState, useEffect } from "react";
// import WavesurferPlayer from "@wavesurfer/react";
import { RadioButton } from "primereact/radiobutton";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoStop } from "react-icons/io5";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Wifi,
  BatteryFull,
  Signal,
  PhoneOff,
  PhoneCall,
  BellOff,
  MessageCircle,
  Clock,
  User,
} from "lucide-react";

import Loader from "@/whatsapp/components/Loader.jsx";
import InputField from "@/whatsapp/components/InputField.jsx";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown.jsx";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea.jsx";
import UniversalButton from "@/whatsapp/components/UniversalButton.jsx";
import DynamicValueBox from "./components/DynamicValueBox.jsx";
import RadioButtonLaunchCampaignObd from "./components/RadioButtonLaunchCampaignObd.jsx";
import ObdVariable from "./components/ObdVariable.jsx";
import DynamicObdVariable from "./components/DynamicObdVariable.jsx";
import { GenerateAiContent } from "@/components/common/CustomContentGenerate";

import { getAllGroups } from "@/apis/common/common.js";
import {
  sendObdCampaign,
  fetchVoiceClips,
  fetchVoiceClipUrl,
  ObdVariableList,
  ObdDynamicVoiceClip,
} from "@/apis/Obd/obd.js";

const BASE_AUDIO_URL = import.meta.env.VITE_AUDIO_URL;
// const BASE_AUDIO_URL = "/voiceAudioUrl";

const ObdCreateCampaign = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [schedule, setSchedule] = useState(null);
  const [visibledialog, setVisibledialog] = useState(false);

  const [selectedOptionCampaign, setSelectedOptionCampaign] =
    useState("transactional");
  const [selectedOption, setSelectedOption] = useState("option1");

  const [campaignName, setCampaignName] = useState("");
  const [obdType, setObdType] = useState(null);

  const [ttsArea, setTTSArea] = useState("");
  console.log("ttsArea", ttsArea);
  const [dynamicTtsArea, setDynamicTtsArea] = useState({});
  console.log("dynamicTtsArea", dynamicTtsArea);

  const [retry, setRetry] = useState(null);
  const [interval, setInterval] = useState(null);

  const [scheduledDateTime, setScheduledDateTime] = useState(new Date());

  const [formData, setFormData] = useState({});
  const [groups, setGroups] = useState([]);
  const [fileHeaders, setFileHeaders] = useState([]);
  const [totalRecords, setTotalRecords] = useState("");
  const [xlsxPath, setXlsxPath] = useState("");
  const [selectedMobileColumn, setSelectedMobileColumn] = useState("");

  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [isGroup, setIsGroup] = useState(0);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [addCountryCode, setAddCountryCode] = useState(false);
  const [resetImportContact, setResetImportContact] = useState(false);

  const [voiceListData, setVoiceListData] = useState([]);
  const [slectedSBVoiceFile, setSelectedSBVoiceFile] = useState("");

  const [dynamicVoiceListData, setDynamicVoiceListData] = useState([]);
  const [slectedDynamicVoiceFile, setSelectedDynamicVoiceFile] = useState(null);
  const [voiceDynamicURLPath, setVoiceDynamicURLPath] = useState("");
  const [voiceVariables, setVoiceVariables] = useState([]);
  console.log("voiceVariables", voiceVariables);
  const [voiceDBClip, setVoiceDBClip] = useState(null);

  const [selectedMBFiletwo, setSelectedMBFiletwo] = useState("");

  const [mobilenums, setMobileNums] = useState("");

  const [wavesurfer, setWavesurfer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [allHeaders, setAllHeaders] = useState([]);
  const [variableValue, setVariableValue] = useState();
  const [dynamicVariableValue, setDynamicVariableValue] = useState();

  const [voiceSBURLPath, setVoiceSBURLPath] = useState("");
  const [voiceMBURLPath, setVoiceMBURLPath] = useState("");
  const [dynamicValueJson, setDynamicValueJson] = useState({});
  console.log("dynamicValueJson", dynamicValueJson);

  // ai content start
  const [isOpen, setIsOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(true);
  const [hasInserted, setHasInserted] = useState(false);
  const [typingKey, setTypingKey] = useState(0);
  const [generationCount, setGenerationCount] = useState(0);

  const [ai, setAi] = useState({
    isGenerating: false,
    text: "",
    response: "",
    typing: false,
  });
  // ai content end

  useEffect(() => {
    ObdVariableList();
    ObdDynamicVoiceClip(1);
  }, []);

  useEffect(() => {
    const isHeaderAvailable = fileHeaders?.length;

    if (isHeaderAvailable) {
      setAllHeaders(fileHeaders);
    } else {
      setAllHeaders(["firstName", "lastName", "mobile"]);
    }
  }, [fileHeaders]);

  const onReady = (ws) => {
    setWavesurfer(ws);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (!wavesurfer) return;

    if (isPlaying) {
      wavesurfer.pause();
    } else {
      wavesurfer.play();
    }
  };

  const handleRestart = () => {
    if (wavesurfer) {
      wavesurfer.seekTo(0);
      wavesurfer.play();
    }
  };

  const resetForm = () => {
    // Clear campaign fields
    setCampaignName("");
    setObdType(null);
    setTTSArea("");
    setDynamicTtsArea("");
    setSelectedSBVoiceFile("");
    setSelectedMBFiletwo("");
    setVoiceDBClip(null);
    setVoiceVariables([]);

    // retry and interval
    setRetry(null);
    setInterval(null);

    // Clear Group/Excel form
    setIsGroup(0);
    setSelectedGroups([]);
    setXlsxPath("");
    setFileHeaders([]);
    setSelectedMobileColumn("");
    setSelectedCountryCode("");
    setAddCountryCode(false);
    setFormData({});

    setUploadedFile(null);

    setMobileNums("");
    setSchedule(false);
    setScheduledDateTime(new Date());
  };

  // To change transactional and promotional
  const handleChangeOption = (event) => {
    const value = event.target.value;
    setSelectedOptionCampaign(value);
    resetForm();
  };

  // handle Review button
  const handleReviewAndSubmitBtn = () => {
    // 1. Validate campaign option
    if (!selectedOptionCampaign) {
      toast.error(
        "Please select a campaign option (Transactional or Promotional)."
      );
      return;
    }

    if (!campaignName) {
      toast.error("Please enter campaign name.");
      return;
    }

    if (!obdType) {
      toast.error("Please select a campaign type (OBD Type).");
      return;
    }

    if (obdType === "texttospeech") {
      if (!ttsArea || ttsArea.trim().length === 0) {
        toast.error("Please fill in the Text-to-Speech area.");
        return;
      }
    }

    if (obdType === "simplebroadcast") {
      if (!slectedSBVoiceFile) {
        toast.error("Please select a voice clip from the dropdown.");
        return;
      }
    }

    if (obdType === "multibroadcast") {
      if (!slectedSBVoiceFile || !selectedMBFiletwo) {
        toast.error("Please select voice clips from both dropdowns.");
        return;
      }
    }

    if (obdType === "dynamicbroadcast") {
      if (!slectedDynamicVoiceFile) {
        toast.error("Please select Dynamic voice clip!");
        return;
      }
    }

    if (!retry) {
      toast.error("Please select a retry value.");
      return;
    }

    if (!interval) {
      toast.error("Please select an interval value.");
      return;
    }

    // 2. Validate group/import contact
    //  if (selectedOption === "") {
    //   toast.error("Please choose how to add your audience (Group or Import Contact).");
    //   return;
    // }

    if (selectedOption === "option1") {
      if (!selectedGroups || selectedGroups.length === 0) {
        toast.error("Please select at least one group.");
        return;
      }

      const totalGroupCount = groups
        .filter((grp) => selectedGroups.includes(grp.groupCode))
        .reduce((acc, curr) => acc + Number(curr.totalCount), 0);

      if (totalGroupCount === 0) {
        toast.error(
          "Selected groups have no contacts. Please choose groups with contacts."
        );
        return;
      }
    }

    if (selectedOption === "option2") {
      if (!uploadedFile) {
        toast.error("Please upload a file.");
        return;
      }

      if (
        addCountryCode &&
        (!selectedCountryCode || selectedCountryCode === "")
      ) {
        toast.error("Please select a country code.");
        return;
      }

      if (
        selectedMobileColumn === null ||
        selectedMobileColumn === undefined ||
        selectedMobileColumn === ""
      ) {
        toast.error("Please select a mobile number field.");
        return;
      }
    }

    setVisibledialog(true);
  };

  // To switch between group and contact
  const handleOptionChange = (value) => {
    setSelectedOption(value);
    setFileHeaders([]);
  };

  const handleFileHeadersUpdate = (
    filePath,
    headers,
    totalRecords,
    countryCode
  ) => {
    setFileHeaders(headers);
    setTotalRecords(totalRecords);
    setXlsxPath(filePath);
    if (countryCode) {
      setSelectedCountryCode(countryCode);
    }
  };

  const handleSelectMobilecolumn = (value) => setSelectedMobileColumn(value);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const res = await getAllGroups();
        setGroups(res);
      } catch (e) {
        toast.error("Failed to fetch groups.");
      }
    }

    fetchGroups();
  }, []);

  const handleGroupChange = (selectedValues) => {
    const selected = Array.isArray(selectedValues) ? selectedValues : [];

    setSelectedGroups(selected);
    setIsGroup(selected.length > 0 ? 1 : 0);
  };

  // Get Voice data

  useEffect(() => {
    const getObdVoiceClipDetails = async () => {
      try {
        const response = await fetchVoiceClips();
        if (response) {
          const filtered = response.filter((item) => item.isDynamic === 0);
          setVoiceListData(filtered);
          // setVoiceListData(response);
        } else {
          toast.error("Failed to load Voice Details!");
        }
      } catch (error) {
        toast.error("Error in getting voice details.");
      }
    };

    getObdVoiceClipDetails();
  }, []);

  useEffect(() => {
    const getObdDynamicVoiceClipDetails = async () => {
      try {
        const response = await ObdDynamicVoiceClip(1);
        if (response && Array.isArray(response)) {
          setDynamicVoiceListData(response);
        } else {
          toast.error("Failed to load Dynamic Voice Details!");
        }
      } catch (error) {
        toast.error("Error in getting dynamic voice details.");
      }
    };

    getObdDynamicVoiceClipDetails();
  }, []);

  const formatDateTime = (dateObj) => {
    if (!dateObj) return "0";

    const pad = (n) => String(n).padStart(2, "0");

    const year = dateObj.getFullYear();
    const month = pad(dateObj.getMonth() + 1);
    const day = pad(dateObj.getDate());
    const hours = pad(dateObj.getHours());
    const minutes = pad(dateObj.getMinutes());
    const seconds = pad(dateObj.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleFinalSubmit = async (event) => {
    if (event) event.preventDefault();

    const accusageTypeId =
      selectedOptionCampaign === "transactional"
        ? "1"
        : selectedOptionCampaign === "promotional"
        ? "2"
        : "";
    const retryCount = retry;
    const intervalValue = interval;
    const getCampaignType = () => {
      switch (obdType) {
        case "texttospeech":
          return "TTS";
        case "simplebroadcast":
          return "SB";
        case "multibroadcast":
          return "MB";
        case "dynamicbroadcast":
          return "Dynamic";
        default:
          return "";
      }
    };

    const totalGroupCount = groups
      .filter((grp) => selectedGroups.includes(grp.groupCode))
      .reduce((acc, curr) => acc + Number(curr.totalCount), 0);

    const formattedObj = voiceVariables.reduce((acc, item) => {
      acc[`sequence_${item.sequence}`] = item.variableSampleValue;
      return acc;
    }, {});

    setDynamicValueJson(formattedObj);

    const data = {
      mobilenos: mobilenums,
      campaignName: campaignName || "",
      accusageTypeId: accusageTypeId,
      mobileNoFilePath: isGroup === 1 ? "" : xlsxPath || "",
      mobileNumberField: isGroup === 1 ? "-1" : selectedMobileColumn,
      campaignType: getCampaignType(),
      voiceText: ttsArea
        ? ttsArea.replace(/(?<!{){{([a-zA-Z0-9_]+)}}(?!})/g, "#$1#")
        : "",
      retryCount: retryCount || "",
      interval: intervalValue || "",
      totalCount: isGroup === 1 ? totalGroupCount : totalRecords,
      countryCode: isGroup === 1 ? "" : selectedCountryCode,
      isGroup: isGroup,
      groupSrno: isGroup === 1 ? selectedGroups : [],
      isSchedule: schedule && scheduledDateTime ? "1" : "0",
      scheduleDateTime:
        schedule && scheduledDateTime ? formatDateTime(scheduledDateTime) : "0",
      dynamicVoiceCallSrno: slectedDynamicVoiceFile || "",
      dynamicValueJson: JSON.stringify(formattedObj),
      voiceCallSrno:
        obdType === "simplebroadcast"
          ? slectedSBVoiceFile || ""
          : obdType === "multibroadcast"
          ? slectedSBVoiceFile || ""
          : "",
      voiceCallSrno2:
        obdType === "multibroadcast" ? selectedMBFiletwo || "" : "",
    };

    try {
      const response = await sendObdCampaign(data);
      const msg = response?.msg?.toLowerCase() || "";

      if (msg.match(/\b(add|added|success|successfully)\b/)) {
        resetForm();
        setResetImportContact((prev) => !prev);
        setVisibledialog(false);
        toast.success(response.msg);
      } else if (msg.match(/\b(fail|failed|error|not)\b/)) {
        setVisibledialog(false);

        toast.error(response.msg);
      } else {
        toast.error("Campaign launch failed.");
      }
    } catch (error) {
      console.error("Error submitting campaign:", error);
      toast.error("Error launching campaign. Please try again.");
    }
  };

  const handleFileUpload = (value) => {
    setUploadedFile(value);
  };

  const handleCountryCheckBox = (value) => {
    setAddCountryCode(value);
  };

  const handleTestingInputChange = (e) => {
    const cleaned = e.target.value.replace(/[^0-9+,]/g, "");
    setMobileNums(cleaned);
  };

  const totalGroupNumbers = groups
    .filter((grp) => selectedGroups.includes(grp.groupCode))
    .reduce((acc, curr) => acc + Number(curr.totalCount), 0);

  const handleVariableSelect = (variable) => {
    setVariableValue(variable);
    setTTSArea((prev) => prev + `{{${variable}}}`);
  };

  const handleDynamicVariableSelect = (variable) => {
    setDynamicVariableValue(variable);
    setDynamicTtsArea((prev) => prev + `{{${variable}}}`);
  };


  const handleSelectSBVoice = async (value) => {
    const audioId = value;

    try {
      const res = await fetchVoiceClipUrl(audioId);
      // if (!res.path) return toast.error("Something went wrong");
      const url = BASE_AUDIO_URL + res.path;
      console.log(url);
      setVoiceSBURLPath(url);
    } catch (error) {
      console.error("Error fetching Voice File:", error);
      toast.error("Error fetching Voice File.");
    }
  };

  const handleSelectMBVoice = async (value) => {
    const audioId = value;
    try {
      const res = await fetchVoiceClipUrl(audioId);
      // if (!res.path) return toast.error("Something went wrong");

      const url = BASE_AUDIO_URL + res.path;
      setVoiceMBURLPath(url);
    } catch (error) {
      console.error("Error fetching Voice File:", error);
      toast.error("Error fetching Voice File.");
    }
  };

  const handleSelectDynamicVoice = async (srno) => {
    try {
      const res = await ObdVariableList(srno);
      console.log("res", res);
      if (!res?.data || !Array.isArray(res.data)) {
        toast.error("Invalid variable data received");
        return;
      }

      const enrichedVariables = res.data.map((item) => ({
        sequence: item.sequence,
        variableSampleValue: item.variableSampleValue || "",
      }));

      setVoiceVariables(enrichedVariables);

      const audioURL = BASE_AUDIO_URL + (res?.path || "");
      setVoiceDynamicURLPath(audioURL);
    } catch (error) {
      console.error("Error fetching Voice File:", error);
      toast.error("Error fetching Voice File.");
    }
  };

  const handleVoiceVariableChange = (index, newValue, dynamicTtsArea) => {
    console.log("newValue", newValue);
    console.log("index", index);
    setVoiceVariables((prev) => {
      const updated = [...prev];
      updated[index].variableSampleValue = newValue;
      return updated;
    });
  };

  return (
    <div className="max-w-full bg-gray-100 rounded-2xl">
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="container-fluid ">
            <div className="flex flex-wrap bg-[#E5E7EB] rounded-2xl">
              <div className=" w-full p-3  rounded-xl flex lg:flex-nowrap flex-wrap gap-3  min-h-[80vh]">
                <div className="lg:w-1/2 w-full rounded-xl bg-[#f9f9f9]">
                  <div className="flex items-center justify-around gap-4 px-2 pb-0 pt-4 ">
                    <div className="flex gap-2 border border-gray-300 rounded-lg w-1/2 px-3 py-2">
                      <RadioButton
                        inputId="radioOptionTransactional"
                        name="radioGroupCampaign"
                        value="transactional"
                        onChange={handleChangeOption}
                        checked={selectedOptionCampaign === "transactional"}
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
                        onChange={handleChangeOption}
                        checked={selectedOptionCampaign === "promotional"}
                      />
                      <label
                        htmlFor="radioOptionPromotional"
                        className="text-gray-700 font-medium text-sm cursor-pointer"
                      >
                        Promotional
                      </label>
                    </div>
                  </div>

                  <div className="p-2">
                    <div>
                      <InputField
                        label="Campaign Name"
                        id="campaignName"
                        name="campaignName"
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                        placeholder="Enter Campaign name..."
                        tooltipContent="Enter a name for your campaign to easily identify it later"
                      />
                    </div>

                    <div className="my-3">
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
                        value={obdType}
                        onChange={(value) => {
                          setObdType(value);
                          setTTSArea("");
                          setSelectedSBVoiceFile("");
                          setSelectedDynamicVoiceFile(null);
                          setSelectedMBFiletwo("");
                          setVoiceDBClip(null);
                          setRetry(null);
                          setInterval(null);
                        }}
                        placeholder="Select Template"
                        tooltipContent="Use a pre-defined template for your voice broadcast.
                        Text To Speech Convert text messages to speech for the broadcast.
                        Simple Broadcast Broadcast a single message to all recipients.
                        Multi Broadcast Broadcast multiple messages in a sequence."
                      />
                    </div>

                    {obdType === "texttospeech" && (
                      <div className="relative">
                        <UniversalTextArea
                          value={ttsArea}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 1000) setTTSArea(value);
                          }}
                          className="w-full p-2 border h-40 border-gray-300 rounded-md"
                          placeholder="Enter text..."
                          label="Voice Text"
                          tooltipContent="enter voice text"

                          // tooltipContent="Enter Value which you want to convert in (TTS) on select variable either convert the text dynamic"
                        />
                        <div className="absolute top-7 right-0 z-10">
                          <ObdVariable
                            variables={allHeaders}
                            selectVariable={handleVariableSelect}
                          />
                        </div>
                        <div className="text-gray-600 text-sm">
                          Chars: {ttsArea.length}/1000
                        </div>
                        <GenerateAiContent
                          ai={ai}
                          setAi={setAi}
                          setIsOpen={setIsOpen}
                          isOpen={isOpen}
                          right={5}
                          bottom={40}
                          setMessageContent={setTTSArea}
                          messageContent={ttsArea}
                          length={2500}
                        />
                      </div>
                    )}

                    {(obdType === "simplebroadcast" ||
                      obdType === "multibroadcast") && (
                      <div>
                        <div className="w-full mt-4">
                          <AnimatedDropdown
                            options={voiceListData?.map((data) => ({
                              value: data.srNo,
                              label: data.fileName,
                            }))}
                            value={slectedSBVoiceFile}
                            onChange={(value) => {
                              setSelectedSBVoiceFile(value);
                              handleSelectSBVoice(value);
                            }}
                            placeholder="Select Voice Clip 1"
                            id="voiceClipOne"
                            label="Voice Clip 1"
                            tooltipContent="First vocie clip"
                          />
                        </div>
                        {obdType === "multibroadcast" && (
                          <div className="w-full mt-4">
                            <AnimatedDropdown
                              options={voiceListData?.map((data) => ({
                                value: data.srNo,
                                label: data.fileName,
                              }))}
                              value={selectedMBFiletwo}
                              onChange={(value) => {
                                setSelectedMBFiletwo(value);
                                handleSelectMBVoice(value);
                              }}
                              placeholder="Select Voice Clip 2"
                              id="voiceClipTwo"
                              label="Voice Clip 2"
                              tooltipContent="Second vocie clip"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {(obdType === "simplebroadcast" ||
                      obdType === "multibroadcast") && (
                      <div>
                        <div className="mt-4">
                          {/* <WavesurferPlayer
                              height={50}
                              waveColor="pink"
                              progressColor="violet"
                              barGap={1}
                              url={voiceSBURLPath}
                              onReady={onReady}
                              onPlay={() => setIsPlaying(true)}
                              onPause={() => setIsPlaying(false)}
                            />

                            <div className="flex gap-3 mt-3">
                              <button
                                onClick={handlePlayPause}
                                className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
                              >
                                {isPlaying ? <FaPause /> : <FaPlay />}
                              </button>
                              <button
                                onClick={handleRestart}
                                className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
                              >
                                <IoStop />
                              </button>
                            </div> */}
                          <audio src={voiceSBURLPath} controls></audio>
                        </div>

                        {obdType === "multibroadcast" && (
                          <div className="mt-4">
                            {/* <WavesurferPlayer
                                height={50}
                                waveColor="pink"
                                progressColor="violet"
                                barGap={1}
                                url={voiceMBURLPath}
                                onReady={onReady}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                              />

                              <div className="flex gap-3 mt-3">
                                <button
                                  onClick={handlePlayPause}
                                  className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
                                >
                                  {isPlaying ? <FaPause /> : <FaPlay />}
                                </button>
                                <button
                                  onClick={handleRestart}
                                  className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
                                >
                                  <IoStop />
                                </button>
                              </div> */}
                            <audio src={voiceMBURLPath} controls></audio>
                          </div>
                        )}
                      </div>
                    )}

                    {obdType === "dynamicbroadcast" && (
                      <div className="flex flex-col gap-3">
                        <AnimatedDropdown
                          label="Dynamic Voice Clip:"
                          id="dynamicvoiceClip"
                          name="dynamicvoiceClip"
                          options={dynamicVoiceListData.map((data) => ({
                            value: data.srno,
                            label: data.fileName,
                          }))}
                          value={slectedDynamicVoiceFile}
                          onChange={(optionValue) => {
                            setSelectedDynamicVoiceFile(optionValue);
                            handleSelectDynamicVoice(optionValue);
                          }}
                          placeholder="Select Dynamic Voice Clip"
                        />

                        {slectedDynamicVoiceFile && (
                          <div className="border-2 p-2 rounded-md border-dashed border-gray-500 relative">
                            <div className="text-red-800 text-xs font-medium text-center">Please fill all the variable fields! (remaining sequence are the voice clips)</div>
                            {voiceVariables.map((item, index) => {
                              console.log("item", item);
                              return (
                                <div
                                  key={`variable-${item.sequence}`}
                                  className="relative mt-4"
                                >
                                  <InputField
                                    id={`variable-${item.sequence}`}
                                    name={`variable-${item.sequence}`}
                                    label={`Sequence Variable ${item.sequence}`}
                                    value={item.variableSampleValue}
                                    onChange={(e) =>
                                    handleVoiceVariableChange(
                                      index,
                                      e.target.value
                                    )}
                                    
                                    placeholder={`Enter value for variable ${item.sequence}`}
                                    tooltipContent={`Sequence: ${item.sequence}`}
                                  />

                                  {/* Ensure this appears for every input */}
                                  <div className="absolute top-7 right-0 z-10">
                                    <DynamicObdVariable
                                      variables={allHeaders}
                                      selectVariable={
                                        handleDynamicVariableSelect
                                      }
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col md:flex-row gap-2 pt-0 pb-3 px-3">
                    <AnimatedDropdown
                      options={[
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        { value: "3", label: "3" },
                        { value: "4", label: "4" },
                      ]}
                      value={retry}
                      onChange={(value) => setRetry(value)}
                      placeholder="Select Retry No."
                      id="retry"
                      label="Retry"
                      tooltipContent="Set the number of retry attempts for undelivered messages."
                    />

                    <AnimatedDropdown
                      options={[
                        { value: "1", label: "10s" },
                        { value: "2", label: "20s" },
                        { value: "3", label: "30s" },
                        { value: "4", label: "40s" },
                      ]}
                      value={interval}
                      onChange={(value) => setInterval(value)}
                      placeholder="Select Interval"
                      id="interval"
                      label="Interval"
                      tooltipContent="Select time interval"
                    />
                  </div>
                </div>

                <div className="lg:w-1/2 w-full rounded-xl bg-[#f9f9f9] p-4">
                  <RadioButtonLaunchCampaignObd
                    onOptionChange={handleOptionChange}
                    onFileUpload={handleFileHeadersUpdate}
                    onGroupChange={handleGroupChange}
                    groups={groups}
                    setGroups={setGroups}
                    selectedGroups={selectedGroups}
                    setSelectedGroups={setSelectedGroups}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    fileUpload={handleFileUpload}
                    resetImportContact={resetImportContact}
                    countryCode={handleCountryCheckBox}
                    onMobileDropdown={handleSelectMobilecolumn}
                  />
                </div>

                <div className="lg:w-1/4 w-full rounded-xl bg-[#f9f9f9] p-4">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center items-center p-2"
                  >
                    <div className="w-72 h-150 rounded-[2.5rem] bg-[#f9f9f9] border border-gray-300 shadow-2xl p-2.5 flex flex-col gap-2">
                      <div className="flex justify-between items-center px-4 py-0 text-gray-500 text-sm">
                        <span>9:41</span>
                        <div className="flex items-center gap-1">
                          <Signal size={16} />
                          <Wifi size={16} />
                          <BatteryFull size={16} />
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-gray-400 to-gray-400 text-white rounded-4xl px-4 py-4">
                        <div className="mb-4 border-2 rounded-full p-2 border-gray-500">
                          <User size={72} className="text-white/80" />
                        </div>
                        <h2 className="text-xl font-semibold">John Doe</h2>
                        <p className="text-sm text-gray-300 mt-1">
                          Incoming Call...
                        </p>

                        <div className="grid grid-cols-3 gap-4 mt-6">
                          <div className="flex flex-col items-center text-sm">
                            <Clock className="w-6 h-6 mb-1 text-white/70" />
                            <span>Remind</span>
                          </div>
                          <div className="flex flex-col items-center text-sm">
                            <MessageCircle className="w-6 h-6 mb-1 text-white/70" />
                            <span>Message</span>
                          </div>
                          <div className="flex flex-col items-center text-sm">
                            <BellOff className="w-6 h-6 mb-1 text-white/70" />
                            <span>Silent</span>
                          </div>
                          <div className="flex flex-col items-center text-sm opacity-0">
                            <span> </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center gap-12 mt-8">
                          <button className="bg-red-600 hover:bg-red-700 rounded-full p-4 shadow-md">
                            <PhoneOff className="text-white w-6 h-6 rotate-[135deg]" />
                          </button>
                          <button className="bg-green-500 hover:bg-green-600 rounded-full p-4 shadow-md">
                            <PhoneCall className="text-white w-6 h-6 -rotate-45" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center mt-5">
              <UniversalButton
                id="ReviewAndSendSubmitBtn"
                name="ReviewAndSendSubmitBtn"
                label="Review & Send"
                type="submit"
                style={{ borderRadius: "40px", letterSpacing: "1px" }}
                onClick={handleReviewAndSubmitBtn}
                variant="primary"
              />
            </div>
          </div>

          <Dialog
            visible={visibledialog}
            style={{ width: "40rem" }}
            onHide={() => {
              setVisibledialog(false);
            }}
            draggable={false}
          >
            <div className="space-y-5">
              <div className="p-3 bg-gray-100 text-md text-gray-800 rounded-md shadow-lg space-y-2 grid grid-cols-2">
                <span className="font-semibold font-m">OBD Type : </span>
                <p className="">
                  {selectedOptionCampaign === "transactional"
                    ? obdType || "N/A"
                    : selectedOptionCampaign === "promotional"
                    ? obdType || "N/A"
                    : "N/A"}
                </p>
                <span className="font-semibold font-m">Campaign Name : </span>
                <p className="">{campaignName || "N/A"}</p>

                <span className="font-semibold font-m">No. Of Retry : </span>
                <p className="">{retry || "N/A"}</p>
                <span className="font-semibold font-m">Total Mobile No. :</span>
                <p className="">{totalGroupNumbers || totalRecords}</p>
              </div>

              <div>
                <InputField
                  id="testingmobilenumber"
                  name="testingmobilenumber"
                  label="Testing Mobile"
                  value={mobilenums}
                  onChange={handleTestingInputChange}
                  placeholder="Testing Number"
                  tooltipContent="Enter Single mobile number for test"
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  inputId="scheduleCheckbox"
                  checked={schedule}
                  onChange={(e) => setSchedule(e.checked)}
                />
                <label htmlFor="scheduleCheckbox" className="text-md">
                  Schedule
                </label>

                {schedule && (
                  <Calendar
                    id="scheduleDateTime"
                    value={scheduledDateTime}
                    onChange={(e) => setScheduledDateTime(e.value)}
                    showTime
                    hourFormat="12"
                    minDate={new Date()}
                    dateFormat="dd/mm/yy"
                  />
                )}
              </div>

              {/* <div className="flex gap-2">
                <Checkbox
                  inputId="scheduleCheckbox"
                  checked={termsconditions}
                  onChange={(e) => setTermsConditions(e.checked)}
                />

                <label htmlFor="scheduleCheckbox" className="text-md">
                  I agree to terms and conditions*
                </label>
              </div> */}

              <div className="flex items-center justify-center">
                {/*final Submit Button */}
                <UniversalButton
                  label="Send"
                  onClick={(e) => handleFinalSubmit(e)}
                  style={{
                    borderRadius: "40px",
                    letterSpacing: "1px",
                  }}
                  variant="primary"
                />
              </div>
            </div>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default ObdCreateCampaign;
