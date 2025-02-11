import React, { useEffect, useState } from "react";
import { MultiSelect } from 'primereact/multiselect';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import toast from 'react-hot-toast';
import { getWabaShowGroupsList } from "../../../apis/whatsapp/whatsapp";
import '../../style.css'
import { getCountryList } from "../../../apis/common/common";
import { MdOutlineDeleteForever } from "react-icons/md";
import * as XLSX from 'xlsx';

function RadioButton() {
    const [selectedOption, setSelectedOption] = useState("option2");
    const [uploadedFile, setUploadedFile] = useState(null);
    const [fileData, setFileData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [countryList, setCountryList] = useState([]); // This is where the country list will be stored
    const [selectedMobileColumn, setSelectedMobileColumn] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [addCountryCode, setAddCountryCode] = useState(false);

    // Handle file drop and validation
    const handleFileDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            const validExtensions = ['.xls', '.xlsx', '.xlsm'];
            const fileExtension = file.name.split('.').pop();
            if (validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
                setUploadedFile(file);
                setIsUploaded(false);
                parseFile(file);
            } else {
                toast.error("Only Excel files (.xls, .xlsx, .xlsm) are supported.");
            }
        }
    };

    // Parse the Excel file
    const parseFile = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            const workbook = XLSX.read(reader.result, { type: 'binary' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);
            const headers = Object.keys(jsonData[0]);
            setFileData(jsonData);
            setColumns(headers);
        };
        reader.readAsBinaryString(file);
    };

    // Handle file change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validExtensions = ['.xls', '.xlsx', '.xlsm'];
            const fileExtension = file.name.split('.').pop();
            if (validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
                setUploadedFile(file);
                setIsUploaded(false);
                parseFile(file);
            } else {
                toast.error("Only Excel files (.xls, .xlsx, .xlsm) are supported.");
            }
        }
    };

    // Handle file upload
    const handleFileUpload = () => {
        if (uploadedFile) {
            if (isUploaded) {
                toast.error("File already uploaded. Please select a different one.");
                return;
            }
            setIsUploading(true);
            setTimeout(() => {
                setIsUploading(false);
                setIsUploaded(true);
                toast.success("File uploaded successfully.");
            }, 500);
        } else {
            toast.error("No file selected for upload.");
        }
    };

    // Handle file removal
    const handleRemoveFile = () => {
        setUploadedFile(null);
        setIsUploaded(false);
        document.getElementById("fileInput").value = "";
        toast.success("File removed successfully.");
    };

    // Fetch country list from backend
    useEffect(() => {
        const fetchCountryList = async () => {
            try {
                setIsLoading(true);
                const response = await getCountryList();
                if (response) {
                    setCountryList(response); // Store the fetched country list here
                } else {
                    toast.error("Failed to load country list");
                }
            } catch (error) {
                toast.error("Error fetching country list.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchCountryList();
    }, []);

    // Handle mobile column selection
    const handleMobileColumnChange = (e) => {
        setSelectedMobileColumn(e.target.value);
    };

    // Handle country code change
    const handleCountryCodeChange = (e) => {
        setCountryCode(e.target.value);
    };

    // Apply country code to mobile numbers
    const handleApplyCountryCode = () => {
        if (!selectedMobileColumn) {
            toast.error("Please select a mobile number column.");
            return;
        }

        const updatedData = fileData.map((row) => {
            const updatedRow = { ...row };
            const mobileNumber = row[selectedMobileColumn];
            if (mobileNumber && !mobileNumber.startsWith(countryCode)) {
                updatedRow[selectedMobileColumn] = `${countryCode}${mobileNumber}`;
            }
            return updatedRow;
        });

        setFileData(updatedData);
    };

    // Handle change in 'Add Country Code' checkbox
    const handleAddCountryCodeChange = (e) => {
        setAddCountryCode(e.target.checked);
    };

    return (
        <div className="p-3 bg-gray-100 rounded-lg shadow-md w-full">
            <div>
                <h2 className="text-sm font-semibold text-gray-800 mb-3">Choose an Option</h2>
                <div className="flex flex-wrap sm:grid-cols-2 gap-4 mb-2">
                    {/* Option 1 */}
                    <label className="cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2.5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center justify-center gap-2">
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
                    <label className="cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2.5 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center justify-center gap-2">
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
                </div>
            </div>

            {/* Upload File Section */}
            {selectedOption === "option2" && (
                <div className="file-upload mt-2">
                    <div className="file-upload-container" onDrop={handleFileDrop} onDragOver={handleDragOver}>
                        <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" name="fileInput" accept=".xls,.xlsx,.xlsm" />
                        <div className="flex items-center justify-center gap-2">
                            <label htmlFor="fileInput" className="file-upload-button inline-block bg-blue-400 hover:bg-blue-500 text-white font-[500] text-sm px-3 py-2 rounded-lg cursor-pointer text-center tracking-wider">
                                Choose or Drop File
                            </label>
                            <div className="upload-button-container">
                                <button onClick={handleFileUpload} disabled={isUploading} className={`px-2 py-1.5 bg-green-400 rounded-lg hover:bg-green-500 ${isUploading ? 'disabled' : ''}`}>
                                    <FileUploadOutlinedIcon sx={{ color: "white", fontSize: "23px" }} />
                                </button>
                            </div>
                        </div>
                        <p className="file-upload-text mt-2 text-[0.8rem] text-gray-400">Max 3 lacs records & mobile number should be with country code <br /> Supported File Formats: .xlsx</p>
                        <div className="mt-3">
                            {uploadedFile ? (
                                <div className="file-upload-info flex items-center justify-center mt-4 gap-1">
                                    <p className="file-upload-feedback file-upload-feedback-success text-sm text-green-500 font-[500]">
                                        {isUploaded ? "File Uploaded: " : "File Selected: "}
                                        <strong>{uploadedFile.name}</strong>
                                    </p>
                                    <button className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer" onClick={handleRemoveFile}>
                                        <MdOutlineDeleteForever className='text-red-500 cursor-pointer hover:text-red-600' size={20} />
                                    </button>
                                </div>
                            ) : (
                                <p className="file-upload-feedback file-upload-feedback-error text-gray-400 text-sm">No file uploaded yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Country Code Section */}
            {selectedOption === "option2" && isUploaded && (
                <>
                    <div className="mt-3">
                        <input type="checkbox" onChange={handleAddCountryCodeChange} />
                        <label className="text-sm">Add Country Code</label>
                        {addCountryCode && (
                            <div className="mt-2">
                                <select className="p-2 border rounded" onChange={handleCountryCodeChange}>
                                    <option value="">Select Country</option>
                                    {countryList.map((country, index) => (
                                        <option key={index} value={country.countryCode}>
                                            {country.countryName} (+{country.countryCode})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    <div className="mt-3">
                        <button onClick={handleApplyCountryCode} className="px-4 py-2 bg-blue-500 text-white rounded">
                            Apply Country Code
                        </button>
                    </div>
                </>
            )}

            {/* Mobile Column Selection */}
            {selectedOption === "option2" && isUploaded && (
                <div className="mt-4">
                    <label htmlFor="mobileColumn">Select Mobile Number Column</label>
                    <select id="mobileColumn" className="p-2 border rounded" onChange={handleMobileColumnChange}>
                        <option value="">Select a column</option>
                        {columns.map((col, index) => (
                            <option key={index} value={col}>
                                {col}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Display Table */}
            {selectedOption === "option2" && isUploaded && fileData.length > 0 && (
                <div className="mt-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr>
                                {columns.map((col, index) => (
                                    <th key={index} className="border px-4 py-2">{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {fileData.map((row, index) => (
                                <tr key={index}>
                                    {columns.map((col, idx) => (
                                        <td key={idx} className="border px-4 py-2">{row[col]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default RadioButton;
