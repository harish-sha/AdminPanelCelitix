import { useState } from "react";
import AnimatedDropdown from "../components/AnimatedDropdown";
import TemplateRenderer from "./components/lunchPreview";
import Waba1Template from "./components/Waba1Template";

const WhatsappLaunchCampaign = () => {
    const [selectedWaba, setSelectedWaba] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [templateData, setTemplateData] = useState({});

    // Handle template updates
    const updateTemplateData = (data) => {
        setTemplateData((prev) => ({ ...prev, ...data }));
    };

    return (
        <div className="max-w-full">
            <div className="container-fluid">
                <div className="flex gap-4">
                    {/* Left Column - Selection & Inputs */}
                    <div className="w-1/3 p-0">
                        {/* Select WABA Account */}
                        <AnimatedDropdown
                            label="Select WABA"
                            options={[
                                { value: "waba1", label: "WABA 1" },
                                { value: "waba2", label: "WABA 2" },
                                { value: "waba3", label: "WABA 3" },
                            ]}
                            value={selectedWaba}
                            onChange={(value) => setSelectedWaba(value)}
                        />

                        {/* Select WABA Template */}
                        <AnimatedDropdown
                            label="Select WABA Template"
                            options={[
                                { value: "wabaTemplate1", label: "WABA Template 1" },
                                { value: "wabaTemplate2", label: "WABA Template 2" },
                                { value: "wabaTemplate3", label: "WABA Template 3" },
                            ]}
                            value={selectedTemplate}
                            onChange={(value) => setSelectedTemplate(value)}
                        />

                        {/* Dynamic Template UI based on selection */}
                        {selectedTemplate === "wabaTemplate1" && (
                            <Waba1Template updateTemplate={updateTemplateData} />
                        )}
                    </div>

                    {/* Right Column - Live Preview */}
                    <div className="w-1/3 p-0">
                        <TemplateRenderer
                            header={templateData.title?.join(", ")}
                            format={templateData.messageParams?.join("\n")}
                            imageUrl={templateData.media}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatsappLaunchCampaign;
