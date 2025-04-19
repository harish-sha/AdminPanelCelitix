// import {
//   FaSmile,
//   FaImage,
//   FaPlus,
//   FaMicrophone,
//   FaSignal,
//   FaWifi,
//   FaBatteryFull,
//   FaExternalLinkAlt,
// } from "react-icons/fa";
// import { FaLocationCrosshairs, FaReply } from "react-icons/fa6";
// import { BsTelephoneFill } from "react-icons/bs";
// import { TbLocationShare } from "react-icons/tb";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { useEffect, useState } from "react";

// export const Preview = ({
//   templateDetails,
//   selectedIndex,
//   setSelectedIndex,
//   inputVariables,
// }) => {
//   const [data, setData] = useState({
//     type: "text",
//     isCarousal: false,
//     details: "",
//     btnData: [],
//   });

//   useEffect(() => {
//     if (!templateDetails) return;

//     let type = "text";
//     let isCarousal = false;
//     const buttonSuggestions = [];

//     if (templateDetails.length === 1) {
//       type = templateDetails[0]?.templateType || "text";
//     } else if (templateDetails.length > 1) {
//       isCarousal = true;
//       type = templateDetails[0]?.templateType || "image";
//     }

//     const variable = templateDetails[0]?.content;

//     const matchVar = variable?.match(/{#(.+?)#}/g);

//     const variableValueMap = matchVar?.reduce((acc, key, index) => {
//       acc[key] = inputVariables[index];
//       return acc;
//     }, {});

//     const replacedContent = variable?.replace(
//       /{#(.*?)#}/g,
//       (_, key) => variableValueMap[`{#${key}#}`] || `{#${key}#}`
//     );

//     setData({
//       type,
//       isCarousal,
//       details: templateDetails,
//       btnData: buttonSuggestions,
//       replacedContent,
//     });
//   }, [templateDetails, inputVariables]);

//   const getBtnStyle = (type) => {
//     const baseStyle =
//       "text-blue-500 text-sm border-b border-gray-200 space-x-1";
//     switch (type) {
//       case "Reply":
//       case "website":
//       case "mobile":
//       case "view location":
//       case "share location":
//         return baseStyle;
//       default:
//         return "";
//     }
//   };

//   const getBtnIcon = (type) => {
//     switch (type) {
//       case "Reply":
//         return <FaReply />;
//       case "website":
//         return <FaExternalLinkAlt />;
//       case "mobile":
//         return <BsTelephoneFill />;
//       case "view location":
//         return <FaLocationCrosshairs />;
//       case "share location":
//         return <TbLocationShare />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="smartphone">
//       {/* Top bar */}
//       <div className="flex items-center justify-between px-4 py-1 bg-gray-100 text-black text-xs font-medium rounded-t-xl">
//         <div>9:30</div>
//         <div className="w-4 h-4 bg-black rounded-full" />
//         <div className="flex items-center gap-1">
//           <FaSignal className="text-[10px]" />
//           <FaWifi className="text-[10px]" />
//           <FaBatteryFull className="text-[12px]" />
//         </div>
//       </div>

