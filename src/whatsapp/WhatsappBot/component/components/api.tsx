import React from "react";
import { Request } from "./temp-component/api/request";
import { Response } from "./temp-component/api/response";
import UniversalButton from "@/components/common/UniversalButton";
import { fetchApi } from "./helper/fetchApi";
import { Dialog } from "primereact/dialog";

export const Api = ({
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
  const [selectedOption, setSelectedOption] = React.useState("request");

  const [apiDataDialog, setApiDataDialog] = React.useState({
    isOpen: false,
    data: "",
  });

  async function handleTestAPI() {
    if (!nodesInputData[id]?.apiUrl) return;
    if (!nodesInputData[id]?.apiMethod) return;
    const res = await fetchApi(nodesInputData[id]);
    setApiDataDialog({ isOpen: true, data: res });
  }

  return (
    <div className="space-y-2">
      <div className="w-full flex gap-2">
        <button
          className={`w-full border px-1 py-1 rounded-md border-gray-500 ${
            selectedOption === "request" &&
            "bg-green-500 rounded-md text-white border-none"
          }`}
          onClick={() => setSelectedOption("request")}
        >
          Request
        </button>
        <button
          className={`w-full border px-1 py-1 rounded-md border-gray-500 ${
            selectedOption === "response" &&
            "bg-green-500 rounded-md text-white border-none"
          }`}
          onClick={() => setSelectedOption("response")}
        >
          Response
        </button>
      </div>

      {selectedOption === "request" ? (
        <Request
          id={id}
          nodesInputData={nodesInputData}
          setNodesInputData={setNodesInputData}
          allVariables={allVariables}
        />
      ) : (
        <Response
          id={id}
          nodesInputData={nodesInputData}
          setNodesInputData={setNodesInputData}
          allVariables={allVariables}
          addNode={addNode}
          lastPosition={lastPosition}
          nodes={nodes}
        />
      )}

      <UniversalButton
        id="testApi"
        name="testApi"
        label="Test API"
        onClick={handleTestAPI}
        style={{}}
      />

      <Dialog
        header="API Response"
        visible={apiDataDialog.isOpen}
        onHide={() => setApiDataDialog({ isOpen: false, data: "" })}
        style={{ width: "40%" }}
        draggable={false}
      >
        <pre>{JSON.stringify(apiDataDialog.data, null, 2)}</pre>
      </Dialog>
    </div>
  );
};
