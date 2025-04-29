import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Canvas from "../components/Canvas";
import MobilePanel from "../components/MobilePanel";
import EditPanel from "../components/EditPanel";
import { Box, Typography } from "@mui/material";

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
      <span className="text-2xl font-semibold text-gray-700">
        ChatFlow: {flowName || "Untitled Flow"}
      </span>
      <div className="flex">
        <Sidebar onAdd={handleAddItem} flexGrow={1} />

        <Canvas
          items={canvasItems}
          setItems={setCanvasItems}
          onEdit={handleEdit}
        />

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

        {selectedItem && (
          <EditPanel
            selectedItem={selectedItem}
            onClose={handleCloseEditPanel}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default FlowCreationPage;
