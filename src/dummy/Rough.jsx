// const handleSubmitCampaign = async () => {
//     if (!inputValue) {
//         toast.error("Please enter campaign name!");
//         return;
//     }
//     // if (!selectedWaba) {
//     //     toast.error("Please fill all required fields.");
//     //     return;
//     // }
//     // if (!selectedTemplate) {
//     //     toast.error("Please fill all required fields.");
//     //     return;
//     // }

//     const campaignData = {
//         mobileIndex: "0",
//         ContentMessage: formData?.message || "",
//         wabaNumber: selectedWaba,
//         campaignName: inputValue,
//         templateSrno: templateDataNew?.id || "",
//         templateName: selectedTemplate,
//         templateLanguage: templateDataNew?.language || "en",
//         templateCategory: templateDataNew?.category || "Marketing",
//         templateType: templateDataNew?.type || "default",
//         url: "",
//         variables: [],
//         cardsVariables: [],
//         ScheduleCheck: "0",
//         imgCard: imagePreview ? [imagePreview] : [],
//         xlsxpath: "",
//         totalRecords: "5",
//         attachmentfile: "",
//         urlValues: "",
//         urlIndex: 0,
//         isShortUrl: 0,
//         isGroup: 1,
//         countryCode: 91,
//         scheduleDateTime: "0",
//         groupValues: "-1",
//     };

//     try {
//         setSending(true);
//         console.log("🚀 Sending API Request:", campaignData);

//         const response = await sendWhatsappCampaign(campaignData);

//         if (response?.status) {
//             toast.success("Campaign added successfully!");

//             setInputValue("");
//             setSelectedTemplate("");
//             setTemplateDataNew(null);
//             setImagePreview(null);
//             setFormData({});
//         } else {
//             toast.error(response?.msg || "Failed to send campaign.");
//         }
//     } catch (error) {
//         toast.error("Error sending campaign.");
//         console.error("❌ API Error:", error);
//     } finally {
//         setSending(false);
//     }


//     // if (response?.status) {
//     //     toast.success("Campaign added successfully!");
//     //     setTimeout(() => navigate("/campaigns"), 2000); 
//     // }
// };

// const handleSubmitCampaign = async () => {
//     // Step 1: Validate Inputs
//     if (!selectedWaba) return toast.error("Please select a WhatsApp Business Account (WABA).");
//     if (!inputValue) return toast.error("Please enter campaign name!");
//     if (!selectedTemplate) return toast.error("Please select a WhatsApp template.");
//     if (!selectedCountryCode) return toast.error("Please select a country code.");
//     if (!xlsxPath) return toast.error("Please upload an Excel file with contact numbers.");
//     if (!selectedMobileColumn) return toast.error("Please select the mobile number column.");

//     // ✅ Extract Values from API Responses
//     const selectedWabaData = wabaList?.find(waba => waba.mobileNo === selectedWaba);
//     const selectedTemplateData = templateList?.find(template => template.templateName === selectedTemplate);

//     if (!selectedWabaData) return toast.error("Invalid WABA selection.");
//     if (!selectedTemplateData) return toast.error("Invalid Template selection.");

//     // ✅ Prepare requestData
//     const requestData = {
//         ContentMessage: `#${inputValue}#`,
//         wabaNumber: selectedWabaData?.wabaSrno,  // ✅ Get wabaSrno from WABA List
//         campaignName: inputValue,
//         templateSrno: selectedTemplateData?.templateSrno,  // ✅ Get templateSrno from Template List
//         templateName: selectedTemplate,
//         templateLanguage: selectedTemplateData?.language,  // ✅ Get language from Template Details
//         templateCategory: selectedTemplateData?.category,  // ✅ Get category from Template Details
//         templateType: selectedTemplateData?.type,  // ✅ Get type from Template Details
//     };

//     console.log("Final Data Submission:", requestData);

//     // Send API request
//     try {
//         const response = await sendWhatsappCampaign(requestData);
//         if (response?.status === true) {
//             toast.success("Campaign launched successfully!");
//         } else {
//             toast.error(response?.message || "Campaign launch failed.");
//         }
//     } catch (error) {
//         console.error("Error submitting campaign:", error);
//         toast.error("Error launching campaign. Please try again.");
//     }
// };

