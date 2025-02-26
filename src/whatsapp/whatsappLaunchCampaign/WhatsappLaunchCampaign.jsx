import { useEffect, useState } from 'react';
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
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
    const [sending, setSending] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const [xlsxPath, setXlsxPath] = useState("");
    const [totalRecords, setTotalRecords] = useState("")
    const [selectedCountryCode, setSelectedCountryCode] = useState("");
    const [selectedMobileColumn, setSelectedMobileColumn] = useState('');
    const [isGroup, setIsGroup] = useState(0);


    const [urlIndex, setUrlIndex] = useState(null);  // ✅ Define state in parent


    const [selectedGroups, setSelectedGroups] = useState([]);

    const [testMobileNumber, setTestMobileNumber] = useState("");
    const [schedule, setSchedule] = useState(false);
    const [scheduledDateTime, setScheduledDateTime] = useState(null);
    // const [agreeTerms, setAgreeTerms] = useState(false);

    const [dialogVisible, setDialogVisible] = useState(false);

    // const handleGroupChange = (value) => {
    //     console.log("isGroup Updated:", value);
    //     setIsGroup(value);
    // };

    const handleUrlIndexChange = (index) => {
        console.log("Updating URL Index in Parent:", index);
        setUrlIndex(index);  // ✅ Store the updated index
    };

    const handleGroupChange = (value) => {
        console.log("isGroup Updated:", value);

        if (Array.isArray(value)) {
            setIsGroup(1);
            setSelectedGroups(value);
        } else if (typeof value === "string") {
            if (value === "-1") {
                setIsGroup(1);
                setSelectedGroups([]);
            } else if (value.includes(",")) {
                setIsGroup(1);
                setSelectedGroups(value.split(",").map(Number));
            } else {
                setIsGroup(0);
                setSelectedGroups([]);
            }
        } else if (typeof value === "number") {
            setIsGroup(1);
            setSelectedGroups([value]);
        } else {
            console.error("Unexpected value type in handleGroupChange:", value);
        }

        // ✅ If switching to Groups, reset Excel data
        if (isGroup === 1) {
            setXlsxPath("");
            setTotalRecords("");
            setSelectedCountryCode("");
            setSelectedMobileColumn("");
        }
    };


    const handleImageUpload = (imageUrl) => {
        console.log("Uploaded Image URL:", imageUrl);
        setImageFile(imageUrl);
        setImagePreview(imageUrl);
    };

    const handleSubmitCampaign = async () => {
        // if (!selectedWaba) {
        //     toast.error("Please select a WhatsApp Business Account (WABA).");
        //     return;
        // }

        // if (!inputValue) {
        //     toast.error("Please enter a campaign name!");
        //     return;
        // }

        // if (!selectedTemplate) {
        //     toast.error("Please select a WhatsApp template.");
        //     return;
        // }

        // if (!xlsxPath) {
        //   toast.error("Please upload an Excel file with contact numbers.");
        //   return;
        // }

        // if (!selectedMobileColumn) {
        //   toast.error(
        //     "Please select the mobile number column from the uploaded file."
        //   );
        //   return;
        // }

        // ✅ If all validations pass, open the review dialog
        setDialogVisible(true);
    };

    const handleFinalSubmit = async (event) => {
        if (event) event.preventDefault();
        // if (!agreeTerms) {
        //     toast.error("Please agree to the terms and conditions.");
        //     return;
        // }

        const selectedWabaData = wabaList?.find(
            (waba) => waba.mobileNo === selectedWaba
        );
        const selectedTemplateData = templateList?.find(
            (template) => template.templateName === selectedTemplate
        );

        const contentValues = Object.keys(formData)
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
            .map((key) => `#${formData[key]}#`)
            .join(",");

        // ✅ If using Groups, clear file-related data
        if (isGroup === 1) {
            setXlsxPath("");
            setTotalRecords("");
            setSelectedCountryCode("");
            setSelectedMobileColumn("");
        }

        // ✅ Ensure `groupValues` is formatted correctly
        const groupValues = isGroup === 1 && selectedGroups.length > 0
            ? selectedGroups.join(",")
            : "-1";

        // ✅ Prepare Request Payload
        const requestData = {
            mobileIndex: selectedMobileColumn,
            ContentMessage: contentValues || "",
            wabaNumber: selectedWabaData?.wabaSrno || "",
            campaignName: inputValue,
            templateSrno: selectedTemplateData?.templateSrno || "",
            templateName: selectedTemplate,
            templateLanguage: selectedLanguage,
            templateCategory: selectedTemplateData?.category || "",
            templateType: selectedTemplateData?.type || "",
            url: "",
            variables: [],
            ScheduleCheck: "0",
            xlsxpath: xlsxPath,
            totalRecords: totalRecords,
            attachmentfile: imageFile || "",
            urlValues: "",
            urlIndex: urlIndex ?? -1,
            isShortUrl: 0,
            isGroup: isGroup,
            countryCode: selectedCountryCode || "",
            // scheduleDateTime: schedule ? scheduledDateTime : "0",
            scheduleDateTime: "0",
            groupValues,
        };

        console.log("Final Data Submission:", requestData);

        // ✅ Send API request
        try {
            const response = await sendWhatsappCampaign(requestData);
            if (response?.status === true) {
                toast.success("Campaign launched successfully!");
                setDialogVisible(false);

                // setTimeout(() => {
                //     window.location.reload();
                // }, 1000); // Reload after 2 seconds to allow toast message visibility
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
        setUrlIndex(null);
    };

    const handleInputChange = (value) => {
        const newValue = value.replace(/\s/g, "");
        setInputValue(newValue);
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


    const handleFileHeadersUpdate = (filePath, headers, totalRecords, countryCode, selectedMobileColumn) => {
        setFileHeaders(headers);
        setTotalRecords(totalRecords);
        setXlsxPath(filePath);
        setSelectedMobileColumn(selectedMobileColumn);
        if (countryCode) {
            setSelectedCountryCode(countryCode);
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
                                                    onInputChange={(value, variable) => setFormData(prev => ({ ...prev, [variable]: value }))}
                                                    onImageUpload={handleImageUpload}
                                                    selectedOption={selectedOption}
                                                    fileHeaders={fileHeaders}
                                                    selectedTemplateData={selectedTemplateData}
                                                    onUrlIndexChange={setUrlIndex}
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
                                            onGroupChange={handleGroupChange}
                                            setSelectedGroups={setSelectedGroups}
                                            onUrlIndexChange={setUrlIndex}

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

                    {/* Dialog Box for Review & Submission */}
                    <Dialog
                        header="Review & Confirm"
                        visible={dialogVisible}
                        style={{ width: "35rem" }}
                        onHide={() => setDialogVisible(false)}
                        draggable={false}
                    >
                        <div className="space-y-5">
                            <div className="p-3 bg-gray-100 text-md text-gray-800 rounded-md shadow-lg space-y-2 grid grid-cols-2">
                                <span className="font-semibold font-m">WABA Account : </span>
                                <p className="">
                                    {wabaList?.find((waba) => waba.mobileNo === selectedWaba)?.name || "N/A"}
                                </p>
                                <span className="font-semibold font-m">Template Name : </span>
                                <p className="">
                                    {selectedTemplate || "N/A"}
                                </p>
                                <span className="font-semibold font-m">Template Type : </span>
                                <p className="">
                                    {selectedTemplateData?.type || "N/A"}
                                </p>
                                <span className="font-semibold font-m">Template Category : </span>
                                <p className="">
                                    {selectedTemplateData?.category || "N/A"}
                                </p>
                                <span className="font-semibold font-m">Campaign Name : </span>
                                <p className="w-full break-words">
                                    {inputValue || "N/A"}
                                </p>
                                <span className="font-semibold font-m">Total Audience : </span>
                                <p className="">
                                    {totalRecords || "N/A"}
                                </p>
                            </div>
                            {/* <div className="flex items-end gap-2">
                                <div className="flex-1">
                                    <InputField
                                        id="testMobileNumber"
                                        name="testMobileNumber"
                                        label="Test Mobile Number"
                                        value={testMobileNumber}
                                        onChange={(e) => setTestMobileNumber(e.target.value)}
                                        placeholder="Enter mobile number"
                                        tooltipContent="Enter a mobile number to test the campaign."
                                        tooltipPlacement="right"
                                        type="number"
                                        maxLength="10"
                                    />
                                </div>
                                <UniversalButton
                                    label="Test Now"
                                    onClick={() => toast.success("Test message sent!")}
                                    variant="primary"
                                />
                            </div> */}
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    inputId="scheduleCheckbox"
                                    checked={schedule}
                                    onChange={(e) => setSchedule(e.checked)}
                                />
                                <label htmlFor="scheduleCheckbox" className="text-md">
                                    Schedule
                                </label>
                                {schedule && (
                                    <Calendar
                                        id="scheduleDateTime"
                                        value={scheduledDateTime}
                                        onChange={(e) => setScheduledDateTime(e.value)}
                                        showTime
                                        hourFormat="12"
                                        minDate={new Date()}
                                    />
                                )}
                            </div>
                            {/* <div className="flex items-center gap-2">
                                <Checkbox
                                    inputId="agreeTermsCheckbox"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.checked)}
                                />
                                <label htmlFor="agreeTermsCheckbox">
                                    I agree to terms and conditions*
                                </label>
                            </div> */}
                            <div className="flex items-center justify-center" >
                                {/*final Submit Button */}
                                <UniversalButton
                                    label="Send Campaign"
                                    onClick={(e) => handleFinalSubmit(e)}  // ✅ Pass event to prevent page reload
                                    style={{
                                        borderRadius: "40px",
                                        letterSpacing: "1px",
                                    }}
                                    variant="primary"
                                />
                            </div>
                        </div>
                    </Dialog>
                </>
            )}
        </div>
    )
}

export default WhatsappLaunchCampaign;
