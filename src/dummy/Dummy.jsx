import React, { useState } from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { FaGoogle } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import './Dummy.css';

import celitix_logo from '../assets/images/celitix-logo-white.svg'
import toast from 'react-hot-toast';

const Dummy = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    // Toggle between Sign In and Sign Up
    const handleSignUpClick = () => {
        setIsSignUp(true);
    };

    const handleSignInClick = () => {
        setIsSignUp(false);
    };

    const handletoast = () => {
        // toast(`"InsertCount": 0,
        //     "TotalTemplate": 78,
        //     "Approved": 68,
        //     "Rejected": 10,
        //     "DuplicateCount": 67`,
        //     {
        //         duration: 6000,
        //     }
        // );
        toast((t) => (
            <span>
              Custom and <b>bold</b>
              <button onClick={() => toast.dismiss(t.id)}>
                Dismiss
              </button>
            </span>
          ));
    }

    return (
        <div className='parent-container-login' >

            <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1 className='head' >Create Account</h1>
                        <div className="social-container flex gap-3">
                            <a href="#" className="social"  >
                                {/* <i className="fab fa-facebook-f"></i> */}
                                <FacebookOutlinedIcon />
                            </a>
                            <a href="#" className="social">
                                {/* <i className="fab fa-google-plus-g"></i> */}
                                <FaGoogle />
                            </a>
                            <a href="#" className="social">
                                {/* <i className="fab fa-linkedin-in"></i> */}
                                <FaLinkedin />
                            </a>
                        </div>
                        <span className='span' >or use your email for registration</span>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button className="btn" >Sign Up</button>
                    </form>
                </div>

                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1 className='head'>Sign in</h1>
                        <div className="social-container flex gap-4">
                            <a href="#" className="social" onClick={handletoast} >
                                {/* <i className="fab fa-facebook-f"></i> */}
                                <FacebookOutlinedIcon />
                            </a>
                            <a href="#" className="social">
                                {/* <i className="fab fa-google-plus-g"></i> */}
                                <FaGoogle />
                            </a>
                            <a href="#" className="social">
                                {/* <i className="fab fa-linkedin-in"></i> */}
                                <FaLinkedin />
                            </a>
                        </div>
                        <span className='span'>or use your account</span>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="#" onClick={handleSignUpClick} >Forgot your password?</a>

                        <button className="btn" >Sign In</button>
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className='head'>Welcome Back!</h1>
                            <p className='para' >To keep connected with us please login with your personal info</p>
                            <button className="btn" onClick={handleSignInClick}>
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            {/* <h1 className='head'>Hello, Friend!</h1> */}
                            <a href="index.jsp">
                                <img src={celitix_logo} className="mb-2 w-65" alt="Celitix"></img>
                            </a>
                            <p className='para' >Welcome to the Future of Customer Communication - Your Engagement Journey Begins Here.</p>
                            {/* <button className="ghost" onClick={handleSignUpClick}>
                                Sign Up
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Dummy;

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
