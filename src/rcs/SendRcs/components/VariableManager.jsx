import InputField from "@/whatsapp/components/InputField";
import { useEffect, useRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";
import VariableDropdown from "@/whatsapp/components/VariableDropdown";
import InputVariable from "@/whatsapp/whatsappLaunchCampaign/components/InputVariable";

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
    if (templateDetails.length > 1) {
      setIsCarousal(true);
    }
  }, [templateDetails]);

  function handleInputVariable(data, index) {
    setInputVariables((prev) => ({
      ...prev,
      [index]: data,
    }));
  }

  const handleCarInputVariable = (value, index, nestedIndex) => {
    setCarVarInput((prev) => {
      const updated = { ...prev };
      const current = updated[index] || [];

      current[nestedIndex] = value;
      updated[index] = current;

      return updated;
    });
  };

  async function handleEmojiAdd(emoji, index) {
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
  }

  function inputVariable(e, index) {
    const input = textBoxRef.current;
    if (!input) return;

    const tag = `{#${e}#}`;
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
  }

  return (
    <div className=" p-3 bg-gray-100 rounded-lg shadow-md lg:flex-1">
      <h1>Variables</h1>
      <div className="flex gap-2 flex-col mt-2">
        {!isCarousal &&
          varLength > 0 &&
          varList?.map((input, index) => (
            <div className="relative w-full">
              <InputField
                key={index}
                id={`variable${index + 1}`}
                ref={textBoxRef}
                label={`Variable ${index + 1}`}
                name={`variable${index + 1}`}
                placeholder={`Enter variable ${index + 1}`}
                value={inputVariables[index]}
                onChange={(e) => {
                  handleInputVariable(e.target.value, index);
                }}
                sx={{
                  width: "100%",
                  marginBottom: "1rem",
                }}
              />
              <div className="absolute top-[1.85rem] right-0">
                <InputVariable
                  variables={headers}
                  onSelect={(e) => inputVariable(e, index)}
                />
              </div>
              <div className="absolute top-[2.1rem] right-8">
                <CustomEmojiPicker onSelect={(e) => handleEmojiAdd(e, index)} />
              </div>
            </div>
          ))}

        {isCarousal && carVar.length > 0 && (
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
                    setCardIndex(index);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Slide ${index + 1}`}
                />
              );
            }}
          >
            {Object.keys(carVar?.data || {}).map((item, index) => (
              <div key={index} className="">
                {Object.keys(carVar.data[item]).map(
                  (nestedItem, nestedIndex) => (
                    <InputField
                      key={nestedIndex}
                      id={`${index}-${nestedIndex}`}
                      label={`Variable ${nestedIndex + 1}`}
                      name={`variable${index}-${nestedIndex}`}
                      placeholder={`Enter variable ${nestedIndex + 1}`}
                      onChange={(e) =>
                        handleCarInputVariable(
                          e.target.value,
                          index,
                          nestedIndex
                        )
                      }
                      sx={{
                        width: "100%",
                        marginBottom: "1rem",
                      }}
                    />
                  )
                )}
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};
