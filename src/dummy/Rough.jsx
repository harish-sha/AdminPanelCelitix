import { useEffect, useState } from 'react';
import AnimatedDropdown from '../components/AnimatedDropdown';
import InputField from '../components/InputField';
import RadioButtonLaunchCampaign from './components/RadioButtonLaunchCampaign.jsx';
import TemplateRenderer from './components/lunchPreview';
import Loader from '../components/Loader';
import { getWabaList, getWabaTemplate, getWabaTemplateDetails } from '../../apis/whatsapp/whatsapp.js';
import toast from 'react-hot-toast';

const WhatsappLaunchCampaign = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTemplate, setSelectedTemplate] = useState(""); // Store templateName here
    const [selectedWaba, setSelectedWaba] = useState(""); // Store mobileNo of selected WABA
    const [selectedWabaMobileNo, setSelectedWabaMobileNo] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [templateOptions, setTemplateOptions] = useState([]);
    const [templateDataNew, setTemplateDataNew] = useState(null);
    const [wabaList, setWabaList] = useState(null);
    const [wabaAccountId, setWabaAccountId] = useState(""); // Store wabaAccountId for selected WABA

    // Fetch WABA List
    useEffect(() => {
        const fetchWabaList = async () => {
            try {
                setIsLoading(true);
                const response = await getWabaList();

                if (response) {
                    setWabaList(response);
                } else {
                    toast.error("Failed to load WABA details!");
                }
            } catch (error) {
                toast.error("Error fetching WABA list.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchWabaList();
    }, []);

    // Handle WABA select
    const handleWabaSelect = async (value) => {
        setSelectedWaba(value);
        const selectedWabaDetails = wabaList.find((waba) => waba.mobileNo === value);
        setSelectedWabaMobileNo(selectedWabaDetails ? [selectedWabaDetails.mobileNo] : []);
        setWabaAccountId(selectedWabaDetails?.wabaAccountId || ""); // Set the wabaAccountId based on selection

        // Fetch template details for the selected WABA
        if (selectedWabaDetails) {
            await fetchTemplateDetails(selectedWabaDetails.mobileNo); // Fetch templates based on mobileNo
        }
    };

    // Fetch template list based on selected WABA
    const fetchTemplateDetails = async (wabaNumber) => {
        try {
            const response = await getWabaTemplateDetails(wabaNumber);

            if (response) {
                setTemplateOptions(
                    response.map((template) => ({
                        value: template.templateName,  // Set templateName as value
                        label: template.templateName,  // Display templateName in the dropdown
                    }))
                );
            } else {
                toast.error("Failed to load templates!");
            }
        } catch (error) {
            toast.error("Error fetching template details.");
        }
    };

    // Fetch template details based on selected template name and WABA account id
    useEffect(() => {
        const fetchTemplateData = async () => {
            if (!selectedTemplate || !wabaAccountId) return;  // Ensure both are selected

            try {
                const response = await getWabaTemplate(wabaAccountId, selectedTemplate);

                if (response && response.data && response.data.length > 0) {
                    setTemplateDataNew(response.data[0]);
                } else {
                    toast.error("Failed to load template data!");
                }
            } catch (error) {
                toast.error("Error fetching template data.");
            }
        };

        fetchTemplateData();
    }, [selectedTemplate, wabaAccountId]);

    const handleInputChange = (value) => {
        const newValue = value.replace(/\s/g, "");
        setInputValue(newValue);
    };

    return (
        <div className="max-w-full">
            {isLoading ? (
                <Loader />
            ) : (
                <div className="container-fluid">
                    <div className="flex">
                        <div className="col-lg-8 w-full lg:w-2/3 px-4 py-4 rounded-xl flex gap-6 bg-gray-200 h-[90vh]">
                            <div className="w-full">
                                <div className="mb-2 flex items-center gap-2">
                                    <div className="flex-1">
                                        <AnimatedDropdown
                                            id="launchSelectWABA"
                                            name="launchSelectWABA"
                                            label="Select WABA"
                                            tooltipContent="Select your WhatsApp business account"
                                            tooltipPlacement="right"
                                            options={wabaList?.map((waba) => ({
                                                value: waba.mobileNo,
                                                label: waba.name,
                                            }))}
                                            value={selectedWaba}
                                            onChange={handleWabaSelect}
                                            placeholder="Select WABA"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <InputField
                                            label="Mobile No"
                                            value={selectedWabaMobileNo.join(", ")}
                                            readOnly={true}
                                            placeholder="Your WABA Mobile No"
                                        />
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <InputField
                                        id="createCampaign"
                                        name="createCampaign"
                                        label="Campaign Name"
                                        value={inputValue}
                                        onChange={(e) => handleInputChange(e.target.value)}
                                        placeholder="Campaign Name"
                                        tooltipContent="Your template name should not contain spaces."
                                        tooltipPlacement="right"
                                    />
                                </div>

                                <div className="mb-2">
                                    <AnimatedDropdown
                                        id="selectTemplateType"
                                        name="selectTemplateType"
                                        label="Select Template"
                                        tooltipContent="Select Template"
                                        tooltipPlacement="right"
                                        options={templateOptions}
                                        value={selectedTemplate}
                                        onChange={(value) => setSelectedTemplate(value)}
                                        placeholder="Select Template"
                                    />
                                </div>

                                {templateDataNew && templateDataNew.data && templateDataNew.data.length > 0 && (
                                    <div className="w-full mb-2">
                                        <h2 className="font-bold text-lg">Template Details</h2>

                                        {templateDataNew.data.map((template, index) => (
                                            <div key={index} className="mb-4">
                                                <h3 className="text-xl font-semibold">{template.name}</h3>

                                                <div className="mb-2">
                                                    <label className="font-medium">Parameter Format:</label>
                                                    <p>{template.parameter_format}</p>
                                                </div>

                                                <div className="mb-2">
                                                    <label className="font-medium">Status:</label>
                                                    <p>{template.status}</p>
                                                </div>

                                                <div className="mb-2">
                                                    <label className="font-medium">Template Category:</label>
                                                    <p>{template.category}</p>
                                                </div>

                                                <div className="mb-2">
                                                    <label className="font-medium">Language:</label>
                                                    <p>{template.language}</p>
                                                </div>

                                                {/* Components Section */}
                                                <div className="mb-2">
                                                    <label className="font-medium">Components:</label>
                                                    {template.components.map((component, compIndex) => (
                                                        <div key={compIndex} className="ml-4">
                                                            <div className="mb-2">
                                                                <p><strong>Type:</strong> {component.type}</p>
                                                                <p><strong>Text:</strong> {component.text}</p>

                                                                {component.type === "BODY" && component.example && component.example.body_text && (
                                                                    <div className="mb-2">
                                                                        <strong>Example Body Text:</strong>
                                                                        {component.example.body_text.map((bodyExample, bodyIndex) => (
                                                                            <p key={bodyIndex}>{bodyExample.join(", ")}</p>
                                                                        ))}
                                                                    </div>
                                                                )}

                                                                {component.type === "BUTTONS" && component.buttons && (
                                                                    <div className="mb-2">
                                                                        <strong>Buttons:</strong>
                                                                        {component.buttons.map((button, btnIndex) => (
                                                                            <div key={btnIndex} className="mb-1">
                                                                                <p><strong>Type:</strong> {button.type}</p>
                                                                                <p><strong>Text:</strong> {button.text}</p>
                                                                                {button.type === "PHONE_NUMBER" && (
                                                                                    <p><strong>Phone Number:</strong> {button.phone_number}</p>
                                                                                )}
                                                                                {button.type === "URL" && (
                                                                                    <p><strong>URL:</strong> {button.url}</p>
                                                                                )}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-4 w-full lg:w-1/3 p-0 flex justify-center">
                            <TemplateRenderer
                                format={templateDataNew?.messageParams?.join("\n")}
                                imageUrl={templateDataNew?.media}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WhatsappLaunchCampaign;
