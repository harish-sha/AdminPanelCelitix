import React, { useEffect, useRef, useState } from "react";

import {
  fetchTemplates,
  fetchTemplatesValue,
  getWabaList,
  getWabaTemplateDetails,
} from "@/apis/whatsapp/whatsapp";
import toast from "react-hot-toast";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import { Variables } from "./variable";
import { Preview } from "./preview";
export const Whatsapp = ({
  id,
  nodesInputData,
  setNodesInputData,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
}) => {
  const [wabaState, setWabaState] = useState({
    waba: [],
    selected: "",
  });
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [allTemplates, setAllTemplates] = useState([]);
  const [specificTemplate, setSpecificTemplate] = useState({});
  const [variablesData, setVariablesData] = useState({
    length: 0,
    data: [],
    input: [],
    btn: [],
    btnInput: [],
  });

  const [fileData, setFileData] = useState({
    url: "",
    file: "",
  });
  const [basicDetails, setBasicDetails] = useState({
    filePath: "",
    mediaPath: "",
  });

  const fileRef = useRef(null);

  function extractVariablesFromText(text) {
    const regex = /{{(\d+)}}/g;
    let match;
    const variables = [];
    while ((match = regex.exec(text)) !== null) {
      if (!variables.includes(match[1])) {
        variables.push(match[1]);
      }
    }
    return variables;
  }

  useEffect(() => {
    async function handleFetchWaba() {
      try {
        const res = await getWabaList();
        setWabaState((prev) => ({
          waba: res,
          selected: "",
        }));
      } catch (e) {
        return toast.error("Error fetching Waba Details");
      }
    }

    handleFetchWaba();
  }, []);

  async function handleFetchAllTemplates() {
    if (!wabaState.selected) return;
    try {
      const res = await getWabaTemplateDetails(wabaState.selected);
      const approvedTemplates = res.filter(
        (item) => item.status === "APPROVED"
      );
      setAllTemplates(approvedTemplates);
    } catch (e) {
      return toast.error("Error fetching all templates");
    }
  }

  useEffect(() => {
    handleFetchAllTemplates();
  }, [wabaState.selected]);

  useEffect(() => {
    if (!selectedTemplate) return;
    async function handleFetchTemplateValues() {
      try {
        const res = await fetchTemplatesValue(selectedTemplate);
        const variable = extractVariablesFromText(res?.message);
        const btnVar = extractVariablesFromText(res?.url);
        setVariablesData({
          length: variable.length,
          data: variable,
          input: [],
          btn: btnVar,
          btnInput: [],
        });

        setSpecificTemplate(res);
      } catch (e) {
        return toast.error("Error fetching template values");
      }
    }

    handleFetchTemplateValues();
  }, [selectedTemplate]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="w-full">
        <div className="w-full flex gap-2">
          <DropdownWithSearch
            id="waba"
            name="waba"
            label="Select WABA"
            tooltipContent="Select your whatsapp business account"
            tooltipPlacement="right"
            options={wabaState?.waba?.map((waba) => ({
              value: waba.mobileNo,
              label: waba.name,
            }))}
            value={wabaState.selected}
            onChange={(e) => {
              setWabaState((prev) => ({
                ...prev,
                selected: e,
              }));
              // setCardDetails({});
            }}
            disabled={false}
          />
          <DropdownWithSearch
            id="templateMessage"
            name="templateMessage"
            label="Select Template"
            options={allTemplates?.map((template) => ({
              value: template.templateSrno,
              label: template.templateName,
            }))}
            value={selectedTemplate}
            onChange={(e) => {
              setSelectedTemplate(e);
              setFileData({ url: "", file: "" });
              fileRef ? (fileRef.current.value = "") : null;
              setVariablesData({
                length: 0,
                data: [],
                input: [],
                btn: [],
                btnInput: [],
              });
            }}
            disabled={false}
          />
        </div>
        {specificTemplate &&
          (variablesData?.btn?.length > 0 ||
            variablesData?.data?.length > 0) && (
            <Variables
              variablesData={variablesData}
              setVariablesData={setVariablesData}
              specificTemplate={specificTemplate}
              fileRef={fileRef}
              setBasicDetails={setBasicDetails}
              fileData={fileData}
              setFileData={setFileData}
            />
          )}
      </div>
      <div className="w-full">
        <Preview
          specificTemplate={specificTemplate}
          variablesData={variablesData}
          basicDetails={basicDetails}
        />
      </div>
    </div>
  );
};
