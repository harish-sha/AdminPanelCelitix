import React from "react";
import { WhatsApp } from "@mui/icons-material";
import { FaReply } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaLinkSlash } from "react-icons/fa6";

import whatsappImg from "../../../assets/images/whatsappdummy.webp";

const replaceVariablesInText = (text, variables, type = "body") => {
  return text.replace(
    /{{(\d+)}}/g,
    (_, key) => variables[`${type}${key}`] || `{{${key}}}`
  );
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

const WhatsappLaunchPreview = ({
  templateDataNew,
  formData,
  uploadedImage,
}) => {
  if (!templateDataNew || !templateDataNew.components) {
    return (
      <div className="p-3 rounded-xl flex items-center justify-center h-full  bg-gray-200">
        <div className="w-full bg-gray-100 h-full flex items-center justify-center rounded-lg shadow-md">
          <div className="rounded-xl shadow-md  transition-all ease-in duration-300 w-100">
            <div className="flex items-center justify-between bg-[#128C7E] text-white px-4 py-2 rounded-t-md">
              <h2 className="text-md font-medium tracking-wide">
                Template Preview
              </h2>
              <p className="text-sm">
                <WhatsApp />
              </p>
            </div>
            <div className="bg-white rounded-b-md p-3 flex flex-col gap-3">
              <img
                src={whatsappImg}
                alt="whatsapp-dummy-image"
                className="w-full h-48 object-cover rounded-md bg-center bg-no-repeat border border-gray-200"
              />
              <div className="border border-gray-300 rounded-md p-2 h-30 flex items-center justify-center w-full bg-gray-100 text-center text-sm">
                No template selected
              </div>
              <div className="flex flex-col gap-2">
                <button className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md ">
                  <BsTelephoneFill className="mr-2" />
                  Contact us
                </button>
                <button className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md ">
                  <FaExternalLinkAlt className="mr-2" />
                  Visit us
                </button>
                <button className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm w-full">
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
      ["IMAGE", "VIDEO", "DOCUMENT"].includes(comp.format)
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

  return (
    <div className="p-3 rounded-xl flex  items-center justify-center h-full  bg-gray-200">
      <div className="w-full bg-gray-100 h-full flex items-center  justify-center rounded-lg shadow-md transition-all">
        <div className="rounded-xl shadow-md  transition-all ease-in duration-300 w-100 ">
          <div className="flex items-center justify-between bg-[#128C7E] text-white px-4 py-2 rounded-t-md">
            <h2 className="text-md font-medium tracking-wide">
              Template Preview
            </h2>
            <p className="text-sm">
              <WhatsApp />
            </p>
          </div>

          <div className="bg-white rounded-b-md p-3 flex flex-col gap-3">
            {uploadedImage ? (
              headerComponent.format === "IMAGE" ? (
                <div className="mb-2 flex justify-center">
                  <img
                    src={uploadedImage}
                    alt="Uploaded Preview"
                    className="w-full h-48 object-contain border border-gray-200 rounded-md bg-center bg-no-repeat"
                  />
                </div>
              ) : (
                <iframe
                  src={uploadedImage}
                  alt="Uploaded Preview"
                  className="w-full h-48 object-contain border border-gray-200 rounded-md bg-center bg-no-repeat"
                  frameborder="0"
                ></iframe>
              )
            ) : headerComponent?.format === "IMAGE" ? (
              headerComponent?.example?.header_handle?.[0] && (
                <div className="mb-2 flex justify-center">
                  <img
                    src={headerComponent?.example?.header_handle[0]}
                    // src={whatsappImg}
                    alt="Template Preview"
                    className="w-full h-48 object-contain rounded-md border border-gray-200  bg-center bg-no-repeat"
                  />
                </div>
              )
            ) : (
              <div className="mb-2 flex justify-center">
                <iframe
                  src={headerComponent?.example.header_handle[0]}
                  // src={whatsappImg}
                  alt="Template Preview"
                  className="w-full h-48 object-contain rounded-md border border-gray-200  bg-center bg-no-repeat"
                ></iframe>
              </div>
            )}

            {bodyComponent && (
              <div className="border border-gray-200 rounded-md p-2 w-full bg-gray-100  text-[0.85rem] text-gray-800 overflow-auto min-h-20 max-h-40 break-words">
                {finalMessage}
              </div>
            )}

            {/* {buttonsComponent && buttonsComponent.buttons.length > 0 && (
              <div className="mt-1 flex flex-col gap-2">
                {buttonsComponent &&
                  buttonsComponent.buttons.map((button, index) => {
                    let hrefValue = button.url
                      ? replaceVariablesInText(button.url, formData, "button")
                      : `tel:${button.phone_number}`;

                    return (
                      <a
                        key={index}
                        href={hrefValue}
                        title={hrefValue}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-400 text-white py-2 px-4 rounded-md text-center block"
                      >
                        {button.text}
                      </a>
                    );
                  })}
              </div>
            )} */}

            {buttonsComponent && buttonsComponent.buttons.length > 0 && (
              <div className="mt-1 flex flex-col gap-2">
                {buttonsComponent.buttons.map((button, index) => {
                  const hrefValue = button.url
                    ? replaceVariablesInText(button.url, formData, "button")
                    : `tel:${button.phone_number}`;

                  return (
                    <a
                      key={index}
                      href={hrefValue}
                      title={getBtnTitle(
                        button.type,
                        button.phone_number,
                        button.url,
                        button.text
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`py-2 px-4 rounded-md text-center flex items-center justify-center gap-2 ${getBtnCss(
                        button.type
                      )}`}
                    >
                      {getBtnIcon(button.type)}
                      {button.text}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsappLaunchPreview;
