import Link from "next/link";
import { getAllBlogPosts } from "@/lib/content";
import Breadcrumb from "@/components/layout/Breadcrumb";
import EmailSignup from "@/components/content/EmailSignup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watch Blog \u2014 Tips, Guides & Gift Ideas",
  description:
    "Expert articles on watch gifting, sizing, care, and more. Learn how to pick the perfect watch gift with our in-depth guides.",
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Blog" }]} />
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/40" />
              <span className="label-luxury">Expert Advice</span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/40" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-ivory mb-5 tracking-tight">
              The WristNerd Blog
            </h1>
            <p className="text-lg text-ivory-dim/60 max-w-2xl mx-auto leading-relaxed">
              Tips, guides, and expert advice to help you find and give the perfect
              watch gift.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group luxury-card overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-surface to-surface-elevated flex items-center justify-center">
                <span className="text-ivory-dim/20 text-sm">Blog Image</span>
              </div>
              <div className="p-6">
                <h2 className="text-lg font-heading font-semibold text-ivory group-hover:text-gold transition-colors duration-300 mb-2">
                  {post.frontmatter.title}
                </h2>
                <p className="text-sm text-ivory-dim/50 line-clamp-2 leading-relaxed">
                  {post.frontmatter.meta_description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link
            href="/gift-finder"
            className="inline-flex items-center gap-2 px-10 py-5 cta-shine font-semibold rounded-full text-lg min-h-[56px] hover:shadow-xl transition-all duration-300"
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
    </>
  );
}
