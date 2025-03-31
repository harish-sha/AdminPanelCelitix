import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";

export const Carousel = ({
  caraousalData,
  setCaraousalData,
  cardwidth,
  setCardwidth,
  cardheight,
  setCardheight,
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
          value={cardwidth}
          onChange={(e) => {
            setcardwidth(e);
          }}
        />
        <AnimatedDropdown
          id={"selectCardHeight"}
          label="Select Card Height"
          name={"selectCardHeight"}
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
          placeholder="Select Card Height"
          value={cardheight}
          onChange={(e) => {
            setCardheight(e);
          }}
        />
      </div>
    </div>
  );
};
