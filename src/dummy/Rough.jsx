import React from "react";
import { WhatsApp } from '@mui/icons-material';

// Function to replace placeholders with input values
const replacePlaceholders = (text, inputValues) => {
    return text.replace(/{{(\d+)}}/g, (match, number) => inputValues[number] || match);
};

const WhatsappLaunchPreview = ({ templateDataNew, formData }) => {
    if (!templateDataNew || !templateDataNew.components) {
        return (
            <div className="p-4 bg-gray-200 text-center rounded-md">
                <p>No template selected</p>
            </div>
        );
    }

    const bodyComponent = templateDataNew.components.find(c => c.type === "BODY");
    const buttonsComponent = templateDataNew.components.find(c => c.type === "BUTTONS");

    return (
        <div className="p-3 rounded-xl bg-gray-100 shadow-md">
            <div className="bg-[#128C7E] text-white px-4 py-2 rounded-t-md flex justify-between">
                <h2 className="text-md font-medium">Template Preview</h2>
                <WhatsApp />
            </div>

            <div className="bg-white p-3 rounded-b-md">
                {/* Body Text with Dynamic Replacement */}
                {bodyComponent && (
                    <div className="border border-gray-300 rounded-md p-2 bg-gray-100 text-sm text-gray-800">
                        {replacePlaceholders(bodyComponent.text, formData)}
                    </div>
                )}

                {/* Buttons with URL Replacement */}
                {buttonsComponent && buttonsComponent.buttons.length > 0 && (
                    <div className="mt-2 flex flex-col gap-2">
                        {buttonsComponent.buttons.map((button, index) => (
                            <a
                                key={index}
                                href={button.url ? replacePlaceholders(button.url, formData) : "#"}
                                className="bg-blue-400 text-white py-2 px-4 rounded-md text-center block"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {button.text}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WhatsappLaunchPreview;
