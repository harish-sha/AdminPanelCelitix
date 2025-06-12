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

    if (item.type === "textInput") {
      return (
        <div>
          <label>{targetItem.label}</label>
          <p>
           
            {targetItem["helper-text"] && (
              <small>{targetItem["helper-text"]}</small>
            )}
          </p>

           <p>{targetItem["error-message"] && (
              <small>{targetItem["error-message"]}</small> )}
          </p>
          <p>{targetItem.name} </p>
          <div>{targetItem["min-chars"]} </div>
          <div>{targetItem["max-chars"]} </div>


          <div>
            <strong>Required: </strong>
            {targetItem.required ? "True" : "False"}
          </div>
        </div>
      );
    }

    if (item.type === "textArea") {
      return (
        <div>
          <label>{targetItem.label}</label>
          <p>
            {targetItem["helper-text"] && (
              <small>{targetItem["helper-text"]}</small>
            )}
          </p>
         
          <div>
            <strong>Required: </strong>
            {targetItem.required ? "True" : "False"}
          </div>
        </div>
      );
    }

    // For textInput and textArea: look under texts
    // if (item.type === "textInput" || item.type === "textArea") {
    //   const key = item.type === "textInput" ? "textInput_1" : "textArea_1";
    //   return targetItem.texts?.[key]?.[field] || "";
    // }

    // For footerbutton: look under footer
    if (item.type === "footerbutton") {
      return targetItem.footer?.footer_1?.center_caption || "";
    }

  if (item.type === "radioButton") {
  return (
    <div className="p-3 bg-blue-50 rounded-md">
      <label className="font-medium">{targetItem.label || "Select an option"}</label>

      {(targetItem["data-source"] || []).map((opt, i) => (
        <div key={i} className="mt-2 p-2 border rounded bg-white shadow-sm">
          <p><strong>Title:</strong> {opt.title}</p>
          <p><strong>Description:</strong> {opt.description}</p>
          <p><strong>Metadata:</strong> {opt.metadata}</p>
          {opt.image && (
            <img
              src={opt.image}
              alt={opt.title || "option image"}
              className="mt-1 w-20 h-20 object-contain rounded"
            />
          )}
        </div>
      ))}

      <div className="mt-3">
        <strong>Required:</strong> {targetItem.required ? "True" : "False"}
      </div>
    </div>
  );
}


   if (item.type === "checkBox") {
  return (
    <div>
      <label className="font-semibold">{targetItem.label || "Select an option"}</label>

      <ul className="mt-2 space-y-2">
        {(targetItem["data-source"] || []).map((opt, idx) => (
          <li key={idx} className="border p-2 rounded bg-sky-100">
            <div className="font-medium">{opt.title || "Option"}</div>
            {opt.description && <div className="text-sm text-gray-700">{opt.description}</div>}
            {opt.metadata && <div className="text-xs text-gray-500">Meta: {opt.metadata}</div>}
            {opt.image && (
              <img src={opt.image} alt="Option" className="w-12 h-12 mt-1 object-cover rounded" />
            )}
          </li>
        ))}
      </ul>

      <div className="mt-2 text-sm text-gray-600">
        <strong>Required:</strong> {targetItem.required ? "True" : "False"}
      </div>
    </div>
  );
}

if (item.type === "dropDown") {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">
        {targetItem.label || "Select an option"}
      </label>

      <div className="space-y-1">
        {(targetItem["data-source"] || []).map((opt, index) => (
          <div
            key={index}
            className="border border-gray-300 p-2 rounded bg-blue-50"
          >
            <div className="font-semibold">{opt.title || "Untitled Option"}</div>
            {opt.description && (
              <div className="text-sm text-gray-600">{opt.description}</div>
            )}
            {opt.metadata && (
              <div className="text-xs text-gray-500">Metadata: {opt.metadata}</div>
            )}
            {opt.image && (
              <img
                src={opt.image}
                alt={opt.title}
                className="mt-1 h-10 object-contain"
              />
            )}
          </div>
        ))}
      </div>
     <div className="mt-2 text-sm text-gray-600">
        <strong>Required:</strong> {targetItem.required ? "True" : "False"}
      </div>
    </div>
  );
}


    if (item.type === "chipSelector") {
  const options = targetItem["data-source"] || [];

  return (
    <div>
      <label className="block font-semibold mb-1">
        {targetItem.label || "Chip Selector Label"}
      </label>

      {targetItem.description && (
        <p className="text-sm text-gray-600 mb-2">
          {targetItem.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-2">
        {options.length > 0 ? (
          options.map((opt, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {opt.title || `Option ${idx + 1}`}
            </span>
          ))
        ) : (
          <p className="text-sm text-gray-400">No options available</p>
        )}
      </div>

      <p className="text-sm">
        <strong>Max Selectable:</strong> {targetItem["max-selected-items"] || 2}
      </p>
      <p className="text-sm">
        <strong>Required:</strong> {targetItem.required ? "True" : "False"}
      </p>
    </div>
  );
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
      return (
        <div>
          <label>{targetItem.label || ""} </label>
           </div>
      ) 
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
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-700 tracking-wider">
            {getLabel(item.type)}
          </label>
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
        </div>

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
        {/* <InputField
          value={getDynamicFieldValue(tabs, activeIndex, item, "helper_text")}
          multiline={item.type === "textArea"}
          rows={item.type === "textArea" ? 4 : undefined}
          readOnly
        /> */}

        <div
          style={{
            whiteSpace: item.type === "textArea" ? "pre-wrap" : "secondary",
            minHeight:
              item.type === "textArea" ? `${item.rows || 4}em` : "auto",
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "4px",
            background: "white",
            height: "auto",
            borderRadius: "10px",
          }}
        >
          {getDynamicFieldValue(tabs, activeIndex, item, "helper_text")}
        </div>
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
        return "#E0F7FA";
      case "textArea":
        return "#E0F7FA";
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
        return "Textbody";
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
