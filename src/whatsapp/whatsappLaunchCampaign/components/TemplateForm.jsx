import React, { useState, useEffect } from 'react';
import { MdOutlineDeleteForever } from "react-icons/md";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DoNotDisturbOutlinedIcon from '@mui/icons-material/DoNotDisturbOutlined';

import toast from 'react-hot-toast';
import InputVariable from './InputVariable';
import { uploadImageFile } from '../../../apis/whatsapp/whatsapp.js';
import CustomTooltip from '../../../components/common/CustomTooltip.jsx';
import { AiOutlineInfoCircle } from 'react-icons/ai';

// Function to extract variables from text (e.g., {{1}}) 
const extractVariablesFromText = (text) => {
    const regex = /{{(\d+)}}/g;
    let match;
    const variables = [];
    while ((match = regex.exec(text)) !== null) {
        if (!variables.includes(match[1])) {
            variables.push(match[1]);
        }
    }
    return variables;
};

const TemplateForm = ({ templateDataNew, onInputChange, onImageUpload, selectedOption, fileHeaders, selectedTemplateData, onUrlIndexChange }) => {
    const [inputValues, setInputValues] = useState({});
    const [selectedVariable, setSelectedVariable] = useState("");
    const [urlIndex, setUrlIndex] = useState(null); // ✅ Stores the selected URL column index

    const [imageState, setImageState] = useState({
        file: null,
        preview: null,
        name: "",
        uploading: false,
        uploadedUrl: null,
        validFileSelected: false,
    });

    useEffect(() => {
        if (!templateDataNew) {
            setInputValues({});
            setImageState({
                file: null,
                preview: null,
                name: "",
                uploading: false,
                uploadedUrl: null,
                validFileSelected: false,
            });
        }
    }, [templateDataNew]);

    let variables = [];
    if (selectedOption === "option1") {
        variables = ["firstname", "lastname", "mobileno"];
    } else if (selectedOption === "option2" && fileHeaders?.length > 0) {
        variables = fileHeaders;
    }

    useEffect(() => {
        if (!templateDataNew) return;
        let defaultValues = {};

        templateDataNew?.components.forEach((component) => {
            if (component.type === "BODY") {
                const variables = extractVariablesFromText(component.text);
                variables.forEach((variable) => {
                    defaultValues[variable] = "";
                });
            }

            if (component.type === "BUTTONS") {
                component.buttons.forEach((button) => {
                    if (button.type === "URL") {
                        const variables = extractVariablesFromText(button.url);
                        variables.forEach((variable) => {
                            defaultValues[`button${variable}`] = "";
                        });
                    }
                });
            }
        });

        setInputValues(defaultValues);
    }, [templateDataNew, selectedOption]);

    // const handleInputChange = (e, variable) => {
    //     const { value } = e.target;
    //     setInputValues((prev) => ({
    //         ...prev,
    //         [variable]: value,
    //     }));
    //     onInputChange(value, variable);
    // };

    const handleInputChange = (e, variable, type = "body") => {
        const { value } = e.target;
        setInputValues((prev) => ({
            ...prev,
            [`${type}${variable}`]: value, // Differentiate between body and button variables
        }));
        onInputChange(value, `${type}${variable}`);
    };

    const handleSelectVariable = (variable, inputKey, type = "body") => {
        setInputValues((prev) => {
            const updatedValue = prev[`${type}${inputKey}`]
                ? `${prev[`${type}${inputKey}`]} {{${variable}}}`
                : `{{${variable}}}`;

            // Store the new state
            const newState = { ...prev, [`${type}${inputKey}`]: updatedValue };

            // ✅ If selecting for BUTTON URL, update `urlIndex`
            if (type === "button" && fileHeaders.includes(variable)) {
                const index = fileHeaders.indexOf(variable);
                console.log("Selected URL Column:", variable, "Index:", index);

                setUrlIndex(index);  // ✅ Update URL Index state
                onUrlIndexChange(index);  // ✅ Send updated index to parent component
            }

            // Use setTimeout to avoid updating parent state in the render phase
            setTimeout(() => {
                onInputChange(newState[`${type}${inputKey}`], `${type}${inputKey}`);
            }, 0);

            return newState;
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            toast.error("No file selected.");
            return;
        }
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
            toast.error("Only jpg, jpeg, and png files are allowed.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size must be less than 5MB.");
            return;
        }
        if (/\s/.test(file.name)) {
            toast.error("File name should not contain spaces.");
            return;
        }
        setImageState({
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
            uploading: false,
            uploadedUrl: null,
            validFileSelected: true,
        });
    };

    const handleUpload = async () => {
        if (!imageState.file) {
            toast.error("Please select an image first!");
            return;
        }
        if (imageState.uploadedUrl) {
            toast.error("Image already uploaded, please choose a different one.");
            return;
        }
        setImageState((prev) => ({ ...prev, uploading: true }));
        try {
            console.log("Uploading image:", imageState.file);
            const response = await uploadImageFile(imageState.file);
            console.log("Upload Response:", response);
            if (response.status) {
                toast.success("Image uploaded successfully!");
                setImageState((prev) => ({
                    ...prev,
                    uploadedUrl: response.fileUrl,
                    preview: response.fileUrl,
                    validFileSelected: false,
                }));
                onImageUpload(response.fileUrl);
            } else {
                toast.error(response.msg || "Image upload failed.");
            }
        } catch (error) {
            toast.error(error.message || "Error uploading image.");
        } finally {
            setImageState((prev) => ({ ...prev, uploading: false }));

        }
    };

    const handleDelete = () => {
        setImageState({
            file: null,
            preview: null,
            name: "",
            uploading: false,
            uploadedUrl: null,
            validFileSelected: false,
        });
        onImageUpload(null);
        toast.success("Image removed successfully.");
    };

    useEffect(() => {
        console.log("Received fileHeaders in TemplateForm:", fileHeaders);
    }, [fileHeaders]);


    return (
        <div className='shadow-sm rounded-md' >

            <div className='bg-[#128C7E] p-2 rounded-t-md'>
                <h3 className="text-[0.8rem] font-medium text-white tracking-wider ">
                    Template Category - {selectedTemplateData?.category || "N/A"}
                </h3>
                <h3 className="text-[0.8rem] font-medium text-white tracking-wider ">
                    Template Type - {selectedTemplateData?.type || "N/A"}
                </h3>
            </div>

            <div className="space-y-2 p-2 bg-gray-50 rounded-b-xl">

                {/* BODY Component: Handle Variables */}
                {templateDataNew?.components.map((component, idx) => {
                    if (component.type === 'BODY') {
                        const extractedVariables = extractVariablesFromText(component.text);
                        return (
                            <div key={component.id || idx} className="space-y-1.5">
                                <div className='flex items-center gap-1' >

                                    <p className="text-sm text-gray-700 font-medium tracking-wide">Message Parameters</p>
                                    <CustomTooltip
                                        title="Message parameter should not contain any space"
                                        placement='right'
                                        arrow
                                    >
                                        <span>
                                            <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                                        </span>
                                    </CustomTooltip>
                                </div>
                                {extractedVariables.map((variable, index) => (
                                    <div key={index} className="flex flex-col space-y-2 relative">
                                        <div className='flex items-center gap-2 ' >
                                            <label htmlFor={`input${variable}`} className="text-[0.8rem] font-medium text-gray-600 w-10">
                                                {`{{${variable}}}`}
                                            </label>
                                            <input
                                                id={`input${variable}`}
                                                name={`input${variable}`}
                                                value={inputValues[`body${variable}`] || ""}
                                                placeholder={`Enter value for {{${variable}}}`}
                                                onChange={(e) => handleInputChange(e, variable, "body")}
                                                className="pl-1 pr-6 py-1.5 w-full border rounded-sm text-[0.85rem] border-gray-300 shadow-sm focus:outline-none"
                                            />
                                        </div>
                                        <div className='absolute top-0 right-0  z-50'>
                                            <InputVariable
                                                onSelect={(selectedVar) => handleSelectVariable(selectedVar, variable, "body")}
                                                variables={variables}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    }
                    return null;
                })}

                {/* BUTTONS Component: Handle URL Variables */}
                {templateDataNew?.components.map((component, idx) => {
                    if (component.type === 'BUTTONS') {
                        return (
                            <div key={idx} className="space-y-2">
                                <div className='flex items-center gap-1' >

                                    <p className="text-sm text-gray-700 font-medium tracking-wide">URL Parameter</p>
                                    <CustomTooltip
                                        title="URL parameter should not contain any space"
                                        placement='right'
                                        arrow
                                    >
                                        <span>
                                            <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                                        </span>
                                    </CustomTooltip>
                                </div>
                                {component.buttons.map((button, index) => {
                                    const urlVariables = extractVariablesFromText(button.url);
                                    return (
                                        <div key={index} className="space-y-4">
                                            {urlVariables.map((variable) => (
                                                <div key={variable} className="flex flex-col space-y-2 relative">
                                                    <div className='flex items-center gap-2' >
                                                        <label htmlFor={`buttonInput${variable}`} className="text-sm font-medium text-gray-600 w-10">
                                                            {`{{${variable}}}`}
                                                        </label>
                                                        <input
                                                            id={`buttonInput${variable}`}
                                                            name={`buttonInput${variable}`}
                                                            value={inputValues[`button${variable}`] || ""}
                                                            placeholder={`Enter value for {{${variable}}}`}
                                                            onChange={(e) => handleInputChange(e, variable, "button")}
                                                            className="pl-1 pr-6 py-1.5 w-full border rounded-sm text-[0.85rem] border-gray-300 shadow-sm focus:outline-none"
                                                        />
                                                    </div>
                                                    <div className='absolute top-0 right-0  z-50'>
                                                        <InputVariable
                                                            onSelect={(selectedVar) => handleSelectVariable(selectedVar, variable, "button")}
                                                            variables={variables}
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
                {templateDataNew?.components.some(component => component.type === 'HEADER' && component.format === 'IMAGE') && (
                    <div className="flex flex-col gap-2">
                        <div className='flex items-center gap-2'>
                            <p className="text-sm text-gray-700 font-medium tracking-wide">Upload Image</p>
                            <CustomTooltip
                                title='Only jpg,jpeg and png allowed (5 MB max)'
                                placement='right'
                                arrow
                            >
                                <span>
                                    <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                                </span>
                            </CustomTooltip>
                        </div>
                        <div className="flex items-start gap-2">
                            <input
                                type="file"
                                id="imageUpload"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => document.getElementById('imageUpload').click()}
                                className="px-2 py-1.5 tracking-wide bg-blue-400 text-white text-[0.85rem] rounded-md shadow-md hover:bg-blue-500 focus:outline-none cursor-pointer"
                            >
                                Choose File
                            </button>


                            {(imageState.file || imageState.uploadedUrl) && (
                                <>
                                    <button
                                        onClick={handleUpload}
                                        disabled={imageState.uploading || !imageState.validFileSelected}
                                        className={`px-2 py-[0.3rem] ${imageState.uploading || !imageState.validFileSelected ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-400 cursor-pointer hover:bg-green-500'} text-white text-sm rounded-md shadow-md focus:outline-none`}
                                    >
                                        {imageState.uploading ? <DoNotDisturbOutlinedIcon sx={{ color: "white", fontSize: "22px" }} /> : <FileUploadOutlinedIcon sx={{ color: "white", fontSize: "22px" }} />}
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="p-2 focus:outline-none hover:bg-gray-200 rounded-full cursor-pointer"
                                    >
                                        <MdOutlineDeleteForever className="text-red-500 cursor-pointer hover:text-red-600" size={20} />
                                    </button>
                                </>
                            )}
                        </div>
                        {imageState.name && (
                            <span className="text-[0.8rem] text-gray-700">{imageState.name}</span>
                        )}
                        {/* <div className='text-[0.8rem] text-gray-600'>Only jpg,jpeg and png allowed (5 MB max)</div> */}
                    </div>
                )}

            </div>
        </div>

    );
};

export default TemplateForm;
