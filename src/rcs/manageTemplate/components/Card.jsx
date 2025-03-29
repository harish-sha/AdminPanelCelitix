import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";

export const Card = ({
  type,
  cardData,
  setCardData,
  cardOrientation,
  setCardOrientation,
  cardwidth,
  setCardwidth,
}) => {
  const [customFilePath, setCustomFilePath] = useState(null);

  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    console.log(file);

    // if (file) {
    //   const validExtensions = [".xls", ".xlsx", ".xlsm"];
    //   const fileExtension = file.name.split(".").pop();

    //   if (validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
    //     if (isValidFileName(file.name.split(".")[0])) {
    //       setUploadedFile(file);
    //       setIsUploaded(false);
    //       parseFile(file);
    //     } else {
    //       toast.error(
    //         "File name can only contain alphanumeric characters, underscores, or hyphens."
    //       );
    //     }
    //   } else {
    //     toast.error("Only Excel files (.xls, .xlsx, .xlsm) are supported.");
    //   }
    // }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileChange = (e) => {
    const file = event.target.files[0];
    setCardData({ ...cardData, filePath: file });
  };

  const uploadFile = () => {
    if (!cardData.filePath) return toast.error("Please select a file.");
    if (cardData.file) return toast.error("File already uploaded.");
    setCardData({ ...cardData, file: URL.createObjectURL(cardData.filePath) });
  };

  const deleteFileUpload = () => {
    setCustomFilePath(null);
    setCardData({ ...cardData, file: "", filePath: "" });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
        <InputField
          id={"title"}
          name={"title"}
          placeholder="Enter Title"
          label={"Title"}
          value={cardData.title}
          onChange={(e) => setCardData({ ...cardData, title: e.target.value })}
        />
        {type === "rich_card" ? (
          <AnimatedDropdown
            id={"selectCardOrientation"}
            label="Select Orientation"
            name={"selectCardOrientation"}
            options={[
              {
                label: "Vertical",
                value: "vertical",
              },
              {
                label: "Horizontal",
                value: "horizontal",
              },
            ]}
            placeholder="Select Card Orientation"
            value={cardOrientation}
            onChange={(e) => setCardOrientation(e)}
          />
        ) : (
          <AnimatedDropdown
            id={"selectCardWidth"}
            label="Select Card Width"
            name={"selectCardWidth"}
            options={[
              {
                label: "Small",
                value: "small",
              },
              {
                label: "Medium",
                value: "medium",
              },
            ]}
            placeholder="Select Card Width"
            value={cardwidth}
            onChange={(e) => setCardwidth(e)}
          />
        )}
        <AnimatedDropdown
          id={"selectMediaHeight"}
          label="Select Media Height"
          name={"selectMediaHeight"}
          options={[
            {
              label: "Medium",
              value: "medium",
            },
            {
              label: "Short",
              value: "short",
            },
          ]}
          placeholder="Select Media Height"
          value={cardData.mediaHeight}
          onChange={(e) => setCardData({ ...cardData, mediaHeight: e })}
        />
      </div>
      <div>
        <div
          className="file-upload-container"
          onDrop={handleFileDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            onChange={(e) => {
              handleFileChange(e);
            }}
            className="hidden"
            id="fileInput"
            name="fileInput"
            accept=""
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
            {cardData?.filePath ? (
              <div className="flex items-center justify-center gap-1 file-upload-info">
                <p className="file-upload-feedback file-upload-feedback-success text-sm text-green-500 font-[500]">
                  File Selected: <strong>{cardData?.filePath.name}</strong>
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
    </>
  );
};
