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

import React from "react";
import CommonTable from "../components/layout/CommonTable";

const Dummy = () => {

    return (
        <div className="w-250 p-5" >
            <CommonTable />
        </div>
    )
}

export default Dummy