const handleSubmitCampaign = async () => {
    // Step 1: Validate Inputs
    if (!selectedWaba) return toast.error("Please select a WhatsApp Business Account (WABA).");
    if (!inputValue) return toast.error("Please enter campaign name!");
    if (!selectedTemplate) return toast.error("Please select a WhatsApp template.");
    if (!selectedCountryCode) return toast.error("Please select a country code.");
    if (!xlsxPath) return toast.error("Please upload an Excel file with contact numbers.");
    if (!selectedMobileColumn) return toast.error("Please select the mobile number column.");

    // ✅ Extract Values from API Responses
    const selectedWabaData = wabaList?.find(waba => waba.mobileNo === selectedWaba);
    const selectedTemplateData = templateList?.find(template => template.templateName === selectedTemplate);

    if (!selectedWabaData) return toast.error("Invalid WABA selection.");
    if (!selectedTemplateData) return toast.error("Invalid Template selection.");

    console.log("Selected Template Data:", selectedTemplateData); // Debugging line

    // ✅ Ensure correct extraction of language, category, type
    const templateLanguage = selectedTemplateData?.language ?? "en";  // Default to "en" if undefined
    const templateCategory = selectedTemplateData?.category ?? "UNKNOWN";
    const templateType = selectedTemplateData?.type ?? "text";

    console.log("Extracted Language:", templateLanguage); // Debugging line

    // ✅ Prepare requestData
    const requestData = {
        ContentMessage: `#${inputValue}#`,
        wabaNumber: selectedWabaData?.wabaSrno,
        campaignName: inputValue,
        templateSrno: selectedTemplateData?.templateSrno,
        templateName: selectedTemplate,
        templateLanguage: templateLanguage,  // ✅ Extracted correctly
        templateCategory: templateCategory,
        templateType: templateType,
    };

    console.log("Final Data Submission:", requestData);

    // Send API request
    try {
        const response = await sendWhatsappCampaign(requestData);
        if (response?.status === true) {
            toast.success("Campaign launched successfully!");
        } else {
            toast.error(response?.message || "Campaign launch failed.");
        }
    } catch (error) {
        console.error("Error submitting campaign:", error);
        toast.error("Error launching campaign. Please try again.");
    }
};





import { useEffect, useReducer } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { WhatsApp } from "@mui/icons-material";

import AnimatedDropdown from "../components/AnimatedDropdown.jsx";
import InputField from "../components/InputField.jsx";
import LanguageSelect from "../components/LanguageSelect.jsx";
import TemplatePreview from "./components/TemplatePreview.jsx";
import InteractiveActions from "../whatsappcreatetemplate/components/InteractiveActions.jsx";
import TemplateTypes from "../whatsappcreatetemplate/components/TemplateTypes.jsx";
import CarouselTemplatePreview from "../whatsappcreatetemplate/components/CarouselTemplatePreview.jsx";
import CarouselTemplateTypes from "../whatsappcreatetemplate/components/CarouselTemplateTypes.jsx";
import CarouselInteractiveActions from "../whatsappcreatetemplate/components/CarouselInteractiveActions.jsx";
import Loader from "../components/Loader.jsx";
import { getWabaList } from "../../apis/whatsapp/whatsapp.js";

// 🎯 Initial State
const initialState = {
    wabaList: null,
    selectedWaba: "",
    selectedCategory: "",
    selectedTemplateType: "",
    selectedLanguage: "",
    templateName: "",
    templateFormat: "",
    templateHeader: "",
    templateFooter: "",
    imageUrl: "",
    videoUrl: "",
    documentUrl: "",
    locationUrl: "",
    interactiveAction: "none",
    phoneNumber: "",
    phoneTitle: "",
    url: "",
    urlTitle: "",
    quickReplies: [],
    cards: [
        {
            mediaType: "image",
            mediaUrl: "",
            body: "This is a dummy card body. You can change this content later.",
            footer: "This is a dummy footer. You can change this content later.",
            actions: [],
        },
    ],
    isLoading: true,
};

// 🎯 Reducer Function
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_WABA_LIST":
            return { ...state, wabaList: action.payload };
        case "SET_VALUE":
            return { ...state, [action.key]: action.payload };
        case "RESET_INTERACTIVE_ACTIONS":
            return { ...state, phoneNumber: "", phoneTitle: "", url: "", urlTitle: "", quickReplies: [] };
        case "ADD_QUICK_REPLY":
            return state.quickReplies.length < 3
                ? { ...state, quickReplies: [...state.quickReplies, ""] }
                : (toast.error("Maximum 3 quick replies allowed"), state);
        case "REMOVE_QUICK_REPLY":
            return { ...state, quickReplies: state.quickReplies.filter((_, i) => i !== action.payload) };
        case "ADD_VARIABLE":
            return { ...state, [action.key]: `${state[action.key]} {${action.payload}}` };
        case "ADD_EMOJI":
            return { ...state, [action.key]: `${state[action.key]}${action.payload}` };
        case "SET_CARDS":
            return { ...state, cards: action.payload };
        default:
            return state;
    }
};

