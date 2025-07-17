import CustomTooltip from "@/whatsapp/components/CustomTooltip";
import metaAiAnimation from "@/assets/animation/metaai.json";
import Lottie from "lottie-react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { IconButton } from "@mui/material";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import LoopIcon from "@mui/icons-material/Loop";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

export const GenerateAiContent = ({
    ai,
    setAi,
    setIsOpen,
    isOpen,
    right = 3,
    bottom = 3,
    setMessageContent,
    length,
    messageContent,
    selectedCardIndex,
    type = "card",
}) => {
    const handleGenerate = async () => {
        if (!ai.text) return;

        // const message = ai?.text;

       const message = `
You are an expert marketing AI that writes engaging marketing and promotional message templates.

Style: ${style}

Task: ${ai?.text}

Write the message as a short marketing template message with a clear CTA if applicable. Make it mobile friendly and grammatically correct.
`.trim();


        setAi((prev) => ({
            ...prev,
            typing: true,
            isGenerating: true,
        }));
        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: `
                                    You are an AI assistant for marketing and promotional messages.
                                    Your only job is to help users write short, engaging marketing and promotional messages for campaigns.
                                    If the user asks anything unrelated (like news, jokes, coding, poems), reply:
                                    "I'm designed only to help you write marketing and promotional messages. Please input a product or offer."
                                    `.trim(),
                        },
                        { role: "user", content: message },
                    ],
                    max_tokens: 1024,
                    temperature: 0.7,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_OPENAI_API_KEY
                            }`,
                    },
                }
            );

            const text = response.data.choices?.[0]?.message?.content || "";
            // console.log(text);

            const totalLength = messageContent.length + text.length;
            const finalText =
                totalLength > length
                    ? text.slice(0, length - messageContent.length)
                    : text;

            //   setAiSuggestion(finalText);
            //   setTypingKey((prev) => prev + 1);

            setAi((prev) => ({
                ...prev,
                response: finalText,
                typing: false,
                isGenerating: false,
            }));
        } catch (err) {
            console.error(
                "Error generating content:",
                err.response?.data || err.message
            );
            toast.error(
                "Failed to generate AI response. Please check your API key and usage."
            );
        } finally {
            setAi((prev) => ({
                ...prev,
                typing: false,
                isGenerating: false,
            }));
        }
    };

    const closePanel = () => {
        setIsOpen(false);
        setAi({
            isGenerating: false,
            text: "",
            response: "",
            typing: false,
        });
    };

    function handleAddContent() {
        if (messageContent.length + ai?.response?.length >= length) return;

        if (type === "carousel") {
            setMessageContent(messageContent + ai?.response);
        }
        if (type === "card") {
            setMessageContent((prev) => prev + ai?.response);
        }
    }

    const [style, setStyle] = useState("Normal");

    return (
        <>
            <CustomTooltip title="Generate With AI" arrow placement="top">
                <button
                    onClick={() => setIsOpen(true)}
                    className={`absolute w-8 h-8 rounded-full flex items-center justify-center z-0 cursor-pointer`}
                    style={{ right: `${right}px`, bottom: `${bottom}px` }}
                >
                    <Lottie
                        animationData={metaAiAnimation}
                        loop
                        autoplay
                        style={{ width: "48px", height: "48px" }}
                    />
                </button>
            </CustomTooltip>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        className="absolute top-full left-0 w-full mt-4 p-4 bg-white border rounded-3xl shadow-lg z-50 space-y-4"
                    >
                        <div className="space-y-4 border-2 p-2 border-dashed rounded-2xl border-[#36bae2]">
                            <div className="flex justify-between items-center">
                                <div></div>
                                <div className="flex items-center gap-2" >
                                    <p className="font-semibold my-1 text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#2b40b0] to-[#36bae2]">
                                        Ask AI to Generate Content
                                    </p>
                                    <AutoAwesomeIcon className="text-[#2b3fb0ca]" />
                                </div>
                                <IconButton
                                    onClick={closePanel}
                                    sx={{ padding: "3px", fontSize: "18px" }}
                                >
                                    <AiOutlineClose className="text-gray-500 hover:text-gray-500 cursor-pointer" />
                                </IconButton>
                            </div>

                            <div className="flex items-center justify-center relative">
                                <textarea
                                    type="text"
                                    className="w-full p-2 py-3 border border-gray-200 focus:outline-none resize-none rounded-md text-sm pr-11 h-15 shadow-md"
                                    placeholder="e.g. Generate a welcome message..."
                                    maxLength="1000"
                                    value={ai.text}
                                    onChange={(e) => {
                                        setAi((prev) => ({
                                            ...prev,
                                            text: e.target.value,
                                        }));
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleGenerate();
                                        }
                                    }}
                                />
                                <button
                                    onClick={handleGenerate}
                                    disabled={ai?.typing}
                                    className=" cursor-pointer absolute right-0 text-white px-4 py-2 rounded-md transition disabled:opacity-50"
                                >
                                    {ai?.isGenerating ? (
                                        <LoopIcon className="animate-spin text-indigo-800" />
                                    ) : (
                                        <AutoFixHighOutlinedIcon className=" text-indigo-800" />
                                    )}
                                </button>
                            </div>
                            <div className="text-[#2b40b0] text-[0.8rem]">
                                Chars: {ai.text.length}/1000
                            </div>

                            <div className="flex flex-wrap gap-2 text-sm">
                                <p className="w-full font-medium text-[#2b40b0]">
                                    Choose your message style :
                                </p>
                                {["Normal", "Poetic", "Exciting", "Funny", "Grammatical"].map(
                                    (item) => (
                                        <div
                                            key={item}
                                            onClick={() => setStyle(item)}
                                            className={`relative px-3 py-1 rounded-full border overflow-hidden transition-colors duration-300 cursor-pointer ${style === item
                                                ? "text-white scale-105"
                                                : "bg-white text-gray-700"
                                                }`}
                                        >
                                            <span className="relative z-10">{item}</span>
                                            <span
                                                className={`absolute inset-0 rounded-full transition-transform duration-300 ease-in-out bg-gradient-to-r from-[#2b40b0] to-[#36bae2] z-0
                                            ${style === item ? "translate-y-0" : "translate-y-full"}
                                           `}
                                                style={{
                                                    transformOrigin: "bottom",
                                                }}
                                            ></span>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="min-h-[60px] bg-gray-100 p-3 rounded-md border">
                                {ai?.isGenerating ? (
                                    <div className="flex flex-col gap-2">
                                        <div className="animate-pulse h-4 w-full bg-gray-300 rounded" />
                                        <div className="animate-pulse h-4 w-full bg-gray-300 rounded" />
                                        <div className="animate-pulse h-4 w-full bg-gray-300 rounded" />
                                        <div className="animate-pulse h-4 w-full bg-gray-300 rounded" />
                                    </div>
                                ) : (
                                    <pre className="whitespace-pre-wrap text-sm text-gray-800">
                                        {ai?.response}
                                    </pre>
                                )}

                                {/* <pre className="whitespace-pre-wrap text-sm text-gray-800">{ai?.response}</pre> */}
                            </div>

                            {!ai?.typing && ai?.response && (
                                <div className="flex items-center justify-center ">
                                    <button
                                        className="text-sm text-indigo-600 hover:underline cursor-pointer"
                                        onClick={handleAddContent}
                                    >
                                        <FileUploadOutlinedIcon /> Insert into Template Format
                                    </button>
                                </div>
                            )}
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};