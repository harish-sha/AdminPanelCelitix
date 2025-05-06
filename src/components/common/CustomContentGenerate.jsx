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

        const message = ai?.text;
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
                        { role: "system", content: "You are a helpful assistant." },
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

    return (
        <>
            <CustomTooltip title="Generate With AI" arrow placement="top">
                <button
                    onClick={() => setIsOpen(true)}
                    className={`absolute w-8 h-8 rounded-full flex items-center justify-center z-0 cursor-pointer`}
                    style={{ right: `${right}rem`, bottom: `${bottom}rem` }}
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
                        className="absolute top-full left-0 w-full mt-4 p-4 bg-white border rounded-xl shadow-lg z-50 space-y-4"
                    >
                        <div className="flex justify-between items-center">
                            <p className=" text-violet-700 font-medium">
                                Ask AI to Generate Template <AutoAwesomeIcon />
                            </p>
                            <IconButton
                                onClick={closePanel}
                                sx={{ padding: "3px", fontSize: "18px" }}
                            >
                                <AiOutlineClose className="text-gray-500 hover:text-red-500 cursor-pointer" />
                            </IconButton>
                        </div>

                        <div className="flex items-center justify-center relative">
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md text-sm pr-11"
                                placeholder="e.g. Generate a welcome message for a food bot"
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

                            {/* <pre className="whitespace-pre-wrap text-sm text-gray-800">
                {ai?.response}
              </pre> */}
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
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};