import React, { useEffect } from "react";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import { HandleCampaignDetails } from "./components/CampaignInputDetails";
import { RadioButtonLaunchCampaign } from "./components/RadioButtonLaunchCampaign";
import { Preview } from "./components/Preview";
import { useState } from "react";
import {
  fetchAllAgents,
  fetchAllTemplates,
  fetchTemplateDetails,
  launchCampaign,
} from "@/apis/rcs/rcs";
import toast from "react-hot-toast";
import { getAllGroups, getCountryList } from "@/apis/common/common";
import { VariableManager } from "./components/VariableManager";
import UniversalButton from "@/components/common/UniversalButton";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "@mui/material";
import moment from "moment";
import CustomTooltip from "@/components/common/CustomTooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";

const SendRcs = () => {
  const [allAgents, setAllAgents] = useState([]);
  const [allTemplates, setAllTemplates] = useState([]);
  const [campaignDetails, setCampaignDetails] = useState({
    agent: "",
    campaignName: "",
    templateSrno: "",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  //radio button
  const [selectedOption, setSelectedOption] = useState("group");
  const [allGroups, setAllGroups] = useState([]);
  const [selectedGrp, setselectedGrp] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [contactData, setContactData] = useState({});
  const [countryList, setCountryList] = useState([]);

  //variable
  const [varLength, setVarLength] = useState(0);
  const [varList, setVarList] = useState([]);
  const [inputVariables, setInputVariables] = useState([]);

  //btnVar
  const [btnvarLength, setBtnVarLength] = useState(0);
  const [btnvarList, setBtnVarList] = useState([]);
  const [btninputVariables, setBtnInputVariables] = useState([]);
  //preview
  const [templateDetails, setTemplateDetails] = useState([]);

  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [totalAudience, setTotalAudience] = useState(0);
  const [scheduleData, setScheduleData] = useState({
    isSchedule: false,
    time: new Date(),
  });
  const [carVar, setCarVar] = useState({
    length: 0,
    data: {},
  });
  const [carVarInput, setCarVarInput] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [finalVarList, setFinalVarList] = useState([]);

  function extractVariable(data) {
    if (!data || !Array.isArray(data)) return;

    if (data.length === 1) {
      let matchLength = 0;
      let matchBtnList = [];
      const content = data[0]?.content || "";
      console.log("data", data[0].suggestions)
      const suggestionVar = data[0]?.suggestions?.map((item) => {
        if (item?.type === "website") {
          const match = item?.suggestionValue.match(/{#(.+?)#}/g) || [];
          // setBtnVarLength(match.length);
          // setBtnVarList(match);
          matchLength += match.length;
          matchBtnList = [...matchBtnList, ...match];
        }
      });

      setBtnVarLength(matchLength);
      setBtnVarList(matchBtnList);
      console.log("suggestionvar", suggestionVar)
      const matches = content.match(/{#(.+?)#}/g) || [];

      setVarLength(matches.length);
      setVarList(matches);
    }

    if (data.length > 1) {
      const result = data.reduce(
        (acc, item, index) => {
          const content = item?.content || "";
          const matches = content.match(/{#(.+?)#}/g) || [];

          acc.totalLength += matches.length;
          acc.data[index] = matches;

          return acc;
        },
        { totalLength: 0, data: {} }
      );

      setCarVar({ length: result.totalLength, data: result.data });
    }
  }

  useEffect(() => {
    setScheduleData((prev) => ({
      ...prev,
      time: new Date(),
    }));
  }, [confirmDialogVisible]);

  useEffect(() => {
    async function handleFetchAllAgents() {
      try {
        const res = await fetchAllAgents();
        setAllAgents(res);
      } catch (e) {
        toast.error("Something went wrong.");
      }
    }

    async function fetchAllGrps() {
      try {
        const res = await getAllGroups();
        setAllGroups(res);
      } catch (e) {
        toast.error("Something went wrong.");
      }
    }

    async function handlefetchAllCountry() {
      try {
        const res = await getCountryList();
        setCountryList(res);
      } catch (e) {
        toast.error("Something went wrong.");
      }
    }

    handleFetchAllAgents();
    handlefetchAllCountry();
    fetchAllGrps();
  }, []);

  useEffect(() => {
    async function handleFetchAllTemplates() {
      try {
        // const res = await fetchAllTemplates(campaignDetails?.agent, 1);
        const res = await fetchAllTemplates(campaignDetails?.agent, 1, "approved");
        setAllTemplates(res?.Data);
      } catch (e) {
        toast.error("Something went wrong.");
      }
    }
    async function handleFetchTemplateDetails() {
      if (!campaignDetails?.templateSrno) return;
      try {
        const res = await fetchTemplateDetails(campaignDetails?.templateSrno);
        extractVariable(res);
        setTemplateDetails(res);
      } catch (e) {
        toast.error("Something went wrong.");
      }
    }

    handleFetchAllTemplates();
    handleFetchTemplateDetails();
  }, [campaignDetails]);

  function handleReview() {
    let isError = false;

    if (!campaignDetails.agent) {
      return toast.error("Please select an agent.");
    }
    if (!campaignDetails.campaignName) {
      return toast.error("Please enter a campaign name.");
    }
    if (!campaignDetails.templateSrno) {
      return toast.error("Please select a template.");
    }
    if (selectedOption === "group" && !selectedGrp) {
      return toast.error("Please select a group.");
    }

    if (selectedOption === "group") {
      let totalGrpCount = 0;
      selectedGrp?.map((grp) => {
        const length = allGroups.find(
          (group) => group.groupCode === grp
        ).totalCount;
        totalGrpCount += Number(length);
      });
      if (totalGrpCount === 0) {
        return toast.error("Selected group has no contacts.");
      }
      setTotalAudience(totalGrpCount);
    } else {
      setTotalAudience(contactData?.totalRecords);
    }

    if (selectedOption === "contact" && !uploadFile) {
      return toast.error("Please upload a file.");
    }

    if (
      selectedOption === "contact" &&
      contactData.addcountryCode &&
      !contactData.selectedCountryCode
    ) {
      return toast.error("Please choose a country code.");
    }
    if (selectedOption === "contact" && !contactData.selectedMobileColumn) {
      return toast.error("Please choose a mobile number field.");
    }

    const validKeys = Object.keys(inputVariables).filter(
      (key) => inputVariables[key] !== "" && inputVariables[key] !== undefined
    );
    const validBtnKeys = Object.keys(btninputVariables).filter(
      (key) =>
        btninputVariables[key] !== "" && btninputVariables[key] !== undefined
    );

    if (varLength !== validKeys?.length) {
      return toast.error("Please enter all variables.");
    }

    if (btnvarLength !== validBtnKeys?.length) {
      return toast.error("Please enter all Button variables.");
    }

    // const finalVarList = [];
    const finalVarList = varList?.map((item, index) => {
      return `${item}:${inputVariables[index]}`;
    });
    const BtnfinalVarList = btnvarList?.map((item, index) => {
      return `${item}:${btninputVariables[index]}`;
    });

    setFinalVarList([...finalVarList, ...BtnfinalVarList]);
    if (isError) return;

    setConfirmDialogVisible(true);
  }

  async function handleFinalSend() {
    const type = allTemplates?.find(
      (template) => template.srno === campaignDetails.templateSrno
    )?.templateType;

    const allVar = [];
    Object.keys(inputVariables).map((key) => {
      allVar.push(inputVariables[key]);
    });
    Object.keys(btninputVariables).map((key) => {
      allVar.push(btninputVariables[key]);
    });

    // Clean up curly braces in allVar → {#name#} → #name#
    for (let i = 0; i < allVar.length; i++) {
      if (typeof allVar[i] === "string") {
        allVar[i] = allVar[i].replace(/{#(.*?)#}/g, "#$1#");
      }
    }

    let variables = [];
    const content = varList?.map((v) => v.match(/{#(.+?)#}/)?.[1]);
    const btn = btnvarList?.map((v) => v.match(/{#(.+?)#}/)?.[1]);

    // variables = [...content, ...btn];
    variables = [...content, ...btn].filter(Boolean); // remove undefined

    // let grp = "";
    // if (selectedGrp) {
    //   grp = selectedGrp.join(",");
    // }

    let data = {
      agent: campaignDetails?.agent,
      campaignName: campaignDetails?.campaignName,
      templateSrno: campaignDetails?.templateSrno,
      variables: variables,
      variableList: allVar,
      totalCount:
        selectedOption === "group" ? totalAudience : contactData?.totalRecords,
      templateType: type,
      mobileNumberIndex: contactData.selectedMobileColumn || "-1",
      isGroup: selectedOption === "group" ? true : false,
      countryCode: contactData?.addcountryCode
        ? contactData?.selectedCountryCode
        : "0",
      groupSrNoList: selectedOption === "group" ? selectedGrp : [],
      isSchedule: scheduleData?.isSchedule ? "1" : "0",
      scheduleTime: scheduleData?.isSchedule
        ? moment(scheduleData?.time).format("YYYY-MM-DD HH:mm:ss")
        : "",
      filePath: contactData?.filePath || "",
    };
    if (scheduleData?.isSchedule && !scheduleData?.time) {
      return toast.error("Please select a time.");
    }
    if (scheduleData?.isSchedule && scheduleData?.time < new Date()) {
      return toast.error("Please select a valid time.");
    }

    // if (scheduleData?.isSchedule) {
    //   data = {
    //     ...data,
    //     isSchedule: "1",
    //     scheduleTime: moment(scheduleData?.time).format("YYYY-MM-DD HH:mm:ss"),
    //   };
    // }

    // if (contactData?.addcountryCode) {
    //   data = {
    //     ...data,
    //     countryCode: contactData?.selectedCountryCode,
    //   };
    // }
    try {
      const res = await launchCampaign(data);
      if (res?.status === "success") {
        toast.success(res?.message);
        // setAllAgents([])
        setAllTemplates([]);
        setCampaignDetails({ agent: "", campaignName: "", templateSrno: "" });
        setSelectedIndex(0);
        setSelectedOption("group");
        // setAllGroups([]);
        setselectedGrp("");
        setUploadFile(null);
        setContactData({});
        setCountryList([]);
        setVarLength(0);
        setVarList([]);
        setInputVariables([]);
        setConfirmDialogVisible(false);
        setTotalAudience(0);
        setScheduleData({
          isSchedule: false,
          time: "",
        });
        setFinalVarList([]);
        setCarVar([]);
        setTemplateDetails({});
      }
    } catch (e) {
      toast.error("Something went wrong.");
      return;
    }
  }

  useEffect(() => {
    if (selectedOption === "group") {
      setHeaders(["first_name", "last_name"])
    } else {
      setHeaders(contactData?.fileHeaders || []);
    }
  }, [selectedOption, contactData]);

  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 mt-5">
        <div className=" p-3 bg-gray-100 rounded-lg shadow-md lg:flex-1">
          <HandleCampaignDetails
            setCampaignDetails={setCampaignDetails}
            campaignDetails={campaignDetails}
            allAgents={allAgents}
            allTemplates={allTemplates}
            setTemplateDetails={setTemplateDetails}
            setVarList={setVarList}
            setInputVariables={setInputVariables}
            setVarLength={setVarLength}
            setCarVar={setCarVar}
          />
          <VariableManager
            templateDetails={templateDetails}
            varLength={varLength}
            setVarList={setVarList}
            varList={varList}
            setInputVariables={setInputVariables}
            inputVariables={inputVariables}
            carVar={carVar}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            carVarInput={carVarInput}
            setCarVarInput={setCarVarInput}
            headers={headers}
            setHeaders={setHeaders}
            selectedOption={selectedOption}
            btnvarLength={btnvarLength}
            setBtnVarList={setBtnVarList}
            btnvarList={btnvarList}
            setBtnInputVariables={setBtnInputVariables}
            btninputVariables={btninputVariables}
          />
        </div>
        <div>
          <RadioButtonLaunchCampaign
            allGroups={allGroups}
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
            selectedGrp={selectedGrp}
            setselectedGrp={setselectedGrp}
            setUploadedFile={setUploadFile}
            uploadedFile={uploadFile}
            setContactData={setContactData}
            contactData={contactData}
            countryList={countryList}
            setHeaders={setHeaders}
          />
        </div>
        <div className=" p-3 bg-gray-100 rounded-lg shadow-md lg:flex-1">
          <Preview
            templateDetails={templateDetails}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            inputVariables={inputVariables}
          />
        </div>
      </div>

      <div className="flex justify-center items-center mt-5">
        <UniversalButton
          label={"Review"}
          onClick={handleReview}
          style={{ width: "200px" }}
        />
      </div>

      <Dialog
        header="Confirm Details"
        visible={confirmDialogVisible}
        style={{ width: "30rem" }}
        onHide={() => {
          setConfirmDialogVisible(false);
        }}
        draggable={false}
      >
        <div className="space-y-5">
          <div className="grid grid-cols-2 p-3 space-y-2 text-gray-800 bg-gray-100 rounded-md shadow-lg text-md">
            {/* <div className="flex  gap-2 items-center justify-center"> */}
            <span className="font-semibold font-m">Rcs Bot : </span>
            <p className="">
              {allAgents?.find(
                (agents) => agents.agent_id === campaignDetails.agent
              )?.agent_name || "N/A"}
            </p>
            {/* </div> */}
            {/* <div> */}
            <span className="font-semibold font-m">Template Name : </span>
            <p className="">
              {allTemplates?.find(
                (template) => template.srno === campaignDetails.templateSrno
              )?.templateName || "N/A"}
            </p>
            {/* </div> */}
            {/* <div> */}
            <span className="font-semibold font-m">Template Type : </span>
            <p className="">
              {" "}
              {allTemplates?.find(
                (template) => template.srno === campaignDetails.templateSrno
              )?.templateType || "N/A"}
            </p>
            {/* </div> */}

            {/* <div> */}
            <span className="font-semibold font-m">Campaign Name : </span>
            <p className="w-full break-words">
              {campaignDetails.campaignName || "N/A"}
            </p>
            {/* </div> */}
            {/* <div> */}
            <span className="font-semibold font-m">Total Audience : </span>
            <p className="">{totalAudience || "N/A"}</p>
            {/* </div> */}
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              inputid="scheduleCheckbox"
              checked={scheduleData.isSchedule}
              onChange={(e) => {
                setScheduleData((prev) => ({
                  ...prev,
                  isSchedule: e.target.checked,
                }));
              }}
            />
            <label htmlFor="scheduleCheckbox" className="text-md">
              Schedule
            </label>
            <CustomTooltip
              title={
                "Schedule this campaign to be sent at a later date and time."
              }
              placement={"top"}
              arrow
            >
              <span>
                <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
              </span>
            </CustomTooltip>
            {scheduleData.isSchedule && (
              <Calendar
                id="scheduleDateTime"
                value={scheduleData.time}
                onChange={(e) => {
                  setScheduleData((prev) => ({
                    ...prev,
                    time: e.target.value,
                  }));
                }}
                showTime
                hourFormat="12"
                minDate={new Date()}
                dateFormat="dd/mm/yy"
              />
            )}
          </div>

          <div className="flex items-center justify-center">
            <UniversalButton
              label="Send Campaign"
              onClick={handleFinalSend}
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
  );
};

export default SendRcs;