//       <div className="smartphone-content">
//         {!data.isCarousal ? (
//           <div className="rounded-md border px-1">
//             {data.type !== "text" && (
//               <div className="mb-0 w-full h-35">
//                 {data.type === "image" ? (
//                   <img
//                     src={data?.details[0]?.imageUrl}
//                     alt="Uploaded content"
//                     className="h-full w-full"
//                   />
//                 ) : (
//                   <embed
//                     src={data?.details[0]?.imageUrl}
//                     type="your-file-type"
//                     className="w-[70%] overflow-x-hidden"
//                   />
//                 )}
//               </div>
//             )}
//             <div className="overflow-y-scroll max-h-[50px] text-sm font-medium break-words whitespace-pre-wrap px-1 py-2">
//               <p>{data?.replacedContent}</p>
//             </div>
//             {data?.details[0]?.suggestions?.length > 0 && (
//               <div className="grid grid-cols-1 w-full max-w-[500px]">
//                 {data?.details[0]?.suggestions?.map((item, index) => {
//                   return (
//                     <button
//                       key={index}
//                       title={item.suggestionValue}
//                       className={`flex items-center justify-center px-4 py-2 text-sm rounded-md w-full sm:w-auto ${getBtnStyle(
//                         item.type
//                       )}`}
//                     >
//                       {getBtnIcon(item.type)}
//                       <p className="ml-2">{item.suggestionTitle}</p>
//                     </button>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         ) : (
//           <Carousel
//             showThumbs={false}
//             showStatus={false}
//             infiniteLoop
//             useKeyboardArrows
//             renderArrowPrev={() => null}
//             renderArrowNext={() => null}
//             selectedItem={selectedIndex}
//             renderIndicator={(onClickHandler, isSelected, index) => {
//               const indicatorClass = isSelected
//                 ? "bg-[#212529] w-3 h-3 rounded-full mx-1 cursor-pointer"
//                 : "bg-[#7E7F80] w-3 h-3 rounded-full mx-1 cursor-pointer";
//               return (
//                 <li
//                   key={index}
//                   className={`inline-block ${indicatorClass}`}
//                   onClick={() => {
//                     onClickHandler();
//                     setSelectedCardIndex(index);
//                   }}
//                   role="button"
//                   tabIndex={0}
//                   aria-label={`Slide ${index + 1}`}
//                 />
//               );
//             }}
//           >
//             {data?.details.map((item, index) => {
//               console.log(item);
//               return (
//                 <>
//                   <div key={index}>
//                     <p>{item.contentTitle}</p>
//                     <div className="overflow-y-scroll max-h-[250px] max-w-[525px] p-2 break-words whitespace-pre-wrap rounded-md border min-h-[50px]">
//                       <pre className="p-2 break-words whitespace-pre-wrap rounded-md">
//                         {item.content}
//                       </pre>
//                     </div>
//                     {item.imageUrl && (
//                       <img src={item.imageUrl} alt={item.contentTitle} />
//                     )}
//                   </div>
//                   {item.suggestions && (
//                     <div className="flex flex-wrap gap-2 w-full max-w-[500px] mt-5">
//                       {item.suggestions?.map((item, index) => (
//                         <button
//                           key={index}
//                           title={item.suggestionValue}
//                           className={`flex items-center justify-center px-4 py-2 text-sm rounded-md w-full sm:w-auto ${getBtnStyle(
//                             item.type
//                           )}`}
//                         >
//                           {getBtnIcon(item.type)}
//                           <p className="ml-2">{item.suggestionTitle}</p>
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </>
//               );
//             })}
//           </Carousel>
//         )}
//       </div>

//       <div className="flex items-center justify-between px-2 py-1 rounded-full bg-white shadow-sm w-66 max-w-md mx-auto my-2">
//         <div className="flex items-center flex-1 px-2 gap-2">
//           <FaSmile className="text-gray-500 text-sm" />
//           <input
//             readOnly
//             type="text"
//             placeholder="RCS message"
//             className="flex-1 outline-none text-sm text-gray-700 bg-transparent w-24 placeholder-gray-400"
//           />
//         </div>
//         <div className="flex items-center gap-2 px-2">
//           <FaReply className="text-gray-600 text-sm" />
//           <FaImage className="text-gray-600 text-sm" />
//           <FaPlus className="text-gray-600 text-sm" />
//         </div>
//         <div className="ml-2 p-2 bg-green-200 rounded-full hover:bg-green-300 transition duration-200 cursor-pointer">
//           <FaMicrophone className="text-green-800 text-sm" />
//         </div>
//       </div>
//     </div>
//   );
// };


