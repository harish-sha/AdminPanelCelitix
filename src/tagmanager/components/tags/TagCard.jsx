import React from "react";
import { useTags } from "@/tagmanager/hooks/useTags";
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";

const TagCard = ({ tag }) => {
  const { setSelectedTag, openModal, deleteTag } = useTags();

  const handleEdit = () => {
    setSelectedTag(tag);
    openModal();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-2xl shadow-md p-4 bg-white border border-gray-100"
    >
      <div className="flex justify-between items-center mb-2">
        <span
          className="px-3 py-1 rounded-full text-sm font-medium text-white"
          style={{ backgroundColor: tag.color || "#4F46E5" }}
        >
          {tag.name}
        </span>
        <div className="flex space-x-2">
          <button
            className="text-gray-500 hover:text-blue-500"
            onClick={handleEdit}
          >
            <Edit size={16} />
          </button>
          <button
            className="text-gray-500 hover:text-red-500"
            onClick={() => deleteTag(tag._id)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-500">Used {tag.usageCount || 0} times</p>
    </motion.div>
  );
};

export default TagCard;
