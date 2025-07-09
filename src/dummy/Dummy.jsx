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



// =======================================sidebar start =====================================
// import { Dispatch, SetStateAction, useState } from "react";
// import {
//     FiBarChart,
//     FiChevronDown,
//     FiChevronsRight,
//     FiDollarSign,
//     FiHome,
//     FiMonitor,
//     FiShoppingCart,
//     FiTag,
//     FiUsers,
//     FiEdit,
//     FiTrash,
//     FiShare,
//     FiPlusSquare,
// } from "react-icons/fi";
// import { motion } from "framer-motion";
// // import { IconType } from "react-icons";

// const Dummy = () => {
//     const [open, setOpen] = useState(false);

//     return (
//         <div className="flex bg-indigo-50">
//             <Sidebar />
//             <ExampleContent />
//         </div>
//     )
// }

// const Sidebar = () => {
//     const [open, setOpen] = useState(true);
//     const [selected, setSelected] = useState("Dashboard");

//     return (
//         <motion.nav
//             layout
//             className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
//             style={{
//                 width: open ? "225px" : "fit-content",
//             }}
//         >
//             <TitleSection open={open} />
//             <ToggleClose open={open} setOpen={setOpen} />

//             <div className="space-y-1">
//                 <Option
//                     Icon={FiHome}
//                     title="Dashboard"
//                     selected={selected}
//                     setSelected={setSelected}
//                     open={open}
//                 />
//                 <Option
//                     Icon={FiDollarSign}
//                     title="Sales"
//                     selected={selected}
//                     setSelected={setSelected}
//                     open={open}
//                     notifs={3}
//                     dropdownItems={["Daily Sales", "Monthly Sales", "Yearly Sales"]}
//                 />
//                 <Option
//                     Icon={FiMonitor}
//                     title="View Site"
//                     selected={selected}
//                     setSelected={setSelected}
//                     open={open}
//                 />
//                 <Option
//                     Icon={FiShoppingCart}
//                     title="Products"
//                     selected={selected}
//                     setSelected={setSelected}
//                     open={open}
//                     dropdownItems={["Add Product", "Manage Products", "Product Categories"]}
//                 />
//                 <Option
//                     Icon={FiTag}
//                     title="Tags"
//                     selected={selected}
//                     setSelected={setSelected}
//                     open={open}
//                 />
//                 <Option
//                     Icon={FiBarChart}
//                     title="Analytics"
//                     selected={selected}
//                     setSelected={setSelected}
//                     open={open}
//                 />
//                 <Option
//                     Icon={FiUsers}
//                     title="Members"
//                     selected={selected}
//                     setSelected={setSelected}
//                     open={open}
//                 />
//             </div>

//         </motion.nav>
//     );
// };

