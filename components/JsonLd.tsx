/**
 * Safely serialise an object to JSON-LD.
 *
 * JSON.stringify can produce strings that contain "</script>" or HTML comment
 * sequences (<!-- and -->) which would break out of the <script> tag and
 * allow XSS. We escape those sequences in the output string.
 *
 * This is the same approach used by Next.js internally and by google/safevalues.
 */
function safeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/'/g, "\\u0027");
}

export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          // safeJsonLd escapes </script> break-out sequences before insertion
          dangerouslySetInnerHTML={{ __html: safeJsonLd(d) }}
        />
      ))}
    </>
  );
}
