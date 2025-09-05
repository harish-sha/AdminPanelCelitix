import React from "react";

const ShimmerButton = ({ children, icon: Icon, ...props }) => {
    return (
        <button className="shimmer-btn flex gap-2 items-center cursor-pointer" {...props}>
            {Icon && <Icon size={18} sx={{ fontSize: "18px" }} />}
            {children}
        </button>
    );
};

export default ShimmerButton;
