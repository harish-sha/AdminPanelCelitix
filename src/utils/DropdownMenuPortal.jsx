import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const DropdownMenuPortal = ({ children, targetRef, onClose }) => {
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
      className="absolute bg-white shadow-lg rounded-md border border-slate-200 z-[9999] min-w-[140px]"
      style={{ top: position.top, left: position.left }}
    >
      {children}
    </motion.div>,
    document.body
  );
};

export default DropdownMenuPortal;
