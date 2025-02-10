import React, { useEffect, useState } from "react";
import Select from "react-select";
import '../../style.css'
import { getWabaShowGroupsList } from "../../../apis/whatsapp/whatsapp";
import { MultiSelect } from 'primereact/multiselect';

function RadioButton() {
  const [selectedOption, setSelectedOption] = useState("option2");
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showGroupList, setShowGroupList] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value !== "option1") {
      setSelectedGroups([]);
    }
    if (event.target.value !== "option2") {
      setUploadedFile(null);
    }

    if (event.target.value !== "option3") {
    }
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };


  const handleDragOver = (event) => {
    event.preventDefault();
  };


  // Select Group List
  useEffect(() => {
    const fetchWabaShowGroupsList = async () => {
      try {
        const response = await getWabaShowGroupsList();
        if (response) {
          setGroups(response);
        } else {
          console.error("Failed to fetch WABA Group List!");
          toast.error("Failed to load WABA Group List!");
        }
      } catch (error) {
        console.error("Error fetching WABA Group List:", error);
        toast.error("Error fetching WABA Group List.");
      }
    };
    fetchWabaShowGroupsList();
  }, []);

  const selectGroupOptions = groups.map((group) => ({
    label: `${group.groupName} (${group.totalCount})`,
    value: group.groupCode,
  }));

  return (
    <div className="p-3 bg-gray-100 rounded-lg shadow-md w-90">
      <div>

        <h2 className="text-sm font-semibold text-gray-800 mb-4">Choose an Option</h2>
        <div className="flex flex-wrap sm:grid-cols-2 gap-4 mb-2">
          {/* Option 1 */}
          <label className="h-10 w-40 cursor-pointer bg-white border border-gray-300 rounded-lg p-1 hover:shadow-lg transition-shadow duration-300">
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
          <label className=" h-10 w-40  cursor-pointer bg-white border border-gray-300 rounded-lg p-1 hover:shadow-lg transition-shadow duration-300">
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
          <label className="h-10 w-40  cursor-pointer bg-white border border-gray-300 rounded-lg p-1 hover:shadow-lg transition-shadow duration-300">
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

      {/* Multi-Select Dropdown for Select Group */}
      {selectedOption === "option1" && (
        <>
          <div className="flex justify-content-center">
            <MultiSelect value={showGroupList} onChange={(e) => setShowGroupList(e.value)} options={selectGroupOptions} optionLabel="label"
              filter placeholder="Select Groups" maxSelectedLabels={0} className="custom-multiselect" />
          </div>
        </>
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

      {/* Option Audience */}
      {selectedOption === "option3" && (
        <div className="flex gap-3 items-center mt-3" >
          <h2 className="text-sm font-semibold text-gray-800 ">Option Audience</h2>
          <div className="flex items-center gap-6">
            <label className=" cursor-pointer p-0 bg-transparent">
              <div className="flex items-center justify-center gap-2 mt-1">
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
            <label className=" cursor-pointer p-0 bg-transparent">
              <div className="flex items-center justify-center gap-2 mt-1" >
                <input
                  type="radio"
                  name="OptinAudience"
                  value="Yes"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  aria-label="No"
                />
                <span className="text-gray-800 font-medium text-sm">No</span>
              </div>
            </label>
          </div>
        </div>
      )}

    </div>
  );
}

export default RadioButton;
