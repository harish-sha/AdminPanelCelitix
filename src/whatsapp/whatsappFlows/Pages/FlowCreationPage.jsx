import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

const FlowCreationPage = () => {
  const { state } = useLocation();
  const [canvasItems, setCanvasItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [flowName, setFlowName] = useState("");
  const [save, setSave] = useState("");
  const [setting, setSetting] = useState("");
  const [error, setError] = useState("");
  const [buildFlows, setBuildFlows] = useState("");

  //create new screen
  const [tabs, setTabs] = useState([
    { title: "Welcome", content: "Welcome", id: "Welcome_1", payload: [] },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dialogVisible, setDialogVisible] = useState(false);
  const menuRefs = tabs.map(() => React.createRef());
  const [screenName, setScreenName] = useState("");
  const [screenID, setScreenID] = useState("");
  const [createTab, setCreateTab] = useState("");

  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 1000)
  );

  const handleAddItem = (item) => {
    // setTabs((prev)=>)
    const newTabs = [...tabs];
    newTabs[activeIndex] = {
      ...newTabs[activeIndex],
      payload: [
        ...newTabs[activeIndex].payload,
        { type: item.type, value: "" },
      ],
    };
    setTabs(newTabs);
  };

  const handleEdit = (index) => {
    tabs[activeIndex].payload[index];
    setSelectedItem({ ...tabs[activeIndex].payload[index], index });
  };

  const handleSave = (updatedData) => {
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
        };
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
    try {
      const payload = generatePayload(tabs);

      const params = {
        name: state?.flowName,
        category: state?.selectCategories,
        waba: state?.selectedWaba,
        id: "",
      };

      const res = await saveFlow(params, payload);
      console.log(res);
      if (!res.flag) {
        return toast.error("Error while building flow");
      }
      toast.success("Flow Built Successfully");
    } catch (e) {
      return toast.error("Error while building flow");
    }
  }

  async function handleFlowSave() {
    toast.success("Flow Saved Successfully");
  }

  return (
    <div className="">
      <div className="bg-white rounded-md  py-2 flex items-center justify-between px-4 shadow-sm">
        <span className="text-md font-semibold text-gray-700">
          ChatFlow: {state?.flowName || "Untitled Flow"}
        </span>
        <div className="flex items-center gap-3">
          <UniversalButton
            icon={
              <SaveOutlinedIcon
                sx={{
                  fontSize: "1.3rem",
                }}
              />
            }
            label="save"
            onClick={handleFlowSave}
          />
          <UniversalButton
            icon={
              <SettingsOutlinedIcon
                sx={{
                  fontSize: "1.3rem",
                }}
              />
            }
            label="Settings"
          />
          <UniversalButton
            icon={
              <ConstructionOutlinedIcon
                sx={{
                  fontSize: "1.3rem",
                }}
              />
            }
            label="Build Flow"
            onClick={handleFlowBuild}
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
            screenName={screenName}
            setScreenName={setScreenName}
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

        <div className="flex-1">
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
