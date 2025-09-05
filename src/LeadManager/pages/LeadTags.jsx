import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import UniversalButton from "@/components/common/UniversalButton";
import ShimmerButton from "../Components/ShimmerButton";
import { GrTag } from "react-icons/gr";
import { addEditTag, deleteSingleTag, getSingleTag, getTagsList } from "@/apis/LeadManagements/Tags/Tags";
import toast from "react-hot-toast";
import InputField from "@/components/layout/InputField";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import { ColorPicker } from 'primereact/colorpicker';
import { BiError } from "react-icons/bi";

export default function LeadTags() {
  const [tags, setTags] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState(new Set());

  // const filtered = tags.filter(t =>
  //   t.title.toLowerCase().includes(filter.toLowerCase())
  // );

  // const allChecked =
  //   filtered.length > 0 && filtered.every(t => selectedIds.has(t.id));
  // const toggleAll = () => {
  //   if (allChecked) setSelectedIds(new Set());
  //   else setSelectedIds(new Set(filtered.map(t => t.id)));
  // };


  // =====================Get Tag List===============================================
  const fetchTags = async () => {
    try {
      setLoading(true);
      const res = await getTagsList();

      if (res?.success && Array.isArray(res.data)) {
        const mapped = res.data.map((tag, i) => ({
          sn: i + 1,
          srNo: tag.srNo,
          tagName: tag.tagName,
          tagDetails: tag.tagDetails,
          webhookUrl: tag.webhookUrl,
          insertTime: tag.insertTime,
          color: tag.color,
          status: tag.status,
          userSrno: tag.userSrno,
        }));
        setTags(mapped);
      } else {
        toast.error(res?.message || "Failed to fetch tags");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while fetching tags");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleToggleStatus = (tag) => {
    const updated = tags.map((t) =>
      t.srNo === tag.srNo ? { ...t, status: t.status === 1 ? 0 : 1 } : t
    );
    setTags(updated);
  };

  //========================================== Add Tag================================================
  const [addTagDialogVisible, setAddTagDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [tagToDelete, setTagToDelete] = useState(null);

  const openAddDialog = () => {
    setEditingTag(null);
    setForm({
      tagName: "",
      tagDetails: "",
      color: "#cccccc",
      status: 1,
      webhookUrl: "",
    });
    setAddTagDialogVisible(true);
  };

  const openEditDialog = (tag) => {
    setEditingTag(tag);
    setForm({
      tagName: tag.tagName,
      tagDetails: tag.tagDetails,
      color: tag.color,
      status: tag.status,
      webhookUrl: tag.webhookUrl,
    });
    setAddTagDialogVisible(true);
  };

  const openDeleteDialog = (tag) => {
    setTagToDelete(tag);
    setDeleteDialogVisible(true);
  };

  const softColors = [
    "#fca5a5", // soft red
    "#fdba74", // soft orange
    "#fcd34d", // soft yellow
    "#86efac", // soft green
    "#93c5fd", // soft blue
    "#c4b5fd", // soft purple
    "#f9a8d4", // soft pink
  ];

  const [form, setForm] = useState({
    tagName: "",
    tagDetails: "",
    color: "#6366f1",
    status: 1,
    webhookUrl: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveTag = async () => {
    if (!form.tagName.trim()) return toast.error("Tag Name is required");
    if (form.webhookUrl && !form.webhookUrl.startsWith("https://")) {
      return toast.error("Webhook URL must start with https://");
    }

    try {
      setLoading(true);
      const res = await addEditTag(form.srNo || "", form);

      if (res?.success) {
        toast.success(res.message || (form.srNo ? "Tag updated successfully" : "Tag added successfully"));
        fetchTags();
        setAddTagDialogVisible(false)
        setForm("")
        setEditingTag(null);
      } else {
        toast.error(res?.message || "Failed to add tag");
      }
    } catch (error) {
      toast.error("Something went wrong while adding tag");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // fetch single tag
  const handleEditTag = async (srNo) => {
    try {
      setLoading(true);
      const res = await getSingleTag(srNo);

      if (res?.success && res?.data) {
        setForm({
          tagName: res.data.tagName || "",
          tagDetails: res.data.tagDetails || "",
          color: res.data.color || "#cccccc",
          status: res.data.status ?? 1,
          webhookUrl: res.data.webhookUrl || "",
          srNo: res.data.srNo,
        });
        setAddTagDialogVisible(true)
      } else {
        toast.error(res?.message || "Failed to load tag details");
      }
    } catch (error) {
      toast.error("Error fetching tag details");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Tag
  const handleConfirmDelete = async () => {
    if (!tagToDelete) return;

    try {
      const res = await deleteSingleTag(tagToDelete.srNo);

      if (res?.success) {
        toast.success(res.message || "Tag deleted successfully");
        fetchTags();
      } else {
        toast.error(res?.message || "Failed to delete tag");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting tag");
      console.error(error);
    } finally {
      setDeleteDialogVisible(false);
      setTagToDelete(null);
    }
  };

  // Filtered list
  const filteredTags = (Array.isArray(tags) ? tags : []).filter(tag =>
    tag.tagName.toLowerCase().includes(filter.toLowerCase()) ||
    tag.tagDetails.toLowerCase().includes(filter.toLowerCase())
  );

  function highlightMatch(text, query) {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-yellow-200 text-black rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 min-h-screen">
      <header className="px-6 py-4 bg-white border-b shadow-sm flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Tags &amp; Sources Manager
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Organize, categorize, and manage tags efficiently. View statistics, edit
          details, and keep your workflow structured.
        </p>
      </header>

      <div className="bg-white px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between sm:space-x-4 ">
        <div className="flex items-center space-x-3 mb-3 sm:mb-0">
          <input
            type="text"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Search tags by name..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-70"
          />
          <div className="text-sm text-gray-600 whitespace-nowrap">
            <span className="font-medium text-gray-900">{filteredTags.length}</span>{" "}
            / {tags.length} tags
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm font-medium">
          <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-200 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
            Active: {tags.filter((t) => t.status === 1).length}
          </span>
          <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            Inactive: {tags.filter((t) => t.status === 0).length}
          </span>
        </div>


        <div className="flex items-center gap-5 mt-3 sm:mt-0">
          <div className="flex items-center gap-2">
            {Object.entries(
              tags.reduce((acc, t) => {
                acc[t.color] = (acc[t.color] || 0) + 1;
                return acc;
              }, {})
            ).map(([color, count]) => (
              <div
                key={color}
                className="relative flex items-center justify-center w-6 h-6 rounded-full shadow-sm border border-gray-200"
                style={{ backgroundColor: color }}
                title={`${count} tag(s) with this color`}
              >
                {count > 1 && (
                  <span className="absolute -bottom-2 text-[10px] font-semibold text-gray-700 bg-white rounded-full px-1 shadow">
                    {count}
                  </span>
                )}
              </div>
            ))}
          </div>

          <ShimmerButton
            icon={GrTag}
            onClick={openAddDialog}
          >
            Add Tag
          </ShimmerButton>
        </div>
      </div>

      <div className="flex-1 overflow-auto mb-22">
        <div className="min-w-full overflow-x-auto ">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                  <input
                    type="checkbox"
                    // checked={allChecked}
                    // onChange={toggleAll}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="px-3">Tag Name</span>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                  Details
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                  Webhook
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                  Insert Time
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 uppercase">
                  Color
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTags.map((tag) => (
                <tr key={tag.srNo} className="hover:bg-gray-50 transition">
                  {/* Checkbox + Tag Name */}
                  <td className="px-4 py-3 whitespace-nowrap flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(tag.srNo)}
                      onChange={() => {
                        setSelectedIds((prev) => {
                          const next = new Set(prev);
                          next.has(tag.srNo)
                            ? next.delete(tag.srNo)
                            : next.add(tag.srNo);
                          return next;
                        });
                      }}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-800">
                      {/* {tag.tagName} */}
                      {highlightMatch(tag.tagName || "", filter)}
                    </span>
                  </td>

                  {/* Tag Details */}
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-[200px] truncate">
                    {tag.tagDetails}
                  </td>

                  {/* Webhook */}
                  <td className="px-4 py-3 text-sm text-blue-600 underline">
                    <a
                      href={tag.webhookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {tag.webhookUrl}
                    </a>
                  </td>

                  {/* Insert Time */}
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {tag.insertTime}
                  </td>

                  {/* Color Preview */}
                  <td className="px-4 py-3 text-center">
                    <span
                      className="w-6 h-6 rounded-full inline-block border border-gray-300"
                      style={{ backgroundColor: tag.color }}
                      title={tag.color}
                    ></span>
                  </td>

                  {/* Status Toggle */}
                  <td className="px-4 py-3 text-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tag.status === 1}
                        onChange={() => handleToggleStatus(tag)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:bg-green-500 relative transition-all">
                        <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></span>
                      </div>
                    </label>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <button
                      // onClick={() => openEditDialog(tag)}
                      onClick={() => handleEditTag(tag.srNo)}
                      className="text-gray-500 hover:text-gray-700"
                      title="Edit tag"
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      onClick={() => openDeleteDialog(tag)}
                      className="ml-3 text-red-500 hover:text-red-700"
                      title="Delete tag"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Tag Dialog Start */}
      <Dialog
        header={editingTag ? "Edit Tag" : "Add Tag"}
        visible={addTagDialogVisible}
        className="w-[35rem]"
        modal
        onHide={() => {
          setAddTagDialogVisible(false);
          setForm("");
          setEditingTag(null);
        }}
        draggable={false}
      >
        <div className="space-y-4">
          <div>
            <InputField
              label="Tag Name"
              type="text"
              tooltipContent="Tag name cannot exceed 30 characters"
              value={form.tagName}
              onChange={(e) => handleChange("tagName", e.target.value)}
              placeholder="Enter tag name"
              maxLength={30}
            />
            <p className="text-xs text-gray-500 mt-1">
              {(form.tagName || "").length} of 30 characters used
            </p>
          </div>

          <div>
            <UniversalTextArea
              label="Tag Description"
              tooltipContent="Tag details cannot exceed 200 characters"
              value={form.tagDetails}
              onChange={(e) => handleChange("tagDetails", e.target.value)}
              placeholder="Enter tag Description"
              maxLength={200}
              className="h-30"
            />
            <p className="text-xs text-gray-500 mt-1">
              {(form.tagDetails || "").length} of 200 characters used
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tag Color
            </label>
            <div className="flex items-center  gap-3 flex-wrap">
              <div className="flex items-center  gap-3 flex-wrap" >
                {softColors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleChange("color", c)}
                    className={`w-8 h-8 rounded-full border-2 ${form.color === c ? "border-gray-700" : "border-transparent"
                      }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <div className="relative flex flex-col items-center ml-10">
                <div className="absolute -top-8 flex flex-col items-center animate-bounce w-max">
                  <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-lg">
                    Choose more colors
                  </span>
                  <span className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></span>
                </div>

                <div className="p-1.5 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer">
                  <ColorPicker
                    value={form.color?.replace("#", "")}
                    onChange={(e) => handleChange("color", `#${e.value}`)}
                    format="hex"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Status
            </label>
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => handleChange("status", form.status === 1 ? 0 : 1)}
                className={`relative cursor-pointer inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.status === 1 ? "bg-green-500" : "bg-gray-300"
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${form.status === 1 ? "translate-x-6" : "translate-x-1"
                    }`}
                />
              </button>
              <span className="text-sm font-semibold text-gray-700">
                {form.status === 1 ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <InputField
            label="Webhook URL"
            type="url"
            value={form.webhookUrl}
            onChange={(e) => handleChange("webhookUrl", e.target.value)}
            placeholder="https://example.com/webhook"
          />

          <div className="">
            <span
              className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium text-white w-max text-wrap"
              style={{ backgroundColor: form.color }}
            >
              <GrTag />
              {form.tagName || "Tag Preview"}
            </span>
          </div>

          <div className="flex justify-end">
            <ShimmerButton
              icon={GrTag}
              onClick={handleSaveTag}
              disabled={loading}
            >
              {loading ? "Saving..." : editingTag ? "Update Tag" : "Save Tag"}
            </ShimmerButton>
          </div>
        </div>
      </Dialog>
      {/* Add Tag Dialog End */}

      {/* Delete Tag Dialog Start */}
      <Dialog
        header="Confirm Delete"
        visible={deleteDialogVisible}
        className="w-[28rem]"
        modal
        onHide={() => setDeleteDialogVisible(false)}
        draggable={false}
      >
        <div className="space-y-4">
          <p className="text-red-500 font-semibold flex items-center gap-2">
            <BiError /> This action is irreversible!
          </p>
          <p className="text-gray-700 text-center space-y-2">
            Are you sure you want to delete the tag{" "}? <br />
            <span
              className="font-semibold px-2 py-1 rounded-2xl text-sm"
              style={{ backgroundColor: tagToDelete?.color, color: "white" }}
            >
              {tagToDelete?.tagName}
            </span>&nbsp;

          </p>
          <p className="text-sm text-gray-500">
            Deleting this tag will permanently remove it from the system. Any
            candidates or records linked with this tag will lose their association.
          </p>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setDeleteDialogVisible(false)}
              className="px-3 py-1 rounded-2xl bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium tracking-wide"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-3 py-1 rounded-2xl bg-red-500 hover:bg-red-700 text-white text-sm font-medium tracking-wide"
            >
              Delete Tag
            </button>
          </div>
        </div>
      </Dialog>
      {/* Delete Tag Dialog End */}

    </div>
  );
}
