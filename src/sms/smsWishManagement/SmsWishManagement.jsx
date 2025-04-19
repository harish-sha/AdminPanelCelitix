import React, { useState } from "react";
import { FaBirthdayCake, FaHeart, FaCheckCircle } from "react-icons/fa";
import { Switch } from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import InputField from "@/components/layout/InputField";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import CustomTooltip from "@/components/common/CustomTooltip";
import UniversalButton from "@/components/common/UniversalButton";

const SmsWishManagement = () => {
  const [activeTab, setActiveTab] = useState("birthday");
  const [birthdayMsg, setBirthdayMsg] = useState("");
  const [anniversaryMsg, setAnniversaryMsg] = useState("");
  const [status, setStatus] = useState(1);

  const handleStatusChange = (checked) => {
    setStatus(checked ? 1 : 0);
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="w-3xl bg-gradient-to-tr from-white via-gray-50 to-white p-8 rounded-3xl shadow-xl border border-gray-200 space-y-8 transition-all duration-300">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 border-dashed border-gray-300">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <CelebrationIcon
              className="text-yellow-700 animate-bounce"
              fontSize="medium"
            />{" "}
            Wishes Management
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">
              Send Wishes:
            </span>
            <CustomTooltip
              arrow
              placement="top"
              title={status === 1 ? "Active" : "Inactive"}
            >
              <Switch
                checked={status === 1}
                onChange={(e) => handleStatusChange(e.target.checked)}
                color="success"
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#34C759",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#34C759",
                  },
                }}
              />
            </CustomTooltip>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("birthday")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
              activeTab === "birthday"
                ? "bg-blue-100 border-blue-300 text-blue-700 font-semibold shadow-sm"
                : "text-gray-500 border-transparent hover:bg-gray-100"
            }`}
          >
            <FaBirthdayCake /> Birthday
          </button>
          <button
            onClick={() => setActiveTab("anniversary")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
              activeTab === "anniversary"
                ? "bg-pink-100 border-pink-300 text-pink-700 font-semibold shadow-sm"
                : "text-gray-500 border-transparent hover:bg-gray-100"
            }`}
          >
            <FaHeart /> Anniversary
          </button>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          {activeTab === "birthday" ? (
            <>
              <InputField
                id="birthdayTemplateId"
                name="birthdayTemplateId"
                label="Birthday Template ID"
                placeholder="Enter Template ID for birthday wish"
                type="text"
              />
              <UniversalTextArea
                label="Birthday Message"
                id="birthdayMessage"
                name="birthdayMessage"
                value={birthdayMsg}
                onChange={(e) => setBirthdayMsg(e.target.value)}
                placeholder="Type your birthday wish here... e.g. Happy Birthday, {{$name}}! 🎂"
                row={4}
              />
              <div className="text-xs text-gray-500">
                Characters: {birthdayMsg.length}/1000 | Message: 1
              </div>
            </>
          ) : (
            <>
              <InputField
                id="anniversaryTemplateId"
                name="anniversaryTemplateId"
                label="Anniversary Template ID"
                placeholder="Enter Template ID for anniversary wish"
                type="text"
              />
              <UniversalTextArea
                label="Anniversary Message"
                id="anniversaryMessage"
                name="anniversaryMessage"
                value={anniversaryMsg}
                onChange={(e) => setAnniversaryMsg(e.target.value)}
                placeholder="Type your anniversary wish here... e.g. Happy Anniversary, {{$name}}! 💕"
                row={4}
              />
              <div className="text-xs text-gray-500">
                Characters: {anniversaryMsg.length}/1000 | Message: 1
              </div>
            </>
          )}
        </div>

        {/* Save Button */}
        <div className="text-right">
          {/* <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all font-medium">
            <FaCheckCircle className="inline mr-2 mb-1" />
            Save Settings
          </button> */}
          <UniversalButton label=" Save" id="wishsave" name="wishsave" />
        </div>
      </div>
    </div>
  );
};

export default SmsWishManagement;
