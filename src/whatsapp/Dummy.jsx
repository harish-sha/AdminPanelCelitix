// // import { Button } from 'flowbite-react'
// // import React from 'react'
// // import { Sidebar } from "flowbite-react";
// // import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
// // import Pagination from '@mui/material/Pagination';
// // import Stack from '@mui/material/Stack';

// // import { Accordion } from "flowbite-react";


// // const Dummy = () => {

// //     return (
// //         <>
// //             {/* <div className='h-screen bg-white'>
// //                 <Sidebar aria-label="Sidebar with multi-level dropdown example" className='' >
// //                     <Sidebar.Items>
// //                         <Sidebar.ItemGroup>
// //                             <Sidebar.Item href="#" icon={HiChartPie}>
// //                                 Dashboard
// //                             </Sidebar.Item>
// //                             <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
// //                                 <Sidebar.Item href="#">Products</Sidebar.Item>
// //                                 <Sidebar.Item href="#">Sales</Sidebar.Item>
// //                                 <Sidebar.Item href="#">Refunds</Sidebar.Item>
// //                                 <Sidebar.Item href="#">Shipping</Sidebar.Item>
// //                             </Sidebar.Collapse>
// //                             <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
// //                                 <Sidebar.Item href="#">Products</Sidebar.Item>
// //                                 <Sidebar.Item href="#">Sales</Sidebar.Item>
// //                                 <Sidebar.Item href="#">Refunds</Sidebar.Item>
// //                                 <Sidebar.Item href="#">Shipping</Sidebar.Item>
// //                             </Sidebar.Collapse>
// //                             <Sidebar.Item href="#" icon={HiInbox}>
// //                                 Inbox
// //                             </Sidebar.Item>
// //                             <Sidebar.Item href="#" icon={HiUser}>
// //                                 Users
// //                             </Sidebar.Item>
// //                             <Sidebar.Item href="#" icon={HiShoppingBag}>
// //                                 Products
// //                             </Sidebar.Item>
// //                             <Sidebar.Item href="#" icon={HiArrowSmRight}>
// //                                 Sign In
// //                             </Sidebar.Item>
// //                             <Sidebar.Item href="#" icon={HiTable}>
// //                                 Sign Up
// //                             </Sidebar.Item>
// //                         </Sidebar.ItemGroup>
// //                     </Sidebar.Items>
// //                 </Sidebar>

// //             </div> */}

// //         </>
// //     )
// // }

// // export default Dummy



// import React, { useState } from 'react';
// import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
// import './Dummy.css'; // Import the CSS file for styling

// const LoginPage = () => {
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
//                         <h1>Create Account</h1>
//                         <div className="social-container">
//                             <a href="#" className="social">
//                                 <i className="fab fa-facebook-f"></i>
//                                 {/* <FacebookOutlinedIcon /> */}
//                             </a>
//                             <a href="#" className="social">
//                                 <i className="fab fa-google-plus-g"></i>
//                             </a>
//                             <a href="#" className="social">
//                                 <i className="fab fa-linkedin-in"></i>
//                             </a>
//                         </div>
//                         <span>or use your email for registration</span>
//                         <input type="text" placeholder="Name" />
//                         <input type="email" placeholder="Email" />
//                         <input type="password" placeholder="Password" />
//                         <button>Sign Up</button>
//                     </form>
//                 </div>

//                 <div className="form-container sign-in-container">
//                     <form action="#">
//                         <h1>Sign in</h1>
//                         <div className="social-container">
//                             <a href="#" className="social">
//                                 <i className="fab fa-facebook-f"></i>
//                             </a>
//                             <a href="#" className="social">
//                                 <i className="fab fa-google-plus-g"></i>
//                             </a>
//                             <a href="#" className="social">
//                                 <i className="fab fa-linkedin-in"></i>
//                             </a>
//                         </div>
//                         <span>or use your account</span>
//                         <input type="email" placeholder="Email" />
//                         <input type="password" placeholder="Password" />
//                         <a href="#" onClick={handleSignUpClick} >Forgot your password?</a>

//                         <button>Sign In</button>
//                     </form>
//                 </div>

//                 <div className="overlay-container">
//                     <div className="overlay">
//                         <div className="overlay-panel overlay-left">
//                             <h1>Welcome Back!</h1>
//                             <p>To keep connected with us please login with your personal info</p>
//                             <button className="ghost" onClick={handleSignInClick}>
//                                 Sign In
//                             </button>
//                         </div>
//                         <div className="overlay-panel overlay-right">
//                             <h1>Hello, Friend!</h1>
//                             <p>Enter your personal details and start your journey with us</p>
//                             <button className="ghost" onClick={handleSignUpClick}>
//                                 Sign Up
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     );
// };

// export default LoginPage;


import React, { useState } from "react";
import { MultiSelect } from 'primereact/multiselect';

const Dummy = () => {
    const [selectedCities, setSelectedCities] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    return (
        <div className="card flex justify-content-center">
            <MultiSelect value={selectedCities} onChange={(e) => setSelectedCities(e.value)} options={cities} optionLabel="name"
                filter placeholder="Select Cities" maxSelectedLabels={0} className="w-full md:w-20rem" />
        </div>
    )
}

export default Dummy