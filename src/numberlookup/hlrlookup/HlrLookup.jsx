import React, { useState, useEffect } from "react";
import InputField from "@/components/layout/InputField";
import RadioGroupField from "@/whatsapp/components/RadioGroupField";
import { addSingleHlrData } from "@/apis/HlrLookup/HlrLookup.js";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Search, ContentCopy, CloudUpload } from "@mui/icons-material";
import { getCountryList } from "@/apis/common/common";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import UniversalButton from "@/components/common/UniversalButton";
import OneTimeDropdown from "./components/OneTimeDropdown";
import { FcApproval } from "react-icons/fc";

const HlrLookup = () => {
  const [selectedOption, setSelectedOption] = useState("Copy-Paste");
  const [numbersInput, setNumbersInput] = useState("");
  const [results, setResults] = useState([]);

  const [countryCode, setCountryCode] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [result, setResult] = useState(null);
  const [countryCodes, setCountryCodes] = useState([]);
  const [isValid, setIsValid] = useState(false);

  const handleNumberChange = (e) => {
    const value = e.target.value.replace(/\\D/g, "");
    setMobileNo(value);
    setIsValid(value.length >= 8 && countryCode !== "");
  };

  useEffect(() => {
    const fetchCountryList = async () => {
      try {
        const response = await getCountryList();
        if (response) {
          // getCountryList(response);
          const uniqueArray = [
            ...new Map(
              response.map((item) => [item.countryCode, item])
            ).values(),
          ];
          setCountryCodes(uniqueArray);
        } else {
          console.error("Failed to fetch Country List!");
          toast.error("Failed to load Country List");
        }
      } catch (error) {
        console.error("Error fetching country List:", error);
        toast.error("Error fetching country List.");
      }
    };
    fetchCountryList();
  }, []);

  const formattedCountryOptions = countryCodes.map((c) => ({
    value: c.countryCode.toString(),
    label: `+${c.countryCode} - ${c.countryName}`,
  }));

  const fullNumber = `+${countryCode}${mobileNo}`;

  const handleNumberLookup = async () => {
    if (!isValid) {
      toast?.error(
        "Please select country code and enter a valid mobile number."
      );
      return;
    }
    try {
      setIsFetching(true);
      setResult(null);

      const apiNumber = `${countryCode}${mobileNo}`;
      const response = await addSingleHlrData({ mobileno: apiNumber });

      if (response?.error) {
        setResult(null);
        toast?.error(response.error || "Lookup failed. Try again.");
        return;
      }

      if (response) {
        const data = {
          mobile: `+${countryCode} ${mobileNo}`,
          lookupStatus: response?.["Lookup Status"],
          lookupDescription: response?.["Lookup Description"],
          originalOperator: response?.["Original Operator"],
          originalCircle: response?.["Original Circle"],
          ported: response?.["Ported"]?.toLowerCase?.() === "yes",
          portedOperator: response?.["Ported Operator"],
          portedCircle: response?.["Ported Circle"],
        };

        setResult(data);
        toast?.success("Lookup complete");
      } else {
        setResult(null);
        toast?.error("Lookup failed. Try again.");
      }
    } catch (error) {
      console.error("Error fetching number lookup data:", error);
      toast?.error("Lookup failed. Try again.");
      setResult(null);
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const validateNumber = (num) => {
    let cleaned = num.replace(/\D/g, ""); // keep only digits

    if (!cleaned) return { number: num, valid: false, reason: "Empty value" };
    if (cleaned.length < 8)
      return { number: num, valid: false, reason: "Too short (<8 digits)" };
    if (cleaned.length > 15)
      return { number: num, valid: false, reason: "Too long (>15 digits)" };

    return { number: cleaned, valid: true, reason: "Valid" };
  };

  const handleRemoveDuplicates = () => {
    let splitNumbers = numbersInput
      .split(/[\n,]+/) // split by newline or comma
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    let uniqueNumbers = [...new Set(splitNumbers)]; // remove duplicates
    let validated = uniqueNumbers.map(validateNumber);

    setResults(validated);
  };

  const validCount = results.filter((r) => r.valid).length;
  const invalidCount = results.filter((r) => !r.valid).length;
  const totalCount = results.length;
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 md:p-4 p-0 rounded-2xl">
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-md p-2 md:p-6 border border-slate-100 md:col-span-2"
        >
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center justify-center md:justify-start gap-2">
            <Search className="text-indigo-500" /> Number Lookup
          </h2>
          <p className="text-sm text-slate-500 mb-4">
            Please{" "}
            <span className="font-medium text-blue-700">
              select a country code{" "}
            </span>
            and{" "}
            <span className="font-medium text-blue-600">
              enter a valid mobile number{" "}
            </span>
            to perform the lookup.
          </p>

          <div className="w-full">
            <div className="flex flex-col lg:flex-row items-stretch space-y-2">
              {/* Country code */}
              <div className="w-full lg:max-w-60">
                <OneTimeDropdown
                  options={formattedCountryOptions} // [{label, value}]
                  value={countryCode}
                  onChange={(val) => {
                    setCountryCode(val);
                    setIsValid(mobileNo.length >= 8 && val !== "");
                  }}
                  matchMode="startsWith"
                  classNameMain="flex h-11 items-center bg-white border rounded-md lg:rounded-l-full lg:rounded-r-none"
                />
              </div>

              {/* Phone + Button */}
              <div className="flex flex-col sm:flex-row w-full h-24 md:h-auto space-y-2">
                <input
                  type="text"
                  placeholder="Enter mobile number..."
                  value={mobileNo}
                  onChange={handleNumberChange}
                  maxLength={15}
                  inputMode="numeric"
                  className="h-11 px-4 text-sm placeholder-slate-400 bg-slate-50
          border border-slate-300 focus:outline-none 
          rounded-md sm:rounded-md lg:rounded-none lg:rounded-l-none
          flex-1 min-w-0 
        "
                  aria-label="Mobile number"
                />

                <button
                  onClick={handleNumberLookup}
                  disabled={!isValid || isFetching}
                  className={`
          h-11 px-6 text-white text-sm font-semibold shadow transition
          rounded-md sm:rounded-md lg:rounded-r-full
          ${isValid && !isFetching
                      ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                      : "bg-slate-300 cursor-not-allowed"
                    }
          w-full sm:w-auto
        `}
                  aria-disabled={!isValid || isFetching}
                >
                  {isFetching ? "Checking..." : "Lookup"}
                </button>
              </div>
            </div>
          </div>

          {/* Counter */}
          <div className="text-xs text-slate-500 mt-2 md:mt-0 mb-5">
            {countryCode
              ? `Selected: +${countryCode}`
              : "Please select a country"}{" "}
            | {mobileNo.length}/15 digits
          </div>

          {/* Results Table */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="overflow-hidden rounded-lg border border-slate-200"
          >
            <table className="w-full text-sm text-left border-collapse">
              <tbody>
                {[
                  ["Mobile No", result?.mobile],
                  ["Lookup Status", result?.lookupStatus],
                  ["Lookup Description", result?.lookupDescription],
                  ["Original Operator", result?.originalOperator],
                  ["Original Circle", result?.originalCircle],
                  [
                    "Ported",
                    result?.ported
                      ? "Yes"
                      : result?.ported === false
                        ? "No"
                        : "-",
                  ],
                  ["Ported Operator", result?.portedOperator],
                  ["Ported Circle", result?.portedCircle],
                ].map(([label, value], i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}
                  >
                    <td className="w-1/3 border border-slate-200 p-3 font-medium text-slate-700">
                      {label}
                    </td>
                    <td
                      className={`border border-slate-200 p-3 ${label === "Lookup Status"
                        ? "text-green-600 font-semibold"
                        : "text-slate-600"
                        }`}
                    >
                      {value || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-md p-4 md:p-6 border border-slate-100 flex flex-col space-y-5 md:col-span-1"
        >
          {/* Title */}
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            📌 Helpful Notes
          </h2>

          {/* Key Tips */}
          <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
            <li>
              Country codes are mandatory for international number lookup.
            </li>
            <li>
              Mobile numbers usually contain{" "}
              <span className="font-medium text-blue-700">8–15 digits</span>.
            </li>
            <li>
              Ported numbers may show different operator/circle information.
            </li>
            <li>
              Lookup can help in fraud detection and user validation.
            </li>
          </ul>

          {/* Example */}
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-xs text-indigo-700">
            <span className="font-medium">Example:</span> +91 9876543210 <br />
            → India (Reliance Jio, Maharashtra)
          </div>

          {/* Mini Info Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 border rounded-lg text-center">
              <p className="text-xs text-slate-500">Most Common</p>
              <p className="text-sm font-semibold text-slate-700">+91 (India)</p>
            </div>
            <div className="p-3 bg-slate-50 border rounded-lg text-center">
              <p className="text-xs text-slate-500">Longest Number</p>
              <p className="text-sm font-semibold text-slate-700">15 Digits</p>
            </div>
          </div>

          {/* Do’s & Don’ts */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-2">✅ Do’s & ❌ Don’ts</h3>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>✅ Always include the <span className="font-medium">country code</span>.</li>
              <li>✅ Double-check before bulk lookup.</li>
              <li>❌ Don’t enter <span className="font-medium">special characters</span>.</li>
              <li>❌ Avoid spaces between digits.</li>
            </ul>
          </div>

          {/* Quick Reference Table */}
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-xs text-slate-600">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-2 py-1 text-left">Country</th>
                  <th className="px-2 py-1 text-left">Code</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["India", "+91"],
                  ["USA", "+1"],
                  ["UK", "+44"],
                  ["UAE", "+971"],
                ].map(([country, code], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-2 py-1">{country}</td>
                    <td className="px-2 py-1 font-medium">{code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Callout Tip */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">
            💡 Tip: If a number is invalid, try removing leading zeros or re-checking
            the country code.
          </div>
        </motion.div>

        {/* Right Panel */}
        {/* <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-md p-2 md:p-6 border border-slate-100"
        >
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center justify-center md:justify-start gap-2">
            <CloudUpload className="text-blue-500" /> Bulk Lookup
          </h2>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <label
              className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm cursor-pointer transition ${selectedOption === "Copy-Paste"
                ? "bg-indigo-50 border border-indigo-400"
                : "bg-slate-50 border border-slate-200"
                }`}
            >
              <input
                type="radio"
                value="Copy-Paste"
                checked={selectedOption === "Copy-Paste"}
                onChange={handleChange}
                className="text-indigo-600"
              />
              <ContentCopy className="text-blue-500" />
              <span className="text-sm font-medium text-slate-700">
                Copy-Paste
              </span>
            </label>

            <label
              className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm cursor-pointer transition ${selectedOption === "Import-Copy"
                ? "bg-indigo-50 border border-indigo-400"
                : "bg-slate-50 border border-slate-200"
                }`}
            >
              <input
                type="radio"
                value="Import-Copy"
                checked={selectedOption === "Import-Copy"}
                onChange={handleChange}
                className="text-indigo-600"
              />
              <CloudUpload className="text-blue-500" />
              <span className="text-sm font-medium text-slate-700">
                Import File
              </span>
            </label>
          </div>

          <textarea
            placeholder="Enter mobile numbers (comma or newline separated)"
            value={numbersInput}
            type="number"
            onChange={(e) => setNumbersInput(e.target.value)}
            className="w-full h-56 p-3 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-400/30 transition"
          />

          <div className="mt-2 text-sm text-slate-500">
            Valid: {validCount || 0} | Invalid: {invalidCount || 0} | Total:{" "}
            {totalCount || 0}
          </div>
          <div className="w-full flex items-center justify-center mt-2">
            <UniversalButton
              label="Remove Duplicates"
              onClick={handleRemoveDuplicates}
            />
          </div>
          {results.length > 0 && (
            <div className="mt-4 border rounded-xl overflow-hidden">
              <div className="max-h-64 overflow-y-auto scrollbar-hide">
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-slate-100 text-slate-700 sticky top-0 z-10">
                    <tr>
                      <th className="p-2 border border-slate-200 text-center">
                        Number
                      </th>
                      <th className="p-2 border border-slate-200 text-center">
                        Status
                      </th>
                      <th className="p-2 border border-slate-200 text-center">
                        Reason
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr
                        key={i}
                        className={r.valid ? "bg-green-50" : "bg-red-50"}
                      >
                        <td className="p-2 border border-slate-200 text-slate-700">
                          {r.number}
                        </td>
                        <td className="p-2 border border-slate-200 font-medium">
                          {r.valid ? "Valid" : "Invalid"}
                        </td>
                        <td className="p-2 border border-slate-200 text-slate-500">
                          {r.reason}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div> */}
      </div>
    </div>
  );
};

export default HlrLookup;
