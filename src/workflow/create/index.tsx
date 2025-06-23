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
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import InputField from "@/components/layout/InputField";
import UniversalButton from "@/components/common/UniversalButton";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Dialog } from "primereact/dialog";
import { SMSNode } from "./components/SMSDialog";
import { VoiceNode } from "./components/VoiceDialog";
import { RCSNode } from "./components/RcsDialog";
import { WhatsAppNode } from "./components/WhatsappDialog";
import { generatePayload } from "./helpers/generatePayload";
import { saveWorkflow } from "@/apis/workflow";

function NodeComponent({
  id,
  data,
  onDelete,
  isConnecting,
  setIsVisible,
  connectionType,
  setNodesInputData,
  nodesInputData,
}: {
  id: string;
  data: any;
  onDelete: (id: string) => void;
  isConnecting: boolean;
  setIsVisible: any;
  connectionType: string;
  setNodesInputData: any;
  nodesInputData?: any;
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
      >
        <SettingsOutlinedIcon fontSize="small" />
      </button>

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
          className={`${data.type == "starting" ? "hidden" : ""} `}
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

export const WorkflowCreate = () => {
  let node = [];
  let edge = [];
  // let data = {};

  const [nodes, setNodes, onNodesChange] = useNodesState(node);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edge);
  const [nodeId, setNodeId] = useState(1);
  const [name, setName] = useState("");
  const [nodesInputData, setNodesInputData] = useState({});
  const [lastPosition, setLastPosition] = useState({ x: 50, y: 50 });
  const [type, setType] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [connectionType, setConnectionType] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const onConnect = useCallback(
    (connection: { source: any; target: any }) => {
      const { source, target } = connection;

      let isSourceAlreadyConnected = false;
      let isTargetAlreadyConnected = false;

      if (type === "list" || type === "button") {
        isSourceAlreadyConnected = edges.some(
          (edge) => edge.sourceHandle === source
        );
        isTargetAlreadyConnected = edges.some((edge) => edge.target === target);
      } else {
        isSourceAlreadyConnected = edges.some(
          (edge) => edge.sourceHandle === source
        );
        isTargetAlreadyConnected = edges.some((edge) => edge.target === target);
      }

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
    "cursor-pointer flex flex-col h-fit text-[0.9rem] bg-gradient-to-br from-blue-400 to-gray-600 shadow-lg ";

  const addNode = (type: string, position?: { x: number; y: number }) => {
    // if (nodes.length >= 5) return toast.error("You can add only 5 nodes");

    // const isNodeAlreadyAdded = nodes.some((node) => node.type === type);

    // if (isNodeAlreadyAdded) {
    //   return toast.error("You can add only one node per type");
    // }

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
        />
      ),
    }),
    [deleteNode, isConnecting, nodesInputData]
  );

  async function handleSaveWorkflow() {
    if (!name) return toast.error("Please enter a name for the workflow");
    const payload = generatePayload(nodesInputData, nodes, edges);
    if (!payload) return toast.error("Error while saving workflow");
    console.log(payload);

    const data = {
      workflowName: name,
      isEditWorkflow: 0,
      srNo: 0,
      nodeJson: JSON.stringify(payload),
    };

    try {
      const res = await saveWorkflow(data);
      console.log(res);
      if (res?.statusCode !== 200) {
        return toast.error(res.msg);
      }
    } catch (e) {
      toast.error("Error while saving workflow");
    }
    toast.success("Workflow saved successfully");
  }

  function handleSaveNodeData() {
    setSelectedNodeId("");
    setType("");
    setIsVisible(false);
  }

  useEffect(() => {
    console.log(nodesInputData);
  }, [nodesInputData]);

  return (
    <>
      <div className="flex h-[100%]">
        <div
          style={{ width: "90vw", height: "auto" }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
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
              console.log(event);
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

        <div className="flex flex-col justify-between w-[250px] gap-4">
          <div>
            <h1>Select Channel</h1>
            <div className="grid grid-cols-1 p-1 gap-x-2 gap-y-3">
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
                OBD
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
                SMS
              </Button>
              <Button
                draggable
                onDragStart={(event) => {}}
                onClick={() => {
                  reset();
                }}
                className={
                  "cursor-pointer flex flex-col h-fit text-[0.9rem] bg-gradient-to-br from-red-400 to-red-600 shadow-lg"
                }
              >
                Reset
              </Button>
            </div>
          </div>

          <div className="w-full space-y-2">
            <InputField
              id="workflowName"
              name="workflowName"
              label="WorkFlow Name"
              tooltipContent="Enter WorkFlow Name"
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
              label={`Save`}
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
        style={{ width: "50vw" }}
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
    </>
  );
};
