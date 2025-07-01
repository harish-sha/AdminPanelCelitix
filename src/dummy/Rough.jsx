import React, { useState, useEffect } from 'react';
import { useUser } from 'path-to-your-user-hook';  // Adjust based on your codebase
import { CountUp } from 'react-countup';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Star from '@mui/icons-material/Star';
import LoopIcon from '@mui/icons-material/Loop';  // Animated spinner

const YourComponent = () => {
  const { user } = useUser();

  // States to store balance, rechargableCredit, and the key for CountUp animation
  const [balance, setBalance] = useState(0);
  const [rechargableCredit, setRechargableCredit] = useState(0);
  const [showRefresh, setShowRefresh] = useState(false); // To show the spinner
  const [isLoading, setIsLoading] = useState(false); // To control when data is loading
  const [refreshKey, setRefreshKey] = useState(0); // Key to force reanimation of CountUp

  // Fetch Balance API Function
  const getBalance = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      const res = await fetchBalance(); // Your API call to get balance
      console.log("Balance response:", res);
      setBalance(parseFloat(res.balance));
      setRechargableCredit(parseFloat(res.rechargableCredit));

      // Update the refresh key to trigger the CountUp animation again
      setRefreshKey(prevKey => prevKey + 1); // Increment the key to trigger the animation
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setIsLoading(false); // Set loading state to false after fetching
    }
  };

  // Fetch balance on component mount
  useEffect(() => {
    getBalance();
  }, []);

  // Define the quickStats array
  const quickStats = [
    {
      icon: <AccountBalanceIcon className="text-green-900" />,
      label: "Current Balance",
      value: (
        <CountUp
          start={0}
          end={balance}
          separator=","
          decimals={2}
          duration={1.5}
          key={refreshKey} // Changing the key forces the CountUp to trigger the animation
        />
      ),
      onHover: () => setShowRefresh(true), // Show refresh spinner on hover
      onMouseLeave: () => setShowRefresh(false), // Hide refresh spinner when mouse leaves
    },
    ...(user.role === "RESELLER" ? [
      {
        icon: <GppMaybeIcon className="text-red-800" />,
        label: "Outstanding Balance",
        value: (
          <CountUp
            start={0}
            end={rechargableCredit}
            separator=","
            decimals={2}
            duration={1.5}
            key={refreshKey} // Changing the key forces the CountUp to trigger the animation
          />
        ),
      }
    ] : []),
    {
      icon: <TrendingUp className="text-blue-600" />,
      label: "Engagement Rate",
      value: "78%",
    },
    {
      icon: <Star className="text-yellow-500" />,
      label: "Client Rating",
      value: "4.8/5",
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 gap-4 grid-cols-1 items-center">
      {quickStats.map((stat, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow p-3 px-5 flex flex-col items-start justify-center relative"
          onMouseEnter={stat.onHover}
          onMouseLeave={stat.onMouseLeave}
        >
          {/* Show refresh spinner only on "Current Balance" card */}
          {stat.label === "Current Balance" && showRefresh && (
            <div className="absolute top-2 right-2">
              {isLoading ? (
                <LoopIcon className="text-[18px] animate-spin" /> // Animated spinner when loading
              ) : (
                <button
                  onClick={getBalance} // Trigger the API call when clicked
                  className="bg-blue-500 text-white p-2 rounded-full"
                >
                  <RefreshIcon />
                </button>
              )}
            </div>
          )}

          <div className="text-2xl">{stat.icon}</div>
          <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          <div className="font-semibold text-lg">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default YourComponent;
