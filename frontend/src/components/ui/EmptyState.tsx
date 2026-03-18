import Link from "next/link";

interface EmptyStateProps {
  icon?: "search" | "reviews" | "blog" | "deals" | "general";
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
}

const icons = {
  search: (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  reviews: (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  ),
  blog: (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
  ),
  deals: (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
  general: (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
  ),
};

export default function EmptyState({
  icon = "general",
  title,
  description,
  actionLabel,
  actionHref,
  secondaryActionLabel,
  secondaryActionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-24 px-4 text-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center mb-6 text-gold/60">
        {icons[icon]}
      </div>
      <h3 className="text-xl md:text-2xl font-heading font-semibold text-navy mb-3">
        {title}
      </h3>
      <p className="text-gray-500 max-w-md leading-relaxed font-light mb-8">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        {actionLabel && actionHref && (
          <Link
            href={actionHref}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 cta-shine text-white font-semibold rounded-full min-h-[48px] hover:shadow-[0_8px_30px_rgba(201,169,110,0.3)] transition-all duration-500"
          >
            {actionLabel}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        )}
        {secondaryActionLabel && secondaryActionHref && (
          <Link
            href={secondaryActionHref}
            className="inline-flex items-center justify-center px-8 py-3.5 border border-navy/20 text-navy font-semibold rounded-full hover:bg-navy hover:text-white transition-all duration-500 min-h-[48px]"
          >
            {secondaryActionLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
