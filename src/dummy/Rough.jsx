// ...existing imports...

const HoverEffect = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={cn("flex flex-wrap justify-between gap-4 py-5", className)}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <div className="m-auto h-45 w-45 flex items-center justify-center mt-4">
              <Lottie animationData={item.animation} loop={true} />
            </div>
            <div className="flex items-center justify-center m-auto mt-8">
              <UniversalButton
                label={item.button}
                variant="primary"
                className={cn(
                  // Animation: start hidden and below, move up and fade in on hover
                  "transition-all duration-500 ease-out transform opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0",
                  // Button style: gradient, rounded, shadow, animated on hover
                  "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl px-5 py-2 shadow-lg",
                  "hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:to-pink-600 focus:outline-none"
                )}
                style={{
                  boxShadow: "0 4px 24px 0 rgba(99,102,241,0.15)",
                  border: "none",
                }}
              />
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};