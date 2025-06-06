// import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
// import { SearchOutlined } from "@mui/icons-material";
// import { motion } from "framer-motion";

// export const InputData = ({
//   setSearch,
//   search,
//   handleSearch,
//   setBtnOption,
//   btnOption,
//   wabaState,
//   setWabaState,
//   setChatState,
//   setSelectedWaba,
//   setIsSubscribed,
//   // setSelectedWaba
// }) => {
//   return (
//     <motion.div
//       className="p-3 bg-white rounded-2xl shadow-md"
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//     >
//       <div className="flex flex-col gap-2">
//         <AnimatedDropdown
//           id="createSelectWaba"
//           name="createSelectWaba"
//           label="Select WABA"
//           tooltipContent="Select your whatsapp business account"
//           tooltipPlacement="right"
//           options={wabaState.waba?.map((waba) => ({
//             value: waba.mobileNo,
//             label: waba.name,
//           }))}
//           value={wabaState?.selectedWaba}
//           onChange={(value) => {
//             const wabaSrno = wabaState?.waba?.find(
//               (waba) => waba.mobileNo === value
//             )?.wabaSrno;

//             setWabaState({ ...wabaState, selectedWaba: value, wabaSrno });

//             setChatState({
//               active: null,
//               input: "",
//               allConversations: [],
//               specificConversation: [],
//               latestMessage: {
//                 srno: "",
//                 replayTime: "",
//               },
//               replyData: "",
//               isReply: false,
//             });
//             setSelectedWaba(value)
//           }}
//           placeholder="Select WABA"
//         />
//         {/* </div> */}
//         <div
//           id="input"
//           className="flex items-center justify-center px-3 py-2 border-gray-300 rounded-full border"
//         >
//           <input
//             type="text"
//             name="search"
//             id="search"
//             placeholder="Search"
//             className="flex-grow bg-transparent outline-none text-sm"
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//             }}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 handleSearch();
//               }
//             }}
//           />
//           <button onClick={handleSearch}>
//             <SearchOutlined className=" text-gray-500 hover:text-blue-600 transition" />
//           </button>
//         </div>
//       </div>
//       {wabaState.selectedWaba && (
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//           className="relative flex justify-center p-1 mt-3 bg-gray-100 rounded-full w-full max-w-xs mx-auto"
//         >
//           {/* <button
//             onClick={() => {
//               setBtnOption("active");
//               // setChatState({
//               //   active: null,
//               //   input: "",
//               //   allConversations: [],
//               //   specificConversation: [],
//               //   latestMessage: {
//               //     srno: "",
//               //     replayTime: "",
//               //   },
//               //   replyData: "",
//               //   isReply: false,
//               // });
//             }}
//             className={`p-2 transition-all duration-300 rounded-full ${
//               btnOption === "active"
//                 ? "bg-blue-500 text-white tracking-wider shadow-lg"
//                 : "bg-white text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             Active
//           </button>
//           <button
//             onClick={() => {
//               setBtnOption("close");
//               // setChatState({
//               //   active: null,
//               //   input: "",
//               //   allConversations: [],
//               //   specificConversation: [],
//               //   latestMessage: {
//               //     srno: "",
//               //     replayTime: "",
//               //   },
//               //   replyData: "",
//               //   isReply: false,
//               // });
//             }}
//             className={`px-3 transition-all duration-300 rounded-full ${
//               btnOption === "close"
//                 ? "bg-blue-500 text-white tracking-wider shadow-lg"
//                 : "bg-white text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             Close
//           </button> */}

//           {/* {["active", "close"].map((option) => (
//             <motion.button
//               key={option}
//               onClick={() => setBtnOption(option)}
//               whileTap={{ scale: 0.95 }}
//               className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all ${
//                 btnOption === option
//                   ? "bg-blue-500 text-white shadow-lg scale-105"
//                   : "bg-white text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               {option}
//             </motion.button>
//           ))} */}

//           <motion.div
//             layout
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             className="absolute top-1 left-1 w-1/2 h-9 bg-gradient-to-br from-[#22577E]  to-[#22577E] rounded-full z-0"
//             style={{
//               left: btnOption === "active" ? "4px" : "calc(50% - 4px)",
//             }}
//           />
//           <div className="relative z-10 flex w-full text-sm font-medium">
//             <button
//               onClick={() => {
//                 setBtnOption("active");
//                 setIsSubscribed(false);
//               }}
//               className={`w-1/2 py-2 rounded-full cursor-pointer transition-all duration-200 ${btnOption === "active"
//                 ? "text-white font-semibold"
//                 : "text-gray-700"
//                 }`}
//             >
//               Active
//             </button>
//             <button
//               onClick={() => {
//                 setBtnOption("close");
//                 setIsSubscribed(false);
//               }}
//               className={`w-1/2 py-1 rounded-full cursor-pointer transition-all duration-200 ${btnOption === "close"
//                 ? "text-white font-semibold"
//                 : "text-gray-700"
//                 }`}
//             >
//               Close
//             </button>
//           </div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };


import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { SearchOutlined } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

