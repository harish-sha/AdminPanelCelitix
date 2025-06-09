import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Canvas from "../components/Canvas";
import MobilePanel from "../components/MobilePanel";
import EditPanel from "../components/EditPanel";
import UniversalButton from "../../components/UniversalButton";
import { Box, Typography } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import toast from "react-hot-toast";
import { generatePayload } from "../lib/generatePayload";
import { saveFlow } from "@/apis/whatsapp/whatsapp";
import InputField from "@/components/layout/InputField";


const FlowCreationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate()
  const [canvasItems, setCanvasItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [flowName, setFlowName] = useState("");
  const [save, setSave] = useState("");
  const [setting, setSetting] = useState("");
  const [error, setError] = useState("");
  const [buildFlows, setBuildFlows] = useState("");

  // console.log("canvasItems", canvasItems)
  //create new screen
  const [tabs, setTabs] = useState([
    { title: "Welcome", content: "Welcome", id: "WELCOME", payload: [] },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const menuRefs = tabs.map(() => React.createRef());
  const [screenName, setScreenName] = useState("");
  const [screenEditName, setScreenEditName] = useState("");
  const [screenID, setScreenID] = useState("");
  const [createTab, setCreateTab] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 1000)
  );

  const handleAddItem = (item) => {
    const newTabs = [...tabs];
    // console.log("newTabs", newTabs);

    const nonDuplicateTabs = [
      "heading",
      "subheading",
      "textbody",
      "textcaption"
    ];

    // Check for duplicates *only* if item.type is in nonDuplicateTabs
    // const shouldCheckDuplicate = nonDuplicateTabs.includes(item.type);

    // if (shouldCheckDuplicate) {
    //   const isDuplicate = newTabs[activeIndex]?.payload?.some(
    //     (payloadItem) => payloadItem.type === item.type
    //   );

    //   if (isDuplicate) {
    //     toast.error(`Only one "${item.type}" allowed in the canvas.`);
    //     return;
    //   }
    // }

    // Add the item
    newTabs[activeIndex] = {
      ...newTabs[activeIndex],
      payload: [
        ...newTabs[activeIndex].payload,
        { type: item.type, value: "" },
      ],
    };

    setTabs(newTabs);
    // toast.success(`"${item.type}" added successfully`);
  };


  useEffect(() => {
    // console.log(tabs)
  }, [])

  const handleEdit = (index) => {
    tabs[activeIndex].payload[index];
    setSelectedItem({ ...tabs[activeIndex].payload[index], index });
  };

  const handleSave = (updatedData) => {
    // console.log("updatedData", updatedData)
    setTabs((prevTabs) => {
      const newTabs = [...prevTabs];
      if (
        updatedData.index !== undefined &&
        newTabs[activeIndex].payload[updatedData.index]
      ) {
        newTabs[activeIndex].payload[updatedData.index] = {
          ...newTabs[activeIndex].payload[updatedData.index],
          value: updatedData.value || "",
          options: updatedData.options || [],
          checked: updatedData.checked || [],
          selectedOption: updatedData.selectedOption || "",
          ...updatedData
        };
        // console.log("all tabs content when save within tabs", newTabs)
      } else {
        console.error("Invalid index in updatedData:", updatedData.index);
      }
      return newTabs;
    });
    setSelectedItem(null);
  };

  // Close the edit panel
  const handleCloseEditPanel = () => {
    setSelectedItem(null);
  };

  async function handleFlowBuild() {
    if (!flowName) {
      toast.error("Please Enter FlowName")
      return;
    }

    const hasAtLeastOneComponent = tabs.some(tab => tab.payload.length > 0);

    if (!hasAtLeastOneComponent) {
      toast.error("Please add at least one component before building the flow");
      return;
    }

    try {
      const payload = generatePayload(tabs);

      const params = {
        // name: state?.flowName,
        category: state?.selectCategories,
        waba: state?.selectedWaba,
        id: "",
        name: flowName,
      };
      setIsLoading(true)

      const res = await saveFlow(params, payload);
      // console.log("final payload", payload)
      if (res == {}) {
        return toast.error("Flow creation failed");
      }
      if (res && Object.keys(res).length === 0 && res.constructor === Object) {
        return toast.error("Flow creation failed");
      }
      // console.log("final response", res)
      if (!res.flag) {
        return toast.error(res.error_user_msg.error.error_user_msg);
      }
      toast.success(res.msg);
      navigate("/wwhatsappflows")
    } catch (e) {
      // console.log("error", e)
      return toast.error(e.error_user_msg);
    } finally {
      setIsLoading(false)
    }
  }


  async function handleFlowSave() {
    toast.success("Flow Saved Successfully");

  }

  return (
    <div className="">


      <div className="bg-white rounded-md shadow-sm px-4 py-3 flex items-center justify-between">
        {/* <span className="text-md font-semibold text-gray-700">
          ChatFlow: {state?.flowName || "Untitled Flow"}
        </span> */}
        <span className="text-md font-semibold text-gray-700">
          ChatFlow
        </span>

        <div className="flex items-center gap-3">
          <InputField
            id="flowname"
            name="flowname"
            type="text"
            placeholder="Enter Flow Name"
            value={flowName}
            onChange={(e) => {
              const noSpaces = e.target.value.replace(/\s/g, "");
              setFlowName(noSpaces);
            }}
            className="min-w-[200px]"
          />

          {/* <UniversalButton
            icon={<SaveOutlinedIcon sx={{ fontSize: "1.3rem" }} />}
            label="Save"
            onClick={handleFlowSave}
          />

          <UniversalButton
            icon={<SettingsOutlinedIcon sx={{ fontSize: "1.3rem" }} />}
            label="Settings"
          /> */}

          <UniversalButton
            icon={<ConstructionOutlinedIcon sx={{ fontSize: "1.3rem" }} />}
            label={isLoading ? "Building..." : "BuildFlow"}
            onClick={handleFlowBuild}
            disabled={isLoading}
          />
        </div>
      </div>


      <div className="flex gap-3 items-start mt-4">
        {/* Siddebar */}
        <div className="flex-1">
          <Sidebar onAdd={handleAddItem} flexGrow={1} />
        </div>
        <div className="w-full flex relative">
          {/* Canvas */}
          <Canvas
            items={canvasItems}
            setItems={setCanvasItems}
            onEdit={handleEdit}
            tabs={tabs}
            setTabs={setTabs}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            dialogVisible={dialogVisible}
            setDialogVisible={setDialogVisible}
            setEditDialogVisible={setEditDialogVisible}
            editDialogVisible={editDialogVisible}
            screenName={screenName}
            setScreenName={setScreenName}
            screenEditName={screenEditName}
            setScreenEditName={setScreenEditName}
            screenID={screenID}
            setScreenID={setScreenID}
            randomNumber={randomNumber}
            setRandomNumber={setRandomNumber}
            createTab={createTab}
            setCreateTab={setCreateTab}
            menuRefs={menuRefs}
          />
          {selectedItem && (
            <EditPanel
              selectedItem={selectedItem}
              onClose={handleCloseEditPanel}
              onSave={handleSave}
            />
          )}

        </div>

        <div className="flex-1 ">
          {/* Mobile Panel Preview*/}
          <MobilePanel
            items={tabs[activeIndex].payload}
            onUpdateItem={(index, updater) => {
              setTabs((prevTabs) => {
                const newTabs = [...prevTabs];
                newTabs[activeIndex].payload[index] = updater(
                  newTabs[activeIndex].payload[index]
                );
                return newTabs;
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FlowCreationPage;