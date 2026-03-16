interface GiftWorthinessScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function GiftWorthinessScore({
  score,
  size = "md",
  showLabel = true,
}: GiftWorthinessScoreProps) {
  const getColor = (s: number) => {
    if (s >= 9) return "text-green-600 bg-green-50 border-green-200";
    if (s >= 8) return "text-blue-600 bg-blue-50 border-blue-200";
    if (s >= 7) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-gray-600 bg-gray-50 border-gray-200";
  };

  const sizeClasses = {
    sm: "text-sm px-2 py-1",
    md: "text-base px-3 py-1.5",
    lg: "text-lg px-4 py-2",
  };

  return (
    <div className="flex items-center gap-2">
      {showLabel && (
        <span className="text-sm font-medium text-gray-600">Gift-Worthiness:</span>
      )}
      <span
        className={`inline-flex items-center font-bold border rounded-full ${getColor(score)} ${sizeClasses[size]}`}
      >
        {score}/10
      </span>
    </div>
  );
}
