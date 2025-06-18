import React, { useEffect } from "react";
import { FaFileWord } from "react-icons/fa";
import { PiFilePdf, PiMicrosoftExcelLogo } from "react-icons/pi";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { IoVideocamOutline } from "react-icons/io5";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoIosList } from "react-icons/io";

const BotPreview = ({ template }) => {

    const botJson = JSON.parse(template?.requestJson || "{}");
    const type = botJson?.interactive?.type;
    const mediaType = botJson?.interactive?.header?.type;
    const mediaUrl = botJson?.interactive?.header?.[mediaType]?.link;
    let fileType = null;

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

    function renderCTABtn() {
        return (
            <>

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
                        {botJson?.interactive?.action?.sections?.map((section, index) => (
                            <div key={index} >
                                {
                                    section?.rows?.map((row) => (
                                        <div className="flex gap-2">
                                            <p>Title: {row?.title}</p>
                                            <p>Description: {row?.description}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        );
    }

    function renderText() {
        return (
            <div className="text-sm">
                <p className="w-full whitespace-pre-wrap break-words p-3 rounded-2xl text-sm shadow-sm  bg-[#5584AC] text-white rounded-bl-none">
                    {template?.messageBody}
                </p>
            </div>
        );
    }

    //   {
    //   "recipient_type": "individual",
    //   "messaging_product": "whatsapp",
    //   "interactive": {
    //     "footer": {
    //       "text": "Hii, I am Btn Footer"
    //     },
    //     "action": {
    //       "buttons": [
    //         {
    //           "reply": {
    //             "id": 1,
    //             "title": "1"
    //           },
    //           "type": "reply"
    //         },
    //         {
    //           "reply": {
    //             "id": 2,
    //             "title": "2"
    //           },
    //           "type": "reply"
    //         }
    //       ]
    //     },
    //     "body": {
    //       "text": "Hii, I am Btn"
    //     },
    //     "type": "button"
    //   },
    //   "to": "917491079208",
    //   "type": "interactive"
    // }

    function renderBtn() {
        return (
            <div className="text-sm">
                Hello BTN
                <div className="border p-2 space-y-2 w-50">
                    <p className="font-bold">
                        {botJson?.interactive?.header?.text || "No Heading"}
                    </p>
                    <p>{botJson?.interactive?.body?.text || "No Body"}</p>
                    <p className="text-sm">
                        {botJson?.interactive?.footer?.text || "No Footer"}
                    </p>
                    {/* <div className="flex items-center justify-center text-green-500 text-sm space-x-2">
          <IoIosList />
          <p>{botJson?.interactive?.action?.button || "No Btn"}</p>
        </div> */}

                    <div className="space-y-2 text-sm">
                        <p className="underline">Button Reply Actions</p>
                        {botJson?.interactive?.action?.buttons?.map((button, index) => (
                            <div key={index} >
                                <div className="flex gap-2">
                                    <p>Title: {button?.reply.title}</p>
                                </div>
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
            {type === "button" && renderBtn()}
            {template?.messageBody && renderText()}
        </>
    );
    //   return <h1>Bot Preview</h1>;
};

export default BotPreview;