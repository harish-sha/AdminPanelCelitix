import React, { useState } from "react";
import { useTheme } from "./context/ThemeContext";
import BaseurlComponent from "./components/BaseurlComponent";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SmsIcon from "@mui/icons-material/Sms";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import CallReceivedOutlinedIcon from "@mui/icons-material/CallReceivedOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import SyncAltOutlinedIcon from "@mui/icons-material/SyncAltOutlined";
import { motion, useReducedMotion } from "framer-motion";

const ModelCard = ({ title, desc, Icon, gradient, delay = 0, isDarkMode }) => {
  const prefersReduced = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 18, scale: prefersReduced ? 1 : 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: prefersReduced ? 0 : -6 }}
      whileTap={{ scale: prefersReduced ? 1 : 0.99 }}
      className="group"
    >
      {/* Gradient border wrapper */}
      <div
        className={[
          "p-[1.25px] rounded-2xl",
          "bg-gradient-to-tr", 
          gradient,            
          "shadow-sm",
        ].join(" ")}
      >
        {/* Glass card */}
        <div
          className={[
            "relative p-5 min-h-[180px] rounded-2xl",
            "backdrop-blur-xl",
            isDarkMode
              ? "bg-slate-900/60 border border-slate-700"
              : "bg-white/80 border border-slate-200",
            "transition-shadow duration-300 group-hover:shadow-2xl",
          ].join(" ")}
        >
          {/* subtle top glint */}
          <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />

          <div className="flex items-start gap-4">
            {/* Icon badge with gradient + micro motion */}
            <motion.div
              whileHover={{ rotate: prefersReduced ? 0 : 6, scale: prefersReduced ? 1 : 1.06 }}
              className={[
                "h-14 w-25 rounded-xl grid place-items-center text-white shadow-lg ring-1 ring-black/5",
                "bg-gradient-to-tr",
                gradient.replace("/70", ""), 
              ].join(" ")}
            >
              <Icon fontSize="small" />
            </motion.div>

            {/* Text */}
            <div>
              <h3 className={["font-semibold text-lg mb-1", isDarkMode ? "text-slate-100" : "text-gray-800"].join(" ")}>
                {title}
              </h3>
              <p className={["text-sm leading-relaxed", isDarkMode ? "text-slate-300/90" : "text-gray-600"].join(" ")}>
                {desc}
              </p>
            </div>
          </div>

          {/* bottom glow underline on hover */}
          <div className="pointer-events-none absolute inset-x-4 bottom-3 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </motion.div>
  );
};

