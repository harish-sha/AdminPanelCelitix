import { uploadImageFile } from "@/apis/whatsapp/whatsapp";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";

export const Card = ({
  type,
  cardData,
  setCardData,
  cardOrientation,
  setCardOrientation,
  subType,
  fileRef,
  thumbnailRef,
}) => {
  const [customFilePath, setCustomFilePath] = useState(null);

  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

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
    const file = e.target.files[0];

    // if(!cardm)

    if (!cardOrientation) {
      fileRef.current.value = null;
      return toast.error("Please select card orientation.");
    }
    if (!cardData.mediaHeight) {
      fileRef.current.value = null;
      return toast.error("Please select card height.");
    }

    if (!file) return;
    const fileType = file.type.split("/")[0];

    const img = new Image();
    img.src = URL.createObjectURL(file);

    if (file?.size) {
      if (fileType === "image" && file?.size > 2 * 1024 * 1024) {
        fileRef.current.value = null;
        toast.error("File size must be less than 2MB.");
        return;
      } else if (fileType === "video" && file?.size > 10 * 1024 * 1024) {
        fileRef.current.value = null;
        toast.error("File size must be less than 10MB.");
        return;
      }
    }

    if (fileType === "video") {
      setCardData({ ...cardData, filePath: file });
      return;
    }

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
      const divisor = gcd(width, height);
      const ratioWidth = width / divisor;
      const ratioHeight = height / divisor;
      const ratio = `${ratioWidth}:${ratioHeight}`;

      const ratios = {
        vertical: {
          short: "3:1",
          medium: "2:1",
        },
        horizontal: "3:4",
      };

      if (
        cardOrientation === "vertical" &&
        cardData.mediaHeight === "short" &&
        ratio !== ratios.vertical.short
      ) {
        fileRef.current.value = null;
        toast.error("Please select a 3:1 ratio image for vertical short card.");
        return;
      }

      if (
        cardOrientation === "vertical" &&
        cardData.mediaHeight === "medium" &&
        ratio !== ratios.vertical.medium
      ) {
        fileRef.current.value = null;
        toast.error("Please select a 2:1 ratio image for vertical tall card.");
        return;
      }

      if (cardOrientation === "horizontal" && ratio !== ratios.horizontal) {
        fileRef.current.value = null;
        toast.error("Please select a 3:4 ratio image for horizontal card.");
        return;
      }

      setCardData({
        ...cardData,
        filePath: file,
      });
    };
    img.onloadend = () => {
      URL.revokeObjectURL(img.src);
    };
  };
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    const fileType = file.type.split("/")[0];
    if (fileType !== "image") {
      return toast.error("Please select a valid image file for thumbnail.");
    }

    // if (file?.size > 2 * 1024 * 1024) {
    //   return toast.error("Thumbnail size must be less than 2MB.");
    // }
    if (file.size > 100 * 1024) {
      return toast.error("Thumbnail size must be less than 100KB.");
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
      const divisor = gcd(width, height);
      const ratioWidth = width / divisor;
      const ratioHeight = height / divisor;
      const ratio = `${ratioWidth}:${ratioHeight}`;

      if (ratio !== "7:3") {
        fileRef.current.value = null;
        toast.error("Please select a 7:3 ratio image for thumbnail.");
        return;
      }

      setCustomFilePath(file);
      setCardData({
        ...cardData,
        thumbnailPath: file,
      });
    };
    img.onloadend = () => {
      URL.revokeObjectURL(img.src);
    };
  };

  const uploadFile = async () => {
    if (!cardData.filePath) return toast.error("Please select a file.");
    // if (cardData.file) return toast.error("File already uploaded.");
    const res = await uploadImageFile(cardData.filePath);
    if (!res?.fileUrl) {
      return toast.error(res?.msg || "Failed to upload file");
    }
    setCardData({ ...cardData, file: res?.fileUrl });

    toast.success("File Uploaded Successfully");
  };
  const uploadThumbnailFile = async () => {
    if (!cardData.thumbnailPath) return toast.error("Please select a file.");
    // if (cardData.thumbnail) return toast.error("File already uploaded.");
    const res = await uploadImageFile(cardData.thumbnailPath);
    if (!res?.fileUrl) {
      return toast.error(res?.msg || "Failed to upload thumbnail");
    }
    setCardData({ ...cardData, thumbnail: res?.fileUrl });

    toast.success("File Uploaded Successfully");
  };

  const deleteFileUpload = () => {
    setCustomFilePath("");
    setCardData({ ...cardData, file: "", filePath: "" });
    fileRef.current.value = null;
  };
  const deleteThumbnailUpload = () => {
    setCustomFilePath("");
    setCardData({ ...cardData, thumbnail: "", thumbnailPath: "" });
    thumbnailRef.current.value = null;
  };

  return (
    <div>
      {/* <div className="flex flex-col items-center justify-center gap-2 md:flex-row"> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:flex-row">
        <InputField
          id={"title"}
          name={"title"}
          placeholder="Enter Title"
          label={"Title"}
          value={cardData.title}
          onChange={(e) => setCardData({ ...cardData, title: e.target.value })}
          maxLength="200"
          tooltipContent=" Enter the title that will appear on the rich card. Keep it short and engaging."
        />
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
          placeholder="Select Card"
          tooltipContent=" Tooltip for Select Orientation: Choose the layout of the card.
Vertical: Image appears above the text/buttons.
Horizontal: Image appears beside the text.
Note: Media requirements vary based on selected orientation and height."
          value={cardOrientation}
          onChange={(e) => {
            setCardOrientation(e);

            setCardData({
              ...cardData,
              file: "",
              filePath: "",
            });
          }}
        />

        <AnimatedDropdown
          id={"selectMediaHeight"}
          label="Select Media Height"
          name={"selectMediaHeight"}
          options={
            cardOrientation === "vertical"
              ? [
                  {
                    label: "Medium",
                    value: "medium",
                  },
                  {
                    label: "Short",
                    value: "short",
                  },
                ]
              : [
                  {
                    label: "Left",
                    value: "left",
                  },
                  {
                    label: "Right",
                    value: "right",
                  },
                ]
          }
          placeholder="Select Media"
          tooltipContent="Tooltip for Select Media Height
Choose the Rich Card Standalone layout size.
Guidelines for Images (Rich Card Standalone):
Vertical + Short: 3:1 aspect ratio, 1440x480px, max 2MB (JPG/PNG/GIF)
Vertical + Medium: 2:1 aspect ratio, 1440x720px, max 2MB (JPG/PNG/GIF)
Horizontal: 3:4 aspect ratio, 768x1024px, max 2MB (JPG/PNG/GIF)
For Videos (any layout): Max size 10MB
Unsupported sizes may cause delivery failure or layout issues."
          value={cardData.mediaHeight}
          onChange={(e) => {
            setCardData({
              ...cardData,
              mediaHeight: e,
              file: "",
              filePath: "",
            });
          }}
        />
      </div>
      <div className="mt-5 flex flex-col items-center gap-2 md:flex-row mb-2 w-full">
        <div className="flex gap-2 items-end w-full md:w-auto">
          <InputField
            type="file"
            id="fileInput"
            name="fileInput"
            onChange={(e) => {
              handleFileChange(e);
            }}
            ref={fileRef}
            accept={subType === "image" ? "image/*" : "video/*"}
            label={"Upload File"}
            tooltipContent={
              subType === "image"
                ? "Upload an image file for the card. Supported formats: JPG, PNG, GIF. Max size: 2MB."
                : "Upload a video file for the card. Supported formats: MP4. Max size: 10MB."
            }
          />

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
        {subType === "video" && (
          <div className="flex gap-2 items-end w-full md:w-auto">
            <InputField
              type="file"
              label="Upload Thumbnail"
              tooltipContent="Upload a thumbnail image for the video. Supported formats: JPG, PNG, GIF. Max size: 2MB."
              id="thumbnailInput"
              name="thumbnailInput"
              onChange={(e) => {
                handleThumbnailChange(e);
              }}
              ref={thumbnailRef}
              accept="image/*"
            />
            <div className="upload-button-container ">
              <button
                onClick={uploadThumbnailFile}
                disabled={false}
                className={`px-2 py-1.5 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer `}
              >
                <FileUploadOutlinedIcon
                  sx={{ color: "white", fontSize: "23px" }}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
