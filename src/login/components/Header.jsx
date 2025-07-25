import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaBars, FaTimes } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import {
    MdSms,
    MdMarkunread,
    MdChatBubbleOutline,
    MdVerifiedUser,
    MdCallMissed,
    MdPhone,
    MdSupportAgent,
    MdCall,
    MdEmail,
    MdRateReview, MdPreview,
    MdOutlineWhatsapp
} from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { MdHome, MdBarChart, MdPieChart } from "react-icons/md";
import { motion } from "framer-motion";


import { AboutUsicon, Authenticationicon, Careersicon, celitixheader, Channels, Click2callicon, Ecommerceicon, Educationicon, Emailicon, Financeicon, FoodProductionicon, Healthcareicon, IBDicon, Industries, MissedCallicon, OBDicon, RCSicon, RealEstateicon, ServiceBasedicon, SMSicon, TechStartupsicon, Tourismicon, twoWaySMSicon, WhatsAppicon } from '../../assets/images.js';

// import { celitixheader } from '../../assets/images';
import LogBtn from './LogBtn';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isChannelsOpen, setIsChannelsOpen] = useState(false);
    const [isCompaniesOpen, setIsCompaniesOpen] = useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);
    const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
    const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const navigate = useNavigate();

    const iconMap = {
        SMS: <MdSms className="text-[#9B44B6] text-2xl" />,
        '2 Way SMS': <MdMarkunread className="text-[#9B44B6] text-2xl" />,
        RCS: <MdChatBubbleOutline className="text-[#9B44B6] text-2xl" />,
        WhatsApp: < MdOutlineWhatsapp className="text-[#9B44B6] text-2xl" />,
        Authentication: <MdVerifiedUser className="text-[#9B44B6] text-2xl" />,
        OBD: <MdPhone className="text-[#9B44B6] text-2xl" />,
        IBD: <MdCall className="text-[#9B44B6] text-2xl" />,
        'Missed Call': <MdCallMissed className="text-[#9B44B6] text-2xl" />,
        Click2Call: <MdSupportAgent className="text-[#9B44B6] text-2xl" />,
        Blog: <MdRateReview className="text-[#9B44B6] text-2xl" />,
        Email: <MdEmail teReview className="text-[#9B44B6] text-2xl" />,
        'Case Studies': <MdPreview className="text-[#9B44B6] text-2xl" />
    };


    const ChannelItem = ({ title, desc, to }) => (
        <div
            onClick={() => navigate(to)}
            className="flex items-start gap-2 p-2 rounded-md transition-all duration-300 cursor-pointer 
                   hover:bg-gray-50 hover:shadow-md hover:scale-105"
        >
            <div className="text-[#9B44B6] text-2xl">{iconMap[title]}</div>
            <div>
                <div className="font-semibold">{title}</div>
                <div className="text-sm text-gray-600">{desc}</div>
            </div>
        </div>
    );

    const ResourcesItem = ({ title, desc, to }) => (
        <div
            onClick={() => navigate(to)}
            className="flex items-center gap-2 p-2 rounded-md transition-all duration-300 cursor-pointer 
                   hover:bg-gray-50 hover:shadow-md hover:scale-105 "
        >
            <div className="text-[#9B44B6] text-2xl">{iconMap[title]}</div>
            <div>
                <div className="font-semibold text-sm">{title}</div>
                {/* <div className="text-sm text-gray-600">{desc}</div> */}
            </div>
        </div>
    );


    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 2);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const WEBSITE_BASEURL = import.meta.env.VITE_WEBSITE_URL;

    return (
        <>

            {/* <div className="bg-gradient-to-r from-blue-800 to-purple-600 text-white text-sm md:px-3 px-1 py-2 flex justify-between items-center flex-wrap"> */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}

                className="bg-[#9B44B6] text-white text-sm md:px-3 px-1 pt-1 pb-0 flex justify-between items-center flex-wrap">
                {/* Email Section */}
                <div className="flex items-center gap-1 md:gap-2 mb-2">
                    <FaEnvelope />
                    <span>support@celitix.com</span>
                </div>

                {/* Phone Section */}
                <div className="flex items-center gap-1 md:gap-2 mb mb-2">
                    <FaPhoneAlt />
                    <span>+91 968-000-6460</span>
                </div>
            </motion.div>
            {/* <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: scrolled ? 0 : 40, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="lg:px-12 md:px-10 px-0 fixed w-full z-50 top-0 transition-all duration-500 ease-in-out"
            >
                <div className="flex items-center justify-between px-4 md:px-6 py-4 bg-white md:rounded-2xl shadow-md relative">
                    <div className="flex-shrink-0 cursor-pointer">
                        <Link href="https://www.celitix.com" to={WEBSITE_BASEURL}>
                            <img
                                src={celitixheader}
                                alt="Celitix CPaaS Solution Logo"
                                className="h-10"
                            />
                        </Link>
                    </div>

                    <nav className="hidden lg:flex flex-1 justify-center gap-1 text-sm font-medium text-black items-center">
                        <div className="relative group cursor-pointer">
                            <Link href="#" to={`${WEBSITE_BASEURL}/cpaas-solutions`} target='_blank'>
                                <div className="flex items-center text-lg gap-2 p-2 popfh rounded-md transition-all duration-300 cursor-pointer">
                                    CPaaS
                                    <MdKeyboardArrowDown className="block group-hover:hidden  transition-transform duration-300" />
                                    <MdKeyboardArrowUp className="hidden group-hover:block transition-transform duration-300" />
                                </div>
                            </Link>
                            <div className="absolute left-1/2 top-9 mt-2 transform -translate-x-1/2 opacity-0 scale-95 
            pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 
             group-hover:scale-100 transition-all duration-500 ease-out z-50 ">

                                <div className="absolute top-0 left-1/4 -translate-x-1/2 -translate-y-2 rotate-45 bg-white h-4 w-4 border-t border-l border-gray-200 z-[1]"></div>

                                <div className="absolute -left-40 top-full grid grid-cols-3 lg:grid-cols-3 md:grid-cols-3 gap-6 bg-white text-black border border-gray-200 shadow-lg p-6 rounded-md w-[800px] ">

                                    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-6 text-gray-800 hover:shadow-lg transition duration-300 ease-in-out">

                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full text-xl font-bold">
                                                <img src={Channels} alt="Channels" className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-lg popfh font-bold">Channels</h2>
                                        </div>

                                        <p className="text-sm text-gray-600 mb-4 popfh leading-relaxed">
                                            Explore our omnichannel communication solutions
                                        </p>



                                        <Link to={`${WEBSITE_BASEURL}/cpaas-solutions`}>
                                            <LogBtn
                                                label="Overview →"
                                                variant="brutal"
                                                className="bg-[#9B44B6] border-[#9B44B6] text-white px-2 py-1 font-semibold hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_#9B44B6] lora mb-2"
                                            />
                                        </Link>

                                    </div>
                                    <div className="w-full grid grid-cols-1 popfh sm:grid-cols-1 md:grid-cols-1 gap-1 p-1">
                                        <Link href="#" to={`${WEBSITE_BASEURL}/whatsapp-business-platform`}>
                                            <ChannelItem title="WhatsApp" desc="Most Comprehensive" />
                                        </Link>
                                        <Link href="#" to={`${WEBSITE_BASEURL}/rcs-business-messaging`}>
                                            <ChannelItem title="RCS" desc="Least Competitive" />
                                        </Link>
                                        <Link href="#" to={`${WEBSITE_BASEURL}/sms-marketing`}>
                                            <ChannelItem title="SMS" desc="Best Reach" />
                                        </Link>
                                        <Link href="#" to={`${WEBSITE_BASEURL}/two-way-sms`}>
                                            <ChannelItem title="2 Way SMS" desc="Best For Engagement" />
                                        </Link>
                                        <Link href="#" to={`${WEBSITE_BASEURL}/email-otp`}>
                                            <ChannelItem title="Email" desc="Trusted & Trackable" />
                                        </Link>
                                    </div>
                                    <div className="w-full grid grid-cols-1 popfh sm:grid-cols-1 md:grid-cols-1 gap-1 p-1">
                                        <Link href="#" to={`${WEBSITE_BASEURL}/inbound-dialer`}>
                                            <ChannelItem title="IBD" desc="Best For Customer Service" />
                                        </Link>
                                        <Link href="#" to={`${WEBSITE_BASEURL}/outbound-dialer`}>
                                            <ChannelItem title="OBD" desc="Most Accessible" />
                                        </Link>
                                        <Link href="#" to={`${WEBSITE_BASEURL}/click-to-call`}>
                                            <ChannelItem title="Click2Call" desc="Best For User Experience" />
                                        </Link>
                                        <Link href="#" to={`${WEBSITE_BASEURL}/missed-call-services`}>
                                            <ChannelItem title="Missed Call" desc="Most Customizable" />
                                        </Link>
                                        <Link href="#" to={`${WEBSITE_BASEURL}/user-verification`}>
                                            <ChannelItem title="Authentication" desc="Easy Security" />
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="relative group cursor-pointer">

                            <div className="flex items-center text-lg gap-2 popfh p-2 rounded-md transition-all duration-300">
                                Industries
                                <MdKeyboardArrowDown className="block group-hover:hidden transition-transform duration-300" />
                                <MdKeyboardArrowUp className="hidden group-hover:block transition-transform duration-300" />
                            </div>


                            <div className="absolute left-1/2 top-9 mt-2 transform -translate-x-1/2 opacity-0 scale-95 
          pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 
          group-hover:scale-100 transition-all duration-500 ease-out z-50 ">


                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 rotate-45 bg-white h-4 w-4 border-t border-l border-gray-200  z-[1]"></div>


                                <div className="absolute -left-40 top-full grid grid-cols-3 lg:grid-cols-3 md:grid-cols-3 gap-6 bg-white text-black border border-gray-200 shadow-lg p-6 rounded-md w-[800px] ">

                                    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-6 text-gray-800 hover:shadow-lg transition duration-300 ease-in-out">

                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full text-xl font-bold">
                                                <img src={Industries} alt="Industries" className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-lg popfh font-bold">Industries</h2>
                                        </div>

                                        <p className="text-sm popfh text-gray-600 mb-4 leading-relaxed">
                                            Learn how Celitix can help companies in various industries
                                        </p>



                                    </div>
                                    <div className="w-full grid grid-cols-1 popfh sm:grid-cols-1 md:grid-cols-1 gap-1 p-1">
                                        <Link href="#" to={`${WEBSITE_BASEURL}/retail-and-ecommerce`}>
                                            <ResourcesItem title="ECommerce" />
                                        </Link>
                                        <Link href="#" to={`${WEBSITE_BASEURL}/healthcare`}>
                                            <ResourcesItem title="Healthcare" />
                                        </Link>
                                        <Link href="#" to={`${WEBSITE_BASEURL}/financial-services`}>
                                            <ResourcesItem title="Finance" />
                                        </Link>
                                        <Link href="#" to={`${WEBSITE_BASEURL}/education-and-edtech`}>
                                            <ResourcesItem title="Education" />
                                        </Link>
                                        <Link href="#" to={`${WEBSITE_BASEURL}/travel-and-tourism`}>
                                            <ResourcesItem title="Tourism" />
                                        </Link>
                                    </div>
                                    <div className="w-full grid grid-cols-1 popfh sm:grid-cols-1 md:grid-cols-1 gap-1 p-1">
                                        <Link href="#" to={`${WEBSITE_BASEURL}/construction-and-real-estate`}>
                                            <ResourcesItem title="Real Estate" />
                                        </Link>
                                        <Link href="#" to={`${WEBSITE_BASEURL}/food-and-beverages`}>
                                            <ResourcesItem title="Food Production" />
                                        </Link>
                                        <Link href="#" to={`${WEBSITE_BASEURL}/professional-services`}>
                                            <ResourcesItem title="Service-Based" />
                                        </Link>
                                        <Link href="#" to={`${WEBSITE_BASEURL}/tech-startups`}>
                                            <ResourcesItem title="Tech Startups" />
                                        </Link>

                                    </div>
                                </div>




                            </div>
                        </div>


                        <div className="relative group cursor-pointer">

                            <div className="flex items-center popfh text-lg gap-2 p-2 rounded-md transition-all duration-300">
                                Company
                                <MdKeyboardArrowDown className="block group-hover:hidden transition-transform duration-300" />
                                <MdKeyboardArrowUp className="hidden group-hover:block transition-transform duration-300" />
                            </div>

                            <div className="absolute left-1/2 top-9 mt-2 transform -translate-x-1/2 z-50
              opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto 
              transition-all duration-500 ease-out border border-gray-200 p-2 rounded-md  bg-white w-56 ">

                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 rotate-45 bg-white h-4 w-4 border-t border-l border-gray-200  z-[1]" />


                                <div className="bg-white border border-gray-200 grid grid-cols-2 rounded-lg shadow-md py-3 px-0 flex-col">
                                    <Link href="#" to={`${WEBSITE_BASEURL}/about-us`}>
                                        <div className="flex flex-col popfh items-center justify-center border-r border-gray-700 m-0">
                                            <img
                                                src={AboutUsicon}
                                                alt="House Icon"
                                                className="text-[#9B44B6] w-6 h-6"
                                            />
                                            <ResourcesItem title="About Us" desc="About our team" />
                                        </div>
                                    </Link>
                                    <Link href="#" to={`${WEBSITE_BASEURL}/careers`}>
                                        <div className="flex flex-col popfh items-center justify-center">
                                            <img
                                                src={Careersicon}
                                                alt="House Icon"
                                                className="text-[#9B44B6] w-6 h-6"
                                            />
                                            <ResourcesItem title="Careers" desc="Who we work with" />
                                        </div>
                                    </Link>


                                </div>
                            </div>
                        </div>


                        <div className="relative group cursor-pointer">
                            <Link href="#" to={`${WEBSITE_BASEURL}/pricing`}>
                                <div className="flex items-center text-lg popfh gap-2 p-2 rounded-md transition-all duration-300">
                                    Pricing
                                    <MdKeyboardArrowDown className="block group-hover:hidden transition-transform duration-300" />
                                    <MdKeyboardArrowUp className="hidden group-hover:block transition-transform duration-300" />
                                </div>
                            </Link>

                        </div>


                        <div className="relative group cursor-pointer">
                            <div className="flex items-center text-lg gap-2 p-2 popfh rounded-md transition-all duration-300">
                                Resources
                                <MdKeyboardArrowDown className="block group-hover:hidden transition-transform duration-300" />
                                <MdKeyboardArrowUp className="hidden group-hover:block transition-transform duration-300" />
                            </div>
                            <div className="absolute left-1/2 top-9 mt-2 transform -translate-x-1/2 opacity-0 scale-95 
          pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 
          group-hover:scale-100 transition-all duration-500 ease-out z-50 border border-gray-200 p-2 rounded-md  bg-white">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 rotate-45 bg-white h-4 w-4 border-t border-l border-gray-200  z-[1]"></div>
                                <div className="bg-white text-black popfh border border-gray-200 rounded-md p-2 grid grid-cols-1 gap-2 w-32">
                                    <Link href="#" to={`${WEBSITE_BASEURL}/blog/`}>
                                        <ResourcesItem title="Blog" desc="Learn & Explore" />
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </nav>

                    <div className="hidden lg:flex flex-shrink-0 gap-3">
                        <Link href="#" to={`${WEBSITE_BASEURL}/book-a-demo`}>
                            <LogBtn label="Book Demo" variant="brutal" className='bg-[#9B44B6] border-[#9B44B6] text-white px-2 py-1 font-semibold hover:bg-white hover:text-black 
              hover:shadow-[4px_4px_0px_#9B44B6] '/>
                        </Link>



                    </div>


                    <div className="lg:hidden text-2xl cursor-pointer">
                        <label className="hamburger">

                            <input
                                type="checkbox"
                                checked={mobileMenuOpen}
                                onChange={toggleMenu}
                            />
                            <svg viewBox="0 0 32 32">
                                <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" />
                                <path className="line" d="M7 16 27 16" />
                            </svg>
                        </label>
                    </div>

                </div>

                {mobileMenuOpen && (
                    <div className="lg:hidden bg-white shadow-md px-4 pt-2 -mt-2 pb-4 space-y-3 text-sm font-medium text-black transition-all duration-300 rounded-b-2xl overflow-y-auto">
                        <div
                            className="relative group cursor-pointer"
                            onClick={() => {
                                if (window.innerWidth < 769) setIsChannelsOpen(!isChannelsOpen);
                            }}
                        >
                            <div className="flex items-center text-lg gap-2 p-2 rounded-md transition-all duration-300 cursor-pointer">
                                CPaaS <MdKeyboardArrowDown />
                            </div>

                            <div
                                className={`bg-white text-black rounded-md z-50
        transition-all duration-300 ease-in-out
        ${isChannelsOpen ? 'block' : 'hidden'} grid sm:grid-cols-2 md:grid-cols-2 w-full md:w-[800px]
      `}
                            >
                                <Link href="#" to={`${WEBSITE_BASEURL}/whatsapp-business-platform`}>
                                    <ChannelItem title="WhatsApp" desc="Most Comprehensive" />
                                </Link>
                                <Link href="#" to={`${WEBSITE_BASEURL}/rcs-business-messaging`}>
                                    <ChannelItem title="RCS" desc="Least Competitive" />
                                </Link>
                                <Link href="#" to={`${WEBSITE_BASEURL}/sms-marketing`}>
                                    <ChannelItem title="SMS" desc="Best Reach" />
                                </Link>
                                <Link href="#" to={`${WEBSITE_BASEURL}/two-way-sms`}>
                                    <ChannelItem title="2 Way SMS" desc="Best For Engagement" />
                                </Link>
                                <Link href="#" to={`${WEBSITE_BASEURL}/inbound-dialer`}>
                                    <ChannelItem title="IBD" desc="Best For Customer Service" />
                                </Link>
                                <Link href="#" to={`${WEBSITE_BASEURL}/outbound-dialer`}>
                                    <ChannelItem title="OBD" desc="Most Accessible" />
                                </Link>
                                <Link href="#" to={`${WEBSITE_BASEURL}/missed-call-services`}>
                                    <ChannelItem title="Missed Call" desc="Most Customizable" />
                                </Link>
                                <Link href="#" to={`${WEBSITE_BASEURL}/click-to-call`}>
                                    <ChannelItem title="Click2Call" desc="Best For User Experience" />
                                </Link>
                                <Link href="#" to={`${WEBSITE_BASEURL}/user-verification`}>
                                    <ChannelItem title="Authentication" desc="Easy Security" />
                                </Link>
                                <Link href="#" to={`${WEBSITE_BASEURL}/email-otp`}>
                                    <ChannelItem title="Email" desc="Trusted & Trackable" />
                                </Link>
                            </div>

                        </div>
                        <div
                            className="relative group cursor-pointer"
                            onClick={() => {
                                if (window.innerWidth < 769) setIsIndustriesOpen(!isIndustriesOpen);
                            }}
                        >
                            <div className="flex items-center text-lg gap-2 p-2 rounded-md transition-all duration-300 cursor-pointer">
                                Industries <MdKeyboardArrowDown />
                            </div>
                            <div
                                className={`bg-white text-black rounded-md z-50
          transition-all duration-300 ease-in-out
        ${isIndustriesOpen ? 'block' : 'hidden'} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2
          w-full md:w-[800px] max-h-[80vh] overflow-y-auto`}
                            >
                                <Link href="#" to={`${WEBSITE_BASEURL}/retail-and-ecommerce`}>
                                    <ResourcesItem title="ECommerce" />
                                </Link>
                                <Link href="#" to={`${WEBSITE_BASEURL}/healthcare`}>
                                    <ResourcesItem title="Healthcare" />
                                </Link>
                                <Link href="#" to={`${WEBSITE_BASEURL}/financial-services`}>
                                    <ResourcesItem title="Finance" />
                                </Link>
                                <Link href="#" to={`${WEBSITE_BASEURL}/education-and-edtech`}>
                                    <ResourcesItem title="Education" />
                                </Link>
                                <Link href="#" to={`${WEBSITE_BASEURL}/travel-and-tourism`}>
                                    <ResourcesItem title="Tourism" />
                                </Link>
                                <Link href="#" to={`${WEBSITE_BASEURL}/construction-and-real-estate`}>
                                    <ResourcesItem title="Real Estate" />
                                </Link>
                                <Link href="#" to={`${WEBSITE_BASEURL}/food-and-beverages`}>
                                    <ResourcesItem title="Food Production" />
                                </Link>
                                <Link href="#" to={`${WEBSITE_BASEURL}/professional-services`}>
                                    <ResourcesItem title="Service-Based" />
                                </Link>
                                <Link href="#" to={`${WEBSITE_BASEURL}/tech-startups`}>
                                    <ResourcesItem title="Tech Startups" />
                                </Link>
                            </div>

                        </div>
                        <div
                            className="relative group cursor-pointer"
                            onClick={() => {
                                if (window.innerWidth < 769) setIsCompaniesOpen(!isCompaniesOpen);
                            }}
                        >
                            <div className="flex items-center text-lg gap-2 p-2 rounded-md transition-all duration-300 cursor-pointer">
                                Companies <MdKeyboardArrowDown />
                            </div>
                            <div
                                className={`bg-white text-black rounded-md z-50
          transition-all duration-300 ease-in-out
        ${isCompaniesOpen ? 'block' : 'hidden'} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 
          w-full md:w-[800px] max-h-[80vh] overflow-y-auto`}
                            >
                                <Link href="#" to={`${WEBSITE_BASEURL}/about-us`}>
                                    <ResourcesItem title="About Us" desc="About our team" />
                                </Link>
                                <Link href="#" to={`${WEBSITE_BASEURL}/careers`}>
                                    <ResourcesItem title="Careers" desc="Who we work with" />
                                </Link>
                            </div>
                        </div>

                        <Link href="#" to={`${WEBSITE_BASEURL}/pricing`}>
                            <div className="flex items-center text-lg gap-2 p-2 rounded-md transition-all duration-300 cursor-pointer">
                                Pricing <MdKeyboardArrowDown />
                            </div>
                        </Link>


                        <div
                            className="relative group cursor-pointer"
                            onClick={() => {
                                if (window.innerWidth < 769) setIsResourcesOpen(!isResourcesOpen);
                            }}
                        >
                            <div className="flex items-center text-lg gap-2 p-2 rounded-md transition-all duration-300 cursor-pointer">
                                Resources <MdKeyboardArrowDown />
                            </div>

                            <div
                                className={`bg-white text-black rounded-md z-50
          transition-all duration-300 ease-in-out 
        ${isResourcesOpen ? 'block' : 'hidden'} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 
          w-full md:w-[800px] max-h-[80vh] overflow-y-auto`}
                            >
                                <Link href="#" to={`${WEBSITE_BASEURL}/blog/`}>
                                    <ResourcesItem title="blog" desc="Learn & Explore" />
                                </Link>

                            </div>

                        </div>
                        <div className=" flex  gap-2">
                            <Link href="#" to={`${WEBSITE_BASEURL}/book-a-demo`}>
                                <LogBtn label="Book Demo" variant="brutal" className='bg-[#9B44B6] border-[#9B44B6] text-white px-2 py-1 font-semibold hover:bg-white hover:text-black 
              hover:shadow-[4px_4px_0px_#9B44B6] '/>
                            </Link>

                        </div>
                    </div>
                )}
            </motion.div> */}
        </>
    );
};

export default Header;
