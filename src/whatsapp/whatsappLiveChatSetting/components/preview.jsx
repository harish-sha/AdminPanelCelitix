import { WhatsApp } from "@mui/icons-material";

export const Preview = ({ specificTemplate, variablesData, basicDetails }) => {
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
  return (
    <div className="p-3 bg-gray-200 rounded-xl overflow-hidden">
      <div className="w-full h-full transition-all bg-gray-100 rounded-lg shadow-md">
        <div className="max-w-2xl mx-auto transition-all duration-300 ease-in shadow-md w-100 rounded-xl">
          <div className="flex items-center justify-between bg-[#128C7E] text-white px-4 py-3 rounded-t-xl">
            <h2 className="font-medium tracking-wide text-md">
              Template Preview
            </h2>
            <WhatsApp />
          </div>

          {specificTemplate && (
            <div className="space-y-3 p-2">
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
                <pre>{specificTemplate.message}</pre>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
