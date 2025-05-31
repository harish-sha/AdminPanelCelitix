// import React, { useState } from "react";
// import QRCode from "qrcode";
// import InputField from "../components/InputField";
// import UniversalTextArea from "../components/UniversalTextArea";
// import UniversalButton from "../components/UniversalButton";
// import qrPlaceholder from "../../assets/images/QRcode.png";
// import userPng from "../../assets/images/user.png";
// import toast from "react-hot-toast";

// const WhatsappQrCode = () => {
//   const [phone, setPhone] = useState("");
//   const [message, setMessage] = useState("");
//   const [qrImage, setQrImage] = useState(qrPlaceholder);
//   const [qrLink, setQrLink] = useState("https://wa.me/xxxxx?text=hello");

//   const sendMessage = () => {
//     if (message.trim()) {
//       const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
//       window.open(url, "_blank");
//     }
//   };

//   const generateQRCode = async () => {
//     if (!phone.trim()) {
//       toast.error("Please enter a valid phone number.");
//       return;
//     }
//     const formattedMessage = encodeURIComponent(message);
//     const url = `https://wa.me/${phone}?text=${formattedMessage}`;
//     setQrLink(url);
//     QRCode.toDataURL(url, (err, url) => {
//       if (!err) {
//         setQrImage(url);
//         toast.success("QR Code generated successfully!");
//       } else {
//         toast.error("Failed to generate QR Code. Please try again.");
//       }
//     });
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(qrLink).then(() => {
//       toast.success("Copied to clipboard!");
//     }).catch(() => {
//       toast.error("Failed to copy to clipboard. Please try again.");
//     });
//   };

//   return (
//     <div className="bg-white p-5 rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.1)] w-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
//       <div className=" bg-white p-5 rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.1)] flex flex-col gap-[15px] h-120" >
//         <InputField
//           label="WhatsApp QR Code Generator"
//           id="whatsAppqrCodeGenerator"
//           name="whatsAppQrCodeGenerator"
//           placeholder="Ex.: 919876543210"
//           type="number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//         <UniversalTextArea
//           label="Prefilled Message"
//           id="PrefilledMessage"
//           name="PrefilledMessage"
//           placeholder="Ex.: Hello World!"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           row="10"
//         />
//         <UniversalButton
//           id="generateQrCodeBtn"
//           name="generateQrCodeBtn"
//           label="Generate QR Code"
//           onClick={generateQRCode}
//         />
//       </div>
//       <div className=" bg-white p-5 rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.1)] flex flex-col gap-[15px] h-120">
//         <div style={{
//           width: "100%", height: "100%", background: "#e5ddd5", borderRadius: "10px", padding: "10px", fontFamily: "Arial, sans-serif", position: "relative"
//         }}>
//           <div style={{
//             display: "flex", alignItems: "center", background: "#075e54", padding: "10px", borderRadius: "8px 8px 0 0", color: "white"
//           }}>
//             <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "white" }}>
//               <img src={userPng} alt="User" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
//             </div>
//             <p style={{ margin: 0, paddingLeft: 10, fontSize: 14 }}>
//               {phone ? `${phone}` : "919876543210"}
//             </p>
//             <div style={{ marginLeft: "auto", cursor: "pointer" }}>
//               <i className="bi bi-three-dots-vertical"></i>
//             </div>
//           </div>

//           <div className="absolute bottom-0 right-0 px-2 " style={{ width: "100%" }}>
//             <UniversalTextArea
//               placeholder="Ex.: Hello World!"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               readOnly="true"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="bg-white p-5 rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.1)] flex flex-col gap-[15px] h-120">
//         <div className=" flex items-center justify-center rounded-[5px] border border-[#ddd] p-0">

//           {qrImage && <img src={qrImage} alt="WhatsApp QR Code" className="h-60 w-60" />}
//         </div>
//         <InputField
//           label="Your WhatsApp Click-To-Chat Link"
//           id="whatsappclicktochatlink"
//           name="whatsappclicktochatlink"
//           placeholder="https://wa.me/xxxxx?text=hello"
//           value={qrLink}
//           readOnly="true"
//         />
//         <UniversalButton
//           id="copytoclipboard"
//           name="copytoclipboard"
//           label="Copy to clipboard"
//           onClick={copyToClipboard}
//         />
//         <UniversalButton
//           id="openinwhatsapp"
//           name="openinwhatsapp"
//           label="Open in WhatsApp"
//           onClick={() => window.open(qrLink, "_blank")}
//         />
//       </div>
//     </div>
//   );
// };

// export default WhatsappQrCode;

































import React, { useState } from 'react';
import AnimatedDropdown from '../components/AnimatedDropdown';
import InputField from '../components/InputField';
import UniversalButton from '@/components/common/UniversalButton';
import Switch from '@mui/material/Switch';

const OptionsTypeOptions = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'email', label: 'Email' },
];

