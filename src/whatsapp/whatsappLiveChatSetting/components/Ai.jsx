import React, { useState } from "react";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import UniversalButton from "@/components/common/UniversalButton";

const STYLE_OPTIONS = [
  { label: "Casual", value: "casual" },
  { label: "Professional", value: "professional" },
  { label: "Friendly", value: "friendly" },
];

const OPTIMIZE_OPTIONS = [
  { label: "Speed", value: "speed" },
  { label: "Accuracy", value: "accuracy" },
  { label: "Balance", value: "balance" },
];

const INVALID_KEYWORD_OPTIONS = [
  { label: "Spam", value: "spam" },
  { label: "Offensive", value: "offensive" },
  { label: "Irrelevant", value: "irrelevant" },
];

const INDUSTRY_OPTIONS = [
  { label: "Technology", value: "technology" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Finance",    value: "finance" },
  { label: "Retail",     value: "retail" },
];

const INDUSTRY_DEMO_CONTENT = {
  technology: `🚀 Welcome to the future of tech! Our platform bridges cutting-edge AI with seamless integration.`,
  healthcare: `🩺 Empowering caregivers: streamline patient communications, manage appointments, and more.`,
  finance:    `💰 Simplify your financial workflows: secure transactions, real-time updates, and actionable insights.`,
  retail:     `🛍️ Elevate your retail experience: personalized promotions, instant support, and frictionless checkout.`,
};

export const Ai = () => {
  const [styleOption, setStyleOption] = useState(null);
  const [optimizeOption, setOptimizeOption] = useState(null);
  const [invalidKeywordOption, setInvalidKeywordOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [content, setContent] = useState("");

  const handleIndustryChange = (optionOrValue) => {
    // Normalize input: some dropdowns give you {label,value}, some just the value
    const value =
      typeof optionOrValue === "string"
        ? optionOrValue
        : optionOrValue?.value;

    // Find the full option object (or null)
    const option =
      INDUSTRY_OPTIONS.find((o) => o.value === value) || null;

    setSelectedOption(option);
    setContent(option ? INDUSTRY_DEMO_CONTENT[value] : "");
  };

  return (
    <div className="space-y-6">
      {/* Style Dropdown */}
      <AnimatedDropdown
        label="Style"
        placeholder="Select Style"
        options={STYLE_OPTIONS}
        value={styleOption}
        onChange={setStyleOption}
        isClearable
      />

      {/* Optimize For Dropdown */}
      <AnimatedDropdown
        label="Optimize For"
        placeholder="Select Optimize For"
        options={OPTIMIZE_OPTIONS}
        value={optimizeOption}
        onChange={setOptimizeOption}
        isClearable
      />

      {/* Invalid Keywords Dropdown */}
      <AnimatedDropdown
        label="Invalid Keywords"
        placeholder="Select Invalid Keywords"
        options={INVALID_KEYWORD_OPTIONS}
        value={invalidKeywordOption}
        onChange={setInvalidKeywordOption}
        isClearable
      />

      {/* Industry → Content section */}
       <div className="space-y-4">
      {/* Industry selector */}
      <AnimatedDropdown
        label="Industry"
         placeholder={ selectedOption ? selectedOption.label : "Select Industry" }
        options={INDUSTRY_OPTIONS}
        value={selectedOption}
        onChange={handleIndustryChange}
        isClearable
      />

      {/* Auto-filled textarea */}
      <UniversalTextArea
        label="Content"
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={
          selectedOption
            ? `Demo for ${selectedOption.label}`
            : "Enter your content here"
        }
      />

      {/* Save */}
      <div className="flex justify-end">
        <UniversalButton
          label="Save"
          variant="primary"
          onClick={() =>
            console.log({
              styleOption,
              optimizeOption,
              invalidKeywordOption,
              industry: selectedOption?.value,
              content,
            })
          }
        />
      </div>
    </div>
    </div>
  );
};



















// import React, { useState } from "react";
// import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
// import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
// import UniversalButton from "@/components/common/UniversalButton";

// const INDUSTRY_OPTIONS = [
//   { label: "Technology", value: "technology" },
//   { label: "Healthcare", value: "healthcare" },
//   { label: "Finance",    value: "finance" },
//   { label: "Retail",     value: "retail" },
// ];

// const INDUSTRY_DEMO_CONTENT = {
//   technology: `🚀 Welcome to the future of tech! Our platform bridges cutting-edge AI with seamless integration.`,
//   healthcare: `🩺 Empowering caregivers: streamline patient communications, manage appointments, and more.`,
//   finance:    `💰 Simplify your financial workflows: secure transactions, real-time updates, and actionable insights.`,
//   retail:     `🛍️ Elevate your retail experience: personalized promotions, instant support, and frictionless checkout.`,
// };

// export const Ai = () => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [content, setContent] = useState("");

//   const handleIndustryChange = (optionOrValue) => {
//     // Normalize input: some dropdowns give you {label,value}, some just the value
//     const value =
//       typeof optionOrValue === "string"
//         ? optionOrValue
//         : optionOrValue?.value;

//     // Find the full option object (or null)
//     const option =
//       INDUSTRY_OPTIONS.find((o) => o.value === value) || null;

//     setSelectedOption(option);
//     setContent(option ? INDUSTRY_DEMO_CONTENT[value] : "");
//   };

//   return (
//     <div className="space-y-6 max-w-lg mx-auto p-4">
//       {/* Industry selector */}
//       <AnimatedDropdown
//         label="Industry"
//         placeholder={ selectedOption ? selectedOption.label : "Select Industry" }
//         options={INDUSTRY_OPTIONS}
//         value={selectedOption}
//         onChange={handleIndustryChange}
    
//       />

//       {/* Auto-filled textarea */}
//       <UniversalTextArea
//         label="Content"
//         rows={6}
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         placeholder={
//           selectedOption
//             ? `Demo for ${selectedOption.label}`
//             : "Enter your content here"
//         }
//       />

//       {/* Save */}
//       <div className="flex justify-end">
//         <UniversalButton
//           label="Save"
//           variant="primary"
//           onClick={() =>
//             console.log({
//               industry: selectedOption?.value,
//               content,
//             })
//           }
//         />
//       </div>
//     </div>
//   );
// };