const Quickstart = () => {
  const { isDarkMode } = useTheme();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(baseUrl)
      .then(() => {
        // Show check icon
        setIsCopied(true);

        // Show toast notification
        toast.success("URL copied to clipboard!", {
          duration: 2000,
          position: "top-center",
          style: {
            backgroundColor: "#fff",
            color: "#000",
          },
          iconTheme: {
            primary: "#10B981", // green
            secondary: "#fff",
          },
        });

        // Reset icon after 2 seconds
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((err) => {
        toast.error("Failed to copy text", {
          duration: 2000,
          position: "top-center",
          style: {
            backgroundColor: "#fff",
            color: "#000",
          },
        });
        console.error("Could not copy text: ", err);
      });
  };


  return (
    <div
      className={` ${isDarkMode ? "bg-gray-900 text-white" : "bg-[#eeeeee] text-black"
        } rounded-md w-full h-[100vh] overflow-y-auto`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="">
          <h1 className="text-center text-3xl font-bold mt-5">
            Developer platform
          </h1>

          <div
            className={`${isDarkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg shadow-md p-4 mb-12 mt-3`}
          >
            <div>
              <h2 className="text-2xl font-semibold mb-2 ">
                Developer quickstart
              </h2>
              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-600"
                  } mb-4`}
              >
                Set up your environment and make your first API request in
                minutes
              </p>
            </div>

            {/* <div>
              <div className="bg-gray-700 rounded p-4 text-gray-200 font-mono text-sm overflow-x-auto flex items-center justify-center flex-col">
                <div className="mb-2">
                  <span className="text-white">API_URL</span> ={" "}
                  <span className="text-white">
                    "https://api.example.com/data"
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-white">API_KEY</span> ={" "}
                  <span className="text-white">"your_api_key"</span>
                </div>
                <div className="mb-4">
                  <span>api_send_get_request():</span>
                  <div className="pl-4">
                    <span>headers = &#123;</span>
                    <div className="pl-4">
                      <div>"Authorization": f"Bearer &#123;API_KEY&#125;",</div>
                      <div>"Content-Type": "application/json"</div>
                    </div>
                    <span>&#125;</span>
                  </div>
                </div>
                <div>
                  <span>
                    response = requests.get(f"&#123;API_URL&#125;",
                    headers=headers)
                  </span>
                </div>
              </div>
            </div> */}

            <section id="base-url" className="mb-16">
              <h2 className="text-xl md:text-3xl lg:text-3xl font-medium text-center mb-3">
                Base URL
              </h2>
              <div className="lg:w-3xl md:w-2xl w-[320px] mx-auto ">
                <div className="bg-gray-700 text-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-end mb-2 ">
                    <div className="font-mono text-sm break-all">
                      <span className="text-[#50b930] text-xl">https://api.celitix.com</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleCopy}
                        className="p-1 rounded hover:bg-gray-700 transition-colors"
                        aria-label="Copy to clipboard"
                      >
                        {isCopied ? (
                          <CheckOutlinedIcon />
                        ) : (
                          <ContentCopyOutlinedIcon />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

   
<div className="mb-12">
  <h2 className="text-2xl md:text-3xl font-semibold text-center mb-2">
    Meet the models
  </h2>
  <p className="text-center text-sm md:text-base text-gray-600 dark:text-slate-300/90">
    Powerful channels with modern delivery and reliability.
  </p>
</div>

{/* staggered grid entrance */}
<motion.div
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.2 }}
  transition={{ staggerChildren: 0.06 }}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto mb-20 px-2"
>
  <ModelCard
    title="WhatsApp"
    desc="Our high intelligence flagship model for complex, multi-step tasks."
    Icon={WhatsAppIcon}
    gradient="from-emerald-500/70 to-emerald-700/70"
    delay={0.02}
    isDarkMode={isDarkMode}
  />
  <ModelCard
    title="SMS"
    desc="Affordable model for basic, lightweight tasks."
    Icon={SmsIcon}
    gradient="from-sky-500/70 to-blue-600/70"
    delay={0.04}
    isDarkMode={isDarkMode}
  />
  <ModelCard
    title="RCS"
    desc="A modern channel with advanced capabilities."
    Icon={ChatOutlinedIcon}
    gradient="from-fuchsia-500/70 to-purple-600/70"
    delay={0.06}
    isDarkMode={isDarkMode}
  />
  <ModelCard
    title="Click 2 Call"
    desc="Trigger calls from apps and handle flows easily."
    Icon={CallOutlinedIcon}
    gradient="from-amber-500/70 to-orange-600/70"
    delay={0.08}
    isDarkMode={isDarkMode}
  />
  <ModelCard
    title="OBD"
    desc="Automated outbound dialer for campaigns."
    Icon={CallMadeOutlinedIcon}
    gradient="from-rose-500/70 to-red-600/70"
    delay={0.10}
    isDarkMode={isDarkMode}
  />
  <ModelCard
    title="IBD"
    desc="Track inbound communication in real time."
    Icon={CallReceivedOutlinedIcon}
    gradient="from-teal-500/70 to-emerald-600/70"
    delay={0.12}
    isDarkMode={isDarkMode}
  />
  <ModelCard
    title="EMAIL"
    desc="Send campaign and transactional emails."
    Icon={MailOutlineIcon}
    gradient="from-indigo-500/70 to-sky-600/70"
    delay={0.14}
    isDarkMode={isDarkMode}
  />
  <ModelCard
    title="App Authenticator"
    desc="Secure 2FA login solutions for your users."
    Icon={VerifiedUserOutlinedIcon}
    gradient="from-cyan-500/70 to-blue-600/70"
    delay={0.16}
    isDarkMode={isDarkMode}
  />
  <ModelCard
    title="Two-Way SMS"
    desc="Bi-directional messaging with threads."
    Icon={SyncAltOutlinedIcon}
    gradient="from-lime-500/70 to-green-600/70"
    delay={0.18}
    isDarkMode={isDarkMode}
  />
</motion.div>



        {/* Start building */}
        {/* <div className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Start building
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
            <div className="bg-green-600 text-white p-4 rounded">
              <h3 className="font-bold mb-2">Distillation</h3>
              <p className="text-sm">
                Evaluate and fine-tune models using production logs.
              </p>
            </div>

            <div className="bg-yellow-500 text-black p-4 rounded">
              <h3 className="font-bold mb-2">Realtime</h3>
              <p className="text-sm">
                Build low-latency applications with real-time performance.
              </p>
            </div>

            <div className="bg-blue-400 text-black p-4 rounded">
              <h3 className="font-bold mb-2">Structured Outputs</h3>
              <p className="text-sm">
                Ensure model responses adhere to your supplied JSON schema.
              </p>
            </div>

            <div className="bg-red-500 text-white p-4 rounded">
              <h3 className="font-bold mb-2">Fine-tuning</h3>
              <p className="text-sm">
                Adapt models to your specific use case with your data.
              </p>
            </div>
          </div>
        </div> */}

        {/* Explore our guides */}
        {/* <div>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Explore our guides
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
            <div className="bg-gray-700 text-white p-4 rounded">
              <h3 className="font-bold mb-2">Prompt engineering</h3>
              <p className="text-sm">Get better results from LLMs.</p>
            </div>

            <div className="bg-gray-700 text-white p-4 rounded">
              <h3 className="font-bold mb-2">Production best practices</h3>
              <p className="text-sm">
                Transition from prototype to production.
              </p>
            </div>

            <div className="bg-gray-700 text-white p-4 rounded">
              <h3 className="font-bold mb-2">Safety best practices</h3>
              <p className="text-sm">Make sure your application is safe.</p>
            </div>

            <div className="bg-gray-700 text-white p-4 rounded">
              <h3 className="font-bold mb-2">Latency optimization</h3>
              <p className="text-sm">
                Improve latency across multiple use cases.
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Quickstart;
