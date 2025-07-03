// // IfElseBlock.jsx
// import React, { useState } from "react";
// import AnimatedDropdown from "../../components/AnimatedDropdown"; // assuming
// import UniversalButton from "../../components/UniversalButton"; // assuming

// const componentsOptions = [
//   { label: "heading", value: "heading" },
//   { label: "subHeading", value: "subHeading" },
//   { label: "textBody", value: "textBody" },
//   { label: "textCaption", value: "textCaption" },
//   { label: "textInput", value: "textInput" },
//   { label: "textArea", value: "textArea" },
//   { label: "checkBox", value: "checkBox" },
//   { label: "radioButton", value: "radioButton" },
//   { label: "chipSelector", value: "chipSelector" },
//   { label: "dropDown", value: "dropDown" },
//   { label: "datePicker", value: "date" },
//   { label: "embeddedlink", value: "embeddedlink" },
//   { label: "image", value: "image" },
//   { label: "optin", value: "optin" },
//   { label: "switch", value: "switch" },
//   { label: "ifelse", value: "ifelse" },
//   { label: "footer", value: "footerbutton" },
// ];

// const conditionOptions = [
//   { label: "Equal to", value: "==" },
//   { label: "Not equal to", value: "!=" },
//   { label: "AND", value: "&&" },
//   { label: "OR", value: "||" },
//   { label: "NOT", value: "!" },
// ];

// const IfElseBlock = ({
//   level = 1,
//   maxLevel = 3,
//   handleIfElseSave
// }) => {
//   const [selectedCondition, setSelectedCondition] = useState("");
//   const [selectedThenComponent, setSelectedThenComponent] = useState("");
//   const [selectedElseComponent, setSelectedElseComponent] = useState("");

//   return (
//     <div className="border rounded p-4 mt-4 bg-gray-50 shadow-sm">
//       <p className="text-sm font-semibold">Level {level}</p>

//       <div className="mt-4">
//         <AnimatedDropdown
//           label="If-Condition"
//           tooltipContent="Select If-Condition"
//           tooltipPlacement="right"
//           value={selectedCondition}
//           options={conditionOptions}
//           onChange={setSelectedCondition}
//         />
//       </div>

//       <div className="mt-4">
//         <AnimatedDropdown
//           label="Add Component to Then Branch"
//           tooltipContent="Select Then Branch"
//           tooltipPlacement="right"
//           value={selectedThenComponent}
//           options={componentsOptions}
//           onChange={(value) => setSelectedThenComponent(value)}
//         />
//         {selectedThenComponent === "ifelse" && level < maxLevel && (
//           <IfElseBlock level={level + 1} maxLevel={maxLevel} />
//         )}
//       </div>

//       <div className="mt-4">
//         <AnimatedDropdown
//           label="Add Component to Else Branch"
//           tooltipContent="Select Else Branch"
//           tooltipPlacement="right"
//           value={selectedElseComponent}
//           options={componentsOptions}
//           onChange={(value) => setSelectedElseComponent(value)}
//         />
//         {selectedElseComponent === "ifelse" && level < maxLevel && (
//           <IfElseBlock level={level + 1} maxLevel={maxLevel} />
//         )}
//       </div>

//       <div className="flex justify-center mt-4">
//         <UniversalButton label="Save" onClick={handleIfElseSave} />
//       </div>
//     </div>
//   );
// };

// export default IfElseBlock;

// import React, { useState } from "react";
// import AnimatedDropdown from "../../components/AnimatedDropdown";
// import UniversalButton from "../../components/UniversalButton";
// import CloseIcon from '@mui/icons-material/Close';

// const componentsOptions = [
//   { label: "heading", value: "heading" },
//   { label: "subHeading", value: "subHeading" },
//   { label: "textBody", value: "textBody" },
//   { label: "textCaption", value: "textCaption" },
//   { label: "textInput", value: "textInput" },
//   { label: "textArea", value: "textArea" },
//   { label: "checkBox", value: "checkBox" },
//   { label: "radioButton", value: "radioButton" },
//   { label: "chipSelector", value: "chipSelector" },
//   { label: "dropDown", value: "dropDown" },
//   { label: "datePicker", value: "date" },
//   { label: "embeddedlink", value: "embeddedlink" },
//   { label: "image", value: "image" },
//   { label: "optin", value: "optin" },
//   { label: "switch", value: "switch" },
//   { label: "ifelse", value: "ifelse" },
//   { label: "footer", value: "footerbutton" },
// ];

// const conditionOptions = [
//   { label: "Equal to", value: "==" },
//   { label: "Not equal to", value: "!=" },
//   { label: "AND", value: "&&" },
//   { label: "OR", value: "||" },
//   { label: "NOT", value: "!" },
// ];

