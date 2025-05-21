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

const FlowCreationPage = () => {
  const location = useLocation();
  const [canvasItems, setCanvasItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [flowName, setFlowName] = useState("");
  const [save, setSave] = useState("");
  const [setting, setSetting] = useState("");
  const [error, setError] = useState("");
  const [buildFlows, setBuildFlows] = useState("");

  //create new screen
  const [tabs, setTabs] = useState([
    { title: "Welcome", content: "Welcome", payload: [] },
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

  useEffect(() => {
    if (location.state?.flowName) {
      setFlowName(location.state.flowName);
    }
  }, [location.state]);

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

  return (
    // <div className="">
    //   <span className="text-2xl font-semibold text-gray-700">
    //     ChatFlow: {flowName || "Untitled Flow"}
    //   </span>
    //   <div className="flex flex-row gap-4 justify-end items-end">
    //     <div className="bg-white text-blue-500 p-2 rounded-xl border-1 border-blue-500 font-medium hover:bg-blue-500 hover:text-white">
    //       <button
    //       >
    //         <SaveOutlinedIcon />
    //         Save
    //       </button>
    //     </div>
    //     <div className="bg-white text-blue-500 p-2 rounded-xl border-1 border-blue-500 font-medium hover:bg-blue-500 hover:text-white">
    //       <button>
    //         <SettingsOutlinedIcon />
    //         Setting
    //       </button>
    //     </div>
    //     <div className="bg-white text-red-500 p-2 rounded-xl border-1 border-red-500 font-medium hover:bg-red-500 hover:text-white">
    //       <button>
    //         <ErrorOutlineOutlinedIcon />
    //         Errors
    //       </button>
    //     </div>

    //     <div className="bg-white text-gray-500 p-2 rounded-xl border-1 border-gray-300 font-medium hover:bg-gray-500 hover:text-white">
    //       <button>
    //         <ConstructionOutlinedIcon />
    //         BuildFlow
    //       </button>
    //     </div>

    //   </div>
    //   <div className="flex">
    //     <Sidebar onAdd={handleAddItem} flexGrow={1} />

    //     <Canvas
    //       items={canvasItems}
    //       setItems={setCanvasItems}
    //       onEdit={handleEdit}
    //     />

    //     <MobilePanel
    //       items={canvasItems}
    //       onUpdateItem={(index, updater) =>
    //         setCanvasItems((prevItems) => {
    //           const updatedItems = [...prevItems];
    //           updatedItems[index] = updater(updatedItems[index]);
    //           return updatedItems;
    //         })
    //       }
    //     />

    //     {selectedItem && (
    //       <EditPanel
    //         selectedItem={selectedItem}
    //         onClose={handleCloseEditPanel}
    //         onSave={handleSave}
    //       />
    //     )}
    //   </div>
    // </div>
    <div className="">
      <div className="bg-white rounded-md  py-2 flex items-center justify-between px-4 shadow-sm">
        <span className="text-md font-semibold text-gray-700">
          ChatFlow: {flowName || "Untitled Flow"}
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
