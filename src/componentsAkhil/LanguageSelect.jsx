import Select from 'react-select';
import iso6391 from 'iso-639-1';
import CustomTooltip from './CustomTooltip';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';

const LanguageSelect = ({
    value,
    onChange,
    label,
    tooltipContent = "",
    tooltipPlacement = "top",
}) => {
    const languageOptions = iso6391.getAllNames().map((name) => ({
        value: iso6391.getCode(name),
        label: name,
    }));

    return (
        <div className="w-full">
            {label && (
                <div className="flex items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">{label}</label>
                    {tooltipContent && (
                        <CustomTooltip
                            title={tooltipContent}
                            placement={tooltipPlacement}
                            arrow
                        >
                            <span className="ml-2">
                                <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
                            </span>
                        </CustomTooltip>
                    )}
                </div>
            )}
            <Select
                options={languageOptions}
                value={languageOptions.find(option => option.value === value && <BsCheck className="text-indigo-600 text-xl" />)}
                onChange={onChange}
                placeholder="Select Language"
                isSearchable
                styles={{
                    control: (provided) => ({
                        ...provided,
                        outline: 'none',
                        backgroundColor: 'white',
                        color: 'white',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        fontSize: "15px"
                    }),
                    menu: (provided) => ({
                        ...provided,
                        fontSize: '14px'
                    }),
                    option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected ? 'rgb(224 231 255)' : 'white',
                        color: state.isSelected ? 'black' : 'black',
                    }),
                }}
            />
        </div>
    );
};

export default LanguageSelect;