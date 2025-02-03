import { useEffect, useRef, useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { MdOutlineDeleteForever } from 'react-icons/md';
import toast from 'react-hot-toast';

import CustomTooltip from '../../components/CustomTooltip';
// import VariableDropdown from '../common/VariableDropdown';
import CustomEmojiPicker from '../../components/CustomEmojiPicker';
import VariableManager from '../components/VariableManager';

const TemplateTypes = ({
    selectedTemplateType,
    templateHeader,
    setTemplateHeader,
    templateFormat,
    setTemplateFormat,
    templateFooter,
    setTemplateFooter,
    handleAddVariable,
    handleEmojiSelect,
    imageUrl,
    setImageUrl,
    videoUrl,
    setVideoUrl,
    documentUrl,
    setDocumentUrl,
    locationUrl,
    setLocationUrl,
    file,
    setFile,
    onPreviewUpdate,
}) => {
    useEffect(() => {
        setTemplateHeader('');
        setTemplateFormat('');
        setTemplateFooter('');
        setImageUrl(null);
        setVideoUrl(null);
        setDocumentUrl(null);
        setLocationUrl('');
        setFile(null);
    }, [selectedTemplateType]);
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


    return (
        <div className='w-full'>
            {selectedTemplateType === 'text' && (
                <div className='w-full mb-4'>
                    <div className='flex items-center mb-2'>
                        <label className='text-sm font-medium text-gray-700'>
                            Template Header(Optional)
                        </label>
                        <CustomTooltip
                            title='Enter the template header'
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
                            id='template-header-textarea'
                            name='template-header-textarea'
                            className='w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm break-words'
                            value={templateHeader}
                            onChange={(e) => setTemplateHeader(e.target.value)}
                            maxLength={60}
                            placeholder='Enter template header'
                        />
                    </div>
                    <p className='mt-1 text-sm text-gray-500'>
                        {templateHeader.length}/60
                    </p>
                </div>
            )}

            {selectedTemplateType === 'image' && (
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
                            htmlFor='createTemplateImageUpload'
                            className='bg-[#212529] hover:bg-[#434851] text-white px-4 py-2 rounded-md cursor-pointer  text-sm'
                        >
                            Select Image
                        </label>
                        <input
                            type='file'
                            id='createTemplateImageUpload'
                            name='createTemplateImageUpload'
                            accept='image/jpeg, image/png'
                            className='hidden'
                            ref={fileInputRef}
                            onChange={(e) => {
                                const selectedFile = e.target.files[0];
                                if (selectedFile) {
                                    setFile(selectedFile);
                                }
                            }}
                        />

                        {/* Upload Button */}
                        {file && (
                            <button
                                className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm'
                                onClick={() => {
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
                                }}
                            >
                                Upload
                            </button>
                        )}

                        {/* Delete Icon */}
                        {file && (
                            <div className='mb-1' >

                                <MdOutlineDeleteForever
                                    className='text-red-500 cursor-pointer hover:text-red-700'
                                    size={23}
                                    onClick={() => {
                                        setFile(null);
                                        setImageUrl(null);
                                        fileInputRef.current.value = '';
                                        toast.success('Image removed successfully!');
                                    }}
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
                </div>
            )}

            {selectedTemplateType === 'video' && (
                <div className='w-full mb-4'>
                    <div className='flex items-center'>
                        <label className='text-sm font-medium text-gray-700'>
                            Upload Video
                        </label>
                        <CustomTooltip
                            title='Only mp4 and avi files are allowed (16 MB max)'
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
                            htmlFor='createTemplateVideoUpload'
                            className='bg-[#212529] hover:bg-[#434851] text-white px-4 py-2 rounded-md cursor-pointer text-sm'
                        >
                            Select Video
                        </label>
                        <input
                            type='file'
                            id='createTemplateVideoUpload'
                            name='createTemplateVideoUpload'
                            accept='video/mp4, video/avi'
                            className='hidden'
                            onChange={(e) => {
                                const selectedFile = e.target.files[0];
                                if (selectedFile) {
                                    setFile(selectedFile);
                                }
                            }}
                        />

                        {/* Upload Button */}
                        {file && (
                            <button
                                className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm'
                                onClick={() => {
                                    if (videoUrl && file.name === lastUploadedFileName) {
                                        toast.error('Video already uploaded.  Please select a different one');
                                        return;
                                    }
                                    if (file.size <= 16 * 1024 * 1024) {
                                        setVideoUrl(URL.createObjectURL(file));
                                        setLastUploadedFileName(file.name);
                                        toast.success('Video uploaded successfully!');
                                    } else {
                                        toast.error('File size exceeds 16 MB limit!');
                                    }
                                }}
                            >
                                Upload
                            </button>
                        )}

                        {/* Delete Icon */}
                        {file && (
                            <MdOutlineDeleteForever
                                className='text-red-500 cursor-pointer hover:text-red-700'
                                size={20}
                                onClick={() => {
                                    setFile(null);
                                    setVideoUrl(null);
                                    document.getElementById('videoUpload').value = '';
                                    toast.success('Video removed successfully!');

                                }}
                            />
                        )}
                    </div>

                    {/* File Name */}
                    {file && (
                        <span className='text-sm text-gray-600 mt-2 block'>
                            {file.name}
                        </span>
                    )}
                </div>
            )}

            {selectedTemplateType === 'document' && (
                <div className='w-full mb-4'>
                    <div className='flex items-center'>
                        <label className='text-sm font-medium text-gray-700'>
                            Upload Document
                        </label>
                        <CustomTooltip
                            title='Only pdf, xls, xlsx, ppt, and doc files are allowed (100 MB max)'
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
                            htmlFor='createTemplateDocumentUpload'
                            className='bg-[#212529] hover:bg-[#434851] text-white px-4 py-2 rounded-md cursor-pointer  text-sm'
                        >
                            Select Document
                        </label>
                        <input
                            type='file'
                            id='createTemplateDocumentUpload'
                            name='createTemplateDocumentUpload'
                            accept='application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/msword'
                            className='hidden'
                            onChange={(e) => {
                                const selectedFile = e.target.files[0];
                                if (selectedFile) {
                                    setFile(selectedFile);
                                }
                            }}
                        />

                        {/* Upload Button */}
                        {file && (
                            <button
                                className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm'
                                onClick={() => {
                                    if (documentUrl && file.name === lastUploadedFileName) {
                                        toast.error('Document already uploaded.  Please select a different one');
                                        return;
                                    }
                                    if (file.size <= 100 * 1024 * 1024) {
                                        setDocumentUrl(URL.createObjectURL(file));
                                        setLastUploadedFileName(file.name);
                                        toast.success('Document uploaded successfully!');
                                    } else {
                                        toast.error('File size exceeds 100 MB limit!');
                                    }
                                }}
                            >
                                Upload
                            </button>
                        )}

                        {/* Delete Icon */}
                        {file && (
                            <MdOutlineDeleteForever
                                className='text-red-500 cursor-pointer hover:text-red-700'
                                size={23}
                                onClick={() => {
                                    setFile(null);
                                    setDocumentUrl(null);
                                    document.getElementById('documentUpload').value = '';
                                    toast.success('Document removed successfully!');

                                }}
                            />
                        )}
                    </div>

                    {/* File Name */}
                    {file && (
                        <span className='text-sm text-gray-600 mt-2 block'>
                            {file.name}
                        </span>
                    )}
                </div>
            )}

            {selectedTemplateType === 'location' && (
                <div className='w-full mb-2'>
                    <div className='flex items-center mb-2'>
                        <label className='text-sm font-medium text-gray-700'>
                            Location URL
                        </label>
                        <CustomTooltip
                            title='Enter the location URL'
                            placement='right'
                            arrow
                        >
                            <span className='ml-2'>
                                <AiOutlineInfoCircle className='text-gray-500 cursor-pointer' />
                            </span>
                        </CustomTooltip>
                    </div>
                    <input
                        id='location-url'
                        name='location-url'
                        type='text'
                        className='w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm'
                        value={locationUrl}
                        onChange={(e) => setLocationUrl(e.target.value)}
                        placeholder='Enter location URL'
                    />
                </div>
            )}

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
                        id="createTemplateFormatTextarea"
                        name="createTemplateFormatTextarea"
                        className='w-full p-2 pr-8 h-40 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm'
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

                    {/* <p className='mt-1 text-sm text-gray-500 inline-block'>
            {templateFormat.length}/1024
          </p> */}
                    <VariableManager
                        templateFormat={templateFormat}
                        setTemplateFormat={setTemplateFormat}
                        onUpdateVariables={updateVariables}
                    />
                </div>
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
                        id='createTemplateFooterTextarea'
                        name='createTemplateFooterTextarea'
                        className='w-full p-2 border border-gray-300 bg-white pr-8 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm'
                        value={templateFooter}
                        onChange={(e) => setTemplateFooter(e.target.value)}
                        maxLength={60}
                        placeholder='Enter template footer'
                    />
                    <div className='absolute top-0 right-0 mt-2 mr-2 flex space-x-2'>
                        {/* <VariableDropdown
              onSelect={(variable) =>
                handleAddVariable(setTemplateFooter, variable)
              }
            /> */}
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

export default TemplateTypes;
