import React, { useState } from 'react'
import UniversalButton from '../../whatsapp/components/UniversalButton'
import ManageVoiceClipsTable from './components/ManageVoiceClipsTable'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { MdOutlineDeleteForever } from "react-icons/md";
import { Dialog } from 'primereact/dialog';
import { toast } from 'react-hot-toast';
import * as XLSX from 'xlsx';
import { RadioButton } from 'primereact/radiobutton';
import InputField from '../../whatsapp/components/InputField';
import DropdownWithSearch from '../../whatsapp/components/DropdownWithSearch';

const ManageVoiceClips = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [managevoiceaddfiles, setManageVoiceAddfiles] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileData, setFileData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [addfileStatus, setAddfileStatus] = useState("disable");
  const [selectedUser, setSelectedUser] = useState(null);

  const assignusers = [
    { label: 'User 1', value: 'user1' },
    { label: 'User 2', value: 'user2' },
  ]

  const handleChangeAddfile = (event) => {
    setAddfileStatus(event.target.value);
  }

  // Handle File Drop (Drag & Drop)
  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file) {
      const validExtensions = ['mp3', 'wav'];
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (validExtensions.includes(fileExtension)) {
        if (isValidFileName(file.name.split('.')[0])) {
          setUploadedFile(file);
          setIsUploaded(false);
          toast.success("File added successfully!");
        } else {
          toast.error("File name can only contain alphanumeric characters, underscores, or hyphens.");
        }
      } else {
        toast.error("Only .mp3 and .wav files are supported.");
      }
    }
  };


  // Handle Drag Over
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Handle File Change (Browse)
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const validExtensions = ['mp3', 'wav'];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, ""); 
      
      if (validExtensions.includes(fileExtension)) {
        if (isValidFileName(fileNameWithoutExt)) {
          setUploadedFile(file);
          setIsUploaded(false);
          toast.success("File added successfully!");
        } else {
          toast.error("File name can only contain letters, numbers, underscores, hyphens, or spaces.");
        }
      } else {
        toast.error("Only .mp3 and .wav files are supported.");
      }
    }
  };

  // Handle File Upload
  const handleFileUpload = async () => {
    if (!uploadedFile) {
      toast.error("No file selected for upload.");
      return;
    }
    if (isUploaded) {
      toast.error("File already uploaded. Please select a different one.");
      return;
    }
    setIsUploading(true);
    try {
      // Perform file upload logic here...
      setIsUploaded(true);
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error("File upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const isValidFileName = (fileName) => {
    const regex = /^[a-zA-Z0-9 _-]+$/;
    return regex.test(fileName);
  };
  // Handle File Removal
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setIsUploaded(false);
    document.getElementById("fileInput").value = "";
    toast.success("File removed successfully.");
  };


  return (
    <div className='w-full'>
      {/* {isLoading ? (
      <>
        <Loader />
      </>
    ) : ( */}
      <div>

        <div className="flex flex-wrap items-end justify-end w-full gap-2 pb-3">
          {/* Search Button */}
          <div className="w-max-content">
            <UniversalButton
              label="Approve"
              id="managevoiceapprove"
              name="managevoiceapprove"

            />
          </div>
          <div className="w-max-content">
            <UniversalButton
              label="Disapprove"
              id="managevoicedisapprove"
              name="managevoicedisapprove"

            />
          </div>
          <div className="w-max-content">
            <UniversalButton
              label="Add File"
              id="managevoiceaddfile"
              name="managevoiceaddfile"
              onClick={() => setManageVoiceAddfiles(true)}
            />
          </div>
        </div>

        {/* ✅ Show Loader or Table */}
        {isFetching ? (
          <div className="w-full">
            <UniversalSkeleton height="35rem" width="100%" />
          </div>
        ) : (
          <div className="w-full">
            <ManageVoiceClipsTable
            />
          </div>
        )}
      </div>

      <Dialog
        header="Add Voice"
        visible={managevoiceaddfiles}
        onHide={() => setManageVoiceAddfiles(false)}
        className="lg:w-[30rem] md:w-[20rem] w-[20rem]"
        draggable={false}
      >
       <div className='space-y-4'>
       <div className="flex flex-wrap gap-2 mb-2 lg:w-100 md:w-100">
          {/* Option 1 */}
          <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
            <div className="flex items-center gap-2" >
              <RadioButton inputId="addfileOption1" name="addfileredio" value="enable" onChange={handleChangeAddfile} checked={addfileStatus === 'enable'} />
              <label htmlFor="addfileOption1" className="text-sm font-medium text-gray-700 cursor-pointer">Transactional</label>
            </div>
          </div>
          {/* Option 2 */}
          <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-2" >
              <RadioButton inputId="addfileOOption2" name="addfileredio" value="disable" onChange={handleChangeAddfile} checked={addfileStatus === 'disable'} />
              <label htmlFor="addfileOOption2" className="text-sm font-medium text-gray-700 cursor-pointer">Promotional</label>
            </div>
          </div>
        </div>
        <div>
          <InputField
            label="File Name"
            id="addfilename"
            name="addfilename"
            placeholder="Enter File Name"
          />
        </div>

        <div className="mt-2 file-upload">
          <div
            className="file-upload-container"
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
              name="fileInput"
              accept=".mp3, .wav"
            />
            <div className="flex items-center justify-center gap-2" >
              <label htmlFor="fileInput" className="inline-block px-3 py-2 text-sm font-medium tracking-wider text-center text-white bg-blue-400 rounded-lg cursor-pointer file-upload-button hover:bg-blue-500">
                Choose or Drop File
              </label>
              <div className="upload-button-container ">
                <button
                  onClick={handleFileUpload}
                  disabled={isUploading}
                  className={`px-2 py-1.5 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer ${isUploading ? 'disabled' : ''}`}
                >
                  <FileUploadOutlinedIcon sx={{ color: "white", fontSize: "23px" }} />
                </button>
              </div>
            </div>
            <p className="file-upload-text mt-2 text-[0.8rem] text-gray-400 tracking-wide">
              Max 3 lacs records & mobile number should be with country code. <br />
              Supported File Formats: mp3 and wav. 
            </p>
            <div className="mt-3" >
              {uploadedFile ? (
                <div className="flex items-center justify-center gap-1 file-upload-info">
                  <p className="file-upload-feedback file-upload-feedback-success text-sm text-green-500 font-[500]">
                    {isUploaded ? (
                      "File Uploaded: "
                    ) : (
                      "File Selected: "
                    )}
                    <strong>{uploadedFile.name}</strong>
                  </p>
                  <button
                    className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
                    onClick={handleRemoveFile}
                  >
                    <MdOutlineDeleteForever
                      className='text-red-500 cursor-pointer hover:text-red-600'
                      size={20}
                    />
                  </button>
                </div>
              ) : (
                <p className="text-sm font-semibold tracking-wide text-gray-500 file-upload-feedback file-upload-feedback-error">
                  No file uploaded yet!
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          <DropdownWithSearch
            label="Assign To User"
            id="assignToUser"
            name="assignToUser"
            options={assignusers}
            value={selectedUser}
            onChange={(value) => setSelectedUser(value)}
          />
        </div>
        <div className='flex justify-center'>
          <UniversalButton
            label="Submit"
            className="w-full mt-4"
            id="addfilesubmit"
            name="addfilesubmit"
          />
        </div>
       </div>
      </Dialog>
      {/* )} */}
    </div>
  )
}

export default ManageVoiceClips
