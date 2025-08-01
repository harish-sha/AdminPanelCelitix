import { useEffect, useState, useCallback, useRef } from "react";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import { Variables } from "./Variables";
import { SuggestedActions } from "./SuggestedActions";
import toast from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";
import { IconButton } from "@mui/material";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { uploadImageFile } from "@/apis/whatsapp/whatsapp";
import { GenerateAiContent } from "@/components/common/CustomContentGenerate";
import CustomTooltip from "@/components/common/CustomTooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";

const INITIAL_DROPDOWN_STATE = {
  dropdown1: "",
  dropdown2: "",
  dropdown3: "",
  dropdown4: "",
};

const INITIAL_CARD = {
  cardTitle: "",
  cardDescription: "",
  fileName: "",
  filePath: "",
  suggestions: INITIAL_DROPDOWN_STATE,
  fileTempPath: "",
};

export const Carousel = ({
  caraousalData,
  setCaraousalData,
  cardwidth,
  setCardwidth,
  cardheight,
  setCardheight,
  btnOptions,
  selectedCardIndex,
  setSelectedCardIndex,
  handlePreviousIndex,
  handleNextIndex,
  ai,
  setAi,
  setIsOpen,
  isOpen,
  subType,
}) => {
  const fileRefs = useRef([]);
  const thumbnailRefs = useRef([]);

  useEffect(() => {
    if (fileRefs.current[selectedCardIndex]) {
      const data = caraousalData[selectedCardIndex];
      if (!data?.fileTempPath && !data?.filePath) {
        fileRefs.current[selectedCardIndex].value = "";
      } else {
        fileRefs.current[selectedCardIndex].filename = data?.fileName;
      }
    }
    if (thumbnailRefs.current[selectedCardIndex]) {
      const data = caraousalData[selectedCardIndex];
      if (!data?.thumbnailTempPath && !data?.thumbnailPath) {
        thumbnailRefs.current[selectedCardIndex].value = "";
      }
    }

    // if (thumbnailRefs.current[selectedCardIndex]) {
    //   const data = caraousalData[selectedCardIndex];
    //   if (!data?.thumbnailTempPath && !data?.thumbnailPath) {
    //     thumbnailRefs.current[selectedCardIndex].value = "";
    //   }
    // }
  }, [selectedCardIndex]);

  const [selectedAction, setSelectedAction] = useState({
    dropdown1: "",
    dropdown2: "",
    dropdown3: "",
    dropdown4: "",
  });

  const [inputData, setInputData] = useState({
    dropdown1: {
      type: "",
      title: "",
      value: "",
    },
    dropdown2: {
      type: "",
      title: "",
      value: "",
    },
    dropdown3: {
      type: "",
      title: "",
      value: "",
    },
    dropdown4: {
      type: "",
      title: "",
      value: "",
    },
  });

  // Initialize carousel data if empty
  useEffect(() => {
    if (!caraousalData.length) {
      setCaraousalData([INITIAL_CARD]);
    }
  }, [caraousalData, setCaraousalData]);

  const addNewCard = useCallback(() => {
    if (caraousalData.length >= 6) {
      toast.error("Maximum limit of 6 cards reached.");
      return;
    }

    const newCard = {
      cardTitle: "",
      cardDescription: "",
      fileName: INITIAL_CARD.fileName,
      filePath: INITIAL_CARD.filePath,
      suggestions: INITIAL_DROPDOWN_STATE,
      fileTempPath: INITIAL_CARD.fileTempPath,
    };

    setCaraousalData((prev) => [...prev, newCard]);
    setSelectedCardIndex(caraousalData.length);
  }, [caraousalData.length, setCaraousalData, setSelectedCardIndex]);

  const deleteCard = useCallback(
    (index) => {
      if (caraousalData.length <= 1) return;

      setCaraousalData((prev) => prev.filter((_, i) => i !== index));
      setSelectedCardIndex((prev) => Math.max(prev - 1, 0));
    },
    [caraousalData.length, setCaraousalData, setSelectedCardIndex]
  );

  const updateCardSuggestions = useCallback(
    (suggestions) => {
      setCaraousalData((prev) =>
        prev.map((item, index) =>
          index === selectedCardIndex
            ? { ...item, suggestions: suggestions }
            : item
        )
      );
    },

    [selectedCardIndex, setCaraousalData]
  );
  const updateVariables = useCallback(
    (variable) => {
      setCaraousalData((prev) =>
        prev.map((item, index) =>
          index === selectedCardIndex ? { ...item, variable: variable } : item
        )
      );
    },
    [selectedCardIndex, setCaraousalData]
  );
  const updateMessageContent = useCallback(
    (message) => {
      setCaraousalData((prev) =>
        prev.map((item, index) =>
          index === selectedCardIndex
            ? { ...item, cardDescription: message }
            : item
        )
      );
    },
    [selectedCardIndex, setCaraousalData]
  );
  const handleCardTitleChange = useCallback(
    (e) => {
      setCaraousalData((prev) =>
        prev.map((item, index) =>
          index === selectedCardIndex
            ? { ...item, cardTitle: e.target.value }
            : item
        )
      );
    },
    [selectedCardIndex, setCaraousalData]
  );


  const handleImageChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];

      const clearInputsAndShowError = (message) => {
        toast.error(message);
        fileRefs.current.forEach((ref) => {
          if (ref) ref.value = "";
        });
      };

      if (!file) return clearInputsAndShowError("No file selected.");
      if (!cardheight)
        return clearInputsAndShowError("Please select card height.");

      const fileType = file.type.split("/")[0];
      const isImage = fileType === "image";
      const isVideo = fileType === "video";

      if (
        (isImage && file.size > 1 * 1024 * 1024) || // 2MB
        (isVideo && file.size > 5 * 1024 * 1024) // 10MB
      ) {
        return clearInputsAndShowError(
          isImage
            ? "File size must be less than 2MB."
            : "File size must be less than 10MB."
        );
      }

      if (isVideo) {
        setCaraousalData((prev) =>
          prev.map((item, index) =>
            index === selectedCardIndex
              ? { ...item, fileName: file.name, fileTempPath: file }
              : item
          )
        );
        return;
      }

      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const { naturalWidth: width, naturalHeight: height } = img;

        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
        const divisor = gcd(width, height);
        const ratio = `${width / divisor}:${height / divisor}`;

        const expectedRatios = {
          short: {
            small: "5:4",
            medium: "2:1",
          },
          medium: {
            small: "4:5",
            medium: "4:3",
          },
        };

        const expectedRatio = expectedRatios[cardheight]?.[cardwidth];

        if (expectedRatio && ratio !== expectedRatio) {
          return clearInputsAndShowError(
            `Please select a ${expectedRatio} ratio image for ${capitalize(
              cardheight
            )} Height and ${capitalize(cardwidth)} Width card.`
          );
        }

        setCaraousalData((prev) =>
          prev.map((item, index) =>
            index === selectedCardIndex
              ? { ...item, fileName: file.name, fileTempPath: file }
              : item
          )
        );
      };

      img.onloadend = () => {
        URL.revokeObjectURL(img.src);
      };
    },
    [selectedCardIndex, setCaraousalData, cardheight, cardwidth]
  );

  const handleThumbnailChange = useCallback(
    (e, index) => {
      if (!thumbnailRefs.current[index]) return;
      const file = e.target.files?.[0];

      if (file.size > 100 * 1024) {
        return toast.error("Thumbnail size must be less than 100KB.");
      }

      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const { naturalWidth: width, naturalHeight: height } = img;

        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
        const divisor = gcd(width, height);
        const ratio = `${width / divisor}:${height / divisor}`;

        if (ratio !== "605:452") {
          thumbnailRefs.current[index].value = "";
          return toast.error(
            "Please select a 605:452 ratio image for the thumbnail."
          );
        }

        setCaraousalData((prev) =>
          prev.map((item, index) =>
            index === selectedCardIndex
              ? { ...item, thumbnailTempPath: file, thumbnailName: file.name }
              : item
          )
        );
      };

      img.onloadend = () => {
        URL.revokeObjectURL(img.src);
      };
    },
    [selectedCardIndex, setCaraousalData, cardheight, cardwidth]
  );

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleUploadFile = async () => {
    try {
      if (!caraousalData[selectedCardIndex]?.fileTempPath) {
        return toast.error("Please select a file first");
      }
      if (caraousalData[selectedCardIndex]?.filePath) {
        return toast.error(
          "Image already uploaded, please choose a different one."
        );
      }
      const res = await uploadImageFile(
        caraousalData[selectedCardIndex]?.fileTempPath
      );
      setCaraousalData((prev) =>
        prev.map((item, index) =>
          index === selectedCardIndex
            ? { ...item, filePath: res?.fileUrl }
            : item
        )
      );
      toast.success("File Uploaded Successfully");
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  const handleUploadThumbnail = async () => {
    try {
      if (!caraousalData[selectedCardIndex]?.thumbnailTempPath) {
        return toast.error("Please select a file first");
      }
      if (caraousalData[selectedCardIndex]?.thumbnailPath) {
        return toast.error(
          "Image already uploaded, please choose a different one."
        );
      }
      const res = await uploadImageFile(
        caraousalData[selectedCardIndex]?.thumbnailTempPath
      );
      setCaraousalData((prev) =>
        prev.map((item, index) =>
          index === selectedCardIndex
            ? { ...item, thumbnailPath: res?.fileUrl }
            : item
        )
      );
      toast.success("File Uploaded Successfully");
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  const handleDeleteFile = () => {
    setCaraousalData((prev) =>
      prev.map((item, index) =>
        index === selectedCardIndex
          ? { ...item, filePath: "", fileName: "", fileTempPath: "" }
          : item
      )
    );
    fileRefs.current[selectedCardIndex].value = null;
  };

  const handleDeleteThumbnail = () => {
    setCaraousalData((prev) =>
      prev.map((item, index) =>
        index === selectedCardIndex
          ? { ...item, thumbnailPath: "", thumbnail: "", thumbnailTempPath: "" }
          : item
      )
    );
    thumbnailRefs.current[selectedCardIndex].value = null;
  };

  const currentCardSuggestions =
    caraousalData[selectedCardIndex]?.suggestions || "";

  const currentCardVariables = caraousalData[selectedCardIndex]?.variable || [];

  const currentCardMessage =
    caraousalData[selectedCardIndex]?.cardDescription || "";

  const currentCardTitle = caraousalData[selectedCardIndex]?.cardTitle || "";
  const currentFileName = caraousalData[selectedCardIndex]?.fileName || null;

  useEffect(() => {
    setSelectedAction({
      dropdown1:
        caraousalData[selectedCardIndex]?.suggestions?.dropdown1.type || "",
      dropdown2:
        caraousalData[selectedCardIndex]?.suggestions?.dropdown2.type || "",
      dropdown3:
        caraousalData[selectedCardIndex]?.suggestions?.dropdown3.type || "",
      dropdown4:
        caraousalData[selectedCardIndex]?.suggestions?.dropdown4.type || "",
    });

    setInputData({
      dropdown1: {
        type:
          caraousalData[selectedCardIndex]?.suggestions?.dropdown1?.type || "",
        title:
          caraousalData[selectedCardIndex]?.suggestions?.dropdown1?.title || "",
        value:
          caraousalData[selectedCardIndex]?.suggestions?.dropdown1?.value || "",
      },
      dropdown2: {
        type:
          caraousalData[selectedCardIndex]?.suggestions?.dropdown2?.type || "",
        title:
          caraousalData[selectedCardIndex]?.suggestions?.dropdown2?.title || "",
        value:
          caraousalData[selectedCardIndex]?.suggestions?.dropdown2?.value || "",
      },
      dropdown3: {
        type:
          caraousalData[selectedCardIndex]?.suggestions?.dropdown3?.type || "",
        title:
          caraousalData[selectedCardIndex]?.suggestions?.dropdown3?.title || "",
        value:
          caraousalData[selectedCardIndex]?.suggestions?.dropdown3?.value || "",
      },
      dropdown4: {
        type:
          caraousalData[selectedCardIndex]?.suggestions?.dropdown4?.type || "",
        title:
          caraousalData[selectedCardIndex]?.suggestions?.dropdown4?.title || "",
        value:
          caraousalData[selectedCardIndex]?.suggestions?.dropdown4?.value || "",
      },
    });
  }, [selectedCardIndex]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div>
          <IconButton onClick={handlePreviousIndex} aria-label="Previous">
            <KeyboardArrowLeftOutlinedIcon
              className={`text-black ${selectedCardIndex > 0 ? "cursor-pointer" : "cursor-not-allowed"
                } `}
            />
          </IconButton>
          {/* {selectedCardIndex > 0 && (
          )} */}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-md bg-[#212529] px-2 py-2 text-sm font-normal text-white hover:bg-[#434851] disabled:cursor-not-allowed disabled:opacity-50"
            onClick={addNewCard}
            type="button"
            disabled={caraousalData.length != 10 ? false : true}
          >
            Add Card
          </button>
          <CustomTooltip
            title={
              "Click to add a new card in the carousel. You can create a max of 5 cards."
            }
            placement={"top"}
            arrow
          >
            <span className="ml-2">
              <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
            </span>
          </CustomTooltip>

          {selectedCardIndex > 0 && (
            <IconButton
              onClick={() => deleteCard(selectedCardIndex)}
              aria-label="Delete card"
            >
              <MdOutlineDeleteForever
                className="text-red-500 hover:text-red-600"
                size={20}
              />
            </IconButton>
          )}
        </div>
        <div>
          <IconButton onClick={handleNextIndex} aria-label="Next">
            <NavigateNextOutlinedIcon
              className={`text-black ${selectedCardIndex < caraousalData.length - 1
                ? "cursor-pointer"
                : "cursor-not-allowed"
                }`}
            />
          </IconButton>
        </div>
      </div>
      <div className="flex gap-2">
        <AnimatedDropdown
          id="selectCardHeight"
          label={`Select Card Height`}
          name="selectCardHeight"
          options={[
            { label: "Short", value: "short" },
            { label: "Medium", value: "medium" },
          ]}
          placeholder="Select Card Height"
          value={cardheight}
          tooltipContent={`Tooltip: Select Card Height & Width \n
Choose the Rich Card Carousel layout size.
Follow RCS media specs to avoid delivery issues:
Short + Small: 960×768px (5:4)
Short + Medium: 1440×720px (2:1)
Medium + Small: 576×720px (4:5)
Medium + Medium: 1440×1080px (4:3)
Images: Max 1MB | Videos: Max 5MB`}
          onChange={(e) => {
            setCardheight(e);
            setCaraousalData((prev) => {
              const newData = prev.map((item, index) => {
                return { ...item, fileName: "", fileTempPath: "" };
              });

              return newData;
            });
            fileRefs.current = fileRefs.current.map((current) => {
              if (current) {
                current.value = "";
              }
            });
          }}
        />
        <AnimatedDropdown
          id="selectCardWidth"
          label={`Select Card Width`}
          name="selectCardWidth"
          options={[
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
          ]}
          placeholder="Select Card Width"
          value={cardwidth}
          onChange={(e) => {
            setCardwidth(e);
            setCaraousalData((prev) => {
              const newData = prev.map((item, index) => {
                return { ...item, fileName: "", fileTempPath: "" };
              });

              return newData;
            });
            fileRefs.current = fileRefs.current.map((current) => {
              if (current) {
                current.value = "";
              }
            });
          }}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputField
          label={`Select Card ${selectedCardIndex + 1} Title`}
          value={currentCardTitle}
          placeholder={`Sample Card ${selectedCardIndex + 1} Title`}
          onChange={handleCardTitleChange}
          maxLength="200"
          tooltipContent="Enter the title that will appear on the rich card. Keep it short and engaging."
        />
        <div className="flex flex-col gap-2 ">
          <label
            htmlFor={`uplaodfile-${selectedCardIndex + 1}`}
            className="text-sm font-medium text-gray-700"
          >
            Upload File
          </label>
          <div className="flex gap-2">
            <input
              type="file"
              id={`uploadfile-${selectedCardIndex + 1}`}
              name={`uploadfile-${selectedCardIndex + 1}`}
              onChange={handleImageChange}
              ref={(el) => (fileRefs.current[selectedCardIndex] = el)}
              // fileName={fileRefs.current[selectedCardIndex]?.filename }
              // value={fileRefs.current[selectedCardIndex]?.value || ""}
              accept={
                subType === "video"
                  ? "video/*"
                  : "image/png, image/jpeg, image/jpg, image/webp"
              }
              className="block w-full p-1.5 h-[2.275rem] border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm border-gray-300"
            />

            {caraousalData[selectedCardIndex]?.fileName && (
              <button onClick={handleUploadFile}>
                <FileUploadOutlinedIcon sx={{ fontSize: "23px" }} />
              </button>
            )}

            {caraousalData[selectedCardIndex]?.fileName && (
              <button onClick={handleDeleteFile}>
                <MdOutlineDeleteForever
                  className="text-red-500 cursor-pointer hover:text-red-600"
                  size={20}
                />
              </button>
            )}

          </div>
        </div>
      </div>

      {/* Thumbnail */}

      {subType === "video" && (
        <div className="flex flex-col gap-2 mb-2 ">
          <label
            htmlFor={`uplaodfile-${selectedCardIndex + 1}`}
            className="text-sm font-medium text-gray-700"
          >
            Upload Thumbnail
          </label>
          <div className="flex gap-2">
            <input
              type="file"
              id={`uploadThumbnail-${selectedCardIndex + 1}`}
              name={`uploadThumbnail-${selectedCardIndex + 1}`}
              onChange={(e) => {
                handleThumbnailChange(e, selectedCardIndex);
              }}
              accept="image/*"
              ref={(el) => (thumbnailRefs.current[selectedCardIndex] = el)}
              // value={fileRefs.current[selectedCardIndex]?.value || ""}
              className="block w-full p-1.5 h-[2.275rem] border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm border-gray-300"
            />

            <button onClick={handleUploadThumbnail}>
              <FileUploadOutlinedIcon sx={{ fontSize: "23px" }} />
            </button>
            {caraousalData[selectedCardIndex]?.thumbnail && (
              <button onClick={handleDeleteThumbnail}>
                <MdOutlineDeleteForever
                  className="text-red-500 cursor-pointer hover:text-red-600"
                  size={20}
                />
              </button>
            )}
          </div>
        </div>
      )}

      <div className="relative">
        <Variables
          variables={currentCardVariables}
          setVariables={updateVariables}
          messageContent={currentCardMessage}
          setMessageContent={updateMessageContent}
          selectedCardIndex={selectedCardIndex}
        />

        <GenerateAiContent
          ai={ai}
          setAi={setAi}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          right={5}
          bottom={55}
          messageContent={currentCardMessage}
          setMessageContent={updateMessageContent}
          selectedCardIndex={selectedCardIndex}
          length={2500}
          type="carousel"
        />
      </div>

      <SuggestedActions
        btnOptions={btnOptions}
        setBtnData={updateCardSuggestions}
        btnData={currentCardSuggestions}
        cardIndex={selectedCardIndex}
        inputData={inputData}
        setInputData={setInputData}
        selectedAction={selectedAction}
        setSelectedAction={setSelectedAction}
        selectedCardIndex={selectedCardIndex}
      />

      {/* <pre className="text-xs">{JSON.stringify(caraousalData, null, 2)}</pre> */}
    </div>
  );
};