export const InputData = ({
  setSearch,
  search,
  handleSearch,
  setBtnOption,
  btnOption,
  wabaState,
  setWabaState,
  setChatState,
  setSelectedWaba,
  setIsSubscribed,
  // setSelectedWaba
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleChipClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <motion.div
      className="p-3 bg-white rounded-2xl shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Animated Chip */}
      {/* <div className="flex items-center justify-center" >
        <motion.div
          className="flex items-center justify-center px-4 text-xs w-fit py-2 mb-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-medium rounded-full shadow-md cursor-pointer"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={handleChipClick}
        >
          🎉 New Feature: Canned Messages!
        </motion.div>
      </div>


      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>New Feature: Canned Messages</DialogTitle>
        <DialogContent>
          <p className="text-gray-700 text-sm leading-6">
            We’re excited to introduce our new <strong>Canned Messages</strong>{" "}
            feature! Now you can quickly reply to your customers with pre-saved
            messages and media, making your live chat experience faster and more
            efficient.
          </p>
          <p className="text-gray-700 text-sm leading-6 mt-3">
            To use this feature:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-sm mt-2">
            <li>
              Press <strong>/</strong> in the input chat to activate canned or
              saved messages.
            </li>
            <li>
              Create your saved messages and media in the{" "}
              <strong>Live Chat Settings</strong>.
            </li>
            <li>
              Reply instantly in live chat and keep your customers engaged.
            </li>
          </ul>
          <p className="text-gray-700 text-sm leading-6 mt-3">
            Stay tuned for more updates and features to enhance your experience.
            Thank you for choosing our service!
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Got it!
          </Button>
        </DialogActions>
      </Dialog> */}
      <div className="flex flex-col gap-2">
        <AnimatedDropdown
          id="createSelectWaba"
          name="createSelectWaba"
          label="Select WABA"
          tooltipContent="Select your whatsapp business account"
          tooltipPlacement="right"
          options={wabaState.waba?.map((waba) => ({
            value: waba.mobileNo,
            label: waba.name,
          }))}
          value={wabaState?.selectedWaba}
          onChange={(value) => {
            const wabaSrno = wabaState?.waba?.find(
              (waba) => waba.mobileNo === value
            )?.wabaSrno;

            setWabaState({ ...wabaState, selectedWaba: value, wabaSrno });

            setChatState({
              active: null,
              input: "",
              allConversations: [],
              specificConversation: [],
              latestMessage: {
                srno: "",
                replayTime: "",
              },
              replyData: "",
              isReply: false,
            });
            setSelectedWaba(value);
          }}
          placeholder="Select WABA"
        />
        {/* </div> */}
        <div
          id="input"
          className="flex items-center justify-center px-3 py-2 border-gray-300 rounded-full border"
        >
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            className="flex-grow bg-transparent outline-none text-sm"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button onClick={handleSearch}>
            <SearchOutlined className=" text-gray-500 hover:text-blue-600 transition" />
          </button>
        </div>
      </div>
      {wabaState.selectedWaba && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative flex justify-center p-1 mt-3 bg-gray-100 rounded-full w-full max-w-xs mx-auto"
        >
          {/* <button
            onClick={() => {
              setBtnOption("active");
              // setChatState({
              //   active: null,
              //   input: "",
              //   allConversations: [],
              //   specificConversation: [],
              //   latestMessage: {
              //     srno: "",
              //     replayTime: "",
              //   },
              //   replyData: "",
              //   isReply: false,
              // });
            }}
            className={`p-2 transition-all duration-300 rounded-full ${
              btnOption === "active"
                ? "bg-blue-500 text-white tracking-wider shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-300"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => {
              setBtnOption("close");
              // setChatState({
              //   active: null,
              //   input: "",
              //   allConversations: [],
              //   specificConversation: [],
              //   latestMessage: {
              //     srno: "",
              //     replayTime: "",
              //   },
              //   replyData: "",
              //   isReply: false,
              // });
            }}
            className={`px-3 transition-all duration-300 rounded-full ${
              btnOption === "close"
                ? "bg-blue-500 text-white tracking-wider shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-300"
            }`}
          >
            Close
          </button> */}

          {/* {["active", "close"].map((option) => (
            <motion.button
              key={option}
              onClick={() => setBtnOption(option)}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                btnOption === option
                  ? "bg-blue-500 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {option}
            </motion.button>
          ))} */}

          <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-1 left-1 w-1/2 h-9 bg-gradient-to-br from-[#22577E]  to-[#22577E] rounded-full z-0"
            style={{
              left: btnOption === "active" ? "4px" : "calc(50% - 4px)",
            }}
          />
          <div className="relative z-10 flex w-full text-sm font-medium">
            <button
              onClick={() => {
                setBtnOption("active");
                setIsSubscribed(false);
              }}
              className={`w-1/2 py-2 rounded-full cursor-pointer transition-all duration-200 ${btnOption === "active"
                  ? "text-white font-semibold"
                  : "text-gray-700"
                }`}
            >
              Active
            </button>
            <button
              onClick={() => {
                setBtnOption("close");
                setIsSubscribed(false);
              }}
              className={`w-1/2 py-1 rounded-full cursor-pointer transition-all duration-200 ${btnOption === "close"
                  ? "text-white font-semibold"
                  : "text-gray-700"
                }`}
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
