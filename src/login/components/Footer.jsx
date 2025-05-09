// import React from 'react';

// const Footer = () => {
//     return (
//         <footer>
//             <div className="text-center py-3">
//                 <p>© 2025 Celitix CPaaS. All Rights Reserved.</p>
//             </div>
//         </footer>
//     );
// };

// export default Footer;










import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaPaperPlane,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope
} from 'react-icons/fa';
// import { celitixfooter, footerBatch } from '../../assets/images.js';

const Footer = () => {
  return (
    <footer className=" bg-black popf">
      <div className="  text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 py-12 rounded-[10px]">

        <div>
          <Link to="/">
            <img
              src="src/assets/images/celitix-cpaas-solution-logo-footer.svg"
              alt="Celitix CPaaS Solution Logo" title='Celitix CPaaS Solution Logo'
              className="mt-2 cursor-pointer"
              width="180"
              height="50"
            />
          </Link>
          {/* <img src="src\assets\Icons\celitix-cpaas-solution-logo-footer.svg" alt="Solution Logo" className="mb-4" width="180px" height="50" /> */}
          <p className="text-sm leading-relaxed mt-4">
            An omnichannel communication platform that drives growth through simplified workflows, automation & strengthening relationships.
          </p>


          <div className='lg:mx-auto md:mx-0 sm:mx-0 mt-5'>
            <h4 className="font-semibold mb-2">Stay in Touch</h4>
            <ul className="text-sm space-y-3">
              <a
                href="https://www.google.com/maps?q=Proactive+Professional+Services+Pvt+Ltd,+Biswa+Nagar,+Jaipur,+Rajasthan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <li className="flex items-start gap-2 cursor-pointer">
                  <FaMapMarkerAlt className="mt-1" />

                  <p className='leading-relaxed'>Proactive Professional Services Pvt. Ltd. <br />
                    22, 3rd Floor, Biswa Nagar,
                    New Sanganer Road,<br />
                    Jaipur, Rajasthan, India - 302019</p>

                </li>
              </a>

              <li className="flex items-center gap-2 mt-2">
                <FaPhoneAlt />
                <a href="tel:+919680006460" className="">
                  +91 968-000-6460
                </a>
              </li>

              <li className="flex items-center gap-2">
                <FaEnvelope /> <span>support@celitix.com</span>
              </li>
            </ul>

            <h4 className="font-semibold mt-4">Social</h4>
            <div className="flex gap-4 items-center mt-2">
              {/* Instagram */}
              <a href="https://www.instagram.com/celitix.official/" target="_blank" rel="noopener noreferrer">
                <img
                  src="src/assets/icons/Instagram_icon.png"
                  alt="Instagram"
                  className="w-6 h-6 transition-transform duration-300 ease-in-out hover:scale-125"
                />
              </a>

              {/* Facebook */}
              <a href="https://www.facebook.com/celitix.official" target="_blank" rel="noopener noreferrer">
                <img src="src/assets/icons/Facebook_Icon.png" alt="Facebook" className="w-6 h-6 transition-transform duration-300 ease-in-out hover:scale-125" />
              </a>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/celitix/" target="_blank" rel="noopener noreferrer">
                <img src="src/assets/icons/LinkedIn_Icon.png" alt="LinkedIn" className="w-6 h-6 transition-transform duration-300 ease-in-out hover:scale-125" />
              </a>

              <a href="https://x.com/celitix" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <img
                  src="src/assets/icons/twitter_Icon.png"
                  alt="Twitter"
                  className="w-5 h-5 invert transition-transform duration-300 ease-in-out hover:scale-125"
                />
              </a>

              {/* YouTube  */}
              <a href="https://www.youtube.com/@celitix" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <img
                  src="src/assets/icons/Youtube.svg"
                  alt="YouTube"
                  className="w-7 h-7 transition-transform duration-300 ease-in-out hover:scale-125"
                />
              </a>

              {/* WhatsApp  */}
              <a href="https://wa.me/917230000091" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <img
                  src="src/assets/icons/WhatsApp.svg"
                  alt="WhatsApp"
                  className="w-7 h-7 transition-transform duration-300 ease-in-out hover:scale-125"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Company &  (2-in-1 column) */}
        <div className="grid grid-cols-2">
          <div className='md:mx-auto sm:mx-0'>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="text-sm space-y-3">
              <li className="group relative cursor-pointer">
                <Link to="/">
                  Home
                  <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-10"></span>
                </Link>
              </li>
              <li className="group relative cursor-pointer">
                <Link to="/">
                  Book Demo
                  <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-19"></span>
                </Link>
              </li>
              <li className="group relative cursor-pointer">
                <Link to="/pricing">
                  Pricing
                  <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-11"></span>
                </Link>
              </li>
              <li className="group relative cursor-pointer">
                <Link to="/about-us">
                  About
                  <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-10"></span>
                </Link>
              </li>
              <li className="group relative cursor-pointer">
                <Link to="/careers">
                  Career
                  <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-11"></span>
                </Link>
              </li>
            </ul>
            <h4 className="font-semibold mb-2 mt-5">Resources</h4>
            <ul className="text-sm space-y-3">
              <li className="group relative cursor-pointer">
                <Link to="/blog">
                  Blog
                  <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-8"></span>
                </Link>
              </li>
            </ul>
          </div>

          <div className='md:mx-auto sm:mx-0'>
            <h4 className="font-semibold mb-2">Industries</h4>
            <ul className="text-sm space-y-3">
              <li className="group relative cursor-pointer">
                <Link to="/retail-and-ecommerce">
                  ECommerce
                  <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-20"></span>
                </Link>
              </li>
              <li className="group relative cursor-pointer">
                <Link to="/healthcare">
                  Healthcare
                  <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-18"></span>
                </Link>
              </li>
              <li className="group relative cursor-pointer">
                <Link to="/financial-services">
                  Finance
                  <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-14"></span>
                </Link>
              </li>
              <li className="group relative cursor-pointer">
                <Link to="/education-and-edtech">
                  Education
                  <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-17"></span>
                </Link>
              </li>
              <li className="group relative cursor-pointer">
                <Link to="/travel-and-tourism">
                  Tourism
                  <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-14"></span>
                </Link>
              </li>
              <li className="group relative cursor-pointer">
                <Link to="/construction-and-real-estate">
                  Real Estate
                  <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-19"></span>
                </Link>
              </li>
              <li className="group relative cursor-pointer">
                <Link to="/food-and-beverages">
                  Food Production
                  <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-27"></span>
                </Link>
              </li>
              <li className="group relative cursor-pointer">
                <Link to="/professional-services">
                  Service-Based
                  <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-24"></span>
                </Link>
              </li>
              <li className="group relative cursor-pointer">
                <Link to="/tech-startups">
                  Tech Startups
                  <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-22"></span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Channels */}
        <div className="grid grid-cols-1">
          {/* Channels */}
          <div>
            <h4 className="font-semibold text-center mb-2">Channels</h4>
            <div className='grid grid-cols-2 gap-2'>
              <ul className="text-sm md:mx-auto sm:mx-0 space-y-3">
                <li className="group relative cursor-pointer">
                  <Link to="/whatsapp-business-platform">
                    WhatsApp
                    <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-17"></span>
                  </Link>
                </li>
                <li className="group relative cursor-pointer">
                  <Link to="/rcs-business-messaging">
                    RCS
                    <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-7"></span>
                  </Link>
                </li>
                <li className="group relative cursor-pointer">
                  <Link to="/sms-marketing">
                    SMS
                    <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-8"></span>
                  </Link>
                </li>
                <li className="group relative cursor-pointer">
                  <Link to="/two-way-sms">
                    2 Way SMS
                    <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-18"></span>
                  </Link>
                </li>
                <li className="group relative cursor-pointer ">
                  <Link to="/inbound-dialer">
                    IBD
                    <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-6"></span>
                  </Link>
                </li>

                
                
                
              </ul>
              <ul className="text-sm md:mx-auto sm:mx-0 space-y-3">
              <li className="group relative cursor-pointer ">
                  <Link to="/outbound-dialer">
                    OBD
                    <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-8"></span>
                  </Link>
                </li>
                <li className="group relative cursor-pointer ">
                  <Link to="/missed-call-services">
                    Missed Call
                    <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-19"></span>
                  </Link>
                </li>
                <li className="group relative cursor-pointer ">
                  <Link to="/click-to-call">
                    Click2Call
                    <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-16"></span>
                  </Link>
                </li>

                <li className="group relative cursor-pointer ">
                  <Link to="/user-verification">
                    Authentication
                    <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-24"></span>
                  </Link>
                </li>
                <li className="group relative cursor-pointer ">
                  <Link to="/email-otp">
                    Email OTP
                    <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-16"></span>
                  </Link>
                </li>

              </ul>
            </div>
          </div>
          <div className='mx-5 flex justify-center mt-5'>
            <img src="src/assets/images/BATCH01.svg" alt="Batch" />
          </div>
        </div>

      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className=" text-md  text-white text-center border-t border-gray-700 py-4 "
      >
        © 2025 Celitix. All rights reserved. Powered by Proactive Professional Services Pvt Ltd |{' '}
        <span className="group relative cursor-pointer hover:text-gray-300 transition">
          <Link to="/terms-and-conditions">
            Terms & Conditions
            <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-full"></span>
          </Link></span> |{' '}
        <span className="group relative cursor-pointer hover:text-gray-300 transition">
          <Link to="/privacy-policy">
            Privacy Policy
            <span className="block h-0.5 bg-white absolute left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-full"></span>
          </Link></span>
      </motion.div>

    </footer>
  );
};

export default Footer;
