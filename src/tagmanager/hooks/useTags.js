import { useState, useEffect } from "react";

export const useTags = () => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTags = async () => {
    // Dummy data, replace with API call
    const res = await Promise.resolve([
      { _id: "1", name: "Promo", color: "#F59E0B" },
      { _id: "2", name: "Transactional", color: "#10B981" },
    ]);
    setTags(res);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const createTag = async (tagData) => {
    // Replace with API POST
    const newTag = { ...tagData, _id: Date.now().toString() };
    setTags((prev) => [...prev, newTag]);
  };

  const updateTag = async (tagId, tagData) => {
    // Replace with API PATCH
    setTags((prev) =>
      prev.map((tag) => (tag._id === tagId ? { ...tag, ...tagData } : tag))
    );
  };

  const deleteTag = async (tagId) => {
    // Replace with API DELETE
    setTags((prev) => prev.filter((tag) => tag._id !== tagId));
  };

  const openModal = (tag = null) => {
    setSelectedTag(tag);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTag(null);
    setIsModalOpen(false);
  };

  return {
    tags,
    selectedTag,
    isModalOpen,
    openModal,
    closeModal,
    createTag,
    updateTag,
    deleteTag,
  };
};
