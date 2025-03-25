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
import { Button } from "@/components/ui/button";
import { Dialog } from "primereact/dialog";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const initialNodes = [];
const initialEdges = [];

function NodeComponent({
  id,
  data,
  onDelete,
  isConnecting,
  setIsVisible,
  connectionType,
}: {
  id: string;
  data: any;
  onDelete: (id: string) => void;
  isConnecting: boolean;
  setIsVisible: any;
  connectionType: string;
}) {
  return (
    <div className="relative w-40 p-2 bg-white border border-gray-300 rounded shadow-md">
      <button
        className="absolute top-0 right-0 p-1 text-xs text-white bg-red-500 rounded hover:bg-red-700"
        onClick={() => {
          onDelete(id);
          setIsVisible(false);
        }}
      >
        X
      </button>
      <button
        className="absolute left-0 p-0 text-xs -top-3"
        onClick={() => {
          setIsVisible(true);
        }}
      >
        <SettingsOutlinedIcon />
      </button>

      <div className="font-medium text-center">
        {data.type === "text" && <p>Text Node ({id})</p>}
        {data.type === "image" && <p>Image Node ({id})</p>}
        {data.type === "video" && <p>Video Node ({id})</p>}
        {data.type === "document" && <p>Document Node ({id})</p>}
        {data.type === "starting" && <p>Starting Node ({id})</p>}
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className={`${data.type == "starting" ? "hidden" : ""} `}
        style={{
          background: connectionType === "source" ? "green" : "blue",
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: connectionType === "target" ? "green" : "blue",
        }}
      />
    </div>
  );
}

const Arihant = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeId, setNodeId] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionType, setConnectionType] = useState("");

  const onConnect = useCallback(
    (connection: { source: any; target: any }) => {
      const { source, target } = connection;

      const isSourceAlreadyConnected = edges.some(
        (edge) => edge.source === source
      );

      const isTargetAlreadyConnected = edges.some(
        (edge) => edge.target === target
      );

      if (isSourceAlreadyConnected || isTargetAlreadyConnected) {
        alert("This connection is not allowed!");
        return;
      }

      setEdges((eds) => addEdge(connection, eds));
    },
    [edges, setEdges]
  );

  const addNode = (type: string) => {
    const newNode = {
      id: `${nodeId}`,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { type },
      type,
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
    setNodeId((prevId) => prevId + 1);
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

      setIsVisible(false);
    },
    [setNodes, setEdges]
  );

  const reset = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setNodeId(1);
  };

  const nodeTypes = useMemo(
    () => ({
      text: (node: any) => (
        <NodeComponent
          id={node.id}
          data={node.data}
          onDelete={deleteNode}
          isConnecting={isConnecting}
          setIsVisible={setIsVisible}
          connectionType={connectionType}
        />
      ),
      image: (node) => (
        <NodeComponent
          id={node.id}
          data={node.data}
          onDelete={deleteNode}
          isConnecting={isConnecting}
          setIsVisible={setIsVisible}
          connectionType={connectionType}
        />
      ),
      video: (node) => (
        <NodeComponent
          id={node.id}
          data={node.data}
          onDelete={deleteNode}
          isConnecting={isConnecting}
          setIsVisible={setIsVisible}
          connectionType={connectionType}
        />
      ),
      document: (node) => (
        <NodeComponent
          id={node.id}
          data={node.data}
          onDelete={deleteNode}
          isConnecting={isConnecting}
          setIsVisible={setIsVisible}
          connectionType={connectionType}
        />
      ),
      starting: (node) => (
        <NodeComponent
          id={node.id}
          data={node.data}
          onDelete={deleteNode}
          isConnecting={isConnecting}
          setIsVisible={setIsVisible}
          connectionType={connectionType}
        />
      ),
    }),
    [deleteNode, isConnecting]
  );

  const onNodeClick = (_event: any, node: any) => {
    setType(node.type);
    setSelectedNodeId(node.id);
  };

  return (
    <>
      <div className="flex">
        <div style={{ width: "100vw", height: "100vh" }}>
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
            fitView
          >
            <Background />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>
        <div className="flex flex-col gap-1.5 p-2">
          <Button onClick={() => addNode("starting")}>Add Starting Node</Button>
          <Button onClick={() => addNode("text")}> Add Text Node</Button>
          <Button onClick={() => addNode("image")}> Add Image Node</Button>
          <Button onClick={() => addNode("video")}> Add Video Node</Button>
          <Button onClick={() => addNode("document")}>
            {" "}
            Add Document Node
          </Button>
          <Button onClick={reset}> Reset</Button>
        </div>
      </div>

      <Dialog
        header="Add Node Details"
        visible={isVisible}
        onHide={() => {
          setType("");
          setIsVisible(false);
        }}
        style={{ width: "50vw" }}
        draggable={false}
      >
        <>
          <h1>{type}</h1>
          <Button onClick={() => deleteNode(selectedNodeId)}>Delete</Button>
        </>
      </Dialog>
    </>
  );
};

export default Arihant;
