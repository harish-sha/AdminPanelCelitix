import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import React from "react";

export const GoTo = ({
  id,
  nodesInputData,
  setNodesInputData,
  nodes,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
  nodes: any[];
}) => {
  const result = nodes.filter((node) => Number(node.id) < Number(id));

  return (
    <div>
      <DropdownWithSearch
        label="Select Go To Node"
        id="selectNode"
        name="selectNode"
        value={nodesInputData[id]?.gotoStep}
        options={result?.map((item) => ({
          label: `${item.type.toUpperCase()} Node`,
          value: `${item.type}_${item.id}`,
        }))}
        onChange={(e) => {
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              gotoStep: e,
            },
          }));
        }}
        disabled={false}
      />
    </div>
  );
};
