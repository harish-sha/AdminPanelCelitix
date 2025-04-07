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

                    <div className="flex flex-col gap-3 p-3 bg-white rounded-b-md">
                        {messageType === "text" ? (
                            <>{sendmessageData?.message}</>
                        ) : (
                            tempDetails?.components?.map(({ type, text, buttons }, index) => (
                                <div key={index} className="flex">
                                    {type === "BODY" && <div>{text}</div>}
                                    {type === "BUTTONS" && buttons?.length > 0 && (
                                        <div className="flex gap-2 w-full max-w-[500px] mt-5 flex-col">
                                            {buttons.map(({ url, type, text }, btnIndex) => (
                                                <button
                                                    key={btnIndex}
                                                    title={url}
                                                    className={`flex items-center justify-center px-4 py-2 text-sm rounded-md w-full sm:w-auto ${getBtnStyle(
                                                        type
                                                    )}`}
                                                >
                                                    {getBtnIcon(type)}
                                                    <p className="ml-2">{text}</p>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}

                        {/* {uploadedImage ? (
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
            )} */}

                        {/* {bodyComponent && (
              <div className="border border-gray-200 rounded-md p-2 w-full bg-gray-100  text-[0.85rem] text-gray-800 overflow-auto min-h-20 max-h-40 break-words">
                {finalMessage}
              </div>
            )} */}

                        {/* {buttonsComponent && buttonsComponent.buttons.length > 0 && (
              <div className="flex flex-col gap-2 mt-1">
                {buttonsComponent && buttonsComponent.buttons.map((button, index) => {
                  let hrefValue = button.url ? replaceVariablesInText(button.url, formData, "button") : `tel:${button.phone_number}`;

                  return (
                    <a key={index} href={hrefValue} title={hrefValue} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-center text-white bg-blue-400 rounded-md">
                      {button.text}
                    </a>
                  );
                })}
              </div>
            )} */}
                    </div>
                </div>
            </div>
        </div>
    );
};