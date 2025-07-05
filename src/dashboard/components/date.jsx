import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(localeData);

/**
 * Controlled mini calendar component
 * Props:
 * - value: dayjs instance for selected date
 * - onChange: function(dayjs) when a date is clicked
 * - label: optional string label
 * - minDate, maxDate: optional dayjs or Date bounds
 */
export default function MiniCalendar({ value, onChange, label, minDate, maxDate }) {
  const [current, setCurrent] = useState(dayjs());
  const [mode, setMode] = useState("days"); // 'days', 'months', 'years'
  const today = dayjs();

  const startOfMonth = current.startOf("month");
  const totalDays = current.daysInMonth();
  const startDay = startOfMonth.day(); // 0=Sunday

  // Build 42 calendar slots
  const slots = Array.from({ length: 42 }, (_, idx) => {
    const dayNum = idx - startDay + 1;
    return dayNum > 0 && dayNum <= totalDays ? dayNum : null;
  });

  const prev = () => {
    if (mode === "days") setCurrent((m) => m.subtract(1, "month"));
    else if (mode === "months") setCurrent((m) => m.subtract(1, "year"));
    else setCurrent((m) => m.subtract(12, "year"));
  };
  const next = () => {
    if (mode === "days") setCurrent((m) => m.add(1, "month"));
    else if (mode === "months") setCurrent((m) => m.add(1, "year"));
    else setCurrent((m) => m.add(12, "year"));
  };

  const selectMonth = (month) => {
    setCurrent((m) => m.month(month));
    setMode("days");
  };
  const selectYear = (year) => {
    setCurrent((m) => m.year(year));
    setMode("months");
  };

  return (
    <div className="w-56 bg-gray-800 text-gray-200 rounded-lg p-4 shadow-lg">
      {label && <div className="mb-2 text-center font-medium text-gray-100">{label}</div>}
      <div className="flex items-center justify-between mb-3">
        <button onClick={prev} className="p-1 hover:bg-gray-700 rounded">
          <ChevronLeftIcon fontSize="small" className="text-gray-400" />
        </button>
        <div className="flex-1 text-center">
          {mode === "days" && (
            <>
              <span onClick={() => setMode("months")} className="cursor-pointer font-semibold">
                {current.format("MMMM")}
              </span>{" "}
              <span onClick={() => setMode("years")} className="cursor-pointer font-semibold text-red-500">
                {current.format("YYYY")}
              </span>
            </>
          )}
          {mode === "months" && <span className="font-semibold">Select Month</span>}
          {mode === "years" && <span className="font-semibold">Select Year</span>}
        </div>
        <button onClick={next} className="p-1 hover:bg-gray-700 rounded">
          <ChevronRightIcon fontSize="small" className="text-gray-400" />
        </button>
      </div>

      {/* Months View */}
      {mode === "months" && (
        <div className="grid grid-cols-3 gap-1">
          {dayjs.months().map((m, idx) => (
            <button
              key={m}
              onClick={() => selectMonth(idx)}
              className={
                `py-1 rounded hover:bg-gray-700 text-center ` +
                (current.month() === idx ? "bg-indigo-600 text-white" : "text-gray-300")
              }
            >
              {m.slice(0,3)}
            </button>
          ))}
        </div>
      )}

      {/* Years View */}
      {mode === "years" && (
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 12 }).map((_, idx) => {
            const year = current.year() - 6 + idx;
            return (
              <button
                key={year}
                onClick={() => selectYear(year)}
                className={
                  `py-1 rounded hover:bg-gray-700 text-center ` +
                  (current.year() === year ? "bg-indigo-600 text-white" : "text-gray-300")
                }
              >
                {year}
              </button>
            );
          })}
        </div>
      )}

      {/* Days View */}
      {mode === "days" && (
        <>
          <div className="grid grid-cols-7 text-xs font-medium text-gray-500 mb-1">
            {['S','M','T','W','T','F','S'].map((w) => (
              <div key={w} className="text-center">{w}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-sm">
            {slots.map((dayNum, idx) => {
              if (!dayNum) return <div key={idx} />;

              const cellDate = current.date(dayNum);
              const isToday = today.isSame(cellDate, "day");
              const isSel = value && dayjs(value).isSame(cellDate, "day");
              const disabled = (minDate && cellDate.isBefore(dayjs(minDate), 'day')) ||
                               (maxDate && cellDate.isAfter(dayjs(maxDate), 'day'));

              let base = "h-7 w-7 flex items-center justify-center rounded-full cursor-pointer ";
              if (disabled) base += "text-gray-600 opacity-40 cursor-not-allowed";
              else if (isSel) base += "bg-indigo-500 text-white";
              else if (isToday) base += "bg-red-500 text-white";
              else base += "hover:bg-gray-700";

              return (
                <div
                  key={idx}
                  className={base}
                  onClick={() => !disabled && onChange && onChange(cellDate)}
                >
                  {dayNum}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
