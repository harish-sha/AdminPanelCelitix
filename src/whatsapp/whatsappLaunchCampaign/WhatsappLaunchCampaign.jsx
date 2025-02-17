import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { getWabaList, getWabaTemplate, getWabaTemplateDetails } from '../../apis/whatsapp/whatsapp.js';
import RadioButtonLaunchCampaign from './components/RadioButtonLaunchCampaign.jsx';
import UniversalSkeleton from '../../components/common/UniversalSkeleton.jsx'
import WhatsappLaunchPreview from './components/WhatsappLaunchPreview.jsx';
import AnimatedDropdown from '../components/AnimatedDropdown';
import TemplateForm from './components/TemplateForm.jsx';
import InputField from '../components/InputField';
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
    const [templateList, setTemplateList] = useState([]); // Store full template data


    const updateTemplateData = (data) => {
        setTemplateData((prev) => ({ ...prev, ...data }));
    };

    const handleOptionChange = (value) => {
        setSelectedOption(value);
    };


    const handleInputChange = (value) => {
        const newValue = value.replace(/\s/g, "");
        setInputValue(newValue);
    };

    // const handleInputChangeNew = (event, variable) => {
    //     const { value } = event.target;
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [`input${variable}`]: value,
    //     }));
    // };

    const handleInputChangeNew = (value, variable) => {
        setFormData((prevData) => ({
            ...prevData,
            [`input${variable}`]: value,
        }));
    };


    const handleImageUpload = (e) => {
        const file = e.target?.files?.[0];
        if (file) {
            console.log('File selected:', file);
        } else {
            console.error('No file selected');
        }
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
                setTemplateList(response); // Store full data
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
        };
        fetchTemplateData();
    }, [selectedTemplate, wabaAccountId]);

    const handleFileHeadersUpdate = (headers) => {
        console.log("Received fileHeaders in WhatsappLaunchCampaign:", headers);
        setFileHeaders(headers);  // Ensure fileHeaders is updated correctly
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
                        <div className="flex">
                            <div className="col-lg-8 w-full lg:w-2/3 px-3 py-3 rounded-xl flex gap-6 bg-gray-200 min-h-[80vh]">
                                <div className='p-3 bg-gray-100 rounded-lg shadow-md w-full' >
                                    <div className='flex items-center justify-between gap-2 mb-3' >
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
                                                readOnly={true}
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
                                            onChange={(value) => setSelectedTemplate(value)}
                                            placeholder='Select Template'
                                        />
                                    </div>
                                    <div>
                                        {isLoading ? (
                                            <UniversalSkeleton height="5rem" width="100%" />
                                        ) : (
                                            templateDataNew && (
                                                <TemplateForm
                                                    templateDataNew={templateDataNew}
                                                    onInputChange={handleInputChangeNew}
                                                    onImageUpload={handleImageUpload}
                                                    selectedOption={selectedOption}
                                                    fileHeaders={fileHeaders}
                                                    selectedTemplateData={selectedTemplateData} // Pass the selected template details
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="w-full">
                                    <RadioButtonLaunchCampaign
                                        onOptionChange={handleOptionChange}
                                        selectedOption={selectedOption}
                                        onFileUpload={handleFileHeadersUpdate}

                                    />
                                </div>

                            </div>


                            <div className="col-lg-4 w-full lg:w-1/3 p-0 flex justify-center items-start">
                                <WhatsappLaunchPreview
                                    templateDataNew={templateDataNew}
                                    formData={formData}
                                />
                            </div>

                        </div>
                        <div className="flex items-center justify-center mt-5">
                            <UniversalButton
                                id='LaunchCampaignSubmitBtn'
                                name='LaunchCampaignSubmitBtn'
                                label="Review & Send"
                                type='submit'
                                style={{ borderRadius: '40px', letterSpacing: '1px', }}
                                // onClick={submitTemplate}
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
