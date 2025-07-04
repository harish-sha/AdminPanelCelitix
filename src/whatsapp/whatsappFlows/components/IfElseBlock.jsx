import React, { useState, useEffect } from "react";
import AnimatedDropdown from "../../components/AnimatedDropdown";
import UniversalButton from "../../components/UniversalButton";
import { Dialog } from "primereact/dialog";
import { useDispatch } from "react-redux";
import { updateFlowItem } from "../redux/features/FlowSlice";
import InputField from "../../components/InputField";

const componentsOptions = [
  { label: "heading", value: "heading" },
  { label: "subHeading", value: "subHeading" },
  { label: "textBody", value: "textBody" },
  { label: "textCaption", value: "textCaption" },
  { label: "textInput", value: "textInput" },
  { label: "textArea", value: "textArea" },
  { label: "checkBox", value: "checkBox" },
  { label: "radioButton", value: "radioButton" },
  { label: "chipSelector", value: "chipSelector" },
  { label: "dropDown", value: "dropDown" },
  { label: "datePicker", value: "date" },
  { label: "embeddedlink", value: "embeddedlink" },
  { label: "image", value: "image" },
  { label: "optin", value: "optin" },
  { label: "switch", value: "switch" },
  { label: "ifelse", value: "ifelse" },
  { label: "footer", value: "footerbutton" },
];

const conditionOptions = [
  { label: "Equal to", value: "==" },
  { label: "Not equal to", value: "!=" },
  { label: "AND", value: "&&" },
  { label: "OR", value: "||" },
  { label: "NOT", value: "!" },
];

// const IfElseBlock = ({
//   level = 1,
//   maxLevel = 3,
//   path = ["root"],
//   onUpdateTree = () => { },
//   handleIfElseSave,
//   selectedCondition,
//   setSelectedCondition,
//   selectedThenComponent,
//   setSelectedThenComponent,
//   selectedElseComponent,
//   setSelectedElseComponent
// }) => {
//   // const [selectedThenComponent, setSelectedThenComponent] = useState("");
//   // const [selectedElseComponent, setSelectedElseComponent] = useState("");
//   const [showNestedThen, setShowNestedThen] = useState(false);
//   const [showNestedElse, setShowNestedElse] = useState(false);

//   console.log("selectedThenComponent", selectedThenComponent)
//   console.log("selectedElseComponent", selectedElseComponent)

//   // Update the tree whenever selections change
//   useEffect(() => {
//     onUpdateTree(path, {
//       condition: selectedCondition,
//       then: selectedThenComponent,
//       else: selectedElseComponent,
//     });
//   }, [selectedCondition, selectedThenComponent, selectedElseComponent]);

//   const filteredOptions =
//     level === maxLevel
//       ? componentsOptions.filter((opt) => opt.value !== "ifelse")
//       : componentsOptions;

//   return (
//     <div className="border rounded p-4 mt-4 bg-gray-50 shadow-md space-y-4">
//       <p className="text-sm font-bold text-gray-700">If/Else Block - Level {level}</p>

//       {/* Condition Dropdown */}
//       <AnimatedDropdown
//         label="If-Condition"
//         tooltipContent="Select If-Condition"
//         tooltipPlacement="right"
//         value={selectedCondition}
//         options={conditionOptions}
//         onChange={setSelectedCondition}
//       />

//       {/* THEN Branch */}
//       <div>
//         <AnimatedDropdown
//           label="Then Branch Component"
//           tooltipContent="Select Then Branch"
//           tooltipPlacement="right"
//           value={selectedThenComponent}
//           options={filteredOptions}
//           onChange={(val) => {
//             setSelectedThenComponent(val);
//             setShowNestedThen(val === "ifelse");
//           }}
//         />

//         {selectedThenComponent === "ifelse" && showNestedThen && level < maxLevel && (
//           <div className="ml-6 mt-2 border-l-2 pl-4 border-gray-300 relative">
//             <button
//               className="absolute top-0 right-0 text-xs text-red-600 underline"
//               onClick={() => {
//                 setShowNestedThen(false);
//                 setSelectedThenComponent("");
//               }}
//             >
//               <CloseIcon fontSize="small" />
//             </button>
//             <IfElseBlock
//               level={level + 1}
//               maxLevel={maxLevel}
//               path={[...path, "then"]}
//               onUpdateTree={onUpdateTree}
//               handleIfElseSave={handleIfElseSave}
//             />
//           </div>
//         )}
//       </div>

//       {/* ELSE Branch */}
//       <div>
//         <AnimatedDropdown
//           label="Else Branch Component"
//           tooltipContent="Select Else Branch"
//           tooltipPlacement="right"
//           value={selectedElseComponent}
//           options={filteredOptions}
//           onChange={(val) => {
//             setSelectedElseComponent(val);
//             setShowNestedElse(val === "ifelse");
//           }}
//         />

