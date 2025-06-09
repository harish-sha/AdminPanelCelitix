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
    // setType(node.type);
    // setSelectedNodeId(node.id);
  };

  const commonButtonClass =
    "cursor-pointer flex flex-col h-fit text-[0.9rem] bg-gradient-to-br from-blue-400 to-gray-600 shadow-lg ";

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

    // Calculate the position relative to the React Flow container
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
            // nodeTypes={nodeTypes}
            onConnectStart={(event, { handleType }) => {
              // setIsConnecting(true);
              // setConnectionType(handleType);
            }}
            onConnectEnd={() => {
              // setIsConnecting(false);
              // setConnectionType("");
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
                className={commonButtonClass}
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
              onClick={() => {}}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
