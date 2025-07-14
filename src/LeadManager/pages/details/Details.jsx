import React, { useState } from "react";
import PropertiesPanel from "./components/PropertiesPanel";
import ContactCard from "./components/ContactCard";
import ActionToolbar from "./Components/ActionToolbar";
import SummaryInput from "./Components/SummaryInput";
import ConversationThread from "./Components/ConversationThread";

export default function Details() {
   const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="h-screen bg-gray-100">
      <div>
        {/* Main column */}
        <ActionToolbar onToggleCollapse={() => setCollapsed(c => !c)} />
      </div>
      <div className="flex w-full">
        <div className="w-full space-y-2">
          <SummaryInput />
          <ConversationThread />
        </div>
        {/* Right sidebar */}
        <div className="w-96 min-h-dvh border-l bg-white flex flex-col">
          <PropertiesPanel />
        </div>
         {!collapsed && (
        <div className="w-96 h-125 border-l bg-white flex flex-col">
          <ContactCard />
        </div>
         )}
      </div>

    </div>
  );
}