// // WhatsappLiveChat.jsx
// import { useEffect, useState, useRef } from "react";
// import { FiSend } from "react-icons/fi";
// import { IoArrowBack } from "react-icons/io5";
// import { motion, AnimatePresence } from "framer-motion";
// import { getWabaList } from "../../apis/whatsapp/whatsapp";
// import AnimatedDropdown from "../components/AnimatedDropdown";
// import CustomEmojiPicker from "../components/CustomEmojiPicker";
// import toast from "react-hot-toast";

// export default function WhatsappLiveChat() {
//     const [selectedWaba, setSelectedWaba] = useState("");
//     const [chats, setChats] = useState([{
//         id: 1,
//         name: "John Doe",
//         phone: "+919672670732",
//         image: "https://placekitten.com/100/100",
//         messages: [
//             { text: "Hello!", sender: "John Doe" },
//             { text: "Hi there!", sender: "You" },
//         ],
//     }]);
//     const [activeChat, setActiveChat] = useState(null);
//     const [input, setInput] = useState("");
//     const [waba, setWaba] = useState([]);
//     const inputRef = useRef(null);

//     useEffect(() => {
//         async function fetchWaba() {
//             const res = await getWabaList();
//             setWaba(res);
//         }
//         fetchWaba();
//     }, []);

//     const insertEmoji = (emoji) => {
//         if (inputRef.current) {
//             const inputEl = inputRef.current;
//             const start = inputEl.selectionStart;
//             const end = inputEl.selectionEnd;
//             const newText = input.substring(0, start) + emoji + input.substring(end);
//             setInput(newText);
//             setTimeout(() => {
//                 inputEl.setSelectionRange(start + emoji.length, start + emoji.length);
//                 inputEl.focus();
//             }, 0);
//         }
//     };

//     const sendMessage = () => {
//         if (input.trim()) {
//             const updatedChats = chats.map((chat) =>
//                 chat.id === activeChat.id
//                     ? {
//                         ...chat,
//                         messages: [...chat.messages, { text: input, sender: "You" }],
//                     }
//                     : chat
//             );
//             setChats(updatedChats);
//             setActiveChat(updatedChats.find((chat) => chat.id === activeChat.id));
//             setInput("");
//         }
//     };

//     return (
//         <div className="flex h-[90vh] bg-gray-100 rounded-xl overflow-hidden shadow-lg">
//             <AnimatePresence>
//                 {!selectedWaba && (
//                     <motion.div
//                         key="waba-selector"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                         transition={{ duration: 0.4 }}
//                         className="flex flex-col items-center justify-center w-full"
//                     >
//                         <h2 className="text-2xl font-bold text-gray-700 mb-4">Select a WABA</h2>
//                         <div className="w-1/2">
//                             <AnimatedDropdown
//                                 id="createSelectWaba"
//                                 name="createSelectWaba"
//                                 label="Select WABA"
//                                 options={waba?.map((w) => ({ value: w.mobileNo, label: w.name }))}
//                                 value={selectedWaba}
//                                 onChange={(value) => setSelectedWaba(value)}
//                                 placeholder="Choose your WhatsApp Business Account"
//                             />
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             <AnimatePresence>
//                 {selectedWaba && !activeChat && (
//                     <motion.div
//                         key="chat-list"
//                         initial={{ x: "-100%" }}
//                         animate={{ x: 0 }}
//                         exit={{ x: "-100%" }}
//                         transition={{ type: "spring", stiffness: 100 }}
//                         className="w-full md:w-1/3 bg-white p-4 overflow-y-auto"
//                     >
//                         <h3 className="text-xl font-bold text-gray-800 mb-4">Conversations</h3>
//                         {chats.map((chat) => (
//                             <div
//                                 key={chat.id}
//                                 className="p-3 mb-2 rounded-lg bg-gray-100 hover:bg-blue-100 cursor-pointer transition"
//                                 onClick={() => setActiveChat(chat)}
//                             >
//                                 <div className="flex items-center gap-3">
//                                     <img
//                                         src={chat.image}
//                                         alt="avatar"
//                                         className="w-10 h-10 rounded-full object-cover"
//                                     />
//                                     <div>
//                                         <h4 className="font-semibold">{chat.name}</h4>
//                                         <p className="text-sm text-gray-500 truncate">
//                                             {chat.messages[chat.messages.length - 1].text}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             <AnimatePresence>
//                 {activeChat && (
//                     <motion.div
//                         key="chat-window"
//                         initial={{ x: "100%", opacity: 0 }}
//                         animate={{ x: 0, opacity: 1 }}
//                         exit={{ x: "100%", opacity: 0 }}
//                         transition={{ type: "spring", stiffness: 100 }}
//                         className="flex flex-col flex-1 bg-white shadow-md"
//                     >
//                         <div className="flex items-center justify-between p-4 border-b">
//                             <div className="flex items-center gap-3">
//                                 <IoArrowBack
//                                     className="md:hidden text-xl cursor-pointer"
//                                     onClick={() => setActiveChat(null)}
//                                 />
//                                 <img
//                                     src={activeChat.image}
//                                     alt="avatar"
//                                     className="w-10 h-10 rounded-full object-cover"
//                                 />
//                                 <h4 className="font-semibold text-gray-700">
//                                     {activeChat.name}
//                                 </h4>
//                             </div>
//                         </div>

