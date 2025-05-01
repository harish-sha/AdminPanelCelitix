import InputField from "@/whatsapp/components/InputField";
import { useEffect, useRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";
import VariableDropdown from "@/whatsapp/components/VariableDropdown";
import InputVariable from "@/whatsapp/whatsappLaunchCampaign/components/InputVariable";
import CustomTooltip from "@/components/common/CustomTooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";

export const VariableManager = ({
  templateDetails,
  varList,
  setVarList,
  varLength,
  setInputVariables,
  inputVariables,
  carVar,
  selectedIndex,
  setSelectedIndex,
  carVarInput,
  setCarVarInput,
  headers,
  selectedOption,
}) => {
  const [isCarousal, setIsCarousal] = useState(false);
  const textBoxRef = useRef(null);

  useEffect(() => {
    setIsCarousal(templateDetails.length > 1);
  }, [templateDetails]);

  const handleInputVariable = (value, index) => {
    setInputVariables((prev) => ({ ...prev, [index]: value }));
  };

  const handleCarInputVariable = (value, index, nestedIndex) => {
    setCarVarInput((prev) => {
      const updated = { ...prev };
      const current = updated[index] || [];
      current[nestedIndex] = value;
      updated[index] = current;
      return updated;
    });
  };

  const handleEmojiAdd = (emoji, index) => {
    const input = textBoxRef.current;
    if (!input) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;

    const newMessageContent =
      inputVariables[index].slice(0, start) +
      emoji +
      inputVariables[index].slice(end);

    setInputVariables((prev) => ({
      ...prev,
      [index]: newMessageContent,
    }));
  };

  const insertVariable = (variable, index) => {
    const input = textBoxRef.current;
    if (!input) return;

    const tag = `{#${variable}#}`;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    const newMessageContent =
      inputVariables[index].slice(0, start) +
      tag +
      inputVariables[index].slice(end);

    setInputVariables((prev) => ({
      ...prev,
      [index]: newMessageContent,
    }));
  };

  const renderSimpleInput = () =>
    varList?.map((label, index) => (
      <div className="relative w-full p-2" key={index}>
        <div className="flex gap-2 items-center mb-3">
          <label htmlFor={`variable${index + 1}`}>{label}</label>
          <InputField
            id={`variable${index + 1}`}
            ref={textBoxRef}
            name={`variable${index + 1}`}
            placeholder={`Enter variable ${index + 1}`}
            value={inputVariables[index]}
            onChange={(e) => handleInputVariable(e.target.value, index)}
            sx={{ width: "100%", marginBottom: "1rem" }}
          />
        </div>
        <div className="absolute top-[0.122rem] right-0 h-10">
          <InputVariable
            variables={headers}
            onSelect={(e) => insertVariable(e, index)}
          />
        </div>
        <div className="absolute top-[0.4rem] right-8">
          <CustomEmojiPicker onSelect={(e) => handleEmojiAdd(e, index)} />
        </div>
      </div>
    ));

  const renderCarouselInput = () => (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      useKeyboardArrows
      renderArrowPrev={() => null}
      renderArrowNext={() => null}
      selectedItem={selectedIndex}
      onChange={(index) => setSelectedIndex(index)}
      renderIndicator={(onClickHandler, isSelected, index) => {
        const indicatorClass = isSelected
          ? "bg-[#212529] w-3 h-3 rounded-full mx-1 cursor-pointer"
          : "bg-[#7E7F80] w-3 h-3 rounded-full mx-1 cursor-pointer";

        return (
          <li
            key={index}
            className={`inline-block ${indicatorClass}`}
            onClick={() => {
              onClickHandler();
              setSelectedIndex(index);
            }}
            role="button"
            tabIndex={0}
            aria-label={`Slide ${index + 1}`}
          />
        );
      }}
    >
      {Object.keys(carVar?.data || {}).map((item, index) => (
        <div key={index} className="p-2">
          <div className="flex gap-2 items-center mb-3">
            <p className="text-[0.9rem] text-start">Message Params</p>
            <CustomTooltip
              title="Insert all the variables value"
              placement="top"
              arrow
            >
              <span>
                <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
              </span>
            </CustomTooltip>
          </div>
          {Object.keys(carVar.data[item]).map((_, nestedIndex) => (
            <div className="flex gap-2 items-center mb-3" key={nestedIndex}>
              <label htmlFor={`${index}-${nestedIndex}`} className="w-1/3">
                {carVar.data[item][nestedIndex]}
              </label>
              <InputField
                id={`${index}-${nestedIndex}`}
                name={`variable${index}-${nestedIndex}`}
                placeholder={`Enter variable ${nestedIndex + 1}`}
                onChange={(e) =>
                  handleCarInputVariable(e.target.value, index, nestedIndex)
                }
                sx={{ width: "66.6667%", marginBottom: "1rem" }}
              />
            </div>
          ))}
        </div>
      ))}
    </Carousel>
  );

  return (
    <div className="bg-white pb-2 rounded-md">
      {templateDetails[0] && (
        <div className="bg-[#128C7E] p-2 rounded-t-md">
          <h1 className="text-[0.8rem] font-medium text-white tracking-wider">
            Template Type: {templateDetails[0].templateType}
          </h1>
        </div>
      )}
      <div className="flex flex-col gap-2 mt-2">
        {!isCarousal && varLength > 0 && renderSimpleInput()}
        {isCarousal && carVar?.length > 0 && renderCarouselInput()}
      </div>
    </div>
  );
};
