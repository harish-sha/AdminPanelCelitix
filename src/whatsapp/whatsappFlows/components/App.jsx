import React, { useState } from "react";
import Canvas from "./Canvas";
import MobilePanel from "./MobilePanel";
import { Box } from "@mui/material";

const App = () => {
  const [items, setItems] = useState([]);

  const handleEdit = (index) => {
    // Implement your edit functionality here
    console.log("Edit item at index:", index);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
      <Canvas items={items} setItems={setItems} onEdit={handleEdit} />
      <MobilePanel items={items} />
    </Box>
  );
};

export default App;