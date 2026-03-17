interface SchemaMarkupProps {
  schema: string;
}

function sanitizeJsonLd(raw: string): string {
  try {
    // Parse and re-serialize to strip any non-JSON content (e.g. embedded scripts)
    const parsed = JSON.parse(raw);
    // Escape sequences that could break out of the <script> tag
    return JSON.stringify(parsed).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
  } catch {
    // If the schema is not valid JSON, refuse to render it
    return "";
  }
}

export default function SchemaMarkup({ schema }: SchemaMarkupProps) {
  const safeSchema = sanitizeJsonLd(schema);
  if (!safeSchema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeSchema }}
    />
  );
}
