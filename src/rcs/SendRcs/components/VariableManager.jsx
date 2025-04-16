// import InputField from "@/whatsapp/components/InputField";

// export const VariableManager = ({
//   templateDetails,
//   varList,
//   setVarList,
//   varLength,
//   setInputVariables,
//   inputVariables,
// }) => {
//   function handleInputVariable(data, index) {
//     setInputVariables((prev) => ({
//       ...prev,
//       [index]: data,
//     }));
//   }

//   return (
//     <div className=" p-3 bg-gray-100  lg:flex-1">
//       <h1>Variables</h1>
//       <div className="flex gap-2 flex-col mt-2">
//         {varList?.map((input, index) => (
//           <InputField
//             key={index}
//             id={index}
//             label={`Variable ${index + 1}`}
//             name={`variable${index + 1}`}
//             placeholder={`Enter variable ${index + 1}`}
//             onChange={(e) => {
//               handleInputVariable(e.target.value, index);
//             }}
//             sx={{
//               width: "100%",
//               marginBottom: "1rem",
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };


import InputField from "@/whatsapp/components/InputField";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";

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
}) => {
  const [isCarousal, setIsCarousal] = useState(false);

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

  return (
    <div className=" p-3 bg-gray-100 rounded-lg shadow-md lg:flex-1">
      <h1>Variables</h1>
      <div className="flex gap-2 flex-col mt-2">
        {!isCarousal &&
          varLength > 0 &&
          varList?.map((input, index) => (
            <InputField
              key={index}
              id={index}
              label={`Variable ${index + 1}`}
              name={`variable${index + 1}`}
              placeholder={`Enter variable ${index + 1}`}
              onChange={(e) => {
                handleInputVariable(e.target.value, index);
              }}
              sx={{
                width: "100%",
                marginBottom: "1rem",
              }}
            />
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