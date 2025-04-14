import { WhatsApp } from "@mui/icons-material";
import { FaReply } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";

export const TemplatePreview = ({
  tempDetails,
  messageType,
  sendmessageData,
  selectedImage,
  setCardIndex,
  cardIndex,
  carFile,
}) => {
  console.log("selectedImage", selectedImage);
  const tempTypes = ["IMAGE", "VIDEO", "DOCUMENT", "CAROUSEL"];

  const isCarousal = tempDetails?.components?.find(
    (comp) => comp.type === "CAROUSEL"
  );

  let CardsData = [];

  isCarousal?.cards?.map(({ components: card }, index) => {
    CardsData.push(card);
  });

  const getBtnIcon = (type) => {
    switch (type) {
      case "PHONE_NUMBER":
        return <BsTelephoneFill className="mr-2" />;
      case "QUICK_REPLY":
        return <FaReply className="mr-2" />;
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
      default:
        return `Visit us: ${url}`;
    }
  };

  const getBtnStyle = (type) => {
    switch (type) {
      case "Reply":
        return "bg-gray-200 text-gray-800";
      case "Url Action":
        return "bg-green-500 text-white";
      case "Dialer Action":
        return "bg-blue-500 text-white";
      case "View Location":
        return "bg-yellow-500";
      case "Share Location":
        return "bg-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="p-3 bg-gray-200 rounded-xl">
      <div className="w-full h-full transition-all bg-gray-100 rounded-lg shadow-md ">
        <div className="max-w-2xl mx-auto transition-all duration-300 ease-in shadow-md w-100 rounded-xl">
          <div className="flex items-center justify-between bg-[#128C7E] text-white px-4 py-3 rounded-t-xl">
            <h2 className="font-medium tracking-wide text-md">
              Template Preview
            </h2>
            <p className="text-sm">
              <WhatsApp />
            </p>
          </div>
          {!isCarousal && (
            <div className="flex flex-col h-full gap-4 p-4 bg-white rounded-b-xl">
              {messageType === "text" ? (
                <>{sendmessageData?.message}</>
              ) : (
                tempDetails?.components?.map(
                  ({ type, text, buttons, format, example }, index) => {
                    if (!format) return;
                    return (
                      <div key={index} className="flex flex-col w-full gap-3">
                        {
                          type === "HEADER" &&
                          tempTypes.includes(format) &&
                          format === "image" ? (
                            selectedImage?.fileUrl ? (
                              <img
                                src={selectedImage?.fileUrl}
                                alt="Template Image"
                                className="object-cover w-full h-full bg-white border  rounded-md"
                              />
                            ) : (
                              <img
                                src={example?.header_handle?.[0]}
                                alt="Template Image"
                                className="object-cover w-full h-full bg-white border  rounded-md"
                              />
                            )
                          ) : (
                            <div className="w-full h-[20.5rem]">
                              {selectedImage?.fileUrl ? (
                                <iframe
                                  src={selectedImage?.fileUrl}
                                  width="100%"
                                  height="100%"
                                  className="border border-blue-500 rounded-md"
                                  allowFullScreen
                                  loading="lazy"
                                />
                              ) : (
                                <iframe
                                  src={example?.header_handle?.[0]}
                                  width="100%"
                                  height="100%"
                                  className="border border-blue-500 rounded-md"
                                  allowFullScreen
                                  loading="lazy"
                                />
                              )}
                            </div>
                          )
                          // !selectedImage?.fileUrl ? (
                          //   format === "image" ? (
                          //     <img
                          //       src={example?.header_handle?.[0]}
                          //       alt="Template Image"
                          //       className="object-cover w-full h-full bg-white border border-blue-500 rounded-md"
                          //     />
                          //   ) : (
                          //     <div className="w-full h-[20.5rem]">
                          //       <iframe
                          //         src={example?.header_handle?.[0]}
                          //         width="100%"
                          //         height="100%"
                          //         className="border border-blue-500 rounded-md"
                          //         allowFullScreen
                          //         loading="lazy"
                          //       />
                          //     </div>
                          //   )
                          // ) : format === "image" ? (
                          //   <img
                          //     src={selectedImage.fileUrl}
                          //     alt="Selected Image Preview"
                          //     className="object-contain w-10 h-10 bg-white border border-green-500 rounded-md"
                          //   />
                          // ) : (
                          //   <iframe
                          //     src={selectedImage?.fileUrl}
                          //     width="100%"
                          //     height="100%"
                          //     className="border border-green-500 rounded-md"
                          //     allowFullScreen
                          //     loading="lazy"
                          //   />
                          // )
                        }

                        {type === "BODY" && (
                          <div className="text-sm text-gray-800">{text}</div>
                        )}

                        {type === "BUTTONS" && buttons?.length > 0 && (
                          <div className="flex flex-col gap-2 w-full max-w-[500px] mt-3">
                            {buttons.map(
                              ({ url, type, text, phone_number }, btnIndex) => (
                                <button
                                  key={btnIndex}
                                  title={url || phone_number}
                                  className={`flex items-center justify-center px-4 py-2 text-sm rounded-md w-full sm:w-auto ${getBtnStyle(
                                    type
                                  )}`}
                                >
                                  {getBtnIcon(type)}
                                  <p className="ml-2">{text}</p>
                                </button>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }
                )
              )}
            </div>
          )}

          {isCarousal && (
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              useKeyboardArrows
              renderArrowPrev={() => null}
              renderArrowNext={() => null}
              selectedItem={cardIndex}
              onChange={(index) => setCardIndex(index)}
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
                      setCardIndex(index);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Slide ${index + 1}`}
                  />
                );
              }}
            >
              {CardsData.map((card, index) => {
                const handler = card.find(
                  (item) =>
                    item.type === "HEADER" &&
                    ["IMAGE", "VIDEO", "DOCUMENT"].includes(item.format)
                )?.example?.header_handle[0];

                const handlerType = card.find(
                  (item) =>
                    item.type === "HEADER" &&
                    ["IMAGE", "VIDEO", "DOCUMENT"].includes(item.format)
                )?.format;

                const messageBody = card.find(
                  (item) => item.type === "BODY"
                )?.text;

                const buttons = card.find(
                  (item) => item.type === "BUTTONS"
                )?.buttons;

                const bodyText = tempDetails.components.find(
                  (comp) => comp.type === "BODY"
                )?.text;

                return (
                  <div
                    className="flex flex-col gap-3 p-3 bg-white rounded-b-md"
                    key={index}
                  >
                    {carFile[index]?.filePath ? (
                      handlerType === "IMAGE" ? (
                        <div className="flex justify-center mb-2">
                          <img
                            src={carFile[index]?.filePath}
                            alt="Uploaded Preview"
                            className="object-contain w-full h-48 bg-center bg-no-repeat border border-gray-200 rounded-md"
                          />
                        </div>
                      ) : (
                        <iframe
                          src={carFile[index]?.filePath}
                          alt="Uploaded Preview"
                          className="object-contain w-full h-48 bg-center bg-no-repeat border border-gray-200 rounded-md"
                          frameborder="0"
                        ></iframe>
                      )
                    ) : handlerType === "IMAGE" ? (
                      handler && (
                        <div className="flex justify-center mb-2">
                          <img
                            src={handler}
                            // src={whatsappImg}
                            alt="Template Preview"
                            className="object-contain w-full h-48 bg-center bg-no-repeat border border-gray-200 rounded-md"
                          />
                        </div>
                      )
                    ) : (
                      <div className="flex justify-center mb-2">
                        <iframe
                          src={handler}
                          // src={whatsappImg}
                          alt="Template Preview"
                          className="object-contain w-full h-48 bg-center bg-no-repeat border border-gray-200 rounded-md"
                        ></iframe>
                      </div>
                    )}

                    {bodyText && (
                      <div className="border border-gray-200 rounded-md p-2 w-full bg-gray-100  text-[0.85rem] text-gray-800 overflow-auto min-h-20 max-h-40 break-words">
                        {bodyText}
                      </div>
                    )}
                    {messageBody && (
                      <div className="border border-gray-200 rounded-md p-2 w-full bg-gray-100  text-[0.85rem] text-gray-800 overflow-auto min-h-20 max-h-40 break-words">
                        {messageBody}
                      </div>
                    )}

                    {buttons.length > 0 && (
                      <div className="flex flex-col gap-2 mt-1">
                        {buttons.map((btn, index) => {
                          return (
                            <button
                              key={index}
                              title={getBtnTitle(
                                btn.type,
                                btn.phone_number,
                                btn.url,
                                btn.text
                              )}
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
                          );
                        })}
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
