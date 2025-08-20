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
    url: "",
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

  async function handleFetchAllTemplates() {
    const data = JSON.parse(nodesInputData[id]?.json || "{}");
    if (!details.selected) return;
    try {
      const res = await getWabaTemplateDetails(details.selected);
      const approvedTemplates = res.filter(
        (item) => item.status === "APPROVED" && item.type !== "carousel"
      );

      setAllTemplates(approvedTemplates);

      let tempId = null;
      if (data?.template?.name) {
        tempId = approvedTemplates.find(
          (item) => item.templateName === data?.template?.name
        )?.templateSrno;
      }

      const body = data?.template?.components?.find(
        (item) => item.type === "BODY"
      );
      const btn = data?.template?.components?.find(
        (item) => item.type === "button"
      );
      const regex = /{{(\d+)}}/g;
      const index = [];
      const variable = body?.parameters.map((item, i) => {
        const match = regex.exec(item?.text);
        index.push(i);
        return match ? match[1] : null;
      });

      const btnVar = btn?.parameters.map((item, i) => {
        const match = regex.exec(item?.text);
        return match ? match[1] : null;
      });

      setVariablesData({
        length: variable?.length || 0,
        data: index,
        input: variable,
        btn: btnVar,
        btnInput: btnVar,
      });

      setSelectedTemplate(tempId);
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
        (
          component: {
            type: string;
            parameters: {
              text: string;
              type: string;
              image: { link: string };
            }[];
          },
          index: number
        ) => {
          if (component.type === "BODY") {
            const params = component.parameters.map((item, i) => ({
              ...item,
              text: `${variables[i]}`,
            }));

            return {
              ...component,
              parameters: params,
            };
          }
          if (component.type === "button") {
            return {
              ...component,
              parameters: [
                {
                  text: `${btnVar[index]}`,
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
          if (template.type === "video") {
            return {
              type: "HEADER",
              parameters: [
                {
                  type: "video",
                  video: {
                    link: basicDetails.mediaPath,
                  },
                },
              ],
            };
          }
          if (template.type === "document") {
            return {
              type: "HEADER",
              parameters: [
                {
                  type: "document",
                  document: {
                    link: basicDetails.mediaPath,
                  },
                },
              ],
            };
          }
          return component;
        }
      );

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
      return toast.error("Error saving template data");
    }
  }

  const extractCoordinates = (url) => {
    let regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    let match = url.match(regex);
    if (match) {
      return {
        lat: match[1],
        lng: match[2],
      };
    }

    regex = /place\/.*\/@(-?\d+\.\d+),(-?\d+\.\d+)/;
    match = url.match(regex);
    if (match) {
      return {
        lat: match[1],
        lng: match[2],
      };
    }

    regex = /q=(-?\d+\.\d+),(-?\d+\.\d+)/;
    match = url.match(regex);
    if (match) {
      return {
        lat: match[1],
        lng: match[2],
      };
    }

    return null;
  };

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
                setLocationData({
                  url: "",
                  latitude: "",
                  longitude: "",
                  address: "",
                  name: "",
                });
                setLocationData({
                  url: "",
                  latitude: "",
                  longitude: "",
                  address: "",
                  name: "",
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
            <div className="w-full mt-4 p-2 ">
              <h1 className="mb-2 text-lg font-semibold text-gray-700">
                Location Details
                <span className="text-red-500">*</span>
              </h1>
              <div className="space-y-2  rounded-b-xl">
                <InputField
                  maxLength={"100"}
                  id="locationurl"
                  name="locationurl"
                  label={"Location URL (optional)"}
                  onChange={(e) => {
                    setLocationData((prev) => ({
                      ...prev,
                      url: e.target.value,
                      latitude: extractCoordinates(e.target.value)?.lat,
                      longitude: extractCoordinates(e.target.value)?.lng,
                    }));
                  }}
                  tooltipContent="Paste map url then we automatically extract Latitude and Longitude"
                  value={locationData.url}
                  placeholder="Enter location url"
                />
                <div className="flex items-center gap-2">
                  <InputField
                    maxLength={"100"}
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
                    maxLength={"100"}
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
                  maxLength={"20"}
                  id="name"
                  name="name"
                  label={"Name"}
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
                  maxLength={"100"}
                  id="address"
                  name="address"
                  label={"Address"}
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
            locationData={locationData}
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
