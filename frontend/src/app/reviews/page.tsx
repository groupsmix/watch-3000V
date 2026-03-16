import Link from "next/link";
import { getAllReviews } from "@/lib/content";
import Breadcrumb from "@/components/layout/Breadcrumb";
import EmailSignup from "@/components/content/EmailSignup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watch Reviews — Expert Gift-Worthy Watch Reviews",
  description:
    "In-depth watch reviews with Gift-Worthiness Scores, pros & cons, and buying advice. Every watch hand-tested and rated for gift-giving.",
};

export default function ReviewsIndexPage() {
  const reviews = getAllReviews();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-navy text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-light" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gold/[0.05] rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Reviews" }]} />
          <div className="text-center mt-4">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/50" />
              <span className="luxury-label text-gold">Honest Reviews</span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/50" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-5 leading-tight">
              Watch Reviews
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed font-light">
              Every watch on WristNerd is honestly rated and scored for
              gift-worthiness. No paid placements, no fluff.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {reviews.map((review) => (
              <Link
                key={review.slug}
                href={`/reviews/${review.slug}`}
                className="group luxury-card overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-pearl to-gray-100 flex items-center justify-center">
                  <span className="text-gray-300 text-sm font-light">Watch Image</span>
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-heading font-semibold text-navy group-hover:text-gold transition-colors duration-300 mb-2">
                    {review.frontmatter.title}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed font-light">
                    {review.frontmatter.meta_description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link
              href="/gift-finder"
              className="inline-flex items-center gap-2.5 px-10 py-4 cta-shine text-white font-semibold rounded-full text-lg min-h-[56px] hover:shadow-[0_8px_30px_rgba(201,169,110,0.3)] transition-all duration-500"
            >
              Not sure? Take the Gift Finder Quiz
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="mt-20">
            <EmailSignup />
          </div>
        </div>
      </div>
    </>
  );
}
