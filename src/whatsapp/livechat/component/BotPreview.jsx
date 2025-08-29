import React, { useEffect, useState } from "react";
import { FaFileWord } from "react-icons/fa";
import { PiFilePdf, PiMicrosoftExcelLogo } from "react-icons/pi";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { IoVideocamOutline } from "react-icons/io5";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoIosList } from "react-icons/io";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import ListIcon from "@mui/icons-material/List";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { LuExternalLink } from "react-icons/lu";
import { BsFileEarmarkPdf } from "react-icons/bs";

const BotPreview = ({ template }) => {
    const [showDrawer, setShowDrawer] = useState(false);
    const toggleDrawer = () => setShowDrawer((prev) => !prev);
    const [selected, setSelected] = React.useState(null);
    useEffect(() => {
        if (!showDrawer) return;
        const { overflow } = document.body.style;
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = overflow);
    }, [showDrawer]);
    // selected = { sectionIndex, rowId }

    const handleSelect = (sectionIndex, row) => {
        const next = { sectionIndex, rowId: row.id ?? row.title };
        setSelected(next);
        onSelect?.(next, row);
    };

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
                <div className="p-1.5 bg-[#22577E] rounded-lg relative w-fit">
                    <div className="bg-white rounded-xl shadow-md w-[300px] overflow-hidden">
                        <div>
                            {botJson?.interactive?.header?.type === "image" && (
                                <img
                                    src={botJson?.interactive?.header?.image?.link}
                                    alt="Image preview"
                                    className="w-full h-58 object-cover rounded-md"
                                />
                            )}

                            {botJson?.interactive?.header?.type === "video" && (
                                <video
                                    src={botJson?.interactive?.header?.video?.link}
                                    controls
                                    className="w-full h-58 object-cover rounded-md"
                                />
                            )}

                            {botJson?.interactive?.header?.type === "document" && (
                                <div className="bg-gray-100 rounded-md flex items-center gap-3">
                                    <div className="h-auto bg-gray-100 m-2 rounded-md p-1 flex items-center gap-2">
                                        <div className="">
                                            <BsFileEarmarkPdf />
                                        </div>
                                        <div className="w-40">
                                            <h2 className="text-md font-medium text-gray-800">
                                                {botJson?.fileUrl?.name || "Document"}
                                            </h2>
                                            <p className="text-[10px] text-gray-300">.{fileType}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-4">
                            <p className="text-gray-900 text-wrap break-words text-sm font-semibold">
                                {botJson?.interactive?.body?.text}
                            </p>

                            <div className="flex items-center justify-between text-wrap break-words mt-1 text-xs text-gray-500">
                                <span>{botJson?.interactive?.footer?.text}</span>
                                {/* <span>12:37 PM</span> */}
                            </div>

                            <div className="mt-3 flex items-center justify-center border-t border-gray-200">
                                <button
                                    className="flex gap-1 items-center text-green-800 font-medium text-sm hover:underline mt-2"
                                    title={botJson?.interactive?.action?.parameters?.url}
                                >
                                    <LuExternalLink />
                                    {botJson?.interactive?.action?.parameters?.display_text}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="border p-2 space-y-2">
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
        </div> */}
            </>
        );
    }

    function renderList() {
        return (
            <>
                <div className=" bg-[#22577E] p-1.5 rounded-md w-fit relative">
                    <div className="bg-white rounded-xl shadow-md p-4 w-[300px]">
                        {/* Header text */}
                        <p className="text-sm text-black font-semibold mb-1">
                            {botJson?.interactive?.header?.text}
                        </p>
                        {/* Body text */}
                        <p className="text-sm break-words whitespace-pre-wrap text-wrap text-black mb-3 mt-4">
                            {botJson?.interactive?.body?.text}
                        </p>
                        {/* Footer */}
                        <div className="flex justify-between text-xs text-gray-600 relative">
                            <span>{botJson?.interactive?.footer?.text}</span>
                            {/* <span className="text-[10px]">9:13 AM</span> */}
                        </div>
                        {/* Divider */}
                        <div className="border-t border-gray-200 my-3" />
                        {/* Button */}
                        <div
                            className="text-green-600 flex items-center justify-center space-x-1 cursor-pointer text-sm relative"
                            onClick={toggleDrawer}
                        >
                            <ListIcon size={14} />
                            <span className="hover:underline">
                                {botJson?.interactive?.action?.button}
                            </span>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {showDrawer && (
                        <motion.div
                            key="backdrop"
                            className="absolute bottom-0 right-1/4 flex justify-center z-50 w-1/2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setShowDrawer(false)}
                        >
                            <div className=" bg-[#22577E] p-1.5 rounded-md w-full ">
                                <div className="bg-white rounded-xl shadow-md p-4 ">
                                    <div className="flex flex-col justify-center items-center mb-3">
                                        <p className="text-sm text-black font-semibold mb-1">
                                            {" "}
                                            {botJson?.interactive?.header?.text}
                                        </p>
                                    </div>
                                    <div className="absolute top-5 right-5">
                                        <RxCross2 />
                                    </div>
                                    {botJson?.interactive?.action?.sections?.map(
                                        (section, sIdx) => (
                                            <div
                                                key={sIdx}
                                                className="w-full mt-3 border-t border-gray-200"
                                            >
                                                {section?.rows?.map((row, rIdx) => {
                                                    const rowKey =
                                                        row.id ?? `${sIdx}-${rIdx}-${row.title}`;
                                                    const isActive =
                                                        selected?.sectionIndex === sIdx &&
                                                        selected?.rowId === (row.id ?? row.title);

                                                    return (
                                                        <button
                                                            key={rowKey}
                                                            type="button"
                                                            onClick={() => handleSelect(sIdx, row)}
                                                            className="relative w-full text-left"
                                                        >
                                                            <div className="flex flex-col gap-0.5 pr-10 py-3">
                                                                <p className="text-sm text-black font-medium break-words whitespace-pre-wrap">
                                                                    {row?.title}
                                                                </p>
                                                                {row?.description ? (
                                                                    <span className="text-xs text-gray-500 font-medium break-words whitespace-pre-wrap">
                                                                        {row?.description}
                                                                    </span>
                                                                ) : null}
                                                            </div>

                                                            {/* Radio indicator on the right */}
                                                            <span
                                                                className={`absolute top-1/2 -translate-y-1/2 right-3 inline-flex items-center justify-center h-4 w-4 rounded-full border 
                                  ${isActive ? "border-blue-600" : "border-gray-400"}`}
                                                                aria-hidden
                                                            >
                                                                {isActive && (
                                                                    <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                                                                )}
                                                            </span>

                                                            {/* Row divider */}
                                                            <span className="absolute bottom-0 left-0 right-0 h-px bg-gray-200" />
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )
                                    )}

                                    {/* {node?.options?.map((section, index) => (
                <div key={index} >
                  <div className="flex gap-2">
                    <p>Title: {section?.option}</p>
                    <p>Description: {section?.value}</p>
                  </div>
                </div>
              ))} */}

                                    <div className="flex flex-col justify-center items-center border-t border-gray-200">
                                        <button className="text-sm text-gray-500 font-medium mt-2">
                                            Tap an item to select it{" "}
                                        </button>
                                        <div className="border-2 border-black w-20  rounded-md mt-4" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* <div className="text-sm">
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
                <div key={index}>
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
        </div> */}
            </>
        );
    }

    function renderText() {
        return (
            <div className="text-sm max-w-[250px]">
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
            <>
                <div className=" bg-[#22577E] p-1.5 rounded-md w-fit">
                    <div className="bg-white rounded-xl shadow-md p-4 w-[300px] ">
                        {/* <div className="relative">
            {node?.type === "image" && (
              <img
                src={mediaUrl}
                alt="Image preview"
                className="w-full h-58 object-cover rounded-md"
              />
            )}

            {node?.type === "video" && (
              <video
                src={mediaUrl}
                controls
                className="w-full h-58 object-cover rounded-md"
              />
            )}

            {node?.type === "text" && (
              <div className="p-2 bg-gray-50 rounded text-sm text-black border mt-2">
                {node?.text || "No Text Provided"}
              </div>
            )}

            {node?.type === "document" && (
              <div className="bg-gray-100 rounded-md flex items-center gap-3">
                <div className='h-auto bg-gray-100 m-2 rounded-md p-1 flex items-center gap-2'>
                  <div className=''>
                    <BsFileEarmarkPdf />
                  </div>
                  <div className='w-40'>
                    <h2 className='text-md font-medium text-gray-800'>{node?.fileUrl?.name || "Document"}</h2>
                    
                  </div>
                </div>
              </div>
            )}
          </div> */}

                        <div className="relative">
                            <p className="font-bold">{botJson?.interactive?.header?.text}</p>
                        </div>

                        <div className="">
                            <p className="text-sm text-wrap break-words text-black">
                                {botJson?.interactive?.body?.text}
                            </p>
                        </div>

                        <div className="">
                            <p className="text-xs text-wrap break-words text-gray-400 mt-2">
                                {botJson?.interactive?.footer?.text}
                            </p>
                        </div>
                        {/* <div class=" text-right text-xs text-gray-500 mt-1">2:25PM </div> */}
                        <div className="border-t border-gray-200 mt-1 w-full " />
                        <div className="flex flex-col justify-center items-center gap-4">
                            {botJson?.interactive?.action?.buttons?.map((button, index) => (
                                <div key={index}>
                                    <div className="">
                                        <ReplyOutlinedIcon className="text-green-600" />{" "}
                                        <span className="text-green-600 text-sm">
                                            {button?.reply.title}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* <div className="text-sm">
          <div className="border p-2 space-y-2 w-50">
            <p className="font-bold">
              {botJson?.interactive?.header?.text || "No Heading"}
            </p>
            <p>{botJson?.interactive?.body?.text || "No Body"}</p>
            <p className="text-sm">
              {botJson?.interactive?.footer?.text || "No Footer"}
            </p> */}
                {/* <div className="flex items-center justify-center text-green-500 text-sm space-x-2">
          <IoIosList />
          <p>{botJson?.interactive?.action?.button || "No Btn"}</p>
            </div> */}

                {/* <div className="space-y-2 text-sm">
              <p className="underline">Button Reply Actions</p>
              {botJson?.interactive?.action?.buttons?.map((button, index) => (
                <div key={index}>
                  <div className="flex gap-2">
                    <p>Title: {button?.reply.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
            </>
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
