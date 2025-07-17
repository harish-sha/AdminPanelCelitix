import React, { use, useCallback, useEffect, useMemo, useState } from "react";
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
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import InputField from "@/components/layout/InputField";
import UniversalButton from "@/components/common/UniversalButton";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Dialog } from "primereact/dialog";
import { SMSNode } from "../create/components/SMSDialog";
import { VoiceNode } from "../create/components/VoiceDialog";
import { RCSNode } from "../create/components/RcsDialog";
import { WhatsAppNode } from "../create/components/WhatsappDialog";
import { generatePayload } from "../create/helpers/generatePayload";
import { saveWorkflow } from "@/apis/workflow";
import { HiOutlineDocument } from "react-icons/hi2";
import { DetailsDialog } from "../create/components/details";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { convertPaylaod } from "./helpers/convertPaylaod";
import { FaWhatsapp } from "react-icons/fa";
import obd from "../../assets/icons/OBD02.svg";
import rcsicon from "../../assets/icons/RCS02.svg";
import { LuMessageSquareMore } from "react-icons/lu";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";

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
  onDelete: (id: string) => void;
  isConnecting: boolean;
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
      <button
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
      </button>

      <button
        className="absolute -left-2 p-0 text-xs -top-2"
        onClick={() => {
          setIsVisible(true);
        }}
        title="Settings"
      >
        <SettingsOutlinedIcon fontSize="small" />
      </button>

      {id !== "1" && (
        <button
          className="absolute left-5 -top-2 p-0 text-xs"
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

export const UpdateWorkflow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, workflow_meta_data } = location.state;

  if (!data) {
    toast.error("Workflow not found");
    navigate("/workflow");
  }

  const formattedData = convertPaylaod(data);
  let node = [];
  let edge = [];

  const [nodes, setNodes, onNodesChange] = useNodesState(
    formattedData?.nodes || node
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    formattedData?.edges || edge
  );
  const [nodeId, setNodeId] = useState(formattedData?.nodes?.length + 1 || 1);
  const [name, setName] = useState(workflow_meta_data?.workflow_name || "");
  const [nodesInputData, setNodesInputData] = useState(
    formattedData?.nodedata || {}
  );
  const [lastPosition, setLastPosition] = useState({ x: 50, y: 50 });
  const [type, setType] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [connectionType, setConnectionType] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [detailsDialogVisible, setDetailsDialogVisible] = useState(false);

  const onConnect = useCallback(
    (connection: { source: any; target: any }) => {
      const { source, target } = connection;

      let isSourceAlreadyConnected = false;
      let isTargetAlreadyConnected = false;

      //   if (type === "list" || type === "button") {
      //     isSourceAlreadyConnected = edges.some(
      //       (edge) => edge.sourceHandle === source
      //     );
      //     isTargetAlreadyConnected = edges.some((edge) => edge.target === target);
      //   } else {
      //     isSourceAlreadyConnected = edges.some(
      //       (edge) => edge.sourceHandle === source
      //     );
      //     isTargetAlreadyConnected = edges.some((edge) => edge.target === target);
      //   }

      isSourceAlreadyConnected = edges.some(
        (edge) => edge.sourceHandle === source
      );
      isTargetAlreadyConnected = edges.some((edge) => edge.target === target);

      if (isSourceAlreadyConnected || isTargetAlreadyConnected) {
        toast.error("This connection is not allowed!");
        return;
      }
      setEdges((eds) => addEdge(connection, eds));
    },
    [edges, setEdges]
  );

  const onNodeClick = (_event: any, node: any) => {
    setType(node.type);
    setSelectedNodeId(node.id);
  };

  const commonButtonClass =
    // "cursor-pointer flex flex-col h-fit text-[0.9rem] bg-gradient-to-br from-blue-400 to-gray-600 shadow-lg ";
    "cursor-pointer flex flex-col h-auto text-[0.7rem] bg-white text-gray-900 border-2 border-gray-500 shadow-lg hover:bg-gradient-to-br hover:from-blue-200 hover:to-blue-300 hover:text-gray-900 hover:shadow-2xl hover:scale-105";

  const addNode = (type: string, position?: { x: number; y: number }) => {
    const newNode = {
      id: `${nodeId}`,
      position: position || { ...lastPosition },
      data: { type },
      type,
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
    setNodeId((prevId) => prevId + 1);
    if (!position) {
      setLastPosition((prevPosition) => ({
        x: prevPosition.x + 50,
        y: prevPosition.y + 50,
      }));
    }
  };

  const reset = () => {
    setNodes([]);
    setEdges([]);
    setNodeId(1);
    setNodesInputData({});
  };

  const handleDragStart = (event: React.DragEvent, type: string) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();

    const reactFlowBounds = event.currentTarget.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");

    if (!type) return;

    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    addNode(type, position);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const deleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => {
        const updatedNodes = nds.filter((node) => node.id !== nodeId);

        const reorderedNodes = updatedNodes.map((node, index) => ({
          ...node,
          id: (index + 1).toString(),
        }));

        setNodeId(reorderedNodes.length + 1);
        return reorderedNodes;
      });

      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );

      setEdges((eds) =>
        eds.filter(
          (edge) => edge.sourceHandler !== nodeId && edge.target !== nodeId
        )
      );

      setIsVisible(false);
    },
    [setNodes, setEdges]
  );
  const nodeTypes = useMemo(
    () => ({
      voice: (node: any) => (
        <NodeComponent
          id={node.id}
          data={node.data}
          onDelete={deleteNode}
          isConnecting={isConnecting}
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
          onDelete={deleteNode}
          isConnecting={isConnecting}
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
          onDelete={deleteNode}
          isConnecting={isConnecting}
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
          onDelete={deleteNode}
          isConnecting={isConnecting}
          setIsVisible={setIsVisible}
          connectionType={connectionType}
          setNodesInputData={setNodesInputData}
          nodesInputData={nodesInputData}
          setDetailsDialogVisible={setDetailsDialogVisible}
        />
      ),
    }),
    [deleteNode, isConnecting, nodesInputData]
  );

  async function handleSaveWorkflow() {
    if (!name) return toast.error("Please enter a name for the workflow");
    if (nodes.length < 2) return toast.error("Please add at least two nodes");
    // if (nodes.length !== edges.length)
    //   return toast.error("Please connect all the nodes");
    const payload = generatePayload(nodesInputData, nodes, edges);
    if (!payload) return toast.error("Error while saving workflow");

    const data = {
      workflowName: name,
      isEditWorkflow: 1,
      srNo: workflow_meta_data?.sr_no,
      nodeJson: JSON.stringify(payload),
    };

    try {
      const res = await saveWorkflow(data);
      if (res?.statusCode !== 200) {
        return toast.error(res.msg || "Error while saving workflow");
      }
      toast.success("Workflow updated successfully");
      navigate("/workflow");
    } catch (e) {
      toast.error("Error while saving workflow");
    }
  }

  function handleSaveNodeData() {
    setSelectedNodeId("");
    setType("");
    setIsVisible(false);
  }

  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap h-[100%] md:overflow-hidden">
        <div
         className="w-full md:w-[calc(100vw-220px)] h-[calc(100vh-1rem)]"
          onDrop={handleDrop}
          onDragOver={handleDragOver}>

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            deleteKeyCode={"Backspace"}
            nodeTypes={nodeTypes}
            onConnectStart={(event, { handleType }) => {
              setIsConnecting(true);
              setConnectionType(handleType);
            }}
            onConnectEnd={() => {
              setIsConnecting(false);
              setConnectionType("");
            }}
            // fitView
          >
            <Background />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>

        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-col  justify-between w-full sm:w-[200px] bg-gray-50 gap-4 px-2 py-3 rounded-md h-auto  overflow-x-auto sm:overflow-visible sm:mt-5">
    
          <div>
            <h1 className="font-semibold text-lg">Select Channel</h1>

            <div className="flex flex-row flex-wrap md:flex-col gap-3 p-1 overflow-x-auto md:overflow-hidden">
              <Button
                draggable
                onDragStart={(event) => {
                  handleDragStart(event, "voice");
                }}
                onClick={() => {
                  addNode("voice");
                }}
                className={commonButtonClass}
              >
                <img src={obd} className="w-4 h-4" /> OBD
              </Button>
              <Button
                draggable
                onDragStart={(event) => {
                  handleDragStart(event, "whatsapp");
                }}
                onClick={() => {
                  addNode("whatsapp");
                }}
                className={commonButtonClass}
              >
                <FaWhatsapp />
                WhatsApp
              </Button>
              <Button
                draggable
                onDragStart={(event) => {
                  handleDragStart(event, "rcs");
                }}
                onClick={() => {
                  addNode("rcs");
                }}
                className={commonButtonClass}
              >
                <img src={rcsicon} className="w-4 h-4" />
                RCS
              </Button>
              <Button
                draggable
                onDragStart={(event) => {
                  handleDragStart(event, "sms");
                }}
                onClick={() => {
                  addNode("sms");
                }}
                className={commonButtonClass}
              >
                {" "}
                <LuMessageSquareMore />
                SMS
              </Button>
              <Button
                draggable
                onDragStart={(event) => {}}
                onClick={() => {
                  reset();
                }}
                className={
                  "cursor-pointer flex flex-col h-fit text-[0.9rem] bg-[#3671D6] hover:bg-[#527ECA] shadow-lg"
                }
              >
                <RestartAltOutlinedIcon />
                Reset
              </Button>
            </div>
          </div>

          <div className="w-full space-y-2 ">
            <InputField
              id="workflowName"
              name="workflowName"
              label="WorkFlow Name"
              tooltipContent="Enter WorkFlow Name. Name should be unique. Only Alphabets and numbers are allowed. Maximum 20 characters allowed."
              value={name}
              placeholder="Enter WorkFlow Name"
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => {
                setName(e.target.value);
              }}
              maxLength={20}
            />

            <UniversalButton
              id="saveWorkFlow"
              name="saveWorkFlow"
              label={`update`}
              onClick={handleSaveWorkflow}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>

      <Dialog
        header={"Add Conditions and details for the selected Channel"}
        visible={isVisible}
        onHide={() => {
          setType("");
          setSelectedNodeId("");
          setIsVisible(false);
        }}
        style={{ width: "60vw" }}
        draggable={false}
      >
        <div className="flex flex-col gap-2">
          {type === "sms" && (
            <SMSNode
              id={selectedNodeId}
              nodesInputData={nodesInputData}
              setNodesInputData={setNodesInputData}
            />
          )}
          {type === "voice" && (
            <VoiceNode
              id={selectedNodeId}
              nodesInputData={nodesInputData}
              setNodesInputData={setNodesInputData}
            />
          )}
          {type === "rcs" && (
            <RCSNode
              id={selectedNodeId}
              nodesInputData={nodesInputData}
              setNodesInputData={setNodesInputData}
            />
          )}
          {type === "whatsapp" && (
            <WhatsAppNode
              id={selectedNodeId}
              nodesInputData={nodesInputData}
              setNodesInputData={setNodesInputData}
            />
          )}

          <div className="flex gap-2">
            <Button onClick={handleSaveNodeData}>Save</Button>
            <Button variant="destructive" onClick={() => setIsVisible(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>

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
        />
      </Dialog>
    </>
  );
};
  