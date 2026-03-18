import type { MetadataRoute } from "next";
import {
  getAllReviews,
  getAllOccasionPages,
  getAllBudgetPages,
  getAllRecipientPages,
  getAllBlogPosts,
  getAllBrandSpotlights,
  getAllComparisons,
} from "@/lib/content";

export const dynamic = "force-static";

const BASE_URL = "https://wristnerd.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages use a fixed date so that builds don't churn the sitemap needlessly.
  // Update this value when static page content is changed.
  const STATIC_LAST_MODIFIED = "2026-03-01T00:00:00.000Z";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/gift-finder`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/reviews`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/deals`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/contact`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/affiliate-disclosure`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms-of-use`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Helper to strip trailing slashes from slug (content frontmatter sometimes includes them)
  const cleanSlug = (slug: string) => slug.replace(/^\/+|\/+$/g, "");

  // Dynamic pages
  const reviews = getAllReviews().map((r) => ({
    url: `${BASE_URL}/reviews/${cleanSlug(r.slug)}`,
    lastModified: r.frontmatter.last_updated || STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const occasions = getAllOccasionPages().map((p) => ({
    url: `${BASE_URL}/occasion/${cleanSlug(p.slug)}`,
    lastModified: p.frontmatter.last_updated || STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const budgets = getAllBudgetPages().map((p) => ({
    url: `${BASE_URL}/budget/${cleanSlug(p.slug)}`,
    lastModified: p.frontmatter.last_updated || STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const recipients = getAllRecipientPages().map((p) => ({
    url: `${BASE_URL}/recipient/${cleanSlug(p.slug)}`,
    lastModified: p.frontmatter.last_updated || STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogs = getAllBlogPosts().map((p) => ({
    url: `${BASE_URL}/blog/${cleanSlug(p.slug)}`,
    lastModified: p.frontmatter.last_updated || STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const brands = getAllBrandSpotlights().map((b) => ({
    url: `${BASE_URL}/brands/${cleanSlug(b.slug)}`,
    lastModified: b.frontmatter.last_updated || STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const comparisons = getAllComparisons().map((c) => ({
    url: `${BASE_URL}/compare/${cleanSlug(c.slug)}`,
    lastModified: c.frontmatter.last_updated || STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...occasions,
    ...budgets,
    ...recipients,
    ...reviews,
    ...blogs,
    ...brands,
    ...comparisons,
  ];
}
