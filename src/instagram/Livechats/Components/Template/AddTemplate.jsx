import React, { useState } from "react";
import InputField from "@/whatsapp/components/InputField";
import CustomTabsMaterial from "@/instagram/components/CustomTabsMaterial";

const AddTemplate = ({ onAddTemplate, setAddTemplate }) => {
  const [buttons, setButtons] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [defaultType, setDefaultType] = useState("");
  const [defaultPayload, setDefaultPayload] = useState("");
  const [selectTab, setselectTab] = useState("add-template");

  const handleAddButton = () => {
    if (buttons.length < 3) {
      setButtons([...buttons, { type: "", title: "", payload: "" }]);
    }
  };

  const handleAddTemplate = () => {
    const template = {
      title,
      subtitle,
      imageUrl,
      fromMe: true,
      defaultAction: {
        type: defaultType,
        payload: defaultPayload,
      },
      buttons,
    };

    if (onAddTemplate) onAddTemplate(template);
    setAddTemplate(false);
    setButtons([]);
    setTitle("");
    setSubtitle("");
    setImageUrl("");
    setDefaultType("");
    setDefaultPayload("");
  };

  return (
    <>
      <div className="w-full max-w-3xl relative mb-12 grid grid-cols-2 gap-8 shadow-md p-4 rounded-2xl flex-col">
        <div className="flex flex-col gap-4">
          <InputField
            label="Template Title"
            placeholder="e.g. Welcome Message"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputField
            label="Template Subtitle"
            placeholder="e.g. How can I help you?"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
          <InputField
            label="Image URL"
            placeholder="e.g. https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <h3 className="text-sm font-semibold text-blue-700">
            Default Action{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </h3>

          <InputField
            label="Type"
            placeholder="e.g. web_url or postback"
            value={defaultType}
            onChange={(e) => setDefaultType(e.target.value)}
          />
          <InputField
            label="URL or Payload"
            placeholder="e.g. https://example.com or payload data"
            value={defaultPayload}
            onChange={(e) => setDefaultPayload(e.target.value)}
          />

          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-2 text-blue-700">
              Buttons{" "}
              <span className="text-gray-400 font-normal">
                (optional, max 3)
              </span>
            </h3>
            {buttons.map((btn, idx) => (
              <div key={idx} className="flex flex-row gap-2 mb-2 w-full">
                <InputField
                  label={`Button ${idx + 1} Type`}
                  placeholder="web_url or postback"
                  className="w-full md:w-56"
                  value={btn.type}
                  onChange={(e) => {
                    const updated = [...buttons];
                    updated[idx].type = e.target.value;
                    setButtons(updated);
                  }}
                />
                <InputField
                  label={`Button ${idx + 1} Title`}
                  placeholder="Button Title"
                  className="w-full md:w-56"
                  value={btn.title}
                  onChange={(e) => {
                    const updated = [...buttons];
                    updated[idx].title = e.target.value;
                    setButtons(updated);
                  }}
                />
                <InputField
                  label={`Button ${idx + 1} URL/Payload`}
                  placeholder="URL or Payload"
                  className="w-full md:w-56"
                  value={btn.payload}
                  onChange={(e) => {
                    const updated = [...buttons];
                    updated[idx].payload = e.target.value;
                    setButtons(updated);
                  }}
                />
              </div>
            ))}
            <div className="flex gap-2 mt-3">
              {buttons.length < 3 && (
                <button
                  onClick={handleAddButton}
                  className="px-4 py-1 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-semibold shadow transition"
                >
                  + Add Button
                </button>
              )}
              <button
                onClick={handleAddTemplate}
                className="px-6 py-1 rounded-md bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm font-semibold shadow transition"
              >
                Add Template
              </button>
            </div>
          </div>
        </div>

        <div className="max-h-[480px] overflow-y-auto bg-white rounded-2xl shadow-lg border border-blue-100">
          <h3 className="text-base font-bold mb-6 text-blue-800 flex items-center justify-center tracking-wide sticky top-0 bg-white z-10 p-4 rounded-t-2xl">
            Template Preview
          </h3>
          <div className="flex flex-col gap-6">
            <div className="w-full">
              <img
                src={
                  imageUrl
                    ? imageUrl
                    : "https://t3.ftcdn.net/jpg/14/40/53/46/240_F_1440534623_raS0bRLqK9z1V8AyOrXUYcDZWXGlidiL.jpg"
                }
                alt="Image Card"
                className="w-full h-[180px] object-cover border-b border-blue-100"
              />
              <div className="p-5">
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  {title}
                </h3>
                <p className="text-xs text-gray-500 mb-3">{subtitle}</p>
                <div className="space-y-2">
                  <div className="w-full px-3 py-2 rounded-lg bg-blue-100 text-sm font-medium text-blue-700 flex items-center justify-center mb-1">
                    {defaultType}
                  </div>
                  <div className="flex flex-col gap-1">
                    {buttons.map((btn, idx) => (
                      <div
                        key={idx}
                        className="w-full px-3 py-2 rounded-lg bg-blue-100 text-sm font-medium text-blue-700 flex items-center justify-center mb-1"
                      >
                        <span className="font-semibold">{btn.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTemplate;
