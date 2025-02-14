import React, { useState, useEffect } from 'react';
import { MdOutlineDeleteForever } from "react-icons/md";

import toast from 'react-hot-toast';

// Function to extract variables from text (e.g., {{1}}) in URL
const extractVariablesFromUrl = (url) => {
    const regex = /{{(\d+)}}/g;
    let match;
    const variables = [];
    while ((match = regex.exec(url)) !== null) {
        if (!variables.includes(match[1])) {
            variables.push(match[1]);
        }
    }
    return variables;
};

const TemplateForm = ({ templateDataNew, onInputChange, onImageUpload }) => {
    const [inputValues, setInputValues] = useState({}); // Store all input field values
    const [selectedImage, setSelectedImage] = useState(null); // Store the selected image
    const [imageFileName, setImageFileName] = useState(''); // Store the file name
    const [isImageUploaded, setIsImageUploaded] = useState(false); // Track if the image is uploaded
    const [imageError, setImageError] = useState(''); // Track image error (if any)

    // Reset the form when template changes
    useEffect(() => {
        setInputValues({});
        setSelectedImage(null);
        setImageFileName('');
        setIsImageUploaded(false);
        setImageError('');
    }, [templateDataNew]);

    // Handle input change
    const handleInputChange = (e, variable) => {
        setInputValues((prev) => ({
            ...prev,
            [variable]: e.target.value,
        }));
        if (onInputChange) onInputChange(e, variable);
    };

    // Handle file input change
    const handleImageChange = (e) => {
        const file = e.target.files?.[0]; // Safe check if files are available
        if (file) {
            // Validate file type and size
            if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
                setImageError('Only jpg, jpeg, and png files are allowed.');
                setSelectedImage(null);
                setImageFileName('');
                return;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB size limit
                setImageError('File size must be less than 5MB.');
                setSelectedImage(null);
                setImageFileName('');
                return;
            }

            // If validation passes, set the image
            setImageError('');
            setImageFileName(file.name);
            setSelectedImage(URL.createObjectURL(file)); // Create a URL for the selected image
            setIsImageUploaded(false); // Image is selected but not uploaded yet
        } else {
            setImageError('No file selected');
        }
    };

    // Handle upload action
    const handleUpload = () => {
        if (isImageUploaded) {
            toast.error("File already uploaded. Please choose a different image.");
            return;
        }

        if (selectedImage) {
            // You can replace this with actual image upload logic to your backend
            onImageUpload(selectedImage); // Passing the selected image to the parent handler
            setIsImageUploaded(true); // Set the image as uploaded
            toast.success("Image uploaded successfully!"); // Show success toast
        } else {
            toast.error("Please select an image first!"); // Show error toast if no image selected
        }
    };

    // Handle delete action
    const handleDelete = () => {
        setSelectedImage(null);
        setImageFileName('');
        setIsImageUploaded(false); // Reset image upload status
        setImageError(''); // Clear any error
        toast.success("Image deleted successfully!"); // Show success toast
    };


    return (
        <div className='shadow-md rounded-md' >

            <div className='bg-blue-400 p-2 rounded-t-md ' >
                <h3 className="text-md font-medium text-white tracking-wide ">Template Category : {templateDataNew.category}</h3>
            </div>
            <div className="space-y-3 p-2 bg-gray-50 rounded-b-xl ">

                {/* BODY Component: Handle Variables */}
                {templateDataNew?.components.map((component, idx) => {
                    if (component.type === 'BODY') {
                        const text = component.text;
                        const variables = extractVariablesFromUrl(text);
                        return (
                            <>
                                <div key={component.id || idx} className="space-y-2">
                                    {/* <p className="text-gray-600">{text}</p> */}
                                    <p className='text-sm text-gray-700 font-medium tracking-wide'>Message Parameters:</p>
                                    {variables.map((variable, index) => (
                                        <div key={index} className="flex flex-col space-y-2 ">
                                            <div className='flex items-center gap-2' >
                                                <label htmlFor={`input${variable}`} className="text-sm font-medium text-gray-600 w-10">
                                                    {`{{${variable}}}`}
                                                </label>
                                                <input
                                                    id={`input${variable}`}
                                                    name={`input${variable}`}
                                                    value={inputValues[variable] || ''}
                                                    placeholder={`Enter value for {{${variable}}}`}
                                                    onChange={(e) => handleInputChange(e, variable)}
                                                    className="px-2 py-2 w-full border rounded-md text-sm border-gray-300 shadow-sm focus:outline-none "
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        );
                    }
                    return null;
                })}

                {/* BUTTONS Component: Handle URL Variables */}
                {templateDataNew?.components.map((component, idx) => {
                    if (component.type === 'BUTTONS') {
                        return (
                            <div key={idx} className="space-y-2">
                                <p className="text-sm text-gray-700 font-medium tracking-wide">URL Parameter:</p>
                                {component.buttons.map((button, index) => {
                                    const urlVariables = extractVariablesFromUrl(button.url);
                                    return (
                                        <div key={index} className="space-y-4">
                                            {urlVariables.map((variable) => (
                                                <div key={variable} className="flex flex-col space-y-2">
                                                    <div className='flex items-center gap-2' >


                                                        <label htmlFor={`buttonInput${variable}`} className="text-sm font-medium text-gray-600 w-10">
                                                            {`{{${variable}}}`}
                                                        </label>
                                                        <input
                                                            id={`buttonInput${variable}`}
                                                            name={`buttonInput${variable}`}
                                                            value={inputValues[`button${variable}`] || ''}
                                                            placeholder={`Enter value for {{${variable}}}`}
                                                            onChange={(e) => handleInputChange(e, `button${variable}`)}
                                                            className="px-2 py-2 w-full border rounded-md text-sm border-gray-300 shadow-sm focus:outline-none"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    }
                    return null;
                })}

                {/* HEADER Component: Handle Image Upload */}
                {templateDataNew?.components.map((component, idx) => {
                    if (component.type === 'HEADER' && component.format === 'IMAGE') {
                        return (
                            <div key={`header-component-${idx}`} className="space-y-2">
                                <p className="text-sm text-gray-700 font-medium tracking-wide">Media:</p>

                                {/* Hidden Input (for file upload) */}
                                <div className='flex items-start gap-2'>
                                    <div className='space-y-2' >
                                        <input
                                            type="file"
                                            id="imageUpload"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />

                                        {/* Custom Upload Button */}
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById('imageUpload').click()}
                                            className="px-2 py-2 tracking-wide bg-blue-400 text-white text-sm rounded-md shadow-md hover:bg-blue-500 focus:outline-none cursor-pointer"
                                        >
                                            Choose File
                                        </button>

                                        {/* Error Message */}
                                        {imageError && <p className="text-red-600 text-sm">{imageError}</p>}
                                    </div>

                                    {/* File Name and Upload/Delete options */}
                                    {imageFileName && !isImageUploaded && (
                                        <>
                                            <div className="space-y-2">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handleUpload}
                                                        className="px-3 py-2 tracking-wide bg-blue-400 text-white text-sm cursor-pointer rounded-md shadow-md hover:bg-blue-500 focus:outline-none"
                                                    >
                                                        Upload
                                                    </button>
                                                    <button
                                                        onClick={handleDelete}
                                                        className="p-2 focus:outline-none hover:bg-gray-200 rounded-full cursor-pointer"
                                                    >
                                                        <MdOutlineDeleteForever
                                                            className='text-red-500 cursor-pointer hover:text-red-600'
                                                            size={20}

                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600">Selected File: {imageFileName}</p>


                                {/* Image Preview */}
                                {isImageUploaded && selectedImage && (
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-600">Image Preview:</p>
                                        <img src={selectedImage} alt="Preview" className="w-48 h-48 object-cover rounded-md shadow-md" />
                                    </div>
                                )}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>

    );
};

export default TemplateForm;
