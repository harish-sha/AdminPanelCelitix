const WhatsappBot = () => {
    const navigate = useNavigate();

    const handleNavigate = () => navigate("/createwhatsappbot");

    const templates = [
        {
            name: "Restaurant Bot",
            icon: <FaMapMarkerAlt />,
            image: "https://via.placeholder.com/150",
            backgroundImage: "https://via.placeholder.com/300x200",
        },
        {
            name: "Blank Bot",
            icon: <FaGlobe />,
            image: "https://via.placeholder.com/150",
            backgroundImage: "https://via.placeholder.com/300x200",
        },
        {
            name: "LiveChat After-Hours",
            icon: <FaEnvelope />,
            image: "https://via.placeholder.com/150",
            backgroundImage: "https://via.placeholder.com/300x200",
        },
        {
            name: "Whatsapp Bot",
            icon: <FaWhatsapp />,
            image: "https://via.placeholder.com/150",
            backgroundImage: "https://via.placeholder.com/300x200",
        },
        {
            name: "Package Tracking Bot",
            icon: <FaMapMarkerAlt />,
            image: "https://via.placeholder.com/150",
            backgroundImage: "https://via.placeholder.com/300x200",
        },
        {
            name: "Customer Service Bot",
            icon: <FaEnvelope />,
            image: "https://via.placeholder.com/150",
            backgroundImage: "https://via.placeholder.com/300x200",
        },
    ];

    const templateItem = (template) => (
        <div
            className="relative flex items-center justify-center h-60 mx-4 rounded-2xl overflow-hidden shadow-lg bg-cover bg-center group transition-transform duration-300 hover:scale-105"
            style={{ backgroundImage: `url(${template.backgroundImage})` }}
        >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/50 to-white/30 transition-all duration-300 group-hover:from-white/70 group-hover:via-white/50 group-hover:to-white/30"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center text-gray-900 space-y-2">
                <div className="text-3xl text-gray-900">{template.icon}</div>
                <p className="text-lg font-semibold drop-shadow-sm">{template.name}</p>
            </div>

            {/* Hover Button */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
                <button
                    className="absolute bottom-[-50px] group-hover:bottom-3 px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold rounded-full tracking-wider shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 ease-in-out"
                    onClick={() => console.log(`Edit ${template.name}`)}
                >
                    Edit
                </button>
            </div>
        </div>
    );




    const createdBots = [
        {
            id: 1,
            name: "ChatBot",
            status: "Draft",
            versions: "latest",
            integrations: "No Integrations added",
            lastUpdated: "25 Mar 2025, 02:49pm",
        },
        {
            id: 2,
            name: "Whatsapp",
            status: "Draft",
            versions: "latest",
            integrations: "No Integrations added",
            lastUpdated: "25 Mar 2025, 02:49pm",
        },
    ];

    return (
        <div className="p-6 rounded-xl space-y-6 bg-gray-50 min-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                    Manage Bots <FaWhatsapp className="text-[#25D366] text-2xl" />
                </div>
                <UniversalButton
                    id="addwhatsappbot"
                    name="addwhatsappbot"
                    label="+ New Bot"
                    onClick={handleNavigate}
                />
            </div>

            {/* Templates Section */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Templates</h2>
                <Carousel
                    value={templates}
                    numVisible={3}
                    numScroll={1}
                    itemTemplate={templateItem}
                    circular
                    showIndicators={true}
                    showNavigators={true}
                    className="custom-carousel"
                />
            </div>

            {/* Created Bots Section */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    Created Bots <SmartToyOutlinedIcon />
                </h2>
                <div className="overflow-auto h-100">
                    {createdBots.map((bot) => (
                        <div
                            key={bot.id}
                            className="border rounded-xl overflow-hidden hover:shadow-lg transition-all mb-4"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-blue-50 px-6 py-4 gap-3">
                                <div className="flex items-center gap-4 flex-1">
                                    <RadioButtonCheckedOutlinedIcon
                                        className="text-blue-600"
                                        fontSize="small"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800">{bot.name}</p>
                                        <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
                                            {bot.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-700 flex-1">
                                    Versions: <strong>{bot.versions}</strong>
                                </div>
                                <div className="text-sm text-red-500 font-medium flex-1">
                                    {bot.integrations}
                                </div>
                                <div className="text-sm text-gray-500 flex-1 flex flex-col items-center gap-1">
                                    Last Updated: <strong>{bot.lastUpdated}</strong>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CustomTooltip title="Settings" arrow>
                                        <IconButton
                                            onClick={() => console.log(`Edit bot ${bot.id}`)}
                                        >
                                            <SettingsOutlinedIcon
                                                className="text-gray-600"
                                                fontSize="small"
                                            />
                                        </IconButton>
                                    </CustomTooltip>
                                    <CustomTooltip title="Delete Bot" arrow>
                                        <IconButton
                                            onClick={() => console.log(`Delete bot ${bot.id}`)}
                                        >
                                            <MdOutlineDeleteForever
                                                className="text-red-500"
                                                size={20}
                                            />
                                        </IconButton>
                                    </CustomTooltip>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhatsappBot;