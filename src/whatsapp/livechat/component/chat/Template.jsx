import {
  getWabaList,
  getWabaTemplate,
  getWabaTemplateDetails,
} from "@/apis/whatsapp/whatsapp";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaReply } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";

export const TemplateMessagePreview = ({ template }) => {
  const isImage = template?.templateType === "image";
  const isVideo = template?.templateType === "video";
  const isDocument = template?.templateType === "document";
  const isText = template?.templateType === "text";

  const [isFetching, setIsFetching] = useState(false);


  const mediaPath = template?.mediaPath;

  const [tempDetails, setTempDetails] = useState(null);
  useEffect(() => {
    if (template) {
      handleFetchSpecificTemplate();
    }
  }, [template]);

  // useEffect(() => {
  //   console.log(tempDetails);
  // }, [tempDetails]);

  async function handleFetchSpecificTemplate() {
    const { wabaNumber, templateSrno, templateName } = template;

    try {
      setIsFetching(true);
      const wabaList = await getWabaList();
      const matchedWaba = wabaList?.find((w) => w.mobileNo === wabaNumber);

      const wabaAccountId = matchedWaba?.wabaAccountId;

      const templates = await getWabaTemplate(wabaAccountId, templateName);

      // const matchedTemplate = templates.find(
      //   (temp) => String(temp?.templateSrno) === String(templateSrno)
      // );
      // if (!matchedTemplate) {
      //   // return toast.error("Template not found.");
      //   return;
      // }
      // setTempDetails(matchedTemplate);
      setTempDetails(templates?.data[0]?.components);
    } catch (error) {
      console.error("Error fetching specific template:", error);
      toast.error("Something went wrong.");
    } finally {
      setIsFetching(false);
    }
  }

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

  function renderMediaTemplate() { }

  const ButtonsGroup = ({ buttons }) => {
    return (
      <div className="flex flex-col gap-2 w-full max-w-[500px] mt-2">
        {buttons.map(({ url, type, text, phone_number }, btnIndex) => (
          <button
            key={btnIndex}
            title={url || phone_number}
            className={`flex items-center justify-center px-4 py-2 text-sm cursor-pointer rounded-md w-full sm:w-auto ${getBtnCss(
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

  return isFetching ? (
    // <div>
    //   <p className="text-sm">(TemplateMessage)</p>
    //   {isImage && (
    //     <img
    //       src={mediaPath}
    //       alt={mediaPath}
    //       className={`h-40 w-auto select-none pointer-events-none border border-gray-200 rounded-md`}
    //     />
    //   )}
    //   {isVideo && (
    //     <video
    //       src={mediaPath}
    //       controls={true}
    //       autoPlay={false}
    //       className={`h-45 m-auto border border-gray-200 rounded-md bg-center bg-no-repeat`}
    //     />
    //   )}
    //   {isDocument && (
    //     <iframe
    //       src={mediaPath}
    //       allow=" encrypted-media"
    //       className={`h-48 border border-gray-200 rounded-md bg-center bg-no-repeat`}
    //     ></iframe>
    //   )}
    // </div>
    <div className="border border-gray-200 rounded-md w-90 p-5 bg-[#E1F3FB]">
      <p className="text-sm">(TemplateMessage)</p>
      <h1>Loading...</h1>
    </div>
  ) : (
    <>
      {tempDetails && (
        <div className="border border-gray-200 rounded-md w-90 p-3 bg-[#E1F3FB]">
          {tempDetails?.map((item, index) => {
            if (item?.type === "HEADER" && item?.format === "IMAGE") {
              return (
                <img
                  src={mediaPath}
                  alt={mediaPath}
                  loading="lazy"
                  key={index}
                  className={`h-50 w-auto select-none pointer-events-none border border-gray-200 rounded-md mr-auto ml-auto`}
                />
              );
            }
            if (item?.type === "HEADER" && item?.format === "VIDEO") {
              return (
                <video
                  src={mediaPath}
                  controls={true}
                  autoPlay={false}
                  key={index}
                  className={`h-45 m-auto border border-gray-200 rounded-md bg-center bg-no-repeat`}
                />
              );
            }
            if (item?.type === "HEADER" && item?.format === "DOCUMENT") {
              return (
                <iframe
                  src={mediaPath}
                  key={index}
                  allow=" encrypted-media"
                  className={`h-48 border border-gray-200 rounded-md bg-center bg-no-repeat`}
                ></iframe>
              );
            }
            if (item?.type === "BODY") {
              return <pre className="text-sm text-wrap " key={index}>{item?.text}</pre>;
            }
            if (item.type === "BUTTONS" && item?.buttons?.length > 0) {
              return <ButtonsGroup buttons={item?.buttons} key={index} />
            }
          })}
        </div>
      )}
    </>
  );
};
