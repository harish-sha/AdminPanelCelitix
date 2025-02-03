import React, { useState } from "react";
import { BsThreeDots, BsFilter, BsSend } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import "./LiveChat.css";

const LiveChat = () => {
    const [selectedChat, setSelectedChat] = useState(null);

    // Dummy user data
    const users = [
        {
            id: 1,
            name: "John Doe",
            lastMessage: "Hello! How are you?",
            time: "10:15 AM",
            profilePic: "https://via.placeholder.com/40",
            unreadCount: 5,
        },
        {
            id: 2,
            name: "Jane Smith",
            lastMessage: "Are you available for a call?",
            time: "9:45 AM",
            profilePic: "https://via.placeholder.com/40",
            unreadCount: 2,
        },
        {
            id: 3,
            name: "Robert Brown",
            lastMessage: "Thanks for the update!",
            time: "Yesterday",
            profilePic: "https://via.placeholder.com/40",
            unreadCount: 0,
        },
    ];

    // Render selected chat
    const renderChatBody = () => {
        if (!selectedChat) {
            return <div className="no-chat">Select a chat to start a conversation</div>;
        }

        return (
            <div className="chat-body">
                {selectedChat.messages?.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`message ${msg.sentByUser ? "sent" : "received"}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="live-chat-container">
            {/* Left Side: Chat List */}
            <div className="chat-list">
                {/* Top Controls */}
                <div className="chat-list-header">
                    <div className="dropdown">
                        <button className="dropdown-btn">
                            Filter Options <FaChevronDown />
                        </button>
                        <div className="dropdown-content">
                            <div>All Chats</div>
                            <div>Unread Chats</div>
                            <div>Archived Chats</div>
                        </div>
                    </div>

                    <div className="search-bar">
                        <input type="text" placeholder="Search..." />
                        <BsFilter className="icon filter-icon" />
                        <BsThreeDots className="icon dots-icon" />
                    </div>
                </div>

                {/* Buttons */}
                <div className="chat-buttons">
                    <button className="btn active">Active</button>
                    <button className="btn close">Close</button>
                </div>

                {/* User List */}
                <div className="user-list">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className={`user ${selectedChat?.id === user.id ? "selected" : ""}`}
                            onClick={() => setSelectedChat(user)}
                        >
                            <img
                                src={user.profilePic}
                                alt={`${user.name}'s profile`}
                                className="profile-pic"
                            />
                            <div className="user-info">
                                <div className="user-name">{user.name}</div>
                                <div className="last-message">{user.lastMessage}</div>
                            </div>
                            <div className="user-meta">
                                <div className="time">{user.time}</div>
                                {user.unreadCount > 0 && (
                                    <div className="notification">{user.unreadCount}</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side: Chat View */}
            <div className="chat-view">
                {/* Chat Header */}
                {selectedChat && (
                    <div className="chat-header">
                        <img
                            src={selectedChat.profilePic}
                            alt={`${selectedChat.name}'s profile`}
                            className="profile-pic"
                        />
                        <div className="chat-user-info">
                            <div className="chat-user-name">{selectedChat.name}</div>
                        </div>
                    </div>
                )}

                {/* Chat Body */}
                {renderChatBody()}

                {/* Chat Input */}
                {selectedChat && (
                    <div className="chat-input">
                        <input type="text" placeholder="Type a message..." />
                        <button className="send-btn">
                            <BsSend />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveChat;
