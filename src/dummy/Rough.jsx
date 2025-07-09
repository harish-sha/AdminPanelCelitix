<div className="flex items-center gap-2 px-3 py-2 border-b bg-white shadow-sm sticky top-0 z-50 w-full overflow-x-auto">
  {tabs.map((tab, index) => (
    <div
      key={index}
      className={`flex items-center px-3 py-1.5 rounded-full transition-all duration-200 ease-in-out cursor-pointer border ${activeIndex === index
        ? "bg-blue-100 border-blue-400 text-blue-700"
        : "bg-gray-100 border-transparent text-gray-700 hover:bg-gray-200"
        }`}
      onClick={() => setActiveIndex(index)}
      onMouseEnter={(e) =>
      (e.currentTarget.style.backgroundColor = activeIndex === index
        ? "#bfdbfe"
        : "#e5e7eb")
      }
      onMouseLeave={(e) =>
      (e.currentTarget.style.backgroundColor = activeIndex === index
        ? "#bfdbfe"
        : "#f3f4f6")
      }
    >
      <span className="pr-1 font-medium">{tab.title}</span>

      <Menu model={menuItems(index)} popup ref={menuRefs[index]} />
      <MoreVertOutlinedIcon
        onClick={(e) => menuRefs[index].current.toggle(e)}
        className="ml-1 text-gray-500 hover:text-blue-500"
        style={{ fontSize: "1rem" }}
      />
    </div>
  ))}

  {/* Add New Tab Button */}
  <div
    className="flex items-center justify-center px-3 py-1.5 bg-blue-100 text-blue-600 border border-blue-300 rounded-full cursor-pointer hover:bg-blue-200 transition-all"
    onClick={handleTabClick}
  >
    <AddIcon fontSize="small" />
    <span className="ml-1 text-sm font-medium">Add Tab</span>
  </div>
</div>
