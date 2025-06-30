<div>
  <div className="flex flex-wrap gap-2 text-sm">
    <p className="w-full font-medium text-gray-600">
      Choose your message style:
    </p>
    {["Normal", "Poetic", "Exciting", "Funny"].map((item) => (
      <button
        key={item}
        onClick={() => setStyle(item)}
        className={`relative px-3 py-1 rounded-full border overflow-hidden transition-colors duration-300 
          ${style === item ? "text-white" : "text-gray-700 bg-white"}
        `}
      >
        <span className="relative z-10">{item}</span>
        {/* Pseudo fill effect */}
        <span
          className={`absolute inset-0 rounded-full transition-transform duration-300 ease-in-out bg-violet-600 z-0
            ${style === item ? "translate-y-0" : "translate-y-full"}
          `}
          style={{
            transformOrigin: "bottom",
          }}
        ></span>
      </button>
    ))}
  </div>
</div>
