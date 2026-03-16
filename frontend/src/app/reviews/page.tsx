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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "Reviews" }]} />

      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-navy mb-4">
          Watch Reviews
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Every watch on WristNerd is honestly rated and scored for
          gift-worthiness. No paid placements, no fluff.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Link
            key={review.slug}
            href={`/reviews/${review.slug}`}
            className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gold hover:shadow-lg transition-all"
          >
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Watch Image</span>
            </div>
            <div className="p-5">
              <h2 className="text-lg font-heading font-semibold text-navy group-hover:text-gold transition-colors mb-2">
                {review.frontmatter.title}
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                {review.frontmatter.meta_description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/gift-finder"
          className="inline-flex items-center px-8 py-4 bg-gold text-white font-semibold rounded-lg hover:bg-gold-hover transition-colors text-lg"
        >
          Not sure? Take the Gift Finder Quiz &rarr;
        </Link>
      </div>

      <EmailSignup />
    </div>
  );
}
