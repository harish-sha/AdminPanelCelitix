import React, { useState } from "react";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import UniversalButton from "@/components/common/UniversalButton";

const INDUSTRY_OPTIONS = [
  { label: "Technology", value: "technology" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Finance",    value: "finance"    },
  { label: "Retail",     value: "retail"     },
];

const industryContentMap = {
  technology: "What is Technology?",
  healthcare:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  finance:
    "Finance includes banking, investment, and insurance services.",
  retail:
    "Retail is the sale of goods to end consumers.",
};

export const Ai = () => {
  const [industry, setIndustry] = useState("");
  const [content,  setContent]  = useState("");

  // handle selection for the Industry dropdown
  const handleIndustryChange = (option) => {
    if (!option) {
      // cleared selection
      setIndustry("");
      setContent("");
      return;
    }
    setIndustry(option.value);
    setContent(industryContentMap[option.value] || "");
  };

  // find the full option object matching the current industry value
  const selectedOption =
    INDUSTRY_OPTIONS.find((o) => o.value === industry) || null;

  return (
    <div className="space-y-6">
      {/* Other dropdowns */}
      <AnimatedDropdown
        label="Style"
        id="style"
        name="style"
        placeholder="Select Style"
        options={[
          { label: "Casual",       value: "casual"       },
          { label: "Professional", value: "professional" },
          { label: "Friendly",     value: "friendly"     },
        ]}
        onChange={(e) => console.log("Style:", e)}
      />

      <AnimatedDropdown
        label="Optimize For"
        id="optimizeFor"
        name="optimizeFor"
        placeholder="Select Optimize For"
        options={[
          { label: "Speed",    value: "speed"    },
          { label: "Accuracy", value: "accuracy" },
          { label: "Balance",  value: "balance"  },
        ]}
        onChange={(e) => console.log("Optimize For:", e)}
      />

      <AnimatedDropdown
        label="Invalid Keywords"
        id="invalidKeywords"
        name="invalidKeywords"
        placeholder="Select Invalid Keywords"
        options={[
          { label: "Spam",      value: "spam"      },
          { label: "Offensive", value: "offensive" },
          { label: "Irrelevant",value: "irrelevant"},
        ]}
        onChange={(e) => console.log("Invalid Keywords:", e)}
      />

      {/* Industry → Content section */}
      <div className="p-4 bg-white rounded-lg shadow space-y-4">
        <AnimatedDropdown
          label="Industry"
          id="industry"
          name="industry"
          placeholder="Select Industry"
          options={INDUSTRY_OPTIONS}
          value={selectedOption}
          onChange={handleIndustryChange}
        />

    <div></div>
        <UniversalTextArea
          label="Content"
          id="content"
          name="content"
          placeholder="Enter your content here"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex justify-end">
          <UniversalButton
            label="Save"
            id="saveSettings"
            name="saveSettings"
            variant="primary"
            onClick={() => {
              console.log({ industry, content });
             
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Ai;
