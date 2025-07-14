import React from "react";

export default function FeatureCard({ icon, title, desc, tag }) {
  return (
    <div className="flex space-x-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition">
      <div className="flex-shrink-0 text-xl text-indigo-600">
        {icon}
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {tag && (
            <span className="px-1.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded">
              {tag}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
}
