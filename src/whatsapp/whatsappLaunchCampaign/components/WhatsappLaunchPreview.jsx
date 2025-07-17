import React from "react";
import { WhatsApp } from "@mui/icons-material";
import { FaReply } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaLinkSlash } from "react-icons/fa6";
import { Carousel } from "react-responsive-carousel";
import whatsappImg from "../../../assets/images/whatsappdummy.webp";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';


const replaceVariablesInText = (text, variables, type = "body") => {
  return text.replace(
    /{{(\d+)}}/g,
    (_, key) => variables[`${type}${key}`] || `{{${key}}}`
  );
};

const extractCoordinates = (url) => {
  if (!url) {
    return null;
  }
  let regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
  let match = url.match(regex);
  if (match) {
    return {
      lat: match[1],
      lng: match[2],
    };
  }

  regex = /place\/.*\/@(-?\d+\.\d+),(-?\d+\.\d+)/;
  match = url.match(regex);
  if (match) {
    return {
      lat: match[1],
      lng: match[2],
    };
  }

  regex = /q=(-?\d+\.\d+),(-?\d+\.\d+)/;
  match = url.match(regex);
  if (match) {
    return {
      lat: match[1],
      lng: match[2],
    };
  }

  return null;
};

const WhatsappLaunchPreview = ({
  templateDataNew,
  formData,
  uploadedImage,
  setCardIndex,
  cardIndex,
  fileData,
  locationData,
}) => {
  if (!templateDataNew || !templateDataNew.components) {
    return (
      <div className="flex items-center justify-center h-full p-3 bg-gray-200 rounded-xl">
        <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-lg shadow-md">
          <div className="transition-all duration-300 ease-in shadow-md rounded-xl w-100">
            <div className="flex items-center justify-between bg-[#128C7E] text-white px-4 py-2 rounded-t-md">
              <h2 className="font-medium tracking-wide text-md">
                Template Preview
              </h2>
              <p className="text-sm">
                <WhatsApp />
              </p>
            </div>
            <div className="flex flex-col gap-3 p-3 bg-white rounded-b-md">
              <img
                src={whatsappImg}
                alt="whatsapp-dummy-image"
                className="object-cover w-full h-48 bg-center bg-no-repeat border border-gray-200 rounded-md"
              />
              <div className="flex items-center justify-center w-full p-2 text-sm text-center bg-gray-100 border border-gray-300 rounded-md h-30">
                No template selected
              </div>
              <div className="flex flex-col gap-2">
                <button className="flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-md ">
                  <BsTelephoneFill className="mr-2" />
                  Contact us
                </button>
                <button className="flex items-center justify-center px-4 py-2 text-white bg-green-500 rounded-md ">
                  <FaExternalLinkAlt className="mr-2" />
                  Visit us
                </button>
                <button className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-800 bg-gray-200 rounded-md">
                  <FaReply className="mr-2" />
                  View more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const headerComponent = templateDataNew.components.find(
    (comp) =>
      comp.type === "HEADER" &&
      ["IMAGE", "VIDEO", "DOCUMENT", "TEXT", "LOCATION"].includes(comp.format)
  );

  const bodyComponent = templateDataNew.components.find(
    (comp) => comp.type === "BODY"
  );
  let finalMessage = bodyComponent
    ? replaceVariablesInText(bodyComponent.text, formData, "body")
    : "";

  const buttonsComponent = templateDataNew.components.find(
    (comp) => comp.type === "BUTTONS"
  );

  let CardsData = [];

  const isCarousal = templateDataNew.components.find(
    (comp) => comp.type === "CAROUSEL"
  );

  isCarousal?.cards?.forEach(({ components: card }) => {
    CardsData.push(card);
  });

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

  const types = ["IMAGE", "VIDEO", "DOCUMENT"];

  return (
    <div className="flex items-center justify-center h-full p-3 bg-gray-200 rounded-xl">
      <div className="flex items-center justify-center w-full h-full transition-all bg-gray-100 rounded-lg shadow-md">
        <div className="transition-all duration-300 ease-in shadow-md rounded-xl w-100 ">
          <div className="flex items-center justify-between bg-[#128C7E] text-white px-4 py-2 rounded-t-md">
            <h2 className="font-medium tracking-wide text-md">
              Template Preview
            </h2>
            <p className="text-sm">
              <WhatsApp />
            </p>
          </div>

          {!isCarousal && (
            <div className="flex flex-col gap-2 p-3 bg-white rounded-b-md">
              {["IMAGE", "VIDEO", "DOCUMENT"].includes(
                headerComponent?.format
              ) &&
                (uploadedImage ? (
                  headerComponent.format === "IMAGE" ? (
                    <div className="flex justify-center mb-2">
                      <img
                        src={uploadedImage}
                        alt="Uploaded Preview"
                        className="object-contain w-full h-48 bg-center bg-no-repeat border border-gray-200 rounded-md"
                      />
                    </div>
                  ) : (
                    <iframe
                      id={"xcv"}
                      src={uploadedImage}
                      alt="Uploaded Preview"
                      className="object-contain w-full h-48 bg-center bg-no-repeat border border-gray-200 rounded-md"
                      frameborder="0"
                    ></iframe>
                  )
                ) : headerComponent?.format === "IMAGE" ? (
                  headerComponent?.example?.header_handle && (
                    <div className="flex justify-center mb-2">
                      <img
                        src={headerComponent?.example?.header_handle[0]}
                        alt="Template Preview"
                        className="object-contain w-full h-48 bg-center bg-no-repeat border border-gray-200 rounded-md"
                      />
                    </div>
                  )
                ) : (
                  <div className="flex justify-center mb-2">
                    <iframe
                      src={headerComponent?.example.header_handle[0]}
                      id="afuis"
                      alt="Template Preview"
                      className="object-contain w-full h-48 bg-center bg-no-repeat border border-gray-200 rounded-md"
                    ></iframe>
                  </div>
                ))}

              {headerComponent?.format === "LOCATION" && (
                <>
                  <iframe
                    id="gmap"
                    src={`https://www.google.com/maps?q=${extractCoordinates(locationData?.url)?.lat
                      },${extractCoordinates(locationData?.url)?.lng
                      }&hl=es;z=14&output=embed`}
                    width="100%"
                    height="200"
                    className="border-none "
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  <div className="text-sm text-gray-800 font-bold">{locationData.name}</div>
                  <div className="text-sm text-gray-600 font-semibold" >{locationData.address}</div>
                </>
              )}

              {headerComponent && headerComponent.format === "TEXT" && (
                <div className="text-md font-semibold text-gray-800">
                  {headerComponent.text}
                </div>
              )}


              {/* {headerComponent &&
                (headerComponent?.format === "IMAGE" ? (
                  <div className="flex justify-center mb-2">
                    <img
                      src={headerComponent?.example?.header_handle[0]}
                      alt="Template Preview"
                      className="object-contain w-full h-48 bg-center bg-no-repeat border border-gray-200 rounded-md"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center mb-2">
                    <iframe
                      src={headerComponent?.example.header_handle[0]}
                      id="afuis"
                      alt="Template Preview"
                      className="object-contain w-full h-48 bg-center bg-no-repeat border border-gray-200 rounded-md"
                    ></iframe>
                  </div>
                ))} */}

              {bodyComponent && (
                <pre className="border border-gray-200 rounded-md p-2 w-full bg-gray-100  text-[0.85rem] text-gray-800 overflow-auto min-h-20 max-h-40 break-words text-wrap">
                  {finalMessage}
                </pre>
              )}

              {buttonsComponent && buttonsComponent.buttons.length > 0 && (
                <div className="flex flex-col gap-2 mt-1">
                  {buttonsComponent &&
                    buttonsComponent.buttons.map((button, index) => {
                      let hrefValue = button.url
                        ? replaceVariablesInText(button.url, formData, "button")
                        : `tel:${button.phone_number}`;

                      return (
                        // <a
                        //   key={index}
                        //   href={hrefValue}
                        //   title={hrefValue}
                        //   target="_blank"
                        //   rel="noopener noreferrer"
                        //   className="block px-4 py-2 text-center text-white bg-blue-400 rounded-md"
                        // >
                        //   {button.text}
                        // </a>
                        <button
                          key={index}
                          // href={hrefValue}
                          title={hrefValue}
                          // target="_blank"
                          // rel="noopener noreferrer"
                          className={`flex items-center justify-center px-4 py-2 text-sm rounded-md cursor-pointer ${getBtnCss(
                            button.type
                          )}`}
                        >
                          {getBtnIcon(button.type)}
                          {button.text}
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          )}

          {isCarousal && (
            <div className="flex flex-col gap-3 p-3 bg-white rounded-b-md ">
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

                  const bodyText = templateDataNew.components.find(
                    (comp) => comp.type === "BODY"
                  )?.text;

                  return (
                    <div
                      className="flex flex-col gap-3 p-3 bg-white rounded-b-md min-h-125"
                      key={index}
                    >
                      {fileData[index]?.filePath ? (
                        handlerType === "IMAGE" ? (
                          <div className="flex justify-center mb-2">
                            <img
                              src={fileData[index]?.filePath}
                              alt="Uploaded Preview"
                              className="object-contain w-full h-48 bg-center bg-no-repeat border border-gray-200 rounded-md"
                            />
                          </div>
                        ) : (
                          <iframe
                            src={fileData[index]?.filePath}
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
                        <pre className="border border-gray-200 rounded-md p-2 w-full  bg-gray-100  text-[0.85rem] text-gray-800 overflow-y-auto min-h-20 max-h-40 break-words text-wrap">
                          {finalMessage}
                        </pre>
                      )}
                      {messageBody && (
                        <pre className="border border-gray-200 rounded-md p-2 w-full bg-gray-100  text-[0.85rem] text-gray-800 overflow-auto text-wrap text-start min-h-10 max-h-40 break-words">
                          {messageBody}
                        </pre>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatsappLaunchPreview;
