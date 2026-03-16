import { notFound } from "next/navigation";
import { getOccasionBySlug, getAllOccasionPages } from "@/lib/content";
import { renderContent, getSchemaFromPage, getMetadataFromPage } from "@/lib/contentRenderer";
import Breadcrumb from "@/components/layout/Breadcrumb";
import SchemaMarkup from "@/components/content/SchemaMarkup";
import EmailSignup from "@/components/content/EmailSignup";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pages = getAllOccasionPages();
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getOccasionBySlug(slug);
  if (!page) return {};
  return getMetadataFromPage(page);
}

export default async function OccasionPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getOccasionBySlug(slug);
  if (!page) notFound();

  const htmlContent = await renderContent(page);
  const schema = getSchemaFromPage(page);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {schema && <SchemaMarkup schema={schema} />}

      <Breadcrumb
        items={[
          { label: "Gift Guides", href: "/" },
          { label: page.frontmatter.title },
        ]}
      />

      <article className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </article>

      <EmailSignup />
    </div>
  );
}
