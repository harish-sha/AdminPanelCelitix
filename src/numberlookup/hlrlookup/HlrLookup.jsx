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
          setCountryCodes(response);
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
      toast?.error("Please select country code and enter a valid mobile number.");
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
      }
      else {
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
    // <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 ">
    //   {/* Left Panel */}
    //   <div className="w-full bg-gray-100 rounded-lg shadow p-3">
    //     <div className="flex items-center mb-6">
    //       {/* Country Code */}
    //       <select
    //         name="countrycode"
    //         id="countrycode"
    //         value={countryCode}
    //         onChange={(e) => setCountryCode(e.target.value)}
    //         className="h-11 px-3 text-sm border border-gray-300 rounded-l-full bg-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500/30 transition"
    //       >
    //         <option value="91">🇮🇳 +91</option>
    //         <option value="1">🇺🇸 +1</option>
    //         <option value="44">🇬🇧 +44</option>
    //       </select>

    //       {/* Mobile Input */}
    //       <input
    //         type="text"
    //         placeholder="Enter Number..."
    //         value={mobileNo}
    //         onChange={handleNumberChange}
    //         maxLength={15}
    //         inputMode="numeric"
    //         className="flex-1 h-11 px-4 text-sm placeholder-gray-400 bg-gray-300  border-t border-b border-gray-300 focus:outline-none focus:ring focus:ring-blue-500/30 focus:border-blue-500 transition"
    //       />

    //       {/* Lookup Button */}
    //       <button
    //         className={`h-11 px-5 text-white text-sm md:text-md font-semibold rounded-r-full shadow transition 
    //           ${isValid && !isFetching
    //             ? "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 focus:ring focus:ring-blue-500/40"
    //             : "bg-gray-400 cursor-not-allowed"
    //           }`}
    //         onClick={handleNumberLookup}
    //         disabled={!isValid || isFetching}
    //         aria-busy={isFetching}
    //       >
    //         {isFetching ? "Checking..." : " Lookup"}
    //       </button>
    //     </div>

    //     {/* Table */}
    //     <div className="overflow-hidden rounded-md border border-gray-200">
    //       <table className="w-full text-sm text-left border-collapse">
    //         <tbody>
    //           <tr className="odd:bg-gray-50">
    //             <td className="w-50 border border-gray-200 p-3 font-medium text-gray-700">
    //               Mobile No
    //             </td>
    //             <td className="border border-gray-200 p-3 text-gray-600">
    //               {result?.mobile || "-"}
    //             </td>
    //           </tr>
    //           <tr className="odd:bg-gray-50">
    //             <td className="w-50 border border-gray-200 p-3 font-medium text-gray-700">
    //               Lookup Status
    //             </td>
    //             <td className="border border-gray-200 p-3 text-green-600 font-semibold">
    //               {result?.lookupStatus || "-"}
    //             </td>
    //           </tr>
    //           <tr className="odd:bg-gray-50">
    //             <td className="w-50 border border-gray-200 p-3 font-medium text-gray-700">
    //               Lookup Description
    //             </td>
    //             <td className="border border-gray-200 p-3 text-gray-600">
    //               {result?.lookupDescription || "-"}
    //             </td>
    //           </tr>
    //           <tr className="odd:bg-gray-50">
    //             <td className="w-50 border border-gray-200 p-3 font-medium text-gray-700">
    //               Original Operator
    //             </td>
    //             <td className="border border-gray-200 p-3 text-gray-600">
    //               {result?.originalOperator || "-"}
    //             </td>
    //           </tr>
    //           <tr className="odd:bg-gray-50">
    //             <td className="w-50 border border-gray-200 p-3 font-medium text-gray-700">
    //               Original Circle
    //             </td>
    //             <td className="border border-gray-200 p-3 text-gray-600">
    //               {result?.originalCircle || "-"}
    //             </td>
    //           </tr>
    //           <tr className="odd:bg-gray-50">
    //             <td className="w-50 border border-gray-200 p-3 font-medium text-gray-700">
    //               Ported
    //             </td>
    //             <td className="border border-gray-200 p-3 text-gray-600">
    //               {result?.ported
    //                 ? "Yes"
    //                 : result?.ported === false
    //                   ? "No"
    //                   : "-"}
    //             </td>
    //           </tr>
    //           <tr className="odd:bg-gray-50">
    //             <td className="w-50 border border-gray-200 p-3 font-medium text-gray-700">
    //               Ported Operator
    //             </td>
    //             <td className="border border-gray-200 p-3 text-gray-600">
    //               {result?.portedOperator || "-"}
    //             </td>
    //           </tr>
    //           <tr className="odd:bg-gray-50">
    //             <td className="w-50 border border-gray-200 p-3 font-medium text-gray-700">
    //               Ported Circle
    //             </td>
    //             <td className="border border-gray-200 p-3 text-gray-600">
    //               {result?.portedCircle || "-"}
    //             </td>
    //           </tr>
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>

    //   {/* Right Panel */}
    //   <div className="w-full bg-gray-100 rounded-lg shadow p-3">
    //     <div className=" flex flex-col md:flex-row  gap-4">
    //       <label className="bg-white shadom rounded-md px-2 py-0.5 ">
    //         <input
    //           type="radio"
    //           name="Copy-Paste"
    //           value="Copy-Paste"
    //           checked={selectedOption === "Copy-Paste"}
    //           onChange={handleChange}
    //           className="mr-1 text-blue-800"
    //         />
    //         <span className="text-blue-700 font-medium text-sm">
    //           {" "}
    //           Copy-Paste{" "}
    //         </span>
    //       </label>

    //       <label className="bg-white shadom rounded-md px-2 py-0.5 ">
    //         <input
    //           type="radio"
    //           name="import-copy"
    //           value="Import-Copy"
    //           checked={selectedOption === "Import-Copy"}
    //           onChange={handleChange}
    //           className="mr-1 text-blue-800"
    //         />
    //         <span className="text-blue-700 font-medium"> Import-Copy </span>
    //       </label>
    //     </div>

    //     <div className="mt-4 flex flex-col">
    //       <textarea
    //         placeholder="Mobile Box- Comma or Enter Separated "
    //         className="md:w-75 h-64  p-3 text-sm text-gray-600 bg-white border border-gray-200 rounded-md  "
    //       />
    //       <span className="mt-1">valid: +Invalid: = Total: </span>
    //     </div>
    //     <button className="mt-4 w-42 h-8 bg-blue-900 text-white font-semeibold rounded-md hover:bg-blue-800 transition">
    //       {" "}
    //       Remove Duplicate{" "}
    //     </button>
    //   </div>
    // </div>

    <div className=" bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded">
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Panel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-md p-6 border border-slate-100"
        >
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Search className="text-indigo-500" /> Number Lookup
          </h2>
          <p className="text-sm text-slate-500 mb-4">
            Please <span className="font-medium text-blue-700">select a country code </span>
            and <span className="font-medium text-blue-600">enter a valid mobile number </span>
            to perform the lookup.
          </p>

          <div className="flex items-center mb-3 border rounded-full px-1 py-1">
            <div className="w-56">
              <DropdownWithSearch
                id="selectCountryCode"
                name="selectCountryCode"
                options={formattedCountryOptions}
                value={countryCode}
                onChange={(val) => {
                  setCountryCode(val);
                  setIsValid(mobileNo.length >= 8 && val !== "");
                }}
                placeholder="Select country..."
              />
            </div>

            {/* Mobile Input */}
            <input
              type="text"
              placeholder="Enter mobile number..."
              value={mobileNo}
              onChange={handleNumberChange}
              maxLength={15}
              inputMode="numeric"
              className="flex-1 h-10 px-4 text-sm placeholder-slate-400 bg-slate-50 border-t border-b border-slate-300 focus:outline-none  transition"
            />

            {/* Lookup Button */}
            <button
              onClick={handleNumberLookup}
              disabled={!isValid || isFetching}
              className={`h-10 px-6 text-white text-sm font-semibold rounded-r-full shadow transition ${isValid && !isFetching
                ? "bg-gradient-to-r from-blue-500 to-blue-500 tracking-wider cursor-pointer"
                : "bg-slate-300 cursor-not-allowed"
                }`}
            >
              {isFetching ? "Checking..." : "Lookup"}
            </button>
          </div>


          {/* Counter */}
          <div className="text-xs text-slate-500 mb-5">
            {countryCode ? `Selected: +${countryCode}` : "Please select a country"} | {mobileNo.length}/15 digits
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
                  ["Ported", result?.ported ? "Yes" : result?.ported === false ? "No" : "-"],
                  ["Ported Operator", result?.portedOperator],
                  ["Ported Circle", result?.portedCircle],
                ].map(([label, value], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                    <td className="w-1/3 border border-slate-200 p-3 font-medium text-slate-700">
                      {label}
                    </td>
                    <td className={`border border-slate-200 p-3 ${label === "Lookup Status" ? "text-green-600 font-semibold" : "text-slate-600"}`}>
                      {value || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>

        {/* Right Panel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-md p-6 border border-slate-100"
        >
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <CloudUpload className="text-blue-500" /> Bulk Lookup
          </h2>

          {/* Radio Options */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <label className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm cursor-pointer transition ${selectedOption === "Copy-Paste" ? "bg-indigo-50 border border-indigo-400" : "bg-slate-50 border border-slate-200"}`}>
              <input
                type="radio"
                value="Copy-Paste"
                checked={selectedOption === "Copy-Paste"}
                onChange={handleChange}
                className="text-indigo-600"
              />
              <ContentCopy className="text-blue-500" />
              <span className="text-sm font-medium text-slate-700">Copy-Paste</span>
            </label>

            <label className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm cursor-pointer transition ${selectedOption === "Import-Copy" ? "bg-indigo-50 border border-indigo-400" : "bg-slate-50 border border-slate-200"}`}>
              <input
                type="radio"
                value="Import-Copy"
                checked={selectedOption === "Import-Copy"}
                onChange={handleChange}
                className="text-indigo-600"
              />
              <CloudUpload className="text-blue-500" />
              <span className="text-sm font-medium text-slate-700">Import File</span>
            </label>
          </div>

          {/* Textarea */}
          <textarea
            placeholder="Enter mobile numbers (comma or newline separated)"
            value={numbersInput}
            type="number"
            onChange={(e) => setNumbersInput(e.target.value)}
            className="w-full h-56 p-3 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-400/30 transition"
          />

          <div className="mt-2 text-sm text-slate-500">Valid: {validCount || 0} | Invalid: {invalidCount || 0} | Total: {totalCount || 0}</div>
          <div className="w-full flex items-center justify-center mt-2">
            <UniversalButton label="Remove Duplicates" onClick={handleRemoveDuplicates} />
          </div>
          {results.length > 0 && (
            <div className="mt-4 border rounded-xl overflow-hidden">
              <div className="max-h-64 overflow-y-auto scrollbar-hide">
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-slate-100 text-slate-700 sticky top-0 z-10">
                    <tr>
                      <th className="p-2 border border-slate-200 text-center">Number</th>
                      <th className="p-2 border border-slate-200 text-center">Status</th>
                      <th className="p-2 border border-slate-200 text-center">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={i} className={r.valid ? "bg-green-50" : "bg-red-50"}>
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


        </motion.div>
      </div>
    </div>
  );
};

export default HlrLookup;
