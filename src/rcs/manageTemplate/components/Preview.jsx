import { useEffect, useState } from "react";
import { FaLocationCrosshairs, FaReply } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { TbLocationShare } from "react-icons/tb";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import { FaSignal, FaWifi, FaBatteryFull } from "react-icons/fa";
import { FaSmile, FaImage, FaPlus, FaMicrophone } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

export const Preview = ({
  variables = [],
  messageContent,
  btnData = [],
  cardData,
  cardWidth,
  cardOrientation,
  templateType,
  caraousalData,
  selectedIndex,
  handleNextIndex,
  handlePreviousIndex,
  setSelectedCardIndex,
}) => {
  const [pree, setPree] = useState();

  useEffect(() => {
    const filteredBtnData = [];
    // let updatedSuggestions = caraousalData;

    Object.values(btnData).map((item) => {
      if (item.type) {
        filteredBtnData.push(item);
        return item;
      }
    });

    const updatedCData = caraousalData?.map((item) => ({
      ...item,
      suggestions: item?.suggestions
        ? Object.values(item.suggestions).filter(({ type }) => type)
        : [],
    }));

    const fileType = cardData?.filePath?.type?.split("/")[0];

    setPree({
      variables,
      messageContent: messageContent,
      filteredBtnData: filteredBtnData,
      cardData,
      cardWidth,
      cardOrientation,
      templateType,
      caraousalData,
      selectedIndex,
      updatedCData,
      fileType,
    });
  }, [
    variables,
    messageContent,
    btnData,
    cardData,
    cardWidth,
    cardOrientation,
    templateType,
    caraousalData,
    selectedIndex,
  ]);

  const getBtnStyle = (type) => {
    switch (type) {
      case "Reply":
        return "text-blue-500 text-sm border-b border-gray-200 space-x-1";
      case "Url Action":
        return "text-blue-500 text-sm border-b border-gray-200 space-x-1";
      case "Dialer Action":
        return " text-blue-500 text-sm border-b border-gray-200 space-x-1";
      case "View Location":
        return "text-blue-500 text-sm border-b border-gray-200 space-x-1";
      case "Share Location":
        return "text-blue-500 text-sm border-b border-gray-200 space-x-1";
      default:
        return "";
    }
  };

  const getBtnIcon = (type) => {
    switch (type) {
      case "Reply":
        return <FaReply />;
      case "Url Action":
        return <FaExternalLinkAlt />;
      case "Dialer Action":
        return <BsTelephoneFill />;
      case "View Location":
        return <FaLocationCrosshairs />;
      case "Share Location":
        return <TbLocationShare />;
      default:
        return "";
    }
  };

  return (
    <div className="smartphone">
      <div className="flex items-center justify-between px-4 py-1 bg-gray-100 text-black text-xs font-medium rounded-t-xl">
        {/* Time */}
        <div>9:30</div>

        {/* Notch (center circle) */}
        <div className="w-4 h-4 bg-black rounded-full" />

        {/* Right Icons */}
        <div className="flex items-center gap-1">
          <FaSignal className="text-[10px]" />
          <FaWifi className="text-[10px]" />
          <FaBatteryFull className="text-[12px]" />
        </div>
      </div>

      {/* <div className="flex justify-center items-center mt-2 p-2">
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
      </div> */}
      <div className="smartphone-content">
        {/* <p className="text-md font-medium text-center">Template Preview</p> */}
        {templateType != "carousel" ? (
          <div className="rounded-md border px-1">
            {pree?.cardData?.file && (
              <div className="mb-0 w-full h-35">
                {pree?.fileType === "image" ? (
                  <img
                    src={pree.cardData.file}
                    alt="Uploaded content"
                    className="h-full w-full"
                  />
                ) : (
                  // Uncomment and define the type if you plan to use <embed>
                  <embed
                    src={pree.cardData.file}
                    type="your-file-type"
                    className="w-[70%] overflow-x-hidden"
                  />
                )}
              </div>
            )}
            <div className="overflow-y-scroll max-h-[50px] text-sm font-medium break-words whitespace-pre-wrap px-1 py-2">
              <p>{pree?.cardData?.title}</p>
            </div>

            <div className="flex flex-col justify-between">
              {pree?.messageContent && (
                <div className="overflow-y-scroll max-h-[130px] max-w-[525px] break-words whitespace-pre-wrap  min-h-[50px] mb-2">
                  <pre className="p-1 text-sm break-words whitespace-pre-wrap rounded-md">
                    {pree?.messageContent}
                  </pre>
                </div>
              )}

              {pree?.filteredBtnData?.length > 0 && (
                <div className="grid grid-cols-1 w-full max-w-[500px]">
                  {pree?.filteredBtnData?.map((item, index) => (
                    <button
                      key={index}
                      title={item.value}
                      className={`flex items-center justify-center px-4 py-2 text-sm rounded-md w-full sm:w-auto ${getBtnStyle(
                        item.type
                      )}`}
                    >
                      {getBtnIcon(item.type)}
                      <p className="ml-2">{item.title}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              useKeyboardArrows
              renderArrowPrev={() => null}
              renderArrowNext={() => null}
              selectedItem={pree?.selectedIndex}
              renderIndicator={(onClickHandler, isSelected, index) => {
                const indicatorClass = isSelected
                  ? "bg-[#212529] w-3 h-3 rounded-full mx-1 cursor-pointer"
                  : "bg-[#7E7F80] w-3 h-3 rounded-full mx-1 cursor-pointer";

                return (
                  <li
                    id="carousel-indicator"
                    name="carousel-indicator"
                    key={index}
                    className={`inline-block ${indicatorClass}`}
                    onClick={() => {
                      onClickHandler();
                      setSelectedCardIndex(index);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Slide ${index + 1}`}
                  />
                );
              }}
            >
              {pree?.updatedCData.map((item, index) => (
                <div className="text-start p-2">
                  <div key={index}>
                    {item.fileTempPath && (
                      <img
                        src={item.filePath}
                        alt={item.cardTitle}
                        className="h-30 p-1 rounded-xl"
                      />
                    )}
                    <p className="text-md">{item.cardTitle}</p>
                    {item.cardDescription && (
                      <div className="overflow-y-scroll  max-h-[150px] max-w-[525px] p-1 break-words whitespace-pre-wrap rounded-md border min-h-[100px] text-start text-sm">
                        <pre className="p-1 break-words whitespace-pre-wrap rounded-md ">
                          {item.cardDescription}
                        </pre>
                      </div>
                    )}
                  </div>
                  {/* {JSON.stringify(pree?.updatedCData, null, 2)} */}

                  {item.suggestions && (
                    <div className="flex flex-wrap flex-col gap-2 w-full  mt-2 min-h-50">
                      {item.suggestions?.map((item, index) => (
                        <button
                          key={index}
                          title={item.value}
                          className={`flex items-center justify-center px-4 py-2 text-sm rounded-md w-full sm:w-auto ${getBtnStyle(
                            item.type
                          )}`}
                        >
                          {getBtnIcon(item.type)}
                          <p className="ml-2">{item.title}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </Carousel>
          </>
        )}
      </div>

      <div className="flex items-center justify-between px-2 py-1 rounded-full bg-white shadow-sm w-66 max-w-md mx-auto my-2">
        {/* Left side: Emoji + Input */}
        <div className="flex items-center flex-1 px-2 gap-2">
          <FaSmile className="text-gray-500 text-sm" />
          <input
            readOnly
            type="text"
            placeholder="RCS message"
            className="flex-1 outline-none text-sm text-gray-700 bg-transparent w-24 placeholder-gray-400"
          />
        </div>

        {/* Middle Icons */}
        <div className="flex items-center gap-2 px-2">
          <FaReply className="text-gray-600 text-sm" />
          <FaImage className="text-gray-600 text-sm" />
          <FaPlus className="text-gray-600 text-sm" />
        </div>

        {/* Voice Icon Button */}
        <div className="ml-2 p-2 bg-green-200 rounded-full hover:bg-green-300 transition duration-200 cursor-pointer">
          <FaMicrophone className="text-green-800 text-sm" />
        </div>
      </div>
    </div>
  );
};
