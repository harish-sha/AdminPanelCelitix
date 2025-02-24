import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';


import { getWabaList, getWabaTemplate, getWabaTemplateDetails, sendWhatsappCampaign } from '../../apis/whatsapp/whatsapp.js';
import RadioButtonLaunchCampaign from './components/RadioButtonLaunchCampaign.jsx';
import UniversalSkeleton from '../../components/common/UniversalSkeleton.jsx'
import WhatsappLaunchPreview from './components/WhatsappLaunchPreview.jsx';
import AnimatedDropdown from '../components/AnimatedDropdown';
import TemplateForm from './components/TemplateForm.jsx';
import InputField from '../../components/layout/InputField.jsx';
import UniversalButton from '../components/UniversalButton.jsx'
import Loader from '../components/Loader';

const WhatsappLaunchCampaign = ({ selectedTemplateDetails }) => {
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
    const [sending, setSending] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const [xlsxPath, setXlsxPath] = useState("");
    const [totalRecords, setTotalRecords] = useState("")
    const [selectedCountryCode, setSelectedCountryCode] = useState("");
    const [selectedMobileColumn, setSelectedMobileColumn] = useState('');

    const navigate = useNavigate();

    const handleSubmitCampaign = async () => {

        // ✅ Extract Values from API Responses
        const selectedWabaData = wabaList?.find(waba => waba.mobileNo === selectedWaba);
        const selectedTemplateData = templateList?.find(template => template.templateName === selectedTemplate);

        // ✅ Generate ContentMessage dynamically based on user input
        const contentValues = Object.keys(formData)
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true })) // Sort by variable number
            .map((key) => `#${formData[key]}#`) // Wrap values in `#`
            .join(","); // Join values with a comma

        console.log("📌 Generated ContentMessage:", contentValues); // Debugging log


        // Step 1: Validate WABA selection
        if (!selectedWaba) {
            toast.error("Please select a WhatsApp Business Account (WABA).");
            return;
        }

        if (!inputValue) {
            toast.error("Please enter campaign name!");
            return;
        }

        // Step 2: Validate Template selection
        if (!selectedTemplate) {
            toast.error("Please select a WhatsApp template.");
            return;
        }

        // Step 4: Validate if the user uploaded a contact file
        if (!xlsxPath) {
            toast.error("Please upload an Excel file with contact numbers.");
            return;
        }

        // Step 3: Validate Country Code selection (if applicable)
        if (!selectedCountryCode && selectedOption === "option2") {
            toast.error("Please select a country code.");
            return;
        }

        // Step 5: Validate Mobile Number Column selection
        if (!selectedMobileColumn && selectedOption === "option2") {
            toast.error("Please select the mobile number column from the uploaded file.");
            return;
        }

        if (!selectedMobileColumn) {
            toast.error("Please select the mobile number column from the uploaded file.");
            return;
        }

        // if (!contentValues) {
        //     toast.error("Please enter message parameters");
        //     return;
        // }


        // ✅ If all validations pass, prepare data
        const requestData = {
            mobileIndex: selectedMobileColumn,
            ContentMessage: contentValues,
            wabaNumber: selectedWabaData?.wabaSrno,
            campaignName: inputValue,
            templateSrno: selectedTemplateData?.templateSrno,
            templateName: selectedTemplate,
            templateLanguage: selectedLanguage,
            templateCategory: selectedTemplateData?.category,
            templateType: selectedTemplateData?.type,
            // variables: Object.values(formData) || [],
            // imgCard: imagePreview ? [imagePreview] : [],
            xlsxpath: xlsxPath,
            totalRecords: totalRecords,
            countryCode: selectedCountryCode,
        };

        console.log("final data submission", requestData)

        // Send API request
        try {
            const response = await sendWhatsappCampaign(requestData);
            if (response?.status === true) {
                toast.success("Campaign launched successfully!");
            } else {
                toast.error(response?.message || "Campaign launch failed.");
            }
        } catch (error) {
            console.error("Error submitting campaign:", error);
            toast.error("Error launching campaign. Please try again.");
        }
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
        setSelectedTemplate("");
        setTemplateDataNew(null);
        setFormData({});
        setImagePreview(null);
        setSelectedOption("option2");
        setFileHeaders([]);
        setTemplateList([]);
        setTemplateOptions([]);

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

                if (response && response.data && response.data.length > 0) {
                    setTemplateDataNew(response.data[0]);
                    setSelectedLanguage(response.data[0]?.language);
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

    // const handleFileHeadersUpdate = (headers) => {
    //     console.log("Received fileHeaders in WhatsappLaunchCampaign:", headers);
    //     setFileHeaders(headers);
    // };

    const handleFileHeadersUpdate = (filePath, headers, totalRecords, countryCode, selectedMobileColumn) => {
        setFileHeaders(headers);
        setTotalRecords(totalRecords);
        setXlsxPath(filePath); // ✅ Store uploaded file path
        setSelectedMobileColumn(selectedMobileColumn);

        if (countryCode) {
            setSelectedCountryCode(countryCode); // ✅ Ensure country code updates properly
        }
    };

    useEffect(() => {
        console.log("📌 Updated selectedCountryCode in Parent:", selectedCountryCode);
    }, [selectedCountryCode]);



    useEffect(() => {
        console.log("selected WABA", selectedWaba);
    }, [selectedWaba]);


    useEffect(() => {
        console.log("Campaign name", inputValue);
    }, [inputValue]);

    useEffect(() => {
        console.log("selected template - ", selectedTemplate);
    }, [selectedTemplate]);

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
                            <div className=" w-full lg:w-2/3 p-3 rounded-xl flex lg:flex-nowrap flex-wrap gap-6 bg-gray-200 min-h-[80vh]">
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
                                <div className="lg:flex-1 lg:w-0 w-full">
                                    {isFetching ? (
                                        <UniversalSkeleton className='h-full' height="44.5rem" width="100%" />
                                    ) : (
                                        <RadioButtonLaunchCampaign
                                            onOptionChange={handleOptionChange}
                                            selectedOption={selectedOption}
                                            onFileUpload={handleFileHeadersUpdate}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="w-full lg:w-1/3 px-5 lg:mt-0 mt-5 min-h-[80vh]">
                                {isFetching ? (
                                    <div className='w-full' >
                                        <UniversalSkeleton className='' height="46rem" width="100%" />
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
