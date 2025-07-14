import React from "react";
import { FiMail } from "react-icons/fi";

export default function ConversationThread() {
  return (
    <div className="space-y-6">
      {/* Message item */}
      <div>
        <div className="flex items-center space-x-2 px-4 text-xs text-gray-500">
          <FiMail />
          <span className="font-semibold">Emily Garcia</span>
          <span>reported via email</span>
          <span>• a day ago (Mon, Jul 7, 2025 at 10:37 AM)</span>
        </div>
        <div className="mt-2 p-4 bg-white rounded shadow-sm">
          Hello, We're receiving authentication failure errors...
        </div>
      </div>

      {/* Reply box */}
      <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded">
        <div className="w-10 h-10 bg-gray-200 rounded-full grid place-content-center text-gray-500">P</div>
        <div className="flex-1 space-x-2">
          <button className="btn-sm">Reply</button>
          <button className="btn-sm">Add note</button>
          <button className="btn-sm">Forward</button>
        </div>
      </div>
    </div>
  );
}