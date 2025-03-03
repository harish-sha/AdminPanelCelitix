import React, { useState } from 'react'; 
import WhatsappManageOptinTable from "./components/whatsappManageOptinTable";
import InputField from '../../components/layout/InputField';
import AnimatedDropdown from '../components/AnimatedDropdown';
import UniversalButton from '../components/UniversalButton'
import { IoSearch } from "react-icons/io5";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ManageOptinblockModal from '../whatsappManageOptin/components/manageoptinblockmodal'
import RadioGroupField from '../components/RadioGroupField'
import UniversalLabel from '../components/UniversalLabel'
import UniversalSkeleton from '../../components/common/UniversalSkeleton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const WhatsappManageOptin = () => {
  const [optinName, setOptinName] = useState("");
  const [optinMobile, setOptinMobile] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [filteredData, setFilteredData] = useState([]); // Store Table Data
  const [isFetching, setIsFetching] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputsStart, setInputsStart] = useState([{ id: `optin-1`, value: "" }]);
  const [inputsStop, setInputsStop] = useState([{ id: `optin-stop-1`, value: "" }]);
  const [selectedOptionStart, setSelectedOptionStart] = useState("Disable");
  const [selectedOptionStop, setSelectedOptionStop] = useState("Disable");

  const handleNameChange = (event) => setOptinName(event.target.value.trim());
  const handleMobileChange = (event) => setOptinMobile(event.target.value.trim());


  const handleSearch = async () => {
    console.log("🔍 Search Filters:");
    console.log(
      { Name: optinName || "Not Provided" },
      { Mobile: optinMobile || "Not Provided" },
      { "Opt-in": selectedOption || "Not Selected" },
      { "Incoming Blocked": selectedOption2 || "Not Selected" }
    );


    // ✅ Show Loader Before Fetching Data
    setIsFetching(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated API Call
    setIsFetching(false);

    // ✅ Set Fake Filtered Data (Replace with API response)
    setFilteredData([
      { id: 1, name: optinName || "Example Name", mobile: optinMobile || "1234567890" },
    ]);
  };


  const handleInputChange = (id, newValue, setInputs) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id ? { ...input, value: newValue } : input
      )
    );
  };

  const generateNewId = (currentInputs, prefix) => `${prefix}-${currentInputs.length + 1}`;

  const addInputBelow = (index, setInputs, prefix) => {
    setInputs((prevInputs) => {
      const newId = generateNewId(prevInputs, prefix);
      const newInputs = [...prevInputs];
      newInputs.splice(index + 1, 0, { id: newId, value: "" });
      return newInputs;
    });
  };

  const removeInputField = (id, setInputs, prefix) => {
    setInputs((prevInputs) => {
      if (prevInputs.length === 1) return prevInputs;
      const updatedInputs = prevInputs.filter((input) => input.id !== id);
      return updatedInputs.map((input, index) => ({
        ...input,
        id: `${prefix}-${index + 1}`,
      }));
    });
  };

  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];
  const options2 = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const optionsStart = [
    { value: "Enable", label: "Enable" },
    { value: "Disable", label: "Disable" }
  ];
  const optionsStop = [
    { value: "Enable", label: "Enable" },
    { value: "Disable", label: "Disable" }
  ]

  const handleStartChange = (event) => {
    setSelectedOptionStart(event.target.value);
    console.log("Selected:", event.target.value);
  };
  const handleStopChange = (event) => {
    setSelectedOptionStop(event.target.value);
    console.log("Selected:", event.target.value);
  };
  return (
    <>
      <div className={`tablebody ${isSettingsOpen ? "hidden" : "block"}`}>
        <div className="flex flex-wrap gap-4 items-end justify-end align-middle pb-1 w-full">
          {/* Name Input Field */}

          <div className="w-max-content">
            <UniversalButton
              id="manageoptinsettingsbtn"
              name="manageoptinsettingsbtn"
              label="Optin Settings"
              disabled={selectedRows.length === 0}
              onClick={() => setIsSettingsOpen(true)}
            />
          </div>

          <div className="w-max-content">
            <UniversalButton
              id="manageoptinblockbtn"
              name="manageoptinblockbtn"
              label="Block & Optin"
              disabled={selectedRows.length === 0}
              onClick={() => setIsModalOpen(true)}
            />
          </div>

          <div className="w-max-content">
            <UniversalButton
              id="manageoptinexportbtn"
              name="manageoptinexportbtn"
              label="Export"
              disabled={selectedRows.length === 0}
            />
          </div>
          <div className="w-max-content">
            <UniversalButton
              id='manageoptinimportbtn'
              name='manageoptinimportbtn'
              label="Import"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-end justify-start align-middle pb-3 w-full">
          {/* Name Input Field */}
          <div className="w-full sm:w-48">
            <InputField
              label="Name"
              id="optinname"
              name="optinname"
              placeholder="Enter Name"
              value={optinName}
              onChange={handleNameChange}
            />
          </div>

          {/* Mobile Number Input */}
          <div className="w-full sm:w-48">
            <InputField
              label="Mobile Number"
              id="optinmobile"
              name="optinmobilename"
              placeholder="Enter Mobile Number"
              type='number'
              value={optinMobile}
              onChange={handleMobileChange}
            />
          </div>

          {/* Opt-in Dropdown */}
          <div className="w-full sm:w-48">
            <AnimatedDropdown
              label="Optin"
              placeholder="Select Optin"
              id="optinyesno"
              name="optionyesnoname"
              options={options}
              value={selectedOption}
              onChange={setSelectedOption}
            />
          </div>

          {/* Incoming Blocked Dropdown */}
          <div className="w-full sm:w-48">
            <AnimatedDropdown
              label="Incoming Blocked"
              placeholder="Incoming Blocked"
              id="incomingblocked"
              name="incomingblocked"
              options={options2}
              value={selectedOption2}
              onChange={setSelectedOption2}
            />
          </div>

          {/* ✅ Search Button */}
          <div className="w-max-content">
            <UniversalButton
              id="manageoptinsearchbtn"
              name="manageoptinsearchbtn"
              label={isFetching ? "Searching..." : "Search"}
              icon={<IoSearch />}
              onClick={handleSearch}
              disabled={isFetching}
            />
          </div>
          <div className="w-max-content ">
            <UniversalButton
              id='manageoptinDeletebtn'
              name='manageoptinDeletebtn'
              label="Delete"
            />
          </div>
        </div>

        {/* WhatsApp Opt-in Table */}
        {isFetching ? (
          <UniversalSkeleton height="35rem" width="100%" />
        ) : (
          <WhatsappManageOptinTable filteredData={filteredData} setSelectedRows={setSelectedRows} />
        )}

        <ManageOptinblockModal
          id="manageoptinmodal"
          name="manageoptinmodal"
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          selectedContacts={selectedRows}
        />
      </div>
      <div className={`optionsetting ${isSettingsOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col justify-start bg-gray-100 min-h-screen">

          <div className="w-full flex justify-start">
            <a
              href="#"
              className="flex items-center gap-3 px-6 py-3 rounded-md text-blue-600 text-lg font-medium relative
          transition-all duration-200 ease-in-out hover:text-blue-800 hover:scale-105 active:scale-95 group"
              onClick={() => setIsSettingsOpen(false)} // ✅ Hide settings, show table
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-2">
                <KeyboardBackspaceIcon fontSize="medium" />
              </span>

              <span className="relative">
                Back to Optin
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </a>
          </div>

          {/* Section 1: Opt-in Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shadow-lg rounded-lg bg-white p-6">

            {/* Opt-in Start Section */}
            <div className="p-6 bg-blue-50 rounded-lg shadow-md border border-gray-200">
              <UniversalLabel
                id="userStart"
                name="usermainStart"
                text="Opt-in Keywords (Start)"
                tooltipContent="The user will have to type exactly one of these messages on which they should be automatically opted-in"
                className="text-gray-700 font-semibold"
              />

              <div className="overflow-y-auto max-h-42 p-1 rounded-lg space-y-2 border border-gray-300 bg-white shadow-sm">
                {inputsStart.map((input, index) => (
                  <div key={input.id} className="flex items-center space-x-3">
                    <InputField
                      className="flex-grow border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring focus:ring-blue-300 bg-gray-50"
                      placeholder="Start"
                      id={input.id}
                      name={input.id}
                      value={input.value}
                      onChange={(e) => handleInputChange(input.id, e.target.value, setInputsStart)}
                    />

                    {inputsStart.length > 1 && (
                      <RemoveCircleIcon
                        className="text-red-500 hover:text-red-700 cursor-pointer transition-transform transform hover:scale-110"
                        fontSize="small"
                        onClick={() => removeInputField(input.id, setInputsStart, "optin")}
                      />
                    )}

                    <AddCircleIcon
                      className="text-green-500 hover:text-green-700 cursor-pointer transition-transform transform hover:scale-110"
                      fontSize="small"
                      onClick={() => addInputBelow(index, setInputsStart, "optin")}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Opt-in Response */}
            <div className="p-6 bg-blue-100 rounded-lg shadow-md border border-gray-200">
              <UniversalLabel
                id="Opt_in_responseStart"
                name="Opt_in_responseStart"
                text="Opt-in Response"
                tooltipContent="Response message when a user opts in."
                className="text-gray-700 font-semibold"
              />

              <RadioGroupField
                id="Opt_in_responseredioStart"
                name="Opt_in_responseredioStart"
                options={optionsStart}
                selectedValue={selectedOptionStart}
                onChange={handleStartChange}
              />

              {/* ✅ InputField appears only if "Enable" is selected */}
              {selectedOptionStart === "Enable" && (
                <InputField
                  id="Opt_in_responseStart-input"
                  name="Opt_in_responseStart-input"
                  placeholder="You have been successfully opted in."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-3 bg-gray-50 shadow-sm focus:ring focus:ring-blue-300"
                />
              )}
            </div>
          </div>

          {/* Section 2: Opt-out Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shadow-lg rounded-lg bg-white p-6 mt-6">


            <div className="p-6 bg-red-50 rounded-lg shadow-md border border-gray-200">
              <UniversalLabel
                id="userStop"
                name="usermainStop"
                text="Opt-out Keywords (Stop)"
                tooltipContent="The user will have to type exactly one of these messages on which they should be automatically opted-out."
                className="text-gray-700 font-semibold"
              />

              <div className="overflow-y-auto max-h-42 p-1 rounded-lg space-y-2 border border-gray-300 bg-white shadow-sm">
                {inputsStop.map((input, index) => (
                  <div key={input.id} className="flex items-center space-x-3">
                    <InputField
                      className="flex-grow border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring focus:ring-red-300 bg-gray-50"
                      placeholder="Stop"
                      id={input.id}
                      name={input.id}
                      value={input.value}
                      onChange={(e) => handleInputChange(input.id, e.target.value, setInputsStop)}
                    />

                    {inputsStop.length > 1 && (
                      <RemoveCircleIcon
                        className="text-red-500 hover:text-red-700 cursor-pointer transition-transform transform hover:scale-110"
                        fontSize="small"
                        onClick={() => removeInputField(input.id, setInputsStop, "optin-stop")}
                      />
                    )}

                    <AddCircleIcon
                      className="text-green-500 hover:text-green-700 cursor-pointer transition-transform transform hover:scale-110"
                      fontSize="small"
                      onClick={() => addInputBelow(index, setInputsStop, "optin-stop")}
                    />
                  </div>
                ))}
              </div>
            </div>


            <div className="p-6 bg-red-100 rounded-lg shadow-md border border-gray-200">
              <UniversalLabel
                id="Opt_in_responseStop"
                name="Opt_in_responseStop"
                text="Opt-out Response"
                tooltipContent="Response message when a user opts out."
                className="text-gray-700 font-semibold"
              />

              <RadioGroupField
                id="Opt_in_responseredioStop"
                name="Opt_in_responseredioStop"
                options={optionsStop}
                selectedValue={selectedOptionStop}
                onChange={handleStopChange}
              />

              {selectedOptionStop === "Enable" && (
                <InputField
                  id="Opt_in_responseStop-input"
                  name="Opt_in_responseStop-input"
                  placeholder="You have been successfully opted out."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-3 bg-gray-50 shadow-sm focus:ring focus:ring-red-300"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatsappManageOptin;
