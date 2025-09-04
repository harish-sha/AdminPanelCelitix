import React, { useState, useEffect } from "react";
import InputField from "@/components/layout/InputField";
import RadioGroupField from "@/whatsapp/components/RadioGroupField";
import { addSingleHlrData } from "@/apis/HlrLookup/HlrLookup.js";
import { toast } from "react-hot-toast";

const HlrLookup = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [result, setResult] = useState(null);

  const onlyDigits10 = (v) => v.replace(/\D/g, "").slice(0, 13);

  const handleNumberChange = (e) => {
    const clean = onlyDigits10(e.target.value);
    setMobileNo(clean);
  };

  const fullNumber = `${countryCode}${mobileNo}`.trim();
  const isValid =
    countryCode === "91" ? mobileNo.length === 13 : mobileNo.length > 0;

  const handleNumberLookup = async () => {
    if (!isValid) {
      toast?.error("Please enter a valid mobile number.");
      return;
    }

    try {
      setIsFetching(true);
      setResult(null);
      const response = await addSingleHlrData({ mobileno: fullNumber });
      // const data =
      //   typeof response?.json === "function" ? await response.json() : response;

      if (response?.success) {
        const data = {
          mobile: response.data?.["Mobile No"],
          lookupStatus: response.data?.["Lookup Status"],
          lookupDescription: response.data?.["Lookup Description"],
          originalOperator: response.data?.["Original Operator"],
          originalCircle: response.data?.["Original Circle"],
          ported: response.data?.["Ported"]?.toLowerCase?.() === "yes",
          portedOperator: response.data?.["Ported Operator"],
          portedCircle: response.data?.["Ported Circle"],
        };

        setResult(data);
        toast?.success(response.message || "Lookup complete");
      } else {
        setResult(null);
        toast?.error(response?.message || "Lookup failed. Try again.");
      }
    } catch (error) {
      console.error("Error fetching number lookup data:", error);
      toast?.error("Lookup failed. Try again.");
      setResult(null);
    } finally {
      setIsFetching(false);
    }
  };

  const handleChangeOption = (e) => setSelectedOption(e.target.value);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 ">
      {/* Left Panel */}
      <div className="w-full bg-gray-100 rounded-lg shadow p-3">
        <div className="flex items-center mb-6">
          {/* Country Code */}
          <select
            name="countrycode"
            id="countrycode"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="h-11 px-3 text-sm border border-gray-300 rounded-l-full bg-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500/30 transition"
          >
            <option value="91">🇮🇳 +91</option>
            <option value="1">🇺🇸 +1</option>
            <option value="44">🇬🇧 +44</option>
          </select>

          {/* Mobile Input */}
          <input
            type="text"
            placeholder="Enter Number..."
            value={mobileNo}
            onChange={handleNumberChange}
            maxLength={15}
            inputMode="numeric"
            className="flex-1 h-11 px-4 text-sm placeholder-gray-400 bg-gray-300  border-t border-b border-gray-300 focus:outline-none focus:ring focus:ring-blue-500/30 focus:border-blue-500 transition"
          />

          {/* Lookup Button */}
          <button
            className={`h-11 px-5 text-white text-sm md:text-md font-semibold rounded-r-full shadow transition 
              ${isValid && !isFetching
                ? "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 focus:ring focus:ring-blue-500/40"
                : "bg-gray-400 cursor-not-allowed"
              }`}
            onClick={handleNumberLookup}
            disabled={!isValid || isFetching}
            aria-busy={isFetching}
          >
            {isFetching ? "Checking..." : " Lookup"}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-md border border-gray-200">
          <table className="w-full text-sm text-left border-collapse">
            <tbody>
              <tr className="odd:bg-gray-50">
                <td className="w-50 border border-gray-200 p-3 font-medium text-gray-700">
                  Mobile No
                </td>
                <td className="border border-gray-200 p-3 text-gray-600">
                  {result?.mobile || "-"}
                </td>
              </tr>
              <tr className="odd:bg-gray-50">
                <td className="w-50 border border-gray-200 p-3 font-medium text-gray-700">
                  Lookup Status
                </td>
                <td className="border border-gray-200 p-3 text-green-600 font-semibold">
                  {result?.lookupStatus || "-"}
                </td>
              </tr>
              <tr className="odd:bg-gray-50">
                <td className="w-50 border border-gray-200 p-3 font-medium text-gray-700">
                  Lookup Description
                </td>
                <td className="border border-gray-200 p-3 text-gray-600">
                  {result?.lookupDescription || "-"}
                </td>
              </tr>
              <tr className="odd:bg-gray-50">
                <td className="w-50 border border-gray-200 p-3 font-medium text-gray-700">
                  Original Operator
                </td>
                <td className="border border-gray-200 p-3 text-gray-600">
                  {result?.originalOperator || "-"}
                </td>
              </tr>
              <tr className="odd:bg-gray-50">
                <td className="w-50 border border-gray-200 p-3 font-medium text-gray-700">
                  Original Circle
                </td>
                <td className="border border-gray-200 p-3 text-gray-600">
                  {result?.originalCircle || "-"}
                </td>
              </tr>
              <tr className="odd:bg-gray-50">
                <td className="w-50 border border-gray-200 p-3 font-medium text-gray-700">
                  Ported
                </td>
                <td className="border border-gray-200 p-3 text-gray-600">
                  {result?.ported
                    ? "Yes"
                    : result?.ported === false
                      ? "No"
                      : "-"}
                </td>
              </tr>
              <tr className="odd:bg-gray-50">
                <td className="w-50 border border-gray-200 p-3 font-medium text-gray-700">
                  Ported Operator
                </td>
                <td className="border border-gray-200 p-3 text-gray-600">
                  {result?.portedOperator || "-"}
                </td>
              </tr>
              <tr className="odd:bg-gray-50">
                <td className="w-50 border border-gray-200 p-3 font-medium text-gray-700">
                  Ported Circle
                </td>
                <td className="border border-gray-200 p-3 text-gray-600">
                  {result?.portedCircle || "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full bg-gray-100 rounded-lg shadow p-3">
        <div className=" flex flex-col md:flex-row  gap-4">
          <label className="bg-white shadom rounded-md px-2 py-0.5 ">
            <input
              type="radio"
              name="Copy-Paste"
              value="Copy-Paste"
              checked={selectedOption === "Copy-Paste"}
              onChange={handleChange}
              className="mr-1 text-blue-800"
            />
            <span className="text-blue-700 font-medium text-sm">
              {" "}
              Copy-Paste{" "}
            </span>
          </label>

          <label className="bg-white shadom rounded-md px-2 py-0.5 ">
            <input
              type="radio"
              name="import-copy"
              value="Import-Copy"
              checked={selectedOption === "Import-Copy"}
              onChange={handleChange}
              className="mr-1 text-blue-800"
            />
            <span className="text-blue-700 font-medium"> Import-Copy </span>
          </label>
        </div>

        <div className="mt-4 flex flex-col">
          <textarea
            placeholder="Mobile Box- Comma or Enter Separated "
            className="md:w-75 h-64  p-3 text-sm text-gray-600 bg-white border border-gray-200 rounded-md  "
          />
          <span className="mt-1">valid: +Invalid: = Total: </span>
        </div>
        <button className="mt-4 w-42 h-8 bg-blue-900 text-white font-semeibold rounded-md hover:bg-blue-800 transition">
          {" "}
          Remove Duplicate{" "}
        </button>
      </div>
    </div>
  );
};

export default HlrLookup;
