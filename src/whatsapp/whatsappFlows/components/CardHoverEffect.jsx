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
      animation:Animation_ContactUs,
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
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-[250px] bg-gray-300 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <div className="w-full h-[180px] flex items-center justify-center mt-4">
              <Lottie animationData={item.animation} loop={true} />
            </div>
            <div className="mt-10 mb-4">
              <UniversalButton
                label={item.button}
                variant="primary"
                className="px-2 py-2 "
              />
            </div>

          </Card>
        </div>
      ))}
    </div>
  );
};

const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "w-[250px] h-[350px] rounded-2xl p-4 overflow-hidden bg-gradient-to-b from-[#AF7ABD] to-[#8683C9] border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative">
        <div className="h-full flex flex-col justify-between">{children}</div>
      </div>
    </div>
  );
};

const CardTitle = ({ className, children }) => {
  return (
    <h4 className={cn("text-gray-50 font-bold tracking-wide text-center  text-lg", className)}>
      {children}
    </h4>
  );
};

