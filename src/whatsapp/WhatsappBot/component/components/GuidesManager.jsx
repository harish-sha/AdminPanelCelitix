import React from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import OutlinedFlagOutlinedIcon from "@mui/icons-material/OutlinedFlagOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import { IoPersonAddOutline } from "react-icons/io5";
import { BsMenuButton } from "react-icons/bs";
import LinkIcon from "@mui/icons-material/Link";
import { HiOutlineTemplate } from "react-icons/hi";
import { Dialog } from "primereact/dialog";
import { LuExternalLink } from "react-icons/lu";
import ListIcon from '@mui/icons-material/List';
import { PiShareFatFill } from "react-icons/pi";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import { IoMdPlay } from "react-icons/io";
import { BsCameraVideoFill } from "react-icons/bs";
import { BsFileEarmarkPdf } from "react-icons/bs";
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { AiOutlineApi } from "react-icons/ai";
import { FaShare } from "react-icons/fa6";
import { RiShareBoxLine } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";


const GuidesManager = ({ openGuide, setOpenGuide }) => {
    const guideData = [
        {
            label: "Quick  Start",
            value: "quick start",
            icon: <AiOutlineApi />,
            desc: ''
        },
        {
            label: "Start",
            value: "start",
            icon: <OutlinedFlagOutlinedIcon />,
            desc: ``,
        },
        {
            label: "Text",
            value: "text",
            icon: <TextFieldsOutlinedIcon />,
            desc: ``,
        },
        {
            label: "Image",
            value: "image",
            icon: <ImageOutlinedIcon />,
            desc: ``,
        },
        {
            label: "Video",
            value: "video",
            icon: <VideocamOutlinedIcon />,
            desc: ``,
        },
        {
            label: "Document",
            value: "document",
            icon: <ArticleOutlinedIcon />,
            desc: ``,
        },
        {
            label: "audio",
            value: "audio",
            icon: <MicOutlinedIcon />,
            desc: ``,
        },
        {
            label: "Button",
            value: "button",
            icon: <BsMenuButton />,
            desc: ``,
        },
        {
            label: "List",
            value: "list",
            icon: <FormatListBulletedOutlinedIcon />,
            desc: ``,
        },
        {
            label: "Agent",
            value: "agent",
            icon: <IoPersonAddOutline />,
            desc: ``,
        },
        {
            label: "CTA Url",
            value: "cta url",
            icon: <LinkIcon />,
            desc: ``,
        },
        {
            label: "Template",
            value: "template",
            icon: <HiOutlineTemplate />,
            desc: ``,
        },
        {
            label: "Api",
            value: "api",
            icon: <AiOutlineApi size={23} />,
            desc: ``,
        },
        {
            label: "Answer",
            value: "answer",
            icon: <QuestionAnswerOutlinedIcon />,
            desc: ``,
        },
    ];

    const GuideRenderer = ({ value }) => {
        console.log("value", value)
        switch (value) {
            case "quick start":
                return (
                    <>
                        <div className="max-w-4xl mx-auto px-4 py-10">
                            <div className="flex flex-col justify-center items-start gap-6">
                                <h2 className="text-2xl font-bold text-gray-900">Quick Start</h2>
                                <p className="text-base text-gray-700 leading-relaxed">
                                    Welcome to your messaging assistant! This bot helps you create, customize, and send professional WhatsApp templates seamlessly.
                                </p>

                                <h3 className="text-lg font-semibold text-gray-800">
                                    Each message template consists of the following components:
                                </h3>

                                <section className="space-y-3 text-gray-700 text-sm leading-relaxed">
                                    <p>
                                        <strong>Header:</strong> Use images, videos, text, or documents to make your message more engaging and visually appealing.
                                    </p>
                                    <p>
                                        <strong>Body:</strong> Craft the main content of your message — clear, concise, and personalized.
                                    </p>
                                    <p>
                                        <strong>Footer:</strong> Add a closing remark, legal note, or additional info to support your message.
                                    </p>
                                    <p>
                                        <strong>CTA:</strong> Encourage interaction with buttons (e.g., “Call Now”, “Visit Website”) or direct links.
                                    </p>
                                </section>

                                <section className="mt-4 text-gray-700 text-sm leading-relaxed">
                                    <p>
                                        To get started, choose a template type, fill in the required fields, customize the content, and preview it before sending. All templates are designed to align with WhatsApp’s policies for optimal delivery and performance.
                                    </p>
                                </section>
                            </div>
                        </div>

                    </>
                )
            case "start":
                return (
                    <div className="max-w-4xl mx-auto flex flex-col items-start gap-6 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-800">Start Keywords</h2>

                        <p className="text-base text-gray-700 leading-relaxed">
                            Start Keywords serve as the entry points to trigger a bot's conversation flow. Each bot supports a maximum of five distinct keywords, which can be either plain text (e.g., <em>Start</em>, <em>Offers</em>, <em>Help</em>) or clickable links. When a user sends or clicks one of these keywords, it automatically initiates a predefined response or flow mapped to that keyword. These keywords are crucial for automating user engagement and ensuring a smooth starting point for every interaction.
                        </p>

                        <section className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-md">
                            <p className="text-sm text-gray-600 leading-relaxed">
                                <strong className="text-gray-800">Example Use Case:</strong><br />
                                A business sets up the keywords: <code>"GetStarted"</code>, <code>"Pricing"</code>, <code>"Support"</code>, <code>"Deals"</code>, and <code>"ContactUs"</code>. When a user types or clicks <code>"Pricing"</code>, the bot instantly replies with product pricing details or opens a guided flow to explore pricing plans.
                            </p>
                        </section>
                    </div>

                );

            case "text":
                return (
                    <div className="relative grid grid-cols-2 gap-2">
                        <div className=''>
                            <h2>Text messages are messages containing only a text body and an optional link preview.</h2>
                            <div className='m-2'>
                                <h2 className='font-semibold text-md text-black'>Link Preview:</h2>
                                <p className=''>Displays a preview of the shared link.
                                    Includes title, source, and a short snippet.
                                    Helps users understand the link before clicking.</p>
                            </div>
                            <div className='m-2'>
                                <h2 className='font-semibold text-md text-black'>Text Body:</h2>
                                <p>This is the main message written by the user.
                                    It contains plain text content, questions, or comments.
                                    May appear with or without a link preview.</p>
                            </div>

                        </div>
                        {/* Your Card Component */}
                        <div className="p-2 bg-[#ece5dd] rounded-lg flex justify-center m-4 relative w-auto">
                            <div className="bg-white rounded-xl shadow-md max-w-md w-full mr-22">
                                <div className='bg-gray-100 p-2 m-2 rounded-xl relative'>
                                    <h2 className="text-xs font-medium text-black">Meta Quest 3: New Mixed Reality VR:</h2>
                                    <h2 className="text-xs font-medium text-black">Handset - Shop Now | Meta Store</h2>
                                    <p className="text-[10px] text-gray-300">
                                        Discover the latest VR handset: from Meta - ...www.meta.com
                                    </p>

                                    {/* Link Preview Tag + Arrow */}
                                    <div className="absolute top-0 -left-32 flex items-center">
                                        <div className="bg-black text-white text-xs px-2 py-1 rounded-full">
                                            Link Preview
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-8 h-[2px] bg-black"></div>
                                            <div className="w-3 h-3 border-2 border-black rounded-full bg-white -ml-1"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className='p-2 relative'>
                                    <p className='text-black text-sm'>As requested here is the link of our latest product:<span className='text-green-800'> http://www.meta.com/quest/quest-3/
                                    </span>
                                    </p>

                                    <div className="absolute top-10 -left-28 flex items-center">
                                        <div className="bg-black text-white text-xs px-2 py-1 rounded-full">
                                            body Text
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-8 h-[2px] bg-black"></div>
                                            <div className="w-3 h-3 border-2 border-black rounded-full bg-white -ml-1"></div>
                                        </div>
                                    </div>
                                </div>
                                <span className='text-xs text-gray-500 m-2 ml-52'>12:37 PM</span>

                            </div>
                            <div className='bg-gray-300 h-8 w-8 flex justify-center items-center rounded-full absolute mt-[84px] ml-[240px]'>
                                <PiShareFatFill className='text-white' />
                            </div>
                        </div>

                    </div>
                );

            case "image":
                return (
                    <div className="relative grid grid-cols-2">
                        <div className=''>
                            <h2>Text messages are messages containing only a text body and an optional link preview.</h2>
                            <div className='m-2'>
                                <h2 className='font-semibold text-md text-black'>Image:</h2>
                                <p className=''>This is the main visual element in the message.
                                    It can be a photo, graphic, or screenshot.
                                    Used to share visual information quickly.</p>
                            </div>
                            <div className='m-2'>
                                <h2 className='font-semibold text-md text-black'>Caption:</h2>
                                <p>A short text description added below the image.
                                    Provides context or commentary about the image.
                                    Captions are optional and user-written.</p>
                            </div>
                        </div>
                        {/* Your Card Component */}
                        <div className="p-2 bg-[#ece5dd] rounded-lg flex justify-center relative w-auto">
                            <div className="bg-white rounded-xl shadow-md max-w-md w-full mr-22">
                                <div className='relative'>
                                    {/* Header Image */}
                                    <img
                                        src="https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg"
                                        alt="cta image"
                                        className="w-full h-58 object-cover px-2 pt-2 rounded-xl"
                                    />
                                    <div className="absolute top-[130px] -left-[20%] flex items-center">
                                        <div className="bg-black text-white text-xs px-2 rounded-full">
                                            Image
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-8 h-[2px] bg-black"></div>
                                            <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-1"></div>
                                        </div>

                                    </div>
                                </div>
                                {/* Body */}
                                <div className="p-2 relative">
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span className='text-black font-semibold'>Dates subject to change.</span>
                                        <span>12:37 PM</span>
                                    </div>
                                    <div className="absolute top-[10px] -left-[20%] flex items-center">
                                        <div className="flex items-center ml-58">
                                            <div className="w-8 h-[2px] bg-black"></div>
                                            <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-10"></div>
                                        </div>
                                        <div className="bg-black text-white text-xs px-2 rounded-full ml-6">
                                            Caption
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-gray-300 h-8 w-8 flex justify-center items-center rounded-full absolute mt-[118px] ml-[270px]'>
                                <PiShareFatFill className='text-white' />
                            </div>
                        </div>
                    </div>
                );

            case "video":
                return (
                    <div className="relative grid grid-cols-2 gap-2">
                        <div className=''>
                            <h2>Video messages display a thumbnail preview of a video image with an optional caption. When the WhatsApp user taps the preview, it loads the video and displays it to the user.</h2>
                            <div className='m-2'>
                                <h2 className='font-semibold text-md text-black'>Thumbnail preview:</h2>
                                <p className=''>This is the thumbnail image of the video.
                                    It gives a visual hint of the video content.
                                    Tapping it starts video playback in the chat.</p>
                            </div>
                            <div className='m-2'>
                                <h2 className='font-semibold text-md text-black'>Caption:</h2>
                                <p>A short text written below the video preview.
                                    Provides context or commentary about the video.
                                    Captions are optional and added by the sender.</p>
                            </div>
                        </div>
                        {/* Your Card Component */}
                        <div className="p-2 bg-[#ece5dd] rounded-lg flex justify-center m-4 relative w-auto">
                            <div className="bg-white rounded-xl shadow-md max-w-md w-full mr-22">
                                {/* Header Image */}
                                <div className="relative w-full">
                                    {/* Image */}
                                    <img
                                        src="https://static.vecteezy.com/system/resources/thumbnails/053/003/435/small_2x/glowing-red-succulent-plant-in-dark-nature-photo.jpg"
                                        alt="cta image"
                                        className="w-full h-58 object-cover px-2 pt-2 rounded-xl"
                                    />
                                    <div className='absolute flex gap-2 ml-3 inset-0 mt-[210px] text-white'>
                                        <BsCameraVideoFill />
                                        <span className='text-[10px]'>01:00</span>
                                    </div>
                                    {/* Centered Play Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center ">
                                        <IoMdPlay className="text-xl rounded-full bg-gray-200 p-2 h-10 w-10" />
                                    </div>
                                    <div className="absolute top-[100px] left-[4%] translate-x-[-170px] flex items-center">
                                        <div className="bg-black text-white text-xs px-2 rounded-full">
                                            Thumbnail preview
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-8 h-[2px] bg-black"></div>
                                            <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-1"></div>
                                        </div>

                                    </div>

                                </div>


                                {/* Body */}
                                <div className="p-2 relative">
                                    <div className="flex items-center justify-between text-gray-500">
                                        <span className='text-black font-normal text-lg'>A Succulent eclipse!</span>
                                        <span className='text-[10px]'>12:37 PM</span>
                                    </div>

                                    <div className="absolute top-[12px] -left-6 flex items-center">
                                        <div className="flex items-center ml-58">
                                            <div className="w-8 h-[2px] bg-black"></div>
                                            <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-10"></div>
                                        </div>
                                        <div className="bg-black text-white text-xs px-2 rounded-full ml-6">
                                            Caption
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-gray-300 h-8 w-8 flex justify-center items-center rounded-full absolute mt-[118px] ml-[264px]'>
                                <PiShareFatFill className='text-white' />
                            </div>

                        </div>
                    </div>
                );

            case "document":
                return (
                    <>
                        <div className="relative grid grid-cols-2">
                            <div className=''>
                                <h2>Document messages are messages that display a document icon, linked to a document, that a WhatsApp user can tap to download.</h2>
                                <div className='m-2'>
                                    <h2 className='font-semibold text-md text-black'>File Name:</h2>
                                    <p className=''>The visible name of the shared document.
                                        It helps users identify the file's content.
                                        Displayed just beside or below the icon.</p>
                                </div>
                                <div className='m-2'>
                                    <h2 className='font-semibold text-md text-black'>File Type Icon:</h2>
                                    <p>A graphic representing the document type (PDF, DOCX, etc).
                                        Indicates the file format at a glance.
                                        Appears alongside the file name.</p>
                                </div>
                                <div className='m-2'>
                                    <h2 className='font-semibold text-md text-black'>Caption:</h2>
                                    <p>An optional message written by the sender.
                                        Describes the purpose or content of the document.
                                        Shown below the file preview.</p>
                                </div>
                            </div>
                            {/* Your Card Component */}
                            <div className="p-2 bg-[#ece5dd] rounded-lg flex justify-center m-4 relative w-auto h-40">
                                <div className="bg-white rounded-xl shadow-md max-w-md w-full mr-22">
                                    {/* Header Image */}

                                    <div className='relative h-20 bg-gray-100 m-2 rounded-md p-1 flex gap-2'>
                                        <div className='mt-3'>
                                            <BsFileEarmarkPdf />
                                        </div>
                                        <div className='w-40 relative'>
                                            <h2 className='text-lg font-medium text-gray-800'>lucky-shrub-invoice.pdf</h2>
                                            <p className='text-[10px] text-gray-300'>243kb . html</p>
                                            <div className="absolute top-[6px] flex items-center">
                                                <div className="flex items-center ml-38">
                                                    <div className="w-8 h-[2px] bg-black"></div>
                                                    <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-10"></div>
                                                </div>
                                                <div className="bg-black text-white text-xs px-2 rounded-full ml-4 text-nowrap">
                                                    File Name
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute top-[40px] left-[16%] translate-x-[-170px] flex items-center">
                                            <div className="bg-black text-white text-xs px-2 rounded-full">
                                                File Type Icon
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-8 h-[2px] bg-black"></div>
                                                <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-1"></div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='pl-4 relative'>
                                        <p className='font-medium'>Lucky Shrub Invoice</p>
                                        <div className="absolute top-[6px] flex items-center">

                                            <div className="flex items-center ml-42">
                                                <div className="w-8 h-[2px] bg-black"></div>
                                                <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-10"></div>
                                            </div>
                                            <div className="bg-black text-white text-xs px-2 rounded-full ml-6">
                                                Caption
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='bg-gray-300 h-8 w-8 flex justify-center items-center rounded-full absolute mt-[40px] ml-[266px]'>
                                    <PiShareFatFill className='text-white' />
                                </div>
                            </div>

                            {/* Body Text Label */}

                        </div>
                    </>
                );

            case "audio":
                return (
                    <>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className="ml-5 space-y-4 text-gray-800 max-w-lg ">
                                <p className="text-sm leading-relaxed">Audio messages display an audio icon and a link to an audio file. When the WhatsApp user taps the icon, the WhatsApp client loads and plays the audio file.
                                </p>
                                <section>
                                    <h2 className="text-md font-semibold text-gray-900">Audio Icon:</h2>
                                    <p className="text-sm leading-relaxed"> A visual play button that represents an audio file; users can tap it to stream the audio directly within WhatsApp.</p>
                                </section>
                            </div>
                            <div className="bg-[#f0f0f0] flex items-center p-3 rounded-md ">
                                <div className="bg-white shadow-md rounded-full px-3 py-2 relative flex items-center gap-3 w-[280px]">

                                    {/* Download icon and duration */}
                                    <div className="flex items-center gap-2">
                                        <DownloadForOfflineOutlinedIcon className="text-gray-400" fontSize="small" />
                                        <span className="text-xs text-gray-600">1:13</span>
                                    </div>

                                    {/* Audio bar (fake placeholder) */}
                                    <div className="flex-1 h-[2px] bg-gray-300 rounded-md"></div>

                                    {/* Timestamp and Audio Icon */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-600">11:41 AM</span>
                                        <div className="bg-red-300 p-2 rounded-full">
                                            <AudiotrackIcon className="text-white" fontSize="small" />
                                        </div>
                                    </div>

                                    {/* Tooltip with connector */}
                                    <div className="absolute -right-[115px] top-1/2 -translate-y-1/2 flex items-center">
                                        <div className="flex items-center">
                                            <div className="w-6 h-[2px] bg-black"></div>
                                            <div className="absolute w-2.5 h-2.5 border-[2px] border-black rounded-full bg-white -ml-1 "></div>
                                        </div>
                                        <div className="bg-black text-white text-xs px-2 py-1 rounded-full">
                                            Audio icon
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
                );

            case "button":
                return (
                    <>
                        <div className='w-full flex justify-between '>
                            <div className="ml-5 space-y-4 text-gray-800 max-w-3xl mx-auto">
                                <p className="text-sm leading-relaxed">Interactive reply buttons messages allow you to send up to three predefined replies for users to choose from.
                                </p>
                                <section>
                                    <h2 className="text-md font-semibold text-gray-900">Header:</h2>
                                    <p className="text-sm leading-relaxed"> Enhance your message with a header to provide quick context—use text for clarity, or enrich with images, videos, or documents for visual or downloadable content.</p>
                                </section>
                                <section>
                                    <h2 className="text-md font-semibold text-gray-900">Body Text:</h2>
                                    <p className="text-sm leading-relaxed"> Deliver the main message with clear and informative content—ideal for conveying instructions, updates, or promotional details.</p>
                                </section>
                                <section>
                                    <h2 className="text-md font-semibold text-gray-900">Footer Text:</h2>
                                    <p className="text-sm leading-relaxed"> Provides optional supporting information such as terms, disclaimers, or notes—displayed at the bottom in a concise, non-intrusive format.</p>
                                </section>
                                <section>
                                    <h2 className="text-md font-semibold text-gray-900">Reply Button:</h2>
                                    <p className="text-sm leading-relaxed"> Presents users with up to three quick, predefined response options, enabling faster interaction and streamlined replies within the chat.</p>
                                </section>


                            </div>
                            <div className=" bg-[#ece5dd] p-3 rounded-md w-fit ml-65">
                                <div className="bg-white rounded-xl shadow-md p-4 w-[300px] ">
                                    <div className='relative'>
                                        <img
                                            src="https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg"
                                            className="w-full h-58 object-cover  "
                                        />
                                        <div className="absolute  -left-32  translate-x-[-170px] flex items-center space-x-1 top-1">
                                            <div className="bg-black text-white text-xs px-2 -pl-1 py-1 rounded-full">
                                                Header(Image,Video,Document,Text)
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-8 h-[2px] bg-black"></div>
                                                <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='relative'>
                                        <p className='text-sm  text-black'>Hi Pablo! Your gardening workshop is scheduled for 9am tomorrow.
                                            Use the buttons if you need to reschedule. Thank you! </p>
                                        <div className="absolute  left-[13%]  translate-x-[-170px] flex items-center space-x-1 top-1">
                                            <div className="bg-black text-white text-xs px-2 -pl-1 py-1 rounded-full">
                                                Body Text
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-8 h-[2px] bg-black"></div>
                                                <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-1"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='relative'>
                                        <p className='text-xs  text-gray-400 mt-2'>Lucky Shrub: Your gateway to succulents!™ </p>
                                        <div className="absolute  left-[11%]  translate-x-[-170px] flex items-center space-x-1 top-0">
                                            <div className="bg-black text-white text-xs px-2 -pl-1 py-1 rounded-full">
                                                Footer Text
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-8 h-[2px] bg-black"></div>
                                                <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=" text-right text-xs text-gray-500 mt-1">2:25PM </div>
                                    <div className="border-t border-gray-200 mt-1 w-full " />
                                    <div className='flex flex-col justify-center items-center gap-4'>
                                        <div className='relative'>
                                            <ReplyOutlinedIcon className="text-green-600" /> <span className="text-green-600 text-sm">Change</span>
                                            <div className="absolute  -left-18  translate-x-[-170px] flex items-center space-x-1 top-0">
                                                <div className="bg-black text-white text-xs px-2 -pl-1 py-1 rounded-full ">
                                                    Reply Button
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="w-8 h-[2px] bg-black"></div>
                                                    <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-1"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='relative'>
                                            <ReplyOutlinedIcon className="text-green-600" /> <span className="text-green-600 text-sm">Cancel</span>
                                            <div className="absolute -left-19  translate-x-[-170px] flex items-center space-x-1 top-0">
                                                <div className="bg-black text-white text-xs px-2 -pl-1 py-1 rounded-full">
                                                    Reply Button
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="w-8 h-[2px] bg-black"></div>
                                                    <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-1"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </>
                );

            case "list":
                return (
                    <>
                        <div className='w-full space-y-5 h-[100] '>
                            {/* section1 */}
                            <div className='w-full  flex justify-between gap-5 '>
                                <div className=" bg-[#ece5dd] p-3 rounded-md w-fit relative ml-36" >
                                    <div className="bg-white rounded-xl shadow-md p-4 w-[300px]">
                                        {/* Header text */}
                                        <p className="text-sm text-black font-semibold mb-1">Choose Shipping Option</p>
                                        {/* Header Image Label */}
                                        <div className="absolute top-6 left-[17%] translate-x-[-170px] flex items-center space-x-1">
                                            <div className="bg-black text-white text-xs px-2 -pl-1 py-1 rounded-full">
                                                Header text
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-8 h-[2px] bg-black"></div>
                                                <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-1"></div>
                                            </div>

                                        </div>

                                        {/* Body text */}
                                        <p className="text-sm text-black mb-3 mt-4">Which shipping option do you prefer?</p>
                                        <div className="absolute  left-[21%] translate-x-[-170px] flex items-center space-x-1 top-15">
                                            <div className="bg-black text-white text-xs px-2 -pl-1 py-1 rounded-full">
                                                Body text
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-8 h-[2px] bg-black"></div>
                                                <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-1"></div>
                                            </div>

                                        </div>

                                        {/* Footer */}
                                        <div className="flex justify-between text-xs text-gray-600 relative ">
                                            <span>Lucky Shrub: Your gateway to succulents™</span>
                                            <span className="text-[10px]">9:13 AM</span>
                                            <div className="absolute  left-[12%] translate-x-[-170px] flex items-center space-x-1 top-1">
                                                <div className="bg-black text-white text-xs px-2 -pl-1 py-1 rounded-full">
                                                    Footer text
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="w-8 h-[2px] bg-black"></div>
                                                    <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-1"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="border-t border-gray-200 my-3" />

                                        {/* Button */}
                                        <div className="text-green-600 flex items-center justify-center space-x-1 cursor-pointer text-sm relative">
                                            <ListIcon size={14} />
                                            <span className="hover:underline">Shipping Options</span>
                                            <div className="absolute  left-[12%] translate-x-[-170px] flex items-center space-x-1 top-0">
                                                <div className="bg-black text-white text-xs px-2 -pl-1 py-1 rounded-full">
                                                    Button text
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="w-8 h-[2px] bg-black"></div>
                                                    <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-1"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=' max-w-2xl mt-10'>
                                    <p className="text-sm leading-relaxed">Interactive list messages allow you to display a structured list of selectable options to WhatsApp users.
                                    </p>
                                    <section>
                                        <h2 className="text-md font-semibold text-gray-900">Header:</h2>
                                        <p className="text-sm leading-relaxed"> Use the header to provide visual or contextual emphasis with an image, video, or document.
                                            It enhances message clarity and engagement by offering supporting media content.</p>
                                    </section>

                                    <section>
                                        <h2 className="text-md font-semibold text-gray-900">Body Text:</h2>
                                        <p className="text-sm leading-relaxed"> Use the header to provide visual or contextual emphasis with an image, video, or document.
                                            It enhances message clarity and engagement by offering supporting media content.</p>
                                    </section>

                                    <section>
                                        <h2 className="text-md font-semibold text-gray-900">Footer Text:</h2>
                                        <p className="text-sm leading-relaxed"> The footer in an interactive list message provides optional supporting text.
                                            It appears below the list and is typically used for notes, disclaimers, or guidance.</p>
                                    </section>

                                    <section>
                                        <h2 className="text-md font-semibold text-gray-900">Button Text:</h2>
                                        <p className="text-sm leading-relaxed">
                                            The button text in an interactive list message is a short label shown on the button.
                                            It prompts users to open the list and should clearly indicate the action, like “Choose Option” or “View List”.
                                        </p>
                                    </section>
                                </div>
                            </div>

                            {/* section2 */}
                            <div className='w-full  flex justify-between '>
                                <div className=' max-w-2xl mt-10'>
                                    <p className="text-sm leading-relaxed">Interactive list messages allow you to display a structured list of selectable options to WhatsApp users.
                                    </p>
                                    <section>
                                        <h2 className="text-md font-semibold text-gray-900">Section Title:</h2>
                                        <p className="text-sm leading-relaxed"> The section title in an interactive list message is used to group related options under a heading.
                                            It helps organize choices clearly, making it easier for users to navigate and select relevant options.
                                        </p>
                                    </section>

                                    <section>
                                        <h2 className="text-md font-semibold text-gray-900">Row Title:</h2>
                                        <p className="text-sm leading-relaxed"> The row title represents an individual selectable option within a list message.
                                            It should be concise and clearly indicate the action or choice available to the user.
                                        </p>
                                    </section>

                                    <section>
                                        <h2 className="text-md font-semibold text-gray-900">Row Description:</h2>
                                        <p className="text-sm leading-relaxed"> The row description provides additional context or details about the corresponding row title.
                                            It should be brief, informative, and help the user make an informed selection.</p>
                                    </section>


                                </div>


                                <div className=" bg-[#ece5dd] p-3 rounded-md w-fit ">
                                    <div className="bg-white rounded-xl shadow-md p-4 w-[300px] ">
                                        <div className='flex flex-col justify-center items-center mb-6'>
                                            <p className="text-sm text-black font-semibold mb-1">Shipping Options</p>
                                        </div>
                                        <div className='flex flex-col justify-start items-start relative'>
                                            <p className='text-sm text-gray-500 font-medium'>I want it ASAP! </p>
                                            <div className="absolute  left-[10%] translate-x-[-170px] flex items-center space-x-1 top-0">
                                                <div className="bg-black text-white text-xs px-2 -pl-1 py-1 rounded-full">
                                                    Section title
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="w-8 h-[2px] bg-black"></div>
                                                    <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-1"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col justify-start items-start border-t border-gray-200 mt-3 relative'>
                                            <p className='text-sm text-black font-medium mt-2'>Priority Mail Express </p>
                                            <div className="absolute  left-[17%]  translate-x-[-170px] flex items-center space-x-1 top-1">
                                                <div className="bg-black text-white text-xs px-2 -pl-1 py-1 rounded-full">
                                                    Row title
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="w-8 h-[2px] bg-black"></div>
                                                    <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-1"></div>
                                                </div>
                                            </div>
                                            <span className='text-xs text-gray-500 font-medium '>Next Day to 2 Days </span>

                                        </div>
                                        <div className='flex flex-col justify-start items-start border-t border-gray-200 mt-3 relative'>
                                            <p className='text-sm text-black font-medium mt-2'>Priority Mail  </p>
                                            <span className='text-xs text-gray-500 font-medium'>1-3 Days </span>
                                            <div className="absolute  left-[0%] translate-x-[-170px] flex items-center space-x-1 top-6">
                                                <div className="bg-black text-white text-xs px-2 -pl-1 py-1 rounded-full">
                                                    Row Description
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="w-8 h-[2px] bg-black"></div>
                                                    <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-1"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col justify-start items-start border-t border-gray-200 mt-3'>
                                            <p className='text-sm text-gray-500 font-medium mt-2'>I can't wait a bit  </p>
                                        </div>

                                        <div className='flex flex-col justify-start items-start border-t border-gray-200 mt-3'>
                                            <p className='text-sm text-black font-medium mt-2'>USPS Ground Advantage  </p>
                                            <span className='text-xs text-gray-500 font-medium'>2-5 Days </span>
                                        </div>

                                        <div className='flex flex-col justify-start items-start border-t border-gray-200 mt-3'>
                                            <p className='text-sm text-black font-medium mt-2'>Media Mail </p>
                                            <span className='text-xs text-gray-500 font-medium'>2-8 Days </span>
                                        </div>

                                        <div className='flex flex-col justify-center items-center border-t border-gray-200 mt-3'>
                                            <button className='text-sm text-gray-500 font-medium mt-8'>Tap an item to select it  </button>
                                        </div>
                                        <div className='border-2 border-black w-20 ml-26 rounded-md mt-4' />
                                    </div>
                                </div>

                            </div>


                            <div className='w-full  flex justify-between gap-5'>
                                {/* section3 */}
                                <div className=" bg-[#ece5dd] p-3 rounded-md w-fit flex flex-col justify-between" >
                                    <div className="bg-white rounded-xl shadow-md p-4 w-[300px]">
                                        {/* Header text */}
                                        <p className="text-sm text-black font-semibold mb-1">Choose Shipping Option</p>
                                        {/* Header Image Label */}
                                        {/* Body text */}
                                        <p className="text-sm text-black mb-3 mt-4">Which shipping option do you prefer?</p>

                                        {/* Footer */}
                                        <div className="flex justify-between text-xs text-gray-600 ">
                                            <span>Lucky Shrub: Your gateway to succulents™</span>
                                            <span className="text-[10px]">9:13 AM</span>

                                        </div>

                                        {/* Divider */}
                                        <div className="border-t border-gray-200 my-3" />

                                        {/* Button */}
                                        <div className="text-green-600 flex items-center justify-center space-x-1 cursor-pointer text-sm relative">
                                            <ListIcon size={14} />
                                            <span className="hover:underline">Shipping Options</span>

                                        </div>
                                    </div>
                                    <div className="bg-green-200 rounded-xl shadow-md p-4 w-[300px] mt-8 ml-20">
                                        <div className='bg-gray-300 border-l-4 border-orange-400 rounded-md p-1 opacity-75'>
                                            <div className='ml-2'>
                                                <p className="text-xs text-orange-400 font-semibold">+1(555) 078-3881 </p>
                                                <p className="text-xs text-black font-semibold ">Choose Shipping Option</p>
                                                <p className="text-xs text-black">Which shipping option do you prefer?</p>
                                                <p className="text-xs text-gray-600 ">Lucky Shrub: Your gateway to succulents™</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className='text-sm text-black  mt-2'>Priority Mail Express </p>
                                            <p className='text-sm text-black '>Next Day to 2 Days </p>
                                            <div class=" text-right text-xs text-gray-500">9:13AM ✓✓</div>
                                        </div>
                                    </div>



                                </div>
                                <div className=' max-w-2xl mt-10'>
                                    <p className="text-sm leading-relaxed">Users can then choose one option and their selection will be sent as a reply:
                                    </p>
                                    <section>

                                        <p className="text-sm leading-relaxed"> This triggers a webhook, which identifies the option selected by the user.
                                        </p>
                                    </section>

                                    <section>

                                        <p className="text-sm leading-relaxed"> Interactive list messages support up to 10 sections, with up to 10 rows for all sections combined, and can include an optional header and footer.


                                        </p>
                                    </section>




                                </div>
                            </div>
                        </div >
                    </>
                );

            case "agent":
                return (
                    <div>
                        <p>Select agent from dropdown (future UI)</p>
                    </div>
                );

            case "cta url":
                return (
                    <>
                        <div className='grid grid-cols-2' >
                            <div className="ml-5 space-y-4 text-gray-800 ">
                                <p className="text-sm leading-relaxed">WhatsApp users often hesitate to click raw, lengthy, or unclear URLs in messages.
                                    To improve trust and engagement, use an interactive call-to-action (CTA) URL button.
                                    This maps the URL to a clean button, avoiding the need to display the full link in the message body.
                                </p>
                                <section>
                                    <h2 className="text-md font-semibold text-gray-900">Header:</h2>
                                    <p className="text-sm leading-relaxed"> Use the header to provide visual or contextual emphasis with an image, video, or document.
                                        It enhances message clarity and engagement by offering supporting media content.</p>
                                </section>
                                <section>
                                    <h2 className="text-md font-semibold text-gray-900">Body Text:</h2>
                                    <p className="text-sm leading-relaxed">The body text delivers the main message, providing clear details, instructions, or promotional content.
                                        It should be concise, informative, and aligned with the intent of the communication.</p>
                                </section>
                                <section>
                                    <h2 className="text-md font-semibold text-gray-900">Footer Text:</h2>
                                    <p className="text-sm leading-relaxed">The footer text provides optional supporting information such as disclaimers, notes, or terms.
                                        It appears at the bottom of the message and should remain concise and non-promotional.</p>
                                </section>
                                <section>
                                    <h2 className="text-md font-semibold text-gray-900">CTA URL:</h2>
                                    <p className="text-sm leading-relaxed">The CTA URL adds a call-to-action button that links users to a specified website.
                                        It enhances engagement by guiding users to take immediate action, such as visiting a page or making a purchase.</p>
                                </section>
                            </div>

                            <div className="relative flex justify-end h-85">
                                {/* Your Card Component */}
                                <div className="p-2 bg-[#ece5dd] rounded-lg flex justify-center m-4 relative w-[320px]">
                                    <div className="bg-white rounded-xl shadow-md max-w-md w-full  mr-12">
                                        {/* Header Image */}
                                        <img
                                            src="https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-118143566.jpg"
                                            alt="cta image"
                                            className="w-full h-40 object-cover p-2 rounded-xl"
                                        />

                                        {/* Body */}
                                        <div className="p-4">
                                            <p className="text-gray-900 text-sm font-semibold">
                                                Tap the button below to see available dates.
                                            </p>
                                            <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                                                <span>Dates subject to change.</span>
                                                <span>12:37 PM</span>
                                            </div>

                                            {/* CTA Button */}
                                            <div className="mt-3 flex items-center justify-center border-t border-gray-200">
                                                <button className="flex gap-1 items-center text-green-800 font-medium text-sm hover:underline mt-2">
                                                    <LuExternalLink />
                                                    See Dates
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Arrows with labels (Absolutely Positioned) */}
                                    {/* Header Image Label */}
                                    <div className="absolute top-22 left-[10%] translate-x-[-170px] flex items-center">
                                        <div className="bg-black text-white text-xs px-2 rounded-full">
                                            Header image
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-8 h-[2px] bg-black"></div>
                                            <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-1"></div>
                                        </div>
                                    </div>

                                    {/* Body Text Label */}
                                    <div className="absolute top-[185px] left-[20%] translate-x-[-180px] flex items-center">
                                        <div className="bg-black text-white text-xs px-2 rounded-full">
                                            Text Body
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-8 h-[2px] bg-black"></div>
                                            <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-1"></div>
                                        </div>
                                    </div>
                                    <div className="absolute top-[208px] left-[18%] translate-x-[-180px] flex items-center">
                                        <div className="bg-black text-white text-xs px-2 rounded-full flex items-center justify-center">
                                            Footer text
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-8 h-[2px] bg-black"></div>
                                            <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-1"></div>
                                        </div>
                                    </div>

                                    <div className="absolute top-[250px] left-[23%] translate-x-[-180px] flex items-center">
                                        <div className="bg-black text-white text-xs px-2 rounded-full">
                                            CTA Url
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-8 h-[2px] bg-black"></div>
                                            <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-1"></div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </>
                );

            case "template":
                return (
                    <>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className="ml-5 space-y-4 text-gray-800 max-w-3xl mx-auto">
                                <p className="text-sm leading-relaxed">
                                    Templates enable messaging via Cloud or On-Premises API. The Cloud API reviews templates using machine learning for enhanced security without sharing data with WhatsApp.
                                </p>
                                <p className="text-sm leading-relaxed">
                                    Create templates via Business Manager or API. Unverified businesses are limited to 250 templates; verified ones can have up to 6,000 with an approved phone number and display name.
                                </p>
                                <section>
                                    <h2 className="text-md font-semibold text-gray-900">Header:</h2>
                                    <p className="text-sm leading-relaxed">
                                        Enhance messages with a contextual header—choose from text, image, video, or document to enrich communication and engagement.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-md font-semibold text-gray-900">Body Text:</h2>
                                    <p className="text-sm leading-relaxed">
                                        Communicate the main message with clarity. Ideal for instructions, offers, or important information.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-md font-semibold text-gray-900">Footer Text:</h2>
                                    <p className="text-sm leading-relaxed">
                                        Add optional, concise supporting details such as disclaimers or legal notes. Appears at the bottom of the template.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-md font-semibold text-gray-900">CTA URL:</h2>
                                    <p className="text-sm leading-relaxed">
                                        Include a call-to-action button linking users to a specific URL—ideal for driving traffic, conversions, or feedback.
                                    </p>
                                </section>
                            </div>


                            <div className="relative">
                                {/* Your Card Component */}
                                <div className="p-2 bg-[#ece5dd] rounded-lg flex justify-center m-4 relative w-[420px]">
                                    <div className="bg-white rounded-xl shadow-md max-w-md w-full  mr-12">
                                        {/* Header Image */}

                                        <div className='pl-4 relative'>
                                            <img
                                                src="https://wallpapers.com/images/featured/nature-2ygv7ssy2k0lxlzu.jpg"
                                                alt="cta image"
                                                className="w-full h-40 object-cover p-2 rounded-xl"
                                            />
                                            <div className="absolute top-[40px] flex items-center">

                                                <div className="flex items-center ml-64">
                                                    <div className="w-8 h-[2px] bg-black"></div>
                                                    <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-10"></div>
                                                </div>
                                                <div className="bg-black text-white text-xs px-2 rounded-md ml-6">
                                                    <p>Header(text, image, video, document)</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='pl-4 relative'>
                                            <div className='p-2'>
                                                <p>Hello Dear,
                                                    This is to inform you that your plan expiring soon,
                                                    click Recharge Now for recharge
                                                </p>
                                            </div>
                                            <div className="absolute top-[58px] flex items-center">
                                                <div className="flex items-center ml-64">
                                                    <div className="w-8 h-[2px] bg-black"></div>
                                                    <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-10"></div>
                                                </div>
                                                <div className="bg-black text-white text-xs px-2 rounded-md ml-6 text-nowrap">
                                                    <p>Text Body</p>
                                                </div>
                                            </div>
                                        </div>


                                        {/* Body */}
                                        <div className="p-4 flex flex-col gap-2">
                                            {/* CTA Button */}
                                            <div className='relative'>
                                                <div className="py-1 flex items-center justify-center border border-green-500 bg-green-500 rounded-md">
                                                    <button className="flex gap-1 items-center text-white font-medium text-sm hover:underline">
                                                        <RiShareBoxLine /> Recharge Now
                                                    </button>
                                                </div>
                                                <div className="absolute top-[10px] flex items-center">
                                                    <div className="flex items-center ml-72">
                                                        <div className="w-8 h-[2px] bg-black"></div>
                                                        <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-10"></div>
                                                    </div>
                                                    <div className="bg-black text-white text-xs px-2 rounded-md ml-6 text-nowrap">
                                                        <p>Url Link</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='relative'>
                                                <div className="py-1 flex items-center justify-center border border-blue-500 bg-blue-500 rounded-md">
                                                    <button className="flex gap-1 items-center text-white font-medium text-sm hover:underline">
                                                        <FaPhone /> More Info
                                                    </button>
                                                </div>
                                                <div className="absolute top-[10px] flex items-center">
                                                    <div className="flex items-center ml-72">
                                                        <div className="w-8 h-[2px] bg-black"></div>
                                                        <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-10"></div>
                                                    </div>
                                                    <div className="bg-black text-white text-xs px-2 rounded-md ml-6 text-nowrap">
                                                        <p>CTA Button</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='relative'>
                                                <div className="py-1 flex items-center justify-center border border-gray-200 bg-gray-200 rounded-md">
                                                    <button className="flex gap-1 items-center text-black font-medium text-sm hover:underline">
                                                        <FaShare /> Thank You
                                                    </button>
                                                </div>
                                                <div className="absolute top-[10px] flex items-center">
                                                    <div className="flex items-center ml-72">
                                                        <div className="w-8 h-[2px] bg-black"></div>
                                                        <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-10"></div>
                                                    </div>
                                                    <div className="bg-black text-white text-xs px-2 rounded-md ml-6 text-nowrap">
                                                        <p>Quick Reply</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='relative'>
                                                <div className="py-1 flex items-center justify-center border border-gray-200 bg-gray-200 rounded-md">
                                                    <button className="flex gap-1 items-center text-black font-medium text-sm hover:underline">
                                                        <FaShare /> I'll call you later
                                                    </button>
                                                </div>
                                                <div className="absolute top-[10px] flex items-center">
                                                    <div className="flex items-center ml-72">
                                                        <div className="w-8 h-[2px] bg-black"></div>
                                                        <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-10"></div>
                                                    </div>
                                                    <div className="bg-black text-white text-xs px-2 rounded-md ml-6 text-nowrap">
                                                        <p>Quick Reply</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='relative'>
                                                <div className="py-1 flex items-center justify-center border border-gray-200 bg-gray-200 rounded-md">
                                                    <button className="flex gap-1 items-center text-black font-medium text-sm hover:underline">
                                                        <FaShare /> Unsubscribe Now
                                                    </button>
                                                </div>
                                                <div className="absolute top-[10px] flex items-center">
                                                    <div className="flex items-center ml-72">
                                                        <div className="w-8 h-[2px] bg-black"></div>
                                                        <div className="w-3 h-3 border-[2px] border-black rounded-full bg-white -ml-10"></div>
                                                    </div>
                                                    <div className="bg-black text-white text-xs px-2 rounded-md ml-6 text-nowrap">
                                                        <p>Quick Reply</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                );

            case "api":
                return <div>Provide API details or integration logic</div>;

            case "answer":
                return <div>Enter predefined answer text</div>;

            default:
                return <div>No guide available for this type.</div>;
        }
    };

    return (
        <>
            {openGuide && (
                <Dialog
                    visible={openGuide}
                    onHide={() => {
                        setOpenGuide(false);
                    }}
                    style={{ width: "80vw" }}
                    draggable={false}
                    header="Bot Configuration Guides"
                >
                    <div className="">
                        {/* <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Guide</h2> */}
                        <div className="flex gap-6">
                            <Tabs value="start" orientation="vertical" className="relative pr-2 py-2 w-full">
                                <TabsHeader className="w-32">
                                    {guideData?.map(({ label, icon, value }) => (
                                        <Tab key={value} value={value} className="p-2 border my-1 rounded-md bg-gray-200">
                                            <div className="flex justify-between ">
                                                <span className="absolute left-1 top-1/2 -translate-y-1/2 text-purple-900">{icon}</span>
                                                <span className="ml-4 text-sm">{label}</span>
                                            </div>
                                        </Tab>

                                    ))}
                                </TabsHeader>
                                <TabsBody>
                                    {guideData?.map(({ value, desc }) => (
                                        <TabPanel key={value} value={value} className="py-0 border h-160 overflow-scroll rounded-2xl p-4">
                                            <GuideRenderer value={value} />
                                            <div className="flex gap-2">
                                                {/* <div className="w-20">
                                                    {desc}
                                                </div> */}
                                            </div>
                                        </TabPanel>
                                    ))}
                                </TabsBody>
                            </Tabs>
                        </div>
                    </div>
                </Dialog >
            )}
        </>
    )
}

export default GuidesManager;