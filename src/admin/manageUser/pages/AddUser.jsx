import React, { useState } from "react";
import InputField from "../../../whatsapp/components/InputField";
import GeneratePassword from "../../../whatsapp/components/GeneratePassword";
import AnimatedDropdown from "../../../whatsapp/components/AnimatedDropdown";
import UniversalDatePicker from "../../../whatsapp/components/UniversalDatePicker";
import UniversalButton from "../../../whatsapp/components/UniversalButton";
import { useEffect } from "react";
import { RadioButton } from 'primereact/radiobutton';
import UniversalLabel from "../../../whatsapp/components/UniversalLabel";

const AddUser = () => {
  const [userid, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [userAccountManager, setUserAccountManager] = useState(null);
  const [expiryDate, setExpiryDate] = useState("");
  const [userType, setUserType] = useState(""); // Default state
  const [isReadOnly, setIsReadOnly] = useState(true); // Default: readOnly is true
  const [accountUrl, setAccountUrl] = useState(""); // State for input value
  const [enablepostpaid, setEnablePostpaid] = useState("disable"); // Postpaid option state

  // Dropdown options
  const useroption = [
    { value: "User", label: "User" },
    { value: "Reseller", label: "Reseller" },
  ];

  // Effect to update readOnly state and clear input field
  useEffect(() => {
    console.log("User Type Changed:", userType); // Debugging log
    setIsReadOnly(userType !== "Reseller"); // If "Reseller" is selected, make editable
    setAccountUrl(""); // Clear input field when selection changes
  }, [userType]);

  const handleChangeEnablePostpaid = (event) => {
    setEnablePostpaid(event.target.value);
  };

  const usermanager = [
    { value: "AshimaSainit", label: "AshimaSainit" },
    { value: "RuchiPatel", label: "RuchiPatel" },
    { value: "RiyaSen", label: "RiyaSen" },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-semibold mb-4">Login Info:</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <InputField label="User ID *"
          id="userid"
          name="userid"
          placeholder="Enter your User ID"
          required
          value={userid}
          onChange={(e) => setUserId(e.target.value)}
        />
        <GeneratePassword
          id="generatepassword"
          name="generatepassword"
          label="Password *"
          onChange={(e) => setUserId(e.target.value0)}
        />
      </div>

      <h2 className="text-lg font-semibold mt-6 mb-4">Personal Details:</h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        <InputField label="First Name *"
          id="firstname"
          name="firstname"
          placeholder="Enter your First Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <InputField label="Last Name *"
          id="lastname"
          name="lastname"
          placeholder="Enter your Last Name"
          value={userLastName}
          onChange={(e) => setUserLastName(e.target.value)}
          required
        />
        <InputField label="Email ID *" type="email"
          id="email"
          name="email"
          placeholder="Enter your Email ID"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <InputField label="Mobile No. *"
          id="mobile"
          name="mobile"
          placeholder="Enter your Mobile No."
          value={userPhoneNumber}
          onChange={(e) => setUserPhoneNumber(e.target.value)}
        />
        <InputField label="Company Name"
          id="company"
          name="company"
          placeholder="Enter your Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <InputField label="Address"
          id="address"
          name="address"
          placeholder="Enter your Address"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <InputField label="City"
          id="city"
          name="city"
          placeholder="Enter your City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <InputField label="State"
          id="state"
          name="state"
          placeholder="Enter your State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <InputField label="Country"
          id="country"
          name="country"
          placeholder="Enter your Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <InputField label="Pincode"
          id='Pincode'
          name="Pincode"
          placeholder="Enter your Pincode"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </div>

      <h2 className="text-lg font-semibold mt-6 mb-4">Account Details:</h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        <div className="flex flex-wrap gap-2 mb-2">
          <div className="flex gap-2">
            <AnimatedDropdown
              label="User Type"
              id="userType"
              name="userType"
              options={useroption}
              value={userType} // Ensure correct value is set
              onChange={(selected) => {
                console.log("Dropdown selected:", selected); // Debugging log
                setUserType(selected); // Correctly update the state
              }}
            />
            <div className="min-w-max">
              <InputField
                label="Account URL"
                id="accounturl"
                name="accounturl"
                placeholder="Enter URL"
                value={accountUrl} // Controlled input value
                readOnly={isReadOnly} // Controlled readOnly property
                onChange={(e) => setAccountUrl(e.target.value)} // Handle manual input
              />
            </div>
          </div>
          {userType === "Reseller" && (
            <div className="flex items-center gap-2" id="yesnopost">
              <div className="flex justify-center items-center">
                <UniversalLabel
                  text="Postpaid"
                  id="enablepostpaid"
                  name="enablepostpaid"
                  className="text-gray-700 font-medium text-sm"
                />
              </div>
              {/* Option 1 */}
              <div className="flex items-center gap-2">
                <RadioButton
                  inputId="enablepostpaidOption1"
                  name="enablepostpaidredio"
                  value="enable"
                  onChange={handleChangeEnablePostpaid}
                  checked={enablepostpaid === "enable"}
                />
                <label
                  htmlFor="enablepostpaidOption1"
                  className="text-gray-700 font-medium text-sm cursor-pointer"
                >
                  Yes
                </label>
              </div>
              {/* Option 2 */}
              <div className="flex items-center gap-2">
                <RadioButton
                  inputId="enablepostpaidOption2"
                  name="enablepostpaidredio"
                  value="disable"
                  onChange={handleChangeEnablePostpaid}
                  checked={enablepostpaid === "disable"}
                />
                <label
                  htmlFor="enablepostpaidOption2"
                  className="text-gray-700 font-medium text-sm cursor-pointer"
                >
                  No
                </label>
              </div>

              {/* Conditional Display of Input Field */}
              {enablepostpaid === "enable" && (
                <div>
                  <InputField
                    id="enablepostinput"
                    name="enablepostinput"
                    placeholder="Enter Limit"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <AnimatedDropdown
          label="Account Manager *"
          id="accountManager"
          name="accountManager"
          options={usermanager}
          value={userAccountManager}
          onChange={setUserAccountManager}
        />

        <UniversalDatePicker
          label="Expiry Date *"
          id="expiryDate"
          name="expiryDate"
          placeholder="Enter Expiry Date"
          value={expiryDate}
          onChange={(newValue) => setExpiryDate(newValue)}
        />

      </div>

      <UniversalButton
        label="Sign in"
        type="submit"
        id="sign"
        name="sign"
        className="mt-2"
      />
    </div>
  );
};

export default AddUser;