import { useEffect, useState, useCallback } from "react";
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

const INITIAL_DROPDOWN_STATE = {
  dropdown1: "",
  dropdown2: "",
  dropdown3: "",
  dropdown4: "",
};

const INITIAL_CARD = {
  cardTitle: "Sample Card1 Title",
  cardDescription: "Sample Card1 Description",
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
}) => {
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
    if (caraousalData.length >= 10) {
      toast.error("Maximum limit of 10 cards reached.");
      return;
    }

    const newCard = {
      cardTitle: `Sample Card ${caraousalData.length + 1} Title`,
      cardDescription: `Sample Card ${caraousalData.length + 1} Description`,
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
      const fileName = e.target.files[0];
      if (!fileName) {
        toast.error("No file selected.");
        return;
      }

      if (!cardheight) {
        toast.error("Please select card height");
        return;
      }

      const fileType = fileName.type.split("/")[0];

      const img = new Image();
      img.src = URL.createObjectURL(fileName);

      if (fileName?.size) {
        if (fileType === "image" && fileName?.size > 1 * 1024 * 1024) {
          toast.error("File size must be less than 2MB.");
          return;
        } else if (fileType === "video" && fileName?.size > 5 * 1024 * 1024) {
          toast.error("File size must be less than 10MB.");
          return;
        }
      }

      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
        const divisor = gcd(width, height);
        const ratioWidth = width / divisor;
        const ratioHeight = height / divisor;
        const ratio = `${ratioWidth}:${ratioHeight}`;

        if (cardheight === "short" && cardwidth === "small" && ratio != "5:4") {
          toast.error(
            "Please select a 5:4 ratio image for Short Height and Small Width card."
          );
          return;
        }
        if (
          cardheight === "short" &&
          cardwidth === "medium" &&
          ratio != "2:1"
        ) {
          toast.error(
            "Please select a 2:1 ratio image for Short Height and Medium Width card."
          );
          return;
        }
        if (
          cardheight === "medium" &&
          cardwidth === "small" &&
          ratio != "4:5"
        ) {
          toast.error(
            "Please select a 4:5 ratio image for Medium Height and Small Width card."
          );
          return;
        }
        if (
          cardheight === "medium" &&
          cardwidth === "medium" &&
          ratio != "4:3"
        ) {
          toast.error(
            "Please select a 4:3 ratio image for Medium Height and Small Width card."
          );
          return;
        }
        setCaraousalData((prev) =>
          prev.map((item, index) =>
            index === selectedCardIndex
              ? { ...item, fileName: fileName.name, fileTempPath: fileName }
              : item
          )
        );
      };

      img.onloadend = () => {
        URL.revokeObjectURL(img.src);
      };
    },
    [selectedCardIndex, setCaraousalData, cardheight]
  );

  const handleUploadFile = async () => {
    try {
      if (!caraousalData[selectedCardIndex]?.fileTempPath) {
        return toast.error("Please select a file first");
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
      {caraousalData.length != 10 && (
        <button
          className="mt-5 rounded-md bg-[#212529] px-2 py-2 text-sm font-normal text-white hover:bg-[#434851] disabled:cursor-not-allowed disabled:opacity-50"
          onClick={addNewCard}
          type="button"
        >
          Add Card
        </button>
      )}

      <div className="flex justify-end gap-2">
        {selectedCardIndex > 0 && (
          <IconButton onClick={handlePreviousIndex} aria-label="Previous">
            <KeyboardArrowLeftOutlinedIcon className="text-black " />
          </IconButton>
        )}
        {selectedCardIndex < caraousalData.length - 1 && (
          <IconButton onClick={handleNextIndex} aria-label="Next">
            <NavigateNextOutlinedIcon className="text-black" />
          </IconButton>
        )}
      </div>

      {selectedCardIndex > 0 && (
        <div className="flex justify-end">
          <IconButton
            onClick={() => deleteCard(selectedCardIndex)}
            aria-label="Delete card"
          >
            <MdOutlineDeleteForever
              className="text-red-500 hover:text-red-600"
              size={20}
            />
          </IconButton>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputField
          label={`Select Card ${selectedCardIndex + 1} Title`}
          value={currentCardTitle}
          onChange={handleCardTitleChange}
        />
        <div className="flex flex-col gap-2 mb-2">
          <label
            htmlFor={`uplaodfile-${selectedCardIndex + 1}`}
            className="text-sm font-medium text-gray-700"
          >
            Upload File
          </label>
          <div className="flex gap-2">
            <input
              type="file"
              id={`uplaodfile-${selectedCardIndex + 1}`}
              name={`uplaodfile-${selectedCardIndex + 1}`}
              // value={currentFileName}
              onChange={handleImageChange}
              className="block w-full  p-1.5 h-[2.275rem] border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm border-gray-300"
            />
            <button onClick={handleUploadFile}>
              <FileUploadOutlinedIcon sx={{ fontSize: "23px" }} />
            </button>
          </div>
        </div>

        <AnimatedDropdown
          id="selectCardHeight"
          label={`Select Card ${selectedCardIndex + 1} Height`}
          name="selectCardHeight"
          options={[
            { label: "Short", value: "short" },
            { label: "Medium", value: "medium" },
          ]}
          placeholder="Select Card Height"
          value={cardheight}
          onChange={(e) => setCardheight(e)}
        />
        <AnimatedDropdown
          id="selectCardWidth"
          label={`Select Card ${selectedCardIndex + 1} Width`}
          name="selectCardWidth"
          options={[
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
          ]}
          placeholder="Select Card Width"
          value={cardwidth}
          onChange={(e) => {
            setCardwidth(e);
          }}
        />
      </div>

      <Variables
        variables={currentCardVariables}
        setVariables={updateVariables}
        messageContent={currentCardMessage}
        setMessageContent={updateMessageContent}
      />

      <SuggestedActions
        btnOptions={btnOptions}
        setBtnData={updateCardSuggestions}
        btnData={currentCardSuggestions}
        cardIndex={selectedCardIndex}
        inputData={inputData}
        setInputData={setInputData}
        selectedAction={selectedAction}
        setSelectedAction={setSelectedAction}
      />

      {/* <pre className="text-xs">{JSON.stringify(caraousalData, null, 2)}</pre> */}
    </div>
  );
};
