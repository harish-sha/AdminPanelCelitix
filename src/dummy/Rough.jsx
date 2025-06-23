import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2"; // For Line chart
import DatePicker from "react-datepicker"; // For date range picker
import "react-datepicker/dist/react-datepicker.css"; // Import the styles for date picker
import { Tailwind } from "tailwindcss"; // Tailwind for styling

// Simulating API response for usage data
const getWalletUsageData = async (startDate, endDate) => {
  const response = await fetch(`/api/usage?startDate=${startDate}&endDate=${endDate}`);
  const data = await response.json();
  return data;
};

const Dashboard = () => {
  const [walletUsageData, setWalletUsageData] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2025-01-01"));
  const [endDate, setEndDate] = useState(new Date("2025-06-19"));
  const [loading, setLoading] = useState(false);

  // Fetch usage data on component load or when dates change
  const fetchUsageData = async () => {
    setLoading(true);
    try {
      const data = await getWalletUsageData(startDate, endDate);
      setWalletUsageData(data);
    } catch (error) {
      console.error("Error fetching usage data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsageData();
  }, [startDate, endDate]);

  // Prepare data for the graph
  const chartData = {
    labels: walletUsageData.map(item => item.date), // Dates on x-axis
    datasets: [
      {
        label: "Wallet Usage",
        data: walletUsageData.map(item => item.walletUsage), // Wallet usage on y-axis
        fill: false,
        borderColor: "#4CAF50", // Green line
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Wallet Usage Statistics</h2>
      <div className="mb-6">
        <label className="text-gray-600">Select Date Range</label>
        <div className="flex gap-4 items-center">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="p-2 border border-gray-300 rounded"
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            className="p-2 border border-gray-300 rounded"
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
          />
        </div>
      </div>

      <div className="mb-6">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader" /> {/* You can use a spinner here */}
          </div>
        ) : (
          <Line data={chartData} options={{ responsive: true }} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
