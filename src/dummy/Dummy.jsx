// import React, { useState } from 'react';
// import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
// import { FaGoogle } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa";
// import './Dummy.css';

// import celitix_logo from '../assets/images/celitix-logo-white.svg'
// import toast from 'react-hot-toast';

// const Dummy = () => {
//     const [isSignUp, setIsSignUp] = useState(false);

//     // Toggle between Sign In and Sign Up
//     const handleSignUpClick = () => {
//         setIsSignUp(true);
//     };

//     const handleSignInClick = () => {
//         setIsSignUp(false);
//     };

//     const handletoast = () => {
//         // toast(`"InsertCount": 0,
//         //     "TotalTemplate": 78,
//         //     "Approved": 68,
//         //     "Rejected": 10,
//         //     "DuplicateCount": 67`,
//         //     {
//         //         duration: 6000,
//         //     }
//         // );
//         toast((t) => (
//             <span>
//               Custom and <b>bold</b>
//               <button onClick={() => toast.dismiss(t.id)}>
//                 Dismiss
//               </button>
//             </span>
//           ));
//     }

//     return (
//         <div className='parent-container-login' >

//             <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
//                 <div className="form-container sign-up-container">
//                     <form action="#">
//                         <h1 className='head' >Create Account</h1>
//                         <div className="social-container flex gap-3">
//                             <a href="#" className="social"  >
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
//                         <div className="social-container flex gap-4">
//                             <a href="#" className="social" onClick={handletoast} >
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


import { Dispatch, SetStateAction, useState } from "react";
import {
    FiBarChart,
    FiChevronDown,
    FiChevronsRight,
    FiDollarSign,
    FiHome,
    FiMonitor,
    FiShoppingCart,
    FiTag,
    FiUsers,
    FiEdit,
    FiTrash,
    FiShare,
    FiPlusSquare,
} from "react-icons/fi";
import { motion } from "framer-motion";
// import { IconType } from "react-icons";

const Dummy = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex bg-indigo-50">
            <Sidebar />
            <ExampleContent />
        </div>
    )
}

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <motion.nav
            layout
            className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
            style={{
                width: open ? "225px" : "fit-content",
            }}
        >
            <TitleSection open={open} />
            <ToggleClose open={open} setOpen={setOpen} />

            <div className="space-y-1">
                <Option
                    Icon={FiHome}
                    title="Dashboard"
                    selected={selected}
                    setSelected={setSelected}
                    open={open}
                />
                <Option
                    Icon={FiDollarSign}
                    title="Sales"
                    selected={selected}
                    setSelected={setSelected}
                    open={open}
                    notifs={3}
                    dropdownItems={["Daily Sales", "Monthly Sales", "Yearly Sales"]}
                />
                <Option
                    Icon={FiMonitor}
                    title="View Site"
                    selected={selected}
                    setSelected={setSelected}
                    open={open}
                />
                <Option
                    Icon={FiShoppingCart}
                    title="Products"
                    selected={selected}
                    setSelected={setSelected}
                    open={open}
                    dropdownItems={["Add Product", "Manage Products", "Product Categories"]}
                />
                <Option
                    Icon={FiTag}
                    title="Tags"
                    selected={selected}
                    setSelected={setSelected}
                    open={open}
                />
                <Option
                    Icon={FiBarChart}
                    title="Analytics"
                    selected={selected}
                    setSelected={setSelected}
                    open={open}
                />
                <Option
                    Icon={FiUsers}
                    title="Members"
                    selected={selected}
                    setSelected={setSelected}
                    open={open}
                />
            </div>

        </motion.nav>
    );
};

