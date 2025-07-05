import React, { useState, useEffect } from "react";
import { useTags } from "@/tagmanager/hooks/useTags";
import { Modal } from "../shared/Modal";
// import { Input } from "../shared/Modal";
// import { Button } from "../shared/Modal";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";

const defaultColors = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6"];

const TagModal = () => {
  const { isModalOpen, closeModal, selectedTag, createTag, updateTag } =
    useTags();
  const [name, setName] = useState("");
  const [color, setColor] = useState(defaultColors[0]);

  useEffect(() => {
    if (selectedTag) {
      setName(selectedTag.name);
      setColor(selectedTag.color);
    } else {
      setName("");
      setColor(defaultColors[0]);
    }
  }, [selectedTag]);

  const handleSubmit = () => {
    const tagData = { name, color };
    selectedTag ? updateTag(selectedTag._id, tagData) : createTag(tagData);
    closeModal();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title={selectedTag ? "Edit Tag" : "Create Tag"}
    >
      <div className="space-y-4">
        <Input
          label="Tag Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div>
          <p className="text-sm mb-1 font-medium">Select Color:</p>
          <div className="flex space-x-2">
            {defaultColors.map((c) => (
              <button
                key={c}
                className={`w-6 h-6 rounded-full border-2 ${
                  c === color ? "border-black" : "border-transparent"
                }`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSubmit}>
            {selectedTag ? "Update" : "Create"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TagModal;
