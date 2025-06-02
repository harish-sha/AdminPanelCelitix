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
import { motion } from "framer-motion";
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
import { Answer } from "./components/answer";
import { Agent } from "./components/agent";
import { getAgentList, getDepartmentList } from "@/apis/Agent/Agent";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import {
  getWabaList,
  saveOrEditBot,
  uploadImageFile,
} from "@/apis/whatsapp/whatsapp";
import InputField from "@/whatsapp/components/InputField";
import UniversalButton from "@/components/common/UniversalButton";
import { Details } from "./components/details";
import generateBotPayload from "./components/helper/generatePayload";
import { List } from "./components/list";
import { ButtonNodeContent } from "./components/button";

import { useNavigate, useLocation } from "react-router-dom";
import {
  convertToReactFlow,
  transformNodesById,
} from "./components/helper/convertToReactFlow";

const initialNodes = [];
const initialEdges = [];

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
            ); // ensure numeric order

            let shift = false;

            keys.forEach((key) => {
              const keyNum = parseInt(key);
              if (key === id) {
                shift = true; // start shifting from next key
                return; // skip current key (i.e., delete)
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
      {data?.type !== "list" && data?.type !== "button" && (
        <Handle
          type="target"
          position={Position.Top}
          className={`${data.type == "starting" ? "hidden" : ""} `}
          style={{
            background: connectionType === "source" ? "green" : "blue",
          }}
        />
      )}
      {/* <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: connectionType === "target" ? "green" : "blue",
        }} 
      />
         */}

      {data?.type === "list" ? (
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
                  {option.option || `Option ${index + 1}`}
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
      ) : data?.type === "button" ? (
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
                  {option || `Option ${index + 1}`}
                </span>
                <Handle
                  id={`btn-opt-${index}`}
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
      ) : (
        <Handle
          type="source"
          position={Position.Bottom}
          style={{
            background: connectionType === "target" ? "green" : "blue",
          }}
        />
      )}
    </div>
  );
}

const CreateWhatsAppBot = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  let node = [];
  let edge = [];
  let data = {};

  if (state) {
    const body = JSON.parse(state?.jsonbody);
    const { nodes, edges } = convertToReactFlow(body);
    const options = transformNodesById(body);

    data = options;
    node = nodes;
    edge = edges;
  }

  const [nodes, setNodes, onNodesChange] = useNodesState(node);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edge);
  const [nodeId, setNodeId] = useState(node ? node.length + 1 : 1);
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionType, setConnectionType] = useState("");
  const [lastPosition, setLastPosition] = useState({ x: 50, y: 50 });

  const [nodesInputData, setNodesInputData] = useState(data);
  const [allVariables, setAllVariables] = useState([]);

  const [details, setDetails] = useState({
    waba: [],
    selected: "",
    name: "",
  });

  const [agenstState, setAgentState] = useState({
    agent: [],
    dept: [],
  });

  useEffect(() => {
    async function handleFetchAgent() {
      try {
        const res = await getAgentList();
        setAgentState((prev) => ({
          ...prev,
          agent: res.data,
        }));
      } catch (e) {
        return toast.error("Error fetching Agent");
      }
    }
    async function handleFetchDept() {
      try {
        const res = await getDepartmentList();
        setAgentState((prev) => ({
          ...prev,
          dept: res.data,
        }));
      } catch (e) {
        return toast.error("Error fetching Department");
      }
    }
    async function handleFetchWaba() {
      try {
        const res = await getWabaList();

        setDetails((prev) => ({
          ...prev,
          waba: res || [],
          selected: state?.wabaNumber || "",
          name: state?.botName ?? "",
        }));
      } catch (e) {
        return toast.error("Error fetching Waba");
      }
    }

    handleFetchAgent();
    handleFetchDept();
    handleFetchWaba();
  }, []);

  const onConnect = useCallback(
    (connection: { source: any; target: any }) => {
      const { source, target } = connection;

      let isSourceAlreadyConnected = false;
      let isTargetAlreadyConnected = false;

      // if (type !== "list" || type !== "button") {
      //   isSourceAlreadyConnected = edges.some((edge) => edge.source === source);

      //   isTargetAlreadyConnected = edges.some((edge) => edge.target === target);
      // }

      // if (type === "list" || type === "button") {
      //   isSourceAlreadyConnected = edges.some(
      //     (edge) => edge.sourceHandle === source
      //   );

      //   isTargetAlreadyConnected = edges.some((edge) => edge.target === target);
      // }

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

      setEdges((eds) =>
        eds.filter(
          (edge) => edge.sourceHandler !== nodeId && edge.target !== nodeId
        )
      );

      setIsVisible(false);
    },
    [setNodes, setEdges]
  );

  const reset = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setNodeId(1);
    setNodesInputData({});
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
          setNodesInputData={setNodesInputData}
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
          setNodesInputData={setNodesInputData}
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
          setNodesInputData={setNodesInputData}
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
          setNodesInputData={setNodesInputData}
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
          setNodesInputData={setNodesInputData}
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
          setNodesInputData={setNodesInputData}
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
          setNodesInputData={setNodesInputData}
          nodesInputData={nodesInputData}
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
          setNodesInputData={setNodesInputData}
          nodesInputData={nodesInputData}
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
          setNodesInputData={setNodesInputData}
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
          setNodesInputData={setNodesInputData}
        />
      ),
    }),
    [deleteNode, isConnecting, nodesInputData]
  );

  const onNodeClick = (_event: any, node: any) => {
    setType(node.type);
    setSelectedNodeId(node.id);
  };
  const commonButtonClass =
    // "cursor-pointer flex flex-col h-fit text-[0.9rem] bg-gradient-to-br from-blue-400 to-gray-600 shadow-lg ";
    "cursor-pointer flex flex-col h-auto text-[0.7rem] bg-white text-gray-900 border-2 border-gray-500 shadow-lg hover:bg-gradient-to-br hover:from-blue-200 hover:to-blue-300 hover:text-gray-900 hover:shadow-2xl hover:scale-105";

  function addVariable(data: String) {
    if (!data) {
      return toast.error("Please enter a variable name");
    }

    const storedVariables = JSON.parse(localStorage.getItem("botVar") || "[]");

    const updatedVariables = [...storedVariables, data];

    const uniqueVariables = new Set(updatedVariables);

    setAllVariables(Array.from(uniqueVariables));
    localStorage.setItem("botVar", JSON.stringify(Array.from(uniqueVariables)));

    // const uniqueVar = updatedVariables.filter(
    //   (item, index) => updatedVariables.indexOf(item) === index
    // );

    // setAllVariables((prevVars) => [...prevVars, uniqueVar]);
    // localStorage.setItem("botVar", JSON.stringify(uniqueVar));
    //   setVariableInput("");
  }

  useEffect(() => {
    setAllVariables(JSON.parse(localStorage.getItem("botVar") || "[]"));
  }, []);

  function handleSaveNodeData() {
    const data = {
      image: {
        fileUrl: "",
        fileCaption: "",
      },
      audio: {
        fileUrl: "",
        fileCaption: "",
      },
      document: {
        fileUrl: "",
        fileCaption: "",
      },
      video: {
        fileUrl: "",
        fileCaption: "",
      },
      starting: {
        startingKeyword: "",
      },
      text: {
        message: "",
      },
      agent: {
        type: "",
        id: "",
      },
      list: {
        type: "",
        text: "",
        message: "",
        options: [],
      },
      answer: {
        variableId: "",
        type: "",
      },
      button: {
        type: "",
        // text: "",
        message: "",
        buttonTexts: [],
      },
    };
    const nodeData = nodesInputData[selectedNodeId];
    const requiredFields = data[type];

    if (!nodeData || !requiredFields) {
      toast.error("Invalid node data or type");
      return;
    }

    const missingFields = Object.keys(requiredFields).filter(
      (key) => !nodeData[key] || nodeData[key] === ""
    );
    if (missingFields.length > 0) {
      toast.error(
        `Please fill in the following fields: ${missingFields.join(", ")}`
      );
      return;
    }

    if (type === "list" && nodeData.options.length === 0) {
      toast.error("Please add at least one option in list node");
      return;
    }
    if (type === "button" && nodeData.buttonTexts.length === 0) {
      toast.error("Please add at least one option in button node");
      return;
    }

    if (type === "list") {
      const optionsToSave = [];
      let isError = false;
      nodeData?.options.map(
        (option: { option: string; value: string }, index: number) => {
          if (option.option === "" && option.value === "") return;
          if (option.option && !option.value) {
            isError = true;
            toast.error(`Value is required for option ${index + 1}`);
            return;
          }
          if (!option.option && option.value) {
            isError = true;
            toast.error(`Option Name is required for option ${index + 1}`);
            return;
          }
          optionsToSave.push(option);
        }
      );

      if (isError) return;

      nodeData.options = optionsToSave;
    }
    if (type === "button") {
      const optionsToSave = [];
      let isError = false;
      nodeData?.buttonTexts.map(
        (option: { option: string; value: string }, index: number) => {
          if (!option) {
            isError = true;
            toast.error(`Option is required for option ${index + 1}`);
            return;
          }
          optionsToSave.push(option);
        }
      );

      if (isError) return;

      nodeData.buttonTexts = optionsToSave;
    }

    setSelectedNodeId("");
    setType("");
    setIsVisible(false);
  }

  const handleSubmit = async () => {
    if (!details?.name) {
      return toast.error("Please enter bot name");
    }
    if (!details?.selected) {
      return toast.error("Please select Waba");
    }

    if (Object.keys(nodesInputData).length === 0) {
      return toast.error(
        "Please add at least one node or fill existing node data first"
      );
    }

    if (nodes[0]?.type !== "starting") {
      return toast.error("Starting node should be the first node");
    }

    if (nodes.filter((node) => node.type === "starting")?.length > 1) {
      return toast.error("Please add only one starting node");
    }

    if (edges && edges.length === 0) {
      return toast.error("Please add at least one edge");
    }

    const dataTemplate = {
      image: {
        fileUrl: "",
        fileCaption: "",
      },
      audio: {
        fileUrl: "",
        fileCaption: "",
      },
      document: {
        fileUrl: "",
        fileCaption: "",
      },
      video: {
        fileUrl: "",
        fileCaption: "",
      },
      starting: {
        startingKeyword: "",
      },
      text: {
        message: "",
      },
      agent: {
        type: "",
        id: "",
      },
      answer: {
        variableId: "",
        type: "",
      },
      list: {
        type: "",
        text: "",
        message: "",
        options: [],
      },
      button: {
        type: "",
        // text: "",
        message: "",
        buttonTexts: [],
      },
    };

    let name = "";
    let isError = false;

    for (const node of nodes) {
      const { id, type } = node;
      const nodeData = nodesInputData[id];
      const requiredFields = dataTemplate[type];

      if (!requiredFields) {
        toast.error(`Unsupported node type "${type}" in node ${id}`);
        return;
      }

      if (
        nodeData?.fileUrl &&
        !["http", "https"].includes(nodeData?.fileUrl.slice(0, 4))
      ) {
        const res = await uploadImageFile(nodeData?.fileUrl);

        nodeData.fileUrl = res?.fileUrl;
      }

      if (nodeData?.options && nodeData?.options.length > 0) {
        nodeData.options.map((item: any, index: number) => {
          if (!item.option || !item.value) {
            isError = true;
            return toast.error(
              `Missing "option" or "value" for list item ${
                index + 1
              } in node "${id}".`
            );
          }
        });
      }
      if (nodeData?.buttonTexts && nodeData?.buttonTexts.length > 0) {
        nodeData.buttonTexts.map((item: any, index: number) => {
          if (!item) {
            isError = true;
            return toast.error(
              `Missing "buttonValue" for button ${index + 1} in node "${id}".`
            );
          }
        });
      }

      name = agenstState.dept.find(
        (item) => item.departmentId === nodeData?.id
      )?.departmentName;
      if (!nodeData) {
        toast.error(`No data found for node ID ${id}`);
        return;
      }

      const missingFields = Object.keys(requiredFields).filter(
        (key) =>
          nodeData[key] === undefined ||
          nodeData[key] === null ||
          nodeData[key] === ""
      );

      if (missingFields.length > 0) {
        toast.error(
          `Missing fields in node ${id} of type "${type}": ${missingFields.join(
            ", "
          )}`
        );
        return;
      }

      if (isError) {
        return;
      }
    }
    // }
    const srno = details?.waba.find(
      (item) => item.mobileNo === details?.selected
    )?.wabaSrno;

    const botDetails = {
      botName: details?.name,
      wabaNumber: details?.selected,
      wabaSrno: srno,
      deptName: name,
    };

    const payload = generateBotPayload(
      nodes,
      edges,
      nodesInputData,
      botDetails
    );
    // console.log("payt", payload);
    if (!payload) {
      return toast.error("Error Generating Payload");
    }
    // return;
    try {
      const res = await saveOrEditBot(payload, state?.botSrno);
      if (!res?.status) {
        return toast.error("Error Saving Bot");
      }

      setNodes(initialNodes);
      setEdges(initialEdges);
      setNodeId(1);
      setNodesInputData({});
      setDetails((prev) => ({
        ...prev,
        selected: "",
        name: "",
      }));
      toast.success("Bot Save Successfully");
      navigate("/wwhatsappbot");
    } catch (e) {
      // console.log(e);
      toast.error("Error Saving Bot");
    }
  };

  return (
    <>
      <div
        className="flex"
        // style={{ height: "calc(100vh - 150px)" }}
      >
        <div
          className=""
          style={{ width: "90vw", height: "full" }}
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
          >
            <Background />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>

        <div className="flex flex-col justify-between w-[250px] bg-gray-50 gap-4 px-2 py-2 rounded-md h-auto">
          <div className="grid grid-cols-2 p-1 gap-x-2 gap-y-3">
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

          <Details
            setDetails={setDetails}
            details={details}
            handleSubmit={handleSubmit}
            isUpdate={state ?? false}
          />
        </div>
      </div>

      {/* Header Section */}
      {/* <div className="flex items-center justify-between p-3 bg-white rounded-t-2xl rounded-bl-2xl">
        <h1 className="text-xl font-semibold text-gray-800">
          Create WhatsApp Bot
        </h1>
        <div className="flex gap-4">
          <Button
            onClick={reset}
            className="px-4 py-2 text-white bg-red-400 rounded-md hover:bg-red-600"
          >
            Reset Canvas
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Save Bot
          </Button>
        </div>
      </div>

      <div className="flex bg-white" style={{ height: "calc(100vh - 200px)" }}>
        <div
          className="flex-1 bg-gray-100 p-4 rounded-tr-2xl rounded-md border-2 border-gray-200 h-auto"
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
          >
            <Background />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>

        <div className="flex flex-col justify-between w-[160px] gap-6 bg-white p-4 rounded-b-2xl shadow-lg">
          <div className="grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              draggable
              onDragStart={(event) => handleDragStart(event, "starting")}
              onClick={() => addNode("starting")}
              className="flex items-center justify-center gap-2 p-3 text-gray-500 font-semibold bg-gradient-to-br from-green-400 to-green-300 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer h-14 w-33"
            >
              <div className="flex items-center justify-center gap-2">
                <OutlinedFlagOutlinedIcon />
                <span>Start</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              draggable
              onDragStart={(event) => handleDragStart(event, "text")}
              onClick={() => addNode("text")}
              className="flex items-center justify-center gap-2 p-3 text-gray-500 font-semibold bg-gradient-to-br from-indigo-100 to-indigo-300 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer h-14 w-33"
            >
              <div className="flex items-center justify-center gap-2">
                <TextFieldsOutlinedIcon />
                <span>Text</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              draggable
              onDragStart={(event) => handleDragStart(event, "image")}
              onClick={() => addNode("image")}
              className="flex items-center justify-center gap-2 p-3 text-gray-500 font-semibold bg-gradient-to-br from-indigo-100 to-indigo-300 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer h-14 w-33"
            >
              <div className="flex items-center justify-center gap-2">
                <ImageOutlinedIcon />
                <span>Image</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              draggable
              onDragStart={(event) => handleDragStart(event, "video")}
              onClick={() => addNode("video")}
              className="flex items-center justify-center gap-2 p-3 text-gray-500 font-semibold bg-gradient-to-br from-indigo-100 to-indigo-300 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer  h-14 w-33"
            >
              <div className="flex items-center justify-center gap-2">
                <VideocamOutlinedIcon />
                <span>Video</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              draggable
              onDragStart={(event) => handleDragStart(event, "document")}
              onClick={() => addNode("document")}
              className="flex items-center justify-center gap-2 p-3 text-gray-500 font-semibold bg-gradient-to-br from-indigo-100 to-indigo-300 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer h-14 w-33"
            >
              <div className="flex items-center justify-center gap-2">
                <ArticleOutlinedIcon />
                <span>Document</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              draggable
              onDragStart={(event) => handleDragStart(event, "audio")}
              onClick={() => addNode("audio")}
              className="flex items-center justify-center gap-2 p-3 text-gray-500 font-semibold bg-gradient-to-br from-indigo-100 to-indigo-300 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer h-14 w-33"
            >
              <div className="flex items-center justify-center gap-2">
                <MicOutlinedIcon />
                <span>Audio</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              draggable
              onDragStart={(event) => handleDragStart(event, "button")}
              onClick={() => addNode("button")}
              className="flex items-center justify-center gap-2 p-3 text-gray-500 font-semibold bg-gradient-to-br from-indigo-100 to-indigo-300 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer h-14 w-33"
            >
              <div className="flex items-center justify-center gap-2">
                <BsMenuButton />
                <span>Button</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              draggable
              onDragStart={(event) => handleDragStart(event, "list")}
              onClick={() => addNode("list")}
              className="flex items-center justify-center gap-2 p-3 text-gray-500 font-semibold bg-gradient-to-br from-indigo-100 to-indigo-300 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer h-14 w-33"
            >
              <div className="flex items-center justify-center gap-2">
                <FormatListBulletedOutlinedIcon />
                <span>List</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.3, ease: "easeOut" }}
              draggable
              onDragStart={(event) => handleDragStart(event, "agent")}
              onClick={() => addNode("agent")}
              className="flex items-center justify-center gap-2 p-3 text-gray-500 font-semibold bg-gradient-to-br from-indigo-100 to-indigo-300 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer h-14 w-33"
            >
              <div className="flex items-center justify-center gap-2">
                <MicOutlinedIcon />
                <span>Agent</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              draggable
              onDragStart={(event) => handleDragStart(event, "answer")}
              onClick={() => addNode("answer")}
              className="flex items-center justify-center gap-2 p-3 text-gray-500 font-semibold bg-gradient-to-br from-indigo-100 to-indigo-300 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer h-14 w-33"
            >
              <div className="flex items-center justify-center gap-2">
                <QuestionAnswerOutlinedIcon />
                <span>Answer</span>
              </div>
            </motion.div>
            <Button onClick={reset} className={commonButtonClass}>
              <RestartAltOutlinedIcon />
              Reset
            </Button>
          </div>

          <Details
            setDetails={setDetails}
            details={details}
            handleSubmit={handleSubmit}
            isUpdate={state ?? false}
          />
        </div>
      </div> */}

      <Dialog
        header={
          <>
            <h1>Add Node Details</h1>
            {type === "text" ? (
              <p className="text-sm">(Enter the text for the node)</p>
            ) : ["document", "audio", "video", "image"].includes(type) ? (
              <p className="text-sm">
                (Upload supporting document for the node)
              </p>
            ) : type === "starting" ? (
              <p className="text-sm">
                (Select the keyword which will start the conversation)
              </p>
            ) : type === "list" ? (
              <p className="text-sm">(Make list options for the list node)</p>
            ) : type === "button" ? (
              <p className="text-sm">
                (Make button options for the button node)
              </p>
            ) : null}
          </>
        }
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
          {type === "text" ? (
            <TextNodeContent
              id={selectedNodeId}
              nodesInputData={nodesInputData}
              setNodesInputData={setNodesInputData}
              allVariables={allVariables}
              addVariable={addVariable}
            />
          ) : ["document", "audio", "video", "image"].includes(type) ? (
            <FileNodeContent
              accept={type}
              allVariables={allVariables}
              id={selectedNodeId}
              nodesInputData={nodesInputData}
              setNodesInputData={setNodesInputData}
              addVariable={addVariable}
            />
          ) : type === "starting" ? (
            <StartingNodeContent
              id={selectedNodeId}
              nodesInputData={nodesInputData}
              setNodesInputData={setNodesInputData}
            />
          ) : type === "answer" ? (
            <Answer
              id={selectedNodeId}
              nodesInputData={nodesInputData}
              setNodesInputData={setNodesInputData}
              addVariable={addVariable}
              allVariables={allVariables}
            />
          ) : type === "agent" ? (
            <Agent
              id={selectedNodeId}
              nodesInputData={nodesInputData}
              setNodesInputData={setNodesInputData}
              agentState={agenstState}
            />
          ) : type === "list" ? (
            <List
              allVariables={allVariables}
              id={selectedNodeId}
              nodesInputData={nodesInputData}
              setNodesInputData={setNodesInputData}
              addVariable={addVariable}
            />
          ) : type === "button" ? (
            <ButtonNodeContent
              id={selectedNodeId}
              nodesInputData={nodesInputData}
              setNodesInputData={setNodesInputData}
            />
          ) : null}

          <div className="flex gap-2">
            <Button onClick={handleSaveNodeData}>Save</Button>
            <Button onClick={() => setIsVisible(false)}>Cancel</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CreateWhatsAppBot;
