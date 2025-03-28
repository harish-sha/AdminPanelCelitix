import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";

export const Card = ({ type }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
      <InputField
        id={"title"}
        name={"title"}
        placeholder="Enter Title"
        label={"Title"}
      />
      {type === "rich_card" ? (
        <AnimatedDropdown
          id={"selectCardOrientation"}
          label="Select Orientation"
          name={"selectCardOrientation"}
          options={[
            {
              label: "Vertical",
              value: "vertical",
            },
            {
              label: "Horizontal",
              value: "horizontal",
            },
          ]}
          placeholder="Select Card Orientation"
          onChange={() => {}}
        />
      ) : (
        <AnimatedDropdown
          id={"selectCardWidth"}
          label="Select Card Width"
          name={"selectCardWidth"}
          options={[
            {
              label: "Small",
              value: "small",
            },
            {
              label: "Medium",
              value: "medium",
            },
          ]}
          placeholder="Select Card Width"
          onChange={() => {}}
        />
      )}
      <AnimatedDropdown
        id={"selectMediaHeight"}
        label="Select Media Height"
        name={"selectMediaHeight"}
        options={[
          {
            label: "Medium",
            value: "medium",
          },
          {
            label: "Short",
            value: "short",
          },
        ]}
        placeholder="Select Media Height"
        onChange={() => {}}
      />
    </div>
  );
};
