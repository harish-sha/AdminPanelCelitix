import React from 'react';
import { Link } from 'react-router-dom';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import '../login.css'

const Header = () => {
    return (
        <header>
            <div className='fixed w-full text-white tracking-wider font-normal text-sm top-0 z-50 bg-gradient-to-r from-[#2b40b0] to-[#8447c6] ' >
                <div className="lg:flex flex-wrap justify-between py-1 px-16">
                    <div className="text-center text-md-start text-lg-start">
                        <Link to="mailto:support@celitix.com" >
                            <LocalPostOfficeOutlinedIcon sx={{ scale: 0.8, marginRight: '2px' }} />support@celitix.com
                        </Link>
                    </div>
                    <div className="text-center text-lg-end text-md-end">
                        <Link to="tel:+919680006460">
                            <PhoneOutlinedIcon sx={{ scale: 0.8, marginRight: '2px' }} />
                            +91 968-000-6460
                        </Link>
                    </div>
                </div>
            </div>
            {/* <div id='menurow' className='' >
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            <img src="src/assets/images/celitix-cpaas-solution-logo.svg" alt="Celitix" style={{ width: '200px' }} />
                        </Link>
                    </div>
                </nav>
            </div> */}
        </header>
    );
};

export default Header;
