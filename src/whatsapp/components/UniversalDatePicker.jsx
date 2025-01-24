import { AiOutlineInfoCircle } from "react-icons/ai";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CustomTooltip from "./CustomTooltip";

const UniversalDatePicker = ({
    label,
    value,
    onChange,
    placeholder = 'Select a date',
    tooltipContent = '',
    tooltipPlacement = 'top',
    error = false,
    errorText = '',
}) => {
    return (
        <div className='w-full'>
            <div className='flex items-center gap-2 mb-2'>
                {label && (
                    <label className='text-sm font-medium text-gray-800'>{label}</label>
                )}
                {tooltipContent && (
                    <CustomTooltip
                        title={tooltipContent}
                        placement={tooltipPlacement}
                        arrow
                    >
                        <span>
                            <AiOutlineInfoCircle className='text-gray-500 cursor-pointer hover:text-gray-700' />
                        </span>
                    </CustomTooltip>
                )}
            </div>

            <LocalizationProvider dateAdapter={AdapterDateFns} className="h-5 bg-slate-500" >
                <DatePicker
                    value={value}
                    onChange={onChange}
                    format='dd/MM/yyyy'
                    renderInput={(params) => (
                        <div >
                            <input
                                {...params.inputProps}
                                placeholder={placeholder}
                                className={`block w-full p-2 h-5 bg-slate-800 border rounded-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm ${error ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {error && (
                                <p className="mt-1 text-sm text-red-500">{errorText}</p>
                            )}
                        </div>
                    )}
                    sx={{
                        '& .MuiInputBase-root': {
                            borderRadius: "6px",
                            fontSize: "0.95rem",
                            height: '38px',
                            backgroundColor: '#fff',
                            boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.5)",
                            color: '',
                        },
                    }}
                />
            </LocalizationProvider>
        </div>
    );
};

export default UniversalDatePicker;
