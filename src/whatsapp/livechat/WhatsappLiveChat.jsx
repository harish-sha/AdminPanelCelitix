import React, { useEffect, useState } from 'react'
import { BsThreeDots, BsFilter, BsSend } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
// import "./LiveChat.css";
import Loader from '../components/Loader'
import AnimatedDropdown from '../components/AnimatedDropdown';




const WhatsappLiveChat = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedChat, setSelectedChat] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const options = [
        { value: 'WABA1', label: 'WABA1', id: 1 },
        { value: 'WABA2', label: 'WABA2', id: 2 },
        { value: 'WABA3', label: 'WABA3', id: 3 },
    ];

    // Dummy user data
    const users = [
        {
            id: 1,
            name: "John Doe",
            lastMessage: "Hello! How are you?Hello! How are you?Hello! How are you?Hello! How are you?Hello! How are you?Hello! How are you?Hello! How are you?Hello! How are you?Hello! How are you?Hello! How are you?",
            time: "10:15 AM",
            profilePic: "src/assets/images/man (1).png",
            unreadCount: 5,
        },
        {
            id: 2,
            name: "Jane Smith",
            lastMessage: "Are you available for a call?",
            time: "9:45 AM",
            profilePic: "src/assets/images/man.png",
            unreadCount: 2,
        },
        {
            id: 3,
            name: "Robert Brown",
            lastMessage: "Thanks for the update!",
            time: "Yesterday",
            profilePic: "src/assets/images/user (1).png",
            unreadCount: 0,
        },
    ];

    // Render selected chat
    const renderChatBody = () => {
        if (!selectedChat) {
            return (
                <div className="flex h-full items-center justify-center text-gray-500">
                    Select a chat to start a conversation
                </div>
            );
        }

        return (
            <div className="flex flex-col flex-grow px-4 py-2 space-y-2 overflow-y-auto bg-gray-50">
                {/* Dummy messages */}
                <div className="flex justify-start">
                    <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md max-w-[70%]">
                        Hi, how can I help you?
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="bg-blue-500 text-white px-4 py-2 rounded-md max-w-[70%]">
                        Can you tell me more about your services?
                    </div>
                </div>
                <div className="flex justify-start">
                    <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md max-w-[70%]">
                        Hi, how can I help you?
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="bg-blue-500 text-white px-4 py-2 rounded-md max-w-[70%]">
                        Can you tell me more about your services?
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {isLoading ? (

                <>
                    <Loader />
                </>
            ) : (
                <>
                    <div className="flex h-[91vh] ">
                        {/* Left Sidebar */}
                        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
                            {/* Top Controls */}
                            <div className="p-4 border-b border-gray-200">
                                {/* Dropdown */}
                                {/* <div className="relative">
                                    <button className="flex items-center justify-between w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                                        Filter Options <FaChevronDown />
                                    </button>
                                    <div className="absolute mt-1 w-full bg-white border rounded-md shadow-md">
                                        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                            All Chats
                                        </div>
                                        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                            Unread Chats
                                        </div>
                                        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                            Archived Chats
                                        </div>
                                    </div>
                                </div> */}
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

                                {/* Search and Icons */}
                                <div className="flex items-center mt-4">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                    />
                                    <BsFilter className="text-gray-500 ml-2 cursor-pointer" />
                                    <BsThreeDots className="text-gray-500 ml-2 cursor-pointer" />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-around border-b border-gray-200 py-2">
                                <button className="px-4 py-2 text-blue-600 font-semibold bg-blue-100 rounded-md">
                                    Active
                                </button>
                                <button className="px-4 py-2 text-gray-600 font-semibold bg-gray-100 rounded-md">
                                    Close
                                </button>
                            </div>

                            {/* User List */}
                            <div className="flex-grow overflow-y-auto">
                                {users.map((user) => (
                                    <div
                                        key={user.id}
                                        onClick={() => setSelectedChat(user)}
                                        className={`flex items-center h-20 w-full overflow-hidden  p-4 cursor-pointer hover:bg-gray-100 ${selectedChat?.id === user.id ? "bg-gray-200" : ""
                                            }`}
                                    >
                                        <img
                                            src={user.profilePic}
                                            alt={`${user.name}'s profile`}
                                            className="w-10 h-10 rounded-full mr-4"
                                        />
                                        <div className="flex-grow">
                                            <div className="text-gray-800 font-semibold">{user.name}</div>
                                            <div className="text-gray-500 text-sm truncate">
                                                {user.lastMessage}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-gray-500 text-sm">{user.time}</div>
                                            {user.unreadCount > 0 && (
                                                <div className="bg-blue-500 text-white w-6 h-6 text-center text-xs font-semibold rounded-full px-2 py-1">
                                                    {user.unreadCount}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chat View */}
                        <div className="flex-grow flex flex-col">
                            {/* Chat Header */}
                            {selectedChat && (
                                <div className="flex items-center p-4 border-b border-gray-200">
                                    <img
                                        src={selectedChat.profilePic}
                                        alt={`${selectedChat.name}'s profile`}
                                        className="w-10 h-10 rounded-full mr-4"
                                    />
                                    <div className="text-gray-800 font-semibold">{selectedChat.name}</div>
                                </div>
                            )}

                            {/* Chat Body */}
                            {renderChatBody()}

                            {/* Chat Input */}
                            {selectedChat && (
                                <div className="flex items-center p-4 border-t border-gray-200">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring focus:ring-blue-200"
                                    />
                                    <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-full">
                                        <BsSend />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </>

            )}
        </>
    )
}

export default WhatsappLiveChat