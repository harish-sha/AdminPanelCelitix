import { useEffect, useState } from 'react';
import AnimatedDropdown from '../components/AnimatedDropdown';
import InputField from '../components/InputField';
import RadioButton from './components/RadioButton';
import TemplateRenderer from './components/lunchPreview';
import Loader from '../components/Loader';
import Templates from './components/Templates';
import Waba1Template from './components/Waba1Template';
// import getWabaList from '../../apis/whatsapp/getWabaList.js'
import { getWabaList, getWabaTemplate, getWabaShowGroupsList, getWabaTemplateDetails } from '../../apis/whatsapp/whatsapp.js';
import { getCountryList } from '../../apis/common/common.js';
import toast from 'react-hot-toast';

const WhatsappLaunchCampaign = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isTemplateLoading, setIsTemplateLoading] = useState(false); // Loading state for templates
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [selectedWaba, setSelectedWaba] = useState("");
    const [selectedWabaMobileNo, setSelectedWabaMobileNo] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [templateOptions, setTemplateOptions] = useState([]);
    const [wabaList, setWabaList] = useState(null);
    const [templateData, setTemplateData] = useState({});

    const updateTemplateData = (data) => {
        setTemplateData((prev) => ({ ...prev, ...data }));
    };

    // Map WABA options for the dropdown
    const wabaoptions = (wabaList || []).map((waba) => ({
        value: waba.mobileNo, // Using wabaAccountId or mobileNo
        label: waba.name,
    }));

    const wabaMobileNo = (wabaList || []).map((waba) => ({
        value: waba.mobileNo,
        label: waba.mobileNo,
    }));

    useEffect(() => {
        const fetchWabaList = async () => {
            if (wabaList && wabaList.length > 0) return; // Skip loading if WABA list is already fetched
            try {
                setIsLoading(true);
                const response = await getWabaList();
                if (response && Array.isArray(response)) {
                    setWabaList(response);
                } else {
                    console.error("Failed to fetch WABA details");
                    toast.error("Failed to load WABA details!");
                }
            } catch (error) {
                console.error("Error fetching WABA list:", error);
                toast.error("Error fetching WABA list.");
            } finally {
                setIsLoading(false); // Ensure the loader stops here
            }
        };
        fetchWabaList();
    }, [wabaList]); // Fetch only when wabaList is empty

    useEffect(() => {
        if (!selectedWaba) {
            setTemplateOptions([]); // Reset templates when no WABA is selected
            return;
        }

        const fetchTemplateDetails = async () => {
            try {
                setIsTemplateLoading(true); // Start loading when fetching templates
                const response = await getWabaTemplateDetails(selectedWaba);
                if (response) {
                    setTemplateOptions(
                        response.map((template) => ({
                            value: template.templateSrno,
                            label: template.templateName,
                        }))
                    );
                } else {
                    console.error("Failed to fetch template details");
                    toast.error("Failed to load templates!");
                }
            } catch (error) {
                console.error("Error fetching template details:", error);
                toast.error("Error fetching template details.");
            } finally {
                setIsTemplateLoading(false); // Stop loading when fetching templates is complete
            }
        };
        fetchTemplateDetails();
    }, [selectedWaba]); // Only run this effect when the selectedWaba changes

    useEffect(() => {
        const fetchWabaTemplate = async () => {
            try {
                setIsLoading(true);
                const response = await getWabaTemplate();
                if (response) {
                    getWabaTemplate(response);
                } else {
                    console.error("Failed to fetch WABA Template!");
                    toast.error("Failed to load WABA Template!");
                }
            } catch (error) {
                console.error("Error fetching WABA Template list:", error);
                toast.error("Error fetching WABA Template list.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchWabaTemplate();
    }, []);

    useEffect(() => {
        const fetchWabaShowGroupsList = async () => {
            try {
                setIsLoading(true);
                const response = await getWabaShowGroupsList();
                if (response) {
                    getWabaShowGroupsList(response);
                } else {
                    console.error("Failed to fetch WABA Group List!");
                    toast.error("Failed to load WABA Group List!");
                }
            } catch (error) {
                console.error("Error fetching WABA Group List:", error);
                toast.error("Error fetching WABA Group List.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchWabaShowGroupsList();
    }, []);

    useEffect(() => {
        const fetchCountryList = async () => {
            try {
                setIsLoading(true);
                const response = await getCountryList();
                if (response) {
                    getCountryList(response);
                } else {
                    console.error("Failed to fetch Country List!");
                    toast.error("Failed to load Country List");
                }
            } catch (error) {
                console.error("Error fetching country List:", error);
                toast.error("Error fetching country List.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchCountryList();
    }, []);

    const handleInputChange = (value) => {
        const newValue = value.replace(/\s/g, "");
        setInputValue(newValue);
    };

    return (
        <div className='max-w-full'>
            {isLoading || isTemplateLoading ? (
                <Loader /> // Display loader only when either isLoading or isTemplateLoading is true
            ) : (
                <div className='container-fluid'>
                    <div className="flex gap-4">
                        <div className="col-lg-4 w-full lg:w-1/3 p-0">
                            <div className='w-100 mb-2'>
                                <AnimatedDropdown
                                    id='launchSelectWABA'
                                    name='launchSelectWABA'
                                    label='Select WABA'
                                    tooltipContent='Select your whatsapp business account'
                                    tooltipPlacement='right'
                                    options={wabaoptions}
                                    value={selectedWaba}
                                    onChange={(value) => setSelectedWaba(value)}
                                    placeholder='Select WABA'
                                />
                            </div>
                            <div className='w-100 mb-2'>
                                <AnimatedDropdown
                                    id='launchWabaMobileNo'
                                    name='launchWabaMobileNo'
                                    label='Mobile No'
                                    tooltipContent='Your Waba Mobile No.'
                                    tooltipPlacement='right'
                                    options={wabaMobileNo}
                                    value={selectedWabaMobileNo}
                                    onChange={(value) => setSelectedWabaMobileNo(value)}
                                    placeholder='Waba Mobile No'
                                />
                            </div>
                            <div className='w-100 mb-2'>
                                <InputField
                                    id="createCampaign"
                                    name="createCampaign"
                                    label='Campaign Name'
                                    value={inputValue}
                                    onChange={(e) => handleInputChange(e.target.value)}
                                    placeholder='Campaign Name'
                                    tooltipContent='Your template name should not contain spaces.'
                                    tooltipPlacement='right'
                                />
                            </div>
                            <div className='w-100 mb-2'>
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

                            <div className='w-full mb-2'>
                                {/* Dynamic Template UI based on selection */}
                                {selectedTemplate === "wabaTemplate1" && (
                                    <Waba1Template updateTemplate={updateTemplateData} />
                                )}
                            </div>
                        </div>

                        <div className="col-lg-4 w-full lg:w-1/3 p-0">
                            <RadioButton />
                        </div>
                        <div className="col-lg-4 w-full lg:w-1/3 p-0">
                            <TemplateRenderer
                                header={templateData.title}
                                format={templateData.messageParams?.join("\n")}
                                imageUrl={templateData.media}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WhatsappLaunchCampaign;
