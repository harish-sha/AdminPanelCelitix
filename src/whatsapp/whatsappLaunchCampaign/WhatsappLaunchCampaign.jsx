import { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import toast from "react-hot-toast";
import { getAllWorkflow } from "@/apis/workflow/index.js";

import {
  getTemplateDetialsById,
  getWabaList,
  getWabaTemplate,
  getWabaTemplateDetails,
  sendWhatsappCampaign,
} from "../../apis/whatsapp/whatsapp.js";
import RadioButtonLaunchCampaign from "./components/RadioButtonLaunchCampaign.jsx";
import UniversalSkeleton from "../../components/common/UniversalSkeleton.jsx";
import WhatsappLaunchPreview from "./components/WhatsappLaunchPreview.jsx";
import AnimatedDropdown from "../components/AnimatedDropdown";
import TemplateForm from "./components/TemplateForm.jsx";
import InputField from "../../components/layout/InputField.jsx";
import UniversalButton from "../components/UniversalButton.jsx";
import Loader from "../components/Loader";
import DropdownWithSearch from "../components/DropdownWithSearch.jsx";
import { RadioButton } from "primereact/radiobutton";

const extractVariablesFromText = (text) => {
  const regex = /{{(\d+)}}/g;
  let match;
  const variables = [];
  while ((match = regex.exec(text)) !== null) {
    if (!variables.includes(match[1])) {
      variables.push(match[1]);
    }
  }
  return variables;
};

const WhatsappLaunchCampaign = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedWaba, setSelectedWaba] = useState("");
  const [selectedWabaMobileNo, setSelectedWabaMobileNo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [templateOptions, setTemplateOptions] = useState([]);
  const [templateDataNew, setTemplateDataNew] = useState(null);
  const [wabaAccountId, setWabaAccountId] = useState("");
  const [wabaList, setWabaList] = useState(null);
  const [templateData, setTemplateData] = useState({});
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState("option2");
  const [fileHeaders, setFileHeaders] = useState([]);
  const [templateList, setTemplateList] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [sending, setSending] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [workflowEditDialog, setWorkflowEditDialog] = useState({
    isOpen: false,
    data: null,
  });

  const [groups, setGroups] = useState([]);

  const [xlsxPath, setXlsxPath] = useState("");
  const [totalRecords, setTotalRecords] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedMobileColumn, setSelectedMobileColumn] = useState("");
  const [isGroup, setIsGroup] = useState(-1);
  const [urlIndex, setUrlIndex] = useState(null);

  const [selectedGroups, setSelectedGroups] = useState([]);
  const [testMobileNumber, setTestMobileNumber] = useState("");
  const [schedule, setSchedule] = useState(false);
  const [scheduledDateTime, setScheduledDateTime] = useState(new Date());
  // const [agreeTerms, setAgreeTerms] = useState(false);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCountryCodeChecked, setIsCountryCodeChecked] = useState(false);
  const [varLength, setVarLength] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileData, setFileData] = useState([]);

  const [cardIndex, setCardIndex] = useState(0);

  const [marketingType, setMarketingType] = useState(2);

  const [allWorkflows, setAllWorkflows] = useState([]);
  const [workflowState, setWorkflowState] = useState({
    workflowFlag: false,
    workflowSrno: "",
    workflowValueObject: {},
  });

  const [templateType, setTemplateType] = useState("");

  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
    name: "",
    address: "",
  });

  const fileRef = useRef(null);

  async function handleFetchWorkflow() {
    try {
      const res = await getAllWorkflow();

      const mappedData = Array.isArray(res)
        ? res?.map((item) => ({
            value: item.sr_no,
            label: item.workflow_name,
          }))
        : [];
      setAllWorkflows(res);
    } catch (e) {
      toast.error("Error fetching workflows.");
    }
  }

  useEffect(() => {
    handleFetchWorkflow();
  }, [workflowState.workflowFlag]);

  function handleNextCard() {
    setCardIndex(cardIndex + 1);
  }

  function handlePreviousCard() {
    if (cardIndex === 0) return;
    setCardIndex(cardIndex - 1);
  }

  const handleUrlIndexChange = (index) => {
    setUrlIndex(index);
  };

  const handleGroupChange = (value) => {
    let updatedGroups = [];

    if (Array.isArray(value)) {
      updatedGroups = value;
    } else if (typeof value === "string") {
      if (value === "-1") {
        updatedGroups = [];
      } else if (value.includes(",")) {
        updatedGroups = value.split(",").map(Number);
      } else {
        updatedGroups = [Number(value)];
      }
    } else if (typeof value === "number") {
      updatedGroups = [value];
    } else {
      toast.error("Unexpected value type in handleGroupChange:", value);
    }

    setIsGroup(updatedGroups.length > 0 ? 1 : 0);
    setSelectedGroups(updatedGroups);
  };

  const handleImageUpload = (imageUrl) => {
    setImageFile(imageUrl);
    setImagePreview(imageUrl);
  };

  const handleSubmitCampaign = async () => {
    if (!selectedWaba) {
      toast.error("Please select a WhatsApp Business Account (WABA).");
      return;
    }

    if (!inputValue) {
      toast.error("Please enter a campaign name!");
      return;
    }

    if (!selectedTemplate) {
      toast.error("Please select a WhatsApp template.");
      return;
    }

    if (selectedOption === "option2") {
      if (!xlsxPath) {
        toast.error("Please upload an Excel file with contact numbers.");
        return;
      }

      if (!selectedMobileColumn?.toString()) {
        toast.error(
          "Please select the mobile number column from the uploaded file."
        );
        return;
      }
    }

    if (selectedOption === "option1") {
      if (!selectedGroups.length) {
        toast.error("Please select at least one group.");
        return;
      }
    }

    const filterObj = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value !== "")
    );

    // if (varLength !== Object.keys(filterObj).length) {
    //   toast.error("Please enter a all variable values!");
    //   return;
    // }

    if (isCountryCodeChecked) {
      if (!selectedCountryCode || selectedCountryCode === "no") {
        toast.error("Please select a country code.");
        return;
      }
    }

    let finalTotalRecords = 0;

    if (selectedOption === "option1") {
      finalTotalRecords = selectedGroups
        .map((groupCode) => {
          const group = groups.find((g) => g.groupCode === groupCode);
          return group ? parseInt(group.totalCount, 10) : 0;
        })
        .reduce((acc, count) => acc + count, 0);
    } else if (selectedOption === "option2") {
      finalTotalRecords = totalRecords || 0;
    }

    const bodyVariables = templateDataNew?.components
      ?.filter((component) => component.type === "BODY")
      ?.flatMap((component) => extractVariablesFromText(component.text));

    const headerComponent = templateDataNew.components.find(
      (comp) =>
        comp.type === "HEADER" &&
        ["IMAGE", "VIDEO", "DOCUMENT"].includes(comp?.format)
    );

    if (
      ["IMAGE", "VIDEO", "DOCUMENT"].includes(headerComponent?.format) &&
      !imagePreview
    ) {
      toast.error("Please upload a media file.");
      return;
    }

    const isCarousal = templateDataNew.components.find(
      (comp) => comp.type === "CAROUSEL"
    );

    // console.log("isCarousal", isCarousal);
    const imgCards = [];

    let isError = false;

    if (isCarousal) {
      Object.keys(fileData).forEach((key) => {
        if (!fileData[key].filePath) {
          toast.error(`Please upload a file for Card ${key + 1}.`);
          isError = true;
          return;
        }
        const filePath = fileData[key].filePath;
        imgCards.push(filePath);
      });
    }

    const contentValues = bodyVariables
      ?.map((variable) => {
        const key = `body${variable}`;
        const value = (formData[key] || "").trim();
        console.log("value", value);

        if (!value) {
          isError = true;
          return;
        }

        if (value.match(/{{(.*?)}}/)) {
          return `#${value.match(/{{(.*?)}}/)[1]}#`;
        }

        return `"${value}"`;
      })
      ?.join(",");

    if (isError) {
      return toast.error("Please enter all variable values!");
    }

    // workflow
    if (workflowState?.workflowFlag == "1" && !workflowState?.workflowSrno) {
      return toast.error("Please select workflow");
    }

    setTotalRecords(finalTotalRecords);
    setDialogVisible(true);
  };

  const handleFinalSubmit = async (event) => {
    // if (event) event.preventDefault();

    const selectedWabaData = wabaList?.find(
      (waba) => waba.mobileNo === selectedWaba
    );
    const selectedTemplateData = templateList?.find(
      (template) => template.vendorTemplateId === selectedTemplate
    );

    const bodyVariables = templateDataNew?.components
      ?.filter((component) => component.type === "BODY")
      ?.flatMap((component) => extractVariablesFromText(component.text));

    const headerComponent = templateDataNew.components.find(
      (comp) =>
        comp.type === "HEADER" &&
        ["IMAGE", "VIDEO", "DOCUMENT"].includes(comp?.format)
    );

    if (
      ["IMAGE", "VIDEO", "DOCUMENT"].includes(headerComponent?.format) &&
      !imagePreview
    ) {
      toast.error("Please upload a media file.");
      return;
    }

    const isCarousal = templateDataNew.components.find(
      (comp) => comp.type === "CAROUSEL"
    );

    // console.log("isCarousal", isCarousal);
    const imgCards = [];

    let isError = false;

    if (isCarousal) {
      Object.keys(fileData).forEach((key) => {
        if (!fileData[key].filePath) {
          toast.error(`Please upload a file for Card ${key + 1}.`);
          isError = true;
          return;
        }
        const filePath = fileData[key].filePath;
        imgCards.push(filePath);
      });
    }
    // return

    if (isError) {
      return;
    }

    // const contentValues = bodyVariables
    //   ?.map((variable) => {
    //     const key = `body${variable}`;
    //     const value = formData[key] || "";
    //     return value.replace(/{{(.*?)}}/g, "#$1#");
    //   })
    //   ?.join(",");

    const contentValues = bodyVariables
      ?.map((variable) => {
        const key = `body${variable}`;
        const value = (formData[key] || "").trim();

        if (!value) {
          isError = true;
          return toast.error("Please enter all variable values!");
        }

        if (value.match(/{{(.*?)}}/)) {
          return `#${value.match(/{{(.*?)}}/)[1]}#`;
        }

        return `"${value}"`;
      })
      ?.join(",");

    // const contentValues = `"var1",#name#,"var3"`

    // return // Check the output for debugging

    if (isGroup === 1) {
      setXlsxPath("");
      setTotalRecords("");
      setSelectedCountryCode("");
      setSelectedMobileColumn("");
    }

    const groupValues =
      isGroup === 1 && selectedGroups.length > 0
        ? selectedGroups.join(",")
        : "-1";

    if (selectedOption === "option1" && (!groups || groups.length === 0)) {
      toast.error(
        "Error: Group data is missing. Please wait for data to load."
      );
      return;
    }

    let finalTotalRecords = 0;

    if (selectedOption === "option1") {
      finalTotalRecords = selectedGroups
        .map((groupCode) => {
          const group = groups.find((g) => g.groupCode === groupCode);
          return group ? parseInt(group.totalCount, 10) : 0;
        })
        .reduce((acc, count) => acc + count, 0);
    } else if (selectedOption === "option2") {
      finalTotalRecords = totalRecords || 0;
    }

    setTotalRecords(finalTotalRecords);
    if (schedule && scheduledDateTime < new Date()) {
      toast.error("Scheduled date and time cannot be in the past.");
      return;
    }

    if (!finalTotalRecords) {
      toast.error("Total records cannot be zero. Please check your selection.");
      return;
    }

    const date = new Date(scheduledDateTime);

    const padZero = (num) => num.toString().padStart(2, "0");

    const scheduleDateFormat = `${date.getFullYear()}-${padZero(
      date.getMonth() + 1
    )}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(
      date.getMinutes()
    )}:${padZero(date.getSeconds())}`;

    let requestData = {
      mobileIndex: selectedMobileColumn,
      ContentMessage: contentValues || "",
      wabaNumber: selectedWabaData?.wabaSrno || "",
      campaignName: inputValue,
      templateSrno: selectedTemplateData?.templateSrno || "",
      templateName: selectedTemplateData?.templateName,
      templateLanguage: selectedLanguage,
      templateCategory: selectedTemplateData?.category || "",
      templateType: selectedTemplateData?.type || "",
      // isMarketingMessage: marketingType || "",
      ...(marketingType === 1 && { isMarketingMessage: 1 }),
      url: "",
      variables: [],
      xlsxpath: xlsxPath,
      // totalRecords: totalRecords,
      totalRecords: finalTotalRecords,
      attachmentfile: imageFile || "",
      urlValues: "",
      urlIndex: urlIndex ?? -1,
      isShortUrl: 0,
      isGroup: isGroup,
      countryCode: selectedCountryCode || "",
      ScheduleCheck: schedule && scheduledDateTime ? "1" : "0",
      scheduleDateTime:
        schedule && scheduledDateTime ? scheduleDateFormat : "0",
      groupValues,
      imgCard: imgCards,
      cardsVariables: [],
      vendor: "jio",
    };

    if (selectedTemplateData?.type === "location") {
      requestData = {
        ...requestData,
        latitude: locationData.latitude || 0,
        longitude: locationData.longitude || 0,
        name: locationData.name || "Default Location",
        address: locationData.address || "Default Address",
      };
    }
    // workflow
    if (workflowState?.workflowFlag == "1") {
      if (!workflowState?.workflowSrno) {
        return toast.error("Please select workflow");
      }

      requestData = {
        ...requestData,
        workflowSrno: workflowState?.workflowSrno,
        workflowFlag: workflowState?.workflowFlag,
      };
      // requestData.workflowSrno = workflowState?.workflowSrno;
      // requestData.workflowFlag = workflowState?.workflowFlag;
      // requestData.workflowSrno = workflowState?.workflowSrno
    }

    // console.log(requestData)

    try {
      const response = await sendWhatsappCampaign(requestData);
      // return
      if (response?.status === true) {
        toast.success("Campaign launched successfully!");
        setIsLoading(false);
        setSelectedTemplate("");
        setSelectedWaba("");
        setSelectedWabaMobileNo([]);
        setInputValue("");
        // setTemplateOptions([]);
        setTemplateDataNew(null);
        setWabaAccountId("");
        // setWabaList(null);
        setTemplateData({});
        // setFormData({});
        setImageFile(null);
        setSelectedOption("option2");
        setFileHeaders([]);
        // setTemplateList([]);
        setImagePreview(null);
        setSending(false);
        setIsFetching(false);
        setSelectedLanguage(null);
        setSelectedGroups([]);
        setUploadedFile(null);
        setIsUploaded(false);

        // setGroups([]);

        setXlsxPath("");
        setTotalRecords("");
        setSelectedCountryCode("");
        setSelectedMobileColumn("");
        setIsGroup(-1);
        setUrlIndex(null);

        setTestMobileNumber("");
        setSchedule(false);
        setScheduledDateTime(new Date());
        setDialogVisible(false);
        setIsSubmitting(false);
        setIsCountryCodeChecked(false);
        setVarLength(0);
        setFileData([]);
        setIsGroup(-1);
        // fileRef.current.value = "";
        fileRef.current && (fileRef.current.value = "");
      } else {
        toast.error(response?.msg || "Campaign launch failed.");
        toast.error(response?.message || "Campaign launch failed.");
      }
    } catch (error) {
      console.error("Error submitting campaign:", error);
      toast.error("Error launching campaign. Please try again.");
    } finally {
      // window.reload();
      // setIsLoading(false);
    }
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    setFormData({});
    setUrlIndex(null);
  };

  const handleInputChange = (value) => {
    const newValue = value.replace(/\s/g, "");
    setInputValue(newValue);
  };

  // WABA LIST
  useEffect(() => {
    const fetchWabaList = async () => {
      try {
        setIsLoading(true);
        const response = await getWabaList();
        if (response) {
          setWabaList(response);
        } else {
          console.error("Failed to fetch WABA details");
          toast.error("Failed to load WABA details!");
        }
      } catch (error) {
        console.error("Error fetching WABA list:", error);
        toast.error("Error fetching WABA list.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWabaList();
  }, []);

  // Fetch Template Details
  const fetchTemplateDetails = async (wabaNumber) => {
    try {
      const response = await getWabaTemplateDetails(wabaNumber, 0);
      if (response) {
        setTemplateList(response);
        // const approvedTemplateList = response.filter((template) => template.status === "APPROVED");
        // setTemplateOptions(
        //   approvedTemplateList.map((template) => ({
        //     value: template.vendorTemplateId,
        //     label: template.templateName,
        //   }))
        const approvedTemplateList = response.filter(
          (template) => template.status === "APPROVED"
        );
        setTemplateOptions(approvedTemplateList);
      } else {
        toast.error("Failed to load templates!");
      }
    } catch (error) {
      toast.error("Error fetching template details.");
    }
  };

  // Handle WABA selection
  const handleWabaSelect = async (value) => {
    setSelectedWaba(value);

    // Reset all dependent states when WABA changes
    setSelectedTemplate("");
    setTemplateDataNew(null);
    setFormData({});
    setImagePreview(null);
    setSelectedOption("option2");
    setFileHeaders([]);
    setTemplateList([]);
    setTemplateOptions([]);

    const selectedWabaDetails = wabaList.find(
      (waba) => waba.mobileNo === value
    );
    setSelectedWabaMobileNo(
      selectedWabaDetails ? [selectedWabaDetails.mobileNo] : []
    );
    setWabaAccountId(selectedWabaDetails?.wabaAccountId || "");
    if (selectedWabaDetails) {
      await fetchTemplateDetails(selectedWabaDetails.mobileNo);
    }
  };

  // Find the selected template data
  const selectedTemplateData = templateList.find(
    (template) => template.vendorTemplateId === selectedTemplate
  );

  useEffect(() => {
    const fetchTemplateData = async () => {
      if (!selectedTemplate || !wabaAccountId) return;
      setIsFetching(true);
      try {
        // const response = await getWabaTemplate(wabaAccountId, selectedTemplate);
        const response = await getTemplateDetialsById(selectedTemplate);

        // if (response && response.data && response.data.length > 0) {
        //   setTemplateDataNew(response.data[0]);
        //   setSelectedLanguage(response.data[0]?.language);
        if (response) {
          setTemplateDataNew(response);
          setSelectedLanguage(response?.language);
        } else {
          toast.error("Failed to load template data!");
        }
      } catch (error) {
        toast.error("Error fetching template data.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchTemplateData();
  }, [selectedTemplate, wabaAccountId]);

  const handleFileHeadersUpdate = (
    filePath,
    headers,
    totalRecords,
    countryCode,
    selectedMobileColumn,
    addCountryCode
  ) => {
    setFileHeaders(headers);
    setTotalRecords(totalRecords);
    setXlsxPath(filePath);
    setSelectedMobileColumn(selectedMobileColumn);
    setSelectedCountryCode(countryCode);
    setIsCountryCodeChecked(addCountryCode);
  };

  return (
    <div className="max-w-full">
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="container-fluid">
            <div className="flex flex-wrap">
              <div className=" w-full lg:w-2/3 p-3 rounded-xl flex lg:flex-nowrap flex-wrap gap-6 bg-gray-200 min-h-[80vh]">
                <div className="w-100 p-3 bg-gray-100 rounded-lg shadow-md lg:flex-1 ">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex-1">
                      <AnimatedDropdown
                        id="launchSelectWABA"
                        name="launchSelectWABA"
                        label="Select WABA"
                        tooltipContent="Select your whatsapp business account "
                        tooltipPlacement="right"
                        options={wabaList?.map((waba) => ({
                          value: waba.mobileNo,
                          label: waba.name,
                        }))}
                        value={selectedWaba}
                        onChange={handleWabaSelect}
                        placeholder="Select WABA"
                      />
                    </div>
                    <div className="flex-1">
                      <InputField
                        tooltipContent="Your waba account mobile no."
                        tooltipPlacement="right"
                        label="Mobile No"
                        value={selectedWabaMobileNo.join(", ")}
                        readOnly
                        disabled
                        placeholder="Phone No."
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <InputField
                      id="createCampaign"
                      name="createCampaign"
                      label="Campaign Name"
                      value={inputValue}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder="Campaign Name"
                      tooltipContent="Your templatename should not contain spaces."
                      tooltipPlacement="right"
                    />
                  </div>
                  <div className="mb-3">
                    <DropdownWithSearch
                      id="selectTemplateType"
                      name="selectTemplateType"
                      label="Select Template"
                      tooltipContent="Select Template"
                      tooltipPlacement="right"
                      // options={templateOptions}
                      options={templateOptions.map((template) => ({
                        value: template.vendorTemplateId,
                        label: template.templateName,
                      }))}
                      value={selectedTemplate}
                      onChange={(value) => {
                        setSelectedTemplate(value);
                        setTemplateDataNew(null);
                        setFormData({});
                        setImagePreview(null);
                        setImageFile(null);
                        // setFileHeaders([]);
                      }}
                      placeholder="Select Template"
                    />
                  </div>
                  {selectedTemplateData?.category === "MARKETING" && (
                    <div>
                      <h1 className="mb-1 text-sm font-medium text-gray-800">
                        Send Via
                      </h1>
                      <div className="grid lg:grid-cols-2 gap-2 mb-2 sm:grid-cols-2">
                        {/* Option 1 */}
                        <label className="cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2 hover:shadow-lg transition-shadow duration-300">
                          <div className="flex items-center justify-start gap-2 cursor-pointer">
                            <RadioButton
                              inputId="radioOptionSend1"
                              name="radioGroupSend"
                              value="2"
                              onChange={(e) =>
                                setMarketingType(parseInt(e.target.value))
                              }
                              checked={marketingType === 2}
                            />
                            <label
                              htmlFor="radioOptionSend1"
                              className="text-sm font-medium text-gray-700 cursor-pointer"
                            >
                              Cloud API
                            </label>
                          </div>
                        </label>

                        {/* Option 2 */}
                        <label className="cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2 hover:shadow-lg transition-shadow duration-300">
                          <div className="flex items-center justify-start gap-2">
                            <RadioButton
                              inputId="radioOptionSend2"
                              name="radioGroupSend"
                              value="1"
                              onChange={(e) =>
                                setMarketingType(parseInt(e.target.value))
                              }
                              checked={marketingType === 1}
                            />
                            <label
                              htmlFor="radioOptionSend2"
                              className="text-sm font-medium text-gray-700 cursor-pointer"
                            >
                              MM Lite
                            </label>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  <div>
                    {isFetching ? (
                      // <UniversalSkeleton height="15rem" width="100%" />
                      <></>
                    ) : (
                      templateDataNew && (
                        <TemplateForm
                          templateDataNew={templateDataNew}
                          onInputChange={(value, variable) =>
                            setFormData((prev) => ({
                              ...prev,
                              [variable]: value,
                            }))
                          }
                          onImageUpload={handleImageUpload}
                          selectedOption={selectedOption}
                          fileHeaders={fileHeaders}
                          selectedTemplateData={selectedTemplateData}
                          onUrlIndexChange={setUrlIndex}
                          setVarLength={setVarLength}
                          setCardIndex={setCardIndex}
                          cardIndex={cardIndex}
                          setFileData={setFileData}
                          fileData={fileData}
                          marketingType={marketingType}
                          setMarketingType={setMarketingType}
                          setLocationData={setLocationData}
                          locationData={locationData}
                          selectedTemplate={selectedTemplate}
                          templateOptions={templateOptions}
                        />
                      )
                    )}
                  </div>
                </div>
                <div className="w-full lg:flex-1 lg:w-0">
                  <RadioButtonLaunchCampaign
                    onOptionChange={handleOptionChange}
                    selectedOption={selectedOption}
                    onFileUpload={handleFileHeadersUpdate}
                    onGroupChange={handleGroupChange}
                    setSelectedGroups={setSelectedGroups}
                    selectedGroups={selectedGroups}
                    onUrlIndexChange={setUrlIndex}
                    groups={groups}
                    setGroups={setGroups}
                    setUploadedFile={setUploadedFile}
                    uploadedFile={uploadedFile}
                    isUploaded={isUploaded}
                    setIsUploaded={setIsUploaded}
                    fileRef={fileRef}
                    setSelectedOption={setSelectedOption}
                    workflowState={workflowState}
                    setWorkflowState={setWorkflowState}
                    allWorkflows={allWorkflows}
                    // setIsCountryCodeChecked={setIsCountryCodeChecked}
                    setWorkflowEditDialog={setWorkflowEditDialog}
                    workflowEditDialog={setWorkflowEditDialog}
                  />
                </div>
              </div>

              <div className="w-full lg:w-1/3 lg:px-5 md:px-2 px-2 lg:mt-0 mt-5 min-h-[80vh]">
                {/* {isFetching ? (
                  <div className="w-full">
                    <UniversalSkeleton height="46rem" width="100%" />
                  </div>
                ) : ( */}
                <WhatsappLaunchPreview
                  templateDataNew={templateDataNew}
                  formData={formData}
                  uploadedImage={imagePreview}
                  setCardIndex={setCardIndex}
                  cardIndex={cardIndex}
                  fileData={fileData}
                  locationData={locationData}
                />
                {/* )} */}
              </div>
            </div>
            <div className="flex items-center justify-center mt-5">
              <UniversalButton
                id="LaunchCampaignSubmitBtn"
                name="LaunchCampaignSubmitBtn"
                label="Review & Send"
                type="submit"
                style={{ borderRadius: "40px", letterSpacing: "1px" }}
                onClick={handleSubmitCampaign}
                variant="primary"
              />
            </div>
          </div>

          {/* Dialog Box for Review & Submission */}
          <Dialog
            header="Review & Confirm"
            visible={dialogVisible}
            style={{ width: "35rem" }}
            onHide={() => setDialogVisible(false)}
            draggable={false}
          >
            <div className="space-y-5">
              <div className="grid grid-cols-2 p-3 space-y-2 text-gray-800 bg-gray-100 rounded-md shadow-lg text-md">
                <span className="font-semibold font-m">WABA Account : </span>
                <p className="">
                  {wabaList?.find((waba) => waba.mobileNo === selectedWaba)
                    ?.name || "N/A"}
                </p>
                <span className="font-semibold font-m">Template Name : </span>
                <p className="">
                  {" "}
                  {selectedTemplateData?.templateName || "N/A"}
                </p>
                <span className="font-semibold font-m">Template Type : </span>
                <p className="">{selectedTemplateData?.type || "N/A"}</p>
                <span className="font-semibold font-m">
                  Template Category :{" "}
                </span>
                <p className="">{selectedTemplateData?.category || "N/A"}</p>
                <span className="font-semibold font-m">Campaign Name : </span>
                <p className="w-full break-words">{inputValue || "N/A"}</p>
                <span className="font-semibold font-m">Total Audience : </span>
                <p className="">{totalRecords || "N/A"}</p>
              </div>
              {/* <div className="flex items-end gap-2">
                                <div className="flex-1">
                                    <InputField
                                        id="testMobileNumber"
                                        name="testMobileNumber"
                                        label="Test Mobile Number"
                                        value={testMobileNumber}
                                        onChange={(e) => setTestMobileNumber(e.target.value)}
                                        placeholder="Enter mobile number"
                                        tooltipContent="Enter a mobile number to test the campaign."
                                        tooltipPlacement="right"
                                        type="number"
                                        maxLength="10"
                                    />
                                </div>
                                <UniversalButton
                                    label="Test Now"
                                    onClick={() => toast.success("Test message sent!")}
                                    variant="primary"
                                />
                            </div> */}
              <div className="flex items-center gap-2">
                <Checkbox
                  inputId="scheduleCheckbox"
                  checked={schedule}
                  onChange={(e) => setSchedule(e.checked)}
                />
                <label htmlFor="scheduleCheckbox" className="text-md">
                  Schedule
                </label>
                {schedule && (
                  <Calendar
                    id="scheduleDateTime"
                    value={scheduledDateTime}
                    onChange={(e) => setScheduledDateTime(e.value)}
                    showTime
                    hourFormat="12"
                    minDate={new Date()}
                    dateFormat="dd/mm/yy"
                  />
                )}
              </div>
              {/* <div className="flex items-center gap-2">
                                <Checkbox
                                    inputId="agreeTermsCheckbox"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.checked)}
                                />
                                <label htmlFor="agreeTermsCheckbox">
                                    I agree to terms and conditions*
                                </label>
                            </div> */}
              <div className="flex items-center justify-center">
                {/*final Submit Button */}
                <UniversalButton
                  label="Send Campaign"
                  onClick={handleFinalSubmit}
                  style={{
                    borderRadius: "40px",
                    letterSpacing: "1px",
                  }}
                  variant="primary"
                />
              </div>
            </div>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default WhatsappLaunchCampaign;
