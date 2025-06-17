import React, { useEffect } from "react";
import { FaFileWord } from "react-icons/fa";
import { PiFilePdf, PiMicrosoftExcelLogo } from "react-icons/pi";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { IoVideocamOutline } from "react-icons/io5";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoIosList } from "react-icons/io";

const BotPreview = ({ template }) => {
  //   const [data, setData] = React.useState([]);
  //   useEffect(() => {
  //     const botJson = JSON.parse(template?.requestJson || "{}");
  //     const type = botJson?.interactive?.type;
  //     const mediaType = botJson?.interactive?.header?.type;
  //     const mediaUrl = botJson?.interactive?.header?.[mediaType]?.link;
  //     let fileType = null;

  //     // mediaUrl?.link &&
  //     //   (fileType = mediaUrl?.link?.split(".")?.pop()?.split(/\#|\?/)[0]);

  //     if (mediaUrl && typeof mediaUrl === "string") {
  //       fileType = mediaUrl?.split(".")?.pop()?.split(/\#|\?/)[0];
  //     console.log(typeof mediaUrl)
  //     }

  //     console.log(mediaUrl);
  //   }, [template]);

  const botJson = JSON.parse(template?.requestJson || "{}");
  const type = botJson?.interactive?.type;
  const mediaType = botJson?.interactive?.header?.type;
  const mediaUrl = botJson?.interactive?.header?.[mediaType]?.link;
  let fileType = null;

  // mediaUrl?.link &&
  //   (fileType = mediaUrl?.link?.split(".")?.pop()?.split(/\#|\?/)[0]);

  if (mediaUrl && typeof mediaUrl === "string") {
    fileType = mediaUrl?.split(".")?.pop()?.split(/\#|\?/)[0];
  }

  function getFileType(extension) {
    switch (extension) {
      case "xlsx":
        return <PiMicrosoftExcelLogo size={25} />;
      case "csv":
        return <PiMicrosoftExcelLogo size={25} />;
      case "docx":
        return <FaFileWord size={25} />;
      case "pdf":
        return <PiFilePdf size={25} />;
      case "mp4":
        return <IoVideocamOutline size={25} />;
      default:
        return <InsertDriveFileIcon size={25} />;
    }
  }

  // {
  //   "recipient_type": "individual",
  //   "messaging_product": "whatsapp",
  //   "interactive": {
  //     "footer": {
  //       "text": "this is footer"
  //     },
  //     "action": {
  //       "button": "list footer testing",
  //       "sections": [
  //         {
  //           "rows": [
  //             {
  //               "description": "1",
  //               "id": 1,
  //               "title": "1"
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     "header": {
  //       "text": "list footer testing",
  //       "type": "text"
  //     },
  //     "body": {
  //       "text": "list footer testing"
  //     },
  //     "type": "list"
  //   },
  //   "to": "919672670732",
  //   "type": "interactive"
  // }

  function renderCTABtn() {
    return (
      <>
        <h1>CTA BTN</h1>
        <div className="border p-2 space-y-2">
          <div className="bg-[#e1f3fb] text-black p-4 rounded-2xl shadow-md max-w-xs flex items-center gap-3">
            <div className="bg-white p-3 rounded-full shadow-inner text-blue-500">
              {getFileType(fileType)}
            </div>
            <div className="flex flex-col">
              <div className="font-medium truncate max-w-[10rem">
                {"Untitled Document"}
              </div>
              <div className="text-xs text-gray-500 uppercase">.{fileType}</div>
            </div>
          </div>

          <p>{botJson?.footer?.text || "No Footer"}</p>
          <div className="flex items-center justify-center text-green-500 text-sm space-x-2">
            <FaExternalLinkAlt />
            <p>{botJson?.action?.parameters?.url || "No URL"}</p>
          </div>
        </div>
      </>
    );
  }

  function renderList() {
    return (
      <div className="text-sm">
        Hello lisyt
        <div className="border p-2 space-y-2 w-50">
          <p className="font-bold">
            {botJson?.interactive?.header?.text || "No Heading"}
          </p>
          <p>{botJson?.interactive?.body?.text || "No Body"}</p>
          <p className="text-sm">
            {botJson?.interactive?.footer?.text || "No Footer"}
          </p>
          <div className="flex items-center justify-center text-green-500 text-sm space-x-2">
            <IoIosList />
            <p>{botJson?.interactive?.action?.button || "No Btn"}</p>
          </div>

          <div className="space-y-2 text-sm">
            <p className="underline">List Rows</p>
            {botJson?.interactive?.action?.sections?.map((section) => (
              <div>
                {section?.rows?.map((row) => (
                  <div className="flex gap-2">
                    <p>Title: {row?.title}</p>
                    <p>Description: {row?.description}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {type === "cta_url" && renderCTABtn()}
      {type === "list" && renderList()}
    </>
  );
  //   return <h1>Bot Preview</h1>;
};

export default BotPreview;
