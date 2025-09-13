"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, X } from "lucide-react";

const norm = (s = "") =>
  String(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9+ ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function buildHay(opt, keys) {
  const parts = [];
  for (const k of keys) {
    const v = opt?.[k];
    if (Array.isArray(v)) parts.push(v.join(" "));
    else if (v != null) parts.push(String(v));
  }
  return norm(parts.join(" "));
}

export default function OneTimeDropdown({
  options = [],
  value = null,
  onChange = () => { },
  placeholder = "Select option",
  searchPlaceholder = "Search...",
  searchKeys = ["label", "value", "dialCode", "keywords"], // NEW: control which fields are searchable
  matchMode = "contains",
  classNameMain
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  const [refresh, setIsRefresh] = useState(false);

  // const [filteredArray, setFilteredArray] = useState([]);


  useEffect(() => {
    const onDocClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const normalized = useMemo(() => {
    return options.map((opt) =>
      typeof opt === "string" ? { label: opt, value: opt } : opt || {}
    );
  }, [options]);

  const searchable = useMemo(() => {
    return normalized.map((opt) => ({
      ...opt,
      __hay: buildHay(opt, searchKeys),
    }));
  }, [normalized, searchKeys]);

  const filteredArray = useMemo(() => {
    const q = norm(query);
    if (!q) return searchable;

    const tokens = q.split(" ");

    return searchable.filter((o) => {
      if (!o.__hay) return false;
      if (matchMode === "startsWith") {
        const hayTokens = o.__hay.split(" ");
        return tokens.every((t) => hayTokens.some((ht) => ht.startsWith(t)));
      }
      return tokens.every((t) => o.__hay.includes(t));
    });
  }, [query, searchable, matchMode]);

  // useEffect(() => {
  //   console.log("searchable", searchable);
  // }, [searchable]);
  // useEffect(() => {
  //   console.log("matchMode", matchMode);
  // }, [matchMode]);
  // useEffect(() => {
  //   console.log("query", query);
  // }, [query]);
  // useEffect(() => {
  //   console.log("filtered", filtered);
  //   setIsRefresh(true);

  //   setFilteredArray(filtered);
  // }, [filtered]);

  // useEffect(() => {
  //   // console.log("filteredArray", filteredArray);
  //   //  filteredArray((e) => {
  //   //    console.log("e", e);
  //   //  });
  // }, [filteredArray]);

  useEffect(() => setActiveIndex(0), [query, open, filteredArray.length]);

  const selected = searchable.find((o) => o.value === value) || null;
  const selectedLabel = selected?.label ?? "";

  function select(opt) {
    onChange(opt.value);
    setOpen(false);
    setQuery(""); // keep input free for next search
  }

  function onKeyDown(e) {
    if (!open) {
      if (["ArrowDown", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filteredArray.length - 1));
      listRef.current
        ?.querySelector('[data-active="true"]')
        ?.scrollIntoView({ block: "nearest" });
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      listRef.current
        ?.querySelector('[data-active="true"]')
        ?.scrollIntoView({ block: "nearest" });
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredArray[activeIndex]) select(filteredArray[activeIndex]);
    }
  }

  return (
    <div className="relative" ref={wrapperRef} onKeyDown={onKeyDown}>
      {/* Search input (always visible) */}
      <div className={` ${classNameMain}`}>
        <Search className="ml-2 text-sm text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!open) setOpen(true);
          }}
          placeholder={selectedLabel || placeholder || searchPlaceholder}
          onFocus={() => setOpen(true)}
          className="w-full px-2 text-sm outline-none bg-transparent"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="p-1 mr-1 rounded hover:bg-gray-100"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        )}
        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          className="px-0 md:px-2 h-full"
          aria-label="Toggle menu"
        >
          <ChevronDown
            className={`h-5 w-5 text-gray-500 transition-transform ${open ? "rotate-180" : ""
              }`}
          />
        </button>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg z-10"
          >
            <ul ref={listRef} className="max-h-56 overflow-auto py-1">
              {filteredArray.length ? (
                filteredArray.map((opt, idx) => {
                  const isSelected = value === opt.value;
                  const isActive = idx === activeIndex;
                  return (
                    <li
                      key={opt.value}
                      data-active={isActive}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => select(opt)}
                      className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between
                        ${isActive ? "bg-blue-50" : "hover:bg-gray-50"}
                        ${isSelected ? "font-medium" : ""}`}
                    >
                      <span className="truncate">{opt.label}</span>
                      {opt.dialCode && (
                        <span className="ml-3 shrink-0 text-xs text-gray-500">
                          {opt.dialCode}5
                        </span>
                      )}
                    </li>
                  );
                })
              ) : (
                <li className="px-4 py-3 text-gray-500 text-sm">
                  No results found
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
