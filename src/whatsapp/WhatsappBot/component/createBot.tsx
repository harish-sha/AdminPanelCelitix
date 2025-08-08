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
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import { TextNodeContent } from "./components/text";
import { FileNodeContent } from "./components/file";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog } from "primereact/dialog";
import { FaRegEdit } from "react-icons/fa";
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
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiRobot2Line } from "react-icons/ri";
import { TbMessage } from "react-icons/tb";
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
import LinkIcon from "@mui/icons-material/Link";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import DeviceHubRoundedIcon from "@mui/icons-material/DeviceHubRounded";
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


import { useNavigate, useLocation } from "react-router-dom";
import {
  convertToReactFlow,
  transformNodesById,
} from "./components/helper/convertToReactFlow";
import { Url } from "./components/url";
import { HiOutlineTemplate } from "react-icons/hi";
import { TemplateNode } from "./components/template";
import { AiOutlineApi } from "react-icons/ai";
import { Api } from "./components/api";
import ParticleBackground from "./components/ParticleBackground";
import CustomTooltip from "@/whatsapp/components/CustomTooltip";
import { IoPersonAddOutline } from "react-icons/io5";
import PreviewDrawer from "./components/PreviewDrawer";
import { IoInformationSharp } from "react-icons/io5";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import GuidesManager from "./components/GuidesManager";

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
  isBtnDisable = false,
  details

}: {
  id: string;
  data: any;
  onDelete: (id: string) => void;
  isConnecting: boolean;
  setIsVisible: any;
  connectionType: string;
  setNodesInputData: any;
  nodesInputData?: any;
  isBtnDisable?: boolean;
  details: any
}) {
  const options = nodesInputData?.[id]?.options || [];
  const buttonTexts = nodesInputData?.[id]?.buttonTexts || [];

  { JSON.stringify(nodesInputData, null, 2) }

  const [open, setOpen] = useState(false);
  const [selectNode, setSelectNode] = useState("")




  console.log("selectNode", selectNode)
  console.log("data.type", data.type)

  const NodeBtnClass = 'h-6 w-6 shadow text-xs bg-blue-200 rounded-full flex items-center justify-center text-gray-700';

  return (
    <div className="p-2 bg-white rounded-md shadow-md relative group min-h-12 max-h-auto flex justify-center flex-col ">
      <div className="absolute top-2 -right-7 z-10">
        <AnimatePresence>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="hidden group-hover:block"
          >
            <Tooltip title="Delete Component" placement="right">
              <IconButton
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
                <DeleteForeverIcon style={{ fontSize: "19px" }} className="text-red-700 " />
              </IconButton>
            </Tooltip>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute -left-7 gap-1 -top-1.5 flex flex-col z-10">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="hidden group-hover:block"
        >
          <Tooltip title="Edit Component" placement="left">
            <IconButton
              onClick={() => {
                setIsVisible(true);
              }}
              disabled={isBtnDisable}
            >
              <FaRegEdit size={15} />
            </IconButton>
          </Tooltip>
        </motion.div>

        {
          data?.type !== "template" && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="hidden group-hover:block"
            >
              <Tooltip title={open ? "Hide Preview" : "View Preview"} placement="left">
                <IconButton onClick={() => setOpen(!open)} disabled={isBtnDisable} size="small">
                  {open ? (
                    <AiOutlineEyeInvisible size={17} color="green" />
                  ) : (
                    <AiOutlineEye size={17} color="green" />
                  )}
                </IconButton>
              </Tooltip>
            </motion.div>
          )
        }
      </div>
      {/* Preview drawer */}
      <PreviewDrawer open={open} onClose={() => setOpen(false)} title="Node Preview" id={id} nodesInputData={nodesInputData} type={data?.type} details={details} />


      <div className="font-medium text-center flex items-center justify-between gap-2 text-sm">
        {data.type === "starting" &&
          <p className="flex justify-between items-center gap-2"><RiRobot2Line className="text-purple-900 size-6" /> <span className="text-sm font-semibold text-gray-700"> Starting keyword </span>
            <div className={NodeBtnClass}>{id}</div>
          </p>
        }
        {data.type === "text" &&
          <p className="flex justify-between items-center gap-2"><TextFieldsOutlinedIcon className="text-purple-900 size-6" /> <span className="text-sm font-semibold text-gray-700"> Text</span>
            <div className={NodeBtnClass}>{id}</div>
          </p>
        }
        {data.type === "image" &&
          <p className="flex justify-between items-center gap-2"><ImageOutlinedIcon className="text-purple-900" /><span className="text-sm font-semibold text-gray-700">Image</span>
            <div className={NodeBtnClass}> {id} </div>
          </p>
        }
        {data.type === "video" &&
          <p className="flex justify-between items-center gap-2"><VideocamOutlinedIcon className="text-purple-900 size-6" /> <span className="text-sm font-semibold text-gray-700">Video </span>
            <div className={NodeBtnClass}>{id}</div>
          </p>
        }
        {data.type === "document" &&
          <p className="flex justify-between items-center gap-2"><ArticleOutlinedIcon className="text-purple-900 size-6" /><span className="text-sm font-semibold text-gray-700">Document</span>
            <div className={NodeBtnClass}>{id}</div>
          </p>
        }
        {data.type === "audio" &&
          <p className="flex justify-between items-center gap-2"><MicOutlinedIcon className="text-purple-900 size-6" /><span className="text-sm font-semibold text-gray-700">Audio</span>
            <div className={NodeBtnClass}>{id}</div>
          </p>
        }
        {data.type === "agent" &&
          <p className="flex justify-between items-center gap-2"><IoPersonAddOutline className="text-purple-900 size-6" /><span className="text-sm font-semibold text-gray-700">Agent</span>
            <div className={NodeBtnClass}>{id}</div>
          </p>
        }
        {data.type === "answer" &&
          <p className="flex justify-between items-center gap-2"><QuestionAnswerOutlinedIcon className="text-purple-900 size-6" /><span className="text-sm font-semibold text-gray-700">Answer</span>
            <div className={NodeBtnClass}>{id}</div>
          </p>
        }
        {data.type === "list" &&
          <p className="flex justify-between items-center gap-2"><FormatListBulletedOutlinedIcon className="text-purple-900 size-6" /><span className="text-sm font-semibold text-gray-700">List</span>
            <div className={NodeBtnClass}>{id}</div>
          </p>
        }
        {data.type === "button" &&
          <p className="flex justify-between items-center gap-2"><BsMenuButton className="text-purple-900 size-6" /><span className="text-sm font-semibold text-gray-700">Button</span>
            <div className={NodeBtnClass}>{id}</div>
          </p>

        }
        {data.type === "urlbutton" &&
          <p className="flex justify-between items-center gap-2"><LinkIcon className="text-purple-900 size-6" /><span className="text-sm font-semibold text-gray-700">Url</span>
            <div className={NodeBtnClass}>{id}</div>
          </p>}
        {data.type === "template" && <p className="flex justify-between items-center gap-2"><HiOutlineTemplate className="text-purple-900 size-6" /><span className="text-sm font-semibold text-gray-700">Template</span> <div className={NodeBtnClass}>{id}</div></p>}
        {data.type === "api" && <p className="flex justify-between items-center gap-2"><AiOutlineApi className="text-purple-900 size-6" /><span className="text-sm font-semibold text-gray-700">API Node</span> <div className={NodeBtnClass}>{id}</div></p>}
      </div>
      {data?.type !== "list" && data?.type !== "button" && (
        <Handle
          type="target"
          position={Position.Top}
          className={`${data.type == "starting" ? "hidden" : ""} `}
          style={{
            background: connectionType === "source" ? "green" : "#6D397C",
            height: "10px",
            width: "10px",
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
              background: connectionType === "source" ? "green" : "#6D397C",

              height: "10px",
              width: "10px",

            }}
          />
          <div className="flex flex-col gap-2 mt-2">
            {options.map((option: any, index: number) => (
              <div
                key={index}
                className="relative flex items-center justify-between px-2 py-1 text-sm bg-gray-100 border rounded"
              >
                <span className="text-sm font-semibold text-gray-700">
                  {option.option || `Option ${index + 1}`}
                </span>
                <Handle
                  id={`opt-${index}`}
                  type="source"
                  position={Position.Right}
                  style={{
                    background: connectionType === "target" ? "green" : "#6D397C",
                    top: "50%",
                    transform: "translateY(-50%)",
                    right: -8,
                    height: "10px",
                    width: "10px",
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
              background: connectionType === "source" ? "green" : "#6D397C",
              height: "10px",
              width: "10px",
            }}
          />
          <div className="flex flex-col gap-2 mt-2">
            {buttonTexts.map((option: any, index: number) => (
              <div
                key={index}
                className="relative flex items-center justify-between px-2 py-1 text-sm bg-gray-100 border rounded"
              >
                <span className="text-sm font-semibold text-gray-700">
                  {option || `Option ${index + 1}`}
                </span>
                <Handle
                  id={`btn-opt-${index}`}
                  type="source"
                  position={Position.Right}
                  style={{
                    background: connectionType === "target" ? "green" : "#6D397C",
                    top: "50%",
                    transform: "translateY(-50%)",
                    right: -8,
                    height: "10px",
                    width: "10px",
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
            background: connectionType === "target" ? "green" : "#6D397C",
            height: "10px",
            width: "10px",
          }}
        />
      )}


      {nodesInputData?.type === "image" && nodesInputData[id]?.image?.fileUrl && (
        <div className="shadow-md rounded-md p-1 mt-3">
          <img
            src={nodesInputData[id].image.fileUrl}
            className="w-30 h-20 object-contain"

          />
          <p> image </p>
          <span className="text-xs font-semibold block mt-1">
            {/* Caption: {data.image.fileCaption || "N/A"} */}
          </span>
        </div>
      )}



      {nodesInputData?.type === "text" && (
        <div>
          {nodesInputData[id].message}
        </div>
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

  // const[selectedId,]
  const [nodes, setNodes, onNodesChange] = useNodesState(node);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edge);
  const [nodeId, setNodeId] = useState(node ? node.length + 1 : 1);
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionType, setConnectionType] = useState("");
  const [lastPosition, setLastPosition] = useState({ x: 50, y: 50 });

  const [isSettingBtnDisables, setIsSettingBtnDisables] = useState(true);

  const [nodesInputData, setNodesInputData] = useState(data);
  const [allVariables, setAllVariables] = useState([]);
  const [openGuide, setOpenGuide] = useState(false)

  console.log("openGuide", openGuide)


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
        console.log("res", res)
        setDetails((prev) => ({
          ...prev,
          waba: res || [],
          selected: state?.wabaNumber || "",
          name: state?.botName ?? "",
        }));
        setIsSettingBtnDisables(false);
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
          nodesInputData={nodesInputData}
          details={details}
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
          nodesInputData={nodesInputData}
          details={details}
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
          nodesInputData={nodesInputData}
          details={details}
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
          nodesInputData={nodesInputData}
          details={details}
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
          nodesInputData={nodesInputData}
          details={details}
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
          nodesInputData={nodesInputData}
          details={details}
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
          details={details}
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
          details={details}

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
          nodesInputData={nodesInputData}
          details={details}
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
          nodesInputData={nodesInputData}
          details={details}
        />
      ),
      urlbutton: (node: any) => (
        <NodeComponent
          id={node.id}
          data={node.data}
          onDelete={deleteNode}
          isConnecting={isConnecting}
          setIsVisible={setIsVisible}
          connectionType={connectionType}
          setNodesInputData={setNodesInputData}
          nodesInputData={nodesInputData}
          details={details}
        />
      ),
      template: (node: any) => (
        <NodeComponent
          id={node.id}
          data={node.data}
          onDelete={deleteNode}
          isConnecting={isConnecting}
          setIsVisible={setIsVisible}
          connectionType={connectionType}
          setNodesInputData={setNodesInputData}
          isBtnDisable={isSettingBtnDisables}
          nodesInputData={nodesInputData}
          details={details}
        />
      ),
      api: (node: any) => (
        <NodeComponent
          id={node.id}
          data={node.data}
          onDelete={deleteNode}
          isConnecting={isConnecting}
          setIsVisible={setIsVisible}
          connectionType={connectionType}
          setNodesInputData={setNodesInputData}
          nodesInputData={nodesInputData}
          details={details}
        />
      ),
    }),
    [deleteNode, isConnecting, nodesInputData, isSettingBtnDisables, details]
  );

  const onNodeClick = (_event: any, node: any) => {
    setType(node.type);
    setSelectedNodeId(node.id);
  };
  const commonButtonClass =
    // "cursor-pointer flex flex-col h-fit text-[0.9rem] bg-gradient-to-br from-blue-400 to-gray-600 shadow-lg ";
    "cursor-pointer flex flex-col h-18 text-[0.7rem] bg-white text-gray-800 w-full p-1.5 gap-3 shadow-lg hover:bg-gradient-to-br hover:from-white hover:to-white hover:text-gray-900 hover:shadow-2xl hover:scale-105";


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
        // variableId: "",
        type: "",
      },
      button: {
        type: "",
        // text: "",
        message: "",
        buttonTexts: [],
      },
      urlbutton: {},
      template: {},
      api: {},
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
          // if (option.option === "" && option.value === "") return;
          // if (option.option && !option.value) {
          //   isError = true;
          //   toast.error(`Value is required for option ${index + 1}`);
          //   return;
          // }
          // if (!option.option && option.value) {
          //   isError = true;
          //   toast.error(`Option Name is required for option ${index + 1}`);
          //   return;
          // }
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
        // variableId: "",
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
      urlbutton: {},
      template: {},
      api: {},
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
        if (!res?.status) {
          return toast.error(res?.msg);
        }

        nodeData.fileUrl = res?.fileUrl;
      }

      if (nodeData?.options && nodeData?.options.length > 0) {
        nodeData.options.map((item: any, index: number) => {
          // if (!item.option || !item.value) {
          //   isError = true;
          //   return toast.error(
          //     `Missing "option" or "value" for list item ${
          //       index + 1
          //     } in node "${id}".`
          //   );
          // }
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

  const guideData = [
    {
      label: "Start",
      value: "start",
      icon: <OutlinedFlagOutlinedIcon />,
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "Text",
      value: "text",
      icon: <TextFieldsOutlinedIcon />,
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Image",
      value: "image",
      icon: <ImageOutlinedIcon />,
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "Video",
      value: "video",
      icon: <VideocamOutlinedIcon />,
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Document",
      value: "document",
      icon: <ArticleOutlinedIcon />,
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "audio",
      value: "audio",
      icon: <MicOutlinedIcon />,
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "Button",
      value: "button",
      icon: <IoPersonAddOutline />,
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "List",
      value: "list",
      icon: <QuestionAnswerOutlinedIcon />,
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "Agent",
      value: "agent",
      icon: <FormatListBulletedOutlinedIcon />,
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "CTA Url",
      value: "cta url",
      icon: <BsMenuButton />,
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "Template",
      value: "template",
      icon: <LinkIcon />,
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "Api",
      value: "api",
      icon: <HiOutlineTemplate />,
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "Answer",
      value: "answer",
      icon: <QuestionAnswerOutlinedIcon />,
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];

  return (
    <>
      <div className="relative rounded-xl overflow-hidden shadow-md z-50">
        <div className="relative z-10 bg-gradient-to-tr from-indigo-100 via-blue-50 to-purple-100 px-3 py-3 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 md:overflow-x-scroll">
          <ParticleBackground />
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <div className="bg-white shadow-md p-2 rounded-full">
              <RiRobot2Line className="text-indigo-600 text-xl" />
            </div>
            <div className="flex gap-5 items-center">
              <h1 className="text-lg font-semibold text-indigo-900 tracking-tight">
                Design Your WhatsApp Automation Bot
              </h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 items-center w-full sm:w-auto"
          >


            {/* <div className="flex items-center gap-3 justify-between relative "> */}
            <div className="flex flex-col sm:flex-col md:flex-row items-center gap-3 justify-between relative ">

              {/* Error Dialog Box Button */}
              <motion.button
                // whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.1, delay: 0.2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Details
                  setDetails={setDetails}
                  details={details}
                  handleSubmit={handleSubmit}
                  isUpdate={state ?? false}
                  setIsSettingBtnDisables={setIsSettingBtnDisables}
                />
              </motion.button>

              {/* Export button */}
              <CustomTooltip
                title="Export the flow in JSON format. Ensure all configuration errors are resolved before exporting. [Save flow first!]"
                placement="top"
                arrow
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.1, delay: 0.5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}

                  className={`px-5 py-2 rounded-md text-nowrap font-medium text-sm shadow-sm transition duration-300 flex items-center gap-2 bg-indigo-500 text-white hover:bg-indigo-500 cursor-pointer`}
                  onClick={() => setOpenGuide(true)}
                >
                  <ImportContactsOutlinedIcon sx={{ fontSize: "1.2rem" }} />
                  Guides
                </motion.button>
              </CustomTooltip>
            </div>
          </motion.div>
        </div>
      </div>

      {openGuide && (
        <GuidesManager
          openGuide={openGuide}
          setOpenGuide={setOpenGuide}
        />
      )}




      <div className="flex relative h-[80vh]">
        <div
          style={{ width: "90vw", height: "auto" }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border rounded-2xl mt-2 mr-2 border-indigo-100 shadow-md"
        >
          {/* Waba selection note start */}
          <AnimatePresence>
            {!details?.selected && (
              <motion.div
                key="waba-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 z-50 bg-white/80 rounded-2xl flex items-center justify-center px-4 top-2 border-2 border-dashed border-blue-200"
                aria-live="polite"
              >
                <motion.div
                  initial={{ y: 8, scale: 0.98, opacity: 0 }}
                  animate={{ y: 0, scale: 1, opacity: 1 }}
                  exit={{ y: -8, scale: 0.98, opacity: 0 }}  // card exit motion
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white/85 shadow-2xl backdrop-blur"
                >
                  <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 rounded-t-2xl" />

                  <div className="p-6 sm:p-8 bg-white rounded-b-2xl">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                        <WhatsAppIcon fontSize="medium" className="text-emerald-600" />
                      </div>

                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-900">
                          Select a WhatsApp Business Account to get started
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                          Choose a WABA from the selector above to initialize your bot workspace.
                          Once selected, you can drag nodes, connect flows, and publish.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                        <SettingsSuggestRoundedIcon className="text-indigo-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Configure</p>
                          <p className="text-xs text-gray-600">Bind WABA</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                        <DeviceHubRoundedIcon className="text-teal-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Design</p>
                          <p className="text-xs text-gray-600">Drag nodes & connect logic</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                        <FlashOnRoundedIcon className="text-emerald-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Publish</p>
                          <p className="text-xs text-gray-600">Test & go live instantly</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 rounded-lg border border-dashed border-gray-300 bg-white/70 px-3 py-2 text-center">
                      <p className="text-xs text-gray-600">
                        Tip: Select a WABA from the dropdown to unlock the canvas and start building your WhatsApp bot.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Waba selection note end */}


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

            defaultEdgeOptions={{
              type: "bezier",
              animated: true,
              style: {
                stroke: "#6D28D9", // emerald green
                strokeWidth: 2,
              },
            }}



          // fitView
          >
            <Background />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>

        <div className="w-auto gap-4 rounded-md h-auto mt-3">
          <div className="grid grid-cols-2 gap-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0 }}
              className="w-full"
            >
              <Button
                draggable
                onDragStart={(event) => handleDragStart(event, "starting")}
                onClick={() =>
                  addNode("starting")
                }
                className={commonButtonClass}
              >
                <OutlinedFlagOutlinedIcon className="text-purple-900" />
                <span className="text-xs font-semibold"> Start </span>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="w-full"
            >
              <Button
                draggable
                onDragStart={(event) => handleDragStart(event, "text")}
                onClick={() =>
                  addNode("text")
                }
                className={commonButtonClass}
              >
                <TextFieldsOutlinedIcon className="text-purple-900" />
                <span className="text-xs font-semibold">Text Node </span>
              </Button>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="w-full"
            ><Button
              draggable
              onDragStart={(event) => handleDragStart(event, "image")}
              onClick={() =>
                addNode("image")
              }
              className={commonButtonClass}
            >
                <ImageOutlinedIcon className="text-purple-900" />
                <span className="text-xs font-semibold"> Image</span>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="w-full"
            >  <Button
              draggable
              onDragStart={(event) => handleDragStart(event, "video")}
              onClick={() =>
                addNode("video")
              }
              className={commonButtonClass}
            >
                <VideocamOutlinedIcon className="text-purple-900" />
                <span className="text-xs font-semibold"> Video</span>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="w-full"
            >
              <Button
                draggable
                onDragStart={(event) => handleDragStart(event, "document")}
                onClick={() =>
                  addNode("document")
                }
                className={commonButtonClass}
              >
                <ArticleOutlinedIcon className="text-purple-900" />
                <span className="text-xs font-semibold"> Document
                </span>
              </Button>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="w-full"
            >
              <Button
                draggable
                onDragStart={(event) => handleDragStart(event, "audio")}
                onClick={() =>
                  addNode("audio")
                }
                className={commonButtonClass}
              >
                <MicOutlinedIcon className="text-purple-900" />
                <span className="text-xs font-semibold">Audio</span>
              </Button>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="w-full"
            >  <Button
              draggable
              onDragStart={(event) => handleDragStart(event, "button")}
              onClick={() =>
                addNode("button")
              }
              className={commonButtonClass}
            >
                <BsMenuButton className="text-purple-900" />
                <span className="text-xs font-semibold"> Button</span>
              </Button>
            </motion.div>



            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="w-full"
            >
              <Button
                draggable
                onDragStart={(event) => handleDragStart(event, "list")}
                onClick={() =>
                  addNode("list")
                }
                className={commonButtonClass}
              >
                <FormatListBulletedOutlinedIcon className="text-purple-900" />
                <span className="text-xs font-semibold">List </span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="w-full"
            >
              <Button
                draggable
                onDragStart={(event) => handleDragStart(event, "agent")}
                onClick={() =>
                  addNode("agent")
                }
                className={commonButtonClass}
              >
                <IoPersonAddOutline className="text-purple-900" />
                <span className="text-xs font-semibold">Agent </span>
              </Button>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1 }}
              className="w-full"
            >
              <Button
                draggable
                onDragStart={(event) => handleDragStart(event, "urlbutton")}
                onClick={() =>
                  addNode("urlbutton")
                }
                className={commonButtonClass}
              >
                <LinkIcon className="text-purple-900" />
                <span className="text-xs font-semibold"> CTA URL </span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.1 }}
              className="w-full"
            >
              <Button
                draggable
                onDragStart={(event) => handleDragStart(event, "template")}
                onClick={() => addNode("template")}
                className={commonButtonClass}
                disabled={!details.selected}
              >
                <HiOutlineTemplate className="text-purple-900 size-6" />
                <span className="text-xs font-semibold">Template </span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.2 }}
              className="w-full"
            > <Button
              draggable
              onDragStart={(event) => handleDragStart(event, "api")}
              onClick={() => addNode("api")}
              className={commonButtonClass}
            >
                <AiOutlineApi className="text-purple-900 size-6" />
                <span className="text-xs font-semibold">API</span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0., delay: 1.3 }}
              className="w-full"
            >   <Button
              draggable
              onDragStart={(event) => handleDragStart(event, "answer")}
              onClick={() => addNode("answer")}
              className={commonButtonClass}
            >
                <QuestionAnswerOutlinedIcon className="text-purple-900 " />
                <span className="text-xs font-semibold"> Answer</span>
              </Button>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.4 }}
              className="w-full"
            >
              <Button onClick={reset} className={commonButtonClass}>
                <RestartAltOutlinedIcon className="text-purple-900 " />
                <span className="text-xs font-semibold"> Reset</span>
              </Button>
            </motion.div>
          </div>

          {/* <Details
                setDetails={setDetails}
                details={details}
                handleSubmit={handleSubmit}
                isUpdate={state ?? false}
                setIsSettingBtnDisables={setIsSettingBtnDisables}
              /> */}
        </div>

      </div >




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
          ) : type === "urlbutton" ? (
            <Url
              id={selectedNodeId}
              nodesInputData={nodesInputData}
              setNodesInputData={setNodesInputData}
            />
          ) : type === "template" ? (
            <TemplateNode
              id={selectedNodeId}
              nodesInputData={nodesInputData}
              setNodesInputData={setNodesInputData}
              details={details}
              setIsVisible={setIsVisible}
              allVariables={allVariables}
            />
          ) : type === "api" ? (
            <Api
              id={selectedNodeId}
              nodesInputData={nodesInputData}
              setNodesInputData={setNodesInputData}
              allVariables={allVariables}
              addNode={addNode}
              lastPosition={lastPosition}
              nodes={nodes}
            />
          ) : null}

          {type !== "template" && (
            <div className="flex gap-2">
              <Button onClick={handleSaveNodeData}>Save</Button>
              <Button onClick={() => setIsVisible(false)}>Cancel</Button>
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default CreateWhatsAppBot;
