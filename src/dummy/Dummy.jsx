// import React, { useState } from 'react';
// import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
// import { FaGoogle } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa";
// import './Dummy.css';

// import celitix_logo from '../assets/images/celitix-logo-white.svg'

// const Dummy = () => {
//     const [isSignUp, setIsSignUp] = useState(false);

//     // Toggle between Sign In and Sign Up
//     const handleSignUpClick = () => {
//         setIsSignUp(true);
//     };

//     const handleSignInClick = () => {
//         setIsSignUp(false);
//     };

//     return (
//         <div className='parent-container-login' >

//             <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
//                 <div className="form-container sign-up-container">
//                     <form action="#">
//                         <h1 className='head' >Create Account</h1>
//                         <div className="social-container">
//                             <a href="#" className="social">
//                                 {/* <i className="fab fa-facebook-f"></i> */}
//                                 <FacebookOutlinedIcon />
//                             </a>
//                             <a href="#" className="social">
//                                 {/* <i className="fab fa-google-plus-g"></i> */}
//                                 <FaGoogle />
//                             </a>
//                             <a href="#" className="social">
//                                 {/* <i className="fab fa-linkedin-in"></i> */}
//                                 <FaLinkedin />
//                             </a>
//                         </div>
//                         <span className='span' >or use your email for registration</span>
//                         <input type="text" placeholder="Name" />
//                         <input type="email" placeholder="Email" />
//                         <input type="password" placeholder="Password" />
//                         <button className="btn" >Sign Up</button>
//                     </form>
//                 </div>

//                 <div className="form-container sign-in-container">
//                     <form action="#">
//                         <h1 className='head'>Sign in</h1>
//                         <div className="social-container">
//                             <a href="#" className="social">
//                                 {/* <i className="fab fa-facebook-f"></i> */}
//                                 <FacebookOutlinedIcon />
//                             </a>
//                             <a href="#" className="social">
//                                 {/* <i className="fab fa-google-plus-g"></i> */}
//                                 <FaGoogle />
//                             </a>
//                             <a href="#" className="social">
//                                 {/* <i className="fab fa-linkedin-in"></i> */}
//                                 <FaLinkedin />
//                             </a>
//                         </div>
//                         <span className='span'>or use your account</span>
//                         <input type="email" placeholder="Email" />
//                         <input type="password" placeholder="Password" />
//                         <a href="#" onClick={handleSignUpClick} >Forgot your password?</a>

//                         <button className="btn" >Sign In</button>
//                     </form>
//                 </div>

//                 <div className="overlay-container">
//                     <div className="overlay">
//                         <div className="overlay-panel overlay-left">
//                             <h1 className='head'>Welcome Back!</h1>
//                             <p className='para' >To keep connected with us please login with your personal info</p>
//                             <button className="btn" onClick={handleSignInClick}>
//                                 Sign In
//                             </button>
//                         </div>
//                         <div className="overlay-panel overlay-right">
//                             {/* <h1 className='head'>Hello, Friend!</h1> */}
//                             <a href="index.jsp">
//                                 <img src={celitix_logo} className="mb-2 w-65" alt="Celitix"></img>
//                             </a>
//                             <p className='para' >Welcome to the Future of Customer Communication - Your Engagement Journey Begins Here.</p>
//                             {/* <button className="ghost" onClick={handleSignUpClick}>
//                                 Sign Up
//                             </button> */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     );
// };

// export default Dummy;

// import React from "react";
// import CommonTable from "../components/layout/CommonTable";

// const Dummy = () => {

//     return (
//         <div className="w-250 p-5" >
//             <CommonTable />
//         </div>
//     )
// }

// export default Dummy

// import React, { useState, useEffect } from "react";
// import { Galleria } from "primereact/galleria";
// import { RadioButton } from "primereact/radiobutton";
// import { Dialog } from "primereact/dialog";

