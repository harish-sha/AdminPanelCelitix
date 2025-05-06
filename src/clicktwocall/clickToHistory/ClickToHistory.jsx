import React, { useState } from "react";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import UniversalDatePicker from "../../whatsapp/components/UniversalDatePicker";
import InputField from "../../whatsapp/components/InputField";
import ClickTwoCallTable from "./component/ClickTwoCallTable";

import { IoSearch } from "react-icons/io5";
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';



const ClickToHistory = () => {
  const [ctwocfromnumber, setCtwocfromnumber] = useState("");
  const [ctwoctonumber, setCtwoctonumber] = useState("");

  // export button
  const handleCtwoCCallHistoryExportBtn = () => { };

  // handle from number
  const handlectwocfromnumber = (e) => {
    setCtwocfromnumber(e.target.value);
  };

  // handle two
  const handlctwoctonumber = () => {
    setCtwoctonumber(e.targe.value);
  };

  // handle search button
  const handleCTwoCSearchCallHistoryBtn = () => { };

  return (
    <div className="p-1">
      <div className="flex justify-between flex-col lg:flex-row md:flex-row">
        <h1 className="w-full font-semibold">Call History</h1>

        {/* Export Btn */}
        <div className="w-max-content my-2 lg:m-0">
          <UniversalButton
            id="exportBtn"
            name="exportBtn"
            label="Export"
            icon={<IosShareOutlinedIcon sx={{ marginBottom: '3px', fontSize: '1.1rem' }} />}
            onClick={handleCtwoCCallHistoryExportBtn}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 my-3 ">
        {/* Total Calls */}
        <div className="bg-gray-50 border-l-4 border-blue-500 rounded-lg shadow-sm p-4 w-full">
          <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
            Total Calls{" "}
            <InfoOutlinedIcon className="!text-gray-400" fontSize="small" />
          </div>
          <div className="mt-2 text-xl font-bold text-black">0</div>
        </div>

        {/* Received Calls */}
        <div className="bg-gray-50 border-l-4 border-green-500 rounded-lg shadow-sm p-4 w-full">
          <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
            Received Calls{" "}
            <InfoOutlinedIcon className="!text-gray-400" fontSize="small" />
          </div>
          <div className="mt-2 text-xl font-bold text-black">0</div>
        </div>

        {/* Missed Calls */}
        <div className="bg-gray-50 border-l-4 rounded-lg shadow-sm p-4 w-full">
          <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
            Missed Calls{" "}
            <InfoOutlinedIcon className="!text-gray-400" fontSize="small" />
          </div>
          <div className="mt-2 text-xl font-bold text-black">0</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-end justify-start  mb-5 w-full">
        <div className="w-full sm:w-56">
          <UniversalDatePicker label="From Date:" />
        </div>

        <div className="w-full sm:w-56">
          <UniversalDatePicker label="To Date:" />
        </div>

        <div className="w-full sm:w-56">
          <InputField
            label="From Number"
            id="fromnumber"
            name="fromnumber"
            value={ctwocfromnumber}
            onChange={handlectwocfromnumber}
            placeholder="From number"
            type="number"
          />
        </div>

        <div className="w-full sm:w-56">
          <InputField
            label="To Number"
            id="tonuber"
            name="tonumber"
            value={ctwoctonumber}
            onChange={handlctwoctonumber}
            placeholder="To number"
            type="number"
          />
        </div>

        <div className="flex items-center justify-center">
          <UniversalButton
            id="searchcallhistorybtn"
            name="searchcallhistorybtn"
            label="Search"
            icon={<IoSearch />}
            onClick={handleCTwoCSearchCallHistoryBtn}
          />
        </div>
      </div>

      <div className="w-full">
        <ClickTwoCallTable />
      </div>
    </div>
  );
};

export default ClickToHistory;
