import React, { useState } from 'react'
import UniversalButton from '../../whatsapp/components/UniversalButton'
import InputField from '../../whatsapp/components/InputField'
import AnimatedDropdown from '../../whatsapp/components/AnimatedDropdown'
import { IoSearch } from "react-icons/io5";
import ManageUserTable from './components/ManageUserTable';
import { useNavigate } from 'react-router-dom';

const ManageUser = () => {
  const [manageId, setManageID] = useState("");
  const [manageMobile, setManageMobile] = useState("");
  const [managecompanyname, setManageCompanyName] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const option = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const navigate = useNavigate();

  const handleAdduser = () => {
    navigate("/manageadduser");
  };
  return (
    <div>
      <div className="flex flex-wrap gap-4 items-end justify-end align-middle pb-1 w-full">
        {/* Name Input Field */}

        <div className="w-max-content">
          <UniversalButton
            id="manageadduserbtn"
            name="manageadduserbtn"
            label="Add User"
            onClick={handleAdduser}
          />
        </div>

      </div>

      <div className="flex flex-wrap gap-4 items-end justify-start align-middle pb-3 w-full">
        {/* Name Input Field */}
        <div className="w-full sm:w-48">
          <InputField
            label="Name"
            id="manageuserid"
            name="manageuserid"
            placeholder="Enter User ID"
            value={manageId}
            onChange={(e) => setManageID(e.target.value)}
          />
        </div>

        {/* Mobile Number Input */}
        <div className="w-full sm:w-48">
          <InputField
            label="Mobile Number"
            id="managemobile"
            name="managemobile"
            placeholder="Enter Mobile Number"
            type='number'
            value={manageMobile}
            onChange={(e) => setManageMobile(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <InputField
            label="Company Name"
            placeholder="Enter Company Name"
            id="managecompanyname"
            name="managecompanyname"
            type='text'
            value={managecompanyname}
            onChange={(e) => setManageCompanyName(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-48">
          <AnimatedDropdown
            label="Status"
            placeholder="Status"
            id="managestatus"
            name="managestatus"
            options={option}
            value={selectedOption}
            onChange={setSelectedOption}
          />
        </div>

        {/* ✅ Search Button */}
        <div className="w-max-content">
          <UniversalButton
            id="managesearchbtn"
            name="managesearchbtn"
            label={isFetching ? "Searching..." : "Search"}
            icon={<IoSearch />}
          // onClick={handleSearch}
          // disabled={isFetching}
          />
        </div>

      </div>

      <div>
        <ManageUserTable />
      </div>
    </div>
  )
}

export default ManageUser;
