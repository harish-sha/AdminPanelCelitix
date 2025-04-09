import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { FaRegFaceSmile } from "react-icons/fa6";

const CustomEmojiPicker = ({ onSelect, position = 'bottom' }) => {
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null);

    const handleEmojiClick = (emojiObject) => {
        onSelect(emojiObject.emoji);
    };

    const getPositionClass = () => {
        switch (position) {
            case 'top':
                return 'bottom-full mb-2';
            case 'bottom':
                return 'top-full mt-2';
            case 'left':
                return 'right-full mr-2';
            case 'right':
                return 'left-full ml-2';
            default:
                return 'top-full mt-2';
        }
    };

    const handleClickOutside = (event) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target)) {
            setShowPicker(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div className="relative" ref={pickerRef} >
            <button
                className="px-1 py-1 bg-white rounded-md"
                onClick={() => setShowPicker(!showPicker)}
            >
                <FaRegFaceSmile className={`${showPicker ? 'text-gray-950' : 'text-gray-500'}`} />
            </button>
            {showPicker && (
                <div className={`absolute z-1000 ${getPositionClass()}}`}>
                    <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        autoFocusSearch={false}
                        open={true}
                        reactionsDefaultOpen={true}
                        height={400}
                        width={400}
                        // lazyLoadEmojis={true}
                        allowExpandReactions={true}
                        emojiStyle='FACEBOOK'
                        theme='light' // dark,light or auto
                        // size='30'
                        searchDisabled={false}
                        searchPlaceholder='Search emoji'
                    // skinTonesDisabled={true}
                    // className='emojipicker'
                    // className={`emoji-picker ${showPicker ? 'show' : ''} border border-r-8`}
                    // onReactionClick={}
                    // onReactionClick={handleReaction}
                    />
                </div>
            )}
        </div>
    );
};

export default CustomEmojiPicker;