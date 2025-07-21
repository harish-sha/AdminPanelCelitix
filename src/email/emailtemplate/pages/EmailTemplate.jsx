import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaSave } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { Dialog } from "primereact/dialog";
import InputField from "@/whatsapp/components/InputField";
import UniversalButton from "@/components/common/UniversalButton";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { addEmailTemplate } from "@/apis/email/Email";
import { Editor } from "primereact/editor";
import toast from "react-hot-toast";
import Preview from "../components/Preview";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { uploadImageFile } from "@/apis/whatsapp/whatsapp.js";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import "primereact/resources/primereact.min.css";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const DEFAULT_VARIABLES = ["username", "email", "otp", "link"];

const EmailTemplate = () => {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    category: "Transactional",
    body: "",
    variables: [],
    tags: "",
    isActive: true,
  });

  const [text, setText] = useState("");
  console.log("text", text);
  const [previewMode, setPreviewMode] = useState(false);
  const [variableInput, setVariableInput] = useState("");
  const [userVariables, setUserVariables] = useState([]);
  const [selectedVariable, setSelectedVariable] = useState("");
  const [isVariableVisible, setIsVariableVisible] = useState(false);
  const [isRefresh, setIsRefresh] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [customVariables, setCustomVariables] = useState([]);
  const MAX_LENGTH = 2000;
  const textAreaRef = useRef(null);
  const textBoxRef = useRef(null);
  const [customVariable, setCustomVariable] = useState("");
  const [getCustomVariable, setGetCustomVariable] = useState("");

  // const [selectedFile, setSelectedFile] = useState(null);

  const isLimitExceeded = useCallback(
    () => messageContent.length >= MAX_LENGTH,
    [messageContent]
  );

  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("userVars") || "[]");
    setCustomVariables(stored);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleVariableAdd = (variable) => {
    if (!form.variables.includes(variable)) {
      setForm((prev) => ({
        ...prev,
        variables: [...prev.variables, variable],
      }));
    }
  };

  const handleVariableRemove = (variable) => {
    setForm((prev) => ({
      ...prev,
      variables: prev.variables.filter((v) => v !== variable),
    }));
  };

  const insertAtCursor = (variable) => {
    const tag = `{#${variable}#}`;
    const addedtag = `#${variable}#`;

    setText((prev) => {
      const cleanedPrev = prev.replace(/\n/g, " ").trim();
      console.log("cleanedPrev", cleanedPrev);
      return cleanedPrev + " " + addedtag;
    });

    const input = textAreaRef.current;

    if (!input || form.body.length + tag.length > MAX_LENGTH) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;

    const newBody = form.body.slice(0, start) + tag + form.body.slice(end);
    setForm((prev) => ({ ...prev, body: newBody }));

    if (!form.variables.includes(variable)) {
      setForm((prev) => ({
        ...prev,
        variables: [...prev.variables, variable],
      }));
    }
  };

  const addCustomVariable = () => {
    if (!customVariable.trim()) return;
    const updated = [...customVariables, customVariable.trim()];
    setCustomVariables(updated);
    sessionStorage.setItem("userVars", JSON.stringify(updated));
    setCustomVariable("");
  };

  const categoryOptions = [
    { id: "Transactional", label: "Transactional" },
    { id: "Authentication", label: "Authentication" },
  ];

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Custom Header (no cancel button)
  const customHeaderTemplate = (options) => {
    const { className, chooseButton, uploadButton } = options;
    return (
      <div className={className + " flex justify-start items-center "}>
        <div className="">
          {chooseButton}
          {uploadButton}
        </div>
      </div>
    );
  };

  // Custom Item Preview (no delete icon)
  const customItemTemplate = (file, props) => {
    const isImage = file.type.startsWith("image/");

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "1rem",
          border: "1px solid var(--surface-border)",
          borderRadius: "6px",
          backgroundColor: "var(--surface-50)",
          marginTop: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {isImage ? (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{
                width: "48px",
                height: "48px",
                objectFit: "cover",
                borderRadius: "4px",
                border: "1px solid var(--surface-border)",
              }}
            />
          ) : (
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#fef2f2",
                borderRadius: "4px",
                border: "1px solid var(--surface-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <i className="pi pi-file-pdf" style={{ color: '#dc2626', fontSize: '1.5rem' }}></i> */}
              <PictureAsPdfIcon sx={{ fontSize: 20, color: "skyblue" }} />
            </div>
          )}
          <div>
            <div
              style={{
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "var(--text-color)",
                maxWidth: "200px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {file.name}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--text-color-secondary)",
              }}
            >
              {(file.size / 1024).toFixed(1)} KB
            </div>
          </div>
        </div>
        {/* Custom Delete Button inside preview card */}
        <button
          onClick={handleDelete}
          style={{
            padding: "0.5rem 0.75rem",
            backgroundColor: "#dc2626",
            color: "white",
            fontSize: "0.75rem",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#b91c1c")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc2626")}
        >
          <i className="pi pi-trash" style={{ fontSize: "0.75rem" }}></i>
          Delete
        </button>
      </div>
    );
  };

  // Upload handler
  // const handleFileChange = async ({ files }) => {
  //   const file = files?.[0];
  //   if (file) {
  //     setSelectedFile(file);
  //     console.log("File selected:", file.name);
  //     try {
  //       const response = await uploadImageFile(file);
  //       console.log("Upload successful:", response);
  //     } catch (err) {
  //       console.error("Upload failed:", err);
  //     }
  //   }
  // };

  const handleFileChange = async ({ files }) => {
    const file = files?.[0];
    if (file) {
      setSelectedFile(file); // still useful for preview

      try {
        const response = await uploadImageFile(file); // your API call

        console.log("Upload successful:", response);

        // ✅ Save the uploaded file's info (especially fileUrl)
        if (response?.fileUrl) {
          setUploadedFile({
            name: response.fileName,
            url: response.fileUrl,
            type: file.type || response.fileType,
          });
        }
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
  };



  // Delete Handler
  const handleDelete = () => {
    setSelectedFile(null);
    fileInputRef.current?.clear();
  };

  const handleSave = async () => {
    if (!form.name) {
      toast.error("Template name cannot be empty");
      return;
    }
    if (!text || text.trim().length === 0) {
      toast.error("Email content cannot be empty");
      return;
    }

    const matches = text.match(/#(.*?)#/g);
    const count = matches ? matches.length : 0;

    const payload = {
      templateName: form.name || "New Email Template",
      emailContent: text,
      // attachmentId: uploadedFile?.url,
      attachmentId: 10,

      variableCount: count,
    };

    const response = await addEmailTemplate(payload);

    if (response?.success === true) {
      toast.success(response.message);
    } else {
      toast.error(response?.message || "Failed to add email template");
    }

    console.log("payload:", payload);
  };

  return (
    <>
      <div className="w-full flex flex-wrap lg:flex-nowrap gap-4 overflow-scroll h-auto">
        <div className="w-full p-3 border rounded-2xl bg-gray-50 space-y-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm"
                placeholder="e.g. OTP Email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm"
                placeholder="e.g. Your login code is..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CC
              </label>
              <input
                type="text"
                name="CC"
                value={form.CC}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm"
                placeholder="e.g. Your cc email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                BCC
              </label>
              <input
                type="text"
                name="BCC"
                value={form.BCC}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm"
                placeholder="e.g. Your bcc email"
              />
            </div>
            {/* 
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <div className="flex flex-wrap xl:flex-nowrap space-x-2 space-y-2 xl:space-y-0">
                {categoryOptions.map((option) => (
                  <motion.label
                    key={option.id}
                    className={`relative flex items-center cursor-pointer select-none p-0.5 rounded-xl transition-all duration-300
                  ${form.category === option.id
                        ? "shadow-md border-2 border-green-800 bg-white"
                        : "bg-white border border-gray-300 hover:shadow-sm"
                      }
                `}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={option.id}
                      checked={form.category === option.id}
                      onChange={handleChange}
                      className="w-4 h-4 opacity-0 absolute cursor-pointer"
                      style={{ zIndex: 10 }}
                    />
                    <div className="relative w-7 h-7 flex items-center justify-center">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${form.category === option.id
                          ? "border-[#578FCA] bg-white shadow-inner"
                          : "border-gray-300 bg-white"
                          }`}
                      >
                        <AnimatePresence>
                          {form.category === option.id && (
                            <motion.div
                              layoutId="active-ball"
                              className="w-3 h-3 rounded-full shadow-md"
                              style={{
                                background: "#3674B5",
                              }}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <motion.span
                      layout
                      className={`text-sm font-medium transition-colors ${form.category === option.id
                        ? "text-green-700"
                        : "text-gray-800"
                        }`}
                    >
                      {option.label}
                    </motion.span>
                  </motion.label>
                ))}
              </div>
            </div> */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags (optional)
              </label>
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm"
                placeholder="e.g. login, security"
              />
            </div>
          </motion.div>

          <div className="card w-full mt-3">
            <p className="block text-sm font-medium text-gray-700 mb-1" >Add Attachment</p>
            <FileUpload
              ref={fileInputRef}
              name="demo[]"
              customUpload
              uploadHandler={handleFileChange}
              multiple={false}
              accept="image/*,application/pdf"
              maxFileSize={1000000}
              headerTemplate={customHeaderTemplate}
              itemTemplate={selectedFile ? customItemTemplate : null}
              chooseOptions={{ className: "p-button-sm" }}
              uploadOptions={{ className: "p-button-sm" }}
              emptyTemplate={
                <p className="m-0">Drag and drop files to here to upload.</p>
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Body
            </label>
            {/* <textarea
              ref={textAreaRef}
              name="body"
              value={form.body}
              onChange={handleChange}
              rows={8}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Write your HTML or plain text email body here..."
              maxLength="2000"
            />
            <p className="text-sm text-gray-500 mt-1">{form.body.length} / {MAX_LENGTH} characters</p> */}
          </div>
          <div className="rounded-xl  ">
            <Editor
              value={text}
              onTextChange={(e) => {
                // uncomment this to remove HTML tags
                // const plainText = e.htmlValue?.replace(/<[^>]+>/g, "")?.trim(); // remove HTML tags
                // setText(plainText);
                setText(e.htmlValue);
              }}
              style={{
                height: "320px",
                maxWidth: "800px",
                borderBottomRightRadius: "15px",
                borderBottomLeftRadius: "15px",
              }}
            // maxLength={2000}
            />
          </div>
          {/* <p className="text-sm text-gray-500 mt-1">
            {text.length} / {MAX_LENGTH} characters
          </p> */}

          <p className="text-sm text-gray-500 mt-2">
            {text?.replace(/<[^>]+>/g, "").length || 0} / 2000 characters
          </p>

          <div className="space-y-2 relative">
            <div className="flex items-center justify-between">
              <p className="font-medium text-gray-700 text-sm">
                Insert Variables
              </p>
              <button
                onClick={() => setIsVariableVisible(true)}
                disabled={isLimitExceeded()}
                className="font-medium text-gray-700 text-sm hover:underline cursor-pointer"
              >
                + Add Variables
              </button>
            </div>
            {isVariableVisible && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="absolute bottom-2 -right-70 bg-white border rounded-lg shadow-lg p-4 w-64">
                  <button
                    onClick={() => setIsVariableVisible(false)}
                    className="text-xs text-gray-500 mt-1 absolute right-1 top-0"
                  >
                    <CloseOutlinedIcon sx={{ fontSize: 20 }} />
                  </button>
                  <div className="flex flex-col gap-3">
                    <InputField
                      label="Add New Variable"
                      value={customVariable}
                      onChange={(e) => setCustomVariable(e.target.value)}
                      placeholder="e.g. couponCode"
                    />
                    <UniversalButton
                      label="Add Variable"
                      onClick={addCustomVariable}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex flex-wrap gap-2">
              {[...DEFAULT_VARIABLES, ...customVariables].map((v) => (
                <button
                  key={v}
                  onClick={() => insertAtCursor(v)}
                  className="px-3 py-1 text-sm bg-[#578FCA] text-white rounded-full hover:scale-105 transition"
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={handleSave}
              className="bg-[#578FCA] text-white px-5 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-[#3674B5] transition cursor-pointer hover:scale-108 text-sm tracking-wider hover:shadow-xl"
            >
              <FaSave /> Save Template
            </button>
          </div>
        </div>

        <div className="w-full p-3 border rounded-2xl bg-gray-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 rounded-md shadow-sm h-full flex flex-col gap-3 "
          >
            <h3 className="text-lg text-center font-semibold text-gray-800 mb-2">
              Preview
            </h3>
            <Preview
              body={text}
              senderName="Celitix"
              recipients="Recipient Name"
              uploadedFile={selectedFile}
            // dangerouslySetInnerHTML={{ __html: text }}
            />
          </motion.div>
        </div>
        {/* Floating Input Box */}
      </div>

      {/* <Dialog
        header="Add Custom Variable"
        visible={isVariableVisible}
        className="w-[20rem] md:-[25rem] lg:w-[30rem]"
        onHide={() => {
          setIsVariableVisible(false);
        }}
        draggable={false}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center gap-2">
            <InputField
              label="Add New Variable"
              value={customVariable}
              onChange={(e) => setCustomVariable(e.target.value)}
              placeholder="e.g. couponCode"
            />
          </div>
          <div className="flex items-center justify-center mt-2">
            <UniversalButton label="Add Variable" onClick={addCustomVariable} />
          </div>
        </div>
      </Dialog> */}
    </>
  );
};

export default EmailTemplate;
