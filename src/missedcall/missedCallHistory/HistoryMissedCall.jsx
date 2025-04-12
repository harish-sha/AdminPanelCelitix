// import React from 'react'

// const HistoryMissedCall = () => {
//   return (
//     <div>HistoryMissedCall</div>
//   )
// }

// export default HistoryMissedCall

import React, { useState } from "react";

import InputField from "../../whatsapp/components/InputField";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import UniversalDatePicker from "../../whatsapp/components/UniversalDatePicker";
import MissedCallTable from "./component/MissedCallTable";


import { IoSearch } from "react-icons/io5";
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';

const HistoryMissedCall = () => {
  const [missedcallnumber, setMissedcallnumber] = useState("");
  const [fromnumber, setFromnumber] = useState("");

  // export button
  const handleCallHistoryExportBtn = () => { };

  //handle missed call
  const handlemissedcallednumber = (e) => {
    setMissedcallnumber(e.target.value);
  };

  //handle from number
  const handlefromnumber = (e) => {
    setFromnumber(e.target.value);
  };

  // handle search button
  const handleSearchCallHistoryBtn = () => { };

  return (
    <div className="p-1">
      <div className="flex justify-between flex-col lg:flex-row md:flex-row">
        <h1 className="font-semibold">Call History</h1>

        <div className="w-max-content my-2 lg:m-0 md:m-0">
          <UniversalButton
            id="exportBtn"
            name="exportBtn"
            label="Export"
            icon={
              <IosShareOutlinedIcon
                sx={{ marginBottom: "3px", fontSize: "1.1rem" }}
              />
            }
            onClick={handleCallHistoryExportBtn}
          />
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
            label="Missed Call Number"
            id="missedcallnuber"
            name="missedcallnumber"
            value={missedcallnumber}
            onChange={handlemissedcallednumber}
            placeholder="Missed Call number"
          />
        </div>

        <div className="w-full sm:w-56">
          <InputField
            label="From Number"
            id="fromnuber"
            name="fromnumber"
            value={fromnumber}
            onChange={handlefromnumber}
            placeholder="From number"
          />
        </div>

        <div className="flex items-center justify-center ">
          <UniversalButton
            id="searchcallhistorybtn"
            name="searchcallhistorybtn"
            label="Search"
            icon={<IoSearch />}
            onClick={handleSearchCallHistoryBtn}
          />
        </div>
      </div>

      <div className="mt-2">
        <MissedCallTable />
      </div>
    </div>
  );
};

export default HistoryMissedCall;
