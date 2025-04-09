import { MdOutlineDeleteForever } from "react-icons/md";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useEffect, useRef, useState } from "react";
import { set } from "date-fns";
import toast from "react-hot-toast";
import { input } from "@material-tailwind/react";
import InputField from "@/whatsapp/components/InputField";

export const Variables = ({
  templateType,
  selectedFile,
  setSelectedFile,
  varLength,
  setAllVariables,
  btnVarLength,
  setBtnVariables,
  btnVariables,
  setVariables,
  variables,
}) => {
  const fileRef = useRef(null);
  function uploadFile(e) {
    toast.success("File Uploaded Successfully");
  }

  function handleFileDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function deleteFileUpload() {
    if (fileRef.current) {
      fileRef.current.value = "";
    }
    setSelectedFile(null);
  }

  function handleUploadFile(event) {
    const file = event.target.files[0];
    setSelectedFile(file);
  }
  const tempTypes = ["image", "video", "document"];

  function handleVariableInputs(index, value) {
    setVariables((prevVariables) => ({
      ...prevVariables,
      [index]: value,
    }));
  }

  return (
    <div>
      {tempTypes.includes(templateType) && (
        <div>
          <h1>Upload file</h1>
          <div
            className="file-upload-container"
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              onChange={handleUploadFile}
              className="hidden"
              id="fileInput"
              name="fileInput"
              accept={`${templateType}/*`}
              ref={fileRef}
            />
            <div className="flex items-center justify-center gap-2">
              <label
                htmlFor="fileInput"
                className="inline-block px-3 py-2 text-sm font-medium tracking-wider text-center text-white bg-blue-400 rounded-lg cursor-pointer file-upload-button hover:bg-blue-500"
              >
                Choose or Drop File
              </label>
              <div className="upload-button-container ">
                <button
                  onClick={uploadFile}
                  disabled={false}
                  className={`px-2 py-1.5 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer `}
                >
                  <FileUploadOutlinedIcon
                    sx={{ color: "white", fontSize: "23px" }}
                  />
                </button>
              </div>
            </div>
            <div className="mt-3">
              {selectedFile ? (
                <div className="flex items-center justify-center gap-1 file-upload-info">
                  <p className="file-upload-feedback file-upload-feedback-success text-sm text-green-500 font-[500]">
                    File Selected: <strong>{selectedFile.name}</strong>
                  </p>
                  <button
                    className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
                    onClick={deleteFileUpload}
                  >
                    <MdOutlineDeleteForever
                      className="text-red-500 cursor-pointer hover:text-red-600"
                      size={20}
                    />
                  </button>
                </div>
              ) : (
                <p className="text-sm font-semibold tracking-wide text-gray-500 file-upload-feedback file-upload-feedback-error">
                  No file uploaded yet!
                </p>
              )}
            </div>
          </div>
        </div>
      )}     
       {varLength?.length > 0 && (
        <div className="mb-2">
          <p className="font-semibold">Variable</p>
          {varLength?.map((item, index) =>
            item.map((item, index) => (
              <div key={index}>
                <InputField
                  id={`${index + 1}`}
                  name={`${index + 1}`}
                  label={`Enter Variable ${index + 1} Value`}
                  value={variables[index] || ""}
                  onChange={(e) => handleVariableInputs(index, e.target.value)}
                  placeholder={`Enter value for variable ${index + 1}`}
                />
              </div>
            ))
          )}
        </div>
      )}
      {btnVarLength?.length > 0 && (
        <div className="mt-3">
          <p className="font-semibold">Button Variable</p>
          <InputField
            id="btnVariable"
            name="btnVariable"
            label="Enter Button Variable Value"
            value={btnVariables}
            onChange={(e) => setBtnVariables(e.target.value)}
            placeholder="Button Text"
          />
        </div>
      )}
    </div>
  );
};
