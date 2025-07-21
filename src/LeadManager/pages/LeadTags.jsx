// src/pages/LeadTags.jsx
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import UniversalButton from "@/components/common/UniversalButton";

export default function LeadTags() {
  const [tags, setTags] = useState([
    { id: 1, title: "Commercial", count: 412 },
    { id: 2, title: "Developer", count: 389 },
    { id: 3, title: "Engineering", count: 412 },
    { id: 4, title: "Expensive", count: 389 },
    { id: 5, title: "indore", count: 412 },
    { id: 6, title: "mid-age", count: 389 },
  ]);

  const [filter, setFilter] = useState("");
  const [newTagText, setNewTagText] = useState("");

  const [selectedIds, setSelectedIds] = useState(new Set());

  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTags, setDialogTags] = useState([]);
  const [newTagName, setNewTagName] = useState("");

  const filtered = tags.filter((t) =>
    t.title.toLowerCase().includes(filter.toLowerCase())
  );

  const addNewTag = () => {
    const title = newTagText.trim();
    if (!title) return;
    const nextId = Math.max(0, ...tags.map((t) => t.id)) + 1;
    setTags([...tags, { id: nextId, title, count: 0 }]);
    setNewTagText("");
  };

  const openEditDialog = (tag) => {
    setDialogTags([tag]);
    setNewTagName(tag.title);
    setDialogVisible(true);
  };

  const onSave = () => {
    setTags((prev) =>
      prev.map((t) =>
        dialogTags.some((d) => d.id === t.id)
          ? { ...t, title: newTagName.trim() }
          : t
      )
    );
    setDialogVisible(false);
    setNewTagName("");
  };

  const allChecked =
    filtered.length > 0 && filtered.every((t) => selectedIds.has(t.id));
  const toggleAll = () => {
    if (allChecked) setSelectedIds(new Set());
    else setSelectedIds(new Set(filtered.map((t) => t.id)));
  };

  const handleDelete = (id) => {
    setTags((prev) => prev.filter((t) => t.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="px-4 py-4 bg-white border-b">
        <h1 className="text-xl font-semibold text-gray-900">
          Tags &amp;
          <br className="block sm:hidden" />
          <span className="sm:ml-1">Sources Manager</span>
        </h1>
      </header>

      <div className="bg-white px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between sm:space-x-4">
        <div className="flex items-center space-x-3 mb-3 sm:mb-0 w-10">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by name"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <div className="text-sm text-gray-600 text-nowrap">{filtered.length} tags</div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newTagText}
            onChange={(e) => setNewTagText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addNewTag()}
            placeholder="Add new tag"
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>

      <div className="h-134 overflow-auto rounded-xl">
        <div className="min-w-full">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500 uppercase">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="px-4">Tag Title</span>
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-500 uppercase">
                  Action
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-500 uppercase">
                  Candidates
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((tag) => (
                <tr key={tag.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(tag.id)}
                      onChange={() => {
                        setSelectedIds((prev) => {
                          const next = new Set(prev);
                          next.has(tag.id)
                            ? next.delete(tag.id)
                            : next.add(tag.id);
                          return next;
                        });
                      }}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="px-4 text-sm text-gray-700">
                      {tag.title}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => openEditDialog(tag)}
                      className="text-gray-500 hover:text-gray-700"
                      title="Edit tag"
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(tag.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                      title="Delete tag"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-right">
                    {tag.count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog
        header="Merge tags"
        visible={dialogVisible}
        style={{ width: "400px" }}
        modal
        onHide={() => setDialogVisible(false)}
      >
        <div className="space-y-4">
          <div className="text-sm text-gray-700">
            {dialogTags.length} tag{dialogTags.length > 1 ? "s" : ""} selected
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">
              Tags to be merged
            </label>
            <div className="flex flex-wrap gap-2">
              {dialogTags.map((t) => (
                <span
                  key={t.id}
                  className="px-2 py-1 bg-gray-200 rounded-full text-sm"
                >
                  {t.title}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">
              New tag name
            </label>
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="Type a name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* <div className="bg-yellow-100 border-l-4 border-yellow-400 p-3 text-yellow-800 text-sm">
            Keep in mind that this action cannot be undone.
          </div> */}

          <div className="flex justify-center space-x-3 mt-4">
            <UniversalButton
              label="Merge"
              onClick={onSave}
              disabled={!newTagName.trim()}
            />
            <UniversalButton
              label="Cancel"
              onClick={() => setDialogVisible(false)}
              className="p-button-text"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
