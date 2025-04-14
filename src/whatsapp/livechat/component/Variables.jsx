import { MdOutlineDeleteForever } from "react-icons/md";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useEffect, useRef, useState } from "react";
import { set } from "date-fns";
import toast from "react-hot-toast";
import { input } from "@material-tailwind/react";
import InputField from "@/whatsapp/components/InputField";
import { uploadImageFile } from "@/apis/whatsapp/whatsapp";
import { Carousel } from "react-responsive-carousel";

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
  setCarFile,
  carFile,
  cardIndex,
  setCardIndex,
  tempDetails,
  // setFileData,
  // fileData,
}) => {
  const fileRef = useRef(null);
  async function uploadFile(e) {
    if (!selectedFile?.fileTempPath) {
      return toast.error("Please select file first");
    }
    if (selectedFile?.fileUrl) {
      return toast.error("File already uploaded");
    }
    const res = await uploadImageFile(selectedFile?.fileTempPath);

    setSelectedFile((prev) => ({
      ...prev,
      fileUrl: res?.fileUrl,
    }));
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
    setSelectedFile({
      fileTempPath: file,
      fileUrl: "",
    });
  }
  const tempTypes = ["image", "video", "document"];

  function handleVariableInputs(index, value) {
    setVariables((prevVariables) => ({
      ...prevVariables,
      [index]: value,
    }));
  }

  const isCarousal = tempDetails?.components?.find(
    (comp) => comp.type === "CAROUSEL"
  );

  let CardsData = [];

  isCarousal?.cards?.map(({ components: card }, index) => {
    CardsData.push(card);
  });

  useEffect(() => {
    isCarousal?.cards?.map((card, index) => {
      setCarFile((prev) => ({
        ...prev,
        [index]: {
          fileTempPath: "",
          filePath: "",
        },
      }));
    });
  }, [isCarousal]);

  const handleCardMediaChange = async (e, index) => {
    const file = e.target.files[0];
    setCarFile((prev) => ({
      ...prev,
      [index]: {
        fileTempPath: file,
        filePath: "",
      },
    }));
  };

  const uploadCarMedia = async (index) => {
    if (!carFile[index]?.fileTempPath) {
      return toast.error("Please select a file first");
    }
    if (carFile[index]?.filePath) {
      return toast.error("File already uploaded");
    }

    const res = await uploadImageFile(carFile[index]?.fileTempPath);
    setCarFile((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        filePath: res?.fileUrl,
      },
    }));
  };

  const deleteCarMedia = (index) => {
    setCarFile((prev) => ({
      ...prev,
      [index]: {
        fileTempPath: null,
        filePath: "",
      },
    }));
    fileRef.current.value = "";
  };

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
                    File Selected:{" "}
                    <strong>{selectedFile.fileTempPath.name}</strong>
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
      {templateType === "carousel" && (
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          useKeyboardArrows
          renderArrowPrev={() => null}
          renderArrowNext={() => null}
          selectedItem={cardIndex}
          onChange={(index) => setCardIndex(index)}
          renderIndicator={(onClickHandler, isSelected, index) => {
            const baseClasses = "w-3 h-3 rounded-full mx-1 cursor-pointer";
            const indicatorClass = isSelected ? "bg-[#212529]" : "bg-[#7E7F80]";
            return (
              <li
                key={index}
                className={`inline-block ${baseClasses} ${indicatorClass}`}
                onClick={() => {
                  onClickHandler();
                  setCardIndex(index);
                }}
                role="button"
                tabIndex={0}
                aria-label={`Slide ${index + 1}`}
              />
            );
          }}
        >
          {CardsData.map((card, index) => {
            const handler = card.find(
              (item) =>
                item.type === "HEADER" &&
                ["IMAGE", "VIDEO", "DOCUMENT"].includes(item.format)
            );

            if (!handler) {
              // Use empty div to avoid breaking Carousel layout
              return <div key={index} />;
            }

            const acceptedTypes = {
              IMAGE: "image/*",
              VIDEO: "video/*",
              DOCUMENT: ".pdf,.doc,.docx,.xls,.xlsx",
            };

            return (
              <div key={index}>
                <h1>{`Upload file for card ${index + 1}`}</h1>
                <div className="file-upload-container">
                  <input
                    type="file"
                    id={`fileInput-${index}`}
                    onChange={(e) => handleCardMediaChange(e, index)}
                    className="hidden"
                    name="fileInput"
                    accept={acceptedTypes[handler.format] || "*/*"}
                    ref={fileRef}
                  />
                  <div className="flex items-center justify-center gap-2">
                    <label
                      htmlFor={`fileInput-${index}`}
                      className="inline-block px-3 py-2 text-sm font-medium tracking-wider text-center text-white bg-blue-400 rounded-lg cursor-pointer file-upload-button hover:bg-blue-500"
                    >
                      Choose or Drop File
                    </label>
                    <div className="upload-button-container ">
                      <button
                        onClick={() => uploadCarMedia(index)}
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
                    {carFile[index] ? (
                      <div className="flex items-center justify-center gap-1 file-upload-info">
                        <p className="file-upload-feedback file-upload-feedback-success text-sm text-green-500 font-[500]">
                          File Selected:{" "}
                          <strong>{carFile[index].fileTempPath?.name}</strong>
                        </p>
                        <button
                          className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
                          onClick={() => deleteCarMedia(index)}
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
            );
          })}
        </Carousel>
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
