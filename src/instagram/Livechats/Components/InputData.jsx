import { useState } from "react";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { SearchOutlined } from "@mui/icons-material";
import { motion } from "framer-motion";
import { FaChevronCircleRight } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";

export const InputData = ({
  setSearch,
  search,
  handleSearch,
  setBtnOption,
  btnOption,
  chatState,
  setChatState,
}) => {
  const [selectedAccount, setSelectedAccount] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const userAccounts = [
    {
      id: "123",
      username: "page_one",
      name: "Page One",
      chats: [
        {
          name: "user1",
          messages: [
            { sender: "user1", msg: "Hi", profile: "", date: "07/08/2023" },
            {
              sender: "page_one",
              msg: "Hello!",
              profile: "",
              date: "09/04/2023",
            },
          ],
        },
        {
          name: "user2",
          messages: [
            { sender: "user2", msg: "Hey there!" },
            { sender: "page_one", msg: "Hi, how can I help you?" },
          ],
        },
      ],
    },

    {
      id: "456",
      username: "page_two",
      name: "Page Two",
      chats: [
        {
          name: "Ana",
          messages: [
            { sender: "Ana", msg: "Hi", profile: "", date: "07/08/2023" },
            {
              sender: "page_one",
              msg: "Hello!",
              profile: "",
              date: "09/04/2023",
            },
          ],
        },
        {
          name: "Jules",
          messages: [
            { sender: "Jules", msg: "Hey there!" },
            { sender: "page_one", msg: "Hi, how can I help you?" },
          ],
        },
      ],
    },
  ];

  return (
    <motion.div
      className="px-3 py-2 rounded-b-2xl shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col gap-2">
        <div className="relative">
          {!isOpen ? (
            <button
              onClick={() => setIsOpen(true)}
              className="absolute -left-2 top-6 transform -translate-y-1/2 z-99 text-3xl text-gray-700 hover:text-blue-500 animate-pulse "
            >
              <FaChevronCircleRight className="text-2xl" />
            </button>
          ) : (
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -left-2 top-6 transform -translate-y-1/2 z-50 text-3xl text-gray-700 hover:text-blue-500 animate-pulse"
            >
              <FaChevronCircleLeft className="text-2xl" />
            </button>
          )}

          <div
            className={`absolute top-2 -left-8 w-full md:w-72 shadow-lg z-40 transform transition-transform duration-300 md:ml-4 ${isOpen ? "translate-x-0 left-1" : "-translate-x-full"
              }`}
          >
            <AnimatedDropdown
              id="selectUserAccount"
              name="selectUserAccount"
              // label="Select Instagram Account"
              tooltipContent="Choose which account's chat you want to view"
              tooltipPlacement="right"
              options={
                userAccounts?.map((account) => ({
                  value: account.username,
                  label: account.name || account.username,
                })) || []
              }
              value={selectedAccount}
              onChange={(value) => {
                const selected = userAccounts?.find(
                  (acc) => acc.username === value
                );

                setSelectedAccount(value);

                if (typeof setChatState === "function") {
                  setChatState({
                    active: null,
                    input: "",
                    allConversations: selected?.chats || [], // Load conversations here
                    specificConversation: [],
                    latestMessage: {
                      srno: "",
                      replayTime: "",
                    },
                    replyData: "",
                    isReply: false,
                  });
                  setIsOpen(false);
                }

                // Optionally fetch from server if needed:
                // if (selected?.id) {
                //   fetchChatsForUser(selected.id);
                // }
              }}
              placeholder="Select Instagram Account"
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 ml-5">
          <div
            id="input"
            className="flex items-center w-full max-w-md mx-auto px-4 py-1 border border-gray-300 rounded-full bg-white"
          >
            <SearchOutlined className="text-gray-500 hover:text-blue-600 transition mr-2" />
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              className="flex-grow bg-transparent outline-none text-sm placeholder-gray-400"
              value={search}
              onChange={(e) => {
                if (typeof setSearch === "function") setSearch(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && typeof handleSearch === "function") {
                  handleSearch();
                }
              }}
            />

            <button
              onClick={() => {
                if (typeof handleSearch === "function") handleSearch();
              }}
              className="ml-2"
            >
              {/* <SearchOutlined className="text-gray-500 hover:text-blue-600 transition" /> */}
            </button>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <FaFilter />
            <CiMenuKebab />
          </div>
        </div>

      </div>
    </motion.div>
  );
};
