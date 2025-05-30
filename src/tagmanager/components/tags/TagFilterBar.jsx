import React, { useState } from "react";
import { useTags } from "@/tagmanager/hooks/useTags";
import Select from "react-select";

const TagFilterBar = ({ onFilterChange }) => {
  const { tags } = useTags();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = tags.map((tag) => ({
    label: tag.name,
    value: tag._id,
    color: tag.color,
  }));

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#f9fafb" : "white",
      color: "black",
      borderLeft: `6px solid ${state.data.color}`,
      paddingLeft: 12,
    }),
  };

  const handleChange = (selected) => {
    setSelectedOptions(selected);
    onFilterChange(selected.map((opt) => opt.value));
  };

  return (
    <div className="w-full max-w-md">
      <Select
        isMulti
        placeholder="Filter by tags..."
        value={selectedOptions}
        onChange={handleChange}
        options={options}
        styles={customStyles}
        className="text-sm"
      />
    </div>
  );
};

export default TagFilterBar;
