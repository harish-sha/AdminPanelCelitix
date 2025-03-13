// Add to your existing `ManageTemplate` component

// Update View More/Less Industries Button
<div className='flex justify-center mt-1'>
    <button
        className="mt-2 text-blue-500 text-sm font-medium cursor-pointer hover:underline transition-all duration-300"
        onClick={() => setShowAllIndustries(!showAllIndustries)}
    >
        {showAllIndustries ? "View Less Industries" : "View More Industries"}
    </button>
</div>

// Animated Search Bar Implementation (Add inside your `div` where "search" is written)
const [searchActive, setSearchActive] = useState(false);

<div className={`relative flex items-center transition-all duration-300 ${searchActive ? "w-64" : "w-12"}`}>
    <input
        type="text"
        className={`border border-gray-300 rounded-lg px-4 py-2 text-sm transition-all duration-300 ${searchActive ? "w-full opacity-100" : "w-0 opacity-0"}`}
        placeholder="Search templates..."
        onBlur={() => setSearchActive(false)}
    />
    <IoSearch
        className="absolute right-3 text-gray-600 cursor-pointer"
        size={20}
        onClick={() => setSearchActive(true)}
    />
</div>


{/* Industry List with View More/View Less Toggle */ }
{/* Industry List with Scrollable Expansion */ }
<div className="mt-2">
    <div className="text-gray-600 font-medium text-md mb-2">Industries</div>

    {/* Scrollable Industry List with max height */}
    <div className={`overflow-y-auto transition-all duration-500 ${showAllIndustries ? 'max-h-[400px]' : 'max-h-[200px]'} border rounded-md p-2`}>
        {industries.map((industry, index) => (
            <div
                key={industry.id}
                className={`cursor-pointer rounded-lg px-2 py-2.5 hover:shadow-xl transition-shadow duration-300 flex items-center gap-2 
                    ${selectedOptionIndustry === industry.id ? 'bg-white' : 'bg-transparent'}`}
            >
                <RadioButton
                    inputId={`radio_${industry.id}`}
                    name="radioGroupIndustry"
                    value={industry.id}
                    onChange={handleChangeOptionsIndustry}
                    checked={selectedOptionIndustry === industry.id}
                />
                <label
                    htmlFor={`radio_${industry.id}`}
                    className={`font-medium text-sm cursor-pointer flex gap-2 items-center 
                        ${selectedOptionIndustry === industry.id ? 'text-green-600' : 'text-gray-700'}`}
                >
                    {industry.icon} {industry.label}
                </label>
            </div>
        ))}
    </div>

    {/* View More / View Less Button (Placed Outside to Prevent Shifting Content) */}
    {industries.length > 4 && (
        <div className="flex justify-center mt-2">
            <button
                className="text-blue-500 text-sm font-medium cursor-pointer hover:underline transition-all duration-300"
                onClick={() => setShowAllIndustries(!showAllIndustries)}
            >
                {showAllIndustries ? "View Less Industries" : "View More Industries"}
            </button>
        </div>
    )}
</div>

{/* Fixed Layout for Template Section */ }
<div className="bg-white flex-2 rounded-md p-2 overflow-auto">
    <div>
        <h2 className="text-xl font-semibold text-gray-800">Template Samples</h2>
        <div className="grid grid-cols-2 gap-4 mt-4 max-h-[500px] overflow-auto">
            {dummyTemplates
                .filter(template => template.category === selectedOptionCategory && template.industry === selectedOptionIndustry)
                .map(template => (
                    <div key={template.id} className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                        <h3 className="font-semibold text-gray-700">{template.header}</h3>
                        <p className="text-sm text-gray-500 mt-2">{template.body}</p>
                        <div className="mt-3">
                            {template.button.type === "cta" ? (
                                <a href={template.button.link} className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600 transition-all">
                                    {template.button.text}
                                </a>
                            ) : (
                                <button className="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-md hover:bg-gray-300 transition-all">
                                    {template.button.text}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
        </div>
    </div>
</div>

