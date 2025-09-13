

// PreviewDrawer.jsx
import React, { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { PiShareFatFill } from "react-icons/pi";
import { FaFileWord } from "react-icons/fa";
import { PiFilePdf, PiMicrosoftExcelLogo } from "react-icons/pi";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { IoVideocamOutline } from "react-icons/io5";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoIosList } from "react-icons/io";
import { FiSend } from "react-icons/fi";
import { BsFileEarmarkPdf } from "react-icons/bs";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { LuExternalLink } from "react-icons/lu";
import ListIcon from "@mui/icons-material/List";

import { WhatsApp } from "@mui/icons-material";
import { FaReply } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { getWabaTemplateDetails } from "@/apis/whatsapp/whatsapp";

export default function PreviewDrawer({
  open,
  onClose,
  title = "Preview",
  phone = "+91 98765 43210",
  label = "View options",
  width = 360,
  id,
  nodesInputData,
  type,
  details,
}) {
  // List to manage drawer state
  const [showDrawer, setShowDrawer] = useState(false);
  const toggleDrawer = () => setShowDrawer((prev) => !prev);
  // List to manage drawer state

  const name = details?.waba?.find(
    (p) => p.mobileNo == details?.selected
  )?.name;

  const [data, setData] = useState({});
  const [waba, setWaba] = useState(null);
  const [allTemplates, setAllTemplates] = useState(null);
  const [templateDetails, setTemplateDetails] = useState(null);

  useEffect(() => {
    setData(nodesInputData);
  }, [nodesInputData]);

  // useEffect(() => {
  //   async function handleTemplate() {
  //     if (type !== "template") return
  //     const allTemplates = await getWabaTemplateDetails(details?.selected)
  //     if (!data[id]) return
  //     const node = data[id]
  //     const json = JSON.parse(node?.json)?.template
  //     console.log("node", json)
  //     setAllTemplates(allTemplates)
  //   }
  //   handleTemplate()
  // }, [details])

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

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

  const getBtnCss = (type) => {
    switch (type) {
      case "PHONE_NUMBER":
        return "bg-blue-500 text-white";
      case "QUICK_REPLY":
        return "text-gray-800 bg-gray-200";
      case "FLOW":
        return "text-white bg-gray-400";
      default:
        return "bg-green-500 text-white";
    }
  };
  const tempTypes = ["IMAGE", "VIDEO", "DOCUMENT", "CAROUSEL"];
  const getBtnTitle = (type, phone, url, text) => {
    switch (type) {
      case "PHONE_NUMBER":
        return `Contact us: ${phone}`;
      case "QUICK_REPLY":
        return `View more: ${text}`;
      case "FLOW":
        return `${text}`;
      default:
        return `Visit us: ${url}`;
    }
  };

  const getBtnIcon = (type) => {
    switch (type) {
      case "PHONE_NUMBER":
        return <BsTelephoneFill className="mr-2" />;
      case "QUICK_REPLY":
        return <FaReply className="mr-2" />;
      case "FLOW":
        return <AssignmentOutlinedIcon className="mr-2" />;
      default:
        return <FaExternalLinkAlt className="mr-2" />;
    }
  };

  // Text - message body formatter
  function formatMessageBody(text) {
    if (!text) return "";

    // Bold -> *text*
    let formatted = text.replace(/\*(.*?)\*/g, "<strong>$1</strong>");

    // Italic -> _text_
    formatted = formatted.replace(/_(.*?)_/g, "<em>$1</em>");

    // Strikethrough -> ~text~
    formatted = formatted.replace(/~(.*?)~/g, "<del>$1</del>");

    return formatted;
  }

  function renderStartBtn() {
    if (!data[id]) return;

    const node = nodesInputData[id];

    return (
      <>
        {/* <div className="flex flex-col h-full justify-end gap-2 p-4">
  
          <div className="flex justify-start">
            <span className="relative bg-[#DCF8C6] text-black px-4 py-2 rounded-xl max-w-[80%] break-words shadow-sm">
              Hello! This is a sample bubble message. It wraps nicely and looks clean.
              <span className="absolute left-3 top-full w-0 h-0 border-t-[10px] border-t-[#DCF8C6] border-l-[10px] border-l-transparent"></span>
            </span>
          </div>

        
          <div className="flex items-center justify-between bg-white border rounded-xl px-3 py-2 shadow-sm w-full text-[#0B63A2]">
            <div className="w-full text-sm break-words pr-2">
              {node?.startingKeyword || "Starting Keyword"}
            </div>
            <FiSend className="text-xl min-w-[24px] cursor-pointer" />
          </div>
        </div> */}

        <div className="flex flex-col h-full justify-end gap-2">
          <div className="flex justify-center">
            <span className="relative bg-[#DCF8C6] text-black px-4 py-2 rounded-xl max-w-[85%] break-words text-xs shadow-sm">
              Here are these keywords you can use to trigger the bot:
              <span className="absolute left-1/2 top-full w-0 h-0 border-t-[10px] border-t-[#DCF8C6] border-l-[10px] border-l-transparent"></span>
            </span>
          </div>
          <div></div>
          {/* <div className="text-[#0B63A2] w-32 self-end p-2 border rounded-md bg-white">{node?.startingKeyword || ""}</div> */}

          <div className="text-[#0B63A2]  self-end p-3 border rounded-md bg-white w-full flex justify-between items-center">
            {/* <input type="text" value={node?.startingKeyword || "Starting Keyword"} className="w-[80%] break-words h-auto"/> */}
            <div className="w-[90%] text-wrap break-words px-2 py-1">
              {node?.startingKeyword || "Starting Keyword"}
            </div>
            <FiSend className="text-xl" />
          </div>
        </div>
      </>
    );
  }

  function renderList() {
    if (!data[id]) return;

    const node = nodesInputData[id];

    return (
      <>
        <div className=" bg-[#ece5dd] p-3 rounded-md w-fit relative">
          <div className="bg-white rounded-xl shadow-md p-4 w-[300px]">
            {/* Header text */}
            <p className="text-sm text-black font-semibold mb-1">
              {node?.text || "No Heading"}
            </p>
            {/* Body text */}
            <p className="text-sm break-words whitespace-pre-wrap text-wrap text-black mb-3 mt-4"
              dangerouslySetInnerHTML={{
                __html: formatMessageBody(node?.message || ""),
              }}
            >
              {/* {node?.message || "No Body"} */}
            </p>
            {/* Footer */}
            <div className="flex justify-between text-xs text-gray-600 relative">
              <span>{node?.listFooter || "No Footer"}</span>
              <span className="text-[10px]">9:13 AM</span>
            </div>
            {/* Divider */}
            <div className="border-t border-gray-200 my-3" />
            {/* Button */}
            <div
              className="text-green-600 flex items-center justify-center space-x-1 cursor-pointer text-sm relative"
              onClick={toggleDrawer}
            >
              <ListIcon size={14} />
              <span className="hover:underline">{node?.text}</span>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showDrawer && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 flex justify-center z-50 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className=" bg-[#ece5dd] p-3 rounded-md w-full ">
                <div className="bg-white rounded-xl shadow-md p-4 ">
                  <div className="flex flex-col justify-center items-center mb-6">
                    <p className="text-sm text-black font-semibold mb-1">
                      {node?.text}
                    </p>
                  </div>
                  {node?.options?.map((section, index) => (
                    <div className="relative">
                      <div
                        key={index}
                        className="flex flex-col justify-start items-start border-t border-gray-200 mt-3 w-full"
                      >
                        <p className="text-sm text-black font-medium mt-2 break-words text-wrap w-full">
                          {section?.option}{" "}
                        </p>
                        <span className="text-xs text-gray-500 font-medium break-words text-wrap w-full">
                          {section?.value}{" "}
                        </span>
                      </div>
                      <div className="absolute top-5 right-5 w-4 h-4 border border-gray-400 rounded-full"></div>
                    </div>
                  ))}
                  {/* {node?.options?.map((section, index) => (
                <div key={index} >
                  <div className="flex gap-2">
                    <p>Title: {section?.option}</p>
                    <p>Description: {section?.value}</p>
                  </div>
                </div>
              ))} */}

                  <div className="flex flex-col justify-center items-center border-t border-gray-200 mt-3">
                    <button className="text-sm text-gray-500 font-medium mt-8">
                      Tap an item to select it{" "}
                    </button>
                  </div>
                  <div className="border-2 border-black w-20 ml-26 rounded-md mt-4" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* <div className="text-sm">
          <div className="border p-2 space-y-2 w-50">
            <p className="font-bold">
              {node?.text || "No Heading"}
            </p>
            <p>{node?.body || "No Body"}</p>

            <p className="text-sm">
              {node?.listFooter || "No Footer"}
            </p> */}
        {/*  <div className="flex items-center justify-center text-green-500 text-sm space-x-2">
                     <IoIosList />
                     <p>node?.action?.button || "No Btn"}</p>
                 </div>*/}

        {/* <div className="space-y-2 text-sm">
              <p className="underline">List Rows</p>
              {node?.options?.map((section, index) => (
                <div key={index} >
                  <div className="flex gap-2">
                    <p>Title: {section?.option}</p>
                    <p>Description: {section?.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div > */}
      </>
    );
  }

  function renderText() {
    if (!data[id]) return;

    const node = nodesInputData[id];
    return (
      // <div className="max-w-[300px]">
      //   <p className="w-full whitespace-pre-wrap break-words p-3 rounded-2xl text-sm shadow-sm  bg-[#5584AC] text-white rounded-bl-none">
      //     {node?.message || ""}
      //   </p>
      // </div>
      <div className="max-w-[300px] relative ml-4 mt-3">
        {/* Tail (notch) on the top-left */}
        <div
          className="absolute -left-2 top-0 w-0 h-0 z-99"
          style={{
            borderRight: "10px solid white",
            borderBottom: "10px solid transparent",
          }}
        />
        {/* Message bubble */}
        <div className="relative z-10 whitespace-pre-wrap break-words px-4 py-3 rounded-2xl text-sm shadow-sm bg-white text-black rounded-tl-none"
          dangerouslySetInnerHTML={{
            __html: formatMessageBody(node?.message || ""),
          }}
        >
          {/* {node?.message || ""} */}
        </div>
      </div>
    );
  }

  function renderBtn() {
    if (!data[id]) return;

    const node = nodesInputData[id];

    let mediaUrl = "";
    if (node?.selectedOption === "upload") {
      if (/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(node?.fileUrl)) {
        mediaUrl = node?.fileUrl;
      } else {
        mediaUrl = URL.createObjectURL(node?.fileUrl);
      }
    } else {
      mediaUrl = node?.fileUrl;
    }

    return (
      <div className=" bg-[#ece5dd] p-3 rounded-md w-fit">
        <div className="bg-white rounded-xl shadow-md p-4 w-[300px] ">
          {/* <div className='relative'>
            <p className="font-bold">
              {node?.text || "No Heading"}
            </p>
            <img
              src={mediaUrl}
              className="w-full h-58 object-cover  "
            />
            <video src={mediaUrl} controls className="w-full h-58 object-cover rounded-md" />


          </div> */}

          <div className="relative">
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
                {node?.text || "No Text Providedsdfsdf"}
              </div>
            )}

            {node?.type === "document" && (
              <div className="bg-gray-100 rounded-md flex items-center gap-3">
                <div className="h-auto bg-gray-100 m-2 rounded-md p-1 flex items-center gap-2">
                  <div className="">
                    <BsFileEarmarkPdf />
                  </div>
                  <div className="w-40">
                    <h2 className="text-md font-medium text-gray-800">
                      {node?.fileUrl?.name || "Document"}
                    </h2>
                    {/* <p className='text-[10px] text-gray-300'>243kb . html</p> */}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="">
            <p className="text-sm text-wrap break-words text-black mt-2"
              dangerouslySetInnerHTML={{
                __html: formatMessageBody(node?.message || ""),
              }}
            >
              {/* {node?.message || "No Body"}{" "} */}
            </p>
          </div>

          <div className="">
            <p className="text-xs text-wrap break-words text-gray-400 mt-2">
              {node?.buttonFooter || "No Footer"}
            </p>
          </div>
          <div class=" text-right text-xs text-gray-500 mt-1">2:25PM </div>
          <div className="border-t border-gray-200 mt-1 w-full " />
          <div className="flex flex-col justify-center items-center gap-4">
            {node?.buttonTexts?.map((button, index) => (
              <div key={index}>
                <div className="">
                  <ReplyOutlinedIcon className="text-green-600" />{" "}
                  <span className="text-green-600 text-sm">{button}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      //   <div className="text-sm">
      //     <div className="border p-2 space-y-2 w-50">
      //       <p className="font-bold">
      //         {node?.text || "No Heading"}
      //       </p>
      //       <p>{node?.message || "No Body"}</p>
      //       <p className="text-sm">
      //         {node?.buttonFooter || "No Footer"}
      //       </p>
      //       {/* <div className="flex items-center justify-center text-green-500 text-sm space-x-2">
      //   <IoIosList />
      //   <p>node?.action?.button || "No Btn"}</p>
      // </div> */}

      //       <div className="space-y-2 text-sm">
      //         <p className="underline">Button Reply Actions</p>
      //         {node?.buttonTexts?.map((button, index) => (
      //           <div key={index} >
      //             <div className="flex gap-2">
      //               <p>Title: {button}</p>
      //             </div>
      //           </div>
      //         ))}
      //       </div>
      //     </div>
      //   </div>
    );
  }

  function renderCTABtn() {
    if (!data[id]) return;

    const node = nodesInputData[id];

    let media = "";
    if (node?.selectedOption === "upload" && node?.fileUrl instanceof File) {
      media = URL.createObjectURL(node.fileUrl);
    } else {
      media = node?.urlbuttonMediaUrl || "";
    }

    let fileType = media?.split(".")?.pop()?.split(/\#|\?/)[0];
    return (
      <div className="">
        <div className="p-2 bg-[#ece5dd] rounded-lg flex justify-center m-4 relative w-auto">
          <div className="bg-white rounded-xl shadow-md max-w-md w-full overflow-hidden mr-12">
            <div>
              {node?.urlbuttonType === "image" && (
                <img
                  src={media}
                  alt="Image preview"
                  className="w-full h-58 object-cover rounded-md"
                />
              )}

              {node?.urlbuttonType === "video" && (
                <video
                  src={media}
                  controls
                  className="w-full h-58 object-cover rounded-md"
                />
              )}

              {node?.urlbuttonType === "document" && (
                <div className="bg-gray-100 rounded-md flex items-center gap-3">
                  <div className="h-auto bg-gray-100 m-2 rounded-md p-1 flex items-center gap-2">
                    <div className="">
                      <BsFileEarmarkPdf />
                    </div>
                    <div className="w-40">
                      <h2 className="text-md font-medium text-gray-800">
                        {node?.fileUrl?.name || "Document"}
                      </h2>
                      {/* <p className='text-[10px] text-gray-300'>243kb . html</p> */}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4">
              <p className="text-gray-900 text-wrap break-words text-sm font-semibold">
                {node?.urlbuttonbody || "No Message"}
              </p>
              <div className="flex items-center justify-between text-wrap break-words mt-1 text-xs text-gray-500">
                <span>{node?.urlbuttonFooter || "No Footer"}</span>
                <span>12:37 PM</span>
              </div>

              <div className="mt-3 flex items-center justify-center border-t border-gray-200">
                <button className="flex gap-1 items-center text-green-800 font-medium text-sm hover:underline mt-2">
                  <LuExternalLink />
                  {node?.urlbuttonUrl || "No URL"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      // <div className="p-2">

      //   <div className="border border-black p-2 space-y-2">
      //     <div className="bg-[#e1f3fb] text-black p-4 rounded-2xl shadow-md max-w-xs flex items-center gap-3">
      //       <div className="bg-white p-3 rounded-full shadow-inner text-blue-500">
      //         {getFileType(fileType)}
      //       </div>
      //       <div className="flex flex-col">
      //         <div className="font-medium truncate max-w-[10rem]">
      //           {node?.fileUrl?.name}
      //         </div>
      //         <div className="text-xs text-gray-500 ">.{node?.urlbuttonType}</div>
      //       </div>
      //     </div>

      //     <p>{node?.urlbuttonFooter || "No Footer"}</p>
      //     <div className="flex items-center justify-center text-green-500 text-sm space-x-2">
      //       <FaExternalLinkAlt />
      //       <p>{node?.urlbuttonUrl || "No URL"}</p>
      //     </div>
      //   </div>
      // </div>
    );
  }

  function renderImage() {
    if (!data[id]) return;
    const node = data[id];
    let mediaUrl = "";
    if (node?.selectedOption === "upload") {
      if (/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(node?.fileUrl)) {
        mediaUrl = node?.fileUrl;
      } else {
        mediaUrl = URL.createObjectURL(node?.fileUrl);
      }
    } else {
      mediaUrl = node?.fileUrl;
    }
    return (
      <div className="rounded-md w-full">
        {/* Your Card Component */}
        <div className="p-2 bg-[#ece5dd] rounded-lg flex justify-center m-4">
          <div className="bg-white rounded-xl shadow-md max-w-md w-full overflow-hidden mr-22">
            {/* Header Image */}
            <img
              src={mediaUrl}
              alt="cta image"
              className="w-full h-58 object-cover px-2 pt-2 rounded-xl"
            />

            {/* Body */}
            <div className="p-2">
              <div className="flex flex-col gap-2 text-xs text-gray-500">
                <span className="text-black font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: formatMessageBody(node?.fileCaption || ""),
                  }}
                >
                  {/* {node?.fileCaption || ""} */}
                </span>
                <span className="text-end">12:37 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  function renderVideo() {
    if (!data[id]) return;
    const node = data[id];
    let mediaUrl = "";
    if (node?.selectedOption === "upload") {
      if (/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(node?.fileUrl)) {
        mediaUrl = node?.fileUrl;
      } else {
        mediaUrl = URL.createObjectURL(node?.fileUrl);
      }
    } else {
      mediaUrl = node?.fileUrl;
    }
    return (
      <div className="rounded-md w-full">
        {/* Your Card Component */}
        <div className="p-2 bg-[#ece5dd] rounded-lg flex justify-center m-4">
          <div className="bg-white rounded-xl shadow-md max-w-md w-full overflow-hidden mr-22">
            {/* Header Image */}
            <video
              src={mediaUrl}
              controls
              className="w-full h-58 object-cover px-2 pt-2 rounded-xl"
            />

            {/* Body */}
            <div className="p-2">
              <div className="flex flex-col gap-2 text-xs text-gray-500">
                <span className="text-black font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: formatMessageBody(node?.fileCaption || ""),
                  }}

                >
                  {/* {node?.fileCaption || ""} */}
                </span>
                <span className="text-end">12:37 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  function renderDocument() {
    if (!data[id]) return;
    const node = data[id];
    let mediaUrl = "";
    let media = "";
    let isExcel = false;

    if (node?.selectedOption === "upload") {
      if (/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(node?.fileUrl)) {
        mediaUrl = node?.fileUrl;
        media = "Untitled Document";
      } else {
        mediaUrl = URL.createObjectURL(node?.fileUrl);
        media = node?.fileUrl?.name;
      }
    } else {
      mediaUrl = node?.fileUrl;
      media = "Untitled Document";
    }

    let fileType = media?.split(".")?.pop()?.split(/\#|\?/)[0];

    isExcel = fileType === "xlsx" || fileType === "csv";
    return (
      <div className="rounded-md w-full">
        {/* Your Card Component */}
        <div className="p-2 bg-[#ece5dd] rounded-lg flex justify-center m-4">
          <div className="bg-white rounded-xl shadow-md max-w-md w-full overflow-hidden mr-22">
            {/* Header Image */}
            {/* <iframe
              src={isExcel ? `https://view.officeapps.live.com/op/embed.aspx?src=${mediaUrl}` : mediaUrl}
              controls
              className="w-full h-58 object-cover px-2 pt-2 rounded-xl"
            /> */}
            <div className="h-auto bg-gray-100 m-2 rounded-md p-1 flex items-center gap-2">
              <div className="">
                <BsFileEarmarkPdf />
              </div>
              <div className="w-40">
                <h2 className="text-md font-medium text-gray-800">{media}</h2>
                {/* <p className='text-[10px] text-gray-300'>243kb . html</p> */}
              </div>
            </div>

            {/* Body */}
            <div className="p-2">
              <div className="flex flex-col gap-2 text-xs text-gray-500">
                <span className="text-black font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: formatMessageBody(node?.fileCaption || ""),
                  }}
                >
                  {/* {node?.fileCaption || ""} */}
                </span>
                <span className="text-end">12:37 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderAudio() {
    if (!data[id]) return;
    const node = data[id];
    let mediaUrl = "";
    if (node?.selectedOption === "upload") {
      if (/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(node?.fileUrl)) {
        mediaUrl = node?.fileUrl;
      } else {
        mediaUrl = URL.createObjectURL(node?.fileUrl);
      }
    } else {
      mediaUrl = node?.fileUrl;
    }
    return (
      <div className="rounded-md w-full">
        {/* Your Card Component */}
        <div className="p-2 bg-[#ece5dd] rounded-lg flex justify-center m-4">
          <div className="bg-white rounded-xl shadow-md max-w-md w-full overflow-hidden mr-22">
            {/* Header Image */}
            <audio
              src={mediaUrl}
              controls
              className="w-full object-cover px-2 pt-2 rounded-xl"
            />

            {/* Body */}
            <div className="p-2">
              <div className="flex flex-col gap-2 text-xs text-gray-500">
                <span className="text-black font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: formatMessageBody(node?.fileCaption || ""),
                  }}
                >
                  {/* {node?.fileCaption || ""} */}
                </span>
                <span className="text-end">12:37 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderTemplate() {
    if (!data[id]) return;
    const node = data[id];
    const json = JSON.parse(node?.json)?.template?.components;
  }

  const MediaRenderer = ({ format, fileUrl, fallbackUrl }) => {
    if (format === "IMAGE") {
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

    return (
      <div className="w-full h-[20.5rem]">
        <iframe
          src={fileUrl || fallbackUrl}
          width="100%"
          height="100%"
          className="object-contain border border-blue-500 rounded-md"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
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

  // const renderedComponents = () => {
  //   if (!data[id]) return
  //   const node = data[id]
  //   const json = JSON.parse(node?.json)?.template
  //   console.log("node", json)

  //   console.log("allTemplates", allTemplates)

  //   // return json?.components?.map(
  //   //   ({ type, text, buttons, format, example }, index) => {
  //   //     if (type === "HEADER" && !example?.header_handle?.[0]) return null;

  //   //     // console.log(buttons)

  //   //     return (
  //   //       <div key={index} className="flex flex-col w-full gap-3">
  //   //         {type === "HEADER" && tempTypes.includes(format) && (
  //   //           <MediaRenderer
  //   //             format={format}
  //   //             fileUrl={selectedImage?.fileUrl}
  //   //             fallbackUrl={example?.header_handle?.[0]}
  //   //           />
  //   //         )}

  //   //         {type === "BODY" && (
  //   //           <div className="text-sm text-gray-800">{text}</div>
  //   //         )}

  //   //         {type === "BUTTONS" && buttons?.length > 0 && (
  //   //           <ButtonsGroup buttons={buttons} />
  //   //         )}
  //   //       </div>
  //   //     );
  //   //   }
  //   // );
  // }

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-[1000]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="fixed top-0 right-0 h-full min-w-[25vw] max-w-[50vw] bg-white shadow-2xl z-[1001] flex flex-col"
            style={{ width }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()} // allow clicks inside
          >
            {/* <div className="flex items-center justify-between px-3 py-2 border-b">
              <h3 className="font-medium text-sm">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
              >
                Close
              </button>
            </div> */}

            {/* WhatsApp-like preview */}
            <div className="p-3 overflow-auto flex-1">
              <div className="h-full w-full flex flex-col bg-[#ECE5DD] rounded-md overflow-hidden border">
                {/* Top bar */}
                <div className="flex items-center justify-between bg-[#075E54] text-white h-12 px-3">
                  <div className="flex items-center gap-2">
                    {/* avatar */}
                    <div className="w-5 h-5 rounded-full bg-white/90 flex items-center justify-center text-[10px] text-[#075E54]">
                      W
                    </div>
                    <span className="text-sm font-medium">{name}</span>
                  </div>
                  <span
                    className="text-xl leading-none cursor-pointer"
                    onClick={onClose}
                  >
                    ×
                  </span>
                </div>

                {/* Chat area with WA background pattern */}
                <div className="relative flex-1 overflow-auto">
                  <div
                    className="absolute inset-0 opacity-[0.18]"
                    style={{
                      backgroundImage:
                        "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22 viewBox=%220 0 512 512%22 fill=%22none%22><g opacity=%220.3%22 stroke=%22%239C8F8F%22 stroke-width=%221%22><circle cx=%2280%22 cy=%2280%22 r=%2210%22/><rect x=%22260%22 y=%2270%22 width=%2236%22 height=%2222%22 rx=%225%22/><path d=%22M340 300h70%22/><circle cx=%22340%22 cy=%22240%22 r=%228%22/><path d=%22M90 240c20 0 20 30 40 30%22/></g></svg>')",
                      backgroundSize: "280px 280px",
                    }}
                  />

                  {type == "starting" && renderStartBtn()}
                  {type == "image" && renderImage()}
                  {type == "video" && renderVideo()}
                  {type == "document" && renderDocument()}
                  {type == "text" && renderText()}
                  {type == "button" && renderBtn()}
                  {type == "list" && renderList()}
                  {type == "urlbutton" && renderCTABtn()}
                  {type == "audio" && renderAudio()}
                  {/* {type == "template" && renderedComponents()} */}

                  {/* Placeholder for chat bubbles */}
                  {/* Message bubble */}
                  {/* <div className="relative px-3 pt-4 pb-6">
             
                    <div className="relative inline-block bg-white rounded-2xl shadow-md border border-black/5 ml-5">
                      
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
