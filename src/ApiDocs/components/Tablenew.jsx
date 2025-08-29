import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

// Tiny classnames helper (no external deps)
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Base styles driven by theme (applied to the scrollable area only)
const useBase = (isDark) => ({
  wrapper: cn(
    " w-full rounded-xl overflow-x-auto custom-scrollbar shadow-lg",
    isDark ? "bg-gray-800 text-white" : "bg-white text-[#333333]"
  ),
  table: "w-full border-collapse",
  thead: isDark ? "bg-gray-700 text-white" : "bg-[#4e6a78] text-white",
  tbody: isDark ? "bg-gray-800 text-white" : "bg-[#f7f7f7] text-gray-800",
  th: cn(
    "font-medium text-left align-middle whitespace-nowrap",
    "p-2 sm:p-2 md:p-3"
  ),
  td: cn("align-middle break-words p-2 sm:p-2 md:p-3"),
  tr: "",
  zebraLight: "odd:bg-[#f7f7f7] even:bg-[#eeeeee]",
  zebraDark: "odd:bg-gray-800 even:bg-gray-700",
  bordered: "border border-gray-200",
  borderedDark: "border border-gray-700",
  sticky: "sticky top-0 z-10",
});

// Font-size utility map
const sizeMap = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
};

// Simple chevron icon
const Chevron = ({ dir = "right" }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    {dir === "right" ? (
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    )}
  </svg>
);

// Root: INLINE buttons + scrollable table in the middle
const TableRoot = forwardRef(
  (
    {
      className,
      children,
      size = "md",
      zebra = false,
      bordered = false,
      stickyHeader = false,
      headSize = "md",
      bodySize = "sm",
      scrollButtons = true, // show left/right inline buttons
      scrollStep = 280, // px per click
      devVisible = false, // show buttons in Next.js dev when true
      ...props
    },
    ref
  ) => {
    const { isDarkMode } = useTheme();
    const s = useBase(isDarkMode);

    const wrapRef = useRef(null);
    const tblRef = useRef(null);
    const setTableRef = (node) => {
      tblRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(false);
    const [hasOverflow, setHasOverflow] = useState(false);

    const updateButtons = () => {
      const el = wrapRef.current;
      if (!el) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setHasOverflow(scrollWidth > clientWidth + 1);
      setCanLeft(scrollLeft > 0);
      setCanRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    useEffect(() => {
      updateButtons();
      const el = wrapRef.current;
      if (!el) return;

      const onScroll = () => updateButtons();
      el.addEventListener("scroll", onScroll, { passive: true });

      // Recompute when window resizes
      if (typeof window !== "undefined") {
        window.addEventListener("resize", updateButtons);
      }

      // Recompute when the wrapper or table size changes (e.g., columns/data load)
      let ro;
      if (typeof ResizeObserver !== "undefined") {
        ro = new ResizeObserver(updateButtons);
        ro.observe(el);
        if (tblRef.current) ro.observe(tblRef.current);
      }

      return () => {
        el.removeEventListener("scroll", onScroll);
        if (typeof window !== "undefined") {
          window.removeEventListener("resize", updateButtons);
        }
        if (ro) ro.disconnect();
      };
    }, []);

    const scrollBy = (delta) => {
      const el = wrapRef.current;
      if (!el) return;
      el.scrollBy({ left: delta, behavior: "smooth" });
    };

    const isDev =
      typeof process !== "undefined" && process.env.NODE_ENV === "development";
    // Only render buttons when:
    // - buttons enabled
    // - (not dev) or devVisible override
    // - there is horizontal overflow
    const showBtns = scrollButtons && (!isDev || devVisible) && hasOverflow;

    return (
      <div className={cn("w-full relative", className)}>
        {/* Scrollable table area (relative so absolute buttons anchor here) */}
        <div
          ref={wrapRef}
          className={cn(s.wrapper, "")} // px-12 so buttons don't cover edge cells
        >
          <table
            ref={setTableRef}
            className={cn(s.table, sizeMap[size])}
            {...props}
          >
            {React.Children.map(children, (child) =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                  _tableCtx: {
                    zebra,
                    bordered,
                    stickyHeader,
                    isDarkMode,
                    headSize,
                    bodySize,
                  },
                })
                : child
            )}
          </table>

          {showBtns && (
            <>
              {/* LEFT absolute button (inside wrapper height) */}
              <div className="pointer-events-none absolute inset-y-0 -left-11 top-2 w-12 hidden lg:flex items- justify-center z-51 ">
                <button
                  type="button"
                  aria-label="Scroll left"
                  onClick={() => scrollBy(-scrollStep)}
                  disabled={!canLeft}
                  className={cn(
                    "pointer-events-auto h-9 w-9 rounded-full border shadow-md flex items-center justify-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    isDarkMode
                      ? "bg-white text-gray-900 border-gray-600 hover:bg-gray-50 focus-visible:ring-gray-500"
                      : "bg-gray-700/80 text-white border-gray-200 hover:bg-gray-700 focus-visible:ring-gray-300",
                    !canLeft && "opacity-40 cursor-not-allowed"
                  )}
                  title="Scroll left"
                >
                  <Chevron dir="left" />
                </button>
              </div>

              {/* RIGHT absolute button (inside wrapper height) */}
              <div className="pointer-events-none absolute inset-y-0 -right-11 top-2 w-12 z-20 hidden lg:flex items-start justify-center">
                <button
                  type="button"
                  aria-label="Scroll right"
                  onClick={() => scrollBy(scrollStep)}
                  disabled={!canRight}
                  className={cn(
                    "pointer-events-auto h-9 w-9 rounded-full border shadow-md flex items-center justify-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    isDarkMode
                      ? "bg-white text-gray-900 border-gray-600 hover:bg-gray-50 focus-visible:ring-gray-500"
                      : "bg-gray-700/80 text-white border-gray-200 hover:bg-gray-700 focus-visible:ring-gray-300",
                    !canRight && "opacity-40 cursor-not-allowed"
                  )}
                  title="Scroll right"
                >
                  <Chevron dir="right" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);

// Head applies headSize by default
const TableHead = ({ className, children, _tableCtx }) => {
  const { isDarkMode, stickyHeader, headSize = "md" } = _tableCtx || {};
  const s = useBase(isDarkMode);

  return (
    <thead className={cn(s.thead, sizeMap[headSize], className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
            _tableCtx: { ...(_tableCtx || {}), isHead: true, stickyHeader },
          })
          : child
      )}
    </thead>
  );
};

// Body applies bodySize by default
const TableBody = ({ className, children, _tableCtx }) => {
  const { isDarkMode, zebra, bordered, bodySize = "sm" } = _tableCtx || {};
  const s = useBase(isDarkMode);

  return (
    <tbody
      className={cn(
        s.tbody,
        sizeMap[bodySize],
        zebra && (isDarkMode ? s.zebraDark : s.zebraLight),
        bordered && (isDarkMode ? s.borderedDark : s.bordered),
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { _tableCtx })
          : child
      )}
    </tbody>
  );
};

const TableRow = ({ className, children, _tableCtx }) => {
  const { isDarkMode, bordered } = _tableCtx || {};
  const s = useBase(isDarkMode);

  return (
    <tr
      className={cn(
        s.tr,
        bordered &&
        (isDarkMode
          ? "border-b border-gray-800"
          : "border-b border-gray-300"),
        isDarkMode ? "bg-[#364153]" : "bg-[#EEEEEE]",
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { _tableCtx })
          : child
      )}
    </tr>
  );
};

