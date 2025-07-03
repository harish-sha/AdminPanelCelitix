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
import UniversalButton from "@/components/common/UniversalButton";

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
  const [selectedTemplate, setSelectedTemplate] = useState<number>();
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

        //to persist data after agent fetching
        const data = nodesInputData[id];
        setCampaignDetails({
          agent: data?.rcs_agent,
          campaignName: "",
        });
        setSelectedTemplate(Number(data?.rcs_template));

        setInputVariables(data?.variables || {});
        setBtnInputVariables(data?.variables || {});
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

  function handleSave() {
    if (!campaignDetails.agent) return toast.error("Please Select an Agent");
    if (!selectedTemplate) return toast.error("Please Select template");
    const templateType = allTemplates.find(
      (item) => item.srno === selectedTemplate
    )?.templateType;

    let isError = false;

    let inputVar = [];
    let btnVar = [];

    Object.keys(inputVariables).map((key) => {
      inputVar.push(inputVariables[key]);
    });

    if (varList.length !== inputVar.length) {
      return toast.error("Please fill all the variables");
      // isError = true;
    }

    Object.keys(btninputVariables).map((key) => {
      btnVar.push(btninputVariables[key]);
    });

    if (btnvarList.length !== btnVar.length) {
      return toast.error("Please fill all the button variables");
      // isError = true;
    }

    let allVar = [...inputVar, ...btnVar];
    let variables = [];

    const content = varList?.map((v) => v.match(/{#(.+?)#}/)?.[1]);
    const btn = btnvarList?.map((v) => v.match(/{#(.+?)#}/)?.[1]);

    variables = [...content, ...btn];

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        rcs_agent: campaignDetails?.agent,
        rcs_template: String(selectedTemplate),
        variables: allVar,
        category: templateType,
      },
    }));

    allVar = [];

    setDetailsDialogVisible(false);
  }

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

          <div>
            <UniversalButton
              id="save-button"
              name="save-button"
              label="Save"
              type="submit"
              onClick={handleSave}
              style={{}}
            />
          </div>
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
