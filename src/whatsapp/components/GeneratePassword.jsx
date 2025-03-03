import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CustomTooltip from './CustomTooltip'; // Adjust import as needed
import { AiOutlineInfoCircle } from 'react-icons/ai';
import toast from 'react-hot-toast';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

const GeneratePassword = ({ label, id, name, tooltipContent = "", tooltipPlacement = "top" }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const generateRandomPassword = (length = 8) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let generated = '';
    for (let i = 0; i < length; i++) {
      generated += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return generated;
  };

  const handleGeneratePassword = () => {
    const newPassword = generateRandomPassword();
    setPassword(newPassword);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password).then(() => {
      toast.success('Password copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy password.');
    });
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center gap-2 mb-2">
          <label htmlFor={id} className="text-sm font-medium text-gray-800">
            {label}
          </label>
          {tooltipContent && (
            <CustomTooltip title={tooltipContent} placement={tooltipPlacement} arrow>
              <span>
                <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
              </span>
            </CustomTooltip>
          )}
        </div>
      )}

      <div className='flex gap-2 flex-wrap'>
        {/* Input with eye icon inside a bordered container */}
        <div className="flex-1 flex items-center border border-gray-300  bg-gray-200 rounded-md shadow-md">
          <input
            id={id}
            name={name}
            type={showPassword ? 'text' : 'password'}
            value={password}
            readOnly
            className="flex-1 p-1.5 h-[2.10rem] bg-gray-200 focus:outline-none text-sm cursor-not-allowed"
            placeholder="Your password"
          />
          <div onClick={handleTogglePassword} className='cursor-pointer pr-2' >
            {showPassword ? <VisibilityOff fontSize='small' /> : <Visibility fontSize='small' />}
          </div>
        </div>
        {/* Copy Password Button */}
        <CustomTooltip
          title="Copy password"
          placement="top"
          arrow
        >
          <button
            onClick={handleCopyPassword}
            className="bg-transparent  hover:bg-gray-200 p-1 shadow-2xl rounded-full focus:outline-none cursor-pointer"
          >
            <ContentCopyOutlinedIcon sx={{
              fontSize: '1.2rem',
              color: '#999',
            }} />
          </button>
        </CustomTooltip>
        {/* Generate Password Button */}
        <button
          onClick={handleGeneratePassword}
          className="bg-blue-400 hover:bg-blue-500 text-white text-sm px-2 py-1.5 rounded-md shadow-md focus:outline-none cursor-pointer"
        >
          Generate Password
        </button>

      </div>

    </div>
  );
};

export default GeneratePassword;
