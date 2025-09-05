<div className="flex flex-col h-full bg-gray-50 min-h-screen">
  {/* Header */}
  <header className="px-6 py-4 bg-white border-b shadow-sm">
    <h1 className="text-2xl font-bold text-gray-900">
      Tags &amp; Sources Manager
    </h1>
    <p className="mt-1 text-sm text-gray-500">
      Organize, categorize, and manage tags efficiently. View statistics, edit
      details, and keep your workflow structured.
    </p>
  </header>

  {/* Toolbar */}
  <div className="bg-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between sm:space-x-6 shadow-sm">
    {/* Search + Total Count */}
    <div className="flex items-center space-x-3 mb-3 sm:mb-0">
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search tags by name..."
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="text-sm text-gray-600 whitespace-nowrap">
        <span className="font-medium text-gray-900">{filteredTags.length}</span>{" "}
        / {tags.length} tags
      </div>
    </div>

    {/* Stats (Active/Inactive) */}
    <div className="flex items-center gap-3 text-sm font-medium">
      <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-200 shadow-sm">
        <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
        Active: {tags.filter((t) => t.status === 1).length}
      </span>
      <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200 shadow-sm">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
        Inactive: {tags.filter((t) => t.status === 0).length}
      </span>
    </div>

    {/* Colors + Add Button */}
    <div className="flex items-center gap-5 mt-3 sm:mt-0">
      {/* Color distribution */}
      <div className="flex items-center gap-2">
        {Object.entries(
          tags.reduce((acc, t) => {
            acc[t.color] = (acc[t.color] || 0) + 1;
            return acc;
          }, {})
        ).map(([color, count]) => (
          <div
            key={color}
            className="relative flex items-center justify-center w-6 h-6 rounded-full shadow-sm border border-gray-200"
            style={{ backgroundColor: color }}
            title={`${count} tag(s) with this color`}
          >
            {count > 1 && (
              <span className="absolute -bottom-2 text-[10px] font-semibold text-gray-700 bg-white rounded-full px-1 shadow">
                {count}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Add Tag button */}
      <ShimmerButton icon={GrTag} onClick={openAddDialog}>
        Add Tag
      </ShimmerButton>
    </div>
  </div>
</div>
