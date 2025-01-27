import { useEffect, useState } from 'react';
import UniversalSkeleton from '../components/UniversalSkeleton';
import AnimatedDropdown from '../components/AnimatedDropdown';
import InputField from '../components/InputField';
import RadioButton from './components/RadioButton';
import TemplateRenderer from './components/lunchPreview';
import UniversalButton from '../components/UniversalButton';
import { Button } from '@mui/material';

const WhatsappLaunchCampaign = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [valueWithoutSpaces, setValueWithoutSpaces] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');
    const [selectedOption3, setSelectedOption3] = useState('');
    const [selectedTemplateType, setSelectedTemplateType] = useState('');

    const options = [
        { value: 'WABA1', label: 'WABA1' },
        { value: 'WABA2', label: 'WABA2' },
        { value: 'WABA3', label: 'WABA3' },
    ];
    const templateOptions = [
        { value: 'WABA Template 1', label: 'WABA Template 1' },
        { value: 'WABA Template 2', label: 'WABA Template 2' },
        { value: 'WABA Template 3', label: 'WABA Template 3' },
    ];

    const templateTypeOptions = [
        { value: 'text', label: 'Text' },
        { value: 'image', label: 'Image' },
        { value: 'video', label: 'Video' },
        { value: 'document', label: 'Document' },
        { value: 'location', label: 'Location' },
        { value: 'carousel', label: 'Carousel' }, // Only for marketing
    ];

    const options2 = [
        { value: 'utility', label: 'Utility' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'authentication', label: 'Authentication' },
    ];
    const options3 = [
        { value: 'text', label: 'Text' },
        { value: 'image', label: 'Image' },
        { value: 'document', label: 'Document' },
        { value: 'carousel', label: 'Carousel' },
    ];
    const options4 = [
        { value: 'pending', label: 'Pending' },
        { value: 'rejected', label: 'Rejected' },
        { value: 'approval', label: 'Approval' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 700));
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const handleTemplateTypeChange = (value) => {
        setSelectedTemplateType(value);
    };
    return (
        <div className='max-w-full flex'>
            {isLoading ? (
                <>
                    <div className='w-full'>
                        <div className='py-5 flex flex-row gap-5'>
                            <div className='w-56'>
                                <UniversalSkeleton height='3rem' />
                            </div>
                            <div className='w-56'>
                                <UniversalSkeleton height='3rem' />
                            </div>
                            <div className='w-56'>
                                <UniversalSkeleton height='3rem' />
                            </div>
                            <div className='w-56'>
                                <UniversalSkeleton height='3rem' />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className='container '>
                        <div className="flex gap-4 ">
                            <div className="col-lg-4 w-full lg:w-1/3 p-0">
                                <div className='w-100 mb-2'>
                                    <AnimatedDropdown
                                        id='selectWABA'
                                        name='selectWABA'
                                        label='Select WABA'
                                        tooltipContent='Select your whatsapp business account'
                                        tooltipPlacement='right'
                                        options={options}
                                        value={selectedOption}
                                        onChange={(value) => setSelectedOption(value)}
                                        placeholder='Select WABA'
                                    />
                                </div>
                                <div className='w-100 mb-2'>
                                    {/* Input without spaces */}
                                    <InputField
                                        id="createCampaign"
                                        name="createCampaign"
                                        label='Campaign Name'
                                        value={valueWithoutSpaces}
                                        onChange={(val) => setValueWithoutSpaces(val)}
                                        placeholder='Campaign Name'
                                        noSpaces={true}
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
                                        value={selectedOption3}
                                        onChange={(value) => setSelectedOption3(value)}
                                        placeholder='Select Template'
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 w-full lg:w-1/3 p-0">
                                <RadioButton />
                            </div>
                            <div className="col-lg-4 w-full lg:w-1/3 p-0">
                                <TemplateRenderer />
                            </div>
                        </div>
                    </div>

                </>
            )}
        </div>
        // <div>WhatsappLaunchCampaign</div>
    )
}

export default WhatsappLaunchCampaign