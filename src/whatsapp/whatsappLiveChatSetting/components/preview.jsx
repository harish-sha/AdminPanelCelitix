import { WhatsApp } from "@mui/icons-material";
import { BsTelephoneFill } from "react-icons/bs";
import { TbLocationShare } from "react-icons/tb";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaReply } from "react-icons/fa6";

export const Preview = ({ specificTemplate, variablesData, basicDetails }) => {
  const getBtnIcon = (type) => {
    switch (type) {
      case "phoneDisplay":
        return <BsTelephoneFill className="mr-2" />;
      case "replyButtons":
        return <FaReply className="mr-2" />;
      default:
        return <FaExternalLinkAlt className="mr-2" />;
    }
  };

  const getBtnCss = (type) => {
    switch (type) {
      case "phoneDisplay":
        return "bg-blue-500 text-white";
      case "replyButtons":
        return "text-gray-800 bg-gray-200";
      default:
        return "bg-green-500 text-white";
    }
  };

  const getBtnTitle = (type, phone, url, text) => {
    switch (type) {
      case "phoneDisplay":
        return `Contact us: ${phone}`;
      case "replyButtons":
        return `View more: ${text}`;
      default:
        return `Visit us: ${url}`;
    }
  };

  const MediaRenderer = ({ format, fileUrl, fallbackUrl }) => {
    if (format === "image") {
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
    if (format === "video") {
      return (
        <div className="w-[10rem] m-auto">
          <video
            src={fileUrl || fallbackUrl}
            alt="Template"
            className="object-contain"
            controls={true}
          />
        </div>
      );
    }
    if (format === "document") {
      return (
        <div className="w-full">
          <iframe
            src={fileUrl || fallbackUrl}
            alt="Template"
            className="object-contain"
          />
        </div>
      );
    }
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

  const isCarousal = false;

  const title =
    specificTemplate?.urlValue || specificTemplate?.phoneValue || "";
  const type = specificTemplate?.urlDisplay || specificTemplate?.phoneDisplay;
  const text = specificTemplate?.urlDisplay || specificTemplate?.phoneDisplay;
  return (
 
   
        <div className="transition-all duration-300 ease-in shadow-md rounded-xl">
          <div className="flex items-center justify-between bg-[#128C7E] text-white px-2 py-3 rounded-t-xl">
            <h2 className="font-medium tracking-wide text-md">
              Template Preview
            </h2>
            <WhatsApp />
          </div>

          {specificTemplate && (
            <div className="space-y-3 p-2 w-full bg-gray-100">
              <div>
                {["image", "video", "document"].includes(
                  specificTemplate.templateType
                ) && (
                  <MediaRenderer
                    format={specificTemplate.templateType}
                    fallbackUrl={specificTemplate.media_path}
                    fileUrl={basicDetails.mediaPath}
                  />
                )}
              </div>

              {specificTemplate?.message && (
                <pre className="whitespace-pre-wrap">
                  {specificTemplate.message}
                </pre>
              )}

              <div className="w-full space-y-2 p-2">
                {specificTemplate?.urlDisplay && (
                  <button
                    title={specificTemplate?.urlValue}
                    className={`flex items-center justify-center px-4 py-2 text-sm rounded-md w-full  ${getBtnCss(
                      type
                    )}`}
                  >
                    {getBtnIcon(specificTemplate?.urlDisplay)}
                    <p className="ml-2">{specificTemplate?.urlDisplay}</p>
                  </button>
                )}
                {specificTemplate?.phoneDisplay && (
                  <button
                    title={specificTemplate?.phoneValue || ""}
                    className={`flex items-center justify-center px-4 py-2 text-sm rounded-md w-full ${getBtnCss(
                      "phoneDisplay"
                    )}`}
                  >
                    {getBtnIcon("phoneDisplay")}
                    <p className="ml-2">{specificTemplate?.phoneDisplay}</p>
                  </button>
                )}
                {specificTemplate?.replyButtons &&
                  specificTemplate?.replyButtons.length > 0 &&
                  specificTemplate?.replyButtons.map((btn, index) => (
                    <button
                      key={index}
                      title={btn || ""}
                      className={`flex items-center justify-center px-4 py-2 text-sm rounded-md w-full  ${getBtnCss(
                        "replyButtons"
                      )}`}
                    >
                      {getBtnIcon("replyButtons")}
                      <p className="ml-2">{btn}</p>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
   
  );
};
