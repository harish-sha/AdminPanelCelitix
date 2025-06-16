import React, { useEffect } from "react";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import UniversalButton from "@/components/common/UniversalButton";

export const Url = ({
  id,
  nodesInputData,
  setNodesInputData,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
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

  return <div>Hello</div>;
};
