import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { WhatsApp } from '@mui/icons-material';
import { useOutletContext } from 'react-router-dom';

import AnimatedDropdown from '../components/AnimatedDropdown.jsx';
import InputField from '../components/InputField.jsx';
import UniversalSkeleton from '../components/UniversalSkeleton.jsx';
import LanguageSelect from '../components/LanguageSelect.jsx';
import TemplatePreview from './components/TemplatePreview.jsx';
import InteractiveActions from '../whatsappcreatetemplate/components/InteractiveActions.jsx';
import TemplateTypes from '../whatsappcreatetemplate/components/TemplateTypes.jsx';
import CarouselTemplatePreview from '../whatsappcreatetemplate/components/CarouselTemplatePreview.jsx';
import CarouselTemplateTypes from '../whatsappcreatetemplate/components/CarouselTemplateTypes.jsx';
import CarouselInteractiveActions from '../whatsappcreatetemplate/components/CarouselInteractiveActions.jsx';
import Loader from '../components/Loader.jsx';

const WhatsappCreateTemplate = () => {
    const navigate = useNavigate();
    const { scrollableContainerRef } = useOutletContext();

    const [valueWithoutSpaces, setValueWithoutSpaces] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');
    const [selectedOption3, setSelectedOption3] = useState('');

    const [selectedTemplateType, setSelectedTemplateType] = useState('');
    const [templateHeader, setTemplateHeader] = useState('');
    const [templateFormat, setTemplateFormat] = useState('');
    const [templateFooter, setTemplateFooter] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [documentUrl, setDocumentUrl] = useState('');
    const [locationUrl, setLocationUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [file, setFile] = useState(null);

    const [selectedCardIndex, setSelectedCardIndex] = useState(0);

    const [interactiveAction, setInteractiveAction] = useState('none');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneTitle, setPhoneTitle] = useState('');
    const [url, setUrl] = useState('');
    const [urlTitle, setUrlTitle] = useState('');
    const [quickReplies, setQuickReplies] = useState([]);
    const [urlValid, setUrlValid] = useState(true);
    const [cards, setCards] = useState([
        {
            mediaType: 'image',
            mediaUrl: '',
            body: 'This is a dummy card body. You can change this content later.',
            footer: 'This is a dummy footer. You can change this content later.',
            actions: [],
        },
    ]);

    const [templatePreview, setTemplatePreview] = useState('');
    const [carouselMediaType, setCarouselMediaType] = useState('');

    const handlePreviewUpdate = (updatedPreview) => {
        setTemplatePreview(updatedPreview);
    };

    const options = [
        { value: 'WABA1', label: 'WABA1' },
        { value: 'WABA2', label: 'WABA2' },
        { value: 'WABA3', label: 'WABA3' },
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

    const carouselMediaTypeOptions = [
        { value: 'image', label: 'Image' },
        { value: 'video', label: 'Video' },
    ];

    const handleDeleteCard = (index) => {
        setCards(cards.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 700));
            setIsLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (interactiveAction !== 'all') {
            setPhoneNumber('');
            setPhoneTitle('');
            setUrl('');
            setUrlTitle('');
            setQuickReplies([]);
        }
    }, [interactiveAction]);

    const handleCategoryChange = (value) => {
        setSelectedOption2(value);
        setSelectedTemplateType('');
    };

    const handleTemplateTypeChange = (value) => {
        setSelectedTemplateType(value);
        setCarouselMediaType('');
    };

    const handleCarouselMediaTypeChange = (value) => {
        setCarouselMediaType(value);

        setCards([
            {
                mediaType: value,
                mediaUrl: '',
                body: 'This is a dummy card body. You can change this content later.',
                footer: 'This is a dummy footer. You can change this content later.',
                actions: [],
            },
        ]);
        setSelectedCardIndex(0);
    };

    const handleAddVariable = (setState, variable) => {
        setState((prev) => `${prev} {${variable}}`);
    };

    const handleEmojiSelect = (setState, emoji) => {
        setState((prev) => `${prev}${emoji}`);
    };

    const handleQuickReplyChange = (index, value) => {
        const newQuickReplies = [...quickReplies];
        newQuickReplies[index] = value;
        setQuickReplies(newQuickReplies);
    };

    const addQuickReply = () => {
        if (quickReplies.length < 3) {
            setQuickReplies([...quickReplies, '']);
        } else {
            toast.error('Maximum 3 quick replies allowed');
        }
    };

    const removeQuickReply = (index) => {
        const newQuickReplies = quickReplies.filter((_, i) => i !== index);
        setQuickReplies(newQuickReplies);
    };

    const validateUrl = (value) => {
        const urlPattern = new RegExp(
            '^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$',
            'i'
        );
        setUrlValid(!!urlPattern.test(value));
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        if (/^\+?[0-9]*$/.test(value)) {
            setPhoneNumber(value);
        }
    };

    // Submit Function
    const handleSubmit = () => {
        if (
            selectedOption &&
            selectedOption2 &&
            selectedTemplateType &&
            valueWithoutSpaces
        ) {
            toast.success('Template submitted successfully!');
            // navigate('/next-page'); // Replace with the correct navigation route
        } else {
            toast.error('Please fill all required fields before submitting.');
        }
    };

    const handleInputChange = (value) => {
        // Apply logic for spaces or no spaces here
        const newValue = value.replace(/\s/g, ""); // Example: remove spaces
        setValueWithoutSpaces(newValue);
    };



    return (
        <div className='w-full'>
            {isLoading ? (
                <>
                    {/* <div className='w-full'>
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
                        <div className='flex gap-12 w-full'>
                            <div className='w-[40%]'>
                                <UniversalSkeleton height='35rem' width='45%%' />
                            </div>
                            <div className='w-[40%]'>
                                <UniversalSkeleton height='35rem' width='45%%' />
                            </div>
                        </div>
                    </div> */}
                    <Loader />
                </>
            ) : (
                <>
                    <div className='w-full'>
                        <div className='container'>
                            <h1 className='text-xl font-semibold text-gray-800 mb-4'>
                                Create Templates
                            </h1>
                            <div className='flex gap-4 items-end justify-start align-middle pb-5'>
                                <div className='w-56'>
                                    <AnimatedDropdown
                                        id='createSelectWaba'
                                        name='createSelectWaba'
                                        label='Select WABA'
                                        tooltipContent='Select your whatsapp business account'
                                        tooltipPlacement='right'
                                        options={options}
                                        value={selectedOption}
                                        onChange={(value) => setSelectedOption(value)}
                                        placeholder='Select WABA'
                                    />
                                </div>

                                <div className='w-56'>
                                    <AnimatedDropdown
                                        id='category'
                                        name='category'
                                        label='Category'
                                        tooltipContent='Select category'
                                        tooltipPlacement='right'
                                        options={options2}
                                        value={selectedOption2}
                                        onChange={(value) => setSelectedOption2(value)}
                                        placeholder='Category'
                                    />
                                </div>

                                {selectedOption2 && (
                                    <div className='w-56'>
                                        <AnimatedDropdown
                                            id='templateType'
                                            name='templateType'
                                            label='Template Type'
                                            tooltipContent='Select template type'
                                            tooltipPlacement='right'
                                            options={templateTypeOptions.filter(
                                                (option) =>
                                                    selectedOption2 === 'marketing' ||
                                                    option.value !== 'carousel'
                                            )}
                                            value={selectedTemplateType}
                                            onChange={handleTemplateTypeChange}
                                            placeholder='Template Type'
                                        />
                                    </div>
                                )}

                                {selectedTemplateType === 'carousel' && (
                                    <div className='w-56'>
                                        <AnimatedDropdown
                                            id='carouselMediaType'
                                            name='carouselMediaType'
                                            label='Carousel Media'
                                            tooltipContent='Select Carousel Media'
                                            tooltipPlacement='right'
                                            options={carouselMediaTypeOptions}
                                            value={carouselMediaType}
                                            onChange={handleCarouselMediaTypeChange}
                                            placeholder='Carousel Media '
                                        />
                                    </div>
                                )}
                                <div className='w-56'>
                                    <LanguageSelect
                                        id='language'
                                        name='language'
                                        label='Language'
                                        tooltipContent='Select Template language'
                                        tooltipPlacement='right'
                                        value={selectedOption3}
                                        onChange={(option) => setSelectedOption3(option.value)}
                                    />
                                </div>
                                <div className='w-56'>
                                    <InputField
                                        id='templateName'
                                        name='templateName'
                                        label='Template Name'
                                        value={valueWithoutSpaces}
                                        // onChange={(val) => setValueWithoutSpaces(val)}
                                        onChange={(e) => handleInputChange(e.target.value)}
                                        placeholder='Template Name'
                                        noSpaces={true}
                                        tooltipContent='Your templatename should not contain spaces.'
                                        tooltipPlacement='right'
                                    />
                                </div>
                            </div>
                        </div>

                        {selectedOption && selectedOption2 && selectedTemplateType ? (
                            <div className='flex'>
                                <div className='w-1/3 px-2 py-0'>
                                    <>
                                        {selectedTemplateType === 'carousel' &&
                                            carouselMediaType ? (
                                            <CarouselTemplateTypes
                                                // selectedTemplateType={selectedTemplateType}
                                                templateFormat={templateFormat}
                                                setTemplateFormat={setTemplateFormat}
                                                templateFooter={templateFooter}
                                                setTemplateFooter={setTemplateFooter}
                                                handleAddVariable={handleAddVariable}
                                                handleEmojiSelect={handleEmojiSelect}
                                                selectedCardIndex={selectedCardIndex}
                                                setSelectedCardIndex={setSelectedCardIndex}
                                                cards={cards}
                                                setCards={setCards}
                                                file={file}
                                                setFile={setFile}
                                                onPreviewUpdate={handlePreviewUpdate}
                                            />
                                        ) : (
                                            <TemplateTypes
                                                selectedTemplateType={selectedTemplateType}
                                                templateHeader={templateHeader}
                                                setTemplateHeader={setTemplateHeader}
                                                templateFormat={templateFormat}
                                                setTemplateFormat={setTemplateFormat}
                                                templateFooter={templateFooter}
                                                setTemplateFooter={setTemplateFooter}
                                                handleAddVariable={handleAddVariable}
                                                handleEmojiSelect={handleEmojiSelect}
                                                imageUrl={imageUrl}
                                                setImageUrl={setImageUrl}
                                                videoUrl={videoUrl}
                                                setVideoUrl={setVideoUrl}
                                                documentUrl={documentUrl}
                                                setDocumentUrl={setDocumentUrl}
                                                locationUrl={locationUrl}
                                                setLocationUrl={setLocationUrl}
                                                file={file}
                                                setFile={setFile}
                                                onPreviewUpdate={handlePreviewUpdate}
                                            // variables={variables} // Pass variables
                                            // setVariables={setVariables} // Pass setVariables
                                            />
                                        )}

                                        {selectedTemplateType === 'carousel' &&
                                            carouselMediaType ? (
                                            <CarouselInteractiveActions
                                                cards={cards}
                                                selectedCardIndex={selectedCardIndex}
                                                setCards={setCards}
                                            />
                                        ) : (
                                            <InteractiveActions
                                                interactiveAction={interactiveAction}
                                                setInteractiveAction={setInteractiveAction}
                                                phoneNumber={phoneNumber}
                                                setPhoneNumber={setPhoneNumber}
                                                phoneTitle={phoneTitle}
                                                setPhoneTitle={setPhoneTitle}
                                                url={url}
                                                setUrl={setUrl}
                                                urlTitle={urlTitle}
                                                setUrlTitle={setUrlTitle}
                                                quickReplies={quickReplies}
                                                setQuickReplies={setQuickReplies}
                                                urlValid={urlValid}
                                                validateUrl={validateUrl}
                                                handlePhoneNumberChange={handlePhoneNumberChange}
                                                handleQuickReplyChange={handleQuickReplyChange}
                                                addQuickReply={addQuickReply}
                                                removeQuickReply={removeQuickReply}
                                            />
                                        )}
                                    </>
                                    <div className='w-full mt-6 flex items-center justify-center'>
                                        <button
                                            disabled={
                                                !selectedOption ||
                                                !selectedOption2 ||
                                                !selectedTemplateType ||
                                                !valueWithoutSpaces
                                            }
                                            className={`px-3 py-2 tracking-wider text-md text-white rounded-md ${selectedOption &&
                                                selectedOption2 &&
                                                selectedTemplateType &&
                                                valueWithoutSpaces
                                                ? 'bg-[#212529] hover:bg-[#434851]'
                                                : 'bg-gray-300 cursor-not-allowed'
                                                }`}
                                            onClick={handleSubmit}
                                            id='submitTemplate'
                                            name='submitTemplate'
                                        >
                                            Submit Template
                                        </button>
                                    </div>
                                </div>
                                <div className='w-1/3'>
                                    {selectedTemplateType === 'carousel' && carouselMediaType ? (
                                        <CarouselTemplatePreview
                                            scrollContainerRef={scrollableContainerRef}
                                            format={templateFormat}
                                            cards={cards}
                                            footer={templateFooter}
                                            setCards={setCards}
                                            selectedCardIndex={selectedCardIndex}
                                            setSelectedCardIndex={setSelectedCardIndex}
                                            // onAddCard={handleAddCard}
                                            onAddCard={(newCard) => setCards([...cards, newCard])}
                                            onDeleteCard={handleDeleteCard}
                                        />
                                    ) : (
                                        <TemplatePreview
                                            scrollContainerRef={scrollableContainerRef}
                                            header={templateHeader}
                                            format={templateFormat}
                                            footer={templateFooter}
                                            imageUrl={imageUrl}
                                            videoUrl={videoUrl}
                                            documentUrl={documentUrl}
                                            locationUrl={locationUrl}
                                            phoneTitle={phoneTitle}
                                            urlTitle={urlTitle}
                                            quickReplies={quickReplies}
                                        // variables={variables} // Pass variables
                                        />
                                    )}
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className='w-full text-center py-4 h-96 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg'>
                                    <p className='text-white text-2xl font-semibold'>
                                        <WhatsApp
                                            className='inline-block mr-2'
                                            sx={{ fontSize: '40px', color: '#22d614' }}
                                        />
                                        Please select your WABA, template category, and type to
                                        begin creating your template.
                                        {selectedTemplateType === 'carousel' && (
                                            <>
                                                <br />
                                                select the carousel media also for creating the carousel
                                                cards.
                                            </>
                                        )}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default WhatsappCreateTemplate;
