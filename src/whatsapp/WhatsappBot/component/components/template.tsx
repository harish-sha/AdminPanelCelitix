import React, { useEffect, useRef, useState } from "react";

import {
  fetchCurlData,
  fetchTemplates,
  fetchTemplatesValue,
  getWabaList,
  getWabaTemplateDetails,
} from "@/apis/whatsapp/whatsapp";
import toast from "react-hot-toast";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
// import { Variables } from "./variable";
// import { Preview } from "./preview";
import UniversalButton from "@/components/common/UniversalButton";
import { Variables } from "./temp-component/variable";
import { Preview } from "./temp-component/preview";
import InputField from "@/components/layout/InputField";
export const TemplateNode = ({
  id,
  nodesInputData,
  setNodesInputData,
  details,
  setIsVisible,
  allVariables,
}: {
  id: number;
  nodesInputData: any;
  details: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
  setIsVisible: React.Dispatch<React.SetStateAction<{}>>;
  allVariables: any[];
}) => {
  // const [wabaState, setWabaState] = useState({
  //   waba: [],
  //   selected: "",
  // });
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateType, setTemplateType] = useState("");
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
  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
    name: "",
    address: "",
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

  // async function handleFetchWaba() {
  //   try {
  //     const data = nodesInputData[id];

  //     const res = await getWabaList();
  //     const wabaMbNo = res.find(
  //       (item) => item.wabaSrno == data?.wabanumber
  //     )?.mobileNo;

  //     const selectedMobile = wabaMbNo || "";
  //     setWabaState({
  //       waba: res,
  //       selected: selectedMobile,
  //     });

  //     setVariablesData((prev) => ({
  //       ...prev,
  //       input: data?.variables,
  //       btnInput: data?.urlValues ? [data?.urlValues] : [],
  //     }));
  //   } catch (e) {
  //     return toast.error("Error fetching Waba Details");
  //   }
  // }

  // useEffect(() => {
  //   handleFetchWaba();
  // }, []);

  async function handleFetchAllTemplates() {
    const data = nodesInputData[id];
    if (!details.selected) return;
    try {
      const res = await getWabaTemplateDetails(details.selected);
      const approvedTemplates = res.filter(
        (item) => item.status === "APPROVED" && item.type !== "carousel"
      );

      setAllTemplates(approvedTemplates);
      setSelectedTemplate(Number(data?.whatsappTemplate));
    } catch (e) {
      return toast.error("Error fetching all templates");
    }
  }

  useEffect(() => {
    handleFetchAllTemplates();
  }, []);

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

  async function handleSave() {
    try {
      if (!selectedTemplate) return toast.error("Select template");
      const template = allTemplates.find(
        (item) => item.templateSrno === selectedTemplate
      );

      if (template?.type === "image" && !basicDetails.mediaPath)
        return toast.error("Please upload image");
      if (template?.type === "video" && !basicDetails.mediaPath)
        return toast.error("Please upload video");
      if (template?.type === "document" && !basicDetails.mediaPath)
        return toast.error("Please upload document");

      const variables = variablesData.input.filter((item) => item !== "");
      const btnVar = variablesData.btnInput.filter((item) => item !== "");

      if (
        variablesData.data.length > 0 &&
        variables.length !== variablesData.data.length
      ) {
        return toast.error("Please enter Variable Value");
      }

      if (
        variablesData.btn.length > 0 &&
        btnVar.length !== variablesData.btn.length
      ) {
        return toast.error("Please enter URL Variable Value");
      }

      const curlData = await fetchCurlData({
        tempName: template?.templateName,
        waba: details?.selected,
      });
      console.log("curlData", curlData);

      const botData = {
        ...curlData,
        to: "{{mobileno}}",
        messaging_product: "whatsapp",
      };

      const variableInsert = [];
      // curlData.template.components.forEach((format) => {
      //   if (format.type === "BODY") {
      //     format?.parameters?.map((item, index) => {
      //       variableInsert.push({
      //         ...item,
      //         text: `{{${variables[index]}}}`,
      //       });
      //     });
      //   }
      // });

      botData.template.components = botData.template.components.map(
        (component, index) => {
          if (component.type === "BODY") {
            return {
              ...component,
              parameters: [
                {
                  text: `{{${variables[index]}}}`,
                  type: "text",
                },
              ],
            };
          }
          if (template.type === "image") {
            return {
              type: "HEADER",
              parameters: [
                {
                  type: "image",
                  image: {
                    link: basicDetails.mediaPath,
                  },
                },
              ],
            };
          }
          // if (template.type === "video") {
          //   return {
          //     type: "HEADER",
          //     parameters: [
          //       {
          //         type: "video",
          //         video: {
          //           link: basicDetails.mediaPath,
          //         },
          //       },
          //     ],
          //   };
          // }
          // if (template.type === "document") {
          //   return {
          //     type: "HEADER",
          //     parameters: [
          //       {
          //         type: "document",
          //         document: {
          //           link: basicDetails.mediaPath,
          //         },
          //       },
          //     ],
          //   };
          // }
          return component;
        }
      );

      // console.log("botData", botData);

      // return;

      // TODO: add variable dropdown values

      setNodesInputData((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          templateSrno: selectedTemplate,
          json: JSON.stringify(botData),
        },
      }));

      setIsVisible(false);
    } catch (e) {
      console.log(e);
      return toast.error("Error saving template data");
    }
  }

  return (
    <div className="w-full flex flex-col h-[calc(80vh-100px)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        <div className="w-full">
          <div className="w-full">
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
                const type = allTemplates.find(
                  (item) => item.templateSrno === e
                )?.type;
                setTemplateType(type || "");
                fileRef && fileRef.current && (fileRef.current.value = "");
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
          {specificTemplate && (
            <Variables
              variablesData={variablesData}
              setVariablesData={setVariablesData}
              specificTemplate={specificTemplate}
              fileRef={fileRef}
              setBasicDetails={setBasicDetails}
              fileData={fileData}
              setFileData={setFileData}
              allVariables={allVariables}
            />
          )}
          {templateType === "location" && (
            <div className="w-full mt-4 p-2">
              <h1 className="mb-2 text-lg font-semibold text-gray-700">
                Location Details
                <span className="text-red-500">*</span>
              </h1>
              <div className="space-y-2 bg-gray-50 rounded-b-xl">
                <div className="flex items-center gap-2">
                  <InputField
                    maxLength={100}
                    id="latitude"
                    name="latitude"
                    label={"Latitude"}
                    onChange={(e) => {
                      setLocationData((prev) => ({
                        ...prev,
                        latitude: e.target.value,
                      }));
                    }}
                    value={locationData.latitude}
                    placeholder="Enter Latitude value"
                  />
                  <InputField
                    maxLength={100}
                    id="longitude"
                    name="longitude"
                    label={"Longitude"}
                    onChange={(e) => {
                      setLocationData((prev) => ({
                        ...prev,
                        longitude: e.target.value,
                      }));
                    }}
                    value={locationData.longitude}
                    placeholder="Enter longitude value"
                  />
                </div>
                <InputField
                  maxLength={20}
                  id="name"
                  name="name"
                  label={"name"}
                  onChange={(e) => {
                    setLocationData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }));
                  }}
                  value={locationData.name}
                  placeholder="Enter A name for the location"
                />
                <InputField
                  maxLength={100}
                  id="address"
                  name="address"
                  label={"address"}
                  onChange={(e) => {
                    setLocationData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }));
                  }}
                  value={locationData.address}
                  placeholder="Enter address"
                />
              </div>
            </div>
          )}

          <div className="mt-4">
            <UniversalButton
              id="whatsapp-send-message"
              name="whatsapp-send-message"
              type="submit"
              label="Save Template"
              onClick={handleSave}
              style={{}}
            />
          </div>
        </div>
        <div className="w-full">
          <Preview
            specificTemplate={specificTemplate}
            variablesData={variablesData}
            basicDetails={basicDetails}
          />
        </div>
      </div>
      {/* <div className="mt-4">
        <UniversalButton
          id="whatsapp-send-message"
          name="whatsapp-send-message"
          type="submit"
          label="Save Template"
          onClick={handleSave}
          style={{}}
        />
      </div> */}
    </div>
  );
};
