import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

/**
 * Reusable Dropdown
 *
 * Props:
 * - label: string (button text)
 * - items: Array<{ text: string, icon?: React.ComponentType, onClick?: () => void }>
 * - align: "left" | "center" | "right"   (menu alignment relative to button)
 * - width: string (Tailwind width class, e.g., "w-48")
 * - buttonClassName: string (classes for trigger button)
 * - menuClassName: string (classes for menu container)
 * - itemClassName: string (classes for each item)
 * - isOpen: boolean (optional, controlled mode)
 * - onOpenChange: (open:boolean) => void (optional, controlled mode handler)
 */
export default function Dropdown({
    label = "Post actions",
    items = [],
    align = "center",
    width = "w-48",
    buttonClassName = "flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-500 transition-colors",
    menuClassName = "flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute z-50 overflow-hidden",
    itemClassName = "flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer",
    isOpen,
    onOpenChange,
}) {
    const [openUncontrolled, setOpenUncontrolled] = useState(false);
    const open = typeof isOpen === "boolean" ? isOpen : openUncontrolled;
    const setOpen = (v) => (onOpenChange ? onOpenChange(v) : setOpenUncontrolled(v));

    const rootRef = useRef(null);

    // Close on outside click
    useEffect(() => {
        if (!open) return;
        const onClick = (e) => {
            if (!rootRef.current) return;
            if (!rootRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, [open]);

    // Close on ESC
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    // Alignment styles
    const alignStyles =
        align === "left"
            ? { left: "0%", translateX: "0%" }
            : align === "right"
                ? { left: "100%", translateX: "-100%" }
                : { left: "50%", translateX: "-50%" }; // center

    return (
        <div className="relative inline-block" ref={rootRef}>
            <motion.div animate={open ? "open" : "closed"} className="relative">
                <button onClick={() => setOpen(!open)} className={buttonClassName}>
                    <span className="font-medium text-sm">{label}</span>
                    <motion.span variants={iconVariants} className="text-sm">
                        <FiChevronDown />
                    </motion.span>
                </button>

                <motion.ul
                    initial={wrapperVariants.closed}
                    variants={wrapperVariants}
                    style={{ originY: "top", ...alignStyles }}
                    className={`${menuClassName} ${width} top-[120%] absolute`}
                >
                    {items.map((it, idx) => (
                        <Option
                            key={idx}
                            text={it.text}
                            Icon={it.icon}
                            onClick={() => {
                                it.onClick?.();
                                setOpen(false);
                            }}
                            itemClassName={itemClassName}
                        />
                    ))}
                </motion.ul>
            </motion.div>
        </div>
    );
}

/* ---------- Internal Option item ---------- */
function Option({ text, Icon, onClick, itemClassName }) {
    return (
        <motion.li variants={itemVariants} onClick={onClick} className={itemClassName}>
            <motion.span variants={actionIconVariants} className="text-[14px]">
                {Icon ? <Icon /> : null}
            </motion.span>
            <span>{text}</span>
        </motion.li>
    );
}

/* ---------- Motion variants (same feel as your original) ---------- */
const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: { when: "beforeChildren", staggerChildren: 0.1 },
    },
    closed: {
        scaleY: 0,
        transition: { when: "afterChildren", staggerChildren: 0.1 },
    },
};

const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
};

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { when: "beforeChildren" },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: { when: "afterChildren" },
    },
};

const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
};