const WhatsappQrCode = () => {
  const [selectedOptionsType, setSelectedOptionsType] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [minValue, setMinValue] = useState('');
   const [labelValue, setLabelValue] = useState('');
   const [errorValue, setErrorValue] = useState('');
   const [placeholderValue, setPlaceholderValue] = useState('');
   const [switchChecked, setSwitchChecked] = useState(false);

  const handleDropdownChange = (val) => {
    const option = OptionsTypeOptions.find(opt => opt.value === val) || null;
    setSelectedOptionsType(option);
    // setInputValue('');
    setMaxValue('');
    setMinValue('');
    setLabelValue('');
    setErrorValue('');
    setPlaceholderValue('');
    setSwitchChecked(false);

  };
 const switchLabel = { inputProps: { 'aria-label': 'Switch demo' } };
 const handleErrorChange = (e) => setErrorValue(e.target.value);
 const handleLabelChange = (e) => setLabelValue(e.target.value);
 const handlePlaceholder = (e) => setPlaceholderValue(e.target.value);

   const handleSwitchChange = (event) => {
    setSwitchChecked(event.target.checked);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (selectedOptionsType?.value === 'number') {
      if (/^\d*$/.test(val) && (!maxValue || val.length <= Number(maxValue))) {
        setInputValue(val);
      }
    } else {
      setInputValue(val);
    }
  };

  const handleMaxChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setMaxValue(val);
      if (selectedOptionsType?.value === 'number' && inputValue.length > Number(val)) {
        setInputValue(inputValue.slice(0, Number(val)));
      }
    }
  };

  const handleMinChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) setMinValue(val);
  };

  const isNumberType = selectedOptionsType?.value === 'number';
  const maxNum = maxValue ? Number(maxValue) : undefined;
  const minNum = minValue ? Number(minValue) : undefined;

  // Construct payload and handle save action
  const handleSave = () => {
    const payload = {
      type: selectedOptionsType?.value || 'text',
      label: labelValue,
      "helper-text": placeholderValue,
       "min-chars": minNum,
       "max-chars": maxNum,
      "error-message": errorValue,
      required: switchChecked,
    };
    
    console.log('Save Payload:', payload);
  };

  return (
    <div>
      <InputField
      label="testingInput"
        id="maininput"
        type={selectedOptionsType?.value || 'text'}
        placeholder={
          selectedOptionsType
            ? `Enter ${selectedOptionsType.label}`
            : 'Enter placeholder'
        }
        value={inputValue}
        onChange={handleInputChange}
        {...(!isNumberType
          ? { minLength: minNum, maxLength: maxNum }
          : {})}
      />



      <AnimatedDropdown
        options={OptionsTypeOptions}
        value={selectedOptionsType?.value || ''}
        onChange={handleDropdownChange}
        placeholder={selectedOptionsType?.label || 'Select Type'}
      />

      

      <InputField
      label="placeholder"
        type='text'
        placeholder='Enter placeholder'
        value={placeholderValue}
        onChange={handlePlaceholder}
      />

      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <InputField
          id="max"
          type="number"
          placeholder={isNumberType ? 'Max digits' : 'Max length'}
          value={maxValue}
          onChange={handleMaxChange}
          autoComplete="off"
        />

        <InputField
          id="min"
          type="number"
          placeholder={isNumberType ? 'Min digits' : 'Min length'}
          value={minValue}
          onChange={handleMinChange}
          autoComplete="off"
        />

        <InputField
        id="mainlabel"
        placeholder="Enter Label"
        value={labelValue}
        onChange={handleLabelChange}
      />
        <InputField
        id="maineroor"
        placeholder="Enter Error"
        value={errorValue}
        onChange={handleErrorChange}
      />

  <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Switch {...switchLabel} checked={switchChecked} onChange={handleSwitchChange} />
        <span>{switchChecked ? 'Enabled' : 'Disabled'}</span>
      </div>
      </div>

      {(minNum !== undefined || maxNum !== undefined) && (
        <p style={{ marginTop: 8 }}>
          {isNumberType
            ? `Digit count between ${minNum ?? 0} and ${maxNum ?? '∞'}`
            : `Length between ${minNum ?? 0} and ${maxNum ?? '∞'} characters`}
        </p>
      )}

      <UniversalButton
        label="Save"
        id="samebtn"
        onClick={handleSave}
      />
    </div>
  );
};

export default WhatsappQrCode;













