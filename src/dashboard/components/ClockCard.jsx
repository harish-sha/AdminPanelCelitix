// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";

// // Flip animation variant for rotating flip card effect
// const flipVariants = {
//     initial: {
//         rotateX: -90,
//         opacity: 0,
//     },
//     animate: {
//         rotateX: 0,
//         opacity: 1,
//         transition: {
//             duration: 0.4,
//             ease: "easeOut",
//         },
//     },
//     exit: {
//         rotateX: 90,
//         opacity: 0,
//         transition: {
//             duration: 0.3,
//             ease: "easeIn",
//         },
//     },
// };

// const TimeUnit = ({ label, value }) => {
//     const [prev, setPrev] = useState(value);

//     useEffect(() => {
//         if (prev !== value) setPrev(value);
//     }, [value]);

//     return (
//         <div className="flex flex-col items-center">
//             <div className="relative w-12 h-10 text-base font-bold text-gray-800 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center shadow-inner">
//                 <AnimatePresence mode="wait" initial={false}>
//                     <motion.span
//                         key={value}
//                         variants={flipVariants}
//                         initial="initial"
//                         animate="animate"
//                         exit="exit"
//                         className="absolute"
//                     >
//                         {value}
//                     </motion.span>
//                 </AnimatePresence>
//             </div>
//             <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">{label}</div>
//         </div>
//     );
// };

// const ClockCard = () => {
//     const [time, setTime] = useState(new Date());

//     useEffect(() => {
//         const interval = setInterval(() => setTime(new Date()), 1000);
//         return () => clearInterval(interval);
//     }, []);

//     const hours = time.getHours().toString().padStart(2, "0");
//     const minutes = time.getMinutes().toString().padStart(2, "0");
//     const seconds = time.getSeconds().toString().padStart(2, "0");

//     return (
//         <div className="relative bg-white rounded-xl shadow p-3 px-4 flex flex-col items-start justify-center w-50">
//             <div className="text-sm text-gray-500 font-medium mb-2">Live Time</div>
//             <div className="flex gap-3">
//                 <TimeUnit label="HH" value={hours} />
//                 <TimeUnit label="MM" value={minutes} />
//                 <TimeUnit label="SS" value={seconds} />
//             </div>
//         </div>
//     );
// };

// export default ClockCard;


"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Flip card-like bottom-to-top animation variant
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
            <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">{label}</div>
        </div>
    );
};

const ClockCard = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");

    return (
        <div className="relative bg-white rounded-xl shadow p-3 px-4 flex flex-col items-start justify-center w-50">
            <div className="text-sm text-gray-500 font-medium mb-2">Live Time</div>
            <div className="flex gap-3">
                <TimeUnit label="HH" value={hours} />
                <TimeUnit label="MM" value={minutes} />
                <TimeUnit label="SS" value={seconds} />
            </div>
        </div>
    );
};

export default ClockCard;