// const Option = ({ Icon, title, selected, setSelected, open, notifs, dropdownItems }) => {
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     return (
//         <motion.div layout className="relative">

//             <motion.button
//                 layout
//                 onClick={() => {
//                     setSelected(title);
//                     if (dropdownItems) setDropdownOpen((prev) => !prev);
//                 }}
//                 className={`relative flex h-10 w-full items-center rounded-md transition-colors ${selected === title ? "bg-indigo-100 text-indigo-800" : "text-slate-500 hover:bg-slate-100"}`}
//             >
//                 <motion.div
//                     layout
//                     className="grid h-full w-10 place-content-center text-lg"
//                 >
//                     <Icon />
//                 </motion.div>
//                 {open && (
//                     <motion.span
//                         layout
//                         initial={{ opacity: 0, y: 12 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.125 }}
//                         className="text-xs font-medium"
//                     >
//                         {title}
//                     </motion.span>
//                 )}

//                 {notifs && open && (
//                     <motion.span
//                         initial={{ scale: 0, opacity: 0 }}
//                         animate={{
//                             opacity: 1,
//                             scale: 1,
//                         }}
//                         style={{ y: "-50%" }}
//                         transition={{ delay: 0.5 }}
//                         className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
//                     >
//                         {notifs}
//                     </motion.span>
//                 )}
//             </motion.button>

//             {/* Dropdown Menu */}
//             {dropdownItems && dropdownOpen && (
//                 <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="absolute left-10 top-full mt-1 w-40 bg-white shadow-lg rounded-md border border-slate-200 z-10"
//                 >
//                     {dropdownItems.map((item, index) => (
//                         <button
//                             key={index}
//                             onClick={() => console.log(`Clicked ${item}`)}
//                             className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
//                         >
//                             {item}
//                         </button>
//                     ))}
//                 </motion.div>
//             )}
//         </motion.div>

//     );
// };

// const TitleSection = ({ open }) => {
//     return (
//         <div className="mb-3 border-b border-slate-300 pb-3">
//             <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
//                 <div className="flex items-center gap-2">
//                     <Logo />
//                     {open && (
//                         <motion.div
//                             layout
//                             initial={{ opacity: 0, y: 12 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.125 }}
//                         >
//                             <span className="block text-xs font-semibold">TomIsLoading</span>
//                             <span className="block text-xs text-slate-500">Pro Plan</span>
//                         </motion.div>
//                     )}
//                 </div>
//                 {open && <FiChevronDown className="mr-2" />}
//             </div>
//         </div>
//     );
// };

// const Logo = () => {
//     // Temp logo from https://logoipsum.com/
//     return (
//         <motion.div
//             layout
//             className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
//         >
//             <svg
//                 width="24"
//                 height="auto"
//                 viewBox="0 0 50 39"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="fill-slate-50"
//             >
//                 <path
//                     d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
//                     stopColor="#000000"
//                 ></path>
//                 <path
//                     d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
//                     stopColor="#000000"
//                 ></path>
//             </svg>
//         </motion.div>
//     );
// };

// const ToggleClose = ({ open, setOpen }) => {
//     return (
//         <motion.button
//             layout
//             onClick={() => setOpen((pv) => !pv)}
//             className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
//         >
//             <div className="flex items-center p-2">
//                 <motion.div
//                     layout
//                     className="grid size-10 place-content-center text-lg"
//                 >
//                     <FiChevronsRight
//                         className={`transition-transform ${open && "rotate-180"}`}
//                     />
//                 </motion.div>
//                 {open && (
//                     <motion.span
//                         layout
//                         initial={{ opacity: 0, y: 12 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.125 }}
//                         className="text-xs font-medium"
//                     >
//                         Hide
//                     </motion.span>
//                 )}
//             </div>
//         </motion.button>
//     );
// };

// const wrapperVariants = {
//     open: {
//         scaleY: 1,
//         transition: {
//             when: "beforeChildren",
//             staggerChildren: 0.1,
//         },
//     },
//     closed: {
//         scaleY: 0,
//         transition: {
//             when: "afterChildren",
//             staggerChildren: 0.1,
//         },
//     },
// };

// const iconVariants = {
//     open: { rotate: 180 },
//     closed: { rotate: 0 },
// };

// const itemVariants = {
//     open: {
//         opacity: 1,
//         y: 0,
//         transition: {
//             when: "beforeChildren",
//         },
//     },
//     closed: {
//         opacity: 0,
//         y: -15,
//         transition: {
//             when: "afterChildren",
//         },
//     },
// };

// const actionIconVariants = {
//     open: { scale: 1, y: 0 },
//     closed: { scale: 0, y: -7 },
// };

// const Optionbtn = ({ text, Icon, setOpen }) => {
//     return (
//         <motion.li
//             variants={itemVariants}
//             onClick={() => setOpen(false)}
//             className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
//         >
//             <motion.span variants={actionIconVariants}>
//                 <Icon />
//             </motion.span>
//             <span>{text}</span>
//         </motion.li>
//     );
// };

// const ExampleContent = () => {
//     const [open, setOpen] = useState(false);


//     return (



//         <div className="w-full h-full">
//             <div className="p-8  flex items-center justify-center bg-white">
//                 <motion.div animate={open ? "open" : "closed"} className="relative">
//                     <button
//                         onClick={() => setOpen((pv) => !pv)}
//                         className="flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-500 transition-colors"
//                     >
//                         <span className="font-medium text-sm">Post actions</span>
//                         <motion.span variants={iconVariants}>
//                             <FiChevronDown />
//                         </motion.span>
//                     </button>

//                     <motion.ul
//                         initial={wrapperVariants.closed}
//                         variants={wrapperVariants}
//                         style={{ originY: "top", translateX: "-50%" }}
//                         className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
//                     >
//                         <Optionbtn setOpen={setOpen} Icon={FiEdit} text="Edit" />
//                         <Optionbtn setOpen={setOpen} Icon={FiPlusSquare} text="Duplicate" />
//                         <Optionbtn setOpen={setOpen} Icon={FiShare} text="Share" />
//                         <Optionbtn setOpen={setOpen} Icon={FiTrash} text="Remove" />
//                     </motion.ul>
//                 </motion.div>
//             </div>



//         </div>
//     )
// }

// export default Dummy
// =======================================sidebar end =====================================

import React, { useState, useEffect, useRef } from "react";
import { FiPlus, FiTrash, FiClock, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import { AnimatePresence, useAnimate, usePresence } from "framer-motion";
import { SiAmazon, SiGithub, SiGoogle, SiMeta, SiTwitch } from "react-icons/si";
import { twMerge } from "tailwind-merge";

const Dummy = () => {
    return (
        <div className="flex flex-col w-full bg-neutral-900 text-neutral-50">
            {/* kanban board */}
            {/* <Board /> */}
            {/* Todo list */}
            <VanishList />
            {/* origami logo */}
            {/* <DivOrigami /> */}
        </div>
    );
};

// ======================kanban start================================

const Board = () => {
    const [cards, setCards] = useState(DEFAULT_CARDS);

    return (
        <div className="flex h-full w-full gap-3 overflow-scroll p-12">
            <Column
                title="Backlog"
                column="backlog"
                headingColor="text-neutral-500"
                cards={cards}
                setCards={setCards}
            />
            <Column
                title="TODO"
                column="todo"
                headingColor="text-yellow-200"
                cards={cards}
                setCards={setCards}
            />
            <Column
                title="In progress"
                column="doing"
                headingColor="text-blue-200"
                cards={cards}
                setCards={setCards}
            />
            <Column
                title="Complete"
                column="done"
                headingColor="text-emerald-200"
                cards={cards}
                setCards={setCards}
            />
            <BurnBarrel setCards={setCards} />
        </div>
    );
};

const Column = ({ title, headingColor, cards, column, setCards }) => {
    const [active, setActive] = useState(false);

    const handleDragStart = (e, card) => {
        e.dataTransfer.setData("cardId", card.id);
    };

    const handleDragEnd = (e) => {
        const cardId = e.dataTransfer.getData("cardId");

        setActive(false);
        clearHighlights();

        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);

        const before = element.dataset.before || "-1";

        if (before !== cardId) {
            let copy = [...cards];

            let cardToTransfer = copy.find((c) => c.id === cardId);
            if (!cardToTransfer) return;
            cardToTransfer = { ...cardToTransfer, column };

            copy = copy.filter((c) => c.id !== cardId);

            const moveToBack = before === "-1";

            if (moveToBack) {
                copy.push(cardToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((el) => el.id === before);
                if (insertAtIndex === undefined) return;

                copy.splice(insertAtIndex, 0, cardToTransfer);
            }

            setCards(copy);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        highlightIndicator(e);

        setActive(true);
    };

    const clearHighlights = (els) => {
        const indicators = els || getIndicators();

        indicators.forEach((i) => {
            i.style.opacity = "0";
        });
    };

    const highlightIndicator = (e) => {
        const indicators = getIndicators();

        clearHighlights(indicators);

        const el = getNearestIndicator(e, indicators);

        el.element.style.opacity = "1";
    };

    const getNearestIndicator = (e, indicators) => {
        const DISTANCE_OFFSET = 50;

        const el = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();

                const offset = e.clientY - (box.top + DISTANCE_OFFSET);

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            }
        );

        return el;
    };

    const getIndicators = () => {
        return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
    };

    const handleDragLeave = () => {
        clearHighlights();
        setActive(false);
    };

    const filteredCards = cards.filter((c) => c.column === column);

    return (
        <div className="w-56 shrink-0">
            <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-medium ${headingColor}`}>{title}</h3>
                <span className="rounded text-sm text-neutral-400">
                    {filteredCards.length}
                </span>
            </div>
            <div
                onDrop={handleDragEnd}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"
                    }`}
            >
                {filteredCards.map((c) => {
                    return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
                })}
                <DropIndicator beforeId={null} column={column} />
                <AddCard column={column} setCards={setCards} />
            </div>
        </div>
    );
};

