import { getStaticPage } from "@/lib/content";
import { renderContent, getSchemaFromPage, getMetadataFromPage } from "@/lib/contentRenderer";
import Breadcrumb from "@/components/layout/Breadcrumb";
import SchemaMarkup from "@/components/content/SchemaMarkup";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = getStaticPage("contact");
  if (!page) return { title: "Contact Us" };
  return getMetadataFromPage(page);
}

export default async function ContactPage() {
  const page = getStaticPage("contact");
  if (!page) return <div className="max-w-3xl mx-auto px-4 py-8"><p>Page not found.</p></div>;

  const htmlContent = await renderContent(page);
  const schema = getSchemaFromPage(page);

  return (
    <>
      {schema && <SchemaMarkup schema={schema} />}

      <section className="relative bg-navy text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-light" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-gold/[0.05] rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Contact" }]} />
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-gradient-to-r from-gold/50 to-transparent" />
              <span className="luxury-label text-gold">Get In Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight">
              Contact Us
            </h1>
          </div>
        </div>
      </section>

      <div className="bg-ivory">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <article className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </article>
        </div>
      </div>
    </>
  );
}
