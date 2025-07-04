import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const flipVariants = {
  initial: {
    y: 40,
    opacity: 0,
    position: "absolute",
  },
  animate: {
    y: 0,
    opacity: 1,
    position: "relative",
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    y: -40,
    opacity: 0,
    position: "absolute",
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const TimeUnit = ({ label, value }) => {
  const [prev, setPrev] = useState(value);

  useEffect(() => {
    if (prev !== value) setPrev(value);
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-12 h-10 text-base font-bold text-gray-800 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center shadow-inner">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={value}
            variants={flipVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
};

const ClockCard = () => {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(() => {
    const saved = localStorage.getItem("is24Hour");
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("is24Hour", JSON.stringify(is24Hour));
  }, [is24Hour]);

  const rawHours = time.getHours();
  const hours12 = rawHours % 12 === 0 ? 12 : rawHours % 12;
  const hours = (is24Hour ? rawHours : hours12).toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const ampm = rawHours >= 12 ? "PM" : "AM";

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
      className={`relative bg-white rounded-xl shadow flex flex-col items-center justify-center ${is24Hour ? "w-54" : "md:w-62 w-full"
        } h-28 group`}
    >
      <div className="flex gap-3 items-center">
        <AnimatePresence mode="wait">
          <TimeUnit key="a" label="HH" value={hours} />
          <TimeUnit key="b" label="MM" value={minutes} />
          <TimeUnit key="c" label="SS" value={seconds} />
        </AnimatePresence>
        {!is24Hour && (
          <motion.span
            key="ampm"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs border text-gray-600 bg-gray-100"
          >
            {ampm}
          </motion.span>
        )}
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 hidden group-hover:flex gap-2 bg-white shadow-lg px-3 py-1 rounded-full border"
        >
          <button
            onClick={() => setIs24Hour(false)}
            className={`w-7 h-7 rounded-full text-sm border text-gray-600 hover:bg-gray-100 transition ${!is24Hour ? "bg-gray-200 font-bold" : ""
              }`}
          >
            12
          </button>
          <button
            onClick={() => setIs24Hour(true)}
            className={`w-7 h-7 rounded-full text-sm border text-gray-600 hover:bg-gray-100 transition ${is24Hour ? "bg-gray-200 font-bold" : ""
              }`}
          >
            24
          </button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default ClockCard;
