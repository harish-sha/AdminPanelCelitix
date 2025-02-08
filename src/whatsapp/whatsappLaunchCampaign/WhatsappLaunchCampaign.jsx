import { useEffect, useState } from 'react';
import AnimatedDropdown from '../components/AnimatedDropdown';
import InputField from '../components/InputField';
import RadioButton from './components/RadioButton';
import TemplateRenderer from './components/lunchPreview';
import Loader from '../components/Loader';
import Templates from './components/Templates';
import Waba1Template from './components/Waba1Template';
// import getWabaList from '../../apis/whatsapp/getWabaList.js'
import { getWabaList } from '../../apis/whatsapp/getWabaList.js';
import toast from 'react-hot-toast';

const WhatsappLaunchCampaign = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [valueWithoutSpaces, setValueWithoutSpaces] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [selectedWaba, setSelectedWaba] = useState("");
    const [selectedWabaMobileNo, setSelectedWabaMobileNo] = useState("");
    const [inputValue, setInputValue] = useState("");


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

    const wabaoptions = (wabaList || []).map((waba) => ({
        value: waba.name,
        label: waba.name,
    }));

    const wabaMobileNo = (wabaList || []).map((waba) => ({
        value: waba.mobileNo,
        label: waba.mobileNo,
    }));

    const templateOptions = [
        { value: "wabaTemplate1", label: "WABA Template 1" },
        { value: "wabaTemplate2", label: "WABA Template 2" },
        { value: "wabaTemplate3", label: "WABA Template 3" },
    ];

    useEffect(() => {
        console.log(localStorage.getItem("token"));

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
                                    {/* Input without spaces */}
                                    <InputField
                                        id="createCampaign"
                                        name="createCampaign"
                                        label='Campaign Name'
                                        value={inputValue}
                                        onChange={(e) => handleInputChange(e.target.value)}
                                        placeholder='Campaign Name'
                                        // noSpaces={true}
                                        tooltipContent='Your templatename should not contain spaces.'
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

                                <div className='w-full mb-2' >
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

                </>
            )}
        </div>
    )
}



export default WhatsappLaunchCampaign


// http://95.216.43.170:8080/proCpaasRest/auth/getuserdetails
// http://95.216.43.170:8080/proCpaasRest/whatsapp/getwabadetails