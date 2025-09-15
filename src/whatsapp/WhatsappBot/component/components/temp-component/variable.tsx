import { uploadImageFile } from "@/apis/whatsapp/whatsapp";
import InputField from "@/whatsapp/components/InputField";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { MdOutlineDeleteForever } from "react-icons/md";
import InputVariable from "@/whatsapp/whatsappLaunchCampaign/components/InputVariable";

export const Variables = ({
  variablesData,
  setVariablesData,
  specificTemplate,
  fileRef,
  setBasicDetails,
  fileData,
  setFileData,
  allVariables,
}: {
  variablesData: any;
  setVariablesData: any;
  specificTemplate: any;
  fileRef: React.RefObject<HTMLInputElement>;
  setBasicDetails: any;
  fileData: any;
  setFileData: any;
  allVariables: any[];
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

  function handleVariableInsert(variable, index) {
    const updatedData = [...variablesData.input];
    const prevMessage = updatedData[index] || "";
    const updatedMessage = prevMessage + `{{${variable}}}`;
    updatedData[index] = updatedMessage;
    setVariablesData((prev) => ({
      ...prev,
      input: updatedData,
    }));
  }
  function handleVariableInsertBtn(variable, index) {
    const updatedData = [...variablesData.btnInput];
    const prevMessage = updatedData[index] || "";
    const updatedMessage = prevMessage + `{{${variable}}}`;
    updatedData[index] = updatedMessage;
    setVariablesData((prev) => ({
      ...prev,
      btnInput: updatedData,
    }));
  }
  return (
    <>
      {(variablesData?.btn?.length > 0 || variablesData?.data?.length > 0) && (
        <div className="mt-2 space-y-2 border p-3 rounded-xl">
          {variablesData?.data?.length > 0 &&
            variablesData?.data?.map((input, index) => (
              <div key={index}>
                <div>
                  <h1>Variables</h1>
                </div>
                <div>
                  <div className="flex  gap-2 items-center mt-2 w-full">
                    <label htmlFor="templateMessage">
                      {`{{${variablesData?.data[index]}}}`}
                    </label>
                    <div className="flex relative w-full">
                      <InputField
                        label=""
                        placeholder="{{name}}"
                        id="templateMessage"
                        name="templateMessage"
                        value={variablesData?.input[index]}
                        onChange={(e) => {
                          const updatedData = [...variablesData.input];
                          updatedData[index] = e.target.value;
                          setVariablesData((prev) => ({
                            ...prev,
                            input: updatedData,
                          }));
                        }}
                        className="flex-1 w-full focus:outline-none"
                      />

                      <div className="absolute top-0 right-0">
                        <InputVariable
                          variables={allVariables}
                          onSelect={(e) => {
                            handleVariableInsert(e, index);
                          }}
                        />
                      </div>
                    </div>
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
                  <div className="relative w-full">
                    <InputField
                      label={""}
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
                    <div className="absolute top-0 right-0">
                      <InputVariable
                        variables={allVariables}
                        onSelect={(e) => {
                          handleVariableInsertBtn(e, index);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {specificTemplate?.templateType === "image" && (
        <div className="space-y-2 mt-2">
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
        <div className="space-y-2 mt-2">
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
        <div className="space-y-2 mt-2">
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
    </>
  );
};
