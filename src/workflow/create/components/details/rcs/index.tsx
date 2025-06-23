import {
  fetchAllAgents,
  fetchAllTemplates,
  fetchTemplateDetails,
} from "@/apis/rcs/rcs";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HandleCampaignDetails } from "./handleCampaignDetails";
import { VariableManager } from "./variableManager";
import { Preview } from "./preview";

export const RCS = ({
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
  //basic Details
  const [allAgents, setAllAgents] = useState([]);
  const [allTemplates, setAllTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [campaignDetails, setCampaignDetails] = useState({
    agent: "",
    campaignName: "",
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
  const [headers, setHeaders] = useState([]);
  const [finalVarList, setFinalVarList] = useState([]);

  function extractVariable(data) {
    if (!data || !Array.isArray(data)) return;

    if (data.length === 1) {
      const content = data[0]?.content || "";
      const suggestionVar = data[0]?.suggestions?.map((item) => {
        if (item?.type === "website") {
          const match = item?.suggestionValue.match(/{#(.+?)#}/g) || [];
          setBtnVarLength(match.length);
          setBtnVarList(match);
        }
      });
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
        const res = await fetchAllTemplates(campaignDetails?.agent, "1");
        setAllTemplates(res?.Data);
      } catch (e) {
        toast.error("Something went wrong.");
      }
    }

    handleFetchAllTemplates();
  }, [campaignDetails]);

  useEffect(() => {
    async function handleFetchTemplateDetails() {
      if (!selectedTemplate) return;
      try {
        const res = await fetchTemplateDetails(selectedTemplate);
        extractVariable(res);
        setTemplateDetails(res);
      } catch (e) {
        toast.error("Something went wrong.");
      }
    }
    handleFetchTemplateDetails();
  }, [selectedTemplate]);

  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 mt-5 w-full">
        <div className=" p-3 bg-gray-100 rounded-lg shadow-md lg:flex-1 w-full">
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
            setSelectedTemplate={setSelectedTemplate}
            selectedTemplate={selectedTemplate}
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
            // setHeaders={setHeaders}

            btnvarLength={btnvarLength}
            setBtnVarList={setBtnVarList}
            btnvarList={btnvarList}
            setBtnInputVariables={setBtnInputVariables}
            btninputVariables={btninputVariables}
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
    </>
  );
};
