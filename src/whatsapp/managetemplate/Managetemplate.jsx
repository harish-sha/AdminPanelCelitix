import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import toast from "react-hot-toast";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import HdrStrongOutlinedIcon from "@mui/icons-material/HdrStrongOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CardTravelOutlinedIcon from "@mui/icons-material/CardTravelOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { BreadCrumb } from "primereact/breadcrumb";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

import DataTable from "./components/Datatable.jsx";
import AnimatedDropdown from "../components/AnimatedDropdown";
import InputField from "../components/InputField";
import UniversalDatePicker from "../components/UniversalDatePicker";
import UniversalButton from "../components/UniversalButton";
import UniversalSkeleton from "../components/UniversalSkeleton";
import Loader from "../components/Loader";
import {
  getWabaList,
  getWabaTemplate,
  getWabaTemplateDetails,
  syncStatus,
} from "../../apis/whatsapp/whatsapp.js";
import { CustomTabPanel, a11yProps } from "./components/CustomTabPanel";
import "../style.css";
import { RadioButton } from "primereact/radiobutton";
import { Dialog } from "primereact/dialog";

const ManageTemplate = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [value, setValue] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [wabaAccountId, setWabaAccountId] = useState("");

  const [syncStatusVisible, setSyncStatusVisible] = useState(false);
  const [syncWabaId, setSyncWabaId] = useState(null);

  // Filters
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedWaba, setSelectedWaba] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [templateName, setTemplateName] = useState("");

  // Data
  const [wabaList, setWabaList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Library Filters
  const [selectedLibraryCategory, setSelectedLibraryCategory] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const [selectedOptionCategory, setSelectedOptionCategory] =
    useState("marketing");
  const [selectedOptionIndustry, setSelectedOptionIndustry] =
    useState("ecommerce");
  const [showAllIndustries, setShowAllIndustries] = useState(false);

  const [searchActive, setSearchActive] = useState(false);

  const handleChangeOptionsCategory = (event) => {
    setSelectedOptionCategory(event.target.value);
  };

  const handleChangeOptionsIndustry = (event) => {
    setSelectedOptionIndustry(event.target.value);
  };

  // Dynamic template counts (Replace this with API data)
  const templateCounts = {
    marketing: 30,
    utility: 26,
    authentication: 28,
    ecommerce: 30,
    financial: 26,
    education: 28,
    banking: 28,
    healthcare: 22,
    logistics: 18,
    retail: 35,
    corporate: 21,
    entertainment: 19,
    travel: 23,
    food: 27,
    real_estate: 20,
    manufacturing: 25,
    science: 17,
  };

  // Categories Data (Dynamic count)
  const categories = [
    { id: "marketing", label: `Marketing (${templateCounts.marketing})` },
    { id: "utility", label: `Utility (${templateCounts.utility})` },
    {
      id: "authentication",
      label: `Authentication (${templateCounts.authentication})`,
    },
  ];

  // Industries Data (first 4 are visible, rest are hidden)
  const industries = [
    {
      id: "ecommerce",
      label: `E-commerce (${templateCounts.ecommerce})`,
      icon: <ShoppingCartOutlinedIcon fontSize="small" />,
    },
    {
      id: "financial",
      label: `Financial (${templateCounts.financial})`,
      icon: <CardTravelOutlinedIcon fontSize="small" />,
    },
    {
      id: "education",
      label: `Education (${templateCounts.education})`,
      icon: <SchoolOutlinedIcon fontSize="small" />,
    },
    {
      id: "banking",
      label: `Banking (${templateCounts.banking})`,
      icon: <AccountBalanceOutlinedIcon fontSize="small" />,
    },
    {
      id: "healthcare",
      label: `Healthcare (${templateCounts.healthcare})`,
      icon: <HealthAndSafetyOutlinedIcon fontSize="small" />,
    },
    {
      id: "logistics",
      label: `Logistics (${templateCounts.logistics})`,
      icon: <LocalShippingOutlinedIcon fontSize="small" />,
    },
    {
      id: "retail",
      label: `Retail (${templateCounts.retail})`,
      icon: <StorefrontOutlinedIcon fontSize="small" />,
    },
    {
      id: "corporate",
      label: `Corporate (${templateCounts.corporate})`,
      icon: <WorkOutlineOutlinedIcon fontSize="small" />,
    },
    {
      id: "entertainment",
      label: `Entertainment (${templateCounts.entertainment})`,
      icon: <MovieFilterOutlinedIcon fontSize="small" />,
    },
    {
      id: "travel",
      label: `Travel (${templateCounts.travel})`,
      icon: <PublicOutlinedIcon fontSize="small" />,
    },
    {
      id: "food",
      label: `Food & Beverage (${templateCounts.food})`,
      icon: <RestaurantOutlinedIcon fontSize="small" />,
    },
    {
      id: "real_estate",
      label: `Real Estate (${templateCounts.real_estate})`,
      icon: <HouseOutlinedIcon fontSize="small" />,
    },
    {
      id: "manufacturing",
      label: `Manufacturing (${templateCounts.manufacturing})`,
      icon: <SettingsOutlinedIcon fontSize="small" />,
    },
    {
      id: "science",
      label: `Science & Research (${templateCounts.science})`,
      icon: <ScienceOutlinedIcon fontSize="small" />,
    },
    // { id: "science", label: `Science & Research (${templateCounts.science})`, icon: <ScienceOutlinedIcon fontSize='small' /> },
    // { id: "science", label: `Science & Research (${templateCounts.science})`, icon: <ScienceOutlinedIcon fontSize='small' /> },
    // { id: "science", label: `Science & Research (${templateCounts.science})`, icon: <ScienceOutlinedIcon fontSize='small' /> },
    // { id: "science", label: `Science & Research (${templateCounts.science})`, icon: <ScienceOutlinedIcon fontSize='small' /> },
    // { id: "science", label: `Science & Research (${templateCounts.science})`, icon: <ScienceOutlinedIcon fontSize='small' /> }
  ];

  // Reset filters when WABA changes
  useEffect(() => {
    setTemplateName("");
    setSelectedCategory("");
    setSelectedType("");
    setSelectedStatus("");
    setSelectedDate(null);
    setFilteredData([]);
    setHasSearched(false);
  }, [selectedWaba]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value.replace(/\s/g, "");
    setTemplateName(newValue);
  };

  // Fetch WABA List
  useEffect(() => {
    const fetchWabaList = async () => {
      setIsLoading(true);
      try {
        const response = await getWabaList();
        if (response) {
          setWabaList(response);
        } else {
          console.error("Failed to fetch WABA List");
        }
      } catch (error) {
        console.error("Error fetching WABA List:", error);
      }
      setIsLoading(false);
    };
    fetchWabaList();
  }, []);

  const fetchTemplateData = async () => {
    if (!selectedTemplate || !wabaAccountId) return;
    try {
      const response = await getWabaTemplate(wabaAccountId, selectedTemplate);

      if (response && response.data && response.data.length > 0) {
        setTemplateData(response.data[0]);
      } else {
        toast.error("Failed to load template data!");
      }
    } catch (error) {
      toast.error("Error fetching template data.");
    }
  };

  useEffect(() => {
    fetchTemplateData();
  }, [selectedTemplate, wabaAccountId]);

  const handleSearch = async () => {
    if (!selectedWaba) {
      toast.error("Please select a (WABA) Account to proceed.");
      return;
    }
    setIsFetching(true);
    setHasSearched(true);
    try {
      const response = await getWabaTemplateDetails(selectedWaba);
      if (response) {
        applyFilters(response);
      } else {
        setFilteredData([]);
      }
    } catch (error) {
      console.error("Error fetching template data:", error);
      setFilteredData([]);
    }
    setIsFetching(false);
  };

  const applyFilters = (data) => {
    const filtered = data.filter((item) => {
      const itemCategory = item.category?.toLowerCase().trim() || "";
      const itemType = item.type?.toLowerCase().trim() || "";
      const itemStatus = item.status?.toLowerCase().trim() || "";
      const itemName = item.templateName?.toLowerCase().trim() || "";
      const itemDateLocal = new Date(item.createdDate).toLocaleDateString(
        "en-CA"
      );
      let selectedDateLocal = "";
      if (selectedDate) {
        selectedDateLocal = new Date(selectedDate).toLocaleDateString("en-CA");
      }
      return (
        (!selectedCategory ||
          itemCategory === selectedCategory.toLowerCase().trim()) &&
        (!selectedType || itemType === selectedType.toLowerCase().trim()) &&
        (!selectedStatus ||
          itemStatus === selectedStatus.toLowerCase().trim()) &&
        (!templateName ||
          itemName.includes(templateName.toLowerCase().trim())) &&
        (!selectedDate || itemDateLocal === selectedDateLocal)
      );
    });
    setFilteredData(filtered);
  };

  const handleSyncTemplate = async () => {
    if (!syncWabaId) {
      toast.error("Please select a WABA account to sync templates.");
      return;
    }
    try {
      const res = await syncStatus(syncWabaId);
      toast(
        `InsertCount: ${res.InsertCount}, \nApproved: ${res.Approved},\nRejectedCount: ${res.Rejected}, \nInsertCount: ${res.InsertCount}, \nDuplicateCount: ${res.DuplicateCount}`
      );
      setSyncStatusVisible(false);
    } catch (e) {
      // console.log(e);
      toast.error("Failed to sync template.");
    }
  };

  // Dummy Templates Data (Add this inside the ManageTemplate component)
  const dummyTemplates = [
    {
      id: 1,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 2,
      name: "Payment Reminder",
      category: "utility",
      industry: "banking",
      header: "Payment Reminder",
      body: "Your monthly subscription payment of ₹999 is due. Avoid service disruption by paying now.",
      button: { type: "cta", text: "Pay Now", link: "#" },
    },
    {
      id: 3,
      name: "Appointment Booking",
      category: "authentication",
      industry: "healthcare",
      header: "Your Appointment is Booked! ✅",
      body: "Your appointment with Dr. Sharma is confirmed for 5th March, 10:00 AM. Location: XYZ Clinic.",
      button: { type: "quick_reply", text: "Reschedule" },
    },
    {
      id: 4,
      name: "Discount Offer",
      category: "marketing",
      industry: "retail",
      header: "Limited Time Offer! 🔥",
      body: "Get 20% OFF on your next purchase! Use code *SAVE20* at checkout.",
      button: { type: "cta", text: "Shop Now", link: "#" },
    },
    {
      id: 5,
      name: "Subscription Expiry Alert",
      category: "utility",
      industry: "education",
      header: "Subscription Expiring Soon! ⏳",
      body: "Your premium access to Online Courses will expire in 3 days. Renew now to continue learning!",
      button: { type: "cta", text: "Renew Now", link: "#" },
    },
    {
      id: 6,
      name: "New Product Launch",
      category: "marketing",
      industry: "ecommerce",
      header: "Introducing Our New Product! 🚀",
      body: "Meet the all-new SmartWatch X with advanced features. Pre-order now!",
      button: { type: "cta", text: "Pre-Order Now", link: "#" },
    },
    {
      id: 7,
      name: "Customer Support Response",
      category: "utility",
      industry: "corporate",
      header: "We Received Your Query 📨",
      body: "Our support team is reviewing your request. Expect a response within 24 hours.",
      button: { type: "quick_reply", text: "Contact Support" },
    },
    {
      id: 8,
      name: "Flight Booking Confirmation",
      category: "authentication",
      industry: "travel",
      header: "Your Flight is Confirmed! ✈️",
      body: "Flight AI-123 from Delhi to Mumbai is confirmed for 10th March. Check-in starts 24 hours before departure.",
      button: { type: "cta", text: "View Ticket", link: "#" },
    },
    {
      id: 9,
      name: "Food Order Update",
      category: "utility",
      industry: "food",
      header: "Your Order is Being Prepared 🍕",
      body: "Your food order will be ready in 15 minutes. Get ready to enjoy your meal!",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 10,
      name: "Event Reminder",
      category: "marketing",
      industry: "entertainment",
      header: "Reminder: Music Concert Tonight 🎶",
      body: "Don't forget! Your ticket for the Coldplay Concert is valid for 7:00 PM tonight. See you there!",
      button: { type: "quick_reply", text: "View Details" },
    },
    {
      id: 11,
      name: "Loan Application Status",
      category: "authentication",
      industry: "banking",
      header: "Loan Application Approved! 🎉",
      body: "Congrats! Your loan application has been approved. Check the details and next steps here.",
      button: { type: "cta", text: "View Status", link: "#" },
    },
    {
      id: 12,
      name: "Health Checkup Reminder",
      category: "utility",
      industry: "healthcare",
      header: "Time for Your Health Checkup! 🏥",
      body: "Stay healthy! It's time for your routine checkup. Book an appointment now.",
      button: { type: "cta", text: "Book Now", link: "#" },
    },
    {
      id: 13,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 14,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 15,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 16,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 17,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 18,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 19,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 20,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 21,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 22,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 23,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 24,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 25,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 26,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 27,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 28,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 29,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 30,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 31,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 32,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 33,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 34,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 35,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 36,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 37,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 38,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 39,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
    {
      id: 40,
      name: "Order Confirmation",
      category: "marketing",
      industry: "ecommerce",
      header: "Your Order is Confirmed! 🎉",
      body: "Thank you for your purchase! Your order #12345 will be delivered soon. Track it here:",
      button: { type: "cta", text: "Track Order", link: "#" },
    },
  ];

  // Updated Templates Display UI (Add this inside your JSX)
  <div className="grid grid-cols-3 gap-4 mt-4">
    {dummyTemplates
      .filter(
        (template) =>
          template.category === selectedOptionCategory &&
          template.industry === selectedOptionIndustry
      )
      .map((template) => (
        <div
          key={template.id}
          className="p-4 transition-shadow duration-300 bg-white border rounded-lg shadow-md border-gray-50 hover:shadow-lg"
        >
          <h3 className="font-semibold text-gray-700">{template.header}</h3>
          <p className="mt-2 text-sm text-gray-500">{template.body}</p>
          <div className="mt-3">
            {template.button.type === "cta" ? (
              <a
                href={template.button.link}
                className="px-4 py-2 text-sm text-white transition-all bg-blue-500 rounded-md hover:bg-blue-600"
              >
                {template.button.text}
              </a>
            ) : (
              <button className="px-4 py-2 text-sm text-gray-700 transition-all bg-gray-200 rounded-md hover:bg-gray-300">
                {template.button.text}
              </button>
            )}
          </div>
        </div>
      ))}
  </div>

  return (
    <div className="w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            width: "100%",
            // maxHeight: "91vh",
            overflow: "hidden",
          }}
        >
          <div className="flex flex-wrap items-center justify-between w-full gap-4 mb-2">
            <div>
              <h1 className="text-xl font-semibold text-gray-700">
                Manage Templates
              </h1>
            </div>
            {/* search templates and status */}
            {/* <div className={`relative flex items-center transition-all duration-300 ${searchActive ? "w-85" : "w-12"} border rounded-lg border-gray-300 `}>
                            <input
                                type="text"
                                className={`border border-gray-300 rounded-lg px-4 py-2 text-sm transition-all duration-300 ${searchActive ? "w-full opacity-100" : "w-0 opacity-0"} focus:outline-none`}
                                placeholder="Search templates (status, name etc.)"
                                onBlur={() => setSearchActive(false)}
                            />
                            <IoSearch
                                className="absolute text-gray-600 cursor-pointer right-3"
                                size={22}
                                color='green'
                                onClick={() => setSearchActive(true)}
                            />
                        </div> */}
            {/* Search Templates and Status */}
            <div className="relative flex items-center h-0 transition-all duration-500 w-120">
              <div
                className={`relative flex items-center transition-all duration-300 border rounded-lg border-gray-300 
            ${searchActive ? "w-80 " : "w-0"} 
            ${!searchActive ? "animate-rotate-glow" : ""}`}
              >
                <input
                  type="text"
                  className={`rounded-lg pr-3 pl-2 py-2 text-sm transition-all duration-300 
                ${searchActive
                      ? "border border-gray-400 outline-none w-full opacity-100"
                      : "w-0 opacity-0"
                    } focus:outline-none`}
                  placeholder="Search templates (status, name etc.)"
                  onBlur={() => setSearchActive(false)}
                />
                <IoSearch
                  className="absolute text-gray-600 cursor-pointer right-4"
                  size={22}
                  color="green"
                  onClick={() => setSearchActive(true)}
                />
              </div>

              {!searchActive && (
                <span className="ml-2 text-sm text-gray-500 transition-opacity duration-300 animate-fade-in">
                  Search Templates
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <div className="w-max-content">
                <UniversalButton
                  id="manageTemplateAddNewBtn"
                  name="manageTemplateAddNewBtn"
                  label="Add New"
                  onClick={() => navigate("/createtemplate")}
                  variant="primary"
                  icon={<AddOutlinedIcon fontSize="small" />}
                />
              </div>
              <div className="w-max-content">
                <UniversalButton
                  id="syncStatusBtn"
                  name="syncStatusBtn"
                  label="Sync Status"
                  variant="primary"
                  onClick={() => {
                    setSyncStatusVisible(true);
                  }}
                  icon={<SyncOutlinedIcon fontSize="small" />}
                />
              </div>
            </div>
          </div>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Manage Campaigns Tabs"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab
              label={
                <span>
                  <ExploreOutlinedIcon size={20} /> Explore
                </span>
              }
              {...a11yProps(0)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "#f0f4ff",
                  borderRadius: "8px",
                },
              }}
            />
            <Tab
              label={
                <span>
                  <LibraryBooksOutlinedIcon size={20} /> All Templates
                </span>
              }
              {...a11yProps(1)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "#f0f4ff",
                  borderRadius: "8px",
                },
              }}
            />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <div className="flex flex-wrap gap-3 min-h-[90vh]">
              <div className="flex flex-col bg-[#e6f4ff] rounded-md shadow-md w-70 overflow-scroll px-2 py-2">
                {/* categrories */}
                <div className="">
                  <label className="font-medium text-gray-600 text-md">
                    Categories
                  </label>
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className={`cursor-pointer rounded-lg px-2 py-2.5 hover:shadow-xl  transition-shadow duration-300 flex items-center gap-2 
                     ${selectedOptionCategory === category.id
                          ? "bg-white"
                          : "bg-transparent"
                        }`}
                    >
                      <RadioButton
                        inputId={`radio_${category.id}`}
                        name="radioGroupCategory"
                        value={category.id}
                        onChange={handleChangeOptionsCategory}
                        checked={selectedOptionCategory === category.id}
                      />
                      <label
                        htmlFor={`radio_${category.id}`}
                        className={`font-medium text-sm cursor-pointer ${selectedOptionCategory === category.id
                          ? "text-green-600"
                          : "text-gray-700"
                          }`}
                      >
                        {category.label}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Industries */}
                <div className="mt-2">
                  <label className="mb-2 font-medium text-gray-600 text-md">
                    Industries
                  </label>
                  <div
                    className={`overflow-y-auto transition-all duration-300 ${showAllIndustries ? "max-h-[400px]" : "max-h-[300px]"
                      } rounded-md`}
                  >
                    {industries.map((industry, index) => (
                      <div
                        key={industry.id}
                        className={`cursor-pointer rounded-lg px-2 py-2.5 hover:shadow-xl transition-shadow duration-300 flex items-center gap-2 
                    ${selectedOptionIndustry === industry.id
                            ? "bg-white"
                            : "bg-transparent"
                          }`}
                      >
                        <RadioButton
                          inputId={`radio_${industry.id}`}
                          name="radioGroupIndustry"
                          value={industry.id}
                          onChange={handleChangeOptionsIndustry}
                          checked={selectedOptionIndustry === industry.id}
                        />
                        <label
                          htmlFor={`radio_${industry.id}`}
                          className={`font-medium text-sm cursor-pointer flex gap-2 items-center 
                        ${selectedOptionIndustry === industry.id
                              ? "text-green-600"
                              : "text-gray-700"
                            }`}
                        >
                          {industry.icon} {industry.label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {industries.length > 4 && (
                    <div className="flex justify-center mt-2">
                      <button
                        className="text-sm font-medium text-blue-500 transition-all duration-300 cursor-pointer hover:underline"
                        onClick={() => setShowAllIndustries(!showAllIndustries)}
                      >
                        {showAllIndustries
                          ? "View Less Industries"
                          : "View More Industries"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {/* Fixed Layout for Template Section */}
              <div className="p-2 overflow-auto bg-white rounded-md flex-2">
                <div>
                  <div className="flex justify-between px-2 py-2">
                    <h2 className="text-sm font-semibold text-gray-500">
                      Showing result <KeyboardArrowRightOutlinedIcon /> 50 of 12
                    </h2>
                    <h2 className="text-sm font-semibold text-green-500">
                      Marketing <KeyboardArrowRightOutlinedIcon />{" "}
                      <ShoppingCartOutlinedIcon fontSize="small" /> E-commerce
                    </h2>
                    {/* <div></div> */}
                    {/* <div></div> */}
                    {/* <span></span> */}
                  </div>

                  <div className="grid grid-cols-3 border-gray-400 border-t-2 gap-4 max-h-[74vh] mt-2 overflow-auto pt-2">
                    {dummyTemplates
                      .filter(
                        (template) =>
                          template.category === selectedOptionCategory &&
                          template.industry === selectedOptionIndustry
                      )
                      .map((template) => (
                        <div
                          key={template.id}
                          className="p-4 transition-shadow duration-500 bg-white border-2 border-gray-200 rounded-lg shadow-md hover:border-2 hover:border-green-500 hover:shadow-xl"
                        >
                          <h3 className="font-semibold text-gray-700">
                            {template.header}
                          </h3>
                          <p className="mt-2 text-sm text-gray-500">
                            {template.body}
                          </p>
                          <div className="mt-3">
                            {template.button.type === "cta" ? (
                              <a
                                href={template.button.link}
                                className="px-4 py-2 text-sm text-white transition-all bg-blue-500 rounded-md hover:bg-blue-600"
                              >
                                {template.button.text}
                              </a>
                            ) : (
                              <button className="px-4 py-2 text-sm text-gray-700 transition-all bg-gray-200 rounded-md hover:bg-gray-300">
                                {template.button.text}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="w-full">
              <>
                <div className="flex flex-wrap items-end justify-start w-full gap-4 mb-5">
                  <div className="w-full sm:w-46">
                    <AnimatedDropdown
                      id="manageTemplateWaba"
                      name="manageTemplateWaba"
                      label="Select WABA"
                      tooltipContent="Select your whatsapp business account"
                      tooltipPlacement="right"
                      options={wabaList.map((waba) => ({
                        value: waba.mobileNo,
                        label: waba.name,
                      }))}
                      value={selectedWaba}
                      onChange={setSelectedWaba}
                      placeholder="Select WABA"
                    />
                  </div>
                  <div className="w-full sm:w-42">
                    <UniversalDatePicker
                      id="manageTemplateDate"
                      name="manageTemplateDate"
                      label="Creation Date"
                      value={selectedDate}
                      onChange={setSelectedDate}
                      placeholder="Pick a start date"
                      tooltipContent="Select the starting date for your project"
                      tooltipPlacement="right"
                      error={!selectedDate}
                      errorText="Please select a valid date"
                      maxDate={new Date()}
                    />
                  </div>
                  <div className="w-full sm:w-42">
                    <InputField
                      id="manageTemplateName"
                      name="manageTemplateName"
                      label="Template Name"
                      value={templateName}
                      onChange={handleInputChange}
                      tooltipPlacement="right"
                      tooltipContent="Your templatename should not contain spaces."
                      placeholder="Template Name"
                    />
                  </div>

                  <div className="w-full sm:w-42">
                    <AnimatedDropdown
                      id="manageTemplateCategory"
                      name="manageTemplateCategory"
                      label="Category"
                      tooltipContent="Select category"
                      tooltipPlacement="right"
                      options={[
                        { value: "marketing", label: "Marketing" },
                        { value: "utility", label: "Utility" },
                        { value: "authentication", label: "Authentication" },
                      ]}
                      value={selectedCategory}
                      onChange={setSelectedCategory}
                      placeholder="Category"
                    />
                  </div>
                  <div className="w-full sm:w-42">
                    <AnimatedDropdown
                      id="manageTemplateType"
                      name="manageTemplateType"
                      label="Type"
                      tooltipContent="Select Type"
                      tooltipPlacement="right"
                      options={[
                        { value: "text", label: "Text" },
                        { value: "image", label: "Image" },
                        { value: "video", label: "Video" },
                        { value: "document", label: "Document" },
                        { value: "carousel", label: "Carousel" },
                      ]}
                      value={selectedType}
                      onChange={setSelectedType}
                      placeholder="Type"
                    />
                  </div>
                  <div className="w-full sm:w-42">
                    <AnimatedDropdown
                      id="manageTemplateStatus"
                      name="manageTemplateStatus"
                      label="Status"
                      tooltipContent="Select Status"
                      tooltipPlacement="right"
                      options={[
                        { value: "pending", label: "Pending" },
                        { value: "rejected", label: "Rejected" },
                        { value: "approved", label: "Approved" },
                      ]}
                      value={selectedStatus}
                      onChange={setSelectedStatus}
                      placeholder="Status"
                    />
                  </div>

                  <div className="w-max-content">
                    <UniversalButton
                      id="manageTemplateSearchBtn"
                      name="manageTemplateSearchBtn"
                      label="Search"
                      icon={<IoSearch />}
                      onClick={handleSearch}
                      variant="primary"
                    />
                  </div>
                </div>
                {/* {isFetching ? (
                  <UniversalSkeleton height="35rem" width="100%" />
                ) : (
                  // ) : !hasSearched ? (
                  //     // Case 1: Initial Load - Ask user to select WABA account
                  //     <div className="flex bg-white border-2 border-blue-500 border-dashed h-[55vh] justify-center rounded-2xl w-full items-center">
                  //         <div className="p-8 text-center text-blue-500 shadow-2xl rounded-2xl shadow-blue-300">
                  //             <span className="text-2xl font-medium tracking-wide font-m">
                  //                 Please select a WhatsApp Business Account (WABA) to
                  //                 proceed.
                  //             </span>
                  //         </div>
                  //     </div>
                  // ) : filteredData.length === 0 ? (
                  //     // Case 2: No data found after filtering
                  //     <div className="flex bg-white border-2 border-dashed border-red-500 h-[55vh] justify-center rounded-2xl w-full items-center">
                  //         <div className="p-8 text-center text-red-500 shadow-2xl rounded-2xl shadow-red-300">
                  //             <span className="text-2xl font-medium tracking-wide font-m">
                  //                 No matching records found. <br /> Please adjust your filters
                  //                 and try again.
                  //             </span>
                  //         </div>
                  //     </div>
                  // Case 3: Show data in the table
                  <DataTable
                    id="whatsappManageTemplateTable"
                    name="whatsappManageTemplateTable"
                    wabaNumber={selectedWaba}
                    wabaSrno={wabaList.find((waba) => waba.mobileNo === selectedWaba)?.wabaSrno} // Pass wabaSrno
                    wabaList={wabaList}
                    data={filteredData}
                    fetchTemplateData={handleSearch}
                  />
                )} */}

                <DataTable
                  id="whatsappManageTemplateTable"
                  name="whatsappManageTemplateTable"
                  wabaNumber={selectedWaba}
                  wabaSrno={wabaList.find((waba) => waba.mobileNo === selectedWaba)?.wabaSrno} // Pass wabaSrno
                  wabaList={wabaList}
                  data={filteredData}
                  fetchTemplateData={handleSearch}
                />
              </>
            </div>
          </CustomTabPanel>
        </Box>
      )}

      <Dialog
        header="Sync Templates"
        visible={syncStatusVisible}
        onHide={() => setSyncStatusVisible(false)}
        className="w-1/3"
        draggable={false}
      >
        <div className="flex flex-col gap-4">
          <AnimatedDropdown
            label="Sync Waba Account"
            id="syncWabaAccount"
            name="syncWabaAccount"
            options={wabaList.map((waba) => ({
              value: waba.wabaSrno,
              label: waba.name,
            }))}
            value={syncWabaId}
            onChange={(e) => {
              setSyncWabaId(e);
            }}
          />

          <UniversalButton
            id="syncTemplates"
            name="syncTemplates"
            label="Sync"
            // icon={<IoSearch />}
            onClick={handleSyncTemplate}
            variant="primary"
          />
        </div>
      </Dialog>
    </div>
  );
};

export default ManageTemplate;
