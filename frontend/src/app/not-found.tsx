import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-px w-8 bg-gold/50" />
        <span className="text-gold text-xs font-bold uppercase tracking-[0.15em]">Lost in Time</span>
        <div className="h-px w-8 bg-gold/50" />
      </div>
      <h1 className="text-7xl md:text-8xl font-heading font-bold gradient-text mb-4">404</h1>
      <h2 className="text-2xl font-heading font-semibold text-navy mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help
        you find the perfect watch instead.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 cta-shine text-white font-semibold rounded-full min-h-[48px] transition-all duration-300"
        >
          Go Home
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
        <Link
          href="/gift-finder"
          className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-navy text-navy font-semibold rounded-full hover:bg-navy hover:text-white transition-all duration-300 min-h-[48px]"
        >
          Take the Gift Finder Quiz
        </Link>
        <Link
          href="/reviews"
          className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-gray-200 text-gray-600 font-semibold rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 min-h-[48px]"
        >
          Browse Reviews
        </Link>
      </div>
    </div>
  );
}
