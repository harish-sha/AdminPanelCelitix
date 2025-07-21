import React, { useState } from "react";
import PropertiesPanel from "./components/PropertiesPanel";
import ContactCard from "./components/ContactCard";
import ActionToolbar from "./Components/ActionToolbar";
import SummaryInput from "./Components/SummaryInput";
import ConversationThread from "./Components/ConversationThread";

export default function Details() {
  const [collapsed, setCollapsed] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  return (
    <div className="h-auto ">
      <div className="overflow-x-scroll xl:overflow-hidden w-[100%]">
        {/* Main column */}
        <ActionToolbar
          onToggleCollapse={() => setCollapsed((c) => !c)}
          onToggleSidebar={() => setShowSidebar((s) => !s)}
        />
      </div>
      <div className="flex w-full">
        <div className="w-full space-y-2">
          <SummaryInput />
          <ConversationThread />
        </div>

        {/* Right sidebar */}
        {/* Floating sidebar on small screens only */}
        {showSidebar && (
          <>
            <div className="w-96 min-h-dvd border-l bg-white  flex-col hidden lg:flex">
              <PropertiesPanel />
            </div>

            <div className="fixed bottom-0 right-4 z-50 max-w-sm w-[18rem] bg-white border shadow-lg flex-col lg:hidden rounded-md">
              <div className="flex justify-end border-b">
                <button
                  onClick={() => setShowSidebar(false)}
                  className="text-xl font-bold text-gray-600 hover:text-black"
                >
                  ×
                </button>
              </div>
              <PropertiesPanel />
            </div>
          </>
        )}

        {/* Contact Card */}

        {!collapsed && (
          <>
            {/* Shown on large screens only */}
            <div className="w-96 h-screen border-l bg-white  flex-col hidden lg:flex">
              <ContactCard />
            </div>
            {/* Floating card shown on small (xs, sm, md) screens  */}
            <div className="fixed bottom-2 right-4 z-50 max-w-sm w-[18rem] bg-white border shadow-lg flex-col lg:hidden rounded-md">
              <ContactCard />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
