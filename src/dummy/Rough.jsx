const WhatsappLaunchPreview = ({ templateDataNew, formData, uploadedImage }) => {
    if (!templateDataNew || !templateDataNew.components) {
        return (
            <div className='px-3 py-3 rounded-xl flex bg-gray-200 min-h-100'>
                <div className="rounded-xl shadow-md bg-gray-100 transition-all duration-300 w-100">
                    <div className='flex items-center justify-between bg-[#128C7E] text-white px-4 py-2 rounded-t-md'>
                        <h2 className='text-md font-medium tracking-wide'>Template Preview</h2>
                        <p className='text-sm'>
                            <WhatsApp />
                        </p>
                    </div>
                    <div className='bg-white rounded-b-md p-3 flex flex-col gap-3'>
                        <img src={whatsappdummy} alt="whatsapp-dummy-image" className='w-full h-48 object-cover rounded-md' />
                        <div className="border border-gray-300 rounded-md p-2 w-full bg-gray-100 text-center text-sm">
                            No template selected
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const headerComponent = templateDataNew.components.find(comp => comp.type === "HEADER" && comp.format === "IMAGE");

    const bodyComponent = templateDataNew.components.find(comp => comp.type === "BODY");
    const buttonsComponent = templateDataNew.components.find(comp => comp.type === "BUTTONS");

    // Replace text variables
    let finalMessage = bodyComponent ? replaceVariablesInText(bodyComponent.text, formData) : "";

    return (
        <div className='px-3 py-3 rounded-xl flex bg-gray-200 min-h-100'>
            <div className="rounded-xl shadow-md bg-gray-100 transition-all duration-300 w-100">

                <div className='flex items-center justify-between bg-[#128C7E] text-white px-4 py-2 rounded-t-md'>
                    <h2 className='text-md font-medium tracking-wide'>Template Preview</h2>
                    <p className='text-sm'>
                        <WhatsApp />
                    </p>
                </div>

                <div className="bg-white rounded-b-md p-3 flex flex-col gap-3">
                    {uploadedImage ? (
                        <div className="mb-2 flex justify-center">
                            <img
                                src={uploadedImage}
                                alt="Uploaded Preview"
                                className="w-full h-48 object-contain rounded-md border border-gray-200 bg-center bg-no-repeat"
                            />
                        </div>
                    ) : (
                        headerComponent?.example?.header_handle?.[0] && (
                            <div className="mb-2 flex justify-center">
                                <img
                                    src={headerComponent.example.header_handle[0]}
                                    alt="Template Preview"
                                    className="w-full h-48 object-contain rounded-md border border-gray-200 bg-center bg-no-repeat"
                                />
                            </div>
                        )
                    )}

                    {/* Display the updated text message */}
                    {bodyComponent && (
                        <div className="border border-gray-200 rounded-md p-2 w-full bg-gray-100 text-[0.85rem] text-gray-800 overflow-auto min-h-20 max-h-40 break-words">
                            {finalMessage}
                        </div>
                    )}

                    {/* Render buttons */}
                    {buttonsComponent && buttonsComponent.buttons.length > 0 && (
                        <div className="mt-1 flex flex-col gap-2">
                            {buttonsComponent.buttons.map((button, index) => {
                                let hrefValue = button.url
                                    ? replaceVariablesInText(button.url, formData) // Correct URL replacement
                                    : `tel:${button.phone_number}`;

                                return (
                                    <a
                                        key={index}
                                        href={hrefValue}
                                        title={hrefValue} // Ensure title updates correctly
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-400 text-white py-2 px-4 rounded-md text-center block"
                                    >
                                        {button.text}
                                    </a>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
