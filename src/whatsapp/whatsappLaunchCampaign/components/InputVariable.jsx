import { useState } from 'react';
import DataObjectOutlinedIcon from '@mui/icons-material/DataObjectOutlined';
import { PiBracketsCurlyBold } from "react-icons/pi";
import { Divider } from '@mui/material';

const InputVariable = ({ variables = [], onSelect }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSelect = (variable) => {
        onSelect(variable);
        setShowDropdown(false);
    };

    return (
        <div className="relative ">
            <button
                className="px-1 border-1 border-gray-300 rounded-r-sm h-8.5 text-sm bg-gray-200 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <PiBracketsCurlyBold />
            </button>
            {showDropdown && (
                <div className="absolute min-w-24 w-30 z-50 left-[35px] h-47 overflow-scroll bg-white border border-gray-300 rounded-md shadow-lg top-0 ">
                    {/* {variables.map((variable, idx) => (
                        <button
                            key={idx}
                            className="block w-full py-2 text-[0.85rem] rounded-t-md tracking-wide text-gray-700 hover:bg-gray-100"
                            onClick={() => handleSelect(variable)}
                        >
                            {variable}
                        </button>
                    ))} */}
                    {variables && variables.length > 0 ? (
                        variables.map((variable, idx) => (
                            <>
                                <button
                                    key={idx}
                                    className="block w-full py-2 text-[0.85rem] rounded-t-md tracking-wide text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSelect(variable)}
                                >
                                    {variable}
                                </button>
                                <Divider variant="middle" sx={{ mx: 0, p: 0 }} />
                            </>

                        ))
                    ) : (
                        <p className="text-gray-600 text-center whitespace-nowrap py-1 px-1 text-[0.8rem] tracking-wide">No variables! </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default InputVariable;