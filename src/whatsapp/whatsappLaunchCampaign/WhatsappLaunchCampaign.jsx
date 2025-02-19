import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';


import { getWabaList, getWabaTemplate, getWabaTemplateDetails, sendWhatsappCampaign } from '../../apis/whatsapp/whatsapp.js';
import RadioButtonLaunchCampaign from './components/RadioButtonLaunchCampaign.jsx';
import UniversalSkeleton from '../../components/common/UniversalSkeleton.jsx'
import WhatsappLaunchPreview from './components/WhatsappLaunchPreview.jsx';
import AnimatedDropdown from '../components/AnimatedDropdown';
import TemplateForm from './components/TemplateForm.jsx';
// import InputField from '../components/InputField';
import InputField from '../../components/layout/InputField.jsx';
import UniversalButton from '../components/UniversalButton.jsx'
import Loader from '../components/Loader';

const WhatsappLaunchCampaign = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [selectedWaba, setSelectedWaba] = useState("");
    const [selectedWabaMobileNo, setSelectedWabaMobileNo] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [templateOptions, setTemplateOptions] = useState([]);
    const [templateDataNew, setTemplateDataNew] = useState(null);
    const [wabaAccountId, setWabaAccountId] = useState("");
    const [wabaList, setWabaList] = useState(null);
    const [templateData, setTemplateData] = useState({});
    const [formData, setFormData] = useState({});
    const [imageFile, setImageFile] = useState(null);
    const [selectedOption, setSelectedOption] = useState("option2");
    const [fileHeaders, setFileHeaders] = useState([]);
    const [templateList, setTemplateList] = useState([]);
    const [imagePreview, setImagePreview] = useState(null)
    const [sending, setSending] = useState(false); // State to track campaign submission
    const [isFetching, setIsFetching] = useState(false);


    const navigate = useNavigate();

    const handleSubmitCampaign = async () => {
        if (!inputValue) {
            toast.error("Please enter campaign name!");
            return;
        }
        // if (!selectedWaba) {
        //     toast.error("Please fill all required fields.");
        //     return;
        // }
        // if (!selectedTemplate) {
        //     toast.error("Please fill all required fields.");
        //     return;
        // }

        const campaignData = {
            mobileIndex: "0",
            ContentMessage: formData?.message || "",
            wabaNumber: selectedWaba,
            campaignName: inputValue,
            templateSrno: templateDataNew?.id || "",
            templateName: selectedTemplate,
            templateLanguage: templateDataNew?.language || "en",
            templateCategory: templateDataNew?.category || "Marketing",
            templateType: templateDataNew?.type || "default",
            url: "",
            variables: [],
            cardsVariables: [],
            ScheduleCheck: "0",
            imgCard: imagePreview ? [imagePreview] : [],
            xlsxpath: "",
            totalRecords: "5",
            attachmentfile: "",
            urlValues: "",
            urlIndex: 0,
            isShortUrl: 0,
            isGroup: 1,
            countryCode: 91,
            scheduleDateTime: "0",
            groupValues: "-1",
        };

        try {
            setSending(true);
            console.log("🚀 Sending API Request:", campaignData);

            const response = await sendWhatsappCampaign(campaignData);

            if (response?.status) {
                toast.success("Campaign added successfully!");

                setInputValue("");
                setSelectedTemplate("");
                setTemplateDataNew(null);
                setImagePreview(null);
                setFormData({});
            } else {
                toast.error(response?.msg || "Failed to send campaign.");
            }
        } catch (error) {
            toast.error("Error sending campaign.");
            console.error("❌ API Error:", error);
        } finally {
            setSending(false);
        }


        // if (response?.status) {
        //     toast.success("Campaign added successfully!");
        //     setTimeout(() => navigate("/campaigns"), 2000); 
        // }
    };


    const handleOptionChange = (value) => {
        setSelectedOption(value);
        setFormData({});
    };

    const handleInputChange = (value) => {
        const newValue = value.replace(/\s/g, "");
        setInputValue(newValue);
    };

    const handleInputChangeNew = (value, variable) => {
        setFormData((prevData) => ({
            ...prevData,
            [`input${variable}`]: value,
        }));
    };

    // WABA LIST
    useEffect(() => {
        const fetchWabaList = async () => {
            try {
                setIsLoading(true);
                const response = await getWabaList();

                if (response) {
                    setWabaList(response);
                } else {
                    console.error("Failed to fetch WABA details");
                    toast.error("Failed to load WABA details!");
                }
            } catch (error) {
                console.error("Error fetching WABA list:", error);
                toast.error("Error fetching WABA list.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchWabaList();
    }, []);

    // Handle WABA selection
    const handleWabaSelect = async (value) => {
        setSelectedWaba(value);

        // Reset all dependent states when WABA changes
        setSelectedTemplate("");  // Clear selected template
        setTemplateDataNew(null); // Reset template data
        setFormData({});  // Clear form inputs
        setImagePreview(null);  // Remove uploaded image
        setSelectedOption("option2"); // Reset radio button to default
        setFileHeaders([]);  // Clear uploaded file headers
        setTemplateList([]); // Clear template list options
        setTemplateOptions([]); // Clear dropdown options

        const selectedWabaDetails = wabaList.find((waba) => waba.mobileNo === value);
        setSelectedWabaMobileNo(selectedWabaDetails ? [selectedWabaDetails.mobileNo] : []);
        setWabaAccountId(selectedWabaDetails?.wabaAccountId || "");
        if (selectedWabaDetails) {
            await fetchTemplateDetails(selectedWabaDetails.mobileNo);
        }
    };

    const fetchTemplateDetails = async (wabaNumber) => {
        try {
            const response = await getWabaTemplateDetails(wabaNumber);
            if (response) {
                setTemplateList(response);
                setTemplateOptions(
                    response.map((template) => ({
                        value: template.templateName,
                        label: template.templateName,
                    }))
                );
            } else {
                toast.error("Failed to load templates!");
            }
        } catch (error) {
            toast.error("Error fetching template details.");
        }
    };

    // Find the selected template data
    const selectedTemplateData = templateList.find(
        (template) => template.templateName === selectedTemplate
    );

    useEffect(() => {
        const fetchTemplateData = async () => {
            if (!selectedTemplate || !wabaAccountId) return;
            setIsFetching(true);
            try {
                const response = await getWabaTemplate(wabaAccountId, selectedTemplate);
                console.log("fetching particular template data : ", response)

                if (response && response.data && response.data.length > 0) {
                    setTemplateDataNew(response.data[0]);
                } else {
                    toast.error("Failed to load template data!");
                }
            } catch (error) {
                toast.error("Error fetching template data.");
            }
            finally {
                setIsFetching(false);
            }
        };
        fetchTemplateData();
    }, [selectedTemplate, wabaAccountId]);

    const handleFileHeadersUpdate = (headers) => {
        console.log("Received fileHeaders in WhatsappLaunchCampaign:", headers);
        setFileHeaders(headers);
    };

    return (
        <div className='max-w-full'>
            {isLoading ? (
                <>
                    <Loader />
                </>
            ) : (
                <>
                    <div className='container-fluid'>
                        <div className="flex flex-wrap">
                            <div className="col-lg-8 w-full lg:w-2/3 p-3 rounded-xl flex lg:flex-nowrap flex-wrap gap-6 bg-gray-200 min-h-[80vh]">
                                <div className='p-3 bg-gray-100 rounded-lg shadow-md lg:flex-1 w-full' >
                                    <div className='flex items-center flex-wrap justify-between gap-2 mb-3' >
                                        <div className='flex-1'>
                                            <AnimatedDropdown
                                                id='launchSelectWABA'
                                                name='launchSelectWABA'
                                                label='Select WABA'
                                                tooltipContent='Select your whatsapp business account '
                                                tooltipPlacement='right'
                                                options={wabaList?.map((waba) => ({
                                                    value: waba.mobileNo,
                                                    label: waba.name,
                                                }))}
                                                value={selectedWaba}
                                                onChange={handleWabaSelect}
                                                placeholder='Select WABA'
                                            />
                                        </div>
                                        <div className='flex-1'>
                                            <InputField
                                                tooltipContent='Your waba account mobile no.'
                                                tooltipPlacement='right'
                                                label='Mobile No'
                                                value={selectedWabaMobileNo.join(', ')}
                                                readOnly
                                                disabled
                                                placeholder='Your Waba Mobile No'
                                            />
                                        </div>
                                    </div>
                                    <div className='mb-3'>
                                        <InputField
                                            id="createCampaign"
                                            name="createCampaign"
                                            label='Campaign Name'
                                            value={inputValue}
                                            onChange={(e) => handleInputChange(e.target.value)}
                                            placeholder='Campaign Name'
                                            tooltipContent='Your templatename should not contain spaces.'
                                            tooltipPlacement='right'
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <AnimatedDropdown
                                            id='selectTemplateType'
                                            name='selectTemplateType'
                                            label='Select Template'
                                            tooltipContent='Select Template'
                                            tooltipPlacement='right'
                                            options={templateOptions}
                                            value={selectedTemplate}
                                            // onChange={(value) => setSelectedTemplate(value)}
                                            onChange={(value) => {
                                                setSelectedTemplate(value);
                                                setTemplateDataNew(null);
                                                setFormData({});
                                                setImagePreview(null);
                                                setImageFile(null);
                                            }}
                                            placeholder='Select Template'
                                        />
                                    </div>
                                    <div>
                                        {isFetching ? (
                                            <UniversalSkeleton height="15rem" width="100%" />
                                        ) : (
                                            templateDataNew && (
                                                <TemplateForm
                                                    templateDataNew={templateDataNew}
                                                    // onInputChange={handleInputChangeNew}
                                                    onInputChange={(value, variable) => setFormData(prev => ({ ...prev, [variable]: value }))}
                                                    onImageUpload={setImagePreview}
                                                    selectedOption={selectedOption}
                                                    fileHeaders={fileHeaders}
                                                    selectedTemplateData={selectedTemplateData}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="lg:flex-1 w-full">
                                    {isFetching ? (
                                        <UniversalSkeleton className='h-full' height="35rem" width="100%" />
                                    ) : (
                                        <RadioButtonLaunchCampaign
                                            onOptionChange={handleOptionChange}
                                            selectedOption={selectedOption}
                                            onFileUpload={handleFileHeadersUpdate}
                                        />
                                    )}
                                </div>
                            </div>


                            <div className="col-lg-4 w-full lg:w-1/3  p-0 flex justify-center items-start lg:mt-0 mt-5">
                                {isFetching ? (
                                    <div className='w-100' >
                                        <UniversalSkeleton className='' height="35rem" width="100%" />
                                    </div>
                                ) : (
                                    <WhatsappLaunchPreview
                                        templateDataNew={templateDataNew}
                                        formData={formData}
                                        uploadedImage={imagePreview}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-center mt-5">
                            <UniversalButton
                                id='LaunchCampaignSubmitBtn'
                                name='LaunchCampaignSubmitBtn'
                                label="Review & Send"
                                type='submit'
                                style={{ borderRadius: '40px', letterSpacing: '1px', }}
                                onClick={handleSubmitCampaign}
                                variant="primary"
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default WhatsappLaunchCampaign;
