const body = `User-agent: *
Allow: /

Sitemap: https://seonbiz.com/sitemap.xml
`;

export function GET() {
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
