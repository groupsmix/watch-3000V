import Link from "next/link";
import { getAllBlogPosts } from "@/lib/content";
import Breadcrumb from "@/components/layout/Breadcrumb";
import EmailSignup from "@/components/content/EmailSignup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watch Blog — Tips, Guides & Gift Ideas",
  description:
    "Expert articles on watch gifting, sizing, care, and more. Learn how to pick the perfect watch gift with our in-depth guides.",
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "Blog" }]} />

      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-navy mb-4">
          The WristNerd Blog
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Tips, guides, and expert advice to help you find and give the perfect
          watch gift.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gold hover:shadow-lg transition-all"
          >
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Blog Image</span>
            </div>
            <div className="p-5">
              <h2 className="text-lg font-heading font-semibold text-navy group-hover:text-gold transition-colors mb-2">
                {post.frontmatter.title}
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                {post.frontmatter.meta_description}
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
