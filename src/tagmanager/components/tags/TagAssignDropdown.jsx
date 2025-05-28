import React from "react";
// import { useTags } from "@/hooks/useTags";
import { useTags } from "@/tagmanager/hooks/useTags";
import Select from "react-select";

const TagAssignDropdown = ({ selectedTags, setSelectedTags }) => {
  const { tags } = useTags();

  const options = tags.map((tag) => ({
    label: tag.name,
    value: tag._id,
    color: tag.color,
  }));

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#f3f4f6" : "white",
      color: "black",
      borderLeft: `6px solid ${state.data.color}`,
      paddingLeft: 12,
    }),
    multiValue: (styles, { data }) => ({
      ...styles,
      backgroundColor: data.color + "33",
      borderLeft: `4px solid ${data.color}`,
      borderRadius: 6,
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: "#111827",
    }),
  };

  const handleChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  return (
    <div className="my-2">
      <label className="text-sm font-medium text-gray-700">Assign Tags</label>
      <Select
        isMulti
        value={selectedTags}
        onChange={handleChange}
        options={options}
        styles={customStyles}
        placeholder="Select tags..."
        className="mt-1"
      />
    </div>
  );
};

export default TagAssignDropdown;
