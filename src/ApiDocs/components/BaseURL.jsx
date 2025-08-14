import { useState, useRef } from 'react';
import { MdContentCopy } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';

const BaseURL = ({ urlPrefix, requestType: initialRequestType, param = '' }) => {
  const [requestType, setRequestType] = useState(initialRequestType);
  const [copied, setCopied] = useState(false);
  const textRef = useRef(null);

  const endpoint = '/directory/secure/api/v1/bots/templates'; 

  const baseUrl = `{${urlPrefix}}`;
  const fullUrl = baseUrl + endpoint + param;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl)
      .then(() => {
        setCopied(true);
        toast.success('Copied to clipboard!', {
          duration: 2000,
          position: 'top-center',
          style: {
            backgroundColor: '#fff',
            color: '#000',
          },
          iconTheme: {
            primary: '#10B981',
            secondary: '#fff'
          }
        });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        toast.error('Failed to copy text', {
          duration: 2000,
          position: 'top-center',
          style: {
            backgroundColor: '#fff',
            color: '#000',
          }
        });
        console.error('Could not copy text: ', err);
      });
  };

  return (
    <div className="lg:w-3xl md:w-2xl w-[320px] mx-auto">
      <div className="bg-gray-700 text-white p-4 rounded-lg shadow-md flex items-center flex-col h-32 relative overflow-hidden">
        <Toaster />
        <div className="flex justify-between items-center absolute right-2.5">
          <div className="flex-1"></div>
          <div className="flex gap-2">
            <select
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              className="bg-gray-500 text-white px-2 rounded border border-gray-700"
            >
              <option value={initialRequestType}>{initialRequestType}</option>
            </select>
            <button
              onClick={handleCopy}
              className="p-1 rounded hover:bg-gray-700 transition-colors"
              aria-label="Copy to clipboard"
            >
              {copied ? <IoMdCheckmark size={16} /> : <MdContentCopy size={16} />}
            </button>
          </div>
        </div>

        {/* URL display */}
        <div className="w-full flex-1 flex items-center justify-start mt-4 md:mt-2 lg:mt-2 overflow-x-auto whitespace-nowrap px-1 md:px-3 lg:px-4">
          <span className="text-gray-300 text-base">{baseUrl}</span>
          <span className="text-green-500 text-base">{endpoint}</span>
          <span className="text-green-500 text-base">{param}</span>
        </div>
      </div>
    </div>
  );
};

export default BaseURL;
