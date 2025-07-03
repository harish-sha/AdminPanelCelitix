import { useState, useRef, useEffect } from "react";
import { BiCalendar, BiX } from "react-icons/bi";
import dayjs from "dayjs";
import MiniCalendar from "./date";

export default function DateInputWithCalendar({
  label,
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = "DD/MM/YYYY",
}) {
  const [open, setOpen] = useState(false);
  // text holds the formatted "dd/mm/yyyy" string
  const [text, setText] = useState(
    value ? dayjs(value).format("DD/MM/YYYY") : ""
  );
  const ref = useRef(null);

  // Close on outside click, and re-parse text to a date
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        parseAndEmit(text);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [text]);

  // Turn "dd/mm/yyyy" into a Day.js date if valid and within bounds
  const parseAndEmit = (str) => {
    const parts = str.split("/").map((p) => parseInt(p, 10));
    if (parts.length === 3) {
      const [d, m, y] = parts;
      const dt = dayjs(`${y}-${m}-${d}`, "YYYY-M-D", true);
      if (
        dt.isValid() &&
        (!minDate || !dt.isBefore(dayjs(minDate), "day")) &&
        (!maxDate || !dt.isAfter(dayjs(maxDate), "day"))
      ) {
        onChange(dt);
        setText(dt.format("DD/MM/YYYY"));
        return;
      }
    }
    // If invalid, revert to last known valid or blank
    setText(value ? dayjs(value).format("DD/MM/YYYY") : "");
  };

  // When user picks from mini-calendar
  const handleSelect = (date) => {
    onChange(date);
    setText(date.format("DD/MM/YYYY"));
    setOpen(false);
  };

  // As the user types, enforce digits + insert slashes
  const handleInputChange = (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 8);
    if (v.length > 4) {
      v = `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
    } else if (v.length > 2) {
      v = `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    setText(v);
  };

  return (
    <div className="relative inline-block w-56" ref={ref}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      {/* Text input */}
      <div className="relative">
        <input
          type="text"
          value={text}
          placeholder={placeholder}
          className="w-full border rounded px-3 py-2 pr-8 focus:outline-none cursor-text"
          onChange={handleInputChange}
          onFocus={() => setOpen(true)}
          onBlur={() => parseAndEmit(text)}
        />

        {text ? (
          <BiX
            size={18}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => {
              setText("");
              onChange(null);
            }}
          />
        ) : (
           <BiCalendar
            size={18}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();  // prevent blur/outside-close
              setOpen((o) => !o);
            }}
          />
        )}
      </div>

      {/* Calendar pop-up */}
      {open && (
        <div className="absolute left-0 mt-1 z-20">
          <MiniCalendar
            value={text ? dayjs(text, "DD/MM/YYYY") : null}
            onChange={handleSelect}
            minDate={minDate && dayjs(minDate)}
            maxDate={maxDate && dayjs(maxDate)}
          />
        </div>
      )}
    </div>
  );
}
