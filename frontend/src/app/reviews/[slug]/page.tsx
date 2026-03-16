import { notFound } from "next/navigation";
import { getReviewBySlug, getAllReviews } from "@/lib/content";
import { renderContent, getSchemaFromPage, getMetadataFromPage } from "@/lib/contentRenderer";
import Breadcrumb from "@/components/layout/Breadcrumb";
import SchemaMarkup from "@/components/content/SchemaMarkup";
import EmailSignup from "@/components/content/EmailSignup";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const reviews = getAllReviews();
  return reviews.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getReviewBySlug(slug);
  if (!page) return {};
  return getMetadataFromPage(page);
}

export default async function ReviewPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getReviewBySlug(slug);
  if (!page) notFound();

  const htmlContent = await renderContent(page);
  const schema = getSchemaFromPage(page);

  return (
    <>
      {schema && <SchemaMarkup schema={schema} />}

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Reviews", href: "/reviews" },
              { label: page.frontmatter.title },
            ]}
          />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-ivory leading-tight tracking-tight">
            {page.frontmatter.title}
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <article className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </article>

        <div className="mt-20">
          <EmailSignup />
        </div>
      </div>
    </>
  );
}