const Card = ({ title, id, column, handleDragStart }) => {
    return (
        <>
            <DropIndicator beforeId={id} column={column} />
            <motion.div
                layout
                layoutId={id}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, { title, id, column })}
                className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
            >
                <p className="text-sm text-neutral-100">{title}</p>
            </motion.div>
        </>
    );
};

const DropIndicator = ({ beforeId, column }) => {
    return (
        <div
            data-before={beforeId || "-1"}
            data-column={column}
            className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
        />
    );
};

const BurnBarrel = ({ setCards }) => {
    const [active, setActive] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setActive(true);
    };

    const handleDragLeave = () => {
        setActive(false);
    };

    const handleDragEnd = (e) => {
        const cardId = e.dataTransfer.getData("cardId");

        setCards((pv) => pv.filter((c) => c.id !== cardId));

        setActive(false);
    };

    return (
        <div
            onDrop={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${active
                ? "border-red-800 bg-red-800/20 text-red-500"
                : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
                }`}
        >
            {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
        </div>
    );
};

const AddCard = ({ column, setCards }) => {
    const [text, setText] = useState("");
    const [adding, setAdding] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!text.trim().length) return;

        const newCard = {
            column,
            title: text.trim(),
            id: Math.random().toString(),
        };

        setCards((pv) => [...pv, newCard]);

        setAdding(false);
    };

    return (
        <>
            {adding ? (
                <motion.form layout onSubmit={handleSubmit}>
                    <textarea
                        onChange={(e) => setText(e.target.value)}
                        autoFocus
                        placeholder="Add new task..."
                        className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
                    />
                    <div className="mt-1.5 flex items-center justify-end gap-1.5">
                        <button
                            onClick={() => setAdding(false)}
                            className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
                        >
                            <span>Add</span>
                            <FiPlus />
                        </button>
                    </div>
                </motion.form>
            ) : (
                <motion.button
                    layout
                    onClick={() => setAdding(true)}
                    className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
                >
                    <span>Add card</span>
                    <FiPlus />
                </motion.button>
            )}
        </>
    );
};

const DEFAULT_CARDS = [
    // BACKLOG
    { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
    { title: "SOX compliance checklist", id: "2", column: "backlog" },
    { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
    { title: "Document Notifications service", id: "4", column: "backlog" },
    // TODO
    {
        title: "Research DB options for new microservice",
        id: "5",
        column: "todo",
    },
    { title: "Postmortem for outage", id: "6", column: "todo" },
    { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

    // DOING
    {
        title: "Refactor context providers to use Zustand",
        id: "8",
        column: "doing",
    },
    { title: "Add logging to daily CRON", id: "9", column: "doing" },
    // DONE
    {
        title: "Set up DD dashboards for Lambda listener",
        id: "10",
        column: "done",
    },
];

// ======================kanban End================================


// ====================todos code start=========================

const VanishList = () => {
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: "Take out trash",
            checked: false,
            time: "5 mins",
        },
        {
            id: 2,
            text: "Do laundry",
            checked: false,
            time: "10 mins",
        },
        {
            id: 3,
            text: "Have existential crisis",
            checked: true,
            time: "12 hrs",
        },
        {
            id: 4,
            text: "Get dog food",
            checked: false,
            time: "1 hrs",
        },
    ]);

    const handleCheck = (id) => {
        setTodos((pv) =>
            pv.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
        );
    };

    const removeElement = (id) => {
        setTodos((pv) => pv.filter((t) => t.id !== id));
    };

    return (
        <section
            className="min-h-screen bg-zinc-950 py-24"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%2318181b'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
            }}
        >
            <div className="mx-auto w-full max-w-xl px-4">
                <Header />
                <Todos
                    removeElement={removeElement}
                    todos={todos}
                    handleCheck={handleCheck}
                />
            </div>
            <Form setTodos={setTodos} />
        </section>
    );
};

const Header = () => {
    return (
        <div className="mb-6">
            <h1 className="text-xl font-medium text-white">Good morning! ☀️</h1>
            <p className="text-zinc-400">Let's see what we've got to do today.</p>
        </div>
    );
};

const Form = ({ setTodos }) => {
    const [visible, setVisible] = useState(false);

    const [time, setTime] = useState(15);
    const [text, setText] = useState("");
    const [unit, setUnit] = useState("mins");

    const handleSubmit = () => {
        if (!text.length) {
            return;
        }

        setTodos((pv) => [
            {
                id: Math.random(),
                text,
                checked: false,
                time: `${time} ${unit}`,
            },
            ...pv,
        ]);

        setTime(15);
        setText("");
        setUnit("mins");
    };

    return (
        <div className="fixed bottom-6 left-1/2 w-full max-w-xl -translate-x-1/2 px-4">
            <AnimatePresence>
                {visible && (
                    <motion.form
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 25 }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                        className="mb-6 w-full rounded border border-zinc-700 bg-zinc-900 p-3"
                    >
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="What do you need to do?"
                            className="h-24 w-full resize-none rounded bg-zinc-900 p-3 text-sm text-zinc-50 placeholder-zinc-500 caret-zinc-50 focus:outline-0"
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <input
                                    type="number"
                                    className="w-24 rounded bg-zinc-700 px-1.5 py-1 text-sm text-zinc-50 focus:outline-0"
                                    value={time}
                                    onChange={(e) => setTime(parseInt(e.target.value))}
                                />
                                <button
                                    type="button"
                                    onClick={() => setUnit("mins")}
                                    className={`rounded px-1.5 py-1 text-xs ${unit === "mins" ? "bg-white text-zinc-950" : "bg-zinc-300/20 text-zinc-300 transition-colors hover:bg-zinc-600 hover:text-zinc-200"}`}
                                >
                                    mins
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUnit("hrs")}
                                    className={`rounded px-1.5 py-1 text-xs ${unit === "hrs" ? "bg-white text-zinc-950" : "bg-zinc-300/20 text-zinc-300 transition-colors hover:bg-zinc-600 hover:text-zinc-200"}`}
                                >
                                    hrs
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="rounded bg-indigo-600 px-1.5 py-1 text-xs text-indigo-50 transition-colors hover:bg-indigo-500"
                            >
                                Submit
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
            <button
                onClick={() => setVisible((pv) => !pv)}
                className="grid w-full place-content-center rounded-full border border-zinc-700 bg-zinc-900 py-3 text-lg text-white transition-colors hover:bg-zinc-800 active:bg-zinc-900"
            >
                <FiPlus
                    className={`transition-transform ${visible ? "rotate-45" : "rotate-0"}`}
                />
            </button>
        </div>
    );
};

const Todos = ({ todos, handleCheck, removeElement }) => {
    return (
        <div className="w-full space-y-3">
            <AnimatePresence>
                {todos.map((t) => (
                    <Todo
                        handleCheck={handleCheck}
                        removeElement={removeElement}
                        id={t.id}
                        key={t.id}
                        checked={t.checked}
                        time={t.time}
                    >
                        {t.text}
                    </Todo>
                ))}
            </AnimatePresence>
        </div>
    );
};

const Todo = ({ removeElement, handleCheck, id, children, checked, time }) => {
    const [isPresent, safeToRemove] = usePresence();
    const [scope, animate] = useAnimate();

    useEffect(() => {
        if (!isPresent) {
            const exitAnimation = async () => {
                animate(
                    "p",
                    {
                        color: checked ? "#6ee7b7" : "#fca5a5",
                    },
                    {
                        ease: "easeIn",
                        duration: 0.125,
                    }
                );
                await animate(
                    scope.current,
                    {
                        scale: 1.025,
                    },
                    {
                        ease: "easeIn",
                        duration: 0.125,
                    }
                );

                await animate(
                    scope.current,
                    {
                        opacity: 0,
                        x: checked ? 24 : -24,
                    },
                    {
                        delay: 0.75,
                    }
                );
                safeToRemove();
            };

            exitAnimation();
        }
    }, [isPresent]);

    return (
        <motion.div
            ref={scope}
            layout
            className="relative flex w-full items-center gap-3 rounded border border-zinc-700 bg-zinc-900 p-3"
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={() => handleCheck(id)}
                className="size-4 accent-indigo-400"
            />

            <p
                className={`text-white transition-colors ${checked && "text-zinc-400"}`}
            >
                {children}
            </p>
            <div className="ml-auto flex gap-1.5">
                <div className="flex items-center gap-1.5 whitespace-nowrap rounded bg-zinc-800 px-1.5 py-1 text-xs text-zinc-400">
                    <FiClock />
                    <span>{time}</span>
                </div>
                <button
                    onClick={() => removeElement(id)}
                    className="rounded bg-red-300/20 px-1.5 py-1 text-xs text-red-300 transition-colors hover:bg-red-600 hover:text-red-200"
                >
                    <FiTrash2 />
                </button>
            </div>
        </motion.div>
    );
};

// ====================todos code End=========================

// =======================origami logo start=====================================
const DivOrigami = () => {
    return (
        <section className="flex h-72 flex-col items-center justify-center gap-12 bg-neutral-950 px-4 py-24 md:flex-row">
            <LogoRolodex
                items={[
                    <LogoItem key={1} className="bg-orange-300 text-neutral-900">
                        <SiAmazon />
                    </LogoItem>,
                    <LogoItem key={2} className="bg-green-300 text-neutral-900">
                        <SiGoogle />
                    </LogoItem>,
                    <LogoItem key={3} className="bg-blue-300 text-neutral-900">
                        <SiMeta />
                    </LogoItem>,
                    <LogoItem key={4} className="bg-white text-black">
                        <SiGithub />
                    </LogoItem>,
                    <LogoItem key={5} className="bg-purple-300 text-neutral-900">
                        <SiTwitch />
                    </LogoItem>,
                ]}
            />
        </section>
    );
};

const DELAY_IN_MS = 2500;
const TRANSITION_DURATION_IN_SECS = 1.5;

const LogoRolodex = ({ items }) => {
    const intervalRef = useRef(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setIndex((pv) => pv + 1);
        }, DELAY_IN_MS);

        return () => {
            clearInterval(intervalRef.current || undefined);
        };
    }, []);

    return (
        <div
            style={{
                transform: "rotateY(-20deg)",
                transformStyle: "preserve-3d",
            }}
            className="relative z-0 h-44 w-60 shrink-0 rounded-xl border border-neutral-700 bg-neutral-800"
        >
            <AnimatePresence mode="sync">
                <motion.div
                    style={{
                        y: "-50%",
                        x: "-50%",
                        clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                        zIndex: -index,
                        backfaceVisibility: "hidden",
                    }}
                    key={index}
                    transition={{
                        duration: TRANSITION_DURATION_IN_SECS,
                        ease: "easeInOut",
                    }}
                    initial={{ rotateX: "0deg" }}
                    animate={{ rotateX: "0deg" }}
                    exit={{ rotateX: "-180deg" }}
                    className="absolute left-1/2 top-1/2"
                >
                    {items[index % items.length]}
                </motion.div>
                <motion.div
                    style={{
                        y: "-50%",
                        x: "-50%",
                        clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
                        zIndex: index,
                        backfaceVisibility: "hidden",
                    }}
                    key={(index + 1) * 2}
                    initial={{ rotateX: "180deg" }}
                    animate={{ rotateX: "0deg" }}
                    exit={{ rotateX: "0deg" }}
                    transition={{
                        duration: TRANSITION_DURATION_IN_SECS,
                        ease: "easeInOut",
                    }}
                    className="absolute left-1/2 top-1/2"
                >
                    {items[index % items.length]}
                </motion.div>
            </AnimatePresence>

            <hr
                style={{
                    transform: "translateZ(1px)",
                }}
                className="absolute left-0 right-0 top-1/2 z-[999999999] -translate-y-1/2 border-t-2 border-neutral-800"
            />
        </div>
    );
};

const LogoItem = ({ children, className }) => {
    return (
        <div
            className={twMerge(
                "grid h-36 w-52 place-content-center rounded-lg bg-neutral-700 text-6xl text-neutral-50",
                className
            )}
        >
            {children}
        </div>
    );
};
// =======================origami logo end====================================

export default Dummy