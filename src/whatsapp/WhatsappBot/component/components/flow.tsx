import { getAllBot, getWhatsappFlow } from "@/apis/whatsapp/whatsapp";
import InputField from "@/components/layout/InputField";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export const Flow = ({
  id,
  nodesInputData,
  setNodesInputData,
  allVariables,
  addNode,
  lastPosition,
  nodes,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
  allVariables: any[];
  addNode: any;
  lastPosition: any;
  nodes: any;
}) => {
  const [allFlows, setAllFlows] = React.useState([]);

  useEffect(() => {
    async function handleFetchAllFlows() {
      try {
        const res = await getWhatsappFlow();
        const publishedFlows = res.filter(
          (flow) => flow.status === "PUBLISHED"
        );
        setAllFlows(publishedFlows);
      } catch (e) {
        toast.error("Error while fetching flows");
      }
    }
    handleFetchAllFlows();
  }, []);
  return (
    <>
      <DropdownWithSearch
        id="flows"
        name="flows"
        label="Select Flow"
        options={allFlows.map((flow) => ({
          value: flow.srNo,
          label: flow.flowName,
        }))}
        value={nodesInputData[id]?.flowSrno}
        onChange={(e) => {
          const flow = allFlows.find((flow) => flow.srNo === e);
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              flowSrno: e,
              screenId: flow.screensId,
              flowName: flow.flowName,
              flowId: String(flow.flowId),
            },
          }));
        }}
        disabled={false}
        placeholder="Select a flow"
      />
      <InputField
        id="bodyText"
        name="bodyText"
        label="Body Text"
        type="text"
        placeholder="Enter body text"
        value={nodesInputData[id]?.bodyText}
        onChange={(e) => {
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              bodyText: e.target.value,
            },
          }));
        }}
      />

      <InputField
        id="buttonText"
        name="buttonText"
        label="Button Text"
        type="text"
        placeholder="Enter body text"
        value={nodesInputData[id]?.buttonText}
        onChange={(e) => {
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              buttonText: e.target.value,
            },
          }));
        }}
      />
    </>
  );
};
