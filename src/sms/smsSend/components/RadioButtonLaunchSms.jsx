import { MultiSelect } from "primereact/multiselect";
import { RadioButton } from "primereact/radiobutton";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { campaignUploadFile, uploadImageFile } from "@/apis/whatsapp/whatsapp";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import InputField from "@/whatsapp/components/InputField";
import { LetterTextIcon } from "lucide-react";
import { id } from "date-fns/locale";

export const RadioButtonLaunchSms = ({
  allGroups,
  setSelectedOption,
  selectedOption,
  selectedGrp,
  setselectedGrp,
  setUploadedFile,
  uploadedFile,
  setContactData,
  contactData,
  countryList,
  inputDetails,
  setInputDetails,
}) => {
  const fileInputRef = useRef(null);

  const isValidFileName = (fileName) => {
    const regex = /^[a-zA-Z0-9_-]+$/;
    return regex.test(fileName);
  };
  function handleFileDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file) {
      const validExtensions = [".xls", ".xlsx", ".xlsm"];
      const fileExtension = file.name.split(".").pop();

      if (validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
        if (isValidFileName(file.name.split(".")[0])) {
          setUploadedFile(file);
        } else {
          toast.error(
            "File name can only contain alphanumeric characters, underscores, or hyphens."
          );
        }
      } else {
        toast.error("Only Excel files (.xls, .xlsx, .xlsm) are supported.");
      }
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const validExtensions = [".xls", ".xlsx", ".xlsm"];
      const fileExtension = file.name.split(".").pop();

      if (validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
        if (isValidFileName(file.name.split(".")[0])) {
          setUploadedFile(file);
        } else {
          toast.error(
            "File name can only contain alphanumeric characters, underscores, or hyphens."
          );
        }
      } else {
        toast.error("Only Excel files (.xls, .xlsx, .xlsm) are supported.");
      }
    }
  }

  async function handleFileUpload() {
    if (!uploadedFile) {
      return toast.error("Please select a file.");
    }
    if (contactData?.filePath) {
      return toast.error(
        "File already uploaded. Please select a different one."
      );
    }

    try {
      const response = await campaignUploadFile(uploadedFile);
      setContactData({
        filePath: response?.filepath,
        fileHeaders: response?.headers,
        totalRecords: response?.totalRecords,
        sampleRecords: response?.sampleRecords,
        selectedCountryCode: "",
        selectedMobileColumn: "",
      });
    } catch (e) {
      toast.error("File upload failed: " + error.message);
    }
  }

  function handleRemoveFile() {
    setUploadedFile("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setContactData({
      filePath: "",
      fileHeaders: "",
      totalRecords: "",
      selectedCountryCode: "",
      selectedMobileColumn: "",
      sampleRecords: "",
    });
  }

  function stripPlaceholders(str) {
    const varsToRemove = ["short_url", "whatsapp_chat", "file"];
    return varsToRemove.reduce(
      (s, v) => s.replace(new RegExp(`\\{#${v}#\\}`, "g"), ""),
      str
    );
  }
  function handleAttachmentChange(e) {
    setInputDetails((prev) => {
      const strippedMessage = stripPlaceholders(prev.message);
      const hasAttachment = Boolean(e);
      const tag = hasAttachment ? `{#${e}#}` : "";

      return {
        ...prev,
        attachmentType: hasAttachment ? e : null,
        message: strippedMessage + tag,
        shortUrl: hasAttachment ? 1 : 0,
        attachmentVar: {},
      };
    });
  }

  async function handleAttachmentFileChange(e) {
    let message = "";
    try {
      if (inputDetails?.attachmentType === "file") {
        const file = e.target.files[0];
        const res = await uploadImageFile(file);

        if (!res?.status) {
          return toast.error("Error uploading file");
        }
        message = res?.fileUrl;
      } else if (inputDetails?.attachmentType === "short_url") {
        message = e.target.value;
      } else {
        // const url = `https://wa.me/${e.target.value}`;
        message = e.target.value;
      }
      setInputDetails((prev) => ({
        ...prev,
        attachmentVar: {
          [`{#${inputDetails?.attachmentType}#}`]: message,
          // [inputDetails.message]: "asdasdsad",
        },
      }));
    } catch (e) {
      return toast.error("Error uploading file");
    }
  }

  useEffect(() => {
    console.log(inputDetails);
  }, [inputDetails]);

  return (
    <div className="max-h-full bg-gray-100 rounded-lg shadow-md lg:flex-1 border p-2 space-y-2 md:w-1/3 w-full">
      <div>
        <h2 className="mb-2 text-sm font-medium tracking-wide text-gray-800">
          Choose an Option
        </h2>
        <div className="flex gap-4 mb-2 sm:grid-cols-2">
          {/* Option 1 */}
          <label className=" cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2.5 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center gap-2 cursor-pointer">
              <RadioButton
                inputId="radioOption1"
                name="radioGroup"
                value="group"
                onChange={() => {
                  setSelectedOption("group");
                  setUploadedFile("");
                  setContactData({
                    filePath: "",
                    fileHeaders: "",
                    totalRecords: "",
                    selectedCountryCode: "",
                    selectedMobileColumn: "",
                    sampleRecords: "",
                    addcountryCode: false,
                  });
                }}
                checked={selectedOption === "group"}
              />
              <label
                htmlFor="radioOption1"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Select Group
              </label>
            </div>
          </label>

          {/* Option 2 */}
          <label className=" cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2.5 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center gap-2">
              <RadioButton
                inputId="radioOption2"
                name="radioGroup"
                value="contact"
                onChange={() => {
                  setSelectedOption("contact");
                  setselectedGrp("");
                }}
                checked={selectedOption === "contact"}
              />
              <label
                htmlFor="radioOption2"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Import Contact
              </label>
            </div>
          </label>

          {/* Option 3 */}
          {/* <label className=" cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-center gap-2 " >
                    <RadioButton inputId="radioOption3" name="radioGroup" value="option3" onChange={handleChange} checked={selectedOption === 'option3'} />
                    <label htmlFor="radioOption3" className="text-sm font-medium text-gray-700">AI Audience</label>
                  </div>
                </label> */}
        </div>
      </div>

      {selectedOption === "group" && (
        <div className="flex mt-3 justify-content-center">
          <MultiSelect
            className="custom-multiselect"
            placeholder="Select Groups"
            maxSelectedLabels={0}
            optionLabel="label"
            filter
            value={selectedGrp}
            onChange={(e) => {
              if (!e.value) {
                console.error("MultiSelect received undefined value");
                return;
              }

              let selectedValues = Array.isArray(e.value) ? e.value : [e.value];
              setselectedGrp(selectedValues);
            }}
            options={allGroups.map((group) => ({
              label: `${group.groupName} (${group.totalCount})`,
              value: group.groupCode,
            }))}
          />
        </div>
      )}

      {selectedOption === "contact" && (
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
              accept=".xls,.xlsx,.xlsm"
              ref={fileInputRef}
            />
            <div className="flex items-center justify-center gap-2">
              <label
                htmlFor="fileInput"
                className="inline-block px-3 py-2 text-sm font-medium tracking-wider text-center text-white bg-blue-400 rounded-lg cursor-pointer file-upload-button hover:bg-blue-500"
              >
                Choose or Drop File
              </label>
              <div className="upload-button-container ">
                <button
                  onClick={handleFileUpload}
                  disabled={false}
                  className={`px-2 py-1.5 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer ${
                    // isUploading ?
                    // "disabled" : ""
                    ""
                  }`}
                >
                  <FileUploadOutlinedIcon
                    sx={{ color: "white", fontSize: "23px" }}
                  />
                </button>
              </div>
            </div>
            <p className="file-upload-text mt-2 text-[0.8rem] text-gray-400 tracking-wide">
              Supported File Formats: .xlsx
            </p>
            <div className="mt-3">
              {uploadedFile ? (
                <div className="flex items-center justify-center gap-1 file-upload-info">
                  <p className="file-upload-feedback file-upload-feedback-success text-sm text-green-500 font-[500]">
                    {uploadedFile?.name ? "File Uploaded: " : "File Selected: "}
                    <strong>{uploadedFile.name}</strong>
                  </p>
                  <button
                    className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
                    onClick={handleRemoveFile}
                  >
                    <MdOutlineDeleteForever
                      className="text-red-500 cursor-pointer hover:text-red-600"
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
      )}

      {selectedOption === "contact" &&
        uploadedFile &&
        contactData?.fileHeaders?.length > 0 && (
          <div className="flex flex-col w-full mt-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  id="handleAddCountryCode"
                  type="checkbox"
                  className="w-4 h-4 bg-gray-200 border-gray-300 rounded cursor-pointer"
                  onChange={(e) => {
                    setContactData((prevData) => ({
                      ...prevData,
                      addcountryCode: e.target.checked,
                    }));
                  }}
                />
                <label
                  htmlFor="handleAddCountryCode"
                  className="text-sm font-medium"
                >
                  Add Country Code
                </label>
              </div>
              <DropdownWithSearch
                id="selectCountryCode"
                name="selectCountryCode"
                label="Select Country Code"
                tooltipContent="check the - [ ✔ Add country code ] to apply country code"
                tooltipPlacement="right"
                placeholder="Select Country Code"
                disabled={!contactData.addcountryCode}
                options={countryList
                  .sort((a, b) => a.countryName.localeCompare(b.countryName))
                  .map((country) => ({
                    label: `${country.countryName} (+${country.countryCode})`,
                    value: `${country.countryCode}`,
                  }))}
                value={contactData.selectedCountryCode}
                onChange={(value) => {
                  if (value) {
                    const [code, name] = value.split("-");
                    setContactData((prevData) => ({
                      ...prevData,
                      selectedCountryCode: code,
                    }));
                  }
                }}
              />
            </div>
            <div className="w-full">
              <AnimatedDropdown
                id="selectMobileColumn"
                name="selectMobileColumn"
                label="Select Mobile Number Field"
                tooltipContent="Select your mobile number Field!"
                tooltipPlacement="right"
                options={contactData?.fileHeaders.map((col, index) => ({
                  label: col,
                  value: String(index),
                }))}
                value={contactData.selectedMobileColumn}
                onChange={(e) => {
                  setContactData((prevData) => ({
                    ...prevData,
                    selectedMobileColumn: e,
                  }));
                }}
                placeholder="Select Mobile No."
              />
            </div>
          </div>
        )}

      {selectedOption === "contact" &&
        uploadedFile &&
        contactData?.sampleRecords?.length > 0 && (
          <>
            <div className="my-3">
              <p className="text-sm font-semibold tracking-wide text-gray-700">
                Total Records in file: {contactData?.totalRecords}{" "}
              </p>
            </div>

            <div
              className="w-full max-w-full overflow-auto"
              style={{ maxHeight: "400px", maxWidth: "auto", width: "auto" }}
            >
              <table className="w-full border-collapse min-w-max">
                <thead className="bg-[#128C7E]">
                  <tr className="">
                    {contactData?.fileHeaders?.map((col, index) => (
                      <th
                        key={index}
                        className="border border-gray-500 px-3 py-1 text-[0.94rem] font-medium tracking-wide text-white whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="">
                  {contactData?.sampleRecords?.map((row, index) => (
                    <tr key={index} className="">
                      {contactData?.fileHeaders?.map((col, idx) => (
                        <td
                          key={idx}
                          className="px-2 py-1 text-sm font-normal tracking-wide text-gray-800 border border-gray-400 whitespace-nowrap"
                        >
                          {row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

      <div className="mt-5 space-y-2">
        <h1 className="mb-2 text-sm font-medium tracking-wide text-gray-800">
          SMS Attachment
        </h1>
        <AnimatedDropdown
          id="attachmentType"
          name="attachmentType"
          options={[
            { value: "file", label: "File" },
            { value: "short_url", label: "Short URL" },
            { value: "whatsapp_chat", label: "WhatsApp Chat" },
          ]}
          onChange={handleAttachmentChange}
          value={inputDetails.attachmentType}
        />
        {inputDetails.attachmentType === "file" && (
          <div>
            <InputField
              id="attachmentfile"
              name="attachmentfile"
              onChange={handleAttachmentFileChange}
              type="file"
              label="Select File"
            />
          </div>
        )}
        {(inputDetails.attachmentType === "short_url" ||
          inputDetails.attachmentType === "whatsapp_chat") && (
          <div className="mt-2">
            <InputField
              id="attachmentText"
              name="attachmentText"
              onChange={handleAttachmentFileChange}
              label={
                inputDetails.attachmentType === "short_url"
                  ? "Short URL"
                  : "WhatsApp Chat"
              }
              placeholder={
                inputDetails.attachmentType === "short_url"
                  ? "Enter Short URL"
                  : "Enter WhatsApp Number with Country Code"
              }
              value={
                inputDetails?.attachmentVar[
                  `{#${inputDetails?.attachmentType}#}`
                ] || ""
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};
