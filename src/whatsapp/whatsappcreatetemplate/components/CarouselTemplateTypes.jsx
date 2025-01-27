import React, { useState, useRef, useEffect } from 'react';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import CustomEmojiPicker from '../../components/CustomEmojiPicker';
import VariableManager from '../components/VariableManager';
import CustomTooltip from '../../components/CustomTooltip';
import toast from "react-hot-toast";


const CarouselTemplateTypes = ({
    templateFormat,
    setTemplateFormat,
    templateFooter,
    setTemplateFooter,
    cards,
    setCards,
    handleEmojiSelect,
    onPreviewUpdate,
    selectedCardIndex,
    setSelectedCardIndex,
}) => {
    const [file, setFile] = useState(null);
    const [lastUploadedFileName, setLastUploadedFileName] = useState('');
    const fileInputRef = useRef(null);
    const [variables, setVariables] = useState([]);

    const updateVariables = (updatedVariables) => {
        setVariables(updatedVariables);
        const previewFormat = templateFormat.replace(/{#(.*?)#}/g, (match, id) => {
            const variable = updatedVariables.find((v) => v.id === id);
            return variable ? `[${variable.value || id}]` : match;
        });
        onPreviewUpdate(previewFormat);
    };


    // Update card body
    // const handleCardBodyChange = (index, value) => {
    //   const updatedCards = [...cards];
    //   updatedCards[index].body = value;
    //   setCards(updatedCards);
    // };

    const handleCardBodyChange = (value) => {
        const updatedCards = [...cards];
        updatedCards[selectedCardIndex].body = value; // Update the body of the selected card
        setCards(updatedCards); // Set the updated cards
    };

    // Add emoji to the card body
    const handleEmojiForCardBody = (emoji) => {
        const updatedCards = [...cards];
        updatedCards[selectedCardIndex].body = (updatedCards[selectedCardIndex].body || '') + emoji; // Append emoji to the body
        setCards(updatedCards);
    };


    // Handles the update of the card body
    // const handleCardBodyChange = (value) => {
    //   const updatedCards = [...cards];
    //   updatedCards[selectedCardIndex].body = value; // Update the body of the selected card
    //   setCards(updatedCards);
    // };


    // Handle file upload for media
    // const handleMediaUpload = (index, mediaUrl) => {
    //   const updatedCards = [...cards];
    //   updatedCards[index].mediaUrl = mediaUrl;
    //   setCards(updatedCards);
    // };

    // const handleMediaUpload = (mediaUrl) => {
    //   const updatedCards = [...cards];
    //   updatedCards[selectedCardIndex].mediaUrl = mediaUrl; // Update media URL for the selected card
    //   setCards(updatedCards);
    // };

    const handleMediaUpload = () => {
        if (file) {
            const isVideo = cards[selectedCardIndex]?.mediaType === "video";
            const maxSize = isVideo ? 16 * 1024 * 1024 : 5 * 1024 * 1024; // File size limit
            if (file.size <= maxSize) {
                const updatedCards = [...cards];
                updatedCards[selectedCardIndex].mediaUrl = URL.createObjectURL(file); // Set media URL
                updatedCards[selectedCardIndex].fileName = file.name; // Set file name for the particular card
                setCards(updatedCards);
                setFile(null); // Reset file
                fileInputRef.current.value = ""; // Reset file input
                toast.success(`${isVideo ? "Video" : "Image"} uploaded successfully!`);
            } else {
                toast.error(
                    `File size exceeds ${isVideo ? "16MB" : "5MB"} limit. Please upload a smaller file.`
                );
            }
        } else {
            toast.error("No file selected for upload!");
        }
    };



    // useEffect(() => {
    //   if (file) {
    //     const selectedFile = file;
    //     if (selectedFile.size <= (cards[selectedCardIndex]?.mediaType === 'video' ? 16 : 5) * 1024 * 1024) {
    //       handleMediaUpload(selectedCardIndex, URL.createObjectURL(selectedFile));
    //       setLastUploadedFileName(selectedFile.name);
    //       setFile(null); // Reset file state after upload
    //       fileInputRef.current.value = ''; // Reset file input
    //       toast.success(`${cards[selectedCardIndex]?.mediaType === 'video' ? 'Video' : 'Image'} uploaded successfully!`);
    //     } else {
    //       toast.error(`File size exceeds ${cards[selectedCardIndex]?.mediaType === 'video' ? '16' : '5'} MB limit!`);
    //     }
    //   }
    // }, [file]);


    // useEffect(() => {
    //   if (file) {
    //     const selectedFile = file;
    //     const isVideo = cards[selectedCardIndex]?.mediaType === "video";
    //     const maxSize = isVideo ? 16 * 1024 * 1024 : 5 * 1024 * 1024; // Size limit based on media type
    //     if (selectedFile.size <= maxSize) {
    //       handleMediaUpload(URL.createObjectURL(selectedFile)); // Update the media URL
    //       setLastUploadedFileName(selectedFile.name); // Store the uploaded file name
    //       setFile(null); // Reset file state
    //       fileInputRef.current.value = ""; // Reset file input value
    //       toast.success(`${isVideo ? "Video" : "Image"} uploaded successfully!`);
    //     } else {
    //       toast.error(
    //         `File size exceeds ${isVideo ? "16MB" : "5MB"} limit. Please upload a smaller file.`
    //       );
    //     }
    //   }
    // }, [file, cards, selectedCardIndex]);



    // Handle delete media
    // const handleDeleteMedia = (index) => {
    //   const updatedCards = [...cards];
    //   updatedCards[index].mediaUrl = '';
    //   updatedCards[index].mediaType = '';
    //   setCards(updatedCards);
    // };


    // Handles the deletion of media for the selected card
    const handleDeleteMedia = () => {
        const updatedCards = [...cards];
        updatedCards[selectedCardIndex].mediaUrl = ""; // Clear the media URL
        // updatedCards[selectedCardIndex].mediaType = ""; // Clear the media type
        updatedCards[selectedCardIndex].fileName = ""; // Clear file name
        setCards(updatedCards); // Update the state
        toast.success("Media removed successfully!");
    };

    // Effect to clear card content and media if the card is deleted
    useEffect(() => {
        if (selectedCardIndex >= cards.length) {
            setSelectedCardIndex(Math.max(0, cards.length - 1)); // Adjust index to a valid card
        } else if (!cards[selectedCardIndex]) {
            // Clear the card body and media if the card was deleted
            handleCardBodyChange('');
            handleMediaUpload('');
        }
    }, [cards, selectedCardIndex]);


    return (
        <div className="w-full">

            <div className='w-full mb-4'>
                <div className='flex items-center mb-2'>
                    <label className='text-sm font-medium text-gray-700'>
                        Template Format
                    </label>
                    <CustomTooltip
                        title='Specify sample values for your parameters. {{1}}:Roy,{{2}}:john'
                        placement='right'
                        arrow
                    >
                        <span className='ml-2'>
                            <AiOutlineInfoCircle className='text-gray-500 cursor-pointer' />
                        </span>
                    </CustomTooltip>
                </div>

                <div className='relative'>
                    <textarea
                        // id="template-format-textarea"
                        className='w-full p-2 pr-8 h-24 border bg-white border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm'
                        value={templateFormat}
                        onChange={(e) => setTemplateFormat(e.target.value)}
                        maxLength={1024}
                        placeholder='Enter template format'
                    />
                    <div className='absolute top-0 right-0 mt-2 mr-2 flex space-x-2 '>
                        <CustomEmojiPicker
                            onSelect={(emoji) => handleEmojiSelect(setTemplateFormat, emoji)}
                            position='right'
                        />

                    </div>
                </div>
                <div className='' >
                    <VariableManager
                        templateFormat={templateFormat}
                        setTemplateFormat={setTemplateFormat}
                        onUpdateVariables={updateVariables}
                    />
                </div>
            </div>

            {/* Card Selection */}
            {/* <div className="mb-4 flex gap-2">
        {cards.map((_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded-md text-white ${index === selectedCardIndex ? 'bg-blue-500' : 'bg-gray-500'
              }`}
            onClick={() => setSelectedCardIndex(index)}
          >
            Card {index + 1}
          </button>
        ))}
      </div> */}


            <div className='w-full mb-4'>
                <div className='flex items-center mb-2'>
                    <label className='text-sm font-medium text-gray-700'>
                        Card Body {selectedCardIndex + 1}
                    </label>
                    <CustomTooltip
                        title='Specify sample values for your parameters. {{1}}:Roy,{{2}}:john'
                        placement='right'
                        arrow
                    >
                        <span className='ml-2'>
                            <AiOutlineInfoCircle className='text-gray-500 cursor-pointer' />
                        </span>
                    </CustomTooltip>
                </div>

                <div className='relative'>
                    <textarea
                        className='w-full p-2 pr-8 h-24 border bg-white border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm'
                        maxLength={160}
                        value={cards[selectedCardIndex]?.body || ''}
                        onChange={(e) =>
                            handleCardBodyChange(e.target.value)
                        }
                        placeholder='Enter Card Body'
                    />
                    <div className='absolute top-0 right-0 mt-2 mr-2 flex space-x-2'>
                        <CustomEmojiPicker
                            onSelect={handleEmojiForCardBody} // Add emoji to card body
                            position='right'
                        />
                    </div>
                </div>
                <div className='' >
                    <p className='text-sm text-gray-500'>
                        {cards[selectedCardIndex]?.body.length || 0}/160
                    </p>
                </div>
            </div>

            <div className='w-full mb-4'>
                <div className='flex items-center'>
                    <label className='text-sm font-medium text-gray-700'>
                        Upload {cards[selectedCardIndex]?.mediaType === 'video' ? 'Video' : 'Image'} {selectedCardIndex + 1}
                    </label>
                    <CustomTooltip
                        title={
                            cards[selectedCardIndex]?.mediaType === 'video'
                                ? 'Only mp4 and avi files are allowed (16 MB max)'
                                : 'Only jpg, jpeg, and png files are allowed (5 MB max)'
                        }
                        placement='right'
                        arrow
                    >
                        <span className='ml-2'>
                            <AiOutlineInfoCircle className='text-gray-500 cursor-pointer' />
                        </span>
                    </CustomTooltip>
                </div>

                <div className='flex items-center gap-4 mt-2'>
                    <label
                        htmlFor='mediaUpload'
                        className='bg-[#212529] hover:bg-[#434851] text-white px-4 py-2 rounded-md cursor-pointer text-sm'
                    >
                        Select {cards[selectedCardIndex]?.mediaType === 'video' ? 'Video' : 'Image'}
                    </label>
                    <input
                        type='file'
                        id='mediaUpload'
                        accept={cards[selectedCardIndex]?.mediaType === 'video' ? 'video/mp4, video/avi' : 'image/jpeg, image/png'}
                        className='hidden'
                        ref={fileInputRef}
                        onChange={(e) => {
                            const selectedFile = e.target.files[0];
                            if (selectedFile) {
                                setFile(selectedFile);
                            }
                        }}
                    />

                    {/* {file && (
            <button
              className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm'
              onClick={() => {
                if (file.size <= (cards[selectedCardIndex]?.mediaType === 'video' ? 16 : 5) * 1024 * 1024) {
                  handleMediaUpload(selectedCardIndex, URL.createObjectURL(file));
                  setLastUploadedFileName(file.name);
                  setFile(null); // Reset file state after upload
                  fileInputRef.current.value = ''; // Reset file input
                  toast.success(`${cards[selectedCardIndex]?.mediaType === 'video' ? 'Video' : 'Image'} uploaded successfully!`);
                } else {
                  toast.error(`File size exceeds ${cards[selectedCardIndex]?.mediaType === 'video' ? '16' : '5'} MB limit!`);
                }
              }}
            >
              Upload
            </button>
          )} */}


                    {file && (
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
                            onClick={handleMediaUpload} // Upload media on button click
                        >
                            Upload
                        </button>
                    )}

                    {/* {file && (
            <MdOutlineDeleteForever
              className='text-red-500 cursor-pointer hover:text-red-700'
              size={20}
              onClick={() => {
                setFile(null);
                handleMediaUpload(selectedCardIndex, null);
                fileInputRef.current.value = '';
                toast.success(`${cards[selectedCardIndex]?.mediaType === 'video' ? 'Video' : 'Image'} removed successfully!`);
              }}
            />
          )} */}
                    {cards[selectedCardIndex]?.mediaUrl && (
                        <MdOutlineDeleteForever
                            className="text-red-500 cursor-pointer hover:text-red-700"
                            size={20}
                            onClick={handleDeleteMedia}
                        />
                    )}
                </div>
                {/* Display file name for uploaded media */}
                {cards[selectedCardIndex]?.fileName && (
                    <span className="text-sm text-gray-600 mt-2 block">
                        {cards[selectedCardIndex].fileName}
                    </span>
                )}
            </div>


            <div className='w-full mb-4'>
                <div className='flex items-center mb-2'>
                    <label className='text-sm font-medium text-gray-700'>
                        Template Footer (Optional)
                    </label>
                    <CustomTooltip
                        title='Enter the template footer'
                        placement='right'
                        arrow
                    >
                        <span className='ml-2'>
                            <AiOutlineInfoCircle className='text-gray-500 cursor-pointer' />
                        </span>
                    </CustomTooltip>
                </div>
                <div className='relative'>
                    <textarea
                        className='w-full p-2 border bg-white border-gray-300 pr-8 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm'
                        value={templateFooter}
                        onChange={(e) => setTemplateFooter(e.target.value)}
                        maxLength={60}
                        placeholder='Enter template footer'
                    />
                    <div className='absolute top-0 right-0 mt-2 mr-2 flex space-x-2'>
                        <CustomEmojiPicker
                            onSelect={(emoji) => handleEmojiSelect(setTemplateFooter, emoji)}
                            position='right'
                        />
                    </div>
                </div>
                <p className='mt-1 text-sm text-gray-500'>{templateFooter.length}/60</p>
            </div>

        </div>
    );
};

export default CarouselTemplateTypes;


