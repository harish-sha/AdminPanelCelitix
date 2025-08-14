import React, { useEffect, useMemo, useRef, useState } from "react";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";

function formatTime(sec = 0) {
  const s = Math.floor(sec % 60);
  const m = Math.floor(sec / 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function WhatsAppVoiceMessage({
  src,
  time = "5:27 pm",
  isOutgoing = true,
}) {
  const audioRef = useRef(null);
  const waveRef = useRef(null); // NEW
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  const bars = useMemo(
    () => [6,12,9,14,10,8,13,7,12,6,11,15,9,12,7,10,13,9,6,11,8,12,10,14,9,12,7,10],
    []
  );

  // Reset when source changes (NEW)
  useEffect(() => {
    setIsPlaying(false);
    setDuration(0);
    setProgress(0);
    const el = audioRef.current;
    if (el) {
      el.pause();
      el.load(); // re-read metadata for new src
    }
  }, [src]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onLoaded = () => setDuration(Number.isFinite(el.duration) ? el.duration : 0);
    const onTime = () => setProgress(Math.max(0, el.currentTime || 0));
    const onEnded = () => setIsPlaying(false);

    el.addEventListener("loadedmetadata", onLoaded);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("loadedmetadata", onLoaded);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnded);
    };
  }, []);

  const ratio =
    Number.isFinite(duration) && duration > 0
      ? Math.min(1, Math.max(0, progress / duration))
      : 0;
  const progressPct = Math.round(ratio * 100);

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      try {
        await el.play();
        setIsPlaying(true);
      } catch {}
    }
  };

  // Click-to-seek on waveform (NEW)
  const seekByClick = (e) => {
    if (!(duration > 0)) return;
    const rect = waveRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const r = Math.min(1, Math.max(0, x / rect.width));
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = r * duration;
    setProgress(el.currentTime);
  };

  return (
    <div className="flex items-end gap-2">
      <div
        className={[
          "max-w-[340px] w-full rounded-2xl p-3 shadow-sm",
          isOutgoing
            ? "bg-[#E1F3FB] text-black rounded-bl-none"
            : "bg-white text-gray-900 rounded-br-none border border-gray-200",
        ].join(" ")}
      >
        <audio ref={audioRef} src={src} preload="metadata" />

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            className={[
              "h-9 w-9 rounded-full flex items-center justify-center shrink-0",
              isOutgoing ? "bg-black/20" : "bg-gray-500",
            ].join(" ")}
            aria-label={isPlaying ? "Pause voice message" : "Play voice message"}
          >
            {isPlaying ? (
              <BsPauseFill className={isOutgoing ? "text-black text-xl" : "text-white text-xl"} />
            ) : (
              <BsPlayFill className={isOutgoing ? "text-black text-xl" : "text-white text-xl"} />
            )}
          </button>

          {/* Waveform */}
          <div
            ref={waveRef}              // NEW
            onClick={seekByClick}      // NEW
            className="relative h-9 flex items-center cursor-pointer select-none"
          >
            {/* Base bars */}
            <div className="pointer-events-none flex items-center gap-[3px]">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className={[
                    "w-[2px] rounded-full",
                    isOutgoing ? "bg-black/40" : "bg-gray-500/60",
                  ].join(" ")}
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>

            {/* Progress overlay */}
            <div
              className="absolute left-0 overflow-hidden pointer-events-none" // inset-y-0 (NEW)
              style={{ width: `${progressPct}%` }}
            >
              <div className="flex items-center gap-[3px] w-[120%]">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className={[
                      "w-[2px] rounded-full",
                      isOutgoing ? "bg-black" : "bg-gray-700",
                    ].join(" ")}
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-start justify-start ml-12 text-[11px]">
          <span className={isOutgoing ? "text-black/90" : "text-gray-600"}>
            {duration ? formatTime(duration) : formatTime(progress)}
          </span>
        </div>
      </div>
    </div>
  );
}
