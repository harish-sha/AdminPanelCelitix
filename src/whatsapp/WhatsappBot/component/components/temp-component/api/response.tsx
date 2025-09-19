import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import React, { useEffect } from "react";
import InputField from "@/components/layout/InputField";
import { Dialog } from "primereact/dialog";
import { FaPlus } from "react-icons/fa";
import UniversalButton from "@/components/common/UniversalButton";
import { MdOutlineDeleteForever } from "react-icons/md";
import { fetchApi } from "../../helper/fetchApi";
import InputVariable from "../../insertVar";

export const Response = ({
  id,
  nodesInputData,
  setNodesInputData,
  allVariables,
  addNode,
  lastPosition,
  nodes,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
  allVariables: any[];
  addNode: any;
  lastPosition: any;
  nodes: any;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedVariable, setSelectedVariable] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [jsonVar, setJsonVar] = React.useState([
    {
      paramName: "",
      varName: "",
    },
  ]);

  function handleAddJsonVar() {
    if (jsonVar.length >= 5) return;
    setJsonVar((prev) => [
      ...prev,
      {
        paramName: "",
        varName: "",
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
  function handleInputVariable(e, index) {
    if (!e) return;
    const tag = `${e}`;
    if (nodesInputData[id]?.apiResponse?.responseType === "json") {
      const newJsonVar = [...jsonVar];
      newJsonVar[index] = { ...newJsonVar[index], varName: tag.trim() };
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

  useEffect(() => {
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        jsonVar: jsonVar,
      },
    }));
  }, [jsonVar]);

  useEffect(() => {
    const jsonVar = nodesInputData[id]?.apiResponse?.storedData || [
      { paramName: "", varName: "" },
    ];

    const varName =
      nodesInputData[id]?.apiResponse?.varName ||
      nodesInputData[id]?.varName ||
      "";

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        apiResponse: {
          ...prev[id]?.apiResponse,
          varName,
        },
      },
    }));

    setJsonVar(jsonVar);
  }, []);

  function addDatainListNode(id, data, requiredData, rowTitle, rowValue) {
    const formattedData = requiredData
      .map((item) => ({
        option: item[rowTitle] || "",
        value: item[rowValue],
      }))
      .slice(0, 10);

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        options: formattedData,
      },
    }));
  }
  useEffect(() => {
    async function createListNode() {
      const rowTitle = nodesInputData[id]?.apiResponse?.rowTitle;
      const rowValue = nodesInputData[id]?.apiResponse?.rowValue;
      const res = await fetchApi(nodesInputData[id]);
      const newListId = String(Number(id) + 1);

      if (!res || !res.length) return;

      const requiredData = res?.map((item) => {
        const newItem = {};
        if (rowTitle in item) newItem[rowTitle] = item[rowTitle];
        if (rowValue in item) newItem[rowValue] = item[rowValue];
        return newItem;
      });

      const isListAvailable = nodes.find((node) => node.id == newListId)?.type;

      if (isListAvailable) {
        addDatainListNode(newListId, res, requiredData, rowTitle, rowValue);
      } else {
        addNode("list", { x: lastPosition.x + 50, y: lastPosition.y + 50 });
        addDatainListNode(newListId, res, requiredData, rowTitle, rowValue);
      }
    }

    if (nodesInputData[id]?.apiResponse?.actionType === "createNewNode") {
      createListNode();
    }
  }, [
    nodesInputData[id]?.apiResponse?.actionType,
    nodesInputData[id]?.apiResponse?.rowTitle,
    nodesInputData[id]?.apiResponse?.rowValue,
  ]);
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
                varName: "",
                actionType: "-1",
              },
            },
          }));
          setJsonVar([{ paramName: "", varName: "" }]);
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
              { value: "none", label: "None" },
              { value: "storeInVariable", label: "Store in Variable" },
              ...(nodesInputData[id]?.apiResponse?.responseType === "json"
                ? [{ value: "createNewNode", label: "Create List Node" }]
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
                    [e]: e === "none" ? -1 : 1,
                  },
                  responseType: e,
                },
              }));
              setJsonVar([{ paramName: "", varName: "" }]);
            }}
            placeholder="Select Request Type"
          />
        )}

      {nodesInputData[id]?.apiResponse?.actionType === "storeInVariable" &&
        nodesInputData[id]?.apiResponse?.responseType === "text" && (
          <div className="space-y-2 relative">
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
              maxLength={"100"}
            />
            <div className="absolute top-7 right-0">
              <InputVariable
                variables={allVariables}
                onSelect={(e) => {
                  handleInputVariable(e, index);
                }}
              />
            </div>
            {/* <div className="flex justify-end">
              <button
                className=" border bg-black text-white rounded-md p-2"
                onClick={() => setIsOpen(true)}
              >
                Add Variable
              </button>
            </div> */}
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
                  label={`Parameter-${index + 1}`}
                  value={jsonVar[index]?.paramName}
                  onChange={(e) => {
                    handleJsonVarChange(index, "paramName", e.target.value);
                  }}
                  placeholder="Enter Parameter Name"
                  maxLength={"100"}
                />
                <div className="relative w-full">
                  <InputField
                    id="varValue"
                    name="varValue"
                    label={`Variable-${index + 1}`}
                    value={jsonVar[index]?.varName}
                    onChange={(e) => {
                      handleJsonVarChange(index, "varName", e.target.value);
                    }}
                    placeholder="Enter Variable"
                    maxLength={"100"}
                  />
                  <div className="absolute top-7 right-0">
                    <InputVariable
                      variables={allVariables}
                      onSelect={(e) => {
                        handleInputVariable(e, index);
                      }}
                    />
                  </div>
                </div>
                {/* <div className="flex justify-end mb-2">
                  <button
                    title="Add Variable"
                    className=" border bg-black text-white rounded-md p-2 flex gap-2 items-center"
                    onClick={() => {
                      setIsOpen(true);
                      setIndex(index);
                    }}
                  >
                    <FaPlus />
                  </button>
                </div> */}
                <div className="flex justify-end mb-2">
                  <button
                    title="Delete Item"
                    className=" border bg-red-500 text-white rounded-md p-2 flex gap-2 items-center"
                    onClick={() => {
                      handleRemoveJsonVar(index);
                    }}
                  >
                    <MdOutlineDeleteForever />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      {nodesInputData[id]?.apiResponse?.actionType === "createNewNode" && (
        <div className="mt-2 flex gap-2">
          <InputField
            id="rowTitle"
            name="rowTitle"
            value={nodesInputData[id]?.apiResponse?.rowTitle}
            onChange={(e) => {
              setNodesInputData((prev) => ({
                ...prev,
                [id]: {
                  ...prev[id],
                  apiResponse: {
                    ...prev[id]?.apiResponse,
                    rowTitle: e.target.value,
                  },
                },
              }));
            }}
            label="Row Title"
            placeholder="Enter Row Title"
            maxLength={"100"}
          />
          <InputField
            id="rowValue"
            name="rowValue"
            value={nodesInputData[id]?.apiResponse?.rowValue}
            onChange={(e) => {
              setNodesInputData((prev) => ({
                ...prev,
                [id]: {
                  ...prev[id],
                  apiResponse: {
                    ...prev[id]?.apiResponse,
                    rowValue: e.target.value,
                  },
                },
              }));
            }}
            label="Row Value"
            placeholder="Enter Row Value"
            maxLength={"100"}
          />
        </div>
      )}

      {/* Dialog */}

      {/* <Dialog
        header="Add Variable"
        visible={isOpen}
        onHide={() => {
          setIsOpen(false);
          setSelectedVariable("");
          setIndex(0);
        }}
      >
        <div className="w-[30rem]">
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
        </div>
        <div className="mt-2">
          <UniversalButton
            id="addVariable"
            name="addVariable"
            label="Add Variable"
            type="submit"
            onClick={() => {
              setIsOpen(false);
              setSelectedVariable("");
              setIndex(0);
            }}
            style={{}}
          />
        </div>
      </Dialog> */}
    </div>
  );
};
