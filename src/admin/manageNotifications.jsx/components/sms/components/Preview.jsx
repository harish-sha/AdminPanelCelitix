import {
  FaSmile,
  FaImage,
  FaPlus,
  FaMicrophone,
  FaSignal,
  FaWifi,
  FaBatteryFull,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { FaReply } from "react-icons/fa6";

export const Preview = ({ inputDetails }) => {
  return (
    <div className="smartphone">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-1 bg-gray-100 text-black text-xs font-medium rounded-t-xl">
        <div>9:30</div>
        <div className="w-4 h-4 bg-black rounded-full" />
        <div className="flex items-center gap-1">
          <FaSignal className="text-[10px]" />
          <FaWifi className="text-[10px]" />
          <FaBatteryFull className="text-[12px]" />
        </div>
      </div>

      <div className="smartphone-content">
        <div className="flex border-b items-center gap-2 px-4 py-2">
          <div className="border w-7 h-7 rounded-full bg-white"></div>
          <p>{inputDetails?.senderId || "Sender ID"}</p>
        </div>
        <div className="p-3">
          {inputDetails.message && (
            <div className="bg-blue-500 text-white p-2 rounded-t-2xl rounded-br-2xl shadow-md max-w-lg mx-auto max-h-[15rem] overflow-y-auto">
              <pre className="text-sm font-medium break-words whitespace-pre-wrap px-1 py-2">
                {inputDetails.message}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* <div className="flex items-center justify-between px-2 py-1 rounded-full bg-white shadow-sm w-66 max-w-md mx-auto my-2">
              <div className="flex items-center flex-1 px-2 gap-2">
                <FaSmile className="text-gray-500 text-sm" />
                <input
                  readOnly
                  type="text"
                  placeholder="Reply..."
                  className="flex-1 outline-none text-sm text-gray-700 bg-transparent w-24 placeholder-gray-400"
                />
              </div>
              <div className="flex items-center gap-2 px-2">
                <FaReply className="text-gray-600 text-sm" />
                <FaImage className="text-gray-600 text-sm" />
                <FaPlus className="text-gray-600 text-sm" />
              </div>
              <div className="ml-2 p-2 bg-green-200 rounded-full hover:bg-green-300 transition duration-200 cursor-pointer">
                <FaMicrophone className="text-green-800 text-sm" />
              </div>
            </div> */}
    </div>
  );
};
