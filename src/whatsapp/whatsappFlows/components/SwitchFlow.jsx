import React, { useState } from "react";
import UniversalButton from "../../components/UniversalButton";
import AnimatedDropdown from "../../components/AnimatedDropdown";
import InputField from "../../components/InputField";

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

export default function SwitchFlow() {
  const [variableName, setVariableName] = useState("");
  const [exampleValue, setExampleValue] = useState("");
  const [cases, setCases] = useState({});
  const [showValidationError, setShowValidationError] = useState(false);

  const addCase = () => {
    const name = prompt("Enter case key (e.g., one):");
    if (name && !cases[name]) {
      setCases({ ...cases, [name]: [emptyComponent] });
    }
  };

  const addComponent = (caseKey) => {
    const updated = { ...cases };
    updated[caseKey].push({ ...emptyComponent });
    setCases(updated);
  };

  const removeComponent = (caseKey, idx) => {
    const updated = { ...cases };
    updated[caseKey].splice(idx, 1);
    setCases(updated);
  };

  const updateComponent = (caseKey, idx, field, value) => {
    const updated = { ...cases };
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
    <div className="p-4 bg-gray-50 text-black font-mono min-h-screen">
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
                {/* <AnimatedDropdown
                  value={comp.type}
                  onChange={(e) =>
                    updateComponent(caseKey, idx, "type", e.target.value)
                  }
                  className="text-black p-1 rounded"
                />
                  {allowedTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))} */}
                {/* </select> */}
                {/* <button
                  onClick={() => removeComponent(caseKey, idx)}
                  className="text-red-400"
                >
                  ✕
                </button> */}

                <AnimatedDropdown
                  value={
                    allowedTypes
                      .map((t) => ({ label: t, value: t }))
                      .find((o) => o.value === comp.type) || null
                  }
                  onChange={(e) => {
                    if (e) {
                      updateComponent(caseKey, idx, "type", e.value);
                    }
                  }}
                  options={allowedTypes.map((t) => ({ label: t, value: t }))}
                  className="text-black p-1 rounded"
                />
              </div>

              {[
                "TextHeading",
                "TextBody",
                "TextSubheading",
                "TextCaption",
                "Footer",
              ].includes(comp.type) && (
                <InputField
                  placeholder="Text"
                  className="w-full p-1 rounded text-black"
                  value={comp.text || ""}
                  onChange={(e) =>
                    updateComponent(caseKey, idx, "text", e.target.value)
                  }
                />
              )}

              {["TextInput", "TextArea"].includes(comp.type) && (
                <>
                  <InputField
                    placeholder="Label"
                    className="w-full p-1 rounded text-black"
                    value={comp.label || ""}
                    onChange={(e) =>
                      updateComponent(caseKey, idx, "label", e.target.value)
                    }
                  />
                  <InputField
                    placeholder="Placeholder"
                    className="w-full p-1 rounded text-black"
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
                </>
              )}

              {comp.type === "Image" && (
                <>
                  <input
                    placeholder="Image URL"
                    className="w-full p-1 rounded text-black"
                    value={comp.src || ""}
                    onChange={(e) =>
                      updateComponent(caseKey, idx, "src", e.target.value)
                    }
                  />
                  <input
                    placeholder="Alt Text"
                    className="w-full p-1 rounded text-black"
                    value={comp.alt || ""}
                    onChange={(e) =>
                      updateComponent(caseKey, idx, "alt", e.target.value)
                    }
                  />
                </>
              )}
            </div>
          ))}

          <button
            onClick={() => addComponent(caseKey)}
            className="text-blue-300 mt-1"
          >
            + Add Component
          </button>
        </div>
      ))}

      {showValidationError && (
        <div className="bg-red-600 text-white p-2 rounded mb-4">
          🚫 Validation Error: The <code>cases</code> property must have at
          least one case.
        </div>
      )}

      {/* <div className="mt-6">
        <h3 className="text-lg mb-2">🧾 Output JSON</h3>
        <pre className="bg-black text-green-400 p-4 rounded max-h-[400px] overflow-auto">
          {JSON.stringify(getSchema(), null, 2)}
        </pre>

         <button
          onClick={() => {
            if (!isSwitchBlockValid()) {
              setShowValidationError(true);
            } else {
              setShowValidationError(false);
              const blob = new Blob([
                JSON.stringify(getSchema(), null, 2)
              ], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = "switch-flow.json";
              link.click();
            }
          }}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          💾 Download JSON
        </button> 
      </div> */}
    </div>
  );
}
