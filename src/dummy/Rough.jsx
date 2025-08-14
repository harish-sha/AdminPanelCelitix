<div className="flex flex-col items-center justify-center h-[60vh] w-full bg-gradient-to-b from-gray-50 to-white rounded-lg border border-dashed border-gray-300 p-6">
  {/* WhatsApp-like Icon */}
  <div className="bg-green-100 p-4 rounded-full shadow-inner">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className="w-12 h-12 text-green-500"
    >
      <path d="M20.52 3.48A11.78 11.78 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.59 5.98L0 24l6.2-1.63A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.24-6.21-3.48-8.52ZM12 21.5c-1.94 0-3.82-.53-5.44-1.54l-.39-.23-3.68.97.98-3.59-.25-.37A9.48 9.48 0 0 1 2.5 12c0-5.24 4.26-9.5 9.5-9.5 2.54 0 4.93.99 6.72 2.78A9.45 9.45 0 0 1 21.5 12c0 5.24-4.26 9.5-9.5 9.5Zm5.47-7.33c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15s-.78.98-.95 1.18c-.18.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.46-.88-.78-1.46-1.74-1.63-2.03-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.63-.93-2.23-.25-.6-.5-.52-.68-.53h-.58c-.2 0-.53.08-.8.38s-1.05 1.03-1.05 2.5c0 1.47 1.08 2.9 1.23 3.1.15.2 2.13 3.24 5.15 4.54.72.31 1.28.49 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" />
    </svg>
  </div>

  {/* Main Message */}
  <h3 className="mt-4 text-lg font-semibold text-gray-800">
    No Templates Match Your Filters
  </h3>
  <p className="mt-1 text-sm text-gray-500 text-center max-w-md">
    We couldn’t find any WhatsApp templates based on your current filters.  
    Try adjusting your search criteria or clear the filters to see all templates.
  </p>

  {/* Actions */}
  <div className="mt-4 flex gap-3">
    <button
      onClick={clearFilters} // You can define this function to reset filters
      className="px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-md hover:bg-green-600 transition"
    >
      Clear Filters
    </button>
    <button
      onClick={openTemplateCreation} // Your function to open creation modal
      className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
    >
      Create New Template
    </button>
  </div>
</div>
