import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center bg-ivory overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-gold/[0.04] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-navy/[0.03] rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="luxury-label text-gold">Lost in Time</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/50" />
        </div>
        <h1 className="text-8xl md:text-9xl font-heading font-bold gradient-text mb-6 leading-none">404</h1>
        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-navy mb-5">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-12 max-w-md mx-auto leading-relaxed font-light">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help
          you find the perfect watch instead.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 cta-shine text-white font-semibold rounded-full min-h-[48px] hover:shadow-[0_8px_30px_rgba(201,169,110,0.3)] transition-all duration-500"
          >
            Go Home
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/gift-finder"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-navy/20 text-navy font-semibold rounded-full hover:bg-navy hover:text-white transition-all duration-500 min-h-[48px]"
          >
            Gift Finder Quiz
          </Link>
          <Link
            href="/reviews"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-200 text-gray-500 font-semibold rounded-full hover:border-gold hover:text-gold transition-all duration-500 min-h-[48px]"
          >
            Browse Reviews
          </Link>
        </div>
      </div>
    </div>
  );
}
