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

const BASE_URL = "https://wristnerd.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/gift-finder`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/reviews`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/deals`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/affiliate-disclosure`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms-of-use`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Dynamic pages
  const reviews = getAllReviews().map((r) => ({
    url: `${BASE_URL}/reviews/${r.slug}`,
    lastModified: r.frontmatter.last_updated || now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const occasions = getAllOccasionPages().map((p) => ({
    url: `${BASE_URL}/occasion/${p.slug}`,
    lastModified: p.frontmatter.last_updated || now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const budgets = getAllBudgetPages().map((p) => ({
    url: `${BASE_URL}/budget/${p.slug}`,
    lastModified: p.frontmatter.last_updated || now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const recipients = getAllRecipientPages().map((p) => ({
    url: `${BASE_URL}/recipient/${p.slug}`,
    lastModified: p.frontmatter.last_updated || now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogs = getAllBlogPosts().map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: p.frontmatter.last_updated || now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const brands = getAllBrandSpotlights().map((b) => ({
    url: `${BASE_URL}/brands/${b.slug}`,
    lastModified: b.frontmatter.last_updated || now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const comparisons = getAllComparisons().map((c) => ({
    url: `${BASE_URL}/compare/${c.slug}`,
    lastModified: c.frontmatter.last_updated || now,
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