//         {selectedElseComponent === "ifelse" && showNestedElse && level < maxLevel && (
//           <div className="ml-6 mt-2 border-l-2 pl-4 border-gray-300 relative">
//             <button
//               className="absolute top-0 right-0 text-xs text-red-600 underline"
//               onClick={() => {
//                 setShowNestedElse(false);
//                 setSelectedElseComponent("");
//               }}
//             >
//               <CloseIcon fontSize="small" />
//             </button>
//             <IfElseBlock
//               level={level + 1}
//               maxLevel={maxLevel}
//               path={[...path, "else"]}
//               onUpdateTree={onUpdateTree}
//               handleIfElseSave={handleIfElseSave}
//             />
//           </div>
//         )}
//       </div>

//       {/* Save Button - only for level 1 */}
//       {level === 1 && (
//         <div className="flex justify-center pt-2">
//           <UniversalButton label="Save" onClick={handleIfElseSave} />
//         </div>
//       )}
//     </div>
//   );
// };

const IfElseBlock = ({ openIfElse, setOpenIfElse, onSave, selectedItem }) => {
  console.log("selectedItem", selectedItem);
  const [selectedCondition, setSelectedCondition] = useState();
  const [selectedThenComponent, setSelectedThenComponent] = useState();
  const [selectedElseComponent, setSelectedElseComponent] = useState();
  const [value, setValue] = useState("");
  const [condition, setCondition] = useState();
  const [thenComponents, setThenComponents] = useState();
  const [elseComponents, setElseComponents] = useState();
  const [componentTree, setComponentTree] = useState({});
  const [thenBranchText, setThenBranchText] = useState("");
  const [elseBranchText, setElseBranchText] = useState("");
  // const [thenBranchText, setThenBranchText] = useState("");
  // const [elseBranchText, setElseBranchText] = useState("");
  const [thenInputLabel, setThenInputLabel] = useState("");
  const [thenInputType, setThenInputType] = useState("");
  const [thenInputPlaceholder, setThenInputPlaceholder] = useState("");
  const [thenInputError, setThenInputError] = useState("");
  const [thenMinLength, setThenMinLength] = useState("");
  const [thenMaxLength, setThenMaxLength] = useState("");
  const [thenIsRequired, setThenIsRequired] = useState(false);

  const dispatch = useDispatch();

  const handleIfElseSave = () => {
    if (!selectedCondition) {
      toast.error("Please Enter condition first");
      return;
    }

    const payload = {
      type: "If",
      condition: selectedCondition,
      then: [
        {
          type: selectedThenComponent,
          text: "It is a cat",
        },
      ],
      else: [
        {
          type: selectedElseComponent,
          text: "It is not a cat",
        },
      ],
    };

    const updatedData = {
      ...selectedItem,
      ...payload,
    };

    onSave(updatedData);
    dispatch(
      updateFlowItem({
        id: updatedData.storeId,
        data: {
          status: 1,
        },
      })
    );
    setOpenIfElse(false);
  };

  const allowedComponents = [
    { label: "Heading", value: "heading" },
    { label: "Sub Heading", value: "subHeading" },
    { label: "Text Body", value: "textBody" },
    { label: "Text Caption", value: "textCaption" },
    { label: "Text Input", value: "textInput" },
    { label: "Text Area", value: "textArea" },
    { label: "Checkbox", value: "checkBox" },
    { label: "Dropdown", value: "dropDown" },
    { label: "Date Picker", value: "date" },
    { label: "Embedded Link", value: "embeddedlink" },
    { label: "Image", value: "image" },
    { label: "Opt-in", value: "optin" },
    { label: "Switch", value: "switch" },
    { label: "Footer Button", value: "footerbutton" },
    { label: "If-Else", value: "ifelse" },
  ];

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

  const handleUpdateTree = (path, data) => {
    setComponentTree((prev) => {
      const updated = { ...prev };
      let node = updated;

      path.forEach((key, index) => {
        if (!node[key]) node[key] = {};
        if (index === path.length - 1) {
          node[key] = data;
        } else {
          node = node[key];
        }
      });

      return { ...updated };
    });
  };

  return (
    <>
      <Dialog
        visible={openIfElse}
        onHide={() => setOpenIfElse(false)}
        style={{ width: "80rem", height: "50rem" }}
        draggable={false}
        header={"IF Else Component"}
      >
        <div className="">
          <div className="flex items-center justify-center gap-2 w-full">
            <div className="w-3/1">
              <AnimatedDropdown
                label="Condition"
                tooltipContent="Select If-Condition"
                tooltipPlacement="right"
                value={selectedCondition}
                options={[
                  { label: "Equal to (==)", value: "==" },
                  { label: "Not equal to (!=)", value: "!=" },
                  { label: "AND (&&)", value: "&&" },
                  { label: "OR (||)", value: "||" },
                  { label: "Greater than (>)", value: ">" },
                  { label: "Greater than or equal to (>=)", value: ">=" },
                  { label: "Less than (<)", value: "<" },
                  { label: "Less than or equal to (<=)", value: "<=" },
                ]}
                onChange={(value) => setSelectedCondition(value)}
              />
            </div>
            <div className="w-3/1">
              <AnimatedDropdown
                label="Add Component to Then Branch"
                tooltipContent="Select Then Branch"
                tooltipPlacement="right"
                value={selectedThenComponent}
                options={allowedComponents}
                // onChange={(value) => setSelectedThenComponent(value)}
                onChange={(value) => {
                  setSelectedThenComponent(value);
                  // if (value === "ifelse") {
                  //   setNestedIf(true); // ✅ Set your flag here
                  // } else {
                  //   setNestedIf(false); // optionally reset
                  // }
                }}
              />
            </div>

            <div className="w-3/1">
              <AnimatedDropdown
                label="Add Component to Else Branch"
                tooltipContent="Select Else Branch"
                tooltipPlacement="right"
                value={selectedElseComponent}
                options={allowedComponents}
                onChange={(value) => {
                  setSelectedElseComponent(value);
                  // if (value === "ifelse") {
                  //   setNestedElse(true); // ✅ Set your flag here
                  // } else {
                  //   setNestedElse(false); // optionally reset
                  // }
                }}
              />
            </div>
            <div className="flex justify-center mt-6">
              <UniversalButton label="Save" onClick={handleIfElseSave} />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4">If-Else Overview</h2>
            <p>{selectedCondition}</p>
            <p className="my-2">{selectedThenComponent}</p>
            {["heading", "subHeading", "textBody", "textCaption"].includes(
              selectedThenComponent
            ) && (
              <div className="mt-3 w-1/2">
                <InputField
                  placeholder="Then branch text"
                  className="w-full p-1 rounded text-black"
                  value={thenBranchText}
                  onChange={(e) => setThenBranchText(e.target.value)}
                />
              </div>
            )}

            {["textInput"].includes(selectedThenComponent) && (
              <div className="mt-3 space-y-3">
                <InputField
                  label="Input Label"
                  placeholder="Enter input label"
                  tooltipContent="Enter input label"
                  tooltipPlacement="right"
                  className="w-full p-1 rounded text-black"
                  value={thenInputLabel}
                  onChange={(e) => setThenInputLabel(e.target.value)}
                />
                <AnimatedDropdown
                  label="Select Input Type"
                  tooltipContent="Select input type (select text for default)"
                  tooltipPlacement="right"
                  // options={OptionsTypeOptions}
                  value={thenInputType}
                  onChange={(val) => setThenInputType(val)}
                  placeholder="Select Type"
                />
                <InputField
                  label="Helper Text"
                  type="text"
                  placeholder="Enter helper text"
                  tooltipContent="Enter helper text"
                  tooltipPlacement="right"
                  value={thenInputPlaceholder}
                  onChange={(e) => setThenInputPlaceholder(e.target.value)}
                />
                <InputField
                  label="Error Message"
                  placeholder="Enter error message"
                  tooltipContent="Enter error message"
                  tooltipPlacement="right"
                  value={thenInputError}
                  onChange={(e) => setThenInputError(e.target.value)}
                />
                <div className="flex gap-2">
                  <InputField
                    label="Min Length"
                    type="number"
                    placeholder="Min Length"
                    tooltipContent="Enter minimum length"
                    tooltipPlacement="right"
                    value={thenMinLength}
                    onChange={(e) => setThenMinLength(e.target.value)}
                  />
                  <InputField
                    label="Max Length"
                    type="number"
                    placeholder="Max Length"
                    tooltipContent="Enter maximum length"
                    tooltipPlacement="right"
                    value={thenMaxLength}
                    onChange={(e) => setThenMaxLength(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <UniversalLabel
                    htmlFor="required"
                    className="text-sm font-medium text-gray-700"
                    text="Required?"
                    tooltipContent="Set required field for TextInput"
                    tooltipPlacement="top"
                  />
                </div>
              </div>
            )}

            <p className="my-2">{selectedElseComponent}</p>
            {["heading", "subHeading", "textBody", "textCaption"].includes(
              selectedElseComponent
            ) && (
              <div className="mt-3 w-1/2">
                <InputField
                  placeholder="Else branch text"
                  className="w-full p-1 rounded text-black"
                  value={elseBranchText}
                  onChange={(e) => setElseBranchText(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default IfElseBlock;
