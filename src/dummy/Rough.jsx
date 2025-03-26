import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import CustomTooltip from "@/whatsapp/components/CustomTooltip";
import UniversalButton from "../components/UniversalButton";

const WhatsappBot = () => {
    const navigate = useNavigate();

    const handleNavigate = () => navigate("/createwhatsappbot");

    return (
        <div className="p-4 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-700">Bots</h1>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search by Bot Name"
                        className="px-3 py-1.5 text-sm border rounded-md w-64"
                    />
                    <button
                        onClick={handleNavigate}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + New Bot
                    </button>
                </div>
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-3">Templates</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        "Restaurant Bot",
                        "Blank Bot",
                        "LiveChat After-Hours",
                        "Package Tracking Bot",
                    ].map((template, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-center h-24 border rounded-md hover:shadow-md cursor-pointer"
                        >
                            <span className="text-sm font-medium text-gray-700">{template}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-3">Bots</h2>
                <div className="border rounded-md overflow-hidden">
                    <div className="flex items-center justify-between bg-blue-50 px-4 py-3">
                        <div className="flex items-center gap-3">
                            <div className="text-blue-600">
                                <EditNoteIcon fontSize="small" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-800">ChatBot</p>
                                <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded">Draft</span>
                            </div>
                        </div>
                        <div className="text-sm text-gray-700">Versions: <strong>latest</strong></div>
                        <div className="text-sm text-red-500">No Integrations added</div>
                        <div className="text-sm text-gray-500">Last Updated: <strong>25 Mar 2025, 02:49pm</strong></div>
                        <div className="flex items-center gap-2">
                            <CustomTooltip title="Edit Bot">
                                <IconButton onClick={() => console.log("edit bot")}>
                                    <EditNoteIcon className="text-gray-600" fontSize="small" />
                                </IconButton>
                            </CustomTooltip>
                            <CustomTooltip title="Delete Bot">
                                <IconButton onClick={() => console.log("delete bot")}>
                                    <MdOutlineDeleteForever className="text-red-500" size={20} />
                                </IconButton>
                            </CustomTooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatsappBot;