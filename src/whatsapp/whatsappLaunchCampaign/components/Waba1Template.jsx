import React, { useRef, useState } from "react";
import VariableDropdown from "./VariableDropdown";
import CustomEmojiPicker from "../../components/CustomEmojiPicker";
import CustomTooltip from "../../components/CustomTooltip";
import { MdOutlineDeleteForever } from 'react-icons/md';

import { AiOutlineInfoCircle } from "react-icons/ai";
import toast from "react-hot-toast";

const Waba1Template = ({ updateTemplate }) => {
    const [titleInputs, setTitleInputs] = useState([""]);
    const [messageParams, setMessageParams] = useState([""]);
    const [uploadedMedia, setUploadedMedia] = useState(null);
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [lastUploadedFileName, setLastUploadedFileName] = useState('');
    const fileInputRef = useRef(null);
    const activeInputRef = useRef(null);

    // Handle dynamic title input changes
    const handleTitleChange = (index, value) => {
        const newInputs = [...titleInputs];
        newInputs[index] = value;
        setTitleInputs(newInputs);
        updateTemplate({ title: newInputs });
    };

    // Handle message parameters change
    const handleMessageParamChange = (index, value) => {
        const newParams = [...messageParams];
        newParams[index] = value;
        setMessageParams(newParams);
        updateTemplate({ messageParams: newParams });
    };

    const addTitleInput = () => setTitleInputs([...titleInputs, ""]);
    const addMessageParam = () => setMessageParams([...messageParams, ""]);

    const handleOpenEmojiPicker = (inputId) => {
        activeInputRef.current = document.getElementById(inputId);
    };

    const handleEmojiSelect = (emoji) => {
        if (activeInputRef.current) {
            const inputField = activeInputRef.current;
            const cursorPosition = inputField.selectionStart;
            const value = inputField.value;
            const newValue = value.slice(0, cursorPosition) + emoji + value.slice(cursorPosition);

            inputField.value = newValue;
            inputField.setSelectionRange(cursorPosition + emoji.length, cursorPosition + emoji.length);

            // Update state based on input type
            const index = parseInt(inputField.dataset.index);
            if (inputField.dataset.type === "title") {
                handleTitleChange(index, newValue);
            } else {
                handleMessageParamChange(index, newValue);
            }
        }
    };


    // ✅ Insert variable into the input that opened the variable dropdown
    const handleAddVariable = (variable) => {
        if (activeInputRef.current) {
            const inputField = activeInputRef.current;
            const cursorPosition = inputField.selectionStart;
            const value = inputField.value;
            const newValue = value.slice(0, cursorPosition) + `{${variable}}` + value.slice(cursorPosition);

            inputField.value = newValue;
            inputField.setSelectionRange(cursorPosition + variable.length + 2, cursorPosition + variable.length + 2);

            // Update state based on input type
            const index = parseInt(inputField.dataset.index);
            if (inputField.dataset.type === "title") {
                handleTitleChange(index, newValue);
            } else {
                handleMessageParamChange(index, newValue);
            }
        }
    };

    // Handle media upload
    const handleMediaUpload = (event) => {
        const file = event.target.files[0];
        setUploadedMedia(URL.createObjectURL(file)); // Preview uploaded image
        updateTemplate({ media: URL.createObjectURL(file) });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleUploadClick = () => {
        if (!file) return;

        if (imageUrl && file.name === lastUploadedFileName) {
            toast.error('Image already uploaded. Please select a different one');
            return;
        }
        if (file.size <= 5 * 1024 * 1024) {
            setImageUrl(URL.createObjectURL(file));
            setLastUploadedFileName(file.name);
            toast.success('Image uploaded successfully!');
        } else {
            toast.error('File size exceeds 5 MB limit!');
        }
    };

    const handleDeleteClick = () => {
        setFile(null);
        setImageUrl(null);
        updateTemplate({ media: null });
        fileInputRef.current.value = '';
        toast.success('Image removed successfully!');
    };

    return (
        <>
            <div className="bg-gray-300 h-12 rounded-t-2xl flex items-center justify-center" >
                <h3 className="text-lg text-center font-semibold text-gray-800">WABA Template 1</h3>
            </div>
            <div className="p-2.5 bg-white rounded-b-2xl  shadow-md">

                {/* Dynamic Title Inputs */}
                <label className="block text-md font-medium text-gray-700 mb-1">Title:</label>
                <div className="mb-2 max-h-40 overflow-scroll px-1">
                    {titleInputs.map((input, index) => (
                        <>
                            <div key={index} className="flex items-center gap-2 my-1 relative" >
                                <label htmlFor="" className="block text-md font-medium text-gray-700 w-5" >{`${index + 1}.`}</label>
                                <input
                                    id={`wabatitle-${index}`}
                                    // id="wabatitle"
                                    name="wabatitle"
                                    // key={index}
                                    data-index={index}
                                    data-type="title"
                                    onClick={() => handleOpenEmojiPicker(`wabatitle-${index}`)} // ✅ Track the active input
                                    type="text"
                                    value={input}
                                    onChange={(e) => handleTitleChange(index, e.target.value)}
                                    // placeholder={`Title ${index + 1}`}
                                    placeholder="Type or select an attribute"
                                    className="block w-full p-1.5  border border-gray-400 bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm"
                                />
                                <div className='absolute top-1 right-8  flex space-x-2 z-[1000]'>

                                    <CustomEmojiPicker
                                        onSelect={handleEmojiSelect}
                                        position='left'
                                    />
                                </div>
                                <div className='absolute top-0 right-0 bg-gray-100  flex space-x-2 z-50'>
                                    <VariableDropdown
                                        onSelect={handleAddVariable}
                                    />
                                </div>
                            </div>
                            {/* <input
                            key={index}
                            type="text"
                            value={input}
                            onChange={(e) => handleTitleChange(index, e.target.value)}
                            // placeholder={`Title ${index + 1}`}
                            placeholder="Type or select an attribute"
                            className="block w-full p-1.5 mt-2 border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm"
                        />
                        <input
                            key={index}
                            type="text"
                            value={input}
                            onChange={(e) => handleTitleChange(index, e.target.value)}
                            // placeholder={`Title ${index + 1}`}
                            placeholder="Type or select an attribute"
                            className="block w-full p-1.5 mt-2 border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm"
                        />
                        <input
                            key={index}
                            type="text"
                            value={input}
                            onChange={(e) => handleTitleChange(index, e.target.value)}
                            // placeholder={`Title ${index + 1}`}
                            placeholder="Type or select an attribute"
                            className="block w-full p-1.5 mt-2 border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm"
                        />
                        <input
                            key={index}
                            type="text"
                            value={input}
                            onChange={(e) => handleTitleChange(index, e.target.value)}
                            // placeholder={`Title ${index + 1}`}
                            placeholder="Type or select an attribute"
                            className="block w-full p-1.5 mt-2 border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm"
                        /> */}
                        </>
                    ))}
                    <button
                        onClick={addTitleInput}
                        className="mt-2 text-blue-600 text-sm hover:underline"
                    >
                        + Add More Title
                    </button>
                </div>

                {/* Dynamic Message Parameters */}
                <label className="block text-md font-medium text-gray-700 mb-1">Message Parameters:</label>
                <div className="mb-2 max-h-40 overflow-scroll px-1">
                    {messageParams.map((param, index) => (
                        <>
                            <div key={index} className="flex items-center gap-2 my-1 relative" >
                                <label htmlFor="" className="block text-md font-medium text-gray-700 w-5" >{`${index + 1}.`}</label>
                                <input
                                    id={`wabaparam-${index}`}
                                    // id="wabaparam"
                                    name="wabaparam"
                                    type="text"
                                    value={param}
                                    data-index={index}
                                    data-type="param"
                                    onClick={() => handleOpenEmojiPicker(`wabaparam-${index}`)} // ✅ Track active input
                                    onChange={(e) => handleMessageParamChange(index, e.target.value)}
                                    placeholder="Type or select an attribute"
                                    className="block w-full p-1.5 pr-0 border border-gray-400 bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm"
                                />
                                <div className='absolute top-1 right-8   z-[1000]'>

                                    <CustomEmojiPicker
                                        onSelect={handleEmojiSelect}
                                        position='left'
                                    />
                                </div>
                                <div className='absolute top-0 right-0 bg-gray-100  flex space-x-2 z-50'>
                                    <VariableDropdown
                                        onSelect={handleAddVariable}
                                    />
                                </div>
                            </div>
                        </>
                    ))}
                    <button
                        onClick={addMessageParam}
                        className="mt-2 text-blue-600 text-sm hover:underline"
                    >
                        + Add More Parameters
                    </button>
                </div>

                {/* Upload Media */}
                <div className='w-full mb-4'>
                    <div className='flex items-center'>
                        <label className='text-sm font-medium text-gray-700'>
                            Upload Image
                        </label>
                        <CustomTooltip
                            title='Only jpg, jpeg, and png files are allowed (5 MB max)'
                            placement='right'
                            arrow
                        >
                            <span className='ml-2'>
                                <AiOutlineInfoCircle className='text-gray-500 cursor-pointer' />
                            </span>
                        </CustomTooltip>
                    </div>

                    {/* File Selection */}
                    <div className='flex items-center gap-4 mt-2'>
                        <label
                            htmlFor='launchCampaignImageUpload'
                            className='bg-[#212529] hover:bg-[#434851] text-white px-4 py-2 rounded-md cursor-pointer text-sm'
                        >
                            Select Image
                        </label>
                        <input
                            type='file'
                            id='launchCampaignImageUpload'
                            name='launchCampaignImageUpload'
                            accept='image/jpeg, image/png'
                            className='hidden'
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />

                        {/* Upload Button */}
                        {file && (
                            <button
                                className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm'
                                onClick={handleUploadClick}
                            >
                                Upload
                            </button>
                        )}

                        {/* Delete Icon */}
                        {file && (
                            <div className='mb-1'>
                                <MdOutlineDeleteForever
                                    className='text-red-500 cursor-pointer hover:text-red-700'
                                    size={23}
                                    onClick={handleDeleteClick}
                                />
                            </div>
                        )}
                    </div>

                    {/* File Name */}
                    {file && (
                        <span className='text-sm text-gray-600 mt-2 block'>
                            {file.name}
                        </span>
                    )}

                    {/* Image Preview */}
                    {/* {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Uploaded"
                            className="mt-2 w-32 h-32 rounded"
                        />
                    )} */}
                </div>
            </div>
        </>

    );
};

export default Waba1Template;
