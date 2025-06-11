import React, { useRef, useEffect } from "react";
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
  editDialogVisible,
  setEditDialogVisible,
  screenName,
  setScreenName,
  setScreenEditName,
  screenEditName,
  screenID,
  setScreenID,
  randomNumber,
  setRandomNumber,
  createTab,
  setCreateTab,
  menuRefs,
}) => {
  // const [{ isOver }, drop] = useDrop(() => ({
  //   accept: [
  //     "heading",
  //     "subheading",
  //     "textbody",
  //     "textcaption",
  //     "textInput",
  //     "textArea",
  //     "radioButton",
  //     "checkBox",
  //     "dropDown",
  //     "chipSelector"
  //   ],

  //   drop: (item) => {
  //     console.log("itemvvvvvvvvvv", item)
  //     const newItem = {
  //       id: Date.now(),
  //       type: item.type,
  //     };

  //     console.log("newItem", newItem)

  //     setTabs((prevTabs) => {
  //       const newTabs = [...prevTabs];
  //       const activePayload = newTabs[activeIndex].payload || [];
  //       activePayload.push(newItem);
  //       newTabs[activeIndex].payload = activePayload;
  //       return newTabs;
  //     });
  //   }

  // }));

  const [{ isOver }, drop] = useDrop(() => ({
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
      "chipSelector",
    ],

    drop: (item, monitor) => {
      if (monitor.didDrop()) {
        return;
      }
      // console.log("itemfffffffffff", item);
      // console.log("monitor", monitor);

      const newItem = {
        id: Date.now(),
        type: item.type,
        value: "",
      };

      // console.log("newItem", tabs);

      const allTabs = [...tabs];
      // console.log("allTabs", allTabs);
      // console.log("activePayload", allTabs);
      const activePayload = allTabs[activeIndex].payload || [];

      activePayload.push(newItem);
      // console.log("activePayload", allTabs);

      setTabs(allTabs);
    },
  }));

  const getDynamicFieldValue = (tabs, activeIndex, item, field = "label") => {
    if (!tabs?.[activeIndex]?.payload) return "";
    // const targetItem = tabs[activeIndex].payload.find(
    //   (payloadItem) =>
    //     payloadItem.type === item.type && payloadItem.index === item.index
    // );

    const targetItem = tabs[activeIndex].payload.find(
      (payloadItem) => payloadItem.type === item.type
    );

    if (!targetItem) return "";

    // For Headings
    if (item.type === "heading") {
      return targetItem.text;
    }

    if (item.type === "subheading") {
      return targetItem.text;
    }

    if (item.type === "textcaption") {
      return targetItem.text;
    }

    if (item.type === "textbody") {
      return targetItem.text;
    }

    // For textInput and textArea: look under texts
    if (item.type === "textInput" || item.type === "textArea") {
      const key = item.type === "textInput" ? "textInput_1" : "textArea_1";
      return targetItem.texts?.[key]?.[field] || "";
    }

    // For footerbutton: look under footer
    if (item.type === "footerbutton") {
      return targetItem.footer?.footer_1?.center_caption || "";
    }

    if (item.type === "radioButton") {
      return targetItem.label || "";
    }

    if (item.type === "checkBox") {
      return targetItem.label || "";
    }

    if (item.type === "dropDown") {
      return targetItem.label || "";
    }

    if (item.type === "chipSelector") {
      return targetItem.label || "";
    }

    if (item.type === "embeddedlink") {
      return targetItem.label || "";
    }

    if (item.type === "optin") {
      return targetItem.label || "";
    }

    if (item.type === "image") {
      console.log("targetItem.alt-text");
      // return targetItem.alt-text || "";
    }

    if (item.type === "document") {
      return targetItem.label || "";
    }

    if (item.type === "media") {
      return targetItem.label || "";
    }

    if (item.type === "date") {
      return targetItem.label || "";
    }

    // Fallback: return an empty string
    return "";
  };

  // Handle deleting items from the canvas
  const handleDelete = (index) => {
    // console.log("tabs", tabs);
    // const newTabs = [...tabs];
    // newTabs[activeIndex] = {
    //   ...newTabs[activeIndex],
    //   payload: newTabs[activeIndex].payload.filter((_, i) => i !== index),
    // };

    // setTabs(newTabs);

    setTabs((prevTabs) => {
      const newTabs = [...prevTabs];
      newTabs[activeIndex] = {
        ...newTabs[activeIndex],
        payload: newTabs[activeIndex].payload.filter((_, i) => i !== index),
      };
      return newTabs;
    });

    toast.success("Item deleted successfully");
  };

  //   const handleDelete = (idToDelete) => {
  //     console.log("idToDelete", idToDelete)
  //   setTabs((prevTabs) => {
  //     const newTabs = prevTabs.map((tab, i) => {
  //       if (i === activeIndex) {
  //         return {
  //           ...tab,
  //           payload: tab.payload.filter((item) => item.id !== idToDelete),
  //         };
  //       }
  //       return tab;
  //     });

  //     return newTabs;
  //   });

  //   toast.success("Item deleted successfully");
  // };

  // Draggable component for individual canvas items
  const DraggableItem = React.memo(({ item, index, tabs, activeIndex }) => {
    // console.log("itemddddd", item);
    // console.log("indexdddd", index);
    if (!item?.type) {
      console.error("DraggableItem error: item.type is not defined");
      return null;
    }

    const itemType = item?.type;
    // console.log("itemType", itemType);
    // const [, drag] = useDrag({
    //   type: item.type,
    //   item: { index },
    // });

    const [{ isDragging }, drag] = useDrag({
      type: item?.type,
      // item: { id: item.id },
      item: { type: item.type },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <Paper
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: "move",
        }}
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
            position: "relative",
          }}
        >
          <Typography variant="subtitle1" style={{ marginLeft: 8 }}>
            {getLabel(item.type)}
          </Typography>
          <Box>
            <IconButton size="small" onClick={() => onEdit(index, item)}>
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

        {/* <InputField
          // label="Enter value"
          // variant="outlined"
          // fullWidth
          // className="text-field"
          value={getDynamicFieldValue(tabs, activeIndex, item, "helper_text")}
          // onChange={(e) => handleInputChange(index, e.target.value)}
          multiline={item.type === "textArea"}
          rows={item.type === "textArea" ? 4 : undefined}
          // disabled={item.type !== "textInput" && item.type !== "textArea"}
          readOnly
        /> */}

        {/* <InputField
          value={getDynamicFieldValue(tabs, activeIndex, item, "helper_text")}
          multiline={item.type === "textArea"}
          rows={item.type === "textArea" ? 4 : undefined}
          readOnly
        /> */}
        <InputField
          value={getDynamicFieldValue(tabs, activeIndex, item, "helper_text")}
          multiline={item.type === "textArea"}
          rows={item.type === "textArea" ? 4 : undefined}
          readOnly
        />
      </Paper>
    );
  });

  // const DraggableItem = React.memo(({ item, index, onEdit, handleDelete, tabs, activeIndex }) => {
  //   if (!item?.type) {
  //     console.error(" error: item.type is not defined");
  //     return null;
  //   }

  //   const [{ isDragging }, drag] = useDrag({
  //     type: item.type,
  //     item: { type: item.type },
  //     collect: (monitor) => ({
  //       isDragging: monitor.isDragging(),
  //     }),
  //   });

  //   const dynamicValue = getDynamicFieldValue(tabs, activeIndex, item, "helper_text");
  //   const isTextArea = item.type === "textArea";

  //   return (
  //     <Paper
  //       ref={drag}
  //       style={{
  //         opacity: isDragging ? 0.5 : 1,
  //         cursor: "move",
  //       }}
  //       sx={{
  //         backgroundColor: getBackgroundColor(item.type),
  //       }}
  //       className="w-[450px] p-2 mb-2 rounded-lg shadow-md mt-10"
  //     >
  //       <Box
  //         sx={{
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "space-between",
  //           position: "relative",
  //         }}
  //       >
  //         <Typography variant="subtitle1" ml={1}>
  //           {getLabel(item.type)}
  //         </Typography>
  //         <Box>
  //           <IconButton size="small" onClick={() => onEdit(index, item)}>
  //             <EditOutlinedIcon fontSize="small" />
  //           </IconButton>
  //           <IconButton size="small" onClick={() => handleDelete(index)}>
  //             <DeleteForeverOutlinedIcon fontSize="small" className="text-red-400" />
  //           </IconButton>
  //         </Box>
  //       </Box>

  //       <InputField
  //         value={dynamicValue}
  //         multiline={isTextArea}
  //         rows={isTextArea ? 4 : undefined}
  //         readOnly
  //       />
  //     </Paper>
  //   );
  // });

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
      case "chipSelector":
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
      case "chipSelector":
        return "ChipSelector";
      case "footerbutton":
        return "FooterButton";
      case "embeddedlink":
        return "EmbeddedLink";
      case "optin":
        return "OptIn";
      case "image":
        return "Image";
      case "document":
        return "Document";
      case "media":
        return "Media";
      case "ifelse":
        return "IfElse";
      case "switch":
        return "Switch";
      case "date":
        return "Date";
      case "calendar":
        return "Calendar";
      // case "userdetail":
      //   return "UserDetail";
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
      className=" shadow-xl overflow-auto rounded-xl h-[830px] w-full hide-scrollbar bg-white pt-10"
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
        screenEditName={screenEditName}
        setScreenEditName={setScreenEditName}
        screenID={screenID}
        setScreenID={setScreenID}
        randomNumber={randomNumber}
        setRandomNumber={setRandomNumber}
        createTab={createTab}
        setCreateTab={setCreateTab}
        menuRefs={menuRefs}
        setEditDialogVisible={setEditDialogVisible}
        editDialogVisible={editDialogVisible}
      />
      {/* Render all items on the canvas */}
      <div className="w-1/3 ml-5 ">
        {/* {tabs[activeIndex]?.payload?.map((item, index) => (
          <div key={index}>
            <DraggableItem key={item.id} item={item} index={index} itemKey={item.id} />
          </div>
        ))} */}

        {tabs[activeIndex]?.payload
          ?.filter((item) => item.type !== undefined)
          .map((item, index) => (
            // <div key={item.id || index}>
            <div key={index}>
              <DraggableItem
                item={item}
                index={index}
                itemKey={item.id}
                tabs={tabs}
                activeIndex={activeIndex}
              />
            </div>
          ))}

        {/* {tabs[activeIndex]?.payload
          ?.map((item, index) => (
            <div key={index}>
              <DraggableItem
                item={item}
                index={index}
              />
            </div>
          ))} */}
      </div>
      {/* <div className="w-1/3"><EditPanel onClick={() => onEdit(index)} /></div> */}
    </div>
  );
};

export default Canvas;