// Header cell with per-cell size override (size/headSize)
const TableHeaderCell = ({
  className,
  children,
  _tableCtx,
  align = "left",
  size, // per-cell alias
  headSize, // per-cell header-specific
}) => {
  const {
    isDarkMode,
    stickyHeader,
    headSize: ctxHeadSize = "md",
  } = _tableCtx || {};
  const s = useBase(isDarkMode);

  const alignCls =
    align === "center"
      ? "text-center"
      : align === "right"
        ? "text-right"
        : "text-left";

  const effectiveSize = size || headSize || ctxHeadSize;
  const sizeCls = sizeMap[effectiveSize] || "";

  return (
    <th
      className={cn(
        s.th,
        sizeCls,
        stickyHeader && s.sticky,
        isDarkMode ? "bg-[#6A7282]" : "bg-[#4e6a78]",
        alignCls,
        className
      )}
    >
      {children}
    </th>
  );
};

// Body cell with per-cell size override (size/bodySize)
const TableCell = ({
  className,
  children,
  _tableCtx,
  align = "left",
  size, // per-cell alias
  bodySize, // per-cell body-specific
}) => {
  const { isDarkMode, bodySize: ctxBodySize = "sm" } = _tableCtx || {};
  const s = useBase(isDarkMode);

  const alignCls =
    align === "center"
      ? "text-center"
      : align === "right"
        ? "text-right"
        : "text-left";

  return (
    <td
      className={cn(
        s.td,
        sizeMap[size || bodySize || ctxBodySize] || "",
        alignCls,
        className
      )}
    >
      {children}
    </td>
  );
};

// Public API
// export const Table = Object.assign(TableRoot, {
//   Head: TableHead,
//   Body: TableBody,
//   Row: TableRow,
//   HeaderCell: TableHeaderCell,
//   Cell: TableCell,
// });

// export default Table;

export default Object.assign(TableRoot, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  HeaderCell: TableHeaderCell,
  Cell: TableCell,
});
