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
  const [type, drop] = useDrop(() => ({
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
      "chipSelector"
    ],
    drop: (item) => {
      setItems((prev) => [
        ...prev,
        { id: Date.now(), type: item.type, value: "" },
      ]);
    },



drop: (item) => {
  const newItem = {
    id: Date.now(),
    type: item.type,
  };

  if (item.type === "radioButton") {
    newItem.radio = {
      radio_1: {
        label: "Sample Radio Group",
        "data-source": [
          { id: "1", title: "Option 1", description: "First option", image: "" },
          { id: "2", title: "Option 2", description: "Second option", image: "" }
        ]
      }
    };
  }

  setTabs((prevTabs) => {
    const newTabs = [...prevTabs];
    const activePayload = newTabs[activeIndex].payload || [];
    activePayload.push(newItem);
    newTabs[activeIndex].payload = activePayload;
    return newTabs;
  });

}


  }));

  // Handle input change for TextField components
  // const handleInputChange = (index, value) => {
  //   console.log("value", value)
  //   setItems((prevItems) => {
  //     const updatedItems = [...prevItems];
  //     updatedItems[index].value = value;
  //     return updatedItems;
  //   });
  // };

 const getDynamicFieldValue = (tabs, activeIndex, item, field = "label") => {
  if (!tabs?.[activeIndex]?.payload) return "";

  const targetItem = tabs[activeIndex].payload.find(
    (payloadItem) => payloadItem.type === item.type && payloadItem.index === item.index
  );

  if (!targetItem) return "";

  // For textInput and textArea: look under texts
  if (item.type === "textInput" || item.type === "textArea") {
    const key = item.type === "textInput" ? "textInput_1" : "textArea_1";
    return targetItem.texts?.[key]?.[field] || "";
  }

  // For footerbutton: look under footer
  if (item.type === "footerbutton") {
    return targetItem.footer?.footer_1?.center_caption || "";
  }

if(item.type === "radioButton"){
 return targetItem.radio?.radio_1?.description || "";
}

  // Fallback: return an empty string
  return "";
};



  // Handle deleting items from the canvas
  const handleDelete = (index) => {
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

  // Draggable component for individual canvas items
  const DraggableItem = React.memo(({ itemKey, item, index }) => {
    console.log("item", item)

    if (!item?.type) {
    console.error("DraggableItem error: item.type is not defined");
    return null;
    }

    // const [, drag] = useDrag({
    //   type: item.type,
    //   item: { index },
    // });

    const [{ isDragging }, drag] = useDrag({
        type: 'field',
        item: { id: item.id, index },
        collect: monitor => ({
          isDragging: monitor.isDragging(),
        }),
      });

    return (
      <Paper
        ref={drag}
        style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
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
         value={getDynamicFieldValue(tabs, activeIndex, item, "helper_text")}
          // onChange={(e) => handleInputChange(index, e.target.value)}
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
      case  "chipSelector":
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
      case 'chipSelector':
        return 'ChipSelector';
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
      case 'media':
        return 'Media';
      case "ifelse":
        return "IfElse";
      case 'switch':
        return 'Switch';
      case "date":
        return "Date";
      case 'calendar':
        return 'Calendar';
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
      className=" shadow-xl overflow-auto rounded-xl  h-[830px] w-full hide-scrollbar  bg-white pt-10"
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
  ?.filter(item => item.type !== undefined)
  .map((item, index) => (
    <div key={item.id || index}>
      <DraggableItem
        item={item}
        index={index}
        itemKey={item.id}
      />
    </div>
))}

      </div>
      {/* <div className="w-1/3"><EditPanel onClick={() => onEdit(index)} /></div> */}
    </div>
  );
};

export default Canvas;