import React, { useEffect } from "react";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import { HandleCampaignDetails } from "./components/CampaignInputDetails";
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
import { getSpeicificNotification, saveNotification } from "@/apis/admin/admin";

export const RCS = ({ state, allVar }) => {
  const [allAgents, setAllAgents] = useState([]);
  const [allTemplates, setAllTemplates] = useState([]);
  const [campaignDetails, setCampaignDetails] = useState({
    agent: "",
    campaignName: "",
    templateSrno: "",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  const [carVar, setCarVar] = useState({
    length: 0,
    data: {},
  });
  const [carVarInput, setCarVarInput] = useState([]);

  function extractVariable(data) {
    if (!data || !Array.isArray(data)) return;

    if (data.length === 1) {
      let matchLength = 0;
      let matchBtnList = [];
      const content = data[0]?.content || "";
      console.log("data", data[0].suggestions);
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
      console.log("suggestionvar", suggestionVar);
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
    async function handleFetchAllAgents() {
      try {
        const res = await fetchAllAgents();
        setAllAgents(res);
      } catch (e) {
        toast.error("Something went wrong.");
      }
    }

    handleFetchAllAgents();
  }, []);

  useEffect(() => {
    async function handleFetchAllTemplates() {
      try {
        // const res = await fetchAllTemplates(campaignDetails?.agent, 1);
        const res = await fetchAllTemplates(
          campaignDetails?.agent,
          1,
          "approved"
        );
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

  async function handleSave() {
    let isError = false;

    if (!campaignDetails.agent) {
      return toast.error("Please select an agent.");
    }

    if (!campaignDetails.templateSrno) {
      return toast.error("Please select a template.");
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
    if (isError) return;

    for (let i = 0; i < allVar.length; i++) {
      if (typeof allVar[i] === "string") {
        allVar[i] = allVar[i].replace(/{#(.*?)#}/g, "#$1#");
      }
    }
    const content = varList?.map((v) => v.match(/{#(.+?)#}/)?.[1]);
    const btn = btnvarList?.map((v) => v.match(/{#(.+?)#}/)?.[1]);

    const variables = [...content, ...btn].filter(Boolean);

    const payload = {
      agent: campaignDetails?.agent,
      templateId: campaignDetails?.templateSrno,
      variableList: allVar,
      variables: variables,
      reminderSrno: "23",
      rcsReminderSrno: "0",
      notificationStatus: "on",
    };
    try {
      const res = await saveNotification("rcs", payload);
      if (!res?.success) {
        return toast.error(res?.message);
      }
      toast.success(res?.message);
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong!");
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const payload = {
          srno: state,
          type: "rcs",
        };
        const res = await getSpeicificNotification(payload);
        console.log(res);
        if (!res?.success) {
          return;
        }
        console.log("res", res);
        const agentId = res?.data[0]?.agentId;
        setCampaignDetails((prev) => ({
          ...prev,
          agent: agentId,
          templateSrno: res?.data[0]?.templateId,
        }));
      } catch (e) {
        console.log(e);
        toast.error("Something Went Wrong!");
      }
    }
    fetchData();
  }, [state, allAgents]);
  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 mt-5">
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
            btnvarLength={btnvarLength}
            setBtnVarList={setBtnVarList}
            btnvarList={btnvarList}
            setBtnInputVariables={setBtnInputVariables}
            btninputVariables={btninputVariables}
            allVar={allVar}
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
          label={"Save"}
          onClick={handleSave}
          style={{ width: "200px" }}
        />
      </div>
    </>
  );
};
