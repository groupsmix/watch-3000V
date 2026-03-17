"use client";

import { useState } from "react";
import Link from "next/link";

interface WatchEntry {
  name: string;
  slug: string;
  affiliate_url: string;
  price_range: string;
  price_min: number;
  price_max: number;
  movement: string;
  style: string[];
  occasions: string[];
  recipients: string[];
  gift_worthiness_score: number;
  one_liner: string;
}

const watchDatabase: WatchEntry[] = [
  {
    name: "Seiko Presage SRPD37",
    slug: "/reviews/seiko-presage-srpd37",
    affiliate_url: "https://www.amazon.com/dp/B07YZ4SGMR?tag=wristnerd-20",
    price_range: "$280–$320",
    price_min: 280,
    price_max: 320,
    movement: "automatic",
    style: ["classic", "dress"],
    occasions: ["christmas", "fathers_day", "birthday", "valentines", "anniversary", "graduation"],
    recipients: ["husband", "dad", "boyfriend", "self"],
    gift_worthiness_score: 9.2,
    one_liner: "Cocktail-inspired automatic with a color-shifting dial that photographs beautifully.",
  },
  {
    name: "Orient Bambino V2",
    slug: "/reviews/orient-bambino-v2",
    affiliate_url: "https://www.amazon.com/dp/B01MUDI3GN?tag=wristnerd-20",
    price_range: "$130–$170",
    price_min: 130,
    price_max: 170,
    movement: "automatic",
    style: ["classic", "dress"],
    occasions: ["christmas", "fathers_day", "birthday", "graduation", "other"],
    recipients: ["husband", "dad", "boyfriend", "son", "friend", "self"],
    gift_worthiness_score: 9.1,
    one_liner: "The best automatic dress watch under $200 — period.",
  },
  {
    name: "Tissot PRX Powermatic 80",
    slug: "/reviews/tissot-prx-powermatic-80",
    affiliate_url: "https://www.amazon.com/dp/B09MDNMMRW?tag=wristnerd-20",
    price_range: "$450–$500",
    price_min: 450,
    price_max: 500,
    movement: "automatic",
    style: ["modern", "sport"],
    occasions: ["christmas", "fathers_day", "birthday", "valentines", "anniversary"],
    recipients: ["husband", "boyfriend", "self"],
    gift_worthiness_score: 9.3,
    one_liner: "Swiss automatic with '70s-inspired integrated bracelet design.",
  },
  {
    name: "Hamilton Khaki Field Mechanical",
    slug: "/reviews/hamilton-khaki-field-mechanical",
    affiliate_url: "https://www.amazon.com/dp/B001FSJBD0?tag=wristnerd-20",
    price_range: "$400–$500",
    price_min: 400,
    price_max: 500,
    movement: "mechanical",
    style: ["rugged", "casual"],
    occasions: ["christmas", "fathers_day", "birthday", "graduation"],
    recipients: ["husband", "dad", "boyfriend", "son", "self"],
    gift_worthiness_score: 9.0,
    one_liner: "Military heritage meets Swiss craftsmanship in a slim, hand-wound package.",
  },
  {
    name: "Citizen Eco-Drive BM8180",
    slug: "/reviews/citizen-eco-drive-bm8180",
    affiliate_url: "https://www.amazon.com/dp/B000EQS1JW?tag=wristnerd-20",
    price_range: "$75–$100",
    price_min: 75,
    price_max: 100,
    movement: "solar",
    style: ["casual", "rugged"],
    occasions: ["christmas", "fathers_day", "birthday", "other"],
    recipients: ["dad", "friend", "son", "self"],
    gift_worthiness_score: 7.8,
    one_liner: "Solar-powered field watch — reliable, affordable, no-fuss daily wearer.",
  },
  {
    name: "Seiko 5 Sports SRPD55",
    slug: "/reviews/seiko-5-srpd55",
    affiliate_url: "https://www.amazon.com/dp/B07WGMQBPF?tag=wristnerd-20",
    price_range: "$220–$270",
    price_min: 220,
    price_max: 270,
    movement: "automatic",
    style: ["sport", "casual"],
    occasions: ["christmas", "fathers_day", "birthday", "graduation"],
    recipients: ["boyfriend", "son", "friend", "self"],
    gift_worthiness_score: 8.4,
    one_liner: "Modern sports automatic with 100m WR and day-date complication.",
  },
  {
    name: "Casio G-Shock GA2100",
    slug: "/reviews/casio-g-shock-ga2100",
    affiliate_url: "https://www.amazon.com/dp/B07WMS77R4?tag=wristnerd-20",
    price_range: "$80–$110",
    price_min: 80,
    price_max: 110,
    movement: "quartz",
    style: ["sport", "rugged"],
    occasions: ["christmas", "birthday", "other"],
    recipients: ["boyfriend", "son", "friend", "self"],
    gift_worthiness_score: 7.5,
    one_liner: "The 'CasiOak' — slim G-Shock with an AP Royal Oak-inspired octagonal bezel.",
  },
  {
    name: "Bulova Lunar Pilot",
    slug: "/reviews/bulova-lunar-pilot",
    affiliate_url: "https://www.amazon.com/dp/B01AJE2WAW?tag=wristnerd-20",
    price_range: "$350–$450",
    price_min: 350,
    price_max: 450,
    movement: "quartz",
    style: ["sport", "classic"],
    occasions: ["christmas", "fathers_day", "birthday", "anniversary"],
    recipients: ["husband", "dad", "self"],
    gift_worthiness_score: 8.6,
    one_liner: "Moon-worn chronograph heritage with UHF 262kHz precision movement.",
  },
  {
    name: "Timex Marlin Automatic",
    slug: "/reviews/timex-marlin-automatic",
    affiliate_url: "https://www.amazon.com/dp/B07VYG3TCK?tag=wristnerd-20",
    price_range: "$200–$250",
    price_min: 200,
    price_max: 250,
    movement: "automatic",
    style: ["classic", "dress"],
    occasions: ["christmas", "birthday", "graduation", "other"],
    recipients: ["boyfriend", "son", "friend", "self"],
    gift_worthiness_score: 8.2,
    one_liner: "Retro-inspired automatic with exhibition caseback and mid-century styling.",
  },
  {
    name: "Tissot Gentleman Powermatic 80",
    slug: "/reviews/tissot-gentleman-powermatic-80",
    affiliate_url: "https://www.amazon.com/dp/B07Z4J5MHN?tag=wristnerd-20",
    price_range: "$600–$700",
    price_min: 600,
    price_max: 700,
    movement: "automatic",
    style: ["classic", "dress"],
    occasions: ["christmas", "fathers_day", "birthday", "valentines", "anniversary"],
    recipients: ["husband", "dad", "self"],
    gift_worthiness_score: 9.4,
    one_liner: "Swiss automatic with sapphire crystal and finishing that rivals $2,000 watches.",
  },
  {
    name: "Citizen Eco-Drive Chandler",
    slug: "/reviews/citizen-eco-drive-chandler",
    affiliate_url: "https://www.amazon.com/dp/B004JKBDYO?tag=wristnerd-20",
    price_range: "$100–$140",
    price_min: 100,
    price_max: 140,
    movement: "solar",
    style: ["casual", "rugged"],
    occasions: ["christmas", "fathers_day", "birthday", "other"],
    recipients: ["dad", "friend", "self"],
    gift_worthiness_score: 7.9,
    one_liner: "Solar-powered field watch — zero maintenance, 100m WR, reliable daily wearer.",
  },
  {
    name: "Fossil Neutra Chronograph",
    slug: "/reviews/fossil-neutra-chronograph",
    affiliate_url: "https://www.amazon.com/dp/B079RM1WJM?tag=wristnerd-20",
    price_range: "$80–$120",
    price_min: 80,
    price_max: 120,
    movement: "quartz",
    style: ["casual", "modern"],
    occasions: ["christmas", "birthday", "other"],
    recipients: ["boyfriend", "friend", "son", "self"],
    gift_worthiness_score: 7.4,
    one_liner: "Minimalist fashion chronograph — clean design, decent quality, easy gift.",
  },
];

