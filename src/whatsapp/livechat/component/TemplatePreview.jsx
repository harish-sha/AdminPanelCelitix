import { WhatsApp } from "@mui/icons-material";
import { FaReply } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";

export const TemplatePreview = ({
  tempDetails,
  messageType,
  sendmessageData,
}) => {
  console.log(tempDetails);
  const getBtnStyle = (type) => {
    switch (type) {
      case "QUICK_REPLY":
        return "bg-gray-200 text-gray-800";
      case "URL":
        return "bg-green-500 text-white";
      case "PHONE_NUMBER":
        return "bg-blue-500 text-white";
      default:
        return "";
    }
  };

  const getBtnIcon = (type) => {
    switch (type) {
      case "QUICK_REPLY":
        return <FaReply />;
      case "URL":
        return <FaExternalLinkAlt />;
      case "PHONE_NUMBER":
        return <BsTelephoneFill />;

      default:
        return "";
    }
  };

  const tempTypes = ["IMAGE", "VIDEO", "DOCUMENT"];
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

          <div className="flex flex-col h-full gap-4 p-4 bg-white rounded-b-xl">
            {messageType === "text" ? (
              <>{sendmessageData?.message}</>
            ) : (
              tempDetails?.components?.map(
                ({ type, text, buttons, format, example }, index) => (
                  <div key={index} className="flex flex-col w-full gap-3">
                    {type === "HEADER" &&
                      tempTypes.includes(format) &&
                      (format === "image" ? (
                        <img
                          src={example?.header_handle?.[0]}
                          alt="Template Image"
                          className="object-contain w-10 h-10 bg-white border border-blue-500 rounded-md"
                        />
                      ) : (
                        <div className="w-full h-[20.5rem]">
                          <iframe
                            src={example.header_handle[0]}
                            width="100%"
                            height="100%"
                            className="border border-blue-500 border-none rounded-md"
                            allowFullScreen
                            loading="lazy"
                          />
                        </div>
                      ))}

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
                )
              )
            )}

            {/* IMAGE PREVIEW SECTION */}
            {/* 
      {uploadedImage ? (
        <div className="flex justify-center mb-2">
          <img
            src={uploadedImage}
            alt="Uploaded Preview"
            className="object-contain w-full h-48 bg-center bg-no-repeat border border-gray-200 rounded-md"
          />
        </div>
      ) : (
        headerComponent?.example?.header_handle?.[0] && (
          <div className="flex justify-center mb-2">
            <img
              src={headerComponent.example.header_handle[0]}
              // src={whatsappImg}
              alt="Template Preview"
              className="object-contain w-full h-48 bg-center bg-no-repeat border border-gray-200 rounded-md"
            />
          </div>
        )
      )}
    */}

            {/* BODY TEXT SECTION */}
            {/* 
      {bodyComponent && (
        <div className="border border-gray-200 rounded-md p-2 w-full bg-gray-100 text-[0.85rem] text-gray-800 overflow-auto min-h-20 max-h-40 break-words">
          {finalMessage}
        </div>
      )}
    */}

            {/* BUTTONS SECTION */}
            {/* 
      {buttonsComponent && buttonsComponent.buttons.length > 0 && (
        <div className="flex flex-col gap-2 mt-1">
          {buttonsComponent.buttons.map((button, index) => {
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
                className="block px-4 py-2 text-center text-white bg-blue-400 rounded-md"
              >
                {button.text}
              </a>
            );
          })}
        </div>
      )}
    */}
          </div>
        </div>
      </div>
    </div>
  );
};
