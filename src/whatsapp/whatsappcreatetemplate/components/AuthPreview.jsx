import { useState } from "react";
import { WhatsApp } from "@mui/icons-material";
import FileCopyIcon from "@mui/icons-material/FileCopy";

const AuthPreview = () => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="top-[200px] sm:w-[20rem] md:w-[30rem] lg:w-[30rem] h-auto overflow-y-auto z-50 p-4 transition-all duration-300 bg-white border border-gray-400 rounded-md shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 text-white bg-green-500 rounded-t-md">
        <span className="text-lg font-semibold">Template Preview</span>
        <p className="text-sm">
          <WhatsApp />
        </p>
      </div>
      <div className="p-4 bg-white shadow-inner rounded-b-md">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md max-w-lg mx-auto">
          <p className="font-normal">
            <span className="font-semibold">123456</span>&nbsp;is your verification code. For your security, do not share
            this code.
          </p>
        </div>
        <p className="text-sm mt-2 text-gray-700">
          This code expires in 5 minutes.
        </p>

      </div>
      <div className="flex justify-center items-center">

        <button className="text-blue-500 hover:text-blue-700 font-medium flex items-center text-sm cursor-pointer">
          <FileCopyIcon className="mr-1" style={{
            fontSize: "18px"
          }} />
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>
    </div>
  );
};

export default AuthPreview;
