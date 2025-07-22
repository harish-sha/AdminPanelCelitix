import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import React from "react";
import InputVariable from "@/whatsapp/whatsappLaunchCampaign/components/InputVariable";
import InputField from "@/components/layout/InputField";
import { Dialog } from "primereact/dialog";
import { FaPlus } from "react-icons/fa";

export const Response = ({
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
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedVariable, setSelectedVariable] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [jsonVar, setJsonVar] = React.useState([
    {
      key: "",
      value: "",
    },
  ]);

  function handleAddJsonVar() {
    if (jsonVar.length >= 5) return;
    setJsonVar((prev) => [
      ...prev,
      {
        key: "",
        value: "",
      },
    ]);
  }

  function handleRemoveJsonVar(index) {
    if (jsonVar.length === 1) return;
    setJsonVar((prev) => prev.filter((_, i) => i !== index));
  }

  function handleJsonVarChange(index, key, value) {
    const newJsonVar = [...jsonVar];
    newJsonVar[index] = { ...newJsonVar[index], [key]: value };
    setJsonVar(newJsonVar);
  }
  function handleInputVariable(e) {
    const tag = `{{${e}}}`;
    if (nodesInputData[id]?.apiResponse?.responseType === "json") {
      const newJsonVar = [...jsonVar];
      newJsonVar[index] = { ...newJsonVar[index], value: tag };
      setJsonVar(newJsonVar);
    }
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        apiResponse: {
          ...prev[id]?.apiResponse,
          varName: tag,
        },
      },
    }));
  }
  return (
    <div className="space-y-2">
      <AnimatedDropdown
        id="responseType"
        name="responseType"
        label="Response Type"
        options={[
          { value: "none", label: "None" },
          { value: "text", label: "Text" },
          { value: "json", label: "JSON" },
        ]}
        value={nodesInputData[id]?.apiResponse?.responseType}
        onChange={(e) => {
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              apiResponse: {
                ...prev[id]?.apiResponse,
                responseType: e,
              },
            },
          }));
        }}
        placeholder="Select Request Type"
      />

      {nodesInputData[id]?.apiResponse?.responseType &&
        nodesInputData[id]?.apiResponse?.responseType !== "none" && (
          <AnimatedDropdown
            id="selectAction"
            name="selectAction"
            label="Select Action"
            options={[
              { value: "storeInVariable", label: "Store in Variable" },
              ...(nodesInputData[id]?.apiResponse?.responseType === "json"
                ? [{ value: "createListNode", label: "Create List Node" }]
                : []),
            ]}
            value={nodesInputData[id]?.apiResponse?.actionType}
            onChange={(e) => {
              setNodesInputData((prev) => ({
                ...prev,
                [id]: {
                  ...prev[id],
                  apiResponse: {
                    ...prev[id]?.apiResponse,
                    actionType: e,
                    [e]: 1,
                  },
                  responseType: e,
                },
              }));
            }}
            placeholder="Select Request Type"
          />
        )}

      {nodesInputData[id]?.apiResponse?.actionType === "storeInVariable" &&
        nodesInputData[id]?.apiResponse?.responseType === "text" && (
          <div className="space-y-2 ">
            <InputField
              id="variableName"
              name="variableName"
              label="Variable Name"
              value={nodesInputData[id]?.apiResponse?.varName}
              onChange={(e) => {
                setNodesInputData((prev) => ({
                  ...prev,
                  [id]: {
                    ...prev[id],
                    apiResponse: {
                      ...prev[id]?.apiResponse,
                      varName: e.target.value,
                    },
                  },
                }));
              }}
              placeholder="Enter Variable Name"
              maxLength={100}
            />
            <div className="flex justify-end">
              <button
                className=" border bg-black text-white rounded-md p-2"
                onClick={() => setIsOpen(true)}
              >
                Add Variable
              </button>
            </div>
          </div>
        )}
      {nodesInputData[id]?.apiResponse?.actionType === "storeInVariable" &&
        nodesInputData[id]?.apiResponse?.responseType === "json" && (
          <div className="space-y-2 ">
            <div className="flex justify-between items-end">
              Add Variable
              <button onClick={handleAddJsonVar}>
                <FaPlus />
              </button>
            </div>

            {jsonVar.map((item, index) => (
              <div className="space-y-2 flex gap-2 justify-center items-end ">
                <InputField
                  id="variableKey"
                  name="variableKey"
                  label="Variable Key"
                  value={jsonVar[index]?.key}
                  onChange={(e) => {
                    handleJsonVarChange(index, "key", e.target.value);
                  }}
                  placeholder="Enter Variable Key"
                  maxLength={100}
                />
                <InputField
                  id="varValue"
                  name="varValue"
                  label="Variable Value"
                  value={jsonVar[index]?.value}
                  onChange={(e) => {
                    handleJsonVarChange(index, "value", e.target.value);
                  }}
                  placeholder="Enter Variable Value"
                  maxLength={100}
                />
                <div className="flex justify-end mb-2">
                  <button
                    className=" border bg-black text-white rounded-md p-2 flex gap-2 items-center"
                    onClick={() => {
                      setIsOpen(true);
                      setIndex(index);
                    }}
                  >
                    <FaPlus /> Variable
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      {/* Dialog */}

      <Dialog
        header="Add Variable"
        visible={isOpen}
        onHide={() => {
          setIsOpen(false);
          setSelectedVariable("");
          setIndex(0);
        }}
      >
        <AnimatedDropdown
          id="selectVariable"
          name="selectVariable"
          label="Select Variable"
          onChange={(e) => {
            handleInputVariable(e);
            setSelectedVariable(e);
          }}
          value={selectedVariable}
          options={allVariables?.map((variable) => ({
            value: variable,
            label: variable,
          }))}
        />
      </Dialog>
    </div>
  );
};
