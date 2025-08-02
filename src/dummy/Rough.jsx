import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TbZoomScan } from "react-icons/tb";

export default function ChatMessages({
  messages,        // [{ id, type: 'text'|'image'|'video'|'gify'|'sticker', src?, text?, fromMe: boolean }]
  handleOpenPreview,
}) {
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="
        relative h-full w-full
        overflow-y-auto
        px-3 py-3
        space-y-3
      "
    >
      <AnimatePresence initial={false}>
        {messages.map((msg, idx) => {
          const fromMe = !!msg.fromMe;

          return (
            <div
              key={msg.id ?? idx}
              className={`w-full flex ${fromMe ? "justify-end" : "justify-start"}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.25 }}
                className={`
                  relative
                  px-3 py-2
                  cursor-pointer
                  whitespace-pre-wrap break-words
                  w-max max-w-[75%]
                  ${msg.type === "text"
                    ? fromMe
                      ? "bg-[#9AA6B2] text-white rounded-2xl rounded-br-sm"
                      : "bg-gray-500 text-white rounded-2xl rounded-bl-sm"
                    : "bg-transparent p-0"
                  }
                `}
              >
                {/* TEXT */}
                {msg.type === "text" && (
                  <span className="text-[14px] leading-relaxed">{msg.text}</span>
                )}

                {/* STICKER */}
                {msg.type === "sticker" && (
                  <div className="relative inline-block group rounded-xl overflow-hidden">
                    <img
                      src={msg.src}
                      alt="Sticker"
                      className="block w-auto h-auto max-w-[220px] max-h-[220px] rounded-xl object-contain"
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30"
                      onClick={() => handleOpenPreview?.(msg.src)}
                    >
                      <TbZoomScan className="text-gray-200 w-7 h-7" />
                    </div>
                  </div>
                )}

                {/* GIF */}
                {msg.type === "gify" && (
                  <div className="relative inline-block group rounded-xl overflow-hidden">
                    <img
                      src={msg.src}
                      alt="GIF"
                      className="block w-full max-w-[280px] max-h-[220px] rounded-xl object-cover"
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30"
                      onClick={() => handleOpenPreview?.(msg.src)}
                    >
                      <TbZoomScan className="text-gray-200 w-7 h-7" />
                    </div>
                  </div>
                )}

                {/* IMAGE */}
                {msg.type === "image" && (
                  <div className="relative inline-block group rounded-xl overflow-hidden">
                    <img
                      src={msg.src}
                      alt="Image"
                      className="block w-full max-w-[320px] max-h-[240px] rounded-xl object-cover"
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30"
                      onClick={() => handleOpenPreview?.(msg.src)}
                    >
                      <TbZoomScan className="text-gray-200 w-7 h-7" />
                    </div>
                  </div>
                )}

                {/* VIDEO (thumbnail or video tag if you have it) */}
                {msg.type === "video" && (
                  <div className="relative inline-block group rounded-xl overflow-hidden max-w-[320px]">
                    <video
                      src={msg.src}
                      className="block w-full max-h-[240px] rounded-xl"
                      controls={false}
                      muted
                      playsInline
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30"
                      onClick={() => handleOpenPreview?.(msg.src)}
                    >
                      <TbZoomScan className="text-gray-200 w-7 h-7" />
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
