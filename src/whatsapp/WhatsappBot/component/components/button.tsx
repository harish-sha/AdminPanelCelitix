import { Textarea } from "@/components/ui/textarea";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import { set } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AiOutlineEye } from "react-icons/ai";
import { Dialog } from "primereact/dialog";
import CustomTooltip from "@/components/common/CustomTooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import files from "@/assets/animation/Files.json";
import {
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatStrikethroughOutlined,
} from "@mui/icons-material";
import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";
import { Tooltip } from "@mui/material";
import { motion } from "framer-motion";

export const ButtonNodeContent = ({
  id,
  nodesInputData,
  setNodesInputData,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
}) => {
  const [options, setOptions] = useState([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileDialogOpen, setFileDialogOpen] = useState(false);

  const inputRef = useRef(null);

  function handleOptionAdd() {
    if (options.length >= 3) {
      toast.error("You can add a maximum of 3 button.");
      return;
    }
    setOptions((prev) => [...prev, ""]);
  }

  function handleOptionDelete(index: number) {
    if (options.length === 0) return;
    if (options.length === 1) {
      return;
    }

    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  }

  function handleOptionInput(e: any, index: number) {
    if (options.length === 0) return;

    const newOptions = [...options];
    newOptions[index] = e;
    setOptions(newOptions);
  }

  useEffect(() => {
    setOptions(
      nodesInputData[id]?.buttonTexts ? nodesInputData[id]?.buttonTexts : [""]
    );
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        selectedOption: nodesInputData[id]?.selectedOption,
        type: nodesInputData[id]?.type || nodesInputData[id]?.buttonType,
        // fileUrl: nodesInputData[id]?.buttonUrl || nodesInputData[id]?.text,
      },
    }));

    // if (nodesInputData[id]?.fileUrl) return;

    if (nodesInputData[id]?.type !== "text") {
      setNodesInputData((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          fileUrl: nodesInputData[id]?.fileUrl || nodesInputData[id]?.buttonUrl,
          text: "",
        },
      }));
    } else {
      setNodesInputData((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          text: nodesInputData[id]?.text,
          fileUrl: "",
        },
      }));
    }
  }, [id]);

  useEffect(() => {
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        buttonTexts: options,
      },
    }));
  }, [options]);

  const handleFileUpload = async (event: any) => {
    if (!fileRef) return;

    let isError = false;
    let fileSize = null;
    const file = event.target.files[0];
    if (!file) return;

    const size = file?.size / 1024 / 1024;
    if (nodesInputData[id]?.type === "image" && size > 5) {
      isError = true;
      fileSize = 5;
    }

    if (nodesInputData[id]?.type === "video" && size > 16) {
      isError = true;
      fileSize = 16;
    }

    if (isError) {
      toast.error(`File size should be less than ${fileSize}MB`);
      fileRef.current.value = null;
      setNodesInputData((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          fileUrl: "",
        },
      }));
      return;
    }

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        fileUrl: file,
        // text: "d",
        // fileUrl: fileUrl, // 👈 used for preview
        // file, // optional: keep raw file
      },
    }));
  };

  function handleImageView() {
    setFileDialogOpen(true);
  }

  function addFormat(formatType: string) {
    if (!inputRef.current) return;
    const input = nodesInputData[id]?.message || "";
    if (input?.length >= 1024) return;

    const inputEl = inputRef.current;
    const { selectionStart, selectionEnd } = inputEl;
    const selectedText = input?.substring(selectionStart, selectionEnd);
    const data = {
      bold: {
        start: "*",
        end: "*",
      },
      italic: {
        start: "_",
        end: "_",
      },
      strike: {
        start: "~",
        end: "~",
      },
    };
    const { start, end } = data[formatType];
    const newValue =
      input.substring(0, selectionStart) +
      start +
      selectedText.trim() +
      end +
      input.substring(selectionEnd);

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        message: newValue,
      },
    }));

    requestAnimationFrame(() => {
      const pos = selectionEnd + start.length + end.length;
      inputEl.setSelectionRange(pos, pos);
      inputEl.focus();
    });
  }

  function insertEmoji(emoji: string) {
    if (!inputRef.current) return;
    const input = nodesInputData[id]?.message || "";
    if (input?.length >= 1024) return;

    const inputEl = inputRef.current;

    const start = inputEl.selectionStart;
    const end = inputEl.selectionEnd;

    const newText = input.substring(0, start) + emoji + input.substring(end);

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        message: newText,
      },
    }));

    requestAnimationFrame(() => {
      inputEl.setSelectionRange(start + emoji.length, start + emoji.length);
      inputEl.focus();
    });

    //  inputEl.setSelectionRange(start + emoji.length, start + emoji.length);
    //  inputEl.focus();

    // setTimeout(() => {
    //   inputEl.setSelectionRange(start + emoji.length, start + emoji.length);
    //   inputEl.focus();
    // }, 0);
  }

  return (
    <>
      <div className="flex gap-2 items-center">
        <div className="w-1/3">
          <AnimatedDropdown
            id="type"
            name="type"
            label="Type"
            tooltipContent="Select Button Type"
            options={[
              { label: "Text", value: "text" },
              { label: "Image", value: "image" },
              { label: "Video", value: "video" },
              { label: "Document", value: "document" },
            ]}
            value={nodesInputData[id]?.type}
            onChange={(e: any) => {
              setNodesInputData((prev) => ({
                ...prev,
                [id]: {
                  ...prev[id],
                  type: e,
                  fileUrl: "",
                  text: "",
                },
              }));
            }}
          />
        </div>
        {(nodesInputData[id]?.type === "image" ||
          nodesInputData[id]?.type === "document" ||
          nodesInputData[id]?.type === "video") && (
          <>
            <div className="w-1/3">
              <AnimatedDropdown
                id="selectChoice"
                name="selectChoice"
                tooltipContent="Select Choice"
                label="Select Choice"
                options={[
                  { value: "url", label: "Enter Url" },
                  { value: "upload", label: "Upload" },
                ]}
                value={nodesInputData[id]?.selectedOption}
                onChange={(e) => {
                  setNodesInputData(() => ({
                    ...nodesInputData,
                    [id]: {
                      ...nodesInputData[id],
                      selectedOption: e,
                      text: "",
                      fileUrl: "",
                    },
                  }));
                }}
              />
            </div>
            {nodesInputData[id]?.selectedOption === "upload" && (
              <div className="flex items-end gap-2">
                <div className="flex flex-col gap-2 mt-0">
                  <Label
                    htmlFor="uplaodfile"
                    className="text-sm font-medium text-gray-800 font-"
                  >
                    Upload File
                  </Label>
                  <Input
                    type="file"
                    id="uplaodfile"
                    name="uplaodfile"
                    onChange={handleFileUpload}
                    accept={`${nodesInputData[id]?.type}/*`}
                    required
                    ref={fileRef}
                    className="w-[250px]"
                  />
                </div>
                {/* <button onClick={handleImageView} className="cursor-pointer">
                  <AiOutlineEye size={20} className="text-green-700" />
                </button> */}
              </div>
            )}

            {nodesInputData[id]?.selectedOption === "url" && (
              <div className="flex items-end gap-2">
                <InputField
                  id="text"
                  name="text"
                  tooltipContent="Enter URL of media"
                  label={"URL"}
                  placeholder="Enter URL"
                  value={nodesInputData[id]?.text}
                  onChange={(e: { target: { value: any } }) => {
                    setNodesInputData((prev) => ({
                      ...prev,
                      [id]: {
                        ...prev[id],
                        text: e.target.value,
                      },
                    }));
                  }}
                />
                {/* <button onClick={handleImageView} className="cursor-pointer">
                  <AiOutlineEye size={20} className="text-green-700" />
                </button> */}
              </div>
            )}
          </>
        )}
        {nodesInputData[id]?.type === "text" && (
          <div className="flex items-end gap-2 w-full">
            <InputField
              id="text"
              name="text"
              tooltipContent="Max 20 characters"
              label={"Button Header"}
              placeholder="Enter Button Header"
              value={nodesInputData[id]?.text}
              onChange={(e: { target: { value: any } }) => {
                setNodesInputData((prev) => ({
                  ...prev,
                  [id]: {
                    ...prev[id],
                    text: e.target.value,
                  },
                }));
              }}
              maxLength="20"
            />
            <p className="text-xs">
              {nodesInputData[id]?.text?.length || 0}/20
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <div
          className={` flex flex-col justify-between ${
            nodesInputData[id]?.type === "text" ? "w-full" : "w-1/2"
          }`}
        >
          <div>
            <div>
              <label className="text-sm font-medium text-gray-900 mb-2 ml-2">
                Body Text
              </label>
              <Textarea
                id="body"
                placeholder="Body Text"
                value={nodesInputData[id]?.message}
                onChange={(e: { target: { value: any } }) => {
                  setNodesInputData((prev) => ({
                    ...prev,
                    [id]: {
                      ...prev[id],
                      message: e.target.value,
                    },
                  }));
                }}
                className="resize-none h-55 mt-2"
                maxLength={1024}
                ref={inputRef}
              />
              <div className="flex justify-between">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex items-center gap-2 mt-2 bg-white border border-slate-200 rounded-xl px-2 py-2 shadow w-max"
                >
                  <Tooltip title="Bold" arrow>
                    <button
                      onClick={() => addFormat("bold")}
                      className="hover:bg-indigo-100 text-indigo-500 rounded-md p-1 transition cursor-pointer"
                    >
                      <FormatBoldOutlined fontSize="small" />
                    </button>
                  </Tooltip>
                  <Tooltip title="Italic" arrow>
                    <button
                      onClick={() => addFormat("italic")}
                      className="hover:bg-indigo-100 text-indigo-500 rounded-md p-1 transition cursor-pointer"
                    >
                      <FormatItalicOutlined fontSize="small" />
                    </button>
                  </Tooltip>
                  <Tooltip title="Strikethrough" arrow>
                    <button
                      onClick={() => addFormat("strike")}
                      className="hover:bg-indigo-100 text-indigo-500 rounded-md p-1 transition cursor-pointer"
                    >
                      <FormatStrikethroughOutlined fontSize="small" />
                    </button>
                  </Tooltip>
                  <div className="w-px h-5 bg-slate-300 mx-1"></div>
                  <Tooltip title="Emoji Picker" arrow>
                    <CustomEmojiPicker position="top" onSelect={insertEmoji} />
                  </Tooltip>
                </motion.div>
                <p className="text-xs mt-2">
                  {nodesInputData[id]?.message?.length || 0}/1024
                </p>
              </div>
            </div>
          </div>

          <div className="mt-2">
            <InputField
              id="text"
              name="text"
              tooltipContent="Enter Footer Text for Button Node. Max 60 characters"
              label={"Button Footer"}
              placeholder="Enter Button Footer"
              value={nodesInputData[id]?.buttonFooter}
              onChange={(e: { target: { value: any } }) => {
                setNodesInputData((prev) => ({
                  ...prev,
                  [id]: {
                    ...prev[id],
                    buttonFooter: e.target.value,
                  },
                }));
              }}
              maxLength="60"
            />
            <p className="text-xs mt-2">
              {nodesInputData[id]?.buttonFooter?.length || 0}/60
            </p>
          </div>
        </div>

        <div
          className={`flex justify-center items-center h-60 rounded-lg p-2 md:mt-5 ${
            nodesInputData[id]?.type === "text" ? "w-0" : "w-1/2"
          }`}
        >
          {!nodesInputData[id]?.type && (
            <div className="w-full h-full flex items-center justify-center border border-gray-300 rounded-lg">
              <Lottie
                animationData={files}
                loop
                autoplay
                className="w-24 h-24"
              />
            </div>
          )}
          {nodesInputData[id]?.type === "video" && (
            <video
              src={
                nodesInputData[id].fileUrl
                  ? /^(http|https):/.test(nodesInputData[id].fileUrl)
                    ? nodesInputData[id].fileUrl
                    : URL.createObjectURL(nodesInputData[id].fileUrl)
                  : null
              }
              controls
              className="h-full w-full object-cover border border-gray-300 rounded-lg"
            />
          )}
          {nodesInputData[id]?.type === "image" && (
            <img
              src={
                nodesInputData[id].fileUrl
                  ? /^(http|https):/.test(nodesInputData[id].fileUrl)
                    ? nodesInputData[id].fileUrl
                    : URL.createObjectURL(nodesInputData[id].fileUrl)
                  : null
              }
              alt={nodesInputData[id]?.fileUrl}
              className="h-full w-full object-cover border border-gray-300 rounded-lg"
            />
          )}
          {nodesInputData[id]?.type === "document" && (
            <iframe
              src={
                nodesInputData[id].fileUrl
                  ? /^(http|https):/.test(nodesInputData[id].fileUrl)
                    ? nodesInputData[id].fileUrl
                    : URL.createObjectURL(nodesInputData[id].fileUrl)
                  : null
              }
              className="h-full w-full object-cover border border-gray-300 rounded-lg"
            />
          )}
        </div>
      </div>

      <div className="w-full">
        {/* <div className="flex justify-end">
          <button onClick={handleOptionAdd}>
            <AddIcon />
          </button>
        </div> */}
        <div className="flex items-center gap-2 mb-2">
          {/* <h1 className="text-lg font-semibold mb-2">Button Label</h1> */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleOptionAdd}
              className="flex items-center gap-2 px-2 py-1 rounded-full bg-black text-white text-xs font-medium shadow-md"
            >
              <AddIcon fontSize="small" />
              Add Button
            </button>
          </div>
          <CustomTooltip
            title={
              "Button label text. Must be unique if using multiple buttons. Max 20 characters"
            }
            placement={"top"}
            arrow
          >
            <span>
              <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
            </span>
          </CustomTooltip>
        </div>

        <div className="space-y-2">
          {options?.map((option, index) => (
            <div
              className="flex gap-2 justify-center items-start w-full"
              key={index}
            >
              <div className="w-full">
                <InputField
                  id="buttonText"
                  name="buttonText"
                  label={`Button-Label-${index + 1}`}
                  value={options[index]}
                  onChange={(e: { target: { value: any } }) => {
                    handleOptionInput(e.target.value, index);
                  }}
                  placeholder="Enter Button Text"
                  maxLength="20"
                />
                <p className="text-xs mt-2">{option?.length || 0}/20</p>
              </div>
              {options.length > 1 && (
                <span
                  id="deleteInput"
                  // name="deleteInput"
                  // variant="destructive"
                  onClick={() => handleOptionDelete(index)}
                  className="mt-7 text-red-700 cursor-pointer hover:text-red-700 transition-colors duration-200"
                >
                  <MdOutlineDeleteForever fontSize={24} />
                </span>
              )}
              {/* <button
                className="mt-6"
                onClick={() => {
                  handleOptionDelete(index);
                }}
              >
                <MdOutlineDeleteForever
                  className="text-red-500 cursor-pointer hover:text-red-600"
                  size={20}
                />
              </button> */}
            </div>
          ))}
        </div>
      </div>

      {/* <Dialog
        visible={fileDialogOpen}
        onHide={() => {
          setFileDialogOpen(false);
        }}
        draggable={false}
        resizable={false}
      >
        {nodesInputData[id]?.type === "image" && (
          <img
            src={nodesInputData[id]?.text || nodesInputData[id]?.buttonUrl}
            alt={nodesInputData[id]?.text || nodesInputData[id]?.buttonUrl}
            className="h-80 w-100"
          />
        )}
        {nodesInputData[id]?.type === "video" && (
          <video
            src={nodesInputData[id]?.text || nodesInputData[id]?.buttonUrl}
            className="h-80 w-100"
          />
        )}
        {nodesInputData[id]?.type === "document" && (
          <iframe
            src={nodesInputData[id]?.text || nodesInputData[id]?.buttonUrl}
            className="h-80 w-100"
          />
        )}
      </Dialog> */}
    </>
  );
};
