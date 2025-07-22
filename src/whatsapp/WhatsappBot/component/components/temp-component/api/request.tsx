import InputField from "@/components/layout/InputField";
import { Textarea } from "@/components/ui/textarea";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";

export const Request = ({
  id,
  nodesInputData,
  setNodesInputData,
  allVariables,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
  allVariables: any[];
}) => {
  const [params, setParams] = React.useState([
    {
      key: "",
      value: "",
    },
  ]);

  function handleAddParams() {
    if (params.length >= 5) return;
    setParams((prev) => [
      ...prev,
      {
        key: "",
        value: "",
      },
    ]);
  }

  function handleRemoveParams(index: number) {
    setParams((prev) => prev.filter((_, i) => i !== index));
  }

  function handleInsertParams(e, index, type) {
    const newParams = [...params];
    newParams[index][type] = e.target.value;
    setParams(newParams);
  }
  return (
    <div className="space-y-2">
      <InputField
        label="URL"
        name="url"
        id="url"
        placeholder="https://example.com"
        value={nodesInputData[id]?.apiUrl}
        onChange={(e) => {
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              apiUrl: e.target.value,
            },
          }));
        }}
        maxLength={100}
      />
      <AnimatedDropdown
        id="requestType"
        name="requestType"
        label="Request Type"
        options={[
          { value: "GET", label: "GET" },
          { value: "POST", label: "POST" },
        ]}
        value={nodesInputData[id]?.apiMethod}
        onChange={(e) => {
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              apiMethod: e,
            },
          }));
        }}
        placeholder="Select Request Type"
      />
      <AnimatedDropdown
        id="type"
        name="type"
        label="API Data Type"
        options={[
          { value: "none", label: "None" },
          { value: "parameter", label: "Parameter" },
          ...(nodesInputData[id]?.apiMethod === "POST"
            ? [{ value: "requestJson", label: "Request JSON" }]
            : []),
        ]}
        value={nodesInputData[id]?.apiDatatype}
        onChange={(e) => {
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              apiDatatype: e,
            },
          }));
        }}
        placeholder="Select API Data Type"
      />

      {nodesInputData[id]?.apiMethod === "POST" &&
        nodesInputData[id]?.apiDatatype === "requestJson" && (
          <div>
            <label
              className="text-sm font-medium text-gray-800 font-p"
              htmlFor="requestJson"
            >
              Request JSON
            </label>

            <Textarea
              id="requestJson"
              name="requestJson"
              value={nodesInputData[id]?.apiRequestJson}
              onChange={(e) => {
                setNodesInputData((prev) => ({
                  ...prev,
                  [id]: {
                    ...prev[id],
                    apiRequestJson: e.target.value,
                  },
                }));
              }}
              placeholder={`{
    "key": "value"
}
                `}
              className="mt-2 resize-none h-40"
            />
          </div>
        )}

      {nodesInputData[id]?.apiDatatype === "parameter" && (
        <div className="mt-2">
          <div className="flex justify-between items-end mb-2">
            <p>API Parameters</p>
            <button onClick={handleAddParams}>
              <FaPlus />
            </button>
          </div>

          <div className="space-y-2">
            {params?.map((param, index) => (
              <div className="flex gap-2">
                <InputField
                  label=""
                  name="paramsKey"
                  id="paramsKey"
                  placeholder={`Params Key ${index + 1}`}
                  value={params[index]?.key}
                  onChange={(e) => {
                    handleInsertParams(e, index, "key");
                  }}
                  maxLength={100}
                />
                <InputField
                  label=""
                  name="paramsValue"
                  id="paramsValue"
                  placeholder={`Params Value ${index + 1}`}
                  value={params[index]?.value}
                  onChange={(e) => {
                    handleInsertParams(e, index, "value");
                  }}
                  maxLength={100}
                />

                <button
                  className="text-red-500"
                  onClick={() => handleRemoveParams(index)}
                >
                  <MdOutlineDeleteForever size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Header Params here make when  payload come */}

      {/* Uncomment when payload come */}
      {/* <AnimatedDropdown
        id="variable"
        name="variable"
        label="Select Variable"
        options={allVariables.map((v) => ({
          label: v,
          value: v,
        }))}
        value={nodesInputData[id]?.variable}
        onChange={(e) => {
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              //   variable: `{{${e}}}`,
              variable: e,
            },
          }));
        }}
        placeholder="Select API Data Type"
      /> */}
    </div>
  );
};
