import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-6xl font-heading font-bold text-navy mb-4">404</h1>
      <h2 className="text-2xl font-heading font-semibold text-gray-700 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help
        you find the perfect watch instead.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-gold text-white font-semibold rounded-lg hover:bg-gold-hover transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/gift-finder"
          className="inline-flex items-center justify-center px-6 py-3 border-2 border-navy text-navy font-semibold rounded-lg hover:bg-navy hover:text-white transition-colors"
        >
          Take the Gift Finder Quiz
        </Link>
        <Link
          href="/reviews"
          className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          Browse Reviews
        </Link>
      </div>
    </div>
  );
}
