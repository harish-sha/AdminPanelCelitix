import { Textarea } from "@/components/ui/textarea";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import React, { useEffect } from "react";
import { extractVariable } from "./helper/extractVariable";

export const TextNodeContent = ({
  id,
  nodesInputData,
  setNodesInputData,
  allVariables,
  addVariable,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
  allVariables: any[];
  addVariable: (data: String) => void;
}) => {
  useEffect(() => {
    const variable = extractVariable({ message: nodesInputData[id]?.message });

    if (!variable || variable == "") {
      return;
    }

    addVariable(variable);

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        variable: variable,
      },
    }));
  }, []);
  const handleAddVariable = (e: any) => {
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        variable: e,
      },
    }));
    const newTag = `{{${e}}}`;
    if (!e) return;
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        message: prev[id]?.message + newTag,
      },
    }));
  };
  return (
    <div className="flex flex-col gap-2">
      <div>
        <label
          htmlFor="textBox"
          className="text-sm font-medium text-gray-800 font-p mb-2"
        >
          Message
        </label>
        <Textarea
          id="textBox"
          placeholder="Enter message"
          value={nodesInputData[id]?.message}
          onChange={(e: { target: { value: any } }) => {
            setNodesInputData((prev) => ({
              ...prev,
              [id]: {
                ...prev[id],
                message: e.target.value,
              },
            }));
          }}
          className="resize-none h-50"
        />
      </div>
      <AnimatedDropdown
        id="selectVaribleDropdown"
        name="selectVaribleDropdown"
        label="Select Variable"
        options={allVariables.map((v) => ({
          label: v,
          value: v,
        }))}
        value={nodesInputData[id]?.variable}
        onChange={(e: any) => {
          handleAddVariable(e);
        }}
      />

      {/* <Variable variable={nodesInputData[id]?.variable} message={nodesInputData[id]?.message} /> */}
    </div>
  );
};
