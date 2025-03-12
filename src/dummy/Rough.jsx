import React, { useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CardTravelOutlinedIcon from '@mui/icons-material/CardTravelOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';

const ManageTemplate = () => {
    const [selectedOptionCategory, setSelectedOptionCategory] = useState("marketing");
    const [selectedOptionIndustry, setSelectedOptionIndustry] = useState("ecommerce");
    const [showAllIndustries, setShowAllIndustries] = useState(false);

    const handleChangeOptionsCategory = (event) => {
        setSelectedOptionCategory(event.target.value);
    };

    const handleChangeOptionsIndustry = (event) => {
        setSelectedOptionIndustry(event.target.value);
    };

    // Dynamic template counts (Replace this with API data)
    const templateCounts = {
        marketing: 30,
        utility: 26,
        authentication: 28,
        ecommerce: 30,
        financial: 26,
        education: 28,
        banking: 28,
        healthcare: 22,
        logistics: 18,
        retail: 35,
        corporate: 21,
        entertainment: 19,
        travel: 23,
        food: 27,
        real_estate: 20,
        manufacturing: 25,
        science: 17
    };

    // Categories Data (Dynamic count)
    const categories = [
        { id: "marketing", label: `Marketing (${templateCounts.marketing})` },
        { id: "utility", label: `Utility (${templateCounts.utility})` },
        { id: "authentication", label: `Authentication (${templateCounts.authentication})` }
    ];

    // Industries Data (first 4 are visible, rest are hidden)
    const industries = [
        { id: "ecommerce", label: `E-commerce (${templateCounts.ecommerce})`, icon: <ShoppingCartOutlinedIcon fontSize='small' /> },
        { id: "financial", label: `Financial (${templateCounts.financial})`, icon: <CardTravelOutlinedIcon fontSize='small' /> },
        { id: "education", label: `Education (${templateCounts.education})`, icon: <SchoolOutlinedIcon fontSize='small' /> },
        { id: "banking", label: `Banking (${templateCounts.banking})`, icon: <AccountBalanceOutlinedIcon fontSize='small' /> },
        { id: "healthcare", label: `Healthcare (${templateCounts.healthcare})`, icon: <HealthAndSafetyOutlinedIcon fontSize='small' /> },
        { id: "logistics", label: `Logistics (${templateCounts.logistics})`, icon: <LocalShippingOutlinedIcon fontSize='small' /> },
        { id: "retail", label: `Retail (${templateCounts.retail})`, icon: <StorefrontOutlinedIcon fontSize='small' /> },
        { id: "corporate", label: `Corporate (${templateCounts.corporate})`, icon: <WorkOutlineOutlinedIcon fontSize='small' /> },
        { id: "entertainment", label: `Entertainment (${templateCounts.entertainment})`, icon: <MovieFilterOutlinedIcon fontSize='small' /> },
        { id: "travel", label: `Travel (${templateCounts.travel})`, icon: <PublicOutlinedIcon fontSize='small' /> },
        { id: "food", label: `Food & Beverage (${templateCounts.food})`, icon: <RestaurantOutlinedIcon fontSize='small' /> },
        { id: "real_estate", label: `Real Estate (${templateCounts.real_estate})`, icon: <HouseOutlinedIcon fontSize='small' /> },
        { id: "manufacturing", label: `Manufacturing (${templateCounts.manufacturing})`, icon: <SettingsOutlinedIcon fontSize='small' /> },
        { id: "science", label: `Science & Research (${templateCounts.science})`, icon: <ScienceOutlinedIcon fontSize='small' /> }
    ];

    return (
        <div className='w-full'>
            <div className='flex gap-3 min-h-[83vh] flex-wrap'>

                {/* Categories Section */}
                <div className='bg-[#e6f4ff] flex flex-col rounded-md py-2 px-2 shadow-md w-60'>
                    <div className='text-gray-500 font-medium text-md mb-1'>Categories</div>
                    <div>
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className={`cursor-pointer rounded-lg px-2 py-2.5 hover:shadow-xl transition-shadow duration-300 flex items-center gap-2 
                                    ${selectedOptionCategory === category.id ? 'bg-gray-800' : 'bg-transparent'}`}
                            >
                                <RadioButton
                                    inputId={`radio_${category.id}`}
                                    name="radioGroupCategory"
                                    value={category.id}
                                    onChange={handleChangeOptionsCategory}
                                    checked={selectedOptionCategory === category.id}
                                />
                                <label
                                    htmlFor={`radio_${category.id}`}
                                    className={`font-medium text-sm cursor-pointer ${selectedOptionCategory === category.id ? 'text-green-600' : 'text-gray-700'}`}
                                >
                                    {category.label}
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Industries Section */}
                    <div className='mt-2'>
                        <div className='text-gray-500 font-medium text-md mb-1'>Industries</div>
                        <div>
                            {industries.slice(0, showAllIndustries ? industries.length : 4).map((industry) => (
                                <div
                                    key={industry.id}
                                    className={`cursor-pointer rounded-lg px-2 py-2.5 hover:shadow-xl transition-shadow duration-300 flex items-center gap-2 
                                        ${selectedOptionIndustry === industry.id ? 'bg-gray-800' : 'bg-transparent'}`}
                                >
                                    <RadioButton
                                        inputId={`radio_${industry.id}`}
                                        name="radioGroupIndustry"
                                        value={industry.id}
                                        onChange={handleChangeOptionsIndustry}
                                        checked={selectedOptionIndustry === industry.id}
                                    />
                                    <label
                                        htmlFor={`radio_${industry.id}`}
                                        className={`font-medium text-sm cursor-pointer flex gap-2 items-center 
                                            ${selectedOptionIndustry === industry.id ? 'text-green-600' : 'text-gray-700'}`}
                                    >
                                        {industry.icon} {industry.label}
                                    </label>
                                </div>
                            ))}

                            {/* View More Button */}
                            {!showAllIndustries && industries.length > 4 && (
                                <button
                                    className="mt-2 text-blue-500 text-sm font-medium cursor-pointer hover:underline"
                                    onClick={() => setShowAllIndustries(true)}
                                >
                                    View More
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageTemplate;
