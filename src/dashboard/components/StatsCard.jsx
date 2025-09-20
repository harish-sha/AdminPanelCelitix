import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import CountUp from "react-countup";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CustomTooltip from "@/components/common/CustomTooltip";
import { Loop as LoopIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Star } from "@mui/icons-material";
import StarHalfOutlinedIcon from "@mui/icons-material/StarHalfOutlined";
import { fetchBalance } from "@/apis/settings/setting";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

export default function StatsCard({
  title = "Glass Card",
  subtitle = "A subtle 3D glass UI",
  image = null,
  children,
  className = "",
}) {
  const cardRef = useRef(null);

  // motion values for rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(x, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(y, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const cardX = e.clientX - rect.left;
    const cardY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateAmountX = ((cardY - centerY) / centerY) * -10; // tilt up/down
    const rotateAmountY = ((cardX - centerX) / centerX) * 10; // tilt left/right

    x.set(rotateAmountX);
    y.set(rotateAmountY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    salesPersonId: "Not Assigned",
  });

  const [balance, setBalance] = useState(0);
  const [rechargableCredit, setRechargableCredit] = useState(0);
  const [showRefresh, setShowRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [allowedServices, setAllowServices] = useState([]);

  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("Whatsapp");
  const navigate = useNavigate();

  const quickStats = [
    {
      title: "Current Balance",
      value: (
        <div className="flex items-center gap-1">
          <CurrencyRupeeIcon fontSize="small" className="text-gray-900" />
          <CountUp
            start={0}
            end={balance}
            separator=","
            decimals={2}
            duration={1.5}
            key={refreshKey}
          />
        </div>
      ),
      showRefreshIcon: true,
      bgColor: "bg-indigo-100/60",
      textColor: "text-gray-900",
      // buttonColor: "text-gray-600",
      icon: <AccountBalanceIcon className="text-green-900" />,
    },
    {
      title: "Engagement Rate",
      value: "78%",
      bgColor: "bg-green-100/60",
      textColor: "text-gray-900",
      showRefreshIcon: false,
      // iconColor: "text-gray-600",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 17l10-10m0 0H9m8 0v8"
          />
        </svg>
      ),
    },
    {
      title: "Client Rating",
      value: "4.8/5",
      bgColor: "bg-teal-100/60",
      textColor: "text-gray-900",
      showRefreshIcon: false,
      // iconColor: "text-gray-600",
      icon: [
        <Star className="text-yellow-500" />,
        <Star className="text-yellow-500" />,
        <Star className="text-yellow-500" />,
        <Star className="text-yellow-500" />,
        <StarHalfOutlinedIcon className="text-yellow-500" />,
      ],
    },
    {
      title: "Sales Manager",
      value: formData.salesPersonId,
      bgColor: "bg-indigo-100/60",
      textColor: "text-gray-900",
      showRefreshIcon: false,
      // iconColor: "text-gray-600",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 17l10-10m0 0H9m8 0v8"
          />
        </svg>
      ),
    },
  ];

  const getBalance = async () => {
    setIsLoading(true);
    try {
      const res = await fetchBalance();
      setBalance(parseFloat(res.balance));
      setRechargableCredit(parseFloat(res.rechargableCredit));
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center md:items-end md:justify-start  gap-4 md:p-4 p-6">
      {quickStats.map((stat, i) => (
        <div
          key={i}
          className={`flex items-center justify-center   ${className}`}
          style={{ perspective: 1500 }}
        >
          <motion.div
            //  ref={cardRef}
            className="relative w-50  md:w-full rounded-3xl"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.0 }}
            transition={{ type: "spring", stiffness: 200, damping: 5 }}
          >
            {/* animated gradient back glow */}
            <div
              className="absolute inset-0 rounded-3xl blur-3xl opacity-70 animate-pulse"
              style={{
                background:
                  "conic-gradient(from 180deg at 50% 50%, rgba(129,140,248,0.25), rgba(236,72,153,0.25), rgba(34,211,238,0.2), rgba(129,140,248,0.25))",
                zIndex: 0,
                transform: "translateZ(-60px) scale(0.95)",
              }}
            />

            {/* main glass card */}
            <div
              className="relative z-10 rounded-3xl overflow-hidden border border-white/40 bg-white/10 backdrop-blur-xl shadow-2xl "
              style={{
                boxShadow:
                  "0 35px 80px rgba(2,6,23,0.2), inset 0 1px 1px rgba(255,255,255,0.06)",
                WebkitBackdropFilter: "blur(12px)",
                backdropFilter: "blur(12px)",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="relative flex flex-col justify-between p-4 md:p-5 w-80 h-28 sm:h-38 rounded-2xl shadow-sm backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div
                    className={`flex items-center gap-2  ${stat.textColor}`}
                  >
                    <span className="text-sm sm:text-xl font-semibold tracking-wide">{stat.title}</span>
                  </div>
                </div>
                <div
                  className={`text-xl sm:text-2xl font-bold ${stat.textColor}`}
                >
                  {stat.value}
                </div>
                <div className="absolute bottom-4 right-4  flex items-center justify-center cursor-pointer">
                  {stat.showRefreshIcon ? (
                    <CustomTooltip
                      title="Refresh Balance"
                      placement="top"
                      arrow
                    >
                      <div className="cursor-pointer">
                        {isLoading ? (
                          <LoopIcon className="text-[16px] sm:text-[18px] animate-spin text-blue-400 cursor-pointer" />
                        ) : (
                          <button onClick={getBalance}>
                            <LoopIcon className="text-blue-400 cursor-pointer" />
                          </button>
                        )}
                      </div>
                    </CustomTooltip>
                  ) : (
                    stat.icon
                  )}
                </div>
              </div>
            </div>

            {/* glossy overlay highlight */}
            {/* <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background:
                  "linear-gradient(120deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 100%)",
                mixBlendMode: "overlay",
                zIndex: 20,
                transform: "translateZ(70px)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            /> */}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
