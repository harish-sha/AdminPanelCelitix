import { Button } from "@mui/material";

const UniversalButton = ({
    id,
    name,
    label,
    onClick,
    type = 'button',
    variant = 'primary',
    icon = null,
    disabled = false,
    isLoading = false,
    style
}) => {
    const getButtonStyles = () => {
        switch (variant) {
            case 'primary':
                // return 'bg-[#212529] hover:bg-gray-900 text-white';
                return 'bg-blue-400 hover:bg-blue-500 text-white';
            case 'secondary':
                return 'bg-gray-500 hover:bg-gray-600 text-white';
            case 'danger':
                return 'bg-red-500 hover:bg-red-600 text-white';
            default:
                return 'bg-blue-500 hover:bg-blue-600 text-white';
        }
    };

    return (
        <>
            <button
                id={id}
                name={name}
                type={type}
                onClick={onClick}
                disabled={disabled || isLoading}
                style={style}
                className={`flex items-center font-p text-sm justify-center gap-2 px-4 py-2 cursor-pointer rounded-lg shadow-md focus:outline-none  focus:ring-0  ${getButtonStyles()} ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
            >
                {isLoading ? (
                    <span className='loader'></span>
                ) : (
                    <>
                        {/* {icon && <span>{icon}</span>} */}
                        {icon && <span>{icon}</span>}
                        {label}
                    </>
                )}
            </button>
            {/* <Button
                id={id}
                name={name}
                type={type}
                onClick={onClick}
                disabled={disabled || isLoading}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-0 focus:ring-offset-2 ${getButtonStyles()} ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
            >
                {isLoading ? (
                    <span className='loader'></span>
                ) : (
                    <>
                        {icon && <span>{icon}</span>}
                        {label}
                    </>
                )}
            </Button> */}
        </>

    );
};

export default UniversalButton;
