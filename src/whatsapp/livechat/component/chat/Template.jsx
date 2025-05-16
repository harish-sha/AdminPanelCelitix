import {
  getWabaList,
  getWabaTemplate,
  getWabaTemplateDetails,
} from "@/apis/whatsapp/whatsapp";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const TemplateMessagePreview = ({ template }) => {
  const isImage = template?.templateType === "image";
  const isVideo = template?.templateType === "video";
  const isDocument = template?.templateType === "document";
  const isText = template?.templateType === "text";

  const mediaPath = template?.mediaPath;

  const [tempDetails, setTempDetails] = useState(null);
  useEffect(() => {
    if (template) {
      handleFetchSpecificTemplate();
    }
  }, [template]);

  useEffect(() => {
    console.log(tempDetails);
  }, [tempDetails]);

  async function handleFetchSpecificTemplate() {
    const { wabaNumber, templateSrno, templateName } = template;

    try {
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
    }
  }

  function renderMediaTemplate() {}

  return (
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
    <>
      <p className="text-sm">(TemplateMessage)</p>
      {tempDetails && (
        <div className="border border-gray-200 rounded-md w-90 p-5 ">
          {tempDetails?.map((item, index) => {
            if (item?.type === "HEADER" && item?.format === "IMAGE") {
              return (
                <img
                  src={mediaPath}
                  alt={mediaPath}
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
                  className={`h-45 m-auto border border-gray-200 rounded-md bg-center bg-no-repeat`}
                />
              );
            }
            if (item?.type === "HEADER" && item?.format === "DOCUMENT") {
              return (
                <iframe
                  src={mediaPath}
                  allow=" encrypted-media"
                  className={`h-48 border border-gray-200 rounded-md bg-center bg-no-repeat`}
                ></iframe>
              );
            }
            if (item?.type === "BODY") {
              return <p key={index}>{item?.text}</p>;
            }
          })}
        </div>
      )}
    </>
  );
};
