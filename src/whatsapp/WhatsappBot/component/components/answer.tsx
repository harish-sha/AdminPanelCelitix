import React, { useEffect } from "react";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import UniversalButton from "@/components/common/UniversalButton";

export const Answer = ({
  id,
  nodesInputData,
  setNodesInputData,
  addVariable,
  allVariables,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
  addVariable: (data: String) => void;
  allVariables: any[];
}) => {
  useEffect(() => {
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        type: nodesInputData[id]?.type,
        // variableId: nodesInputData[id]?.variableName,
      },
    }));
    // type = nodesInputData[id]?.type;
    // variableId = nodesInputData[id]?.variableName;
  }, []);
  return (
    <div>
      <AnimatedDropdown
        id="expectedAnswerType"
        name="expectedAnswerType"
        label="Expected Answer Type"
        options={[
          { label: "Text", value: "text" },
          { label: "Image", value: "image" },
          { label: "Video", value: "video" },
          { label: "Audio", value: "audio" },
          { label: "Document", value: "document" },
          { label: "Email", value: "email" },
          { label: "No Validations", value: "noValidations" },
        ]}
        value={nodesInputData[id]?.type}
        onChange={(e: any) => {
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              type: e,
            },
          }));
        }}
      />

      {nodesInputData[id]?.type === "text" && (
        <div className="mt-2 flex flex-col gap-2 border p-2 rounded-md">
          <p>Create or Select Variable from dropdown</p>
          <DropdownWithSearch
            id="variableSearch"
            name="variableSearch"
            label="Select variable"
            value={nodesInputData[id]?.variableId}
            onChange={(e: any) => {
              setNodesInputData((prev) => ({
                ...prev,
                [id]: {
                  ...prev[id],
                  variableId: e,
                },
              }));
            }}
            disabled={false}
            options={allVariables.map((v) => ({
              label: v,
              value: v,
            }))}
          />
          <div className="flex gap-2 w-full items-center justify-center">
            <InputField
              id="text"
              name={"text"}
              label="Variable"
              placeholder="Enter variable"
              value={nodesInputData[id]?.variableName}
              onChange={(e: { target: { value: any } }) => {
                setNodesInputData((prev) => ({
                  ...prev,
                  [id]: {
                    ...prev[id],
                    variableName: e.target.value,
                  },
                }));
              }}
            />

            <UniversalButton
              id="addVariable"
              name="addVariable"
              label="Add"
              onClick={() => {
                addVariable(nodesInputData[id]?.variableName);
                setNodesInputData((prev) => ({
                  ...prev,
                  [id]: {
                    ...prev[id],
                    variableName: "",
                  },
                }));
              }}
              style={{
                marginTop: "1.8rem",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
