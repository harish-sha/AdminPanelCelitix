import React, { useState, useEffect } from "react";
import { getUserDetails } from "../../apis/user/user";
import toast from "react-hot-toast";
import InputField from "../../components/layout/InputField";
import Loader from "../../whatsapp/components/Loader";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import { useUser } from "@/context/auth";

const Profile = () => {
  const { user } = useUser();

  // useEffect(() => {
  //     if (user?.role === "AGENT") return;
  // }, []);

  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    mobileNo: "",
    address: "",
    companyName: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.role === "AGENT") return;
    const fetchUserDetails = async () => {
      setLoading(true);
      const response = await getUserDetails();

      if (response && response.statusCode === 200) {
        // const user = response.data[0];
        // setUserData(user);
        // setFormData({
        //     firstName: user.firstName || "",
        //     lastName: user.lastName || "",
        //     emailId: user.email || "",
        //     mobileNo: user.mobileNo || "",
        //     address: user.address || "",
        //     companyName: user.companyName || "",
        // });
        if (user?.role === "AGENT") {
          const agent = response.data || response.data?.data;
          setUserData(agent);
          setFormData({
            name: agent.name || "",
            email: agent.email || "",
            mobile: agent.mobile || "",
            departmentName: agent.departmentName || "",
            status: agent.status === 1 ? "Active" : "Inactive",
          });
        } else {
          const directUser = response.data[0];
          setUserData(directUser);
          setFormData({
            firstName: directUser.firstName || "",
            lastName: directUser.lastName || "",
            emailId: directUser.email || "",
            mobileNo: directUser.mobileNo || "",
            address: directUser.address || "",
            companyName: directUser.companyName || "",
            userId: directUser.userId || "",
          });
        }
      } else {
        console.error("Failed to load user details.");
        toast.error("Failed to load user details!");
      }
      setLoading(false);
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : userData ? (
        <div className="w-full mx-auto p-6 bg-white shadow-md rounded-xl ">
          <h2 className="text-2xl font-semibold text-gray-700 border-b pb-3 text-center">
            User Profile
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* <InputField id="userId" name="userId" label="User ID" value={userData.userId || ""} readOnly disabled />
                        <InputField id="firstName" name="firstName" label="First Name" value={formData.firstName} onChange={handleChange} readOnly disabled />
                        <InputField id="lastName" name="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} readOnly disabled />
                        <InputField id="emailId" name="emailId" label="Email ID" value={formData.emailId} onChange={handleChange} readOnly disabled />
                        <InputField id="mobileNo" name="mobileNo" label="Mobile No" value={formData.mobileNo} onChange={handleChange} readOnly disabled />
                        <InputField id="address" name="address" label="Address" value={formData.address} onChange={handleChange} readOnly disabled />
                        <InputField id="companyName" name="companyName" label="Company Name" value={formData.companyName} onChange={handleChange} readOnly disabled /> */}
            {user?.role === "AGENT" ? (
              <>
                <InputField
                  id="name"
                  name="name"
                  label="Agent Name"
                  value={formData.name}
                  readOnly
                  disabled
                />
                <InputField
                  id="mobile"
                  name="mobile"
                  label="Mobile No"
                  value={formData.mobile}
                  readOnly
                  disabled
                />
                <InputField
                  id="email"
                  name="email"
                  label="Email ID"
                  value={formData.email}
                  readOnly
                  disabled
                />
                <InputField
                  id="departmentName"
                  name="departmentName"
                  label="Department Name"
                  value={formData.departmentName}
                  readOnly
                  disabled
                />
                <InputField
                  id="status"
                  name="status"
                  label="Status"
                  value={formData.status}
                  readOnly
                  disabled
                />
              </>
            ) : (
              <>
                <InputField
                  id="userId"
                  name="userId"
                  label="User ID"
                  value={formData.userId}
                  readOnly
                  disabled
                />
                <InputField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  readOnly
                  disabled
                />
                <InputField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  readOnly
                  disabled
                />
                <InputField
                  id="emailId"
                  name="emailId"
                  label="Email ID"
                  value={formData.emailId}
                  onChange={handleChange}
                  readOnly
                  disabled
                />
                <InputField
                  id="mobileNo"
                  name="mobileNo"
                  label="Mobile No"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  readOnly
                  disabled
                />
                <InputField
                  id="address"
                  name="address"
                  label="Address"
                  value={formData.address}
                  onChange={handleChange}
                  readOnly
                  disabled
                />
                <InputField
                  id="companyName"
                  name="companyName"
                  label="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  readOnly
                  disabled
                />
              </>
            )}
          </div>
          {/* <div className="mt-6 flex justify-center">
                        <UniversalButton
                            id="profile_Save"
                            name="profile_Save"
                            label="Save"
                        >
                            Save
                        </UniversalButton>
                    </div> */}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">
          Failed to load user details.
        </p>
      )}
    </>
  );
};

export default Profile;