//                         <div className="flex-1 overflow-y-auto p-4 space-y-2">
//                             {activeChat.messages.map((msg, index) => (
//                                 <motion.div
//                                     key={index}
//                                     initial={{ opacity: 0, y: 10 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{ delay: index * 0.05 }}
//                                     className={`p-2 rounded-lg max-w-xs ${msg.sender === "You"
//                                         ? "bg-blue-500 text-white self-end"
//                                         : "bg-gray-200 text-black self-start"}`}
//                                 >
//                                     {msg.text}
//                                 </motion.div>
//                             ))}
//                         </div>

//                         <div className="p-4 border-t flex items-center gap-2">
//                             <CustomEmojiPicker position="top" onSelect={insertEmoji} />
//                             <input
//                                 ref={inputRef}
//                                 type="text"
//                                 placeholder="Type a message..."
//                                 className="flex-1 p-2 border rounded-lg focus:outline-none"
//                                 value={input}
//                                 onChange={(e) => setInput(e.target.value)}
//                                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                             />
//                             <button
//                                 onClick={sendMessage}
//                                 className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                             >
//                                 <FiSend />
//                             </button>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// }


// WhatsappLiveChat.jsx
import { useEffect, useState, useRef } from "react";
import { FiSend } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { getWabaList } from "../../apis/whatsapp/whatsapp";
import AnimatedDropdown from "../components/AnimatedDropdown";
import CustomEmojiPicker from "../components/CustomEmojiPicker";
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

