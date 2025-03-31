import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import { Variables } from "./Variables";
import { useEffect, useState } from "react";
import { SuggestedActions } from "./SuggestedActions";
import toast from "react-hot-toast";

export const Carousel = ({
  caraousalData,
  setCaraousalData,
  cardwidth,
  setCardwidth,
  cardheight,
  setCardheight,
  btnOptions,
}) => {
  //cardTitle
  //cardDescription
  //fileName
  //suggestions

  const [variables, setVariables] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [btnData, setBtnData] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  // useEffect(() => {
  //   console.log("Var", variables);
  //   console.log("Message", messageContent);
  // }, [messageContent, variables]);

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
  // useEffect(() => {
  //   // if (caraousalData.length > 0) {
  //   //   setCaraousalData([
  //   //     {
  //   //       cardTitle: "Sample Card1 Title",
  //   //       cardDescription: "Sample Card1 Description",
  //   //       fileName: "C://Users//hp//Desktop//New folder//1.jpeg",
  //   //       suggestions: [],
  //   //     },
  //   //   ]);
  //   // }
  //   console.log(caraousalData);
  // }, [caraousalData]);

  function handleSelectedCardIndex() {
    if (selectedCardIndex === 9) {
      toast.error("You cannot add more than 10 cards.");
      return;
    }
    console.log(selectedCardIndex + 1);
    setSelectedCardIndex((prev) => prev + 1);
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        className="border border-gray-400 rounded-sm h-8.5 text-sm bg-gray-200 px-2"
        onClick={() => {
          setCaraousalData([...caraousalData, {}]);
          handleSelectedCardIndex();
        }}
        type="button"
      >
        Add Card
      </button>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AnimatedDropdown
          id={"selectCardWidth"}
          label={`Select Card Width ${selectedCardIndex + 1}`}
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
          label={`Select Card Height ${selectedCardIndex + 1}`}
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
      {/* 
      {JSON.stringify(caraousalData, null, 2)}
      {JSON.stringify(cardwidth, null, 2)} */}
    </div>
  );
};
