import { useState } from "react";
import { motion } from "framer-motion";
import {
    BarLoader,
    ClipLoader,
    BeatLoader,
    BounceLoader,
    CircleLoader,
    ClimbingBoxLoader,
    ClockLoader,
    DotLoader,
    FadeLoader,
    GridLoader,
    HashLoader,
    MoonLoader,
    PacmanLoader,
    PropagateLoader,
    PuffLoader,
    PulseLoader,
    RingLoader,
    RiseLoader,
    RotateLoader,
    ScaleLoader,
    SyncLoader
} from 'react-spinners'

const override = {
    display: "block",
    margin: "0 auto",
    CircleLoader: "50px"
};

const Loader = () => {
    return (
        <div className="loader-container flex items-center justify-center h-[80vh]">
            <ClipLoader
                size={100}
                color="#9a9a9a"
                loading={true}
                aria-label="Loading Spinner"
                data-testid="loader"
                cssOverride={override}
            />
            {/* <SunspotLoader
                gradientColors={["#6366F1", "#E0E7FF"]}
                shadowColor={"#3730A3"}
                desktopSize={"128px"}
                mobileSize={"100px"}
            /> */}
        </div>
        // <div className="flex flex-col items-center justify-center h-[80vh]">
        //     <div className="relative flex items-center justify-center">
        //         {/* Animated Rotating Ring */}
        //         <motion.svg
        //             width="120"
        //             height="120"
        //             viewBox="0 0 120 120"
        //             className="absolute"
        //             animate={{ rotate: 360 }}
        //             transition={{
        //                 repeat: Infinity,
        //                 duration: 1.2,
        //                 ease: "linear",
        //             }}
        //         >
        //             <circle
        //                 cx="60"
        //                 cy="60"
        //                 r="50"
        //                 stroke="#3b82f6"
        //                 strokeWidth="8"
        //                 fill="none"
        //                 strokeDasharray="60 220"
        //                 strokeLinecap="round"
        //             />
        //         </motion.svg>
        //         {/* Animated Name */}
        //         <motion.span
        //             className="text-4xl font-bold tracking-widest text-blue-500  select-none"
        //             initial={{ opacity: 0.3 }}
        //             animate={{ opacity: [0.3, 1, 0.3] }}
        //             transition={{
        //                 duration: 1.2,
        //                 repeat: Infinity,
        //                 repeatType: "loop",
        //             }}
        //         >
        //             Celitix
        //         </motion.span>
        //     </div>
        //     <div className="mt-8 text-gray-400 tracking-widest text-sm">
        //         Loading...
        //     </div>
        // </div>
    )
}

export default Loader