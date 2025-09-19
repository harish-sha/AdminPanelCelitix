// // GlassCard.jsx
// import React from "react";
// import { motion } from "framer-motion";
// import CountUp from "react-countup";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import CustomTooltip from "@/components/common/CustomTooltip";
// import { Loop as LoopIcon } from "@mui/icons-material";

// const StatsCard = ({  quickStats = [],
//   getBalance,
//   isLoading,
//   formData,
//   balance,
//   refreshKey,
// }) => {
//   return (
//     <div className="flex items-center justify-center w-full p-6">
//       <motion.div
//         className="relative w-full max-w-4xl rounded-3xl"
//         whileHover={{ scale: 1.02 }}
//         transition={{ type: "spring", stiffness: 250, damping: 20 }}
//       >
//         <div className="relative z-10 rounded-3xl overflow-hidden border border-blue-400/20 bg-white/10 backdrop-blur-lg shadow-2xl p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//           {quickStats.map((stat, i) => (
//             <div
//               key={i}
//               className={`relative flex flex-col justify-between p-4 sm:p-5 w-full h-28 sm:h-32 rounded-2xl shadow-sm  backdrop-blur-sm`}
//             >
//               <div className="flex items-center justify-between">
//                 <div className={`flex items-center gap-2 font-medium ${stat.textColor}`}>
//                   <span className="text-sm sm:text-base">{stat.title}</span>
//                 </div>
//                 <button className="text-gray-400 hover:text-gray-600">⋮</button>
//               </div>
//               <div className={`text-xl sm:text-2xl font-bold ${stat.textColor}`}>
//                 {stat.value}
//               </div>
//               <div className="absolute bottom-4 right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-100">
//                 {stat.showRefreshIcon ? (
//                   <CustomTooltip title="Refresh Balance" placement="top" arrow>
//                     <div className="cursor-pointer">
//                       {isLoading ? (
//                         <LoopIcon className="text-[16px] sm:text-[18px] animate-spin text-blue-400 cursor-pointer" />
//                       ) : (
//                         <button onClick={getBalance}>
//                           <LoopIcon className="text-blue-400 cursor-pointer" />
//                         </button>
//                       )}
//                     </div>
//                   </CustomTooltip>
//                 ) : (
//                   stat.icon
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default StatsCard;

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import CountUp from "react-countup";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CustomTooltip from "@/components/common/CustomTooltip";
import { Loop as LoopIcon } from "@mui/icons-material";

export default function StatsCard({
  title = "Glass Card",
  subtitle = "A subtle 3D glass UI",
  image = null,
  children,
  className = "",
  quickStats = [],
  getBalance,
  isLoading,
  formData,
  balance,
  refreshKey,
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

  return (
    <div className="flex flex-wrap items-end gap-4  mt-0 md:mt-40">
      {quickStats.map((stat, i) => (
        <div
          key={i}
          className={`flex items-center justify-center   ${className}`}
          style={{ perspective: 1500 }}
        >
          <motion.div
            //  ref={cardRef}
            className="relative w-full max-w-md rounded-3xl"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.00 }}
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
              className="relative z-10 rounded-3xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl "
              style={{
                boxShadow:
                  "0 15px 40px rgba(2,6,23,0.45), inset 0 1px 1px rgba(255,255,255,0.06)",
                WebkitBackdropFilter: "blur(12px)",
                backdropFilter: "blur(12px)",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="relative flex flex-col justify-between p-4 sm:p-5 w-80 h-28 sm:h-38 rounded-2xl shadow-sm backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div
                    className={`flex items-center gap-2 font-medium ${stat.textColor}`}
                  >
                    <span className="text-sm sm:text-base">{stat.title}</span>
                  </div>
                </div>
                <div
                  className={`text-xl sm:text-2xl font-bold ${stat.textColor}`}
                >
                  {stat.value}
                </div>
                <div className="absolute bottom-4 right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-100">
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
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background:
                  "linear-gradient(120deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 100%)",
                mixBlendMode: "overlay",
                zIndex: 20,
                transform: "translateZ(70px)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            />
          </motion.div>
        </div>
      ))}
    </div>
  );
}
