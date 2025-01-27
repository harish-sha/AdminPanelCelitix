import Skeleton from "@mui/material/Skeleton";

const UniversalSkeleton = ({
    type = "rectangular", // 'text', 'rectangular', or 'circular'
    width = "100%",
    height = "1rem",
    animation = "wave", // 'pulse', 'wave', or false (no animation)
    count = 1,
    className = "",
}) => {
    return (
        <div className={className}>
            {Array.from({ length: count }).map((_, index) => (
                <Skeleton
                    key={index}
                    variant={type}
                    animation={animation}
                    width={width}
                    height={height}
                    className="rounded-md"
                />
            ))}
        </div>
    );
};

export default UniversalSkeleton;
