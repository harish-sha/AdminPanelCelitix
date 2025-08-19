import React, { useState, useEffect } from "react";
import AnimatedDropdown from "../../components/AnimatedDropdown";
import InputField from "../../components/InputField";
import { RadioButton } from "primereact/radiobutton";
import { Dialog } from "primereact/dialog";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CallIcon from "@mui/icons-material/Call";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import EventIcon from "@mui/icons-material/Event";
import SellIcon from "@mui/icons-material/Sell";
import GroupsIcon from "@mui/icons-material/Groups";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PaymentIcon from "@mui/icons-material/Payment";
import CardTravelOutlinedIcon from "@mui/icons-material/CardTravelOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import DropdownWithSearch from "../../components/DropdownWithSearch.jsx";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { getWhatsAppTemplateDetails } from "@/apis/whatsapp/whatsapp.js";
import { MdPreview } from "react-icons/md";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import HomeIcon from "@mui/icons-material/Home";
import { TbFilterX } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import {
  getWabaList,
  sendTemplatetoApi,
} from "../../../apis/whatsapp/whatsapp.js";
import toast from "react-hot-toast";
import UniversalSkeleton from "@/whatsapp/components/UniversalSkeleton";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TemplateLibrary = () => {
  const navigate = useNavigate();
  // Library start
  const [selectedValue, setSelectedValue] = useState("");

  const [selectedLang, setSelectedLang] = useState("en_GB");

  const [selectedOptionTopic, setSelectedOptionTopic] = useState("");

  const [selectedTopic, setSelectedTopic] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [viewTemplate, setViewTemplate] = useState(false);
  const [templateDetails, setTemplateDetails] = useState([]);
  const [selectedOptionIndustry, setSelectedOptionIndustry] = useState();
  const [LibraryTemplates, setLibraryTemplates] = useState([]);
  const [LibraryFilteredTemplates, setLibraryFilteredTemplates] = useState([]);

  const [selectedOptionCategory, setSelectedOptionCategory] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [showAllIndustries, setShowAllIndustries] = useState(false);
  const [extraOptions, setExtraOption] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [buttons, setButtons] = useState([]);

  const [wabaList, setWabaList] = useState(null);

  const [selectedWaba, setSelectedWaba] = useState("");

  const [selectedWabaSno, setSelectedWabaSno] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // Library End

  const handleChangeOptionsTopic = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    const topic = topics.find((t) => t.id === selectedId);
    setSelectedTopic(topic);
  };

  const handleSelectById = (id) => {
    setSelectedOptionTopic(id);
    setSelectedTopic(topics.find((t) => t.id === id) || null);
  };

  const handleChangeOptionsCategory = (event) => {
    setSelectedOptionCategory(event.target.value);
  };

  const handleChangeOptionsIndustry = (event) => {
    setSelectedOptionIndustry(event.target.value);
  };

  const handleUrlChange = (index, newUrl) => {
    const updatedButtons = [...buttons];
    updatedButtons[index].url = newUrl;
    setButtons(updatedButtons);
  };

  const categories = [
    {
      id: "MARKETING",
      label: `Marketing`,
      icon: (
        <ShoppingCartOutlinedIcon
          fontSize="small"
          className="text-[#FF6B6B] "
        />
      ),
    },
    {
      id: "UTILITY",
      label: `Utility`,
      icon: <HomeIcon fontSize="small" className="text-[#4ECDC4]" />,
    },
    {
      id: "AUTHENTICATION",
      label: `Authentication`,
      icon: <LocalPoliceIcon fontSize="small" className="text-[#3D5AFE]" />,
    },
  ];

  const industries = [
    {
      id: "E_COMMERCE",
      label: `E-Commerce`,
      icon: (
        <ShoppingCartOutlinedIcon fontSize="small" className="text-[#FF9800]" />
      ),
    },
    {
      id: "TELECOMMUNICATION",
      label: `Telecommunication`,
      icon: (
        <CardTravelOutlinedIcon fontSize="small" className="text-[#3B82F6]" />
      ),
    },
    {
      id: "FINANCIAL_SERVICES",
      label: `Financial Services`,
      icon: <SchoolOutlinedIcon fontSize="small" className="text-[#4CAF50]" />,
    },
  ];

  const usecaseOptions = [
    "ACCOUNT_CREATION_CONFIRMATION",
    "APPOINTMENT_MISSED",
    "APPOINTMENT_REMINDER",
    "APPOINTMENT_SCHEDULEING",
    "AUTO_PAY_REMINDER",
    "BANK_TRANSACTION_VERIFICATION",
    "CALL_PERMISSION_REQUEST",
    "CANCELLATION_CONFIRMATION",
    "DELIVERY_CONFIRMATION",
    "DELIVERY_FAILED",
    "DELIVERY_UPDATE",
    "EVENT_DETAILS_REMINDER",
    "EVENT_RSVP_CONFIRMATON",
    "EVENT_RSVP_REMINDER",
    "FEEDBACK_SURVEY",
    "FINANCIAL_TRANSACTION",
    "FIXED_TEMPLATE_PRICE_TEST",
    "FOLLOW_UP_MISSED_CALLS",
    "FRAUD_ALERT",
    "GROUP_INVITE_UPON_REQUEST",
    "IN_PERSON_DELIVERY",
    "IN_PERSON_VERIFICATION",
    "LOW_BALANCE_WARNING",
    "NETWORK_TROUBLESHOOTING",
    "ORDER_ACTION_NEEDED",
    "ORDER_CONFIRMATION",
    "ORDER_DELAY",
    "ORDER_OR_TRANSACTION_CANCEL",
    "ORDER_PICK_UP",
    "ORDER_REFUND",
    "PAYMENT_ACTION_REQUIRED",
    "PAYMENT_CONFIRMATION",
    "PAYMENT_DUE_REMINDER",
    "PAYMENT_NOTICE",
    "PAYMENT_OVERDUE",
    "PAYMENT_REJECT_FAIL",
    "PAYMENT_SCHEDULED",
    "PAYMENT_SUCCESSFUL",
    "RECEIPT_ATTACHMENT",
    "SHIPMENT_CONFIRMATION",
    "STATEMENT_ATTACHMENT",
    "STATEMENT_AVAILABLE",
    "TECHNICIAN_ARRIVAL",
    "TICKET_ACKNOWLEDGEMENT",
    "TRANSACTION_ALERT",
    "UPGRADE_CONFIRMATION",
    "VERIFY_DELIVERY",
    "VERIFY_TRANSACTION",
    "VERIFY_TRANSACTION_BANCO_AZTECA",
    "VERIFY_TRANSACTION_SPINJAM",
    "VERIFY_USER",
  ].map((item) => ({
    value: item,
    label: item.replace(/_/g, " "),
  }));

  const topics = [
    {
      id: "ACCOUNT_UPDATES",
      label: "Account",
      icon: <AccountBalanceIcon fontSize="small" className="text-[#8E24AA]" />,
    },
    {
      id: "CALL_PERMISSIONS",
      label: "Calls",
      icon: <CallIcon fontSize="small" className="text-[#009688]" />,
    },
    {
      id: "CUSTOMER_FEEDBACK",
      label: "Customer Feedback",
      icon: <SupportAgentIcon fontSize="small" className="text-[#FFB309]" />,
    },
    {
      id: "EVENT_REMINDER",
      label: "Reminder",
      icon: <EventIcon fontSize="small" className="text-[#FF8C42]" />,
    },
    {
      id: "FIXED_TEMPLATE_PRICE_TEST",
      label: "Pricing",
      icon: <SellIcon fontSize="small" className="text-[#9E9E9E]" />,
    },
    {
      id: "GROUP_INVITE_LINK",
      label: "Invitaion Link",
      icon: <GroupsIcon fontSize="small" className="text-[#7C4DFF]" />,
    },
    {
      id: "IDENTITY_VERIFICATION",
      label: "Verification",
      icon: <PermIdentityIcon fontSize="small" className="text-[#00C853]" />,
    },
    {
      id: "ORDER_MANAGEMENT",
      label: "Order Management",
      icon: <LocalMallIcon fontSize="small" className="text-[#795548]" />,
    },
    {
      id: "PAYMENTS",
      label: "Payments",
      icon: <PaymentIcon fontSize="small" className="text-[#F44336]" />,
    },
  ];

  const languageOptions = [
    { label: "Afrikaans", value: "af" },
    { label: "Albanian", value: "sq" },
    { label: "Arabic", value: "ar" },
    // { label: "Arabic (EGY)", value: "ar_EG" },
    // { label: "Arabic (UAE)", value: "ar_AE" },
    // { label: "Arabic (LBN)", value: "ar_LB" },
    // { label: "Arabic (MAR)", value: "ar_MA" },
    // { label: "Arabic (QAT)", value: "ar_QA" },
    { label: "Azerbaijani", value: "az" },
    // { label: "Belarusian", value: "be_BY" },
    { label: "Bengali", value: "bn" },
    // { label: "Bengali (IND)", value: "bn_IN" },
    { label: "Bulgarian", value: "bg" },
    { label: "Catalan", value: "ca" },
    { label: "Chinese (CHN)", value: "zh_CN" },
    { label: "Chinese (HKG)", value: "zh_HK" },
    { label: "Chinese (TAI)", value: "zh_TW" },
    { label: "Croatian", value: "hr" },
    { label: "Czech", value: "cs" },
    { label: "Danish", value: "da" },
    // { label: "Dari", value: "prs_AF" },
    { label: "Dutch", value: "nl" },
    // { label: "Dutch (BEL)", value: "nl_BE" },
    { label: "English", value: "en" },
    { label: "English (UK)", value: "en_GB" },
    { label: "English (US)", value: "en_US" },
    // { label: "English (UAE)", value: "en_AE" },
    // { label: "English (AUS)", value: "en_AU" },
    // { label: "English (CAN)", value: "en_CA" },
    // { label: "English (GHA)", value: "en_GH" },
    // { label: "English (IRL)", value: "en_IE" },
    // { label: "English (IND)", value: "en_IN" },
    // { label: "English (JAM)", value: "en_JM" },
    // { label: "English (MYS)", value: "en_MY" },
    // { label: "English (NZL)", value: "en_NZ" },
    // { label: "English (QAT)", value: "en_QA" },
    // { label: "English (SGP)", value: "en_SG" },
    // { label: "English (UGA)", value: "en_UG" },
    // { label: "English (ZAF)", value: "en_ZA" },
    { label: "Estonian", value: "et" },
    { label: "Filipino", value: "fil" },
    { label: "Finnish", value: "fi" },
    { label: "French", value: "fr" },
    // { label: "French (BEL)", value: "fr_BE" },
    // { label: "French (CAN)", value: "fr_CA" },
    // { label: "French (CHE)", value: "fr_CH" },
    // { label: "French (CIV)", value: "fr_CI" },
    // { label: "French (MAR)", value: "fr_MA" },
    // { label: "Georgian", value: "ka" },
    { label: "German", value: "de" },
    // { label: "German (AUT)", value: "de_AT" },
    // { label: "German (CHE)", value: "de_CH" },
    { label: "Greek", value: "el" },
    { label: "Gujarati", value: "gu" },
    { label: "Hausa", value: "ha" },
    { label: "Hebrew", value: "he" },
    { label: "Hindi", value: "hi" },
    { label: "Hungarian", value: "hu" },
    { label: "Indonesian", value: "id" },
    { label: "Irish", value: "ga" },
    { label: "Italian", value: "it" },
    { label: "Japanese", value: "ja" },
    { label: "Kannada", value: "kn" },
    { label: "Kazakh", value: "kk" },
    // { label: "Kinyarwanda", value: "rw_RW" },
    { label: "Korean", value: "ko" },
    // { label: "Kyrgyz (Kyrgyzstan)", value: "ky_KG" },
    { label: "Lao", value: "lo" },
    { label: "Latvian", value: "lv" },
    { label: "Lithuanian", value: "lt" },
    { label: "Macedonian", value: "mk" },
    { label: "Malay", value: "ms" },
    { label: "Malayalam", value: "ml" },
    { label: "Marathi", value: "mr" },
    { label: "Norwegian", value: "nb" },
    // { label: "Pashto", value: "ps_AF" },
    { label: "Persian", value: "fa" },
    { label: "Polish", value: "pl" },
    { label: "Portuguese (BR)", value: "pt_BR" },
    { label: "Portuguese (POR)", value: "pt_PT" },
    { label: "Punjabi", value: "pa" },
    { label: "Romanian", value: "ro" },
    { label: "Russian", value: "ru" },
    { label: "Serbian", value: "sr" },
    // { label: "Sinhala", value: "si_LK" },
    { label: "Slovak", value: "sk" },
    { label: "Slovenian", value: "sl" },
    { label: "Spanish", value: "es" },
    // { label: "Spanish (ARG)", value: "es_AR" },
    // { label: "Spanish (CHL)", value: "es_CL" },
    // { label: "Spanish (COL)", value: "es_CO" },
    // { label: "Spanish (CRI)", value: "es_CR" },
    // { label: "Spanish (DOM)", value: "es_DO" },
    // { label: "Spanish (ECU)", value: "es_EC" },
    // { label: "Spanish (HND)", value: "es_HN" },
    // { label: "Spanish (MEX)", value: "es_MX" },
    // { label: "Spanish (PAN)", value: "es_PA" },
    // { label: "Spanish (PER)", value: "es_PE" },
    // { label: "Spanish (SPA)", value: "es_ES" },
    // { label: "Spanish (URY)", value: "es_UY" },
    { label: "Swahili", value: "sw" },
    { label: "Swedish", value: "sv" },
    { label: "Tamil", value: "ta" },
    { label: "Telugu", value: "te" },
    { label: "Thai", value: "th" },
    { label: "Turkish", value: "tr" },
    { label: "Ukrainian", value: "uk" },
    { label: "Urdu", value: "ur" },
    // { label: "Uzbek", value: "uz" },
    { label: "Vietnamese", value: "vi" },
    { label: "Zulu", value: "zu" },
  ];

  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoad(true);
      try {
        const res = await getWhatsAppTemplateDetails({
          searchTerm,
          topic: selectedOptionTopic || "",
          usecase: selectedValue || "",
          industry: selectedOptionIndustry?.id || "",
          language: selectedLang,
        });

        if (res) {
          setLibraryTemplates(res.data || []);
        } else {
          setTemplates([]);
        }
      } catch (error) {
        toast.error("Error fetching templates:", error);
      } finally {
        setIsLoad(false);
      }
    };

    fetchTemplates();
  }, [
    searchTerm,
    selectedValue,
    selectedLang,
    selectedOptionIndustry?.id,
    selectedOptionTopic,
  ]);

  useEffect(() => {
    const filtered = (() => {
      if (!selectedOptionCategory) {
        return LibraryTemplates;
      }
      return LibraryTemplates.filter(
        (item) => item.category === selectedOptionCategory
      );
    })();

    // Do something with `filtered`, for example update state
    setLibraryFilteredTemplates(filtered);
  }, [selectedOptionCategory, LibraryTemplates]);

  const handleViewTemplate = (data) => {
    setViewTemplate(true);
    setTemplateDetails(data);
  };

  useEffect(() => {
    const fetchWabaList = async () => {
      try {
        setIsLoading(true);
        const response = await getWabaList();

        if (response) {
          setWabaList(response);
        } else {
          toast.error("Failed to load WABA details!");
        }
      } catch (error) {
        toast.error("Error fetching WABA list.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWabaList();
  }, []);

  const handleSubmitTemplate = (data) => {
    setExtraOption(true);
    setTemplateName(data?.name || "");

    if (data?.buttons && Array.isArray(data.buttons)) {
      setButtons(data.buttons);
    } else {
      setButtons([]);
    }
  };

  async function handleReview(data) {
    navigate("/edit-template", { state: data });
  }
  useEffect(() => {
    if (!viewTemplate) {
      setExtraOption(false);
      setTemplateDetails([]);
    }
  }, [viewTemplate]);

  const handleFinalSubmitTemplate = async (data) => {
    if (!selectedWaba && !selectedWabaSno) {
      toast.error("Please select WABA");
      return;
    }

    let tempData = {
      name: templateName,
      category: data.category,
      language: data.language,
      wabaMobile: selectedWaba,
      whatsappSrno: selectedWabaSno,
      components: [],
    };

    // BODY
    if (data.body) {
      tempData.components.push({
        type: "BODY",
        text: data.body,
        example: {
          body_text: [
            Array.isArray(data.body_params) ? data.body_params : ["user"],
          ],
        },
      });
    }

    // BUTTONS — ✅ use updated state instead of raw form data
    if (buttons.length > 0) {
      tempData.components.push({
        type: "BUTTONS",
        buttons: buttons.map((btn) => {
          const buttonObj = {
            type: btn.type,
            text: btn.text,
          };
          if (btn.type === "URL") {
            buttonObj.url = btn.url; // ⬅️ always the latest value
            if (btn.example) buttonObj.example = btn.example;
          }
          if (btn.type === "PHONE_NUMBER") {
            buttonObj.phone_number = btn.phone_number;
          }
          return buttonObj;
        }),
      });
    }

    try {
      const response = await sendTemplatetoApi(tempData);

      const message = response?.msg;

      if (message?.error?.error_user_msg) {
        return toast.error(message.error.error_user_msg);
      }

      if (message?.message === "Template Name is duplicate") {
        return toast.error(
          "Template name is already in use. Please choose another."
        );
      }

      toast.success("Template submitted successfully!");
      setTemplateName("");
      setViewTemplate(false);
      setButtons([]);
    } catch (err) {
      toast.error("Something went wrong while submitting the template.");
    }
  };

  return (
    <>
      <div className="h-[78vh]">
        <div className=" flex flex-wrap md:items-end md:justify-between mb-2">
          <div className="flex flex-col ">
            <div className="text-gray-700 playf text-2xl font-semibold">
              WhatsApp Template Library
            </div>
            <span className="text-gray-500 text-[0.8rem]">
              Browse, filter, and manage and approve templates in one place
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 mt-2">
            <div className=" w-full md:w-56">
              <DropdownWithSearch
                id="usecase"
                name="usecase"
                label="Select Use Case"
                tooltipContent="Choose a use case type"
                options={usecaseOptions}
                value={selectedValue}
                onChange={setSelectedValue}
                placeholder="Select a use case..."
              />
            </div>
            <div className="w-56">
              <DropdownWithSearch
                id="language"
                name="language"
                label="Select Language"
                tooltipContent="Choose a language code"
                options={languageOptions}
                value={selectedLang}
                onChange={setSelectedLang}
                placeholder="Select a language..."
              />
            </div>
            {/* <div className="w-full">
            <InputField
              id="search"
              name="search"
              label="Search"
              type="text"
              placeholder="Search template name, category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className=""
              tooltipContent="Search by keywords"
              />
          </div> */}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 ">
          <div className="flex flex-col rounded-2xl w-60 md:w-70 px-1 py-2 border overflow-scroll h-191 scroll-smooth scrollbar-hide">
            <div className="">
              <div className="flex justify-between items-center px-2 my-2">
                <label className="font-semibold text-gray-600 text-[0.9rem] tracking-wide">
                  Categories
                </label>
                {selectedOptionCategory && (
                  <button
                    onClick={() => setSelectedOptionCategory(null)}
                    className="text-sm text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                  >
                    <TbFilterX />
                  </button>
                )}
              </div>

              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`cursor-pointer rounded-lg px-2 py-2.5 hover:shadow-xl transition-shadow duration-300 flex items-center gap-2 ${
                    selectedOptionCategory === category.id
                      ? "bg-white"
                      : "bg-transparent"
                  }`}
                  onClick={() =>
                    handleChangeOptionsCategory({
                      target: { value: category.id },
                    })
                  }
                >
                  <div className="relative w-5 h-5">
                    <input
                      type="radio"
                      id={`radio_${category.id}`}
                      name="radioGroupCategory"
                      value={category.id}
                      checked={selectedOptionCategory === category.id}
                      onChange={handleChangeOptionsCategory}
                      className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full checked:border-blue-500 transition-colors duration-300 peer"
                    />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span
                        className={`w-2.5 h-2.5 rounded-full bg-blue-500 transform transition-transform duration-300 ${
                          selectedOptionCategory === category.id
                            ? "scale-100 opacity-100"
                            : "scale-0 opacity-0"
                        }`}
                      ></span>
                    </span>
                  </div>

                  <label
                    htmlFor={`radio_${category.id}`}
                    className={`font-medium text-sm cursor-pointer ${
                      selectedOptionCategory === category.id
                        ? "text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    {category.icon} {category.label}
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-1.5">
              <div className="flex justify-between items-center px-2 my-2">
                <label className="font-semibold text-gray-600 text-[0.9rem] tracking-wide">
                  Industries
                </label>
                {selectedOptionIndustry?.id && (
                  <button
                    onClick={() => setSelectedOptionIndustry(null)}
                    className="text-sm text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                  >
                    <TbFilterX />
                  </button>
                )}
              </div>
              <div className="">
                {industries.map((industry) => (
                  <div
                    key={industry.id}
                    onClick={() =>
                      handleChangeOptionsIndustry({
                        target: { value: industry },
                      })
                    }
                    className={`cursor-pointer rounded-lg px-2 py-2.5 hover:shadow-xl transition-shadow duration-300 flex items-center gap-2 ${
                      selectedOptionIndustry?.id === industry.id
                        ? "bg-white"
                        : "bg-transparent"
                    }`}
                  >
                    <div className="relative w-5 h-5 flex items-center justify-center">
                      <input
                        type="radio"
                        id={`radio_${industry.id}`}
                        name="radioGroupIndustry"
                        value={industry.id}
                        onChange={handleChangeOptionsIndustry}
                        checked={selectedOptionIndustry?.id === industry.id}
                        className="peer hidden"
                      />
                      <div
                        className="w-5 h-5 rounded-full border-2 border-gray-400 peer-checked:border-blue-500
                     transition-colors duration-300"
                      ></div>
                      <div
                        className="absolute w-2.5 h-2.5 rounded-full bg-blue-500 scale-0 peer-checked:scale-100
                     transition-transform duration-300 ease-out"
                      ></div>
                    </div>

                    <label
                      htmlFor={`radio_${industry.id}`}
                      className={`font-medium text-sm cursor-pointer flex gap-2 items-center ${
                        selectedOptionIndustry?.id === industry.id
                          ? "text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      {industry.icon} {industry.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-1.5">
              <div className="flex justify-between items-center px-2 my-2">
                <label className="font-semibold text-gray-600 text-[0.9rem] tracking-wide">
                  Topics
                </label>
                {selectedOptionTopic && (
                  <button
                    onClick={() => setSelectedOptionTopic(null)}
                    className="text-sm text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                  >
                    <TbFilterX />
                  </button>
                )}
              </div>
              <div className="transition-all duration-300 rounded-md">
                {topics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => handleSelectById(topic.id)}
                    className={`cursor-pointer rounded-lg px-2 py-2.5 hover:shadow-xl transition-shadow duration-300 flex items-center gap-2  ${
                      selectedOptionTopic === topic.id
                        ? "bg-white"
                        : "bg-transparent"
                    }`}
                  >
                    <div className="relative w-5 h-5 flex items-center justify-center">
                      <input
                        type="radio"
                        id={`radio_${topic.id}`}
                        name="radioGroupTopic"
                        value={topic.id}
                        onChange={handleChangeOptionsTopic}
                        checked={selectedOptionTopic === topic.id}
                        className="peer hidden"
                      />

                      <div
                        className="w-5 h-5 rounded-full border-2 border-gray-400 
                   peer-checked:border-blue-500 transition-colors duration-300"
                      ></div>

                      <div
                        className="absolute w-2.5 h-2.5 rounded-full bg-blue-500 
                   scale-0 peer-checked:scale-100 
                   transition-transform duration-300 ease-out"
                      ></div>
                    </div>

                    <label
                      htmlFor={`radio_${topic.id}`}
                      className={`font-medium text-sm cursor-pointer flex gap-2 items-center  ${
                        selectedOptionTopic === topic.id
                          ? "text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      {topic.icon} {topic.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-2 overflow-scroll relative rounded-md flex-2 border max-h-[77vh] ">
            <div>
              <div className="flex justify-between items-center px-2">
                <div
                  className={`relative flex items-center  transition-all duration-300 ${
                    searchActive ? "w-85" : "w-12"
                  }  rounded-full border-gray-300 `}
                >
                  <input
                    type="text"
                    className={`rounded-full px-4 py-2 text-sm ring ring-[#5C81D9] text-[#5C81D9] transition-all duration-300 ${
                      searchActive ? "w-full opacity-100" : "w-0 opacity-0"
                    } focus:outline-none`}
                    placeholder="Search templates (status, name etc.)"
                    onBlur={() => setSearchActive(false)}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <IoSearch
                    className="absolute cursor-pointer right-3 text-[#5C81D9]"
                    size={22}
                    onClick={() => setSearchActive(true)}
                  />
                </div>
                <div className="text-sm font-semibold text-[#5C81D9]">
                  {selectedOptionCategory}
                  <KeyboardArrowRightOutlinedIcon />
                  {selectedOptionIndustry?.label}
                  <KeyboardArrowRightOutlinedIcon />
                  {selectedTopic.label}
                </div>
              </div>

              {isLoad ? (
                <div className="grid grid-cols-3 gap-4 border-gray-300 border-t-2 pt-2">
                  <div className="space-y-4">
                    <UniversalSkeleton height="13rem" width="100%" />
                    <UniversalSkeleton height="13rem" width="100%" />
                    <UniversalSkeleton height="13rem" width="100%" />
                  </div>
                  <div className="space-y-3">
                    <UniversalSkeleton height="13rem" width="100%" />
                    <UniversalSkeleton height="13rem" width="100%" />
                    <UniversalSkeleton height="13rem" width="100%" />
                  </div>
                  <div className="space-y-3">
                    <UniversalSkeleton height="13rem" width="100%" />
                    <UniversalSkeleton height="13rem" width="100%" />
                    <UniversalSkeleton height="13rem" width="100%" />
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3  grid-cols-1 border-gray-300 border-t-2 gap-4 pt-2">
                  {LibraryFilteredTemplates &&
                  LibraryFilteredTemplates.length > 0 ? (
                    LibraryFilteredTemplates.map((template) => (
                      <div
                        key={template.sr_no}
                        className="bg-white h-73  rounded-md cursor-pointer"
                      >
                        <div className="bg-[#ece5dd] p-4 flex justify-center rounded-md h-60  hover:bg-[#EBCBA6] transition-colors duration-300 ">
                          <div
                            className="bg-white rounded-lg shadow-sm border border-gray-200 w-full max-w-xs p-3 overflow-hidden relative group"
                            onClick={() => handleViewTemplate(template)}
                          >
                            {/* Preview icon */}
                            <MdPreview className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-3xl text-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                            <div className="transition filter group-hover:blur-[1px]">
                              {template.category === "UTILITY" ? (
                                <div className="flex justify-center items-center h-1/4 hover:relative group">
                                  <HomeIcon sx={{ fontSize: 40 }} />
                                </div>
                              ) : (
                                <div className="flex justify-center items-center h-1/4 hover:relative group">
                                  <LocalPoliceIcon sx={{ fontSize: 40 }} />
                                </div>
                              )}

                              {/* Header */}
                              <h3 className="font-semibold text-gray-900 text-sm break-words">
                                {template.header}
                              </h3>

                              {/* Body */}
                              <p className="mt-1 text-xs text-gray-700 font-medium break-words overflow-hidden text-ellipsis  ">
                                {template.body}
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="mt-4 text-xs text-gray-500 break-words overflow-hidden text-ellipsis p-1 pl-2">
                          {template.name}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-[60vh] w-[60vw]  bg-gradient-to-b from-gray-50 to-white rounded-lg border border-dashed border-gray-300">
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg-green-100 p-4 rounded-full shadow-inner animate-bounce">
                          <FaWhatsapp className="text-5xl text-green-500" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-700">
                          No Templates Found
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 text-center max-w-md">
                          We couldn't find any WhatsApp templates based on your
                          current filters. Try adjusting your search criteria or
                          clear the filters to see all templates.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {viewTemplate && (
          <Dialog
            header="Template Preview"
            visible={viewTemplate}
            onHide={() => setViewTemplate(false)}
            className="md:w-[50rem] w-auto"
            draggable={false}
          >
            <div className="flex gap-10">
              <div className="bg-white rounded-md shadow-md overflow-hidden w-96">
                {/* WhatsApp-style preview container */}
                <div className="flex text-sm font-semibold text-gray-700 p-4 border rounded-t-2xl border-gray-200">
                  <h2 className="">
                    Category:&nbsp;
                    {templateDetails.category}
                  </h2>
                  &nbsp;&nbsp;&nbsp;
                  <h2 className="">
                    Language: &nbsp;
                    {templateDetails.language.toUpperCase()}
                  </h2>
                </div>
                <div className="bg-[#ece5dd] p-4 flex justify-center">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full max-w-xs p-3">
                    {/* Template Header */}
                    <h2 className="text-sm font-semibold text-gray-900 break-words">
                      {templateDetails.header}
                    </h2>

                    {/* Template Body */}
                    <p className="mt-1 text-xs text-gray-700 font-medium break-words whitespace-pre-line">
                      {templateDetails.body}
                    </p>

                    {/* Action Buttons (from template) */}
                    {templateDetails?.buttons?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {templateDetails.buttons.map((btn, index) => (
                          <button
                            key={index}
                            className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
                            onClick={() => {
                              if (btn.type === "URL" && btn.url) {
                                window.open(btn.url, "_blank");
                              }
                            }}
                          >
                            {btn.text}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="flex justify-end gap-3 px-4 py-3 bg-gray-50 border-t border-gray-200">
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
                    onClick={() => handleReview(templateDetails)}
                  >
                    Review & Submit
                  </button>
                  <button
                    onClick={() => handleSubmitTemplate(templateDetails)}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div>
                {extraOptions && (
                  <div>
                    <div className="flex flex-col gap-5 mb-5">
                      <div className="w-76">
                        <InputField
                          id="templateName"
                          name="templateName"
                          label="Template name"
                          type="text"
                          placeholder="Write template name"
                          value={templateName}
                          onChange={(e) => setTemplateName(e.target.value)}
                          className=""
                          tooltipContent="Set template name"
                        />
                      </div>
                      <div className="space-y-4">
                        {buttons.map(
                          (btn, index) =>
                            btn.type === "URL" && (
                              <div key={index} className="w-76">
                                <InputField
                                  id={`btnUrl-${index}`}
                                  name={`btnUrl-${index}`}
                                  label={`Button URL ${index + 1}`}
                                  type="text"
                                  placeholder="Write button URL"
                                  value={btn.url || ""}
                                  onChange={(e) => {
                                    const updated = [...buttons];
                                    updated[index] = {
                                      ...btn,
                                      url: e.target.value,
                                    };
                                    setButtons(updated);
                                  }}
                                  tooltipContent={`Set URL for "${btn.text}"`}
                                />
                              </div>
                            )
                        )}
                      </div>
                      <div>
                        <AnimatedDropdown
                          id="createSelectWaba"
                          name="createSelectWaba"
                          label="Select WABA"
                          tooltipContent="Select your WhatsApp Business Account"
                          tooltipPlacement="right"
                          options={wabaList?.map((waba) => ({
                            value: JSON.stringify({
                              mbno: waba.mobileNo,
                              sno: waba.wabaSrno,
                            }),
                            label: waba.name,
                          }))}
                          value={
                            selectedWaba
                              ? JSON.stringify({
                                  mbno: selectedWaba,
                                  sno: selectedWabaSno,
                                })
                              : ""
                          }
                          onChange={(selectedValue) => {
                            if (selectedValue) {
                              const parsedValue = JSON.parse(selectedValue);
                              setSelectedWaba(parsedValue.mbno);
                              setSelectedWabaSno(parsedValue.sno);
                            } else {
                              setSelectedWaba(null);
                              setSelectedWabaSno(null);
                            }
                          }}
                          placeholder="Select WABA"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleFinalSubmitTemplate(templateDetails)}
                      className="px-4 py-2 my-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
                    >
                      Final Submit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Dialog>
        )}
      </div>
    </>
  );
};

export default TemplateLibrary;
