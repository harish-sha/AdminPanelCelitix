import React from "react";
import { useDrag } from "react-dnd";
import { Box, Paper } from "@mui/material";
import "./sidebar.css";

const DraggableItem = ({ item, onClick }) => {
  const [, drag] = useDrag({
    type: item.type,
    item: { type: item.type },
  });

  return (
    <Box ref={drag} m={1} onClick={onClick} style={{ cursor: "pointer" }}>
      <Paper
        elevation={4}
        sx={{
          display: "grid",
          alignItems: "center",
          textAlign: "center",
          padding: "8px",
        }}
        className="sidebar-items"
      >
        <span className="sidebar-items-icon" >{item.icon}</span>
        {/* Icon */}
        <span style={{ fontSize: "13px", fontWeight: "600" }}>
          {item.label}
        </span>
      </Paper>
    </Box>
  );
};

export default DraggableItem;
