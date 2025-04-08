import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const DropdownMenuPortal = ({
  children,
  targetRef,
  onClose,
  style = {},
  positionOverrides = {}
}) => {
  const [position, setPosition] = useState(null);
  const menuRef = useRef();

  useEffect(() => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
      });
    }
    // if (targetRef.current) {
    //   const rect = targetRef.current.getBoundingClientRect();

    //   // Calculate default positions
    //   const defaultPosition = {
    //     top: rect.bottom + window.scrollY + 4, // Default below the target
    //     left: rect.left + window.scrollX, // Default aligned to the left of the target
    //   };

    //   // Apply overrides if provided
    //   const finalPosition = {
    //     ...defaultPosition,
    //     ...positionOverrides, // Override specific values (e.g., top, left, right)
    //   };

    //   setPosition(finalPosition);
    // }

    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !targetRef.current.contains(e.target)
      ) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [targetRef, onClose]);

  if (!position) return null;

  return createPortal(
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className=" bg-white shadow-lg rounded-md border border-slate-200 z-[9999]"
      style={{ top: position.top, left: position.left, right: position.right, ...style, }}
    >
      {children}
    </motion.div>,
    document.body
  );
};

export default DropdownMenuPortal;
