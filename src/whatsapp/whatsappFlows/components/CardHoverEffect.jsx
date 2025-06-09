import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";

import Animation_SignIn from "../../../assets/animation/Animation_SignIn.json";
import Animation_SignUp from "../../../assets/animation/Animation_SignUp.json";
import Animation_BookingAppointment from "../../../assets/animation/Animation_BookingAppointment.json";
import Animation_LeadGeneration from "../../../assets/animation/Animation_LeadGeneration.json";
import Animation_ContactUs from "../../../assets/animation/Animation_ContactUs.json"
import Animation_CustomerSupport from "../../../assets/animation/Animation_CustomerSupport.json"
import Animation_Survey from "../../../assets/animation/Animation_Survey.json"

import { cn } from "../lib/utils";
import UniversalButton from "../../components/UniversalButton";

export default function CardHoverEffect() {
  const projects = [
    {
      title: "SignIn",
      animation: Animation_SignIn,
      button: "SignIn",
    },
    {
      title: "SignUp",
      animation: Animation_SignUp,
      button: "SignUp",
    },
    {
      title: "Appointment Booking",
      animation: Animation_BookingAppointment,
      button: "Book Appointment",
    },
    {
      title: "Lead Generation",
      animation: Animation_LeadGeneration,
      button: "Lead Generation",
    },
    {
      title: "Contact Us",
      animation: Animation_ContactUs,
      button: "Contact Us",
    },
    // {
    //   title: "Customer Support",
    //   animation:Animation_CustomerSupport,
    //   button: "Customer Support",
    // },
    // {
    //   title: "Survey",
    //   animation: Animation_Survey,
    //   button: "Survey",
    // },
    // {
    //   title: "Lead Generation",
    //   animation: Animation_LeadGeneration,
    //   button: "LeadGeneration",
    // },
  ];

  return (
    <div className="px-8">
      <HoverEffect items={projects} />
    </div>
  );
}

const HoverEffect = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={cn("flex flex-wrap justify-between gap-4 py-5", className)}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-[250px] bg-gray-300 dark:bg-slate-400/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence> */}
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <div className="m-auto h-45 w-45 flex items-center justify-center mt-4">
              <Lottie animationData={item.animation} loop={true} />
            </div>
            <div className="flex items-center justify-center m-auto mt-8">
              {/* <UniversalButton
                label={item.button}
                variant="primary"
                className="px-2 py-2 "
              /> */}

              {/* button style 2 */}
              {/* <button
                className={cn(
                  "cursor-pointer transition-all duration-500 ease-out transform opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0",
                  "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl px-5 py-2 shadow-lg",
                  "hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:to-pink-600 focus:outline-none"
                )}
                style={{
                  boxShadow: "0 4px 24px 0 rgba(99,102,241,0.15)",
                  border: "none",
                }}
              >
                {item.button}
              </button> */}

              {/* button style 3 */}
              {/* <button
                className={cn(
                  "cursor-pointer transition-all duration-500 ease-out transform opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0",
                  "bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold rounded-xl px-5 py-2 shadow-lg",
                  "hover:scale-105 hover:shadow-2xl hover:from-teal-600 hover:to-indigo-600 focus:outline-none"
                )}
                style={{
                  boxShadow: "0 4px 24px 0 rgba(16,185,129,0.10)",
                  border: "none",
                }}
              >
                {item.button}
              </button> */}
              <button
                className={cn(
                  "cursor-pointer transition-all duration-500 ease-out transform opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0",
                  "bg-gray-700 text-white font-semibold rounded-xl px-5 py-2 shadow-md",
                  "hover:bg-gray-800 hover:scale-105 hover:shadow-lg focus:outline-none"
                )}
                style={{
                  boxShadow: "0 4px 24px 0 rgba(55,65,81,0.10)",
                  border: "none",
                }}
              >
                {item.button}
              </button>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

// const Card = ({ className, children }) => {
//   return (
//     <div
//       className={cn(
//         "w-[250px] h-[350px] rounded-2xl p-4 overflow-hidden bg-gradient-to-b from-[#AF7ABD] to-[#8683C9] border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
//         className
//       )}
//     >
//       <div className="relative">
//         <div className="h-full flex flex-col justify-between">{children}</div>
//       </div>
//     </div>
//   );
// };

// const CardTitle = ({ className, children }) => {
//   return (
//     <h4 className={cn("text-gray-50 font-bold tracking-wide text-center  text-lg", className)}>
//       {children}
//     </h4>
//   );
// };


const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "w-[250px] h-[350px] rounded-2xl pt-2 overflow-hidden bg-white shadow-lg border border-gray-200 relative group transition-all duration-200 hover:shadow-2xl hover:-translate-y-1",
        className
      )}
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      <div className="relative h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};

const CardTitle = ({ className, children }) => {
  return (
    <h4
      className={cn(
        "text-gray-800 font-bold tracking-wide text-center text-lg mt-4 mb-2",
        className
      )}
    >
      {children}
    </h4>
  );
};

