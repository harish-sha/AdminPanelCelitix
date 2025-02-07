import React, { useState, useEffect } from "react";
import { getUserDetails } from "../../../apis/user";
import InputField from "../../../components/layout/InputField";
import toast from "react-hot-toast";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true);
            const response = await getUserDetails();

            if (response && response.statusCode === 200) {
                setUserData(response.data[0]); // ✅ Save user data
            } else {
                console.error("Failed to load user details.");
                toast.error("Failed to load user details!");
            }
            setLoading(false);
        };

        fetchUserDetails();
    }, []);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">User Profile</h2>

                {loading ? (
                    <p className="text-center text-gray-500">Loading user data...</p>
                ) : userData ? (
                    <form className="space-y-4">
                        <InputField label="First Name" value={userData.firstName} readOnly />
                        <InputField label="Last Name" value={userData.lastName} readOnly />
                        <InputField label="User Sr No" value={userData.userSrno} readOnly />
                        <InputField label="Company Name" value={userData.companyName} readOnly />
                        <InputField label="Mobile No" value={userData.mobileNo} readOnly />
                        <InputField label="User ID" value={userData.userId} readOnly />
                    </form>
                ) : (
                    <p className="text-center text-gray-500">Failed to load user details.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
