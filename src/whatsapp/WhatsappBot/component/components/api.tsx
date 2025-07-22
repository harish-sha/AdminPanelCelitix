import React from "react";
import { Request } from "./temp-component/api/request";
import { Response } from "./temp-component/api/response";

export const Api = ({
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
  const [selectedOption, setSelectedOption] = React.useState("request");

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
        />
      )}
    </div>
  );
};
