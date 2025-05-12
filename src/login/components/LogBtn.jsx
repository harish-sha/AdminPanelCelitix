import React from 'react';

const LogBtn = ({
    label = 'Click Me',
    id = '',
    onClick,
    type = 'button',
    variant = 'primary',
    className = '',
    disable,
    ...props
}) => {
    const getButtonStyles = () => {
        switch (variant) {
            case 'primary':
                return `
    group relative inline-flex items-center justify-center rounded-md border-2 border-indigo-500 
    overflow-hidden transition-transform duration-300 hover:scale-105 
    before:absolute before:right-0 before:bottom-0 before:w-0 before:h-0 before:rounded-tl-md 
    before:bg-indigo-500 before:transition-all before:duration-500 
    hover:before:w-full before:left hover:before:h-full hover:text-white hover:border-none lora 
    cursor-pointer
  `;
            case 'transitionbtn':
                return `
                      group relative inline-flex items-center justify-center rounded-md border-2 border-indigo-200 
                      overflow-hidden transition-colors duration-300 
                      before:absolute before:left-0 before:top-0 before:h-full before:w-0 
                      before:bg-[#664E9C] before:transition-all before:duration-500 
                      hover:before:w-full hover:text-white lora cursor-pointer
                    `;
            case 'draw':
                return 'group relative font-medium text-slate-100 transition-colors duration-500 hover:text-indigo-300 lora cursor-pointer';
            case 'brutal':
                return 'rounded-xl cursor-pointer border-2 border-dashed text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none lora';

            // 'rounded-2xl border-2 border-dashed border-black text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none'

            case 'glow':
                return 'relative inline-flex items-center justify-center bg-black rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 border border-transparent before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-r before:from-pink-500 before:to-purple-500 before:z-[-1] before:opacity-70 hover:before:blur-md lora cursor-pointer';
            default:
                return 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer';
        }
    };

    const drawBorderSpans = (
        <>
            {/* TOP: left → right */}
            <span className="absolute top-0 left-0 h-[2px] w-0 bg-[#9B44B6] transition-all duration-150 group-hover:w-full" />

            {/* RIGHT: top → bottom */}
            <span className="absolute top-0 right-0 h-0 w-[2px] bg-[#9B44B6] transition-all duration-150 delay-150 group-hover:h-full" />

            {/* BOTTOM: right → left */}
            <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-[#9B44B6] transition-all duration-150 delay-300 group-hover:w-full" />

            {/* LEFT: bottom → top */}
            <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-[#9B44B6] transition-all duration-150 delay-450 group-hover:h-full" />
        </>
    );


    return (
        <button
            id={id}
            type={type}
            onClick={onClick}
            className={`${getButtonStyles()} ${className}`}
            disabled={disable}
            {...props}
        >
            <span className="relative z-10 ">
                {label}
            </span>
            {variant === 'draw' && drawBorderSpans}
        </button>
    );
};

export default LogBtn;
