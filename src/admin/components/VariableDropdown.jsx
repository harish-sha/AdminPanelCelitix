import { useState } from 'react';
import DataObjectOutlinedIcon from '@mui/icons-material/DataObjectOutlined';

const VariableDropdown = ({ onSelect }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSelect = (variable) => {
        onSelect(variable);
        setShowDropdown(false);
    };

    return (
        <div className="relative">
            <button
                className="px-1 border-1 border-gray-400 rounded-r-sm h-8.5 text-sm bg-gray-200 "
                onClick={() => setShowDropdown(!showDropdown)}
            >
                {/* &#123;&#125; */}
                <DataObjectOutlinedIcon className="text-gray-700" sx={{
                    fontSize: 18
                }} />
            </button>
            {showDropdown && (
                <div className="absolute z-10 bg-white border rounded-md shadow-lg mt-2">
                    <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleSelect('name')}
                    >
                        {`{name}`}
                    </button>
                    <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleSelect('mobile')}
                    >
                        {`{mobile}`}
                    </button>
                    <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleSelect('address')}
                    >
                        {`{address}`}
                    </button>
                </div>
            )}
        </div>
    );
};

export default VariableDropdown;