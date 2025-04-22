import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { SearchOutlined } from "@mui/icons-material";

export const InputData = ({
  setSearch,
  search,
  handleSearch,
  setBtnOption,
  btnOption,
  wabaState,
  setWabaState,
  setChatState,
}) => {
  return (
    <div>
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
          }}
          placeholder="Select WABA"
        />
        {/* </div> */}
        <div
          id="input"
          className="flex items-center justify-center border-gray-300 rounded-lg border-1"
        >
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            className="w-full p-2 border-none rounded-2xl-lg focus:outline-hidden"
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
            <SearchOutlined className="mr-2 text-gray-500" />
          </button>
        </div>
      </div>
      {wabaState.selectedWaba && (
        <div className="flex justify-center p-2 mt-5 space-x-4 bg-gray-200 rounded-lg">
          <button
            onClick={() => setBtnOption("active")}
            className={`p-2 transition-all duration-300 rounded-lg ${btnOption === "active"
              ? "bg-blue-500 text-white scale-105 shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-300"
              }`}
          >
            Active
          </button>
          <button
            onClick={() => setBtnOption("close")}
            className={`p-2 transition-all duration-300 rounded-lg ${btnOption === "close"
              ? "bg-blue-500 text-white scale-105 shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-300"
              }`}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
