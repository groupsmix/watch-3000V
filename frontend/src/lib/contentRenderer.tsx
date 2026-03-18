import { markdownToHtml, extractSchema, cleanContent } from "./markdown";
import type { ContentPage } from "./content";
import type { Metadata } from "next";

export async function renderContent(page: ContentPage): Promise<string> {
  const cleaned = cleanContent(page.content);
  return markdownToHtml(cleaned);
}

export function getSchemaFromPage(page: ContentPage): string | null {
  return extractSchema(page.content);
}

export function getMetadataFromPage(page: ContentPage): Metadata {
  const fm = page.frontmatter;
  return {
    title: fm.meta_title || fm.title,
    description: fm.meta_description,
    ...(fm.author ? { authors: [{ name: fm.author }] } : {}),
    openGraph: {
      title: fm.og_title || fm.meta_title || fm.title,
      description: fm.og_description || fm.meta_description,
      images: fm.og_image ? [fm.og_image] : undefined,
    },
    twitter: {
      card: fm.twitter_card === "summary" ? "summary" : "summary_large_image",
      title: fm.og_title || fm.meta_title || fm.title,
      description: fm.og_description || fm.meta_description,
      images: fm.og_image ? [fm.og_image] : undefined,
    },
    alternates: fm.canonical ? { canonical: fm.canonical } : undefined,
  };
}
