import React from "react";
import { ActivityIcon, UserIcon, PlusIcon } from "lucide-react";

const ProfileActivity = ({ activity }) => {
  const activities = [
    {
      icon: <ActivityIcon className="w-5 h-5 text-indigo-600" />,
      label: "Profile Visits",
      value: activity?.visits || "0",
    },
    {
      icon: <UserIcon className="w-5 h-5 text-indigo-600" />,
      label: "Reach",
      value: activity?.reach || "0",
    },
    {
      icon: <PlusIcon className="w-5 h-5 text-indigo-600" />,
      label: "Followers",
      value: `+${activity?.followers || 0}`,
    },
  ];

  return (
    <div className="bg-white w-full rounded-2xl shadow p-4 sm:p-6">
      <h3 className="text-lg font-semibold mb-4">Profile Activity</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {activities.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border p-4 rounded-xl"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 rounded-full">
                {item.icon}
              </div>
              <div>
                <p className="text-gray-600 text-sm">{item.label}</p>
                <p className="font-semibold text-lg">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileActivity;

