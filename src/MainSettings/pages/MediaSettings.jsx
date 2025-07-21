import React, { useState, useRef } from "react";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Button, IconButton } from "@mui/material";
import CropModal from "../components/CropModal";
import DeleteIcon from "@mui/icons-material/Delete";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const MediaSettings = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [url, setUrl] = useState("");

  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [value, setValue] = useState(0);

  console.log("videos:", videos);
  console.log("files:", files);
  console.log("images:", images);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      // handle file upload logic here if needed
    }
  };

  const handleChooseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const img = [];
    const vid = [];
    const misc = [];

    selectedFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        img.push(file);
      } else if (file.type.startsWith("video/")) {
        vid.push(file);
      } else {
        misc.push(file);
      }
    });

    setImages((prev) => [...prev, ...img]);
    setVideos((prev) => [...prev, ...vid]);
    setFiles((prev) => [...prev, ...misc]);

    e.target.value = null;
  };

  const handlePreview = () => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrls((prev) => [...prev, url]);
    }
  };

  const handleEditImage = (index) => {
    setEditingIndex(index);
    setIsCropModalOpen(true);
  };

  const handleCropSave = async (croppedImageBlob) => {
    console.log("Cropped Image Blob:", croppedImageBlob);
    const url = URL.createObjectURL(croppedImageBlob);
    setPreviewUrls((prev) => [...prev, url]);
    setIsCropModalOpen(false);
  };

  const handleRemoveImage = (index) => {
    const updatedPreviews = [...previewUrls];
    updatedPreviews.splice(index, 1);
    setPreviewUrls(updatedPreviews);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="h-full bg-gray-100 flex p-6">
      <div className="w-full rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-4 gap-0">
        {/* Sidebar Radio Tabs */}
        <div className="p-6 md:border-r flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-gray-700">Upload Mode</h2>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="mode"
              value="upload"
              checked={activeTab === "upload"}
              onChange={() => setActiveTab("upload")}
              className="accent-blue-600"
            />
            <span className="text-gray-800 text-lg">Upload File</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="mode"
              value="url"
              checked={activeTab === "url"}
              onChange={() => setActiveTab("url")}
              className="accent-blue-600"
            />
            <span className="text-gray-800 text-lg">Use Image URL</span>
          </label>

          {/* <UniversalButton
            label="Upload Image"
            id="uploadImage"
            name="uploadImage"
            // onClick={handleUploadFinal}
            className="mt-10"
          /> */}
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3 p-6 overflow-auto">
          <h1 className="text-lg font-medium mb-5">Upload File</h1>
          {activeTab === "upload" && (
            <>
              {/* Drag and Drop */}
              <div
                className={`border-2 border-dashed rounded-lg h-48 flex flex-col items-center justify-center mb-6 transition ${
                  isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  // onChange={handleFileSelect}
                  accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx,.txt,.xlsx"
                />
                <div className="flex items-center gap-4">
                  <UniversalButton
                    label="Choose File"
                    onClick={handleChooseClick}
                  />
                  <FileUploadIcon
                    onClick={handlePreview}
                    style={{
                      color: "#22c55e",
                      fontSize: 30,
                      cursor: "pointer",
                    }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Supported: .jpg, .png, .mp4
                </p>
                {selectedFile && (
                  <p className="text-sm text-blue-600 font-medium mt-1">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>

              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Block list Tabs"
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab
                  label="Images"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    color: "text.secondary",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "#f0f4ff",
                      borderRadius: "8px",
                    },
                  }}
                />
                <Tab
                  label="Videos"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    color: "text.secondary",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "#f0f4ff",
                      borderRadius: "8px",
                    },
                  }}
                />
                <Tab
                  label="Files"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    color: "text.secondary",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "#f0f4ff",
                      borderRadius: "8px",
                    },
                  }}
                />
              </Tabs>

              {/* Previews */}
              {value === 0 && (
                <div className="space-y-4">
                  <h1 className="text-md font-semibold text-gray-800 mt-4">
                    Images
                  </h1>

                  {previewUrls.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                      {previewUrls.map((url, index) => (
                        <div
                          key={index}
                          className="relative group bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-transform duration-200 hover:scale-[1.02]"
                        >
                          {/* Image Display */}
                          <div className="w-full aspect-square flex items-center justify-center bg-gray-50">
                            <img
                              src={url}
                              alt={`Preview ${index}`}
                              className="object-contain w-full h-full"
                            />
                          </div>

                          {/* Edit Icon */}
                          <button
                            onClick={() => handleEditImage(index)}
                            className="absolute bottom-3 right-3 cursor-pointer transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                            aria-label="Edit Image"
                          >
                            <ModeEditIcon
                              fontSize="small"
                              className="text-green-400"
                            />
                          </button>

                          {/* Delete Icon */}
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 cursor-pointer flex items-center justify-center text-gray-500 hover:text-red-600 transition"
                            aria-label="Remove Image"
                          >
                            <DeleteIcon fontSize="small" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {value === 1 && (
                <>
                  <h1 className="text-md font-semibold text-gray-800 mt-4">
                    Videos
                  </h1>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {videos.map((file, index) => (
                      <video
                        key={index}
                        controls
                        className="w-full h-48 object-cover rounded-lg"
                        src={URL.createObjectURL(file)}
                      />
                    ))}
                  </div>
                </>
              )}

              {value === 2 && (
                <>
                  <h1 className="text-md font-semibold text-gray-800 mt-4">
                    Files
                  </h1>
                  <div className="grid grid-cols-1 gap-3">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="bg-white p-3 rounded shadow border"
                      >
                        <span className="text-sm text-gray-700">
                          {file.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Crop Modal */}

              {isCropModalOpen && (
                <CropModal
                  open={isCropModalOpen}
                  image={previewUrls[editingIndex]}
                  onClose={() => setIsCropModalOpen(false)}
                  onSave={handleCropSave}
                />
              )}
            </>
          )}

          {activeTab === "url" && (
            <div className="flex flex-col gap-4">
              <h1 className="text-lg font-medium">Image URL</h1>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter image URL"
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div>
                <UniversalButton
                  label="Upload from URL"
                  id="uploadUrl"
                  name="uploadUrl"
                  // onClick={handleUrlUpload}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaSettings;
