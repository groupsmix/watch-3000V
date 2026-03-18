interface SkeletonProps {
  className?: string;
  variant?: "light" | "dark";
}

export function SkeletonLine({ className = "", variant = "light" }: SkeletonProps) {
  return (
    <div
      className={`${variant === "dark" ? "skeleton-dark" : "skeleton"} h-4 rounded ${className}`}
      aria-hidden="true"
    />
  );
}

export function SkeletonBlock({ className = "", variant = "light" }: SkeletonProps) {
  return (
    <div
      className={`${variant === "dark" ? "skeleton-dark" : "skeleton"} ${className}`}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`luxury-card overflow-hidden ${className}`} aria-hidden="true">
      <div className="aspect-video skeleton" />
      <div className="p-6 space-y-3">
        <SkeletonLine className="h-5 w-3/4" />
        <SkeletonLine className="h-4 w-full" />
        <SkeletonLine className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function SkeletonReviewGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" aria-label="Loading reviews">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonQuizOption({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4" aria-label="Loading options">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonBlock key={i} className="h-16 rounded-2xl" />
      ))}
    </div>
  );
}

export function SkeletonArticle() {
  return (
    <div className="space-y-6 max-w-3xl" aria-label="Loading content" aria-hidden="true">
      <SkeletonLine className="h-8 w-2/3" />
      <div className="space-y-3">
        <SkeletonLine className="h-4 w-full" />
        <SkeletonLine className="h-4 w-full" />
        <SkeletonLine className="h-4 w-5/6" />
      </div>
      <SkeletonBlock className="h-64 w-full rounded-2xl" />
      <div className="space-y-3">
        <SkeletonLine className="h-4 w-full" />
        <SkeletonLine className="h-4 w-full" />
        <SkeletonLine className="h-4 w-4/5" />
        <SkeletonLine className="h-4 w-full" />
      </div>
      <SkeletonLine className="h-6 w-1/2" />
      <div className="space-y-3">
        <SkeletonLine className="h-4 w-full" />
        <SkeletonLine className="h-4 w-3/4" />
      </div>
    </div>
  );
}
