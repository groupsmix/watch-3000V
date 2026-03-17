import { notFound } from "next/navigation";
import { getStaticPage } from "@/lib/content";
import { renderContent, getSchemaFromPage, getMetadataFromPage } from "@/lib/contentRenderer";
import Breadcrumb from "@/components/layout/Breadcrumb";
import SchemaMarkup from "@/components/content/SchemaMarkup";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = getStaticPage("terms-of-use");
  if (!page) return { title: "Terms of Use" };
  return getMetadataFromPage(page);
}

export default async function TermsOfUsePage() {
  const page = getStaticPage("terms-of-use");
  if (!page) notFound();

  const htmlContent = await renderContent(page);
  const schema = getSchemaFromPage(page);

  return (
    <>
      {schema && <SchemaMarkup schema={schema} />}

      <section className="bg-gradient-to-br from-navy-dark via-navy to-navy-light text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/3 w-64 h-64 bg-gold rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Terms of Use" }]} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">
            Terms of Use
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
