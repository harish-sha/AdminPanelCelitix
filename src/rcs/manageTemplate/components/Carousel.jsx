import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import { Variables } from "./Variables";
import { useEffect, useState } from "react";
import { SuggestedActions } from "./SuggestedActions";

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

  // useEffect(() => {
  //   console.log("Var", variables);
  //   console.log("Message", messageContent);
  // }, [messageContent, variables]);
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
          onChange={(e) => {
            setcardwidth(e);
          }}
        />
        <AnimatedDropdown
          id={"selectCardHeight"}
          label="Select Card Height"
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
    </div>
  );
};
