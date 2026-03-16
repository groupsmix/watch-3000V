import { getStaticPage } from "@/lib/content";
import { renderContent, getSchemaFromPage, getMetadataFromPage } from "@/lib/contentRenderer";
import Breadcrumb from "@/components/layout/Breadcrumb";
import SchemaMarkup from "@/components/content/SchemaMarkup";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = getStaticPage("affiliate-disclosure");
  if (!page) return { title: "Affiliate Disclosure" };
  return getMetadataFromPage(page);
}

export default async function AffiliateDisclosurePage() {
  const page = getStaticPage("affiliate-disclosure");
  if (!page) return <div className="max-w-3xl mx-auto px-4 py-8"><p>Page not found.</p></div>;

  const htmlContent = await renderContent(page);
  const schema = getSchemaFromPage(page);

  return (
    <>
      {schema && <SchemaMarkup schema={schema} />}

      <section className="bg-gradient-to-br from-navy-dark via-navy to-navy-light text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-1/4 w-64 h-64 bg-gold rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Affiliate Disclosure" }]} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">
            Affiliate Disclosure
          </h1>
        </div>
      </section>

      <div className="bg-ivory">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <article className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </article>
        </div>
      </div>
    </>
  );
}
