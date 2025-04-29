import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Import Sidebar
import Canvas from "../components/Canvas"; // Import Canvas
import MobilePanel from "../components/MobilePanel"; // Import MobilePanel
import EditPanel from "../components/EditPanel"; // Import EditPanel
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

  // Add new items to the canvas
  const handleAddItem = (item) => {
    setCanvasItems((prev) => [...prev, { type: item.type, value: "" }]);
  };

  // Open edit panel for a specific item
  const handleEdit = (index) => {
    if (canvasItems[index]) {
      setSelectedItem({ ...canvasItems[index], index });
    } else {
      console.error("Invalid index passed to handleEdit:", index);
    }
  };

  // Save changes to an item
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
    setSelectedItem(null); // Close edit panel after saving
  };

  // Close the edit panel
  const handleCloseEditPanel = () => {
    setSelectedItem(null);
  };

  return (
    <Box display="flex" flexDirection="row" flexGrow={1} p={2} height="100vh">
      <Sidebar onAdd={handleAddItem} flexGrow={1} />
      {/* Canvas for displaying selected components */}
      <span className="text-2xl absolute font-semibold">ChatFlow: {flowName || "Untitled Flow"}</span>

      <Canvas
        items={canvasItems}
        setItems={setCanvasItems}
        onEdit={handleEdit} // Pass edit handler to the Canvas
      />

      {/* Mobile Panel for displaying items in a mobile view */}
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

      {/* Edit Panel for editing selected item */}
      {selectedItem && (
        <EditPanel
          selectedItem={selectedItem}
          onClose={handleCloseEditPanel}
          onSave={handleSave}
        />
      )}
    </Box>
  );
};

export default FlowCreationPage;