export default function WhatsappLiveChat() {
    const [selectedWaba, setSelectedWaba] = useState("");
    const [chats, setChats] = useState([{
        id: 1,
        name: "John Doe",
        phone: "+919672670732",
        image: "https://placekitten.com/100/100",
        messages: [
            { text: "Hello!", sender: "John Doe" },
            { text: "Hi there!", sender: "You" },
        ],
    }]);
    const [activeChat, setActiveChat] = useState(null);
    const [input, setInput] = useState("");
    const [waba, setWaba] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        async function fetchWaba() {
            const res = await getWabaList();
            setWaba(res);
        }
        fetchWaba();
    }, []);

    const insertEmoji = (emoji) => {
        if (inputRef.current) {
            const inputEl = inputRef.current;
            const start = inputEl.selectionStart;
            const end = inputEl.selectionEnd;
            const newText = input.substring(0, start) + emoji + input.substring(end);
            setInput(newText);
            setTimeout(() => {
                inputEl.setSelectionRange(start + emoji.length, start + emoji.length);
                inputEl.focus();
            }, 0);
        }
    };

    const sendMessage = () => {
        if (input.trim()) {
            const updatedChats = chats.map((chat) =>
                chat.id === activeChat.id
                    ? {
                        ...chat,
                        messages: [...chat.messages, { text: input, sender: "You" }],
                    }
                    : chat
            );
            setChats(updatedChats);
            setActiveChat(updatedChats.find((chat) => chat.id === activeChat.id));
            setInput("");
        }
    };

    return (
        // <div className="flex h-[90vh] bg-gradient-to-br from-green-50 via-white to-blue-100 rounded-xl overflow-hidden shadow-lg">
        //     <AnimatePresence>
        //         {!selectedWaba && (
        //             <motion.div
        //                 key="waba-selector"
        //                 initial={{ opacity: 0, scale: 0.95 }}
        //                 animate={{ opacity: 1, scale: 1 }}
        //                 exit={{ opacity: 0, scale: 0.95 }}
        //                 transition={{ duration: 0.4 }}
        //                 className="flex flex-col items-center justify-center w-full"
        //             >
        //                 <div className="text-center space-y-4">
        //                     <div className="animate-pulse">
        //                         <img src="/assets/whatsapp-waba.svg" alt="select waba" className="w-40 mx-auto" />
        //                     </div>
        //                     <h2 className="text-3xl font-bold text-green-600">Welcome to Celitix LiveChat</h2>
        //                     <p className="text-gray-500">Please select a WhatsApp Business Account to begin</p>
        //                     <div className="w-72 mx-auto">
        //                         <AnimatedDropdown
        //                             id="createSelectWaba"
        //                             name="createSelectWaba"
        //                             label="Select WABA"
        //                             options={waba?.map((w) => ({ value: w.mobileNo, label: w.name }))}
        //                             value={selectedWaba}
        //                             onChange={(value) => setSelectedWaba(value)}
        //                             placeholder="Choose your WhatsApp Business Account"
        //                         />
        //                     </div>
        //                 </div>
        //             </motion.div>
        //         )}
        //     </AnimatePresence>

        //     <AnimatePresence>
        //         {selectedWaba && (
        //             <motion.div
        //                 key="chat-list"
        //                 initial={{ x: "-100%" }}
        //                 animate={{ x: 0 }}
        //                 exit={{ x: "-100%" }}
        //                 transition={{ type: "spring", stiffness: 100 }}
        //                 className="w-full md:w-1/3 bg-white p-4 overflow-y-auto border-r"
        //             >
        //                 <div className="flex justify-between items-center mb-4">
        //                     <h3 className="text-xl font-bold text-gray-800">Active Users</h3>
        //                     <button className="text-sm text-red-500 underline" onClick={() => setSelectedWaba("")}>Change WABA</button>
        //                 </div>
        //                 {chats.length === 0 ? (
        //                     <div className="text-center text-gray-500 mt-20">
        //                         <p>No active users found for this WABA.</p>
        //                     </div>
        //                 ) : (
        //                     chats.map((chat) => (
        //                         <div
        //                             key={chat.id}
        //                             className="p-3 mb-2 rounded-lg bg-gray-100 hover:bg-blue-100 cursor-pointer transition"
        //                             onClick={() => setActiveChat(chat)}
        //                         >
        //                             <div className="flex items-center gap-3">
        //                                 <img
        //                                     src={chat.image}
        //                                     alt="avatar"
        //                                     className="w-10 h-10 rounded-full object-cover"
        //                                 />
        //                                 <div>
        //                                     <h4 className="font-semibold">{chat.name}</h4>
        //                                     <p className="text-sm text-gray-500 truncate">
        //                                         {chat.messages[chat.messages.length - 1].text}
        //                                     </p>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     ))
        //                 )}
        //             </motion.div>
        //         )}
        //     </AnimatePresence>

        //     <AnimatePresence>
        //         {selectedWaba && !activeChat && (
        //             <motion.div
        //                 key="empty-chat"
        //                 initial={{ opacity: 0 }}
        //                 animate={{ opacity: 1 }}
        //                 exit={{ opacity: 0 }}
        //                 className="flex-1 flex items-center justify-center bg-gray-100 rounded-r-xl"
        //             >
        //                 <div className="text-center space-y-6">
        //                     <div className="flex justify-center mb-4">
        //                         <div className="w-24 h-24 rounded-full bg-green-100 shadow-xl flex items-center justify-center animate-bounce">
        //                             <QuestionAnswerOutlinedIcon sx={{ fontSize: "3rem" }} className="text-green-700" />
        //                         </div>
        //                     </div>
        //                     <h2 className="text-2xl font-semibold text-gray-800 tracking-wide">Welcome to Celitix LiveChat!</h2>
        //                     <p className="text-gray-500">Select a conversation from the left panel to start chatting.</p>
        //                 </div>
        //             </motion.div>
        //         )}
        //     </AnimatePresence>

        //     <AnimatePresence>
        //         {activeChat && (
        //             <motion.div
        //                 key="chat-window"
        //                 initial={{ x: "100%", opacity: 0 }}
        //                 animate={{ x: 0, opacity: 1 }}
        //                 exit={{ x: "100%", opacity: 0 }}
        //                 transition={{ type: "spring", stiffness: 100 }}
        //                 className="flex flex-col flex-1 bg-white shadow-md"
        //             >
        //                 <div className="flex items-center justify-between p-4 border-b">
        //                     <div className="flex items-center gap-3">
        //                         <IoArrowBack
        //                             className="md:hidden text-xl cursor-pointer"
        //                             onClick={() => setActiveChat(null)}
        //                         />
        //                         <img
        //                             src={activeChat.image}
        //                             alt="avatar"
        //                             className="w-10 h-10 rounded-full object-cover"
        //                         />
        //                         <h4 className="font-semibold text-gray-700">
        //                             {activeChat.name}
        //                         </h4>
        //                     </div>
        //                 </div>

        //                 <div className="flex-1 overflow-y-auto p-4 space-y-2">
        //                     {activeChat.messages.map((msg, index) => (
        //                         <motion.div
        //                             key={index}
        //                             initial={{ opacity: 0, y: 10 }}
        //                             animate={{ opacity: 1, y: 0 }}
        //                             transition={{ delay: index * 0.05 }}
        //                             className={`p-2 rounded-lg max-w-xs ${msg.sender === "You"
        //                                 ? "bg-blue-500 text-white self-end"
        //                                 : "bg-gray-200 text-black self-start"}`}
        //                         >
        //                             {msg.text}
        //                         </motion.div>
        //                     ))}
        //                 </div>

        //                 <div className="p-4 border-t flex items-center gap-2">
        //                     <CustomEmojiPicker position="top" onSelect={insertEmoji} />
        //                     <input
        //                         ref={inputRef}
        //                         type="text"
        //                         placeholder="Type a message..."
        //                         className="flex-1 p-2 border rounded-lg focus:outline-none"
        //                         value={input}
        //                         onChange={(e) => setInput(e.target.value)}
        //                         onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        //                     />
        //                     <button
        //                         onClick={sendMessage}
        //                         className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        //                     >
        //                         <FiSend />
        //                     </button>
        //                 </div>
        //             </motion.div>
        //         )}
        //     </AnimatePresence>
        // </div>
        <div className="flex h-[90vh] bg-white rounded-xl overflow-hidden shadow-xl">
            <AnimatePresence>
                {!selectedWaba && (
                    <motion.div
                        key="waba-selector"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-indigo-100 via-white to-green-50 px-4"
                    >
                        <div className="text-center max-w-md w-full space-y-8">
                            <div className="w-32 h-32 mx-auto">
                                <lottie-player
                                    autoplay
                                    loop
                                    mode="normal"
                                    src="https://assets3.lottiefiles.com/packages/lf20_0yfsb3a1.json"
                                    style={{ width: "100%", height: "100%" }}
                                ></lottie-player>
                            </div>
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl font-semibold text-gray-800"
                            >
                                Select Your WhatsApp Business Account
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-gray-600 text-sm"
                            >
                                Manage conversations and respond to customers instantly from your selected account.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="w-full max-w-sm mx-auto"
                            >
                                <AnimatedDropdown
                                    id="createSelectWaba"
                                    name="createSelectWaba"
                                    label="Your WABA"
                                    options={waba?.map((w) => ({ value: w.mobileNo, label: w.name }))}
                                    value={selectedWaba}
                                    onChange={(value) => setSelectedWaba(value)}
                                    placeholder="Select WABA to continue"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* <div className="flex h-[90vh] bg-white rounded-xl overflow-hidden shadow-xl">
                <AnimatePresence>
                    {!selectedWaba && (
                        <motion.div
                            key="waba-selector"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-indigo-100 via-white to-green-50 px-4 relative overflow-hidden"
                        >
                            <div className="absolute w-[30rem] h-[30rem] bg-pink-100 rounded-full blur-3xl opacity-30 -top-20 -left-20 animate-pulse"></div>
                            <div className="absolute w-[25rem] h-[25rem] bg-blue-200 rounded-full blur-2xl opacity-30 bottom-0 -right-10 animate-ping"></div>

                            <div className="text-center max-w-md w-full space-y-10 z-10">
                                <div className="w-36 h-36 mx-auto">
                                    <lottie-player
                                        autoplay
                                        loop
                                        mode="normal"
                                        src="https://lottie.host/ed7a275c-8df4-4bde-8721-0f8fda510c62/hFLyUrGRjI.json"
                                        style={{ width: "100%", height: "100%" }}
                                    ></lottie-player>
                                </div>
                                <motion.h2
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-4xl font-bold text-slate-800"
                                >
                                    Let’s Power Up Your Inbox 🚀
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-gray-600 text-sm"
                                >
                                    Pick a WhatsApp Business Account to activate conversations, automate responses, and support smarter.
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="w-full max-w-sm mx-auto"
                                >
                                    <AnimatedDropdown
                                        id="createSelectWaba"
                                        name="createSelectWaba"
                                        label="Choose WABA"
                                        options={waba?.map((w) => ({ value: w.mobileNo, label: w.name }))}
                                        value={selectedWaba}
                                        onChange={(value) => setSelectedWaba(value)}
                                        placeholder="Tap to select WABA"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div> */}
            <div className="flex h-[90vh] bg-white rounded-xl overflow-hidden shadow-xl">
                <AnimatePresence>
                    {!selectedWaba && (
                        <motion.div
                            key="waba-selector"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-green-100 via-white to-blue-100 px-4"
                        >
                            <div className="text-center max-w-md w-full space-y-8">
                                <div className="w-32 h-32 mx-auto">
                                    <lottie-player
                                        autoplay
                                        loop
                                        mode="normal"
                                        src="https://lottie.host/4579f410-8596-4f8a-8379-4a53a7261d90/NjyNoOe9Ef.json"
                                        style={{ width: "100%", height: "100%" }}
                                    ></lottie-player>
                                </div>
                                <motion.h2
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-3xl font-semibold text-gray-800"
                                >
                                    Ready to Manage Your Conversations?
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-gray-600 text-sm"
                                >
                                    Choose your WhatsApp Business Account to access live chats, track activity, and delight your customers.
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="w-full max-w-sm mx-auto"
                                >
                                    <AnimatedDropdown
                                        id="createSelectWaba"
                                        name="createSelectWaba"
                                        label="Your WABA"
                                        options={waba?.map((w) => ({ value: w.mobileNo, label: w.name }))}
                                        value={selectedWaba}
                                        onChange={(value) => setSelectedWaba(value)}
                                        placeholder="Select WABA to continue"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* rest of the layout continues unchanged */}
            </div>


            {/* rest of the layout continues unchanged */}
        </div>
    );
}