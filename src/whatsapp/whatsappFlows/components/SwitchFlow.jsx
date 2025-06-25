import React, { useState } from "react";
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

export default function SwitchFlow({ selectedItem, onSave }) {
  const [variableName, setVariableName] = useState("");
  const [exampleValue, setExampleValue] = useState("");
  const [cases, setCases] = useState({});
  const [switchComponents, setSwitchComponents] = useState([]);
  const [showValidationError, setShowValidationError] = useState(false);

  // TextInput
  const OptionsTypeOptions = [
    { value: "text", label: "Text" },
    { value: "number", label: "Number" },
    { value: "email", label: "Email" },
  ];
  // TextInput

  const [caseKey] = useState(selectedItem?.caseKey);

  const handleSwitchSave = () => {
    const payload = {
    
      cases,

    };

    const updatedItem = {
      ...selectedItem,
      ...payload,
    };

    if (onSave) onSave(updatedItem);

    console.log("✅ Final Switch Payload", updatedItem);
  };

  const addCase = () => {
    const name = prompt("Enter new case key:");
    if (name && !cases[name]) {
      const updatedCases = JSON.parse(JSON.stringify(cases));
      updatedCases[name] = [JSON.parse(JSON.stringify(emptyComponent))];
      setCases(updatedCases);
    }
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
      data: {
        [variableName]: {
          type: "string",
          __example__: exampleValue,
        },
      },
    };
  };

  const isSwitchBlockValid = () => {
    return Object.keys(cases).length > 0;
  };

  return (
    <div className="p-4 bg-gray-50 text-black font-mono h-auto">
      <h2 className="text-xl font-bold mb-4">🔁 Switch Case</h2>

      {/* <div className="mb-4 space-y-2">
        <label>Variable Name:</label>
        <input
          className="text-black p-1 rounded w-full"
          value={variableName}
          onChange={(e) => setVariableName(e.target.value)}
        />
        <label>Example Value:</label>
        <input
          className="text-black p-1 rounded w-full"
          value={exampleValue}
          onChange={(e) => setExampleValue(e.target.value)}
        />
      </div> */}

      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg">Cases</h3>
        <UniversalButton
          label=" + Add Case"
          onClick={addCase}
          className="bg-blue-500 px-2 py-1 rounded text-sm"
        />
      </div>

      {Object.entries(cases).map(([caseKey, comps], ci) => (
        <div key={ci} className="mb-4 border border-gray-600 p-3 rounded">
          <h4 className="font-semibold text-green-300 mb-2">
            Case: "{caseKey}"
          </h4>

          {comps.map((comp, idx) => (
            <div key={idx} className="mb-2 bg-gray-50 p-2 rounded space-y-1">
              <div className="flex gap-2 items-center">
                <label>Type:</label>
                <AnimatedDropdown
                  value={comp?.type || ""}
                  onChange={(val) => updateComponent(caseKey, idx, "type", val)}
                  options={allowedTypes.map((t) => ({ label: t, value: t }))}
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
                        updateComponent(caseKey, idx, "text", e.target.value)
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
                      updateComponent(caseKey, idx, "label", e.target.value)
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
                      updateComponent(caseKey, idx, "error", e.target.value)
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
                        updateComponent(caseKey, idx, "min", e.target.value)
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
                        updateComponent(caseKey, idx, "max", e.target.value)
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
                      updateComponent(caseKey, idx, "label", e.target.value)
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
                      updateComponent(caseKey, idx, "error", e.target.value)
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
                      updateComponent(caseKey, idx, "label", e.target.value)
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
                                updateComponent(caseKey, idx, "draftCheckbox", {
                                  ...draft,
                                  title: e.target.value,
                                })
                              }
                            />
                            <InputField
                              label="Description"
                              placeholder="Enter Description"
                              tooltipContent="Enter Description"
                              value={draft.description || ""}
                              onChange={(e) =>
                                updateComponent(caseKey, idx, "draftCheckbox", {
                                  ...draft,
                                  description: e.target.value,
                                })
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
                                updateComponent(caseKey, idx, "draftCheckbox", {
                                  ...draft,
                                  metadata: e.target.value,
                                })
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
                        const updated = [...(comp.checkboxOptions || [])];
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
                      updateComponent(caseKey, idx, "label", e.target.value)
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
                        updateComponent(caseKey, idx, "unavailableDates", [
                          ...current,
                          value,
                        ]);
                      }
                    }}
                    disabled={!comp.minDate || !comp.maxDate}
                  />

                  {/* Render Unavailable Dates */}
                  <div className="flex flex-wrap gap-2 mt-2 ">
                    {(comp.unavailableDates || []).map((date, index) => (
                      <Chip
                        sx={{ padding: 1 }}
                        key={index}
                        label={new Date(date).toLocaleDateString()}
                        onDelete={() => {
                          const updated = comp.unavailableDates.filter(
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
                    ))}
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
                      updateComponent(caseKey, idx, "label", e.target.value)
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
                  {(comp.dropdownOptions || []).map((opt, optionIdx) => {
                    const isEditing = comp.dropdownEditIdx === optionIdx;
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
                                updateComponent(caseKey, idx, "draftDropdown", {
                                  ...draft,
                                  title: e.target.value,
                                })
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
                                updateComponent(caseKey, idx, "draftDropdown", {
                                  ...draft,
                                  description: e.target.value,
                                })
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
                                updateComponent(caseKey, idx, "draftDropdown", {
                                  ...draft,
                                  metadata: e.target.value,
                                })
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
                  })}

                  {/* Add & Save Buttons */}
                  <div className="flex justify-center items-center gap-2 mt-2">
                    <UniversalButton
                      label="Add Option"
                      onClick={() => {
                        const updated = [...(comp.dropdownOptions || [])];
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
                <FormControl sx={{ display: "flex", justifyContent: "center" }}>
                  <InputField
                    label="Radio Group Label"
                    tooltipContent="Enter Radio Group Label"
                    tooltipPlacement="right"
                    value={comp.label || ""}
                    onChange={(e) =>
                      updateComponent(caseKey, idx, "label", e.target.value)
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
                                updateComponent(caseKey, idx, "draftRadio", {
                                  ...draft,
                                  title: e.target.value,
                                })
                              }
                              fullWidth
                            />
                            <InputField
                              label="Description"
                              placeholder="Enter Description"
                              value={draft.description || ""}
                              onChange={(e) =>
                                updateComponent(caseKey, idx, "draftRadio", {
                                  ...draft,
                                  description: e.target.value,
                                })
                              }
                              fullWidth
                            />
                            <InputField
                              label="Metadata"
                              placeholder="Enter MetaData"
                              required
                              value={draft.metadata || ""}
                              onChange={(e) =>
                                updateComponent(caseKey, idx, "draftRadio", {
                                  ...draft,
                                  metadata: e.target.value,
                                })
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
                                  updateComponent(caseKey, idx, "draftRadio", {
                                    ...draft,
                                    image: "",
                                  })
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
                        const updated = [...(comp.radioButtonOptions || [])];
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
                <FormControl sx={{ display: "flex", justifyContent: "center" }}>
                  <div className="mt-3 space-y-3 mb-4">
                    <InputField
                      label="Label"
                      placeholder="Enter label"
                      tooltipContent="Enter MainLabel"
                      tooltipPlacement="right"
                      value={comp.label || ""}
                      onChange={(e) =>
                        updateComponent(caseKey, idx, "label", e.target.value)
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
                                updateComponent(caseKey, idx, "draftChip", {
                                  ...draft,
                                  title: e.target.value,
                                })
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
                                updateComponent(caseKey, idx, "chipEditIdx", i);
                                updateComponent(caseKey, idx, "draftChip", opt);
                              }}
                            >
                              <Typography variant="subtitle1">
                                {opt.title}
                              </Typography>
                            </Box>
                            <IconButton
                              onClick={() => {
                                updateComponent(caseKey, idx, "chipEditIdx", i);
                                updateComponent(caseKey, idx, "draftChip", opt);
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
                        const updated = [...(comp.chipSelectorOptions || [])];
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
                        updateComponent(caseKey, idx, "draftChip", newOption);
                      }}
                      disabled={(comp.chipSelectorOptions || []).length >= 200}
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
                      updateComponent(caseKey, idx, "label", e.target.value)
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
                        updateComponent(caseKey, idx, "src", e.target.value)
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
                      updateComponent(caseKey, idx, "alt", e.target.value)
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
          🚫 Validation Error: The <code>cases</code> property must have at
          least one case.
        </div>
      )}

      <UniversalButton
        label="Save"
        onClick={handleSwitchSave}
      />
    </div>
  );
}
