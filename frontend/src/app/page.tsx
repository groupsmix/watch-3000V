import Link from "next/link";
import { getHomepage } from "@/lib/content";
import { extractSchema } from "@/lib/markdown";
import SchemaMarkup from "@/components/content/SchemaMarkup";
import EmailSignup from "@/components/content/EmailSignup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WristNerd — Expert Watch Gift Guides & Reviews",
  description:
    "Find the perfect watch gift for him. Expert reviews, Gift-Worthiness Scores, and curated guides by occasion, budget, and recipient.",
};

const occasions = [
  { href: "/occasion/fathers-day", label: "Father's Day", emoji: "👔" },
  { href: "/occasion/christmas", label: "Christmas", emoji: "🎄" },
  { href: "/occasion/birthday", label: "Birthday", emoji: "🎂" },
  { href: "/occasion/valentines-day", label: "Valentine's Day", emoji: "❤️" },
  { href: "/occasion/anniversary", label: "Anniversary", emoji: "💍" },
  { href: "/occasion/graduation", label: "Graduation", emoji: "🎓" },
];

const budgets = [
  { href: "/budget/under-100", label: "Under $100", desc: "Great starter watches" },
  { href: "/budget/under-200", label: "Under $200", desc: "Sweet spot for gifts" },
  { href: "/budget/under-300", label: "Under $300", desc: "Premium quality" },
  { href: "/budget/under-500", label: "Under $500", desc: "Luxury territory" },
  { href: "/budget/luxury-500-plus", label: "$500+", desc: "The best of the best" },
];

const editorsPicks = [
  {
    name: "Seiko Presage SRPD37",
    tagline: "Best Overall Gift Watch",
    score: 9.2,
    price: "$280–$320",
    href: "/reviews/seiko-presage-srpd37",
  },
  {
    name: "Orient Bambino V2",
    tagline: "Best Under $200",
    score: 9.1,
    price: "$130–$170",
    href: "/reviews/orient-bambino-v2",
  },
  {
    name: "Tissot PRX Powermatic 80",
    tagline: "Best Modern Classic",
    score: 9.3,
    price: "$450–$500",
    href: "/reviews/tissot-prx-powermatic-80",
  },
  {
    name: "Hamilton Khaki Field",
    tagline: "Best Adventure Watch",
    score: 9.0,
    price: "$400–$500",
    href: "/reviews/hamilton-khaki-field-mechanical",
  },
];

export default function HomePage() {
  const page = getHomepage();
  const schema = page ? extractSchema(page.content) : null;

  return (
    <>
      {schema && <SchemaMarkup schema={schema} />}

      {/* Hero Section */}
      <section className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
              Find the Perfect Watch Gift{" "}
              <span className="text-gold">for Him</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Expert reviews, honest ratings, and a proprietary Gift-Worthiness
              Score to help you pick a watch he&apos;ll actually love. No fluff, no
              sponsored rankings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/gift-finder"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold text-white font-semibold rounded-lg hover:bg-gold-hover transition-colors text-lg"
              >
                Take the Gift Finder Quiz &rarr;
              </Link>
              <Link
                href="/reviews"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-navy transition-colors text-lg"
              >
                Browse Reviews
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <span className="text-gold font-bold">50+</span> Watches Reviewed
            </span>
            <span className="flex items-center gap-2">
              <span className="text-gold font-bold">14</span> In-Depth Reviews
            </span>
            <span className="flex items-center gap-2">
              <span className="text-gold font-bold">5</span> Gift Score Factors
            </span>
            <span className="flex items-center gap-2">
              <span className="text-gold font-bold">0</span> Sponsored Rankings
            </span>
          </div>
        </div>
      </section>

      {/* Shop by Occasion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-heading font-bold text-navy text-center mb-3">
          Shop by Occasion
        </h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Every occasion calls for a different watch. We&apos;ve curated the best
          picks for each one.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {occasions.map((occ) => (
            <Link
              key={occ.href}
              href={occ.href}
              className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-xl hover:border-gold hover:shadow-md transition-all group"
            >
              <span className="text-3xl mb-3">{occ.emoji}</span>
              <span className="text-sm font-semibold text-navy group-hover:text-gold transition-colors text-center">
                {occ.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Shop by Budget */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-navy text-center mb-3">
            Shop by Budget
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Great watches exist at every price point. Here are our favorites by
            budget range.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {budgets.map((b) => (
              <Link
                key={b.href}
                href={b.href}
                className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-xl hover:border-gold hover:shadow-md transition-all group"
              >
                <span className="text-lg font-bold text-navy group-hover:text-gold transition-colors">
                  {b.label}
                </span>
                <span className="text-xs text-gray-500 mt-1">{b.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editor's Picks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-heading font-bold text-navy text-center mb-3">
          Editor&apos;s Picks
        </h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Our top-rated watches for gifting — chosen by our editorial team based
          on hands-on research and our Gift-Worthiness Score.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {editorsPicks.map((watch) => (
            <Link
              key={watch.href}
              href={watch.href}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gold hover:shadow-lg transition-all"
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Watch Image</span>
              </div>
              <div className="p-5">
                <p className="text-xs text-gold font-semibold uppercase tracking-wider mb-1">
                  {watch.tagline}
                </p>
                <h3 className="text-lg font-heading font-semibold text-navy group-hover:text-gold transition-colors mb-2">
                  {watch.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{watch.price}</span>
                  <span className="text-sm font-bold text-green-600">
                    {watch.score}/10
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Gift Finder CTA */}
      <section className="bg-navy py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Not Sure Which Watch?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Take our 60-second Gift Finder Quiz and get 3 personalized watch
            recommendations based on who you&apos;re buying for, the occasion,
            budget, and style.
          </p>
          <Link
            href="/gift-finder"
            className="inline-flex items-center px-8 py-4 bg-gold text-white font-semibold rounded-lg hover:bg-gold-hover transition-colors text-lg"
          >
            Start the Quiz &rarr;
          </Link>
        </div>
      </section>

      {/* Email Signup */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmailSignup
          heading="Get Gift Alerts Before Every Occasion"
          description="Join smart gift-givers who get seasonal picks, price drop alerts, and exclusive deals — timed for Father's Day, Christmas, birthdays, and more."
        />
      </section>
    </>
  );
}
