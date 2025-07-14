import React, { useState } from "react";
import { TicketToolbar } from "./Components/TicketToolbar";
import { TicketItem } from "./Components/TicketItem";
import { FilterSidebar } from "./Components/FilterSidebar";


export default function LeadDash() {

  const leads = [
    {
      id: 1,
      avatar: "/default-avatar.jpg",
      subject: "Issues with reports",
      number: 3,
      isNew: true,
      emoji: "😄",
      submitter: "Bob Tree",
      company: "Freshworks",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      firstResponseBy: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      priority: "Low",
      status: "Open",
    },
    {
      id: 2,
      avatar: "/default-avatar.jpg",
      subject: "Authentication failure",
      number: 2,
      isNew: true,
      emoji: "😕",
      submitter: "Emily Garcia",
      company: "Acme Inc",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      firstResponseBy: new Date(Date.now() + 26 * 60 * 1000),
      priority: "Urgent",
      status: "Open",
    },
    {
      id: 3,
      avatar: "/default-avatar.jpg",
      subject: "404 error when on a specific page",
      number: 1,
      isNew: true,
      emoji: "😕",
      submitter: "Emily Garcia",
      company: "Acme Inc",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      firstResponseBy: new Date(Date.now() + 26 * 60 * 1000),
      priority: "Urgent",
      status: "Open",
    },
    {
      id: 4,
      avatar: "/default-avatar.jpg",
      subject: "404 error when on a specific page",
      number: 1,
      isNew: true,
      emoji: "😕",
      submitter: "Emily Garcia",
      company: "Acme Inc",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      firstResponseBy: new Date(Date.now() + 26 * 60 * 1000),
      priority: "Urgent",
      status: "Open",
    },
    {
      id: 5,
      avatar: "/default-avatar.jpg",
      subject: "404 error when on a specific page",
      number: 1,
      isNew: true,
      emoji: "😕",
      submitter: "Emily Garcia",
      company: "Acme Inc",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      firstResponseBy: new Date(Date.now() + 26 * 60 * 1000),
      priority: "Urgent",
      status: "Open",
    },
    {
      id: 6,
      avatar: "/default-avatar.jpg",
      subject: "404 error when on a specific page",
      number: 1,
      isNew: true,
      emoji: "😕",
      submitter: "Emily Garcia",
      company: "Acme Inc",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      firstResponseBy: new Date(Date.now() + 26 * 60 * 1000),
      priority: "Urgent",
      status: "Open",
    },
    {
      id: 7,
      avatar: "/default-avatar.jpg",
      subject: " on a specific page",
      number: 1,
      isNew: true,
      emoji: "😕",
      submitter: "Emily Garcia",
      company: "Acme Inc",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      firstResponseBy: new Date(Date.now() + 26 * 60 * 1000),
      priority: "Urgent",
      status: "Open",
    },
  ];


  const [showFilters, setShowFilters] = useState(false);
  const toggleFilters = () => setShowFilters((v) => !v);


  const [selectedIds, setSelectedIds] = useState(new Set());
  const allSelected = selectedIds.size === leads.length;
  const anySelected = selectedIds.size > 0;

  const onSelectAll = () => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(leads.map((l) => l.id)));
  };

  const onSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">

  {/* Toolbar stays at top */}
  <TicketToolbar
    allChecked={allSelected}
    anyChecked={anySelected}
    onSelectAll={onSelectAll}
    onToggleFilters={toggleFilters}
  />

  {/* Body: two panels side by side */}
  <div className="flex flex-1 overflow-hidden">

    {/* Ticket list panel */}
    <div
      className={`
        flex-1
        overflow-y-auto
        p-2
        mb-24
        transition-all duration-200
        ${showFilters ? "md:w-[calc(100%-16rem)]" : "w-full"}
      `}
    >
      {leads.map((lead) => (
        <TicketItem
          key={lead.id}
          {...lead}
          selected={selectedIds.has(lead.id)}
          onSelect={onSelect}
        />
      ))}
    </div>

    {/* Filters sidebar */}
    {showFilters && (
      <div className="hidden md:block md:w-64 border-l bg-white overflow-y-auto">
        <FilterSidebar />
      </div>
    )}
  </div>
</div>

  );
}
