import React, { useState } from "react";
import InputField from "../../../whatsapp/components/InputField";
import GeneratePassword from "../../../whatsapp/components/GeneratePassword";
import AnimatedDropdown from "../../../whatsapp/components/AnimatedDropdown";
import UniversalDatePicker from "../../../whatsapp/components/UniversalDatePicker";
import UniversalButton from "../../../whatsapp/components/UniversalButton";
import { useEffect } from "react";
import { RadioButton } from "primereact/radiobutton";
import UniversalLabel from "../../../whatsapp/components/UniversalLabel";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import { addUser, getPincodeData } from "@/apis/admin/admin";
import toast from "react-hot-toast";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
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
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [userType, setUserType] = useState("1");
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [accountUrl, setAccountUrl] = useState("");
  const [enablepostpaid, setEnablePostpaid] = useState("disable");
  const [pincodeOptions, setPincodeOptions] = useState([]);
  const [postpaidAmount, setPostpaidAmount] = useState(0);

  // Dropdown options
  const useroption = [
    { value: "1", label: "User" },
    { value: "2", label: "Reseller" },
  ];

  useEffect(() => {
    setIsReadOnly(userType !== "2");
    setAccountUrl("");
  }, [userType]);
  useEffect(() => {
    const domain = window.location.hostname;
    setAccountUrl(domain);
  }, []);
  // Fetch pincode details when the zipCode changes
  useEffect(() => {
    const fetchPincodeDetails = async () => {
      if (zipCode) {
        try {
          // console.log("Fetching pincode details for:", zipCode); // Debugging log
          const data = await getPincodeDetails(zipCode); // Call the API with the pincode
          // console.log("Pincode API response:", data); // Debugging log

          if (Array.isArray(data)) {
            const options = data.map((item) => ({
              value: item.pincode, // Use the pincode as the value
              label: `${item.pincode} - ${item.district}, ${item.state}`, // Combine pincode, district, and state for the label
            }));

            setPincodeOptions(options); // Update the dropdown options
          } else {
            console.error("Invalid API response:", data);
          }
        } catch (error) {
          toast.error("Error fetching pincode details");
        }
      }
    };

    fetchPincodeDetails();
  }, [zipCode]);

  const handleChangeEnablePostpaid = (event) => {
    setEnablePostpaid(event.target.value);
  };

  const usermanager = [
    { value: "AshimaSainit", label: "AshimaSainit" },
    { value: "RuchiPatel", label: "RuchiPatel" },
    { value: "RiyaSen", label: "RiyaSen" },
  ];

  async function handleAddUser() {
    if (!userName) {
      toast.error("Please Enter First Name");
      return;
    }

    if (!userid) {
      toast.error("Please Enter User Id");
      return;
    }

    if (!/^[a-zA-Z0-9]+$/.test(userid)) {
      toast.error("User Id should be alphanumeric only");
      return;
    }

    if (!userLastName) {
      toast.error("Please Enter Last Name");
      return;
    }
    if (!userPhoneNumber) {
      toast.error("Please Enter Mobile Number");
      return;
    }
    if (!expiryDate) {
      toast.error("Please Enter Expiry Date");
      return;
    }
    if (!userEmail) {
      toast.error("Please Enter Email Id");
      return;
    }

    if (!userPassword) {
      toast.error("Please Enter Password");
      return;
    }

    // if (!userPassword.length > 6 || !userPassword.length < 10) {
    //   toast.error("Password shoule be of 6 to 10 characters");
    //   return;
    // }
    const domain = window.location.hostname;
    const data = {
      // srno: 0,
      userId: userid,
      domain: "",
      status: 1,
      emailId: userEmail,
      mobileNo: userPhoneNumber,
      userType: 3,
      password: userPassword,
      firstName: userName,
      lastName: userLastName,
      address: userAddress,
      companyName: companyName,
      country: country,
      state: state,
      city: city,
      pinCode: zipCode,
      virtualBalance: 0,
      applicationType: 2,
      expiryDate: moment(expiryDate).format("DD/MM/YYYY"),
    };

    try {
      const res = await addUser(data);
      if (res?.msg.includes("wrong")) {
        toast.error(res?.msg);
        return;
      }
      toast.success("User Added Successfully");
      navigate("/manageuser");
    } catch (e) {
      toast.error("Error in Adding User");
    }
  }

  async function handleGetPincodeData(pincode) {
    if (!pincode) return;
    try {
      setInterval(async () => {
        const res = await getPincodeData(pincode);
        setCountry("India");
        setState(res.stateName);
        setCity(res.district);
      }, 1000);
    } catch (e) {
      toast.error("Error in Fetching Pincode Data");
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="mb-4 text-xl font-semibold">Login Info:</h1>
      <div className="flex items-center flex-wrap gap-4 mb-4">
        <div className="w-100">
          <InputField
            label="User ID *"
            id="userid"
            name="userid"
            placeholder="Enter your User ID"
            required
            value={userid}
            maxLength="8"
            // onChange={(e) => setUserId(e.target.value)}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[a-zA-Z0-9]*$/.test(value)) {
                setUserId(value);
              }
            }}
          />
        </div>
        <div className="w-150">
          <GeneratePassword
            id="generatepassword"
            name="generatepassword"
            label="Password *"
            value={userPassword}
            onChange={(e) => setUserPassword(e)}
          />
        </div>
      </div>

      <h2 className="mt-6 mb-4 text-lg font-semibold">Personal Details:</h2>
      <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
        <InputField
          label="First Name *"
          id="firstname"
          name="firstname"
          placeholder="Enter your First Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <InputField
          label="Last Name *"
          id="lastname"
          name="lastname"
          placeholder="Enter your Last Name"
          value={userLastName}
          onChange={(e) => setUserLastName(e.target.value)}
          required
        />
        <InputField
          label="Email ID *"
          type="email"
          id="email"
          name="email"
          placeholder="Enter your Email ID"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <InputField
          label="Mobile No. *"
          id="mobile"
          name="mobile"
          placeholder="Enter your Mobile No."
          value={userPhoneNumber}
          onChange={(e) => setUserPhoneNumber(e.target.value)}
        />
        <InputField
          label="Company Name"
          id="company"
          name="company"
          placeholder="Enter your Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
         <InputField
          label="Pincode"
          id="pincode"
          name="pincode"
          placeholder="Enter your Pincode"
          value={zipCode}
          onChange={(e) => {
            setZipCode(e.target.value);
            handleGetPincodeData(e.target.value);
          }}
        />
        <InputField
          label="Address"
          id="address"
          name="address"
          placeholder="Enter your Address"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <InputField
          label="City"
          id="city"
          name="city"
          placeholder="Enter your City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <InputField
          label="State"
          id="state"
          name="state"
          placeholder="Enter your State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <InputField
          label="Country"
          id="country"
          name="country"
          placeholder="Enter your Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        {/* <InputField label="Pincode"
          id='Pincode'
          name="Pincode"
          placeholder="Enter your Pincode"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        /> */}
       
      </div>

      <h2 className="mt-6 mb-4 text-lg font-semibold">Account Details:</h2>
      <div className="flex items-start flex-wrap  gap-4 mb-4 w-full">
        <div className="flex  flex-wrap gap-2 mb-2 ">
          {/* <div className="flex gap-2 w-full md:w-50 ">
            <AnimatedDropdown
              label="User Type"
              id="userType"
              name="userType"
              options={useroption}
              value={userType}
              onChange={(selected) => {
                setUserType(selected);
              }}
            />
          </div> */}

          {/* {userType === "2" && (
            <div className="md:w-50 w-full">
              <InputField
                label="Account URL"
                id="accounturl"
                name="accounturl"
                placeholder="Enter URL"
                value={accountUrl}
                readOnly={isReadOnly}
                onChange={(e) => setAccountUrl(e.target.value)}
              />
            </div>
          )} */}
        </div>

        <div className="md:w-80 w-full">
          <AnimatedDropdown
            label="Account Manager *"
            id="accountManager"
            name="accountManager"
            options={[]}
            value={userAccountManager}
            onChange={setUserAccountManager}
          />
        </div>
        <div className="md:w-50 w-full">
          <UniversalDatePicker
            label="Expiry Date *"
            id="expiryDate"
            name="expiryDate"
            placeholder="Enter Expiry Date"
            value={expiryDate || new Date()}
            onChange={(newValue) => setExpiryDate(newValue)}
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <UniversalButton
          label="Submit"
          type="submit"
          id="submit"
          name="submit"
          className="mt-2"
          onClick={handleAddUser}
        />
      </div>
    </div>
  );
};

export default AddUser;
