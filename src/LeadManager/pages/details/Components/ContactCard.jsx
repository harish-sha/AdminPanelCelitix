// src/components/SidebarSections.jsx
import React from "react";
import { Disclosure } from "@headlessui/react";
import {
  FiChevronDown,
  FiInfo,
  FiClock,
  FiList,
  FiClock as FiTime,
  FiGrid,
  FiMoreHorizontal ,
} from "react-icons/fi";
import TimelinePanel from "./TimelinePanel";

export default function SidebarSections() {
  return (
    <div className="flex-1 space-y-2 p-3 overflow-y-auto h-">
      {/* Contact Details */}
      <Disclosure defaultOpen>
        {({ open }) => (
          <div className="border rounded-lg overflow-hidden">
            <Disclosure.Button className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 text-sm font-semibold">
              <div className="flex items-center space-x-2">
                <FiInfo />
                <span>Contact Details</span>
              </div>
              <FiChevronDown
                className={`transform transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 py-3 bg-white text-xs space-y-2">
              <div className="flex items-center space-x-3">
                <img
                  src="/default-avatar.jpg"
                  alt="Emily"
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <div className="font-medium">Emily Garcia</div>
                  <div className="text-gray-500">Acme Inc</div>
                </div>
              </div>
              <div className="space-y-1">
                <div>
                  <strong>Email:</strong> emily.garcia@acme.com
                </div>
                <div>
                  <strong>Title:</strong> Associate Director
                </div>
                <div>
                  <strong>Phone:</strong> +1 440 816 98824
                </div>
              </div>
              <button className="mt-2 text-xs text-blue-600 hover:underline">
                View more info
              </button>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>

      {/* Timeline */}
      <Disclosure>
  {({ open }) => (
    <div className="border rounded-lg overflow-hidden">
      <Disclosure.Button className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 text-sm font-semibold">
        <div className="flex items-center space-x-2">
          <FiList />
          <span>Timeline</span>
        </div>
        <FiChevronDown className={`transform transition ${open ? "rotate-180" : ""}`} />
      </Disclosure.Button>
      <Disclosure.Panel className="px-4 py-3 bg-white text-xs">
        <TimelinePanel />
      </Disclosure.Panel>
    </div>
  )}
</Disclosure>

      {/* Time Logs */}
      <Disclosure>
        {({ open }) => (
          <div className="border rounded-lg overflow-hidden">
            <Disclosure.Button className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 text-sm font-semibold">
              <div className="flex items-center space-x-2">
                <FiTime />
                <span>Time Logs</span>
              </div>
              <FiChevronDown
                className={`transform transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 py-3 bg-white text-xs space-y-3">
              <div className="bg-gray-50 p-3 rounded">
                Start tracking the time you spend on this ticket
              </div>
              <button className="btn-sm bg-blue-800 text-white">
                Log time
              </button>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>

      {/* To-Do */}
      <Disclosure>
        {({ open }) => (
          <div className="border rounded-lg overflow-hidden">
            <Disclosure.Button className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 text-sm font-semibold">
              <div className="flex items-center space-x-2">
                <FiGrid />
                <span>To-Do</span>
              </div>
              <FiChevronDown
                className={`transform transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 py-3 bg-white text-xs space-y-2">
              {/* your to-do content */}
              <div className="italic text-gray-500">No tasks</div>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>

      {/* Apps */}
      <Disclosure>
        {({ open }) => (
          <div className="border rounded-lg overflow-hidden">
            <Disclosure.Button className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 text-sm font-semibold">
              <div className="flex items-center space-x-2">
                <FiMoreHorizontal />
                <span>Apps</span>
              </div>
              <FiChevronDown
                className={`transform transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 py-3 bg-white text-xs space-y-2">
              {/* your apps content */}
              <div className="italic text-gray-500">No apps installed</div>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
}
