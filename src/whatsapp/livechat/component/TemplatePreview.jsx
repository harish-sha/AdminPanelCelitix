import { WhatsApp } from "@mui/icons-material";
import { FaReply } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import { useMemo } from "react";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { components } from "react-select";

const tempTypes = ["IMAGE", "VIDEO", "DOCUMENT", "CAROUSEL"];

const getBtnIcon = (type) => {
  switch (type) {
    case "PHONE_NUMBER":
      return <BsTelephoneFill className="mr-2" />;
    case "QUICK_REPLY":
      return <FaReply className="mr-2" />;
    case "FLOW":
      return <AssignmentOutlinedIcon className="mr-2" />;
    default:
      return <FaExternalLinkAlt className="mr-2" />;
  }
};

const getBtnCss = (type) => {
  switch (type) {
    case "PHONE_NUMBER":
      return "bg-blue-500 text-white";
    case "QUICK_REPLY":
      return "text-gray-800 bg-gray-200";
    case "FLOW":
      return "text-white bg-gray-400";
    default:
      return "bg-green-500 text-white";
  }
};

const getBtnTitle = (type, phone, url, text) => {
  switch (type) {
    case "PHONE_NUMBER":
      return `Contact us: ${phone}`;
    case "QUICK_REPLY":
      return `View more: ${text}`;
    case "FLOW":
      return `${text}`;
    default:
      return `Visit us: ${url}`;
  }
};

const MediaRenderer = ({ format, fileUrl, fallbackUrl }) => {
  if (format === "IMAGE") {
    return (
      <div className="w-[10rem] m-auto">
        <img
          src={fileUrl || fallbackUrl}
          alt="Template"
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-[20.5rem]">
      <iframe
        src={fileUrl || fallbackUrl}
        width="100%"
        height="100%"
        className="object-contain border border-blue-500 rounded-md"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};

const ButtonsGroup = ({ buttons }) => {
  return (
    <div className="flex flex-col gap-2 w-full max-w-[500px] mt-3">
      {buttons.map(({ url, type, text, phone_number }, btnIndex) => (
        <button
          key={btnIndex}
          title={url || phone_number}
          className={`flex items-center justify-center px-4 py-2 text-sm rounded-md w-full sm:w-auto ${getBtnCss(
            type
          )}`}
        >
          {getBtnIcon(type)}
          <p className="ml-2">{text}</p>
        </button>
      ))}
    </div>
  );
};

export const TemplatePreview = ({
  tempDetails,
  messageType,
  sendmessageData,
  selectedImage,
  setCardIndex,
  cardIndex,
  carFile,
}) => {
  // const isCarousal = useMemo(() => {
  //   tempDetails?.components?.some((comp) => comp.type === "CAROUSEL");
  // }, [tempDetails]);

  const isCarousal = tempDetails?.components?.some(
    (comp) => comp.type === "CAROUSEL"
  );

  const renderedComponents = useMemo(() => {
  if (!tempDetails?.components) return null;

  return tempDetails.components
    .slice()
    .map(({ type, text, buttons, format, example }, index) => {
      // Skip media header without example
      if (type === "HEADER" && tempTypes.includes(format) && !example?.header_handle?.[0]) {
        return null;
      }

      return (
        <div key={index} className="flex flex-col w-full gap-3">
          {type === "HEADER" && !tempTypes.includes(format) && (
            <div>
              <h2 className="text-sm font-bold">{text}</h2>
            </div>
          )}

          {type === "HEADER" && tempTypes.includes(format) && (
            <MediaRenderer
              format={format}
              fileUrl={selectedImage?.fileUrl}
              fallbackUrl={example?.header_handle?.[0]}
            />
          )}

          {type === "BODY" && (
            <div className="text-sm text-gray-800">{text}</div>
          )}

          {type === "BUTTONS" && buttons?.length > 0 && (
            <ButtonsGroup buttons={buttons} />
          )}

          {type === "FOOTER" && (
            <div className="text-sm text-gray-800">{text}</div>
          )}
        </div>
      );
    });
}, [tempDetails?.components, selectedImage]);


  const CardsData = useMemo(() => {
    return isCarousal
      ? tempDetails?.components?.find((comp) => comp.type === "CAROUSEL")
          ?.cards || []
      : [];
  }, [tempDetails, isCarousal]);

  return (
    <div className="p-3 bg-gray-200 rounded-xl">
      <div className="w-full h-full transition-all bg-gray-100 rounded-lg shadow-md">
        <div className="max-w-2xl mx-auto transition-all duration-300 ease-in shadow-md w-100 rounded-xl">
          <div className="flex items-center justify-between bg-[#128C7E] text-white px-4 py-3 rounded-t-xl">
            <h2 className="font-medium tracking-wide text-md">
              Template Preview
            </h2>
            <WhatsApp />
          </div>

          {!isCarousal ? (
            <div className="flex flex-col h-full gap-4 p-4 bg-white rounded-b-xl">
              {messageType === "text" ? (
                <>{sendmessageData?.message}</>
              ) : (
                renderedComponents
              )}
            </div>
          ) : (
            <Carousel
              showThumbs={true}
              showStatus={false}
              infiniteLoop
              useKeyboardArrows
              renderArrowPrev={() => null}
              renderArrowNext={() => null}
              selectedItem={cardIndex}
              onChange={setCardIndex}
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
              {CardsData?.map((card, index) => {
                const header = card?.components?.find(
                  (item) =>
                    item.type === "HEADER" && tempTypes.includes(item.format)
                );
                const body = card?.components?.find(
                  (item) => item.type === "BODY"
                );
                const buttons =
                  card?.components?.find((item) => item.type === "BUTTONS")
                    ?.buttons || [];

                const file =
                  carFile?.[index]?.filePath ||
                  header?.example?.header_handle?.[0];

                return (
                  <div
                    key={index}
                    className="flex flex-col gap-3 p-3 bg-white rounded-b-md"
                  >
                    <MediaRenderer format={header?.format} fileUrl={file} />

                    {[
                      body?.text,
                      tempDetails?.components.find(
                        (comp) => comp.type === "BODY"
                      )?.text,
                    ]
                      .filter(Boolean)
                      .map((txt, idx) => (
                        <div
                          key={idx}
                          className="border border-gray-200 rounded-md p-2 w-full bg-gray-100 text-[0.85rem] text-gray-800 overflow-auto min-h-20 max-h-40 break-words"
                        >
                          {`${txt} dfbgodf`}
                        </div>
                      ))}

                    {buttons.length > 0 && (
                      <div className="flex flex-col gap-2 mt-1">
                        {buttons.map((btn, i) => (
                          <button
                            key={i}
                            title={`${
                              btn.type === "PHONE_NUMBER"
                                ? `Call: ${btn.phone_number}`
                                : btn.url
                            }`}
                            className={`flex items-center justify-center px-4 py-2 text-sm rounded-md cursor-pointer ${getBtnCss(
                              btn.type
                            )}`}
                            onClick={() => {
                              if (btn.type === "PHONE_NUMBER") {
                                window.location.href = `tel:${btn.phone_number}`;
                              } else if (btn.type === "URL") {
                                window.open(btn.url, "_blank");
                              }
                            }}
                          >
                            {getBtnIcon(btn.type)}
                            {btn.text}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </Carousel>
          )}
        </div>
      </div>
    </div>
  );
};
