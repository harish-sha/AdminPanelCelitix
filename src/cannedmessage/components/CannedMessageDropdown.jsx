import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  FaFileAlt,
  FaImage,
  FaVideo,
  FaFileAudio,
  FaFile,
  FaTimes,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
// import image1 from "../../../assets/images/tourist.avif";
// import image2 from "../../../assets/images/university.avif";
// import image3 from "../../../assets/images/whatsapp.jpg";
// import image2 from "@/assets/images/image2.jpg";
// import image3 from "@/assets/images/image3.jpg";

import { getAllCannedMessages } from "@/apis/whatsapp/whatsapp.js";

// const fetchCannedMessages = async (type) => {
//   if (type === "text") {
//     const data = await getAllCannedMessages();
//     return (data || []).map((msg) => ({
//       id: msg.srNo,
//       label: msg.cannedMessageName,
//       content: msg.textBody,
//     }));
//   }

//   // fallback hardcoded for others
// };

const fetchCannedMessages = async (type) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  if (type === "text") {
    try {
      const res = await getAllCannedMessages();
      // res.data is the array of canned messages
      return (res.data || []).map((msg) => ({
        id: msg.srNo,
        label: msg.cannedMessageName,
        content: msg.textBody,
      }));
    } catch (err) {
      return [];
    }
  }
  const messages = {
    text: [
      // {
      //   id: 1,
      //   label: "Welcome",
      //   content:
      //     "Hello! Welcome to our service. We're thrilled to have you here. If you have any questions or need assistance, feel free to ask. Our team is here to help you in any way we can.",
      // },
      // {
      //   id: 2,
      //   label: "Assistance Offer",
      //   content:
      //     "Hi there! If you're having trouble or just need some guidance, we're always here to assist. Just let us know what you're trying to do, and we’ll point you in the right direction.",
      // },
      // {
      //   id: 3,
      //   label: "Product Info",
      //   content:
      //     "Thank you for reaching out. The product you're interested in is one of our bestsellers and comes with a full warranty. It’s durable, reliable, and perfect for everyday use.",
      // },
      // {
      //   id: 4,
      //   label: "Issue Acknowledgement",
      //   content:
      //     "We’ve received your concern and want you to know that we’re already looking into it. One of our support specialists will be in touch shortly with more information.",
      // },
      // {
      //   id: 5,
      //   label: "Apology",
      //   content:
      //     "We sincerely apologize for any inconvenience this may have caused. Our goal is always to provide the best possible service, and we’re actively working on resolving the issue.",
      // },
      // {
      //   id: 6,
      //   label: "Follow-up",
      //   content:
      //     "Just following up to see if everything is working fine now. If you're still experiencing issues, don't hesitate to reach back out and we’ll assist you promptly.",
      // },
      // {
      //   id: 7,
      //   label: "Closing Message",
      //   content:
      //     "Thanks again for choosing us! We hope your experience has been smooth and satisfying. Please leave us a review or let us know if there's anything more we can do.",
      // },
      // {
      //   id: 8,
      //   label: "Thank You",
      //   content:
      //     "Thank you for your patience and understanding. We appreciate having customers like you who help us improve our service with valuable feedback and trust.",
      // },
      // {
      //   id: 9,
      //   label: "Help Prompt",
      //   content:
      //     "If you need help navigating any part of the app, just ask! We're happy to guide you through step-by-step, no matter how simple or complex the task may be.",
      // },
      // {
      //   id: 10,
      //   label: "Account Info",
      //   content:
      //     "To help with your request, could you please verify the email address associated with your account? This helps us locate your details and provide faster assistance.",
      // },
      // {
      //   id: 11,
      //   label: "Delivery Update",
      //   content:
      //     "Your order has been dispatched and is currently on its way. You can expect delivery within the next 3-5 business days. Track your shipment via your dashboard anytime.",
      // },
      // {
      //   id: 12,
      //   label: "Payment Reminder",
      //   content:
      //     "This is a friendly reminder that your invoice is due. Please make the payment at your earliest convenience to avoid any service interruptions. Let us know if you need help.",
      // },
      // {
      //   id: 13,
      //   label: "Feature Request Response",
      //   content:
      //     "Thank you for your feature suggestion! We've passed it on to our product team. While we can't promise immediate implementation, we really value your input.",
      // },
      // {
      //   id: 14,
      //   label: "Bug Acknowledgement",
      //   content:
      //     "Thanks for reporting that! We’ve identified the issue and are working on a fix. We’ll keep you updated and notify you as soon as it’s resolved.",
      // },
      // {
      //   id: 15,
      //   label: "Refund Info",
      //   content:
      //     "Your refund request has been received. It typically takes 5–7 business days to process. You’ll get an email confirmation once the transaction is completed.",
      // },
      // {
      //   id: 16,
      //   label: "Maintenance Alert",
      //   content:
      //     "Heads up! Our system will undergo scheduled maintenance on Saturday from 2AM to 4AM. During this time, some features may be temporarily unavailable. We appreciate your understanding.",
      // },
      // {
      //   id: 17,
      //   label: "Trial Expiry",
      //   content:
      //     "Your free trial is about to expire in 3 days. Upgrade to a premium plan to continue enjoying uninterrupted access to all features and services without limits.",
      // },
      // {
      //   id: 18,
      //   label: "Plan Upgrade Success",
      //   content:
      //     "Great news! Your plan has been successfully upgraded. You now have access to all premium features. If you have any questions about what’s included, we’re here to help.",
      // },
      // {
      //   id: 19,
      //   label: "Feedback Request",
      //   content:
      //     "We'd love your feedback! Let us know how we did today or how we can improve. Your opinion helps us serve you better and shape our roadmap.",
      // },
      // {
      //   id: 20,
      //   label: "Out of Office",
      //   content:
      //     "Hi! We're currently away but will return shortly. In the meantime, please leave your message, and someone from our team will get back to you as soon as possible.",
      // },
      // {
      //   id: 21,
      //   label: "Live Chat Offer",
      //   content:
      //     "Would you like to connect with one of our live agents now? Click below and someone from our support team will join you in real-time to help out.",
      // },
      // {
      //   id: 22,
      //   label: "Language Support",
      //   content:
      //     "If you prefer communication in another language, let us know your preference and we’ll do our best to accommodate your needs or assign a language-specific agent.",
      // },
      // {
      //   id: 23,
      //   label: "Security Tip",
      //   content:
      //     "For your account’s safety, never share your password or OTP with anyone. If you suspect any suspicious activity, please change your password immediately and notify us.",
      // },
      // {
      //   id: 24,
      //   label: "Survey Invite",
      //   content:
      //     "We’d love to hear from you! Take a minute to complete our short survey and tell us what you think about your recent experience. Your voice matters.",
      // },
      // {
      //   id: 25,
      //   label: "Welcome Back",
      //   content:
      //     "Welcome back! It's great to see you again. If there’s anything new you’d like to explore or any issues you’ve faced, we’re just a message away.",
      // },
    ],
    image: [
      // { id: 1, content: image1 },
      // { id: 2, content: image2 },
      // { id: 3, content: image3 },
      // { id: 4, label: "Image 4", content: "https://via.placeholder.com/300" },
      // { id: 5, label: "Image 5", content: "https://via.placeholder.com/350" },
      // { id: 6, label: "Image 6", content: "https://via.placeholder.com/400" },
      // { id: 7, label: "Image 7", content: "https://via.placeholder.com/450" },
      // { id: 8, label: "Image 8", content: "https://via.placeholder.com/500" },
      // { id: 9, label: "Image 9", content: "https://via.placeholder.com/550" },
      // { id: 10, label: "Image 10", content: "https://via.placeholder.com/600" },
    ],
    video: [
      // {
      //   id: 1,
      //   label: "Video 1",
      //   content: "https://www.w3schools.com/html/mov_bbb.mp4",
      // },
      // {
      //   id: 2,
      //   label: "Video 2",
      //   content: "https://www.w3schools.com/html/movie.mp4",
      // },
    ],
    audio: [
      // {
      //   id: 1,
      //   label: "Audio 1",
      //   content:
      //     "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      // },
      // {
      //   id: 2,
      //   label: "Audio 2",
      //   content:
      //     "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      // },
    ],
    document: [
      // {
      //   id: 1,
      //   label: "Document 1",
      //   content:
      //     "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      // },
      // {
      //   id: 2,
      //   label: "Document 2",
      //   content:
      //     "https://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf",
      // },
    ],
  };
  return messages[type] || [];
};

