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
import { getCountryList } from '../../apis/common/common.js'
import toast from 'react-hot-toast';

const WhatsappLaunchCampaign = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [valueWithoutSpaces, setValueWithoutSpaces] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [selectedWaba, setSelectedWaba] = useState("");
    const [selectedWabaMobileNo, setSelectedWabaMobileNo] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [templateOptions, setTemplateOptions] = useState([]);
    const [templateDataNew, setTemplateDataNew] = useState(null); // Store selected template data


    const [wabaList, setWabaList] = useState(null);

    const [templateData, setTemplateData] = useState({});

    // Handle template updates
    const updateTemplateData = (data) => {
        setTemplateData((prev) => ({ ...prev, ...data }));
    };

    // const wabaoptions = [
    //     { value: 'WABA1', label: 'WABA1' },
    //     { value: 'WABA2', label: 'WABA2' },
    //     { value: 'WABA3', label: 'WABA3' },
    // ];

    // const wabaoptions = wabaList.map((waba) => ({
    //     value: waba.name,
    //     label: waba.name,
    // }));

    // const wabaoptions = (wabaList || []).map((waba) => ({
    //     value: waba.name,
    //     label: waba.name,
    // }));

    // Map WABA options for the dropdown
    const wabaoptions = (wabaList || []).map((waba) => ({
        value: waba.mobileNo,
        label: waba.name,
    }));

    const wabaMobileNo = (wabaList || []).map((waba) => ({
        value: waba.mobileNo,
        label: waba.mobileNo,
    }));

    // const templateOptions = [
    //     { value: "wabaTemplate1", label: "WABA Template 1" },
    //     { value: "wabaTemplate2", label: "WABA Template 2" },
    //     { value: "wabaTemplate3", label: "WABA Template 3" },
    // ];

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

    // WABA Template selection and fetch templates
    useEffect(() => {
        if (selectedWaba) {
            const fetchTemplateDetails = async () => {
                try {
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
                }
            };
            fetchTemplateDetails();
        } else {
            setTemplateOptions([]);
        }
    }, [selectedWaba]);

    // Fetch templates based on TemplateDetails
    useEffect(() => {
        const fetchTemplateDetails = async () => {
            if (!selectedTemplate) return;

            try {
                // setIsLoading(true); // Start loading
                const response = await getWabaTemplate(selectedTemplate);

                if (response && response.length > 0) {
                    setTemplateDataNew(response[0]);
                } else {
                    console.error("Failed to fetch template details");
                    toast.error("Failed to load templates!");
                }
            } catch (error) {
                console.error("Error fetching template details:", error);
                toast.error("Error fetching template details.");
            }
        };

        fetchTemplateDetails();
    }, [selectedTemplate]);


    // waba show groups list
    // useEffect(() => {
    //     const fetchWabaShowGroupsList = async () => {
    //         try {
    //             setIsLoading(true);

    //             const response = await getWabaShowGroupsList();
    //             console.log("Show Group List:", response);


    //             if (response) {
    //                 getWabaShowGroupsList(response);
    //             } else {
    //                 console.error("Failed to fetch WABA Group List!");
    //                 toast.error("Failed to load WABA Group List!");
    //             }
    //         } catch (error) {
    //             console.error("Error fetching WABA Group List:", error);
    //             toast.error("Error fetching WABA Group List.");
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    //     fetchWabaShowGroupsList();
    // }, []);

    // Get country list 
    // useEffect(() => {
    //     const fetchCountryList = async () => {
    //         try {
    //             setIsLoading(true);

    //             const response = await getCountryList();
    //             console.log("Country List:", response);


    //             if (response) {
    //                 getCountryList(response);
    //             } else {
    //                 console.error("Failed to fetch Country List!");
    //                 toast.error("Failed to load Country List");
    //             }
    //         } catch (error) {
    //             console.error("Error fetching country List:", error);
    //             toast.error("Error fetching country List.");
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    //     fetchCountryList();
    // }, []);

    const handleInputChange = (value) => {
        const newValue = value.replace(/\s/g, "");
        setInputValue(newValue);
    };

    return (
        <div className='max-w-full'>
            {isLoading ? (
                <>
                    <Loader />
                </>
            ) : (
                <>
                    <div className='container-fluid '>
                        <div className="flex gap-4 ">
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
                                        tooltipContent='Your templatename should not contain spaces.'
                                        tooltipPlacement='right'
                                    />
                                </div>
                                <div className="w-100 mb-2">

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

                                {/* <div className='w-100 mb-2' >
                                    <h2>{templateDataNew.template_name}</h2>
                                    <p>{templateDataNew.message}</p>
                                    <a href={templateDataNew.url_value}>{templateDataNew.url_display}</a>
                                </div> */}
                                {isLoading ? (
                                    <UniversalSkeleton height="5rem" width="100%" />
                                ) : (
                                    // Display selected template details
                                    templateDataNew && (
                                        <div className='w-100 mb-2' >
                                            <p>{templateDataNew.phone_value_2}</p>
                                            <p>{templateDataNew.parent_user}</p>
                                            <p>{templateDataNew.vendor_template_id}</p>
                                            <p>{templateDataNew.og_url}</p>
                                            <p>{templateDataNew.phone_display1}</p>
                                            <h2>{templateDataNew.sr_no}</h2>
                                            <h2>{templateDataNew.template_type}</h2>
                                            <h2>{templateDataNew.top_reseller}</h2>
                                            <h2>{templateDataNew.url_display1}</h2>
                                            <h2>{templateDataNew.file_path}</h2>
                                            <h2>{templateDataNew.phone_value1}</h2>
                                            <h2>{templateDataNew.phone_display_2}</h2>
                                            <h2>{templateDataNew.url_display_2}</h2>
                                            <h2>{templateDataNew.phone_value}</h2>
                                            <h2>{templateDataNew.is_hide}</h2>
                                            <h2>{templateDataNew.url_display}</h2>
                                            <h2>{templateDataNew.phone_display}</h2>
                                            <h2>{templateDataNew.url_value_2}</h2>
                                            <h2>variable count:{templateDataNew.variable_count}</h2>
                                            <h2>{templateDataNew.is_shorturl}</h2>
                                            <h2>{templateDataNew.url_value1}</h2>
                                            <h2>{templateDataNew.is_replay_button}</h2>
                                            <h2>{templateDataNew.url_value}</h2>
                                            <h2>{templateDataNew.user_srno}</h2>
                                            <h2>{templateDataNew.template_name}</h2>
                                            <h2>{templateDataNew.is_flow}</h2>
                                            <h2>{templateDataNew.template_language}</h2>
                                            <h2>{templateDataNew.off_what_srno}</h2>
                                            <h2>{templateDataNew.header}</h2>
                                            <p>{templateDataNew.message}</p>
                                            <p>{templateDataNew.insert_time}</p>
                                            <p>{templateDataNew.footer}</p>
                                            <p>{templateDataNew.template_category}</p>
                                            <p>{templateDataNew.status}</p>
                                        </div>
                                    )
                                )}

                                <div className='w-full mb-2' >
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
