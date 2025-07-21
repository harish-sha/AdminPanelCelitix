import React from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaReply, FaReplyAll, FaShare } from "react-icons/fa";
import DOMPurify from "dompurify";
import "./preview.css";
import parse from "html-react-parser";

/**
 * Preview Component with standard email actions
 */
export default function Preview({
  body,
  senderName,
  recipients,
  uploadedFile,
}) {
  const demoBody =
    body ||
    `Hi team,

Just a quick update on our product launch:

• Feature development is 90% complete
• QA testing begins Monday
• Marketing assets are under review

Please review the above items and share any feedback.

Thanks,
${senderName}`;

  const isImage = uploadedFile?.type?.startsWith("image/");

  return (
    <div className="mx-auto bg-white rounded-2xl shadow-lg p-2">
      {/* Message Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-50 p-4 rounded-lg"
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <img
            src="/default-avatar.jpg"
            alt="Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-semibold text-gray-800">
              {senderName || "Celitix"}
            </p>
            <p className="text-xs text-gray-500">
              to {recipients || "Team Proactve"}
            </p>
          </div>
        </div>

        {/* Body */}

        {/* <div className=" rich-preview quill-content  w-45 md:w-100  max-w-none text-gray-800 whitespace-pre-wrap break-words text-sm overflow-auto max-h-100 min-h-90 h-auto"> */}
        <div className=" quill-preview quill-content  w-45 md:w-100  max-w-none text-gray-800 whitespace-pre-wrap break-words text-sm overflow-auto max-h-100 min-h-90 h-auto">
          {parse(DOMPurify.sanitize(body || ""))}

          {/* {attachment && (
            <div className="mt-4 border-t pt-2">
              <p className="text-gray-600 font-medium mb-1">Attachment</p>
              {isImage ? (
                <img
                  src={URL.createObjectURL(attachment)}
                  alt="Uploaded"
                  className="max-w-xs rounded-md border"
                />
              ) : attachment.type === "application/pdf" ? (
                <iframe
                  src={URL.createObjectURL(attachment)}
                  title="PDF Preview"
                  className="w-full h-64 border rounded-md"
                />
              ) : (
                <a
                  href={URL.createObjectURL(attachment)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  {attachment.name}
                </a>
              )}
            </div>
          )} */}

          {uploadedFile && (
            <div className="mt-4 border-t pt-2">
              <p className="text-gray-600 font-medium mb-1">Attachment</p>

              {/* 🔽 PLACE THIS RIGHT HERE */}
              {(() => {
                const attachmentSrc =
                  uploadedFile instanceof File
                    ? URL.createObjectURL(uploadedFile)
                    : uploadedFile?.url;

                return uploadedFile.type?.startsWith("image") ? (
                  <img
                    src={attachmentSrc}
                    alt="Uploaded"
                    className="max-w-xs rounded-md border"
                  />
                ) : uploadedFile.type === "application/pdf" ? (
                  <iframe
                    src={attachmentSrc}
                    title="PDF Preview"
                    className="w-full h-64 border rounded-md"
                  />
                ) : (
                  <a
                    href={attachmentSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    {uploadedFile.name}
                  </a>
                );
              })()}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