// export default function Dummy() {
//     const [position, setPosition] = useState("bottom");
//     const [visible, setVisible] = useState(false);
//     const positionOptions = [
//         {
//             label: "Bottom",
//             value: "bottom",
//         },
//         {
//             label: "Top",
//             value: "top",
//         },
//         {
//             label: "Left",
//             value: "left",
//         },
//         {
//             label: "Right",
//             value: "right",
//         },
//     ];
//     const responsiveOptions = [
//         {
//             breakpoint: "991px",
//             numVisible: 4,
//         },
//         {
//             breakpoint: "767px",
//             numVisible: 3,
//         },
//         {
//             breakpoint: "575px",
//             numVisible: 1,
//         },
//     ];

//     const images = [
//         {
//             itemImageSrc:
//                 "https://primefaces.org/cdn/primereact/images/galleria/galleria1.jpg",
//             thumbnailImageSrc:
//                 "https://primefaces.org/cdn/primereact/images/galleria/galleria1s.jpg",

//             alt: "Description for Image 1",
//             title: "Title 1",
//         },
//         {
//             itemImageSrc:
//                 "https://primefaces.org/cdn/primereact/images/galleria/galleria1.jpg",
//             thumbnailImageSrc:
//                 "https://primefaces.org/cdn/primereact/images/galleria/galleria1s.jpg",

//             alt: "Description for Image 1",
//             title: "Title 2",
//         },
//         {
//             itemImageSrc:
//                 "https://primefaces.org/cdn/primereact/images/galleria/galleria1.jpg",
//             thumbnailImageSrc:
//                 "https://primefaces.org/cdn/primereact/images/galleria/galleria1s.jpg",
//             alt: "Description for Image 1",
//             title: "Title 3",
//         },
//         {
//             itemImageSrc:
//                 "https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJhbHxlbnwwfHwwfHx8MA%3D%3D",
//             thumbnailImageSrc:
//                 "https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJhbHxlbnwwfHwwfHx8MA%3D%3D",
//             alt: "Description for Image 1",
//             title: "Title 4",
//         },
//         {
//             itemImageSrc:
//                 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvFAO85i_zS0sDQIzUnj5_0GWwTtxeWpyMnw&s",
//             thumbnailImageSrc:
//                 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvFAO85i_zS0sDQIzUnj5_0GWwTtxeWpyMnw&s",
//             alt: "Description for Image 1",
//             title: "Title 5",
//         },
//         {
//             itemImageSrc:
//                 "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
//             thumbnailImageSrc:
//                 "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",

//             alt: "Description for Image 1",
//             title: "Title 6",
//         },
//     ];

//     const thumbnailTemplate = (item) => {
//         return (
//             <img
//                 src={item.thumbnailImageSrc}
//                 alt={item.alt}
//                 style={{
//                     maxHeight: "100px",
//                     width: "100%",
//                     display: "block",
//                 }}
//             />
//         );
//     };

//     const itemTemplate = (item) => {
//         return (

//             <img
//                 src={item.itemImageSrc}
//                 alt={item.alt}
//                 style={{
//                     maxWidth: "100%",
//                     maxHeight: "100%",
//                     height: "450px",
//                     width: "100%",
//                     objectFit: "contain",
//                     display: "block",
//                 }}
//             />
//         );
//     };

//     return (
//         <>
//             <button onClick={() => setVisible(true)}>Click me</button>
//             <Dialog
//                 visible={visible}
//                 style={{
//                     width: "40rem",
//                     overflow: "hidden"
//                 }}
//                 onHide={() => setVisible(false)}
//                 draggable={false}
//             >
//                 <Galleria
//                     value={images}
//                     item={itemTemplate}
//                     numVisible={5}
//                     showItemNavigators
//                     showItemNavigatorsOnHover
//                     showIndicators
//                     showThumbnails={true}
//                     thumbnail={thumbnailTemplate}

//                 />
//             </Dialog>
//         </>
//     );
// }




// Updated Dummy.jsx with step-based form navigation

import React, { useState } from "react";
import { RadioButton } from "primereact/radiobutton";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import toast from "react-hot-toast";
import InputField from "../components/layout/InputField";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

const steps = ["Bot Details", "Contact Info", "Other Details"];

