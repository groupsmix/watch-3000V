import { notFound } from "next/navigation";
import { getRecipientBySlug, getAllRecipientPages } from "@/lib/content";
import { renderContent, getSchemaFromPage, getMetadataFromPage } from "@/lib/contentRenderer";
import Breadcrumb from "@/components/layout/Breadcrumb";
import SchemaMarkup from "@/components/content/SchemaMarkup";
import EmailSignup from "@/components/content/EmailSignup";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pages = getAllRecipientPages();
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getRecipientBySlug(slug);
  if (!page) return {};
  return getMetadataFromPage(page);
}

export default async function RecipientPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getRecipientBySlug(slug);
  if (!page) notFound();

  const htmlContent = await renderContent(page);
  const schema = getSchemaFromPage(page);

  return (
    <>
      {schema && <SchemaMarkup schema={schema} />}

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-navy-dark via-navy to-navy-light text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-gold rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Watches by Recipient", href: "/" },
              { label: page.frontmatter.title },
            ]}
          />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">
            {page.frontmatter.title}
          </h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <article className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </article>

        <div className="mt-16">
          <EmailSignup />
        </div>
      </div>
    </>
  );
}
