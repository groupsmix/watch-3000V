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
  const clamped = Math.max(0, Math.min(10, score));
  const percentage = (clamped / 10) * 100;

  const getBarColor = (s: number) => {
    if (s >= 9) return "from-gold to-gold-hover";
    if (s >= 8) return "from-gold/80 to-gold";
    if (s >= 7) return "from-amber-400 to-amber-500";
    return "from-gray-400 to-gray-500";
  };

  const getTextColor = (s: number) => {
    if (s >= 9) return "text-gold";
    if (s >= 8) return "text-gold/80";
    if (s >= 7) return "text-amber-600";
    return "text-gray-600";
  };

  const sizeConfig = {
    sm: { text: "text-sm", bar: "h-1.5", scoreText: "text-base", wrapper: "gap-2" },
    md: { text: "text-sm", bar: "h-2", scoreText: "text-xl", wrapper: "gap-3" },
    lg: { text: "text-base", bar: "h-2.5", scoreText: "text-2xl", wrapper: "gap-4" },
  };

  const config = sizeConfig[size];

  return (
    <div className={`flex items-center ${config.wrapper}`}>
      {showLabel && (
        <span className={`${config.text} font-medium text-gray-400 uppercase tracking-wider`}
          style={{ fontSize: size === "sm" ? "0.65rem" : "0.7rem", letterSpacing: "0.1em" }}
        >
          Gift-Worthiness
        </span>
      )}
      <div className="flex items-center gap-2 flex-1">
        <div className={`flex-1 max-w-[120px] bg-pearl rounded-full overflow-hidden ${config.bar}`}>
          <div
            className={`h-full rounded-full bg-gradient-to-r ${getBarColor(score)} transition-all duration-700 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className={`${config.scoreText} font-bold ${getTextColor(score)} tabular-nums`}>
          {score}
          <span className="text-gray-400 font-normal" style={{ fontSize: "0.65em" }}>/10</span>
        </span>
      </div>
    </div>
  );
}
