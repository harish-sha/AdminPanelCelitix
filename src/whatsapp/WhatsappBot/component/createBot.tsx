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
import { StartingNodeContent } from "./components/starting";
import { TextNodeContent } from "./components/text";
import { FileNodeContent } from "./components/file";

import { Button } from "@/components/ui/button";
import { Dialog } from "primereact/dialog";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import OutlinedFlagOutlinedIcon from "@mui/icons-material/OutlinedFlagOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { BsMenuButton } from "react-icons/bs";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import toast from "react-hot-toast";

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
    <div className="relative p-1.5 bg-white border border-gray-300 rounded-md shadow-md">
      <button
        className="absolute -top-2 -right-1 text-xs text-white bg-red-500 rounded-full hover:bg-red-700 h-4 w-4 text-center"
        onClick={() => {
          onDelete(id);
          setIsVisible(false);
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
        {data.type === "starting" && <p>Starting Node ({id})</p>}
        {data.type === "text" && <p>Text Node ({id})</p>}
        {data.type === "image" && <p>Image Node ({id})</p>}
        {data.type === "video" && <p>Video Node ({id})</p>}
        {data.type === "document" && <p>Document Node ({id})</p>}
        {data.type === "audio" && <p>Audio Node ({id})</p>}
        {data.type === "agent" && <p>Agent Node ({id})</p>}
        {data.type === "answer" && <p>Answer Node ({id})</p>}
        {data.type === "list" && <p>List Node ({id})</p>}
        {data.type === "button" && <p>Button Node ({id})</p>}
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

const CreateWhatsAppBot = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeId, setNodeId] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionType, setConnectionType] = useState("");
  const [lastPosition, setLastPosition] = useState({ x: 50, y: 50 });

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
        toast.error("This connection is not allowed!");
        return;
      }

      setEdges((eds) => addEdge(connection, eds));
    },
    [edges, setEdges]
  );

  // const addNode = (type: string) => {
  //   const newNode = {
  //     id: `${nodeId}`,
  //     position: { x: Math.random() * 400, y: Math.random() * 400 },
  //     data: { type },
  //     type,
  //   };

  //   setNodes((prevNodes) => [...prevNodes, newNode]);
  //   setNodeId((prevId) => prevId + 1);
  // };

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

  // drag and drop nodes
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
      audio: (node) => (
        <NodeComponent
          id={node.id}
          data={node.data}
          onDelete={deleteNode}
          isConnecting={isConnecting}
          setIsVisible={setIsVisible}
          connectionType={connectionType}
        />
      ),
      button: (node) => (
        <NodeComponent
          id={node.id}
          data={node.data}
          onDelete={deleteNode}
          isConnecting={isConnecting}
          setIsVisible={setIsVisible}
          connectionType={connectionType}
        />
      ),
      list: (node) => (
        <NodeComponent
          id={node.id}
          data={node.data}
          onDelete={deleteNode}
          isConnecting={isConnecting}
          setIsVisible={setIsVisible}
          connectionType={connectionType}
        />
      ),
      agent: (node) => (
        <NodeComponent
          id={node.id}
          data={node.data}
          onDelete={deleteNode}
          isConnecting={isConnecting}
          setIsVisible={setIsVisible}
          connectionType={connectionType}
        />
      ),
      answer: (node) => (
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
  const commonButtonClass =
    "cursor-pointer flex flex-col h-fit text-[0.9rem] bg-gradient-to-br from-blue-400 to-gray-600 shadow-lg ";

  return (
    <>
      <div className="flex">
        <div
          style={{ width: "90vw", height: "90vh" }}
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

        <div className="grid grid-cols-2 p-1 gap-x-2 gap-y-3 h-fit">
          <Button
            draggable
            onDragStart={(event) => handleDragStart(event, "starting")}
            onClick={() => addNode("starting")}
            className={commonButtonClass}
          >
            <OutlinedFlagOutlinedIcon /> Start
          </Button>
          <Button
            draggable
            onDragStart={(event) => handleDragStart(event, "text")}
            onClick={() => addNode("text")}
            className={commonButtonClass}
          >
            <TextFieldsOutlinedIcon />
            Text Node
          </Button>
          <Button
            draggable
            onDragStart={(event) => handleDragStart(event, "image")}
            onClick={() => addNode("image")}
            className={commonButtonClass}
          >
            <ImageOutlinedIcon />
            Image
          </Button>
          <Button
            draggable
            onDragStart={(event) => handleDragStart(event, "video")}
            onClick={() => addNode("video")}
            className={commonButtonClass}
          >
            <VideocamOutlinedIcon />
            Video
          </Button>
          <Button
            draggable
            onDragStart={(event) => handleDragStart(event, "document")}
            onClick={() => addNode("document")}
            className={commonButtonClass}
          >
            <ArticleOutlinedIcon />
            Document
          </Button>
          <Button
            draggable
            onDragStart={(event) => handleDragStart(event, "audio")}
            onClick={() => addNode("audio")}
            className={commonButtonClass}
          >
            <MicOutlinedIcon />
            Audio
          </Button>
          <Button
            draggable
            onDragStart={(event) => handleDragStart(event, "button")}
            onClick={() => addNode("button")}
            className={commonButtonClass}
          >
            <BsMenuButton />
            Button
          </Button>
          <Button
            draggable
            onDragStart={(event) => handleDragStart(event, "list")}
            onClick={() => addNode("list")}
            className={commonButtonClass}
          >
            <FormatListBulletedOutlinedIcon />
            List
          </Button>
          <Button
            draggable
            onDragStart={(event) => handleDragStart(event, "agent")}
            onClick={() => addNode("agent")}
            className={commonButtonClass}
          >
            <MicOutlinedIcon />
            Agent
          </Button>
          <Button
            draggable
            onDragStart={(event) => handleDragStart(event, "answer")}
            onClick={() => addNode("answer")}
            className={commonButtonClass}
          >
            <QuestionAnswerOutlinedIcon />
            Answer
          </Button>
          <Button onClick={reset} className={commonButtonClass}>
            <RestartAltOutlinedIcon />
            Reset
          </Button>
        </div>
      </div>

      <Dialog
        header={
          <>
            <h1>Add Node Details</h1>
            <p className="text-sm">(Short desc of the node)</p>
          </>
        }
        visible={isVisible}
        onHide={() => {
          setType("");
          setIsVisible(false);
        }}
        style={{ width: "50vw" }}
        draggable={false}
      >
        <div className="flex flex-col gap-2">
          {type === "text" ? (
            <TextNodeContent />
          ) : ["document", "audio", "video", "image"].includes(type) ? (
            <FileNodeContent accept={type} />
          ) : type === "starting" ? (
            <StartingNodeContent />
          ) : null}

          <div className="flex gap-2">
            <Button onClick={() => {}}>Save</Button>
            <Button onClick={() => setIsVisible(false)}>Cancel</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CreateWhatsAppBot;
