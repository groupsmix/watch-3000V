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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {schema && <SchemaMarkup schema={schema} />}
      <Breadcrumb items={[{ label: "Contact" }]} />
      <article className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </article>
    </div>
  );
}
