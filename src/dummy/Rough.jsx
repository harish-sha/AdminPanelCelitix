import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';
import { RadioButton } from 'primereact/radiobutton';

const RadioButtonLaunchCampaign = ({ onOptionChange, onFileUpload }) => {
    const [selectedOption, setSelectedOption] = useState("option2");
    const [fileHeaders, setFileHeaders] = useState([]); // Store headers from uploaded file
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        onOptionChange(value); // Notify parent component about option change
    };

    // Handle file parsing
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validExtensions = ['.xls', '.xlsx', '.xlsm'];
            const fileExtension = file.name.split('.').pop();

            if (validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
                setUploadedFile(file);
                parseFile(file);
            } else {
                toast.error("Only Excel files (.xls, .xlsx, .xlsm) are supported.");
            }
        }
    };

    const parseFile = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            const workbook = XLSX.read(reader.result, { type: 'binary' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);
            const headers = Object.keys(jsonData[0]);
            setFileHeaders(headers); // Set headers after file parsing
        };
        reader.readAsBinaryString(file);
    };

    return (
        <div>
            {/* Option Selection */}
            <RadioButton inputId="radioOption1" name="radioGroup" value="option1" onChange={handleChange} checked={selectedOption === 'option1'} />
            <label htmlFor="radioOption1">Select Group</label>
            <RadioButton inputId="radioOption2" name="radioGroup" value="option2" onChange={handleChange} checked={selectedOption === 'option2'} />
            <label htmlFor="radioOption2">Import Contact</label>

            {/* Option 2: File Upload */}
            {selectedOption === "option2" && (
                <div>
                    <input type="file" accept=".xls, .xlsx, .xlsm" onChange={handleFileChange} />
                    <div>
                        {fileHeaders.length > 0 ? (
                            <p>File Headers: {fileHeaders.join(", ")}</p>
                        ) : (
                            <p>No headers available</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RadioButtonLaunchCampaign;