const steps = [
  {
    id: "recipient",
    title: "Who are you buying for?",
    options: [
      { value: "husband", label: "Husband" },
      { value: "dad", label: "Dad" },
      { value: "boyfriend", label: "Boyfriend" },
      { value: "son", label: "Son" },
      { value: "friend", label: "Friend" },
      { value: "self", label: "Myself" },
    ],
  },
  {
    id: "occasion",
    title: "What's the occasion?",
    options: [
      { value: "fathers_day", label: "Father's Day" },
      { value: "christmas", label: "Christmas" },
      { value: "birthday", label: "Birthday" },
      { value: "valentines", label: "Valentine's Day" },
      { value: "anniversary", label: "Anniversary" },
      { value: "graduation", label: "Graduation" },
      { value: "other", label: "Just Because" },
    ],
  },
  {
    id: "budget",
    title: "What's your budget?",
    options: [
      { value: "100", label: "Under $100" },
      { value: "200", label: "Under $200" },
      { value: "350", label: "Under $350" },
      { value: "500", label: "Under $500" },
      { value: "1000", label: "$500–$1,000" },
      { value: "9999", label: "$1,000+" },
    ],
  },
  {
    id: "style",
    title: "What's his style?",
    options: [
      { value: "classic", label: "Classic / Dressy" },
      { value: "modern", label: "Modern / Minimalist" },
      { value: "sport", label: "Sporty / Active" },
      { value: "rugged", label: "Rugged / Outdoor" },
      { value: "dress", label: "Dress / Formal" },
      { value: "casual", label: "Casual / Everyday" },
    ],
  },
];

