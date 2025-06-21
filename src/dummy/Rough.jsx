const handleMenuOpen = (e, flow) => {
  setDropdownOpenId(flow.flowId);
};

const handleMenuClose = () => {
  setDropdownOpenId(null); 
};

return (
  <div>
    <CustomTooltip title="Settings" arrow>
      <IconButton
        ref={(el) => {
          if (el) dropdownButtonRefs.current[flow.flowId] = el;
        }}
        onClick={(e) => handleMenuOpen(e, flow)}
        size="small"
      >
        <SettingsOutlinedIcon className="text-gray-600" fontSize="small" />
      </IconButton>
    </CustomTooltip>

    {dropdownOpenId === flow.flowId && (
      <DropdownMenuPortal
        targetRef={{
          current: dropdownButtonRefs.current[flow.flowId],
        }}
        onClose={handleMenuClose}
      >
        {/* Edit Button */}
        <button
          onClick={() => handleEdit(flow)}
          className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 flex items-center gap-2"
        >
          <EditIcon fontSize="small" className="text-gray-600" />
          Edit
        </button>

        {/* Delete Button */}
        <button
          onClick={() => handleDelete(flow)}
          className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 flex items-center gap-2"
        >
          <DeleteIcon fontSize="small" className="text-red-600" />
          Delete
        </button>

        {/* Export Button */}
        <button
          onClick={() => handleExport(flow)}
          className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 flex items-center gap-2"
        >
          <DownloadIcon fontSize="small" className="text-green-600" />
          Export
        </button>
      </DropdownMenuPortal>
    )}
  </div>
);

