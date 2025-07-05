import { WhatsApp } from "@mui/icons-material";
import { FaReply } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaLinkSlash } from "react-icons/fa6";
import { useEffect, useState } from "react";

const TemplatePreview = ({
  scrollContainerRef,
  header,
  format,
  footer,
  imageUrl,
  videoUrl,
  documentUrl,
  locationUrl,
  phoneTitle,
  urlTitle,
  quickReplies,
  variables, // Pass variables from parentz
}) => {
  const extractCoordinates = (url) => {
    let regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    let match = url.match(regex);
    if (match) {
      return {
        lat: match[1],
        lng: match[2],
      };
    }

    regex = /place\/.*\/@(-?\d+\.\d+),(-?\d+\.\d+)/;
    match = url.match(regex);
    if (match) {
      return {
        lat: match[1],
        lng: match[2],
      };
    }

    regex = /q=(-?\d+\.\d+),(-?\d+\.\d+)/;
    match = url.match(regex);
    if (match) {
      return {
        lat: match[1],
        lng: match[2],
      };
    }

    return null;
  };

  const [scrollOffset, setScrollOffset] = useState(206); // Default top position

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef?.current) {
        const containerScrollY = scrollContainerRef.current.scrollTop;
        const offset = Math.max(100, 190 - containerScrollY); // Adjust based on scroll
        setScrollOffset(offset);
      }
    };

    const container = scrollContainerRef?.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [scrollContainerRef]);

  // Function to replace placeholders with variable values
  const renderWithVariables = (template) => {
    if (!variables || variables.length === 0) return template;

    return template.replace(/{#(.*?)#}/g, (match, id) => {
      const variable = variables.find((v) => v.id === id);
      return variable ? `[${variable.value || "empty"}]` : match;
    });
  };
  const isLargeScreen = window.innerWidth >= 1024;

  return (
    <div
      className={" sm:w-[20rem] md:w-[30rem] lg:w-[30rem] h-auto overflow-y-auto z-50 p-4 transition-all duration-300 bg-white border border-gray-400 rounded-md shadow-lg"}
    >
      <div className="flex items-center justify-between px-4 py-2 text-white bg-green-500 rounded-t-md">
        <h2 className="text-lg font-semibold">Template Preview</h2>
        <p className="text-sm">
          <WhatsApp />
        </p>
      </div>

      <div className="p-4 bg-white shadow-inner rounded-b-md">
        {header && (
          <div
            className="w-full px-3 py-2 mb-4 text-sm text-gray-900 break-words bg-green-100 rounded-md max-h-20"
            id="templateHeaderPreview"
            name="templateHeaderPreview"
          >
            <strong className="text-lg font-semibold">{header}</strong>
          </div>
        )}

        {imageUrl && (
          <div className="mb-4">
            <img
              id="templateImagePreview"
              name="templateImagePreview"
              src={URL.createObjectURL(imageUrl)}
              alt="Template Preview"
              className="object-cover w-full h-48 rounded-md"
            />
          </div>
        )}

        {videoUrl && (
          <div className="mb-4">
            <video
              controls
              className="w-full h-48 rounded-md"
              id="templateVideoPreview"
              name="templateVideoPreview"
            >
              <source src={URL.createObjectURL(videoUrl)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {documentUrl && (
          <div className="mb-4">
            {/* <a
              id="templateDocumentPreview"
              name="templateDocumentPreview"
              href={documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Document
            </a> */}

            <iframe src={documentUrl} frameborder="0"></iframe>
          </div>
        )}

        {locationUrl && (
          <div className="mb-4">
            {(() => {
              const coordinates = extractCoordinates(locationUrl);
              if (coordinates) {
                return (
                  <iframe
                    id="templateLocationPreview"
                    name="templateLocationPreview"
                    src={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&output=embed`}
                    width="100%"
                    height="200"
                    allowFullScreen
                    loading="eager"
                    className="rounded-md"
                  ></iframe>
                );
              } else {
                return (
                  <div className="flex justify-center px-3 py-2 mb-4 text-gray-800 bg-gray-100 rounded-md">
                    <span className="mr-3">
                      <FaLinkSlash size={19} className="p-0" />
                    </span>
                    <span className="text-md">Invalid Maps URL</span>
                  </div>
                );
              }
            })()}
          </div>
        )}

        {format && (
          <div
            className="w-full px-3 py-2 mb-4 overflow-auto text-sm text-gray-800 break-words bg-gray-100 rounded-md max-h-40"
            id="templateFormatPreview"
            name="templateFormatPreview"
          >
            <pre className="text-wrap">{renderWithVariables(format)}</pre>
          </div>
        )}

        {footer && (
          <div
            className="mt-4 overflow-auto text-xs text-center text-gray-500 break-words max-h-16"
            id="templateFooterPreview"
            name="templateFooterPreview"
          >
            {footer}
          </div>
        )}
        <div className="flex flex-col gap-2 mt-4">
          {phoneTitle && (
            <button
              className="flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-md"
              id="templatePhoneBtnPreview"
              name="templatePhoneBtnPreview"
            >
              <BsTelephoneFill className="mr-2" />
              {phoneTitle}
            </button>
          )}
          {urlTitle && (
            <button
              className="flex items-center justify-center px-4 py-2 text-white bg-green-500 rounded-md"
              id="templateUrlBtnPreview"
              name="templateUrlBtnPreview"
            >
              <FaExternalLinkAlt className="mr-2" />
              {urlTitle}
            </button>
          )}
        </div>

        {quickReplies && quickReplies.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-col gap-2">
              {quickReplies.map(
                (reply, index) =>
                  reply && (
                    <button
                      id="templateQuickReplyBtnPreview"
                      name="templateQuickReplyBtnPreview"
                      key={index}
                      className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-800 bg-gray-200 rounded-md"
                    >
                      <FaReply className="mr-2" />
                      {reply}
                    </button>
                  )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatePreview;