const Dummy = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState("option2");
  const [displayName, setDisplayName] = useState("Title");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("Celitix is a SMS panel to send updates on transactions important information to customers");
  const [color, setColor] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("860-886-6162");
  const [phoneLabel, setPhoneLabel] = useState("Customer Care Number");
  const [emailId, setEmailId] = useState("whistle@whistle.mobi");
  const [emailLabel, setEmailLabel] = useState("Email Address");
  const [website, setWebsite] = useState("https://whistle.mobi/");
  const [websiteLabel, setWebsiteLabel] = useState("Official Website");
  const [privacy, setPrivacy] = useState("");
  const [termCondition, setTermCondition] = useState("");
  const [botLanguage, setBotLanguage] = useState("");
  const [webHook, setWebHook] = useState("");

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleChangeEnable = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  const validateEmail = (emailId) => /^[^\s@]+@gmail\.com$/.test(emailId);

  const validatePhoneNumber = (phoneNumber) => {
    const patterns = [
      /^\d{10}$/,
      /^\d{3}-\d{3}-\d{4}$/,
      /^\d{3} \d{3} \d{4}$/,
      /^\+1 \d{3}-\d{3}-\d{4}$/,
      /^\(\d{3}\) \d{3}-\d{4}$/,
    ];
    return patterns.some((pattern) => pattern.test(phoneNumber));
  };

  const handleSubmit = () => {
    if (!validateEmail(emailId)) return toast.error("Only valid Gmail addresses are allowed");
    if (!validatePhoneNumber(phoneNumber)) return toast.error("Phone number should be digits");
    toast.success("Form submitted successfully");
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-2">
    <div className="p-4">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="mt-8">
        {activeStep === 0 && (
           <div className="stapone">
           <h2 className="text-2xl font-bold text-blue-500  justify-center items-center popf">
             Bot Details
           </h2>
   
           <div className="flex gap-2">
             <label className="text-md font-semibold text-gray-500 popf ">
               Bot Type:
             </label>
             <p className="text-gray-500">Domestics</p>
           </div>
           <div className="flex flex-col gap-3 popf">
             <div>
               <label className="text-md font-semibold popf text-gray-500">
                 Message Type*:
               </label>
               <div className="flex flex-wrap gap-2">
                 <div className="flex align-items-center">
                   <RadioButton
                     inputId="messageotp"
                     name="messageotp"
                     value="option1"
                     checked={selectedOption === "option1"}
                     onChange={handleChangeEnable}
                     
                   />
                   <label htmlFor="messageotp" className="ml-2">
                     OTP
                   </label>
                 </div>
                 <div className="flex align-items-center">
                   <RadioButton
                     inputId="messagepromotional"
                     name="messagepromotional"
                     value="option2"
                     checked={selectedOption === 'option2'}
                     onChange={handleChangeEnable}
                   />
                   <label htmlFor="messagepromotional" className="ml-2">
                     Promotional
                   </label>
                 </div>
                 <div className="flex align-items-center">
                   <RadioButton
                     inputId="messageTransactional"
                     name="messageTransactional"
                     value="option3"
                     checked={selectedOption === 'option3'}
                     onChange={handleChangeEnable}
                   />
                   <label htmlFor="messageTransactional" className="ml-2">
                     Trasactional
                   </label>
                 </div>
               </div>
             </div>
             <div className=" w-full gap-6  grid grid-cols-3">
               <div className="w-full sm:w-46">
                 <InputField
                 maxLength={20}
                   value={displayName}
                   label="Bot Display Name*"
                   type="text"
                   placeholder="Enter Bot Name"
                   onChange={(e) => setDisplayName(e.target.value)}
                 />
               </div>
               <div className="w-full sm:w-46">
                 <InputField
                 maxLength={30}
                   value={companyName}
                   label="Brand/Company Name*"
                   placeholder="Enter Brand/Company Name"
                   type="text"
                   onChange={(e) => setCompanyName(e.target.value)}
                 />
               </div>
   
               <div className="w-full sm:w-46">
                 <InputField
                 maxLength={200}
                   value={description}
                   label="Bot Description"
                   placeholder="Enter Bot Description"
                   type="text"
                 onChange={(e)=> setDescription(e.target.value)}
                 />
               </div>
   
               <div className="w-full sm:w-46">
                 
                 <InputField
                   value={color}
                   label="Color*"
                   type="color"
                  onChange={(e)=> setColor(e.target.value)}
                 />
                 {/* <ColorPicker
                   disabled/> */}
               </div>
   
               <div className="w-full sm:w-46">
                 <InputField
                 maxLength={10}
                   value={phoneNumber}
                   label="Primary Phone Number*"
                   placeholder="Enter Primary Phone Number"
                   type="mobileNo"
                   onChange={(e)=>setPhoneNumber(e.target.value)}
                 />
               </div>
   
               <div className="w-full sm:w-46">
                 <InputField
                 maxLength={15}
                   value={phoneLabel}
                   label="Primary Phone Label*"
                   placeholder="Enter Primary Phone Label"
                   type="text"
                   onChange={(e) => setPhoneLabel(e.target.value)}
                 />
               </div>
   
               <div className="w-full sm:w-46">
                 <InputField
                   value={emailId}
                   label="Primary Email Id*"
                   placeholder="info@celitix.com"
                   type="email"
                  onChange={(e)=>setEmailId(e.target.value)}
                 />
               </div>
   
               <div className="w-full sm:w-46">
                 <InputField
                 maxLength={10}
                   value={emailLabel}
                   label="Primary Email label*"
                   placeholder="Email"
                   type="text"
                   onChange={(e) => setEmailLabel(e.target.value)}
                 />
               </div>
   
               <div className="w-full sm:w-46">
                 <InputField
                   value={website}
                   label="Website*"
                   placeholder="Enter URL"
                   type="url"
                   onChange={(e) => setWebsite(e.target.value)}
                 />
               </div>
   
               <div className="w-full sm:w-46">
                 <InputField
                 maxLength={20}
                   value={websiteLabel}
                   label="Website Label*"
                   placeholder="Website"
                   type="text"
                   onChange={(e) => setWebsiteLabel(e.target.value)}
                 />
               </div>
   
               <div className="w-full sm:w-46">
                 <InputField
                   value={privacy}
                   label="Privacy Policy URL*"
                   placeholder="Enter Privacy Policy URL"
                   type="text"
                   onChange={(e) => setPrivacy(e.target.value)}
                 />
               </div>
   
               <div className="w-full sm:w-46">
                 <InputField
                   value={termCondition}
                   label="Term & Conditions URL*"
                   placeholder="Enter Term & Conditions URL "
                   type="text"
                   onChange={(e) => setTermCondition(e.target.value)}
                 />
               </div>
   
               <div className="w-full sm:w-46">
                 <InputField
                 maxLength={15}
                   value={botLanguage}
                   label="Bot Language*"
                   placeholder="Enter Language Name "
                   type="text"
                   onChange={(e) => setBotLanguage(e.target.value)}
                 />
               </div>
   
               <div className="w-full sm:w-46">
                 <InputField
   
                   value={webHook}
                   label="Webhook URL*"
                   placeholder="Enter Webhook URL"
                   type="text"
                   onChange={(e) => setWebHook(e.target.value)}
                 />
               </div>
             </div>
           </div>
   
          
   
           {/* <div className="flex justify-center mt-5">
             <button className=" w-fit px-6 py-2 rounded-md bg-[#9b89eb] text-gray-800 font-semibold hover:bg-[#8180e2]  text-xl transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
             onClick={handleSubmit}
             >
               Submit
             </button>
           </div> */}
           </div>
        )}

        {activeStep === 1 && (
          <h1>step 2</h1>
        )}

        {activeStep === 2 && (
          <h3>step3</h3>
        )}

<div className="flex justify-between mt-8">
<Button variant="outlined" disabled={activeStep === 0} onClick={handleBack}>Back</Button>
  {activeStep === steps.length - 1 ? (
    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
  ) : (
    <Button variant="contained" onClick={handleNext}>Next</Button>
  )}
 
</div>

      </div>

    </div>
    <div className="flex justify-center items-center mt-15 popf min-h-[90vh]">
          {/* <div className="bg-gray-400"> */}

          <div className="p-6 max-w-80 border bg-gray-50 rounded-4xl shadow-gray-700 space-y-4 ">
            <div className="flex items-center justify-center">
              <div className="bg-gray-300 h-3 rounded-full w-25 "></div>
            </div>
            <div className="flex flex-col relative h-45 items-center">
              {/* <img
                src={IMG1}
                alt="Image Preview"
                className="w-75 rounded-t-2xl"
              /> */}
              <div className="flex justify-center items-center absolute bottom-0 ">
                {/* <img className="w-15 rounded-full  " src={IMG2} alt="Logo" /> */}
              </div>
            </div>
            <div>
              <div className="flex flex-col justify-center items-center">
                <p className="font-bold text-2xl"
                > {displayName}</p>
                <p className=" text-gray-400 text-center"> {description}
                
                </p>
              </div>

              <div className="flex flex-row justify-center rounded-xl border-gray-300 border-2 p-2 gap-6  mt-3 text-[#337ab7] text-center">
                <div className="">
                  <CallOutlinedIcon className="text-lg" />
                  <p>Call</p>
                </div>
                <div>
                  <LanguageOutlinedIcon className=" text-lg" />
                  <a href="#" target="_blank">
                    <p className="">Website</p>
                  </a>
                </div>
                <div className="">
                  <MailOutlineOutlinedIcon className="text-lg" />
                  <p>Email</p>
                </div>
              </div>

              <div className="flex flex-col gap-5 mt-5  ">
                <div className="border-t-2 border-gray-300 flex items-center gap-x-5 pt-2">
                  <CallOutlinedIcon className="text-lg  text-[#337ab7] " />
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-[#337ab7]" maxLength={10}>
                      +91 <span className="text-[#337ab7]">{phoneNumber}</span>
                    </p>
                    <p className="text-[#337ab7]">{phoneLabel}</p>
                  </div>
                </div>

                <div className=" border-t-2 border-gray-300 flex items-center gap-x-5 pt-2">
                  <LanguageOutlinedIcon className="text-[#337ab7] text-lg" />
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-[#337ab7]"> {website}</p>
                    <p className="text-[#337ab7]">{websiteLabel}</p>
                  </div>
                </div>

                <div className=" border-t-2 border-gray-300 flex items-center gap-x-5 pt-2">
                  <MailOutlineOutlinedIcon className="text-lg text-[#337ab7] " />
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-[#337ab7]" maxLength={15}>{emailId}</p>
                    <p className="text-[#337ab7]">{emailLabel}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center border-t-2 border-gray-300">
              <div className="bg-gray-300 h-10 rounded-full w-10 mt-2"></div>
            </div>
          </div>
          <div>
            {/* right-panel */}
            {/* <div className="">
             <label>
             Banner image<span
                    className="w-50"
                  ></span>
             </label>
                 
               <label>
               Bot Logo<span className="w-50"></span>
               </label>
               
                  
                <label>
                Short Description<span
                    className="w-50"
                  ></span>
                </label>
               
                  <label>
                  Color<span className="w-50"></span>
                  </label>
               <label>
               Label for phone Number<span
                   className="w-50"
                  ></span>
               </label>
               
                 <label>
                 Label for website<span
                  className="w-50"
                  ></span>
                 </label>
               
                
                  <label>
                  Label for email<span
                    className="w-50"
                    
                  ></span>
                  </label>
              </div> */}
            {/* left-panel */}

            {/* <div >
               <label>
               Bot name<span className="w-75"></span>
               </label>
                
               
               <label>
               Phone Number<span
                    className="w-50"
                  ></span>
              
               </label>
                 
               <label>
               Website<span className="w-50"></span>
               </label>
                 
              <label>
              Email<span className="w-50"></span>
              </label>
                    
              
              </div> */}
          </div>
    </div>
    </div>
  );
};

export default Dummy;



