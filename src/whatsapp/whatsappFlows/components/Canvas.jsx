import React, { useRef, useEffect, useState } from "react";
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
import { AiOutlineInfoCircle } from "react-icons/ai";
import UniversalLabel from "@/whatsapp/components/UniversalLabel";
import { marked } from "marked";
import { useDispatch } from "react-redux";
import DrawOutlinedIcon from "@mui/icons-material/DrawOutlined";
import { deleteFlowItem } from "../redux/features/FlowSlice";

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

      const newItem = {
        id: Date.now(),
        type: item.type,
        value: "",
      };

      const allTabs = [...tabs];
      const activePayload = allTabs[activeIndex].payload || [];

      activePayload.push(newItem);

      setTabs(allTabs);
    },

    // new drop code as per the drag and drop working functionality
    // drop: (item, monitor) => {
    //   if (monitor.didDrop()) return;

    //   const newItem = { id: Date.now(), type: item.type, value: "" };

    //   setTabs((prev) =>
    //     prev.map((tab, idx) => {
    //       if (idx !== activeIndex) return tab;
    //       return {
    //         ...tab,
    //         payload: [newItem, ...(tab.payload || [])],
    //       };
    //     })
    //   );
    // },
    // collect: (m) => ({ isOver: m.isOver({ shallow: true }) }),
  }));

  const getDynamicFieldValue = (tabs, activeIndex, item, field = "label") => {
    if (!tabs?.[activeIndex]?.payload) return "";
    const targetItem = tabs[activeIndex].payload.find(
      (payloadItem) =>
        payloadItem.type === item.type && payloadItem.index === item.index
    );

    // const targetItem = tabs[activeIndex].payload.find(
    //   (payloadItem) => payloadItem.type === item.type
    // );

    if (!targetItem) return "";

    // For Headings
    if (item.type === "heading") {
      return (
        <div className="break-words whitespace-pre-wrap w-full max-w-full">
          {targetItem.text}
        </div>
      );
    }

    if (item.type === "subheading") {
      return (
        <div className="break-words whitespace-pre-wrap w-full max-w-full">
          {targetItem.text}
        </div>
      );
    }

    if (item.type === "textcaption") {
      return (
        <div className="break-words whitespace-pre-wrap w-full max-w-full">
          {targetItem.text}
        </div>
      );
    }

    if (item.type === "textbody") {
      return (
        <div className="break-words whitespace-pre-wrap w-full max-w-full">
          {targetItem.text}
        </div>
      );
    }

    if (item.type === "textInput") {
      return (
        <div className="p-3  rounded-md space-y-2 bg-blue-50 border shadow-sm ">
          {targetItem.label && (
            <div>
              <span className="font-semibold">Label: </span>
              {targetItem.label}
            </div>
          )}

          {targetItem["helper-text"] && (
            <div className="break-words whitespace-pre-wrap w-full max-w-full">
              <span className="font-semibold ">Helper Text: </span>
              {targetItem["helper-text"]}
            </div>
          )}

          {targetItem["error-message"] && (
            <div className="break-words whitespace-pre-wrap w-full max-w-full">
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
            <div className="break-words whitespace-pre-wrap w-full max-w-full">
              <span className="font-semibold">Label: </span>
              {targetItem.label}
            </div>
          )}

          {targetItem["helper-text"] && (
            <div className="break-words whitespace-pre-wrap w-full max-w-full">
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

    if (item.type === "richText") {
      let renderedHTML = "<p>No content available</p>";

      try {
        const markdown = Array.isArray(targetItem?.text)
          ? targetItem.text.join("\n")
          : targetItem?.content || "";

        renderedHTML = marked.parse(markdown);
      } catch (err) {
        console.error("Markdown rendering error:", err);
        renderedHTML = "<p>No content available</p>";

        renderedHTML = renderedHTML.replace(
          /<img[^>]*src=["'](?!data:image\/)[^"']*["'][^>]* style="width-10px" >/g,
          `<img$1 class="w-10 h-10 rounded-full object-cover border">`
        );
      }
      return (
        <>
          {/* {targetItem.text && ( */}
          <div className="w-full mx-auto border rounded-md shadow-md overflow-hidden  h-auto flex flex-col p-3 space-y-2 bg-blue-50 break-words whitespace-pre-wrap max-w-full">
            <div
              className="flex-1 overflow-y-auto  prose prose-sm max-w-none prose-img:rounded prose-a:text-blue-500 prose-a:underline prose-ul:list-disc prose-ol:list-decimal prose-strong:font-bold"
              dangerouslySetInnerHTML={{ __html: renderedHTML }}
            />

            <style>
              {`
    .prose h1 {
      font-size: 1.5rem;
      font-weight: 700;
    }
    .prose h2 {
      font-size: 1.25rem;
      font-weight: 500;
    }
    .prose img {
      width: 2.5rem; 
      height: 2.5rem; 
      border-radius: 9999px; 
      object-fit: cover; 
      border: 1px solid #d1d5db; 
      display: inline-block; 
    }
  `}
            </style>
          </div>
        </>
      );
    }

    // For footerbutton: look under footer

    if (item.type === "footerbutton") {
      const footer = targetItem.footer?.["footer_1"];

      return (
        <div className="p-3 rounded-md bg-blue-50 border shadow-sm">
          {footer?.label && (
            <div>
              <span className="font-semibold">Label: </span>
              {footer.label}
            </div>
          )}

          {footer?.left_caption && (
            <div className="mt-1">
              <span className="font-semibold">Left-caption: </span>
              {footer.left_caption}
            </div>
          )}

          {footer?.right_caption && (
            <div className="mt-1">
              <span className="font-semibold">Right-caption: </span>
              {footer.right_caption}
            </div>
          )}

          {footer?.center_caption && (
            <div className="mt-1">
              <span className="font-semibold">Center-caption: </span>
              {footer.center_caption}
            </div>
          )}

          {footer?.on_click_action && (
            <div className="mt-1">
              <span className="font-semibold">Next Action: </span>
              {footer.on_click_action}
            </div>
          )}
        </div>
      );
    }

    if (item.type === "radioButton") {
      return (
        <div className="p-3 rounded-md bg-blue-50 border shadow-sm">
          {targetItem.label && (
            <div className="mb-1">
              <span className="font-semibold">Label: </span>
              {targetItem.label}
            </div>
          )}

          {(targetItem["data-source"] || []).map((opt, i) => (
            <div
              key={i}
              className="mt-2 p-2 border rounded-md bg-white shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="mb-1">
                  <span className="font-semibold">Title:</span> {opt.title}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Description:</span>{" "}
                  {opt.description}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Metadata:</span>{" "}
                  {opt.metadata}
                </p>
              </div>
              {opt.image && (
                <div className="flex justify-end items-center mt-0">
                  <img
                    src={
                      opt.image?.startsWith("data:")
                        ? opt.image
                        : `data:image/jpeg;base64,${opt.image}`
                    }
                    alt={opt.title || "option image"}
                    className="w-10 h-10 rounded-full object-cover border"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
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

          <div className="mt-2 space-y-2">
            {(targetItem["data-source"] || []).map((opt, idx) => (
              <div
                key={idx}
                className="mt-2 p-2 border rounded-md bg-white shadow-sm flex items-center justify-between "
              >
                <div>
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
                      <span className="font-semibold">Metadata: </span>
                      {opt.metadata}
                    </div>
                  )}
                </div>
                {opt.image && (
                  <div className="flex justify-end items-center mt-0">
                    <img
                      src={
                        opt.image?.startsWith("data:")
                          ? opt.image
                          : `data:image/jpeg;base64,${opt.image}`
                      }
                      alt={opt.title || "option image"}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                  </div>
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
                className="border border-gray-300 p-2 rounded bg-white flex  items-center justify-between"
              >
                <div>
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
                </div>

                {opt.image && (
                  <div className="flex justify-end items-center mt-0">
                    <img
                      src={
                        opt.image?.startsWith("data:")
                          ? opt.image
                          : `data:image/jpeg;base64,${opt.image}`
                      }
                      alt={opt.title || "option image"}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                  </div>
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
      return (
        <div className="p-3  rounded-md  bg-blue-50 border shadow-sm">
          {targetItem.text && (
            <div className="mb-1">
              <span className="font-semibold">Text: </span>
              {targetItem.text}
            </div>
          )}

          {targetItem["on-click-action"] && (
            <div>
              <span className="font-semibold">Action: </span>
              {targetItem["on-click-action"]}
            </div>
          )}
        </div>
      );
    }

    if (item.type === "optin") {
      return (
        <div className="p-3  rounded-md  bg-blue-50 border shadow-sm">
          {targetItem.label && (
            <div className="mb-1">
              <span className="font-semibold">Label: </span>
              {targetItem.label}
            </div>
          )}

          {targetItem.required && (
            <div className="mt-1">
              <span className="font-semibold">Required: </span>
              {targetItem.required ? "True" : "False"}
            </div>
          )}

          {targetItem["on-click-action"] && (
            <div>
              <span className="font-semibold">Action: </span>
              {targetItem["on-click-action"]}
            </div>
          )}
        </div>
      );
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
      );
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
        <div className="space-y-2 bg-blue-50 border rounded-md shadow-sm p-3">
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

  const dispatch = useDispatch();
  // Handle deleting items from the canvas
  const handleDelete = (index, item) => {
    console.log("index", index);
    console.log("item", item);
    setTabs((prevTabs) => {
      const newTabs = [...prevTabs];
      newTabs[activeIndex] = {
        ...newTabs[activeIndex],
        payload: newTabs[activeIndex].payload.filter((_, i) => i !== index),
      };
      return newTabs;
    });
    dispatch(deleteFlowItem({ id: item.storeId }));

    toast.success("Item deleted successfully");
  };

  const moveItem = (fromIndex, toIndex) => {
    setTabs((prev) =>
      prev.map((tab, tabIdx) => {
        if (tabIdx !== activeIndex) return tab;
        const newPayload = Array.from(tab.payload || []);
        const [moved] = newPayload.splice(fromIndex, 1);
        newPayload.splice(toIndex, 0, moved);
        return { ...tab, payload: newPayload };
      })
    );
  };

  // Draggable component for individual canvas items
  const DraggableItem = React.memo(({ item, index, tabs, activeIndex }) => {
    console.log("item", item);
    if (!item?.type) {
      console.error("DraggableItem error: item.type is not defined");
      return null;
    }

    const itemType = item?.type;

    // const [{ isDragging }, drag] = useDrag({
    //   type: item?.type,
    //   // item: { id: item.id },
    //   item: { type: item.type },
    //   collect: (monitor) => ({
    //     isDragging: monitor.isDragging(),
    //   }),
    // });

    const ref = useRef(null);

    // 2a) drop — handle hover to reorder
    const [, drop] = useDrop({
      accept: "canvasItem",
      hover(dragged) {
        if (dragged.index === index) return;
        moveItem(dragged.index, index);
        dragged.index = index;
      },
    });

    // 2b) drag — expose your index & type
    const [{ isDragging }, drag] = useDrag({
      type: "canvasItem",
      item: { type: item.type, index },
      collect: (m) => ({ isDragging: m.isDragging() }),
    });

    drag(drop(ref));

    const [selectedItem, setSelectedItem] = useState(null);
    const [editDialogVisible, setEditDialogVisible] = useState(false);

    const handleEdit = (index, item) => {
      setSelectedItem({ ...item, index, caseKey: item.caseKey }); // ✅ force a new reference
      setEditDialogVisible(true); // ✅ show the edit panel/modal
    };

    const content = getDynamicFieldValue(
      tabs,
      activeIndex,
      item,
      "helper_text"
    );

    return (
      // <motion.div
      //   key={item.id}
      //   layout
      //   initial={{ opacity: 0, x: -100 }}
      //   animate={{ opacity: 1, x: 0 }}
      //   exit={{ opacity: 0, x: -100 }}
      //   transition={{ type: "spring", stiffness: 200, damping: 25 }}
      // >
      <Paper
        // ref={drag}
        ref={ref}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: "move",
        }}
        sx={{
          backgroundColor: getBackgroundColor(item.type),
          borderRadius: "10px",
        }}
        className={`w-110 p-2 mb-3 rounded-lg shadow-md mt-10 ${
          item.status === 0
            ? "border-2 border-red-300"
            : "border-2 border-green-300"
        }`}
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
            <IconButton onClick={() => handleDelete(index, item)} size="small">
              <DeleteForeverOutlinedIcon
                fontSize="small"
                className="text-red-400"
                style={{ cursor: "pointer" }}
              />
            </IconButton>
          </Box>
        </div>

        {/* <div
          className="text-sm p-2 rounded-md bg-white border border-gray-300 text-wrap"
          style={{
            whiteSpace: item.type === "textArea" ? "pre-wrap" : "secondary",
            minHeight:
              item.type === "textArea" ? `${item.rows || 4}em` : "auto",
          }}
        >
          {getDynamicFieldValue(tabs, activeIndex, item, "helper_text")}
        </div> */}

        <div
          className="text-sm p-2 rounded-md bg-white border border-gray-300 text-wrap"
          style={{
            whiteSpace: item.type === "textArea" ? "pre-wrap" : "secondary",
            minHeight:
              item.type === "textArea" ? `${item.rows || 4}em` : "auto",
          }}
        >
          {content && content?.props?.children ? (
            content
          ) : (
            <span className="text-gray-400 italic">
              Please fill this field by clicking the{" "}
              <span className="text-violet-600 font-medium">edit icon</span> or
              remove this block.
            </span>
          )}
        </div>
      </Paper>
      // </motion.div>
    );
  });

  // Helper function to get background color based on item type
  const getBackgroundColor = (type) => {
    switch (type) {
      // case "heading":
      //   return "#e3f2fd";
      // case "subheading":
      //   return "#ffebee";
      // case "textbody":
      //   return "#fff3cd";
      // case "textcaption":
      //   return "#f8bbd0";
      // case "textInput":
      //   return "#E0F7FA";
      // case "textArea":
      //   return "#E0F7FA";
      // case "radioButton":
      // case "checkBox":
      // case "dropDown":
      //   return "#c5e1f5";
      // case "chipSelector":

      case "heading":
        return "#E0F7FA";
      case "subheading":
        return "#E0F7FA";
      case "textbody":
        return "#E0F7FA";
      case "textcaption":
        return "#E0F7FA";
      case "textInput":
        return "#c5e1f5";
      case "textArea":
        return "#c5e1f5";
      case "richText":
        return "#c5e1f5";
      case "radioButton":
        return "#ADABD7";
      case "checkBox":
        return "#ADABD7";
      case "dropDown":
        return "#ADABD7";
      case "chipSelector":
        return "#ADABD7";
      case "footerbutton":
        return "#A091C5";
      case "embeddedlink":
        return "#A091C5";
      case "optin":
        return "#A091C5";
      case "image":
        return "#A4E3E6";
      case "document":
        return "#A4E3E6";
      case "media":
        return "#A4E3E6";
      case "imageCarousel":
        return "#A4E3E6";
      case "ifelse":
        return "#96C7C8";
      case "switch":
        return "#96C7C8";
      case "date":
        return "#7FC1C5";
      case "calendar":
        return "#7FC1C5";
      default:
        return "#c5e1f5";
    }
  };

  // Helper function to get label text based on item type
  const getLabel = (type) => {
    switch (type) {
      case "heading":
        return (
          <div className="flex items-center gap-1 text-md text-gray-700">
            Heading
            <CustomTooltip
              title="Heading: Provide a meaningful title or remove this block."
              placement="top"
              arrow
            >
              <AiOutlineInfoCircle fontSize="medium" />
            </CustomTooltip>
          </div>
        );

      case "subheading":
        return (
          <div className="flex items-center gap-1 text-md text-gray-700">
            Subheading
            <CustomTooltip
              title="Subheading: Add context to the heading or remove this block."
              placement="top"
              arrow
            >
              <AiOutlineInfoCircle fontSize="medium" />
            </CustomTooltip>
          </div>
        );

      case "textbody":
        return (
          <div className="flex items-center gap-1 text-md text-gray-700">
            Textbody
            <CustomTooltip
              title="Text body: Add your main message here. Leave blank only if not needed. or remove the block"
              placement="top"
              arrow
            >
              <AiOutlineInfoCircle fontSize="medium" />
            </CustomTooltip>
          </div>
        );

      case "textcaption":
        return (
          <div className="flex items-center gap-1 text-md text-gray-700">
            Textcaption
            <CustomTooltip
              title="Caption: Add a short label or note. Optional but helpful. or remove the block"
              placement="top"
              arrow
            >
              <AiOutlineInfoCircle fontSize="medium" />
            </CustomTooltip>
          </div>
        );

      case "textInput":
        return (
          <div className="flex items-center gap-1 text-md text-gray-700">
            TextInput
            <CustomTooltip
              title="Text input: Add a field label and placeholder for user entry. or remove the block"
              placement="top"
              arrow
            >
              <AiOutlineInfoCircle fontSize="medium" />
            </CustomTooltip>
          </div>
        );

      case "textArea":
        return (
          <div className="flex items-center gap-1 text-md text-gray-700">
            TextArea
            <CustomTooltip
              title="Text area: Add longer input guidance or remove if not required. or remove the block"
              placement="top"
              arrow
            >
              <AiOutlineInfoCircle fontSize="medium" />
            </CustomTooltip>
          </div>
        );

      case "richText":
        return (
          <div className="flex items-center gap-1 text-md text-gray-700">
            RichText
            <CustomTooltip
              title="Rich Text: Format your content. Fill or remove as needed. or remove the block"
              placement="top"
              arrow
            >
              <AiOutlineInfoCircle fontSize="medium" />
            </CustomTooltip>
          </div>
        );

      case "radioButton":
        return (
          <div className="flex items-center gap-1 text-md text-gray-700">
            RadioButton
            <CustomTooltip
              title="Radio button: Add options and question label. Leave empty only if not required. or remove the block"
              placement="top"
              arrow
            >
              <AiOutlineInfoCircle fontSize="medium" />
            </CustomTooltip>
          </div>
        );

      case "checkBox":
        return (
          <div className="flex items-center gap-1 text-md text-gray-700">
            CheckBox
            <CustomTooltip
              title="Checkbox: Useful for multi-select. Provide label and choices. or remove the block"
              placement="top"
              arrow
            >
              <AiOutlineInfoCircle fontSize="medium" />
            </CustomTooltip>
          </div>
        );

      case "dropDown":
        return (
          <div className="flex items-center gap-1 text-md text-gray-700">
            DropDown
            <CustomTooltip
              title="Dropdown: Add question and dropdown choices or remove this. or remove the block"
              placement="top"
              arrow
            >
              <AiOutlineInfoCircle fontSize="medium" />
            </CustomTooltip>
          </div>
        );

      case "chipSelector":
        return (
          <div className="flex items-center gap-1 text-md text-gray-700">
            ChipSelector
            <CustomTooltip
              title="Chip Selector: Show choices in pill form. Add or remove. or remove the block"
              placement="top"
              arrow
            >
              <AiOutlineInfoCircle fontSize="medium" />
            </CustomTooltip>
          </div>
        );

      case "footerbutton":
        return (
          <div className="flex items-center gap-1 text-md text-gray-700">
            FooterButton
            <CustomTooltip
              title="Footer Button: Label your call-to-action clearly."
              placement="top"
              arrow
            >
              <AiOutlineInfoCircle fontSize="medium" />
            </CustomTooltip>
          </div>
        );

      case "embeddedlink":
        return (
          <div className="flex items-center gap-1 text-md text-gray-700">
            EmbeddedLink
            <CustomTooltip
              title="Embedded Link: Add URL and label text."
              placement="top"
              arrow
            >
              <AiOutlineInfoCircle fontSize="medium" />
            </CustomTooltip>
          </div>
        );

      case "optin":
        return (
          <div className="flex items-center gap-1 text-md text-gray-700">
            OptIn
            <CustomTooltip
              title="Opt-in: Label this clearly for consent actions."
              placement="top"
              arrow
            >
              <AiOutlineInfoCircle fontSize="medium" />
            </CustomTooltip>
          </div>
        );

      case "image":
        return (
          <div className="flex items-center gap-1 text-md text-gray-700">
            Image
            <CustomTooltip
              title="Image: Add an image or remove this block."
              placement="top"
              arrow
            >
              <AiOutlineInfoCircle fontSize="medium" />
            </CustomTooltip>
          </div>
        );

      case "document":
        return (
          <div className="flex items-center gap-1 text-md text-gray-700">
            Document
            <CustomTooltip
              title="Document: Upload a file or remove this."
              placement="top"
              arrow
            >
              <AiOutlineInfoCircle fontSize="medium" />
            </CustomTooltip>
          </div>
        );

      case "media":
        return (
          <div className="flex items-center gap-1 text-md text-gray-700">
            Media
            <CustomTooltip
              title="Media: Add audio/video or remove this block."
              placement="top"
              arrow
            >
              <AiOutlineInfoCircle fontSize="medium" />
            </CustomTooltip>
          </div>
        );

      case "imageCarousel":
        return (
          <div className="flex items-center gap-1 text-md text-gray-700">
            ImageCarousel
            <CustomTooltip
              title="Image Carousel: Add multiple images to display."
              placement="top"
              arrow
            >
              <AiOutlineInfoCircle fontSize="medium" />
            </CustomTooltip>
          </div>
        );

      case "ifelse":
        return (
          <div className="flex items-center gap-1 text-md text-gray-700">
            IfElse
            <CustomTooltip
              title="If-Else: Add logic conditions for screen branching."
              placement="top"
              arrow
            >
              <AiOutlineInfoCircle fontSize="medium" />
            </CustomTooltip>
          </div>
        );

      case "switch":
        return (
          <div className="flex items-center gap-1 text-md text-gray-700">
            Switch
            <CustomTooltip
              title="Switch: Toggle logic based on user selection."
              placement="top"
              arrow
            >
              <AiOutlineInfoCircle fontSize="medium" />
            </CustomTooltip>
          </div>
        );

      case "date":
        return (
          <div className="flex items-center gap-1 text-md text-gray-700">
            Date
            <CustomTooltip
              title="Date Picker: single date selection from user - or remove this block"
              placement="top"
              arrow
            >
              <AiOutlineInfoCircle fontSize="medium" />
            </CustomTooltip>
          </div>
        );

      case "calendar":
        return (
          <div className="flex items-center gap-1 text-md text-gray-700">
            Calendar
            <CustomTooltip
              title="Calendar: Embed date-related input or scheduling."
              placement="top"
              arrow
            >
              <AiOutlineInfoCircle fontSize="medium" />
            </CustomTooltip>
          </div>
        );
      // case "userdetail":
      //   return "UserDetail";
      default:
        return "";
    }
  };

  return (
    <div
      ref={drop}
      className="shadow-xl overflow-auto rounded-xl h-[83vh] w-full hide-scrollbar bg-[url(/WB.png)] pt-10"
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
      {tabs[activeIndex]?.payload?.length === 0 && (
        <div className="w-full h-full flex flex-col items-center justify-center text-center text-gray-500 rounded-xl border border-dashed border-gray-300 p-10 bg-white/50">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="flex flex-col items-center border-3 p-5 rounded-2xl border-dashed border-indigo-300 shadow-2xl"
          >
            <DrawOutlinedIcon
              className="animate-bounce text-indigo-500"
              style={{ fontSize: 70 }}
            />
            <h2 className="text-lg font-semibold mb-2 text-indigo-500">
              Start Building Your Flow
            </h2>
            <p className="text-sm text-gray-600 max-w-sm">
              This canvas is empty. Drag and drop components from the left to
              design your personalized WhatsApp experience.
            </p>
          </motion.div>
        </div>
      )}
      <div className="w-1/3 ml-5">
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
