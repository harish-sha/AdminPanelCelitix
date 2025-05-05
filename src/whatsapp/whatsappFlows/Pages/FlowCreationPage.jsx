import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Canvas from "../components/Canvas";
import MobilePanel from "../components/MobilePanel";
import EditPanel from "../components/EditPanel";
import { Box, Typography } from "@mui/material";
import UniversalButton from "@/components/common/UniversalButton";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';

const FlowCreationPage = () => {
  const location = useLocation();
  const [canvasItems, setCanvasItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [flowName, setFlowName] = useState("");

  useEffect(() => {
    if (location.state?.flowName) {
      setFlowName(location.state.flowName);
    }
  }, [location.state]);

  const handleAddItem = (item) => {
    setCanvasItems((prev) => [...prev, { type: item.type, value: "" }]);
  };

  const handleEdit = (index) => {
    if (canvasItems[index]) {
      setSelectedItem({ ...canvasItems[index], index });
    } else {
      console.error("Invalid index passed to handleEdit:", index);
    }
  };

  const handleSave = (updatedData) => {
    setCanvasItems((prevItems) => {
      const newItems = [...prevItems];
      if (updatedData.index !== undefined && newItems[updatedData.index]) {
        newItems[updatedData.index] = {
          ...newItems[updatedData.index],
          value: updatedData.value || "",
          options: updatedData.options || [],
          checked: updatedData.checked || [],
          selectedOption: updatedData.selectedOption || "",
        };
      } else {
        console.error("Invalid index in updatedData:", updatedData.index);
      }
      return newItems;
    });
    setSelectedItem(null);
  };

  // Close the edit panel
  const handleCloseEditPanel = () => {
    setSelectedItem(null);
  };
  return (
    <div className="">
      <div className="bg-white rounded-md  py-2 flex items-center justify-between px-4 shadow-sm">
        <span className="text-md font-semibold text-gray-700">
          ChatFlow: {flowName || "Untitled Flow"}
        </span>
        <div className="flex items-center gap-3">
          <UniversalButton
            icon={<SaveOutlinedIcon
              sx={{
                fontSize: "1.3rem",
              }} />}
            label="save"
          />
          <UniversalButton
            icon={<SettingsOutlinedIcon
              sx={{
                fontSize: "1.3rem",
              }} />}
            label="Settings" />
          <UniversalButton
            icon={<ConstructionOutlinedIcon
              sx={{
                fontSize: "1.3rem",
              }} />}
            label="Build Flow"
          />
        </div>
      </div>
      <div className="flex gap-3 items-start mt-4">
        {/* Siddebar */}
        <div className="flex-1" >
          <Sidebar onAdd={handleAddItem} flexGrow={1} />
        </div>

        <div className="w-full" >
          {/* Canvas */}
          <Canvas
            items={canvasItems}
            setItems={setCanvasItems}
            onEdit={handleEdit}
          />
        </div>

        {selectedItem && (
          <EditPanel
            selectedItem={selectedItem}
            onClose={handleCloseEditPanel}
            onSave={handleSave}
          />
        )}


        <div className="flex-1">
          {/* Mobile Panel Preview*/}
          <MobilePanel
            items={canvasItems}
            onUpdateItem={(index, updater) =>
              setCanvasItems((prevItems) => {
                const updatedItems = [...prevItems];
                updatedItems[index] = updater(updatedItems[index]);
                return updatedItems;
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FlowCreationPage;