interface Answers {
  recipient: string;
  occasion: string;
  budget: string;
  style: string;
}

function getRecommendations(answers: Answers): WatchEntry[] {
  const maxBudget = parseInt(answers.budget, 10);

  const filtered = watchDatabase.filter((w) => w.price_max <= maxBudget);

  const scored = filtered.map((watch) => {
    let score = watch.gift_worthiness_score * 10;

    if (watch.recipients.includes(answers.recipient)) score += 20;
    if (watch.occasions.includes(answers.occasion)) score += 15;
    if (watch.style.includes(answers.style)) score += 15;

    return { watch, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 3).map((s) => s.watch);
}

export default function GiftFinderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (value: string) => {
    const step = steps[currentStep];
    const newAnswers = { ...answers, [step.id]: value };
    setAnswers(newAnswers);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const results = getRecommendations(answers as Answers);

    return (
      <div className="bg-ivory min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="luxury-label text-gold">Your Results</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-navy mb-5 leading-tight">
            Your Perfect Watch Matches
          </h1>
          <p className="text-gray-500 leading-relaxed font-light">
            Based on your answers, here are the watches we recommend &mdash; sorted by
            Gift-Worthiness Score.
          </p>
        </div>

        <div className="space-y-6">
          {results.map((watch, i) => (
            <div
              key={watch.slug}
              className={`luxury-card p-6 md:p-8 ${
                i === 0
                  ? "border-gold/40 bg-gradient-to-br from-gold-50/50 to-white ring-1 ring-gold/20"
                  : ""
              }`}
            >
              {i === 0 && (
                <span className="gold-badge mb-4 inline-block">
                  Our #1 Pick
                </span>
              )}
              {i === 1 && (
                <span className="inline-block px-3 py-1 bg-navy text-white text-xs font-bold rounded-full mb-4 uppercase tracking-[0.08em]">
                  Runner-Up
                </span>
              )}
              {i === 2 && (
                <span className="inline-block px-3 py-1 bg-gray-400 text-white text-xs font-bold rounded-full mb-4 uppercase tracking-[0.08em]">
                  Also Consider
                </span>
              )}

              <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-44 h-44 bg-gradient-to-br from-pearl to-gray-100 rounded-2xl flex items-center justify-center shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-pearl/80 via-gray-50 to-pearl/60" />
                    <svg className="w-14 h-14 text-gray-200 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75}>
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 3" />
                      <path d="M12 3v1" />
                      <path d="M12 20v1" />
                      <path d="M3 12h1" />
                      <path d="M20 12h1" />
                    </svg>
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gold/[0.05] rounded-full -translate-y-1/2 translate-x-1/2 blur-xl" />
                  </div>
                <div className="flex-1">
                  <h2 className="text-xl font-heading font-semibold text-navy mb-2">
                    {watch.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-sm font-bold text-emerald-600">
                      Gift Score: {watch.gift_worthiness_score}/10
                    </span>
                    <span className="text-sm text-gray-500">
                      {watch.price_range}
                    </span>
                    <span className="text-xs text-gray-400 capitalize px-2 py-0.5 bg-gray-100 rounded-full">
                      {watch.movement}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-5 leading-relaxed font-light">{watch.one_liner}</p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={watch.affiliate_url}
                      rel="nofollow sponsored noopener"
                      target="_blank"
                      className="inline-flex items-center gap-2 px-6 py-3 cta-shine text-white font-semibold rounded-full text-sm min-h-[48px] hover:shadow-[0_8px_30px_rgba(201,169,110,0.3)] transition-all duration-500"
                    >
                      Check Price on Amazon
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                    <Link
                      href={watch.slug}
                      className="inline-flex items-center px-6 py-3 border border-navy/20 text-navy font-semibold rounded-full hover:bg-navy hover:text-white transition-all duration-500 text-sm min-h-[48px]"
                    >
                      Read Full Review
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-pearl">
            <p className="text-gray-500 mb-6 leading-relaxed">
              We couldn&apos;t find watches matching all your criteria. Try adjusting
              your budget or style preference.
            </p>
            <button
              onClick={resetQuiz}
              className="inline-flex items-center gap-2 px-8 py-3.5 cta-shine text-white font-semibold rounded-full min-h-[48px] hover:shadow-[0_8px_30px_rgba(201,169,110,0.3)] transition-all duration-500"
            >
              Retake the Quiz
            </button>
          </div>
        )}

        <div className="mt-14 text-center space-y-4">
          <button
            onClick={resetQuiz}
            className="text-gold hover:text-gold-dark font-semibold transition-colors duration-300"
          >
            &larr; Retake the Quiz
          </button>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 font-light">
            <Link href="/reviews" className="hover:text-gold transition-colors duration-300">
              See All Reviews
            </Link>
            <Link
              href="/occasion/fathers-day"
              className="hover:text-gold transition-colors duration-300"
            >
              Shop by Occasion
            </Link>
            <Link href="/budget/under-200" className="hover:text-gold transition-colors duration-300">
              Shop by Budget
            </Link>
          </div>
        </div>
      </div>
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="bg-ivory min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="text-center mb-14">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="luxury-label text-gold">60-Second Quiz</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/50" />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-navy mb-4 leading-tight">
          Watch Gift Finder Quiz
        </h1>
        <p className="text-gray-500 leading-relaxed font-light">
          Answer 4 quick questions and get personalized watch recommendations in
          60 seconds.
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${
              i <= currentStep ? "bg-gradient-to-r from-gold to-gold-hover" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      <p className="luxury-label text-gray-400 mb-2">
        Step {currentStep + 1} of {steps.length}
      </p>
      <h2 className="text-2xl md:text-3xl font-heading font-semibold text-navy mb-8">
        {step.title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {step.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className="luxury-card p-6 text-left group hover:border-gold/40 hover:shadow-[0_4px_20px_rgba(201,169,110,0.1)] transition-all duration-500"
          >
            <span className="text-base font-medium text-navy group-hover:text-gold transition-colors duration-300">
              {option.label}
            </span>
          </button>
        ))}
      </div>

      {currentStep > 0 && (
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          className="mt-10 text-sm text-gray-400 hover:text-gold transition-colors duration-300 flex items-center gap-1.5 font-light"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Go Back
        </button>
      )}
    </div>
    </div>
  );
}
