{/* Search Templates and Status */ }
<div className="relative flex items-center transition-all duration-300">
    <div
        className={`relative flex items-center transition-all duration-300 border rounded-lg border-gray-300 
            ${searchActive ? "w-80 px-2" : "w-12"} 
            ${!searchActive ? "animate-border-glow" : ""}`}
    >
        <input
            type="text"
            className={`border-none rounded-lg px-4 py-2 text-sm transition-all duration-300 
                ${searchActive ? "w-full opacity-100" : "w-0 opacity-0"} focus:outline-none`}
            placeholder="Search templates (status, name etc.)"
            onBlur={() => setSearchActive(false)}
        />
        <IoSearch
            className="absolute right-3 text-gray-600 cursor-pointer"
            size={22}
            color='green'
            onClick={() => setSearchActive(true)}
        />
    </div>

    {/* Text beside search bar when expanded */}
    {searchActive && (
        <span className="ml-3 text-gray-500 transition-opacity duration-300">Search Templates</span>
    )}
</div>

{/* Add this CSS to make the rotating border animation */ }
<style>
    @keyframes rotate-border {
        0 % { box- shadow: 0px 0px 5px rgba(34, 197, 94, 0.5); }
    25% {box - shadow: 0px 0px 10px rgba(34, 197, 94, 0.7); }
    50% {box - shadow: 0px 0px 15px rgba(34, 197, 94, 0.9); }
    75% {box - shadow: 0px 0px 10px rgba(34, 197, 94, 0.7); }
    100% {box - shadow: 0px 0px 5px rgba(34, 197, 94, 0.5); }
}

    .animate-border-glow {
        animation: rotate-border 1.5s infinite alternate;
}
</style>
