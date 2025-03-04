import React, { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import CustomTooltip from '../../components/common/CustomTooltip';


const GeneratePasswordSettings = ({ label, id, name, tooltipContent = "", tooltipPlacement = "top"}) => {
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
  
        <div className='flex gap-2'>
          {/* Input with eye icon inside a bordered container */}
        <div className="flex-1 flex items-center border border-gray-300 rounded-md  shadow-md ">
          <input
            id={id}
            name={name}
            type={showPassword ? 'text' : 'password'}
            value={password}
            readOnly
            className="flex-1 p-1.5 h-[2.10rem] bg-gray-200 focus:outline-none text-sm cursor-not-allowed" 
            placeholder="Your password"
          />
          <div onClick={handleTogglePassword} className='px-2 cursor-pointer' >
            {showPassword ? <VisibilityOff fontSize='small'/> : <Visibility fontSize='small'/>}
          </div>
        </div>
        {/* Generate Password Button */}
        <button
          onClick={handleGeneratePassword}
          className="bg-blue-400 hover:bg-blue-500 text-white text-sm px-2 rounded-md shadow-md focus:outline-none"
        >
          Generate Password
        </button>
        </div>
  
      </div>
    );
  };
export default GeneratePasswordSettings
