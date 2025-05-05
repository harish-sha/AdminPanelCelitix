import React from "react";
import { useDrop, useDrag } from "react-dnd";
import { Box, Typography, Paper, TextField, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import toast from "react-hot-toast";

const Canvas = ({ items, setItems, onEdit }) => {
  const [, drop] = useDrop(() => ({
    accept: [
      "heading",
      "subheading",
      "textbody",
      "textcaption",
      "textInput",
      "textArea",
      "radioButton",
      "checkBox",
      "dropDown",
    ],
    drop: (item) => {
      setItems((prev) => [
        ...prev,
        { id: Date.now(), type: item.type, value: "" },
      ]);
    },
  }));

  // Handle input change for TextField components
  const handleInputChange = (index, value) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].value = value;
      return updatedItems;
    });
  };

  // Handle deleting items from the canvas
  const handleDelete = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    toast.success("Item deleted successfully");
  };

  // Draggable component for individual canvas items
  const DraggableItem = React.memo(({ item, index }) => {
    const [, drag] = useDrag({
      type: item.type,
      item: { index },
    });

    return (
      <Paper
        ref={drag}
        sx={{
          backgroundColor: getBackgroundColor(item.type),
        }}
        // className="fields"
        className="w-[450px] p-2 mb-2 rounded-lg shadow-md"
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography variant="subtitle2" style={{ marginLeft: 8 }}>
            {getLabel(item.type)}
          </Typography>
          <Box>
            <IconButton size="small" onClick={() => onEdit(index)}>
              <EditOutlinedIcon
                style={{ cursor: "pointer" }}
                fontSize="small"
              />
            </IconButton>
            <IconButton onClick={() => handleDelete(index)} size="small">
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <TextField
          label="Enter value"
          variant="outlined"
          fullWidth
          value={item.value}
          onChange={(e) => handleInputChange(index, e.target.value)}
          multiline={item.type === "textArea"}
          rows={item.type === "textArea" ? 4 : undefined}
          // disabled={item.type !== "textInput" && item.type !== "textArea"}
          disabled
        />
      </Paper>
    );
  });

  // Helper function to get background color based on item type
  const getBackgroundColor = (type) => {
    switch (type) {
      case "heading":
        return "#e3f2fd";
      case "subheading":
        return "#ffebee";
      case "textbody":
        return "#fff3cd";
      case "textcaption":
        return "#f8bbd0";
      case "textInput":
      case "textArea":
      case "radioButton":
      case "checkBox":
      case "dropDown":
        return "#c5e1f5";
      default:
        return "#c5e1f5";
    }
  };

  // Helper function to get label text based on item type
  const getLabel = (type) => {
    switch (type) {
      case "heading":
        return "Heading";
      case "subheading":
        return "Subheading";
      case "textbody":
        return "Text Body";
      case "textcaption":
        return "Text Caption";
      case "textInput":
        return "Text Input";
      case "textArea":
        return "Text Area";
      case "radioButton":
        return "Radio Button";
      case "checkBox":
        return "Check Box";
      case "dropDown":
        return "Drop Down";
      default:
        return "";
    }
  };

  return (
    <div
      ref={drop}
      className="relative shadow-xl overflow-auto rounded-xl bg-white h-[830px] w-full hide-scrollbar"
    >
      {/* Tabs for multiple screens */}
      <div className="border-b shadow-sm px-2 py-2 w-full bg-blue-50">Screens</div>
      {/* Render all items on the canvas */}
      <div className="px-2" >
        {items.map((item, index) => (
          <DraggableItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Canvas;