const renderMedia = (type, content) => {
  switch (type) {
    case "image":
      return (
        <img src={content} alt="Media" className="w-full h-auto rounded-md" />
      );
    case "video":
      return (
        <video controls className="w-full h-auto rounded-md">
          <source src={content} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    case "audio":
      return (
        <audio controls className="w-full">
          <source src={content} type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      );
    case "document":
      return (
        <a
          href={content}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Document
        </a>
      );
    default:
      return (
        <pre className="text-xs text-gray-600 text-wrap">
          {content}
        </pre>
      );
  }
};

const messageTypes = [
  { type: "text", label: "Text" },
  { type: "image", label: "Images" },
  { type: "video", label: "Videos" },
  { type: "audio", label: "Audio" },
  { type: "document", label: "Documents" },
];

const SkeletonLoader = () => (
  <div className="space-y-2">
    {[...Array(5)].map((_, idx) => (
      <div key={idx} className="h-8 bg-gray-200 rounded-md animate-pulse"></div>
    ))}
  </div>
);

const icons = {
  text: <FaFileAlt className="text-blue-400" />,
  image: <FaImage className="text-yellow-400" />,
  video: <FaVideo className="text-purple-400" />,
  audio: <FaFileAudio className="text-indigo-400" />,
  document: <FaFile className="text-red-400" />,
};

export default function CannedMessageDropdown({ onSelect, onClose }) {
  const [selectedType, setSelectedType] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedType) {
      setLoading(true);
      fetchCannedMessages(selectedType).then((data) => {
        setMessages(data);
        setLoading(false);
      });
    } else {
      setMessages([]);
    }
  }, [selectedType]);
  return (
    <motion.div
      //   initial={{ opacity: 0, y: 20 }}
      //   animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20, width: "13rem" }}
      animate={{ opacity: 1, y: 0, width: selectedType ? "64rem" : "14rem" }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-22 left-0 w-full bg-white shadow-lg rounded-md border z-50 p-3 max-w-full"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold tracking-wide text-[#5584AC]">
          Your Saved Messages
        </h3>
        <button
          onClick={() => setSelectedType(null)}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <FaTimes />
        </button>
      </div>
      <div className="flex gap-2">
        <AnimatePresence>
          <motion.div
            className="flex flex-col gap-2 w-1/3"
            initial={{ width: "100%" }}
            animate={{ width: selectedType ? "20%" : "100%" }}
            transition={{ duration: 0.3 }}
          >
            {messageTypes.map(({ type, label }) => (
              <motion.div
                key={type}
                onClick={() => setSelectedType(type)}
                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 ${selectedType === type ? "bg-gray-100" : ""
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {icons[type]}
                <span className="text-xs text-gray-900">{label}</span>
              </motion.div>
            ))}
          </motion.div>
          {selectedType && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "78%" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3 }}
              className="border-l pl-2"
            >
              {loading ? (
                <SkeletonLoader />
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    className="mb-2"
                  >
                    {icons[selectedType] || <FaFile className="text-4xl" />}
                  </motion.div>
                  <div className="font-semibold text-gray-500 mb-1">
                    No
                    {selectedType
                      ? messageTypes.find((mt) => mt.type === selectedType)
                        ?.label
                      : "content"}
                    found
                  </div>
                  <div className="text-xs text-gray-400">
                    You don't have any
                    {selectedType
                      ? messageTypes
                        .find((mt) => mt.type === selectedType)
                        ?.label.toLowerCase()
                      : "content"}
                    yet.
                    <br />
                    Add new
                    {selectedType
                      ? messageTypes
                        .find((mt) => mt.type === selectedType)
                        ?.label.toLowerCase()
                      : "content"}
                    via
                    <span className="font-semibold text-blue-500">
                      Live Chat Settings
                    </span>
                    .
                  </div>
                </div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto overflow-x-hidden grid grid-cols-2 gap-x-3">
                  {messages.map(({ id, label, content }, index) => (
                    <motion.div
                      key={id || `message-${index}`}
                      onClick={() => {
                        onSelect(content);
                        onClose();
                      }}
                      className="p-2 border  rounded-md hover:bg-gray-100 cursor-pointer bg-white shadow-sm"
                      whileHover={{ scale: 1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="font-medium text-gray-800 text-sm">
                        {label}
                      </div>
                      {renderMedia(selectedType, content)}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
