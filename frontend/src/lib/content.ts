import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "..", "content");

export interface ContentFrontmatter {
  title: string;
  slug: string;
  template: string;
  meta_title: string;
  meta_description: string;
  schema_types: string[];
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_card?: string;
  canonical?: string;
  word_count_target?: string;
  last_updated?: string;
  author?: string;
  pinterest_pin_ideas?: string[];
  image_notes?: Record<string, string> | string;
}

export interface ContentPage {
  frontmatter: ContentFrontmatter;
  content: string;
  slug: string;
}

function getFilesFromDir(dir: string): string[] {
  const fullPath = path.join(contentDirectory, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs
    .readdirSync(fullPath)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.join(fullPath, f));
}

export function getContentBySlug(
  dir: string,
  slug: string
): ContentPage | null {
  const files = getFilesFromDir(dir);
  for (const filePath of files) {
    const fileSlug = path.basename(filePath, ".md");
    if (fileSlug !== slug) continue;
    try {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      const fm = data as ContentFrontmatter;
      return { frontmatter: fm, content, slug: fileSlug };
    } catch {
      return null;
    }
  }
  return null;
}

export function getAllContentFromDir(dir: string): ContentPage[] {
  const files = getFilesFromDir(dir);
  const pages: ContentPage[] = [];
  for (const filePath of files) {
    try {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      pages.push({
        frontmatter: data as ContentFrontmatter,
        content,
        slug: path.basename(filePath, ".md"),
      });
    } catch {
      // Skip unreadable/corrupted files
    }
  }
  return pages;
}

export function getAllSlugsFromDir(dir: string): string[] {
  const files = getFilesFromDir(dir);
  return files.map((f) => path.basename(f, ".md"));
}

// Specific content getters
export function getHomepage(): ContentPage | null {
  return getContentBySlug("homepage", "homepage");
}

export function getAllReviews(): ContentPage[] {
  return getAllContentFromDir("reviews").filter((p) => p.slug !== "index");
}

export function getReviewBySlug(slug: string): ContentPage | null {
  return getContentBySlug("reviews", slug);
}

export function getAllOccasionPages(): ContentPage[] {
  return getAllContentFromDir("occasion-pages");
}

export function getOccasionBySlug(slug: string): ContentPage | null {
  return getContentBySlug("occasion-pages", slug);
}

export function getAllBudgetPages(): ContentPage[] {
  return getAllContentFromDir("budget-pages");
}

export function getBudgetBySlug(slug: string): ContentPage | null {
  return getContentBySlug("budget-pages", slug);
}

export function getAllRecipientPages(): ContentPage[] {
  return getAllContentFromDir("recipient-pages");
}

export function getRecipientBySlug(slug: string): ContentPage | null {
  return getContentBySlug("recipient-pages", slug);
}

export function getAllBlogPosts(): ContentPage[] {
  return getAllContentFromDir("blog");
}

export function getBlogBySlug(slug: string): ContentPage | null {
  return getContentBySlug("blog", slug);
}

export function getAllBrandSpotlights(): ContentPage[] {
  return getAllContentFromDir("brand-spotlights");
}

export function getBrandBySlug(slug: string): ContentPage | null {
  return getContentBySlug("brand-spotlights", slug);
}

export function getAllComparisons(): ContentPage[] {
  return getAllContentFromDir("comparisons");
}

export function getComparisonBySlug(slug: string): ContentPage | null {
  return getContentBySlug("comparisons", slug);
}

export function getQuizPage(): ContentPage | null {
  return getContentBySlug("quiz", "gift-finder-quiz");
}

export function getStaticPage(slug: string): ContentPage | null {
  return getContentBySlug("static-pages", slug);
}

export function getDealsPage(): ContentPage | null {
  return getContentBySlug("deals", "deals");
}
