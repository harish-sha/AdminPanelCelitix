import React from "react";
import { Whatsapp } from "./whatsapp";

export const DetailsDialog = ({
  type,
  id,
  nodesInputData,
  setNodesInputData,
}: {
  type: string;
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
}) => {
  return (
    <>
      {type === "whatsapp" && (
        <Whatsapp
          id={id}
          nodesInputData={nodesInputData}
          setNodesInputData={setNodesInputData}
        />
      )}
    </>
  );
};