// const IfElseBlock = ({
//   level = 1,
//   maxLevel = 3,
//   handleIfElseSave
// }) => {
//   const [selectedCondition, setSelectedCondition] = useState("");
//   const [selectedThenComponent, setSelectedThenComponent] = useState("");
//   const [selectedElseComponent, setSelectedElseComponent] = useState("");
//   const [showNestedThen, setShowNestedThen] = useState(false);
//   const [showNestedElse, setShowNestedElse] = useState(false);

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
//           options={
//             level === maxLevel
//               ? componentsOptions.filter((opt) => opt.value !== "ifelse")
//               : componentsOptions
//           }
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
//               <CloseIcon/>
//             </button>
//             <IfElseBlock
//               level={level + 1}
//               maxLevel={maxLevel}
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
//           options={
//             level === maxLevel
//             ? componentsOptions.filter((opt) => opt.value !== "ifelse")
//             : componentsOptions
//           }
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
//               <CloseIcon/>
//             </button>
//             <IfElseBlock
//               level={level + 1}
//               maxLevel={maxLevel}
//               handleIfElseSave={handleIfElseSave}
//             />
//           </div>
//         )}
//       </div>

//       {/* Save Button */}
//       {level === 1 && (
//         <div className="flex justify-center pt-2">
//         <UniversalButton
//           label="Save"
//           onClick={() => handleIfElseSave()}
//         />
//       </div>
//       )}

//     </div>
//   );
// };

// export default IfElseBlock;

import React, { useState, useEffect } from "react";
import AnimatedDropdown from "../../components/AnimatedDropdown";
import UniversalButton from "../../components/UniversalButton";
import CloseIcon from "@mui/icons-material/Close";

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

const IfElseBlock = ({
  level = 1,
  maxLevel = 3,
  path = ["root"],
  onUpdateTree = () => {},
  handleIfElseSave,
  selectedCondition,
  setSelectedCondition,
  selectedThenComponent,
  setSelectedThenComponent,
  selectedElseComponent,
  setSelectedElseComponent,
}) => {
  // const [selectedThenComponent, setSelectedThenComponent] = useState("");
  // const [selectedElseComponent, setSelectedElseComponent] = useState("");
  const [showNestedThen, setShowNestedThen] = useState(false);
  const [showNestedElse, setShowNestedElse] = useState(false);

  console.log("selectedThenComponent", selectedThenComponent);
  console.log("selectedElseComponent", selectedElseComponent);

  // Update the tree whenever selections change
  useEffect(() => {
    onUpdateTree(path, {
      condition: selectedCondition,
      then: selectedThenComponent,
      else: selectedElseComponent,
    });
  }, [selectedCondition, selectedThenComponent, selectedElseComponent]);

  const filteredOptions =
    level === maxLevel
      ? componentsOptions.filter((opt) => opt.value !== "ifelse")
      : componentsOptions;

  return (
    <div className="border rounded p-4 mt-4 bg-gray-50 shadow-md space-y-4">
      <p className="text-sm font-bold text-gray-700">
        If/Else Block - Level {level}
      </p>

      {/* Condition Dropdown */}
      <AnimatedDropdown
        label="If-Condition"
        tooltipContent="Select If-Condition"
        tooltipPlacement="right"
        value={selectedCondition}
        options={conditionOptions}
        onChange={setSelectedCondition}
      />

      {/* THEN Branch */}
      <div>
        <AnimatedDropdown
          label="Then Branch Component"
          tooltipContent="Select Then Branch"
          tooltipPlacement="right"
          value={selectedThenComponent}
          options={filteredOptions}
          onChange={(val) => {
            setSelectedThenComponent(val);
            setShowNestedThen(val === "ifelse");
          }}
        />

        {selectedThenComponent === "ifelse" &&
          showNestedThen &&
          level < maxLevel && (
            <div className="ml-6 mt-2 border-l-2 pl-4 border-gray-300 relative">
              <button
                className="absolute top-0 right-0 text-xs text-red-600 underline"
                onClick={() => {
                  setShowNestedThen(false);
                  setSelectedThenComponent("");
                }}
              >
                <CloseIcon fontSize="small" />
              </button>
              <IfElseBlock
                level={level + 1}
                maxLevel={maxLevel}
                path={[...path, "then"]}
                onUpdateTree={onUpdateTree}
                handleIfElseSave={handleIfElseSave}
              />
            </div>
          )}
      </div>

      {/* ELSE Branch */}
      <div>
        <AnimatedDropdown
          label="Else Branch Component"
          tooltipContent="Select Else Branch"
          tooltipPlacement="right"
          value={selectedElseComponent}
          options={filteredOptions}
          onChange={(val) => {
            setSelectedElseComponent(val);
            setShowNestedElse(val === "ifelse");
          }}
        />

        {selectedElseComponent === "ifelse" &&
          showNestedElse &&
          level < maxLevel && (
            <div className="ml-6 mt-2 border-l-2 pl-4 border-gray-300 relative">
              <button
                className="absolute top-0 right-0 text-xs text-red-600 underline"
                onClick={() => {
                  setShowNestedElse(false);
                  setSelectedElseComponent("");
                }}
              >
                <CloseIcon fontSize="small" />
              </button>
              <IfElseBlock
                level={level + 1}
                maxLevel={maxLevel}
                path={[...path, "else"]}
                onUpdateTree={onUpdateTree}
                handleIfElseSave={handleIfElseSave}
              />
            </div>
          )}
      </div>

      {/* Save Button - only for level 1 */}
      {level === 1 && (
        <div className="flex justify-center pt-2">
          <UniversalButton label="Save" onClick={handleIfElseSave} />
        </div>
      )}
    </div>
  );
};

export default IfElseBlock;
