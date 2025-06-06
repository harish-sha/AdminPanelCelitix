import React, { useEffect, useState } from "react";
import {
  getAllCannedMessages,
  saveCannedMessage,
  deleteCannedMessageBySrNo,
} from "@/apis/whatsapp/whatsapp.js";
import InputField from "@/whatsapp/components/InputField";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import UniversalButton from "@/components/common/UniversalButton";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";

export default function CannedMessageManager() {
  const [messages, setMessages] = useState([
    {
      srNo: 1,
      cannedMessageName: "Welcome",
      textBody:
        "Hello! Welcome to our service. We are delighted to have you on board. If you have any questions or need assistance, feel free to reach out. Our team is here to ensure your experience is smooth and enjoyable. Thank you for choosing us!",
    },
    {
      srNo: 2,
      cannedMessageName: "Assistance Offer",
      textBody:
        "Let us know how we can assist you today. Whether you need guidance, support, or have specific questions, we are here to help. Your satisfaction is our priority, and we aim to provide solutions tailored to your needs. Reach out anytime for assistance.",
    },
    {
      srNo: 3,
      cannedMessageName: "Product Info",
      textBody:
        "This product is one of our bestsellers and has received outstanding reviews from customers worldwide. It is designed with durability, reliability, and user satisfaction in mind. If you need more details or specifications, feel free to ask. We’re happy to help!",
    },
    {
      srNo: 4,
      cannedMessageName: "Issue Acknowledgement",
      textBody:
        "We’ve received your concern and want you to know that we’re actively looking into it. Our team is dedicated to resolving issues promptly and ensuring your satisfaction. You’ll hear back from us shortly with updates or solutions. Thank you for your patience.",
    },
    {
      srNo: 5,
      cannedMessageName: "Apology",
      textBody:
        "We sincerely apologize for the inconvenience caused. Our goal is to provide the best possible service, and we regret falling short. Rest assured, we are working diligently to resolve the issue and ensure it doesn’t happen again. Thank you for your understanding.",
    },
    {
      srNo: 6,
      cannedMessageName: "Follow-up",
      textBody:
        "Is everything working fine now? We wanted to follow up to ensure your issue has been resolved. If there’s anything else we can assist you with, please don’t hesitate to let us know. Your satisfaction is important to us, and we’re here to help.",
    },
    {
      srNo: 7,
      cannedMessageName: "Closing Message",
      textBody:
        "Thanks for choosing us! We truly appreciate your trust and support. We hope to serve you again in the near future. If you have any feedback or suggestions, feel free to share them with us. Your input helps us improve and grow.",
    },
    {
      srNo: 8,
      cannedMessageName: "Thank You",
      textBody:
        "Thank you for your patience and understanding during this process. We value your trust and are committed to providing the best service possible. If there’s anything else we can do for you, please let us know. Your satisfaction is our priority.",
    },
    {
      srNo: 9,
      cannedMessageName: "Help Prompt",
      textBody:
        "Let us know if you need help navigating the app or finding the features you’re looking for. We’re here to guide you step-by-step and ensure you make the most of our platform. Your convenience and satisfaction are important to us.",
    },
    {
      srNo: 10,
      cannedMessageName: "Account Info",
      textBody:
        "Please verify your email address to ensure quicker support and a more secure experience. This helps us locate your account details and provide personalized assistance. Your security and satisfaction are our top priorities. Thank you for your cooperation.",
    },
    {
      srNo: 11,
      cannedMessageName: "Account Info",
      textBody:
        "Please verify your email address to ensure quicker support and a more secure experience. This helps us locate your account details and provide personalized assistance. Your security and satisfaction are our top priorities. Thank you for your cooperation.",
    },
    {
      srNo: 12,
      cannedMessageName: "Account Info",
      textBody:
        "Please verify your email address to ensure quicker support and a more secure experience. This helps us locate your account details and provide personalized assistance. Your security and satisfaction are our top priorities. Thank you for your cooperation.",
    },
    {
      srNo: 13,
      cannedMessageName: "Account Info",
      textBody:
        "Please verify your email address to ensure quicker support and a more secure experience. This helps us locate your account details and provide personalized assistance. Your security and satisfaction are our top priorities. Thank you for your cooperation.",
    },
    {
      srNo: 14,
      cannedMessageName: "Account Info",
      textBody:
        "Please verify your email address to ensure quicker support and a more secure experience. This helps us locate your account details and provide personalized assistance. Your security and satisfaction are our top priorities. Thank you for your cooperation.",
    },
  ]);
  //   const [messages, setMessages] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [form, setForm] = useState({
    cannedMessageName: "",
    textBody: "",
  });

  const [deleteDropdown, setDeleteDropdown] = useState(null);

  const fetchMessages = async () => {
    try {
      const res = await getAllCannedMessages();
      setMessages(res || []);
    } catch (error) {
      toast.error("Failed to fetch canned messages. Please try again.");
    }
  };

  useEffect(() => {
    // fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.cannedMessageName.trim()) {
      toast.error("Canned Message Name is required.");
      return;
    }

    if (!form.textBody.trim()) {
      toast.error("Message Content is required.");
      return;
    }

    try {
      setIsFetching(true);
      const response = await saveCannedMessage(form);
      if (response.status === false) {
        toast.error(
          response.message || "Failed to add canned message. Please try again."
        );
        return;
      }
      setForm({ cannedMessageName: "", textBody: "" });
      toast.success("Canned message added successfully!");
      fetchMessages();
    } catch (error) {
      toast.error("Failed to add canned message. Please try again.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleDelete = async (srNo) => {
    try {
      const response = await deleteCannedMessageBySrNo(srNo);
      if (response.status === false) {
        toast.error(
          response.message ||
            "Failed to delete canned message. Please try again."
        );
        return;
      }
      toast.success("Canned message deleted successfully!");
      fetchMessages();
    } catch (error) {
      toast.error("Failed to delete canned message. Please try again.");
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col items-center justify-center w-full">
        <h2 className="text-2xl font-semibold text-gray-800 text-center flex items-center justify-center gap-2">
          <span>Manage Canned Messages</span>
          {/* <FaTrashAlt className="text-blue-500" /> */}
        </h2>
        <p className="text-sm text-gray-600 text-center mt-2 text-wrap ">
          Easily create, manage, and organize pre-saved messages to enhance your
          live chat experience. <br /> Use canned messages to respond quickly
          and professionally, ensuring customer satisfaction and efficient
          communication.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 border-2 p-2 border-gray-300 rounded-2xl">
        {/* Form to Add Canned Message */}
        <div
          className="space-y-4 p-2 border-r-2  lg:w-1/2"
        >
          <div className="space-y-2">
            <InputField
              label="Canned Message Name"
              tooltipContent="Enter a label for the canned message"
              placeholder="Message Label"
              value={form.cannedMessageName}
              onChange={(e) =>
                setForm({ ...form, cannedMessageName: e.target.value })
              }
              className="border p-2 w-full"
            />

            <div className="relative"> 
              <UniversalTextArea
                label="Message Content"
                tooltipContent="Enter the content of the canned message"
                placeholder="Message Content"
                value={form.textBody}
                onChange={(e) => setForm({ ...form, textBody: e.target.value })}
                className="border p-2 w-full h-70"
              />
              <div className="absolute top-9 right-3 cursor-pointer">
                <CustomEmojiPicker
                  onSelect={(emoji) =>
                    setForm({ ...form, textBody: form.textBody + emoji })
                  }
                  position="bottom"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <UniversalButton
                id="cannedMessageSubmitBtn"
                name="cannedMessageSubmitBtn"
                label={isFetching ? "Adding..." : "Add Message"}
                variant="primary"
                disabled={isFetching}
                type="submit"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>

        {/* List of Canned Messages */}
        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 h-120 overflow-scroll p-2 border border-gray-200 rounded-md shadow-md">
          {messages.map((msg) => (
            <motion.div
              key={msg.srNo}
              className="relative bg-white border border-gray-200 rounded-md shadow-md p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Delete Icon */}
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => setDeleteDropdown(msg.srNo)}
                  className="text-red-500 hover:text-red-600 transition cursor-pointer text-sm p-1 hover:bg-gray-100 rounded-md"
                >
                  <FaTrashAlt />
                </button>
                {deleteDropdown === msg.srNo && (
                  <div className="absolute top-6 right-0 bg-white border border-gray-300 rounded-md shadow-md p-2 text-sm z-50">
                    <p className="text-gray-700 mb-2">Are you sure?</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          handleDelete(msg.srNo);
                          setDeleteDropdown(null);
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600 transition cursor-pointer"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setDeleteDropdown(null)}
                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-xs hover:bg-gray-400 transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Content */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {msg.cannedMessageName}
                </h3>
                <pre className="text-xs text-gray-600 mt-1 whitespace-pre-wrap">
                  {msg.textBody}
                </pre>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
