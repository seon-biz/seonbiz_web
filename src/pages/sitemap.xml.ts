import { caseSummaries, notes } from '@/lib/content';

const staticPaths = [
  '/', '/coaching/website', '/process', '/cases', '/notes',
  '/about', '/apply', '/privacy',
];

export function GET() {
  const paths = [
    ...staticPaths,
    ...caseSummaries.map(({ slug }) => `/cases/${slug}`),
    ...notes.map(({ slug }) => `/notes/${slug}`),
  ];
  const urls = [...new Set(paths)].map((path) => `  <url><loc>https://seonbiz.com${path}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
