import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { SearchOutlined } from "@mui/icons-material";
import { motion } from "framer-motion";

export const InputData = ({
  agentState,
  setAgentState,
  chatState,
  setChatState,
  search,
  setSearch,
  handleSearch,
  btnOption,
  setBtnOption,
}) => {
  return (
    <motion.div
      className="p-3 bg-white rounded-2xl shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col gap-2">
        <AnimatedDropdown
          label="Select Agent"
          id="agentList"
          name="agentList"
          options={agentState?.all?.map((item) => ({
            label: item?.agent_name,
            value: item?.agent_id,
          }))}
          onChange={(e) => {
            setAgentState((prev) => ({ ...prev, id: e }));
            setChatState({
              active: null,
              input: "",
              allConversations: [],
              specificConversation: [],
              latestMessage: {
                srno: "",
                replayTime: "",
              },
            });
          }}
          placeholder="Select Agent"
          value={agentState?.id}
        />

        <div
          id="input"
          className="flex items-center justify-center px-2 py-2 border-gray-300 rounded-md border"
        >
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search Conversations (Start with +91)"
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

      {agentState?.id && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative flex justify-center p-1 mt-3 bg-gray-100 rounded-full w-full max-w-xs mx-auto"
        >
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
                // setIsSubscribed(false);
                setChatState((prev) => ({
                  ...prev,
                  active: null,
                  input: "",
                  allConversations: [],
                  specificConversation: [],
                  latestMessage: {
                    srno: "",
                    replayTime: "",
                  },
                }));
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
                setChatState((prev) => ({
                  ...prev,
                  active: null,
                  input: "",
                  allConversations: [],
                  specificConversation: [],
                  latestMessage: {
                    srno: "",
                    replayTime: "",
                  },
                }));
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
