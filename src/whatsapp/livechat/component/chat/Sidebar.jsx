
import { getAgentList } from "@/apis/Agent/Agent";
import { getUserAgent } from "@/apis/whatsapp/whatsapp";

export const ChatSidebar = ({ formatDate, chatState, setChatState, setSelectedAgentList }) => {
  async function fetchAgentDetails(srno) {
    try {
      const res = await getAgentList();
      return res?.data?.find((agent) => agent.sr_no === srno)?.name;
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="mt-4 h-[70vh] overflow-y-scroll">
      {chatState?.allConversations
        ?.slice()
        ?.sort((a, b) => new Date(b.insertTime) - new Date(a.insertTime))
        ?.map((chat, index) => (
          <div
            key={chat.srno || index}
            className={`p-3 border-b cursor-pointer rounded-md  select-none ${chatState?.active?.srno === chat.srno ? "bg-gray-300 " : ""
              }`}
            onClick={async () => {
              const agentName = await getUserAgent(chat?.mobileNo);
              // setActiveChat(chat);
              setChatState((prev) => ({
                ...prev,
                active: chat,
                replyData: "",
                isReply: false,
                agentName: agentName,
              }));
              setSelectedAgentList(chat?.agentSrno);
            }}
          >
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-2">
                <div className="relative">
                  {chat.image ? (
                    <img
                      src={chat.image}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${chatState?.active?.srno === chat.srno
                        ? "bg-gray-500"
                        : "bg-gray-300"
                        }`}
                    >
                      {chat.contectName?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                  )}

                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-lg"></div>
                </div>
                <div className="ml-2">
                  {chat.contectName || chat.mobileNo}
                  <p className="text-xs truncate w-[200px]">
                    {chat?.messageBody}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-end">
                <p className="text-xs">{formatDate(chat.insertTime)}</p>
                {chat.unreadCount > 0 && (
                  <div className="flex items-center justify-center w-5 h-5 text-sm text-white bg-green-500 rounded-full">
                    {chat.unreadCount}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
