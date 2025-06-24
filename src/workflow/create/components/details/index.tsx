import React from "react";
import { Whatsapp } from "./whatsapp";
import { RCS } from "./rcs";
import { SMS } from "./sms";

export const DetailsDialog = ({
  type,
  id,
  nodesInputData,
  setNodesInputData,
  setDetailsDialogVisible,
}: {
  type: string;
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
  setDetailsDialogVisible: React.Dispatch<React.SetStateAction<{}>>;
}) => {
  return (
    <>
      {type === "whatsapp" && (
        <Whatsapp
          id={id}
          nodesInputData={nodesInputData}
          setNodesInputData={setNodesInputData}
          setDetailsDialogVisible={setDetailsDialogVisible}
        />
      )}
      {type === "rcs" && (
        <RCS
          id={id}
          nodesInputData={nodesInputData}
          setNodesInputData={setNodesInputData}
          setDetailsDialogVisible={setDetailsDialogVisible}
        />
      )}
      {type === "sms" && (
        <SMS
          id={id}
          nodesInputData={nodesInputData}
          setNodesInputData={setNodesInputData}
          setDetailsDialogVisible={setDetailsDialogVisible}
        />
      )}
    </>
  );
};
