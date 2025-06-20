import { useEffect, useRef, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdOutlineDeleteForever } from "react-icons/md";
import toast, { LoaderIcon } from "react-hot-toast";
import axios from "axios";

import CustomTooltip from "../../components/CustomTooltip";
import { AiOutlineRobot } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
// import VariableDropdown from '../common/VariableDropdown';
import CustomEmojiPicker from "../../components/CustomEmojiPicker";
import metaAiAnimation from "../../../assets/animation/metaai.json";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SyncIcon from "@mui/icons-material/Sync";
import LoopIcon from "@mui/icons-material/Loop";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import VariableManager from "../components/VariableManager";
import { Button, IconButton } from "@mui/material";
import { GenerateAiContent } from "@/components/common/CustomContentGenerate";

const TemplateTypes = ({
  selectedTemplateType,
  templateHeader,
  setTemplateHeader,
  templateFormat,
  setTemplateFormat,
  templateFooter,
  setTemplateFooter,
  handleAddVariable,
  handleEmojiSelect,
  imageUrl,
  setImageUrl,
  videoUrl,
  setVideoUrl,
  documentUrl,
  setDocumentUrl,
  locationUrl,
  setLocationUrl,
  file,
  setFile,
  onPreviewUpdate,
  setvariables,
  uploadImageFile,
  setFileUploadUrl,
}) => {
  const [lastUploadedFileName, setLastUploadedFileName] = useState("");
  const fileInputRef = useRef(null);
  const textAreaRef = useRef(null);

  const updateVariables = (updatedVariables) => {
    setvariables(updatedVariables);
    const previewFormat = templateFormat.replace(/{#(.*?)#}/g, (match, id) => {
      const variable = updatedVariables.find((v) => v.id === id);
      return variable ? `[${variable.value || id}]` : match;
    });
    onPreviewUpdate(previewFormat);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(true);
  const [hasInserted, setHasInserted] = useState(false);
  const [typingKey, setTypingKey] = useState(0);
  const [generationCount, setGenerationCount] = useState(0);

  const [ai, setAi] = useState({
    isGenerating: false,
    text: "",
    response: "",
    typing: false,
  });


  const TypingText = ({ text, onDone }) => {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayed((prev) => prev + text[index]);
        index++;
        if (index >= text.length) {
          clearInterval(interval);
          onDone?.();
        }
      }, 20);
      return () => clearInterval(interval);
    }, [text]);

    return (
      <pre className="whitespace-pre-wrap text-sm text-gray-800">
        {displayed}
      </pre>
    );
  };

  const closePanel = () => {
    setIsOpen(false);
    setAiPrompt("");
    setAiSuggestion("");
    setIsTypingDone(true);
    setIsGenerating(false);
    setHasInserted(false);
    setTypingKey(0);
    setGenerationCount(0);
  };

  const handleGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    setAiSuggestion("");
    setIsTypingDone(false);
    setHasInserted(false);
    setGenerationCount((prev) => prev + 1);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: aiPrompt },
          ],
          max_tokens: 1024,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_OPENAI_API_KEY
              }`,
          },
        }
      );

      const text = response.data.choices?.[0]?.message?.content || "";

      const totalLength = templateFormat.length + text.length;
      const finalText =
        totalLength > 1024 ? text.slice(0, 1024 - templateFormat.length) : text;

      setAiSuggestion(finalText);
      setTypingKey((prev) => prev + 1);
    } catch (err) {
      console.error(
        "Error generating content:",
        err.response?.data || err.message
      );
      toast.error(
        "Failed to generate AI response. Please check your API key and usage."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  //   const handleAddVariable = (setState, variable) => {
  //     setState((prev) => `${prev} {${variable}}`);
  //   };

  const handleFileUpload = async () => {
    try {
      const res = await uploadImageFile(file, 1);
      // console.log(res?.handlerid);
      setFileUploadUrl(res?.handlerid);
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <div className="w-full">
      {selectedTemplateType === "text" && (
        <div className="w-full mb-4">
          <div className="flex items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              Template Header(Optional)
            </label>
            <CustomTooltip
              title="Enter the template header"
              placement="right"
              arrow
            >
              <span className="ml-2">
                <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
              </span>
            </CustomTooltip>
          </div>
          <div className="relative">
            <input
              id="template-header-textarea"
              name="template-header-textarea"
              className="w-full p-2 break-words bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
              value={templateHeader}
              // onChange={(e) => setTemplateHeader(e.target.value)}
              onChange={(e) => {
                const value = e.target.value;
                const isValid = /^[a-zA-Z0-9\s]*$/.test(value);
                if (isValid) {
                  setTemplateHeader(value);
                }
              }}
              maxLength={60}
              placeholder="Enter template header"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {templateHeader.length}/60
          </p>
        </div>
      )}

      {selectedTemplateType === "image" && (
        <div className="w-full mb-4">
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <CustomTooltip
              title="Only jpg, jpeg, and png files are allowed (5 MB max)"
              placement="right"
              arrow
            >
              <span className="ml-2">
                <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
              </span>
            </CustomTooltip>
          </div>

          {/* File Selection */}
          <div className="flex items-center gap-4 mt-2">
            <label
              htmlFor="createTemplateImageUpload"
              className="bg-[#212529] hover:bg-[#434851] text-white px-4 py-2 rounded-md cursor-pointer  text-sm"
            >
              Select Image
            </label>
            <input
              type="file"
              id="createTemplateImageUpload"
              name="createTemplateImageUpload"
              accept="image/jpeg, image/png"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                if (selectedFile) {
                  setFile(selectedFile);
                }
              }}
            />

            {/* Upload Button */}
            {file && (
              <button
                className="px-4 py-2 text-sm text-white bg-green-500 rounded-md hover:bg-green-600"
                onClick={() => {
                  handleFileUpload();
                  if (file.size <= 5 * 1024 * 1024) {
                    setImageUrl(file);
                    setLastUploadedFileName(file.name);
                    toast.success("Image uploaded successfully!");
                  } else {
                    toast.error("File size exceeds 5 MB limit!");
                  }
                }}
              >
                Upload
              </button>
            )}

            {/* Delete Icon */}
            {file && (
              <div className="mb-1">
                <MdOutlineDeleteForever
                  className="text-red-500 cursor-pointer hover:text-red-700"
                  size={23}
                  onClick={() => {
                    setFile(null);
                    setFileUploadUrl("");
                    setImageUrl(null);
                    fileInputRef.current.value = "";
                    toast.success("Image removed successfully!");
                  }}
                />
              </div>
            )}
          </div>

          {/* File Name */}
          {file && (
            <span className="block mt-2 text-sm text-gray-600">
              {file.name}
            </span>
          )}
        </div>
      )}

      {selectedTemplateType === "video" && (
        <div className="w-full mb-4">
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700">
              Upload Video
            </label>
            <CustomTooltip
              title="Only mp4 and avi files are allowed (16 MB max)"
              placement="right"
              arrow
            >
              <span className="ml-2">
                <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
              </span>
            </CustomTooltip>
          </div>

          {/* File Selection */}
          <div className="flex items-center gap-4 mt-2">
            <label
              htmlFor="createTemplateVideoUpload"
              className="bg-[#212529] hover:bg-[#434851] text-white px-4 py-2 rounded-md cursor-pointer text-sm"
            >
              Select Video
            </label>
            <input
              type="file"
              id="createTemplateVideoUpload"
              name="createTemplateVideoUpload"
              accept="video/mp4, video/avi"
              className="hidden"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                if (selectedFile) {
                  setFile(selectedFile);
                }
              }}
              ref={fileInputRef}
            />

            {/* Upload Button */}
            {file && (
              <button
                className="px-4 py-2 text-sm text-white bg-green-500 rounded-md hover:bg-green-600"
                onClick={() => {
                  handleFileUpload();
                  if (file.size <= 16 * 1024 * 1024) {
                    setVideoUrl(file);
                    setLastUploadedFileName(file.name);
                    toast.success("Video uploaded successfully!");
                  } else {
                    toast.error("File size exceeds 16 MB limit!");
                  }
                }}
              >
                Upload
              </button>
            )}

            {/* Delete Icon */}
            {file && (
              <MdOutlineDeleteForever
                className="text-red-500 cursor-pointer hover:text-red-700"
                size={20}
                onClick={() => {
                  setFileUploadUrl("");
                  setFile(null);
                  setVideoUrl(null);
                  fileInputRef.current.value = "";
                  document.getElementById("videoUpload").value = "";
                  toast.success("Video removed successfully!");
                }}
              />
            )}
          </div>

          {/* File Name */}
          {file && (
            <span className="block mt-2 text-sm text-gray-600">
              {file.name}
            </span>
          )}
        </div>
      )}

      {selectedTemplateType === "document" && (
        <div className="w-full mb-4">
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700">
              Upload Document
            </label>
            <CustomTooltip
              title="Only pdf, xls, xlsx, ppt, and doc files are allowed (100 MB max)"
              placement="right"
              arrow
            >
              <span className="ml-2">
                <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
              </span>
            </CustomTooltip>
          </div>

          {/* File Selection */}
          <div className="flex items-center gap-4 mt-2">
            <label
              htmlFor="createTemplateDocumentUpload"
              className="bg-[#212529] hover:bg-[#434851] text-white px-4 py-2 rounded-md cursor-pointer  text-sm"
            >
              Select Document
            </label>
            <input
              type="file"
              id="createTemplateDocumentUpload"
              name="createTemplateDocumentUpload"
              accept="application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/msword"
              className="hidden"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                if (selectedFile) {
                  setFile(selectedFile);
                }
              }}
              ref={fileInputRef}
            />

            {/* Upload Button */}
            {file && (
              <button
                className="px-4 py-2 text-sm text-white bg-green-500 rounded-md hover:bg-green-600"
                onClick={() => {
                  handleFileUpload();
                  if (file.size <= 100 * 1024 * 1024) {
                    setDocumentUrl(URL.createObjectURL(file));
                    setLastUploadedFileName(file.name);
                    toast.success("Document uploaded successfully!");
                  } else {
                    toast.error("File size exceeds 100 MB limit!");
                  }
                }}
              >
                Upload
              </button>
            )}

            {/* Delete Icon */}
            {file && (
              <MdOutlineDeleteForever
                className="text-red-500 cursor-pointer hover:text-red-700"
                size={23}
                onClick={() => {
                  setFileUploadUrl("");
                  setFile(null);
                  setDocumentUrl(null);
                  fileInputRef.current.value = "";
                  document.getElementById("documentUpload").value = "";
                  toast.success("Document removed successfully!");
                }}
              />
            )}
          </div>

          {/* File Name */}
          {file && (
            <span className="block mt-2 text-sm text-gray-600">
              {file.name}
            </span>
          )}
        </div>
      )}

      {selectedTemplateType === "location" && (
        <div className="w-full mb-2">
          <div className="flex items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              Location URL
            </label>
            <CustomTooltip
              title="Enter the location URL"
              placement="right"
              arrow
            >
              <span className="ml-2">
                <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
              </span>
            </CustomTooltip>
          </div>
          <input
            id="location-url"
            name="location-url"
            type="text"
            className="w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
            value={locationUrl}
            onChange={(e) => setLocationUrl(e.target.value)}
            placeholder="Enter location URL"
          />
        </div>
      )}

      <div className="w-full mb-4">
        <div className="flex items-center mb-2">
          <label className="text-sm font-medium text-gray-700">
            Template Format
          </label>
          <CustomTooltip
            title="Specify sample values for your parameters. {{1}}:Roy,{{2}}:john"
            placement="right"
            arrow
          >
            <span className="ml-2">
              <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
            </span>
          </CustomTooltip>
        </div>

        <div className="relative">
          <textarea
            id="createTemplateFormatTextarea"
            name="createTemplateFormatTextarea"
            className="w-full h-40 p-2 pr-10 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
            value={templateFormat}
            onChange={(e) => setTemplateFormat(e.target.value)}
            maxLength={1024}
            placeholder="Enter template format"
            ref={textAreaRef}
          />
          <div className="absolute top-0 right-0 flex mt-2 mr-2 space-x-2">
            <CustomEmojiPicker
              onSelect={(emoji) =>
                handleEmojiSelect(
                  setTemplateFormat,
                  emoji,
                  1024,
                  "templateFormat"
                )
              }
              position="right"
            />
          </div>

          {/* <CustomTooltip title="Generate With AI" arrow placement="top">
            <button
              onClick={() => setIsOpen(true)}
              className="absolute right-3 bottom-3 w-8 h-8 rounded-full flex items-center justify-center z-0 cursor-pointer"
            >
              <Lottie
                animationData={metaAiAnimation}
                loop
                autoplay
                style={{ width: "48px", height: "48px" }}
              />
            </button>
          </CustomTooltip> */}
          <GenerateAiContent
            ai={ai}
            setAi={setAi}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            right={1}
            bottom={1}
            setMessageContent={setTemplateFormat}
            messageContent={templateFormat}
            length={2500}
          />
        </div>

        {/* <div className="text-sm text-gray-500 mt-1">
          {templateFormat.length}/1024 characters
        </div> */}

        <div className="relative">
          <VariableManager
            templateFormat={templateFormat}
            setTemplateFormat={setTemplateFormat}
            onUpdateVariables={updateVariables}
            ref={textAreaRef}
          />

        </div>

        {/* <div className="w-full mb-4 relative">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="absolute top-full left-0 w-full mt-4 p-4 bg-white border rounded-xl shadow-lg z-50 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <p className=" text-violet-700 font-medium">
                    Ask AI to Generate Template <AutoAwesomeIcon />
                  </p>
                  <IconButton
                    onClick={closePanel}
                    sx={{ padding: "3px", fontSize: "18px" }}
                  >
                    <AiOutlineClose className="text-gray-500 hover:text-red-500 cursor-pointer" />
                  </IconButton>
                </div>

                <div className="flex items-center justify-center relative">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md text-sm pr-11"
                    placeholder="e.g. Generate a welcome message for a food bot"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                  />

                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className=" cursor-pointer absolute right-0 text-white px-4 py-2 rounded-md transition disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <LoopIcon className="animate-spin text-indigo-800" />
                    ) : (
                      <AutoFixHighOutlinedIcon className=" text-indigo-800" />
                    )}
                  </button>
                </div>

                <div className="min-h-[60px] bg-gray-100 p-3 rounded-md border">
                  {isGenerating ? (
                    <div className="flex flex-col gap-2">
                      <div className="animate-pulse h-4 w-full bg-gray-300 rounded" />
                      <div className="animate-pulse h-4 w-full bg-gray-300 rounded" />
                      <div className="animate-pulse h-4 w-full bg-gray-300 rounded" />
                      <div className="animate-pulse h-4 w-full bg-gray-300 rounded" />
                    </div>
                  ) : aiSuggestion && !hasInserted ? (
                    <TypingText
                      key={typingKey}
                      text={aiSuggestion}
                      onDone={() => setIsTypingDone(true)}
                    />
                  ) : aiSuggestion ? (
                    <pre className="whitespace-pre-wrap text-sm text-gray-800">
                      {aiSuggestion}
                    </pre>
                  ) : (
                    <p className="text-sm text-gray-400">
                      AI response will appear here.
                    </p>
                  )}
                </div>

                {isTypingDone && aiSuggestion && !hasInserted && (
                  <div className="flex items-center justify-center ">
                    <button
                      className="text-sm text-indigo-600 hover:underline cursor-pointer"
                      onClick={() => {
                        setTemplateFormat((prev) =>
                          (prev + aiSuggestion).slice(0, 1024)
                        );
                        setHasInserted(true);
                      }}
                    >
                      <FileUploadOutlinedIcon /> Insert into Template Format
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div> */}
      </div>

      <div className="w-full mb-4">
        <div className="flex items-center mb-2">
          <label className="text-sm font-medium text-gray-700">
            Template Footer (Optional)
          </label>
          <CustomTooltip
            title="Enter the template footer"
            placement="right"
            arrow
          >
            <span className="ml-2">
              <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
            </span>
          </CustomTooltip>
        </div>
        <div className="relative">
          <textarea
            id="createTemplateFooterTextarea"
            name="createTemplateFooterTextarea"
            className="w-full p-2 pr-8 bg-white border border-gray-300 rounded-md shadow-sm h-14 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
            value={templateFooter}
            onChange={(e) => setTemplateFooter(e.target.value)}
            maxLength={60}
            placeholder="Enter template footer"
          />
          <div className="absolute top-0 right-0 flex mt-2 mr-2 space-x-2">
            {/* <VariableDropdown
              onSelect={(variable) =>
                handleAddVariable(setTemplateFooter, variable)
              }
            /> */}
            <CustomEmojiPicker
              onSelect={(emoji) =>
                handleEmojiSelect(
                  setTemplateFooter,
                  emoji,
                  60,
                  "templateFooter"
                )
              }
              position="right"
            />
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-500">{templateFooter.length}/60</p>
      </div>
    </div>
  );
};

export default TemplateTypes;
