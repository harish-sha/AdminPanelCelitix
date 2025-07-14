import { Menu } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { formatDistanceToNowStrict, add } from "date-fns";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
export function TicketItem({
  id,
  avatar,
  subject,
  number,
  isNew,
  emoji,
  submitter,
  company,
  createdAt,
  firstResponseBy,
  dueIn,
  priority,
  status,
  selected,
  onSelect,
}) {
  const priorityColor =
    priority === "Low" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

  // compute human-readable times
  const createdAgo = formatDistanceToNowStrict(createdAt, { addSuffix: false });
  const responseIn = formatDistanceToNowStrict(firstResponseBy, { addSuffix: false });

  return (
    <div
      className={`flex items-start justify-between p-4 mb-2 rounded shadow-sm hover:shadow-md ${selected ? "bg-yellow-50" : "bg-white"
        }`}
    >
      {/* LEFT: checkbox + avatar + subject */}
      <div className="flex items-start space-x-4 space-y-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(id)}
          className="mt-2 h-4 w-4"
        />

        <img src={avatar} alt="" className="h-10 w-10 rounded-full" />

        <div className="space-y-2">
            {isNew && (
              <span className="px-2 py-0.5 text-xs font-semibold uppercase text-green-800 bg-green-100 rounded">
                New
              </span>
            )}
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium flex items-center space-x-1">
              <Link
                to={`/leadmanagement/leaddash/details`}
                className="text-indigo-600 hover:underline"
              >
                {subject}
              </Link>
              <span className="text-gray-400">#{number}</span>
            </h3>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <span>{emoji}</span>
            <span>{submitter}</span>
            <span>&bull;</span>
            <span className="italic">({company})</span>
            <span>&bull;</span>
            <span>Created {createdAgo} ago</span>
            <span>&bull;</span>
            <span>First response due in {responseIn}</span>
          </div>
        </div>
      </div>

      {/* RIGHT: priority + status */}

      

      <div className=" items-center space-y-2">
        {/* Priority dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button
            className={`
        flex items-center space-x-1
        px-3 py-1
        text-xs font-semibold
        rounded-full
        ${priorityColor}
        hover:brightness-95
        transition
      `}
          >
            <span
              className="w-2 h-2 rounded-full block"
              style={{ backgroundColor: priority === "Low" ? "#22c55e" : "#ef4444" }}
            />
            <span>{priority}</span>
            <FiChevronDown className="text-xs" />
          </Menu.Button>

          <Menu.Items className="absolute top-auto right-0 mt-2 w-40 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
            {["Low", "Normal", "Urgent"].map((p) => (
              <Menu.Item key={p}>
                {({ active }) => (
                  <button
                    className={`
                w-full text-left px-4 py-2 text-sm
                ${active ? "bg-gray-100" : "bg-white"}
                transition
              `}
                  >
                    {p}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>

        {/* Escalation dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button
            className="
        flex items-center space-x-1
        px-3 py-1
        text-sm font-medium text-gray-700
        bg-gray-100 rounded-full
        hover:bg-gray-200
        transition
      "
          >
            <FiUser className="text-base" />
            <span>Escalation…</span>
            <FiChevronDown className="text-xs" />
          </Menu.Button>

          <Menu.Items className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
            {["None", "Level 1", "Level 2"].map((lvl) => (
              <Menu.Item key={lvl}>
                {({ active }) => (
                  <button
                    className={`
                w-full text-left px-4 py-2 text-sm
                ${active ? "bg-gray-100" : "bg-white"}
                transition
              `}
                  >
                    {lvl}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>

        {/* Status dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button
            className="
        flex items-center space-x-1
        px-3 py-1
        text-sm font-medium text-gray-700
        bg-gray-100 rounded-full
        hover:bg-gray-200
        transition
      "
          >
            <span>{status}</span>
            <FiChevronDown className="text-xs" />
          </Menu.Button>

          <Menu.Items className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
            {["Open", "Pending", "Closed"].map((s) => (
              <Menu.Item key={s}>
                {({ active }) => (
                  <button
                    className={`
                w-full text-left px-4 py-2 text-sm
                ${active ? "bg-gray-100" : "bg-white"}
                transition
              `}
                  >
                    {s}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
}
