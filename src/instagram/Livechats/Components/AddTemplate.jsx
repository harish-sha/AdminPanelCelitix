import React, { useState } from "react";
import InputField from "@/whatsapp/components/InputField";

const AddTemplate = ({ onAddTemplate, setAddTemplate }) => {
  const [buttons, setButtons] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [defaultType, setDefaultType] = useState("");
  const [defaultPayload, setDefaultPayload] = useState("");
  const [template, setTemplate] = useState([]);

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
      defaultAction: {
        type: defaultType,
        payload: defaultPayload,
      },
      buttons,
    };
    if (title.trim()) {
      setTemplate((prevTemplates) => [...prevTemplates, template]);
    }
    if (onAddTemplate) onAddTemplate(template);
    // setAddTemplate(false);
    setButtons([]);
    setTitle("");
    setSubtitle("");
    setImageUrl("");
    setDefaultType("");
    setDefaultPayload("");
  };

  return (
    <>
      <div className="w-full max-w-xl relative mb-8">
        <div className="flex flex-row gap-3">
          <InputField
            label="Template Title"
            placeholder="e.g. Welcome Message"
            className="w-full md:w-56"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputField
            label="Template Subtitle"
            placeholder="e.g. How can I help you?"
            className="w-full md:w-56"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>

        <div className="flex flex-row gap-3 mt-3">
          <InputField
            label="Image URL"
            placeholder="e.g. https://example.com/image.jpg"
            className="w-full md:w-56"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-2">
            Default Action (optional)
          </h3>
          <div className="flex flex-row gap-3">
            <InputField
              label="Type"
              placeholder="e.g. web_url or postback"
              className="w-full md:w-56 mb-2"
              value={defaultType}
              onChange={(e) => setDefaultType(e.target.value)}
            />
            <InputField
              label="URL or Payload"
              placeholder="e.g. https://example.com or payload data"
              className="w-full md:w-56 mb-2"
              value={defaultPayload}
              onChange={(e) => setDefaultPayload(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-2">
            Buttons (optional, max 3)
          </h3>

          {buttons.map((btn, idx) => (
            <div key={idx} className="flex flex-row gap-3 mb-2">
              <InputField
                label={`Button ${idx + 1} Type`}
                placeholder="web_url or postback"
                className="w-full md:w-40"
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
                className="w-full md:w-40"
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
                className="w-full md:w-40"
                value={btn.payload}
                onChange={(e) => {
                  const updated = [...buttons];
                  updated[idx].payload = e.target.value;
                  setButtons(updated);
                }}
              />
            </div>
          ))}

          {buttons.length < 3 && (
            <button
              onClick={handleAddButton}
              className="mt-2 px-4 py-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-sm transition"
            >
              + Add Button
            </button>
          )}
        </div>

        <div className="flex justify-end mt-3">
          <button
            onClick={handleAddTemplate}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
          >
            Add
          </button>
        </div>
      </div>

      {template.length > 0 && (
        <>
          <div className="mt-4 card max-w-md p-2 shadow-md rounded-xl absolut right-0  top-5 ">
            <h3 className="text-sm font-semibold mb-2"> Templates</h3>
            <div>
              {template.map((temp, index) => (
                <div key={index} className="p-2  rounded mb-2">
                  <h4 className=""> {temp.title}</h4>
                  <p className="text-sm text-gray-600"> {temp.subtitle} </p>
                  <p className=""> {temp.imageUrl} </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

    </>
  );
};

export default AddTemplate;
