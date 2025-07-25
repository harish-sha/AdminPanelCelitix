import { MdOutlineDeleteForever } from "react-icons/md";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import InputField from "@/whatsapp/components/InputField";
import { RxCross2 } from "react-icons/rx";


export const DynamicFile = ({
  data,
  voiceRef,
  removeDynamicFile,
  index,
  uploadDynamicFile,
  handleFileChange,
  deleteDynamicItem,
  handleDynamicVarChange,
  dynamicVoice,
}) => {
  function renderFile() {
    return (
      <div className="flex gap-1 items-end justify-center">
        <div className="flex flex-col gap-2 mt-1 text-sm w-full">
          <label htmlFor="file">Upload File</label>
          <div className="relative w-full flex border-2 border-dashed p-1 rounded-md md:flex-nowrap flex-wrap">
            <input
              type="file"
              id="file"
              name="file"
              accept="audio/*"
              className="border border-gray-400 p-2 rounded-md w-full"
              onChange={(e) => {
                handleFileChange(e, index);
              }}
              ref={(el) => (voiceRef.current[index] = el)}
            />
            <button
              className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
              onClick={(e) => {
                uploadDynamicFile(e, index);
              }}
            >
              <FileUploadOutlinedIcon
                className="text-blue-500 cursor-pointer hover:text-blue-600"
                size={20}
              />
            </button>
            <button
              className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
              onClick={(e) => {
                removeDynamicFile(e, index);
              }}
            >
              <RxCross2
                className="text-red-500 cursor-pointer hover:text-red-600"
                size={20}
              />
            </button>
          </div>
        </div>
        <button
          className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer mb-1"
          onClick={(e) => {
            deleteDynamicItem(e, dynamicVoice.dynamicList[index].sequence - 1);
          }}
        >
          <MdOutlineDeleteForever
            className="text-red-500 cursor-pointer hover:text-red-600 sm:mb-1"
            size={20}
          />
        </button>
      </div>
    );
  }

  function renderVar() {
    return (
      <div className="flex gap-1 items-end justify-center">
        <InputField
          id="dynamicVar"
          name="dynamicVar"
          label={"Dynamic Variable"}
          type="text"
          value={dynamicVoice.dynamicList[index].variableValue}
          onChange={(e) => handleDynamicVarChange(e, index)}
        />
        <button
          className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer mb-1"
          onClick={(e) => {
            deleteDynamicItem(e, dynamicVoice.dynamicList[index].sequence - 1);
          }}
        >
          <MdOutlineDeleteForever
            className="text-red-500 cursor-pointer hover:text-red-600"
            size={20}
          />
        </button>
      </div>
    );
  }
  return (
    <div className="">
      {data.dynamicType === "file" && renderFile()}
      {data.dynamicType === "variable" && renderVar()}
    </div>
  );
};
