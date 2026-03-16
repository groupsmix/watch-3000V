import Link from "next/link";
import { getHomepage } from "@/lib/content";
import { extractSchema } from "@/lib/markdown";
import SchemaMarkup from "@/components/content/SchemaMarkup";
import EmailSignup from "@/components/content/EmailSignup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WristNerd \u2014 Expert Watch Gift Guides & Reviews",
  description:
    "Find the perfect watch gift for him. Expert reviews, Gift-Worthiness Scores, and curated guides by occasion, budget, and recipient.",
};

const occasions = [
  { href: "/occasion/fathers-day", label: "Father\u2019s Day", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" },
  { href: "/occasion/christmas", label: "Christmas", icon: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" },
  { href: "/occasion/birthday", label: "Birthday", icon: "M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.75 1.75 0 003 15.546V12a9 9 0 0118 0v3.546z" },
  { href: "/occasion/valentines-day", label: "Valentine\u2019s Day", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
  { href: "/occasion/anniversary", label: "Anniversary", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" },
  { href: "/occasion/graduation", label: "Graduation", icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" },
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
    badge: "Editor\u2019s Choice",
    score: 9.2,
    price: "$280\u2013$320",
    href: "/reviews/seiko-presage-srpd37",
  },
  {
    name: "Orient Bambino V2",
    tagline: "Best Under $200",
    badge: "Best Value",
    score: 9.1,
    price: "$130\u2013$170",
    href: "/reviews/orient-bambino-v2",
  },
  {
    name: "Tissot PRX Powermatic 80",
    tagline: "Best Modern Classic",
    badge: "Top Rated",
    score: 9.3,
    price: "$450\u2013$500",
    href: "/reviews/tissot-prx-powermatic-80",
  },
  {
    name: "Hamilton Khaki Field",
    tagline: "Best Adventure Watch",
    badge: "Editor\u2019s Choice",
    score: 9.0,
    price: "$400\u2013$500",
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
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-20 animate-float" style={{ background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />
          <div className="absolute bottom-1/3 left-[15%] w-[300px] h-[300px] rounded-full opacity-15 animate-float" style={{ animationDelay: "3s", background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 lg:py-48 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-gold to-transparent" />
              <span className="label-luxury">Expert Watch Gift Guides</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-ivory leading-[1.05] mb-8 tracking-tight">
              Find the Perfect{" "}
              <br className="hidden sm:block" />
              Watch Gift{" "}
              <span className="gradient-text italic">for Him</span>
            </h1>
            <p className="text-lg md:text-xl text-ivory-dim/70 mb-12 leading-relaxed max-w-2xl">
              Expert reviews, honest ratings, and a proprietary Gift-Worthiness
              Score to help you pick a watch he&apos;ll actually love. No fluff, no
              sponsored rankings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/gift-finder"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 cta-shine font-semibold rounded-full text-lg min-h-[56px] hover:shadow-xl transition-all duration-300"
              >
                Take the Gift Finder Quiz
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/reviews"
                className="inline-flex items-center justify-center px-10 py-5 bg-transparent border border-gold/30 text-ivory font-semibold rounded-full hover:bg-gold/5 hover:border-gold/50 transition-all duration-300 text-lg min-h-[56px]"
              >
                Browse Reviews
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black-rich to-transparent" />
      </section>

      {/* Trust Bar */}
      <section className="relative border-y border-gold/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20">
            <span className="flex items-center gap-3">
              <span className="text-3xl font-bold gradient-text font-heading">50+</span>
              <span className="text-xs text-ivory-dim/40 uppercase tracking-[0.1em]">Watches Reviewed</span>
            </span>
            <span className="hidden md:block w-px h-10 bg-gold/10" />
            <span className="flex items-center gap-3">
              <span className="text-3xl font-bold gradient-text font-heading">14</span>
              <span className="text-xs text-ivory-dim/40 uppercase tracking-[0.1em]">In-Depth Reviews</span>
            </span>
            <span className="hidden md:block w-px h-10 bg-gold/10" />
            <span className="flex items-center gap-3">
              <span className="text-3xl font-bold gradient-text font-heading">5</span>
              <span className="text-xs text-ivory-dim/40 uppercase tracking-[0.1em]">Gift Score Factors</span>
            </span>
            <span className="hidden md:block w-px h-10 bg-gold/10" />
            <span className="flex items-center gap-3">
              <span className="text-3xl font-bold gradient-text font-heading">0</span>
              <span className="text-xs text-ivory-dim/40 uppercase tracking-[0.1em]">Sponsored Rankings</span>
            </span>
          </div>
        </div>
      </section>

      {/* Shop by Occasion */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="label-luxury">Curated Guides</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-ivory mb-4 tracking-tight">
            Shop by Occasion
          </h2>
          <p className="text-ivory-dim/50 max-w-2xl mx-auto leading-relaxed">
            Every occasion calls for a different watch. We&apos;ve curated the best
            picks for each one.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">
          {occasions.map((occ) => (
            <Link
              key={occ.href}
              href={occ.href}
              className="luxury-card flex flex-col items-center p-6 lg:p-8 group"
            >
              <span className="w-14 h-14 rounded-full bg-gold/8 flex items-center justify-center mb-4 group-hover:bg-gold/15 transition-colors duration-500">
                <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={occ.icon} />
                </svg>
              </span>
              <span className="text-sm font-semibold text-ivory group-hover:text-gold transition-colors duration-300 text-center">
                {occ.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Shop by Budget */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-surface/50" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/40" />
              <span className="label-luxury">Every Price Point</span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/40" />
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-ivory mb-4 tracking-tight">
              Shop by Budget
            </h2>
            <p className="text-ivory-dim/50 max-w-2xl mx-auto leading-relaxed">
              Great watches exist at every price point. Here are our favorites by
              budget range.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
            {budgets.map((b) => (
              <Link
                key={b.href}
                href={b.href}
                className="luxury-card flex flex-col items-center p-8 lg:p-10 group text-center"
              >
                <span className="text-2xl font-bold text-ivory group-hover:text-gold transition-colors duration-300 mb-2 font-heading">
                  {b.label}
                </span>
                <span className="text-xs text-ivory-dim/40 group-hover:text-ivory-dim/60 transition-colors uppercase tracking-wider">{b.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editors Picks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="label-luxury">Hand-Picked</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-ivory mb-4 tracking-tight">
            Editor&apos;s Picks
          </h2>
          <p className="text-ivory-dim/50 max-w-2xl mx-auto leading-relaxed">
            Our top-rated watches for gifting &mdash; chosen by our editorial team based
            on hands-on research and our Gift-Worthiness Score.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {editorsPicks.map((watch) => (
            <Link
              key={watch.href}
              href={watch.href}
              className="group luxury-card overflow-hidden"
            >
              <div className="relative aspect-square bg-gradient-to-br from-surface to-surface-elevated flex items-center justify-center">
                <span className="text-ivory-dim/20 text-sm">Watch Image</span>
                <span className="gold-badge absolute top-4 left-4">
                  {watch.badge}
                </span>
              </div>
              <div className="p-6">
                <p className="label-luxury text-[0.6rem] mb-2">
                  {watch.tagline}
                </p>
                <h3 className="text-lg font-heading font-semibold text-ivory group-hover:text-gold transition-colors duration-300 mb-4">
                  {watch.name}
                </h3>
                <div className="flex items-center justify-between pt-4 border-t border-gold/8">
                  <span className="text-sm font-medium text-ivory-dim/60">{watch.price}</span>
                  <span className="flex items-center gap-1">
                    <span className="text-sm font-bold text-gold">{watch.score}</span>
                    <span className="text-xs text-ivory-dim/30">/10</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Gift Finder CTA */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-surface/50" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-ivory mb-6 tracking-tight">
            Not Sure Which Watch?
          </h2>
          <p className="text-lg text-ivory-dim/60 mb-12 leading-relaxed">
            Take our 60-second Gift Finder Quiz and get 3 personalized watch
            recommendations based on who you&apos;re buying for, the occasion,
            budget, and style.
          </p>
          <Link
            href="/gift-finder"
            className="inline-flex items-center gap-2 px-12 py-5 cta-shine font-semibold rounded-full text-lg min-h-[56px] hover:shadow-xl transition-all duration-300"
          >
            Start the Quiz
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Email Signup */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <EmailSignup
          heading="Get Gift Alerts Before Every Occasion"
          description="Join smart gift-givers who get seasonal picks, price drop alerts, and exclusive deals."
        />
      </section>
    </>
  );
}