const Option = ({ Icon, title, selected, setSelected, open, notifs, dropdownItems }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return (
        <motion.div layout className="relative">

            <motion.button
                layout
                onClick={() => {
                    setSelected(title);
                    if (dropdownItems) setDropdownOpen((prev) => !prev);
                }}
                className={`relative flex h-10 w-full items-center rounded-md transition-colors ${selected === title ? "bg-indigo-100 text-indigo-800" : "text-slate-500 hover:bg-slate-100"}`}
            >
                <motion.div
                    layout
                    className="grid h-full w-10 place-content-center text-lg"
                >
                    <Icon />
                </motion.div>
                {open && (
                    <motion.span
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.125 }}
                        className="text-xs font-medium"
                    >
                        {title}
                    </motion.span>
                )}

                {notifs && open && (
                    <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        style={{ y: "-50%" }}
                        transition={{ delay: 0.5 }}
                        className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
                    >
                        {notifs}
                    </motion.span>
                )}
            </motion.button>

            {/* Dropdown Menu */}
            {dropdownItems && dropdownOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-10 top-full mt-1 w-40 bg-white shadow-lg rounded-md border border-slate-200 z-10"
                >
                    {dropdownItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => console.log(`Clicked ${item}`)}
                            className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
                        >
                            {item}
                        </button>
                    ))}
                </motion.div>
            )}
        </motion.div>

    );
};

const TitleSection = ({ open }) => {
    return (
        <div className="mb-3 border-b border-slate-300 pb-3">
            <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
                <div className="flex items-center gap-2">
                    <Logo />
                    {open && (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.125 }}
                        >
                            <span className="block text-xs font-semibold">TomIsLoading</span>
                            <span className="block text-xs text-slate-500">Pro Plan</span>
                        </motion.div>
                    )}
                </div>
                {open && <FiChevronDown className="mr-2" />}
            </div>
        </div>
    );
};

const Logo = () => {
    // Temp logo from https://logoipsum.com/
    return (
        <motion.div
            layout
            className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
        >
            <svg
                width="24"
                height="auto"
                viewBox="0 0 50 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-slate-50"
            >
                <path
                    d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
                    stopColor="#000000"
                ></path>
                <path
                    d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                    stopColor="#000000"
                ></path>
            </svg>
        </motion.div>
    );
};

const ToggleClose = ({ open, setOpen }) => {
    return (
        <motion.button
            layout
            onClick={() => setOpen((pv) => !pv)}
            className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
        >
            <div className="flex items-center p-2">
                <motion.div
                    layout
                    className="grid size-10 place-content-center text-lg"
                >
                    <FiChevronsRight
                        className={`transition-transform ${open && "rotate-180"}`}
                    />
                </motion.div>
                {open && (
                    <motion.span
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.125 }}
                        className="text-xs font-medium"
                    >
                        Hide
                    </motion.span>
                )}
            </div>
        </motion.button>
    );
};

const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
        },
    },
};

const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
};

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
        },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: {
            when: "afterChildren",
        },
    },
};

const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
};

const Optionbtn = ({ text, Icon, setOpen }) => {
    return (
        <motion.li
            variants={itemVariants}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
        >
            <motion.span variants={actionIconVariants}>
                <Icon />
            </motion.span>
            <span>{text}</span>
        </motion.li>
    );
};

const ExampleContent = () => {
    const [open, setOpen] = useState(false);


    return (



        <div className="w-full h-full">
            <div className="p-8  flex items-center justify-center bg-white">
                <motion.div animate={open ? "open" : "closed"} className="relative">
                    <button
                        onClick={() => setOpen((pv) => !pv)}
                        className="flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-500 transition-colors"
                    >
                        <span className="font-medium text-sm">Post actions</span>
                        <motion.span variants={iconVariants}>
                            <FiChevronDown />
                        </motion.span>
                    </button>

                    <motion.ul
                        initial={wrapperVariants.closed}
                        variants={wrapperVariants}
                        style={{ originY: "top", translateX: "-50%" }}
                        className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
                    >
                        <Optionbtn setOpen={setOpen} Icon={FiEdit} text="Edit" />
                        <Optionbtn setOpen={setOpen} Icon={FiPlusSquare} text="Duplicate" />
                        <Optionbtn setOpen={setOpen} Icon={FiShare} text="Share" />
                        <Optionbtn setOpen={setOpen} Icon={FiTrash} text="Remove" />
                    </motion.ul>
                </motion.div>
            </div>



        </div>
    )
}

export default Dummy