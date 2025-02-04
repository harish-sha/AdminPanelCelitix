import React, { useState } from "react";
// import InputField from "../../components/layout/InputField";
import InputField from "../../../components/layout/InputField";

const ProfilePage = () => {
    // const USER_ID = "amanagr";
    // const ACCOUNT_EXPIRY = "27/01/2024";

    const [formData, setFormData] = useState({
        USER_ID: "",
        ACCOUNT_EXPIRY: "",
        fullName: "",
        email: "",
        mobile: "",
        companyName: "",
        address: "",
        pincode: "",
        city: "",
        state: "",
    });

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    return (
        <div className="h-full bg-white shadow-xl rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-700 border-b pb-3">Profile</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                {/* Left Column */}
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-gray-600 text-sm">User ID</label>
                        <input type="text" id="user_id" name="USER_ID" placeholder="User ID" disabled className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg" />
                    </div>
                    <div>
                        <label className="text-gray-600 text-sm">Mobile No.</label>
                        <input type="text" id="profile_mobile" name="mobile" placeholder="Enter mobile number" value={formData.mobile} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300" />
                    </div>
                    <div>
                        <label className="text-gray-600 text-sm">Pincode</label>
                        <input type="text" id="profile_pincode" name="pincode" placeholder="Enter pincode" value={formData.pincode} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300" />
                    </div>
                    <div>
                        <label className="text-gray-600 text-sm">Account Expiry</label>
                        <input type="text" id="profile_Account_Expiry" name="Account_Expiry" placeholder="Account_Expiry" disabled className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg" />
                    </div>
                </div>

                {/* Center Column */}
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-gray-600 text-sm">Full Name</label>
                        <input type="text" id="profile_fullName" name="fullName" placeholder="Enter full name" value={formData.fullName} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300" />
                    </div>
                    <div>
                        <label className="text-gray-600 text-sm">Company Name</label>
                        <input type="text" id="profile_companyName" name="companyName" placeholder="Enter company name" value={formData.companyName} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300" />
                    </div>
                    <div>
                        <label className="text-gray-600 text-sm">City</label>
                        <input type="text" id="profile_city" name="city" placeholder="Enter city" value={formData.city} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300" />
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-gray-600 text-sm">Email ID</label>
                        <input type="email" id="profile_email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300" />
                    </div>
                    <div>
                        <label className="text-gray-600 text-sm">Address</label>
                        <input type="text" id="profile_address" name="address" placeholder="Enter address" value={formData.address} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300" />
                    </div>
                    <div>
                        <label className="text-gray-600 text-sm">State</label>
                        <input type="text" id="profile_state" name="state" placeholder="Enter state" value={formData.state} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300" />
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="mt-6">
                <button id="profile_Save" className=" bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all">
                    Save
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
