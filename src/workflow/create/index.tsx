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
import { HiOutlineDocument } from "react-icons/hi2";
import { DetailsDialog } from "./components/details";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import obd from "../../assets/icons/OBD02.svg";
import rcsicon from "../../assets/icons/RCS02.svg";
import { LuMessageSquareMore } from "react-icons/lu";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
// import ParticleBackground from "./components/ParticleBackground";
import CustomTooltip from "@/whatsapp/components/CustomTooltip";
import { AnimatePresence, motion } from "framer-motion";
import { RiRobot2Line } from "react-icons/ri";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import { LuWorkflow } from "react-icons/lu";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Tooltip from "@mui/material/Tooltip";
import { FiEdit } from "react-icons/fi";
import IconButton from "@mui/material/IconButton";
import InputField from "@/components/layout/InputField";
import ParticleBackground from "@/whatsapp/whatsappFlows/components/ParticleBackground";
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

  const NodeBtnClass =
    "h-6 w-6 shadow text-xs bg-blue-200 rounded-full flex items-center justify-center text-gray-700";

  return (
    <div className="relative p-1.5 bg-white border border-gray-300 group rounded-md shadow-md min-h-12 max-h-auto flex justify-center flex-col ">
      <div className="absolute -top-1 -right-3 text-xs text-white  rounded-full h-4 w-4 text-center">
        <AnimatePresence>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="hidden group-hover:block "
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
                <DeleteForeverIcon
                  style={{ fontSize: "19px" }}
                  className="text-red-700 "
                />
              </IconButton>
            </Tooltip>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute -left-7 -top-1 p-0">
        <AnimatePresence>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="hidden group-hover:block "
          >
            <Tooltip title="Settings" placement="left">
              <IconButton
                className=" text-xs"
                onClick={() => {
                  setIsVisible(true);
                }}
                title="Settings"
              >
                <SettingsOutlinedIcon
                  style={{ fontSize: "18px" }}
                  className="font-bold text-md"
                />
              </IconButton>
            </Tooltip>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute -left-6.5 top-5 p-0">
        <AnimatePresence>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="hidden group-hover:block "
          >
            <Tooltip title="Edit Component" placement="left">
              {id !== "1" && (
                <IconButton
                  className=" text-xs"
                  onClick={() => setDetailsDialogVisible(true)}
                  title={`Configure ${data.type} node`}
                >
                  <FiEdit style={{ fontSize: "15px" }} className="font-bold" />
                </IconButton>
              )}
            </Tooltip>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="font-medium text-center">
        {data.type === "voice" && (
          <span className="flex items-center gap-2">
            <img src={obd} className="w-5 h-4 " />
            <p>Voice</p>
            <div className={NodeBtnClass}>{id}</div>
          </span>
        )}
        {data.type === "rcs" && (
          <span className="flex items-center gap-2">
            <img src={rcsicon} className="w-4 h-4" />
            <p>RCS</p>
            <div className={NodeBtnClass}>{id}</div>
          </span>
        )}
        {data.type === "whatsapp" && (
          <span className="flex items-center gap-2">
            <FaWhatsapp className="" />
            <p>Whatsapp</p>
            <div className={NodeBtnClass}>{id}</div>
          </span>
        )}
        {data.type === "sms" && (
          <span className="flex items-center gap-2">
            <LuMessageSquareMore className="" />
            <p>SMS</p>
            <div className={NodeBtnClass}>{id}</div>
          </span>
        )}
      </div>

      <>
        <Handle
          type="target"
          position={Position.Left}
          className={`${id == "1" ? "hidden" : ""} `}
          style={{
            height: "10px",
            width: "10px",
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
                  height: "10px",
                  width: "10px",
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
  const navigate = useNavigate();
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
  const [detailsDialogVisible, setDetailsDialogVisible] = useState(false);

  const onConnect = useCallback(
    (connection: { source: any; target: any }) => {
      const { source, target } = connection;

      let isSourceAlreadyConnected = false;
      let isTargetAlreadyConnected = false;

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
    "cursor-pointer flex flex-col h-18 text-[0.7rem] bg-white text-gray-800 w-full p-1.5 gap-3 shadow-lg hover:bg-gradient-to-br hover:from-white hover:to-white hover:text-gray-900 hover:shadow-2xl hover:scale-105";

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
      isEditWorkflow: 0,
      srNo: 0,
      nodeJson: JSON.stringify(payload),
    };

    try {
      const res = await saveWorkflow(data);
      if (res?.statusCode !== 200) {
        return toast.error(res.msg || "Error while saving workflow");
      }
      toast.success("Workflow saved successfully");
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
              <LuWorkflow className="text-indigo-600 text-xl" />
            </div>
            <div className="flex gap-5 items-center">
              <h1 className="text-lg font-semibold text-indigo-900 tracking-tight">
                Design Your Workflow
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
                <div className="flex items-center gap-2  rounded-md  cursor-pointer">
                  <InputField
                    value={name}
                    placeholder="Enter WorkFlow Name"
                    onChange={(e: {
                      target: { value: React.SetStateAction<string> };
                    }) => {
                      setName(e.target.value);
                    }}
                    maxLength={20}
                  />
                </div>
              </motion.button>

              <CustomTooltip
                title="Save the flow to continue. Ensure all configuration errors are resolved before saving."
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
                  onClick={handleSaveWorkflow}
                >
                  <SettingsOutlinedIcon sx={{ fontSize: "1.2rem" }} />
                  Save
                </motion.button>
              </CustomTooltip>

              {/* Export button */}
              {/* <CustomTooltip
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
                >
                  <ImportContactsOutlinedIcon sx={{ fontSize: "1.2rem" }} />
                  Guides
                </motion.button>
              </CustomTooltip> */}
            </div>
          </motion.div>
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap h-[80vh] md:overflow-hidden border rounded-2xl mt-2 border-indigo-100 shadow-md ">
        <div
          className="w-full "
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

        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-col  justify-between w-full sm:w-[200px] bg-gray-200 gap-4 px-2 py-3 rounded-md h-auto  overflow-x-auto sm:overflow-visible ">
          <div>
            <h1 className="font-semibold text-lg">Select Channel</h1>
            <div className="flex flex-row flex-wrap md:flex-col gap-3 p-1 overflow-x-auto md:overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0 }}
                className="w-full"
              >
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
                  <img src={obd} className="w-5 h-4 text-purple-900" />
                  <span className="text-xs text-purple-900 font-semibold">
                    OBD
                  </span>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0 }}
                className="w-full"
              >
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
                  <span className="text-xs text-purple-900 font-semibold">
                    WhatsApp
                  </span>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0 }}
                className="w-full"
              >
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
                  <span className="text-xs text-purple-900 font-semibold">
                    RCS
                  </span>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0 }}
                className="w-full"
              >
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
                  <LuMessageSquareMore />
                  <span className="text-xs text-purple-900 font-semibold">
                    SMS
                  </span>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.4 }}
                className="w-full"
              >
                <Button
                  draggable
                  onDragStart={(event) => {}}
                  onClick={() => {
                    reset();
                  }}
                  className={commonButtonClass}
                >
                  <RestartAltOutlinedIcon />

                  <span className="text-xs text-purple-900 font-semibold">
                    Reset
                  </span>
                </Button>
              </motion.div>
            </div>
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
