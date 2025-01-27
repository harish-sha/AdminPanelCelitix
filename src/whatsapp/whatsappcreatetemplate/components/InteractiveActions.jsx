import { useEffect } from 'react';
import { AiOutlineClose, AiOutlineInfoCircle } from 'react-icons/ai';

import CustomTooltip from '../../components/CustomTooltip';

const InteractiveActions = ({
    interactiveAction,
    setInteractiveAction,
    phoneNumber,
    setPhoneNumber,
    phoneTitle,
    setPhoneTitle,
    url,
    setUrl,
    urlTitle,
    setUrlTitle,
    quickReplies,
    setQuickReplies,
    urlValid,
    validateUrl,
    handlePhoneNumberChange,
    handleQuickReplyChange,
    addQuickReply,
    removeQuickReply,
    selectedTemplateType
}) => {
    useEffect(() => {
        if (interactiveAction !== 'all' || selectedTemplateType) {
            setPhoneNumber('');
            setPhoneTitle('');
            setUrl('');
            setUrlTitle('');
            setQuickReplies([]);
        }
    }, [
        interactiveAction,
        selectedTemplateType,
        setPhoneNumber,
        setPhoneTitle,
        setUrl,
        setUrlTitle,
        setQuickReplies,
    ]);

    return (
        <div className='w-full mb-4 p-4 border border-gray-300 bg-white rounded-lg shadow-md bg-gray-50'>
            {/* Header */}
            <div className='flex items-center mb-2'>
                <label className='text-base font-medium text-gray-700'>
                    Interactive Actions
                </label>
                <CustomTooltip
                    title=' Maximum 25 characters are allowed'
                    placement='right'
                    arrow
                >
                    <span className='ml-2'>
                        <AiOutlineInfoCircle className='text-gray-500 cursor-pointer' />
                    </span>
                </CustomTooltip>
            </div>
            <p className='text-sm text-gray-500 mb-4'>
                Add actions like phone calls, URLs, or quick replies to your template.
            </p>

            {/* Action Type Selection */}
            <div className='flex items-center gap-4 mb-4'>
                {['none', 'callToActions', 'quickReplies', 'all'].map((action) => (
                    <label
                        key={action}
                        className='flex items-center gap-2 cursor-pointer'
                    >
                        <input
                            type='radio'
                            name='interactiveAction'
                            value={action}
                            checked={interactiveAction === action}
                            onChange={() => setInteractiveAction(action)}
                            className='w-4 h-4'
                        />
                        <span className='text-sm capitalize'>
                            {action.replace(/([A-Z])/g, ' $1')}
                        </span>
                    </label>
                ))}
            </div>

            {/* Call to Actions */}
            {(interactiveAction === 'callToActions' ||
                interactiveAction === 'all') && (
                    <div className='space-y-4'>
                        <div className='flex gap-2'>
                            <button
                                className='bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600'
                                onClick={() => setPhoneNumber(phoneNumber || '+91')}
                            >
                                Add Phone Number
                            </button>
                            <button
                                className='bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600'
                                onClick={() => setUrl((prev) => (prev ? prev : 'http://'))} // Ensure URL is initialized
                            >
                                Add URL
                            </button>
                        </div>

                        {/* Phone Number Section */}
                        {phoneNumber && (
                            <div className='relative border p-3 rounded-md shadow-sm'>
                                <div className='flex items-center justify-between mb-2'>
                                    <label className='text-sm font-medium text-gray-700'>
                                        Phone Number
                                    </label>
                                    <AiOutlineClose
                                        className='text-gray-500 cursor-pointer hover:text-red-500'
                                        onClick={() => {
                                            setPhoneNumber('');
                                            setPhoneTitle('');
                                        }}
                                    />
                                </div>
                                <div className='flex gap-2'>
                                    <input
                                        type='text'
                                        className='flex-1 border rounded px-2 py-1 text-sm'
                                        placeholder='Button Title'
                                        value={phoneTitle}
                                        onChange={(e) => setPhoneTitle(e.target.value)}
                                        maxLength={25}
                                    />
                                    <input
                                        type='text'
                                        className='flex-1 border rounded px-2 py-1 text-sm'
                                        placeholder='Phone Number (+919876543210)'
                                        value={phoneNumber}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\+?[0-9]*$/.test(value)) {
                                                setPhoneNumber(value);
                                            }
                                        }}
                                        maxLength={16}
                                    />
                                </div>
                            </div>
                        )}

                        {/* URL Section */}
                        {url && (
                            <div className='relative border p-3 rounded-md shadow-sm'>
                                <div className='flex items-center justify-between gap-2 mb-2'>
                                    <label className='text-sm font-medium text-gray-700'>
                                        URL Title
                                    </label>
                                    <AiOutlineClose
                                        className='text-gray-500 cursor-pointer hover:text-red-500'
                                        onClick={() => {
                                            setUrl('');
                                            setUrlTitle('');
                                        }}
                                    />
                                </div>
                                <input
                                    type='text'
                                    className='w-full border rounded px-2 py-1 text-sm mb-2'
                                    placeholder='Button Title'
                                    value={urlTitle}
                                    onChange={(e) => setUrlTitle(e.target.value)}
                                    maxLength={25}
                                />
                                <input
                                    type='text'
                                    className={`w-full border rounded px-2 py-1 text-sm ${urlValid ? 'border-green-500' : 'border-red-500'
                                        }`}
                                    placeholder='Enter URL'
                                    value={url}
                                    onChange={(e) => {
                                        setUrl(e.target.value);
                                        validateUrl(e.target.value);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                )}

            {/* Quick Replies */}
            {(interactiveAction === 'quickReplies' ||
                interactiveAction === 'all') && (
                    <div className='space-y-4 mt-4'>
                        <h6 className='text-sm font-medium text-gray-700 mb-2'>
                            Quick Replies
                        </h6>
                        {quickReplies.map((reply, index) => (
                            <div key={index} className='flex gap-2 items-center'>
                                <input
                                    type='text'
                                    className='flex-1 border rounded px-2 py-1 text-sm'
                                    placeholder={`Quick Reply ${index + 1}`}
                                    value={reply}
                                    onChange={(e) => handleQuickReplyChange(index, e.target.value)}
                                    maxLength={25}
                                />
                                <AiOutlineClose
                                    className='text-gray-500 cursor-pointer hover:text-red-500'
                                    onClick={() => removeQuickReply(index)}
                                />
                            </div>
                        ))}
                        {quickReplies.length < 3 && (
                            <button
                                className='bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600'
                                onClick={addQuickReply}
                            >
                                Add Quick Reply
                            </button>
                        )}
                    </div>
                )}
        </div>
    );
};

export default InteractiveActions;
