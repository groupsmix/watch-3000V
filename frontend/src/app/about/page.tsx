import { getStaticPage } from "@/lib/content";
import { renderContent, getSchemaFromPage, getMetadataFromPage } from "@/lib/contentRenderer";
import Breadcrumb from "@/components/layout/Breadcrumb";
import SchemaMarkup from "@/components/content/SchemaMarkup";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = getStaticPage("about");
  if (!page) return { title: "About WristNerd" };
  return getMetadataFromPage(page);
}

export default async function AboutPage() {
  const page = getStaticPage("about");
  if (!page) return <div className="max-w-3xl mx-auto px-4 py-8"><p className="text-ivory-dim">Page not found.</p></div>;

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
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "About" }]} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-ivory leading-tight tracking-tight">
            About WristNerd
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <article className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </article>
      </div>
    </>
  );
}
