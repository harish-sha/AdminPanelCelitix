import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { getWabaList, getWabaTemplate, getWabaTemplateDetails } from '../../apis/whatsapp/whatsapp.js';
import Loader from '../components/Loader';
import UniversalSkeleton from '../../components/common/UniversalSkeleton.jsx'
import AnimatedDropdown from '../components/AnimatedDropdown';
import InputField from '../components/InputField';
import RadioButtonLaunchCampaign from './components/RadioButtonLaunchCampaign.jsx';
import TemplateRenderer from './components/lunchPreview';
import Waba1Template from './components/Waba1Template';
import TemplateForm from './components/TemplateForm.jsx';

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
    const [formData, setFormData] = useState({}); // Form data state
    const [imageFile, setImageFile] = useState(null);  // State to store image

    const updateTemplateData = (data) => {
        setTemplateData((prev) => ({ ...prev, ...data }));
    };

    const handleInputChange = (value) => {
        const newValue = value.replace(/\s/g, "");
        setInputValue(newValue);
    };

    const handleInputChangeNew = (event, variable) => {
        const { value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [`input${variable}`]: value,
        }));
    };

    // const handleImageUpload = (event) => {
    //     const file = event.target.files[0];
    //     setImageFile(file);  // Store the uploaded image file
    // };

    const handleImageUpload = (e) => {
        const file = e.target?.files?.[0]; // Safe check for files
        if (file) {
            // Proceed with the upload logic if the file is valid
            console.log('File selected:', file);
        } else {
            // Handle the case where no file is selected
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


    return (
        <div className='max-w-full'>
            {isLoading ? (
                <>
                    <Loader />
                </>
            ) : (
                <>
                    <div className='container-fluid '>
                        <div className="flex">
                            <div className="col-lg-8 w-full lg:w-2/3 px-3 py-3 rounded-xl flex gap-6 bg-gray-200 h-[90vh]">
                                <div className='p-3 bg-gray-100 rounded-lg shadow-md w-full' >
                                    <div className='flex items-center justify-between gap-2 mb-3' >

                                        <div className=' flex-1'>
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
                                        <div className=' flex-1'>
                                            <InputField
                                                // id='launchWabaMobileNo'
                                                // name='launchWabaMobileNo'
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
                                    {isLoading ? (
                                        <UniversalSkeleton height="5rem" width="100%" />
                                    ) : (
                                        templateDataNew && (
                                            // <div className="w-full mb-2">
                                            //     <h2>{templateDataNew.parameter_format}</h2>
                                            //     <p>{templateDataNew.name}</p>
                                            //     <p>{templateDataNew.status}</p>
                                            //     <p>Template Category: {templateDataNew.category}</p>
                                            // </div>
                                            <TemplateForm
                                                templateDataNew={templateDataNew}
                                                onInputChange={handleInputChangeNew}
                                                onImageUpload={handleImageUpload}
                                            />
                                        )
                                    )}

                                    {/* <div className='w-full mb-2' >
                                        {selectedTemplate === "wabaTemplate1" && (
                                            <Waba1Template updateTemplate={updateTemplateData} />
                                        )}
                                    </div> */}
                                </div>
                                <div className="w-full">
                                    <RadioButtonLaunchCampaign />
                                </div>
                            </div>


                            <div className="col-lg-4 w-full lg:w-1/3 p-0 flex justify-center">
                                <TemplateRenderer
                                    // header={templateDataNew.message}
                                    format={templateData.messageParams?.join("\n")}
                                    imageUrl={templateData.media}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default WhatsappLaunchCampaign
