import React, { useState, useEffect } from "react";
import { fetchIpDetails } from "../../apis/settings/setting";
import ManageIpDetailsTable from "../components/IpDetailsTable";

const LoginIpDetails = () => {
  const [ipDetails, setIpDetails] = useState([]);
  const IpDetails = async () => {
    const response = await fetchIpDetails();
    setIpDetails(response);
  };

  useEffect(() => {
    IpDetails();
  }, []);
  return (
    <>
      <h1 className='text-xl font-semibold text-gray-700 mb-3' >Login Ip Details</h1>
      <div className="w-full">
        <ManageIpDetailsTable
          id="whatsAppSummaryReport"
          name="whatsAppSummaryReport"
          data={ipDetails}
        />
      </div>
    </>
  );
};

export default LoginIpDetails;
