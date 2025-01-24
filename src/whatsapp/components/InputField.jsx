import { AiOutlineInfoCircle } from "react-icons/ai";
import CustomTooltip from "../components/CustomTooltip";

const InputField = ({
    label,
    tooltipContent = "",
    value,
    onChange,
    type = "text",
    placeholder = "",
    error = false,
    errorText = "",
    noSpaces = false,
    tooltipPlacement = "top",
}) => {
    const handleChange = (e) => {
        let inputValue = e.target.value;
        if (noSpaces) {
            inputValue = inputValue.replace(/\s/g, "");
        }
        onChange(inputValue);
    };

    return (
        <div className="w-full">
            {label && (
                <div className="flex items-center gap-2 mb-2">
                    <label className="text-sm font-medium text-gray-700">{label}</label>
                    {tooltipContent && (
                        <CustomTooltip
                            title={tooltipContent}
                            placement={tooltipPlacement}
                            arrow
                        >
                            <span>
                                <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                            </span>
                        </CustomTooltip>
                    )}
                </div>
            )}

            <input
                type={type}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className={`block w-full p-2 border rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm ${error ? "border-red-500" : "border-gray-300"
                    }`}
            />

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {errorText}
                </p>
            )}
        </div>
    );
};

export default InputField;
