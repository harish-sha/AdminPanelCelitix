import React, { useState } from "react";
import Select from "react-select";
import '../../style.css'

function RadioButton() {
  const [selectedOption, setSelectedOption] = useState("option2");
  const [selectedGroups, setSelectedGroups] = useState([]); // For multi-select dropdown
  const [uploadedFile, setUploadedFile] = useState(null); // For file upload

  // Options for multi-select dropdown
  const groupOptions = [
    { value: "group1", label: "Group 1" },
    { value: "group2", label: "Group 2" },
    { value: "group3", label: "Group 3" },
    { value: "group4", label: "Group 4" },
  ];

  // Add "Select All" option at the top
  const allOption = { value: "all", label: "Select All" };

  // Options including "Select All" at the top
  const optionsWithSelectAll = [allOption, ...groupOptions];

  // Handle multi-select changes
  const handleGroupChange = (selected) => {
    if (selected?.some((item) => item.value === "all")) {
      setSelectedGroups(groupOptions);
    } else {
      setSelectedGroups(selected || []);
    }
  };

  // Handle radio button changes
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value !== "option1") {
      setSelectedGroups([]);
    }
    if (event.target.value !== "option2") {
      setUploadedFile(null); // Clear file if switching from Import Contact
    }
  };

  // Handle file drop
  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0]; // Only accept the first file
    if (file) {
      setUploadedFile(file);
    }
  };

  // Handle manual file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Only accept the first file
    if (file) {
      setUploadedFile(file);
    }
  };

  // Prevent default behavior for drag-and-drop
  const handleDragOver = (event) => {
    event.preventDefault();
  };


  // const customValue = selectedGroups.length > 0
  //   ? [{ value: 'custom', label: `Selected ${selectedGroups.length}` }]
  //   : [];




  return (
    <div className="p-3 bg-gray-100 rounded-lg shadow-md w-full">
      <div>

        <h2 className="text-sm font-semibold text-gray-800 mb-4">Choose an Option</h2>
        <div className="flex flex-wrap sm:grid-cols-2 gap-4 mb-2">
          {/* Option 1 */}
          <label className="h-10 w-50 cursor-pointer bg-white border border-gray-300 rounded-lg p-1 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center gap-2 mt-1" >

              <input
                type="radio"
                name="option"
                value="option1"
                checked={selectedOption === "option1"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                aria-label="Select Group"
              />
              <span className="text-gray-700 font-medium text-sm">Select Group</span>
            </div>
          </label>

          {/* Option 2 */}
          <label className=" h-10 w-50  cursor-pointer bg-white border border-gray-300 rounded-lg p-1 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center gap-2 mt-1" >


              <input
                type="radio"
                name="option"
                value="option2"
                checked={selectedOption === "option2"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                aria-label="Import Contact"
              />
              <span className="text-gray-700 font-medium text-sm">Import Contact</span>
            </div>
          </label>

          {/* Option 3 */}
          <label className="h-10 w-50  cursor-pointer bg-white border border-gray-300 rounded-lg p-1 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center gap-2 mt-1" >


              <input
                type="radio"
                name="option"
                value="option3"
                checked={selectedOption === "option3"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                aria-label="AI Audience"
              />
              <span className="text-gray-700 font-medium text-sm">AI Audience</span>
            </div>
          </label>

        </div>
      </div>
      <div className="flex gap-3 items-center mt-3" >
        <h2 className="text-sm font-semibold text-gray-800 ">Option Audience</h2>
        <div className="flex items-center gap-6">
          {/* Option 1 */}

          <label className=" cursor-pointer p-0 bg-transparent   ">
            <div className="flex items-center justify-center gap-2 mt-1" >


              <input
                type="radio"
                name="OptinAudience"
                value="Yes"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                aria-label="Yes"
              />
              <span className="text-gray-800 font-medium text-sm">Yes</span>
            </div>
          </label>

          {/* Option 2 */}
          <label className=" cursor-pointer p-0 bg-transparent   ">
            <div className="flex items-center justify-center gap-2 mt-1" >


              <input
                type="radio"
                name="OptinAudience"
                value="Yes"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                aria-label="No"
                checked
              />
              <span className="text-gray-800 font-medium text-sm">No</span>
            </div>
          </label>
        </div>
      </div>


      {/* Multi-Select Dropdown for Select Group */}
      {selectedOption === "option1" && (
        <div className="mt-2">
          <label className="file-upload-label mb-0 text-sm font-semibold ">
            Select Groups
          </label>
          <Select
            options={optionsWithSelectAll}
            isMulti
            value={selectedGroups}
            onChange={handleGroupChange}
            closeMenuOnSelect={false}
            isSearchable
            placeholder="Select Groups..."
            className="mt-2"
          // styles={{
          //   menu: (base) => ({ ...base, zIndex: 9999 }),
          // }}
          />

          {/* Display selected group count */}
          {/* {selectedGroups.length > 0 ? (
            <p className="mt-2 text-sm text-green-600">
              Selected ({selectedGroups.length}):{" "}
              <strong>
                {selectedGroups.map((group) => group.label).join(", ")}
              </strong>
            </p>
          ) : (
            <p className="mt-2 text-sm text-red-500">No groups selected.</p>
          )} */}
        </div>
      )}

      {/* Drag-and-Drop and File Upload for Import Contact */}
      {selectedOption === "option2" && (
        <div className="file-upload mt-2">
          <label className="file-upload-label text-sm font-semibold ">Upload File</label>
          <div
            className="file-upload-container"
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
          >
            <p className="file-upload-text">
              Drag and drop and choose a file.
            </p>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
            />
            <label htmlFor="fileInput" className="file-upload-button">
              Choose File
            </label>
            {uploadedFile ? (
              <p className="file-upload-feedback file-upload-feedback-success">
                File Uploaded: <strong>{uploadedFile.name}</strong>
              </p>
            ) : (
              <p className="file-upload-feedback file-upload-feedback-error">
                No file uploaded yet.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RadioButton;
