interface SchemaMarkupProps {
  schema: string;
}

export default function SchemaMarkup({ schema }: SchemaMarkupProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schema }}
    />
  );
}
