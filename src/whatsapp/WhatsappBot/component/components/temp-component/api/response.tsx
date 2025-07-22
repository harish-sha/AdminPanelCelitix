import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import React from "react";

export const Response = ({
  id,
  nodesInputData,
  setNodesInputData,
  allVariables,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
  allVariables: any[];
}) => {
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
              },
            },
          }));
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
              { value: "storeInVariable", label: "Store in Variable" },
              ...(nodesInputData[id]?.apiResponse?.responseType === "json"
                ? [{ value: "createListNode", label: "Create List Node" }]
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
                  },
                },
              }));
            }}
            placeholder="Select Request Type"
          />
        )}
    </div>
  );
};
