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
      <h1 className="mb-3 text-xl font-semibold text-gray-700">
        Login Ip Details
      </h1>
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
