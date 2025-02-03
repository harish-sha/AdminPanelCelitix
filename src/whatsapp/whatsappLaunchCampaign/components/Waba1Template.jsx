import React, { useState } from "react";
import VariableDropdown from "./VariableDropdown";
import CustomEmojiPicker from "../../components/CustomEmojiPicker";

const Waba1Template = ({ updateTemplate }) => {
    const [titleInputs, setTitleInputs] = useState([""]);
    const [messageParams, setMessageParams] = useState([""]);
    const [uploadedMedia, setUploadedMedia] = useState(null);

    // Handle dynamic title input changes
    const handleTitleChange = (index, value) => {
        const newInputs = [...titleInputs];
        newInputs[index] = value;
        setTitleInputs(newInputs);
        updateTemplate({ title: newInputs });
    };

    // Add new title input dynamically
    const addTitleInput = () => {
        setTitleInputs([...titleInputs, ""]);
    };

    // Handle message parameters change
    const handleMessageParamChange = (index, value) => {
        const newParams = [...messageParams];
        newParams[index] = value;
        setMessageParams(newParams);
        updateTemplate({ messageParams: newParams });
    };

    // Add new message parameter dynamically
    const addMessageParam = () => {
        setMessageParams([...messageParams, ""]);
    };

    // Handle media upload
    const handleMediaUpload = (event) => {
        const file = event.target.files[0];
        setUploadedMedia(URL.createObjectURL(file)); // Preview uploaded image
        updateTemplate({ media: URL.createObjectURL(file) });
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
                            <div className="flex items-center gap-2 my-1 relative" >
                                <label htmlFor="" className="block text-md font-medium text-gray-700 w-5" >{`${index + 1}.`}</label>
                                <input
                                    id="wabatitle"
                                    name="wabatitle"
                                    key={index}
                                    type="text"
                                    value={input}
                                    onChange={(e) => handleTitleChange(index, e.target.value)}
                                    // placeholder={`Title ${index + 1}`}
                                    placeholder="Type or select an attribute"
                                    className="block w-full p-1.5  border border-gray-400 bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm"
                                />
                                <div className='absolute top-1 right-8  flex space-x-2 z-50'>

                                    <CustomEmojiPicker
                                        onSelect={(emoji) => handleEmojiSelect(setTemplateFooter, emoji)}
                                        position='right'
                                    />
                                </div>
                                <div className='absolute top-0 right-0 bg-gray-100  flex space-x-2 z-50'>
                                    <VariableDropdown
                                        onSelect={(variable) =>
                                            handleAddVariable(setTemplateFooter, variable)
                                        }
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
                            <div className="flex items-center gap-2 my-1 relative" >
                                <label htmlFor="" className="block text-md font-medium text-gray-700 w-5" >{`${index + 1}.`}</label>
                                <input
                                    id="wabaparam"
                                    name="wabaparam"
                                    key={index}
                                    type="text"
                                    value={param}
                                    onChange={(e) => handleMessageParamChange(index, e.target.value)}
                                    placeholder="Type or select an attribute"
                                    className="block w-full p-1.5 pr-0 border border-gray-400 bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm"
                                />
                                <div className='absolute top-1 right-8  flex space-x-2 z-50'>

                                    <CustomEmojiPicker
                                        onSelect={(emoji) => handleEmojiSelect(setTemplateFooter, emoji)}
                                        position='right'
                                    />
                                </div>
                                <div className='absolute top-0 right-0 bg-gray-100  flex space-x-2 z-50'>
                                    <VariableDropdown
                                        onSelect={(variable) =>
                                            handleAddVariable(setTemplateFooter, variable)
                                        }
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
                <div className="mb-4">
                    <label className="block font-medium text-gray-700">Upload Media</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleMediaUpload}
                        className="w-full border p-2 rounded mt-2"
                    />
                    {uploadedMedia && (
                        <img
                            src={uploadedMedia}
                            alt="Uploaded"
                            className="mt-2 w-32 h-32 rounded"
                        />
                    )}
                </div>
            </div>
        </>

    );
};

export default Waba1Template;
