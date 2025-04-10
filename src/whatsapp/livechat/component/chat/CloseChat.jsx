import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";

import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
export const ClosedChat = ({ setSendMessageDialogVisible }) => {
  return (
    <div className="flex flex-col items-center justify-between w-full p-4 bg-white mb-17 md:mb-0 md:flex-row">
      <div className="flex gap-2">
        <AccessAlarmOutlinedIcon />
        <p>24 Hour Window Elapsed</p>
      </div>
      <p className="text-xs">
        The 24 Hour conversation window has elapsed. Please wait for the user to
        initiate a chat
      </p>
      <button
        onClick={() => setSendMessageDialogVisible(true)}
        className="flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-md"
      >
        Start Chat
        <ArrowRightAltOutlinedIcon />
      </button>
    </div>
  );
};