import {
  FaSmile,
  FaImage,
  FaPlus,
  FaMicrophone,
  FaSignal,
  FaWifi,
  FaBatteryFull,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { FaLocationCrosshairs, FaReply } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { TbLocationShare } from "react-icons/tb";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

export const Preview = ({
  templateDetails,
  selectedIndex,
  setSelectedIndex,
  inputVariables,
}) => {
  const [data, setData] = useState({
    type: "text",
    isCarousal: false,
    details: "",
    btnData: [],
  });

  useEffect(() => {
    if (!templateDetails) return;

    let type = "text";
    let isCarousal = false;
    const buttonSuggestions = [];

    if (templateDetails.length === 1) {
      type = templateDetails[0]?.templateType || "text";
    } else if (templateDetails.length > 1) {
      isCarousal = true;
      type = templateDetails[0]?.templateType || "image";
    }

    const variable = templateDetails[0]?.content;

    const matchVar = variable?.match(/{#(.+?)#}/g);

    const variableValueMap = matchVar?.reduce((acc, key, index) => {
      acc[key] = inputVariables[index];
      return acc;
    }, {});

    const replacedContent = variable?.replace(
      /{#(.*?)#}/g,
      (_, key) => variableValueMap[`{#${key}#}`] || `{#${key}#}`
    );

    setData({
      type,
      isCarousal,
      details: templateDetails,
      btnData: buttonSuggestions,
      replacedContent,
    });
  }, [templateDetails, inputVariables]);

  const getBtnStyle = (type) => {
    const baseStyle =
      "text-blue-500 text-sm border-b border-gray-200 space-x-1";
    switch (type) {
      case "reply button":
      case "website":
      case "mobile":
      case "view location":
      case "share location":
        return baseStyle;
      default:
        return "";
    }
  };

  const getBtnIcon = (type) => {
    switch (type) {
      case "reply button":
        return <FaReply />;
      case "website":
        return <FaExternalLinkAlt />;
      case "mobile":
        return <BsTelephoneFill />;
      case "view location":
        return <FaLocationCrosshairs />;
      case "share location":
        return <TbLocationShare />;
      default:
        return null;
    }
  };

  return (
    <div className="smartphone">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-1 bg-gray-100 text-black text-xs font-medium rounded-t-xl">
        <div>9:30</div>
        <div className="w-4 h-4 bg-black rounded-full" />
        <div className="flex items-center gap-1">
          <FaSignal className="text-[10px]" />
          <FaWifi className="text-[10px]" />
          <FaBatteryFull className="text-[12px]" />
        </div>
      </div>

      <div className="flex justify-center items-center mt-2 p-2">
        <div className="relative">
          <img
            src="src/assets/icons/CELITIX FAVICON2.png"
            alt=""
            className="size-15"
          />
          <div className="absolute -bottom-1 -right-2">
            <VerifiedUserIcon
              sx={{
                color: "rgb(48, 111, 219)",
              }}
            />
          </div>
        </div>
      </div>

      <div className="smartphone-content">
        {!data.isCarousal ? (
          <div className="rounded-md border px-1">
            {data.type !== "text" && (
              <div className="mb-0 w-full h-35">
                {data.type === "image" ? (
                  <img
                    src={data?.details[0]?.imageUrl}
                    alt="Uploaded content"
                    className="h-full w-full"
                  />
                ) : (
                  <embed
                    src={data?.details[0]?.imageUrl}
                    type="your-file-type"
                    className="w-[70%] overflow-x-hidden"
                  />
                )}
              </div>
            )}
            <div className="overflow-y-scroll max-h-[50px] text-sm font-medium break-words whitespace-pre-wrap px-1 py-2">
              <p>{data?.replacedContent}</p>
            </div>
            {data?.details[0]?.suggestions?.length > 0 && (
              <div className="grid grid-cols-1 w-full max-w-[500px]">
                {data?.details[0]?.suggestions?.map((item, index) => {
                  return (
                    <button
                      key={index}
                      title={item.suggestionValue}
                      className={`flex items-center justify-center px-4 py-2 text-sm rounded-md w-full sm:w-auto ${getBtnStyle(
                        item.type
                      )}`}
                    >
                      {getBtnIcon(item.type)}
                      <p className="ml-2">{item.suggestionTitle}</p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            useKeyboardArrows
            renderArrowPrev={() => null}
            renderArrowNext={() => null}
            selectedItem={selectedIndex}
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
            {data?.details.map((item, index) => {
              return (
                <>
                  <div key={index}>
                    <p className="text-md">{item.contentTitle}</p>
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.contentTitle}
                        className="h-30 p-1 rounded-xl"
                      />
                    )}
                    <div className="overflow-y-scroll max-h-[150px] max-w-[525px] p-1 break-words whitespace-pre-wrap rounded-md border min-h-[50px] text-sm">
                      <pre className="p-1 break-words whitespace-pre-wrap rounded-md">
                        {item.content}
                      </pre>
                    </div>
                  </div>
                  {item.suggestions && (
                    <div className="flex flex-wrap gap-2 flex-col w-full max-w-[500px] mt-2 min-h-40">
                      {item.suggestions?.map((item, index) => (
                        <button
                          key={index}
                          title={item.suggestionValue}
                          className={`flex items-center justify-center cursor-pointer px-4 py-2 text-sm rounded-md w-full sm:w-auto ${getBtnStyle(
                            item.type
                          )}`}
                        >
                          {getBtnIcon(item.type)}
                          <p className="ml-2">{item.suggestionTitle}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              );
            })}
          </Carousel>
        )}
      </div>

      <div className="flex items-center justify-between px-2 py-1 rounded-full bg-white shadow-sm w-66 max-w-md mx-auto my-2">
        <div className="flex items-center flex-1 px-2 gap-2">
          <FaSmile className="text-gray-500 text-sm" />
          <input
            readOnly
            type="text"
            placeholder="RCS message"
            className="flex-1 outline-none text-sm text-gray-700 bg-transparent w-24 placeholder-gray-400"
          />
        </div>
        <div className="flex items-center gap-2 px-2">
          <FaReply className="text-gray-600 text-sm" />
          <FaImage className="text-gray-600 text-sm" />
          <FaPlus className="text-gray-600 text-sm" />
        </div>
        <div className="ml-2 p-2 bg-green-200 rounded-full hover:bg-green-300 transition duration-200 cursor-pointer">
          <FaMicrophone className="text-green-800 text-sm" />
        </div>
      </div>
    </div>
  );
};