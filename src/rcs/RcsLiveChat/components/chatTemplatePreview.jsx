import { fetchAllTemplates, fetchTemplateDetails } from "@/apis/rcs/rcs";
import React, { useEffect, useState } from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { FaExternalLinkAlt, FaReply } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { TbLocationShare } from "react-icons/tb";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ChatTemplatePreview = ({
  msg,
  agentSelectedTemplate,
  handleFetchTemplateswithAgentId,
}) => {
  const [data, setData] = useState({
    type: "text",
    isCarousal: false,
    details: [],
    btnData: [],
    replacedContent: "",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    handleFetchTemplateswithAgentId(msg?.agentId);
  }, [msg]);

  useEffect(() => {
    async function handleFetchTempDetails() {
      const name = JSON.parse(msg?.requestJson)?.contentMessage?.templateMessage
        ?.templateCode;
      const selectedTemplate = agentSelectedTemplate?.find(
        (temp) => temp.templateName === name
      );

      if (!selectedTemplate?.srno) return;
      const templateDetails = await fetchTemplateDetails(
        selectedTemplate?.srno
      );

      if (!Object.keys(templateDetails).length) return;

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

      let url = "";
      if (
        templateDetails[0]?.templateType === "text_message_with_pdf" &&
        templateDetails[0]["pdfBase64 "]
      ) {
        const base64PDF = templateDetails[0]["pdfBase64 "] || "";
        const byteCharacters = atob(base64PDF);
        const byteNumbers = Array.from(byteCharacters).map((c) =>
          c.charCodeAt(0)
        );
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });
        url = URL.createObjectURL(blob);
      }
      setData({
        type,
        isCarousal,
        details: templateDetails,
        btnData: buttonSuggestions,
        replacedContent,
        pdfUrl: url,
        ...templateDetails[0],
      });
    }

    handleFetchTempDetails();
  }, [agentSelectedTemplate]);

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
    <div>
      {!data.isCarousal ? (
        <div className="rounded-md border p-2 w-70 bg-[#E1F3FB]">
          {data.type !== "text" && (
            <div className="mb-2 w-full h-35">
              {data.type === "image" ? (
                <img
                  src={data?.details[0]?.imageUrl}
                  alt="Uploaded content"
                  className="h-full w-full"
                />
              ) : data?.type === "video" ? (
                <video
                  controls
                  src={data?.details[0]?.imageUrl}
                  className="w-full overflow-x-hidden"
                />
              ) : (
                <embed
                  src={data.pdfUrl}
                  type={"application/pdf"}
                  className="w-full overflow-x-hidden"
                />
              )}
            </div>
          )}
          <div className="overflow-y-scroll max-h-[250px] text-sm font-medium break-words whitespace-pre-wrap px-1 py-2">
            <p>{data?.replacedContent}</p>
          </div>
          {data?.details[0]?.suggestions?.length > 0 && (
            <div className="grid grid-cols-1 w-full max-w-[500px]">
              {data?.details[0]?.suggestions?.map((item, index) => {
                return (
                  <button
                    key={index}
                    title={item.suggestionValue}
                    className={`flex items-center justify-center border-b-2 border-[#128c7e] px-4 py-1.5 text-xs shadow-sm cursor-pointer rounded-lg w-full sm:w-auto bg-white text-[#128c7e] mb-1 ${getBtnStyle(
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
          className="w-70"
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
                  // onClickHandler();
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
                <div
                  key={index}
                  className="text-start p-2 bg-[#e1f3fb] rounded-md"
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.contentTitle}
                      className="h-30 p-1 rounded-xl"
                    />
                  )}
                  <p className="text-md text-start p-2">{item.contentTitle}</p>
                  <div className="overflow-y-scroll max-h-[150px]  p-1 break-words whitespace-pre-wrap rounded-md border min-h-[50px] text-sm">
                    <pre className="p-1 break-words whitespace-pre-wrap rounded-md">
                      {item.content}
                    </pre>
                  </div>
                  {item.suggestions && (
                    <div className="flex flex-wrap gap-2 flex-col w-full mt-2 mb-2 min-h-12">
                      {item.suggestions?.map((item, index) => (
                        <button
                          key={index}
                          title={item.suggestionValue}
                          className={`flex items-center w-full justify-center border-b-2 border-[#128c7e] px-4 py-2 text-xs shadow-sm cursor-pointer rounded-xl  bg-white text-[#128c7e] ${getBtnStyle(
                            item.type
                          )}`}
                        >
                          {getBtnIcon(item.type)}
                          <p className="ml-2">{item.suggestionTitle}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            );
          })}
        </Carousel>
      )}
    </div>
  );
};

export default ChatTemplatePreview;
