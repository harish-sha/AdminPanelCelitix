import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  MiniMap,
  Controls,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { HiOutlineDocument } from "react-icons/hi2";
import { DetailsDialog } from "../components/workflow-components/details";
import { Dialog } from "primereact/dialog";
import { convertPaylaod } from "@/workflow/edit/helpers/convertPaylaod";
import UniversalButton from "@/components/common/UniversalButton";
import { generatePayload } from "@/workflow/create/helpers/generatePayload";

function NodeComponent({
  id,
  data,
  onDelete,
  isConnecting,
  setIsVisible,
  connectionType,
  setNodesInputData,
  nodesInputData,
  setDetailsDialogVisible,
}: {
  id: string;
  data: any;
  onDelete?: (id: string) => void;
  isConnecting?: boolean;
  setIsVisible: any;
  connectionType: string;
  setNodesInputData: any;
  nodesInputData?: any;
  setDetailsDialogVisible: any;
}) {
  const options = nodesInputData?.[id]?.options || [];
  const buttonTexts = nodesInputData?.[id]?.buttonTexts || [];

  return (
    <div className="relative p-1.5 bg-white border border-gray-300 rounded-md shadow-md">
      {/* <button
        className="absolute -top-2 -right-1 text-xs text-white bg-red-500 rounded-full hover:bg-red-700 h-4 w-4 text-center"
        onClick={() => {
          onDelete(id);
          setIsVisible(false);
          setNodesInputData((prev) => {
            const newData = {};
            const keys = Object.keys(prev).sort(
              (a, b) => parseInt(a) - parseInt(b)
            );

            let shift = false;

            keys.forEach((key) => {
              const keyNum = parseInt(key);
              if (key === id) {
                shift = true;
                return;
              }

              if (shift) {
                const newKey = String(keyNum - 1);
                newData[newKey] = prev[key];
              } else {
                newData[key] = prev[key];
              }
            });

            return newData;
          });
        }}
      >
        <CloseOutlinedIcon
          fontSize="small"
          style={{
            fontSize: "10px",
          }}
        />
      </button> */}

      {id !== "1" && (
        <button
          className="absolute left-0 -top-2 p-0 text-xs"
          onClick={() => setDetailsDialogVisible(true)}
          title={`Configure ${data.type} node`}
        >
          <HiOutlineDocument className="font-bold text-lg" />
        </button>
      )}

      <div className="font-medium text-center">
        {data.type === "voice" && <p>Voice Node ({id})</p>}
        {data.type === "rcs" && <p>RCS Node ({id})</p>}
        {data.type === "whatsapp" && <p>Whatsapp Node ({id})</p>}
        {data.type === "sms" && <p>SMS Node ({id})</p>}
      </div>

      <>
        <Handle
          type="target"
          position={Position.Left}
          className={`${id == "1" ? "hidden" : ""} `}
          style={{
            background: connectionType === "source" ? "green" : "blue",
          }}
        />
        <div className="flex flex-col gap-2 mt-2">
          {options.map((option: any, index: number) => (
            <div
              key={index}
              className="relative flex items-center justify-between px-2 py-1 text-sm bg-gray-100 border rounded"
            >
              <span className="text-gray-800">
                {`${option.type || `Condition-${index + 1}`} (${
                  option.value || `Value-${index + 1}`
                })`}
              </span>
              <Handle
                id={`opt-${index}`}
                type="source"
                position={Position.Right}
                style={{
                  background: connectionType === "target" ? "green" : "blue",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: -8,
                }}
              />
            </div>
          ))}
        </div>
      </>
    </div>
  );
}

export const ConfigureWorkflow = ({
  data,
  headers,
  onClose,
  setWorkflowState,
}) => {
  if (!data) return null;
  const formattedData = convertPaylaod(data);
  let node = [];
  let edge = [];
  // let data = {};

  const [nodes, setNodes, onNodesChange] = useNodesState(
    formattedData?.nodes || node
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    formattedData?.edges || edge
  );
  const [nodeId, setNodeId] = useState(1);
  const [name, setName] = useState("");
  const [nodesInputData, setNodesInputData] = useState(
    formattedData?.nodedata || {}
  );
  const [type, setType] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [connectionType, setConnectionType] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [detailsDialogVisible, setDetailsDialogVisible] = useState(false);

  const onNodeClick = (_event: any, node: any) => {
    setType(node.type);
    setSelectedNodeId(node.id);
  };

  async function handleSaveWorkflow() {
    const payload = generatePayload(nodesInputData, nodes, edges);
    console.log(payload);
    setWorkflowState(payload);
    onClose();
  }

  const commonButtonClass =
    "cursor-pointer flex flex-col h-auto text-[0.7rem] bg-white text-gray-900 border-2 border-gray-500 shadow-lg hover:bg-gradient-to-br hover:from-blue-200 hover:to-blue-300 hover:text-gray-900 hover:shadow-2xl hover:scale-105";

  const nodeTypes = useMemo(
    () => ({
      voice: (node: any) => (
        <NodeComponent
          id={node.id}
          data={node.data}
          setIsVisible={setIsVisible}
          connectionType={connectionType}
          setNodesInputData={setNodesInputData}
          nodesInputData={nodesInputData}
          setDetailsDialogVisible={setDetailsDialogVisible}
        />
      ),
      whatsapp: (node: any) => (
        <NodeComponent
          id={node.id}
          data={node.data}
          setIsVisible={setIsVisible}
          connectionType={connectionType}
          setNodesInputData={setNodesInputData}
          nodesInputData={nodesInputData}
          setDetailsDialogVisible={setDetailsDialogVisible}
        />
      ),
      rcs: (node: any) => (
        <NodeComponent
          id={node.id}
          data={node.data}
          setIsVisible={setIsVisible}
          connectionType={connectionType}
          setNodesInputData={setNodesInputData}
          nodesInputData={nodesInputData}
          setDetailsDialogVisible={setDetailsDialogVisible}
        />
      ),
      sms: (node: any) => (
        <NodeComponent
          id={node.id}
          data={node.data}
          setIsVisible={setIsVisible}
          connectionType={connectionType}
          setNodesInputData={setNodesInputData}
          nodesInputData={nodesInputData}
          setDetailsDialogVisible={setDetailsDialogVisible}
        />
      ),
    }),
    [nodesInputData]
  );
  return (
    <>
      {/* <div>{JSON.stringify(data, null, 2)}</div> */}

      <div className="w-full  h-[calc(100vh-15rem)]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          deleteKeyCode={"Backspace"}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <MiniMap />
          {/* <Controls /> */}
        </ReactFlow>
      </div>

      <Dialog
        header={"Configure details for the selected Channel"}
        visible={detailsDialogVisible}
        onHide={() => {
          setType("");
          setSelectedNodeId("");
          setDetailsDialogVisible(false);
        }}
        style={{ width: "60vw", height: "80vh" }}
        draggable={false}
      >
        <DetailsDialog
          type={type}
          id={selectedNodeId}
          nodesInputData={nodesInputData}
          setNodesInputData={setNodesInputData}
          setDetailsDialogVisible={setDetailsDialogVisible}
          headers={headers}
        />
      </Dialog>

      <UniversalButton
        style={{}}
        id="saveWorkflow"
        name="saveWorkflow"
        label="Save Workflow"
        onClick={handleSaveWorkflow}
      />
    </>
  );
};
