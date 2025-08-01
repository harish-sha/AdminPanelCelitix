import { AiOutlineInfoCircle } from "react-icons/ai";
import CustomTooltip from "../components/CustomTooltip";

const InputField = ({
  id,
  name,
  label,
  tooltipContent = "",
  value,
  onChange,
  type = "text",
  placeholder = "",
  error = false,
  errorText = "",
  // noSpaces = false,
  tooltipPlacement = "top",
  readOnly = false,
  style = {},
  maxLength = "",
  accept = "",
  required = false,
  // max = { maxLength },
  className = "",
  ref = null,
  divClassName = "",
  disabled = false
}) => {
  // const handleChange = (e) => {
  //     let inputValue = e.target.value;
  //     if (noSpaces) {
  //         inputValue = inputValue.replace(/\s/g, "");
  //     }
  //     onChange(inputValue);
  // };

  return (
    <div className={`w-full ${divClassName}`}>
      {label && (
        <div className="flex items-center gap-2 mb-2">
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
          </label>
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
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        style={style}
        maxLength={maxLength}
        disabled={disabled}
        className={`block w-full  p-1.5 h-[2.275rem] border bg-white rounded-md shadow-sm focus:ring-0 focus:shadow focus:ring-gray-300 focus:outline-none sm:text-sm ${className} ${error ? "border-red-500" : "border-gray-300"
          }`}
        accept={accept}
        ref={ref}
        inputMode={type === "number" ? "numeric" : "text"}
      />

      {error && <p className="mt-1 text-sm text-red-500">{errorText}</p>}
    </div>
  );
};

export default InputField;
