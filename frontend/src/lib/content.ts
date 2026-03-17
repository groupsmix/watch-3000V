import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "..", "content");

function parseContentFrontmatter(data: Record<string, unknown>): ContentFrontmatter {
  return {
    title: typeof data.title === "string" ? data.title : "",
    slug: typeof data.slug === "string" ? data.slug : "",
    template: typeof data.template === "string" ? data.template : "",
    meta_title: typeof data.meta_title === "string" ? data.meta_title : "",
    meta_description: typeof data.meta_description === "string" ? data.meta_description : "",
    schema_types: Array.isArray(data.schema_types) ? data.schema_types.filter((s): s is string => typeof s === "string") : [],
    og_title: typeof data.og_title === "string" ? data.og_title : undefined,
    og_description: typeof data.og_description === "string" ? data.og_description : undefined,
    og_image: typeof data.og_image === "string" ? data.og_image : undefined,
    twitter_card: typeof data.twitter_card === "string" ? data.twitter_card : undefined,
    canonical: typeof data.canonical === "string" ? data.canonical : undefined,
    word_count_target: typeof data.word_count_target === "string" ? data.word_count_target : undefined,
    last_updated: typeof data.last_updated === "string" ? data.last_updated : undefined,
    author: typeof data.author === "string" ? data.author : undefined,
    pinterest_pin_ideas: Array.isArray(data.pinterest_pin_ideas) ? data.pinterest_pin_ideas.filter((s): s is string => typeof s === "string") : undefined,
    image_notes: typeof data.image_notes === "string" || (typeof data.image_notes === "object" && data.image_notes !== null) ? data.image_notes as Record<string, string> | string : undefined,
  };
}

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
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const fm = parseContentFrontmatter(data as Record<string, unknown>);
    const fileSlug = path.basename(filePath, ".md");
    if (fileSlug === slug) {
      return { frontmatter: fm, content, slug: fileSlug };
    }
  }
  return null;
}

export function getAllContentFromDir(dir: string): ContentPage[] {
  const files = getFilesFromDir(dir);
  return files.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      frontmatter: parseContentFrontmatter(data as Record<string, unknown>),
      content,
      slug: path.basename(filePath, ".md"),
    };
  });
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
