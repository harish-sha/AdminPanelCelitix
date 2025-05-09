import InputField from "@/whatsapp/components/InputField";
import { useEffect, useState } from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { MdOutlineDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";
import { uploadImageFile } from "@/apis/whatsapp/whatsapp";

export const Variables = ({
  variablesData,
  setVariablesData,
  specificTemplate,
  fileRef,
  setBasicDetails,
  fileData,
  setFileData,
}) => {
  function handleFileChange(e) {
    const file = e.target.files[0];
    setFileData((prev) => ({ ...prev, file: file }));
  }
  async function handleUploadFile() {
    if (!fileData.file) return;
    if (fileData.url) return toast.error("File already uploaded");

    const res = await uploadImageFile(fileData.file);
    setFileData((prev) => ({ ...prev, url: res?.fileUrl }));
    setBasicDetails((prev) => ({ ...prev, mediaPath: res?.fileUrl }));
  }

  function deleteImage() {
    if (!fileData.url) return;
    setFileData({ file: "", url: "" });
    setBasicDetails((prev) => ({ ...prev, mediaPath: "" }));
    fileRef.current.value = "";
  }
  return (
    <div className="mt-2 space-y-2 border p-3 rounded-xl">
      {variablesData?.data?.length > 0 &&
        variablesData?.data?.map((input, index) => (
          <div>

            <div className="">
            <h1>Variables</h1>
            </div>
          <div key={index}>
            <div className="flex  gap-2 items-center mt-2">
              <label htmlFor="templateMessage">
                {`{{${variablesData?.data[index]}}}`}
              </label>
              <InputField
                placeholder="{{name}}"
                id="templateMessage"
                name="templateMessage"
                value={variablesData?.input[index]}
                onChange={(e) => {
                  const updatedData = [...variablesData.input];
                  updatedData[index] = e.target.value;
                  setVariablesData((prev) => ({ ...prev, input: updatedData }));
                }}
                className="flex-1 w-full focus:outline-none"
              />
            </div>
          </div>
          </div>
        ))}

      {variablesData?.btn?.length > 0 &&
        variablesData?.btn?.map((input, index) => (
          <div key={index}>
            <h1>Buttons</h1>
            <div className="flex  gap-2 items-center mt-2">
              <label htmlFor="templateMessage">
                {`{{${variablesData?.btn[index]}}}`}
              </label>
              <InputField
                placeholder="{{name}}"
                id="templateMessage"
                name="templateMessage"
                value={variablesData?.btnInput[index]}
                onChange={(e) => {
                  const updatedData = [...variablesData.btnInput];
                  updatedData[index] = e.target.value;
                  setVariablesData((prev) => ({
                    ...prev,
                    btnInput: updatedData,
                  }));
                }}
                className="flex-1 w-full focus:outline-none"
              />
            </div>
          </div>
        ))}

      {specificTemplate?.templateType === "image" && (
        <div className="space-y-2">
          <h1>Upload Image</h1>
          <div className="flex gap-2 items-center">
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              className="block w-full  p-1.5 h-[2.275rem] border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm border-gray-300"
              onChange={handleFileChange}
            />

            <button onClick={handleUploadFile}>
              <FileUploadOutlinedIcon sx={{ fontSize: "23px" }} />
            </button>
            <button onClick={deleteImage}>
              <MdOutlineDeleteForever
                className="text-red-500 cursor-pointer hover:text-red-600"
                size={25}
              />
            </button>
          </div>
        </div>
      )}
      {specificTemplate?.templateType === "video" && (
        <div className="space-y-2">
          <h1>Upload Video</h1>
          <div className="flex gap-2 items-center">
            <input
              type="file"
              accept="video/*"
              ref={fileRef}
              className="block w-full  p-1.5 h-[2.275rem] border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm border-gray-300"
              onChange={handleFileChange}
            />

            <button onClick={handleUploadFile}>
              <FileUploadOutlinedIcon sx={{ fontSize: "23px" }} />
            </button>
            <button onClick={deleteImage}>
              <MdOutlineDeleteForever
                className="text-red-500 cursor-pointer hover:text-red-600"
                size={25}
              />
            </button>
          </div>
        </div>
      )}
      {specificTemplate?.templateType === "document" && (
        <div className="space-y-2">
          <h1>Upload Document</h1>
          <div className="flex gap-2 items-center">
            <input
              type="file"
              accept="application/*"
              ref={fileRef}
              className="block w-full  p-1.5 h-[2.275rem] border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm border-gray-300"
              onChange={handleFileChange}
            />

            <button onClick={handleUploadFile}>
              <FileUploadOutlinedIcon sx={{ fontSize: "23px" }} />
            </button>
            <button onClick={deleteImage}>
              <MdOutlineDeleteForever
                className="text-red-500 cursor-pointer hover:text-red-600"
                size={25}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
