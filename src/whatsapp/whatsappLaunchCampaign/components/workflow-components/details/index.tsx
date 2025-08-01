import React from "react";
import { Whatsapp } from "./whatsapp";
import { RCS } from "./rcs";
import { SMS } from "./sms";
import { OBD } from "./obd";

export const DetailsDialog = ({
  type,
  id,
  nodesInputData,
  setNodesInputData,
  setDetailsDialogVisible,
  headers,
}: {
  type: string;
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
  setDetailsDialogVisible: React.Dispatch<React.SetStateAction<{}>>;
  headers: any[];
}) => {
  return (
    <>
      {type === "whatsapp" && (
        <Whatsapp
          id={id}
          nodesInputData={nodesInputData}
          setNodesInputData={setNodesInputData}
          setDetailsDialogVisible={setDetailsDialogVisible}
          headers={headers}
        />
      )}
      {type === "rcs" && (
        <RCS
          id={id}
          nodesInputData={nodesInputData}
          setNodesInputData={setNodesInputData}
          setDetailsDialogVisible={setDetailsDialogVisible}
          headers={headers}
        />
      )}
      {type === "sms" && (
        <SMS
          id={id}
          nodesInputData={nodesInputData}
          setNodesInputData={setNodesInputData}
          setDetailsDialogVisible={setDetailsDialogVisible}
          headers={headers}
        />
      )}
      {type === "voice" && (
        <OBD
          id={id}
          nodesInputData={nodesInputData}
          setNodesInputData={setNodesInputData}
          setDetailsDialogVisible={setDetailsDialogVisible}
          headers={headers}
        />
      )}
    </>
  );
};
