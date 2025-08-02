import React, { useState } from "react";
import { FiArrowRight, FiEdit2, FiSend } from "react-icons/fi";

const InstaTemplateLibrary = ({
  handleSendClick = () => {},
  singleTemplate = null,
  template,
  onClose
}) => {
  const [templateList, setTemplateList] = useState([
    {
      imageUrl:
        "https://as2.ftcdn.net/v2/jpg/12/66/42/61/1000_F_1266426178_aadAW4BCtCx7DNq4fMSzEQEfq0MZ1brK.jpg",
      title: "Thanks for Following ❤️",
      subtitle: "Tap below to browse products, contact us, or see our story.",
      defaultAction: {
        type: "web_url",
        payload: "https://example.com",
      },
      buttons: [
        {
          type: "web_url",
          title: "Visit Website",
          payload: "https://example.com",
        },
      ],
    },
    {
      imageUrl:
        "https://as1.ftcdn.net/v2/jpg/12/74/19/18/1000_F_1274191831_oJJSkvF0srtR2MuPRKy7xsc4iA1Y0NLi.jpg",
      title: "New Here?",
      subtitle: "Let’s show you around — just tap one of the options below!",
      defaultAction: {
        type: "postback",
        payload: "START_ONBOARDING",
      },

      buttons: [
        {
          type: "postback",
          title: "Ask a Question",
          payload: "ASK_SUPPORT",
        },
      ],
    },
    {
      imageUrl:
        "https://as1.ftcdn.net/v2/jpg/06/99/46/60/1000_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg",
      title: "Stay Updated 🔔",
      subtitle: "Never miss a thing. Tap a button to explore our latest posts.",
      defaultAction: {
        type: "postback",
        payload: "SUBSCRIBE_UPDATES",
      },
      buttons: [
        {
          type: "web_url",
          title: "Contact Us",
          payload: "https://example.com/contact",
        },
      ],
    },
  ]);

  const [buttonTempList, setButtonTempList] = useState([
    {
      title: "Hey  Welcome!",
      subtitle: "Tap a button below to explore or get quick help.",
      defaultAction: {
        type: "postback",
        payload: "DEFAULT_WELCOME",
      },
      buttons: [
        {
          type: "postback",
          title: "See Latest Posts",
          payload: "SEE_LATEST_POSTS",
        },
      ],
    },
    {
      title: "Let’s Get Started",
      subtitle: "Choose an option and I’ll guide you from here.",
      defaultAction: {
        type: "postback",
        payload: "DEFAULT_WELCOME",
      },
      buttons: [
        {
          type: "postback",
          title: "Get Help",
          payload: "GET_HELP",
        },
      ],
    },
    {
      title: "What Brings You Here?",
      subtitle: "Pick a button to explore our latest updates or ask something.",
      defaultAction: {
        type: "postback",
        payload: "START_ONBOARDING",
      },
      buttons: [
        {
          type: "postback",
          title: "FAQs",
          payload: "VIEW_FAQ",
        },
      ],
    },
  ]);

  const [buttons, setButtons] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [defaultType, setDefaultType] = useState("");
  const [defaultPayload, setDefaultPayload] = useState("");

  const templatesToRender = singleTemplate ? [singleTemplate] : templateList;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {templatesToRender.map((template, idx) => (
          <div
            key={idx}
            className="w-full max-w-[320px] mx-auto max-h-[480px] overflow-y-auto bg-white rounded-2xl shadow-lg border border-blue-100 relative group"
            >
            {/* Hover Buttons */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <button
                className="bg-white border border-blue-200 rounded-full p-2 shadow hover:bg-blue-50"
                title="Edit"
                onClick={() => handleSendClick(idx)}
              >
                <FiEdit2 className="text-blue-700" />
              </button>
              <button
                className="bg-white border border-blue-200 rounded-full p-2 shadow hover:bg-blue-50"
                title="Send"
                onClick={() => {
                  handleSendClick(template, null);
                  if (onClose) onClose();
                }}
              >
                <FiSend className="text-blue-700" />
              </button>
            </div>
            <h3 className="text-base font-bold mb-6 text-blue-800 flex items-center justify-center tracking-wide sticky top-0 bg-white z-10 p-4 rounded-t-2xl">
              Template Preview
            </h3>
            <div className="flex flex-col gap-6">
              <div className="w-full">
                <img
                  src={template.imageUrl}
                  alt="Image Card"
                  className="w-full h-[180px] object-cover border-b border-blue-100"
                />
                <div className="p-5">
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    {template.title || ""}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">
                    {template.subtitle || ""}
                  </p>
                  <div className="space-y-2">
                    <div className="w-full px-3 py-2 rounded-lg bg-blue-100 text-sm font-medium text-blue-700 flex items-center justify-center mb-1">
                      {template.defaultAction?.payload || ""}
                    </div>
                    <div className="flex flex-col gap-1">
                      {(template.buttons || []).map((btn, bidx) => (
                        <div
                          key={bidx}
                          className="w-full px-3 py-2 rounded-lg bg-blue-100 text-sm font-medium text-blue-700 flex items-center justify-center mb-1"
                        >
                          <span className="font-semibold ">{btn.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!singleTemplate && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-3">
           {buttonTempList.map((temp, idx) => (
            <div
              key={idx}
              className="w-full max-w-[320px] mx-auto max-h-[250px] overflow-y-auto bg-white rounded-2xl shadow-lg border border-blue-100 relative group"
            >
              {/* Hover Buttons */}
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <button
                  className="bg-white border border-blue-200 rounded-full p-2 shadow hover:bg-blue-50"
                  title="Edit"
                >
               <FiEdit2 className="text-blue-700" />
                </button>
                <button
                  className="bg-white border border-blue-200 rounded-full p-2 shadow hover:bg-blue-50"
                  title="Send"
                  onClick={() => {
                    handleSendClick(null, temp);
                    if (onClose) onClose();
                  }}
                >
                  <FiSend className="text-blue-700" />
                </button>
              </div>
              <h3 className="text-base font-bold  text-blue-800 flex items-center justify-center tracking-wide sticky top-0 bg-white z-10 p-3 rounded-t-2xl">
                Template Preview
              </h3>
              <div className="flex flex-col gap-4">
                <div className="p-4">
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="text-base font-bold text-gray-900 mb-1">
                      {temp.title || ""}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">
                      {temp.subtitle || ""}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full px-3 py-2 rounded-lg bg-blue-100 text-sm font-medium text-blue-700 flex items-center justify-center mb-1">
                      {temp.defaultAction?.payload || ""}
                    </div>
                    <div className="flex flex-col gap-1">
                      {(temp.buttons || []).map((btn, bidx) => (
                        <div
                          key={bidx}
                          className="w-full px-3 py-2 rounded-lg bg-blue-100 text-sm font-medium text-blue-700 flex items-center justify-center mb-1"
                        >
                          <span className="font-semibold">{btn.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default InstaTemplateLibrary;
