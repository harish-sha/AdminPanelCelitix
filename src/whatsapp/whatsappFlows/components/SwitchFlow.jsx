import React, { useState, useEffect } from "react";
import UniversalButton from "../../components/UniversalButton";
import AnimatedDropdown from "../../components/AnimatedDropdown";
import InputField from "../../components/InputField";
import UniversalLabel from "@/whatsapp/components/UniversalLabel";
import {
  Switch,
  FormControl,
  Box,
  IconButton,
  Typography,
  Chip,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import UniversalDatePicker from "../../components/UniversalDatePicker";
import { Dialog } from "primereact/dialog";
import { MdSettings, MdClose } from "react-icons/md";
import toast from "react-hot-toast";

import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  MiniMap,
  Controls,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateFlowItem } from "../redux/features/FlowSlice";

const allowedTypes = [
  "TextHeading",
  "TextSubheading",
  "TextBody",
  "TextCaption",
  "CheckboxGroup",
  "DatePicker",
  "Dropdown",
  "EmbeddedLink",
  "Footer",
  "Image",
  "OptIn",
  "RadioButtonsGroup",
  "TextArea",
  "TextInput",
  "ChipsSelector",
];

const emptyComponent = { type: "TextHeading", text: "" };

export default function SwitchFlow({
  selectedItem,
  onSave,
  openSwitch,
  setOpenSwitch,
}) {
  const [variableName, setVariableName] = useState("");
  const [exampleValue, setExampleValue] = useState("");
  const [cases, setCases] = useState({});
  console.log("cases", cases);
  const [switchComponents, setSwitchComponents] = useState([]);
  const [showValidationError, setShowValidationError] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    selectedItem?.data?.value || ""
  );

  const [newCaseKey, setNewCaseKey] = useState("");
  const [addMode, setAddMode] = useState("");
  const [selectedFlowItem, setSelectedFlowItem] = useState("");
  const [showComponentOptions, setShowComponentOptions] = useState(false);

  const [dynamicCaseKey, setDynamicCaseKey] = useState("");
  const [activeCaseKey, setActiveCaseKey] = useState("");
  const [dynamicCount, setDynamicCount] = useState(1);

  const flowItems = useSelector((state) => state.flows.canvasItems);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const flowItemsOptions = flowItems
    .filter((item) => item.data.type !== "ifelse")
    .map((item) => {
      const label = item.data.text || item.data.type || item.id;
      return {
        label,
        value: item.id,
      };
    });

  const flowItem = flowItems.find((item) => item.id === selectedFlowItem);

  const handleDeleteNode = (nodeIdToDelete) => {
    setNodes((prevNodes) =>
      prevNodes.filter((node) => node.id !== nodeIdToDelete)
    );
    setEdges((prevEdges) =>
      prevEdges.filter(
        (edge) =>
          edge.source !== nodeIdToDelete && edge.target !== nodeIdToDelete
      )
    );
  };

  const handleNodeSettings = (nodeId) => {
    console.log("⚙️ Open settings for node:", nodeId);
  };

  // const CustomNode = ({ id, data }) => {
  //   return (
  //     <div
  //       className="bg-white rounded-md relative border border-gray-300 shadow"
  //       style={{ minWidth: "140px", textAlign: "center", padding: "6px 12px" }}
  //     >
  //       {/* Settings icon on left */}
  //       <button
  //         onClick={() => data.onSettings(id)}
  //         className="absolute -top-2 -left-2 bg-white border border-gray-300 rounded-full p-1 hover:bg-gray-100 shadow cursor-pointer"
  //       >
  //         <MdSettings size={14} />
  //       </button>

  //       {/* Close icon on right */}
  //       <button
  //         onClick={() => data.onDelete(id)}
  //         className="absolute -right-2 -top-2 bg-white border border-gray-300 rounded-full p-1 hover:bg-gray-100 shadow cursor-pointer"
  //       >
  //         <MdClose size={14} />
  //       </button>

  //       {/* Label */}
  //       <div className="font-medium">{data.label}</div>

  //       <Handle type="target" position="top" />
  //       <Handle type="source" position="bottom" />
  //     </div>
  //   );
  // };

  // const CustomNode = ({ id, data }) => {
  //   const caseEntries = data?.cases ? Object.entries(data.cases) : [];

  //   return (
  //     <div
  //       className="bg-white rounded-md relative border border-gray-300 shadow"
  //       style={{ minWidth: "180px", textAlign: "center", padding: "6px 12px" }}
  //     >
  //       {/* Settings icon */}
  //       <button
  //         onClick={() => data.onSettings?.(id)}
  //         className="absolute -top-2 -left-2 bg-white border border-gray-300 rounded-full p-1 hover:bg-gray-100 shadow cursor-pointer"
  //       >
  //         <MdSettings size={14} />
  //       </button>

  //       {/* Close icon */}
  //       <button
  //         onClick={() => data.onDelete?.(id)}
  //         className="absolute -right-2 -top-2 bg-white border border-gray-300 rounded-full p-1 hover:bg-gray-100 shadow cursor-pointer"
  //       >
  //         <MdClose size={14} />
  //       </button>

  //       {/* Label */}
  //       <div className="font-medium mb-2">{data.label}</div>

  //       {/* Case Options */}
  //       {data.cases && Object.keys(data.cases).length > 0 ? (
  //         Object.entries(data.cases).map(([caseKey, components], idx) => (
  //           <div
  //             key={caseKey}
  //             className="flex items-center bg-gray-100 rounded p-1 m-1 text-sm relative"
  //           >
  //             <div className="flex-1">{caseKey}</div>

  //             {/* Dynamic handle per case */}
  //             <Handle
  //               type="source"
  //               position="left"
  //               id={`case-${idx}`}
  //               style={{
  //                 top: "50%",
  //                 transform: "translateY(-50%)",
  //                 right: "-15px",
  //                 background: "#555",
  //               }}
  //             />
  //           </div>
  //         ))
  //       ) : (
  //         <Handle
  //           type="source"
  //           position="bottom"
  //           id="single"
  //           style={{
  //             bottom: "-8px",
  //             left: "50%",
  //             transform: "translateX(-50%)",
  //             background: "#555",
  //           }}
  //         />
  //       )}

  //       {/* Common handles */}
  //     </div>
  //   );
  // };

  const CustomNode = ({ id, data }) => {
    console.log("data", data)
    const caseEntries = data?.cases ? Object.entries(data.cases) : [];

    return (
      <div
        className="bg-white rounded-md relative border border-gray-300 shadow"
        style={{ minWidth: "180px", textAlign: "center", padding: "6px 12px" }}
      >
        {/* Settings icon */}
        <button
          onClick={() => data.onSettings?.(id)}
          className="absolute -top-2 -left-2 bg-white border border-gray-300 rounded-full p-1 hover:bg-gray-100 shadow cursor-pointer"
        >
          <MdSettings size={14} />
        </button>

        {/* Close icon */}
        <button
          onClick={() => data.onDelete?.(id)}
          className="absolute -right-2 -top-2 bg-white border border-gray-300 rounded-full p-1 hover:bg-gray-100 shadow cursor-pointer"
        >
          <MdClose size={14} />
        </button>

        {/* Label */}
        <div className="font-medium mb-2">{data.label}</div>


        {data.details["data-source"] && data.details["data-source"].length > 0 ? (
          data.details["data-source"].map((option, idx) => (
            <div
              key={idx}
              className="flex items-center bg-gray-100 rounded p-1 m-1 text-sm relative"
            >
              <div className="flex-1">{option.title}</div>

              {/* Handle next to each option */}
              <Handle
                type="source"
                position="right"
                id={`option-${idx}`}
                style={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: "-15px",
                  background: "#555",
                }}
              />
            </div>
          ))
        ) : (
          <Handle
            type="source"
            position="right"
            id="single"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              right: "-6px",
              background: "#555",
            }}
          />
        )}

        {/* Case Options */}
        {caseEntries.length > 0 ? (
          caseEntries.map(([caseKey, components], idx) => (
            <div
              key={caseKey}
              className="flex items-center bg-gray-100 rounded p-1 m-1 text-sm relative"
            >
              <div className="flex-1">{caseKey}</div>

              {/* One source handle per case */}
              <Handle
                type="source"
                position="left"
                id={`case-${caseKey}`} // more meaningful than just idx
                style={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: "-10px",
                  background: "#555",
                }}
              />
            </div>
          ))
        ) : (
          // Fallback single output handle if no cases are defined
          <Handle
            type="source"
            position="right"
            id="default-out"
            style={{
              bottom: "-8px",
              right: "-6px",
              transform: "translateX(-50%)",
              background: "#555",
            }}
          />
        )}

        {/* Optional target handle (for connecting into this node) */}
        <Handle
          type="target"
          position="left"
          id="input"
          // style={{
          //   top: "-8px",
          //   left: "50%",
          //   transform: "translateX(-50%)",
          //   background: "#555",
          // }}
        />
      </div>
    );
  };

  // const DropdownNode = ({ id, data }) => {
  //   const options = data.options || [];

  //   return (
  //     <div className="bg-white border rounded-md shadow p-2 relative min-w-[180px]">
  //       <div className="font-semibold mb-1">{data.label}</div>

  //       {options.map((opt, idx) => (
  //         <div
  //           key={opt.value || idx}
  //           className="flex items-center bg-gray-100 rounded p-1 m-1 text-sm relative"
  //         >
  //           <div className="flex-1">{opt.title || opt.label}</div>

  //           <Handle
  //             type="source"
  //             position="right"
  //             id={`option-${opt.value || idx}`}
  //             style={{
  //               top: "50%",
  //               transform: "translateY(-50%)",
  //               right: "-10px",
  //               background: "#555",
  //             }}
  //           />
  //         </div>
  //       ))}

  //       <Handle
  //         type="target"
  //         position="top"
  //         id="single"
  //         style={{
  //           top: "-8px",
  //           left: "50%",
  //           transform: "translateX(-50%)",
  //           background: "#555",
  //         }}
  //       />
  //     </div>
  //   );
  // };

  const nodeTypes = {
    customNode: CustomNode,
    // dropdownNode: DropdownNode,
  };

  useEffect(() => {
    if (selectedFlowItem) {
      const newNode = {
        id: `node-${selectedFlowItem}`,
        type: "customNode",
        position: { x: Math.random() * 250, y: Math.random() * 250 },
        data: {
          label: flowItem.data.text || flowItem.data.type || flowItem.id,
          details: flowItem.data,
          onDelete: handleDeleteNode,
        },
      };

      setNodes((nds) => [...nds.filter((n) => n.id !== newNode.id), newNode]);
    }
  }, [selectedFlowItem]);

  // useEffect(() => {
  //   if (selectedFlowItem) {
  //     const flowItem = flowItems.find((item) => item.id === selectedFlowItem);

  //     if (!flowItem) return;

  //     const isDropdown = flowItem.type === "Dropdown";

  //     const newNode = {
  //       id: `node-${selectedFlowItem}`,
  //       type: isDropdown ? "dropdownNode" : "customNode", // 👈 differentiate by type
  //       position: { x: Math.random() * 250, y: Math.random() * 250 },
  //       data: {
  //         label: flowItem.data?.text || flowItem.data?.type || flowItem.id,
  //         options: isDropdown ? flowItem.data?.options || [] : undefined,
  //         cases: !isDropdown ? flowItem.data?.cases || {} : undefined,
  //         details: flowItem.data,
  //         onDelete: handleDeleteNode,
  //         onSettings: handleNodeSettings, 
  //       },
  //     };

  //     setNodes((nds) => [...nds.filter((n) => n.id !== newNode.id), newNode]);
  //   }
  // }, [selectedFlowItem]);

  // **************************TextInput**********************************
  const OptionsTypeOptions = [
    { value: "text", label: "Text" },
    { value: "number", label: "Number" },
    { value: "email", label: "Email" },
  ];
  // **************************TextInput***********************************

  const [caseKey] = useState(selectedItem?.caseKey);

  const handleSwitchSave = () => {
    console.log("cases switch", cases)
    const payload = {
      cases,
    };

    console.log("payload switch", payload)

    const updatedItem = {
      ...selectedItem,
      ...payload,
      status: 1,
    };

    console.log("✅ Final Switch Payload 1", updatedItem);

    onSave(updatedItem);

    console.log("✅ Final Switch Payload 2", updatedItem);
  };

 

  const dispatch = useDispatch();

  const handleCaseSave = () => {
    const newNodes = {
      id: "switch-node",
      type: "customNode", // your CustomNode component
      position: { x: 100, y: 100 },
      data: {
        label: "Cases",
        cases: { ...cases },
        onSettings: handleNodeSettings,
        onDelete: handleDeleteNode,
      },
    };

    setNodes((prevNodes) => {
  const filtered = prevNodes.filter((n) => n.id !== "switch-node");

  return [
    ...filtered,
    {
      id: "switch-node",
      type: "customNode",
      position: { x: 100, y: 100 },
      data: {
        label: "Cases",
        cases: { ...cases },
        onSettings: handleNodeSettings,
        onDelete: handleDeleteNode,
      },
    },
  ];
});

  };

  const numberToWord = (num) => {
    const words = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
      "twenty",
    ];
    return words[num] || String(num);
  };

  const newKey = `${numberToWord(dynamicCount)}`;

  useEffect(() => {
    const keys = Object.keys(cases);
    const latestDynamic = keys.find(
      (key) => key.startsWith("dynamic-") && !cases[key][0]?.type
    );

    if (latestDynamic && latestDynamic !== activeCaseKey) {
      setActiveCaseKey(latestDynamic);
    }
  }, [cases]);

  const addReactFlowNode = (caseKey) => {
    const newNode = {
      id: caseKey,
      type: "default", // or custom type
      position: { x: Math.random() * 400, y: Math.random() * 400 }, // randomize for now
      data: { label: `Case: ${caseKey}` },
    };

    setNodes((prev) => [...prev, newNode]);
  };

  const addComponent = (caseKey) => {
    const updated = JSON.parse(JSON.stringify(cases));
    updated[caseKey].push({ ...emptyComponent });
    setCases(updated);
  };

  const removeComponent = (caseKey, idx) => {
    const updated = JSON.parse(JSON.stringify(cases));
    updated[caseKey].splice(idx, 1);
    setCases(updated);
  };

  const updateComponent = (caseKey, idx, field, value) => {
    const updated = JSON.parse(JSON.stringify(cases));
    updated[caseKey][idx][field] = value;
    setCases(updated);
  };

  const getSchema = () => {
    return {
      type: "Switch",
      //   value: `\${data.${variableName}}`,
      cases,
      // data: {
      //   [variableName]: {
      //     type: "string",
      //     __example__: exampleValue,
      //   },
      // },
    };
  };

  const isSwitchBlockValid = () => {
    return Object.keys(cases).length > 0;
  };

  return (
    <>
      <Dialog
        visible={openSwitch}
        onHide={() => setOpenSwitch(false)}
        style={{ width: "85vw", height: "85vh" }}
        draggable={false}
        header={"Switch Component"}
      >
        <div className="">
          <div className="flex items-start justify-center gap-2 w-full">
            <div className="w-full h-180 bg-white rounded shadow">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
                fitView
              >
                <Background />
                <Controls />
              </ReactFlow>
            </div>
            <div className="p-4 bg-gray-50 text-black font-mono h-auto w-1/3">
              <div className="mb-4">
                <AnimatedDropdown
                  label="Select Flow Item"
                  tooltipContent="Select a flow item"
                  tooltipPlacement="right"
                  value={selectedFlowItem}
                  options={flowItemsOptions}
                  onChange={(value) => {
                    setSelectedFlowItem(value);
                  }}
                />
              </div>
              <h2 className="text-xl font-bold mb-4">🔁 Switch Case</h2>

              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg m-2">Cases: </h3>

                {addMode === "" ? (
                  <UniversalButton
                    label="+ Add Case"
                    onClick={() => setAddMode("select")} // trigger radio selection
                  />
                ) : addMode === "select" ? (
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Choose Case Type</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="caseType"
                          value="custom"
                          onChange={() => setAddMode("custom")}
                        />
                        Custom
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="caseType"
                          value="dynamic"
                          onChange={() => setAddMode("dynamic")}
                        />
                        Dynamic
                      </label>
                    </div>
                  </div>
                ) : addMode === "custom" ? (
                  <div className="flex items-center gap-2 mt-2">
                    <InputField
                      placeholder="Enter case key"
                      value={newCaseKey}
                      onChange={(e) => setNewCaseKey(e.target.value)}
                    />
                    <UniversalButton
                      label="Add"
                      disabled={!newCaseKey.trim()}
                      onClick={() => {
                        if (!cases[newCaseKey]) {
                          const updatedCases = {
                            ...cases,
                            [newCaseKey]: [
                              JSON.parse(JSON.stringify(emptyComponent)),
                            ],
                          };
                          setCases(updatedCases);
                        }
                        setNewCaseKey("");
                      }}
                    />
                    <UniversalButton
                      label="Cancel"
                      onClick={() => {
                        setAddMode("");
                        setNewCaseKey("");
                      }}
                    />
                  </div>
                ) : addMode === "dynamic" ? (
                  <div className="mt-2 flex gap-3">
                    <UniversalButton
                      label="Add Dynamic Case"
                      onClick={() => {
                        const key = `${dynamicCount}`;

                        // setAddMode("");
                        if (!cases[newKey]) {
                          const updatedCases = {
                            ...cases,
                            [newKey]: [
                              JSON.parse(JSON.stringify(emptyComponent)),
                            ],
                          };
                          setCases(updatedCases);
                          setDynamicCount(dynamicCount + 1);
                          setActiveCaseKey(newKey);
                        }
                      }}
                    />

                    <UniversalButton
                      label="Done"
                      onClick={() => {
                        setAddMode(""); // exit dynamic mode
                      }}
                    />
                  </div>
                ) : null}
              </div>

              {Object.entries(cases).map(([caseKey, comps], ci) => (
                <div
                  key={ci}
                  className="mb-4 border border-gray-600 p-3 rounded"
                >
                  <h4 className="font-semibold text-green-300 mb-2">
                    Case: "{caseKey}"
                  </h4>

                  {comps.map((comp, idx) => (
                    <div
                      key={idx}
                      className="mb-2 bg-gray-50 p-2 rounded space-y-1"
                    >
                      <div className="flex gap-2 items-center">
                        <label>Type:</label>
                        <AnimatedDropdown
                          value={comp?.type || ""}
                          onChange={(val) =>
                            updateComponent(caseKey, idx, "type", val)
                          }
                          options={allowedTypes.map((t) => ({
                            label: t,
                            value: t,
                          }))}
                          placeholder="Select type"
                        />

                        <button
                          onClick={() => removeComponent(caseKey, idx)}
                          className="text-red-500"
                        >
                          <DeleteOutlineIcon />
                        </button>
                      </div>

                      {[
                        "TextHeading",
                        "TextBody",
                        "TextSubheading",
                        "TextCaption",
                      ].includes(comp.type) && (
                          <div className="mt-3">
                            <InputField
                              placeholder="Text"
                              className="w-full p-1 rounded text-black"
                              value={comp.text || ""}
                              onChange={(e) =>
                                updateComponent(
                                  caseKey,
                                  idx,
                                  "text",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        )}

                      {["TextInput"].includes(comp.type) && (
                        <div className="mt-3 space-y-3">
                          <InputField
                            label="Input Label"
                            placeholder="Enter Input label"
                            tooltipContent="Enter Input label"
                            tooltipPlacement="right"
                            className="w-full p-1 rounded text-black"
                            value={comp.label || ""}
                            onChange={(e) =>
                              updateComponent(
                                caseKey,
                                idx,
                                "label",
                                e.target.value
                              )
                            }
                          />
                          <AnimatedDropdown
                            label="Select Input Type"
                            tooltipContent="Select input type (select text for default)"
                            tooltipPlacement="right"
                            options={OptionsTypeOptions}
                            value={comp.inputType || ""}
                            onChange={(val) =>
                              updateComponent(caseKey, idx, "inputType", val)
                            }
                            placeholder="Select Type"
                          />

                          <InputField
                            label="Helper Text"
                            type="text"
                            placeholder="Enter helper text"
                            tooltipContent="Enter placeholder for helper-text"
                            tooltipPlacement="right"
                            value={comp.placeholder || ""}
                            onChange={(e) =>
                              updateComponent(
                                caseKey,
                                idx,
                                "placeholder",
                                e.target.value
                              )
                            }
                          />

                          <InputField
                            label="Error Message"
                            placeholder="Enter Error"
                            tooltipContent="Enter error for input"
                            tooltipPlacement="right"
                            value={comp.error || ""}
                            onChange={(e) =>
                              updateComponent(
                                caseKey,
                                idx,
                                "error",
                                e.target.value
                              )
                            }
                          />

                          <div className="flex gap-2">
                            <InputField
                              label="Min Length"
                              type="number"
                              placeholder="Min Length"
                              tooltipContent="Enter minimum length"
                              tooltipPlacement="right"
                              value={comp.min || ""}
                              onChange={(e) =>
                                updateComponent(
                                  caseKey,
                                  idx,
                                  "min",
                                  e.target.value
                                )
                              }
                            />

                            <InputField
                              label="Max Length"
                              type="number"
                              placeholder="Max Length"
                              tooltipContent="Enter maximum length"
                              tooltipPlacement="right"
                              value={comp.max || ""}
                              onChange={(e) =>
                                updateComponent(
                                  caseKey,
                                  idx,
                                  "max",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <UniversalLabel
                              htmlFor="required"
                              className="text-sm font-medium text-gray-700"
                              text=" Required?"
                              tooltipContent="Set required field for TextInput"
                              tooltipPlacement="top"
                            ></UniversalLabel>
                            <div className="flex items-center">
                              <Switch
                                tooltipContent="Set required field for TextInput"
                                tooltipPlacement="top"
                                checked={comp.required || false}
                                onChange={(e) =>
                                  updateComponent(
                                    caseKey,
                                    idx,
                                    "required",
                                    e.target.checked
                                  )
                                }
                              />

                              <span className="text-sm">
                                {comp.required ? "True" : "False"}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {comp.type === "TextArea" && (
                        <div className="mt-3 space-y-3">
                          <InputField
                            label="TextArea Label"
                            placeholder="Enter TextArea Label"
                            tooltipContent="Edit TextArea Label"
                            tooltipPlacement="right"
                            value={comp.label || ""}
                            maxLength={20}
                            onChange={(e) =>
                              updateComponent(
                                caseKey,
                                idx,
                                "label",
                                e.target.value
                              )
                            }
                          />

                          <InputField
                            label="Helper-Text"
                            type="text"
                            placeholder="Enter placeholder for TextArea"
                            tooltipContent="Enter placeholder"
                            tooltipPlacement="right"
                            value={comp.placeholder || " "}
                            maxLength={80}
                            onChange={(e) =>
                              updateComponent(
                                caseKey,
                                idx,
                                "placeholder",
                                e.target.value
                              )
                            }
                          />

                          <InputField
                            label="Enter error to display"
                            id="textarea_error"
                            placeholder="Enter Error"
                            tooltipContent="Enter Error for TextArea"
                            tooltipPlacement="right"
                            maxLength={30}
                            value={comp.error || ""}
                            onChange={(e) =>
                              updateComponent(
                                caseKey,
                                idx,
                                "error",
                                e.target.value
                              )
                            }
                          />

                          <div className="flex items-end">
                            <UniversalLabel
                              htmlFor="textarea_required"
                              className="text-sm font-medium text-gray-700"
                              tooltipContent="Set required field for TextArea"
                              tooltipPlacement="top"
                              text="Required?"
                            ></UniversalLabel>
                            <div className="flex items-center">
                              <Switch
                                checked={comp.required || "false"}
                                onChange={(e) =>
                                  updateComponent(
                                    caseKey,
                                    idx,
                                    "required",
                                    e.target.checked
                                  )
                                }
                              />
                              <span className="text-sm">
                                {comp.required ? "True" : "False"}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {comp.type === "CheckboxGroup" && (
                        <div className="mt-3 space-y-3">
                          {/* ── Main Label ── */}
                          <InputField
                            label="Checkbox Group Label"
                            placeholder="Enter label"
                            tooltipContent="Enter Checkbox Group Label"
                            value={comp.label || ""}
                            onChange={(e) =>
                              updateComponent(
                                caseKey,
                                idx,
                                "label",
                                e.target.value
                              )
                            }
                            fullWidth
                          />

                          {/* ── Required Toggle ── */}
                          <div>
                            <UniversalLabel
                              htmlFor="checkbox_required"
                              className="text-sm font-medium text-gray-700"
                              tooltipContent="Set required field for Checkbox"
                              tooltipPlacement="top"
                              text="Required"
                            />
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={comp.required || false}
                                onChange={(e) =>
                                  updateComponent(
                                    caseKey,
                                    idx,
                                    "required",
                                    e.target.checked
                                  )
                                }
                                id="checkbox_required"
                              />
                              <span>{comp.required ? "True" : "False"}</span>
                            </div>
                          </div>

                          {/* ── Render Each Option ── */}
                          {(comp.checkboxOptions || []).map((opt, i) => {
                            const isEditing = comp.checkboxEditIdx === i;
                            const draft = comp.draftCheckbox || {};

                            return (
                              <Box
                                key={i}
                                sx={{
                                  mb: 1,
                                  p: 1,
                                  border: "1px solid #ccc",
                                  borderRadius: 1,
                                  bgcolor: isEditing ? "#f5f5f5" : "white",
                                }}
                              >
                                {isEditing ? (
                                  <div className="space-y-3">
                                    <InputField
                                      label="Title"
                                      placeholder="Enter Title"
                                      tooltipContent="Enter Title"
                                      tooltipPlacement="right"
                                      value={draft.title || ""}
                                      onChange={(e) =>
                                        updateComponent(
                                          caseKey,
                                          idx,
                                          "draftCheckbox",
                                          {
                                            ...draft,
                                            title: e.target.value,
                                          }
                                        )
                                      }
                                    />
                                    <InputField
                                      label="Description"
                                      placeholder="Enter Description"
                                      tooltipContent="Enter Description"
                                      value={draft.description || ""}
                                      onChange={(e) =>
                                        updateComponent(
                                          caseKey,
                                          idx,
                                          "draftCheckbox",
                                          {
                                            ...draft,
                                            description: e.target.value,
                                          }
                                        )
                                      }
                                    />
                                    <InputField
                                      label="Metadata"
                                      placeholder="Enter MetaData"
                                      tooltipContent="Enter MetaData"
                                      tooltipPlacement="right"
                                      value={draft.metadata || ""}
                                      required
                                      onChange={(e) =>
                                        updateComponent(
                                          caseKey,
                                          idx,
                                          "draftCheckbox",
                                          {
                                            ...draft,
                                            metadata: e.target.value,
                                          }
                                        )
                                      }
                                    />

                                    {/* Image Upload */}
                                    <Box sx={{ display: "flex", mb: 1 }}>
                                      <InputField
                                        label="Upload Image"
                                        type="file"
                                        accept=".png, .jpeg"
                                        tooltipContent="Upload Image"
                                        tooltipPlacement="right"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                              updateComponent(
                                                caseKey,
                                                idx,
                                                "draftCheckbox",
                                                {
                                                  ...draft,
                                                  image: reader.result,
                                                }
                                              );
                                            };
                                            reader.readAsDataURL(file);
                                          }
                                        }}
                                      />
                                      <IconButton
                                        sx={{ marginTop: 3 }}
                                        onClick={() =>
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "draftCheckbox",
                                            {
                                              ...draft,
                                              image: "",
                                            }
                                          )
                                        }
                                      >
                                        <DeleteOutlineIcon />
                                      </IconButton>
                                    </Box>

                                    {/* Save/Cancel Buttons */}
                                    <Box className="flex justify-center gap-2 mt-2">
                                      <UniversalButton
                                        label="Save Option"
                                        disabled={
                                          !draft.title?.trim() ||
                                          !draft.metadata?.trim()
                                        }
                                        onClick={() => {
                                          const updated = [
                                            ...(comp.checkboxOptions || []),
                                          ];
                                          updated[i] = draft;
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "checkboxOptions",
                                            updated
                                          );
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "draftCheckbox",
                                            null
                                          );
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "checkboxEditIdx",
                                            -1
                                          );
                                        }}
                                      />
                                      <UniversalButton
                                        label="Cancel"
                                        onClick={() => {
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "draftCheckbox",
                                            null
                                          );
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "checkboxEditIdx",
                                            -1
                                          );
                                        }}
                                      />
                                    </Box>
                                  </div>
                                ) : (
                                  // Static Display
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Box
                                      sx={{ flexGrow: 1, cursor: "pointer" }}
                                      onClick={() => {
                                        updateComponent(
                                          caseKey,
                                          idx,
                                          "checkboxEditIdx",
                                          i
                                        );
                                        updateComponent(
                                          caseKey,
                                          idx,
                                          "draftCheckbox",
                                          opt
                                        );
                                      }}
                                    >
                                      <Typography variant="subtitle1">
                                        {opt.title}
                                      </Typography>
                                      {opt.description && (
                                        <Typography
                                          variant="body2"
                                          color="textSecondary"
                                        >
                                          {opt.description}
                                        </Typography>
                                      )}
                                    </Box>
                                    <IconButton
                                      onClick={() => {
                                        updateComponent(
                                          caseKey,
                                          idx,
                                          "checkboxEditIdx",
                                          i
                                        );
                                        updateComponent(
                                          caseKey,
                                          idx,
                                          "draftCheckbox",
                                          opt
                                        );
                                      }}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                    <IconButton
                                      onClick={() => {
                                        const updated = [
                                          ...(comp.checkboxOptions || []),
                                        ];
                                        updated.splice(i, 1);
                                        updateComponent(
                                          caseKey,
                                          idx,
                                          "checkboxOptions",
                                          updated
                                        );
                                      }}
                                    >
                                      <CloseIcon />
                                    </IconButton>
                                  </Box>
                                )}
                              </Box>
                            );
                          })}

                          {/* ── Add Option & Save All ── */}
                          <div className="flex flex-row justify-center items-center gap-2 py-1 px-2">
                            <UniversalButton
                              label="Add Option"
                              onClick={() => {
                                const updated = [
                                  ...(comp.checkboxOptions || []),
                                ];
                                updated.push({
                                  title: "",
                                  description: "",
                                  metadata: "",
                                  image: "",
                                });
                                updateComponent(
                                  caseKey,
                                  idx,
                                  "checkboxOptions",
                                  updated
                                );
                                updateComponent(
                                  caseKey,
                                  idx,
                                  "checkboxEditIdx",
                                  updated.length - 1
                                );
                                updateComponent(caseKey, idx, "draftCheckbox", {
                                  title: "",
                                  description: "",
                                  metadata: "",
                                  image: "",
                                });
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {comp.type === "DatePicker" && (
                        <div className="space-y-3 mt-3">
                          {/* Date Label */}
                          <InputField
                            label="Date Label"
                            placeholder="Enter Date Label"
                            tooltipContent="Enter Date Label"
                            tooltipPlacement="right"
                            maxLength={40}
                            value={comp.label || ""}
                            onChange={(e) =>
                              updateComponent(
                                caseKey,
                                idx,
                                "label",
                                e.target.value
                              )
                            }
                          />

                          {/* Placeholder / Helper Text */}
                          <InputField
                            label="Helper Text"
                            placeholder="Enter Placeholder for Date"
                            tooltipContent="Enter Placeholder for Date"
                            tooltipPlacement="right"
                            value={comp.placeholder || ""}
                            onChange={(e) =>
                              updateComponent(
                                caseKey,
                                idx,
                                "placeholder",
                                e.target.value
                              )
                            }
                          />

                          {/* Min Date */}
                          <UniversalDatePicker
                            label="Min-Date"
                            tooltipContent="Select Min-Date"
                            tooltipPlacement="right"
                            value={comp.minDate || null}
                            onChange={(value) =>
                              updateComponent(caseKey, idx, "minDate", value)
                            }
                          />

                          {/* Max Date */}
                          <UniversalDatePicker
                            label="Max-Date"
                            tooltipContent="Select Max-Date"
                            tooltipPlacement="right"
                            value={comp.maxDate || null}
                            onChange={(value) =>
                              updateComponent(caseKey, idx, "maxDate", value)
                            }
                          />

                          {/* Add Unavailable Dates */}
                          <UniversalDatePicker
                            label="Unavailable Dates"
                            tooltipContent="Select Unavailable-Date"
                            tooltipPlacement="right"
                            value={null}
                            onChange={(value) => {
                              const current = comp.unavailableDates || [];
                              if (!current.includes(value)) {
                                updateComponent(
                                  caseKey,
                                  idx,
                                  "unavailableDates",
                                  [...current, value]
                                );
                              }
                            }}
                            disabled={!comp.minDate || !comp.maxDate}
                          />

                          {/* Render Unavailable Dates */}
                          <div className="flex flex-wrap gap-2 mt-2 ">
                            {(comp.unavailableDates || []).map(
                              (date, index) => (
                                <Chip
                                  sx={{ padding: 1 }}
                                  key={index}
                                  label={new Date(date).toLocaleDateString()}
                                  onDelete={() => {
                                    const updated =
                                      comp.unavailableDates.filter(
                                        (_, i) => i !== index
                                      );
                                    updateComponent(
                                      caseKey,
                                      idx,
                                      "unavailableDates",
                                      updated
                                    );
                                  }}
                                />
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {comp.type === "Dropdown" && (
                        <div className="mt-3 space-y-3">
                          {/* Label */}
                          <InputField
                            label="Dropdown Label"
                            placeholder="Enter Label"
                            tooltipContent="Enter MainLabel"
                            tooltipPlacement="right"
                            value={comp.label || ""}
                            onChange={(e) =>
                              updateComponent(
                                caseKey,
                                idx,
                                "label",
                                e.target.value
                              )
                            }
                            fullWidth
                          />

                          {/* Required Switch */}
                          <div>
                            <UniversalLabel
                              htmlFor="dropdown_required"
                              text="Required"
                              tooltipContent="Set required field"
                            />
                            <div className="flex items-center gap-2">
                              <Switch
                                id="dropdown_required"
                                checked={comp.required || false}
                                onChange={(e) =>
                                  updateComponent(
                                    caseKey,
                                    idx,
                                    "required",
                                    e.target.checked
                                  )
                                }
                              />
                              <span>{comp.required ? "True" : "False"}</span>
                            </div>
                          </div>

                          {/* Options */}
                          {(comp.dropdownOptions || []).map(
                            (opt, optionIdx) => {
                              const isEditing =
                                comp.dropdownEditIdx === optionIdx;
                              const draft = comp.draftDropdown || {};

                              return (
                                <Box
                                  key={optionIdx}
                                  sx={{
                                    mb: 1,
                                    p: 1,
                                    border: "1px solid #ddd",
                                    borderRadius: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    bgcolor: isEditing ? "#f5f5f5" : "white",
                                  }}
                                >
                                  {isEditing ? (
                                    <div className="space-y-3">
                                      <InputField
                                        label="Title"
                                        placeholder="Enter title"
                                        type="text"
                                        tooltipContent="Enter Title"
                                        tooltipPlacement="right"
                                        value={draft.title || ""}
                                        onChange={(e) =>
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "draftDropdown",
                                            {
                                              ...draft,
                                              title: e.target.value,
                                            }
                                          )
                                        }
                                      />
                                      <InputField
                                        label="Description"
                                        tooltipContent="Enter Description"
                                        tooltipPlacement="right"
                                        placeholder="Enter description"
                                        type="text"
                                        fullWidth
                                        value={draft.description || ""}
                                        onChange={(e) =>
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "draftDropdown",
                                            {
                                              ...draft,
                                              description: e.target.value,
                                            }
                                          )
                                        }
                                      />
                                      <InputField
                                        label="Metadata"
                                        tooltipContent="Enter MetaData"
                                        tooltipPlacement="right"
                                        placeholder="Enter Metadata"
                                        type="text"
                                        fullWidth
                                        value={draft.metadata || ""}
                                        required
                                        onChange={(e) =>
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "draftDropdown",
                                            {
                                              ...draft,
                                              metadata: e.target.value,
                                            }
                                          )
                                        }
                                      />

                                      {/* Image Upload */}
                                      <Box sx={{ display: "flex", mb: 1 }}>
                                        <InputField
                                          label="Upload Image"
                                          type="file"
                                          accept=".png, .jpeg"
                                          tooltipContent="Upload Image"
                                          tooltipPlacement="right"
                                          onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                              const reader = new FileReader();
                                              reader.onloadend = () => {
                                                updateComponent(
                                                  caseKey,
                                                  idx,
                                                  "draftDropdown",
                                                  {
                                                    ...draft,
                                                    image: reader.result,
                                                  }
                                                );
                                              };
                                              reader.readAsDataURL(file);
                                            }
                                          }}
                                        />
                                        <IconButton
                                          sx={{ marginTop: 3 }}
                                          onClick={() =>
                                            updateComponent(
                                              caseKey,
                                              idx,
                                              "draftDropdown",
                                              {
                                                ...draft,
                                                image: "",
                                              }
                                            )
                                          }
                                        >
                                          <DeleteOutlineIcon />
                                        </IconButton>
                                      </Box>

                                      {/* Save/Cancel */}
                                      <Box className="flex justify-center gap-2 mt-2">
                                        <UniversalButton
                                          label="Save Option"
                                          onClick={() => {
                                            const updated = [
                                              ...(comp.dropdownOptions || []),
                                            ];
                                            updated[optionIdx] = draft;
                                            updateComponent(
                                              caseKey,
                                              idx,
                                              "dropdownOptions",
                                              updated
                                            );
                                            updateComponent(
                                              caseKey,
                                              idx,
                                              "draftDropdown",
                                              null
                                            );
                                            updateComponent(
                                              caseKey,
                                              idx,
                                              "dropdownEditIdx",
                                              -1
                                            );
                                          }}
                                          disabled={
                                            !draft.title?.trim() ||
                                            !draft.metadata?.trim()
                                          }
                                        />
                                        <UniversalButton
                                          label="Cancel"
                                          onClick={() => {
                                            updateComponent(
                                              caseKey,
                                              idx,
                                              "draftDropdown",
                                              null
                                            );
                                            updateComponent(
                                              caseKey,
                                              idx,
                                              "dropdownEditIdx",
                                              -1
                                            );
                                          }}
                                        />
                                      </Box>
                                    </div>
                                  ) : (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Box
                                        sx={{ flexGrow: 1, cursor: "pointer" }}
                                        onClick={() => {
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "dropdownEditIdx",
                                            optionIdx
                                          );
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "draftDropdown",
                                            opt
                                          );
                                        }}
                                      >
                                        <Typography variant="subtitle1">
                                          {opt.title}
                                        </Typography>
                                        {opt.description && (
                                          <Typography variant="body2">
                                            {opt.description}
                                          </Typography>
                                        )}
                                      </Box>
                                      <IconButton
                                        onClick={() => {
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "dropdownEditIdx",
                                            optionIdx
                                          );
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "draftDropdown",
                                            opt
                                          );
                                        }}
                                      >
                                        <EditIcon fontSize="small" />
                                      </IconButton>
                                      <IconButton
                                        onClick={() => {
                                          const updated = [
                                            ...(comp.dropdownOptions || []),
                                          ];
                                          updated.splice(optionIdx, 1);
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "dropdownOptions",
                                            updated
                                          );
                                        }}
                                      >
                                        <CloseIcon fontSize="small" />
                                      </IconButton>
                                    </Box>
                                  )}
                                </Box>
                              );
                            }
                          )}

                          {/* Add & Save Buttons */}
                          <div className="flex justify-center items-center gap-2 mt-2">
                            <UniversalButton
                              label="Add Option"
                              onClick={() => {
                                const updated = [
                                  ...(comp.dropdownOptions || []),
                                ];
                                updated.push({
                                  title: "",
                                  description: "",
                                  metadata: "",
                                  image: "",
                                });

                                updateComponent(
                                  caseKey,
                                  idx,
                                  "dropdownOptions",
                                  updated
                                );
                                updateComponent(
                                  caseKey,
                                  idx,
                                  "dropdownEditIdx",
                                  updated.length - 1
                                );
                                updateComponent(caseKey, idx, "draftDropdown", {
                                  title: "",
                                  description: "",
                                  metadata: "",
                                  image: "",
                                });
                              }}
                              disabled={comp.dropdownOptions?.length >= 200}
                            />
                          </div>
                        </div>
                      )}

                      {comp.type === "RadioButtonsGroup" && (
                        <FormControl
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <InputField
                            label="Radio Group Label"
                            tooltipContent="Enter Radio Group Label"
                            tooltipPlacement="right"
                            value={comp.label || ""}
                            onChange={(e) =>
                              updateComponent(
                                caseKey,
                                idx,
                                "label",
                                e.target.value
                              )
                            }
                            placeholder="Enter label"
                            fullWidth
                          />

                          <div className="mt-2">
                            <UniversalLabel
                              htmlFor="radio_required"
                              className="text-sm font-medium text-gray-700"
                              tooltipContent="Select an option which required for you."
                              tooltipPlacement="top"
                              text="Required"
                            />
                            <div className="flex items-center gap-2 ">
                              <Switch
                                checked={comp.required || false}
                                onChange={(e) =>
                                  updateComponent(
                                    caseKey,
                                    idx,
                                    "required",
                                    e.target.checked
                                  )
                                }
                              />
                              <span>{comp.required ? "True" : "False"}</span>
                            </div>
                          </div>

                          {(comp.radioButtonOptions || []).map((opt, i) => {
                            const isEditing = comp.radioEditIdx === i;
                            const draft = comp.draftRadio || {};

                            return (
                              <Box
                                key={opt.id}
                                sx={{
                                  mb: 1,
                                  p: 1,
                                  border: "1px solid #ccc",
                                  borderRadius: 1,
                                  bgcolor: isEditing ? "#f5f5f5" : "white",
                                }}
                              >
                                {isEditing ? (
                                  <div className="space-y-3">
                                    <InputField
                                      label="Title"
                                      placeholder="Enter Title"
                                      value={draft.title || ""}
                                      onChange={(e) =>
                                        updateComponent(
                                          caseKey,
                                          idx,
                                          "draftRadio",
                                          {
                                            ...draft,
                                            title: e.target.value,
                                          }
                                        )
                                      }
                                      fullWidth
                                    />
                                    <InputField
                                      label="Description"
                                      placeholder="Enter Description"
                                      value={draft.description || ""}
                                      onChange={(e) =>
                                        updateComponent(
                                          caseKey,
                                          idx,
                                          "draftRadio",
                                          {
                                            ...draft,
                                            description: e.target.value,
                                          }
                                        )
                                      }
                                      fullWidth
                                    />
                                    <InputField
                                      label="Metadata"
                                      placeholder="Enter MetaData"
                                      required
                                      value={draft.metadata || ""}
                                      onChange={(e) =>
                                        updateComponent(
                                          caseKey,
                                          idx,
                                          "draftRadio",
                                          {
                                            ...draft,
                                            metadata: e.target.value,
                                          }
                                        )
                                      }
                                      fullWidth
                                    />

                                    <Box sx={{ display: "flex", mb: 1 }}>
                                      <InputField
                                        label="Upload Image"
                                        type="file"
                                        accept=".png, .jpeg"
                                        tooltipContent="Upload Image"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                              updateComponent(
                                                caseKey,
                                                idx,
                                                "draftRadio",
                                                {
                                                  ...draft,
                                                  image: reader.result,
                                                }
                                              );
                                            };
                                            reader.readAsDataURL(file);
                                          }
                                        }}
                                      />
                                      <IconButton
                                        sx={{ marginTop: 3 }}
                                        onClick={() =>
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "draftRadio",
                                            {
                                              ...draft,
                                              image: "",
                                            }
                                          )
                                        }
                                      >
                                        <DeleteOutlineIcon />
                                      </IconButton>
                                    </Box>

                                    <Box className="flex justify-center gap-2 mt-2">
                                      <UniversalButton
                                        label="Save"
                                        disabled={
                                          !draft.title?.trim() ||
                                          !draft.metadata?.trim()
                                        }
                                        onClick={() => {
                                          const updated = [
                                            ...(comp.radioButtonOptions || []),
                                          ];
                                          updated[i] = draft;
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "radioButtonOptions",
                                            updated
                                          );
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "draftRadio",
                                            null
                                          );
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "radioEditIdx",
                                            -1
                                          );
                                        }}
                                      />
                                      <UniversalButton
                                        label="Cancel"
                                        onClick={() => {
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "draftRadio",
                                            null
                                          );
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "radioEditIdx",
                                            -1
                                          );
                                        }}
                                      />
                                    </Box>
                                  </div>
                                ) : (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Box
                                      sx={{ flexGrow: 1, cursor: "pointer" }}
                                      onClick={() => {
                                        updateComponent(
                                          caseKey,
                                          idx,
                                          "radioEditIdx",
                                          i
                                        );
                                        updateComponent(
                                          caseKey,
                                          idx,
                                          "draftRadio",
                                          opt
                                        );
                                      }}
                                    >
                                      <Typography variant="subtitle1">
                                        {opt.title}
                                      </Typography>
                                      {opt.description && (
                                        <Typography
                                          variant="body2"
                                          color="textSecondary"
                                        >
                                          {opt.description}
                                        </Typography>
                                      )}
                                    </Box>
                                    <IconButton
                                      onClick={() => {
                                        updateComponent(
                                          caseKey,
                                          idx,
                                          "radioEditIdx",
                                          i
                                        );
                                        updateComponent(
                                          caseKey,
                                          idx,
                                          "draftRadio",
                                          opt
                                        );
                                      }}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                    <IconButton
                                      onClick={() => {
                                        const updated = [
                                          ...(comp.radioButtonOptions || []),
                                        ];
                                        updated.splice(i, 1);
                                        updateComponent(
                                          caseKey,
                                          idx,
                                          "radioButtonOptions",
                                          updated
                                        );
                                      }}
                                    >
                                      <CloseIcon />
                                    </IconButton>
                                  </Box>
                                )}
                              </Box>
                            );
                          })}

                          {/* ── Add New Option ── */}
                          <div className="flex flex-row justify-center items-center gap-2 py-1 px-2">
                            <UniversalButton
                              label="Add Option"
                              onClick={() => {
                                const updated = [
                                  ...(comp.radioButtonOptions || []),
                                ];
                                updated.push({
                                  title: "",
                                  description: "",
                                  metadata: "",
                                  image: "",
                                });
                                updateComponent(
                                  caseKey,
                                  idx,
                                  "radioButtonOptions",
                                  updated
                                );
                                updateComponent(
                                  caseKey,
                                  idx,
                                  "radioEditIdx",
                                  updated.length - 1
                                );
                                updateComponent(caseKey, idx, "draftRadio", {
                                  title: "",
                                  description: "",
                                  metadata: "",
                                  image: "",
                                });
                              }}
                            />
                          </div>
                        </FormControl>
                      )}

                      {comp.type === "ChipsSelector" && (
                        <FormControl
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <div className="mt-3 space-y-3 mb-4">
                            <InputField
                              label="Label"
                              placeholder="Enter label"
                              tooltipContent="Enter MainLabel"
                              tooltipPlacement="right"
                              value={comp.label || ""}
                              onChange={(e) =>
                                updateComponent(
                                  caseKey,
                                  idx,
                                  "label",
                                  e.target.value
                                )
                              }
                            />
                            <InputField
                              label="Description"
                              placeholder="Enter Description"
                              tooltipContent="Enter Description for ChipSelector"
                              tooltipPlacement="right"
                              value={comp.description || ""}
                              onChange={(e) =>
                                updateComponent(
                                  caseKey,
                                  idx,
                                  "description",
                                  e.target.value
                                )
                              }
                            />
                            <InputField
                              label="Max-Selection Options In Chip"
                              placeholder="Enter Max-option"
                              tooltipContent="Enter Max-option for ChipSelector"
                              tooltipPlacement="right"
                              type="number"
                              value={comp.maxSelection || ""}
                              onChange={(e) =>
                                updateComponent(
                                  caseKey,
                                  idx,
                                  "maxSelection",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          {/* Render chip options */}
                          {(comp.chipSelectorOptions || []).map((opt, i) => {
                            const isEditing = comp.chipEditIdx === i;
                            const draft = comp.draftChip || {};

                            return (
                              <Box
                                key={opt.id}
                                sx={{
                                  mb: 1,
                                  p: 1,
                                  gap: 3,
                                  border: "1px solid #ddd",
                                  borderRadius: 1,
                                  bgcolor: isEditing ? "#f5f5f5" : "white",
                                }}
                              >
                                {isEditing ? (
                                  <Box sx={{ flexGrow: 1 }}>
                                    <InputField
                                      label="Title"
                                      placeholder="Enter Title"
                                      tooltipContent="Enter Title for ChipSelector"
                                      tooltipPlacement="right"
                                      value={draft.title || ""}
                                      onChange={(e) =>
                                        updateComponent(
                                          caseKey,
                                          idx,
                                          "draftChip",
                                          {
                                            ...draft,
                                            title: e.target.value,
                                          }
                                        )
                                      }
                                    />
                                    <Box
                                      sx={{
                                        display: "flex",
                                        gap: 1,
                                        mt: 2,
                                        justifyContent: "center",
                                      }}
                                    >
                                      <UniversalButton
                                        label="Save Option"
                                        disabled={!draft.title?.trim()}
                                        onClick={() => {
                                          const updated = [
                                            ...(comp.chipSelectorOptions || []),
                                          ];
                                          updated[i] = draft;
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "chipSelectorOptions",
                                            updated
                                          );
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "draftChip",
                                            null
                                          );
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "chipEditIdx",
                                            -1
                                          );
                                        }}
                                      />
                                      <UniversalButton
                                        label="Cancel"
                                        className="p-button-text"
                                        onClick={() => {
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "draftChip",
                                            null
                                          );
                                          updateComponent(
                                            caseKey,
                                            idx,
                                            "chipEditIdx",
                                            -1
                                          );
                                        }}
                                      />
                                    </Box>
                                  </Box>
                                ) : (
                                  <>
                                    <Box
                                      sx={{ flexGrow: 1, cursor: "pointer" }}
                                      onClick={() => {
                                        updateComponent(
                                          caseKey,
                                          idx,
                                          "chipEditIdx",
                                          i
                                        );
                                        updateComponent(
                                          caseKey,
                                          idx,
                                          "draftChip",
                                          opt
                                        );
                                      }}
                                    >
                                      <Typography variant="subtitle1">
                                        {opt.title}
                                      </Typography>
                                    </Box>
                                    <IconButton
                                      onClick={() => {
                                        updateComponent(
                                          caseKey,
                                          idx,
                                          "chipEditIdx",
                                          i
                                        );
                                        updateComponent(
                                          caseKey,
                                          idx,
                                          "draftChip",
                                          opt
                                        );
                                      }}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                      onClick={() => {
                                        const updated = [
                                          ...(comp.chipSelectorOptions || []),
                                        ];
                                        updated.splice(i, 1);
                                        updateComponent(
                                          caseKey,
                                          idx,
                                          "chipSelectorOptions",
                                          updated
                                        );
                                      }}
                                    >
                                      <CloseIcon fontSize="small" />
                                    </IconButton>
                                  </>
                                )}
                              </Box>
                            );
                          })}

                          {/* Add + Save buttons */}
                          <div className="flex justify-center items-center gap-2 mt-3">
                            <UniversalButton
                              label="Add Option"
                              onClick={() => {
                                const updated = [
                                  ...(comp.chipSelectorOptions || []),
                                ];
                                const newOption = { id: Date.now(), title: "" };
                                updated.push(newOption);
                                updateComponent(
                                  caseKey,
                                  idx,
                                  "chipSelectorOptions",
                                  updated
                                );
                                updateComponent(
                                  caseKey,
                                  idx,
                                  "chipEditIdx",
                                  updated.length - 1
                                );
                                updateComponent(
                                  caseKey,
                                  idx,
                                  "draftChip",
                                  newOption
                                );
                              }}
                              disabled={
                                (comp.chipSelectorOptions || []).length >= 200
                              }
                            />
                          </div>
                        </FormControl>
                      )}

                      {comp.type === "Footer" && (
                        <div className="mb-2 text-lg space-y-3 mt-3">
                          <InputField
                            label="Footer Button Label"
                            placeholder="Enter Footer Button Label"
                            tooltipContent="Enter Label"
                            tooltipPlacement="right"
                            value={comp.label}
                            onChange={(e) =>
                              updateComponent(
                                caseKey,
                                idx,
                                "label",
                                e.target.value
                              )
                            }
                          />

                          <InputField
                            label="Left Caption"
                            placeholder="Enter Left Caption"
                            id="left-caption"
                            tooltipContent="Enter Left Caption"
                            tooltipPlacement="right"
                            value={comp.leftCaption}
                            onChange={(e) =>
                              updateComponent(
                                caseKey,
                                idx,
                                "leftCaption",
                                e.target.value
                              )
                            }
                          />

                          <InputField
                            label="Right Caption"
                            placeholder="Enter Right Caption"
                            tooltipContent="Enter Right Caption"
                            tooltipPlacement="right"
                            value={comp.rightCaption}
                            onChange={(e) =>
                              updateComponent(
                                caseKey,
                                idx,
                                "rightCaption",
                                e.target.value
                              )
                            }
                          />

                          <InputField
                            label="Center Caption"
                            placeholder="Enter Center Caption"
                            tooltipContent="Enter Center Caption"
                            tooltipPlacement="right"
                            value={comp.centerCaption}
                            onChange={(e) =>
                              updateComponent(
                                caseKey,
                                idx,
                                "centerCaption",
                                e.target.value
                              )
                            }
                          />

                          <AnimatedDropdown
                            label="Next Action"
                            tooltipContent="Select Option"
                            tooltipPlacement="right"
                            options={[
                              { value: "complete", label: "Complete" },
                              { value: "navigate", label: "Navigate" },
                            ]}
                            value={comp.nextAction}
                            onChange={(val) =>
                              updateComponent(caseKey, idx, "nextAction", val)
                            }
                          />
                        </div>
                      )}

                      {comp.type === "Image" && (
                        <div className="mt-3 space-y-3">
                          <div className="flex justify-center">
                            <InputField
                              label="Upload Image"
                              type="file"
                              id="file-upload"
                              accept=".png, .jpeg"
                              tooltipContent="Upload Image"
                              tooltipPlacement="right"
                              required={true}
                              value={comp.src || ""}
                              onChange={(e) =>
                                updateComponent(
                                  caseKey,
                                  idx,
                                  "src",
                                  e.target.value
                                )
                              }
                            />

                            <IconButton
                              sx={{ marginTop: 3 }}
                              onClick={() =>
                                updateComponent(caseKey, idx, "draft", {
                                  ...draft,
                                  image: "",
                                })
                              }
                            >
                              <DeleteOutlineIcon />
                            </IconButton>
                          </div>
                          <AnimatedDropdown
                            label="Scale-Type"
                            tooltipContent="Select Scale-Type"
                            tooltipPlacement="right"
                            value={comp.scaleType}
                            options={[
                              { value: "contain", label: "Contain" },
                              { value: "cover", label: "Cover" },
                            ]}
                            onChange={(val) =>
                              updateComponent(caseKey, idx, "scaleType", val)
                            }
                          />
                          <InputField
                            placeholder="Alt Text"
                            className="w-full p-1 rounded text-black"
                            value={comp.alt || ""}
                            onChange={(e) =>
                              updateComponent(
                                caseKey,
                                idx,
                                "alt",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      )}
                    </div>
                  ))}

                  <UniversalButton
                    label=" + Add Component"
                    onClick={() => addComponent(caseKey)}
                    className="text-blue-300 mt-1"
                  />
                </div>
              ))}

              {showValidationError && (
                <div className="bg-red-600 text-white p-2 rounded mb-4">
                  🚫 Validation Error: The <code>cases</code> property must have
                  at least one case.
                </div>
              )}

              <div className="flex flex-row gap-3">
                <UniversalButton label="Save Cases" onClick={handleCaseSave} />

                <UniversalButton label="Save" onClick={handleSwitchSave} />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
