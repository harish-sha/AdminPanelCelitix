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
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { motion, AnimatePresence } from "framer-motion";
import CustomTooltip from "@/components/common/CustomTooltip";
import UniversalLabel from "@/whatsapp/components/UniversalLabel";

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
        <div className="p-3  rounded-md space-y-2 bg-blue-50 border shadow-sm">
          {targetItem.label && (
            <div>
              <span className="font-semibold">Label: </span>
              {targetItem.label}
            </div>
          )}

          {targetItem["helper-text"] && (
            <div>
              <span className="font-semibold">Helper Text: </span>
              {targetItem["helper-text"]}
            </div>
          )}

          {targetItem["error-message"] && (
            <div>
              <span className="font-semibold">Error Message: </span>
              {targetItem["error-message"]}
            </div>
          )}

          {targetItem["init-value"] && (
            <div>
              <span className="font-semibold">Initial Value: </span>
              {targetItem["init-value"]}
            </div>
          )}

          {targetItem["min-chars"] && (
            <div>
              <span className="font-semibold">Min Characters: </span>
              {targetItem["min-chars"]}
            </div>
          )}

          {targetItem["max-chars"] && (
            <div>
              <span className="font-semibold">Max Characters: </span>
              {targetItem["max-chars"]}
            </div>
          )}

          {targetItem.required && (
            <div>
              <span className="font-semibold">Required: </span>
              {targetItem.required ? "True" : "False"}
            </div>
          )}
        </div>
      );
    }

    if (item.type === "textArea") {
      return (
        <div className="p-3  rounded-md space-y-2 bg-blue-50 border shadow-sm">
          {targetItem.label && (
            <div>
              <span className="font-semibold">Label: </span>
              {targetItem.label}
            </div>
          )}

          {targetItem["helper-text"] && (
            <div>
              <span className="font-semibold">Helper Text: </span>
              {targetItem["helper-text"]}
            </div>
          )}

          {targetItem.required && (
            <div>
              <span className="font-semibold">Required: </span>
              {targetItem.required ? "True" : "False"}
            </div>
          )}
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
      return (
        <div className="p-3 rounded-md bg-blue-50 border shadow-sm">
          {targetItem.label && (
            <div>
              <span className="font-semibold">Label: </span>
              {targetItem.label}
            </div>
          )}

          {targetItem["left-caption"] && (
            <div className="mt-1">
              <span className="font-semibold">Left-caption: </span>
              {targetItem["left-caption"] || " "}
            </div>
          )}

          {targetItem["right-caption"] && (
            <div className="mt-1">
              <span className="font-semibold">Right-caption: </span>
              {targetItem["right-caption"] || " "}
            </div>
          )}

          {targetItem["center-caption"] && (
            <div className="mt-1">
              <span className="font-semibold">Center-caption: </span>
              {targetItem["center-caption"] || " "}
            </div>
          )}
        </div>
      );
    }

    if (item.type === "radioButton") {
      return (
        <div className="p-3  rounded-md bg-blue-50 border shadow-sm">
          {targetItem.label && (
            <div className="mb-1">
              <span className="font-semibold">Label: </span>
              {targetItem.label}
            </div>
          )}

          {(targetItem["data-source"] || []).map((opt, i) => (
            <div key={i} className="mt-2 p-2 border rounded bg-white shadow-sm">
              <p className="mb-1">
                <span className="font-semibold">Title:</span> {opt.title}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Description:</span> {opt.description}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Metadata:</span> {opt.metadata}
              </p>
              {opt.image && (
                <img
                  src={opt.image}
                  alt={opt.title || "option image"}
                  className="mt-1 w-20 h-20 object-contain rounded"
                />
              )}
            </div>
          ))}

          {targetItem.required && (
            <div className="mt-1">
              <span className="font-semibold">Required: </span>
              {targetItem.required ? "True" : "False"}
            </div>
          )}
        </div>
      );
    }

    if (item.type === "checkBox") {
      return (
        <div className="p-3 rounded-md bg-blue-50 border shadow-sm">
          {targetItem.label && (
            <div className="mb-1">
              <span className="font-semibold">Label: </span>
              {targetItem.label}
            </div>
          )}

          <ul className="mt-2 space-y-2">
            {(targetItem["data-source"] || []).map((opt, idx) => (
              <li key={idx} className="border p-2 rounded bg-white">
                {opt.title && (
                  <div className="mb-1">
                    <span className="font-semibold"> Title: </span>
                    {opt.title || "Option"}
                  </div>
                )}
                {opt.description && (
                  <div className="mb-1">
                    <span className="font-semibold"> Description: </span>
                    {opt.description}
                  </div>
                )}
                {opt.metadata && (
                  <div className="mb-1">
                    <span className="font-semibold"> Meta: </span>
                    {opt.metadata}
                  </div>
                )}
                {opt.image && (
                  <img
                    src={opt.image}
                    alt="Option"
                    className="w-12 h-12 mt-1 object-cover rounded"
                  />
                )}
              </li>
            ))}
          </ul>

          {targetItem.required && (
            <div className="mt-1">
              <span className="font-semibold">Required: </span>
              {targetItem.required ? "True" : "False"}
            </div>
          )}
        </div>
      );
    }

    if (item.type === "dropDown") {
      return (
        <div className="p-3  rounded-md  bg-blue-50 border shadow-sm">
          {targetItem.label && (
            <div className="mb-1">
              <span className="font-semibold">Label: </span>
              {targetItem.label}
            </div>
          )}

          <div className="space-y-1">
            {(targetItem["data-source"] || []).map((opt, index) => (
              <div
                key={index}
                className="border border-gray-300 p-2 rounded bg-white"
              >
                <div className="mb-1">
                  <span className="font-semibold"> Title: </span>
                  {opt.title || "Untitled Option"}
                </div>
                {opt.description && (
                  <div className="mb-1">
                    <span className="font-semibold"> Description: </span>
                    {opt.description}
                  </div>
                )}
                {opt.metadata && (
                  <div className="mb-1">
                    <span className="font-semibold"> Metadata: </span>
                    {opt.metadata}
                  </div>
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
          {targetItem.required && (
            <div className="mt-1">
              <span className="font-semibold">Required: </span>
              {targetItem.required ? "True" : "False"}
            </div>
          )}
        </div>
      );
    }

    if (item.type === "chipSelector") {
      const options = targetItem["data-source"] || [];
      return (
        <div className=" p-3 rounded-md  bg-blue-50 border shadow-sm">
          {targetItem.label && (
            <div className="mb-1">
              <span className="font-semibold">Label: </span>
              {targetItem.label}
            </div>
          )}

          {targetItem.description && (
            <p className="mb-1">
              <span className="font-semibold">Description: </span>
              {targetItem.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-2">
            {options.length > 0 ? (
              options.map((opt, idx) => (
                <span
                  key={idx}
                  className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm"
                >
                  {opt.title || `Option ${idx + 1}`}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-400"></p>
            )}
          </div>

          {targetItem["max-selected-items"] && (
            <p className="mb-1">
              <span className="font-semibold">Max Selectable: </span>
              {targetItem["max-selected-items"] || 2}
            </p>
          )}

          {targetItem.required && (
            <div className="mt-1">
              <span className="font-semibold">Required: </span>
              {targetItem.required ? "True" : "False"}
            </div>
          )}
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
      return (
        <div className="w-full px-4 py-2 bg-blue-50 border rounded-md shadow-sm ">
          {targetItem.src && (
            <img
              src={targetItem.src}
              alt={targetItem["alt-text"] || "Image preview"}
              className="rounded-md max-w-full"
              style={{
                objectFit: targetItem["scale-type"] || "contain",
                aspectRatio: targetItem["aspect-ratio"] || "auto",
              }}
            />
          )}

          {targetItem["alt-text"] && (
            <div className="mt-1">
              <span className="font-semibold">Alt Text: </span>
              {targetItem["alt-text"] || "No description"}
            </div>
          )}

          {targetItem["scale-type"] && (
            <div className="mt-1">
              <span className="font-semibold"> Scale Type: </span>
              {targetItem["scale-type"] || "contain"}
            </div>
          )}
        </div>
      );
    }

    if (item.type === "document") {
      return (
        <div className="p-3 border rounded-md shadow-sm bg-blue-50">
          {targetItem.label && (
            <label className="font-semibold">
              <span className="font-semibold">Label: </span>
              {targetItem.label || "Upload Documents"}
            </label>
          )}

          {targetItem.description && (
            <p className="">
              <span className="font-semibold">Description: </span>
              {targetItem.description}
            </p>
          )}

          {targetItem["min-uploaded-documents"] && (
            <p className=" mt-1">
              <span className="font-semibold">Min Documents: </span>
              {targetItem["min-uploaded-documents"] || ""}
            </p>
          )}
          {targetItem["max-uploaded-documents"] && (
            <p>
              <span className="font-semibold"> Max Documents: </span>
              {targetItem["max-uploaded-documents"] || ""}
            </p>
          )}
        </div>
      );
    }

    if (item.type === "media") {
      return (
        <div className="p-3 border bg-blue-50 rounded-md shadow-sm ">
          {targetItem.label && (
            <label className="">
              <span className="font-semibold">Label: </span>
              {targetItem.label || "Upload photos"}
            </label>
          )}

          {targetItem.description && (
            <p className="">
              <span className="font-semibold">Description: </span>
              {targetItem.description}
            </p>
          )}

          {targetItem["min-uploaded-photos"] && (
            <p className=" mt-1">
              <span className="font-semibold"> Min Photos: </span>
              {targetItem["min-uploaded-photos"] || ""}
            </p>
          )}

          {targetItem["max-uploaded-photos"] && (
            <p>
              <span className="font-semibold"> Max Photos: </span>
              {targetItem["max-uploaded-photos"] || ""}
            </p>
          )}
        </div>
      );
    }

    if (item.type === "imageCarousel") {
      return (
        <div className="p-3 border bg-blue-50 rounded-md shadow-sm ">
          {targetItem["scale-type"] && (
            <p>
              <span className="font-semibold">Scale-Type: </span>
              {targetItem["scale-type"]}
            </p>
          )}

          {/* {targetItem["alt-text"] && (
            <p>
              <span className="font-semibold">Alt-Text: </span>
              {targetItem["alt-text"]}
            </p> 
          )} */}
        </div>
      )
    }

    if (item.type === "date") {
      return (
        <div className="w-full px-4 py-2  bg-blue-50 border rounded-md shadow-sm">
          {targetItem.label && (
            <label className="mb-1">
              <span className="font-semibold">Label: </span>
              {targetItem.label}
            </label>
          )}

          {targetItem["helper-text"] && (
            <div className="mt-1">
              <span className="font-semibold">Helper-Text: </span>
              {targetItem["helper-text"] || ""}
            </div>
          )}

          {targetItem["min-date"] && (
            <div className="mt-1">
              <span className="font-semibold"> Min-Date: </span>
              {targetItem["min-date"] || ""}
            </div>
          )}

          {targetItem["max-date"] && (
            <div className="mt-1">
              <span className="font-semibold"> Max-Date: </span>
              {targetItem["max-date"] || ""}
            </div>
          )}

          {targetItem["unavailable-dates"] && (
            <div>
              <span className="font-semibold"> Unavailable-Date: </span>
              {Array.isArray(targetItem["unavailable-dates"])
                ? targetItem["unavailable-dates"].join(", ")
                : targetItem["unavailable-dates"] || ""}
            </div>
          )}
        </div>
      );
    }

    if (item.type === "calendar") {
      const isRange = targetItem.mode === "range";
      return (
        <div className="space-y-2  bg-blue-50 border rounded-md shadow-sm p-3">
          {targetItem.label && (
            <label className=" mb-1">
              {isRange && typeof targetItem.label === "object" ? (
                <>
                  <div>
                    <span className="font-semibold">First-label: </span>
                    {targetItem.label?.["start-date"] || ""}
                  </div>
                  <div className="mt-1">
                    <span className="font-semibold">Second-label: </span>
                    {targetItem.label?.["end-date"] || ""}
                  </div>
                </>
              ) : (
                <>
                  <span className="font-semibold">Label:</span>
                  {targetItem.label}
                </>
              )}
            </label>
          )}

          {targetItem["helper-text"] && (
            <div className=" mb-1">
              {isRange && typeof targetItem["helper-text"] === "object" ? (
                <>
                  <div>
                    <span className="font-semibold">Start: </span>
                    {targetItem["helper-text"]?.["start-date"] || ""} {"   "}
                  </div>
                  <div className="mt-1">
                    <span className="font-semibold">End: </span>
                    {targetItem["helper-text"]?.["end-date"] || ""}
                  </div>
                </>
              ) : (
                <>
                  <span className="font-semibold">Helper-Text: </span>
                  {targetItem["helper-text"] || ""}
                </>
              )}
            </div>
          )}

          {targetItem.mode && (
            <div>
              <span className="font-semibold"> Mode: </span>
              {targetItem.mode || ""}
            </div>
          )}

          {targetItem["min-date"] && (
            <div>
              <span className="font-semibold"> Min-Date: </span>
              {targetItem["min-date"] || ""}
            </div>
          )}

          {targetItem["max-date"] && (
            <div>
              <span className="font-semibold"> Max-Date: </span>
              {targetItem["max-date"] || ""}
            </div>
          )}

          {targetItem["unavailable-dates"] && (
            <div>
              <span className="font-semibold"> Unavailable-Date: </span>
              {Array.isArray(targetItem["unavailable-dates"])
                ? targetItem["unavailable-dates"].join(", ")
                : targetItem["unavailable-dates"] || ""}
            </div>
          )}

          {targetItem.required && (
            <div className="text-sm">
              {isRange && typeof targetItem.required === "object" ? (
                <>
                  <div>
                    <span className="font-semibold">Start-date:</span>{" "}
                    {targetItem.required["start-date"] ? "True" : "False"}
                  </div>
                  <div className="mt-1">
                    <span className="font-semibold">End-date:</span>{" "}
                    {targetItem.required["end-date"] ? "True" : "False"}
                  </div>
                </>
              ) : (
                <>
                  <span className="font-semibold">Required:</span>{" "}
                  {targetItem.required ? "True" : "False"}
                </>
              )}
            </div>
          )}
        </div>
      );
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
      // <motion.div
      //   initial={{ opacity: 0, x: -100 }}
      //   animate={{ opacity: 1, x: 0 }}
      //   exit={{ opacity: 0, x: -100 }}
      //   transition={{ type: "spring", stiffness: 200, damping: 25 }}
      // >
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
        className="w-110 p-2 mb-2 rounded-lg shadow-md mt-10"
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
                style={{ cursor: "pointer" }}
              />
            </IconButton>
          </Box>
        </div>
        <div
          className="text-sm p-2 rounded-md bg-white border border-gray-300 text-wrap"
          style={{
            whiteSpace: item.type === "textArea" ? "pre-wrap" : "secondary",
            minHeight:
              item.type === "textArea" ? `${item.rows || 4}em` : "auto",
          }}
        >
          {getDynamicFieldValue(tabs, activeIndex, item, "helper_text")}
        </div>
      </Paper>
      // {/* </motion.div> */}
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
      case "richText" :
        return "RichText" ;
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
      case "imageCarousel":
        return "ImageCarousel"
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

        <AnimatePresence>
          {tabs[activeIndex]?.payload
            ?.filter((item) => item.type !== undefined)
            .map((item, index) => (
              // <div key={item.id || index}>
              <div key={index}>
                <DraggableItem
                  key={item.id || index}
                  item={item}
                  index={index}
                  itemKey={item.id}
                  tabs={tabs}
                  activeIndex={activeIndex}
                />
              </div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Canvas;
