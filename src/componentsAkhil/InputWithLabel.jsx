import { AiOutlineInfoCircle } from "react-icons/ai";
import CustomTooltip from "../components/CustomTooltip";

const InputWithLabel = ({
    id,
    name,
    label,
    tooltipContent = "",
    value,
    onChange,
    type="text",
    placeholder = "",
    error = false,
    errorText = "",
    tooltipPlacement = "top",
}) => {
    return (
        <div className="w-full flex items-center gap-2 mb-2">
            {/* Label & Tooltip Container */}
            <div className="w-4/12 flex items-center">
                {label && (
                    <label htmlFor={id} className="text-sm font-semibold text-gray-700 w-full">
                        {label}
                    </label>
                )}
                {tooltipContent && (
                    <CustomTooltip title={tooltipContent} placement={tooltipPlacement} arrow>
                        <span>
                            <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                        </span>
                    </CustomTooltip>
                )}
            </div>

            {/* Input Field */}
            <div className="w-8/12">
                <input
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`block w-full p-1.5 h-[1.9rem] border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm ${
                        error ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {error && <p className="mt-1 text-sm text-red-500">{errorText}</p>}
            </div>
        </div>
    );
};

export default InputWithLabel;