const WhatsappCreateTemplate = () => {
    const navigate = useNavigate();
    const { scrollableContainerRef } = useOutletContext();
    const [state, dispatch] = useReducer(reducer, initialState);

    // Fetch WABA List
    useEffect(() => {
        const fetchWabaList = async () => {
            try {
                const response = await getWabaList();
                if (response) {
                    dispatch({ type: "SET_WABA_LIST", payload: response });
                } else {
                    toast.error("Failed to load WABA details!");
                }
            } catch (error) {
                toast.error("Error fetching WABA list.");
            } finally {
                dispatch({ type: "SET_VALUE", key: "isLoading", payload: false });
            }
        };
        fetchWabaList();
    }, []);

    // Submit Function
    const handleSubmit = () => {
        if (state.selectedCategory && state.selectedTemplateType && state.templateName) {
            toast.success("Template submitted successfully!");
        } else {
            toast.error("Please fill all required fields before submitting.");
        }
    };

    return (
        <div className="w-full">
            {state.isLoading ? (
                <Loader />
            ) : (
                <div className="w-full">
                    <h1 className="text-md font-semibold lg:text-start text-center text-gray-800 mb-4">
                        Create Template
                    </h1>

                    <div className="flex gap-4 flex-wrap items-end justify-start align-middle pb-5">
                        {/* WABA Selection */}
                        <AnimatedDropdown
                            id="createSelectWaba"
                            label="Select WABA"
                            options={state.wabaList?.map((waba) => ({
                                value: waba.mobileNo,
                                label: waba.name,
                            }))}
                            value={state.selectedWaba}
                            onChange={(value) => dispatch({ type: "SET_VALUE", key: "selectedWaba", payload: value })}
                            placeholder="Select WABA"
                        />

                        {/* Category Selection */}
                        <AnimatedDropdown
                            id="category"
                            label="Category"
                            options={[
                                { value: "MARKETING", label: "Marketing" },
                                { value: "UTILITY", label: "Utility" },
                                { value: "AUTHENTICATION", label: "Authentication" },
                            ]}
                            value={state.selectedCategory}
                            onChange={(value) => dispatch({ type: "SET_VALUE", key: "selectedCategory", payload: value })}
                            placeholder="Category"
                        />

                        {/* Template Type Selection */}
                        {state.selectedCategory && (
                            <AnimatedDropdown
                                id="templateType"
                                label="Template Type"
                                options={[
                                    { value: "text", label: "Text" },
                                    { value: "image", label: "Image" },
                                    { value: "video", label: "Video" },
                                    { value: "document", label: "Document" },
                                    { value: "location", label: "Location" },
                                    ...(state.selectedCategory === "MARKETING" ? [{ value: "carousel", label: "Carousel" }] : []),
                                ]}
                                value={state.selectedTemplateType}
                                onChange={(value) => dispatch({ type: "SET_VALUE", key: "selectedTemplateType", payload: value })}
                                placeholder="Template Type"
                            />
                        )}

                        {/* Language Selection */}
                        <LanguageSelect
                            id="language"
                            label="Language"
                            value={state.selectedLanguage}
                            onChange={(option) => dispatch({ type: "SET_VALUE", key: "selectedLanguage", payload: option.value })}
                        />

                        {/* Template Name Input */}
                        <InputField
                            id="templateName"
                            label="Template Name"
                            onChange={(e) => dispatch({ type: "SET_VALUE", key: "templateName", payload: e.target.value.replace(/\s/g, "") })}
                            value={state.templateName}
                            placeholder="Template Name"
                        />
                    </div>

                    {/* Preview & Submit */}
                    {state.selectedWaba && state.selectedCategory && state.selectedTemplateType ? (
                        <div className="flex">
                            <TemplatePreview {...state} />
                            <div className="w-1/3 mt-6 flex items-center justify-center">
                                <button
                                    disabled={!state.selectedWaba || !state.selectedCategory || !state.selectedTemplateType || !state.templateName}
                                    className={`px-3 py-2 tracking-wider text-md text-white rounded-md ${state.selectedWaba && state.selectedCategory && state.selectedTemplateType && state.templateName
                                        ? "bg-[#212529] hover:bg-[#434851]"
                                        : "bg-gray-300 cursor-not-allowed"
                                        }`}
                                    onClick={handleSubmit}
                                >
                                    Submit Template
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">Please select WABA, category, and template type.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default WhatsappCreateTemplate;
