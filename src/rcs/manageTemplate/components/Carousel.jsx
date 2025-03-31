import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import { Variables } from "./Variables";
import { useEffect, useState } from "react";
import { SuggestedActions } from "./SuggestedActions";
import toast from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";
import { IconButton } from "@mui/material";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";

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
  //cardTitle
  //cardDescription
  //fileName
  //suggestions

  const [variables, setVariables] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [btnData, setBtnData] = useState([]);
  // const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  useEffect(() => {
    if (caraousalData.length == 0) {
      setCaraousalData([
        {
          cardTitle: "Sample Card1 Title",
          cardDescription: "Sample Card1 Description",
          fileName: "C://Users//hp//Desktop//New folder//1.jpeg",
          suggestions: [],
        },
      ]);
    }
  }, [caraousalData]);

  function handleSelectedCardIndex() {
    if (selectedCardIndex === 9) {
      toast.error("You cannot add more than 10 cards.");
      return;
    }
    setCaraousalData([...caraousalData, {}]);
    setSelectedCardIndex((prev) => prev + 1);
  }

  function handleDeleteCard(index) {
    if (caraousalData.length > 1) {
      setCaraousalData(caraousalData.filter((_, i) => i !== index));
      setSelectedCardIndex((prev) => prev - 1);
    }
  }

  function handleAddCard() {
    setCaraousalData([...caraousalData, {}]);
    handleSelectedCardIndex();
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        className="bg-[#212529] text-white px-2 py-2 font-normal rounded-md text-sm hover:bg-[#434851] disabled:opacity-50 disabled:cursor-not-allowed mt-5"
        onClick={handleSelectedCardIndex}
        type="button"
      >
        Add Card
      </button>
      <div className="flex justify-end">
        <div>
          <button onClick={handlePreviousIndex}>
            <KeyboardArrowLeftOutlinedIcon
              className="text-black cursor-pointer"
              size={50}
            />
          </button>
          <button onClick={handleNextIndex}>
            <NavigateNextOutlinedIcon
              className="text-black cursor-pointer"
              size={100}
            />
          </button>
        </div>
      </div>
      <div className="flex justify-end">
        {selectedCardIndex > 0 && (
          <IconButton
            className="no-xs"
            onClick={() => handleDeleteCard(selectedCardIndex)}
          >
            <MdOutlineDeleteForever
              className="text-red-500 cursor-pointer hover:text-red-600"
              size={20}
            />
          </IconButton>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AnimatedDropdown
          id={"selectCardWidth"}
          label={`Select Card ${selectedCardIndex + 1} Width`}
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
          onChange={(e) => {
            setCardwidth(e);
          }}
        />
        <AnimatedDropdown
          id={"selectCardHeight"}
          label={`Select Card ${selectedCardIndex + 1} Height`}
          name={"selectCardHeight"}
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
          placeholder="Select Card Height"
          value={cardheight}
          onChange={(e) => {
            setCardheight(e);
          }}
        />
      </div>
      <Variables
        variables={variables}
        setVariables={setVariables}
        messageContent={messageContent}
        setMessageContent={setMessageContent}
      />

      <SuggestedActions
        btnOptions={btnOptions}
        setBtnData={setBtnData}
        btnData={btnData}
      />

      {JSON.stringify(caraousalData, null, 2)}
      {/* {JSON.stringify(cardwidth, null, 2)} */}
    </div>
  );
};
