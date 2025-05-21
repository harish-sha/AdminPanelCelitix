import React from "react";
import { useDrop, useDrag } from "react-dnd";
import { Box, Typography, Paper, TextField, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import toast from "react-hot-toast";
import TabView from "./TabView";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditPanel from "./EditPanel";
import InputField from "../../components/InputField";

const Canvas = ({
  items,
  setItems,
  onEdit,
  tabs,
  setTabs,
  activeIndex,
  setActiveIndex,
  dialogVisible,
  setDialogVisible,
  screenName,
  setScreenName,
  screenID,
  setScreenID,
  randomNumber,
  setRandomNumber,
  createTab,
  setCreateTab,
  menuRefs
}) => {
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
        className="w-[450px] p-2 mb-2 rounded-lg shadow-md mt-10"
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography variant="subtitle1" style={{ marginLeft: 8 }}>
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
              <DeleteForeverOutlinedIcon
                fontSize="small"
                className="text-red-400"
              />
            </IconButton>
          </Box>
        </Box>

        <InputField
          // label="Enter value"
          // variant="outlined"
          // fullWidth
          // className="text-field"
          value={item.value}
          onChange={(e) => handleInputChange(index, e.target.value)}
          multiline={item.type === "textArea"}
          rows={item.type === "textArea" ? 4 : undefined}
          // disabled={item.type !== "textInput" && item.type !== "textArea"}
          readOnly
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
        return "Textcaption";
      case "textInput":
        return "TextInput";
      case "textArea":
        return "TextArea";
      case "radioButton":
        return "RadioButton";
      case "checkBox":
        return "CheckBox";
      case "dropDown":
        return "DropDown";
      case "footerbutton":
        return "FooterButton";
      case "embeddedlink":
        return "EmbeddedLink";
      case "optin":
        return "OptIn";
      case "photo":
        return "Photo";
      case "document":
        return "Document";
      case "ifelse":
        return "IfElse";
      case "image":
        return "Image";
      case "date":
        return "Date";
      case "userdetail":
        return "UserDetail";
      default:
        return "";
    }
  };

  return (
    // <Box
    //   ref={drop}
    //   className="relative flex-1 p-2 shadow-xl overflow-auto rounded-xl bg-white mt-2 mr-3 h-[900px] w-[500px]"
    // >
    //   <div className="text-md tracking-wide font-semibold mb-2 text-center shadow-md rounded-md h-full">
    //     <div><TabView /></div>
    //     <div className="w-2/3">
    //       {items.map((item, index) => (
    //         <DraggableItem key={item.id} item={item} index={index} />
    //       ))}

    //     </div>
    //     <div className="w-1/3"><EditPanel onClick={() => onEdit(index)} /></div>
    //   </div>
    // </Box>
    <div
      ref={drop}
      className="relative shadow-xl overflow-auto rounded-xl bg-white h-[830px] w-full hide-scrollbar"
    >
      {/* Tabs for multiple screens */}
      <TabView
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
      {/* Render all items on the canvas */}
      <div className="w-1/3 ml-5 ">
        {items.map((item, index) => (
          <DraggableItem key={item.id} item={item} index={index} />
        ))}
      </div>
      {/* <div className="w-1/3"><EditPanel onClick={() => onEdit(index)} /></div> */}
    </div>
  );
};

export default Canvas;
